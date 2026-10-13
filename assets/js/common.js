(function () {
  "use strict";

  var reviewIntervals = [1, 4, 7, 14];
  var defaults = { studiedDates: [], vocabDay: 0, quizSolved: 0, quizCorrect: 0, vocabProgress: {}, planDone: {} };
  var navigation = [
    ["홈", "index.html", "home"],
    ["보카", "pages/vocab.html", "vocab"],
    ["독해", "pages/reading.html", "reading"],
    ["문법", "pages/grammar.html", "grammar"],
    ["회화", "pages/speaking.html", "speaking"],
    ["오답노트", "pages/mistakes.html", "mistakes"],
    ["퀴즈", "pages/quiz.html", "quiz"],
    ["계획", "pages/plan.html", "plan"]
  ];

  function normalizeProgress(value) {
    var result = Object.assign({}, defaults, value && typeof value === "object" ? value : {});
    result.studiedDates = Array.isArray(result.studiedDates) ? result.studiedDates : [];
    result.planDone = result.planDone && typeof result.planDone === "object" ? result.planDone : {};
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

  window.Progress = {
    get: get,
    set: set,
    markToday: markToday,
    streak: streak,
    recordVocabAnswer: recordVocabAnswer,
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
