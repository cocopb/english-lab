"use strict";

// 리스닝 데이터(DICTATION, PART2, PART3) 검사 + 가짜 DOM으로 리스닝 화면 로드 검사
// 실행: node tools/check-listening.js

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var root = path.join(__dirname, "..");
var dataPath = path.join(root, "data", "listening.js");
var context = { window: {} };
vm.runInNewContext(fs.readFileSync(dataPath, "utf8"), context, { filename: dataPath });

var dictation = context.window.DICTATION;
var part2 = context.window.PART2;
var part3 = context.window.PART3;
if (!Array.isArray(dictation) || !Array.isArray(part2) || !Array.isArray(part3)) {
  console.error("검사 실패: data/listening.js에서 DICTATION, PART2, PART3 배열을 찾을 수 없습니다.");
  process.exit(1);
}

// ---------- 1. 데이터 검사 ----------

var failures = {
  dictationFields: [],
  part2Choices: [],
  part2Answer: [],
  part3Structure: [],
  part3Choices: [],
  part3Answer: [],
  missingExplanation: [],
  duplicateIds: []
};
var seenIds = Object.create(null);

function nonEmpty(value) { return typeof value === "string" && value.trim() !== ""; }
function validAnswer(answer, choices) {
  return Number.isInteger(answer) && Array.isArray(choices) && answer >= 0 && answer < choices.length;
}
function checkId(id, label) {
  if (!nonEmpty(id)) { failures.duplicateIds.push({ id: label, reason: "id 없음" }); return; }
  if (seenIds[id]) failures.duplicateIds.push({ id: id, firstSeen: seenIds[id] });
  else seenIds[id] = label;
}

dictation.forEach(function (item, index) {
  item = item || {};
  var label = item.id || "받아쓰기 #" + (index + 1);
  checkId(item.id, label);
  var missing = [];
  if (!nonEmpty(item.text)) missing.push("text");
  if (!nonEmpty(item.ko)) missing.push("ko");
  if (!Number.isInteger(item.level)) missing.push("level");
  if (missing.length) failures.dictationFields.push({ id: label, missing: missing });
});

part2.forEach(function (item, index) {
  item = item || {};
  var label = item.id || "Part 2 #" + (index + 1);
  checkId(item.id, label);
  if (!Array.isArray(item.choices) || item.choices.length !== 3) {
    failures.part2Choices.push({ id: label, actual: Array.isArray(item.choices) ? item.choices.length : "배열 아님" });
  }
  if (!validAnswer(item.answer, item.choices)) failures.part2Answer.push({ id: label, answer: item.answer });
  if (!nonEmpty(item.explanation)) failures.missingExplanation.push({ id: label });
});

part3.forEach(function (dialogue, index) {
  dialogue = dialogue || {};
  var label = dialogue.id || "Part 3 #" + (index + 1);
  checkId(dialogue.id, label);
  var scriptOk = Array.isArray(dialogue.script) && dialogue.script.length > 0 &&
    dialogue.script.every(function (line) { return line && nonEmpty(line.speaker) && nonEmpty(line.text); });
  var questionsOk = Array.isArray(dialogue.questions) && dialogue.questions.length > 0;
  if (!scriptOk || !questionsOk) {
    failures.part3Structure.push({ id: label, script: scriptOk ? "OK" : "없음/형식 오류", questions: questionsOk ? "OK" : "없음" });
  }
  (dialogue.questions || []).forEach(function (question, qIndex) {
    question = question || {};
    var qLabel = label + " Q" + (qIndex + 1);
    if (!Array.isArray(question.choices) || question.choices.length !== 4) {
      failures.part3Choices.push({ id: qLabel, actual: Array.isArray(question.choices) ? question.choices.length : "배열 아님" });
    }
    if (!validAnswer(question.answer, question.choices)) failures.part3Answer.push({ id: qLabel, answer: question.answer });
    if (!nonEmpty(question.explanation)) failures.missingExplanation.push({ id: qLabel });
  });
});

var labels = {
  dictationFields: "받아쓰기 필수 필드(text, ko, level) 누락",
  part2Choices: "Part 2 선택지가 3개가 아님",
  part2Answer: "Part 2 정답 인덱스 오류",
  part3Structure: "Part 3 script/questions 누락",
  part3Choices: "Part 3 선택지가 4개가 아님",
  part3Answer: "Part 3 정답 인덱스 오류",
  missingExplanation: "해설(explanation) 비어 있음",
  duplicateIds: "ID 중복/누락"
};
var dataFailures = 0;
Object.keys(failures).forEach(function (key) {
  if (!failures[key].length) return;
  dataFailures += 1;
  console.log("✗ " + labels[key] + " (" + failures[key].length + "건)");
  failures[key].forEach(function (failure) { console.log("  " + JSON.stringify(failure)); });
});
var part3QuestionCount = part3.reduce(function (sum, d) { return sum + ((d && d.questions) || []).length; }, 0);
console.log("데이터: 받아쓰기 " + dictation.length + "문장, Part 2 " + part2.length + "문제, Part 3 대화 " +
  part3.length + "개(" + part3QuestionCount + "문항)" + (dataFailures ? "" : " — 이상 없음"));

