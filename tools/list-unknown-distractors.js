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

var onlyDay = process.argv[2] ? Number(process.argv[2]) : null;
var byDay = Object.create(null);
var totalWords = 0;
vocabulary.forEach(function (entry) {
  if (entry.track !== "toeic" || (onlyDay && entry.day !== onlyDay)) return;
  var unknown = (entry.distractors || []).filter(function (word) { return !isKnown(word); });
  if (!unknown.length) return;
  totalWords += unknown.length;
  (byDay[entry.day] = byDay[entry.day] || []).push(entry.id + " " + entry.word + " → " + unknown.join(", "));
});
var setCount = 0;
Object.keys(byDay).sort(function (a, b) { return a - b; }).forEach(function (day) {
  setCount += byDay[day].length;
  console.log("Day " + day + " (" + byDay[day].length + "세트)");
  byDay[day].forEach(function (line) { console.log("  " + line); });
});
console.log("기초 목록 " + basicWords.length + "개 · 교체 대상 " + setCount + "세트 · 오답 " + totalWords + "개");
