"use strict";

// 학습 기록 내보내기·가져오기(assets/js/backup.js) 검사. 실제 common.js + backup.js를 가짜 기기 여러 대에서 실행한다.
// 실행: node tools/check-backup.js  (외부 패키지 불필요)
//  1. 오래된 기록을 가져와도 최신 진도가 줄지 않는다
//  2. 같은 시험 기록이 두 번 들어가지 않는다
//  3. 나중에 맞힌 문제가 틀린 문제로 되살아나지 않는다 (독해 문항 · 단어)
//  4. 내보내기 → 가져오기 왕복 후 기록이 원래와 같다 (합치기 · 덮어쓰기)
//  5. 잘못된 파일(app 불일치 / schema 불일치 / 깨진 JSON / 빈 파일 등)은 기존 기록을 건드리지 않고 거절된다
//  6. 한쪽이 완전히 빈 기록일 때도 정상 동작
//  + 가져오기 직전 자동 백업과 되돌리기, 기기별 장부와 합계가 늘 일치하는지

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..");

let failures = 0;
function check(name, cond, detail) {
  console.log((cond ? "  ✔ " : "  ✘ ") + name + (detail !== undefined ? " — " + detail : ""));
  if (!cond) failures++;
}

// 모든 기기가 같은 가짜 시계를 쓴다 (기기 사이 "나중"을 정확히 만들기 위해)
let now = Date.parse("2026-11-01T09:00:00+09:00");
const FakeDate = class extends Date {
  constructor(...a) { super(...(a.length ? a : [now])); }
  static now() { return now; }
};
const advance = (hours) => { now += hours * 3600 * 1000; };

const SOURCES = ["assets/js/common.js", "assets/js/backup.js"].map(f => [f, fs.readFileSync(path.join(root, f), "utf8")]);

function makeDevice(id, sources = SOURCES) {
  const store = new Map([["englishLabDeviceId", id]]);
  const localStorage = {
    getItem: k => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: k => store.delete(k)
  };
  const document = { readyState: "complete", getElementById: () => null, addEventListener() {} };
  const warns = [];
  const window = { document, location: { pathname: "/english-lab/pages/sync.html" }, matchMedia: () => ({ matches: false }) };
  const ctx = vm.createContext({ window, document, localStorage, console: { log() {}, info() {}, warn: (...a) => warns.push(a.join(" ")), error: console.error }, Date: FakeDate, Math });
  sources.forEach(([file, code]) => vm.runInContext(code, ctx, { filename: file }));
  return { id, store, P: window.Progress, B: window.Backup, warns };
}

// 기기 안에서 공부하기 (실제 Progress API)
function study(dev, plan) {
  (plan.vocab || []).forEach(([word, ok]) => { dev.P.recordVocabAnswer(word, ok); advance(0.01); });
  (plan.grammar || []).forEach(([rule, ok]) => dev.P.recordGrammarAnswer(rule, ok));
  (plan.listening || []).forEach(([part, ok]) => dev.P.recordListeningAnswer(part, ok));
  (plan.dictation || []).forEach(acc => dev.P.recordDictation(acc));
  (plan.reading || []).forEach(([id, correct, total, wrong]) => { dev.P.recordReadingResult(id, correct, total, wrong); advance(0.01); });
  (plan.shadowing || []).forEach(acc => dev.P.recordShadowingAttempt(acc));
  (plan.patterns || []).forEach(id => dev.P.recordSpeakingPattern(id));
  (plan.mini || []).forEach(correct => {
    dev.P.recordPracticeAttempt({ correct, total: 30, elapsedSec: 600 + correct, timedOut: false, partScores: { p5: 10, p6: 5, p7: correct - 15 }, partTotals: { p5: 15, p6: 8, p7: 7 } });
    advance(0.01);
  });
  (plan.full || []).forEach(([key, correct]) => {
    const list = JSON.parse(dev.store.get(key) || "[]");
    list.push({ date: new FakeDate().toISOString(), correct, total: 100, score: correct * 4, elapsedSec: 4000 + correct, timedOut: false, sections: { p5: { correct: 1, total: 30 } } });
    dev.store.set(key, JSON.stringify(list));
    advance(0.01);
  });
  if (plan.vocabDay !== undefined) dev.P.set({ vocabDay: plan.vocabDay });
  advance(1);
}

