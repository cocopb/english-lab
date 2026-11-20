"use strict";

// Part 1 사진 묘사(data/part1.js) 검사 + 가짜 DOM으로 리스닝 탭 Part 1 화면 검사
// 실행: node tools/check-part1.js  (외부 패키지 불필요)
//  1. 데이터: 24문항 · choices 4개 · answer 범위 · explanation · kind · id/img 형식
//  2. 이미지 파일이 실제로 있는지 (24개 모두, JPEG 시그니처까지)
//  3. 정답 위치: A~D 고르게 분포 · 바로 앞 문항과 같은 위치 연속 금지
//  4. 사진 alt: "Part 1 사진 N" 형식이고, 선택지 문장의 내용어가 들어가지 않음
//  5. 리스닝 탭: 사진 표시 · 네 선택지 음성 · 채점 전 문장 글자 없음 · 채점 후 네 문장과 해설 · 로딩 실패 대체 문구 · part1 기록

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var root = path.join(__dirname, "..");
var problems = [];
function check(condition, message) { if (!condition) problems.push(message); return !!condition; }
function nonEmpty(value) { return typeof value === "string" && value.trim() !== ""; }

var dataContext = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "data", "part1.js"), "utf8"), dataContext, { filename: "data/part1.js" });
var PART1 = dataContext.window.PART1;
if (!Array.isArray(PART1)) {
  console.error("검사 실패: data/part1.js에서 window.PART1 배열을 찾을 수 없습니다.");
  process.exit(1);
}

// ---------- 1. 데이터 ----------
var EXPECTED_COUNT = 24;
var ALLOWED_KEYS = ["id", "img", "kind", "choices", "answer", "explanation"];
check(PART1.length === EXPECTED_COUNT, "문항 수 " + PART1.length + " (기대 " + EXPECTED_COUNT + ")");
var seen = {};
PART1.forEach(function (item, index) {
  item = item || {};
  var label = item.id || "#" + (index + 1);
  var expectedId = "ph" + String(index + 1).padStart(2, "0");
  check(item.id === expectedId, label + " id가 순서와 다름 (기대 " + expectedId + ")");
  check(!seen[item.id], label + " id 중복");
  seen[item.id] = true;
  check(item.img === "assets/img/part1/" + item.id + ".jpg", label + " img 경로 " + item.img);
  check(item.kind === "people" || item.kind === "objects", label + " kind " + item.kind);
  check(Array.isArray(item.choices) && item.choices.length === 4 && item.choices.every(nonEmpty), label + " choices가 비어 있지 않은 4개가 아님");
  check(Array.isArray(item.choices) && new Set(item.choices).size === item.choices.length, label + " 같은 선택지 문장이 두 번 있음");
  check(Number.isInteger(item.answer) && item.answer >= 0 && item.answer < 4, label + " answer 범위 " + item.answer);
  check(nonEmpty(item.explanation), label + " explanation 비어 있음");
  // 장면 설명(alt·caption 등)을 데이터에 두지 않는다. 화면 코드가 중립적인 alt를 붙인다.
  var extra = Object.keys(item).filter(function (key) { return ALLOWED_KEYS.indexOf(key) === -1; });
  check(!extra.length, label + " 허용되지 않은 필드 " + extra.join(", ") + " (장면 설명은 정답을 노출함)");
});
var kinds = { people: 0, objects: 0 };
PART1.forEach(function (item) { if (item && kinds[item.kind] !== undefined) kinds[item.kind] += 1; });
// LC 풀세트가 사람 사진 최대 5장, 사물 사진 최대 2장을 뽑는다.
check(kinds.people >= 5 && kinds.objects >= 2, "LC 풀세트에 쓸 사진이 모자람 (사람 " + kinds.people + " / 사물 " + kinds.objects + ")");
var choiceOwner = {};
PART1.forEach(function (item) {
  ((item && item.choices) || []).forEach(function (choice, index) {
    if (index !== item.answer) return;
    if (choiceOwner[choice]) problems.push(item.id + " 정답 문장이 " + choiceOwner[choice] + "의 정답과 같음");
    choiceOwner[choice] = item.id;
  });
});
console.log("데이터: " + PART1.length + "문항 (사람 사진 " + kinds.people + " · 사물 사진 " + kinds.objects + ")");

