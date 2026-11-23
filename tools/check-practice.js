"use strict";

// 실전 페이지(practice.js + 실제 common.js)를 가짜 DOM·가짜 시계·가짜 localStorage로 실행해 검증한다.
// 실행: node tools/check-practice.js  (외부 패키지 불필요, 모의고사는 매번 무작위로 출제됨)
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.join(__dirname, '..');
let failures = 0;
function check(name, cond, detail) {
  console.log((cond ? '  ✔ ' : '  ✘ ') + name + (detail !== undefined ? ' — ' + detail : ''));
  if (!cond) failures++;
}

class El {
  constructor(tag) {
    this.tagName = tag.toUpperCase(); this.children = []; this.attrs = {}; this.dataset = {};
    this.hidden = false; this.disabled = false; this.className = ''; this.id = ''; this.value = '';
    this.listeners = {}; this._text = ''; this.href = '';
    const self = this;
    const cls = () => self.className.split(/\s+/).filter(Boolean);
    this.classList = {
      add: c => { if (!cls().includes(c)) self.className = cls().concat(c).join(' '); },
      remove: c => { self.className = cls().filter(x => x !== c).join(' '); },
      contains: c => cls().includes(c),
      toggle(c, f) { const on = f === undefined ? !this.contains(c) : !!f; on ? this.add(c) : this.remove(c); return on; }
    };
  }
  set textContent(v) { this.children = []; this._text = String(v); }
  get textContent() { return this._text + this.children.map(c => c.textContent).join(''); }
  appendChild(c) { this.children.push(c); return c; }
  append(...cs) { cs.forEach(c => this.appendChild(c)); }
  replaceChildren(...cs) { this.children = []; this._text = ''; this.append(...cs); }
  setAttribute(k, v) { this.attrs[k] = String(v); if (k === 'id') this.id = String(v); }
  getAttribute(k) { return k in this.attrs ? this.attrs[k] : (k === 'id' && this.id ? this.id : null); }
  removeAttribute(k) { delete this.attrs[k]; }
  addEventListener(t, f) { (this.listeners[t] = this.listeners[t] || []).push(f); }
  dispatch(t) { (this.listeners[t] || []).forEach(f => f({ key: '', preventDefault() {} })); }
  click() { if (!this.disabled) this.dispatch('click'); }
  focus() {} scrollIntoView() {}
  all() { return this.children.flatMap(c => [c, ...c.all()]); }
  matches(sel) {
    const re = /\.([\w-]+)|\[([\w-]+)(\^?=)"([^"]*)"\]/g; let m, ok = true;
    while ((m = re.exec(sel))) {
      if (m[1]) ok = ok && this.classList.contains(m[1]);
      else { const v = this.getAttribute(m[2]); ok = ok && v !== null && (m[3] === '=' ? v === m[4] : v.startsWith(m[4])); }
    }
    return ok;
  }
  querySelectorAll(sel) { return this.all().filter(e => e.matches(sel)); }
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
}

// --- 페이지 골격 (practice.html과 동일한 id) ---
const body = new El('body');
const add = (tag, id, parent = body) => { const e = new El(tag); e.id = id; parent.appendChild(e); return e; };
const header = add('div', 'site-header');
header.querySelector = sel => sel === '.theme-toggle' ? new El('button') : null;
['mock', 'parts', 'history'].forEach(n => {
  const t = add('button', 'practice-tab-' + n); t.setAttribute('role', 'tab');
  add('section', 'practice-panel-' + n);
});
const mockStage = add('div', 'practice-mock-stage');
const partForm = add('form', 'practice-part-form');
const partSelect = add('select', 'practice-part-select');
const partStage = add('div', 'practice-part-stage');
const historyRoot = add('div', 'practice-history');

let now = 1_800_000_000_000;
let intervalFn = null;
const store = new Map();
const ready = [];
const document = {
  readyState: 'loading',
  documentElement: new El('html'),
  createElement: t => new El(t),
  getElementById: id => body.all().find(e => e.id === id) || null,
  querySelectorAll: s => body.querySelectorAll(s),
  addEventListener: (t, f) => { if (t === 'DOMContentLoaded') ready.push(f); }
};
document.documentElement.hasAttribute = () => false;
const FakeDate = class extends Date { constructor(...a) { super(...(a.length ? a : [now])); } static now() { return now; } };
const window = {
  document, location: { pathname: '/english-lab/pages/practice.html', hash: '' },
  addEventListener() {}, matchMedia: () => ({ matches: false }),
  // 1초 주기만 시험 타이머로 잡는다 (speech.js의 14초 keep-alive는 무시).
  setInterval: (fn, ms) => { if (ms !== 1000) return 70; intervalFn = fn; return 7; }, clearInterval: id => { if (id === 7) intervalFn = null; },
  setTimeout: () => 71, clearTimeout() {},
  confirm: () => true
};
const localStorage = {
  getItem: k => store.has(k) ? store.get(k) : null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k)
};
const PAGE_FILES = ['assets/js/common.js', 'assets/js/speech.js', 'assets/js/listening-voices.js', 'assets/js/listening-graphic.js',
  'data/grammar.js', 'data/reading.js', 'data/listening.js', 'data/part1.js', 'assets/js/practice.js'];
const ctx = vm.createContext({ window, document, localStorage, console, Date: FakeDate });
for (const f of PAGE_FILES) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
}
ready.forEach(f => f());
const W = window;

// --- 6. 메뉴 ---
console.log('\n[메뉴]');
const navLabels = [...header.innerHTML.matchAll(/class="nav-link"[^>]*>([^<]+)</g)].map(m => m[1]);
check('메뉴 7개', navLabels.length === 7, navLabels.join(' / '));
check('메뉴 순서', navLabels.join('/') === '홈/보카/문법/리스닝/독해/회화/실전');
check('실전 메뉴에 aria-current', /aria-current="page">실전</.test(header.innerHTML));

// --- 정답 판별 도우미: 화면에 보이는 정보만으로 원본 데이터의 정답을 찾는다 ---
function currentAnswer(area) {
  const meta = area.querySelector('.practice-question-meta').textContent;
  const prompt = area.querySelector('.practice-question-prompt').textContent.replace(/^\d+\.\s*/, '');
  if (meta.startsWith('Part 5')) return { part: 'p5', q: W.GRAMMAR_QUIZ.find(q => q.question === prompt) };
  if (meta.startsWith('Part 7')) {
    for (const p of W.PASSAGES) { const q = p.questions.find(x => x.q === prompt); if (q) return { part: 'p7', q }; }
    return { part: 'p7', q: null };
  }
  const headerText = area.querySelector('.reading-passage-header').textContent;
  const set = W.PART6.find(s => s.header.join('') === headerText);
  const blanks = area.querySelectorAll('.practice-blank');
  const n = blanks.findIndex(b => b.classList.contains('is-current')) + 1;
  return { part: 'p6', q: set.questions.find(q => q.n === n), set };
}

// --- 2~5. 미니 모의고사 (수동 제출) ---
// 실전 첫 화면: 두 모드 카드
console.log('\n[실전 진입 화면]');
const modeCards = mockStage.querySelectorAll('.practice-mode-card');
check('모드 카드 3개 (미니 모의고사 · RC 풀세트 · LC 풀세트)', modeCards.length === 3 &&
  modeCards[0].textContent.includes('미니 모의고사') && modeCards[1].textContent.includes('RC 풀세트') && modeCards[2].textContent.includes('LC 풀세트'),
  modeCards.map(c => c.dataset.mode).join(', '));
check('LC 카드에 구성·시간 (실제 LC 구성 100문항 · Part 1 포함)', modeCards[2] && modeCards[2].textContent.includes('100문항 · 45분') &&
  modeCards[2].textContent.includes('실제 토익 LC와 같은 구성') && !modeCards[2].textContent.includes('제외') &&
  modeCards[2].textContent.includes('Part 1 6문항 · Part 2 25문항 · Part 3 39문항(대화 13개) · Part 4 30문항(담화 10개)'), modeCards[2] && modeCards[2].textContent);
check('미니 카드에 구성·시간', modeCards[0] && modeCards[0].textContent.includes('30~31문항 · 25분') && modeCards[0].textContent.includes('Part 5 15문항 + Part 6 8문항'));
check('풀세트 카드에 구성·시간', modeCards[1] && modeCards[1].textContent.includes('100문항 · 75분') &&
  modeCards[1].textContent.includes('실제 토익 RC와 같은 구성(Part 5·6·7)'));
modeCards[0].querySelectorAll('.button').find(b => b.textContent === '미니 모의고사 선택').click();
console.log('\n[미니 모의고사 — 수동 제출]');
const startBtn = mockStage.querySelectorAll('.button').find(b => b.textContent === '모의고사 시작');
// Part 7은 지문을 자르지 않으므로 7~8문항, 총 30~31문항이다. 시작 화면에 보인 구성이 실제 시험과 같아야 한다.
const introMatch = /Part 5 15문항 \+ Part 6 8문항 \+ Part 7 (\d+)문항/.exec(mockStage.textContent);
const P7 = introMatch ? Number(introMatch[1]) : -1;
const TOTAL = 15 + 8 + P7;
check('시작 화면 문항 구성 안내 (Part 7 7~8문항)', P7 === 7 || P7 === 8, introMatch ? introMatch[0] : mockStage.textContent);
check('시작 화면 총 문항 수', mockStage.textContent.includes('RC 미니 모의고사 · ' + TOTAL + '문항'), 'TOTAL=' + TOTAL);
startBtn.click();
const startedAt = now;
const area = mockStage.querySelector('.practice-question-area');
const omr = mockStage.querySelector('.practice-omr');
const timerBar = mockStage.querySelector('.practice-timer-bar');
const sections = omr.querySelectorAll('.practice-omr-section');
const counts = sections.map(s => s.querySelector('.practice-omr-part').textContent + '=' + s.querySelectorAll('.practice-omr-cell').length);
check('OMR ' + TOTAL + '칸 (시작 화면과 같은 수)', omr.querySelectorAll('.practice-omr-cell').length === TOTAL);
check('Part별 개수 15/8/' + P7, counts.join(',') === 'Part 5=15,Part 6=8,Part 7=' + P7, counts.join(', '));
check('초기 타이머 25:00', timerBar.querySelector('.practice-time').textContent === '25:00');
check('중간에 정답 표시 없음', !area.querySelector('.correct') && !area.querySelector('.answer-right'));

const expected = { p5: 0, p6: 0, p7: 0 }; let answered = 0; let ruleAnswered = 0; const seenP5 = new Set(); const p7Groups = new Map(); const p6Groups = new Map();
let firstChoiceWasCorrect = 0; const vocabInExam = [];
for (let i = 0; i < TOTAL; i++) {
  mockStage.querySelector('.practice-omr').querySelectorAll('.practice-omr-cell')[i].click();
  const a = mockStage.querySelector('.practice-question-area');
  const meta = a.querySelector('.practice-question-meta').textContent;
  if (!meta.includes(' ' + (i + 1) + ' / ' + TOTAL)) check('OMR ' + (i + 1) + '번 이동', false, meta);
  const cur = mockStage.querySelector('.practice-omr').querySelectorAll('.practice-omr-cell.is-current');
  if (cur.length !== 1 || !cur[0].textContent.startsWith(String(i + 1))) check('현재 칸 표시 ' + (i + 1), false);
  if (mockStage.querySelectorAll('.reading-vocab-section').length) vocabInExam.push(i + 1);
  const { part, q, set } = currentAnswer(a);
  if (!q) { check('문항 원본 찾기 ' + (i + 1), false, meta); continue; }
  if (part === 'p5') seenP5.add(q.question);
  if (part === 'p6') p6Groups.set(set.id, (p6Groups.get(set.id) || 0) + 1);
  if (part === 'p7') { const key = a.querySelector('.reading-passage-type').textContent; p7Groups.set(key, (p7Groups.get(key) || 0) + 1); }
  if (i % 5 === 0) continue; // 미응답
  const choice = i % 3 === 0 ? (q.answer + 1) % 4 : q.answer;
  a.querySelectorAll('.quiz-option')[choice].click();
  answered++;
  if (q.ruleId) ruleAnswered++;
  if (choice === q.answer) expected[part]++;
}
check('Part 5 중복 없음', seenP5.size === 15);
// 모의고사는 실전이라 Part 6·7 모두 어휘 목록을 보여 주지 않는다.
check('모의고사 화면에 어휘 목록 없음 (전 ' + TOTAL + '문항)', vocabInExam.length === 0, vocabInExam.length ? vocabInExam.join(',') + '번' : '');
// Part 6도 같은 방식: 마지막 세트 앞까지는 4문항 전부, 합계 8문항.
const p6Ids = [...p6Groups.keys()];
const p6Used = p6Ids.map(id => p6Groups.get(id));
const p6Full = p6Ids.map(id => W.PART6.find(s => s.id === id).questions.length);
check('Part 6 세트 구성', p6Used.reduce((s, n) => s + n, 0) === 8 &&
  p6Used.slice(0, -1).every((n, i) => n === p6Full[i]) &&
  p6Used.slice(0, -1).reduce((s, n) => s + n, 0) < 8,
  'P6 세트 ' + p6Ids.join('+') + ' (사용 문항 ' + p6Used.join('+') + ')');
// Part 7은 지문 2~3개를 통째로 낸다. 합은 7~8문항.
const p7Titles = [...p7Groups.keys()];
const p7Passages = p7Titles.map(t => W.PASSAGES.find(p => p.type + ' · ' + p.title === t));
const p7Full = p7Passages.map(p => p.questions.length);
const p7Used = p7Titles.map(t => p7Groups.get(t));
check('Part 7 지문 구성', p7Used.length >= 2 && p7Used.length <= 3 &&
  p7Used.reduce((s, n) => s + n, 0) === P7,
  p7Titles.join(' | ') + ' (사용 문항 ' + p7Used.join('+') + ' / 지문별 문항 ' + p7Full.join('+') + ')');
// 지문을 자른 흔적이 있으면 실패: 출제된 각 지문의 문항 수 = 데이터의 문항 수
check('Part 7 지문을 자르지 않음', p7Used.every((n, i) => n === p7Full[i]),
  p7Titles.map((t, i) => p7Passages[i].id + ' ' + p7Used[i] + '/' + p7Full[i]).join(', '));
