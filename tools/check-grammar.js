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
  duplicateChoices: [],
  exampleOverlap: []
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

// 보조 태그(alsoRuleIds): 있으면 배열이고, 존재하는 유형이며, 주 태그와 같지 않고, 중복이 없어야 한다.
failures.invalidAlsoRuleIds = [];
questions.forEach(function (question, index) {
  if (!question || question.alsoRuleIds === undefined) return;
  var label = question.id || "문항 #" + (index + 1);
  var also = question.alsoRuleIds;
  if (!Array.isArray(also) || !also.length) { failures.invalidAlsoRuleIds.push({ id: label, problem: "빈 배열이거나 배열이 아님" }); return; }
  also.forEach(function (ruleId) {
    if (!topicIds[ruleId]) failures.invalidAlsoRuleIds.push({ id: label, problem: "없는 유형 " + ruleId });
    if (ruleId === question.ruleId) failures.invalidAlsoRuleIds.push({ id: label, problem: "주 태그와 같음 " + ruleId });
  });
  if (new Set(also).size !== also.length) failures.invalidAlsoRuleIds.push({ id: label, problem: "중복" });
});

// ---------------------------------------------------------------------------
// 노트 예문 ↔ 문항 중복: 노트 예문(good·bad)이 같은 유형 문항과 지나치게 비슷하면 실패.
// 노트를 읽은 직후 그 유형을 풀면 외운 문장으로 맞혀서 유형별 정답률이 실제보다 높게 나오기 때문이다.
// 문항은 빈칸에 정답을 채운 문장으로 비교한다. 아래 셋 중 하나라도 해당하면 겹친 것으로 본다.
//  1) 내용어: 기능어·숫자를 빼고 어미(-s/-es/-ed/-ing)를 뗀 단어가 2개 이상, 짧은 쪽의 50% 이상 같다
//  2) 문장 틀: 연속 3단어 묶음이 2개 이상, 짧은 쪽의 50% 이상 같다 (기능어가 많은 짧은 문장용)
//  3) 정답 노출: 정답의 내용어가 예문에 같은 형태로 나온다.
//     정답이 기능어뿐이면(in, much, a 등) 정답에 붙은 내용어까지 같은 2단어로 나올 때만 (much time 등)
// 다른 유형 문항과 겹치는 것은 정답이 다르므로 실패로 보지 않고 경고로만 알린다.
// ---------------------------------------------------------------------------
var OVERLAP_STOP_WORDS = new Set(("a an the is are was were be been being am to of in on at for with by from and or but nor so than as " +
  "that this these those it its i you he she we they me him her us them my your his our their mine yours hers ours theirs " +
  "will would can could should must may might shall do does did have has had not no very too much more most less least " +
  "please there here if when what where who which whose whom all each every any some many few little both either neither " +
  "one ones another other also just only even still far yet already ever never well about into after before during until " +
  "since because although while though despite up out off over under again then now " +
  // a number of / the number of의 number는 문법 표현의 일부라 소재로 보지 않는다
  "number").split(" "));
