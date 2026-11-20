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
// 비교 전에 조각 끝의 어미(하다·되다·시키다·하기·되기)를 뗀다. 예) "보존하다"와 "보존, 절약"은 "보존"이 겹친다.
function stemMeaningPiece(piece) {
  return piece.replace(/(시키다|하다|되다|하기|되기)$/, "") || piece;
}

function meaningPieces(meaning) {
  return String(meaning).split(/[,/]/).map(function (piece) {
    return stemMeaningPiece(piece.replace(/\([^)]*\)/g, "").replace(/\s+/g, " ").trim());
  }).filter(Boolean);
}

function meaningsTooSimilar(a, b) {
  var leftPieces = meaningPieces(a);
  var rightPieces = meaningPieces(b);
  var left = leftPieces.join(", ");
  var right = rightPieces.join(", ");
  if (!left || !right) return false;
  if (left === right || left.indexOf(right) !== -1 || right.indexOf(left) !== -1) return true;
  return leftPieces.some(function (piece) { return rightPieces.indexOf(piece) !== -1; });
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
  trackMetadata: [],
  wrongFormHasMeaning: []
};
// 일부러 틀리게 만든 오답 표현(VOCAB_WRONG_FORMS)에는 뜻을 붙이지 않는다.
// 둘 다에 있으면 틀린 영어가 자연스러운 한국어 뜻과 함께 보여 맞는 표현으로 오해할 수 있다.
var wrongForms = Array.isArray(context.window.VOCAB_WRONG_FORMS) ? context.window.VOCAB_WRONG_FORMS : [];
var wrongFormSet = Object.create(null);
wrongForms.forEach(function (form) {
  wrongFormSet[normalizeWord(form)] = true;
  if (distractorMeanings && typeof distractorMeanings === "object" &&
      (Object.prototype.hasOwnProperty.call(distractorMeanings, form) ||
       Object.prototype.hasOwnProperty.call(distractorMeanings, normalizeWord(form)))) {
    failures.wrongFormHasMeaning.push({ form: form, meaning: distractorMeanings[form] || distractorMeanings[normalizeWord(form)] });
  }
});
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
      if (!meanings[normalizedWord] && !wrongFormSet[normalizedWord] && !seenMissingDistractorMeanings[normalizedWord]) {
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

// ---------------------------------------------------------------------------
// C. 같은 Day(회화는 같은 상황) 안 한국어 뜻 겹침
// 뜻 시험은 같은 Day에서 오답 뜻을 가져온다. 유사도 가드(meaningsTooSimilar)가 잡는 쌍은 한 문제에 함께 나오지 않으므로
// 괜찮고, 가드를 통과하면서 뜻이 사실상 같은 쌍이 문제다(정답이 둘이 됨). 그런 쌍을 두 규칙으로 찾는다.
//  1) 통째 포함: 한쪽 뜻 조각이 통째로 다른 쪽 뜻 안에 낱말로 들어 있다 (조사 과/와/을/를/이/가/의/에/로/은/는을 떼고 비교)
//     예) publicity "홍보" ↔ campaign "홍보 활동", property "건물" ↔ premises "건물과 부지"
//  2) 동의어 표: 아래 표의 서로 다른 말을 양쪽이 하나씩 쓴다 (글자가 안 겹치는 동의어용)
//     예) hire "고용하다" ↔ recruit "채용하다", flyer "전단지" ↔ brochure "팸플릿"
// 검토해서 구분된다고 판단한 쌍은 REVIEWED_MEANING_PAIRS에 이유와 함께 둔다. 새 쌍이 걸리면 한쪽 뜻을 좁히거나 검토 후 추가한다.
var MEANING_SYNONYMS = [["고용", "채용"], ["인력", "직원"], ["팸플릿", "전단지", "리플릿"], ["규격", "표준"], ["장비", "기기", "장치"], ["장려금", "보조금"], ["요금", "이용료"]];
var REVIEWED_MEANING_PAIRS = {
  "operate|shut down": "'가동'이 겹치지만 shut down은 '가동을 중단하다'로 반대 뜻",
  "downtime|operate": "'가동'이 겹치지만 downtime은 '가동 중단 시간'으로 반대 뜻",
  "address|ticket": "'처리'가 겹치지만 address는 동사(처리하다, 다루다), ticket은 명사(접수 건)"
};
var MEANING_PARTICLE = /(과|와|을|를|이|가|의|에|로|으로|은|는)$/;
function meaningWords(meaning) {
  return meaningPieces(meaning).join(" ").split(/[\s,·~]+/).map(function (word) {
    return word.replace(/[^가-힣]/g, "").replace(MEANING_PARTICLE, "");
  }).filter(function (word) { return word.length >= 2; });
}
function meaningOverlapReasons(a, b) {
  var reasons = [];
  [[a, b], [b, a]].forEach(function (pair) {
    var inside = meaningWords(pair[1]);
    meaningPieces(pair[0]).forEach(function (piece) {
      var core = piece.replace(/[^가-힣]/g, "");
      if (core.length >= 2 && inside.indexOf(core) !== -1) reasons.push("통째 포함 '" + core + "'");
    });
  });
  var left = meaningPieces(a).join(" "), right = meaningPieces(b).join(" ");
  MEANING_SYNONYMS.forEach(function (group) {
    group.forEach(function (x) {
      group.forEach(function (y) {
        if (x !== y && left.indexOf(x) !== -1 && right.indexOf(y) !== -1) reasons.push("동의어 " + x + "≈" + y);
      });
    });
  });
  return reasons;
}
failures.meaningOverlap = [];
var meaningGroups = Object.create(null);
vocabulary.forEach(function (item) {
  if (!item || typeof item.meaning !== "string") return;
  var key = String(item.track) + ":" + String(item.situation || item.day);
  (meaningGroups[key] = meaningGroups[key] || []).push(item);
});
var reviewedPairsUsed = Object.create(null);
Object.keys(meaningGroups).forEach(function (key) {
  var list = meaningGroups[key];
  for (var i = 0; i < list.length; i += 1) {
    for (var j = i + 1; j < list.length; j += 1) {
      if (meaningsTooSimilar(list[i].meaning, list[j].meaning)) continue; // 가드가 같은 문제에 못 나오게 막는다
      var reasons = meaningOverlapReasons(list[i].meaning, list[j].meaning);
      if (!reasons.length) continue;
      var pairKey = [list[i].word, list[j].word].sort().join("|");
      if (REVIEWED_MEANING_PAIRS[pairKey]) { reviewedPairsUsed[pairKey] = true; continue; }
      failures.meaningOverlap.push({ group: key, pair: list[i].id + " " + list[i].word + "「" + list[i].meaning + "」 ↔ " + list[j].id + " " + list[j].word + "「" + list[j].meaning + "」", reasons: reasons });
    }
  }
});
// 검토 목록에 있는데 더는 걸리지 않는 쌍은 목록에서 지우라고 알린다 (목록이 낡지 않게)
Object.keys(REVIEWED_MEANING_PAIRS).forEach(function (pairKey) {
  if (!reviewedPairsUsed[pairKey]) failures.meaningOverlap.push({ reviewedPair: pairKey, reason: "REVIEWED_MEANING_PAIRS에 있지만 더 이상 걸리지 않음 — 목록에서 지우기" });
});

// ---------------------------------------------------------------------------
// E. 품사와 한국어 뜻의 모양 (뜻 시험에서 품사가 단서가 되지 않게)
// 뜻을 쉼표와 " / "로 나눈 조각마다 본다. 품사가 여러 개(n./v.)면 그중 하나에 맞으면 된다. 표현(회화)은 보지 않는다.
//  명사·형용사: "~다"(동사형)나 "~하게·~히·~적으로·~에·미리·곧"(부사형)으로 끝나면 안 된다
//  동사: "~다"로 끝나야 한다   부사: "~다"나 "~한·~된·~적인·~있는"(형용사형)으로 끝나면 안 된다
//  "주문(하다)"처럼 괄호로 동사를 붙인 조각은 명사·동사 겸용으로 본다
var POS_VERB = /다$/;
var POS_ADVERB = /(하게|히|적으로|스럽게|에)$|^(미리|곧|바로|자주|함께|먼저|나중에|이미)$/;
var POS_ADJ_FORM = /(한|된|적인|있는|없는|쉬운|운)$/;
failures.posMeaningShape = [];
vocabulary.forEach(function (item) {
  if (!item || typeof item.meaning !== "string" || typeof item.pos !== "string" || item.pos === "표현") return;
  var parts = item.pos.split("/");
  item.meaning.split(/\s\/\s|,\s*/).forEach(function (raw) {
    if (/\((하다|되다)\)\s*$/.test(raw.trim())) return;
    var piece = raw.replace(/\([^)]*\)/g, "").replace(/[~…]/g, "").replace(/\s+/g, " ").trim();
    if (!piece) return;
    var verb = POS_VERB.test(piece), adverb = POS_ADVERB.test(piece), adjForm = POS_ADJ_FORM.test(piece);
    var fits = parts.some(function (part) {
      if (part === "n." || part === "adj.") return !verb && !adverb;
      if (part === "v.") return verb;
      if (part === "adv.") return !verb && !adjForm;
      return true;
    });
    if (!fits) failures.posMeaningShape.push({ id: item.id, word: item.word, pos: item.pos, meaning: item.meaning,
      piece: raw.trim(), shape: verb ? "동사형(~다)" : adverb ? "부사형" : adjForm ? "형용사형" : "명사형" });
  });
});