console.log('  P7STAT ' + JSON.stringify({ p7: P7, total: TOTAL, ids: p7Passages.map(p => p.id), multi: p7Passages.some(p => Array.isArray(p.parts) && p.parts.length > 1) }));
const filled = mockStage.querySelector('.practice-omr').querySelectorAll('.practice-omr-cell.is-answered').length;
check('푼 문제 OMR 색 채움', filled === answered, filled + '/' + answered);
check('진행 표시', timerBar.querySelector('.practice-progress').textContent === '푼 문제 ' + answered + ' / ' + TOTAL);
// 이전/다음
mockStage.querySelector('.practice-omr').querySelectorAll('.practice-omr-cell')[0].click();
let navBtns = mockStage.querySelector('.practice-question-area').querySelectorAll('.button');
check('1번에서 이전 비활성', navBtns[0].disabled === true);
navBtns[1].click();
check('다음 → 2번', mockStage.querySelector('.practice-question-meta').textContent.includes(' 2 / ' + TOTAL));
mockStage.querySelector('.practice-question-area').querySelectorAll('.button')[0].click();
check('이전 → 1번', mockStage.querySelector('.practice-question-meta').textContent.includes(' 1 / ' + TOTAL));

// 3. 타이머 색
now = startedAt + (25 * 60 - 600) * 1000; intervalFn();
check('10분 남음 → is-warning', timerBar.classList.contains('is-warning') && !timerBar.classList.contains('is-danger'), timerBar.querySelector('.practice-time').textContent);
now = startedAt + (25 * 60 - 180) * 1000; intervalFn();
check('3분 남음 → is-danger', timerBar.classList.contains('is-danger') && !timerBar.classList.contains('is-warning'), timerBar.querySelector('.practice-time').textContent);
now = startedAt + 1000 * 1000; // 16:40 경과 시점에 제출
mockStage.querySelector('.practice-question-area').querySelectorAll('.button').find(b => b.textContent === '제출').click();

// 5. 결과
const total = expected.p5 + expected.p6 + expected.p7;
const result = mockStage.querySelector('.practice-result');
check('결과 화면 표시', !!result);
check('총점', result.querySelector('.practice-result-score').textContent === '총점 ' + total + ' / ' + TOTAL, result.querySelector('.practice-result-score').textContent);
const partScores = result.querySelectorAll('.practice-part-score').map(e => e.textContent);
check('파트별 성적', partScores.join(',') === `Part 5${expected.p5} / 15,Part 6${expected.p6} / 8,Part 7${expected.p7} / ${P7}`, partScores.join(', '));
const bands = [[0, 9, '100~200'], [10, 14, '200~300'], [15, 19, '300~350'], [20, 23, '350~400'], [24, 26, '400~450'], [27, 30, '450~495']];
const scaledTotal = TOTAL === 30 ? total : Math.round(total / TOTAL * 30); // 30문항 기준 환산
const band = bands.find(b => scaledTotal >= b[0] && scaledTotal <= b[1])[2];
check('환산 점수대 (30문항 기준 ' + scaledTotal + ')', result.querySelector('.practice-band-value').textContent === band + '점대', result.querySelector('.practice-band-value').textContent);
check('참고용 문구', result.textContent.includes('실제 토익 점수와 다를 수 있는 참고용 추정치입니다.'));
check('소요 시간 16:40, 제한 내', result.querySelector('.practice-result-time').textContent.startsWith('소요 시간 16:40') && !result.querySelector('.practice-result-time').classList.contains('is-timeout'));
const misses = result.querySelectorAll('.practice-miss');
check('틀린 문제 수 = 총 문항 - 맞은 수', misses.length === TOTAL - total, misses.length);
check('미응답 표시', misses.filter(m => m.textContent.includes('내 답: 미응답')).length === TOTAL - answered);
const links = result.querySelectorAll('.grammar-note-link');
check('노트 링크 형식', links.length > 0 && links.every(l => /^grammar\.html#grammar-note-g\d{2}$/.test(l.href)), links.length + '개');
check('정답 노출은 결과에서만', result.querySelectorAll('.practice-miss-answer.is-correct').length === misses.length);

// 진도 저장
let saved = JSON.parse(store.get('englishLabProgress'));
check('practiceStats 1회 저장', saved.practiceStats.attempts.length === 1);
const at = saved.practiceStats.attempts[0];
check('저장값', at.correct === total && at.total === TOTAL && at.elapsedSec === 1000 && at.timedOut === false &&
  at.partScores.p5 === expected.p5 && at.partScores.p6 === expected.p6 && at.partScores.p7 === expected.p7, JSON.stringify(at));
const solvedSum = Object.values(saved.grammarStats).reduce((s, g) => s + g.solved, 0);
check('grammarStats 반영 (응답한 ruleId 문항 수)', solvedSum === ruleAnswered, solvedSum + '/' + ruleAnswered);

// --- 3. 자동 제출 ---
console.log('\n[미니 모의고사 — 시간 종료 자동 제출]');
W.confirm = () => { throw new Error('자동 제출 시 confirm이 호출되면 안 됨'); };
result.querySelectorAll('.button').find(b => b.textContent === '다시 응시').click();
const start2 = now;
const area2 = mockStage.querySelector('.practice-question-area');
area2.querySelectorAll('.quiz-option')[0].click();
now = start2 + 25 * 60 * 1000; intervalFn();
const result2 = mockStage.querySelector('.practice-result');
check('시간 종료 시 결과 화면', !!result2);
check('시간 초과 문구', result2 && result2.querySelector('.practice-result-time').textContent.includes('시간 초과로 자동 제출') &&
  result2.querySelector('.practice-result-time').textContent.startsWith('소요 시간 25:00'));
check('타이머 정지', intervalFn === null);
saved = JSON.parse(store.get('englishLabProgress'));
check('2회차 timedOut 저장', saved.practiceStats.attempts.length === 2 && saved.practiceStats.attempts[1].timedOut === true);

// --- 기록 탭 ---
console.log('\n[기록]');
document.getElementById('practice-tab-history').click();
check('기록 탭 열림', document.getElementById('practice-panel-history').hidden === false && document.getElementById('practice-panel-mock').hidden === true);
check('이력 행 2개', historyRoot.querySelectorAll('.practice-history-table')[0] && historyRoot.querySelector('.practice-history-table').all().filter(e => e.tagName === 'TR').length === 3);
check('추이 3줄', historyRoot.querySelectorAll('.practice-trend-row').length === 3, historyRoot.querySelectorAll('.practice-trend-values').map(e => e.textContent).join(' | '));
check('getPracticeHistory', W.Progress.getPracticeHistory().length === 2);

// --- 파트별 연습 ---
console.log('\n[파트별 연습]');
for (let [part, cards] of [['p5', 10], ['p6', 4], ['p7', 3]]) {
  partSelect.value = part; partForm.dispatch('submit');
  const drills = partStage.querySelectorAll('.practice-drill-card');
  if (part === 'p7') {
    const title = partStage.querySelector('.reading-passage-type').textContent;
    cards = W.PASSAGES.find(p => p.type + ' · ' + p.title === title).questions.length;
  }
  check(part + ' 문항 수', drills.length === cards, drills.length);
  drills[0].querySelectorAll('.quiz-option')[0].click();
  const fb = drills[0].querySelector('.practice-drill-feedback');
  check(part + ' 즉시 채점·해설', !!(fb.querySelector('.answer-right') || fb.querySelector('.answer-wrong')) && !!fb.querySelector('.practice-drill-explanation'));
  check(part + ' 선택지 잠김', drills[0].querySelectorAll('.quiz-option').every(o => o.disabled));
  if (part === 'p6') check('p6 지문 빈칸 4개', partStage.querySelectorAll('.practice-blank').length === 4);
}

// --- Part 6 전 세트: 파트별 연습을 반복해 모든 세트를 한 번씩 렌더링·채점한다 ---
console.log('\n[Part 6 전 세트 렌더링·채점]');
const p6Checked = new Set();
for (let tries = 0; tries < 300 && p6Checked.size < W.PART6.length; tries++) {
  partSelect.value = 'p6'; partForm.dispatch('submit');
  const title = partStage.querySelector('.reading-passage-type').textContent.replace(/^Part 6 · /, '');
  const set = W.PART6.find(s => s.title === title);
  if (!set) { check('Part 6 세트 찾기', false, title); break; }
  if (p6Checked.has(set.id)) continue;
  p6Checked.add(set.id);
  const problems = [];
  const text = partStage.querySelector('.practice-drill-passage').textContent;
  const blanks = partStage.querySelectorAll('.practice-blank');
  if (blanks.length !== set.questions.length) problems.push('빈칸 ' + blanks.length);
  set.blocks.filter(b => b.type === 'text').forEach(b => { if (!text.includes(b.en.trim())) problems.push('본문 누락'); });
  // 어휘 목록: 독해 탭 Part 7처럼 채점 전부터 보여야 하고, vocab이 없으면 영역 자체가 없어야 한다.
  const vocabSections = partStage.querySelectorAll('.reading-vocab-section');
  if (Array.isArray(set.vocab) && set.vocab.length) {
    const items = vocabSections.length === 1 ? vocabSections[0].querySelector('.reading-vocab-list').children : [];
    if (vocabSections.length !== 1 || vocabSections[0].hidden) problems.push('어휘 영역 없음/숨김');
    else if (items.length !== set.vocab.length || set.vocab.some((v, i) =>
      items[i].querySelector('.reading-vocab-word').textContent !== v.w ||
      items[i].querySelector('.reading-vocab-meaning').textContent !== v.m)) problems.push('어휘 ' + items.length + '/' + set.vocab.length);
  } else if (vocabSections.length) problems.push('vocab 없는데 어휘 영역이 그려짐');
  const drills = partStage.querySelectorAll('.practice-drill-card');
  if (drills.length !== set.questions.length) problems.push('문항 ' + drills.length);
  drills.forEach((card, i) => {
    card.querySelectorAll('.quiz-option')[set.questions[i].answer].click();
    if (!card.querySelector('.answer-right')) problems.push((i + 1) + '번 정답 처리 안 됨');
    if (!card.querySelector('.practice-drill-explanation')) problems.push((i + 1) + '번 해설 없음');
  });
  const translation = partStage.querySelector('.practice-translation');
  const toggle = partStage.querySelectorAll('.button').find(b => b.textContent === '📖 해석 보기');
  if (!translation || !toggle) problems.push('해석 토글 없음');
  else {
    toggle.click();
    if (translation.hidden || translation.textContent !== set.ko) problems.push('해석 표시 안 됨');
  }
  check(set.id + ' ' + set.title, problems.length === 0, problems.length ? problems.join(', ') : '빈칸 ' + blanks.length + '개, 어휘 ' + (set.vocab ? set.vocab.length + '개' : '없음') + ', 4문항 정답 처리, 해석 토글');
}
check('Part 6 전 세트 확인', p6Checked.size === W.PART6.length, p6Checked.size + ' / ' + W.PART6.length);

// --- Part 7 전 지문: 파트별 연습에서 독해 탭과 같은 어휘 목록이 채점 전부터 보여야 한다 ---
console.log('\n[Part 7 전 지문 어휘 표시]');
const p7Checked = new Set(); const p7VocabProblems = [];
for (let tries = 0; tries < 2000 && p7Checked.size < W.PASSAGES.length; tries++) {
  partSelect.value = 'p7'; partForm.dispatch('submit');
  const title = partStage.querySelector('.reading-passage-type').textContent;
  const passage = W.PASSAGES.find(p => p.type + ' · ' + p.title === title);
  if (!passage) { check('Part 7 지문 찾기', false, title); break; }
  if (p7Checked.has(passage.id)) continue;
  p7Checked.add(passage.id);
  const sections = partStage.querySelectorAll('.reading-vocab-section');
  const items = sections.length === 1 ? sections[0].querySelector('.reading-vocab-list').children : [];
  const vocab = passage.vocab || [];
  const ok = vocab.length ? sections.length === 1 && !sections[0].hidden && items.length === vocab.length &&
    vocab.every((v, i) => items[i].querySelector('.reading-vocab-word').textContent === v.w &&
      items[i].querySelector('.reading-vocab-meaning').textContent === v.m) : sections.length === 0;
  if (!ok) p7VocabProblems.push(passage.id + '(' + items.length + '/' + vocab.length + ')');
}
check('Part 7 전 지문 어휘 표시', p7Checked.size === W.PASSAGES.length && !p7VocabProblems.length,
  p7Checked.size + ' / ' + W.PASSAGES.length + (p7VocabProblems.length ? ' 문제: ' + p7VocabProblems.join(', ') : ''));

// =================== RC 풀세트 ===================
// 같은 localStorage(store)·같은 가짜 시계(now)를 쓰는 새 페이지를 띄운다. "앱을 닫았다 다시 연다"를 흉내 낼 때 쓴다.
const FULL_KEY = 'englishLabFullSetSave';
function loadPracticePage(opts = {}) {
  const pbody = new El('body');
  const padd = (tag, id) => { const e = new El(tag); e.id = id; pbody.appendChild(e); return e; };
  const pheader = padd('div', 'site-header');
  pheader.querySelector = sel => sel === '.theme-toggle' ? new El('button') : null;
  ['mock', 'parts', 'history'].forEach(n => { const t = padd('button', 'practice-tab-' + n); t.setAttribute('role', 'tab'); padd('section', 'practice-panel-' + n); });
  const stage = padd('div', 'practice-mock-stage');
  padd('form', 'practice-part-form'); padd('select', 'practice-part-select'); padd('div', 'practice-part-stage'); padd('div', 'practice-history');
  const pready = [];
  const env = { stage, tick: null, errors: [], warns: [] };
  const docListeners = {};
  const pdoc = {
    readyState: 'loading', documentElement: new El('html'), hidden: false,
    createElement: t => new El(t),
    getElementById: id => pbody.all().find(e => e.id === id) || null,
    querySelectorAll: s => pbody.querySelectorAll(s),
    addEventListener: (t, f) => { if (t === 'DOMContentLoaded') pready.push(f); else (docListeners[t] = docListeners[t] || []).push(f); }
  };
  // 화면 숨김/복귀 (폰 잠금·다른 앱 전환)
  env.hide = () => { pdoc.hidden = true; (docListeners.visibilitychange || []).forEach(f => f({})); };
  env.show = () => { pdoc.hidden = false; (docListeners.visibilitychange || []).forEach(f => f({})); };
  env.byId = id => pdoc.getElementById(id);
  pdoc.documentElement.hasAttribute = () => false;
  const pwin = {
    document: pdoc, location: { pathname: '/english-lab/pages/practice.html', hash: '' },
    addEventListener() {}, matchMedia: () => ({ matches: false }),
    setInterval: (fn, ms) => { if (ms !== 1000) return 90; env.tick = fn; return 9; }, clearInterval: id => { if (id === 9) env.tick = null; },
    setTimeout: () => 91, clearTimeout() {},
    confirm: () => true
  };
  if (opts.synth) { pwin.speechSynthesis = opts.synth; pwin.SpeechSynthesisUtterance = FakeUtterance; env.synth = opts.synth; }
  const pconsole = { log: console.log, info() {}, warn: (...a) => env.warns.push(a.join(' ')), error: (...a) => env.errors.push(a.join(' ')) };
  const c = vm.createContext({ window: pwin, document: pdoc, localStorage, console: pconsole, Date: FakeDate });
  for (const f of PAGE_FILES) {
    vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), c, { filename: f });
    if (f === 'data/part1.js' && opts.mutate) opts.mutate(pwin); // 모든 데이터를 불러온 뒤 바꾼다
  }
  pready.forEach(f => f());
  env.window = pwin;
  return env;
}
const byText = (rootEl, text) => rootEl.querySelectorAll('.button').find(b => b.textContent === text);
const omrCells = env => env.stage.querySelector('.practice-omr').querySelectorAll('.practice-omr-cell');
function startFull(env) {
  byText(env.stage, 'RC 풀세트 선택').click();
  const start = byText(env.stage, '풀세트 시작');
  if (start) start.click();
  return !!start;
}
// 화면에 보이는 정보만으로 지금 문항의 원본을 찾는다.
function identify(env) {
  const Wd = env.window;
  const a = env.stage.querySelector('.practice-question-area');
  const meta = a.querySelector('.practice-question-meta').textContent;
  const [label, rest] = meta.split(' · ');
  const number = parseInt(rest, 10);
  const prompt = a.querySelector('.practice-question-prompt').textContent.replace(/^\d+\.\s*/, '');
  if (label === 'Part 5') {
    const q = Wd.GRAMMAR_QUIZ.find(x => x.question === prompt);
    return { label, number, q, key: q && 'p5:' + q.id };
  }
  if (label === 'Part 6') {
    const headerText = a.querySelector('.reading-passage-header').textContent;
    const set = Wd.PART6.find(s => s.header.join('') === headerText);
    const n = a.querySelectorAll('.practice-blank').findIndex(b => b.classList.contains('is-current')) + 1;
    const q = set && set.questions.find(x => x.n === n);
    return { label, number, q, set, key: set && 'p6:' + set.id + ':' + n };
  }
  const title = a.querySelector('.reading-passage-type').textContent;
  const passage = Wd.PASSAGES.find(p => p.type + ' · ' + p.title === title);
  const qIndex = passage ? passage.questions.findIndex(x => x.q === prompt) : -1;
  return { label, number, q: passage && passage.questions[qIndex], passage, key: passage && 'p7:' + passage.id + ':' + qIndex };
}
const leakSelectors = ['.reading-vocab-section', '.practice-translation', '.reading-sentence-ko'];

