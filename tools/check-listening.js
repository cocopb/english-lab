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
  var self = this;
  (this.listeners.click || []).forEach(function (fn) { fn.call(self, { key: "", preventDefault: function () {} }); });
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
      hasEnglishVoices: function () { return false; },
      UNSUPPORTED_MESSAGE: "이 브라우저는 음성 재생을 지원하지 않습니다. 크롬으로 열면 음성이 재생됩니다.",
      NO_ENGLISH_VOICE_HINT: "기기에 영어 음성이 없으면 소리가 나지 않을 수 있습니다. 크롬으로 열면 음성이 재생됩니다.",
      VOICES_UNUSABLE_MESSAGE: "설치된 영어 음성을 재생할 수 없습니다.",
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

// ---------- 3. 음성 재생 검사 (실제 speech.js + 가짜 speechSynthesis) ----------
// mode: "mobile"  — speechSynthesis는 있지만 getVoices()가 빈 배열 (모바일 첫 로드 상황)
//       "desktop" — 영어 음성이 이미 로드된 상황 (회귀 확인)
//       "none"    — speechSynthesis 자체가 없는 브라우저

function flush() { return new Promise(function (resolve) { setImmediate(resolve); }); }

function createFakeSynth(voices) {
  var synth = {
    voices: voices,
    queue: [],
    speaking: false,
    listeners: {},
    getVoices: function () { return synth.voices.slice(); },
    speak: function (utterance) { synth.queue.push(utterance); },
    cancel: function () {},
    pause: function () {},
    resume: function () {},
    addEventListener: function (type, fn) { (synth.listeners[type] = synth.listeners[type] || []).push(fn); },
    removeEventListener: function (type, fn) {
      synth.listeners[type] = (synth.listeners[type] || []).filter(function (f) { return f !== fn; });
    },
    fire: function (type) { (synth.listeners[type] || []).slice().forEach(function (fn) { fn({}); }); }
  };
  return synth;
}

function FakeUtterance(text) { this.text = text; this.volume = 1; this.lang = ""; this.voice = null; this.rate = 1; }

function loadListeningWithRealSpeech(mode) {
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
  var docListeners = {};
  var document = {
    createElement: function (tag) { return new FakeElement(tag); },
    createTextNode: function (text) { var node = new FakeElement("#text"); node._text = String(text); return node; },
    getElementById: function (id) { return body.descendants().find(function (node) { return node.id === id; }) || null; },
    querySelectorAll: function (selector) { return body.querySelectorAll(selector); },
    addEventListener: function (type, fn) {
      if (type === "DOMContentLoaded") ready = fn;
      else (docListeners[type] = docListeners[type] || []).push(fn);
    },
    removeEventListener: function (type, fn) {
      docListeners[type] = (docListeners[type] || []).filter(function (f) { return f !== fn; });
    }
  };
  var desktopVoices = [
    { name: "Microsoft Zira", lang: "en-US", voiceURI: "zira", localService: true },
    { name: "Microsoft Hazel", lang: "en-GB", voiceURI: "hazel", localService: true },
    { name: "Microsoft Heami", lang: "ko-KR", voiceURI: "heami", localService: true }
  ];
  var synth = mode === "none" ? null : createFakeSynth(mode === "desktop" ? desktopVoices : []);
  var store = new Map();
  var window = {
    document: document,
    location: { hostname: "example.github.io" },
    addEventListener: function () {},
    setTimeout: function () { return 1; }, // waitForVoices의 2초 대기는 실행하지 않는다
    clearTimeout: function () {},
    setInterval: function () { return 1; },
    clearInterval: function () {},
    Progress: { recordDictation: function () {}, recordListeningAnswer: function () {} }
  };
  if (synth) {
    window.speechSynthesis = synth;
    window.SpeechSynthesisUtterance = FakeUtterance;
  }
  var localStorage = {
    getItem: function (k) { return store.has(k) ? store.get(k) : null; },
    setItem: function (k, v) { store.set(k, String(v)); },
    removeItem: function (k) { store.delete(k); }
  };
  var sandbox = { window: window, document: document, localStorage: localStorage, console: { info: function () {}, warn: function () {}, log: console.log, error: console.error }, Promise: Promise };
  vm.createContext(sandbox);
  ["assets/js/speech.js", "data/listening.js", "assets/js/listening.js"].forEach(function (file) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, { filename: file });
  });
  ready();
  return { $: document.getElementById, synth: synth, docListeners: docListeners, window: window };
}

