"use strict";

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var dataPath = path.join(__dirname, "..", "data", "vocab.js");
var context = { window: {} };
vm.runInNewContext(fs.readFileSync(dataPath, "utf8"), context, { filename: dataPath });

var vocabulary = context.window.VOCAB;
if (!Array.isArray(vocabulary)) {
  console.error("검사 실패: data/vocab.js에서 window.VOCAB 배열을 찾을 수 없습니다.");
  process.exit(1);
}

function normalizeWord(word) {
  return word.trim().toLocaleLowerCase();
}

var meanings = Object.create(null);
vocabulary.forEach(function (item) {
  if (item && typeof item.word === "string" &&
      typeof item.meaning === "string" && item.meaning.trim()) {
    meanings[normalizeWord(item.word)] = item.meaning;
  }
});
var distractorMeanings = context.window.VOCAB_DISTRACTOR_MEANINGS;
if (distractorMeanings && typeof distractorMeanings === "object") {
  Object.keys(distractorMeanings).forEach(function (word) {
    var meaning = distractorMeanings[word];
    var key = normalizeWord(word);
    if (!meanings[key] && typeof meaning === "string" && meaning.trim()) meanings[key] = meaning;
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// 한 단어의 활용형 목록(원형 제외) — assets/js/vocab.js의 wordForms와 동일
function wordForms(word) {
  var lower = word.toLowerCase();
  var last = word.slice(-1);
  var consonantY = /[^aeiou]y$/i.test(word);
  var consonantVowelConsonant = /[^aeiou][aeiou][^aeiou]$/i.test(word);
  var doubledFinal = consonantVowelConsonant && !/[wxy]$/i.test(word);
  var forms = [];

  forms.push(word + "s", word + "es");
  if (consonantY) forms.push(word.slice(0, -1) + "ies");

  forms.push(word + "d", word + "ed");
  if (consonantY) forms.push(word.slice(0, -1) + "ied");
  if (doubledFinal) forms.push(word + last + "ed");

  if (last.toLowerCase() === "e") forms.push(word.slice(0, -1) + "ing");
  else {
    forms.push(word + "ing");
    if (doubledFinal) forms.push(word + last + "ing");
  }

  if (consonantY) forms.push(word.slice(0, -1) + "ier", word.slice(0, -1) + "iest");
  else if (last.toLowerCase() === "e") forms.push(word + "r", word + "st");
  else forms.push(word + "er", word + "est");
  if (doubledFinal) forms.push(word + last + "er", word + last + "est");

  return forms.filter(function (form, index) {
    return form && forms.indexOf(form) === index && form.toLowerCase() !== lower;
  });
}

// 빈칸 후보 — assets/js/vocab.js의 blankVariants와 동일.
// 여러 단어는 마지막 단어를 변형하고, 동사구(v.)는 첫 단어 변형도 찾는다.
function blankVariants(target, pos) {
  var parts = target.split(/\s+/);
  var variants = [target];
  var lastIndex = parts.length - 1;
  wordForms(parts[lastIndex]).forEach(function (form) {
    variants.push(parts.slice(0, lastIndex).concat(form).join(" "));
  });
  if (lastIndex > 0 && /(^|\/)v\./.test(pos || "")) {
    wordForms(parts[0]).forEach(function (form) {
      variants.push([form].concat(parts.slice(1)).join(" "));
    });
  }
  return variants.filter(function (variant, index) {
    return variants.indexOf(variant) === index;
  });
}

function blankExample(item) {
  if (typeof item.word !== "string" || typeof item.example !== "string") return null;

  var target = item.word.replace(/~/g, " ").trim().replace(/[?!.,;:]+$/, "");
  if (!target) return null;

  var variants = blankVariants(target, item.pos);

  for (var index = 0; index < variants.length; index += 1) {
    var expression = variants[index].trim().split(/\s+/).map(escapeRegExp).join("\\s+");
    if (new RegExp("\\b" + expression + "\\b", "i").test(item.example)) return true;
  }
  return false;
}

// 뜻 시험 선택지 규칙 (assets/js/vocab.js와 동일):
// 정답 뜻 + 같은 Day·상황의 다른 단어 뜻 → 부족하면 같은 트랙 전체.
// 유사도 가드(같음 / 포함 / 쉼표·슬래시 조각 겹침)를 통과한 뜻만, 서로도 겹치지 않게 4개를 만든다.
// 비교 전에 조각 끝의 어미(하다·되다·시키다·하기·되기)를 뗀다. 예) "보존하다"와 "보존, 절약"은 "보존"이 겹친다.
function stemMeaningPiece(piece) {
  return piece.replace(/(시키다|하다|되다|하기|되기)$/, "") || piece;
}

function meaningPieces(meaning) {
  return String(meaning).split(/[,/]/).map(function (piece) {
    return stemMeaningPiece(piece.replace(/\([^)]*\)/g, "").replace(/\s+/g, " ").trim());
  }).filter(Boolean);
}

function meaningsTooSimilar(a, b) {
  var leftPieces = meaningPieces(a);
  var rightPieces = meaningPieces(b);
  var left = leftPieces.join(", ");
  var right = rightPieces.join(", ");
  if (!left || !right) return false;
  if (left === right || left.indexOf(right) !== -1 || right.indexOf(left) !== -1) return true;
  return leftPieces.some(function (piece) { return rightPieces.indexOf(piece) !== -1; });
}

function guardedMeaningChoices(item) {
  var chosen = [item.meaning];
  function tryAdd(candidate) {
    if (chosen.length >= 4 || candidate.id === item.id || candidate.track !== item.track) return;
    if (typeof candidate.meaning !== "string" || !candidate.meaning.trim()) return;
    if (chosen.some(function (meaning) { return meaningsTooSimilar(meaning, candidate.meaning); })) return;
    chosen.push(candidate.meaning);
  }
  var groupingValue = String(item.situation || item.day);
  vocabulary.forEach(function (candidate) {
    if (String(candidate.situation || candidate.day) === groupingValue) tryAdd(candidate);
  });
  vocabulary.forEach(tryAdd);
  return chosen;
}

function canBuildMeaningChoices(item) {
  return guardedMeaningChoices(item).length >= 4;
}

var failures = {
  blank: [],
  distractorCount: [],
  missingFields: [],
  duplicateIds: [],
  answerAsDistractor: [],
  meaningChoiceCount: [],
  trackMetadata: [],
  wrongFormHasMeaning: []
};
// 일부러 틀리게 만든 오답 표현(VOCAB_WRONG_FORMS)에는 뜻을 붙이지 않는다.
// 둘 다에 있으면 틀린 영어가 자연스러운 한국어 뜻과 함께 보여 맞는 표현으로 오해할 수 있다.
var wrongForms = Array.isArray(context.window.VOCAB_WRONG_FORMS) ? context.window.VOCAB_WRONG_FORMS : [];
var wrongFormSet = Object.create(null);
wrongForms.forEach(function (form) {
  wrongFormSet[normalizeWord(form)] = true;
  if (distractorMeanings && typeof distractorMeanings === "object" &&
      (Object.prototype.hasOwnProperty.call(distractorMeanings, form) ||
       Object.prototype.hasOwnProperty.call(distractorMeanings, normalizeWord(form)))) {
    failures.wrongFormHasMeaning.push({ form: form, meaning: distractorMeanings[form] || distractorMeanings[normalizeWord(form)] });
  }
});
var seenIds = Object.create(null);
var seenMissingDistractorMeanings = Object.create(null);
// 경고: 혼동 단어 뜻 누락 (단어장 상세 표시용이라 앱 동작에는 영향이 없다)
var missingDistractorMeanings = [];
var requiredFields = ["word", "pos", "meaning", "example", "exampleKo", "tip", "distractors"];

vocabulary.forEach(function (item, index) {
  item = item && typeof item === "object" ? item : {};
  var label = item && item.id ? item.id : "항목 #" + (index + 1);

  if (!blankExample(item)) {
    failures.blank.push({ id: item.id || "(id 없음)", word: item.word || "(word 없음)", example: item.example || "(example 없음)" });
  }
  if (!Array.isArray(item.distractors) || item.distractors.length !== 3) {
    failures.distractorCount.push({ id: label, actual: Array.isArray(item.distractors) ? item.distractors.length : "배열 아님" });
  }
  var missing = requiredFields.filter(function (field) {
    var value = item[field];
    return value === undefined || value === null ||
      (typeof value === "string" && value.trim() === "") ||
      (field === "distractors" && !Array.isArray(value));
  });
  if (missing.length) failures.missingFields.push({ id: label, fields: missing });
  if (item.id !== undefined) {
    if (seenIds[item.id]) failures.duplicateIds.push({ id: item.id });
    else seenIds[item.id] = true;
  }
  if (Array.isArray(item.distractors) && typeof item.word === "string" &&
      item.distractors.some(function (distractor) {
        return typeof distractor === "string" && distractor.toLocaleLowerCase() === item.word.toLocaleLowerCase();
      })) {
    failures.answerAsDistractor.push({ id: label, word: item.word });
  }
  if (Array.isArray(item.distractors)) {
    item.distractors.forEach(function (distractor) {
      if (typeof distractor !== "string" || !distractor.trim()) return;
      var normalizedWord = normalizeWord(distractor);
      if (!meanings[normalizedWord] && !wrongFormSet[normalizedWord] && !seenMissingDistractorMeanings[normalizedWord]) {
        seenMissingDistractorMeanings[normalizedWord] = true;
        missingDistractorMeanings.push(distractor.trim());
      }
    });
  }
  if (typeof item.meaning === "string" && item.meaning.trim() && !canBuildMeaningChoices(item)) {
    failures.meaningChoiceCount.push({ id: label, word: item.word || "(word 없음)" });
  }
  if ((item.track === "toeic" && (item.day === undefined || item.day === null || item.day === "")) ||
      (item.track === "survival" && (item.situation === undefined || item.situation === null || item.situation === ""))) {
    failures.trackMetadata.push({ id: label, track: item.track, day: item.day, situation: item.situation });
  }
});

var failureCount = Object.keys(failures).reduce(function (total, key) {
  return total + failures[key].length;
}, 0);
var failedRules = Object.keys(failures).filter(function (key) { return failures[key].length > 0; }).length;
var ruleCount = Object.keys(failures).length;
console.log("요약: " + vocabulary.length + "개 단어 검사 | 규칙 통과 " + (ruleCount - failedRules) + "/" + ruleCount + " | 실패 항목 " + failureCount);
Object.keys(failures).forEach(function (key) {
  console.log("\n" + key + " (" + failures[key].length + ")");
  if (!failures[key].length) {
    console.log("  없음");
    return;
  }
  failures[key].forEach(function (failure) {
    console.log("  " + JSON.stringify(failure));
  });
});

// 경고: 같은 track 안에서 word가 중복되는 항목 (track이 다르면 허용)
// 의도적으로 다른 뜻을 가르치는 경우도 있어 실패로 보지 않고 id·word·뜻을 알려준다.
var wordGroups = Object.create(null);
vocabulary.forEach(function (item) {
  if (!item || typeof item.word !== "string" || !item.word.trim()) return;
  var key = String(item.track) + "\u0000" + normalizeWord(item.word);
  (wordGroups[key] = wordGroups[key] || []).push(item);
});
var duplicateWordWarnings = Object.keys(wordGroups).filter(function (key) {
  return wordGroups[key].length > 1;
}).map(function (key) {
  var items = wordGroups[key];
  return {
    track: items[0].track,
    word: items[0].word,
    entries: items.map(function (item) {
      return item.id + "(" + (item.situation || "Day " + item.day) + ": " + item.meaning + ")";
    })
  };
});
console.log("\nduplicateWords — 경고 (" + duplicateWordWarnings.length + ")");
if (!duplicateWordWarnings.length) console.log("  없음");
duplicateWordWarnings.forEach(function (warning) {
  console.log("  ⚠ [" + warning.track + "] " + warning.word + " — " + warning.entries.join(" / "));
});

console.log("\nmissingDistractorMeanings — 경고 (" + missingDistractorMeanings.length + ")");
console.log(missingDistractorMeanings.length
  ? "  ⚠ 혼동 단어 " + missingDistractorMeanings.length + "개의 뜻이 없습니다. 단어장 상세에 단어만 표시됩니다. 목록: node tools/list-missing-meanings.js"
  : "  없음");

// ---------------------------------------------------------------------------
// 화면 검사: 단어장 페이지(common.js + vocab.js)를 가짜 DOM·가짜 localStorage로 실행한다.
// 가장 마지막 토익 Day(새로 추가된 Day)의 단어장·뜻 시험·빈칸 시험을 끝까지 진행해 본다.
// ---------------------------------------------------------------------------
console.log("\n[화면 검사]");
var domFailures = 0;
function check(name, cond, detail) {
  console.log((cond ? "  ✔ " : "  ✘ ") + name + (detail !== undefined ? " — " + detail : ""));
  if (!cond) domFailures++;
}

class El {
  constructor(tag) {
    this.tagName = tag.toUpperCase(); this.children = []; this.attrs = {}; this.dataset = {}; this.style = {};
    this.hidden = false; this.disabled = false; this.className = ""; this.id = ""; this._value = "";
    this.listeners = {}; this._text = ""; this.parentElement = null; this._selected = false; this.type = "";
    const self = this;
    const cls = () => self.className.split(/\s+/).filter(Boolean);
    this.classList = {
      add: c => { if (!cls().includes(c)) self.className = cls().concat(c).join(" "); },
      remove: c => { self.className = cls().filter(x => x !== c).join(" "); },
      contains: c => cls().includes(c),
      toggle(c, f) { const on = f === undefined ? !this.contains(c) : !!f; on ? this.add(c) : this.remove(c); return on; }
    };
  }
  get value() {
    if (this.tagName !== "SELECT") return this._value;
    const selected = this.options.find(o => o.selected) || this.options[0];
    return selected ? selected.value : "";
  }
  set value(v) {
    if (this.tagName === "SELECT") this.options.forEach(o => { o.selected = o.value === String(v); });
    else this._value = String(v);
  }
  get selected() { return this._selected; }
  set selected(v) { this._selected = !!v; }
  get options() { return this.children.filter(c => c.tagName === "OPTION"); }
  get selectedOptions() { const v = this.value; return this.options.filter(o => o.value === v); }
  set textContent(v) { this.children.forEach(c => { c.parentElement = null; }); this.children = []; this._text = String(v); }
  get textContent() { return this._text + this.children.map(c => c.textContent).join(""); }
  get nextElementSibling() {
    if (!this.parentElement) return null;
    const siblings = this.parentElement.children;
    return siblings[siblings.indexOf(this) + 1] || null;
  }
  appendChild(c) { c.parentElement = this; this.children.push(c); return c; }
  append(...cs) { cs.forEach(c => this.appendChild(c)); }
  replaceChildren(...cs) { this.children = []; this._text = ""; this.append(...cs); }
  setAttribute(k, v) { this.attrs[k] = String(v); if (k === "id") this.id = String(v); }
  getAttribute(k) { return k in this.attrs ? this.attrs[k] : null; }
  hasAttribute(k) { return k in this.attrs; }
  removeAttribute(k) { delete this.attrs[k]; }
  addEventListener(t, f) { (this.listeners[t] = this.listeners[t] || []).push(f); }
  dispatch(t, target) { (this.listeners[t] || []).forEach(f => f({ key: "", target: target || this, preventDefault() {} })); }
  click() {
    if (this.disabled) return;
    // 버블링: 자기 자신부터 조상까지 click 리스너를 부른다 (단어장은 목록 컨테이너에 위임된 리스너를 쓴다)
    for (let node = this; node; node = node.parentElement) node.dispatch("click", this);
  }
  focus() {}
  scrollIntoView() {}
  closest(sel) { for (let n = this; n; n = n.parentElement) if (n.matches(sel)) return n; return null; }
  all() { return this.children.flatMap(c => [c, ...c.all()]); }
  matches(sel) {
    const tagMatch = /^([a-z]+)/i.exec(sel);
    if (tagMatch && this.tagName !== tagMatch[1].toUpperCase()) return false;
    const re = /\.([\w-]+)|\[([\w-]+)(\^?=)"([^"]*)"\]/g; let m, ok = true;
    while ((m = re.exec(sel))) {
      if (m[1]) ok = ok && this.classList.contains(m[1]);
      else {
        const v = m[2] === "id" ? this.id : m[2] === "type" ? (this.type || this.getAttribute("type")) : this.getAttribute(m[2]);
        ok = ok && v !== null && (m[3] === "=" ? v === m[4] : v.startsWith(m[4]));
      }
    }
    return ok;
  }
  querySelectorAll(sel) { return this.all().filter(e => e.matches(sel)); }
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
}

// vocab.html과 같은 id로 페이지 골격을 만든다
const root = path.join(__dirname, "..");
const body = new El("body");
const add = (tag, id, parent = body) => { const e = new El(tag); e.id = id; parent.appendChild(e); return e; };
const addOption = (select, value) => { const o = new El("option"); o.value = value; select.appendChild(o); return o; };
add("div", "site-header").querySelector = () => new El("button");
add("div", "site-footer");
add("input", "vocab-day", add("form", "vocab-form"));
add("p", "vocab-message");
["list", "exam", "wrong"].forEach(n => {
  const tab = add("button", "vocab-tab-" + n); tab.className = "vocab-tab"; tab.setAttribute("role", "tab");
  add("section", "vocab-panel-" + n);
});
const trackSelect = add("select", "vocab-track"); ["all", "toeic", "speaking", "toefl"].forEach(v => addOption(trackSelect, v));
add("span", "vocab-day-filter-label");
const daySelect = add("select", "vocab-day-filter");
add("input", "vocab-search");
add("button", "vocab-expand-toggle");
add("button", "vocab-hide-toggle");
const resultCount = add("p", "vocab-result-count");
add("div", "vocab-day-navigation");
const list = add("div", "vocab-list");
add("div", "vocab-day-navigation-bottom");
const examForm = add("form", "vocab-exam-form");
const examTrack = add("select", "vocab-exam-track", examForm); ["toeic", "speaking", "toefl"].forEach(v => addOption(examTrack, v));
add("span", "vocab-exam-day-label", examForm);
const examDay = add("select", "vocab-exam-day", examForm);
const examType = add("select", "vocab-exam-type", examForm); ["meaning", "blank"].forEach(v => addOption(examType, v));
const examRange = add("select", "vocab-exam-range", examForm); ["1-10", "11-20", "21-30", "all"].forEach(v => addOption(examRange, v));
const submitButton = new El("button"); submitButton.type = "submit"; examForm.appendChild(submitButton);
add("p", "vocab-exam-message");
const examStage = add("div", "vocab-exam-stage");
["vocab-due-count", "vocab-weak-count", "vocab-graduated-count"].forEach(id => add("strong", id));
add("div", "vocab-due-list");
add("button", "vocab-review-start");
add("div", "vocab-wrong-list");

const store = new Map();
const ready = [];
const pageWarnings = [];
const fakeDocument = {
  readyState: "loading", documentElement: new El("html"), body: body,
  createElement: t => new El(t),
  getElementById: id => body.all().find(e => e.id === id) || null,
  querySelectorAll: s => body.querySelectorAll(s),
  addEventListener: (t, f) => { if (t === "DOMContentLoaded") ready.push(f); }
};
const fakeWindow = {
  document: fakeDocument, location: { pathname: "/english-lab/pages/vocab.html", hash: "" },
  addEventListener() {}, matchMedia: () => ({ matches: false })
};
const fakeStorage = { getItem: k => store.has(k) ? store.get(k) : null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) };
const pageConsole = Object.assign({}, console, { warn: (...args) => pageWarnings.push(args.join(" ")) });
const pageContext = vm.createContext({ window: fakeWindow, document: fakeDocument, localStorage: fakeStorage, console: pageConsole, Element: El });
try {
  ["assets/js/common.js", "data/vocab.js", "assets/js/vocab.js"].forEach(function (file) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), pageContext, { filename: file });
  });
  ready.forEach(f => f());
} catch (error) {
  check("단어장 화면 로드", false, error.message);
}

