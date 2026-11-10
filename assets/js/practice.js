(function () {
  "use strict";

  // 미니 모의고사 구성. 데이터가 모자라면 있는 만큼만 출제한다.
  // Part 7은 지문을 자르지 않고 통째로 내므로 문항 수가 7~8로 달라진다 (총 30~31문항).
  var EXAM = { p5: 15, p6: 8, seconds: 25 * 60, warnSec: 10 * 60, dangerSec: 3 * 60 };
  var PART7_TARGETS = [7, 8];
  var PART7_MULTI_PREFERENCE = 0.7; // 이중·삼중 지문이 든 조합을 우선 고를 확률
  var PART_LABELS = { p5: "Part 5", p6: "Part 6", p7: "Part 7" };
  // 30문항 기준 맞은 개수 → RC 예상 점수대 (참고용). 30문항이 아니면 30문항 기준으로 환산한다.
  var SCORE_BANDS = [
    { min: 0, max: 9, label: "100~200점대" },
    { min: 10, max: 14, label: "200~300점대" },
    { min: 15, max: 19, label: "300~350점대" },
    { min: 20, max: 23, label: "350~400점대" },
    { min: 24, max: 26, label: "400~450점대" },
    { min: 27, max: 30, label: "450~495점대" }
  ];
  var PART_PRACTICE_P5_COUNT = 10;

  // 시험 모드별 시간 설정. 미니 모의고사는 기존 값 그대로, 풀세트는 75분에 10분·5분 남았을 때 알림.
  var MODES = {
    mini: { mode: "mini", title: "RC 미니 모의고사", seconds: EXAM.seconds, warnSec: EXAM.warnSec, dangerSec: EXAM.dangerSec, alerts: [] },
    full: { mode: "full", title: "RC 풀세트", seconds: 75 * 60, warnSec: 10 * 60, dangerSec: 5 * 60, alerts: [10 * 60, 5 * 60] }
  };
  // RC 풀세트 구성 (실제 토익 RC와 같음, 고정). 지문·세트의 문항은 자르지 않는다.
  var FULL_SET = {
    p5: 30, p5MaxPerRule: 6,
    p6Sets: 4, p6Questions: 4,
    single: [{ questions: 2, count: 4 }, { questions: 3, count: 3 }, { questions: 4, count: 3 }],
    double: { parts: 2, questions: 5, count: 2 },
    triple: { parts: 3, questions: 5, count: 3 },
    total: 100
  };
  var FULL_SAVE_KEY = "englishLabFullSetSave"; // 학습 기록(englishLabProgress)과 별도 키
  var FULL_SAVE_EVERY_TICKS = 10; // 답을 고르지 않고 있어도 10초마다 남은 시간을 저장
  // 풀세트에서 화면을 떠났을 때: 2분 이내로 돌아오면 흐른 시간을 그대로 깎고(실제 시험처럼),
  // 2분을 넘기면 시험을 중단 처리하고 떠나기 직전의 남은 시간으로 이어서 풀게 한다.
  var FULL_AWAY_LIMIT_SEC = 2 * 60;
  var FULL_HISTORY_KEY = "englishLabFullSetHistory"; // 미니 모의고사 기록(practiceStats)과 섞지 않는다
  var FULL_HISTORY_LIMIT = 20;
  // 풀세트 전용 환산표: 맞은 개수(0~100) → RC 495점 기준 예상 점수. 15개 이하는 5점.
  var FULL_SCORE_TABLE = (function () {
    var fromTop = [ // 100개부터 16개까지
      495, 495, 490, 485, 480, 475, 470, 465, 460, 455,
      450, 445, 435, 430, 425, 415, 410, 405, 395, 390,
      385, 375, 370, 365, 355, 350, 340, 335, 330, 320,
      315, 310, 300, 295, 290, 280, 275, 270, 260, 255,
      250, 240, 235, 230, 220, 215, 210, 200, 195, 190,
      180, 175, 170, 160, 155, 150, 140, 135, 130, 125,
      115, 110, 105, 100, 95, 90, 85, 80, 75, 70,
      65, 60, 55, 50, 45, 40, 35, 30, 25, 20,
      15, 15, 10, 10, 5
    ];
    var table = [];
    for (var correct = 0; correct <= 100; correct += 1) table[correct] = correct >= 16 ? fromTop[100 - correct] : 5;
    return table;
  }());
  // 범위를 벗어나거나 숫자가 아닌 값도 0~100으로 맞춰서 점수를 돌려준다.
  function fullSetScore(correct) {
    var count = Math.round(Number(correct));
    if (!isFinite(count)) count = 0;
    return FULL_SCORE_TABLE[Math.min(100, Math.max(0, count))];
  }
  window.PracticeFullSet = { scoreFor: fullSetScore, scoreTable: FULL_SCORE_TABLE.slice() };
  var PART6_TYPE_LABELS = { grammar: "문법", vocab: "어휘", sentence: "문장 삽입" };
  var SECTION_LABELS = { p5: "Part 5", p6: "Part 6", p7: "Part 7", p7s: "Part 7 단일", p7d: "Part 7 이중", p7t: "Part 7 삼중" };

  document.addEventListener("DOMContentLoaded", function () {
    var grammarQuiz = window.GRAMMAR_QUIZ || [];
    var part6Sets = window.PART6 || [];
    var passages = window.PASSAGES || [];
    var topicById = {};
    (window.GRAMMAR || []).forEach(function (topic) { topicById[topic.id] = topic; });

    var mockStage = document.getElementById("practice-mock-stage");
    var partForm = document.getElementById("practice-part-form");
    var partSelect = document.getElementById("practice-part-select");
    var partStage = document.getElementById("practice-part-stage");
    var historyRoot = document.getElementById("practice-history");

    var exam = null;

    function element(tag, className, text) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      if (text !== undefined) node.textContent = text;
      return node;
    }

    function button(className, text, onClick) {
      var node = element("button", className, text);
      node.type = "button";
      if (onClick) node.addEventListener("click", onClick);
      return node;
    }

    function shuffle(items) {
      var shuffled = items.slice();
      for (var index = shuffled.length - 1; index > 0; index -= 1) {
        var other = Math.floor(Math.random() * (index + 1));
        var current = shuffled[index];
        shuffled[index] = shuffled[other];
        shuffled[other] = current;
      }
      return shuffled;
    }

    function formatTime(seconds) {
      var safe = Math.max(0, Math.floor(seconds));
      return String(Math.floor(safe / 60)).padStart(2, "0") + ":" + String(safe % 60).padStart(2, "0");
    }

    function letter(index) {
      return String.fromCharCode(65 + index);
    }

    function percent(correct, total) {
      return total ? Math.round(correct / total * 100) : 0;
    }

    // ---------- 문항 구성 ----------

    function part5Items(questions) {
      return questions.map(function (question) {
        return {
          part: "p5", prompt: question.question, choices: question.choices, answer: question.answer,
          explanation: question.explanation, ruleId: question.ruleId || null, group: null
        };
      });
    }

    function part6Items(set, limit) {
      var group = { kind: "p6", set: set, numbers: {} };
      return set.questions.slice(0, limit).map(function (question) {
        return {
          part: "p6", blank: question.n, type: question.type || null, choices: question.choices, answer: question.answer,
          explanation: question.explanation, ruleId: question.ruleId || null, group: group
        };
      });
    }

    // Part 7은 지문의 문항을 전부 낸다 (연계 문제가 빠지지 않게 자르지 않는다).
    function part7Items(passage) {
      var group = { kind: "p7", passage: passage };
      return passage.questions.map(function (question) {
        return {
          part: "p7", prompt: question.q, choices: question.choices, answer: question.answer,
          explanation: question.explanation, ruleId: question.ruleId || null, group: group
        };
      });
    }

    // 묶음(세트·지문)을 무작위로 골라 필요한 문항 수가 찰 때까지 담는다. 마지막 묶음은 앞에서부터 필요한 만큼만 쓴다.
    function fillFromGroups(groups, needed, makeItems) {
      var items = [];
      shuffle(groups).forEach(function (group) {
        var remaining = needed - items.length;
        if (remaining <= 0) return;
        items = items.concat(makeItems(group, remaining));
      });
      return items;
    }

    function isMultiPassage(passage) {
      return Array.isArray(passage.parts) && passage.parts.length > 1;
    }

    function questionCount(combo) {
      return combo.reduce(function (sum, passage) { return sum + passage.questions.length; }, 0);
    }

    // 지문 2~3개로 만들 수 있는 모든 조합
    function passageCombos(list) {
      var combos = [];
      for (var a = 0; a < list.length; a += 1) {
        for (var b = a + 1; b < list.length; b += 1) {
          combos.push([list[a], list[b]]);
          for (var c = b + 1; c < list.length; c += 1) combos.push([list[a], list[b], list[c]]);
        }
      }
      return combos;
    }

    function randomOf(list) {
      return list[Math.floor(Math.random() * list.length)];
    }

    var PART7_MAX_PASSAGES = 3;
    var PART7_ANCHOR_TRIES = 20;

    // 남은 문항 수(need)를 채울 지문을 하나씩 고른다. 후보를 섞은 뒤 처음으로 끝까지 채워지는 지문을 쓰므로,
    // 다음 지문은 '채울 수 있는 지문들' 중에서 균등하게 뽑힌다.
    function completePart7(chosen, need, rest) {
      if (need === 0) return chosen;
      if (need < 0 || chosen.length >= PART7_MAX_PASSAGES) return null;
      var candidates = shuffle(rest).filter(function (passage) { return passage.questions.length <= need; });
      for (var index = 0; index < candidates.length; index += 1) {
        var next = candidates[index];
        var done = completePart7(chosen.concat([next]), need - next.questions.length,
          rest.filter(function (passage) { return passage !== next; }));
        if (done) return done;
      }
      return null;
    }

    // 지문을 먼저 뽑는다: 기준 지문 하나를 지문 단위로 균등하게 고르고 (70%는 이중·삼중 지문 중에서),
    // 남은 지문으로 합 7~8을 채운다. 못 채우면 기준 지문을 다시 뽑는다 (최대 20회).
    // 조합 단위로 뽑으면 문항 수가 적은 지문만 자주 나오는 편중이 생겨서 이렇게 한다.
    function pickPart7Passages(list) {
      var usable = list.filter(function (passage) { return passage && Array.isArray(passage.questions) && passage.questions.length; });
      if (usable.length < 2) {
        if (usable.length) console.warn("Part 7: 지문이 " + usable.length + "개뿐이라 조합 없이 출제합니다.");
        return usable.slice();
      }
      var multi = usable.filter(isMultiPassage);
      for (var attempt = 0; attempt < PART7_ANCHOR_TRIES; attempt += 1) {
        var anchor = multi.length && Math.random() < PART7_MULTI_PREFERENCE ? randomOf(multi) : randomOf(usable);
        var rest = usable.filter(function (passage) { return passage !== anchor; });
        var targets = shuffle(PART7_TARGETS);
        for (var t = 0; t < targets.length; t += 1) {
          var picked = completePart7([anchor], targets[t] - anchor.questions.length, rest);
          if (picked && picked.length >= 2) return shuffle(picked);
        }
      }
      console.warn("Part 7: 기준 지문을 " + PART7_ANCHOR_TRIES + "번 뽑아도 7~8문항을 채우지 못해 조합 방식으로 대체합니다.");
      return pickPart7ByCombos(usable);
    }

    // 대체 경로: 문항 수 합이 7~8인 지문 조합 중 하나를 무작위로 고른다.
    // 70% 확률로 이중·삼중 지문이 든 조합만 놓고 고른다 (없으면 전체에서 고른다).
    // 그런 조합이 없으면 합이 7에 가장 가까운 조합으로 대체하고 경고를 남긴다.
    function pickPart7ByCombos(usable) {
      var combos = passageCombos(shuffle(usable));
      var pool = combos.filter(function (combo) { return PART7_TARGETS.indexOf(questionCount(combo)) !== -1; });
      if (!pool.length) {
        var distance = function (combo) { return Math.abs(questionCount(combo) - PART7_TARGETS[0]); };
        var best = Math.min.apply(null, combos.map(distance));
        pool = combos.filter(function (combo) { return distance(combo) === best; });
        console.warn("Part 7: 문항 수 합이 " + PART7_TARGETS.join("~") + "인 지문 조합이 없어 " +
          questionCount(pool[0]) + "문항 조합으로 대체합니다.");
      }
      var withMulti = pool.filter(function (combo) { return combo.some(isMultiPassage); });
      if (withMulti.length && Math.random() < PART7_MULTI_PREFERENCE) pool = withMulti;
      return shuffle(randomOf(pool));
    }

    function buildExam() {
      var part7 = [];
      pickPart7Passages(passages).forEach(function (passage) { part7 = part7.concat(part7Items(passage)); });
      var items = part5Items(shuffle(grammarQuiz).slice(0, EXAM.p5))
        .concat(fillFromGroups(part6Sets, EXAM.p6, part6Items))
        .concat(part7);
      items.forEach(function (item, index) {
        item.number = index + 1;
        if (item.part === "p6") item.group.numbers[item.blank] = item.number;
      });
      return items;
    }

    // ---------- RC 풀세트 구성 ----------

    function fullSetError(message) {
      var error = new Error(message);
      error.isFullSetError = true;
      return error;
    }

    function passagePartCount(passage) {
      return Array.isArray(passage.parts) && passage.parts.length ? passage.parts.length : 1;
    }

    // Part 5는 한 문법 유형(ruleId)이 FULL_SET.p5MaxPerRule을 넘지 않게 뽑는다.
    function pickPart5Balanced() {
      var counts = {};
      var picked = [];
      shuffle(grammarQuiz).forEach(function (question) {
        if (picked.length >= FULL_SET.p5) return;
        var key = question.ruleId || "(유형 없음)";
        if ((counts[key] || 0) >= FULL_SET.p5MaxPerRule) return;
        counts[key] = (counts[key] || 0) + 1;
        picked.push(question.id);
      });
      return picked;
    }

    function requireCount(list, count, what) {
      if (list.length < count) {
        throw fullSetError(what + " 수가 모자라 RC 풀세트를 만들 수 없어요. 필요 " + count + "개, 현재 " + list.length + "개.");
      }
      return list.slice(0, count);
    }

    // 무작위로 풀세트 구성표(id 목록)를 만든다. 저장·이어 풀기도 이 구성표로 같은 세트를 다시 만든다.
    function planFullSet() {
      var p5 = pickPart5Balanced();
      if (p5.length < FULL_SET.p5) {
        throw fullSetError("Part 5 문제가 모자라 RC 풀세트를 만들 수 없어요. 한 유형 " + FULL_SET.p5MaxPerRule +
          "문항 이하로 " + FULL_SET.p5 + "문항이 필요한데 " + p5.length + "문항만 뽑혔어요.");
      }
      var p6 = requireCount(shuffle(part6Sets.filter(function (set) { return set.questions.length === FULL_SET.p6Questions; })),
        FULL_SET.p6Sets, "Part 6 " + FULL_SET.p6Questions + "문항 세트");
      var single = [];
      FULL_SET.single.forEach(function (group) {
        var pool = passages.filter(function (passage) {
          return passagePartCount(passage) === 1 && passage.questions.length === group.questions;
        });
        single = single.concat(requireCount(shuffle(pool), group.count, "Part 7 " + group.questions + "문항 단일 지문"));
      });
      function multi(spec, name) {
        var pool = passages.filter(function (passage) {
          return passagePartCount(passage) === spec.parts && passage.questions.length === spec.questions;
        });
        return requireCount(shuffle(pool), spec.count, "Part 7 " + spec.questions + "문항 " + name);
      }
      var double = multi(FULL_SET.double, "이중 지문");
      var triple = multi(FULL_SET.triple, "삼중 지문");
      function ids(list) { return list.map(function (entry) { return entry.id; }); }
      return { p5: p5, p6: ids(p6), single: ids(single), double: ids(double), triple: ids(triple) };
    }

    // 구성표 → 실제 시험 순서의 100문항. 데이터와 맞지 않으면(지문이 없어졌거나 문항 수가 바뀜) 오류를 던진다.
    function assembleFullSet(plan) {
      function find(list, id, what) {
        var found = list.find(function (entry) { return entry.id === id; });
        if (!found) throw fullSetError(what + " " + id + "을(를) 찾을 수 없어요.");
        return found;
      }
      var items = part5Items(plan.p5.map(function (id) { return find(grammarQuiz, id, "Part 5 문항"); }));
      items.forEach(function (item) { item.section = "p5"; });
      plan.p6.forEach(function (id) {
        part6Items(find(part6Sets, id, "Part 6 세트"), Infinity).forEach(function (item) { item.section = "p6"; items.push(item); });
      });
      [["single", "p7s"], ["double", "p7d"], ["triple", "p7t"]].forEach(function (pair) {
        plan[pair[0]].forEach(function (id) {
          part7Items(find(passages, id, "Part 7 지문")).forEach(function (item) { item.section = pair[1]; items.push(item); });
        });
      });
      if (items.length !== FULL_SET.total) {
        throw fullSetError("RC 풀세트가 " + FULL_SET.total + "문항이 아니에요 (" + items.length + "문항).");
      }
      items.forEach(function (item, index) {
        item.number = index + 1;
        if (item.part === "p6") item.group.numbers[item.blank] = item.number;
      });
      return items;
    }

    // 단일 지문은 실제 시험처럼 짧은 지문(2문항)부터 긴 지문(4문항) 순서로 둔다. planFullSet이 그 순서로 담는다.
    function buildFullSet() {
      var plan = planFullSet();
      var items = assembleFullSet(plan);
      return { plan: plan, items: items };
    }

    // ---------- RC 풀세트 저장 (이어서 풀기) ----------

    function readFullSave() {
      var raw = null;
      try {
        raw = localStorage.getItem(FULL_SAVE_KEY);
      } catch (error) {
        console.warn("저장된 RC 풀세트를 읽지 못했습니다.", error);
        return null;
      }
      if (raw === null) return null;
      try {
        var saved = JSON.parse(raw);
        var plan = saved && saved.plan;
        var valid = saved && saved.version === 1 && plan &&
          ["p5", "p6", "single", "double", "triple"].every(function (key) { return Array.isArray(plan[key]); }) &&
          Array.isArray(saved.answers) && saved.answers.length === FULL_SET.total &&
          saved.answers.every(function (answer) { return answer === null || (Number.isInteger(answer) && answer >= 0 && answer < 4); }) &&
          typeof saved.remainingSec === "number" && isFinite(saved.remainingSec) &&
          saved.remainingSec > 0 && saved.remainingSec <= MODES.full.seconds &&
          Number.isInteger(saved.index) && saved.index >= 0 && saved.index < FULL_SET.total &&
          typeof saved.startedAt === "number";
        if (!valid) throw new Error("형식이 맞지 않음");
        saved.items = assembleFullSet(plan); // 데이터가 바뀌어 세트를 다시 만들 수 없어도 깨진 저장으로 본다
        // 페이지를 닫았다 다시 연 경우도 화면 이탈과 같은 규칙: 2분 이내면 흐른 시간을 깎고, 넘으면 중단으로 본다.
        var away = typeof saved.savedAt === "number" ? (Date.now() - saved.savedAt) / 1000 : Infinity;
        saved.interrupted = !(away >= 0 && away <= FULL_AWAY_LIMIT_SEC);
        if (!saved.interrupted) saved.remainingSec = Math.max(1, saved.remainingSec - away);
        return saved;
      } catch (error) {
        console.warn("저장된 RC 풀세트가 깨져 있어 지우고 새로 시작합니다.", error.message);
        clearFullSave();
        return null;
      }
    }

    function writeFullSave() {
      if (!exam || exam.submitted || exam.config.mode !== "full") return;
      try {
        localStorage.setItem(FULL_SAVE_KEY, JSON.stringify({
          version: 1,
          plan: exam.plan,
          answers: exam.answers,
          remainingSec: Math.max(1, Math.round(exam.remainingSec)),
          index: exam.index,
          startedAt: exam.startedAt,
          savedAt: Date.now()
        }));
      } catch (error) {
        console.warn("RC 풀세트 진행 상황을 저장하지 못했습니다.", error);
      }
    }

    function clearFullSave() {
      try {
        localStorage.removeItem(FULL_SAVE_KEY);
      } catch (error) {
        console.warn("저장된 RC 풀세트를 지우지 못했습니다.", error);
      }
    }

    // ---------- RC 풀세트 분석 ----------

    function rate(correct, total) {
      return { correct: correct, total: total, percent: percent(correct, total) };
    }

    // 정답률이 낮은 순 → 문항이 많은 순 → id 순
    function byWeakness(a, b) {
      return a.percent - b.percent || b.total - a.total || String(a.id).localeCompare(String(b.id));
    }

    function analyzeFullSet(items, answers) {
      var sections = {}, rules = {}, p6Types = {}, strategies = {};
      function bump(map, id, isCorrect) {
        map[id] = map[id] || { id: id, correct: 0, total: 0 };
        map[id].total += 1;
        if (isCorrect) map[id].correct += 1;
      }
      items.forEach(function (item, index) {
        var isCorrect = answers[index] === item.answer;
        bump(sections, item.section || item.part, isCorrect);
        if (item.part === "p5" && item.ruleId) bump(rules, item.ruleId, isCorrect);
        if (item.part === "p6") bump(p6Types, item.type || "grammar", isCorrect);
        if (item.part === "p7") bump(strategies, item.group.passage.strategyId || "기타", isCorrect);
      });
      function list(map) {
        return Object.keys(map).map(function (id) { return Object.assign({ id: id }, rate(map[id].correct, map[id].total)); });
      }
      return {
        sections: ["p5", "p6", "p7s", "p7d", "p7t"].map(function (id) {
          return Object.assign({ id: id }, rate(sections[id] ? sections[id].correct : 0, sections[id] ? sections[id].total : 0));
        }),
        weakRules: list(rules).sort(byWeakness).slice(0, 3),
        p6Types: ["grammar", "vocab", "sentence"].map(function (id) {
          return Object.assign({ id: id }, rate(p6Types[id] ? p6Types[id].correct : 0, p6Types[id] ? p6Types[id].total : 0));
        }),
        strategies: list(strategies).sort(byWeakness)
      };
    }

    // ---------- RC 풀세트 응시 기록 (최근 20회, 미니 모의고사와 별도 키) ----------

    function readFullHistory() {
      try {
        var parsed = JSON.parse(localStorage.getItem(FULL_HISTORY_KEY) || "[]");
        if (!Array.isArray(parsed)) throw new Error("배열이 아님");
        return parsed.filter(function (entry) {
          return entry && typeof entry.date === "string" && !Number.isNaN(Date.parse(entry.date)) &&
            Number.isInteger(entry.correct) && Number.isInteger(entry.score) && entry.sections && typeof entry.sections === "object";
        }).slice(-FULL_HISTORY_LIMIT);
      } catch (error) {
        console.warn("RC 풀세트 기록이 깨져 있어 지웁니다.", error.message);
        try { localStorage.removeItem(FULL_HISTORY_KEY); } catch (removeError) { /* 무시 */ }
        return [];
      }
    }

    function recordFullHistory(result) {
      var sections = {};
      result.analysis.sections.forEach(function (section) { sections[section.id] = { correct: section.correct, total: section.total }; });
      var history = readFullHistory();
      history.push({
        date: new Date().toISOString(),
        correct: result.correct,
        total: result.total,
        score: result.score,
        elapsedSec: result.elapsedSec,
        timedOut: result.timedOut,
        sections: sections
      });
      try {
        localStorage.setItem(FULL_HISTORY_KEY, JSON.stringify(history.slice(-FULL_HISTORY_LIMIT)));
      } catch (error) {
        console.warn("RC 풀세트 기록을 저장하지 못했습니다.", error);
      }
    }

    function partTotals(items) {
      var totals = { p5: 0, p6: 0, p7: 0 };
      items.forEach(function (item) { totals[item.part] += 1; });
      return totals;
    }

    // ---------- 지문 렌더링 (모의고사·파트 연습 공용) ----------

    function renderPart6Text(set, numbers, currentBlank) {
      var box = element("div", "practice-passage");
      if (set.header && set.header.length) {
        var header = element("div", "reading-passage-header en");
        set.header.forEach(function (line) { header.appendChild(element("p", "", line)); });
        box.appendChild(header);
      }
      var text = element("p", "practice-part6-text en");
      set.blocks.forEach(function (block) {
        if (block.type === "blank") {
          var number = numbers ? numbers[block.n] : block.n;
          var blank = element("span", "practice-blank", number ? "(" + number + ") ______" : "______");
          if (block.n === currentBlank) blank.classList.add("is-current");
          text.appendChild(blank);
        } else {
          text.appendChild(element("span", "", block.en));
        }
      });
      box.appendChild(text);
      return box;
    }

    function renderPart7Text(passage) {
      var box = element("div", "practice-passage");
      box.appendChild(element("p", "reading-passage-type", passage.type + " · " + passage.title));
      var parts = Array.isArray(passage.parts) && passage.parts.length
        ? passage.parts
        : [{ header: passage.header, sentences: passage.sentences }];
      parts.forEach(function (part, partIndex) {
        var container = box;
        if (part.label) {
          container = element("section", "reading-passage-part");
          if (partIndex > 0) container.classList.add("has-divider");
          container.appendChild(element("p", "reading-part-label", part.label));
          box.appendChild(container);
        }
        if (Array.isArray(part.header) && part.header.length) {
          var header = element("div", "reading-passage-header en");
          part.header.forEach(function (line) { header.appendChild(element("p", "", line)); });
          container.appendChild(header);
        }
        var body = element("div", "reading-sentences en");
        (part.sentences || []).forEach(function (line) { body.appendChild(element("p", "practice-sentence", line.en)); });
        container.appendChild(body);
      });
      return box;
    }

    function noteLink(ruleId) {
      var topic = topicById[ruleId];
      if (!topic) return null;
      var link = element("a", "grammar-note-link", "📘 " + topic.title + " 노트 보기");
      link.href = "grammar.html#grammar-note-" + ruleId;
      return link;
    }

    // 결과 화면에서 Part 6 빈칸 앞뒤 문맥을 짧게 보여준다.
    function part6Context(set, blankN) {
      var index = set.blocks.findIndex(function (block) { return block.type === "blank" && block.n === blankN; });
      var before = index > 0 && set.blocks[index - 1].type === "text" ? set.blocks[index - 1].en : "";
      var after = index >= 0 && index + 1 < set.blocks.length && set.blocks[index + 1].type === "text" ? set.blocks[index + 1].en : "";
      before = before.length > 70 ? "…" + before.slice(-70) : before;
      after = after.length > 70 ? after.slice(0, 70) + "…" : after;
      return (before + "______" + after).trim();
    }

    function questionTitle(item) {
      if (item.part === "p6") return item.group.set.title + " · 빈칸 (" + item.number + ")";
      return item.prompt;
    }

    // ---------- 미니 모의고사 ----------

    // 시작 화면에 보여준 문항 구성 그대로 시험을 시작하려고, 시작 화면에서 만든 시험을 보관한다.
    var preparedItems = null;

    function backToModes() {
      return button("button button-quiet practice-back", "← 모드 선택", renderModeSelect);
    }

    // 모의고사 탭 첫 화면: 미니 모의고사와 RC 풀세트 중 고른다.
    function renderModeSelect() {
      preparedItems = null;
      var list = element("div", "practice-mode-list");
      var mini = element("article", "panel practice-mode-card");
      mini.dataset.mode = "mini";
      mini.append(
        element("h3", "", "미니 모의고사"),
        element("p", "practice-mode-meta", "30~31문항 · " + Math.round(MODES.mini.seconds / 60) + "분"),
        element("p", "", "Part 5 " + EXAM.p5 + "문항 + Part 6 " + EXAM.p6 + "문항 + Part 7 " + PART7_TARGETS.join("~") + "문항 (지문 2~3개)"),
        element("p", "", "가볍게 자주 풀기 좋아요."),
        button("button button-primary", "미니 모의고사 선택", renderMockIntro)
      );
      var full = element("article", "panel practice-mode-card");
      full.dataset.mode = "full";
      full.append(
        element("h3", "", "RC 풀세트"),
        element("p", "practice-mode-meta", FULL_SET.total + "문항 · " + Math.round(MODES.full.seconds / 60) + "분"),
        element("p", "", "실제 토익 RC와 같은 구성(Part 5·6·7)"),
        element("p", "", "Part 5 30문항 · Part 6 16문항 · Part 7 54문항 (단일 29 · 이중 10 · 삼중 15)"),
        element("p", "", "실전 점검용이에요. 중간에 끊겨도 이어서 풀 수 있어요.")
      );
      var saved = readFullSave();
      if (saved) {
        full.appendChild(element("p", "practice-mode-saved", "진행 중인 세트가 있어요 · 푼 문제 " +
          saved.answers.filter(function (answer) { return answer !== null; }).length + " / " + FULL_SET.total +
          " · 남은 시간 " + formatTime(saved.remainingSec)));
      }
      full.appendChild(button("button button-primary", "RC 풀세트 선택", renderFullIntro));
      list.append(mini, full);
      mockStage.replaceChildren(list);
    }

    // 풀세트 첫 화면: 저장된 세트가 있으면 이어서 풀기 / 새로 시작을 고른다.
    // notice: 시험이 중단되어 이 화면으로 왔을 때 보여 줄 안내 (버튼 클릭으로 부르면 이벤트 객체가 오므로 문자열만 쓴다).
    function renderFullIntro(notice) {
      preparedItems = null;
      var saved = readFullSave();
      var intro = element("div", "panel practice-intro practice-full-intro");
      if (saved) {
        var answered = saved.answers.filter(function (answer) { return answer !== null; }).length;
        var message = typeof notice === "string" ? notice
          : saved.interrupted ? "시험이 중단되었습니다. 남은 시간 " + formatTime(saved.remainingSec) + "부터 이어서 풀 수 있습니다." : "";
        if (message) {
          var noticeBox = element("p", "practice-suspended-notice", message);
          noticeBox.setAttribute("role", "status");
          intro.appendChild(noticeBox);
        }
        intro.append(
          element("h3", "", "진행 중인 RC 풀세트가 있어요"),
          element("p", "", "푼 문제 " + answered + " / " + FULL_SET.total + " · 남은 시간 " + formatTime(saved.remainingSec) +
            " · 마지막으로 본 문제 " + (saved.index + 1) + "번"),
          element("p", "", "이어서 풀면 남은 시간부터 타이머가 다시 돌아요. 새로 시작하면 저장된 세트는 지워져요.")
        );
        var actions = element("div", "practice-result-actions");
        actions.append(
          button("button button-primary", "이어서 풀기", function () { launchExam(saved.items, MODES.full, saved); }),
          button("button button-quiet", "새로 시작", function () {
            if (typeof window.confirm === "function" && !window.confirm("저장된 세트를 지우고 새로 시작할까요?")) return;
            clearFullSave();
            renderFullIntro();
          })
        );
        intro.appendChild(actions);
        intro.appendChild(backToModes());
        mockStage.replaceChildren(intro);
        return;
      }
      var built;
      try {
        built = buildFullSet();
      } catch (error) {
        console.error("RC 풀세트를 만들 수 없습니다: " + error.message, error);
        var failure = element("div", "panel practice-intro practice-full-error");
        failure.setAttribute("role", "alert");
        failure.append(element("h3", "", "RC 풀세트를 만들 수 없어요"), element("p", "", error.message), backToModes());
        mockStage.replaceChildren(failure);
        return;
      }
      intro.append(
        element("h3", "", "RC 풀세트 · " + FULL_SET.total + "문항 · " + Math.round(MODES.full.seconds / 60) + "분"),
        element("p", "", "Part 5 1~30번 → Part 6 31~46번 → Part 7 단일 47~75번 → 이중 76~85번 → 삼중 86~100번, 실제 시험 순서대로 풀어요."),
        element("p", "", "중간에는 정답·어휘·해석을 보여주지 않아요. 10분, 5분 남았을 때 알려 드리고, 시간이 끝나면 자동으로 제출돼요."),
        element("p", "", "답을 고르거나 문제를 옮길 때마다 저장돼요. 중간에 끊겨도 실전 탭에서 이어서 풀 수 있어요.")
      );
      intro.appendChild(button("button button-primary", "풀세트 시작", function () {
        launchExam(built.items, MODES.full, { plan: built.plan });
      }));
      intro.appendChild(backToModes());
      mockStage.replaceChildren(intro);
    }

    function renderMockIntro() {
      preparedItems = buildExam();
      var totals = partTotals(preparedItems);
      var total = totals.p5 + totals.p6 + totals.p7;
      var intro = element("div", "panel practice-intro");
      intro.append(
        element("h3", "", "RC 미니 모의고사 · " + total + "문항 · " + Math.round(EXAM.seconds / 60) + "분"),
        element("p", "", "Part 5 " + totals.p5 + "문항 + Part 6 " + totals.p6 + "문항 + Part 7 " + totals.p7 + "문항을 무작위로 출제해요."),
        element("p", "", "중간에는 정답을 보여주지 않아요. 다 풀고 제출하면 한 번에 채점하고, 시간이 끝나면 자동으로 제출돼요.")
      );
      intro.appendChild(button("button button-primary", "모의고사 시작", startExam));
      intro.appendChild(backToModes());
      mockStage.replaceChildren(intro);
    }

    function startExam() {
      var items = preparedItems || buildExam();
      preparedItems = null;
      if (!items.length) {
        mockStage.replaceChildren(element("div", "placeholder", "출제할 문제가 없어요."));
        return;
      }
      launchExam(items, MODES.mini, null);
    }

    // 두 모드 공용 시험 화면. saved가 있으면(풀세트 이어서 풀기) 저장된 답·남은 시간·위치에서 시작한다.
    // 미니 모의고사는 기존처럼 시계 기준(endsAt)으로, 풀세트는 저장된 남은 시간을 기준으로 초를 깎는다.
    function launchExam(items, config, saved) {
      stopTimer();
      var now = Date.now();
      var resumed = !!(saved && saved.answers);
      exam = {
        items: items,
        config: config,
        plan: saved ? saved.plan : null,
        answers: resumed ? saved.answers.slice() : items.map(function () { return null; }),
        index: resumed ? saved.index : 0,
        startedAt: resumed ? saved.startedAt : now,
        endsAt: now + config.seconds * 1000,
        remainingSec: resumed ? saved.remainingSec : config.seconds,
        lastTick: now,
        hiddenAt: null,
        remainingAtHide: null,
        ticksSinceSave: 0,
        alertTicks: 0,
        timerHandle: null,
        submitted: false
      };
      mockStage.replaceChildren();
      exam.timerBar = element("div", "practice-timer-bar");
      exam.timerBar.setAttribute("role", "timer");
      exam.timeOutput = element("strong", "practice-time", formatTime(exam.remainingSec));
      exam.progressOutput = element("span", "practice-progress", "");
      var timeLabel = element("span", "practice-time-label", "남은 시간");
      var timeGroup = element("div", "practice-time-group");
      timeGroup.append(timeLabel, exam.timeOutput);
      exam.timerBar.append(timeGroup, exam.progressOutput);
      exam.timeAlert = element("p", "practice-time-alert");
      exam.timeAlert.setAttribute("role", "alert");
      exam.timeAlert.hidden = true;
      exam.timerBar.appendChild(exam.timeAlert);

      var layout = element("div", "practice-exam-layout");
      exam.questionArea = element("section", "panel practice-question-area");
      exam.questionArea.setAttribute("aria-live", "polite");
      exam.omr = element("aside", "panel practice-omr" + (config.mode === "full" ? " is-full" : ""));
      exam.omr.setAttribute("aria-label", "OMR 답안지");
      layout.append(exam.questionArea, exam.omr);
      mockStage.append(exam.timerBar, layout);

      renderExamQuestion();
      renderOmr();
      updateTimer();
      exam.ticksSinceSave = 0; // 10초 저장 주기는 실제 1초 틱부터 센다
      writeFullSave();
      exam.timerHandle = window.setInterval(updateTimer, 1000);
    }

    function stopTimer() {
      if (exam && exam.timerHandle !== null) {
        window.clearInterval(exam.timerHandle);
        exam.timerHandle = null;
      }
    }

    function remainingSeconds() {
      if (exam.config.mode === "full") return Math.max(0, Math.ceil(exam.remainingSec));
      return Math.max(0, Math.ceil((exam.endsAt - Date.now()) / 1000));
    }

    // 풀세트: 지난 틱 이후 흐른 실제 시간만큼 깎는다. 틱 사이가 2분을 넘으면(화면 숨김 알림 없이
    // 브라우저가 멈췄다 깨어난 경우) 그 직전 남은 시간으로 중단 처리한다. 중단했으면 true.
    function tickFullSet() {
      var now = Date.now();
      var delta = (now - exam.lastTick) / 1000;
      exam.lastTick = now;
      if (exam.hiddenAt !== null) return false; // 숨겨진 동안은 돌아왔을 때 한꺼번에 계산한다
      if (delta > FULL_AWAY_LIMIT_SEC) {
        suspendFullSet(exam.remainingSec);
        return true;
      }
      if (delta > 0) exam.remainingSec = Math.max(0, exam.remainingSec - delta);
      return false;
    }

    // 2분 넘게 떠났다 돌아옴: 떠나기 직전의 남은 시간으로 저장하고 이어서 풀기 화면으로 보낸다.
    function suspendFullSet(remaining) {
      exam.remainingSec = remaining;
      writeFullSave();
      stopTimer();
      exam = null;
      renderFullIntro("시험이 중단되었습니다. 남은 시간 " + formatTime(remaining) + "부터 이어서 풀 수 있습니다.");
    }

    function handleVisibilityChange() {
      if (!exam || exam.submitted || exam.config.mode !== "full") return;
      if (document.hidden) {
        exam.hiddenAt = Date.now();
        exam.remainingAtHide = exam.remainingSec;
        writeFullSave();
        return;
      }
      if (exam.hiddenAt === null) return;
      var away = (Date.now() - exam.hiddenAt) / 1000;
      exam.hiddenAt = null;
      exam.lastTick = Date.now();
      if (away > FULL_AWAY_LIMIT_SEC) {
        suspendFullSet(exam.remainingAtHide);
        return;
      }
      exam.remainingSec = Math.max(0, exam.remainingAtHide - Math.max(0, away)); // 짧은 이탈은 그대로 깎는다
      writeFullSave();
      updateTimer();
    }

    function showTimeAlert(text) {
      exam.timeAlert.textContent = text;
      exam.timeAlert.hidden = false;
      exam.timerBar.classList.add("has-alert");
      exam.alertTicks = 20; // 20초 동안 보여 준다
    }

    function updateTimer() {
      if (!exam || exam.submitted) return;
      var config = exam.config;
      var before = remainingSeconds();
      if (config.mode === "full" && tickFullSet()) return;
      var remaining = remainingSeconds();
      exam.timeOutput.textContent = formatTime(remaining);
      exam.timerBar.classList.toggle("is-warning", remaining <= config.warnSec && remaining > config.dangerSec);
      exam.timerBar.classList.toggle("is-danger", remaining <= config.dangerSec);
      // 10분·5분 남은 순간을 지날 때 한 번씩 알린다 (이어서 풀기로 이미 지난 경계는 다시 알리지 않는다).
      config.alerts.forEach(function (threshold) {
        if (before > threshold && remaining <= threshold) showTimeAlert("⏰ 남은 시간 " + Math.round(threshold / 60) + "분");
      });
      if (exam.alertTicks > 0) {
        exam.alertTicks -= 1;
        if (exam.alertTicks === 0) {
          exam.timeAlert.hidden = true;
          exam.timerBar.classList.remove("has-alert");
        }
      }
      var answered = exam.answers.filter(function (answer) { return answer !== null; }).length;
      exam.progressOutput.textContent = "푼 문제 " + answered + " / " + exam.items.length;
      if (config.mode === "full") {
        exam.ticksSinceSave += 1;
        if (exam.ticksSinceSave >= FULL_SAVE_EVERY_TICKS) {
          exam.ticksSinceSave = 0;
          writeFullSave();
        }
      }
      if (remaining <= 0) submitExam(true);
    }

    function goTo(index) {
      if (!exam || exam.submitted) return;
      exam.index = Math.min(exam.items.length - 1, Math.max(0, index));
      renderExamQuestion();
      renderOmr();
      writeFullSave();
      if (exam.heading && exam.heading.focus) exam.heading.focus({ preventScroll: true });
    }

    function renderExamQuestion() {
      var item = exam.items[exam.index];
      var area = exam.questionArea;
      area.replaceChildren();
      area.appendChild(element("p", "practice-question-meta", SECTION_LABELS[item.section || item.part] + " · " + item.number + " / " + exam.items.length));
      if (item.part === "p6") area.appendChild(renderPart6Text(item.group.set, item.group.numbers, item.blank));
      if (item.part === "p7") area.appendChild(renderPart7Text(item.group.passage));
      var heading = element("h3", "practice-question-prompt" + (item.part === "p6" ? "" : " en"),
        item.part === "p6" ? item.number + ". 빈칸 (" + item.number + ")에 알맞은 것은?" : item.number + ". " + item.prompt);
      heading.tabIndex = -1;
      exam.heading = heading;
      area.appendChild(heading);

      var choices = element("div", "quiz-options practice-choices");
      item.choices.forEach(function (choice, choiceIndex) {
        var option = button("quiz-option en", "(" + letter(choiceIndex) + ") " + choice, function () {
          exam.answers[exam.index] = choiceIndex;
          renderExamQuestion();
          renderOmr();
          writeFullSave();
          var answered = exam.answers.filter(function (answer) { return answer !== null; }).length;
          exam.progressOutput.textContent = "푼 문제 " + answered + " / " + exam.items.length;
        });
        var selected = exam.answers[exam.index] === choiceIndex;
        if (selected) option.classList.add("is-selected");
        option.setAttribute("aria-pressed", String(selected));
        choices.appendChild(option);
      });
      area.appendChild(choices);

      var nav = element("div", "practice-nav-row");
      var previous = button("button button-quiet", "← 이전", function () { goTo(exam.index - 1); });
      previous.disabled = exam.index === 0;
      var next = button("button button-quiet", "다음 →", function () { goTo(exam.index + 1); });
      next.disabled = exam.index === exam.items.length - 1;
      var submit = button("button button-primary practice-submit", "제출", function () { submitExam(false); });
      nav.append(previous, next, submit);
      area.appendChild(nav);
    }

    function renderOmr() {
      var omr = exam.omr;
      omr.replaceChildren(element("h3", "practice-omr-title", "답안지"));
      // 풀세트는 파트 경계(30/46/75/85)마다 구획을 나누고 번호 범위를 붙인다. 지금 문제가 든 구획은 강조한다.
      var full = exam.config.mode === "full";
      var current = exam.items[exam.index];
      ["p5", "p6", "p7", "p7s", "p7d", "p7t"].forEach(function (part) {
        var entries = exam.items.filter(function (item) { return (item.section || item.part) === part; });
        if (!entries.length) return;
        var section = element("div", "practice-omr-section");
        section.dataset.section = part;
        var label = SECTION_LABELS[part] + (full ? " · " + entries[0].number + "~" + entries[entries.length - 1].number + "번" : "");
        if (full && (current.section || current.part) === part) {
          section.classList.add("is-current-section");
          label += " (지금)";
        }
        section.appendChild(element("p", "practice-omr-part", label));
        var grid = element("div", "practice-omr-grid");
        entries.forEach(function (item) {
          var index = item.number - 1;
          var answer = exam.answers[index];
          var cell = button("practice-omr-cell", "", function () { goTo(index); });
          cell.append(
            element("span", "practice-omr-number", String(item.number)),
            element("span", "practice-omr-mark", answer === null ? "·" : letter(answer))
          );
          if (answer !== null) cell.classList.add("is-answered");
          if (index === exam.index) {
            cell.classList.add("is-current");
            cell.setAttribute("aria-current", "step");
          }
          cell.setAttribute("aria-label", item.number + "번" + (answer === null ? " 안 풂" : " 답 " + letter(answer)));
          grid.appendChild(cell);
        });
        section.appendChild(grid);
        omr.appendChild(section);
      });
    }

    function submitExam(auto) {
      if (!exam || exam.submitted) return;
      var unanswered = exam.answers.filter(function (answer) { return answer === null; }).length;
      if (!auto && unanswered && typeof window.confirm === "function" &&
          !window.confirm("아직 안 푼 문제가 " + unanswered + "개 있어요. 제출할까요?")) {
        return;
      }
      exam.submitted = true;
      stopTimer();
      if (exam.config.mode === "full") clearFullSave();
      // 풀세트는 실제로 깎인 시간(제한 - 남은 시간)으로, 미니 모의고사는 기존처럼 시작 시각부터 잰다.
      var elapsedSec = exam.config.mode === "full"
        ? Math.round(exam.config.seconds - exam.remainingSec)
        : Math.min(exam.config.seconds, Math.round((Date.now() - exam.startedAt) / 1000));
      var timedOut = auto === true;
      var scores = { p5: 0, p6: 0, p7: 0 };
      var totals = partTotals(exam.items);
      var ruleAnswers = [];
      var misses = [];
      var correct = 0;
      exam.items.forEach(function (item, index) {
        var answer = exam.answers[index];
        var isCorrect = answer === item.answer;
        if (isCorrect) {
          correct += 1;
          scores[item.part] += 1;
        } else {
          misses.push({ item: item, answer: answer });
        }
        // 고른 답이 있는 문항만 문법 유형 통계에 반영한다 (시간 부족으로 비운 문항은 제외).
        if (item.ruleId && answer !== null) ruleAnswers.push({ ruleId: item.ruleId, correct: isCorrect });
      });
      var result = {
        correct: correct, total: exam.items.length, elapsedSec: elapsedSec, timedOut: timedOut,
        partScores: scores, partTotals: totals, ruleAnswers: ruleAnswers
      };
      if (exam.config.mode === "full") {
        // 풀세트는 미니 모의고사 기록(practiceStats)과 따로 보관한다. 문법 유형 통계(grammarStats)에는 똑같이 반영한다.
        result.score = fullSetScore(correct);
        result.analysis = analyzeFullSet(exam.items, exam.answers);
        ruleAnswers.forEach(function (entry) {
          try {
            window.Progress.recordGrammarAnswer(entry.ruleId, entry.correct);
          } catch (error) {
            console.warn("문법 기록을 저장하지 못했습니다.", error);
          }
        });
        recordFullHistory(result);
      } else {
        try {
          window.Progress.recordPracticeAttempt(result);
        } catch (error) {
          console.warn("모의고사 기록을 저장하지 못했습니다.", error);
        }
      }
      renderResult(result, misses);
      renderHistory();
    }

    function scoreBand(correct, total) {
      var scaled = total === 30 ? correct : Math.round(correct / total * 30);
      return SCORE_BANDS.find(function (band) { return scaled >= band.min && scaled <= band.max; }) || SCORE_BANDS[0];
    }

    function renderResult(result, misses) {
      var config = exam.config;
      var card = element("section", "panel practice-result");
      card.setAttribute("aria-live", "polite");
      card.append(
        element("p", "eyebrow", config.mode === "full" ? "RC FULL SET RESULT" : "MOCK TEST RESULT"),
        element("h3", "practice-result-score", "총점 " + result.correct + " / " + result.total),
        element("p", "practice-result-rate", "정답률 " + percent(result.correct, result.total) + "%")
      );
      if (config.mode === "full") {
        renderFullResult(card, result, misses, config);
        return;
      }

      var band = element("div", "practice-band");
      band.append(
        element("p", "practice-band-label", "RC 예상 점수대 (참고용)"),
        element("strong", "practice-band-value", scoreBand(result.correct, result.total).label),
        element("p", "practice-band-note", "실제 토익 점수와 다를 수 있는 참고용 추정치입니다.")
      );
      card.appendChild(band);

      var parts = element("div", "practice-part-scores");
      ["p5", "p6", "p7"].forEach(function (part) {
        if (!result.partTotals[part]) return;
        var cell = element("div", "practice-part-score");
        cell.append(
          element("span", "", PART_LABELS[part]),
          element("strong", "", result.partScores[part] + " / " + result.partTotals[part])
        );
        parts.appendChild(cell);
      });
      card.appendChild(parts);

      card.appendChild(element("p", "practice-result-time" + (result.timedOut ? " is-timeout" : ""),
        "소요 시간 " + formatTime(result.elapsedSec) + " / 제한 " + formatTime(exam.config.seconds) + " · " +
        (result.timedOut ? "시간 초과로 자동 제출됐어요." : "제한 시간 안에 제출했어요.")));

      var missSection = element("section", "grammar-result-misses");
      missSection.appendChild(element("h4", "", misses.length ? "틀린 문제 " + misses.length + "개" : "틀린 문제가 없어요. 완벽해요!"));
      misses.forEach(function (miss) {
        var item = miss.item;
        var entry = element("article", "grammar-result-miss practice-miss");
        entry.appendChild(element("p", "practice-miss-meta", item.number + "번 · " + SECTION_LABELS[item.section || item.part] +
          (item.part === "p7" ? " · " + item.group.passage.title : "")));
        entry.appendChild(element("p", "practice-miss-question en", questionTitle(item)));
        if (item.part === "p6") entry.appendChild(element("p", "practice-miss-context en", part6Context(item.group.set, item.blank)));
        entry.append(
          element("p", "practice-miss-answer", "내 답: " + (miss.answer === null ? "미응답" : "(" + letter(miss.answer) + ") " + item.choices[miss.answer])),
          element("p", "practice-miss-answer is-correct", "정답: (" + letter(item.answer) + ") " + item.choices[item.answer]),
          element("p", "", item.explanation)
        );
        var link = item.ruleId ? noteLink(item.ruleId) : null;
        if (link) entry.appendChild(link);
        missSection.appendChild(entry);
      });
      card.appendChild(missSection);

      var actions = element("div", "practice-result-actions");
      actions.append(
        button("button button-primary", "다시 응시", startExam),
        button("button button-quiet", "기록 보기", function () { showTab("history"); }),
        button("button button-quiet", "모드 선택", renderModeSelect)
      );
      card.appendChild(actions);
      mockStage.replaceChildren(card);
      if (card.scrollIntoView) card.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // ---------- RC 풀세트 채점 화면 ----------

    // 막대 한 줄: 이름 · 막대 · "맞은 개수 / 문항 수 (NN%)"
    function statRow(label, stat, extra) {
      var row = element("div", "practice-stat-row");
      row.dataset.id = stat.id;
      row.dataset.correct = String(stat.correct);
      row.dataset.total = String(stat.total);
      var bar = element("span", "practice-stat-bar");
      var fill = element("span", "practice-stat-fill");
      fill.setAttribute("style", "width: " + (stat.total ? stat.percent : 0) + "%");
      bar.appendChild(fill);
      row.append(
        element("span", "practice-stat-label", label),
        bar,
        element("span", "practice-stat-value", stat.total ? stat.correct + " / " + stat.total + " (" + stat.percent + "%)" : "출제 없음")
      );
      if (extra) row.appendChild(extra);
      return row;
    }

    function statSection(className, title, note) {
      var section = element("section", "practice-analysis " + className);
      section.appendChild(element("h4", "", title));
      if (note) section.appendChild(element("p", "practice-analysis-note", note));
      return section;
    }

    function strategyLink(strategyId) {
      var strategy = (window.READING_STRATEGY || []).find(function (entry) { return entry.id === strategyId; });
      if (!strategy) return null;
      var link = element("a", "grammar-note-link", "📗 " + strategy.title + " 전략 보기");
      link.href = "reading.html#reading-strategy-" + strategyId;
      return link;
    }

    var lastFullResult = null; // 오답 복습에서 채점 화면으로 돌아올 때 쓴다

    function renderFullResult(card, result, misses, config) {
      lastFullResult = { result: result, misses: misses, config: config };
      var analysis = result.analysis;
      var score = element("div", "practice-band practice-full-score");
      score.append(
        element("strong", "practice-band-value", "예상 RC 점수 약 " + result.score + "점"),
        element("p", "practice-band-note", "실제 시험은 회차마다 난이도 보정이 달라 ±25점 정도 차이가 날 수 있습니다")
      );
      card.appendChild(score);
      card.appendChild(element("p", "practice-result-time" + (result.timedOut ? " is-timeout" : ""),
        "소요 시간 " + formatTime(result.elapsedSec) + " / 제한 " + formatTime(config.seconds) + " · " +
        (result.timedOut ? "시간 초과로 자동 제출됐어요." : "제한 시간 안에 제출했어요.")));

      // (a) 파트별 정답률
      var sections = statSection("practice-analysis-sections", "파트별 정답률");
      analysis.sections.forEach(function (stat) { sections.appendChild(statRow(SECTION_LABELS[stat.id], stat)); });
      card.appendChild(sections);

      // (b) Part 5 약한 문법 유형 (이번 시험 기준, 낮은 순 3개)
      var rules = statSection("practice-analysis-rules", "Part 5 약한 문법 유형", "이번 시험에서 정답률이 낮은 순서예요. 노트로 바로 복습할 수 있어요.");
      analysis.weakRules.forEach(function (stat) {
        var topic = topicById[stat.id];
        rules.appendChild(statRow(topic ? topic.title : stat.id, stat, noteLink(stat.id)));
      });
      card.appendChild(rules);

      // (c) Part 6 유형별 정답률
      var p6 = statSection("practice-analysis-p6", "Part 6 유형별 정답률");
      analysis.p6Types.forEach(function (stat) { p6.appendChild(statRow(PART6_TYPE_LABELS[stat.id], stat)); });
      card.appendChild(p6);

      // (d) Part 7 약한 지문 유형 (독해 전략별, 낮은 순)
      var p7 = statSection("practice-analysis-p7", "Part 7 지문 유형별 정답률", "정답률이 낮은 순서예요.");
      analysis.strategies.forEach(function (stat) {
        var strategy = (window.READING_STRATEGY || []).find(function (entry) { return entry.id === stat.id; });
        p7.appendChild(statRow(strategy ? strategy.title : stat.id, stat, strategyLink(stat.id)));
      });
      card.appendChild(p7);

      var actions = element("div", "practice-result-actions");
      var review = button("button button-primary", misses.length ? "오답 복습 (" + misses.length + "문항)" : "오답 없음", function () { renderFullReview(); });
      review.disabled = !misses.length;
      actions.append(
        review,
        button("button button-quiet", "다시 응시", renderFullIntro),
        button("button button-quiet", "기록 보기", function () { showTab("history"); }),
        button("button button-quiet", "모드 선택", renderModeSelect)
      );
      card.appendChild(actions);
      mockStage.replaceChildren(card);
      if (card.scrollIntoView) card.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // ---------- RC 풀세트 오답 복습 ----------

    // 복습용 Part 7 지문: 문장마다 해석을 붙여 두고 토글로 연다.
    function renderPart7Review(passage) {
      var box = element("div", "practice-passage");
      box.appendChild(element("p", "reading-passage-type", passage.type + " · " + passage.title));
      var parts = Array.isArray(passage.parts) && passage.parts.length
        ? passage.parts
        : [{ header: passage.header, sentences: passage.sentences }];
      parts.forEach(function (part, partIndex) {
        var container = box;
        if (part.label) {
          container = element("section", "reading-passage-part");
          if (partIndex > 0) container.classList.add("has-divider");
          container.appendChild(element("p", "reading-part-label", part.label));
          box.appendChild(container);
        }
        if (Array.isArray(part.header) && part.header.length) {
          var header = element("div", "reading-passage-header en");
          part.header.forEach(function (line) { header.appendChild(element("p", "", line)); });
          container.appendChild(header);
        }
        var body = element("div", "reading-sentences");
        (part.sentences || []).forEach(function (line) {
          body.appendChild(element("p", "practice-sentence en", line.en));
          if (line.ko) {
            var ko = element("p", "practice-review-ko", line.ko);
            ko.hidden = true;
            body.appendChild(ko);
          }
        });
        container.appendChild(body);
      });
      return box;
    }

    function translationToggle(container) {
      var toggle = button("button button-quiet practice-review-translate", "📖 해석 보기", function () {
        var show = toggle.getAttribute("aria-expanded") !== "true";
        container.querySelectorAll(".practice-review-ko").forEach(function (node) { node.hidden = !show; });
        toggle.textContent = show ? "해석 숨기기" : "📖 해석 보기";
        toggle.setAttribute("aria-expanded", String(show));
      });
      toggle.setAttribute("aria-expanded", "false");
      return toggle;
    }

    function missDetail(miss) {
      var item = miss.item;
      var entry = element("div", "practice-review-miss");
      entry.dataset.number = String(item.number);
      entry.append(
        element("p", "practice-miss-meta", item.number + "번 · " + SECTION_LABELS[item.section || item.part]),
        element("p", "practice-miss-question" + (item.part === "p6" ? "" : " en"),
          item.part === "p6" ? "빈칸 (" + item.number + ")" : item.prompt),
        element("p", "practice-miss-answer", "내 답: " + (miss.answer === null ? "미응답" : "(" + letter(miss.answer) + ") " + item.choices[miss.answer])),
        element("p", "practice-miss-answer is-correct", "정답: (" + letter(item.answer) + ") " + item.choices[item.answer]),
        element("p", "practice-review-explanation", item.explanation)
      );
      var link = item.ruleId ? noteLink(item.ruleId) : null;
      if (link) entry.appendChild(link);
      return entry;
    }

    // 오답을 지문·세트 단위로 묶어 보여 준다. 같은 지문은 한 번만 싣는다.
    function renderFullReview() {
      if (!lastFullResult) return;
      var misses = lastFullResult.misses;
      var groups = [];
      var byKey = {};
      misses.forEach(function (miss) {
        var item = miss.item;
        var key = item.part === "p5" ? "p5:" + item.number : item.part === "p6" ? "p6:" + item.group.set.id : "p7:" + item.group.passage.id;
        if (!byKey[key]) {
          byKey[key] = { key: key, item: item, misses: [] };
          groups.push(byKey[key]);
        }
        byKey[key].misses.push(miss);
      });
      var view = element("section", "panel practice-review");
      view.append(
        element("p", "eyebrow", "WRONG ANSWER REVIEW"),
        element("h3", "", "오답 복습 · " + misses.length + "문항"),
        element("p", "practice-analysis-note", "지문은 한 번씩만 싣고, 그 지문에서 틀린 문항을 모아 보여 줘요. 이제 복습이니 해석과 어휘도 볼 수 있어요.")
      );
      var back = button("button button-quiet", "← 채점 결과로", function () {
        var card = element("section", "panel practice-result");
        card.append(
          element("p", "eyebrow", "RC FULL SET RESULT"),
          element("h3", "practice-result-score", "총점 " + lastFullResult.result.correct + " / " + lastFullResult.result.total),
          element("p", "practice-result-rate", "정답률 " + percent(lastFullResult.result.correct, lastFullResult.result.total) + "%")
        );
        renderFullResult(card, lastFullResult.result, lastFullResult.misses, lastFullResult.config);
      });
      view.appendChild(back);
      groups.forEach(function (group) {
        var item = group.item;
        var article = element("article", "practice-review-group");
        article.dataset.group = group.key;
        if (item.part === "p5") {
          article.appendChild(missDetail(group.misses[0]));
        } else if (item.part === "p6") {
          var set = item.group.set;
          article.appendChild(element("p", "practice-review-title", "Part 6 · " + set.title + " · 틀린 빈칸 " +
            group.misses.map(function (miss) { return "(" + miss.item.number + ")"; }).join(" ")));
          article.appendChild(renderPart6Text(set, item.group.numbers, null));
          var vocab6 = renderVocab(set.vocab);
          if (vocab6) article.appendChild(vocab6);
          if (set.ko) {
            var ko6 = element("p", "practice-review-ko practice-translation", set.ko);
            ko6.hidden = true;
            article.append(translationToggle(article), ko6);
          }
          group.misses.forEach(function (miss) { article.appendChild(missDetail(miss)); });
        } else {
          var passage = item.group.passage;
          article.appendChild(element("p", "practice-review-title", SECTION_LABELS[item.section || item.part] + " · " + passage.title + " · 틀린 문항 " +
            group.misses.map(function (miss) { return miss.item.number + "번"; }).join(", ")));
          article.appendChild(renderPart7Review(passage));
          var vocab7 = renderVocab(passage.vocab);
          if (vocab7) article.appendChild(vocab7);
          article.appendChild(translationToggle(article));
          group.misses.forEach(function (miss) { article.appendChild(missDetail(miss)); });
        }
        view.appendChild(article);
      });
      view.appendChild(button("button button-quiet", "← 채점 결과로", function () { back.click(); }));
      mockStage.replaceChildren(view);
      if (view.scrollIntoView) view.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // ---------- 파트별 연습 (즉시 채점) ----------

    function practiceQuestionCard(number, promptText, isEnglish, question) {
      var card = element("article", "panel practice-drill-card");
      card.appendChild(element("h4", "practice-question-prompt" + (isEnglish ? " en" : ""), number + ". " + promptText));
      var choices = element("div", "quiz-options practice-choices");
      var feedback = element("div", "practice-drill-feedback");
      feedback.setAttribute("aria-live", "polite");
      question.choices.forEach(function (choice, choiceIndex) {
        choices.appendChild(button("quiz-option en", "(" + letter(choiceIndex) + ") " + choice, function () {
          var isCorrect = choiceIndex === question.answer;
          Array.from(choices.children).forEach(function (option, optionIndex) {
            option.disabled = true;
            if (optionIndex === question.answer) option.classList.add("correct");
            else if (optionIndex === choiceIndex) option.classList.add("incorrect");
          });
          feedback.append(
            element("p", isCorrect ? "answer-right" : "answer-wrong",
              isCorrect ? "정답이에요!" : "정답: (" + letter(question.answer) + ") " + question.choices[question.answer]),
            element("p", "practice-drill-explanation", question.explanation)
          );
          if (question.ruleId) {
            var link = noteLink(question.ruleId);
            if (link) feedback.appendChild(link);
            try {
              window.Progress.recordGrammarAnswer(question.ruleId, isCorrect);
            } catch (error) {
              console.warn("문법 기록을 저장하지 못했습니다.", error);
            }
          }
        }));
      });
      card.append(choices, feedback);
      return card;
    }

    // 독해 탭 Part 7 지문과 같은 모양(같은 클래스)으로, 처음부터 보이게 그린다. 어휘가 없으면 아무것도 그리지 않는다.
    function renderVocab(vocab) {
      if (!Array.isArray(vocab) || !vocab.length) return null;
      var section = element("section", "reading-vocab-section");
      section.appendChild(element("h3", "", "핵심 어휘"));
      var list = element("ul", "reading-vocab-list");
      vocab.forEach(function (entry) {
        var item = element("li", "");
        item.append(element("span", "reading-vocab-word en", entry.w), element("span", "reading-vocab-meaning", entry.m));
        list.appendChild(item);
      });
      section.appendChild(list);
      return section;
    }

    function startPartPractice(part) {
      partStage.replaceChildren();
      var list = element("div", "practice-drill-list");
      if (part === "p5") {
        var questions = shuffle(grammarQuiz).slice(0, PART_PRACTICE_P5_COUNT);
        if (!questions.length) return partStage.replaceChildren(element("div", "placeholder", "출제할 문제가 없어요."));
        questions.forEach(function (question, index) {
          list.appendChild(practiceQuestionCard(index + 1, question.question, true, question));
        });
      } else if (part === "p6") {
        var set = shuffle(part6Sets)[0];
        if (!set) return partStage.replaceChildren(element("div", "placeholder", "출제할 세트가 없어요."));
        var passageCard = element("article", "panel practice-drill-passage");
        passageCard.append(element("p", "reading-passage-type", "Part 6 · " + set.title), renderPart6Text(set, null, null));
        var vocabSection = renderVocab(set.vocab);
        if (vocabSection) passageCard.appendChild(vocabSection);
        if (set.ko) {
          var translation = element("p", "practice-translation", set.ko);
          translation.hidden = true;
          var toggle = button("button button-quiet", "📖 해석 보기", function () {
            translation.hidden = !translation.hidden;
            toggle.textContent = translation.hidden ? "📖 해석 보기" : "해석 숨기기";
            toggle.setAttribute("aria-expanded", String(!translation.hidden));
          });
          toggle.setAttribute("aria-expanded", "false");
          passageCard.append(toggle, translation);
        }
        list.appendChild(passageCard);
        set.questions.forEach(function (question) {
          list.appendChild(practiceQuestionCard(question.n, "빈칸 (" + question.n + ")에 알맞은 것은?", false, question));
        });
      } else {
        var passage = shuffle(passages)[0];
        if (!passage) return partStage.replaceChildren(element("div", "placeholder", "출제할 지문이 없어요."));
        var card = element("article", "panel practice-drill-passage");
        card.appendChild(renderPart7Text(passage));
        var passageVocab = renderVocab(passage.vocab);
        if (passageVocab) card.appendChild(passageVocab);
        list.appendChild(card);
        passage.questions.forEach(function (question, index) {
          list.appendChild(practiceQuestionCard(index + 1, question.q, true, {
            choices: question.choices, answer: question.answer, explanation: question.explanation, ruleId: null
          }));
        });
      }
      var again = button("button button-primary", "새 문제로 다시", function () { startPartPractice(part); });
      partStage.append(list, again);
    }

    // ---------- 기록 ----------

    function formatDate(iso) {
      var date = new Date(iso);
      if (Number.isNaN(date.getTime())) return iso;
      return date.toLocaleDateString("sv-SE") + " " +
        String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0");
    }

    // RC 풀세트 기록: 점수 추이 막대 + 표 (최근 20회). 미니 모의고사 기록 아래에 따로 그린다.
    function renderFullHistory() {
      var history = readFullHistory();
      if (!history.length) return;
      var section = element("section", "panel practice-full-history");
      section.appendChild(element("h3", "", "RC 풀세트 기록 (최근 " + history.length + "회)"));
      section.appendChild(element("p", "practice-trend-note", "예상 RC 점수 추이 · 오래된 순 → 최신 순 (495점 만점)"));
      var chart = element("div", "practice-full-trend");
      chart.setAttribute("role", "img");
      chart.setAttribute("aria-label", "예상 RC 점수 추이: " + history.map(function (entry) { return entry.score + "점"; }).join(", "));
      history.forEach(function (entry) {
        var column = element("div", "practice-full-trend-col");
        var track = element("span", "practice-full-trend-track");
        var bar = element("span", "practice-full-trend-bar");
        bar.setAttribute("style", "height: " + Math.max(2, Math.round(entry.score / 495 * 100)) + "%");
        track.appendChild(bar);
        var date = new Date(entry.date);
        column.append(
          element("span", "practice-full-trend-score", String(entry.score)),
          track,
          element("span", "practice-full-trend-date", (date.getMonth() + 1) + "/" + date.getDate())
        );
        chart.appendChild(column);
      });
      section.appendChild(chart);

      var table = element("table", "practice-history-table practice-full-history-table");
      var head = element("thead");
      var headRow = element("tr");
      ["날짜", "점수", "맞은 개수", "소요 시간"].forEach(function (label) {
        var th = element("th", "", label);
        th.setAttribute("scope", "col");
        headRow.appendChild(th);
      });
      head.appendChild(headRow);
      var body = element("tbody");
      history.slice().reverse().forEach(function (entry) {
        var row = element("tr");
        [["날짜", formatDate(entry.date)], ["점수", "약 " + entry.score + "점"], ["맞은 개수", entry.correct + " / " + (entry.total || FULL_SET.total)],
          ["소요 시간", formatTime(entry.elapsedSec || 0) + (entry.timedOut ? " (시간 초과)" : "")]].forEach(function (cell) {
          var td = element("td", "", cell[1]);
          td.setAttribute("data-label", cell[0]);
          row.appendChild(td);
        });
        body.appendChild(row);
      });
      table.append(element("caption", "", "응시 이력 (" + history.length + "회)"), head, body);
      section.appendChild(table);
      historyRoot.appendChild(section);
    }

    function renderHistory() {
      // 이전 버전에서 미니 모의고사 기록에 섞여 들어간 풀세트(100문항) 응시는 미니 기록에서 뺀다.
      var attempts = window.Progress.getPracticeHistory().filter(function (attempt) { return attempt.total !== FULL_SET.total; });
      historyRoot.replaceChildren();
      if (!attempts.length) {
        historyRoot.appendChild(element("div", "placeholder", "아직 응시한 모의고사가 없어요. 미니 모의고사를 풀면 여기에 기록돼요."));
        renderFullHistory();
        return;
      }

      var trend = element("section", "panel practice-trend");
      trend.appendChild(element("h3", "", "파트별 정답률 추이"));
      trend.appendChild(element("p", "practice-trend-note", "최근 " + Math.min(10, attempts.length) + "회, 오래된 순 → 최신 순"));
      var recent = attempts.slice(-10);
      ["p5", "p6", "p7"].forEach(function (part) {
        var rates = recent.filter(function (attempt) { return attempt.partTotals[part] > 0; }).map(function (attempt) {
          return percent(attempt.partScores[part], attempt.partTotals[part]);
        });
        var row = element("div", "practice-trend-row");
        var average = rates.length ? Math.round(rates.reduce(function (sum, rate) { return sum + rate; }, 0) / rates.length) : null;
        row.append(
          element("span", "practice-trend-part", PART_LABELS[part]),
          element("span", "practice-trend-values en", rates.length ? rates.map(function (rate) { return rate + "%"; }).join(" → ") : "기록 없음"),
          element("span", "practice-trend-average", average === null ? "" : "평균 " + average + "%")
        );
        trend.appendChild(row);
      });
      historyRoot.appendChild(trend);

      var table = element("table", "practice-history-table");
      var caption = element("caption", "", "응시 이력 (" + attempts.length + "회)");
      var head = element("thead");
      var headRow = element("tr");
      ["날짜", "점수", "Part 5", "Part 6", "Part 7", "소요 시간"].forEach(function (label) {
        var th = element("th", "", label);
        th.setAttribute("scope", "col");
        headRow.appendChild(th);
      });
      head.appendChild(headRow);
      var body = element("tbody");
      attempts.slice().reverse().forEach(function (attempt) {
        var row = element("tr");
        var cells = [
          ["날짜", formatDate(attempt.date)],
          ["점수", attempt.correct + " / " + attempt.total + " (" + percent(attempt.correct, attempt.total) + "%)"]
        ];
        ["p5", "p6", "p7"].forEach(function (part) {
          cells.push([PART_LABELS[part], attempt.partTotals[part]
            ? attempt.partScores[part] + " / " + attempt.partTotals[part] : "—"]);
        });
        cells.push(["소요 시간", formatTime(attempt.elapsedSec) + (attempt.timedOut ? " (시간 초과)" : "")]);
        cells.forEach(function (cell) {
          var td = element("td", "", cell[1]);
          td.setAttribute("data-label", cell[0]);
          row.appendChild(td);
        });
        body.appendChild(row);
      });
      table.append(caption, head, body);
      historyRoot.appendChild(table);
      renderFullHistory();
    }

    // ---------- 탭 ----------

    function showTab(name) {
      ["mock", "parts", "history"].forEach(function (tabName) {
        var selected = name === tabName;
        var tab = document.getElementById("practice-tab-" + tabName);
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        document.getElementById("practice-panel-" + tabName).hidden = !selected;
      });
      if (name === "history") renderHistory();
    }

    document.querySelectorAll('[role="tab"][id^="practice-tab-"]').forEach(function (tab) {
      tab.addEventListener("click", function () { showTab(tab.id.replace("practice-tab-", "")); });
      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        var tabs = Array.from(document.querySelectorAll('[role="tab"][id^="practice-tab-"]'));
        var index = tabs.indexOf(tab);
        var next = tabs[(index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
        showTab(next.id.replace("practice-tab-", ""));
        next.focus();
      });
    });

    partForm.addEventListener("submit", function (event) {
      event.preventDefault();
      startPartPractice(partSelect.value);
    });

    window.addEventListener("beforeunload", function (event) {
      if (!exam || exam.submitted) return;
      // 풀세트는 저장해 두고 그냥 닫게 둔다 (다음에 이어서 풀기). 미니 모의고사만 기존처럼 경고한다.
      if (exam.config.mode === "full") {
        writeFullSave();
        return;
      }
      event.preventDefault();
      event.returnValue = "";
    });
    // 폰 잠김·다른 앱으로 전환·탭 닫기 직전에 남은 시간을 저장한다. 돌아오면 2분 규칙으로 처리한다.
    window.addEventListener("pagehide", writeFullSave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    renderModeSelect();
    renderHistory();
  });
}());