// ---------------------------------------------------------------------------
// D. 영어 문장 형식 (저장소 전체: vocab·grammar·reading·listening·part1·speaking)
// 기계로 판정할 수 있는 것만 실패로 본다: 영어 칸의 한글, 전각 문자, 둥근 따옴표·아포스트로피(’ “ ”),
// 비표준 하이픈(‐ ‑ ‒ −), 줄바꿈 없는 공백, 두 칸 띄어쓰기, 같은 글자 세 번 연속(www 제외),
// 문장 끝 문장부호 누락(단어 예문·받아쓰기·대본·Part 1 문장·회화 문장, 4단어 이상), 한국어 뜻에 영어.
// Part 6 지문 조각(빈칸 앞뒤로 잘린 글)은 앞뒤 공백·문장부호를 보지 않는다. 독해 지문은 서식(표·영수증·서명)이 많아 문장부호를 보지 않는다.
// 오타 후보(한 번만 나오는 단어)는 사람이 봐야 하므로 개수만 알리고 목록은 node tools/list-rare-words.js로 본다.
var ENGLISH_FIELDS = {
  vocab: { keys: ["word", "example", "distractors"], sentences: ["example"] },
  grammar: { keys: ["good", "bad", "question", "choices"], sentences: [] },
  reading: { keys: ["header", "en", "w", "q", "choices"], sentences: [] },
  listening: { keys: ["text", "question", "choices", "q", "script"], sentences: ["text", "script"] },
  part1: { keys: ["choices"], sentences: ["choices"] },
  speaking: { keys: ["english", "pattern", "en", "model", "alts"], sentences: ["en", "model"] }
};
failures.textFormat = [];
var englishWordCounts = Object.create(null);
Object.keys(ENGLISH_FIELDS).forEach(function (name) {
  var spec = ENGLISH_FIELDS[name];
  var dataContext = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "data", name + ".js"), "utf8"), dataContext, { filename: name + ".js" });
  function check(text, key, where, fragment) {
    var at = name + ":" + where + " [" + key + "]";
    var problems = [];
    if (/[가-힣]/.test(text)) problems.push("영어 칸에 한글");
    if (/[！-～　]/.test(text)) problems.push("전각 문자");
    if (/[‘’“”]/.test(text)) problems.push("둥근 따옴표·아포스트로피");
    if (/[‐‑‒−]/.test(text)) problems.push("비표준 하이픈");
    if (/ /.test(text)) problems.push("줄바꿈 없는 공백");
    if (/ {2,}/.test(text) || (!fragment && /^\s|\s$/.test(text))) problems.push("두 칸 띄어쓰기·앞뒤 공백");
    if (/([A-Za-z])\1\1/.test(text.replace(/www\./gi, ""))) problems.push("같은 글자 세 번 연속");
    if (!fragment && spec.sentences.indexOf(key) !== -1 && text.trim().split(/\s+/).length >= 4 && /[A-Za-z0-9]$/.test(text.trim())) problems.push("문장 끝 문장부호 없음");
    if (problems.length) failures.textFormat.push({ at: at, problems: problems, text: text.slice(0, 80) });
    (text.match(/[A-Za-z]+(?:'[A-Za-z]+)*/g) || []).forEach(function (word) {
      var lower = word.toLowerCase();
      englishWordCounts[lower] = (englishWordCounts[lower] || 0) + 1;
    });
  }
  function walk(value, key, where, fragment) {
    if (typeof value === "string") { if (spec.keys.indexOf(key) !== -1) check(value, key, where, fragment); return; }
    if (Array.isArray(value)) { value.forEach(function (child) { walk(child, key, where, fragment); }); return; }
    if (value && typeof value === "object") {
      var isFragment = fragment || value.type === "text"; // Part 6 지문 조각
      Object.keys(value).forEach(function (childKey) {
        walk(value[childKey], /^\d+$/.test(childKey) ? key : childKey, value.id || where, isFragment);
      });
    }
  }
  Object.keys(dataContext.window).filter(function (global) {
    return !/DISTRACTOR_MEANINGS|WRONG_FORMS/.test(global); // 뜻 사전과 일부러 틀린 표현은 제외
  }).forEach(function (global) { walk(dataContext.window[global], global, global, false); });
});
vocabulary.forEach(function (item) {
  if (!item) return;
  if (/[A-Za-z]/.test(item.meaning || "")) failures.textFormat.push({ at: "vocab:" + item.id + " [meaning]", problems: ["한국어 뜻에 영어"], text: item.meaning });
  if (/ {2,}|[！-～]/.test((item.meaning || "") + (item.exampleKo || ""))) failures.textFormat.push({ at: "vocab:" + item.id + " [meaning/exampleKo]", problems: ["한국어 칸 두 칸 띄어쓰기·전각"], text: item.meaning });
});
var rareWordCount = Object.keys(englishWordCounts).filter(function (word) { return englishWordCounts[word] === 1; }).length;

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