const pageVocab = (fakeWindow.VOCAB || []).filter(v => v.track === "toeic");
const toeicDays = Array.from(new Set(pageVocab.map(v => v.day))).sort((a, b) => a - b);
const lastDay = String(toeicDays[toeicDays.length - 1]);
const dayItems = pageVocab.filter(v => String(v.day) === lastDay);
const count = dayItems.length;
console.log("  검사 대상: Day " + lastDay + " (" + count + "단어)");

// 1. 단어장: 드롭다운 · 표 · 접힘/펼침
const dayValues = daySelect.options.map(o => o.value);
check("Day 드롭다운: Day 1~" + lastDay + " (" + toeicDays.length + "개, 마지막이 Day " + lastDay + ")",
  dayValues.join(",") === toeicDays.join(","), dayValues.join(","));
daySelect.value = lastDay;
daySelect.dispatch("change");
const rows = list.querySelectorAll(".vocab-entry-row");
const detailRows = list.querySelectorAll(".vocab-detail-row");
const caption = list.querySelector("caption");
check("표 제목 '토익 · DAY " + lastDay + "'", !!caption && caption.textContent === "토익 · DAY " + lastDay, caption && caption.textContent);
check(count + "단어 표시 · 순서가 데이터와 같음",
  rows.length === count && resultCount.textContent === count + "개 단어" && rows.map(r => r.dataset.vocabId).join() === dayItems.map(v => v.id).join(),
  rows.length + " / " + resultCount.textContent);
