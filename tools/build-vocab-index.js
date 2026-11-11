"use strict";

// window.VOCAB을 읽어 docs/vocab-index.md를 만든다.
// 단어 데이터가 바뀌면 `node tools/build-vocab-index.js`로 다시 돌려 갱신한다.
// 새 Day 주제를 고르기 전에 이미 있는 표제어·주제를 확인하는 용도다.

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var root = path.join(__dirname, "..");
var dataPath = path.join(root, "data", "vocab.js");
var outPath = path.join(root, "docs", "vocab-index.md");

var context = { window: {} };
vm.runInNewContext(fs.readFileSync(dataPath, "utf8"), context, { filename: dataPath });

var vocabulary = context.window.VOCAB;
if (!Array.isArray(vocabulary)) {
  console.error("색인 생성 실패: data/vocab.js에서 window.VOCAB 배열을 찾을 수 없습니다.");
  process.exit(1);
}
var wrongForms = new Set(Array.isArray(context.window.VOCAB_WRONG_FORMS) ? context.window.VOCAB_WRONG_FORMS : []);

// 데이터에 주제가 없을 때 쓰는 Day 주제. 단어 구성을 보고 정했다.
// 데이터 쪽 주제(window.VOCAB_DAY_TOPICS[day] 또는 단어의 topic 필드)가 있으면 그쪽이 우선한다.
// 새 Day를 추가하면 여기에도 한 줄 넣는다.
var DAY_TOPICS = {
  1: "사무 기본 빈출 (일정·주문·제출·환불)",
  2: "사무·거래 기본 빈출 (예산·공급·고객·보증)",
  3: "사무·거래 빈출 동사 (협상·등록·이전·구독)",
  4: "사무·행정 빈출 (승인·검사·설치·환급)",
  5: "업무 고급 빈출 (평가·준수·효율화·임시)",
  6: "채용·인사",
  7: "회의·일정 관리",
  8: "마케팅·광고",
  9: "회계·재무",
  10: "출장·여행·숙박",
  11: "제조·생산",
  12: "IT·컴퓨터",
  13: "계약·법무",
  14: "고객 서비스",
  15: "안전·보건·복지",
  16: "환경·에너지"
};

var POS_LABELS = { "n.": "명사", "v.": "동사", "adj.": "형용사", "adv.": "부사", "표현": "표현" };

function posLabel(pos) {
  return pos.split("/").map(function (part) {
    var key = part.trim();
    if (key && key.slice(-1) !== "." && POS_LABELS[key + "."]) key += ".";
    return POS_LABELS[key] || key;
  }).join("/");
}

function headword(item) {
  return wrongForms.has(item.word) ? item.word + " (✕)" : item.word;
}

function topicForDay(day, items) {
  var dataTopics = context.window.VOCAB_DAY_TOPICS;
  if (dataTopics && typeof dataTopics[day] === "string" && dataTopics[day].trim()) return dataTopics[day].trim();
  var withTopic = items.filter(function (item) { return typeof item.topic === "string" && item.topic.trim(); });
  if (withTopic.length) return withTopic[0].topic.trim();
  return DAY_TOPICS[day] || null;
}

var toeic = vocabulary.filter(function (item) { return item.track === "toeic"; });
var survival = vocabulary.filter(function (item) { return item.track === "survival"; });
var others = vocabulary.filter(function (item) { return item.track !== "toeic" && item.track !== "survival"; });

var days = new Map();
toeic.forEach(function (item) {
  if (!days.has(item.day)) days.set(item.day, []);
  days.get(item.day).push(item);
});
var dayNumbers = Array.from(days.keys()).sort(function (a, b) { return a - b; });

var situations = new Map();
survival.forEach(function (item) {
  var key = item.situation || "(상황 없음)";
  if (!situations.has(key)) situations.set(key, []);
  situations.get(key).push(item);
});

var posCounts = new Map();
vocabulary.forEach(function (item) {
  var key = item.pos || "(없음)";
  posCounts.set(key, (posCounts.get(key) || 0) + 1);
});