const exportText = (dev, name) => JSON.stringify(dev.B.buildExport(name || dev.id));
function importText(dev, text, mode = "merge") {
  const parsed = dev.B.parseBackup(text);
  if (!parsed.ok) throw new Error("가져오기 거절: " + parsed.error);
  return dev.B.applyImport(parsed.envelope, mode);
}
// 키 순서를 정렬해 비교한다 (단어를 배운 순서가 기기마다 달라 객체 키 순서만 다를 수 있음. 배열 순서는 그대로 비교)
function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (!value || typeof value !== "object") return value;
  const out = {};
  Object.keys(value).sort().forEach(k => { out[k] = sortKeys(value[k]); });
  return out;
}
const progressOf = dev => sortKeys(dev.P.get());
const rcOf = dev => JSON.parse(dev.store.get("englishLabFullSetHistory") || "[]");
const lcOf = dev => JSON.parse(dev.store.get("englishLabLcFullSetHistory") || "[]");
const totalsOf = dev => dev.P.sync.counterTotals(progressOf(dev));
const snapshotStore = dev => JSON.stringify([...dev.store.entries()].sort());

// 합계가 장부(기기별 몫의 합)와 같은지
function ledgerConsistent(dev) {
  const ledger = dev.P.sync.normalizeLedger(JSON.parse(dev.store.get("englishLabSyncLedger") || "null"));
  const sums = dev.P.sync.ledgerTotals(ledger).totals;
  const totals = totalsOf(dev);
  const paths = new Set([...Object.keys(sums), ...Object.keys(totals)]);
  return [...paths].every(p => Math.abs((sums[p] || 0) - (totals[p] || 0)) < 1e-6);
}
// 두 진도에서 값이 다른 곳 (한 단계 아래 키까지)
function diffKeys(a, b) {
  const out = [];
  Object.keys(Object.assign({}, a, b)).forEach(k => {
    if (JSON.stringify(a[k]) === JSON.stringify(b[k])) return;
    if (a[k] && b[k] && typeof a[k] === "object" && !Array.isArray(a[k])) {
      Object.keys(Object.assign({}, a[k], b[k])).forEach(k2 => {
        if (JSON.stringify(a[k][k2]) !== JSON.stringify(b[k][k2])) out.push(k + "." + k2 + " " + JSON.stringify(a[k][k2]) + " ≠ " + JSON.stringify(b[k][k2]));
      });
    } else out.push(k);
  });
  return out;
}
// a의 모든 누적 숫자가 b 이상인지 (줄어든 경로 목록)
function decreased(after, before) {
  return Object.keys(before).filter(p => (after[p] || 0) + 1e-9 < before[p]);
}

