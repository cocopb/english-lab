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
  setInterval: fn => { intervalFn = fn; return 7; }, clearInterval: () => { intervalFn = null; },
  confirm: () => true
};
const localStorage = {
  getItem: k => store.has(k) ? store.get(k) : null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k)
};
const ctx = vm.createContext({ window, document, localStorage, console, Date: FakeDate });
for (const f of ['assets/js/common.js', 'data/grammar.js', 'data/reading.js', 'assets/js/practice.js']) {
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
let firstChoiceWasCorrect = 0;
for (let i = 0; i < TOTAL; i++) {
  mockStage.querySelector('.practice-omr').querySelectorAll('.practice-omr-cell')[i].click();
  const a = mockStage.querySelector('.practice-question-area');
  const meta = a.querySelector('.practice-question-meta').textContent;
  if (!meta.includes(' ' + (i + 1) + ' / ' + TOTAL)) check('OMR ' + (i + 1) + '번 이동', false, meta);
  const cur = mockStage.querySelector('.practice-omr').querySelectorAll('.practice-omr-cell.is-current');
  if (cur.length !== 1 || !cur[0].textContent.startsWith(String(i + 1))) check('현재 칸 표시 ' + (i + 1), false);
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

console.log(failures ? `\n실패 ${failures}건` : '\n전부 통과');
process.exit(failures ? 1 : 0);