function overlapTokens(text) {
  return String(text).toLowerCase().replace(/[^a-z' ]/g, " ").split(/\s+/).filter(Boolean);
}
function overlapStem(word) {
  return word.length <= 4 ? word : word.replace(/(ing|ed|es|s)$/, "").replace(/e$/, "");
}
function isContentWord(word) { return !OVERLAP_STOP_WORDS.has(word) && word.length > 1; }
function contentWords(text) { return new Set(overlapTokens(text).filter(isContentWord).map(overlapStem)); }
function wordGrams(tokens, size) {
  var grams = new Set();
  for (var start = 0; start + size <= tokens.length; start++) grams.add(tokens.slice(start, start + size).join(" "));
  return grams;
}
function sharedItems(left, right) { return Array.from(left).filter(function (item) { return right.has(item); }); }
function shorterRatio(count, left, right) { return count / Math.max(1, Math.min(left.size, right.size)); }

function exampleOverlapReasons(sentence, question) {
  var answerText = question.choices[question.answer];
  var full = question.question.replace(/_{2,}/, answerText);
  var reasons = [];
  var leftWords = contentWords(sentence), rightWords = contentWords(full), words = sharedItems(leftWords, rightWords);
  if (words.length >= 2 && shorterRatio(words.length, leftWords, rightWords) >= 0.5) {
    reasons.push("내용어 " + words.length + "개 겹침(" + words.join(", ") + ")");
  }
  var sentenceTokens = overlapTokens(sentence), fullTokens = overlapTokens(full);
  var leftGrams = wordGrams(sentenceTokens, 3), rightGrams = wordGrams(fullTokens, 3), grams = sharedItems(leftGrams, rightGrams);
  if (grams.length >= 2 && shorterRatio(grams.length, leftGrams, rightGrams) >= 0.5) {
    reasons.push("문장 틀 겹침(" + grams.join(" | ") + ")");
  }
  var answerTokens = overlapTokens(answerText);
  var sentenceText = " " + sentenceTokens.join(" ") + " ";
  if (answerTokens.length && sentenceText.indexOf(" " + answerTokens.join(" ") + " ") !== -1) {
    if (answerTokens.some(isContentWord)) {
      reasons.push("정답 \"" + answerText + "\"이 예문에 그대로 나옴");
    } else {
      // 문항에서 정답 바로 앞뒤 단어와 붙은 2단어 묶음 중 내용어가 든 것이 예문에도 있는지
      var blankIndex = overlapTokens(question.question.replace(/_{2,}/, " zzblank ")).indexOf("zzblank");
      var before = blankIndex > 0 ? fullTokens[blankIndex - 1] : null;
      var after = fullTokens[blankIndex + answerTokens.length];
      var pairs = [];
      if (before && isContentWord(before)) pairs.push(before + " " + answerTokens.join(" "));
      if (after && isContentWord(after)) pairs.push(answerTokens.join(" ") + " " + after);
      var hit = pairs.filter(function (pair) { return sentenceText.indexOf(" " + pair + " ") !== -1; });
      if (hit.length) reasons.push("정답과 붙은 표현 \"" + hit.join(", ") + "\"이 예문에 그대로 나옴");
    }
  }
  return reasons;
}

var crossOverlapWarnings = [];
topics.forEach(function (topic) {
  (topic.examples || []).forEach(function (example, index) {
    ["good", "bad"].forEach(function (kind) {
      if (typeof example[kind] !== "string") return;
      questions.forEach(function (question) {
        if (!Array.isArray(question.choices) || typeof question.question !== "string") return;
        var reasons = exampleOverlapReasons(example[kind], question);
        if (!reasons.length) return;
        var entry = { note: topic.id, example: index + 1, kind: kind, sentence: example[kind], question: question.id, ruleId: question.ruleId, reasons: reasons.join(" / ") };
        if (question.ruleId === topic.id) failures.exampleOverlap.push(entry);
        else crossOverlapWarnings.push(entry);
      });
    });
  });
});

// 노트 설명 속 영어 문장도 같은 기준으로 본다 (oneLine·trap·toeicPattern·표 칸).
// 예문 칸만 보던 때 trap·표에 문항과 같은 문장이 남아 있었다 (2026-11-20: g01 trap ↔ q027, g13 표 ↔ q121, g16 trap ↔ q012·q016).
// 영어 문장 = 대문자로 시작해 . ? !로 끝나는 3단어 이상 덩어리.
// 정답 단어가 노트가 가르치는 형태 그 자체라서 겹칠 수밖에 없는 경우만 NOTE_TEXT_OVERLAP_ALLOWED에 이유와 함께 적는다.
var NOTE_TEXT_OVERLAP_ALLOWED = {
  "g09|It's too late to call him.|q090": "its/it's를 가르는 trap이라 정답 It's가 나올 수밖에 없다. 문장 내용은 겹치지 않는다",
  "g15|Given the delay, we rescheduled the launch.|q169": "Given + 명사를 가르치는 표의 예라 정답 Given이 나올 수밖에 없다. 문장 내용은 겹치지 않는다",
  "g15|Given the delay, we rescheduled.|q169": "위와 같다 (trap의 짧은 예)"
};
function noteTextEnglishSentences(topic) {
  var texts = [topic.oneLine, topic.trap, topic.toeicPattern];
  ((topic.table && topic.table.rows) || []).forEach(function (row) { texts = texts.concat(row); });
  var found = [];
  texts.forEach(function (text) {
    (String(text || "").match(/[A-Z][A-Za-z0-9 ,'’-]+[.?!]/g) || []).forEach(function (sentence) {
      if (sentence.split(/\s+/).length >= 3 && found.indexOf(sentence) === -1) found.push(sentence);
    });
  });
  return found;
}
failures.noteTextOverlap = [];
var noteTextAllowedUsed = Object.create(null);
topics.forEach(function (topic) {
  noteTextEnglishSentences(topic).forEach(function (sentence) {
    questions.forEach(function (question) {
      if (!Array.isArray(question.choices) || typeof question.question !== "string") return;
      var reasons = exampleOverlapReasons(sentence, question);
      if (!reasons.length) return;
      var allowKey = topic.id + "|" + sentence + "|" + question.id;
      if (NOTE_TEXT_OVERLAP_ALLOWED[allowKey]) { noteTextAllowedUsed[allowKey] = true; return; }
      var entry = { note: topic.id, example: "설명", kind: "text", sentence: sentence, question: question.id, ruleId: question.ruleId, reasons: reasons.join(" / ") };
      if (question.ruleId === topic.id) failures.noteTextOverlap.push(entry);
      else crossOverlapWarnings.push(entry);
    });
  });
});
failures.noteTextOverlapAllowedStale = Object.keys(NOTE_TEXT_OVERLAP_ALLOWED).filter(function (key) { return !noteTextAllowedUsed[key]; })
  .map(function (key) { return { key: key, hint: "더 이상 겹치지 않거나 문장이 바뀌었다. 목록에서 지운다" }; });

// ---------------------------------------------------------------------------
// 단정 표현 대조: 노트 문구(oneLine·trap·toeicPattern·표·예문 설명)에서 "무조건·항상·절대·반드시·언제나·
// 어떤 경우에도·~만·~뿐" 같은 단정이 든 문장을 뽑아, 대조할 문항 후보와 함께 보여 준다.
// 후보 = 같은 유형 문항 전부 + 그 문장에 나온 영어 단어(기능어 제외)가 정답 문장에 든 다른 유형 문항.
// 반례 판단은 사람이 한다. 180문항과 대조해 반례가 없다고 확인한 문장은 REVIEWED_ABSOLUTE_CLAIMS에
// "노트 id|문장" 그대로 이유와 함께 적는다. 목록에 없는 단정 문장이 생기면(새 노트·문구 수정) 실패로 알려
// 문항과 대조하게 한다. 목록에 있는데 노트에서 사라진 문장도 실패다 (목록을 지워야 한다).
// 예전 예: g05 "전치사 뒤에는 무조건 -ing" ↔ q081 to me, q084 by himself (전치사 뒤 명사·대명사)
// ---------------------------------------------------------------------------
// "~지만"(그러나)은 단정이 아니라서 뺀다
var ABSOLUTE_PATTERN = /무조건|항상|절대|반드시|언제나|어떤 경우에도|모든 경우|예외 없이|뿐이다|[가-힣A-Za-z)\]](?<!지)만(?=[\s.,)]|$)|에만/;
var REVIEWED_ABSOLUTE_CLAIMS = {
  "g01|먼저 빈칸 앞뒤로 품사를 정하고, 같은 품사가 둘 이상 남을 때만 뜻으로 가른다.":
    "풀이 순서 안내다. 같은 품사가 둘 남는 q006(accounting·accountant)·q008(impressive·impressed)은 뜻·g15 기준으로 가르고, 나머지 g01 문항은 품사만으로 풀린다",
  "g07|뒤에 '주어+동사'가 오면 접속사, 명사 덩어리만 오면 전치사다.":
    "g07 10문항이 모두 이대로 풀린다. 생략으로 -ing·p.p.가 바로 오는 경우는 trap이 따로 다룬다. 다른 유형의 when(q119)·before(q147)·during(q058)도 맞다",
  "g07|despite 또는 in spite of 둘 중 하나만 쓴다.":
    "q064 Despite, q070 In spite of 모두 맞다. despite of는 어느 문항에도 없다",
  "g07|주어+동사가 보이면 접속사, 명사만 보이면 전치사. Part 5에서 품사 자리 다음으로 많이 나온다.":
    "oneLine과 같은 기준이다. g07 10문항 모두 맞다",
  "g07|뒤에 명사만 → 전치사":
    "예문 설명이다. q061·q064·q065·q067·q069·q070 모두 명사 앞 전치사다",
  "g10|비교급 강조 자리에는 very를 넣은 오답이 거의 항상 하나 들어 있다.":
    "'거의'로 단정을 피했다. 강조 자리 문항 q100·q154·q159 모두 very가 오답에 있다",
  "g12|영어 문장에는 주어와 동사가 있어야 하고(명령문만 주어 you를 생략한다), 꾸밈말은 정해진 자리에 간다.":
    "주어가 없는 문장 q052·q108·q119·q131·q137은 모두 명령문이다. and 병렬(q126)은 trap에서 주어를 함께 쓰는 것으로 설명한다",
  "g12|주어를 빼는 것은 명령문뿐이다.":
    "oneLine과 같다. 바로 뒤 문장이 and 병렬(q126)을 따로 설명한다",
  "g13|조동사 뒤에는 어떤 경우에도 동사원형이 온다.":
    "조동사 뒤 빈칸 q005·q033·q034·q121~q130 모두 원형이다. q125 should have been(have가 원형), q130 will not be able(not 다음 원형), q117 Could you please confirm(please 다음 원형)도 맞다. 완료 have·진행 be 뒤는 trap에서 뺐다",
  "g16|선택지가 is / are처럼 동사로만 나와도 주어 앞의 수량 표현부터 본다.":
    "동사 빈칸인 q012·q016·q017·q020·q175가 모두 주어 앞 수량 표현으로 풀린다"
};
// 문장 나누기: 줄바꿈과 마침표 뒤 공백. 예문 속 영어 마침표에서도 나뉘지만 후보를 뽑는 데는 지장이 없다.
function noteSentences(topic) {
  var parts = [];
  function push(field, text) {
    String(text || "").split(/\n+/).forEach(function (line) {
      line.split(/(?<=[다요]\.)\s+/).forEach(function (sentence) {
        sentence = sentence.trim();
        if (sentence) parts.push({ field: field, text: sentence });
      });
    });
  }
  push("oneLine", topic.oneLine);
  push("trap", topic.trap);
  push("toeicPattern", topic.toeicPattern);
  ((topic.table && topic.table.rows) || []).forEach(function (row, index) { push("table" + (index + 1), row.join(" | ")); });
  (topic.examples || []).forEach(function (example, index) { push("example" + (index + 1), example.note); });
  return parts;
}
var CLAIM_KEYWORD_STOP = new Set(("a an the is are be to of in on at for by and or not no it this that than as " +
  "ing p.p. do does did").split(" "));
