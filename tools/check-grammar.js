"use strict";

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var dataPath = path.join(__dirname, "..", "data", "grammar.js");
var context = { window: {} };
vm.runInNewContext(fs.readFileSync(dataPath, "utf8"), context, { filename: dataPath });

var topics = context.window.GRAMMAR;
var questions = context.window.GRAMMAR_QUIZ;
if (!Array.isArray(topics) || !Array.isArray(questions)) {
  console.error("검사 실패: data/grammar.js에서 GRAMMAR 및 GRAMMAR_QUIZ 배열을 찾을 수 없습니다.");
  process.exit(1);
}

var topicIds = Object.create(null);
topics.forEach(function (topic) {
  if (topic && typeof topic.id === "string") topicIds[topic.id] = true;
});

var failures = {
  invalidRuleId: [],
  choiceCount: [],
  invalidAnswer: [],
  missingBlank: [],
  duplicateIds: [],
  missingExplanation: [],
  duplicateChoices: []
};
var seenIds = Object.create(null);

questions.forEach(function (question, index) {
  question = question && typeof question === "object" ? question : {};
  var label = question.id || "문항 #" + (index + 1);
  if (!topicIds[question.ruleId]) failures.invalidRuleId.push({ id: label, ruleId: question.ruleId || "(없음)" });
  if (!Array.isArray(question.choices) || question.choices.length !== 4) {
    failures.choiceCount.push({ id: label, actual: Array.isArray(question.choices) ? question.choices.length : "배열 아님" });
  }
  if (!Array.isArray(question.choices) || !Number.isInteger(question.answer) ||
      question.answer < 0 || question.answer >= question.choices.length) {
    failures.invalidAnswer.push({ id: label, answer: question.answer });
  }
  if (typeof question.question !== "string" || !/_{2,}/.test(question.question)) {
    failures.missingBlank.push({ id: label, question: question.question || "(문제 없음)" });
  }
  if (question.id !== undefined) {
    if (seenIds[question.id]) failures.duplicateIds.push({ id: question.id });
    else seenIds[question.id] = true;
  }
  if (typeof question.explanation !== "string" || !question.explanation.trim()) {
    failures.missingExplanation.push({ id: label });
  }
  if (Array.isArray(question.choices)) {
    var normalizedChoices = question.choices.map(function (choice) {
      return typeof choice === "string" ? choice.trim().toLocaleLowerCase() : "";
    });
    if (new Set(normalizedChoices).size !== normalizedChoices.length) {
      failures.duplicateChoices.push({ id: label, choices: question.choices });
    }
  }
});

var failureCount = Object.keys(failures).reduce(function (total, key) {
  return total + failures[key].length;
}, 0);
var failedRules = Object.keys(failures).filter(function (key) { return failures[key].length > 0; }).length;
console.log("요약: " + questions.length + "개 문항 검사 | 규칙 통과 " +
  (Object.keys(failures).length - failedRules) + "/" + Object.keys(failures).length +
  " | 실패 항목 " + failureCount);
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

// ---------------------------------------------------------------------------
// 화면 검사: 문법 페이지(common.js + grammar.js)를 가짜 DOM·가짜 localStorage로 실행한다.
// 노트 아코디언(모든 노트), 문제 유형 선택, 유형별 정답률(약점 유형 탭)을 확인한다.
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
    this.listeners = {}; this._text = ""; this.href = ""; this.type = ""; this._selected = false;
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
  set textContent(v) { this.children = []; this._text = String(v); }
  get textContent() { return this._text + this.children.map(c => c.textContent).join(""); }
  appendChild(c) { this.children.push(c); return c; }
  append(...cs) { cs.forEach(c => this.appendChild(c)); }
  replaceChildren(...cs) { this.children = []; this._text = ""; this.append(...cs); }
  setAttribute(k, v) { this.attrs[k] = String(v); if (k === "id") this.id = String(v); }
  getAttribute(k) { return k in this.attrs ? this.attrs[k] : null; }
  hasAttribute(k) { return k in this.attrs; }
  removeAttribute(k) { delete this.attrs[k]; }
  addEventListener(t, f) { (this.listeners[t] = this.listeners[t] || []).push(f); }
  dispatch(t) { (this.listeners[t] || []).forEach(f => f({ key: "", preventDefault() {} })); }
  click() { if (!this.disabled) this.dispatch("click"); }
  focus() {}
  scrollIntoView() {}
  all() { return this.children.flatMap(c => [c, ...c.all()]); }
  matches(sel) {
    const re = /\.([\w-]+)|\[([\w-]+)(\^?=)"([^"]*)"\]/g; let m, ok = true;
    while ((m = re.exec(sel))) {
      if (m[1]) ok = ok && this.classList.contains(m[1]);
      else {
        const v = m[2] === "id" ? this.id : this.getAttribute(m[2]);
        ok = ok && v !== null && (m[3] === "=" ? v === m[4] : v.startsWith(m[4]));
      }
    }
    return ok;
  }
  querySelectorAll(sel) { return this.all().filter(e => e.matches(sel)); }
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
}