// --- 1. 20회 생성: 구성·번호·자르지 않음·중복·Part 5 유형 분산 ---
console.log('\n[RC 풀세트 — 20회 생성]');
store.delete(FULL_KEY);
const gen = loadPracticePage();
check('풀세트 진입 화면에 세 모드', gen.stage.querySelectorAll('.practice-mode-card').length === 3);
const genProblems = [];
let maxRuleSeen = 0, leakCount = 0, omrLabels = null;
const EXPECTED_SECTIONS = { 'Part 5': 30, 'Part 6': 16, 'Part 7 단일': 29, 'Part 7 이중': 10, 'Part 7 삼중': 15 };
for (let run = 0; run < 20; run++) {
  if (!startFull(gen)) { genProblems.push(run + '회: 시작 버튼 없음'); break; }
  const cs = omrCells(gen);
  if (cs.length !== 100) genProblems.push(run + '회: OMR ' + cs.length + '칸');
  if (run === 0) omrLabels = gen.stage.querySelector('.practice-omr').querySelectorAll('.practice-omr-part').map(e => e.textContent);
  const sectionCounts = {}, keys = new Set(), ruleCounts = {}, passageNumbers = new Map(), p6Counts = new Map();
  for (let i = 0; i < cs.length; i++) {
    omrCells(gen)[i].click();
    const info = identify(gen);
    if (!info.q) { genProblems.push(run + '회 ' + (i + 1) + '번 원본 못 찾음'); continue; }
    if (info.number !== i + 1) genProblems.push(run + '회 번호 ' + info.number + '≠' + (i + 1));
    sectionCounts[info.label] = (sectionCounts[info.label] || 0) + 1;
    if (keys.has(info.key)) genProblems.push(run + '회 중복 문항 ' + info.key);
    keys.add(info.key);
    if (info.label === 'Part 5') ruleCounts[info.q.ruleId] = (ruleCounts[info.q.ruleId] || 0) + 1;
    if (info.set) p6Counts.set(info.set.id, (p6Counts.get(info.set.id) || 0) + 1);
    if (info.passage) {
      const entry = passageNumbers.get(info.passage.id) || { passage: info.passage, label: info.label, numbers: [] };
      if (entry.label !== info.label) genProblems.push(run + '회 ' + info.passage.id + ' 구획이 섞임');
      entry.numbers.push(info.number);
      passageNumbers.set(info.passage.id, entry);
    }
    leakSelectors.forEach(sel => { if (gen.stage.querySelectorAll(sel).length) leakCount++; });
  }
  Object.keys(EXPECTED_SECTIONS).forEach(label => {
    if (sectionCounts[label] !== EXPECTED_SECTIONS[label]) genProblems.push(run + '회 ' + label + ' ' + sectionCounts[label] + '문항');
  });
  const ruleMax = Math.max(...Object.values(ruleCounts));
  maxRuleSeen = Math.max(maxRuleSeen, ruleMax);
  if (ruleMax > 6) genProblems.push(run + '회 Part 5 한 유형 ' + ruleMax + '문항');
  if (p6Counts.size !== 4 || [...p6Counts.values()].some(n => n !== 4)) genProblems.push(run + '회 Part 6 세트 ' + [...p6Counts.values()].join('+'));
  const singleSizes = [];
  passageNumbers.forEach(({ passage, label, numbers }) => {
    const parts = Array.isArray(passage.parts) ? passage.parts.length : 1;
    if (numbers.length !== passage.questions.length) genProblems.push(run + '회 ' + passage.id + ' 잘림 ' + numbers.length + '/' + passage.questions.length);
    if (numbers[numbers.length - 1] - numbers[0] !== numbers.length - 1) genProblems.push(run + '회 ' + passage.id + ' 문항이 떨어져 있음');
    if (label === 'Part 7 단일') { if (parts !== 1) genProblems.push(run + '회 단일 구획에 ' + passage.id); singleSizes.push(passage.questions.length); }
    if (label === 'Part 7 이중' && (parts !== 2 || passage.questions.length !== 5)) genProblems.push(run + '회 이중 구획에 ' + passage.id);
    if (label === 'Part 7 삼중' && (parts !== 3 || passage.questions.length !== 5)) genProblems.push(run + '회 삼중 구획에 ' + passage.id);
  });
  if (singleSizes.join(',') !== '2,2,2,2,3,3,3,4,4,4') genProblems.push(run + '회 단일 지문 구성 ' + singleSizes.join(','));
  byText(gen.stage, '제출').click();
  if (store.has(FULL_KEY)) genProblems.push(run + '회 제출 후 저장값이 남음');
  byText(gen.stage, '모드 선택').click();
}
check('20회 모두 100문항 · 30/16/29/10/15 · 번호 1~100 · 지문 안 잘림 · 중복 없음', genProblems.length === 0, genProblems.slice(0, 5).join(' ; ') || '이상 없음');
check('Part 5 한 유형 6문항 이하', maxRuleSeen <= 6, '20회 중 한 유형 최대 ' + maxRuleSeen + '문항');
check('OMR 파트 경계 표시', JSON.stringify(omrLabels) === JSON.stringify(['Part 5 · 1~30번 (지금)', 'Part 6 · 31~46번', 'Part 7 단일 · 47~75번', 'Part 7 이중 · 76~85번', 'Part 7 삼중 · 86~100번']), (omrLabels || []).join(' | '));
check('푸는 중 어휘·해석 없음 (20회 × 100문항 화면)', leakCount === 0, leakCount + '건');

// --- 2. 중간 저장 → 앱을 닫고 3시간 뒤 다시 열기 → 이어서 풀기 → 제출 ---
console.log('\n[RC 풀세트 — 중간 저장과 이어서 풀기]');
store.delete(FULL_KEY);
const progressBefore = store.get('englishLabProgress');
const s1 = loadPracticePage();
startFull(s1);
const chosen = [];
let expectedCorrect = 0;
let saveOnMoveMisses = 0, saveOnAnswerMisses = 0;
const storedSave = () => JSON.parse(store.get(FULL_KEY) || 'null');
function answerUpTo(env, from, to) {
  for (let i = from; i < to; i++) {
    omrCells(env)[i].click();
    if (!storedSave() || storedSave().index !== i) saveOnMoveMisses++; // 문항을 옮기면 바로 저장
    const info = identify(env);
    const choice = i % 3 === 0 ? (info.q.answer + 1) % 4 : info.q.answer;
    env.stage.querySelector('.practice-question-area').querySelectorAll('.quiz-option')[choice].click();
    if (!storedSave() || storedSave().answers[i] !== choice) saveOnAnswerMisses++; // 답을 고르면 바로 저장
    chosen[i] = choice;
    if (choice === info.q.answer) expectedCorrect++;
    fullAnswered[i] = {
      label: info.label, correct: choice === info.q.answer, ruleId: info.q.ruleId || null,
      p6type: info.set ? info.q.type : null, strategy: info.passage ? info.passage.strategyId : null
    };
  }
}
const fullAnswered = [];
answerUpTo(s1, 0, 40);
check('답을 고를 때마다 바로 저장', saveOnAnswerMisses === 0, saveOnAnswerMisses + '건 누락');
check('문항을 옮길 때마다 바로 저장', saveOnMoveMisses === 0, saveOnMoveMisses + '건 누락');
for (let k = 0; k < 120; k++) { now += 1000; s1.tick(); } // 2분 경과
const saved1 = JSON.parse(store.get(FULL_KEY) || 'null');
check('저장: 답 40개', saved1 && saved1.answers.filter(a => a !== null).length === 40 && saved1.answers.slice(0, 40).every((a, i) => a === chosen[i]));
check('저장: 남은 시간 73:00 (4380초)', saved1 && saved1.remainingSec === 4380, saved1 && saved1.remainingSec);
check('저장: 현재 문항 40번', saved1 && saved1.index === 39, saved1 && saved1.index);
check('저장: 다른 학습 기록 키와 별도', store.get('englishLabProgress') === progressBefore && !(JSON.parse(progressBefore || '{}').fullSet));
const validSnapshot = store.get(FULL_KEY);

now += 3 * 3600 * 1000; // 앱을 닫아 둔 3시간
const s2 = loadPracticePage();
const savedNote = s2.stage.querySelector('.practice-mode-saved');
check('다시 열면 진행 중 세트 안내', savedNote && savedNote.textContent.includes('푼 문제 40 / 100') && savedNote.textContent.includes('남은 시간 73:00'), savedNote && savedNote.textContent);
byText(s2.stage, 'RC 풀세트 선택').click();
check('이어서 풀기 / 새로 시작 선택지', !!byText(s2.stage, '이어서 풀기') && !!byText(s2.stage, '새로 시작'));
byText(s2.stage, '이어서 풀기').click();
check('이어서: 남은 시간 73:00부터 (닫아 둔 3시간은 안 깎임)', s2.stage.querySelector('.practice-time').textContent === '73:00', s2.stage.querySelector('.practice-time').textContent);
const resumedCells = omrCells(s2);
check('이어서: 답 40개가 그대로', resumedCells.filter(c => c.classList.contains('is-answered')).length === 40 &&
  chosen.slice(0, 40).every((c, i) => resumedCells[i].querySelector('.practice-omr-mark').textContent === String.fromCharCode(65 + c)));
check('이어서: 40번에서 시작', resumedCells[39].classList.contains('is-current'));
now += 1000; s2.tick();
check('이어서: 타이머가 다시 돎 (72:59)', s2.stage.querySelector('.practice-time').textContent === '72:59');
answerUpTo(s2, 40, 100);
const grammarBefore = s2.window.Progress.getGrammarStats();
const miniHistoryBefore = s2.window.Progress.getPracticeHistory().length;
byText(s2.stage, '제출').click();
const scoreText = s2.stage.querySelector('.practice-result-score');
check('이어서 푼 100문항 채점', scoreText && scoreText.textContent === '총점 ' + expectedCorrect + ' / 100', (scoreText && scoreText.textContent) + ' (예상 ' + expectedCorrect + ')');
check('제출 후 저장된 세트 삭제', !store.has(FULL_KEY));
const FULL_HISTORY_KEY = 'englishLabFullSetHistory';
const fullHistory = () => JSON.parse(store.get(FULL_HISTORY_KEY) || '[]');
const lastAttempt = fullHistory().slice(-1)[0];
const scoreFor = s2.window.PracticeFullSet.scoreFor;
check('풀세트 기록에 남음 (날짜·맞은 개수·환산 점수·소요 시간·파트별)', lastAttempt && lastAttempt.total === 100 && lastAttempt.correct === expectedCorrect &&
  lastAttempt.score === scoreFor(expectedCorrect) && lastAttempt.elapsedSec === 120 + 1 && !Number.isNaN(Date.parse(lastAttempt.date)) &&
  Object.values(lastAttempt.sections).reduce((s, x) => s + x.correct, 0) === expectedCorrect,
  lastAttempt && (lastAttempt.correct + '/' + lastAttempt.total + ', ' + lastAttempt.score + '점, ' + lastAttempt.elapsedSec + '초'));
check('미니 모의고사 기록과 섞이지 않음', s2.window.Progress.getPracticeHistory().length === miniHistoryBefore &&
  s2.window.Progress.getPracticeHistory().every(a => a.total !== 100));
// 학습 기록 반영: 답한 Part 5·6 문항 중 ruleId가 있는 것만큼 grammarStats가 는다
const grammarAfter = s2.window.Progress.getGrammarStats();
const expectedRuleDelta = {};
fullAnswered.forEach(a => { if (a.ruleId && (a.label === 'Part 5' || a.label === 'Part 6')) expectedRuleDelta[a.ruleId] = (expectedRuleDelta[a.ruleId] || [0, 0]).map((v, k) => v + (k === 0 ? 1 : a.correct ? 1 : 0)); });
const ruleDeltaOk = Object.keys(expectedRuleDelta).every(id => grammarAfter[id].solved - (grammarBefore[id] ? grammarBefore[id].solved : 0) === expectedRuleDelta[id][0] &&
  grammarAfter[id].correct - (grammarBefore[id] ? grammarBefore[id].correct : 0) === expectedRuleDelta[id][1]);
