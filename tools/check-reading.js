"use strict";

// 독해 데이터(data/reading.js) 검사 + 가짜 DOM으로 assets/js/reading.js 렌더링 검사.
// 실행: node tools/check-reading.js  (외부 패키지 불필요)

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var root = path.join(__dirname, "..");

function loadData(files) {
  var context = { window: {} };
  vm.createContext(context);
  files.forEach(function (file) {
    var filePath = path.join(root, file);
    vm.runInContext(fs.readFileSync(filePath, "utf8"), context, { filename: filePath });
  });
  return context.window;
}

// ---------- 1. 데이터 검사 ----------

var data = loadData(["data/grammar.js", "data/reading.js"]);
var strategies = data.READING_STRATEGY;
var passages = data.PASSAGES;
var part6 = data.PART6 || [];
if (!Array.isArray(strategies) || !Array.isArray(passages)) {
  console.error("검사 실패: data/reading.js에서 READING_STRATEGY 및 PASSAGES 배열을 찾을 수 없습니다.");
  process.exit(1);
}

var failures = {
  invalidStrategyId: [],
  invalidAnswer: [],
  missingTranslation: [],
  duplicateIds: [],
  invalidPart6: [],
  invalidPart6Vocab: [],
  part6VocabRevealsChoice: []
};
var notes = { part6VocabInSentenceChoice: [] };

var strategyIds = Object.create(null);
var grammarIds = Object.create(null);
(data.GRAMMAR || []).forEach(function (topic) { grammarIds[topic.id] = true; });
var seenIds = Object.create(null);

function checkId(id, label) {
  if (typeof id !== "string" || !id) return failures.duplicateIds.push({ id: label, reason: "id 없음" });
  if (seenIds[id]) failures.duplicateIds.push({ id: id });
  else seenIds[id] = true;
}

function checkQuestion(owner, question, index) {
  var choices = question && question.choices;
  if (!Array.isArray(choices) || choices.length !== 4 || !Number.isInteger(question.answer) ||
      question.answer < 0 || question.answer >= choices.length) {
    failures.invalidAnswer.push({ id: owner, question: index + 1, answer: question && question.answer });
  }
}

strategies.forEach(function (strategy, index) { checkId(strategy && strategy.id, "전략 #" + (index + 1)); });
strategies.forEach(function (strategy) { if (strategy && strategy.id) strategyIds[strategy.id] = true; });

passages.forEach(function (passage, index) {
  var label = (passage && passage.id) || "지문 #" + (index + 1);
  checkId(passage && passage.id, label);
  if (!strategyIds[passage.strategyId]) failures.invalidStrategyId.push({ id: label, strategyId: passage.strategyId || "(없음)" });
  (passage.questions || []).forEach(function (question, qIndex) { checkQuestion(label, question, qIndex); });
  if (!Array.isArray(passage.questions) || !passage.questions.length) failures.invalidAnswer.push({ id: label, reason: "questions 없음" });
  var groups = Array.isArray(passage.parts) && passage.parts.length
    ? passage.parts.map(function (part, partIndex) { return { name: part.label || "part " + (partIndex + 1), sentences: part.sentences }; })
    : [{ name: "본문", sentences: passage.sentences }];
  groups.forEach(function (group) {
    if (!Array.isArray(group.sentences) || !group.sentences.length) {
      failures.missingTranslation.push({ id: label, part: group.name, reason: "sentences 없음" });
      return;
    }
    group.sentences.forEach(function (sentence, sIndex) {
      var hasEn = sentence && typeof sentence.en === "string" && sentence.en.trim();
      var hasKo = sentence && typeof sentence.ko === "string" && sentence.ko.trim();
      if (!hasEn || !hasKo) {
        failures.missingTranslation.push({ id: label, part: group.name, sentence: sIndex + 1, missing: [hasEn ? null : "en", hasKo ? null : "ko"].filter(Boolean) });
      }
    });
  });
});

