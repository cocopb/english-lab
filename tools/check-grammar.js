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

if (failureCount) process.exit(1);