function claimKeywords(text) {
  return Array.from(new Set((String(text).match(/[A-Za-z][A-Za-z'-]*/g) || []).map(function (word) { return word.toLowerCase(); })))
    .filter(function (word) { return word.length > 1 && !CLAIM_KEYWORD_STOP.has(word); });
}
// "전치사 뒤·조동사 뒤·be동사 뒤"처럼 자리를 말하는 단정은 문장에 영어 단어가 없어도 그 자리 문항을 후보로 뽑는다.
// 빈칸 바로 앞 단어로 자리를 판단한다 (예: 전치사 뒤 → to me, by himself도 후보로 나온다).
var POSITION_HINTS = [
  { term: /전치사 뒤/, label: "전치사 뒤", words: "to of for by with in on at from about after before into without".split(" ") },
  { term: /조동사 뒤/, label: "조동사 뒤", words: "will can could would should must may might cannot".split(" ") },
  { term: /be동사 (바로 )?뒤/, label: "be동사 뒤", words: "is are was were be been am".split(" ") }
];
function wordBeforeBlank(question) {
  var tokens = overlapTokens(String(question.question).replace(/_{2,}/, " zzblank "));
  var index = tokens.indexOf("zzblank");
  return index > 0 ? tokens[index - 1] : null;
}
var absoluteClaims = [];
var absoluteSeen = Object.create(null);
topics.forEach(function (topic) {
  noteSentences(topic).forEach(function (part) {
    if (!ABSOLUTE_PATTERN.test(part.text)) return;
    var key = topic.id + "|" + part.text;
    absoluteSeen[key] = true;
    var keywords = claimKeywords(part.text);
    var sameRule = questions.filter(function (question) { return question.ruleId === topic.id; }).map(function (question) { return question.id; });
    var otherRule = questions.filter(function (question) {
      if (question.ruleId === topic.id || !Array.isArray(question.choices)) return false;
      var full = " " + overlapTokens(String(question.question).replace(/_{2,}/, question.choices[question.answer])).join(" ") + " ";
      return keywords.some(function (word) { return full.indexOf(" " + word + " ") !== -1; });
    }).map(function (question) { return question.id + "[" + question.ruleId + "]"; });
    POSITION_HINTS.forEach(function (hint) {
      if (!hint.term.test(part.text)) return;
      questions.forEach(function (question) {
        var label = question.id + "[" + question.ruleId + "]";
        if (question.ruleId !== topic.id && otherRule.indexOf(label) === -1 && hint.words.indexOf(wordBeforeBlank(question)) !== -1) {
          otherRule.push(label + "(" + hint.label + ")");
        }
      });
    });
    absoluteClaims.push({ key: key, note: topic.id, field: part.field, text: part.text, sameRule: sameRule, otherRule: otherRule,
      reviewed: REVIEWED_ABSOLUTE_CLAIMS[key] || null });
  });
});
failures.absoluteClaimUnreviewed = absoluteClaims.filter(function (claim) { return !claim.reviewed; }).map(function (claim) {
  return { note: claim.note, field: claim.field, text: claim.text, sameRule: claim.sameRule.length + "문항", otherRuleCandidates: claim.otherRule.slice(0, 15) };
});
failures.absoluteClaimStale = Object.keys(REVIEWED_ABSOLUTE_CLAIMS).filter(function (key) { return !absoluteSeen[key]; })
  .map(function (key) { return { key: key, hint: "노트에서 이 문장이 바뀌었거나 사라졌다. 새 문장을 다시 대조하고 목록을 고친다" }; });

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
console.log("\nexampleOverlapOtherRule — 경고 (" + crossOverlapWarnings.length + ")");
if (!crossOverlapWarnings.length) console.log("  없음");
crossOverlapWarnings.forEach(function (warning) {
  console.log("  ⚠ " + warning.note + " 예문" + warning.example + "(" + warning.kind + ") \"" + warning.sentence + "\" ↔ " +
    warning.question + "[" + warning.ruleId + "] — " + warning.reasons);
});
console.log("\nabsoluteClaims — 단정 표현 " + absoluteClaims.length + "개 (검토 완료 " +
  absoluteClaims.filter(function (claim) { return claim.reviewed; }).length + ")");
absoluteClaims.forEach(function (claim) {
  console.log("  " + (claim.reviewed ? "✔ " : "⚠ ") + claim.note + " " + claim.field + " \"" + claim.text + "\"");
  console.log("      같은 유형 " + claim.sameRule.length + "문항 · 키워드가 든 다른 유형: " + (claim.otherRule.join(", ") || "없음"));
  if (claim.reviewed) console.log("      검토: " + claim.reviewed);
});

// 해설의 단정 표현은 실패로 보지 않고 개수만 알린다 (문항 하나에 대한 설명이라 반례 범위가 좁다)
var explanationClaims = questions.filter(function (question) { return ABSOLUTE_PATTERN.test(String(question.explanation)); });
console.log("\nexplanationAbsoluteClaims — 참고 (" + explanationClaims.length + ")");
explanationClaims.forEach(function (question) { console.log("  · " + question.id + "[" + question.ruleId + "] " + question.explanation); });

// ---------------------------------------------------------------------------
// 화면 검사: 문법 페이지(common.js + grammar.js)를 가짜 DOM·가짜 localStorage로 실행한다.
// 노트 아코디언(모든 노트), 문제 유형 선택, 유형별 정답률(약점 유형 탭)을 확인한다.
// ---------------------------------------------------------------------------
console.log("\n[화면 검사]");
var domFailures = 0;
function check(name, cond, detail) {
  console.log((cond ? "  ✔ " : "  ✘ ") + name + (detail !== undefined ? " — " + detail : ""));
  if (!cond) domFailures++;
}

class El {
  constructor(tag) {
    this.tagName = tag.toUpperCase(); this.children = []; this.attrs = {}; this.dataset = {}; this.style = {};
    this.hidden = false; this.disabled = false; this.className = ""; this.id = ""; this._value = "";
    this.listeners = {}; this._text = ""; this.href = ""; this.type = ""; this._selected = false;
    const self = this;
    const cls = () => self.className.split(/\s+/).filter(Boolean);
    this.classList = {
      add: c => { if (!cls().includes(c)) self.className = cls().concat(c).join(" "); },
      remove: c => { self.className = cls().filter(x => x !== c).join(" "); },
      contains: c => cls().includes(c),
      toggle(c, f) { const on = f === undefined ? !this.contains(c) : !!f; on ? this.add(c) : this.remove(c); return on; }
    };
  }
  get value() {
    if (this.tagName !== "SELECT") return this._value;
    const selected = this.options.find(o => o.selected) || this.options[0];
    return selected ? selected.value : "";
  }
  set value(v) {
    if (this.tagName === "SELECT") this.options.forEach(o => { o.selected = o.value === String(v); });
    else this._value = String(v);
  }
  get selected() { return this._selected; }
  set selected(v) { this._selected = !!v; }
  get options() { return this.children.filter(c => c.tagName === "OPTION"); }
  get selectedOptions() { const v = this.value; return this.options.filter(o => o.value === v); }
  set textContent(v) { this.children = []; this._text = String(v); }
  get textContent() { return this._text + this.children.map(c => c.textContent).join(""); }
  appendChild(c) { this.children.push(c); return c; }
  append(...cs) { cs.forEach(c => this.appendChild(c)); }
  replaceChildren(...cs) { this.children = []; this._text = ""; this.append(...cs); }
  setAttribute(k, v) { this.attrs[k] = String(v); if (k === "id") this.id = String(v); }
  getAttribute(k) { return k in this.attrs ? this.attrs[k] : null; }
  hasAttribute(k) { return k in this.attrs; }
  removeAttribute(k) { delete this.attrs[k]; }
  addEventListener(t, f) { (this.listeners[t] = this.listeners[t] || []).push(f); }
  dispatch(t) { (this.listeners[t] || []).forEach(f => f({ key: "", preventDefault() {} })); }
  click() { if (!this.disabled) this.dispatch("click"); }
  focus() {}
  scrollIntoView() {}
  all() { return this.children.flatMap(c => [c, ...c.all()]); }
  matches(sel) {
    const re = /\.([\w-]+)|\[([\w-]+)(\^?=)"([^"]*)"\]/g; let m, ok = true;
    while ((m = re.exec(sel))) {
      if (m[1]) ok = ok && this.classList.contains(m[1]);
      else {
        const v = m[2] === "id" ? this.id : this.getAttribute(m[2]);
        ok = ok && v !== null && (m[3] === "=" ? v === m[4] : v.startsWith(m[4]));
      }
    }
    return ok;
  }
  querySelectorAll(sel) { return this.all().filter(e => e.matches(sel)); }
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
}

// grammar.html과 같은 id로 페이지 골격을 만든다
const root = path.join(__dirname, "..");
const body = new El("body");
const add = (tag, id, parent = body) => { const e = new El(tag); e.id = id; parent.appendChild(e); return e; };
add("div", "site-header").querySelector = () => new El("button");
add("div", "site-footer");
["notes", "quiz", "weak"].forEach(n => { add("button", "grammar-tab-" + n).setAttribute("role", "tab"); add("section", "grammar-panel-" + n); });
add("button", "grammar-expand-toggle");
const list = add("div", "grammar-list");
const form = add("form", "grammar-quiz-form");
const ruleSelect = add("select", "grammar-quiz-rule");
const countSelect = add("select", "grammar-quiz-count");
["5", "10", "20", "all"].forEach(v => { const o = new El("option"); o.value = v; countSelect.appendChild(o); });
countSelect.value = "10";
add("p", "grammar-quiz-message");
const stage = add("div", "grammar-quiz-stage");
const weakList = add("div", "grammar-weak-list");
add("button", "grammar-weak-practice");

const store = new Map();
const ready = [];
const fakeDocument = {
  readyState: "loading", documentElement: new El("html"),
  createElement: t => new El(t),
  getElementById: id => body.all().find(e => e.id === id) || null,
  querySelectorAll: s => body.querySelectorAll(s),
  addEventListener: (t, f) => { if (t === "DOMContentLoaded") ready.push(f); }
};
const fakeWindow = {
  document: fakeDocument, location: { pathname: "/english-lab/pages/grammar.html", hash: "" },
  addEventListener() {}, matchMedia: () => ({ matches: false })
};
const fakeStorage = { getItem: k => store.has(k) ? store.get(k) : null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) };
const pageContext = vm.createContext({ window: fakeWindow, document: fakeDocument, localStorage: fakeStorage, console });
try {
  ["assets/js/common.js", "data/grammar.js", "assets/js/grammar.js"].forEach(function (file) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), pageContext, { filename: file });
  });
  ready.forEach(f => f());
} catch (error) {
  check("문법 화면 로드", false, error.message);
}

