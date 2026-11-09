"use strict";

// 회화 데이터(PATTERNS, ROLEPLAYS, SHADOWING) 검사 + 가짜 DOM으로 회화 화면 로드·채점 검사
// 실행: node tools/check-speaking.js  (외부 패키지 불필요)

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const dataPath = path.join(root, "data", "speaking.js");
const dataContext = { window: {} };
vm.runInNewContext(fs.readFileSync(dataPath, "utf8"), dataContext, { filename: dataPath });
const { PATTERNS: patterns, ROLEPLAYS: rolePlays, SHADOWING: shadowing } = dataContext.window;
if (!Array.isArray(patterns) || !Array.isArray(rolePlays) || !Array.isArray(shadowing)) {
  console.error("검사 실패: data/speaking.js에서 PATTERNS, ROLEPLAYS, SHADOWING 배열을 찾을 수 없습니다.");
  process.exit(1);
}

// ---------- 1. 데이터 검사 ----------

const failures = {
  patternFields: [],
  drillFields: [],
  rolePlayTurns: [],
  shadowingFields: [],
  duplicateIds: []
};
const labels = {
  patternFields: "패턴 필수 필드(pattern, meaning, tip, drills 1개 이상) 누락",
  drillFields: "드릴 ko/en 누락",
  rolePlayTurns: "롤플레이 me 턴의 instruction/model/comment 누락",
  shadowingFields: "쉐도잉 필수 필드(en, ko, level) 누락",
  duplicateIds: "ID 중복/누락"
};
const seenIds = Object.create(null);
const nonEmpty = value => typeof value === "string" && value.trim() !== "";
function checkId(id, label) {
  if (!nonEmpty(id)) { failures.duplicateIds.push({ id: label, reason: "id 없음" }); return; }
  if (seenIds[id]) failures.duplicateIds.push({ id, firstSeen: seenIds[id] });
  else seenIds[id] = label;
}

patterns.forEach((pattern, index) => {
  pattern = pattern || {};
  const label = pattern.id || "패턴 #" + (index + 1);
  checkId(pattern.id, "PATTERNS " + label);
  const missing = ["pattern", "meaning", "tip"].filter(key => !nonEmpty(pattern[key]));
  if (!Array.isArray(pattern.drills) || pattern.drills.length < 1) missing.push("drills");
  if (missing.length) failures.patternFields.push({ id: label, missing });
  (pattern.drills || []).forEach((drill, dIndex) => {
    drill = drill || {};
    const lack = ["ko", "en"].filter(key => !nonEmpty(drill[key]));
    if (lack.length) failures.drillFields.push({ id: label + " 드릴 " + (dIndex + 1), missing: lack });
  });
});

rolePlays.forEach((rolePlay, index) => {
  rolePlay = rolePlay || {};
  const label = rolePlay.id || "롤플레이 #" + (index + 1);
  checkId(rolePlay.id, "ROLEPLAYS " + label);
  if (!Array.isArray(rolePlay.turns) || !rolePlay.turns.length) {
    failures.rolePlayTurns.push({ id: label, reason: "turns 없음" });
    return;
  }
  rolePlay.turns.forEach((turn, tIndex) => {
    if (!turn || turn.who !== "me") return;
    const lack = ["instruction", "model", "comment"].filter(key => !nonEmpty(turn[key]));
    if (lack.length) failures.rolePlayTurns.push({ id: label + " 턴 " + (tIndex + 1), missing: lack });
  });
});

shadowing.forEach((item, index) => {
  item = item || {};
  const label = item.id || "쉐도잉 #" + (index + 1);
  checkId(item.id, "SHADOWING " + label);
  const missing = ["en", "ko"].filter(key => !nonEmpty(item[key]));
  if (!Number.isInteger(item.level)) missing.push("level");
  if (missing.length) failures.shadowingFields.push({ id: label, missing });
});

let dataFailures = 0;
Object.keys(failures).forEach(key => {
  if (!failures[key].length) return;
  dataFailures += 1;
  console.log("✗ " + labels[key] + " (" + failures[key].length + "건)");
  failures[key].forEach(failure => console.log("  " + JSON.stringify(failure)));
});
const drillCount = patterns.reduce((sum, p) => sum + ((p && p.drills) || []).length, 0);
console.log("데이터: 패턴 " + patterns.length + "개(드릴 " + drillCount + "개), 롤플레이 " + rolePlays.length +
  "개, 쉐도잉 " + shadowing.length + "개" + (dataFailures ? "" : " — 이상 없음"));

// ---------- 2. 화면 로드·채점 검사 (가짜 DOM + 실제 common.js·speech.js) ----------