// 같은 표제어가 여러 곳에 있는지 (대소문자 무시)
var places = new Map();
vocabulary.forEach(function (item) {
  var key = item.word.trim().toLowerCase();
  var place = item.track === "toeic" ? "Day " + item.day : (item.situation || item.track);
  if (!places.has(key)) places.set(key, { word: item.word, where: [] });
  places.get(key).where.push(place);
});
var duplicates = Array.from(places.values()).filter(function (entry) { return entry.where.length > 1; });

var wrongHeadwords = vocabulary.filter(function (item) { return wrongForms.has(item.word); });
var missingTopics = [];

var lines = [];
lines.push("# 보카 색인");
lines.push("");
lines.push("> 자동 생성 파일이다. 직접 고치지 말고 `node tools/build-vocab-index.js`로 다시 만든다.");
lines.push("> 원본: `data/vocab.js` (window.VOCAB). `(✕)`는 `VOCAB_WRONG_FORMS`에 든 오답 전용 표현이다.");
lines.push("");
lines.push("## 요약");
lines.push("");
lines.push("- 전체 단어 수: **" + vocabulary.length + "개** (토익 " + toeic.length + " / 생존 영어 " + survival.length +
  (others.length ? " / 기타 " + others.length : "") + ")");
lines.push("- Day 수: **" + dayNumbers.length + "개** (Day " + dayNumbers[0] + " ~ Day " + dayNumbers[dayNumbers.length - 1] + ")");
lines.push("- 상황 수: **" + situations.size + "개** (" + Array.from(situations.keys()).join(", ") + ")");
lines.push("- 표제어 중 오답 전용 표현 `(✕)`: " + wrongHeadwords.length + "개");
lines.push("");

lines.push("## 품사별 집계");
lines.push("");
lines.push("| 품사 | 표기 | 개수 |");
lines.push("| --- | --- | ---: |");
Array.from(posCounts.entries()).sort(function (a, b) { return b[1] - a[1] || a[0].localeCompare(b[0]); }).forEach(function (entry) {
  lines.push("| " + posLabel(entry[0]) + " | `" + entry[0] + "` | " + entry[1] + " |");
});
lines.push("");

lines.push("## Day별 (토익)");
lines.push("");
lines.push("| Day | 주제 | 단어 수 |");
lines.push("| ---: | --- | ---: |");
dayNumbers.forEach(function (day) {
  var topic = topicForDay(day, days.get(day));
  if (!topic) missingTopics.push(day);
  lines.push("| " + day + " | " + (topic || "(주제 미정)") + " | " + days.get(day).length + " |");
});
lines.push("");
dayNumbers.forEach(function (day) {
  var items = days.get(day);
  var topic = topicForDay(day, items) || "(주제 미정)";
  lines.push("### Day " + day + " — " + topic + " (" + items.length + "개)");
  lines.push("");
  lines.push(items.map(headword).join(", "));
  lines.push("");
});

lines.push("## 상황별 (생존 영어)");
lines.push("");
situations.forEach(function (items, name) {
  lines.push("### " + name + " (" + items.length + "개)");
  lines.push("");
  lines.push(items.map(headword).join(", "));
  lines.push("");
});

lines.push("## 여러 곳에 있는 표제어");
lines.push("");
if (!duplicates.length) {
  lines.push("없음");
} else {
  duplicates.forEach(function (entry) {
    lines.push("- " + entry.word + " — " + entry.where.join(", "));
  });
}
lines.push("");

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");

console.log("생성: docs/vocab-index.md");
console.log("전체 " + vocabulary.length + "개 | Day " + dayNumbers.length + "개 | 상황 " + situations.size +
  "개 | 중복 표제어 " + duplicates.length + "개 | (✕) 표제어 " + wrongHeadwords.length + "개");
if (missingTopics.length) {
  console.warn("주의: 주제가 없는 Day — " + missingTopics.join(", ") + ". tools/build-vocab-index.js의 DAY_TOPICS에 추가하세요.");
}