const pageTopics = (fakeWindow.GRAMMAR || []).slice().sort((a, b) => a.order - b.order);
const pageQuiz = fakeWindow.GRAMMAR_QUIZ || [];

// 1. 노트 아코디언: 모든 노트가 닫힌 채 그려지고, 열면 다섯 섹션과 표·예문이 데이터 개수대로 보인다
check("노트 " + pageTopics.length + "개 렌더", list.children.length === pageTopics.length, list.children.length + "개");
pageTopics.forEach(function (topic) {
  const article = list.children.find(a => a.id === "grammar-note-" + topic.id);
  if (!article) { check(topic.id + " 노트", false, "없음"); return; }
  const trigger = article.children[0];
  const panel = article.children[1];
  const closedAtStart = panel.hidden === true && trigger.getAttribute("aria-expanded") === "false";
  trigger.click();
  const opened = panel.hidden === false && trigger.getAttribute("aria-expanded") === "true";
  const sectionCount = panel.children.length;
  const tableEl = panel.querySelector(".grammar-table");
  const rowCount = tableEl ? tableEl.children[1].children.length : 0;
  const cardCount = panel.querySelectorAll(".grammar-example-card").length;
  const titleOk = trigger.textContent.indexOf(String(topic.order).padStart(2, "0") + " · " + topic.title) === 0;
  trigger.click();
  const closedAgain = panel.hidden === true;
  check(topic.id + " " + topic.title + " — 닫힘→열림→닫힘, 섹션 5개, 표 " + topic.table.rows.length + "행, 예문 " + topic.examples.length + "개",
    closedAtStart && opened && closedAgain && sectionCount === 5 && rowCount === topic.table.rows.length &&
      cardCount === topic.examples.length && titleOk,
    [closedAtStart, opened, closedAgain, sectionCount, rowCount, cardCount, titleOk].join("/"));
});