// Part 6 어휘: 있으면 w·m이 비어 있지 않고, w가 그 세트의 영어 본문(빈칸 제외)이나 header에 실제로 나와야 한다.
// 대소문자는 무시하고 부분 문자열로 찾는다(어형 변화 허용). "be ~" 표현은 is/was/were 등 be동사 활용형도 인정한다.
var BE_FORMS = ["be", "am", "is", "are", "was", "were", "been", "being"];
function checkPart6Vocab(set, label) {
  if (set.vocab === undefined) return;
  if (!Array.isArray(set.vocab) || !set.vocab.length) {
    return failures.invalidPart6Vocab.push({ id: label, reason: "vocab은 비어 있지 않은 배열이어야 함" });
  }
  var text = (set.header || []).concat((set.blocks || []).filter(function (block) { return block.type === "text"; })
    .map(function (block) { return block.en || ""; })).join(" ").replace(/\s+/g, " ").toLowerCase();
  set.vocab.forEach(function (entry, vIndex) {
    var w = entry && typeof entry.w === "string" ? entry.w.trim() : "";
    var m = entry && typeof entry.m === "string" ? entry.m.trim() : "";
    if (!w || !m) {
      return failures.invalidPart6Vocab.push({ id: label, vocab: vIndex + 1, word: w || "(없음)", reason: "w 또는 m이 비어 있음" });
    }
    var lower = w.toLowerCase().replace(/\s+/g, " ");
    var forms = /^be /.test(lower) ? BE_FORMS.map(function (be) { return be + lower.slice(2); }) : [lower];
    if (!forms.some(function (form) { return text.indexOf(form) !== -1; })) {
      failures.invalidPart6Vocab.push({ id: label, word: w, reason: "본문/header에 없는 단어" });
    }
    checkVocabAgainstChoices(set, label, w);
  });
}

// 어휘 목록은 처음부터 보이므로 빈칸 정답·선택지 단어가 들어가면 답을 알려 주게 된다.
// 단어형 선택지(문법·어휘 문항)와 겹치면 실패. 문장 삽입 선택지는 어휘가 이미 본문에 있어 힌트가 되지 않으므로 참고로만 출력한다.
// 대소문자·어형(-s/-es/-ed/-ing, 끝 e, 겹자음) 무시, 관사·전치사·be동사 같은 기능어는 비교하지 않는다.
var STOP_WORDS = Object.create(null);
"a an the to in on at by for of with and or but nor be am is are was were been being more most your our their its this that one".split(" ")
  .forEach(function (word) { STOP_WORDS[word] = true; });
function stemWord(token) {
  return token.replace(/(ies|ied)$/, "y").replace(/(ing|ed|es|s)$/, "").replace(/([^aeiouy])\1$/, "$1").replace(/e$/, "");
}
function contentStems(text) {
  return (String(text).toLowerCase().match(/[a-z]+/g) || []).filter(function (token) { return !STOP_WORDS[token]; }).map(stemWord);
}
function checkVocabAgainstChoices(set, label, w) {
  var wordStems = contentStems(w);
  (set.questions || []).forEach(function (question) {
    (question.choices || []).forEach(function (choice, cIndex) {
      var choiceStems = contentStems(choice);
      if (!wordStems.some(function (stem) { return choiceStems.indexOf(stem) !== -1; })) return;
      var entry = { id: label, word: w, question: question.n, choice: choice, isAnswer: cIndex === question.answer };
      if (/[.!?]$/.test(String(choice).trim())) notes.part6VocabInSentenceChoice.push(entry);
      else failures.part6VocabRevealsChoice.push(entry);
    });
  });
}

part6.forEach(function (set, index) {
  var label = (set && set.id) || "PART6 #" + (index + 1);
  checkId(set && set.id, label);
  var blanks = (set.blocks || []).filter(function (block) { return block.type === "blank"; }).map(function (block) { return block.n; });
  var numbers = (set.questions || []).map(function (question) { return question.n; });
  if (!blanks.length || blanks.slice().sort().join(",") !== numbers.slice().sort().join(",") || new Set(blanks).size !== blanks.length) {
    failures.invalidPart6.push({ id: label, reason: "빈칸 번호와 문항 번호 불일치", blanks: blanks, questions: numbers });
  }
  checkPart6Vocab(set, label);
  (set.questions || []).forEach(function (question, qIndex) {
    checkQuestion(label, question, qIndex);
    if (question.ruleId !== null && !grammarIds[question.ruleId]) {
      failures.invalidPart6.push({ id: label, question: question.n, reason: "없는 문법 유형", ruleId: question.ruleId });
    }
    if (typeof question.explanation !== "string" || !question.explanation.trim()) {
      failures.invalidPart6.push({ id: label, question: question.n, reason: "해설 없음" });
    }
    // type: 풀세트 채점의 Part 6 유형별 정답률에 쓴다. 문장 선택지 ⇔ sentence, ruleId가 있으면 grammar.
    var isSentenceChoice = (question.choices || []).every(function (choice) { return /[.!?]$/.test(String(choice).trim()); });
    if (["grammar", "vocab", "sentence"].indexOf(question.type) === -1) {
      failures.invalidPart6.push({ id: label, question: question.n, reason: "type은 grammar/vocab/sentence 중 하나", type: question.type });
    } else if ((question.type === "sentence") !== isSentenceChoice) {
      failures.invalidPart6.push({ id: label, question: question.n, reason: "문장 선택지 여부와 type 불일치", type: question.type });
    } else if (question.ruleId && question.type !== "grammar") {
      failures.invalidPart6.push({ id: label, question: question.n, reason: "ruleId가 있는데 type이 grammar가 아님", type: question.type });
    }
  });
});

