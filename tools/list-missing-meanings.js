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
    if (typeof meaning === "string" && meaning.trim()) meanings[normalizeWord(word)] = meaning;
  });
}

// 일부러 틀리게 만든 오답 표현은 뜻을 붙이지 않으므로 누락으로 보지 않는다.
var wrongFormSet = Object.create(null);
(context.window.VOCAB_WRONG_FORMS || []).forEach(function (form) {
  wrongFormSet[normalizeWord(form)] = true;
});

var missingMeanings = Object.create(null);
vocabulary.forEach(function (item) {
  if (!item || !Array.isArray(item.distractors)) return;
  item.distractors.forEach(function (word) {
    if (typeof word !== "string" || !word.trim()) return;
    var normalizedWord = normalizeWord(word);
    if (!meanings[normalizedWord] && !wrongFormSet[normalizedWord]) missingMeanings[normalizedWord] = word.trim();
  });
});

var missingWords = Object.keys(missingMeanings).map(function (word) {
  return missingMeanings[word];
}).sort(function (a, b) {
  return a.localeCompare(b, "en", { sensitivity: "base" });
});

console.log("누락 단어 수: " + missingWords.length + "개");
missingWords.forEach(function (word) { console.log(word); });
