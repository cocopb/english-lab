"use strict";

// Part 1 사진 묘사(data/part1.js) 검사 + 가짜 DOM으로 리스닝 탭 Part 1 화면 검사
// 실행: node tools/check-part1.js  (외부 패키지 불필요)
//  1. 데이터: 문항 수(데이터에서 읽음, 고정 개수 없음) · choices 4개 · answer 범위 · explanation · kind · id/img 형식
//     + 문장 중복: 서로 다른 사진의 정답끼리, 한 사진 안의 선택지끼리 (기준은 아래 sentenceOverlap 주석)
//  2. 이미지 파일이 실제로 있는지 (데이터의 사진 모두, JPEG 시그니처까지. 쓰지 않는 파일도 실패) + 표시 크기가 원본 픽셀 크기와 무관한지
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
var ALLOWED_KEYS = ["id", "img", "kind", "choices", "answer", "explanation"];
// 문항 수는 고정하지 않는다. 사진을 늘릴 때마다 검사를 고치지 않게, 데이터와 이미지 폴더가 서로 맞는지(아래 2절)만 본다.
check(PART1.length > 0, "문항이 없음");
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
console.log("데이터: " + PART1.length + "문항 (사람 사진 " + kinds.people + " · 사물 사진 " + kinds.objects + ")");

// ---------- 1-2. 문장 중복 ----------
// LC 풀세트는 사진 6장을 한 세트로 내므로, 다른 사진의 정답이 비슷하면 "같은 문장을 또 들었다"고 느껴진다.
// 문법 노트 예문 중복 검사(check-grammar.js)의 방식을 Part 1의 짧은 문장에 맞게 고쳤다.
// 비교 전 정리: 소문자, 축약 풀기(they're → they are, he's/she's/it's → … is), be동사·have동사 통일(is/are → be, has/have → have).
// 아래 넷 중 하나라도 해당하면 겹친 것으로 본다.
//  1) 같은 문장: 정리한 단어열이 완전히 같다
//  2) 내용어: 기능어와 흔한 주어(man, woman, people, someone, they 등)를 빼고 어미(-s/-es/-ed/-ing)를 뗀 단어가
//     2개 이상 같고, 짧은 쪽 내용어의 75% 이상이다 (3개 중 2개는 통과: 묘사 대상이 같아도 동작·장소가 다르면 다른 문장)
//  3) 문장 틀: 연속 3단어 묶음이 2개 이상, 짧은 쪽의 50% 이상 같다
//  4) 같은 표현: 내용어가 든 연속 4단어 묶음이 하나라도 같다 ("have been draped over"처럼 귀에 남는 표현)
// 한 사진 안의 선택지 네 개는 서로 더 달라야 하므로 2)의 비율을 50%로 낮춰 같은 규칙을 쓴다.
var OVERLAP_STOP_WORDS = ("a an the be have been being to of in on at for with by from and or but into onto over under up out off " +
  "around along against between inside next near some all both each one their his her its this that these those there " +
  "they he she it someone man men woman women people person").split(" ");