var failureCount = 0;
Object.keys(failures).forEach(function (key) { if (failures[key].length) failureCount += 1; });
console.log("요약: 전략 " + strategies.length + "개, 지문 " + passages.length + "개, Part 6 " + part6.length +
  "세트 검사 | 규칙 통과 " + (Object.keys(failures).length - failureCount) + "/" + Object.keys(failures).length);
Object.keys(failures).forEach(function (key) {
  console.log("\n" + key + " (" + failures[key].length + ")");
  if (!failures[key].length) console.log("  없음");
  failures[key].forEach(function (failure) { console.log("  " + JSON.stringify(failure)); });
});

Object.keys(notes).forEach(function (key) {
  console.log("\n[참고] " + key + " (" + notes[key].length + ") — 실패 아님");
  notes[key].forEach(function (note) { console.log("  " + JSON.stringify(note)); });
});

// ---------- 2. 렌더링 검사 (가짜 DOM) ----------

function FakeElement(tag) {
  this.tagName = tag.toUpperCase();
  this.children = [];
  this.attrs = {};
  this.dataset = {};
  this.hidden = false;
  this.disabled = false;
  this.className = "";
  this.id = "";
  this.value = "";
  this.listeners = {};
  this._text = "";
  var self = this;
  function classes() { return self.className.split(/\s+/).filter(Boolean); }
  this.classList = {
    add: function (name) { if (classes().indexOf(name) === -1) self.className = classes().concat(name).join(" "); },
    remove: function (name) { self.className = classes().filter(function (c) { return c !== name; }).join(" "); },
    contains: function (name) { return classes().indexOf(name) !== -1; },
    toggle: function (name, force) {
      var on = force === undefined ? !this.contains(name) : Boolean(force);
      if (on) this.add(name); else this.remove(name);
      return on;
    }
  };
}
Object.defineProperty(FakeElement.prototype, "textContent", {
  get: function () { return this._text + this.children.map(function (c) { return c.textContent; }).join(""); },
  set: function (value) { this.children = []; this._text = String(value); }
});
FakeElement.prototype.appendChild = function (child) { this.children.push(child); return child; };
FakeElement.prototype.append = function () { for (var i = 0; i < arguments.length; i += 1) this.appendChild(arguments[i]); };
FakeElement.prototype.replaceChildren = function () { this.children = []; this._text = ""; this.append.apply(this, arguments); };
FakeElement.prototype.setAttribute = function (key, value) { this.attrs[key] = String(value); if (key === "id") this.id = String(value); };
FakeElement.prototype.getAttribute = function (key) { return key in this.attrs ? this.attrs[key] : key === "id" && this.id ? this.id : null; };
FakeElement.prototype.removeAttribute = function (key) { delete this.attrs[key]; };
FakeElement.prototype.addEventListener = function (type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); };
FakeElement.prototype.dispatch = function (type) {
  (this.listeners[type] || []).forEach(function (fn) { fn({ key: "", preventDefault: function () {} }); });
};
FakeElement.prototype.click = function () { if (!this.disabled) this.dispatch("click"); };
FakeElement.prototype.focus = function () {};
FakeElement.prototype.scrollIntoView = function () {};
FakeElement.prototype.descendants = function () {
  return this.children.reduce(function (list, child) { return list.concat(child, child.descendants()); }, []);
};
FakeElement.prototype.matches = function (selector) {
  var pattern = /\.([\w-]+)|\[([\w-]+)(\^?=)"([^"]*)"\]/g;
  var match;
  var ok = true;
  while ((match = pattern.exec(selector))) {
    if (match[1]) ok = ok && this.classList.contains(match[1]);
    else {
      var value = this.getAttribute(match[2]);
      ok = ok && value !== null && (match[3] === "=" ? value === match[4] : value.indexOf(match[4]) === 0);
    }
  }
  return ok;
};
FakeElement.prototype.querySelectorAll = function (selector) {
  return this.descendants().filter(function (node) { return node.matches(selector); });
};
FakeElement.prototype.querySelector = function (selector) { return this.querySelectorAll(selector)[0] || null; };

