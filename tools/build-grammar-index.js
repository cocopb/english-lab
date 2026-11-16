"use strict";

// data/grammar.js(노트·Part 5 문항)와 data/reading.js(Part 6 빈칸)를 읽어 docs/grammar-index.md를 만든다.
// 문법 데이터가 바뀌면 `node tools/build-grammar-index.js`로 다시 돌려 갱신한다.
// 새 노트나 trap을 쓰기 전에 기존 노트·trap·문항과 겹치거나 충돌하지 않는지 확인하는 용도다.

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var root = path.join(__dirname, "..");
var outPath = path.join(root, "docs", "grammar-index.md");

function load(file) {
  var filePath = path.join(root, "data", file);
  var context = { window: {} };
  vm.runInNewContext(fs.readFileSync(filePath, "utf8"), context, { filename: filePath });
  return context.window;
}

var grammar = load("grammar.js");
var reading = load("reading.js");
var topics = grammar.GRAMMAR;
var questions = grammar.GRAMMAR_QUIZ;
var part6 = reading.PART6;
if (!Array.isArray(topics) || !Array.isArray(questions) || !Array.isArray(part6)) {
  console.error("색인 생성 실패: GRAMMAR, GRAMMAR_QUIZ, PART6 배열을 찾을 수 없습니다.");
  process.exit(1);
}

// 표 칸 안에서 |와 줄바꿈이 표를 깨지 않게 한다
function cell(value) {
  return String(value === undefined || value === null ? "" : value).replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " / ");
}

function firstWords(text, count) {
  var words = String(text).trim().split(/\s+/);
  return words.slice(0, count).join(" ") + (words.length > count ? " …" : "");
}

var sortedTopics = topics.slice().sort(function (a, b) { return a.order - b.order; });
var part5Count = Object.create(null);
questions.forEach(function (question) { part5Count[question.ruleId] = (part5Count[question.ruleId] || 0) + 1; });

// Part 6: 세트마다 빈칸 문항. ruleId가 있는 것은 문법 빈칸, 없는 것은 어휘·문장 삽입이다.
var part6Count = Object.create(null);
var part6Total = 0;
var part6ByType = Object.create(null);
part6.forEach(function (set) {
  (set.questions || []).forEach(function (question) {
    part6Total += 1;
    part6ByType[question.type || "(없음)"] = (part6ByType[question.type || "(없음)"] || 0) + 1;
    if (question.ruleId) part6Count[question.ruleId] = (part6Count[question.ruleId] || 0) + 1;
  });
});
var part6Grammar = Object.keys(part6Count).reduce(function (sum, key) { return sum + part6Count[key]; }, 0);

var lines = [];
lines.push("# 문법 색인");
lines.push("");
lines.push("> 자동 생성 파일이다. 직접 고치지 말고 `node tools/build-grammar-index.js`로 다시 만든다.");
lines.push("> 새 노트나 trap을 쓰기 전에 주제·trap·문항이 겹치거나 충돌하지 않는지 확인하는 용도다.");
lines.push("");
lines.push("## 요약");
lines.push("");
lines.push("- 노트: **" + topics.length + "개**");
lines.push("- Part 5 문항: **" + questions.length + "개**");
lines.push("- Part 6: 세트 " + part6.length + "개, 빈칸 " + part6Total + "개 (문법 " + part6Grammar + " / " +
  Object.keys(part6ByType).filter(function (type) { return type !== "grammar"; }).map(function (type) {
    return type + " " + part6ByType[type];
  }).join(" / ") + ")");
lines.push("");

lines.push("## 노트");
lines.push("");
lines.push("| id | 제목 | 빈출도 | oneLine | Part 5 | Part 6 |");
lines.push("| --- | --- | --- | --- | ---: | ---: |");
sortedTopics.forEach(function (topic) {
  lines.push("| " + [topic.id, cell(topic.title), cell(topic.weight), cell(topic.oneLine),
    part5Count[topic.id] || 0, part6Count[topic.id] || 0].join(" | ") + " |");
});
lines.push("");

lines.push("## trap (충돌 확인용)");
lines.push("");
lines.push("노트마다 trap 전체를 한 줄로 이었다 (원문 줄바꿈은 ` / `). 새 trap이 아래 규칙이나 기존 문항의 정답·해설과 어긋나지 않는지 본다.");
lines.push("");
sortedTopics.forEach(function (topic) {
  lines.push("- **" + topic.id + " " + topic.title + "**: " + String(topic.trap).replace(/\s*\n\s*/g, " / "));
});
lines.push("");

lines.push("## Part 6 빈칸 ruleId 분포");
lines.push("");
lines.push("| ruleId | 제목 | 빈칸 수 |");
lines.push("| --- | --- | ---: |");
sortedTopics.forEach(function (topic) {
  lines.push("| " + topic.id + " | " + cell(topic.title) + " | " + (part6Count[topic.id] || 0) + " |");
});
lines.push("| (없음) | 어휘·문장 삽입 | " + (part6Total - part6Grammar) + " |");
lines.push("");

lines.push("## Part 5 문항 (" + questions.length + "개)");
lines.push("");
lines.push("| id | ruleId | 질문 첫 10단어 | 정답 |");
lines.push("| --- | --- | --- | --- |");
questions.forEach(function (question) {
  lines.push("| " + [question.id, question.ruleId, cell(firstWords(question.question, 10)),
    cell(question.choices[question.answer])].join(" | ") + " |");
});
lines.push("");

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("생성: docs/grammar-index.md");
console.log("노트 " + topics.length + "개 | Part 5 문항 " + questions.length + "개 | Part 6 빈칸 " + part6Total + "개 (문법 " + part6Grammar + ")");