// ---------- 2. 이미지 파일 ----------
var MAX_BYTES = 300 * 1024;
var totalBytes = 0, filesOk = 0;
PART1.forEach(function (item) {
  if (!item || typeof item.img !== "string") return;
  var file = path.join(root, item.img);
  if (!check(fs.existsSync(file), item.id + " 이미지 파일 없음: " + item.img)) return;
  var buffer = fs.readFileSync(file);
  totalBytes += buffer.length;
  check(buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF, item.id + " JPEG 파일이 아님");
  check(buffer.length <= MAX_BYTES, item.id + " 용량 " + Math.round(buffer.length / 1024) + "KB (300KB 초과)");
  filesOk += 1;
});
var dirFiles = fs.existsSync(path.join(root, "assets/img/part1")) ? fs.readdirSync(path.join(root, "assets/img/part1")) : [];
var unused = dirFiles.filter(function (name) { return !PART1.some(function (item) { return item && item.img === "assets/img/part1/" + name; }); });
check(!unused.length, "데이터에서 쓰지 않는 이미지 파일: " + unused.join(", "));
console.log("이미지: " + filesOk + " / " + PART1.length + "개 존재 · 합계 " + Math.round(totalBytes / 1024) + "KB");

// ---------- 3. 정답 위치 ----------
var spread = [0, 0, 0, 0];
var previous = null;
PART1.forEach(function (item) {
  if (!item || !Number.isInteger(item.answer)) return;
  spread[item.answer] += 1;
  if (previous && previous.answer === item.answer) problems.push(item.id + " 정답 위치가 바로 앞 " + previous.id + "와 같음 (" + "ABCD"[item.answer] + ")");
  previous = item;
});
var fair = PART1.length / 4;
spread.forEach(function (count, index) {
  check(Math.abs(count - fair) <= 1, "정답 위치 " + "ABCD"[index] + "가 " + count + "개 (고르게 " + fair + "개 안팎이어야 함)");
});
console.log("정답 위치: " + spread.map(function (count, index) { return "ABCD"[index] + " " + count; }).join(" · "));