class El {
  constructor(tag) {
    this.tagName = tag.toUpperCase(); this.children = []; this.parentNode = null; this.attrs = {}; this.dataset = {};
    this.hidden = false; this.disabled = false; this.className = ""; this.id = ""; this.value = "";
    this.listeners = {}; this._text = "";
    const self = this;
    const cls = () => self.className.split(/\s+/).filter(Boolean);
    this.classList = {
      add: c => { if (!cls().includes(c)) self.className = cls().concat(c).join(" "); },
      remove: c => { self.className = cls().filter(x => x !== c).join(" "); },
      contains: c => cls().includes(c),
      toggle(c, f) { const on = f === undefined ? !this.contains(c) : !!f; on ? this.add(c) : this.remove(c); return on; }
    };
  }
  set textContent(v) { this.children = []; this._text = String(v); }
  get textContent() { return this._text + this.children.map(c => c.textContent).join(""); }
  get lastChild() { return this.children[this.children.length - 1] || null; }
  appendChild(c) { c.parentNode = this; this.children.push(c); return c; }
  append(...cs) { cs.forEach(c => this.appendChild(c)); }
  replaceChildren(...cs) { this.children = []; this._text = ""; this.append(...cs); }
  remove() { if (this.parentNode) this.parentNode.children = this.parentNode.children.filter(c => c !== this); this.parentNode = null; }
  setAttribute(k, v) { this.attrs[k] = String(v); if (k === "id") this.id = String(v); }
  getAttribute(k) { return k in this.attrs ? this.attrs[k] : (k === "id" && this.id ? this.id : null); }
  hasAttribute(k) { return k in this.attrs; }
  removeAttribute(k) { delete this.attrs[k]; }
  addEventListener(t, f) { (this.listeners[t] = this.listeners[t] || []).push(f); }
  removeEventListener() {}
  dispatch(t, extra) { (this.listeners[t] || []).forEach(f => f(Object.assign({ key: "", preventDefault() {} }, extra))); }
  click() { if (!this.disabled) this.dispatch("click"); }
  focus() {} blur() {} scrollIntoView() {}
  all() { return this.children.flatMap(c => [c, ...c.all()]); }
  matches(sel) {
    const re = /\.([\w-]+)|\[([\w-]+)(\^?=)"([^"]*)"\]/g; let m, ok = true;
    while ((m = re.exec(sel))) {
      if (m[1]) ok = ok && this.classList.contains(m[1]);
      else { const v = this.getAttribute(m[2]); ok = ok && v !== null && (m[3] === "=" ? v === m[4] : v.startsWith(m[4])); }
    }
    return ok;
  }
  querySelectorAll(sel) { return this.all().filter(e => e.matches(sel)); }
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
}