function runAll(sources) {
  now = Date.parse("2026-11-01T09:00:00+09:00");
  const out = [];
  const t = (name, cond, detail) => out.push([name, !!cond, detail]);

  // ---------- 준비: 컴퓨터(PC)에서 먼저 공부 ----------
  const pc = makeDevice("d-pc000001", sources);
  study(pc, {
    vocab: [["w1", true], ["w2", true], ["w3", false], ["w9", false]],
    grammar: [["g01", true], ["g01", false], ["g02", true]],
    listening: [["part2", true], ["part3", false]],
    dictation: [0.8, 0.6],
    reading: [["rp01", 1, 3, [1, 2]]],
    shadowing: [0.7],
    patterns: ["sp01"],
    mini: [20],
    full: [["englishLabFullSetHistory", 70]],
    vocabDay: 3
  });
  const pcOldFile = exportText(pc, "노트북");
  const pcAtExport = { totals: totalsOf(pc), progress: progressOf(pc) };

  // ---------- 휴대폰: 컴퓨터 기록을 받은 뒤 더 공부 ----------
  const phone = makeDevice("d-phone0001", sources);
  importText(phone, pcOldFile);
  study(phone, {
    vocab: [["w1", true], ["w9", true], ["w4", true]], // w9: 컴퓨터에서 틀렸던 단어를 나중에 맞힘
    grammar: [["g01", true]],
    listening: [["part1", true]],
    dictation: [0.9],
    reading: [["rp01", 3, 3, []]], // rp01: 컴퓨터에서 틀린 2·3번을 나중에 모두 맞힘
    shadowing: [0.9],
    mini: [25],
    full: [["englishLabLcFullSetHistory", 60]],
    vocabDay: 5
  });
  const phoneBefore = { totals: totalsOf(phone), progress: progressOf(phone), rc: rcOf(phone), lc: lcOf(phone) };

  // ---------- 1. 오래된 기록을 가져와도 최신 진도가 줄지 않는다 ----------
  importText(phone, pcOldFile); // 컴퓨터의 옛 파일을 다시 가져옴
  const phoneAfter = { totals: totalsOf(phone), progress: progressOf(phone) };
  t("1 옛 파일을 다시 가져와도 누적 숫자가 하나도 줄지 않고 늘지도 않음 (중복 없음)", !decreased(phoneAfter.totals, phoneBefore.totals).length &&
    JSON.stringify(phoneAfter.totals) === JSON.stringify(phoneBefore.totals), decreased(phoneAfter.totals, phoneBefore.totals).join(", ") || "변화 없음");
  t("1 단어 진도(단계) 유지 · Day 진도 유지 · 학습한 날 유지", JSON.stringify(phoneAfter.progress.vocabProgress) === JSON.stringify(phoneBefore.progress.vocabProgress) &&
    phoneAfter.progress.vocabDay === 5 && phoneAfter.progress.studiedDates.join() === phoneBefore.progress.studiedDates.join(),
    "w1 단계 " + phoneAfter.progress.vocabProgress.w1.stage + ", vocabDay " + phoneAfter.progress.vocabDay);
  // 컴퓨터가 옛 파일 이후 더 공부한 뒤 서로 주고받으면: 양쪽 공부가 모두 정확히 한 번씩 더해진다
  study(pc, { vocab: [["w5", true]], grammar: [["g02", false]], listening: [["part2", true]], mini: [18] });
  const pcNewFile = exportText(pc, "노트북");
  const pcShare = totalsOf(pc);
  importText(phone, pcNewFile);
  const expectQuiz = pcShare.quizSolved + (phoneBefore.totals.quizSolved - pcAtExport.totals.quizSolved);
  const expectG02 = pcShare["grammarStats|g02|solved"] + (phoneBefore.totals["grammarStats|g02|solved"] - pcAtExport.totals["grammarStats|g02|solved"]);
  t("1 각자 공부한 뒤 합치면 양쪽 몫이 정확히 한 번씩 더해짐 (단어 시험 답 수 · 문법 g02)", totalsOf(phone).quizSolved === expectQuiz &&
    totalsOf(phone)["grammarStats|g02|solved"] === expectG02, "단어 " + totalsOf(phone).quizSolved + "/" + expectQuiz + " · g02 " + totalsOf(phone)["grammarStats|g02|solved"] + "/" + expectG02);
  importText(pc, exportText(phone, "휴대폰"));
  t("1 반대로 주고받으면 두 기기 기록이 똑같아짐", JSON.stringify(progressOf(pc)) === JSON.stringify(progressOf(phone)) &&
    JSON.stringify(rcOf(pc)) === JSON.stringify(rcOf(phone)) && JSON.stringify(lcOf(pc)) === JSON.stringify(lcOf(phone)),
    (diffKeys(progressOf(pc), progressOf(phone)).join(", ") || "진도 같음") + " · RC " + (JSON.stringify(rcOf(pc)) === JSON.stringify(rcOf(phone)) ? "같음" : "다름") +
    " · LC " + (JSON.stringify(lcOf(pc)) === JSON.stringify(lcOf(phone)) ? "같음" : JSON.stringify(lcOf(pc)) + " ≠ " + JSON.stringify(lcOf(phone))));
  t("1 쉐도잉 평균 = 양쪽 시도 3회의 평균 · 받아쓰기 정답률 3개", Math.abs(progressOf(pc).speakingStats.shadowingAvg - (0.7 + 0.9) / 2) < 1e-9 &&
    progressOf(pc).speakingStats.shadowingCount === 2 && progressOf(pc).listeningStats.dictation.wordAccuracy.length === 3,
    progressOf(pc).speakingStats.shadowingAvg + " / " + progressOf(pc).listeningStats.dictation.wordAccuracy.join(","));
  t("1 합계 = 기기별 장부의 합 (두 기기 모두)", ledgerConsistent(pc) && ledgerConsistent(phone));

  // ---------- 2. 같은 시험 기록이 두 번 들어가지 않는다 ----------
  const miniBefore = progressOf(phone).practiceStats.attempts.length;
  const text = exportText(pc, "노트북");
  importText(phone, text); importText(phone, text);
  const attempts = progressOf(phone).practiceStats.attempts;
  t("2 같은 파일을 두 번 가져와도 미니 모의고사 기록 수 그대로 (" + miniBefore + "회)", attempts.length === miniBefore && attempts.length === 3, attempts.length + "회");
  t("2 RC·LC 풀세트 기록도 중복 없음 · 시간순", rcOf(phone).length === 1 && lcOf(phone).length === 1 &&
    attempts.every((a, i) => i === 0 || Date.parse(attempts[i - 1].date) <= Date.parse(a.date)));
  // 시각이 같아도 내용이 다르면 다른 기록으로 둔다 (중복 판단: 시각 + 문항 수 + 맞은 수 + 소요 시간)
  const twin = JSON.parse(exportText(phone));
  const same = twin.data.englishLabProgress.practiceStats.attempts[0];
  twin.data.englishLabProgress.practiceStats.attempts.push(Object.assign({}, same, { correct: same.correct - 1, elapsedSec: same.elapsedSec + 1 }));
  importText(phone, JSON.stringify(twin));
  t("2 시각만 같고 내용이 다른 기록은 따로 남김", progressOf(phone).practiceStats.attempts.length === 4);

  // ---------- 3. 나중에 맞힌 문제가 틀린 문제로 되살아나지 않는다 ----------
  const fresh = makeDevice("d-fresh0001", sources);
  importText(fresh, pcOldFile); // 컴퓨터 옛 기록: rp01 2·3번 오답, w9 오답
  t("3 (전제) 옛 기록에는 rp01 2·3번과 w9가 오답", progressOf(fresh).readingStats.rp01.wrongQuestionIndexes.join() === "1,2" && progressOf(fresh).vocabProgress.w9.lastResult === "wrong");
  importText(fresh, exportText(phone, "휴대폰")); // 휴대폰에서 나중에 다 맞힘
  t("3 독해: 나중에 맞힌 문항은 오답 목록에서 빠짐 (옛 오답 기기가 새 기록을 가져올 때)", progressOf(fresh).readingStats.rp01.wrongQuestionIndexes.length === 0,
    progressOf(fresh).readingStats.rp01.wrongQuestionIndexes.join());
  t("3 단어: 옛 오답 기기가 새 기록을 가져오면 w9가 맞힌 상태로 바뀜", progressOf(fresh).vocabProgress.w9.lastResult === "correct" && progressOf(fresh).vocabProgress.w9.stage === 1,
    JSON.stringify(progressOf(fresh).vocabProgress.w9));
  importText(phone, pcOldFile);
  t("3 독해: 새 기록 기기가 옛 오답 파일을 가져와도 오답이 살아나지 않음", progressOf(phone).readingStats.rp01.wrongQuestionIndexes.length === 0);
  t("3 단어: 나중에 맞힌 w9는 맞힌 상태 유지 (단계 1 · 오답 횟수 1은 누적으로 남음)", progressOf(phone).vocabProgress.w9.lastResult === "correct" &&
    progressOf(phone).vocabProgress.w9.stage === 1 && progressOf(phone).vocabProgress.w9.wrongCount === 1, JSON.stringify(progressOf(phone).vocabProgress.w9));
  // 같은 기기에서도: 다시 풀어 맞히면 그 문항은 오답에서 빠진다 (예전에는 한 번 틀리면 영원히 남았음)
  study(fresh, { reading: [["rp02", 2, 3, [0]]] });
  study(fresh, { reading: [["rp02", 3, 3, []]] });
  t("3 같은 기기에서 다시 맞히면 오답 목록에서 빠짐 · 누적 정답은 5/6", progressOf(fresh).readingStats.rp02.wrongQuestionIndexes.length === 0 &&
    progressOf(fresh).readingStats.rp02.correct === 5 && progressOf(fresh).readingStats.rp02.total === 6);
  // 시각을 모르는 옛 형식 오답(wrongQuestionIndexes만 있는 기록)은 시각이 있는 나중 결과에 진다
  const legacy = JSON.parse(exportText(makeDevice("d-legacy001", sources)));
  legacy.data.englishLabProgress.readingStats = { rp01: { attempted: 1, correct: 2, total: 3, lastDate: "2026-10-01", wrongQuestionIndexes: [1] } };
  importText(phone, JSON.stringify(legacy));
  t("3 옛 형식 오답(시각 없음)은 시각 있는 나중 정답에 짐", progressOf(phone).readingStats.rp01.wrongQuestionIndexes.length === 0);

  // ---------- 4. 왕복: 내보내기 → 가져오기 후 기록이 원래와 같다 ----------
  const source = phone;
  const roundText = exportText(source, "휴대폰");
  // 왕복이 "빈 기록끼리 같음"으로 통과하지 않도록, 원본에 모든 종류의 기록이 실제로 있는지 먼저 본다
  const sourceSummary = source.B.summarize(source.B.localBundle());
  t("4 (전제) 왕복할 원본에 단어·문항·미니·RC·LC 기록이 모두 있음 (RC 1 · LC 1 · 미니 4)", sourceSummary.words >= 6 && sourceSummary.questions > 0 &&
    sourceSummary.mini === 4 && sourceSummary.rc === 1 && sourceSummary.lc === 1, JSON.stringify(sourceSummary));
  ["merge", "overwrite"].forEach(mode => {
    const target = makeDevice(mode === "merge" ? "d-round0001" : "d-round0002", sources);
    importText(target, roundText, mode);
    t("4 왕복 (" + (mode === "merge" ? "빈 기기에 합치기" : "덮어쓰기") + "): 진도 · RC · LC 기록이 원래와 같음",
      JSON.stringify(progressOf(target)) === JSON.stringify(progressOf(source)) && JSON.stringify(rcOf(target)) === JSON.stringify(rcOf(source)) &&
      JSON.stringify(lcOf(target)) === JSON.stringify(lcOf(source)) && ledgerConsistent(target));
    // 받은 기기에서 다시 내보내면 데이터 부분이 같다
    const again = JSON.parse(exportText(target));
    t("4 다시 내보낸 data가 원래 파일의 data와 같음 (" + mode + ")", JSON.stringify(sortKeys(again.data)) === JSON.stringify(sortKeys(JSON.parse(roundText).data)));
  });
  const envelope = JSON.parse(roundText);
  t("4 파일 머리: app · schema 1 · 시간대가 붙은 내보낸 시각 · 기기 이름 · 파일명", envelope.app === "english-lab" && envelope.schema === 1 &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(envelope.exportedAt) && envelope.device === "휴대폰" &&
    /^english-lab-progress-\d{4}-\d{2}-\d{2}\.json$/.test(source.B.exportFileName()) &&
    Object.keys(envelope.data).sort().join() === ["englishLabFullSetHistory", "englishLabLcFullSetHistory", "englishLabProgress", "englishLabSyncLedger"].join(),
    envelope.exportedAt + " · " + source.B.exportFileName());

  // ---------- 5. 잘못된 파일 거절 (기존 기록을 건드리지 않음) ----------
  const victim = phone;
  const good = JSON.parse(exportText(pc));
  const bad = [
    ["app 불일치", JSON.stringify(Object.assign({}, good, { app: "other-app" })), /English Lab 기록 파일이 아닙니다/],
    ["schema 불일치", JSON.stringify(Object.assign({}, good, { schema: 7 })), /schema 7/],
    ["깨진 JSON", exportText(pc).replace('"schema":1,', '"schema":1'), /JSON\).*깨졌습니다.*번째 줄 \d+번째 글자/],
    ["빈 파일", "", /비어 있는/],
    ["공백만", "   \n  ", /비어 있는/],
    ["중간에 잘림", exportText(pc).slice(0, 200), /중간에 잘렸습니다/],
    ["JSON 배열", "[1,2,3]", /English Lab 기록 파일이 아닙니다/],
    ["data 없음", JSON.stringify({ app: "english-lab", schema: 1 }), /data/],
    ["기록 손상(진도가 배열)", JSON.stringify(Object.assign({}, good, { data: { englishLabProgress: [] } })), /손상/]
  ];
  bad.forEach(([name, input, pattern]) => {
    const before = snapshotStore(victim);
    const result = victim.B.parseBackup(input);
    t("5 거절: " + name, !result.ok && pattern.test(result.error) && snapshotStore(victim) === before, result.ok ? "통과되어 버림" : result.error);
  });
  // 깨진 JSON의 위치 안내가 맞는지 (여러 줄 텍스트)
  const pretty = JSON.stringify(good, null, 2).split("\n");
  pretty[3] = pretty[3].replace(/,$/, ""); // 4번째 줄 끝 쉼표 삭제
  const located = victim.B.parseBackup(pretty.join("\n"));
  t("5 깨진 위치를 줄 번호로 알려 줌 (4번째 줄 쉼표 삭제 → 5번째 줄 근처)", !located.ok && /[45]번째 줄/.test(located.error), located.error);
  t("5 가져오기 방식이 잘못되면 아무것도 쓰지 않음", (() => {
    const before = snapshotStore(victim);
    try { victim.B.applyImport(victim.B.parseBackup(exportText(pc)).envelope, "replace"); return false; } catch (e) { return snapshotStore(victim) === before; }
  })());

  // ---------- 6. 한쪽이 완전히 빈 기록 ----------
  const emptyA = makeDevice("d-empty0001", sources);
  const emptyText = exportText(emptyA, "새 휴대폰");
  const beforeEmpty = { progress: JSON.stringify(progressOf(pc)), rc: JSON.stringify(rcOf(pc)), lc: JSON.stringify(lcOf(pc)) };
  importText(pc, emptyText);
  t("6 빈 기록을 가져와도 현재 기록 그대로", JSON.stringify(progressOf(pc)) === beforeEmpty.progress && JSON.stringify(rcOf(pc)) === beforeEmpty.rc && JSON.stringify(lcOf(pc)) === beforeEmpty.lc);
  const emptyB = makeDevice("d-empty0002", sources);
  importText(emptyB, exportText(pc));
  t("6 빈 기기에 가져오면 가져온 기록과 같음", JSON.stringify(progressOf(emptyB)) === JSON.stringify(progressOf(pc)) && ledgerConsistent(emptyB));
  const bothEmpty = makeDevice("d-empty0003", sources);
  importText(bothEmpty, emptyText);
  const s = bothEmpty.B.summarize(bothEmpty.B.localBundle());
  t("6 빈 기록끼리 합쳐도 오류 없이 0", s.studyDays === 0 && s.words === 0 && s.questions === 0 && s.mini + s.rc + s.lc === 0);
  const cmp = emptyA.B.compare(emptyA.B.parseBackup(exportText(pc)).envelope);
  t("6 요약 비교: 빈 기기 vs 가져올 기록 → '가져올 기록이 더 많아요'", /가져올 기록이 더 많아요/.test(cmp.verdict) && cmp.incoming.words > 0 && cmp.current.words === 0, cmp.verdict);
  const cmpOld = phone.B.compare(phone.B.parseBackup(exportText(emptyA)).envelope);
  t("6 요약 비교: 기록 많은 기기 vs 빈 파일 → 이 기기가 더 많고, 합친 뒤 = 현재", /이 기기의 기록이 더 많아요/.test(cmpOld.verdict) &&
    JSON.stringify(cmpOld.merged) === JSON.stringify(cmpOld.current), cmpOld.verdict);

  // ---------- 자동 백업과 되돌리기 ----------
  const u = makeDevice("d-undo00001", sources);
  study(u, { vocab: [["w7", true]], mini: [22] });
  const beforeImport = new Map([...u.store].filter(([k]) => k !== "englishLabImportBackup"));
  importText(u, exportText(phone), "overwrite");
  const backup = u.B.readBackup();
  t("백업: 가져오기 직전 기록이 하나 보관됨 (덮어쓰기)", backup && backup.mode === "overwrite" && backup.values.englishLabProgress === beforeImport.get("englishLabProgress"));
  t("백업: 덮어쓰기 후에는 이 기기에만 있던 w7이 사라짐", !progressOf(u).vocabProgress.w7);
  u.B.undoImport();
  const restored = new Map([...u.store].filter(([k]) => k !== "englishLabImportBackup"));
  t("되돌리기: 가져오기 전 기록과 똑같이 돌아오고 백업은 지워짐", JSON.stringify([...restored].sort()) === JSON.stringify([...beforeImport].sort()) &&
    !u.store.has("englishLabImportBackup") && !!progressOf(u).vocabProgress.w7);
  t("되돌리기: 백업이 없으면 아무것도 하지 않음", u.B.undoImport() === false);

  // ---------- 기기 설정·진행 중 시험은 파일에 넣지 않고, 가져와도 바뀌지 않음 ----------
  const s1 = makeDevice("d-setting01", sources);
  ["englishLabTheme", "englishLabSpeechSettings", "englishLabVocabSelection", "englishLabFullSetSave"].forEach(k => s1.store.set(k, "keep-" + k));
  const otherFile = JSON.parse(exportText(pc));
  t("설정·진행 중 시험은 파일에 없음", !Object.keys(otherFile.data).some(k => /Theme|Speech|Vocab|Save$/.test(k)));
  importText(s1, JSON.stringify(otherFile), "overwrite");
  t("덮어쓰기를 해도 이 기기의 설정·진행 중 시험은 그대로", ["englishLabTheme", "englishLabSpeechSettings", "englishLabVocabSelection", "englishLabFullSetSave"].every(k => s1.store.get(k) === "keep-" + k));

  // ---------- 7. 장부 멱등성: 여러 번 주고받아도 누적 숫자 = 실제로 공부한 총합 ----------
  // 공부할 때마다 "실제로 늘어난 양"을 따로 세어 두고(truth), 기기 화면의 합계와 비교한다.
  const COUNTERS = ["quizSolved", "grammarStats|g01|solved", "listeningStats|part2|solved", "listeningStats|dictation|attempted", "speakingStats|shadowingCount"];
  let wordSeq = 0;
  function session(dev, n, truth) {
    const plan = { vocab: [], grammar: [], listening: [], dictation: [], shadowing: [] };
    for (let k = 0; k < n; k++) {
      plan.vocab.push(["lw" + (wordSeq++ % 7), k % 3 !== 0]);
      plan.grammar.push(["g01", k % 2 === 0]);
      plan.listening.push(["part2", true]);
      plan.dictation.push(0.5 + (k % 5) / 10);
      plan.shadowing.push(0.6);
    }
    study(dev, plan);
    if (truth) COUNTERS.forEach(p => { truth[p] = (truth[p] || 0) + n; });
  }
  const totalsMatch = (dev, truth) => COUNTERS.every(p => (totalsOf(dev)[p] || 0) === (truth[p] || 0));
  const showTotals = (dev, truth) => COUNTERS.map(p => p.split("|").slice(-2).join(".") + " " + (totalsOf(dev)[p] || 0) + "/" + (truth[p] || 0)).join(", ");

  // 7-1. 두 기기 A→B→A→B 3바퀴, 매번 양쪽에서 공부 (받는 쪽은 보내는 쪽보다 뒤에 공부한 몫이 없도록 순서를 맞춤)
  const truth1 = {};
  const A = makeDevice("d-loopa0001", sources), Bdev = makeDevice("d-loopb0001", sources);
  const stepProblems = [];
  for (let lap = 1; lap <= 3; lap++) {
    session(A, 2 + lap, truth1);
    importText(Bdev, exportText(A));            // A → B
    if (!totalsMatch(Bdev, truth1)) stepProblems.push(lap + "바퀴 A→B 뒤 B: " + showTotals(Bdev, truth1));
    session(Bdev, 1 + lap, truth1);
    importText(A, exportText(Bdev));            // B → A
    if (!totalsMatch(A, truth1)) stepProblems.push(lap + "바퀴 B→A 뒤 A: " + showTotals(A, truth1));
    importText(Bdev, exportText(A));            // 이미 받은 기록을 한 번 더 (멱등)
    importText(A, exportText(Bdev));
    if (!totalsMatch(A, truth1) || !totalsMatch(Bdev, truth1)) stepProblems.push(lap + "바퀴 재전송 뒤 어긋남");
  }
  t("7 두 기기 A→B→A→B 3바퀴(+재전송): 매 단계 받은 쪽 합계 = 실제 공부 총합", !stepProblems.length && ledgerConsistent(A) && ledgerConsistent(Bdev),
    stepProblems[0] || showTotals(A, truth1));

  // 7-2. 기기 셋: 옛 파일(늦게 전달된 파일)과 순서가 섞인 전달을 포함
  const truth2 = {};
  const pc3 = makeDevice("d-tripc0001", sources), ph3 = makeDevice("d-triph0001", sources), br3 = makeDevice("d-tribr0001", sources);
  session(pc3, 4, truth2); session(ph3, 3, truth2); session(br3, 2, truth2);
  const stalePc = exportText(pc3);                      // 나중에 늦게 전달할 컴퓨터 옛 파일
  importText(ph3, exportText(pc3)); session(ph3, 2, truth2);
  importText(br3, exportText(ph3)); session(br3, 3, truth2);
  session(pc3, 1, truth2);
  importText(pc3, exportText(br3));                     // 컴퓨터는 이제 셋 모두의 몫을 앎
  importText(br3, stalePc);                             // 옛 파일이 늦게 도착
  importText(ph3, exportText(pc3)); importText(br3, exportText(ph3)); importText(pc3, exportText(br3));
  t("7 기기 셋(늦게 도착한 옛 파일 포함): 세 기기 모두 합계 = 실제 공부 총합",
    [pc3, ph3, br3].every(d => totalsMatch(d, truth2) && ledgerConsistent(d)), [pc3, ph3, br3].map(d => showTotals(d, truth2)).join(" | "));

  // 7-3. 덮어쓰기 뒤 내보내기: 남의 장부를 받은 상태에서 이 기기 몫을 다시 계산해도 망가지지 않는지
  const ow1 = makeDevice("d-owaaaa001", sources), ow2 = makeDevice("d-owbbbb001", sources);
  session(ow1, 3); session(ow2, 2);
  importText(ow1, exportText(ow2));                     // ow1 장부에 ow2 몫(2)이 들어감
  session(ow2, 4);                                      // ow2가 혼자 더 공부 (덮어쓰기로 사라질 몫)
  session(ow1, 1);
  importText(ow2, exportText(ow1), "overwrite");        // ow2: ow1 기록으로 덮어씀 → ow2의 혼자 공부한 4는 사라짐
  const afterOverwrite = totalsOf(ow2).quizSolved;
  t("7 덮어쓰기 직후 합계 = 덮어쓴 파일의 합계 (3+2+1 = 6)", afterOverwrite === 6 && ledgerConsistent(ow2), "quizSolved " + afterOverwrite);
  session(ow2, 5);                                      // 덮어쓴 뒤 ow2가 더 공부
  session(ow1, 2);
  const ow2File = exportText(ow2);
  const ow2Ledger = JSON.parse(ow2File).data.englishLabSyncLedger.devices;
  t("7 덮어쓴 뒤 내보낸 장부: ow2 몫 = 덮어쓰기 전에 넘겨준 2 + 덮어쓴 뒤 공부한 5, ow1 몫 = 4 (음수·중복 없음)",
    ow2Ledger["d-owbbbb001"] && ow2Ledger["d-owbbbb001"].counters.quizSolved === 7 && ow2Ledger["d-owaaaa001"].counters.quizSolved === 4,
    JSON.stringify(Object.keys(ow2Ledger).map(id => id + ":" + ow2Ledger[id].counters.quizSolved)));
  importText(ow1, ow2File); importText(ow1, ow2File);
  t("7 그 파일을 원래 기기에 (두 번) 합치면 = ow1 6 + ow2 7 = 13 (사라진 4는 다시 생기지 않음)", totalsOf(ow1).quizSolved === 13 && ledgerConsistent(ow1),
    "quizSolved " + totalsOf(ow1).quizSolved);

  // 7-4. 장부 키가 없는 옛 파일 (schema 1, englishLabSyncLedger 없음 · deviceId 있음/없음)
  const legacySrc = makeDevice("d-oldsrc001", sources);
  session(legacySrc, 3);
  const noLedger = JSON.parse(exportText(legacySrc)); delete noLedger.data.englishLabSyncLedger;
  const noLedgerNoId = JSON.parse(JSON.stringify(noLedger)); delete noLedgerNoId.deviceId;
  [["deviceId 있음", noLedger], ["deviceId도 없음", noLedgerNoId]].forEach(([label, file]) => {
    const dst = makeDevice(label === "deviceId 있음" ? "d-olddst001" : "d-olddst002", sources);
    session(dst, 2);
    importText(dst, JSON.stringify(file)); importText(dst, JSON.stringify(file)); // 두 번 가져와도
    t("7 장부 없는 옛 파일(" + label + "): 합계 = 내 몫 2 + 파일 3 = 5 · 두 번 가져와도 그대로", totalsOf(dst).quizSolved === 5 && ledgerConsistent(dst),
      "quizSolved " + totalsOf(dst).quizSolved);
  });
  return out;
}