check('풀세트 결과가 grammarStats에 반영', ruleDeltaOk, Object.keys(expectedRuleDelta).length + '개 유형, ' +
  Object.values(expectedRuleDelta).reduce((s, v) => s + v[0], 0) + '문항');

// --- 채점 화면: 환산 점수 · 파트별 정답률 · 약점 3종 ---
console.log('\n[RC 풀세트 — 채점 화면]');
const resultCard = s2.stage.querySelector('.practice-result');
const scoreBox = resultCard.querySelector('.practice-full-score');
check('환산 점수 표시', scoreBox && scoreBox.textContent.includes('예상 RC 점수 약 ' + scoreFor(expectedCorrect) + '점') &&
  scoreBox.textContent.includes('실제 시험은 회차마다 난이도 보정이 달라 ±25점 정도 차이가 날 수 있습니다'), scoreBox && scoreBox.textContent);
const rowsOf = cls => { const sec = resultCard.querySelector('.' + cls); return sec ? sec.querySelectorAll('.practice-stat-row') : []; };
const sectionRows = rowsOf('practice-analysis-sections');
const expectedBySection = {};
fullAnswered.forEach(a => { expectedBySection[a.label] = expectedBySection[a.label] || [0, 0]; expectedBySection[a.label][0] += a.correct ? 1 : 0; expectedBySection[a.label][1] += 1; });
const sectionLabels = ['Part 5', 'Part 6', 'Part 7 단일', 'Part 7 이중', 'Part 7 삼중'];
check('파트별 정답률 5줄 · 문항 수 30/16/29/10/15', sectionRows.length === 5 && sectionRows.map(r => r.dataset.total).join('/') === '30/16/29/10/15',
  sectionRows.map(r => r.querySelector('.practice-stat-value').textContent).join(' | '));
check('파트별 맞은 개수가 실제와 같고 합이 전체와 같음', sectionRows.every((r, i) => Number(r.dataset.correct) === expectedBySection[sectionLabels[i]][0]) &&
  sectionRows.reduce((s, r) => s + Number(r.dataset.correct), 0) === expectedCorrect);
check('파트별 막대', sectionRows.every(r => r.querySelector('.practice-stat-fill') && /width: \d+%/.test(r.querySelector('.practice-stat-fill').getAttribute('style'))));
const ruleRows = rowsOf('practice-analysis-rules');
const p5Rates = {};
fullAnswered.filter(a => a.label === 'Part 5').forEach(a => { p5Rates[a.ruleId] = p5Rates[a.ruleId] || [0, 0]; p5Rates[a.ruleId][0] += a.correct ? 1 : 0; p5Rates[a.ruleId][1] += 1; });
const pct = v => Math.round(v[0] / v[1] * 100);
const shownRules = ruleRows.map(r => r.dataset.id);
const hiddenRules = Object.keys(p5Rates).filter(id => !shownRules.includes(id));
check('Part 5 약한 유형 3개 · 낮은 순 · 노트 링크', ruleRows.length === 3 &&
  ruleRows.every(r => { const a = r.querySelector('.grammar-note-link'); return a && a.href === 'grammar.html#grammar-note-' + r.dataset.id; }) &&
  shownRules.every((id, i) => i === 0 || pct(p5Rates[shownRules[i - 1]]) <= pct(p5Rates[id])) &&
  hiddenRules.every(id => pct(p5Rates[id]) >= pct(p5Rates[shownRules[2]])),
  ruleRows.map(r => r.dataset.id + ' ' + r.querySelector('.practice-stat-value').textContent).join(' | '));
const p6Rows = rowsOf('practice-analysis-p6');
const p6Expected = {};
fullAnswered.filter(a => a.label === 'Part 6').forEach(a => { p6Expected[a.p6type] = p6Expected[a.p6type] || [0, 0]; p6Expected[a.p6type][0] += a.correct ? 1 : 0; p6Expected[a.p6type][1] += 1; });
check('Part 6 유형별 (문법·어휘·문장 삽입)', p6Rows.map(r => r.dataset.id).join(',') === 'grammar,vocab,sentence' &&
  p6Rows.every(r => { const e = p6Expected[r.dataset.id] || [0, 0]; return Number(r.dataset.correct) === e[0] && Number(r.dataset.total) === e[1]; }) &&
  p6Rows.reduce((s, r) => s + Number(r.dataset.total), 0) === 16,
  p6Rows.map(r => r.querySelector('.practice-stat-label').textContent + ' ' + r.querySelector('.practice-stat-value').textContent).join(' | '));
const p7Rows = rowsOf('practice-analysis-p7');
const p7Expected = {};
fullAnswered.filter(a => a.label.startsWith('Part 7')).forEach(a => { p7Expected[a.strategy] = p7Expected[a.strategy] || [0, 0]; p7Expected[a.strategy][0] += a.correct ? 1 : 0; p7Expected[a.strategy][1] += 1; });
check('Part 7 지문 유형별 · 낮은 순 · 전략 링크', p7Rows.length === Object.keys(p7Expected).length &&
  p7Rows.every(r => { const e = p7Expected[r.dataset.id]; const a = r.querySelector('.grammar-note-link');
    return e && Number(r.dataset.correct) === e[0] && Number(r.dataset.total) === e[1] && a && a.href === 'reading.html#reading-strategy-' + r.dataset.id; }) &&
  p7Rows.every((r, i) => i === 0 || pct(p7Expected[p7Rows[i - 1].dataset.id]) <= pct(p7Expected[r.dataset.id])),
  p7Rows.map(r => r.dataset.id + ' ' + r.querySelector('.practice-stat-value').textContent).join(' | '));

// --- 오답 복습 ---
console.log('\n[RC 풀세트 — 오답 복습]');
const reviewButton = resultCard.querySelectorAll('.button').find(b => b.textContent.startsWith('오답 복습'));
check('오답 복습 버튼', !!reviewButton && reviewButton.textContent === '오답 복습 (' + (100 - expectedCorrect) + '문항)', reviewButton && reviewButton.textContent);
reviewButton.click();
const review = s2.stage.querySelector('.practice-review');
const reviewMisses = review ? review.querySelectorAll('.practice-review-miss') : [];
check('오답 복습 문항 수 = 100 - 맞은 개수', reviewMisses.length === 100 - expectedCorrect, reviewMisses.length + ' / ' + (100 - expectedCorrect));
check('오답 번호가 실제 틀린 문항과 같음', reviewMisses.map(m => Number(m.dataset.number)).join(',') ===
  fullAnswered.map((a, i) => a.correct ? null : i + 1).filter(Boolean).join(','));
const groupsAll = review.querySelectorAll('.practice-review-group');
const groupKeys = groupsAll.map(g => g.dataset.group);
const reviewP7Groups = groupsAll.filter(g => g.dataset.group.startsWith('p7:'));
const reviewP6Groups = groupsAll.filter(g => g.dataset.group.startsWith('p6:'));
check('같은 지문·세트가 두 번 나오지 않음', new Set(groupKeys).size === groupKeys.length, groupKeys.length + '묶음');
const p7MissCount = fullAnswered.filter(a => !a.correct && a.label.startsWith('Part 7')).length;
check('Part 7 오답은 지문 단위로 묶임', reviewP7Groups.reduce((s, g) => s + g.querySelectorAll('.practice-review-miss').length, 0) === p7MissCount &&
  reviewP7Groups.every(g => g.querySelectorAll('.practice-passage').length === 1) && reviewP7Groups.some(g => g.querySelectorAll('.practice-review-miss').length > 1),
  reviewP7Groups.length + '개 지문에 ' + p7MissCount + '문항');
const reviewTranslateOk = [...reviewP7Groups, ...reviewP6Groups].every(g => {
  const kos = g.querySelectorAll('.practice-review-ko');
  const toggle = g.querySelector('.practice-review-translate');
  if (!kos.length || !toggle || !kos.every(k => k.hidden)) return false;
  toggle.click();
  return kos.every(k => !k.hidden);
});
check('Part 6·7 복습: 지문 전문 + 해석 토글', reviewTranslateOk);
check('Part 6·7 복습: 어휘 목록', [...reviewP7Groups, ...reviewP6Groups].every(g => g.querySelectorAll('.reading-vocab-section').length === 1));
check('Part 5 복습: 문법 노트 링크', groupsAll.filter(g => g.dataset.group.startsWith('p5:')).every(g => {
  const a = g.querySelector('.grammar-note-link'); return a && a.href.startsWith('grammar.html#grammar-note-'); }));
byText(review, '← 채점 결과로').click();
check('복습에서 채점 화면으로 돌아감', !!s2.stage.querySelector('.practice-full-score'));

// --- 3. 깨진 저장값: 지우고 새로 시작, 다른 학습 기록은 그대로 ---
console.log('\n[RC 풀세트 — 깨진 저장값]');
const brokenPlan = JSON.parse(validSnapshot); brokenPlan.plan.triple[0] = 'rp99';
const shortAnswers = JSON.parse(validSnapshot); shortAnswers.answers = [0, 1, 2];
const badTime = JSON.parse(validSnapshot); badTime.remainingSec = -5;
const corruptCases = [['JSON 깨짐', '{broken'], ['버전 없음', JSON.stringify({ plan: {} })], ['답 개수 틀림', JSON.stringify(shortAnswers)],
  ['남은 시간 음수', JSON.stringify(badTime)], ['없는 지문 id', JSON.stringify(brokenPlan)]];
const corruptProblems = [];
corruptCases.forEach(([name, value]) => {
  const progress = store.get('englishLabProgress'), theme = store.get('englishLabTheme');
  store.set(FULL_KEY, value);
  const e = loadPracticePage();
  if (e.stage.querySelector('.practice-mode-saved')) corruptProblems.push(name + ': 이어서 풀기 안내가 뜸');
  if (store.has(FULL_KEY)) corruptProblems.push(name + ': 깨진 값이 남음');
  if (store.get('englishLabProgress') !== progress || store.get('englishLabTheme') !== theme) corruptProblems.push(name + ': 다른 기록이 바뀜');
  if (!e.warns.some(w => w.includes('깨져'))) corruptProblems.push(name + ': 경고 없음');
  if (!startFull(e) || omrCells(e).length !== 100) corruptProblems.push(name + ': 새로 시작 안 됨');
  store.delete(FULL_KEY);
});
check('깨진 저장값 5종 — 지우고 새로 시작, 학습 기록 유지', corruptProblems.length === 0, corruptProblems.join(' ; ') || corruptCases.map(c => c[0]).join(', '));
check('학습 기록이 비지 않음', !!store.get('englishLabProgress') && s2.window.Progress.getPracticeHistory().length > 0);

// --- 4. 타이머: 10분·5분 알림, 멈춘 틈은 안 깎음, 0이면 자동 제출 ---
console.log('\n[RC 풀세트 — 타이머]');
store.delete(FULL_KEY);
const t = loadPracticePage();
startFull(t);
const bar = () => t.stage.querySelector('.practice-timer-bar');
const alertBox = () => bar().querySelector('.practice-time-alert');
check('시작 75:00', t.stage.querySelector('.practice-time').textContent === '75:00');
for (let k = 0; k < 4500 - 601; k++) { now += 1000; t.tick(); }
check('10:01에는 알림 없음', alertBox().hidden === true, t.stage.querySelector('.practice-time').textContent);
now += 1000; t.tick();
check('10분 알림', !alertBox().hidden && alertBox().textContent.includes('남은 시간 10분') && bar().classList.contains('is-warning'), alertBox().textContent);
for (let k = 0; k < 20; k++) { now += 1000; t.tick(); }
check('알림은 잠시 뒤 사라짐', alertBox().hidden === true);
const timeText = () => t.stage.querySelector('.practice-time') && t.stage.querySelector('.practice-time').textContent;
check('이탈 전 09:40', timeText() === '09:40', timeText());
t.hide(); now += 60 * 1000; t.tick(); t.show(); // 1분 이탈 (숨겨진 동안 틱이 와도 이중으로 깎지 않아야 함)
check('1분 이탈 후 복귀 → 60초 차감 (08:40)', timeText() === '08:40' && !t.stage.querySelector('.practice-suspended-notice'), timeText());
t.hide(); now += 3 * 60 * 1000; t.show(); // 3분 이탈
const notice = t.stage.querySelector('.practice-suspended-notice');
check('3분 이탈 후 복귀 → 중단 처리, 이어서 풀기 화면', !!notice && notice.textContent === '시험이 중단되었습니다. 남은 시간 08:40부터 이어서 풀 수 있습니다.' &&
  !!byText(t.stage, '이어서 풀기') && t.tick === null, notice && notice.textContent);
check('중단 시 남은 시간 = 이탈 직전 값 (520초)', JSON.parse(store.get(FULL_KEY)).remainingSec === 520, JSON.parse(store.get(FULL_KEY)).remainingSec);
byText(t.stage, '이어서 풀기').click();
check('이어서 풀면 08:40부터', timeText() === '08:40', timeText());
now += 150 * 1000; t.tick(); // 숨김 알림 없이 브라우저가 2분 넘게 멈췄다 깨어남
check('틱 사이 2분 초과도 중단 처리 (직전 값 08:40)', !!t.stage.querySelector('.practice-suspended-notice') &&
  t.stage.querySelector('.practice-suspended-notice').textContent.includes('08:40'));
byText(t.stage, '이어서 풀기').click();
while (t.stage.querySelector('.practice-time') && t.stage.querySelector('.practice-time').textContent !== '05:01') { now += 1000; t.tick(); }
now += 1000; t.tick();
check('5분 알림', !alertBox().hidden && alertBox().textContent.includes('남은 시간 5분') && bar().classList.contains('is-danger'), alertBox().textContent);
for (let k = 0; k < 400 && t.tick; k++) { now += 1000; t.tick(); }
const timeoutResult = t.stage.querySelector('.practice-result');
check('0이 되면 자동 제출', !!timeoutResult && timeoutResult.textContent.includes('시간 초과로 자동 제출') && timeoutResult.textContent.includes('/ 100'));
check('자동 제출 후 저장값 삭제·타이머 정지', !store.has(FULL_KEY) && t.tick === null);