// grammar.html과 같은 id로 페이지 골격을 만든다
const root = path.join(__dirname, "..");
const body = new El("body");
const add = (tag, id, parent = body) => { const e = new El(tag); e.id = id; parent.appendChild(e); return e; };
add("div", "site-header").querySelector = () => new El("button");
add("div", "site-footer");
["notes", "quiz", "weak"].forEach(n => { add("button", "grammar-tab-" + n).setAttribute("role", "tab"); add("section", "grammar-panel-" + n); });
add("button", "grammar-expand-toggle");
const list = add("div", "grammar-list");
const form = add("form", "grammar-quiz-form");
const ruleSelect = add("select", "grammar-quiz-rule");
const countSelect = add("select", "grammar-quiz-count");
["5", "10", "20", "all"].forEach(v => { const o = new El("option"); o.value = v; countSelect.appendChild(o); });
countSelect.value = "10";
add("p", "grammar-quiz-message");
const stage = add("div", "grammar-quiz-stage");
const weakList = add("div", "grammar-weak-list");
add("button", "grammar-weak-practice");

const store = new Map();
const ready = [];
const fakeDocument = {
  readyState: "loading", documentElement: new El("html"),
  createElement: t => new El(t),
  getElementById: id => body.all().find(e => e.id === id) || null,
  querySelectorAll: s => body.querySelectorAll(s),
  addEventListener: (t, f) => { if (t === "DOMContentLoaded") ready.push(f); }
};
const fakeWindow = {
  document: fakeDocument, location: { pathname: "/english-lab/pages/grammar.html", hash: "" },
  addEventListener() {}, matchMedia: () => ({ matches: false })
};
const fakeStorage = { getItem: k => store.has(k) ? store.get(k) : null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) };
const pageContext = vm.createContext({ window: fakeWindow, document: fakeDocument, localStorage: fakeStorage, console });
try {
  ["assets/js/common.js", "data/grammar.js", "assets/js/grammar.js"].forEach(function (file) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), pageContext, { filename: file });
  });
  ready.forEach(f => f());
} catch (error) {
  check("문법 화면 로드", false, error.message);
}

const pageTopics = (fakeWindow.GRAMMAR || []).slice().sort((a, b) => a.order - b.order);
const pageQuiz = fakeWindow.GRAMMAR_QUIZ || [];

// 1. 노트 아코디언: 모든 노트가 닫힌 채 그려지고, 열면 다섯 섹션과 표·예문이 데이터 개수대로 보인다
check("노트 " + pageTopics.length + "개 렌더", list.children.length === pageTopics.length, list.children.length + "개");
pageTopics.forEach(function (topic) {
  const article = list.children.find(a => a.id === "grammar-note-" + topic.id);
  if (!article) { check(topic.id + " 노트", false, "없음"); return; }
  const trigger = article.children[0];
  const panel = article.children[1];
  const closedAtStart = panel.hidden === true && trigger.getAttribute("aria-expanded") === "false";
  trigger.click();
  const opened = panel.hidden === false && trigger.getAttribute("aria-expanded") === "true";
  const sectionCount = panel.children.length;
  const tableEl = panel.querySelector(".grammar-table");
  const rowCount = tableEl ? tableEl.children[1].children.length : 0;
  const cardCount = panel.querySelectorAll(".grammar-example-card").length;
  const titleOk = trigger.textContent.indexOf(String(topic.order).padStart(2, "0") + " · " + topic.title) === 0;
  trigger.click();
  const closedAgain = panel.hidden === true;
  check(topic.id + " " + topic.title + " — 닫힘→열림→닫힘, 섹션 5개, 표 " + topic.table.rows.length + "행, 예문 " + topic.examples.length + "개",
    closedAtStart && opened && closedAgain && sectionCount === 5 && rowCount === topic.table.rows.length &&
      cardCount === topic.examples.length && titleOk,
    [closedAtStart, opened, closedAgain, sectionCount, rowCount, cardCount, titleOk].join("/"));
});

