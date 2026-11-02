(function () {
  "use strict";

  var reviewIntervals = [1, 4, 7, 14];
  var defaults = {
    studiedDates: [],
    vocabDay: 0,
    quizSolved: 0,
    quizCorrect: 0,
    vocabProgress: {},
    grammarStats: {
      g01: { solved: 0, correct: 0, lastDate: null },
      g02: { solved: 0, correct: 0, lastDate: null }
    },
    listeningStats: {
      dictation: { attempted: 0, wordAccuracy: [] },
      part2: { solved: 0, correct: 0 },
      part3: { solved: 0, correct: 0 }
    },
    planDone: {}
  };
  var navigation = [
    ["홈", "index.html", "home"],
    ["보카", "pages/vocab.html", "vocab"],
    ["독해", "pages/reading.html", "reading"],
    ["문법", "pages/grammar.html", "grammar"],
    ["리스닝", "pages/listening.html", "listening"],
    ["회화", "pages/speaking.html", "speaking"],
    ["오답노트", "pages/mistakes.html", "mistakes"],
    ["퀴즈", "pages/quiz.html", "quiz"],
    ["계획", "pages/plan.html", "plan"]
  ];

  function normalizeProgress(value) {
    var result = Object.assign({}, defaults, value && typeof value === "object" ? value : {});
    result.studiedDates = Array.isArray(result.studiedDates) ? result.studiedDates : [];
    result.planDone = result.planDone && typeof result.planDone === "object" ? result.planDone : {};
    var grammarStats = result.grammarStats && typeof result.grammarStats === "object" ? result.grammarStats : {};
    result.grammarStats = {};
    Object.keys(defaults.grammarStats).forEach(function (ruleId) {
      result.grammarStats[ruleId] = { solved: 0, correct: 0, lastDate: null };
    });
    Object.keys(grammarStats).forEach(function (ruleId) {
      var stats = grammarStats[ruleId];
      if (!stats || typeof stats !== "object") return;
      var solved = Math.max(0, Math.floor(Number(stats.solved) || 0));
      var correct = Math.min(solved, Math.max(0, Math.floor(Number(stats.correct) || 0)));
      var lastDate = typeof stats.lastDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(stats.lastDate) ? stats.lastDate : null;
      result.grammarStats[ruleId] = { solved: solved, correct: correct, lastDate: lastDate };
    });
    var listeningStats = result.listeningStats && typeof result.listeningStats === "object" ? result.listeningStats : {};
    var dictationStats = listeningStats.dictation && typeof listeningStats.dictation === "object" ? listeningStats.dictation : {};
    var part2Stats = listeningStats.part2 && typeof listeningStats.part2 === "object" ? listeningStats.part2 : {};
    var part3Stats = listeningStats.part3 && typeof listeningStats.part3 === "object" ? listeningStats.part3 : {};
    result.listeningStats = {
      dictation: {
        attempted: Math.max(0, Math.floor(Number(dictationStats.attempted) || 0)),
        wordAccuracy: Array.isArray(dictationStats.wordAccuracy)
          ? dictationStats.wordAccuracy.filter(function (accuracy) {
            return typeof accuracy === "number" && Number.isFinite(accuracy);
          }).map(function (accuracy) {
            return Math.min(1, Math.max(0, accuracy));
          })
          : []
      },
      part2: {
        solved: Math.max(0, Math.floor(Number(part2Stats.solved) || 0)),
        correct: Math.min(
          Math.max(0, Math.floor(Number(part2Stats.solved) || 0)),
          Math.max(0, Math.floor(Number(part2Stats.correct) || 0))
        )
      },
      part3: {
        solved: Math.max(0, Math.floor(Number(part3Stats.solved) || 0)),
        correct: Math.min(
          Math.max(0, Math.floor(Number(part3Stats.solved) || 0)),
          Math.max(0, Math.floor(Number(part3Stats.correct) || 0))
        )
      }
    };
    var vocabProgress = result.vocabProgress && typeof result.vocabProgress === "object" ? result.vocabProgress : {};
    result.vocabProgress = {};
    Object.keys(vocabProgress).forEach(function (wordId) {
      var status = vocabProgress[wordId];
      if (!status || typeof status !== "object") return;
      var stage = Math.min(4, Math.max(0, Math.floor(Number(status.stage) || 0)));
      var lastDate = typeof status.lastDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(status.lastDate) ? status.lastDate : "";
      var nextDue = typeof status.nextDue === "string" && /^\d{4}-\d{2}-\d{2}$/.test(status.nextDue) ? status.nextDue : "";
      if (!nextDue && stage < 4) {
        var interval = status.lastResult === "wrong" ? 1 : status.lastResult === "correct" ? reviewIntervals[Math.max(0, stage - 1)] : 0;
        nextDue = interval && lastDate ? addDays(lastDate, interval) : todayDate();
      }
      result.vocabProgress[wordId] = {
        stage: stage,
        lastResult: status.lastResult === "correct" || status.lastResult === "wrong" ? status.lastResult : "",
        lastDate: lastDate,
        nextDue: nextDue,
        wrongCount: Math.max(0, Math.floor(Number(status.wrongCount) || 0))
      };
    });
    result.vocabDay = Number.isFinite(Number(result.vocabDay)) ? Number(result.vocabDay) : 0;
    result.quizSolved = Number.isFinite(Number(result.quizSolved)) ? Number(result.quizSolved) : 0;
    result.quizCorrect = Number.isFinite(Number(result.quizCorrect)) ? Number(result.quizCorrect) : 0;
    return result;
  }

  function get() {
    var stored;
    try {
      stored = localStorage.getItem("englishLabProgress");
    } catch (error) {
      console.warn("학습 진도를 읽지 못했습니다.", error);
      return normalizeProgress(defaults);
    }
    if (!stored) return normalizeProgress(defaults);

    try {
      var parsed = JSON.parse(stored);
      var progress = normalizeProgress(parsed);
      if (JSON.stringify(parsed) !== JSON.stringify(progress)) {
        try {
          localStorage.setItem("englishLabProgress", JSON.stringify(progress));
        } catch (error) {
          console.warn("기존 학습 진도를 새 형식으로 저장하지 못했습니다.", error);
        }
      }
      return progress;
    } catch (error) {
      console.warn("학습 진도를 해석하지 못했습니다.", error);
      try {
        localStorage.removeItem("englishLabProgress");
      } catch (removeError) {
        console.warn("잘못된 학습 진도를 제거하지 못했습니다.", removeError);
      }
      return normalizeProgress(defaults);
    }
  }

  function set(values) {
    var updated = normalizeProgress(Object.assign({}, get(), values || {}));
    try {
      localStorage.setItem("englishLabProgress", JSON.stringify(updated));
    } catch (error) {
      console.warn("학습 진도를 저장하지 못했습니다.", error);
    }
    return updated;
  }

  function dateKey(date) {
    return date.toLocaleDateString("sv-SE");
  }

  function todayDate() {
    return dateKey(new Date());
  }

  function addDays(dateString, days) {
    var parts = dateString.split("-").map(Number);
    var date = new Date(parts[0], parts[1] - 1, parts[2]);
    date.setDate(date.getDate() + days);
    return dateKey(date);
  }

  function wordStatuses(filter) {
    var progress = get();
    return Object.keys(progress.vocabProgress).map(function (wordId) {
      return Object.assign({ wordId: wordId }, progress.vocabProgress[wordId]);
    }).filter(filter);
  }

  function getDueWords() {
    var today = todayDate();
    return wordStatuses(function (status) {
      return status.stage < 4 && status.nextDue && status.nextDue <= today;
    });
  }

  function getWeakWords() {
    return wordStatuses(function (status) {
      return status.wrongCount > 0 && status.stage < 4;
    });
  }

  function getGraduated() {
    return wordStatuses(function (status) { return status.stage === 4; });
  }

  function markToday() {
    var progress = get();
    var today = dateKey(new Date());
    if (!progress.studiedDates.includes(today)) {
      progress.studiedDates.push(today);
      progress.studiedDates.sort();
      set({ studiedDates: progress.studiedDates });
    }
    return progress.studiedDates;
  }

  function streak() {
    var dates = get().studiedDates;
    var count = 0;
    var cursor = new Date();
    var today = dateKey(cursor);
    if (!dates.includes(today)) cursor.setDate(cursor.getDate() - 1);
    while (dates.includes(dateKey(cursor))) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  }

  function recordVocabAnswer(wordId, isCorrect) {
    var progress = get();
    var previous = progress.vocabProgress[wordId] || { stage: 0, wrongCount: 0 };
    var previousStage = Math.min(4, Math.max(0, Number(previous.stage) || 0));
    var today = todayDate();
    var stage = isCorrect ? Math.min(4, previousStage + 1) : 0;
    var result = {
      stage: stage,
      lastResult: isCorrect ? "correct" : "wrong",
      lastDate: today,
      nextDue: isCorrect ? (previousStage < 4 ? addDays(today, reviewIntervals[previousStage]) : "") : addDays(today, 1),
      wrongCount: Number(previous.wrongCount) + (isCorrect ? 0 : 1)
    };
    progress.vocabProgress[wordId] = result;
    progress.quizSolved += 1;
    if (isCorrect) progress.quizCorrect += 1;
    if (!progress.studiedDates.includes(today)) progress.studiedDates.push(today);
    progress.studiedDates.sort();
    set(progress);
    return result;
  }

  function recordGrammarAnswer(ruleId, isCorrect) {
    if (typeof ruleId !== "string" || !ruleId.trim()) {
      throw new TypeError("문법 유형 ID가 필요합니다.");
    }
    var progress = get();
    var stats = progress.grammarStats[ruleId] || { solved: 0, correct: 0, lastDate: null };
    var updated = {
      solved: stats.solved + 1,
      correct: stats.correct + (isCorrect ? 1 : 0),
      lastDate: todayDate()
    };
    progress.grammarStats[ruleId] = updated;
    set({ grammarStats: progress.grammarStats });
    return updated;
  }

  function getGrammarStats() {
    var stats = get().grammarStats;
    var result = {};
    Object.keys(stats).forEach(function (ruleId) {
      var entry = stats[ruleId];
      result[ruleId] = {
        solved: entry.solved,
        correct: entry.correct,
        accuracy: entry.solved ? Math.round(entry.correct / entry.solved * 100) : null,
        lastDate: entry.lastDate
      };
    });
    return result;
  }

  function getWeakRules(count) {
    var limit = count === undefined ? 5 : Math.max(0, Math.floor(Number(count) || 0));
    var stats = getGrammarStats();
    return Object.keys(stats).map(function (ruleId) {
      return Object.assign({ ruleId: ruleId }, stats[ruleId]);
    }).filter(function (stats) {
      return stats.solved >= 5;
    }).sort(function (a, b) {
      return a.accuracy - b.accuracy || a.ruleId.localeCompare(b.ruleId);
    }).slice(0, limit);
  }

  function recordDictation(accuracy) {
    if (typeof accuracy !== "number" || !Number.isFinite(accuracy)) {
      throw new TypeError("받아쓰기 정답률은 유한한 숫자여야 합니다.");
    }
    var progress = get();
    var stats = progress.listeningStats.dictation;
    stats.attempted += 1;
    stats.wordAccuracy.push(Math.min(1, Math.max(0, accuracy)));
    set({ listeningStats: progress.listeningStats });
    return stats;
  }

  function recordListeningAnswer(type, isCorrect) {
    if (type !== "part2" && type !== "part3") {
      throw new TypeError("리스닝 문제 유형은 part2 또는 part3이어야 합니다.");
    }
    if (typeof isCorrect !== "boolean") {
      throw new TypeError("정답 여부는 boolean 값이어야 합니다.");
    }
    var progress = get();
    var stats = progress.listeningStats[type];
    stats.solved += 1;
    if (isCorrect) stats.correct += 1;
    set({ listeningStats: progress.listeningStats });
    return stats;
  }

  window.Progress = {
    get: get,
    set: set,
    markToday: markToday,
    streak: streak,
    recordVocabAnswer: recordVocabAnswer,
    recordGrammarAnswer: recordGrammarAnswer,
    getGrammarStats: getGrammarStats,
    getWeakRules: getWeakRules,
    recordDictation: recordDictation,
    recordListeningAnswer: recordListeningAnswer,
    getDueWords: getDueWords,
    getWeakWords: getWeakWords,
    getGraduated: getGraduated
  };

  function currentPage() {
    var path = window.location.pathname.toLowerCase();
    var filename = path.substring(path.lastIndexOf("/") + 1) || "index.html";
    return filename === "index.html" ? "home" : filename.replace(".html", "");
  }

  function renderChrome() {
    var inPages = /\/pages\/[^/]*$/i.test(window.location.pathname);
    var base = inPages ? "../" : "";
    var page = currentPage();
    var header = document.getElementById("site-header");
    var footer = document.getElementById("site-footer");
    if (header) {
      header.innerHTML =
        '<header class="site-header"><div class="header-inner">' +
        '<a class="brand" href="' + base + 'index.html" aria-label="English Lab 홈"><span class="brand-mark">E</span><span>English Lab</span></a>' +
        '<nav class="site-nav" aria-label="주요 메뉴">' +
        navigation.map(function (item) {
          return '<a href="' + base + item[1] + '" class="nav-link"' + (page === item[2] ? ' aria-current="page"' : "") + '>' + item[0] + "</a>";
        }).join("") +
        '</nav><button class="theme-toggle" type="button" aria-label="다크 모드로 전환" title="다크 모드 전환"><span aria-hidden="true">◐</span></button></div></header>';
      setupThemeToggle(header.querySelector(".theme-toggle"));
    }
    if (footer) {
      footer.innerHTML = '<footer class="site-footer"><p><span class="brand-mark small">E</span> English Lab <span class="footer-divider">·</span> 오늘도 꾸준히, 한 줄씩</p></footer>';
    }
  }

  function setupThemeToggle(button) {
    var preference = "";
    try {
      preference = localStorage.getItem("englishLabTheme") || "";
    } catch (error) {
      console.warn("테마 설정을 읽지 못했습니다.", error);
    }
    if (preference === "dark" || preference === "light") document.documentElement.setAttribute("data-theme", preference);
    updateThemeButton(button);
    button.addEventListener("click", function () {
      var dark = document.documentElement.getAttribute("data-theme") === "dark" ||
        (!document.documentElement.hasAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
      var next = dark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("englishLabTheme", next);
      } catch (error) {
        console.warn("테마 설정을 저장하지 못했습니다.", error);
      }
      updateThemeButton(button);
    });
  }

  function updateThemeButton(button) {
    var dark = document.documentElement.getAttribute("data-theme") === "dark" ||
      (!document.documentElement.hasAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    button.setAttribute("aria-label", dark ? "라이트 모드로 전환" : "다크 모드로 전환");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", renderChrome);
  else renderChrome();
}());