console.log("\nrareEnglishWords — 참고: 저장소 영어 문장의 서로 다른 단어 " + Object.keys(englishWordCounts).length + "개 중 한 번만 나오는 단어 " + rareWordCount +
  "개 (오타는 거의 한 번만 나온다. 목록: node tools/list-rare-words.js)");
console.log("\nreviewedMeaningPairs — 검토 후 구분된다고 본 쌍 (" + Object.keys(REVIEWED_MEANING_PAIRS).length + ")");
Object.keys(REVIEWED_MEANING_PAIRS).forEach(function (pairKey) { console.log("  " + pairKey + " — " + REVIEWED_MEANING_PAIRS[pairKey]); });

console.log("\nmissingDistractorMeanings — 경고 (" + missingDistractorMeanings.length + ")");
console.log(missingDistractorMeanings.length
  ? "  ⚠ 혼동 단어 " + missingDistractorMeanings.length + "개의 뜻이 없습니다. 단어장 상세에 단어만 표시됩니다. 목록: node tools/list-missing-meanings.js"
  : "  없음");

// ---------------------------------------------------------------------------
// 화면 검사: 단어장 페이지(common.js + vocab.js)를 가짜 DOM·가짜 localStorage로 실행한다.
// 가장 마지막 토익 Day(새로 추가된 Day)의 단어장·뜻 시험·빈칸 시험을 끝까지 진행해 본다.
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
    this.listeners = {}; this._text = ""; this.parentElement = null; this._selected = false; this.type = "";
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
  set textContent(v) { this.children.forEach(c => { c.parentElement = null; }); this.children = []; this._text = String(v); }
  get textContent() { return this._text + this.children.map(c => c.textContent).join(""); }
  get nextElementSibling() {
    if (!this.parentElement) return null;
    const siblings = this.parentElement.children;
    return siblings[siblings.indexOf(this) + 1] || null;
  }
  appendChild(c) { c.parentElement = this; this.children.push(c); return c; }
  append(...cs) { cs.forEach(c => this.appendChild(c)); }
  replaceChildren(...cs) { this.children = []; this._text = ""; this.append(...cs); }
  setAttribute(k, v) { this.attrs[k] = String(v); if (k === "id") this.id = String(v); }
  getAttribute(k) { return k in this.attrs ? this.attrs[k] : null; }
  hasAttribute(k) { return k in this.attrs; }
  removeAttribute(k) { delete this.attrs[k]; }
  addEventListener(t, f) { (this.listeners[t] = this.listeners[t] || []).push(f); }
  dispatch(t, target) { (this.listeners[t] || []).forEach(f => f({ key: "", target: target || this, preventDefault() {} })); }
  click() {
    if (this.disabled) return;
    // 버블링: 자기 자신부터 조상까지 click 리스너를 부른다 (단어장은 목록 컨테이너에 위임된 리스너를 쓴다)
    for (let node = this; node; node = node.parentElement) node.dispatch("click", this);
  }
  focus() {}
  scrollIntoView() {}
  closest(sel) { for (let n = this; n; n = n.parentElement) if (n.matches(sel)) return n; return null; }
  all() { return this.children.flatMap(c => [c, ...c.all()]); }
  matches(sel) {
    const tagMatch = /^([a-z]+)/i.exec(sel);
    if (tagMatch && this.tagName !== tagMatch[1].toUpperCase()) return false;
    const re = /\.([\w-]+)|\[([\w-]+)(\^?=)"([^"]*)"\]/g; let m, ok = true;
    while ((m = re.exec(sel))) {
      if (m[1]) ok = ok && this.classList.contains(m[1]);
      else {
        const v = m[2] === "id" ? this.id : m[2] === "type" ? (this.type || this.getAttribute("type")) : this.getAttribute(m[2]);
        ok = ok && v !== null && (m[3] === "=" ? v === m[4] : v.startsWith(m[4]));
      }
    }
    return ok;
  }
  querySelectorAll(sel) { return this.all().filter(e => e.matches(sel)); }
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
}