check("처음엔 모두 접힘", detailRows.length === count && detailRows.every(d => d.hidden) && rows.every(r => r.getAttribute("aria-expanded") === "false"));
const probeIndex = dayItems.findIndex(v => v.distractors.some(d => /\s/.test(d)));
const probe = probeIndex >= 0 ? probeIndex : 0;
rows[probe].querySelector(".vocab-word").click();
const firstDistractor = dayItems[probe].distractors[0];
const distractorMeaningText = meanings[normalizeWord(firstDistractor)];
check("단어 클릭 → 상세 펼침 · 혼동 단어 뜻 표시 (" + dayItems[probe].word + ")",
  detailRows[probe].hidden === false && rows[probe].getAttribute("aria-expanded") === "true" &&
    (!distractorMeaningText || detailRows[probe].textContent.includes(firstDistractor + "(" + distractorMeaningText + ")")));
rows[probe].querySelector(".vocab-word").click();
check("다시 클릭 → 접힘", detailRows[probe].hidden === true);

// 2·3. 뜻 시험 · 빈칸 시험: 전체 범위를 모두 맞히며 끝까지 진행
function runExam(type) {
  examTrack.value = "toeic"; examTrack.dispatch("change");
  examDay.value = lastDay; examDay.dispatch("change");
  examType.value = type;
  examRange.value = "all";
  examForm.dispatch("submit");
  const seen = [];
  for (let guard = 0; guard < count + 5; guard++) {
    const prompt = examStage.querySelector(".vocab-question-prompt");
    const buttons = examStage.querySelectorAll(".vocab-quiz-option");
    if (!prompt || !buttons.length) break;
    const texts = buttons.map(b => b.textContent);
    const item = type === "meaning"
      ? dayItems.find(v => v.word === prompt.textContent)
      : dayItems.find(v => texts.includes(v.word) && v.distractors.every(d => texts.includes(d)));
    if (!item) break;
    seen.push({ item: item, prompt: prompt.textContent, texts: texts });
    buttons[texts.indexOf(type === "meaning" ? item.meaning : item.word)].click();
    const next = examStage.querySelector(".vocab-next-button");
    if (!next || next.hidden) break;
    next.click();
  }
  const result = examStage.querySelector(".vocab-results");
  return { seen: seen, result: result ? result.textContent : "" };
}
const meaningRun = runExam("meaning");
check("뜻 시험 " + count + "문제 출제 · " + count + "/" + count + " 채점",
  meaningRun.seen.length === count && meaningRun.result.includes(count + " / " + count + " 정답"), meaningRun.seen.length + "문제");