console.log("\n[기록 내보내기·가져오기]");
const results = runAll(SOURCES);
results.forEach(([name, ok, detail]) => check(name, ok, detail));

// ---------- 일부러 버그를 심어 검사가 잡는지 ----------
console.log("\n[버그를 심었을 때 검사가 잡는지]");
const MUTANTS = [
  ["장부를 기기별 최댓값 대신 더하기로 합침", "assets/js/backup.js",
    "target.counters[path] = Math.max(target.counters[path] || 0, entry.counters[path]);", "target.counters[path] = (target.counters[path] || 0) + entry.counters[path];", /^1 /],
  ["시험 기록 중복 제거를 빼먹음", "assets/js/backup.js", "if (seen[key]) return;", "", /^2 /],
  ["문항 결과를 시각 대신 '오답 우선'으로 고름", "assets/js/backup.js",
    "if (a.at && b.at) return Date.parse(a.at) >= Date.parse(b.at) ? a : b;", "if (a.wrong || b.wrong) return a.wrong ? a : b;", /^3 /],
  ["단어 상태를 늦은 기록 대신 첫 번째(현재) 기록으로 고름", "assets/js/backup.js",
    "if (aAt !== null && bAt !== null && aAt !== bAt) return aAt > bAt ? a : b;", "if (aAt !== null && bAt !== null && aAt !== bAt) return a;", /^3 /],
  ["schema 검사를 빼먹음", "assets/js/backup.js", "if (parsed.schema !== SCHEMA) {", "if (false) {", /^5 /],
  ["빈 파일 검사를 빼먹음", "assets/js/backup.js", '!text.replace(/^\\uFEFF/, "").trim()', "false", /^5 /],
  ["가져올 때 RC 기록을 빠뜨림", "assets/js/backup.js", "rc: mergeHistory(local.rc, remote.rc, FULL_LIMIT),", "rc: local.rc,", /^4 /],
  ["이 기기 몫을 '합계 − 다른 기기 몫' 대신 합계 전체로 셈", "assets/js/common.js",
    "var share = roundFloat(totals[path] - (sumOthers[path] || 0));", "var share = totals[path];", /^1 /]
];
MUTANTS.forEach(([name, file, from, to, expect]) => {
  const sources = SOURCES.map(([f, code]) => {
    if (f !== file) return [f, code];
    if (!code.includes(from)) throw new Error("버그 심기 실패(원문 없음): " + name);
    return [f, code.replace(from, to)];
  });
  let caught = [];
  try {
    caught = runAll(sources).filter(([n, ok]) => !ok).map(([n]) => n);
  } catch (error) {
    caught = ["실행 오류: " + error.message];
  }
  const hit = caught.some(n => expect.test(n) || n.startsWith("실행 오류"));
  check("심은 버그 잡힘: " + name, hit, caught.length ? caught.length + "건 실패 (" + caught.slice(0, 3).map(n => n.slice(0, 40)).join(" / ") + ")" : "아무 검사도 실패하지 않음");
});

console.log(failures ? `\n실패 ${failures}건` : "\n전부 통과");
process.exit(failures ? 1 : 0);
