"use strict";

// 저장소 영어 문장(vocab·grammar·reading·listening·part1·speaking)에서 한 번만 나오는 단어를 처음 나온 곳과 함께 출력한다.
// 오타는 거의 항상 한 번만 나오므로 오타 후보 목록으로 쓴다. 고유명사·전문 용어·일부러 만든 오답도 섞여 나오니 사람이 골라 본다.
// 실행: node tools/list-rare-words.js [찾을 글자]   예) node tools/list-rare-words.js ment
// 일부러 틀린 표현(VOCAB_WRONG_FORMS)과 혼동 단어 뜻 사전은 세지 않는다. check-vocab.js의 ENGLISH_FIELDS와 같은 칸을 본다.

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var root = path.join(__dirname, "..");
var FIELDS = {
  vocab: ["word", "example", "distractors"],
  grammar: ["good", "bad", "question", "choices"],
  reading: ["header", "en", "w", "q", "choices"],
  listening: ["text", "question", "choices", "q", "script"],
  part1: ["choices"],
  speaking: ["english", "pattern", "en", "model", "alts"]
};
var counts = Object.create(null);
var firstSeen = Object.create(null);
Object.keys(FIELDS).forEach(function (name) {
  var context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, "data", name + ".js"), "utf8"), context, { filename: name + ".js" });
  function walk(value, key, where) {
    if (typeof value === "string") {
      if (FIELDS[name].indexOf(key) === -1) return;
      (value.match(/[A-Za-z]+(?:'[A-Za-z]+)*/g) || []).forEach(function (word) {
        var lower = word.toLowerCase();
        counts[lower] = (counts[lower] || 0) + 1;
        if (!firstSeen[lower]) firstSeen[lower] = name + ":" + where + " «" + value.slice(0, 90) + "»";
      });
      return;
    }
    if (Array.isArray(value)) { value.forEach(function (child) { walk(child, key, where); }); return; }
    if (value && typeof value === "object") {
      Object.keys(value).forEach(function (childKey) { walk(value[childKey], /^\d+$/.test(childKey) ? key : childKey, value.id || where); });
    }
  }
  Object.keys(context.window).filter(function (global) { return !/DISTRACTOR_MEANINGS|WRONG_FORMS/.test(global); })
    .forEach(function (global) { walk(context.window[global], global, global); });
});
var filter = process.argv[2] ? process.argv[2].toLowerCase() : "";
var rare = Object.keys(counts).filter(function (word) { return counts[word] === 1 && (!filter || word.indexOf(filter) !== -1); }).sort();
console.log("서로 다른 단어 " + Object.keys(counts).length + "개 · 한 번만 나오는 단어 " + rare.length + "개" + (filter ? " ('" + filter + "' 포함)" : ""));
rare.forEach(function (word) { console.log(word + "\t" + firstSeen[word]); });