check("뜻 시험 선택지 4개 · 서로 다름", meaningRun.seen.every(s => s.texts.length === 4 && new Set(s.texts).size === 4));
const blankRun = runExam("blank");
check("빈칸 시험 " + count + "문제 출제 · " + count + "/" + count + " 채점",
  blankRun.seen.length === count && blankRun.result.includes(count + " / " + count + " 정답"), blankRun.seen.length + "문제");
// 빈칸이 있어야 하고, 정답 표현(어형 변화 포함)이 빈칸 밖에 다시 남으면 안 된다
const leftover = s => !s.prompt.includes("____") ||
  new RegExp("\\b" + escapeRegExp(s.item.word) + "(s|es|d|ed|ing)?\\b", "i").test(s.prompt);
check("빈칸 문장: 빈칸 있음 · 정답 표현이 다시 남지 않음", !blankRun.seen.some(leftover),
  blankRun.seen.filter(leftover).map(s => s.item.word + ": " + s.prompt).join(" | "));
check("빈칸 생성 경고 없음", !pageWarnings.some(w => /빈칸/.test(w)), pageWarnings.join(" | "));
const multiWord = blankRun.seen.filter(s => /\s/.test(s.item.word));
if (multiWord.length) {
  console.log("  여러 단어 표현 빈칸:");
  multiWord.sort((a, b) => a.item.id.localeCompare(b.item.id))
    .forEach(s => console.log("    " + s.item.word + " → " + s.prompt));
}

console.log(domFailures ? "\n화면 검사 실패 " + domFailures : "\n화면 검사 통과");
if (failureCount || domFailures) process.exit(1);