// ---------- 4·5. 가짜 DOM 리스닝 화면 ----------
function FakeElement(tag) {
  this.tagName = String(tag).toUpperCase();
  this.children = [];
  this.attrs = {};
  this.listeners = {};
  this.hidden = false;
  this.disabled = false;
  this.className = "";
  this.id = "";
  this.value = "";
  this._text = "";
  this.parentNode = null;
  var self = this;
  function classes() { return self.className.split(/\s+/).filter(Boolean); }
  this.classList = {
    add: function (name) { if (classes().indexOf(name) === -1) self.className = classes().concat(name).join(" "); },
    remove: function (name) { self.className = classes().filter(function (c) { return c !== name; }).join(" "); },
    contains: function (name) { return classes().indexOf(name) !== -1; },
    toggle: function (name, force) {
      var on = force === undefined ? !this.contains(name) : !!force;
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
FakeElement.prototype.getAttribute = function (key) { return key in this.attrs ? this.attrs[key] : null; };
FakeElement.prototype.removeAttribute = function (key) { delete this.attrs[key]; };
FakeElement.prototype.addEventListener = function (type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); };
FakeElement.prototype.dispatch = function (type) {
  var self = this;
  (this.listeners[type] || []).forEach(function (fn) { fn.call(self, { key: "", preventDefault: function () {} }); });
};
FakeElement.prototype.click = function () { if (!this.disabled) this.dispatch("click"); };
FakeElement.prototype.focus = function () {};
FakeElement.prototype.descendants = function () {
  return this.children.reduce(function (list, child) { return list.concat(child, child.descendants()); }, []);
};
FakeElement.prototype.matches = function (selector) {
  var self = this;
  return selector.split(",").some(function (part) {
    // .class, [attr="v"], [attr^="v"] 조합만 지원한다 (화면 코드가 쓰는 범위).
    var re = /\.([\w-]+)|\[([\w-]+)(\^?=)"([^"]*)"\]/g;
    var m, ok = true, any = false;
    while ((m = re.exec(part))) {
      any = true;
      if (m[1]) ok = ok && self.classList.contains(m[1]);
      else {
        var v = m[2] === "id" ? self.id : self.getAttribute(m[2]);
        ok = ok && v !== null && v !== "" && (m[3] === "=" ? v === m[4] : v.indexOf(m[4]) === 0);
      }
    }
    return any && ok;
  });
};
FakeElement.prototype.querySelectorAll = function (selector) {
  return this.descendants().filter(function (node) { return node.matches(selector); });
};
FakeElement.prototype.querySelector = function (selector) { return this.querySelectorAll(selector)[0] || null; };

function flush() { return new Promise(function (resolve) { setImmediate(resolve); }); }
function FakeUtterance(text) { this.text = text; this.volume = 1; this.lang = ""; this.voice = null; this.rate = 1; }

// withSpeech: 실제 speech.js + 가짜 speechSynthesis (영어 음성 있음). false면 음성 미지원 브라우저.
function loadListeningPage(withSpeech) {
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
    var alt = /\salt="([^"]*)"/.exec(" " + attrs);
    if (alt) element.setAttribute("alt", alt[1]);
    if (/\shidden(\s|$|=)/.test(" " + attrs)) element.hidden = true;
    element.htmlText = (new RegExp("id=\"" + match[3] + "\"[^>]*>([^<]*)<")).exec(html);
    if (element.htmlText) element._text = element.htmlText[1];
    body.appendChild(element);
  }
  var ready = null;
  var document = {
    createElement: function (tag) { return new FakeElement(tag); },
    createTextNode: function (text) { var node = new FakeElement("#text"); node._text = String(text); return node; },
    getElementById: function (id) { return body.descendants().find(function (node) { return node.id === id; }) || null; },
    querySelectorAll: function (selector) { return body.querySelectorAll(selector); },
    addEventListener: function (type, fn) { if (type === "DOMContentLoaded") ready = fn; },
    removeEventListener: function () {}
  };
  var synth = null;
  if (withSpeech) {
    synth = {
      voices: [
        { name: "Microsoft Zira", lang: "en-US", voiceURI: "zira", localService: true },
        { name: "Microsoft David", lang: "en-US", voiceURI: "david", localService: true }
      ],
      queue: [],
      getVoices: function () { return synth.voices.slice(); },
      speak: function (utterance) { synth.queue.push(utterance); },
      cancel: function () {}, pause: function () {}, resume: function () {},
      addEventListener: function () {}, removeEventListener: function () {}
    };
  }
  var recorded = [];
  var window = {
    document: document,
    location: { hostname: "example.github.io" },
    addEventListener: function () {},
    setTimeout: function () { return 1; }, clearTimeout: function () {},
    setInterval: function () { return 1; }, clearInterval: function () {},
    Progress: {
      recordDictation: function () {},
      recordListeningAnswer: function (type, isCorrect) { recorded.push({ type: type, correct: isCorrect }); }
    }
  };
  if (synth) { window.speechSynthesis = synth; window.SpeechSynthesisUtterance = FakeUtterance; }
  var store = new Map();
  var localStorage = {
    getItem: function (k) { return store.has(k) ? store.get(k) : null; },
    setItem: function (k, v) { store.set(k, String(v)); },
    removeItem: function (k) { store.delete(k); }
  };
  var sandbox = { window: window, document: document, localStorage: localStorage, Promise: Promise,
    console: { info: function () {}, warn: function () {}, log: console.log, error: console.error } };
  vm.createContext(sandbox);
  ["assets/js/speech.js", "data/listening.js", "data/part1.js", "assets/js/listening-voices.js", "assets/js/listening.js"].forEach(function (file) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, { filename: file });
  });
  ready();
  return { $: document.getElementById, body: body, window: window, synth: synth, recorded: recorded };
}

