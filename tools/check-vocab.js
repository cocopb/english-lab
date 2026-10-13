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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function blankExample(item) {
  if (typeof item.word !== "string" || typeof item.example !== "string") return null;

  var target = item.word.replace(/~/g, " ").trim().replace(/[?!.,;:]+$/, "");
  if (!target) return null;

  var variants = [target];
  if (!/\s/.test(target)) {
    var last = target.slice(-1);
    var consonantY = /[^aeiou]y$/i.test(target);
    var consonantVowelConsonant = /[^aeiou][aeiou][^aeiou]$/i.test(target);
    var doubledFinal = consonantVowelConsonant && !/[wxy]$/i.test(target);

    variants.push(target + "s", target + "es");
    if (consonantY) variants.push(target.slice(0, -1) + "ies");

    variants.push(target + "d", target + "ed");
    if (consonantY) variants.push(target.slice(0, -1) + "ied");
    if (doubledFinal) variants.push(target + last + "ed");

    if (last.toLowerCase() === "e") variants.push(target.slice(0, -1) + "ing");
    else {
      variants.push(target + "ing");
      if (doubledFinal) variants.push(target + last + "ing");
    }

    if (consonantY) variants.push(target.slice(0, -1) + "ier", target.slice(0, -1) + "iest");
    else if (last.toLowerCase() === "e") variants.push(target + "r", target + "st");
    else variants.push(target + "er", target + "est");
    if (doubledFinal) variants.push(target + last + "er", target + last + "est");

    variants = variants.filter(function (variant, index) {
      return variant && variants.indexOf(variant) === index;
    });
  }

  for (var index = 0; index < variants.length; index += 1) {
    var expression = variants[index].trim().split(/\s+/).map(escapeRegExp).join("\\s+");
    if (new RegExp("\\b" + expression + "\\b", "i").test(item.example)) return true;
  }
  return false;
}

var failures = {
  blank: [],
  distractorCount: [],
  missingFields: [],
  duplicateIds: [],
  answerAsDistractor: [],
  trackMetadata: []
};
var seenIds = Object.create(null);
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
  if ((item.track === "toeic" && (item.day === undefined || item.day === null || item.day === "")) ||
      (item.track === "survival" && (item.situation === undefined || item.situation === null || item.situation === ""))) {
    failures.trackMetadata.push({ id: label, track: item.track, day: item.day, situation: item.situation });
  }
});

var failureCount = Object.keys(failures).reduce(function (total, key) {
  return total + failures[key].length;
}, 0);
var failedRules = Object.keys(failures).filter(function (key) { return failures[key].length > 0; }).length;
console.log("요약: " + vocabulary.length + "개 단어 검사 | 규칙 통과 " + (6 - failedRules) + "/6 | 실패 항목 " + failureCount);
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