// ---------- 2. 화면 로드 검사 (가짜 DOM) ----------

function FakeElement(tag) {
  this.tagName = tag.toUpperCase();
  this.children = [];
  this.parentNode = null;
  this.attrs = {};
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
FakeElement.prototype.appendChild = function (child) { child.parentNode = this; this.children.push(child); return child; };
FakeElement.prototype.append = function () { for (var i = 0; i < arguments.length; i += 1) this.appendChild(arguments[i]); };
FakeElement.prototype.replaceChildren = function () { this.children = []; this._text = ""; this.append.apply(this, arguments); };
FakeElement.prototype.setAttribute = function (key, value) { this.attrs[key] = String(value); if (key === "id") this.id = String(value); };
FakeElement.prototype.getAttribute = function (key) { return key in this.attrs ? this.attrs[key] : key === "id" && this.id ? this.id : null; };
FakeElement.prototype.removeAttribute = function (key) { delete this.attrs[key]; };
FakeElement.prototype.addEventListener = function (type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); };
FakeElement.prototype.click = function () {
  if (this.disabled) return;
  (this.listeners.click || []).forEach(function (fn) { fn({ key: "", preventDefault: function () {} }); });
};
FakeElement.prototype.focus = function () {};
FakeElement.prototype.descendants = function () {
  return this.children.reduce(function (list, child) { return list.concat(child, child.descendants()); }, []);
};
FakeElement.prototype.matches = function (selector) {
  var pattern = /\.([\w-]+)|\[([\w-]+)(?:(\^?=)"([^"]*)")?\]/g;
  var match;
  var ok = true;
  while ((match = pattern.exec(selector))) {
    if (match[1]) ok = ok && this.classList.contains(match[1]);
    else {
      var value = this.getAttribute(match[2]);
      if (!match[3]) ok = ok && value !== null;
      else ok = ok && value !== null && (match[3] === "=" ? value === match[4] : value.indexOf(match[4]) === 0);
    }
  }
  return ok;
};
FakeElement.prototype.querySelectorAll = function (selector) {
  return this.descendants().filter(function (node) { return node.matches(selector); });
};
FakeElement.prototype.querySelector = function (selector) { return this.querySelectorAll(selector)[0] || null; };