// 선택지 문장의 내용어 (기능어·대명사 제외, 3글자 이상). 어미를 떼어 비교한다(leaning → lean).
var STOPWORDS = ("the a an some of on in at to into onto over under by with for from near next and or but is are was were be been being has have had " +
  "they they're their them he he's his him she she's her it it's its one two both someone people person man men woman women there this that these those " +
  "who what each other up out down along around against").split(/\s+/);
function stem(word) { return word.replace(/(ing|ed|es|s)$/, ""); }
function contentWords(text) {
  return text.toLowerCase().replace(/[^a-z' ]/g, " ").split(/\s+/).filter(function (word) {
    return word.length >= 3 && STOPWORDS.indexOf(word) === -1;
  }).map(stem);
}
// 두 검사를 따로 한다: (1) 선택지 내용어가 들어갔는지 (2) "Part 1 사진 N" 형식인지.
// (2)가 있어 한국어 장면 설명(사람·책상·상자 등)을 붙여도 실패한다.
function altProblem(alt, item, position) {
  var issues = [];
  var altWords = contentWords(alt || "");
  var leaked = [];
  item.choices.forEach(function (choice) {
    contentWords(choice).forEach(function (word) {
      if (altWords.indexOf(word) !== -1 && leaked.indexOf(word) === -1) leaked.push(word);
    });
  });
  if (leaked.length) issues.push("선택지 내용어가 들어감: " + leaked.join(", "));
  if (alt !== "Part 1 사진 " + position) issues.push("형식이 \"Part 1 사진 " + position + "\"이 아님: " + JSON.stringify(alt));
  return issues.length ? issues.join(" / ") : null;
}