// vocab.html과 같은 id로 페이지 골격을 만든다
const root = path.join(__dirname, "..");
const body = new El("body");
const add = (tag, id, parent = body) => { const e = new El(tag); e.id = id; parent.appendChild(e); return e; };
const addOption = (select, value) => { const o = new El("option"); o.value = value; select.appendChild(o); return o; };
add("div", "site-header").querySelector = () => new El("button");
add("div", "site-footer");
add("input", "vocab-day", add("form", "vocab-form"));
add("p", "vocab-message");
["list", "exam", "wrong"].forEach(n => {
  const tab = add("button", "vocab-tab-" + n); tab.className = "vocab-tab"; tab.setAttribute("role", "tab");
  add("section", "vocab-panel-" + n);
});
const trackSelect = add("select", "vocab-track"); ["all", "toeic", "speaking", "toefl"].forEach(v => addOption(trackSelect, v));
add("span", "vocab-day-filter-label");
const daySelect = add("select", "vocab-day-filter");
add("input", "vocab-search");
add("button", "vocab-expand-toggle");
add("button", "vocab-hide-toggle");
const resultCount = add("p", "vocab-result-count");
add("div", "vocab-day-navigation");
const list = add("div", "vocab-list");
add("div", "vocab-day-navigation-bottom");
const examForm = add("form", "vocab-exam-form");
const examTrack = add("select", "vocab-exam-track", examForm); ["toeic", "speaking", "toefl"].forEach(v => addOption(examTrack, v));
add("span", "vocab-exam-day-label", examForm);
const examDay = add("select", "vocab-exam-day", examForm);
const examType = add("select", "vocab-exam-type", examForm); ["meaning", "blank"].forEach(v => addOption(examType, v));
const examRange = add("select", "vocab-exam-range", examForm); ["1-10", "11-20", "21-30", "all"].forEach(v => addOption(examRange, v));
const submitButton = new El("button"); submitButton.type = "submit"; examForm.appendChild(submitButton);
add("p", "vocab-exam-message");
const examStage = add("div", "vocab-exam-stage");
["vocab-due-count", "vocab-weak-count", "vocab-graduated-count"].forEach(id => add("strong", id));
add("div", "vocab-due-list");
add("button", "vocab-review-start");
add("div", "vocab-wrong-list");