// 2. 문제 유형 선택: 전체 + 문제가 있는 모든 유형
const rulesWithQuestions = pageTopics.filter(t => pageQuiz.some(q => q.ruleId === t.id)).map(t => t.id);
const ruleOptions = ruleSelect.options.map(o => o.value);
check("유형 선택 = 전체 + " + rulesWithQuestions.length + "개 유형", ruleOptions.join(",") === ["all"].concat(rulesWithQuestions).join(","), ruleOptions.join(","));

// 3. 유형별 정답률: 마지막 두 유형을 끝까지 풀고(앞 유형은 3개 틀림, 뒤 유형은 전부 정답) 약점 유형 탭을 확인한다
function solveRule(ruleId, wrongCount) {
  ruleSelect.value = ruleId; ruleSelect.dispatch("change");
  countSelect.value = "all";
  form.dispatch("submit");
  let answered = 0;
  let correct = 0;
  for (let guard = 0; guard < 100; guard++) {
    const prompt = stage.querySelector(".grammar-question-prompt");
    const buttons = stage.querySelectorAll(".grammar-choice");
    if (!prompt || !buttons.length) break;
    const question = pageQuiz.find(q => q.question === prompt.textContent);
    if (!question) break;
    const pickRight = answered >= wrongCount;
    buttons[pickRight ? question.answer : (question.answer + 1) % buttons.length].click();
    answered++;
    if (pickRight) correct++;
    const next = stage.querySelector(".grammar-next-button");
    if (!next) break;
    next.click();
  }
  return { answered: answered, correct: correct };
}
const ruleA = pageTopics[pageTopics.length - 2];
const ruleB = pageTopics[pageTopics.length - 1];
const totalA = pageQuiz.filter(q => q.ruleId === ruleA.id).length;
const totalB = pageQuiz.filter(q => q.ruleId === ruleB.id).length;
const solvedA = solveRule(ruleA.id, 3);
const solvedB = solveRule(ruleB.id, 0);
const stats = fakeWindow.Progress.getGrammarStats();
check(ruleA.id + " 기록: " + totalA + "문제 중 " + (totalA - 3) + "개 정답",
  stats[ruleA.id] && stats[ruleA.id].solved === totalA && stats[ruleA.id].correct === totalA - 3 && solvedA.answered === totalA,
  JSON.stringify(stats[ruleA.id]));
