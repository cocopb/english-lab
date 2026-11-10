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
    var key = normalizeWord(word);
    if (!meanings[key] && typeof meaning === "string" && meaning.trim()) meanings[key] = meaning;
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// 한 단어의 활용형 목록(원형 제외) — assets/js/vocab.js의 wordForms와 동일
function wordForms(word) {
  var lower = word.toLowerCase();
  var last = word.slice(-1);
  var consonantY = /[^aeiou]y$/i.test(word);
  var consonantVowelConsonant = /[^aeiou][aeiou][^aeiou]$/i.test(word);
  var doubledFinal = consonantVowelConsonant && !/[wxy]$/i.test(word);
  var forms = [];

  forms.push(word + "s", word + "es");
  if (consonantY) forms.push(word.slice(0, -1) + "ies");

  forms.push(word + "d", word + "ed");
  if (consonantY) forms.push(word.slice(0, -1) + "ied");
  if (doubledFinal) forms.push(word + last + "ed");

  if (last.toLowerCase() === "e") forms.push(word.slice(0, -1) + "ing");
  else {
    forms.push(word + "ing");
    if (doubledFinal) forms.push(word + last + "ing");
  }

  if (consonantY) forms.push(word.slice(0, -1) + "ier", word.slice(0, -1) + "iest");
  else if (last.toLowerCase() === "e") forms.push(word + "r", word + "st");
  else forms.push(word + "er", word + "est");
  if (doubledFinal) forms.push(word + last + "er", word + last + "est");

  return forms.filter(function (form, index) {
    return form && forms.indexOf(form) === index && form.toLowerCase() !== lower;
  });
}

// 빈칸 후보 — assets/js/vocab.js의 blankVariants와 동일.
// 여러 단어는 마지막 단어를 변형하고, 동사구(v.)는 첫 단어 변형도 찾는다.
function blankVariants(target, pos) {
  var parts = target.split(/\s+/);
  var variants = [target];
  var lastIndex = parts.length - 1;
  wordForms(parts[lastIndex]).forEach(function (form) {
    variants.push(parts.slice(0, lastIndex).concat(form).join(" "));
  });
  if (lastIndex > 0 && /(^|\/)v\./.test(pos || "")) {
    wordForms(parts[0]).forEach(function (form) {
      variants.push([form].concat(parts.slice(1)).join(" "));
    });
  }
  return variants.filter(function (variant, index) {
    return variants.indexOf(variant) === index;
  });
}

function blankExample(item) {
  if (typeof item.word !== "string" || typeof item.example !== "string") return null;

  var target = item.word.replace(/~/g, " ").trim().replace(/[?!.,;:]+$/, "");
  if (!target) return null;

  var variants = blankVariants(target, item.pos);

  for (var index = 0; index < variants.length; index += 1) {
    var expression = variants[index].trim().split(/\s+/).map(escapeRegExp).join("\\s+");
    if (new RegExp("\\b" + expression + "\\b", "i").test(item.example)) return true;
  }
  return false;
}

// 뜻 시험 선택지 규칙 (assets/js/vocab.js와 동일):
// 정답 뜻 + 같은 Day·상황의 다른 단어 뜻 → 부족하면 같은 트랙 전체.
// 유사도 가드(같음 / 포함 / 쉼표·슬래시 조각 겹침)를 통과한 뜻만, 서로도 겹치지 않게 4개를 만든다.
function meaningPieces(meaning) {
  return String(meaning).split(/[,/]/).map(function (piece) {
    return piece.replace(/\([^)]*\)/g, "").replace(/\s+/g, " ").trim();
  }).filter(Boolean);
}

function meaningsTooSimilar(a, b) {
  var left = String(a).replace(/\s+/g, " ").trim();
  var right = String(b).replace(/\s+/g, " ").trim();
  if (!left || !right) return false;
  if (left === right || left.indexOf(right) !== -1 || right.indexOf(left) !== -1) return true;
  var rightPieces = meaningPieces(right);
  return meaningPieces(left).some(function (piece) { return rightPieces.indexOf(piece) !== -1; });
}