const store = new Map();
const ready = [];
const pageWarnings = [];
const fakeDocument = {
  readyState: "loading", documentElement: new El("html"), body: body,
  createElement: t => new El(t),
  getElementById: id => body.all().find(e => e.id === id) || null,
  querySelectorAll: s => body.querySelectorAll(s),
  addEventListener: (t, f) => { if (t === "DOMContentLoaded") ready.push(f); }
};
const fakeWindow = {
  document: fakeDocument, location: { pathname: "/english-lab/pages/vocab.html", hash: "" },
  addEventListener() {}, matchMedia: () => ({ matches: false })
};
const fakeStorage = { getItem: k => store.has(k) ? store.get(k) : null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) };
const pageConsole = Object.assign({}, console, { warn: (...args) => pageWarnings.push(args.join(" ")) });
const pageContext = vm.createContext({ window: fakeWindow, document: fakeDocument, localStorage: fakeStorage, console: pageConsole, Element: El });
try {
  ["assets/js/common.js", "data/vocab.js", "assets/js/vocab.js"].forEach(function (file) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), pageContext, { filename: file });
  });
  ready.forEach(f => f());
} catch (error) {
  check("단어장 화면 로드", false, error.message);
}

const pageVocab = (fakeWindow.VOCAB || []).filter(v => v.track === "toeic");
const toeicDays = Array.from(new Set(pageVocab.map(v => v.day))).sort((a, b) => a - b);
const lastDay = String(toeicDays[toeicDays.length - 1]);
const dayItems = pageVocab.filter(v => String(v.day) === lastDay);
const count = dayItems.length;
console.log("  검사 대상: Day " + lastDay + " (" + count + "단어)");