function overlapTokens(text) {
  return String(text).toLowerCase()
    .replace(/\b(they|we|you)'re\b/g, "$1 are").replace(/\b(he|she|it|there)'s\b/g, "$1 is")
    .replace(/[^a-z ]/g, " ").split(/\s+/).filter(Boolean)
    .map(function (word) { return /^(is|are|am|was|were)$/.test(word) ? "be" : /^(has|have|had)$/.test(word) ? "have" : word; });
}
function overlapStem(word) { return word.length <= 4 ? word : word.replace(/(ing|ed|es|s)$/, "").replace(/e$/, ""); }
function isOverlapContent(word) { return OVERLAP_STOP_WORDS.indexOf(word) === -1 && word.length > 1; }
function overlapContent(text) { return new Set(overlapTokens(text).filter(isOverlapContent).map(overlapStem)); }
function overlapGrams(text, size) {
  var list = overlapTokens(text), grams = new Set();
  for (var start = 0; start + size <= list.length; start += 1) grams.add(list.slice(start, start + size).join(" "));
  return grams;
}
function sharedOf(left, right) { return Array.from(left).filter(function (item) { return right.has(item); }); }
function shorterShare(count, left, right) { return count / Math.max(1, Math.min(left.size, right.size)); }
function sentenceOverlap(left, right, contentRatio) {
  var reasons = [];
  if (overlapTokens(left).join(" ") === overlapTokens(right).join(" ")) reasons.push("같은 문장");
  var leftWords = overlapContent(left), rightWords = overlapContent(right), words = sharedOf(leftWords, rightWords);
  if (words.length >= 2 && shorterShare(words.length, leftWords, rightWords) >= contentRatio) reasons.push("내용어 " + words.join(", "));
  var leftGrams = overlapGrams(left, 3), rightGrams = overlapGrams(right, 3), grams = sharedOf(leftGrams, rightGrams);
  if (grams.length >= 2 && shorterShare(grams.length, leftGrams, rightGrams) >= 0.5) reasons.push("문장 틀 " + grams.join(" | "));
  var phrases = sharedOf(overlapGrams(left, 4), overlapGrams(right, 4)).filter(function (gram) { return gram.split(" ").some(isOverlapContent); });
  if (phrases.length) reasons.push("같은 표현 \"" + phrases.join("\", \"") + "\"");
  return reasons;
}
var duplicateAnswers = [], duplicateChoices = [], answerVsDistractor = [];
PART1.forEach(function (item, i) {
  if (!item || !Array.isArray(item.choices)) return;
  var answer = item.choices[item.answer];
  // 서로 다른 사진의 정답끼리
  PART1.slice(i + 1).forEach(function (other) {
    if (!other || !Array.isArray(other.choices)) return;
    var reasons = sentenceOverlap(answer, other.choices[other.answer], 0.75);
    if (reasons.length) duplicateAnswers.push(item.id + " ↔ " + other.id + " (" + reasons.join(" / ") + "): \"" + answer + "\" | \"" + other.choices[other.answer] + "\"");
  });
  // 한 사진 안의 선택지끼리
  for (var a = 0; a < item.choices.length; a += 1) {
    for (var b = a + 1; b < item.choices.length; b += 1) {
      var inner = sentenceOverlap(item.choices[a], item.choices[b], 0.5);
      if (inner.length) duplicateChoices.push(item.id + " (" + "ABCD"[a] + "↔" + "ABCD"[b] + ": " + inner.join(" / ") + ")");
    }
  }
  // 참고(실패 아님): 이 사진의 정답이 다른 사진의 오답과 비슷한 경우. 사진이 다르면 문제는 아니지만 알고 있도록 알린다.
  PART1.forEach(function (other) {
    if (!other || other === item || !Array.isArray(other.choices)) return;
    other.choices.forEach(function (choice, index) {
      if (index === other.answer) return;
      var similar = sentenceOverlap(answer, choice, 0.75);
      if (similar.length) answerVsDistractor.push(item.id + " 정답 \"" + answer + "\" ≈ " + other.id + " 오답 \"" + choice + "\"");
    });
  });
});
check(!duplicateAnswers.length, "[정답 문장 중복] " + duplicateAnswers.join(" ; "));
check(!duplicateChoices.length, "[한 사진 안 선택지 중복] " + duplicateChoices.join(" ; "));
var answerPairs = PART1.length * (PART1.length - 1) / 2;
console.log("문장 중복: 정답끼리 " + answerPairs + "쌍 · 사진 안 선택지 " + PART1.length * 6 + "쌍 검사" +
  (duplicateAnswers.length || duplicateChoices.length ? "" : " — 이상 없음"));
if (answerVsDistractor.length) console.log("  참고(실패 아님) 다른 사진 오답과 비슷한 정답:\n    " + answerVsDistractor.join("\n    "));

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