check(ruleB.id + " 기록: " + totalB + "문제 모두 정답",
  stats[ruleB.id] && stats[ruleB.id].solved === totalB && stats[ruleB.id].correct === totalB && solvedB.answered === totalB,
  JSON.stringify(stats[ruleB.id]));
fakeDocument.getElementById("grammar-tab-weak").click();
const weakItems = weakList.querySelectorAll(".grammar-weak-item");
const weakTitles = weakItems.map(item => item.children[0].children[0].textContent);
const expectedA = Math.round((totalA - 3) / totalA * 100);
const valueA = weakItems[0] && weakItems[0].querySelector(".grammar-accuracy-value");
check("약점 유형 탭: " + pageTopics.length + "개 유형 표시", weakItems.length === pageTopics.length, weakItems.length + "개");
check("정답률 낮은 순: " + ruleA.title + "(" + expectedA + "%) → " + ruleB.title + "(100%)",
  weakTitles[0] === ruleA.title && weakTitles[1] === ruleB.title && !!valueA && valueA.textContent === expectedA + "%",
  weakTitles.slice(0, 2).join(" / ") + " · " + (valueA ? valueA.textContent : "정답률 없음"));

// 4. 나머지 모든 유형도 끝까지 풀고(유형마다 오답 수를 다르게) 약점 탭에서 유형별 정답률을 하나씩 확인한다.
//    위 검사는 마지막 두 유형만 보므로, 노트가 늘어도 앞쪽 유형의 기록·표시가 빠지지 않게 한다.
const expectedById = {};
expectedById[ruleA.id] = expectedA;
expectedById[ruleB.id] = 100;
pageTopics.forEach((topic, index) => {
  if (topic.id === ruleA.id || topic.id === ruleB.id) return;
  const total = pageQuiz.filter(q => q.ruleId === topic.id).length;
  const wrong = Math.min(total, index % 4);
  solveRule(topic.id, wrong);
  expectedById[topic.id] = Math.round((total - wrong) / total * 100);
});
const allStats = fakeWindow.Progress.getGrammarStats();
const recordMismatch = pageTopics.filter(topic => {
  const total = pageQuiz.filter(q => q.ruleId === topic.id).length;
  return !allStats[topic.id] || allStats[topic.id].solved !== total ||
    Math.round(allStats[topic.id].correct / total * 100) !== expectedById[topic.id];
}).map(topic => topic.id + " " + JSON.stringify(allStats[topic.id]));
check("모든 유형 기록: " + pageTopics.length + "개 유형 모두 푼 문제 수·정답 수가 맞음", !recordMismatch.length, recordMismatch.join(" | ") || "이상 없음");
fakeDocument.getElementById("grammar-tab-weak").click();
const allWeakItems = weakList.querySelectorAll(".grammar-weak-item");
const shown = allWeakItems.map(item => {
  const title = item.children[0].children[0].textContent;
  const value = item.querySelector(".grammar-accuracy-value");
  const topic = pageTopics.find(t => t.title === title);
  return { id: topic ? topic.id : "(제목 불일치: " + title + ")", value: value ? parseInt(value.textContent, 10) : NaN };
});
const displayMismatch = shown.filter(s => expectedById[s.id] !== s.value).map(s => s.id + " 표시 " + s.value + "% / 기대 " + expectedById[s.id] + "%");
check("모든 유형 정답률 표시: " + allWeakItems.length + "개 유형이 기록과 같은 %로 보임",
  allWeakItems.length === pageTopics.length && !displayMismatch.length, displayMismatch.join(" | ") || shown.map(s => s.id + " " + s.value + "%").join(", "));