// 1. 단어장: 드롭다운 · 표 · 접힘/펼침
const dayValues = daySelect.options.map(o => o.value);
check("Day 드롭다운: Day 1~" + lastDay + " (" + toeicDays.length + "개, 마지막이 Day " + lastDay + ")",
  dayValues.join(",") === toeicDays.join(","), dayValues.join(","));
daySelect.value = lastDay;
daySelect.dispatch("change");
const rows = list.querySelectorAll(".vocab-entry-row");
const detailRows = list.querySelectorAll(".vocab-detail-row");
const caption = list.querySelector("caption");
check("표 제목 '토익 · DAY " + lastDay + "'", !!caption && caption.textContent === "토익 · DAY " + lastDay, caption && caption.textContent);
check(count + "단어 표시 · 순서가 데이터와 같음",
  rows.length === count && resultCount.textContent === count + "개 단어" && rows.map(r => r.dataset.vocabId).join() === dayItems.map(v => v.id).join(),
  rows.length + " / " + resultCount.textContent);
check("처음엔 모두 접힘", detailRows.length === count && detailRows.every(d => d.hidden) && rows.every(r => r.getAttribute("aria-expanded") === "false"));
const probeIndex = dayItems.findIndex(v => v.distractors.some(d => /\s/.test(d)));
const probe = probeIndex >= 0 ? probeIndex : 0;
rows[probe].querySelector(".vocab-word").click();
const firstDistractor = dayItems[probe].distractors[0];
const distractorMeaningText = meanings[normalizeWord(firstDistractor)];
check("단어 클릭 → 상세 펼침 · 혼동 단어 뜻 표시 (" + dayItems[probe].word + ")",
  detailRows[probe].hidden === false && rows[probe].getAttribute("aria-expanded") === "true" &&
    (!distractorMeaningText || detailRows[probe].textContent.includes(firstDistractor + "(" + distractorMeaningText + ")")));