// hash를 주면 그 주소(#reading-strategy-r03 등)로 연 페이지의 document를 돌려준다.
function runReadingPage(hash) {
  var body = new FakeElement("body");
  ["reading-strategy-list", "reading-expand-toggle", "reading-passage-select", "reading-exercise", "reading-review-list",
    "reading-open-passage", "reading-panel-strategy", "reading-panel-passages", "reading-panel-review"].forEach(function (id) {
    var node = new FakeElement("div");
    node.id = id;
    body.appendChild(node);
  });
  ["strategy", "passages", "review"].forEach(function (name) {
    var tab = new FakeElement("button");
    tab.id = "reading-tab-" + name;
    tab.setAttribute("role", "tab");
    body.appendChild(tab);
  });
  var ready = null;
  var document = {
    createElement: function (tag) { return new FakeElement(tag); },
    getElementById: function (id) { return body.descendants().find(function (node) { return node.id === id; }) || null; },
    querySelectorAll: function (selector) { return body.querySelectorAll(selector); },
    addEventListener: function (type, fn) { if (type === "DOMContentLoaded") ready = fn; },
    activeElement: null
  };
  var window = {
    document: document,
    location: { hash: hash || "" },
    addEventListener: function () {},
    setInterval: function () { return 1; },
    clearInterval: function () {},
    Progress: { recordReadingResult: function () {}, getWeakPassages: function () { return []; } }
  };
  var context = vm.createContext({ window: window, document: document, console: console });
  ["data/reading.js", "assets/js/reading.js"].forEach(function (file) {
    var filePath = path.join(root, file);
    vm.runInContext(fs.readFileSync(filePath, "utf8"), context, { filename: filePath });
  });
  ready();
  if (hash) return document;

  var renderFailures = [];
  var strategyCount = document.getElementById("reading-strategy-list").querySelectorAll(".reading-strategy").length;
  var select = document.getElementById("reading-passage-select");
  if (strategyCount !== strategies.length) renderFailures.push({ reason: "읽기 전략 표시 개수", expected: strategies.length, actual: strategyCount });
  if (select.children.length !== passages.length) renderFailures.push({ reason: "지문 목록 개수", expected: passages.length, actual: select.children.length });

  window.PASSAGES.forEach(function (passage) {
    select.value = passage.id;
    select.dispatch("change");
    document.getElementById("reading-open-passage").click();
    var exercise = document.getElementById("reading-exercise");
    var translations = exercise.querySelectorAll(".reading-sentence-ko");
    var parts = exercise.querySelectorAll(".reading-passage-part");
    var dividers = exercise.querySelectorAll(".reading-passage-part.has-divider").length;
    var headers = exercise.querySelectorAll(".reading-passage-header").length;
    var expected = passage.parts
      ? passage.parts.reduce(function (sum, part) { return sum + part.sentences.length; }, 0)
      : passage.sentences.length;
    exercise.querySelectorAll(".reading-question-card").forEach(function (card) {
      card.querySelectorAll(".reading-choice")[0].click();
    });
    var buttons = exercise.querySelectorAll(".button");
    buttons.find(function (b) { return b.textContent === "채점"; }).click();
    var toggle = buttons.find(function (b) { return b.textContent === "📖 해석 보기"; });
    var toggleVisible = !toggle.hidden;
    toggle.click();
    var allShown = translations.every(function (node) { return !node.hidden; });
    var layoutOk = passage.parts
      ? parts.length === passage.parts.length && dividers === passage.parts.length - 1
      : parts.length === 0 && headers === 1;
    var ok = translations.length === expected && allShown && toggleVisible && layoutOk;
    console.log("  " + passage.id + ": 문장 " + translations.length + "/" + expected + ", 지문 구획 " + parts.length +
      ", 구분선 " + dividers + ", 해석 전부 표시 " + allShown + " → " + (ok ? "OK" : "실패"));
    if (!ok) renderFailures.push({ id: passage.id });
  });
  return renderFailures;
}

console.log("\n렌더링 검사 (가짜 DOM)");
var renderFailures;
try {
  renderFailures = runReadingPage();
} catch (error) {
  renderFailures = [{ reason: "실행 오류", message: error.message }];
}
// 실전 채점 화면의 "전략 보기" 링크: 해당 전략만 펼쳐진 채로 열려야 한다.
try {
  strategies.forEach(function (strategy) {
    var linked = runReadingPage("#reading-strategy-" + strategy.id);
    var openIds = strategies.filter(function (other) {
      var panel = linked.getElementById("reading-strategy-panel-" + other.id);
      return panel && !panel.hidden;
    }).map(function (other) { return other.id; });
    if (openIds.join(",") !== strategy.id) renderFailures.push({ reason: "전략 링크로 열기", hash: "#reading-strategy-" + strategy.id, open: openIds });
  });
  console.log("  전략 링크(#reading-strategy-r01~r0" + strategies.length + "): 해당 전략만 펼쳐짐 → " +
    (renderFailures.some(function (f) { return f.reason === "전략 링크로 열기"; }) ? "실패" : "OK"));
} catch (error) {
  renderFailures.push({ reason: "전략 링크 검사 오류", message: error.message });
}
console.log("renderFailures (" + renderFailures.length + ")");
renderFailures.forEach(function (failure) { console.log("  " + JSON.stringify(failure)); });

if (failureCount || renderFailures.length) process.exit(1);