function guardedMeaningChoices(item) {
  var chosen = [item.meaning];
  function tryAdd(candidate) {
    if (chosen.length >= 4 || candidate.id === item.id || candidate.track !== item.track) return;
    if (typeof candidate.meaning !== "string" || !candidate.meaning.trim()) return;
    if (chosen.some(function (meaning) { return meaningsTooSimilar(meaning, candidate.meaning); })) return;
    chosen.push(candidate.meaning);
  }
  var groupingValue = String(item.situation || item.day);
  vocabulary.forEach(function (candidate) {
    if (String(candidate.situation || candidate.day) === groupingValue) tryAdd(candidate);
  });
  vocabulary.forEach(tryAdd);
  return chosen;
}

function canBuildMeaningChoices(item) {
  return guardedMeaningChoices(item).length >= 4;
}

var failures = {
  blank: [],
  distractorCount: [],
  missingFields: [],
  duplicateIds: [],
  answerAsDistractor: [],
  meaningChoiceCount: [],
  trackMetadata: []
};
var seenIds = Object.create(null);
var seenMissingDistractorMeanings = Object.create(null);
// 경고: 혼동 단어 뜻 누락 (단어장 상세 표시용이라 앱 동작에는 영향이 없다)
var missingDistractorMeanings = [];
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
  if (Array.isArray(item.distractors)) {
    item.distractors.forEach(function (distractor) {
      if (typeof distractor !== "string" || !distractor.trim()) return;
      var normalizedWord = normalizeWord(distractor);
      if (!meanings[normalizedWord] && !seenMissingDistractorMeanings[normalizedWord]) {
        seenMissingDistractorMeanings[normalizedWord] = true;
        missingDistractorMeanings.push(distractor.trim());
      }
    });
  }
  if (typeof item.meaning === "string" && item.meaning.trim() && !canBuildMeaningChoices(item)) {
    failures.meaningChoiceCount.push({ id: label, word: item.word || "(word 없음)" });
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
var ruleCount = Object.keys(failures).length;
console.log("요약: " + vocabulary.length + "개 단어 검사 | 규칙 통과 " + (ruleCount - failedRules) + "/" + ruleCount + " | 실패 항목 " + failureCount);
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

// 경고: 같은 track 안에서 word가 중복되는 항목 (track이 다르면 허용)
// 의도적으로 다른 뜻을 가르치는 경우도 있어 실패로 보지 않고 id·word·뜻을 알려준다.
var wordGroups = Object.create(null);
vocabulary.forEach(function (item) {
  if (!item || typeof item.word !== "string" || !item.word.trim()) return;
  var key = String(item.track) + "\u0000" + normalizeWord(item.word);
  (wordGroups[key] = wordGroups[key] || []).push(item);
});
var duplicateWordWarnings = Object.keys(wordGroups).filter(function (key) {
  return wordGroups[key].length > 1;
}).map(function (key) {
  var items = wordGroups[key];
  return {
    track: items[0].track,
    word: items[0].word,
    entries: items.map(function (item) {
      return item.id + "(" + (item.situation || "Day " + item.day) + ": " + item.meaning + ")";
    })
  };
});
console.log("\nduplicateWords — 경고 (" + duplicateWordWarnings.length + ")");
if (!duplicateWordWarnings.length) console.log("  없음");
duplicateWordWarnings.forEach(function (warning) {
  console.log("  ⚠ [" + warning.track + "] " + warning.word + " — " + warning.entries.join(" / "));
});

console.log("\nmissingDistractorMeanings — 경고 (" + missingDistractorMeanings.length + ")");
console.log(missingDistractorMeanings.length
  ? "  ⚠ 혼동 단어 " + missingDistractorMeanings.length + "개의 뜻이 없습니다. 단어장 상세에 단어만 표시됩니다. 목록: node tools/list-missing-meanings.js"
  : "  없음");

if (failureCount) process.exit(1);