// 2. 문제 유형 선택: 전체 + 문제가 있는 모든 유형
const rulesWithQuestions = pageTopics.filter(t => pageQuiz.some(q => q.ruleId === t.id)).map(t => t.id);
const ruleOptions = ruleSelect.options.map(o => o.value);
check("유형 선택 = 전체 + " + rulesWithQuestions.length + "개 유형", ruleOptions.join(",") === ["all"].concat(rulesWithQuestions).join(","), ruleOptions.join(","));

// 3. 유형별 정답률: 마지막 두 유형을 끝까지 풀고(앞 유형은 3개 틀림, 뒤 유형은 전부 정답) 약점 유형 탭을 확인한다
function solveRule(ruleId, wrongCount) {
  ruleSelect.value = ruleId; ruleSelect.dispatch("change");
  countSelect.value = "all";
  form.dispatch("submit");
  let answered = 0;
  let correct = 0;
  for (let guard = 0; guard < 100; guard++) {
    const prompt = stage.querySelector(".grammar-question-prompt");
    const buttons = stage.querySelectorAll(".grammar-choice");
    if (!prompt || !buttons.length) break;
    const question = pageQuiz.find(q => q.question === prompt.textContent);
    if (!question) break;
    const pickRight = answered >= wrongCount;
    buttons[pickRight ? question.answer : (question.answer + 1) % buttons.length].click();
    answered++;
    if (pickRight) correct++;
    const next = stage.querySelector(".grammar-next-button");
    if (!next) break;
    next.click();
  }
  return { answered: answered, correct: correct };
}
const ruleA = pageTopics[pageTopics.length - 2];
const ruleB = pageTopics[pageTopics.length - 1];
const totalA = pageQuiz.filter(q => q.ruleId === ruleA.id).length;
const totalB = pageQuiz.filter(q => q.ruleId === ruleB.id).length;
const solvedA = solveRule(ruleA.id, 3);
const solvedB = solveRule(ruleB.id, 0);
const stats = fakeWindow.Progress.getGrammarStats();
check(ruleA.id + " 기록: " + totalA + "문제 중 " + (totalA - 3) + "개 정답",
  stats[ruleA.id] && stats[ruleA.id].solved === totalA && stats[ruleA.id].correct === totalA - 3 && solvedA.answered === totalA,
  JSON.stringify(stats[ruleA.id]));
check(ruleB.id + " 기록: " + totalB + "문제 모두 정답",
  stats[ruleB.id] && stats[ruleB.id].solved === totalB && stats[ruleB.id].correct === totalB && solvedB.answered === totalB,
  JSON.stringify(stats[ruleB.id]));
fakeDocument.getElementById("grammar-tab-weak").click();
const weakItems = weakList.querySelectorAll(".grammar-weak-item");
const weakTitles = weakItems.map(item => item.children[0].children[0].textContent);
const expectedA = Math.round((totalA - 3) / totalA * 100);
const valueA = weakItems[0] && weakItems[0].querySelector(".grammar-accuracy-value");
check("약점 유형 탭: " + pageTopics.length + "개 유형 표시", weakItems.length === pageTopics.length, weakItems.length + "개");
check("정답률 낮은 순: " + ruleA.title + "(" + expectedA + "%) → " + ruleB.title + "(100%)",
  weakTitles[0] === ruleA.title && weakTitles[1] === ruleB.title && !!valueA && valueA.textContent === expectedA + "%",
  weakTitles.slice(0, 2).join(" / ") + " · " + (valueA ? valueA.textContent : "정답률 없음"));

console.log(domFailures ? "\n화면 검사 실패 " + domFailures : "\n화면 검사 통과");
if (failureCount || domFailures) process.exit(1);