rows[probe].querySelector(".vocab-word").click();
check("다시 클릭 → 접힘", detailRows[probe].hidden === true);

// 2·3. 뜻 시험 · 빈칸 시험: 전체 범위를 모두 맞히며 끝까지 진행
function runExam(type) {
  examTrack.value = "toeic"; examTrack.dispatch("change");
  examDay.value = lastDay; examDay.dispatch("change");
  examType.value = type;
  examRange.value = "all";
  examForm.dispatch("submit");
  const seen = [];
  for (let guard = 0; guard < count + 5; guard++) {
    const prompt = examStage.querySelector(".vocab-question-prompt");
    const buttons = examStage.querySelectorAll(".vocab-quiz-option");
    if (!prompt || !buttons.length) break;
    const texts = buttons.map(b => b.textContent);
    const item = type === "meaning"
      ? dayItems.find(v => v.word === prompt.textContent)
      : dayItems.find(v => texts.includes(v.word) && v.distractors.every(d => texts.includes(d)));
    if (!item) break;
    seen.push({ item: item, prompt: prompt.textContent, texts: texts });
    buttons[texts.indexOf(type === "meaning" ? item.meaning : item.word)].click();
    const next = examStage.querySelector(".vocab-next-button");
    if (!next || next.hidden) break;
    next.click();
  }
  const result = examStage.querySelector(".vocab-results");
  return { seen: seen, result: result ? result.textContent : "" };
}
const meaningRun = runExam("meaning");
check("뜻 시험 " + count + "문제 출제 · " + count + "/" + count + " 채점",
  meaningRun.seen.length === count && meaningRun.result.includes(count + " / " + count + " 정답"), meaningRun.seen.length + "문제");
check("뜻 시험 선택지 4개 · 서로 다름", meaningRun.seen.every(s => s.texts.length === 4 && new Set(s.texts).size === 4));
const blankRun = runExam("blank");
check("빈칸 시험 " + count + "문제 출제 · " + count + "/" + count + " 채점",
  blankRun.seen.length === count && blankRun.result.includes(count + " / " + count + " 정답"), blankRun.seen.length + "문제");
// 빈칸이 있어야 하고, 정답 표현(어형 변화 포함)이 빈칸 밖에 다시 남으면 안 된다
const leftover = s => !s.prompt.includes("____") ||
  new RegExp("\\b" + escapeRegExp(s.item.word) + "(s|es|d|ed|ing)?\\b", "i").test(s.prompt);
check("빈칸 문장: 빈칸 있음 · 정답 표현이 다시 남지 않음", !blankRun.seen.some(leftover),
  blankRun.seen.filter(leftover).map(s => s.item.word + ": " + s.prompt).join(" | "));
check("빈칸 생성 경고 없음", !pageWarnings.some(w => /빈칸/.test(w)), pageWarnings.join(" | "));
const multiWord = blankRun.seen.filter(s => /\s/.test(s.item.word));
if (multiWord.length) {
  console.log("  여러 단어 표현 빈칸:");
  multiWord.sort((a, b) => a.item.id.localeCompare(b.item.id))
    .forEach(s => console.log("    " + s.item.word + " → " + s.prompt));
}

console.log(domFailures ? "\n화면 검사 실패 " + domFailures : "\n화면 검사 통과");
if (failureCount || domFailures) process.exit(1);