function runSpeakingPage() {
  const errors = [];
  const check = (cond, message) => { if (!cond) errors.push(message); };

  const body = new El("body");
  const add = id => { const e = new El("div"); e.id = id; body.appendChild(e); return e; };
  const header = add("site-header");
  header.querySelector = sel => (sel === ".theme-toggle" ? new El("button") : null);
  add("site-footer");
  ["patterns", "roleplay", "shadowing"].forEach(name => {
    const tab = add("speaking-tab-" + name); tab.setAttribute("role", "tab");
    add("speaking-panel-" + name);
  });
  const patternRoot = add("speaking-pattern-exercise");
  add("speaking-roleplay-exercise");
  const shadowingRoot = add("speaking-shadowing-exercise");
  add("speaking-notice");

  const store = new Map();
  const ready = [];
  const document = {
    readyState: "loading",
    documentElement: new El("html"),
    createElement: t => new El(t),
    createTextNode: t => { const n = new El("#text"); n._text = String(t); return n; },
    getElementById: id => body.all().find(e => e.id === id) || null,
    querySelectorAll: s => body.querySelectorAll(s),
    querySelector: s => body.querySelector(s),
    addEventListener: (t, f) => { if (t === "DOMContentLoaded") ready.push(f); }
  };
  const window = {
    document,
    location: { pathname: "/english-lab/pages/speaking.html", hash: "", hostname: "localhost" },
    isSecureContext: true,
    addEventListener() {}, removeEventListener() {},
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    setTimeout, clearTimeout
  };
  const localStorage = {
    getItem: k => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: k => store.delete(k)
  };
  const ctx = vm.createContext({ window, document, localStorage, console, setTimeout, clearTimeout, Promise });
  for (const file of ["assets/js/common.js", "assets/js/speech.js", "data/speaking.js", "assets/js/speaking.js"]) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), ctx, { filename: file });
  }
  try { ready.forEach(f => f()); } catch (error) { errors.push("초기화 오류: " + error.message); return errors; }

  const W = window;
  const P = W.PATTERNS;
  const S = W.SHADOWING;
  const answerWith = (stage, text) => {
    const input = stage.querySelector(".speaking-answer");
    if (!input) return false;
    input.value = text; input.dispatch("input");
    const submit = stage.querySelectorAll(".button").find(b => b.textContent === "제출");
    if (!submit) return false;
    submit.click();
    return true;
  };
  const buttonByText = (stage, text) => stage.querySelectorAll(".button").find(b => b.textContent === text);

  // 패턴: 틀린 답 → 재시도 확인 후, 모든 패턴의 모든 드릴을 모범답안으로 통과시킨다
  answerWith(patternRoot, "completely wrong words");
  check(!!patternRoot.querySelector(".is-retry"), "틀린 답에 재시도 표시 없음");
  const retry = buttonByText(patternRoot, "다시 도전");
  check(!!retry, "다시 도전 버튼 없음");
  if (retry) retry.click();

  let drillsPassed = 0;
  P.forEach((pattern, pIndex) => {
    pattern.drills.forEach((drill, dIndex) => {
      const progress = patternRoot.querySelector(".speaking-progress").textContent;
      const expected = "패턴 " + (pIndex + 1) + " / " + P.length + " · 문장 " + (dIndex + 1) + " / " + pattern.drills.length;
      check(progress === expected, pattern.id + " 진행 표시 — " + progress);
      check(patternRoot.querySelector(".speaking-prompt").textContent === drill.ko, pattern.id + " 드릴 " + (dIndex + 1) + " 한국어 불일치");
      check(patternRoot.querySelector(".speaking-pattern-meaning").textContent === pattern.meaning, pattern.id + " 뜻 불일치");
      if (!answerWith(patternRoot, drill.en)) { check(false, pattern.id + " 입력창/제출 버튼 없음"); return; }
      const score = patternRoot.querySelector(".speaking-score");
      check(!!patternRoot.querySelector(".is-passed") && score && score.textContent === "통과 · 정확도 100%",
        pattern.id + " 드릴 " + (dIndex + 1) + " 모범답안이 통과하지 못함 — " + (score && score.textContent));
      const last = dIndex === pattern.drills.length - 1;
      const next = buttonByText(patternRoot, last ? "패턴 완료" : "다음 문장");
      if (!next) { check(false, pattern.id + " 다음 버튼 없음"); return; }
      drillsPassed += 1;
      next.click();
    });
  });
  const stats = W.Progress.get().speakingStats;
  check(stats.patternsPassed.length === P.length, "완료 패턴 기록 " + stats.patternsPassed.length + " / " + P.length);
  check(patternRoot.querySelector(".speaking-progress").textContent.startsWith("패턴 1 / "), "마지막 패턴 뒤 처음으로 돌아오지 않음");
  check(patternRoot.querySelector(".speaking-saved-progress").textContent === "완료한 패턴 " + P.length + " / " + P.length,
    "완료 패턴 표시 — " + patternRoot.querySelector(".speaking-saved-progress").textContent);

  // 쉐도잉: 짧은 문장 순으로 정렬된 20문장을 차례로 따라 말하고 다음으로 넘긴다
  const seenShadowing = new Set();
  for (let i = 0; i < S.length; i++) {
    const progress = shadowingRoot.querySelector(".speaking-progress").textContent;
    check(progress.startsWith("문장 " + (i + 1) + " / " + S.length), "쉐도잉 진행 표시 — " + progress);
    const en = shadowingRoot.querySelector(".speaking-shadow-model").textContent;
    const item = S.find(s => s.en === en);
    if (!item) { check(false, "쉐도잉 문장 원본 없음 — " + en); break; }
    check(shadowingRoot.querySelector(".speaking-prompt").textContent === item.ko, item.id + " 한국어 불일치");
    check(progress.endsWith("난이도 " + item.level), item.id + " 난이도 표시 — " + progress);
    seenShadowing.add(item.id);
    answerWith(shadowingRoot, item.en);
    const score = shadowingRoot.querySelector(".speaking-score");
    check(score && score.textContent === "발음 정확도 100%", item.id + " 정확도 — " + (score && score.textContent));
    const next = buttonByText(shadowingRoot, "다음 문장");
    if (i < S.length - 1) {
      if (!next) { check(false, item.id + " 다음 문장 버튼 없음"); break; }
      next.click();
    } else {
      check(!next, "마지막 문장에 다음 버튼이 있음");
    }
  }
  check(seenShadowing.size === S.length, "쉐도잉 로드 수 " + seenShadowing.size + " / " + S.length);
  const after = W.Progress.get().speakingStats;
  check(after.shadowingCount === S.length && Math.round(after.shadowingAvg * 100) === 100,
    "쉐도잉 기록 — 횟수 " + after.shadowingCount + ", 평균 " + Math.round(after.shadowingAvg * 100) + "%");

  console.log("화면: 패턴 " + P.length + "개 · 드릴 " + drillsPassed + "개 통과, 쉐도잉 " + seenShadowing.size +
    "문장 로드·채점" + (errors.length ? "" : " — 이상 없음"));
  return errors;
}

const renderErrors = runSpeakingPage();
renderErrors.forEach(message => console.log("✗ " + message));

if (dataFailures || renderErrors.length) {
  console.log("검사 실패");
  process.exit(1);
}
console.log("모든 회화 검사 통과");