// --- 환산표 ---
console.log('\n[RC 풀세트 — 환산표]');
const scoreTableArr = s2.window.PracticeFullSet.scoreTable;
const allScores = Array.from({ length: 101 }, (_, n) => scoreFor(n));
check('0~100 모든 값에 점수', scoreTableArr.length === 101 && allScores.every(v => Number.isInteger(v) && v >= 5 && v <= 495));
check('단조 증가 (맞은 개수가 늘면 점수가 줄지 않음)', allScores.every((v, n) => n === 0 || v >= allScores[n - 1]));
check('표 값 확인 (100→495, 88→435, 66→290, 16→5, 15 이하→5)', scoreFor(100) === 495 && scoreFor(88) === 435 && scoreFor(66) === 290 && scoreFor(16) === 5 && scoreFor(15) === 5 && scoreFor(0) === 5);
let outOfRangeOk = true;
[-5, 150, NaN, 'abc', null, undefined, 50.4, Infinity].forEach(v => { try { const r = scoreFor(v); if (!Number.isInteger(r)) outOfRangeOk = false; } catch (e) { outOfRangeOk = false; } });
check('범위를 벗어난 입력에서 터지지 않음', outOfRangeOk && scoreFor(-5) === 5 && scoreFor(150) === 495 && scoreFor(NaN) === 5);

// --- 다시 열기도 2분 규칙, 미니 모의고사 타이머는 그대로 ---
console.log('\n[RC 풀세트 — 다시 열기 · 미니 모의고사 타이머]');
store.delete(FULL_KEY);
const r1 = loadPracticePage();
startFull(r1);
now += 30 * 1000; // 30초 뒤 다시 열기 (그 사이 저장은 시작할 때 75:00)
const r2 = loadPracticePage();
const r2note = r2.stage.querySelector('.practice-mode-saved');
check('2분 이내에 다시 열면 흐른 시간 차감 (74:30)', r2note && r2note.textContent.includes('남은 시간 74:30'), r2note && r2note.textContent);
byText(r2.stage, 'RC 풀세트 선택').click();
check('2분 이내 재개는 중단 안내 없음', !r2.stage.querySelector('.practice-suspended-notice'));
now += 200 * 1000;
const r3 = loadPracticePage();
byText(r3.stage, 'RC 풀세트 선택').click();
const r3notice = r3.stage.querySelector('.practice-suspended-notice');
check('2분 넘게 지나 다시 열면 중단 안내 + 저장된 시간 그대로', r3notice && r3notice.textContent === '시험이 중단되었습니다. 남은 시간 75:00부터 이어서 풀 수 있습니다.', r3notice && r3notice.textContent);
store.delete(FULL_KEY);
const m = loadPracticePage();
byText(m.stage, '미니 모의고사 선택').click();
byText(m.stage, '모의고사 시작').click();
m.hide(); now += 3 * 60 * 1000; m.show(); m.tick();
check('미니 모의고사: 3분 이탈해도 중단 없이 실제 시간대로 (22:00)', m.stage.querySelector('.practice-time').textContent === '22:00' &&
  !m.stage.querySelector('.practice-suspended-notice') && m.tick !== null, m.stage.querySelector('.practice-time').textContent);
check('미니 모의고사는 저장하지 않음', !store.has(FULL_KEY));

// --- 응시 기록: 최근 20회, 21회째에 가장 오래된 것부터 삭제, 표와 추이 막대 ---
console.log('\n[RC 풀세트 — 응시 기록]');
const seeded = Array.from({ length: 20 }, (_, i) => ({ date: new Date(Date.UTC(2026, 0, 1 + i)).toISOString(), correct: 50 + i, total: 100,
  score: scoreFor(50 + i), elapsedSec: 4000, timedOut: false, sections: { p5: { correct: 10, total: 30 } } }));
store.set(FULL_HISTORY_KEY, JSON.stringify(seeded));
const h = loadPracticePage();
startFull(h);
byText(h.stage, '제출').click(); // 21회째 (전부 미응답)
const afterHistory = fullHistory();
check('21회째에 가장 오래된 것부터 삭제', afterHistory.length === 20 && afterHistory[0].correct === 51 && afterHistory[19].correct === 0 &&
  afterHistory[18].correct === 69, afterHistory.length + '개, 첫 ' + afterHistory[0].correct + ' / 끝 ' + afterHistory[19].correct);
h.byId('practice-tab-history').click();
const fullHistorySection = h.byId('practice-history').querySelector('.practice-full-history');
const trendCols = fullHistorySection ? fullHistorySection.querySelectorAll('.practice-full-trend-col') : [];
// 가짜 DOM은 태그 선택자를 지원하지 않아 태그 이름으로 직접 찾는다.
const byTag = (el, tag) => el ? el.all().filter(e => e.tagName === tag) : [];
const fullTbody = byTag(fullHistorySection, 'TBODY')[0];
const fullThead = byTag(fullHistorySection, 'THEAD')[0];
const fullRows = byTag(fullTbody, 'TR');
check('기록 표 (날짜/점수/맞은 개수/소요 시간)', fullRows.length === 20 && !!fullThead &&
  fullThead.textContent === '날짜점수맞은 개수소요 시간' && fullRows[0].textContent.includes('0 / 100'), fullRows.length + '줄, 머리 ' + (fullThead && fullThead.textContent));
check('점수 추이 막대 20개 (높이 = 점수/495)', trendCols.length === 20 &&
  trendCols[19].querySelector('.practice-full-trend-bar').getAttribute('style') === 'height: 2%' &&
  trendCols[18].querySelector('.practice-full-trend-bar').getAttribute('style') === 'height: ' + Math.round(scoreFor(69) / 495 * 100) + '%');
check('미니 모의고사 기록 표에는 100문항 응시가 없음', h.byId('practice-history').querySelectorAll('.practice-history-scoreTableArr')
  .filter(tb => !tb.classList.contains('practice-full-history-scoreTableArr')).every(tb => !tb.textContent.includes('/ 100')));

// --- 5. 데이터가 모자라면 오류를 띄우고 세트를 만들지 않는다 ---
console.log('\n[RC 풀세트 — 데이터 부족]');
// 5문항 이중 지문을 첫 번째 하나만 남긴다 (지문이 늘어나도 항상 1개가 되게).
const isFiveDouble = p => Array.isArray(p.parts) && p.parts.length === 2 && p.questions.length === 5;
const short = loadPracticePage({ mutate: w => {
  const keep = w.PASSAGES.find(isFiveDouble);
  w.PASSAGES = w.PASSAGES.filter(p => !isFiveDouble(p) || p === keep);
} });
const startedShort = startFull(short);
const errorPanel = short.stage.querySelector('.practice-full-error');
check('5문항 이중 지문이 1개면 오류 표시', !startedShort && !!errorPanel && errorPanel.textContent.includes('이중 지문') && errorPanel.textContent.includes('필요 2개, 현재 1개'),
  errorPanel && errorPanel.textContent);
check('console.error 남김', short.errors.some(m => m.includes('RC 풀세트를 만들 수 없습니다')), short.errors[0]);
const shortP5 = loadPracticePage({ mutate: w => { w.GRAMMAR_QUIZ = w.GRAMMAR_QUIZ.filter(q => ['g01', 'g02', 'g03', 'g04'].includes(q.ruleId)); } });
startFull(shortP5);
const p5Error = shortP5.stage.querySelector('.practice-full-error');
check('Part 5 유형이 4개뿐이면(6×4=24<30) 오류 표시', !!p5Error && p5Error.textContent.includes('Part 5'), p5Error && p5Error.textContent);

// =================== LC 풀세트 ===================
// 실제 speech.js + 가짜 speechSynthesis로 재생을 흉내 낸다. 재생 버튼 → 큐에 쌓인 utterance를 하나씩 끝낸다.
const LC_KEY = 'englishLabLcFullSetSave';
const LC_HISTORY_KEY = 'englishLabLcFullSetHistory';
const LC_NOTE = '실제 토익 LC와 같은 구성입니다 · Part 1~4 100문항 · 45분';
const LC_TOTAL = 100;
// 사용자가 준 표를 그대로 옮긴 검사용 환산표 (practice.js의 표와 독립적으로 비교한다)
const LC_TABLE_TEXT = `100:495 99:495 98:495 97:490 96:485 95:480 94:475 93:470 92:460 91:455
 90:450 89:445 88:435 87:430 86:425 85:415 84:410 83:400 82:395 81:390
 80:380 79:375 78:370 77:360 76:355 75:350 74:340 73:335 72:330 71:320
 70:315 69:310 68:300 67:295 66:290 65:280 64:275 63:270 62:260 61:255
 60:250 59:245 58:240 57:230 56:225 55:220 54:210 53:205 52:200 51:195
 50:185 49:180 48:175 47:165 46:160 45:155 44:145 43:140 42:135 41:130
 40:120 39:115 38:110 37:105 36: 95 35: 90 34: 85 33: 80 32: 70 31: 65
 30: 60 29: 55 28: 50 27: 45 26: 40 25: 35 24: 30 23: 25 22: 20 21: 15
 20: 15 19: 10 18: 10 17:  5`;
const LC_EXPECTED = Array(101).fill(5);
for (const m of LC_TABLE_TEXT.matchAll(/(\d+):\s*(\d+)/g)) LC_EXPECTED[Number(m[1])] = Number(m[2]);
// 100문항이므로 보정 없이 맞은 개수를 그대로 표에 넣는다.
const lcExpectedScore = correct => LC_EXPECTED[correct];

function makeSynth() {
  const synth = {
    voices: [
      { name: 'Microsoft Zira', lang: 'en-US', voiceURI: 'zira', localService: true },
      { name: 'Microsoft David', lang: 'en-US', voiceURI: 'david', localService: true }
    ],
    queue: [], speaking: false, listeners: {},
    getVoices: () => synth.voices.slice(),
    speak: u => { synth.queue.push(u); },
    cancel() {}, pause() {}, resume() {},
    addEventListener(t, f) { (synth.listeners[t] = synth.listeners[t] || []).push(f); },
    removeEventListener(t, f) { synth.listeners[t] = (synth.listeners[t] || []).filter(x => x !== f); }
  };
  return synth;
}
const flush = () => new Promise(resolve => setImmediate(resolve));
const loadLc = (opts = {}) => loadPracticePage(Object.assign({ synth: makeSynth() }, opts));
function startLc(env) {
  byText(env.stage, 'LC 풀세트 선택').click();
  const start = byText(env.stage, 'LC 풀세트 시작');
  if (start) start.click();
  return !!start;
}
const lcArea = env => env.stage.querySelector('.practice-question-area');
// 화면에 붙은 문항 키(p1:ph01 / p2:p201 / p3:p305:1)로 원본을 찾는다. 키에는 정답 정보가 없다.
function lcInfo(env) {
  const a = lcArea(env);
  const key = a.dataset.item;
  const meta = a.querySelector('.practice-question-meta').textContent;
  const [label, rest] = meta.split(' · ');
  const [part, id, qi] = key.split(':');
  const Wd = env.window;
  if (part === 'p1') {
    const q = Wd.PART1.find(x => x.id === id);
    return { key, part, label, number: parseInt(rest, 10), q, answer: q.answer, kind: q.kind, audioKey: key };
  }
  if (part === 'p2') {
    const q = Wd.PART2.find(x => x.id === id);
    return { key, part, label, number: parseInt(rest, 10), q, answer: q.answer, type: q.type, audioKey: key };
  }
  const talk = (part === 'p3' ? Wd.PART3 : Wd.PART4).find(x => x.id === id);
  const q = talk.questions[Number(qi)];
  return { key, part, label, number: parseInt(rest, 10), q, talk, qIndex: Number(qi), answer: q.answer, audioKey: part + ':' + id };
}
// 재생 버튼을 누르고 큐가 빌 때까지 한 줄씩 끝낸다. 읽은 문장 목록을 돌려준다(버튼이 없거나 막혀 있으면 null).
async function playLc(env) {
  const play = env.stage.querySelector('.practice-lc-play');
  if (!play || play.disabled) return null;
  env.synth.queue = [];
  play.click();
  const texts = [];
  for (let guard = 0; guard < 80 && env.synth.queue.length; guard++) {
    const u = env.synth.queue.shift();
    texts.push(u.text);
    if (u.onend) u.onend();
    await flush(); await flush();
  }
  await flush();
  return texts;
}
const lcLeak = env => env.stage.querySelectorAll('.practice-lc-script').length + env.stage.querySelectorAll('.listening-transcript').length;
const lcNext = env => byText(lcArea(env), '다음 →');
// Part 1 사진: alt는 "Part 1 사진 N"만, src는 저장소의 이미지 파일
function photoProblem(container, item, number) {
  const imgs = container.querySelectorAll('.practice-lc-photo');
  if (imgs.length !== 1) return '사진 ' + imgs.length + '장';
  const img = imgs[0];
  if (img.tagName !== 'IMG') return 'img 태그 아님';
  if (img.getAttribute('src') !== '../' + item.img) return 'src ' + img.getAttribute('src');
  if (img.getAttribute('alt') !== 'Part 1 사진 ' + number) return 'alt ' + img.getAttribute('alt');
  if (img.hidden) return '사진이 숨겨짐';
  // 크기를 고정하면 CSS(틀 폭 100%)가 무시되어 원본이 작은 사진(ph16·ph17)이 작게 보인다.
  if (['width', 'height', 'style'].some(k => img.getAttribute(k) !== null)) return 'width/height/style이 붙음';
  return null;
}