async function runSpeechScenarios() {
  var errors = [];
  function check(condition, message) { if (!condition) errors.push(message); }
  var UNSUPPORTED = /지원하지 않/;

  // --- 모바일: 음성 목록이 비어 있음 ---
  var m = loadListeningWithRealSpeech("mobile");
  var $ = m.$;
  check(!UNSUPPORTED.test($("listening-support-note").textContent), "[모바일] 음성 목록이 비었는데 미지원 안내가 뜸 — " + $("listening-support-note").textContent);
  check(!$("dictation-play").disabled && !$("part3-play").disabled, "[모바일] 재생 버튼이 비활성화됨");
  check($("listening-voice-diagnostics").textContent === "기기에 영어 음성이 없으면 소리가 나지 않을 수 있습니다. 크롬으로 열면 음성이 재생됩니다.",
    "[모바일] 영어 음성 없음 안내 — " + $("listening-voice-diagnostics").textContent);
  check($("part2-script").hidden === true, "[모바일] 미지원처럼 Part 2 스크립트가 처음부터 펼쳐짐");

  // 첫 사용자 입력 → 소리 없는 빈 utterance로 엔진을 한 번만 깨운다
  (m.docListeners.click || []).slice().forEach(function (fn) { fn({}); });
  check(m.synth.queue.length === 1 && m.synth.queue[0].text === "" && m.synth.queue[0].volume === 0,
    "[모바일] 첫 클릭 때 무음 깨우기 utterance가 한 번 실행되지 않음 — " + JSON.stringify(m.synth.queue.map(function (u) { return [u.text, u.volume]; })));
  (m.docListeners.click || []).slice().forEach(function (fn) { fn({}); });
  (m.docListeners.touchend || []).slice().forEach(function (fn) { fn({}); });
  check(m.synth.queue.length === 1, "[모바일] 깨우기가 두 번 이상 실행됨");
  m.synth.queue = [];

  // 재생 버튼 → await 없이 같은 클릭 안에서 speechSynthesis.speak()가 호출되어야 한다
  $("dictation-play").click();
  check(m.synth.queue.length === 1, "[모바일] 받아쓰기 재생 클릭 직후 speak()가 동기적으로 호출되지 않음 (" + m.synth.queue.length + "회)");
  var utterance = m.synth.queue[0];
  if (utterance) {
    check(utterance.text === m.window.DICTATION[0].text, "[모바일] 재생 문장 불일치");
    check(utterance.lang === "en-US" && !utterance.voice, "[모바일] 음성 목록이 비었을 때 voice 없이 en-US로 재생해야 함 — lang " + utterance.lang);
    check($("dictation-message").textContent === "", "[모바일] 재생 중 안내가 표시됨 — " + $("dictation-message").textContent);
    utterance.onstart();
    check($("dictation-message").textContent === "", "[모바일] 재생 시작 후 안내가 남아 있음");
    utterance.onend();
    await flush();
    check($("dictation-message").textContent === "", "[모바일] 재생 종료 후 안내가 표시됨 — " + $("dictation-message").textContent);
    check(!$("dictation-play").disabled, "[모바일] 재생 종료 후 버튼이 다시 활성화되지 않음");
  }

  // Part 3 대화: 첫 대사도 클릭 안에서 바로 재생
  m.synth.queue = [];
  $("part3-play").click();
  check(m.synth.queue.length === 1 && m.synth.queue[0].text === m.window.PART3[0].script[0].text,
    "[모바일] Part 3 첫 대사가 클릭 직후 재생되지 않음 (" + m.synth.queue.length + "회)");
  m.window.Speech.stop();
  await flush();

  // 실제 오류(onerror)가 났을 때만 안내 — 3단계 재시도 후 실패 문구
  m.synth.queue = [];
  $("dictation-play").click();
  for (var attempt = 1; attempt <= 3; attempt++) {
    var current = m.synth.queue[m.synth.queue.length - 1];
    check(m.synth.queue.length === attempt, "[모바일] 재시도 " + attempt + "회차 speak 호출 수 " + m.synth.queue.length);
    if (!current) break;
    if (attempt < 3) check($("dictation-message").textContent === "", "[모바일] 재시도 중 오류 안내가 먼저 표시됨");
    current.onerror({ error: "synthesis-failed" });
  }
  await flush();
  check($("dictation-message").textContent === "음성 재생에 실패했습니다: synthesis-failed. 크롬으로 열면 음성이 재생됩니다.",
    "[모바일] 실제 실패 시 오류 안내 — " + $("dictation-message").textContent);

  // 나중에 음성 목록이 채워지면 안내가 갱신된다
  m.synth.voices = [{ name: "Samantha", lang: "en-US", voiceURI: "samantha", localService: true }];
  m.synth.fire("voiceschanged");
  check($("listening-voice-diagnostics").textContent === "사용 가능한 영어 음성: 1개",
    "[모바일] 음성 로드 후 안내 갱신 — " + $("listening-voice-diagnostics").textContent);

  // --- 데스크톱 회귀: 음성이 이미 있음 ---
  var d = loadListeningWithRealSpeech("desktop");
  $ = d.$;
  check(!UNSUPPORTED.test($("listening-support-note").textContent), "[데스크톱] 미지원 안내가 뜸");
  check($("listening-voice-diagnostics").textContent === "사용 가능한 영어 음성: 2개", "[데스크톱] 음성 수 — " + $("listening-voice-diagnostics").textContent);
  check($("listening-locale-field").hidden === false && !$("listening-locale").disabled, "[데스크톱] 억양 선택이 비활성화됨");
  d.synth.queue = [];
  $("dictation-play").click();
  check(d.synth.queue.length === 1 && d.synth.queue[0].lang === "en-US", "[데스크톱] 기본 재생 — " + d.synth.queue.length + "회");
  d.synth.queue[0] && d.synth.queue[0].onend();
  await flush();
  check(!$("dictation-play").disabled && $("dictation-message").textContent === "", "[데스크톱] 재생 종료 처리");
  var localeSelect = $("listening-locale");
  localeSelect.value = "en-GB";
  (localeSelect.listeners.change || []).forEach(function (fn) { fn({}); });
  d.synth.queue = [];
  $("dictation-play").click();
  var gb = d.synth.queue[0];
  check(gb && gb.voice && gb.voice.name === "Microsoft Hazel" && gb.lang === "en-GB",
    "[데스크톱] 영국식 선택 시 en-GB 음성으로 재생 — " + (gb && (gb.voice ? gb.voice.name : "voice 없음") + " / " + gb.lang));
  gb && gb.onend();
  await flush();

  // --- Part 2 전 문항: 질문 → (A) → (B) → (C) 순서로 각 버튼이 해당 문장만 읽는지 ---
  var p2Items = d.window.PART2;
  var p2Order = [];
  for (var p2 = 0; p2 < p2Items.length; p2 += 1) {
    var item2 = p2Items[p2];
    var spoken = [];
    var playOne = async function (button) {
      d.synth.queue = [];
      button.click();
      var utterance = d.synth.queue[0];
      spoken.push(d.synth.queue.length === 1 && utterance ? utterance.text : "(재생 " + d.synth.queue.length + "회)");
      if (utterance && utterance.onend) utterance.onend();
      await flush();
    };
    await playOne($("part2-play-question"));
    var plays = $("part2-choices").querySelectorAll(".listening-choice-play");
    for (var c2 = 0; c2 < plays.length; c2 += 1) await playOne(plays[c2]);
    var expectedOrder = [item2.question].concat(item2.choices);
    if (spoken.join("|") !== expectedOrder.join("|")) p2Order.push(item2.id + ": " + spoken.join(" / "));
    var answers2 = $("part2-choices").querySelectorAll(".listening-choice-answer");
    answers2[item2.answer].click();
    $("part2-next").click();
  }
  check(p2Order.length === 0, "[데스크톱] Part 2 재생 순서(질문→A→B→C) 불일치 — " + p2Order.join(" ; "));
  console.log("음성: Part 2 " + p2Items.length + "문항 질문·선택지 재생 순서 확인" + (p2Order.length ? " — 불일치 " + p2Order.length + "개" : " — 이상 없음"));

  // --- speechSynthesis 자체가 없는 브라우저 ---
  var n = loadListeningWithRealSpeech("none");
  $ = n.$;
  check($("listening-support-note").textContent === "이 브라우저는 음성 재생을 지원하지 않습니다. 크롬으로 열면 음성이 재생됩니다. 텍스트로 학습할 수 있어요.",
    "[미지원] 안내 문구 — " + $("listening-support-note").textContent);
  check($("dictation-play").disabled, "[미지원] 재생 버튼이 활성화되어 있음");

  console.log("음성: 모바일(음성 목록 비어 있음)·데스크톱(회귀)·미지원 브라우저 시나리오" + (errors.length ? "" : " — 이상 없음"));
  return errors;
}

(async function () {
  var renderErrors = runListeningPage();
  renderErrors.forEach(function (message) { console.log("✗ " + message); });
  var speechErrors = await runSpeechScenarios();
  speechErrors.forEach(function (message) { console.log("✗ " + message); });

  if (dataFailures || renderErrors.length || speechErrors.length) {
    console.log("검사 실패");
    process.exit(1);
  }
  console.log("모든 리스닝 검사 통과");
}());