// ---------- 2-2. 표시 크기 ----------
// 원본이 작은 사진(ph16 571×597, ph17 425×507)이 화면에서 작게 보이지 않는지 본다.
// 가짜 DOM에는 레이아웃 계산이 없으므로 (1) 사진 CSS가 "틀 폭 100% + 최대 높이 + object-fit: contain"인지 확인하고
// (2) 그 규칙으로 각 사진의 표시 크기를 계산한다. 이 규칙이면 표시 크기는 비율로만 정해지고 원본 픽셀 크기와 무관하다.
// (3) 화면 코드가 사진에 width·height·style을 붙이지 않는지는 아래 가짜 DOM 검사에서 본다.
// 2026-11-20 헤드리스 Chrome 실측(1280×900): 가로 3:2 718×479, 세로 2:3 375×563, ph16 538×563, ph17 472×563 — 계산과 같다.
function jpegSize(buffer) {
  for (var offset = 2; offset + 9 < buffer.length;) {
    if (buffer[offset] !== 0xFF) return null;
    var marker = buffer[offset + 1], length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xC0 && marker <= 0xCF && [0xC4, 0xC8, 0xCC].indexOf(marker) === -1) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  return null;
}
var css = fs.readFileSync(path.join(root, "assets", "css", "style.css"), "utf8");
var photoRule = (/\.listening-part1-photo, \.practice-lc-photo \{([^}]*)\}/.exec(css) || [])[1] || "";
function cssValue(name) { var m = new RegExp("(?:^|;)\\s*" + name + ":\\s*([^;]+)").exec(photoRule); return m ? m[1].trim() : null; }
check(cssValue("width") === "100%", "사진 CSS width가 100%가 아님 (" + cssValue("width") + ") — 원본이 작은 사진이 작게 보일 수 있음");
check(cssValue("object-fit") === "contain", "사진 CSS object-fit이 contain이 아님 (" + cssValue("object-fit") + ")");
var maxWidth = parseFloat(cssValue("max-width")), maxHeightVh = parseFloat(cssValue("max-height"));
check(/px$/.test(cssValue("max-width") || "") && /vh$/.test(cssValue("max-height") || ""), "사진 CSS max-width(px)·max-height(vh) 형식이 바뀜");
check(!/(?:^|;)\s*(?:min-)?height:/.test(photoRule.replace(/max-height:[^;]*/, "")), "사진 CSS에 고정 height가 있음");
// 화면 폭별 사진 틀: 데스크톱 1280×900 (리스닝 패널 안쪽 718px), 휴대폰 390×844 (좌우 여백 16px + 패널 안쪽 여백 20px)
var VIEWPORTS = [{ name: "데스크톱 1280×900", box: Math.min(maxWidth, 718), vh: 900 }, { name: "휴대폰 390×844", box: Math.min(maxWidth, 390 - 32 - 42), vh: 844 }];
var sizeReport = [];
VIEWPORTS.forEach(function (viewport) {
  var shown = PART1.map(function (item) {
    var size = item && fs.existsSync(path.join(root, item.img)) ? jpegSize(fs.readFileSync(path.join(root, item.img))) : null;
    if (!size) return null;
    var boxHeight = Math.min(viewport.box * size.height / size.width, viewport.vh * maxHeightVh / 100);
    var scale = Math.min(viewport.box / size.width, boxHeight / size.height); // object-fit: contain
    return { id: item.id, natural: size, w: Math.round(size.width * scale), h: Math.round(size.height * scale) };
  }).filter(Boolean);
  check(shown.length === PART1.length, viewport.name + " JPEG 크기를 읽지 못한 사진이 있음");
  var areas = shown.map(function (s) { return s.w * s.h; }).sort(function (x, y) { return x - y; });
  var median = areas[Math.floor(areas.length / 2)];
  shown.forEach(function (s) {
    // 같은 틀 안에서 중간값의 절반보다 작게 보이면 실패 (세로 사진은 중간값의 약 61%)
    check(s.w * s.h >= median * 0.5, viewport.name + " " + s.id + "이(가) 다른 사진보다 눈에 띄게 작음 (" + s.w + "×" + s.h + ")");
  });
  var small = shown.filter(function (s) { return Math.max(s.natural.width, s.natural.height) < 1200; });
  sizeReport.push(viewport.name + ": 중간값 " + Math.round(Math.sqrt(median)) + "²px · " + small.map(function (s) {
    return s.id + "(원본 " + s.natural.width + "×" + s.natural.height + ") " + s.w + "×" + s.h + " = 중간값의 " + Math.round(s.w * s.h / median * 100) + "%";
  }).join(", "));
});
console.log("표시 크기(CSS 규칙으로 계산): " + sizeReport.join("\n  "));

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
// 쏠림: 한 보기가 35% 이상이거나 15% 이하면 실패(경계값 포함). 독해·문법·리스닝 검사와 같은 기준이다.
// 위의 '고르게 ±1개' 검사가 더 엄격하지만, 문항이 늘어 ±1개 기준을 풀게 되더라도 이 기준은 남긴다.
spread.forEach(function (count, index) {
  var percent = count / PART1.length * 100;
  check(count * 100 < 35 * PART1.length && count * 100 > 15 * PART1.length, "정답 위치 " + "ABCD"[index] + "가 " + Math.round(percent) + "% (35% 이상 또는 15% 이하, 쏠림)");
});
console.log("정답 위치: " + spread.map(function (count, index) {
  return "ABCD"[index] + " " + count + " (" + Math.round(count / PART1.length * 100) + "%)";
}).join(" · "));

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
  ["assets/js/speech.js", "data/listening.js", "data/part1.js", "assets/js/listening-voices.js", "assets/js/listening-graphic.js", "assets/js/listening.js"].forEach(function (file) {
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
    // 크기를 고정하는 속성이 붙으면 CSS 규칙(틀 폭 100%)이 무시되어 원본이 작은 사진이 작게 보인다.
    if (["width", "height", "style"].some(function (key) { return photo.getAttribute(key) !== null; }) || photo.style) screenProblems.push(label + " 사진에 width/height/style이 붙음");
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