check("모든 유형 정답률 낮은 순 정렬", shown.every((s, i) => i === 0 || shown[i - 1].value <= s.value), shown.map(s => s.value).join(" ≤ "));

// 5. 보조 태그: 틀리면 피드백과 결과의 틀린 문제에 "함께 묻습니다" 링크가 나오고, 맞힌 문항에는 나오지 않는다.
//    통계는 주 태그에만 쌓이고 보조 태그 유형의 기록은 늘지 않는다.
(function () {
  const sample = pageQuiz.find(q => Array.isArray(q.alsoRuleIds) && q.alsoRuleIds.length);
  if (!sample) { check("보조 태그 문항", false, "없음"); return; }
  const alsoId = sample.alsoRuleIds[0];
  const before = JSON.parse(JSON.stringify(fakeWindow.Progress.getGrammarStats()));
  ruleSelect.value = sample.ruleId; ruleSelect.dispatch("change");
  countSelect.value = "all";
  form.dispatch("submit");
  let wrongLinkShown = null, rightLinkShown = null, answered = 0;
  for (let guard = 0; guard < 100; guard++) {
    const prompt = stage.querySelector(".grammar-question-prompt");
    const buttons = stage.querySelectorAll(".grammar-choice");
    if (!prompt || !buttons.length) break;
    const question = pageQuiz.find(q => q.question === prompt.textContent);
    const isSample = question === sample;
    buttons[isSample ? (question.answer + 1) % buttons.length : question.answer].click();
    const links = stage.querySelectorAll(".grammar-also-link");
    if (isSample) wrongLinkShown = links.length === 1 && links[0].textContent.indexOf(alsoId) !== -1;
    else if (Array.isArray(question.alsoRuleIds) && rightLinkShown === null) rightLinkShown = links.length > 0;
    answered++;
    const next = stage.querySelector(".grammar-next-button");
    if (!next) break;
    next.click();
  }
  const missLinks = stage.querySelectorAll(".grammar-also-link").length;
  const after = fakeWindow.Progress.getGrammarStats();
  const mainGrew = after[sample.ruleId].solved - before[sample.ruleId].solved === answered;
  const alsoSame = after[alsoId].solved === before[alsoId].solved;
  check("보조 태그: " + sample.id + "를 틀리면 '" + alsoId + "도 함께 묻습니다' 링크", wrongLinkShown === true, String(wrongLinkShown));
  check("보조 태그: 맞힌 문항에는 링크 없음", rightLinkShown !== true, String(rightLinkShown));
  check("보조 태그: 결과의 틀린 문제에도 링크", missLinks === 1, missLinks + "개");
  check("보조 태그: 통계는 주 태그(" + sample.ruleId + ")에만 쌓이고 " + alsoId + "는 그대로", mainGrew && alsoSame,
    sample.ruleId + " +" + (after[sample.ruleId].solved - before[sample.ruleId].solved) + " / " + alsoId + " +" + (after[alsoId].solved - before[alsoId].solved));
})();

console.log(domFailures ? "\n화면 검사 실패 " + domFailures : "\n화면 검사 통과");
if (failureCount || domFailures) process.exit(1);
