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
  part6VocabRevealsChoice: [],
  duplicateQuestionText: []
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

// 서로 다른 지문의 질문 문장(q)이 완전히 같으면 실패. 정답이 달라도 학습에는 문제가 없지만,
// check-practice.js는 질문 문장으로 원본 문항을 찾으므로 그 지문이 뽑힐 때만 채점 검사가 깨진다(간헐적 실패).
// 앞뒤 공백과 연속 공백만 정리해 비교한다(대소문자·문장부호는 그대로).
var questionOwners = Object.create(null);
passages.forEach(function (passage) {
  (passage.questions || []).forEach(function (question, qIndex) {
    if (!question || typeof question.q !== "string") return;
    var key = question.q.trim().replace(/\s+/g, " ");
    (questionOwners[key] = questionOwners[key] || []).push({ id: passage.id, question: qIndex + 1, answer: question.answer });
  });
});
Object.keys(questionOwners).forEach(function (text) {
  var owners = questionOwners[text];
  var distinct = owners.map(function (owner) { return owner.id; }).filter(function (id, i, list) { return list.indexOf(id) === i; });
  if (distinct.length > 1) {
    failures.duplicateQuestionText.push({
      q: text,
      where: owners.map(function (owner) { return owner.id + " " + owner.question + "번(정답 " + "ABCD"[owner.answer] + ")"; }).join(", ")
    });
  }
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

// ---------- Part 7 어휘(동의어)·문장 삽입 문항 ----------
// 어휘 문항(질문에 'the word "X" is closest in meaning to'): question.word = X이고,
//   X가 그 문서(question.part가 있으면 그 지문 번호, 없으면 지문 전체)의 문장에 단어 단위로 정확히 한 번 나와야 한다.
//   한 번이어야 질문이 가리키는 자리가 하나로 정해진다.
// 문장 삽입 문항(질문에 'positions marked [1], [2], [3], and [4]'): 보기가 [1]~[4]이고, question.insert(삽입할 문장)가
//   질문에 큰따옴표로 들어 있으며 본문에는 없어야 한다. 그 지문의 문장 mark가 1·2·3·4로 하나씩 있어야 한다.
// mark가 있는 지문에는 문장 삽입 문항이 하나 있어야 한다 (표시만 있고 문항이 없으면 실패).
failures.vocabWord = [];
failures.insertPositions = [];
function documentSentences(passage, partNumber) {
  if (Array.isArray(passage.parts) && passage.parts.length) {
    var parts = partNumber ? [passage.parts[partNumber - 1]].filter(Boolean) : passage.parts;
    return [].concat.apply([], parts.map(function (part) { return part.sentences || []; }));
  }
  return passage.sentences || [];
}
function escapeRegExp(text) { return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
passages.forEach(function (passage) {
  var allSentences = documentSentences(passage);
  var marks = allSentences.filter(function (s) { return s && s.mark !== undefined; }).map(function (s) { return s.mark; });
  var insertQuestions = 0;
  (passage.questions || []).forEach(function (question, qIndex) {
    var qLabel = passage.id + " Q" + (qIndex + 1);
    var vocabMatch = /the word "([^"]+)" is closest in meaning to/.exec(question.q || "");
    if (vocabMatch || question.word !== undefined) {
      var problems = [];
      if (!vocabMatch || vocabMatch[1] !== question.word) problems.push("질문의 단어와 word가 다름");
      var pattern = new RegExp("\\b" + escapeRegExp(question.word) + "\\b", "gi");
      var count = documentSentences(passage, question.part).reduce(function (sum, s) { return sum + ((s.en || "").match(pattern) || []).length; }, 0);
      if (count !== 1) problems.push("문서에 " + count + "번 나옴 (정확히 1번이어야 함)");
      // 독해 탭은 핵심 어휘를 본문과 함께 보여 주므로, 같은 단어가 있으면 답(그 문맥의 뜻)이 미리 보인다.
      var stem = String(question.word).toLowerCase().replace(/(es|s)$/, "");
      (passage.vocab || []).forEach(function (entry) {
        if (String(entry.w).toLowerCase().replace(/(es|s)$/, "") === stem) problems.push("핵심 어휘에 같은 단어가 있어 답이 보임: " + entry.w + " = " + entry.m);
      });
      if (problems.length) failures.vocabWord.push({ id: qLabel, word: question.word, part: question.part || "전체", problems: problems });
    }
    if (/positions marked \[1\], \[2\], \[3\], and \[4\]/.test(question.q || "") || question.insert !== undefined) {
      insertQuestions += 1;
      var issues = [];
      if (JSON.stringify(question.choices) !== JSON.stringify(["[1]", "[2]", "[3]", "[4]"])) issues.push("보기가 [1]~[4]가 아님");
      if (typeof question.insert !== "string" || !question.insert.trim()) issues.push("insert(삽입할 문장) 없음");
      else {
        if ((question.q || "").indexOf("\"" + question.insert + "\"") === -1) issues.push("질문에 삽입 문장이 큰따옴표로 없음");
        if (allSentences.some(function (s) { return (s.en || "").indexOf(question.insert) !== -1; })) issues.push("삽입 문장이 이미 본문에 있음");
      }
      if (JSON.stringify(marks.slice().sort()) !== JSON.stringify([1, 2, 3, 4])) issues.push("본문 표시가 [1]~[4] 하나씩이 아님: " + JSON.stringify(marks));
      if (issues.length) failures.insertPositions.push({ id: qLabel, problems: issues });
    }
  });
  if (marks.length && insertQuestions !== 1) failures.insertPositions.push({ id: passage.id, problems: ["표시 [1]~[4]가 있는데 문장 삽입 문항이 " + insertQuestions + "개"] });
});

// 정답 위치: 같은 지문(Part 7)·같은 세트(Part 6) 안에서 바로 앞 문항과 정답 위치(A~D)가 같으면 실패.
// 지문·세트가 바뀌면 처음부터 센다(Part 3·4 검사는 경계를 넘어 보지만, 독해는 지문 단위로 푼다).
// 문장 삽입 문항은 보기가 [1]~[4]로 고정이라 위치를 바꿀 수 없으므로, 연속이 생기면 앞 문항의 보기 순서를 바꿔서 푼다.
failures.answerRun = [];
var answerSpread = { "Part 7": [0, 0, 0, 0], "Part 6": [0, 0, 0, 0] };
[["Part 7", passages], ["Part 6", part6]].forEach(function (pair) {
  pair[1].forEach(function (owner) {
    (owner.questions || []).forEach(function (question, qIndex, list) {
      if (Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4) answerSpread[pair[0]][question.answer] += 1;
      if (qIndex > 0 && question.answer === list[qIndex - 1].answer) {
        failures.answerRun.push({ part: pair[0], id: owner.id, question: pair[0] === "Part 6" ? question.n : qIndex + 1,
          answer: "ABCD"[question.answer], previous: pair[0] === "Part 6" ? list[qIndex - 1].n : qIndex });
      }
    });
  });
});

// 정답 위치 쏠림: 한 보기가 35% 이상이거나 15% 이하면 실패(경계값 포함). 40문항 중 14개(35%)도 쏠림으로 본다.
// 모르는 문제를 한 위치로 찍어 점수가 오르면 실력보다 점수가 높게 나와 약점 분석이 어긋난다.
// 같은 기준이 check-grammar.js(Part 5)·check-listening.js(Part 2·3·4)·check-part1.js(Part 1)에도 있다.
failures.answerSkew = [];
Object.keys(answerSpread).forEach(function (part) {
  var counts = answerSpread[part];
  var total = counts.reduce(function (sum, n) { return sum + n; }, 0);
  counts.forEach(function (n, i) {
    var percent = n / total * 100;
    if (n * 100 >= 35 * total || n * 100 <= 15 * total) failures.answerSkew.push({ part: part, choice: "ABCD"[i], count: n, percent: Math.round(percent), allowed: "15% 초과 35% 미만" });
  });
});

// 문항 유형 분포 (실패 아님). 질문 문장의 표현으로 나눈다. 같은 규칙을 계속 써서 분포 변화를 지켜본다.
function part7QuestionType(question) {
  var q = question.q || "";
  if (/closest in meaning to/.test(q)) return "어휘(동의어)";
  if (/positions marked \[1\]/.test(q)) return "문장 삽입";
  if (/\bNOT\b/.test(q)) return "NOT";
  if (/mean when|mean by/.test(q)) return "의도 파악";
  if (/most likely|suggested|implied|imply|infer/.test(q)) return "추론";
  if (/purpose|Why (was|did|is) .*\b(written|write|sent|send)\b|mainly (about|discuss)|main topic/i.test(q)) return "주제·목적";
  return "세부사항";
}
var typeCounts = {}, typeTotal = 0;
passages.forEach(function (passage) {
  (passage.questions || []).forEach(function (question) {
    var type = part7QuestionType(question);
    typeCounts[type] = (typeCounts[type] || 0) + 1;
    typeTotal += 1;
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

console.log("\n[참고] Part 7 문항 유형 분포 (" + typeTotal + "문항, 질문 표현으로 분류) — 실패 아님");
["주제·목적", "세부사항", "추론", "NOT", "의도 파악", "어휘(동의어)", "문장 삽입"].forEach(function (type) {
  var count = typeCounts[type] || 0;
  console.log("  " + type + " " + count + " (" + Math.round(count / typeTotal * 100) + "%)");
});

console.log("\n[참고] 정답 위치 분포 — 실패 아님 (지문·세트 안 연속은 answerRun에서 실패로 센다)");
Object.keys(answerSpread).forEach(function (part) {
  var counts = answerSpread[part];
  var total = counts.reduce(function (sum, n) { return sum + n; }, 0);
  console.log("  " + part + " (" + total + "문항): " + counts.map(function (n, i) {
    return "ABCD"[i] + " " + n + " (" + Math.round(n / total * 100) + "%)";
  }).join(" · "));
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
    // 문장 삽입 표시: 데이터의 mark 순서대로 " [n]"이 문장 끝에 그려져야 한다 (없는 지문에는 없음).
    var expectedMarks = (passage.parts ? [].concat.apply([], passage.parts.map(function (part) { return part.sentences; })) : passage.sentences)
      .filter(function (s) { return s.mark; }).map(function (s) { return " [" + s.mark + "]"; });
    var shownMarks = exercise.querySelectorAll(".reading-insert-mark").map(function (node) { return node.textContent; });
    var marksOk = JSON.stringify(shownMarks) === JSON.stringify(expectedMarks);
    var ok = translations.length === expected && allShown && toggleVisible && layoutOk && marksOk;
    console.log("  " + passage.id + ": 문장 " + translations.length + "/" + expected + ", 지문 구획 " + parts.length +
      ", 구분선 " + dividers + ", 해석 전부 표시 " + allShown + (expectedMarks.length ? ", 삽입 표시 " + shownMarks.join("").trim() : "") +
      (marksOk ? "" : ", 삽입 표시 불일치 " + JSON.stringify(shownMarks)) + " → " + (ok ? "OK" : "실패"));
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
