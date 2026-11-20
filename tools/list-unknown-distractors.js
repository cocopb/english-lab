"use strict";

// 보카 빈칸 오답 중 "아는 단어"가 아닌 것을 Day별로 출력한다 (출력만 하고 실패로 끝내지 않는다).
// 통과 규칙 = 790단어장 표제어 ∪ 그 파생형 ∪ docs/basic-words.md의 기초 목록. 규칙 설명은 docs/basic-words.md에 있다.
// 실행: node tools/list-unknown-distractors.js [Day]   예) node tools/list-unknown-distractors.js 9

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var root = path.join(__dirname, "..");
var context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "data", "vocab.js"), "utf8"), context, { filename: "vocab.js" });
var vocabulary = context.window.VOCAB;

var listText = fs.readFileSync(path.join(root, "docs", "basic-words.md"), "utf8");
var block = listText.match(/```text\r?\n([\s\S]*?)```/);
if (!block) {
  console.error("docs/basic-words.md에서 ```text 코드 블록을 찾을 수 없습니다.");
  process.exit(1);
}
var basicWords = [];
block[1].split(/\r?\n/).forEach(function (line) {
  line.replace(/^[a-z]:/, "").split(/\s+/).filter(Boolean).forEach(function (word) { basicWords.push(word.toLowerCase()); });
});

var SUFFIXES = ["ations", "ation", "itions", "ition", "tions", "tion", "sions", "sion", "ions", "ion", "ments", "ment",
  "nesses", "ness", "ables", "able", "ably", "ibly", "ible", "fully", "ful", "less", "ities", "ity", "ives", "ive",
  "ance", "ence", "ancy", "ency", "ists", "ist", "izes", "ized", "izing", "ize", "ships", "ship", "ees", "ee", "ers", "er",
  "ors", "or", "est", "ily", "ly", "ies", "ied", "ier", "ing", "ings", "ed", "es", "al", "ally", "s", "d", "y"];
var PREFIXES = ["un", "re", "in", "im", "dis", "non", "pre", "mis", "over", "under"];
var FUNCTION_WORDS = new Set("a an the of in on at to for by with from up out off and or but is are be my your our their it its this that than as".split(" "));

var headwords = [];
vocabulary.forEach(function (entry) {
  String(entry.word).toLowerCase().replace(/\([^)]*\)/g, "").split(/\s*\/\s*/).forEach(function (word) {
    if (word.trim()) headwords.push(word.trim());
  });
});
var base = new Set(headwords.concat(basicWords));
// 표제어에서 접미사 하나를 뗀 어근(4글자 이상)도 바탕으로 쓴다: employee → employ → employer
headwords.filter(function (word) { return !/\s/.test(word); }).forEach(function (word) {
  SUFFIXES.forEach(function (suffix) {
    if (word.endsWith(suffix) && word.length - suffix.length >= 4) {
      var stem = word.slice(0, -suffix.length);
      base.add(stem);
      if (/i$/.test(stem)) base.add(stem.slice(0, -1) + "y");
    }
  });
});

function stemCandidates(stem) {
  var out = [stem, stem + "e"];
  if (/i$/.test(stem)) out.push(stem.slice(0, -1) + "y");
  if (/([bdgklmnprt])\1$/.test(stem)) out.push(stem.slice(0, -1));
  return out;
}
var memo = new Map();
function derivedFrom(word, depth) {
  if (base.has(word)) return word;
  if (depth >= 3 || word.length < 3) return null;
  var key = word + "|" + depth;
  if (memo.has(key)) return memo.get(key);
  memo.set(key, null);
  var hit = null;
  SUFFIXES.forEach(function (suffix) {
    if (hit || word.length - suffix.length < 3 || !word.endsWith(suffix)) return;
    stemCandidates(word.slice(0, -suffix.length)).forEach(function (stem) { if (!hit) hit = derivedFrom(stem, depth + 1); });
  });
  PREFIXES.forEach(function (prefix) {
    if (!hit && word.startsWith(prefix) && word.length - prefix.length >= 3) hit = derivedFrom(word.slice(prefix.length), depth + 1);
  });
  memo.set(key, hit);
  return hit;
}
function isKnown(distractor) {
  var word = String(distractor).toLowerCase().trim();
  if (base.has(word)) return true;
  var parts = word.split(/[\s-]+/).filter(Boolean);
  if (parts.length > 1) return parts.every(function (part) { return FUNCTION_WORDS.has(part) || !!derivedFrom(part, 0); });
  return !!derivedFrom(word, 0);
}

// 규칙: 오답 3개 중 최소 2개는 아는 단어. 나머지 1개는 정답과 철자가 비슷하면 모르는 단어여도 된다.
// 철자가 비슷하다 = 앞 두 글자가 같고 길이 차이 3자 이내, 또는 뒤 세 글자가 같음, 또는 편집 거리가 긴 쪽 길이의 40% 이하.
// 위반 = 모르는 단어가 2개 이상이거나, 1개인데 철자가 비슷하지 않은 세트. 허용 = 모르는 단어 1개이고 철자가 비슷한 세트.
function editDistance(a, b) {
  var row = [];
  for (var j = 0; j <= b.length; j++) row[j] = j;
  for (var i = 1; i <= a.length; i++) {
    var prev = row[0];
    row[0] = i;
    for (var k = 1; k <= b.length; k++) {
      var temp = row[k];
      row[k] = Math.min(row[k] + 1, row[k - 1] + 1, prev + (a[i - 1] === b[k - 1] ? 0 : 1));
      prev = temp;
    }
  }
  return row[b.length];
}
function spellingSimilar(headword, distractor) {
  var a = String(headword).toLowerCase(), b = String(distractor).toLowerCase();
  if (a.slice(0, 2) === b.slice(0, 2) && Math.abs(a.length - b.length) <= 3) return true;
  if (a.length >= 3 && a.slice(-3) === b.slice(-3)) return true;
  return editDistance(a, b) <= Math.ceil(Math.max(a.length, b.length) * 0.4);
}
var onlyDay = process.argv[2] ? Number(process.argv[2]) : null;
var byDay = Object.create(null);
var totalWords = 0;
var violationSets = 0;
var allowedSets = 0;
vocabulary.forEach(function (entry) {
  if (entry.track !== "toeic" || (onlyDay && entry.day !== onlyDay)) return;
  var unknown = (entry.distractors || []).filter(function (word) { return !isKnown(word); });
  if (!unknown.length) return;
  var violation = unknown.length >= 2 || !spellingSimilar(entry.word, unknown[0]);
  if (violation) { totalWords += unknown.length; violationSets += 1; } else allowedSets += 1;
  (byDay[entry.day] = byDay[entry.day] || []).push((violation ? "✗ " : "  허용 ") + entry.id + " " + entry.word + " → " + unknown.join(", "));
});
var setCount = 0;
Object.keys(byDay).sort(function (a, b) { return a - b; }).forEach(function (day) {
  setCount += byDay[day].length;
  console.log("Day " + day + " (" + byDay[day].length + "세트)");
  byDay[day].forEach(function (line) { console.log("  " + line); });
});
console.log("기초 목록 " + basicWords.length + "개 · 모르는 오답이 있는 세트 " + setCount + "개 · 규칙 위반(교체 대상) " + violationSets +
  "세트(모르는 오답 " + totalWords + "개) · 허용(모르는 오답 1개, 철자 비슷) " + allowedSets + "세트");