async function runLcTests() {
  // --- 진입 화면 ---
  console.log('\n[LC 풀세트 — 진입 화면]');
  store.delete(LC_KEY);
  const g = loadLc();
  const cards = g.stage.querySelectorAll('.practice-mode-card');
  check('실전 진입 화면에 세 모드 (미니 · RC · LC)', cards.length === 3 && cards.map(c => c.dataset.mode).join(',') === 'mini,full,lc', cards.map(c => c.dataset.mode).join(','));
  byText(g.stage, 'LC 풀세트 선택').click();
  check('시작 화면: 실제 시험과 같은 구성 안내 · 100문항 · 45분 · Part 1 제외 문구 없음', g.stage.textContent.includes(LC_NOTE) && g.stage.textContent.includes('LC 풀세트 · 100문항 · 45분') &&
    g.stage.textContent.includes('Part 1 1~6번(사진 6장) → Part 2 7~31번 → Part 3 32~70번(대화 13개) → Part 4 71~100번(담화 10개)') &&
    !g.stage.textContent.includes('제외') && !g.stage.textContent.includes('94'), g.stage.textContent.slice(0, 200));
  byText(g.stage, '← 모드 선택').click();

  // --- 1. 20회 생성: 100문항 · 6/25/39/30 · 사람 4~5·사물 1~2 · 대화·담화 안 잘림 · 중복 없음 · 번호 1~100 · 스크립트 노출 없음 ---
  console.log('\n[LC 풀세트 — 20회 생성]');
  const genProblems = [];
  let leaks = 0, omrLabels = null, p1TextLeaks = 0, p2TextLeaks = 0, p3PromptLeaks = 0;
  const photoProblems = [], graphicProblems = [];
  let graphicShown = 0;
  const talkUse = new Map(), photoUse = new Map(), peopleCounts = new Map();
  for (let run = 0; run < 20; run++) {
    if (!startLc(g)) { genProblems.push(run + '회: 시작 버튼 없음'); break; }
    const cells = g.stage.querySelector('.practice-omr').querySelectorAll('.practice-omr-cell');
    if (cells.length !== LC_TOTAL) genProblems.push(run + '회 OMR ' + cells.length + '칸');
    if (run === 0) omrLabels = g.stage.querySelector('.practice-omr').querySelectorAll('.practice-omr-part').map(e => e.textContent);
    const counts = {}, keys = new Set(), talks = new Map(), kinds = { people: 0, objects: 0 };
    for (let i = 0; i < LC_TOTAL; i++) {
      const info = lcInfo(g);
      if (info.number !== i + 1) genProblems.push(run + '회 번호 ' + info.number + '≠' + (i + 1));
      if (keys.has(info.key)) genProblems.push(run + '회 중복 ' + info.key);
      keys.add(info.key);
      counts[info.label] = (counts[info.label] || 0) + 1;
      if (info.talk) {
        const entry = talks.get(info.audioKey) || { talk: info.talk, numbers: [], qIndexes: [], part: info.part };
        entry.numbers.push(info.number); entry.qIndexes.push(info.qIndex);
        talks.set(info.audioKey, entry);
      }
      leaks += lcLeak(g);
      const text = lcArea(g).textContent;
      const options = lcArea(g).querySelectorAll('.quiz-option').map(o => o.textContent);
      if (info.part === 'p1') {
        kinds[info.kind]++;
        photoUse.set(info.q.id, (photoUse.get(info.q.id) || 0) + 1);
        if (info.number > 6) genProblems.push(run + '회 Part 1이 ' + info.number + '번');
        // 선택지 문장이 글자로 보이면 안 된다 ((A)~(D)만)
        if (options.join(',') !== '(A),(B),(C),(D)' || info.q.choices.some(c => text.includes(c))) p1TextLeaks++;
        const problem = photoProblem(lcArea(g), info.q, info.number);
        if (problem) photoProblems.push(run + '회 ' + info.number + '번 ' + problem);
      } else if (info.part === 'p2') {
        if (options.join(',') !== '(A),(B),(C)' || text.includes(info.q.question) || info.q.choices.some(c => text.includes(c))) p2TextLeaks++;
      } else if (text.includes(info.q.q)) p3PromptLeaks++; // 듣기 전에는 문제가 보이지 않아야 한다
      if (info.part !== 'p1' && lcArea(g).querySelector('.practice-lc-photo')) photoProblems.push(run + '회 ' + info.number + '번(' + info.part + ')에 사진');
      // 시각 정보 도표: 도표가 있는 대화·담화의 문항이면 듣기 전부터 도표가 보이고 칸이 모두 있어야 한다. 다른 문항에는 없다.
      const graphicBox = lcArea(g).querySelector('.listening-graphic');
      const graphicData = info.talk && info.talk.graphic;
      if (!!graphicBox !== !!graphicData) graphicProblems.push(run + '회 ' + info.number + '번 도표 ' + (graphicData ? '없음' : '엉뚱하게 있음'));
      else if (graphicData) {
        graphicShown++;
        const boxText = graphicBox.textContent;
        if (!boxText.includes(graphicData.title) || graphicData.rows.some(row => row.some(cell => !boxText.includes(cell))) ||
          !graphicBox.querySelector('.listening-graphic-scroll')) graphicProblems.push(run + '회 ' + info.number + '번 도표 칸·제목·스크롤 영역 누락');
      }
      if (i < LC_TOTAL - 1) lcNext(g).click();
    }
    if (counts['Part 1'] !== 6 || counts['Part 2'] !== 25 || counts['Part 3'] !== 39 || counts['Part 4'] !== 30) genProblems.push(run + '회 구성 ' + JSON.stringify(counts));
    if (kinds.people < 4 || kinds.people > 5 || kinds.objects < 1 || kinds.objects > 2) genProblems.push(run + '회 Part 1 사람 ' + kinds.people + ' / 사물 ' + kinds.objects);
    peopleCounts.set(kinds.people, (peopleCounts.get(kinds.people) || 0) + 1);
    const p3Talks = [...talks.values()].filter(t => t.part === 'p3').length, p4Talks = [...talks.values()].filter(t => t.part === 'p4').length;
    if (p3Talks !== 13 || p4Talks !== 10) genProblems.push(run + '회 대화 ' + p3Talks + '개 / 담화 ' + p4Talks + '개');
    talks.forEach((entry, key) => {
      if (entry.numbers.length !== 3 || entry.qIndexes.join(',') !== '0,1,2' || entry.numbers[2] - entry.numbers[0] !== 2) genProblems.push(run + '회 ' + key + ' 잘림/떨어짐 ' + entry.numbers.join(','));
      talkUse.set(key, (talkUse.get(key) || 0) + 1);
    });
    if (byText(lcArea(g), '다음 →').disabled !== true) genProblems.push(run + '회 마지막 문항에서 다음 버튼이 살아 있음');
    byText(g.stage, '제출').click();
    if (store.has(LC_KEY)) genProblems.push(run + '회 제출 후 저장값이 남음');
    byText(g.stage, '모드 선택').click();
  }
  check('20회 모두 100문항 · 6/25/39/30 · 대화 13·담화 10 · 3문항씩 연속 · 번호 1~100 · 중복 없음', genProblems.length === 0, genProblems.slice(0, 5).join(' ; ') || '이상 없음');
  check('20회 모두 Part 1 = 사람 사진 4~5장 + 사물 사진 1~2장 (4·5장 둘 다 나옴)', !genProblems.some(p => p.includes('Part 1 사람')) && peopleCounts.has(4) && peopleCounts.has(5),
    [...peopleCounts.entries()].map(([k, v]) => '사람 ' + k + '장 ' + v + '회').join(' · '));
  check('OMR 파트 경계 (Part 1 1~6 · Part 2 7~31 · Part 3 32~70 · Part 4 71~100)', JSON.stringify(omrLabels) ===
    JSON.stringify(['Part 1 · 1~6번 (지금)', 'Part 2 · 7~31번', 'Part 3 · 32~70번', 'Part 4 · 71~100번']), (omrLabels || []).join(' | '));
  check('Part 1 사진 표시 (src = 저장소 파일 · alt = "Part 1 사진 N") · 다른 파트에는 사진 없음', photoProblems.length === 0, photoProblems.slice(0, 4).join(' ; ') || '이상 없음');
  check('시험 중 스크립트 없음 (20회 × 100문항 화면)', leaks === 0, leaks + '건');
  check('Part 1 선택지 문장이 화면에 없음 ((A)(B)(C)(D)만)', p1TextLeaks === 0, p1TextLeaks + '건');
  check('Part 2 질문·응답 글자가 화면에 없음 ((A)(B)(C)만)', p2TextLeaks === 0, p2TextLeaks + '건');
  check('Part 3·4는 듣기 전에 문제가 안 보임', p3PromptLeaks === 0, p3PromptLeaks + '건');
  check('시각 정보 도표: 도표가 있는 대화·담화 문항에는 듣기 전부터 도표(제목·모든 칸·스크롤 영역)가 보이고, 다른 문항에는 없음', graphicProblems.length === 0 && graphicShown > 0,
    graphicProblems.slice(0, 4).join(' ; ') || '도표 표시 ' + graphicShown + '문항');
  check('20회 동안 대화·담화가 섞여 나옴 (14개 중 13개, 12개 중 10개)', [...talkUse.keys()].filter(k => k.startsWith('p3:')).length === 14 && [...talkUse.keys()].filter(k => k.startsWith('p4:')).length === 12,
    '대화 ' + [...talkUse.keys()].filter(k => k.startsWith('p3:')).length + '종 · 담화 ' + [...talkUse.keys()].filter(k => k.startsWith('p4:')).length + '종');
  // 20회 × 6장 = 120장을 뽑는다. 사람 23장·사물 11장이면 기대값은 약 33종이라 28종 미만이면 뽑기가 치우친 것으로 본다.
  const allPhotos = g.window.PART1;
  const usedPeople = allPhotos.filter(p => p.kind === 'people' && photoUse.has(p.id)).length;
  const usedObjects = allPhotos.filter(p => p.kind === 'objects' && photoUse.has(p.id)).length;
  check('20회 동안 사진이 섞여 나옴 (' + allPhotos.length + '장 중 28종 이상 · 모두 PART1에 있는 사진)', photoUse.size >= 28 && [...photoUse.keys()].every(id => allPhotos.some(p => p.id === id)),
    photoUse.size + '종 (사람 ' + usedPeople + '/' + allPhotos.filter(p => p.kind === 'people').length + ' · 사물 ' + usedObjects + '/' + allPhotos.filter(p => p.kind === 'objects').length + ')');

  // --- 2. 실전 조건: 한 번만 재생 · 되돌아가기 없음 · 스크립트 없음 ---
  console.log('\n[LC 풀세트 — 실전 조건]');
  store.delete(LC_KEY);
  const c = loadLc();
  startLc(c);
  const playBtn = () => c.stage.querySelector('.practice-lc-play');
  const options = () => lcArea(c).querySelectorAll('.quiz-option');
  // Part 1 (1번)
  const photoInfo = lcInfo(c);
  check('1번은 Part 1 · 사진 · (A)~(D) · 문장 글자 없음', photoInfo.part === 'p1' && photoInfo.number === 1 && !photoProblem(lcArea(c), photoInfo.q, 1) &&
    options().map(o => o.textContent).join('') === '(A)(B)(C)(D)' && !photoInfo.q.choices.some(ch => lcArea(c).textContent.includes(ch)), photoInfo.key);
  check('Part 1 재생 버튼 (▶ 문제 듣기)', playBtn() && playBtn().textContent === '▶ 문제 듣기' && !playBtn().disabled);
  c.synth.queue = [];
  playBtn().click();
  check('Part 1: 누르면 같은 클릭 안에서 바로 재생 (첫 줄 = A 문장)', c.synth.queue.length === 1 && c.synth.queue[0].text === 'A. ' + photoInfo.q.choices[0], c.synth.queue.map(u => u.text).join(' | '));
  const photoSpoken = [], photoVoices = [];
  for (let k = 0; k < 10 && c.synth.queue.length; k++) {
    const u = c.synth.queue.shift(); photoSpoken.push(u.text);
    photoVoices.push((u.voice ? u.voice.name : '기본') + '/' + (u.pitch === undefined ? 1 : u.pitch));
    u.onend(); await flush(); await flush();
  }
  await flush();
  check('Part 1 음성 = A → B → C → D 네 문장', photoSpoken.join(' | ') === photoInfo.q.choices.map((ch, i) => 'ABCD'[i] + '. ' + ch).join(' | '), photoSpoken.join(' | '));
  check('Part 1 음성은 한 사람 (같은 목소리 · 보정 없음)', new Set(photoVoices).size === 1 && /\/1$/.test(photoVoices[0]), photoVoices.join(', '));
  check('Part 1 다 듣고 나도 재생 버튼은 막힘 · 문장 글자는 여전히 없음', playBtn().disabled === true && playBtn().textContent === '재생 완료 · 다시 들을 수 없어요' &&
    !photoInfo.q.choices.some(ch => lcArea(c).textContent.includes(ch)) && lcLeak(c) === 0, playBtn().textContent);
  c.synth.queue = [];
  playBtn().click();
  check('Part 1 막힌 버튼을 눌러도 재생되지 않음', c.synth.queue.length === 0);
  options()[3].click();
  check('Part 1 답 고르기 → 저장', options()[3].classList.contains('is-selected') && JSON.parse(store.get(LC_KEY)).answers[0] === 3);
  // 사진을 못 불러오면 대체 문구
  const img = lcArea(c).querySelector('.practice-lc-photo');
  img.dispatch('error');
  const fallback = lcArea(c).querySelector('.practice-lc-photo-fallback');
  check('사진 로딩 실패 → 사진 숨기고 대체 문구 표시 (문구에 정답 단서 없음)', img.hidden === true && fallback && fallback.hidden === false && fallback.textContent.includes('사진을 불러오지 못했어요') &&
    !photoInfo.q.choices.some(ch => fallback.textContent.includes(ch)), fallback && fallback.textContent);
  while (lcInfo(c).part === 'p1') lcNext(c).click();

  // Part 2 (7번)
  const first = lcInfo(c);
  check('Part 2 첫 문항 7번 · 사진 없음', first.part === 'p2' && first.number === 7 && !lcArea(c).querySelector('.practice-lc-photo'), first.number);
  check('Part 2 재생 버튼 (▶ 문제 듣기)', playBtn() && playBtn().textContent === '▶ 문제 듣기' && !playBtn().disabled);
  c.synth.queue = [];
  playBtn().click();
  check('누르면 같은 클릭 안에서 바로 재생 (첫 줄 = 질문)', c.synth.queue.length === 1 && c.synth.queue[0].text === first.q.question, c.synth.queue.map(u => u.text).join(' | '));
  check('누르는 즉시 재생 버튼 비활성', playBtn().disabled === true && playBtn().textContent === '재생 중…', playBtn().textContent);
  const spoken = [];
  for (let k = 0; k < 10 && c.synth.queue.length; k++) { const u = c.synth.queue.shift(); spoken.push(u.text); u.onend(); await flush(); await flush(); }
  await flush();
  check('Part 2 음성 = 질문 → A → B → C', spoken.join(' | ') === [first.q.question].concat(first.q.choices.map((ch, i) => 'ABC'[i] + '. ' + ch)).join(' | '), spoken.join(' | '));
  check('다 듣고 나도 재생 버튼은 막힘 (다시 듣기 없음)', playBtn().disabled === true && playBtn().textContent === '재생 완료 · 다시 들을 수 없어요', playBtn().textContent);
  c.synth.queue = [];
  playBtn().click();
  check('막힌 버튼을 눌러도 재생되지 않음', c.synth.queue.length === 0);
  check('"다시 듣기" 버튼 없음', !c.stage.querySelectorAll('.button').some(b => b.textContent.includes('다시 듣기')));
  options()[0].click(); options()[2].click();
  check('지금 문항의 답은 바꿀 수 있음', options()[2].classList.contains('is-selected') && !options()[0].classList.contains('is-selected') &&
    JSON.parse(store.get(LC_KEY)).answers[6] === 2);
  check('"이전" 버튼 없음', !c.stage.querySelectorAll('.button').some(b => b.textContent.includes('이전')));
  lcNext(c).click();
  check('다음 → 8번', lcInfo(c).number === 8);
  const omrNow = c.stage.querySelector('.practice-omr');
  check('OMR은 진행 표시용 (버튼 아님 · 안내 문구)', omrNow.querySelectorAll('.practice-omr-cell').every(cell => cell.tagName === 'SPAN' && cell.classList.contains('is-static')) &&
    omrNow.textContent.includes('진행 표시용이에요. 눌러서 이동할 수 없어요.'));
  omrNow.querySelectorAll('.practice-omr-cell')[0].click();
  omrNow.querySelectorAll('.practice-omr-cell')[50].click();
  check('OMR 칸을 눌러도 이동하지 않음 (1번·51번 눌러도 8번 그대로)', lcInfo(c).number === 8 && JSON.parse(store.get(LC_KEY)).index === 7);
  const omrCellsNow = c.stage.querySelector('.practice-omr').querySelectorAll('.practice-omr-cell');
  check('OMR: 1번 답 D · 7번 답 C 표시 · 8번 현재', omrCellsNow[0].querySelector('.practice-omr-mark').textContent === 'D' &&
    omrCellsNow[6].querySelector('.practice-omr-mark').textContent === 'C' && omrCellsNow[7].classList.contains('is-current'));
  while (lcInfo(c).part === 'p2') lcNext(c).click();
  const talkInfo = lcInfo(c);
  check('Part 3 첫 문항 32번 · 듣기 전 문제·선택지 숨김', talkInfo.number === 32 && !lcArea(c).querySelector('.practice-question-prompt') &&
    lcArea(c).querySelectorAll('.quiz-option').length === 0 && !!lcArea(c).querySelector('.practice-lc-wait'));
  check('대화 재생 버튼 (▶ 대화 듣기)', playBtn() && playBtn().textContent === '▶ 대화 듣기');
  c.synth.queue = [];
  playBtn().click();
  check('재생 중에도 문제 숨김', !lcArea(c).querySelector('.practice-question-prompt') && lcArea(c).querySelector('.practice-lc-wait').textContent.includes('재생 중'));
  const talkSpoken = [];
  for (let k = 0; k < 40 && c.synth.queue.length; k++) { const u = c.synth.queue.shift(); talkSpoken.push(u.text); u.onend(); await flush(); await flush(); }
  await flush();
  check('대화 모든 줄을 순서대로 한 번 읽음', talkSpoken.join('|') === talkInfo.talk.script.map(l => l.text).join('|'), talkSpoken.length + '/' + talkInfo.talk.script.length + '줄');
  check('다 들으면 문제 표시 · 재생 버튼 막힘', !!lcArea(c).querySelector('.practice-question-prompt') && lcArea(c).querySelectorAll('.quiz-option').length === 4 && playBtn().disabled);
  lcNext(c).click();
  check('같은 대화의 다음 문항(33번): 다시 못 들음 · 문제 바로 보임', lcInfo(c).number === 33 && playBtn().disabled && !!lcArea(c).querySelector('.practice-question-prompt'));
  check('실전 조건 화면 어디에도 스크립트 없음', lcLeak(c) === 0);

  // --- 3. 중간 저장: 40문항 → 저장 → 3시간 뒤 다시 열기 → 이어서 → 제출 ---
  console.log('\n[LC 풀세트 — 중간 저장과 이어서 풀기]');
  store.delete(LC_KEY);
  const rcSaveBefore = store.get(FULL_KEY), rcHistoryBefore = store.get('englishLabFullSetHistory');
  const s1 = loadLc();
  startLc(s1);
  const answeredLc = [];
  let expectedLc = 0;
  async function answerLc(env, upTo) {
    while (true) {
      const info = lcInfo(env);
      if (info.number > upTo) break;
      await playLc(env); // 들어야 Part 3·4 문제가 보인다. 이미 들은 대화면 null
      // 3·5의 배수 번호를 틀리게 고른다 (한 대화에서 두 문항 이상 틀리는 묶음이 생기게, Part 1에서도 3·5·6번이 틀림).
      const choice = info.number % 3 === 0 || info.number % 5 === 0 ? (info.answer + 1) % info.q.choices.length : info.answer;
      lcArea(env).querySelectorAll('.quiz-option')[choice].click();
      answeredLc[info.number - 1] = { part: info.part, type: info.type, correct: choice === info.answer, choice };
      if (choice === info.answer) expectedLc++;
      if (info.number === upTo || info.number === LC_TOTAL) break;
      lcNext(env).click();
    }
  }
  await answerLc(s1, 40);
  for (let k = 0; k < 120; k++) { now += 1000; s1.tick(); } // 2분 경과
  const lcSaved = JSON.parse(store.get(LC_KEY) || 'null');
  const playedBefore = lcSaved ? lcSaved.played.slice() : [];
  check('저장: 형식 버전 2 · 구성표에 Part 1 사진 6장', lcSaved && lcSaved.version === 2 && Array.isArray(lcSaved.plan.p1) && lcSaved.plan.p1.length === 6);
  check('저장: 답 40개', lcSaved && lcSaved.answers.length === LC_TOTAL && lcSaved.answers.filter(a => a !== null).length === 40 && answeredLc.every((a, i) => lcSaved.answers[i] === a.choice));
  check('저장: 남은 시간 43:00 (2580초)', lcSaved && lcSaved.remainingSec === 2580, lcSaved && lcSaved.remainingSec);
  check('저장: 현재 문항 40번', lcSaved && lcSaved.index === 39, lcSaved && lcSaved.index);
  check('저장: 이미 재생한 음성 목록 (Part 1 6개 + Part 2 25개 + 대화 3개)', playedBefore.length === 34 && playedBefore.filter(k => k.startsWith('p1:')).length === 6 &&
    playedBefore.filter(k => k.startsWith('p2:')).length === 25, playedBefore.length + '개');
  check('저장: RC 풀세트 저장·기록 키와 별도', store.get(FULL_KEY) === rcSaveBefore && store.get('englishLabFullSetHistory') === rcHistoryBefore && LC_KEY !== FULL_KEY);
  const lcSnapshot = store.get(LC_KEY);

  now += 3 * 3600 * 1000;
  const s2 = loadLc();
  const lcNote = s2.stage.querySelectorAll('.practice-mode-card').find(card => card.dataset.mode === 'lc').querySelector('.practice-mode-saved');
  check('다시 열면 진행 중 LC 세트 안내', lcNote && lcNote.textContent.includes('푼 문제 40 / 100') && lcNote.textContent.includes('남은 시간 43:00'), lcNote && lcNote.textContent);
  check('RC 카드에는 진행 중 안내가 없음 (섞이지 않음)', !s2.stage.querySelectorAll('.practice-mode-card').find(card => card.dataset.mode === 'full').querySelector('.practice-mode-saved'));
  byText(s2.stage, 'LC 풀세트 선택').click();
  check('이어서 풀기 / 새로 시작', !!byText(s2.stage, '이어서 풀기') && !!byText(s2.stage, '새로 시작') && s2.stage.textContent.includes('이미 들은 문항의 음성은 다시 들을 수 없어요'));
  byText(s2.stage, '이어서 풀기').click();
  check('이어서: 남은 시간 43:00부터', s2.stage.querySelector('.practice-time').textContent === '43:00', s2.stage.querySelector('.practice-time').textContent);
  const resumedCells = s2.stage.querySelector('.practice-omr').querySelectorAll('.practice-omr-cell');
  check('이어서: 답 40개 그대로', resumedCells.filter(cell => cell.classList.contains('is-answered')).length === 40 &&
    answeredLc.every((a, i) => resumedCells[i].querySelector('.practice-omr-mark').textContent === 'ABCD'[a.choice]));
  check('이어서: 40번에서 시작', lcInfo(s2).number === 40 && resumedCells[39].classList.contains('is-current'));
  s2.synth.queue = [];
  const resumedPlay = s2.stage.querySelector('.practice-lc-play');
  if (resumedPlay) resumedPlay.click();
  check('이어서: 이미 들은 대화(38~40번)는 다시 재생되지 않음', resumedPlay && resumedPlay.disabled && s2.synth.queue.length === 0 &&
    !!lcArea(s2).querySelector('.practice-question-prompt'), resumedPlay && resumedPlay.textContent);
  lcNext(s2).click();
  check('이어서: 새 대화(41번)는 들을 수 있음', !s2.stage.querySelector('.practice-lc-play').disabled);
  await answerLc(s2, LC_TOTAL);
  check('이어서 푼 뒤 재생 목록에 앞의 34개가 그대로 남음', playedBefore.every(k => JSON.parse(store.get(LC_KEY)).played.includes(k)));
  const miniBefore = s2.window.Progress.getPracticeHistory().length;
  const rcHistoryLen = JSON.parse(store.get('englishLabFullSetHistory') || '[]').length;
  const listeningBefore = JSON.parse(store.get('englishLabProgress')).listeningStats;
  byText(s2.stage, '제출').click();
  const lcScore = s2.stage.querySelector('.practice-result-score');
  check('100문항 채점', lcScore && lcScore.textContent === '총점 ' + expectedLc + ' / 100', (lcScore && lcScore.textContent) + ' (예상 ' + expectedLc + ')');
  check('제출 후 LC 저장값 삭제', !store.has(LC_KEY));
  const lcHistory = JSON.parse(store.get(LC_HISTORY_KEY) || '[]');
  const lastLc = lcHistory.slice(-1)[0];
  check('LC 기록 (별도 키): 맞은 개수 · 환산 점수(보정 없음) · 소요 시간 · 파트별 4개', lastLc && lastLc.total === LC_TOTAL && lastLc.correct === expectedLc && lastLc.score === LC_EXPECTED[expectedLc] &&
    lastLc.elapsedSec === 120 && ['p1', 'p2', 'p3', 'p4'].every(id => lastLc.sections[id]) && lastLc.sections.p1.total === 6 && !('scaled' in lastLc), lastLc && JSON.stringify(lastLc));
  check('RC 풀세트 기록·미니 모의고사 기록과 섞이지 않음', JSON.parse(store.get('englishLabFullSetHistory') || '[]').length === rcHistoryLen &&
    s2.window.Progress.getPracticeHistory().length === miniBefore);
  const listeningAfter = JSON.parse(store.get('englishLabProgress')).listeningStats;
  const delta = p => listeningAfter[p].solved - ((listeningBefore[p] || {}).solved || 0);
  const p1Correct = answeredLc.slice(0, 6).filter(a => a.correct).length;
  check('답한 문항이 리스닝 정답률(part1·2·3·4)에 반영', delta('part1') === 6 && delta('part2') === 25 && delta('part3') === 39 && delta('part4') === 30 &&
    listeningAfter.part1.correct - ((listeningBefore.part1 || {}).correct || 0) === p1Correct, ['part1', 'part2', 'part3', 'part4'].map(delta).join('/'));

  // --- 4. 채점 화면 ---
  console.log('\n[LC 풀세트 — 채점 화면]');
  const card = s2.stage.querySelector('.practice-result');
  const scoreBox = card.querySelector('.practice-lc-score');
  check('실제 시험과 같은 구성 안내 · Part 1 제외 문구 없음', card.querySelector('.practice-lc-format') && card.querySelector('.practice-lc-format').textContent === LC_NOTE &&
    !card.textContent.includes('제외') && !card.textContent.includes('94'));
  check('예상 LC 점수 (보정 없이 표 그대로)', scoreBox && scoreBox.querySelector('.practice-band-value').textContent === '예상 LC 점수 약 ' + LC_EXPECTED[expectedLc] + '점' &&
    scoreBox.querySelector('.practice-band-note').textContent === '맞은 개수를 LC 환산표에 그대로 넣은 참고값입니다', scoreBox && scoreBox.textContent);
  const rows = cls => { const sec = card.querySelector('.' + cls); return sec ? sec.querySelectorAll('.practice-stat-row') : []; };
  const sectionRows = rows('practice-analysis-sections');
  const bySection = { p1: [0, 0], p2: [0, 0], p3: [0, 0], p4: [0, 0] };
  answeredLc.forEach(a => { bySection[a.part][1]++; if (a.correct) bySection[a.part][0]++; });
  check('파트별 정답률 4줄 (Part 1 포함) · 6/25/39/30 · 맞은 개수 일치 · 막대', sectionRows.map(r => r.dataset.id + '=' + r.dataset.correct + '/' + r.dataset.total).join(',') ===
    ['p1', 'p2', 'p3', 'p4'].map(p => p + '=' + bySection[p][0] + '/' + bySection[p][1]).join(',') && sectionRows.every(r => /width: \d+%/.test(r.querySelector('.practice-stat-fill').getAttribute('style'))) &&
    sectionRows[0].querySelector('.practice-stat-label').textContent === 'Part 1',
    sectionRows.map(r => r.querySelector('.practice-stat-label').textContent + ' ' + r.querySelector('.practice-stat-value').textContent).join(' | '));
  const typeRows = rows('practice-analysis-p2types');
  const byType = {};
  answeredLc.filter(a => a.part === 'p2').forEach(a => { byType[a.type] = byType[a.type] || [0, 0]; byType[a.type][1]++; if (a.correct) byType[a.type][0]++; });
  const typePct = id => Math.round(byType[id][0] / byType[id][1] * 100);
  check('Part 2 유형별 정답률 (이번 출제 유형 전부 · 합 25 · 낮은 순 · 유형 이름)', typeRows.length === Object.keys(byType).length &&
    typeRows.every(r => byType[r.dataset.id] && Number(r.dataset.correct) === byType[r.dataset.id][0] && Number(r.dataset.total) === byType[r.dataset.id][1] &&
      r.querySelector('.practice-stat-label').textContent === s2.window.PART2_TYPE_LABELS[r.dataset.id]) &&
    typeRows.reduce((sum, r) => sum + Number(r.dataset.total), 0) === 25 && typeRows.every((r, i) => i === 0 || typePct(typeRows[i - 1].dataset.id) <= typePct(r.dataset.id)),
    typeRows.map(r => r.querySelector('.practice-stat-label').textContent + ' ' + r.querySelector('.practice-stat-value').textContent).join(' | '));

  // --- 오답 복습 ---
  console.log('\n[LC 풀세트 — 오답 복습]');
  const missCount = answeredLc.filter(a => !a.correct).length;
  const reviewBtn = card.querySelectorAll('.button').find(b => b.textContent.startsWith('오답 복습'));
  check('오답 복습 버튼', reviewBtn && reviewBtn.textContent === '오답 복습 (' + missCount + '문항)', reviewBtn && reviewBtn.textContent);
  reviewBtn.click();
  const review = s2.stage.querySelector('.practice-lc-review');
  const groups = review ? review.querySelectorAll('.practice-review-group') : [];
  const groupKeys = groups.map(gr => gr.dataset.group);
  check('오답 문항 수 = 틀린 개수 · 번호 일치', review && review.querySelectorAll('.practice-review-miss').map(m => Number(m.dataset.number)).join(',') ===
    answeredLc.map((a, i) => a.correct ? null : i + 1).filter(Boolean).join(','));
  const isSingle = gr => gr.dataset.group.startsWith('p1:') || gr.dataset.group.startsWith('p2:');
  check('같은 대화·담화를 두 번 싣지 않음', new Set(groupKeys).size === groupKeys.length && groups.filter(gr => !isSingle(gr)).some(gr => gr.querySelectorAll('.practice-review-miss').length > 1),
    groupKeys.length + '묶음');
  const p1Groups = groups.filter(gr => gr.dataset.group.startsWith('p1:'));
  const p1Expected = answeredLc.slice(0, 6).filter(a => !a.correct).length;
  check('Part 1 복습: 틀린 사진마다 사진 + 네 문장 전문 + 내 답·정답 + 해설', p1Groups.length === p1Expected && p1Groups.length > 0 && p1Groups.every(gr => {
    const q = s2.window.PART1.find(x => 'p1:' + x.id === gr.dataset.group);
    const number = Number(gr.querySelector('.practice-review-miss').dataset.number);
    const text = gr.textContent;
    return !photoProblem(gr, q, number) && q.choices.every((ch, i) => text.includes('(' + 'ABCD'[i] + ') ' + ch)) && text.includes(q.explanation) &&
      text.includes('정답: (' + 'ABCD'[q.answer] + ') ' + q.choices[q.answer]) && text.includes(q.kind === 'people' ? '사람 사진' : '사물 사진');
  }), p1Groups.length + '묶음 / 틀린 Part 1 ' + p1Expected + '개');
  const p2Groups = groups.filter(gr => gr.dataset.group.startsWith('p2:'));
  check('Part 2 복습: 질문·선택지 전문 + 해설 + 해석', p2Groups.length > 0 && p2Groups.every(gr => {
    const q = s2.window.PART2.find(x => 'p2:' + x.id === gr.dataset.group);
    const text = gr.textContent;
    return text.includes(q.question) && q.choices.every((ch, i) => text.includes('(' + 'ABC'[i] + ') ' + ch)) && text.includes(q.explanation) && text.includes(q.ko) &&
      !gr.querySelector('.practice-lc-photo');
  }));
  const talkGroups = groups.filter(gr => !isSingle(gr));
  check('Part 3·4 복습: 스크립트 전문 + 해설', talkGroups.length > 0 && talkGroups.every(gr => {
    const [part, id] = gr.dataset.group.split(':');
    const talk = (part === 'p3' ? s2.window.PART3 : s2.window.PART4).find(x => x.id === id);
    const lines = gr.querySelectorAll('.listening-transcript-line').map(l => l.textContent);
    const texts = talk.script.map(l => typeof l === 'string' ? l : (talk.speakers && talk.speakers[l.speaker] || l.speaker) + ': ' + l.text);
    return lines.join('|') === texts.join('|') && gr.querySelectorAll('.practice-review-explanation').length === gr.querySelectorAll('.practice-review-miss').length;
  }));
  let replayOk = true;
  for (const gr of [p1Groups[0], p2Groups[0], talkGroups[0]]) {
    for (let k = 0; k < 2; k++) { // 복습에서는 몇 번이든 다시 들을 수 있다
      s2.synth.queue = [];
      const replay = gr.querySelector('.practice-lc-replay');
      replay.click();
      if (replay.disabled || s2.synth.queue.length !== 1) replayOk = false;
      s2.window.Speech.stop(); await flush();
    }
  }
  check('복습: 음성 다시 듣기 (Part 1·2·3·4, 여러 번 가능)', replayOk);
  byText(review, '← 채점 결과로').click();
  check('복습에서 채점 화면으로 돌아감', !!s2.stage.querySelector('.practice-lc-score'));

  // --- 5. 깨진 저장값 ---
  console.log('\n[LC 풀세트 — 깨진 저장값]');
  const badPlayed = JSON.parse(lcSnapshot); badPlayed.played = 'p2:p201';
  const badTalk = JSON.parse(lcSnapshot); badTalk.plan.p3[0] = 'p399';
  const shortLc = JSON.parse(lcSnapshot); shortLc.answers = [0];
  const badPhoto = JSON.parse(lcSnapshot); badPhoto.plan.p1[0] = 'ph99';
  const objectsOnly = JSON.parse(lcSnapshot); objectsOnly.plan.p1 = ['ph13', 'ph14', 'ph15', 'ph16', 'ph17', 'ph18'];
  // 이전 형식: Part 1 없는 94문항 저장값 (version 1)
  const oldFormat = JSON.parse(lcSnapshot); oldFormat.version = 1; delete oldFormat.plan.p1; oldFormat.answers = oldFormat.answers.slice(6);
  const corrupt = [['JSON 깨짐', '{oops'], ['재생 목록 형식', JSON.stringify(badPlayed)], ['없는 대화 id', JSON.stringify(badTalk)], ['답 개수 틀림', JSON.stringify(shortLc)],
    ['없는 사진 id', JSON.stringify(badPhoto)], ['사물 사진만 6장', JSON.stringify(objectsOnly)], ['이전 94문항 저장(version 1)', JSON.stringify(oldFormat)]];
  const corruptProblems = [];
  corrupt.forEach(([name, value]) => {
    const progress = store.get('englishLabProgress');
    store.set(LC_KEY, value);
    const e = loadLc();
    if (e.stage.querySelectorAll('.practice-mode-saved').length) corruptProblems.push(name + ': 안내가 뜸');
    if (store.has(LC_KEY)) corruptProblems.push(name + ': 깨진 값이 남음');
    if (store.get('englishLabProgress') !== progress) corruptProblems.push(name + ': 다른 기록이 바뀜');
    if (!e.warns.some(w => w.includes('LC 풀세트가 깨져'))) corruptProblems.push(name + ': 경고 없음');
    if (!startLc(e)) corruptProblems.push(name + ': 새로 시작 안 됨');
    store.delete(LC_KEY);
  });
  check('깨진 저장값 ' + corrupt.length + '종 — 지우고 새로 시작', corruptProblems.length === 0, corruptProblems.join(' ; ') || corrupt.map(x => x[0]).join(', '));

  // --- 6. 타이머 ---
  console.log('\n[LC 풀세트 — 타이머]');
  const t = loadLc();
  startLc(t);
  const time = () => t.stage.querySelector('.practice-time') && t.stage.querySelector('.practice-time').textContent;
  const alertBox = () => t.stage.querySelector('.practice-time-alert');
  check('시작 45:00 (100문항이어도 45분 그대로)', time() === '45:00');
  for (let k = 0; k < 2700 - 601; k++) { now += 1000; t.tick(); }
  check('10:01에는 알림 없음', alertBox().hidden === true, time());
  now += 1000; t.tick();
  check('10분 알림', !alertBox().hidden && alertBox().textContent.includes('남은 시간 10분'));
  t.hide(); now += 60 * 1000; t.tick(); t.show();
  check('1분 이탈 → 60초 차감 (09:00)', time() === '09:00', time());
  t.hide(); now += 3 * 60 * 1000; t.show();
  const lcNotice = t.stage.querySelector('.practice-suspended-notice');
  check('3분 이탈 → 중단, LC 이어서 풀기 화면', lcNotice && lcNotice.textContent === '시험이 중단되었습니다. 남은 시간 09:00부터 이어서 풀 수 있습니다.' &&
    !!byText(t.stage, '이어서 풀기') && t.stage.textContent.includes('진행 중인 LC 풀세트') && t.tick === null, lcNotice && lcNotice.textContent);
  byText(t.stage, '이어서 풀기').click();
  check('이어서 09:00부터', time() === '09:00', time());
  while (time() && time() !== '05:01') { now += 1000; t.tick(); }
  now += 1000; t.tick();
  check('5분 알림', !alertBox().hidden && alertBox().textContent.includes('남은 시간 5분'));
  for (let k = 0; k < 400 && t.tick; k++) { now += 1000; t.tick(); }
  const timeout = t.stage.querySelector('.practice-result');
  check('0이 되면 자동 제출 · 저장값 삭제', !!timeout && timeout.textContent.includes('시간 초과로 자동 제출') && timeout.textContent.includes('/ 100') && !store.has(LC_KEY) && t.tick === null);

  // --- 7. 환산표 ---
  console.log('\n[LC 풀세트 — 환산표]');
  const api = s2.window.PracticeLcFullSet;
  const scores = Array.from({ length: 101 }, (_, n) => api.scoreFor(n));
  check('0~100 전 구간: 맞은 개수를 보정 없이 표에 그대로 (n개 → 표[n])', scores.every((v, n) => v === LC_EXPECTED[n]), scores.filter((v, n) => v !== LC_EXPECTED[n]).length + '건 다름');
  check('0~100 단조 증가 (맞은 개수가 늘면 점수가 줄지 않음)', scores.every((v, n) => n === 0 || v >= scores[n - 1]));
  check('표 값 (100→495, 94→475, 47→165, 0→5) · 94→100 보정 없음 · 표 전체가 입력과 같음', api.scoreFor(100) === 495 && api.scoreFor(94) === 475 && api.scoreFor(47) === 165 && api.scoreFor(0) === 5 &&
    !('scaledFor' in api) && api.total === 100 && api.scoreTable.length === 101 && api.scoreTable.every((v, n) => v === LC_EXPECTED[n]), 'scoreFor(94)=' + api.scoreFor(94) + ', scoreFor(47)=' + api.scoreFor(47));
  let outOk = true;
  [-5, 150, NaN, 'abc', null, undefined, 50.4, Infinity, -Infinity, {}].forEach(v => { try { if (!Number.isInteger(api.scoreFor(v))) outOk = false; } catch (e) { outOk = false; } });
  check('범위 밖 입력에서 터지지 않음 (-5→5, 150→495)', outOk && api.scoreFor(-5) === 5 && api.scoreFor(150) === 495 && api.scoreFor(NaN) === 5);

  // --- 8. 기록 화면 ---
  console.log('\n[LC 풀세트 — 기록]');
  s2.byId('practice-tab-history').click();
  const historyEl = s2.byId('practice-history');
  const lcSection = historyEl.querySelector('.practice-lc-history');
  const rcSection = historyEl.querySelector('.practice-full-history');
  const tableRows = section => section ? section.all().filter(e => e.tagName === 'TBODY')[0].all().filter(e => e.tagName === 'TR') : [];
  const lcRows = tableRows(lcSection);
  const lcHistoryNow = JSON.parse(store.get(LC_HISTORY_KEY) || '[]');
  check('기록 화면에 LC 풀세트 기록이 따로 표시 (최근 20회 · 최신이 맨 위 · 100문항)', !!lcSection && lcSection.textContent.includes('LC 풀세트 기록') &&
    lcRows.length === lcHistoryNow.length && lcHistoryNow.length === 20 && lcRows[0].textContent.includes(lcHistoryNow[19].correct + ' / 100') &&
    lcSection.textContent.includes(expectedLc + ' / 100') && lcSection !== rcSection, lcRows.length + '줄');
  check('RC 기록 영역에 LC 응시가 섞이지 않음', !rcSection || tableRows(rcSection).length === JSON.parse(store.get('englishLabFullSetHistory') || '[]').length);

  // --- 9. 음성 미지원 브라우저: 스크립트로 풀 수 있게 ---
  console.log('\n[LC 풀세트 — 음성 미지원]');
  store.delete(LC_KEY);
  const n = loadPracticePage();
  startLc(n);
  const nInfo = lcInfo(n);
  check('미지원: Part 1 사진 + 안내 + 네 문장 스크립트 + 선택지 4개', n.stage.textContent.includes('음성 재생을 지원하지 않아') && n.stage.querySelectorAll('.practice-lc-script').length === 1 &&
    !n.stage.querySelector('.practice-lc-play') && lcArea(n).querySelectorAll('.quiz-option').length === 4 && !photoProblem(lcArea(n), nInfo.q, 1) &&
    nInfo.q.choices.every(ch => n.stage.querySelector('.practice-lc-script').textContent.includes(ch)));
  while (lcInfo(n).part === 'p1') lcNext(n).click();
  check('미지원: Part 2 스크립트 + 선택지 3개', n.stage.querySelectorAll('.practice-lc-script').length === 1 && lcArea(n).querySelectorAll('.quiz-option').length === 3);
  byText(n.stage, '제출').click();

  // --- 10. 데이터 부족 ---
  console.log('\n[LC 풀세트 — 데이터 부족]');
  const shortTalks = loadLc({ mutate: w => { w.PART4 = w.PART4.slice(0, 9); } });
  byText(shortTalks.stage, 'LC 풀세트 선택').click();
  const err = shortTalks.stage.querySelector('.practice-full-error');
  check('Part 4 담화가 9개면 오류 표시', !!err && err.textContent.includes('Part 4 담화 수가 모자라') && err.textContent.includes('필요 10개, 현재 9개') &&
    shortTalks.errors.some(m => m.includes('LC 풀세트를 만들 수 없습니다')), err && err.textContent);
  const noObjects = loadLc({ mutate: w => { w.PART1 = w.PART1.filter(p => p.kind === 'people'); } });
  byText(noObjects.stage, 'LC 풀세트 선택').click();
  const err2 = noObjects.stage.querySelector('.practice-full-error');
  check('사물 사진이 없으면 오류 표시', !!err2 && err2.textContent.includes('Part 1 사물 사진 수가 모자라'), err2 && err2.textContent);
  const fewPeople = loadLc({ mutate: w => { w.PART1 = w.PART1.filter(p => p.kind === 'objects').concat(w.PART1.filter(p => p.kind === 'people').slice(0, 3)); } });
  byText(fewPeople.stage, 'LC 풀세트 선택').click();
  const err3 = fewPeople.stage.querySelector('.practice-full-error');
  check('사람 사진이 3장이면 오류 표시', !!err3 && err3.textContent.includes('Part 1 사람 사진 수가 모자라') && err3.textContent.includes('현재 3개'), err3 && err3.textContent);
}

(async () => {
  try {
    await runLcTests();
  } catch (error) {
    check('LC 풀세트 검사 실행', false, error.stack);
  }
  console.log(failures ? `\n실패 ${failures}건` : '\n전부 통과');
  process.exit(failures ? 1 : 0);
})();
function FakeUtterance(text) { this.text = text; this.volume = 1; this.lang = ''; this.voice = null; this.rate = 1; }