function runListeningPage() {
  var errors = [];
  function check(condition, message) { if (!condition) errors.push(message); }

  var body = new FakeElement("body");
  var html = fs.readFileSync(path.join(root, "pages", "listening.html"), "utf8");
  var tagPattern = /<(\w+)([^>]*?)\sid="([^"]+)"([^>]*)>/g;
  var match;
  while ((match = tagPattern.exec(html))) {
    var element = new FakeElement(match[1]);
    element.setAttribute("id", match[3]);
    var attrs = match[2] + " " + match[4];
    var role = /role="([^"]+)"/.exec(attrs);
    if (role) element.setAttribute("role", role[1]);
    var cls = /class="([^"]+)"/.exec(attrs);
    if (cls) element.className = cls[1];
    if (/\shidden(\s|$|=)/.test(" " + attrs)) element.hidden = true;
    body.appendChild(element);
  }

  var ready = null;
  var recorded = { dictation: 0, part2: 0, part3: 0 };
  var document = {
    createElement: function (tag) { return new FakeElement(tag); },
    createTextNode: function (text) { var node = new FakeElement("#text"); node._text = String(text); return node; },
    getElementById: function (id) { return body.descendants().find(function (node) { return node.id === id; }) || null; },
    querySelectorAll: function (selector) { return body.querySelectorAll(selector); },
    addEventListener: function (type, fn) { if (type === "DOMContentLoaded") ready = fn; }
  };
  var settings = { rate: 1, locale: "en-US", voiceSelected: false };
  var window = {
    document: document,
    addEventListener: function () {},
    Speech: {
      isSupported: function () { return false; },
      getSettings: function () { return Object.assign({}, settings); },
      saveSettings: function (next) { settings = Object.assign(settings, next); return Object.assign({}, settings); },
      getVoices: function () { return []; },
      getAvailableVoices: function () { return []; },
      isLocaleAvailable: function () { return false; },
      isVoiceUnavailable: function () { return false; },
      waitForVoices: function () { return Promise.resolve([]); },
      speak: function () { return Promise.resolve(); },
      stop: function () {}
    },
    Progress: {
      recordDictation: function () { recorded.dictation += 1; },
      recordListeningAnswer: function (type) { recorded[type] += 1; }
    }
  };
  var sandbox = { window: window, document: document, console: console, Promise: Promise };
  vm.createContext(sandbox);
  ["data/listening.js", "assets/js/listening.js"].forEach(function (file) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, { filename: file });
  });
  check(typeof ready === "function", "DOMContentLoaded 핸들러가 등록되지 않음");
  try { ready(); } catch (error) { errors.push("초기화 오류: " + error.message); return errors; }

  var $ = document.getElementById;
  var D = window.DICTATION;
  var P2 = window.PART2;
  var P3 = window.PART3;

  // 받아쓰기: 모든 문장을 차례로 채점하고 다음으로 넘긴다
  var seenDictation = [];
  D.forEach(function (item, index) {
    check($("dictation-counter").textContent === "문장 " + (index + 1) + " / " + D.length,
      "받아쓰기 카운터 — " + $("dictation-counter").textContent);
    check($("dictation-translation").textContent === item.ko, item.id + " 해석 불일치");
    $("dictation-input").value = item.text;
    $("dictation-check").click();
    check($("dictation-score").textContent !== "", item.id + " 채점 결과 없음");
    check($("dictation-next").hidden === false, item.id + " 채점 후 다음 버튼이 보이지 않음");
    seenDictation.push(item.id);
    $("dictation-next").click();
  });
  check(new Set(seenDictation).size === D.length, "받아쓰기 로드 수 " + new Set(seenDictation).size);
  check(recorded.dictation === D.length, "받아쓰기 기록 수 " + recorded.dictation);

  // Part 2: 모든 문제의 정답을 눌러 채점을 확인한다
  var seenPart2 = 0;
  P2.forEach(function (item, index) {
    check($("part2-counter").textContent === "문제 " + (index + 1) + " / " + P2.length,
      "Part 2 카운터 — " + $("part2-counter").textContent);
    check($("part2-script").textContent === item.question, item.id + " 스크립트 불일치");
    var buttons = $("part2-choices").querySelectorAll(".listening-choice-answer");
    check(buttons.length === item.choices.length, item.id + " 선택지 수 " + buttons.length);
    if (buttons[item.answer]) buttons[item.answer].click();
    check(buttons[item.answer] && buttons[item.answer].classList.contains("correct"), item.id + " 정답 표시 없음");
    check($("part2-feedback").textContent.indexOf("정답이에요!") === 0, item.id + " 정답 피드백 없음");
    check($("part2-feedback").textContent.indexOf(item.explanation) !== -1, item.id + " 해설 미표시");
    seenPart2 += 1;
    $("part2-next").click();
  });
  check(recorded.part2 === P2.length, "Part 2 기록 수 " + recorded.part2);

  // Part 3: 모든 대화의 스크립트와 문항을 끝까지 푼다
  var seenPart3 = 0;
  P3.forEach(function (dialogue, index) {
    check($("part3-counter").textContent === "대화 " + (index + 1) + " / " + P3.length + " · " + dialogue.title,
      "Part 3 카운터 — " + $("part3-counter").textContent);
    check($("part3-script").querySelectorAll(".listening-transcript-line").length === dialogue.script.length,
      dialogue.id + " 스크립트 줄 수 불일치");
    $("part3-start-questions").click();
    dialogue.questions.forEach(function (question, qIndex) {
      check($("part3-question").textContent === question.q, dialogue.id + " Q" + (qIndex + 1) + " 질문 불일치");
      var buttons = $("part3-choices").querySelectorAll(".listening-choice-answer");
      check(buttons.length === 4, dialogue.id + " Q" + (qIndex + 1) + " 선택지 수 " + buttons.length);
      buttons[question.answer].click();
      check($("part3-feedback").textContent.indexOf("정답이에요!") === 0, dialogue.id + " Q" + (qIndex + 1) + " 정답 피드백 없음");
      $("part3-next").click();
    });
    check($("part3-next-dialogue").hidden === false, dialogue.id + " 마지막 문항 후 다음 대화 버튼이 보이지 않음");
    seenPart3 += 1;
    $("part3-next-dialogue").click();
  });
  check(recorded.part3 === part3QuestionCount, "Part 3 기록 수 " + recorded.part3);
  // 마지막 다음 버튼 뒤에는 첫 항목으로 돌아와야 한다
  check($("dictation-counter").textContent === "문장 1 / " + D.length, "받아쓰기가 처음으로 돌아오지 않음");
  check($("part3-counter").textContent.indexOf("대화 1 / ") === 0, "Part 3가 처음으로 돌아오지 않음");

  console.log("화면: 받아쓰기 " + seenDictation.length + "문장, Part 2 " + seenPart2 + "문제, 대화 " + seenPart3 +
    "개 로드·채점 확인" + (errors.length ? "" : " — 이상 없음"));
  return errors;
}

var renderErrors = runListeningPage();
renderErrors.forEach(function (message) { console.log("✗ " + message); });

if (dataFailures || renderErrors.length) {
  console.log("검사 실패");
  process.exit(1);
}
console.log("모든 리스닝 검사 통과");