(async function () {
  // --- 음성 지원 브라우저 ---
  var page = loadListeningPage(true);
  var $ = page.$;
  var P1 = page.window.PART1;
  check($("listening-tab-part1") && $("listening-panel-part1"), "Part 1 탭/영역 없음");
  check($("listening-tab-part1").textContent === "사진 묘사", "Part 1 탭 이름 — " + $("listening-tab-part1").textContent);
  // 탭 전환
  $("listening-tab-part1").click();
  check(!$("listening-panel-part1").hidden && $("listening-panel-dictation").hidden && $("listening-tab-part1").getAttribute("aria-selected") === "true",
    "Part 1 탭을 눌러도 영역이 열리지 않음");
  var htmlAlt = (/id="part1-photo"[^>]*\salt="([^"]*)"/.exec(fs.readFileSync(path.join(root, "pages", "listening.html"), "utf8")) || [])[1];
  var altResults = [];
  var screenProblems = [];
  for (var index = 0; index < P1.length; index += 1) {
    var item = P1[index];
    var label = item.id;
    var photo = $("part1-photo");
    var panel = page.body; // 가짜 DOM은 평면 구조라 화면 전체 글자로 본다
    if ($("part1-counter").textContent !== "사진 " + (index + 1) + " / " + P1.length) screenProblems.push(label + " 카운터 " + $("part1-counter").textContent);
    if (photo.tagName !== "IMG" || photo.hidden || photo.getAttribute("src") !== "../" + item.img) screenProblems.push(label + " 사진 표시 — src " + photo.getAttribute("src"));
    var altIssue = altProblem(photo.getAttribute("alt"), item, index + 1);
    if (altIssue) altResults.push(label + " " + altIssue);
    if (!$("part1-photo-fallback").hidden) screenProblems.push(label + " 대체 문구가 처음부터 보임");
    var answers = $("part1-choices").querySelectorAll(".listening-choice-answer");
    var plays = $("part1-choices").querySelectorAll(".listening-choice-play");
    if (answers.map(function (b) { return b.textContent; }).join("") !== "(A)(B)(C)(D)") screenProblems.push(label + " 채점 전 선택지 — " + answers.map(function (b) { return b.textContent; }).join(" | "));
    // 채점 전에는 화면 어디에도 문장 글자가 없어야 한다
    if (item.choices.some(function (choice) { return panel.textContent.indexOf(choice) !== -1 || $("part1-feedback").textContent.indexOf(choice) !== -1; })) screenProblems.push(label + " 채점 전에 선택지 문장이 보임");
    if (panel.textContent.indexOf(item.explanation) !== -1 || $("part1-feedback").textContent) screenProblems.push(label + " 채점 전에 해설이 보임");
    // (A)~(D) 버튼: 각자 자기 문장만 읽는다
    var spoken = [];
    for (var p = 0; p < plays.length; p += 1) {
      page.synth.queue = [];
      plays[p].click();
      var utterance = page.synth.queue[0];
      spoken.push(page.synth.queue.length === 1 && utterance ? utterance.text : "(재생 " + page.synth.queue.length + "회)");
      if (utterance && utterance.lang !== "en-US") screenProblems.push(label + " 음성 언어 " + utterance.lang);
      if (utterance && utterance.onend) utterance.onend();
      await flush();
    }
    if (spoken.join("|") !== item.choices.join("|")) screenProblems.push(label + " (A)~(D) 재생 문장 불일치 — " + spoken.join(" / "));
    if (plays.map(function (b) { return b.getAttribute("aria-label"); }).join("|") !== "(A) 문장 듣기|(B) 문장 듣기|(C) 문장 듣기|(D) 문장 듣기") screenProblems.push(label + " 재생 버튼 aria-label");
    // 차례로 듣기: A. → B. → C. → D. 를 한 번씩
    page.synth.queue = [];
    $("part1-play-all").click();
    var allSpoken = [];
    for (var guard = 0; guard < 10 && page.synth.queue.length; guard += 1) {
      var u = page.synth.queue.shift();
      allSpoken.push(u.text);
      if (u.onend) u.onend();
      await flush(); await flush();
    }
    var expectedAll = item.choices.map(function (choice, i) { return "ABCD"[i] + ". " + choice; });
    if (allSpoken.join("|") !== expectedAll.join("|")) screenProblems.push(label + " 차례로 듣기 — " + allSpoken.join(" / "));
    if ($("part1-play-all").disabled) screenProblems.push(label + " 차례로 듣기가 끝나도 버튼이 막혀 있음");
    if (item.choices.some(function (choice) { return panel.textContent.indexOf(choice) !== -1; })) screenProblems.push(label + " 듣고 난 뒤 채점 전에 문장이 보임");
    // 채점: 짝수 번째는 정답, 홀수 번째는 오답을 고른다
    var pick = index % 2 === 0 ? item.answer : (item.answer + 1) % 4;
    if ($("part1-next").hidden !== true) screenProblems.push(label + " 채점 전에 다음 버튼이 보임");
    answers[pick].click();
    var after = $("part1-choices").querySelectorAll(".listening-choice-answer");
    var texts = after.map(function (b) { return b.textContent; });
    if (texts.join("|") !== item.choices.map(function (choice, i) { return "(" + "ABCD"[i] + ") " + choice; }).join("|")) screenProblems.push(label + " 채점 후 네 문장이 보이지 않음 — " + texts.join(" | "));
    if (!after[item.answer].classList.contains("correct")) screenProblems.push(label + " 정답 표시 없음");
    if (pick !== item.answer && !after[pick].classList.contains("incorrect")) screenProblems.push(label + " 오답 표시 없음");
    if (!after.every(function (b) { return b.disabled; })) screenProblems.push(label + " 채점 후 선택지가 다시 눌림");
    var feedback = $("part1-feedback").textContent;
    if (feedback.indexOf(pick === item.answer ? "정답이에요!" : "아쉬워요.") !== 0) screenProblems.push(label + " 채점 안내 — " + feedback.slice(0, 20));
    if (feedback.indexOf(item.explanation) === -1) screenProblems.push(label + " 해설 미표시");
    if ($("part1-next").hidden) screenProblems.push(label + " 채점 후 다음 버튼이 보이지 않음");
    $("part1-next").click();
  }
  check(htmlAlt === "", "listening.html의 사진 alt 초기값이 비어 있지 않음: " + htmlAlt);
  check(!altResults.length, "[alt] " + altResults.join(" ; "));
  check(!screenProblems.length, "[리스닝 탭 Part 1] " + screenProblems.slice(0, 8).join(" ; ") + (screenProblems.length > 8 ? " … 외 " + (screenProblems.length - 8) + "건" : ""));
  check($("part1-counter").textContent === "사진 1 / " + P1.length, "마지막 다음 사진 뒤 처음으로 돌아오지 않음 — " + $("part1-counter").textContent);
  var part1Records = page.recorded.filter(function (r) { return r.type === "part1"; });
  check(part1Records.length === P1.length && page.recorded.length === P1.length, "정답률 기록이 part1으로 " + P1.length + "번 되지 않음 (" + JSON.stringify(page.recorded.slice(0, 3)) + ")");
  check(part1Records.filter(function (r) { return r.correct; }).length === Math.ceil(P1.length / 2), "part1 정답 기록 수");

  // 사진 로딩 실패 → 사진 숨김 + 대체 문구, 다음 사진에서는 다시 사진 표시
  $("part1-photo").dispatch("error");
  check($("part1-photo").hidden === true && $("part1-photo-fallback").hidden === false, "사진 로딩 실패 시 대체 문구가 보이지 않음");
  var fallbackText = $("part1-photo-fallback").textContent;
  check(fallbackText.indexOf("사진을 불러오지 못했어요") !== -1, "대체 문구 내용 — " + fallbackText);
  check(!P1[0].choices.some(function (choice) { return contentWords(fallbackText).some(function (w) { return contentWords(choice).indexOf(w) !== -1; }); }), "대체 문구에 선택지 내용어가 들어감");
  $("part1-choices").querySelectorAll(".listening-choice-answer")[0].click();
  $("part1-next").click();
  check($("part1-photo").hidden === false && $("part1-photo-fallback").hidden === true, "다음 사진에서 사진이 다시 보이지 않음");
  $("part1-photo").dispatch("error");
  $("part1-photo").dispatch("load");
  check($("part1-photo").hidden === false && $("part1-photo-fallback").hidden === true, "사진을 다시 불러오면 대체 문구가 사라져야 함");

  // --- 음성 미지원 브라우저: 문장을 글자로 보여 줘야 풀 수 있다 ---
  var none = loadListeningPage(false);
  var first = none.window.PART1[0];
  var noneTexts = none.$("part1-choices").querySelectorAll(".listening-choice-answer").map(function (b) { return b.textContent; });
  check(noneTexts.join("|") === first.choices.map(function (choice, i) { return "(" + "ABCD"[i] + ") " + choice; }).join("|"), "[미지원] 선택지 문장이 보이지 않음 — " + noneTexts.join(" | "));
  check(none.$("part1-play-all").disabled && none.$("part1-choices").querySelectorAll(".listening-choice-play").every(function (b) { return b.disabled; }), "[미지원] 재생 버튼이 활성화되어 있음");
  check(none.$("part1-photo").getAttribute("alt") === "Part 1 사진 1" && none.$("part1-photo").getAttribute("src") === "../" + first.img, "[미지원] 사진 표시");

  console.log("화면: 리스닝 탭 Part 1 사진 " + P1.length + "장 — 사진·alt·(A)~(D) 음성·차례로 듣기·채점 전 글자 없음·채점 후 문장과 해설·로딩 실패 대체 문구·part1 기록 확인");

  if (problems.length) {
    problems.forEach(function (message) { console.log("✗ " + message); });
    console.log("검사 실패 (" + problems.length + "건)");
    process.exit(1);
  }
  console.log("모든 Part 1 검사 통과");
}()).catch(function (error) {
  console.log("✗ 검사 실행 오류: " + error.stack);
  process.exit(1);
});
