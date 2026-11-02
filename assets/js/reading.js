(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var strategies = window.READING_STRATEGY.slice().sort(function (a, b) { return a.order - b.order; });
    var passages = window.PASSAGES;
    var strategyList = document.getElementById("reading-strategy-list");
    var strategyToggle = document.getElementById("reading-expand-toggle");
    var passageSelect = document.getElementById("reading-passage-select");
    var exercise = document.getElementById("reading-exercise");
    var reviewList = document.getElementById("reading-review-list");
    var openStrategies = new Set();
    var passageId = passages.length ? passages[0].id : "";
    var selectedAnswers = [];
    var graded = false;
    var translationsVisible = false;
    var timerHandle = null;
    var timerRemaining = 0;
    var timerStarted = false;

    function element(tag, className, text) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      if (text !== undefined) node.textContent = text;
      return node;
    }

    function showTab(name) {
      ["strategy", "passages", "review"].forEach(function (tabName) {
        var selected = name === tabName;
        var tab = document.getElementById("reading-tab-" + tabName);
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        document.getElementById("reading-panel-" + tabName).hidden = !selected;
      });
    }

    function currentPassage() {
      return passages.find(function (passage) { return passage.id === passageId; }) || null;
    }

    function findPassage(id) {
      return passages.find(function (passage) { return passage.id === id; }) || null;
    }

    function renderStrategies() {
      strategyList.replaceChildren();
      strategies.forEach(function (strategy) {
        var article = element("article", "accordion-item reading-strategy");
        article.id = "reading-strategy-" + strategy.id;
        var panelId = "reading-strategy-panel-" + strategy.id;
        var trigger = element("button", "accordion-trigger reading-strategy-trigger");
        trigger.type = "button";
        trigger.setAttribute("aria-expanded", "false");
        trigger.setAttribute("aria-controls", panelId);
        var summary = element("span", "reading-strategy-summary");
        summary.append(
          element("span", "reading-strategy-title", String(strategy.order).padStart(2, "0") + " · " + strategy.title),
          element("span", "reading-strategy-one-line", strategy.oneLine)
        );
        trigger.append(summary);
        var panel = element("div", "accordion-panel reading-strategy-panel");
        panel.id = panelId;
        panel.hidden = true;
        var points = element("ol", "reading-strategy-points");
        strategy.points.forEach(function (point) { points.appendChild(element("li", "", point)); });
        var trap = element("p", "reading-strategy-trap", strategy.trap);
        var example = element("p", "reading-strategy-example en", strategy.example);
        panel.append(
          makeStrategySection("① 핵심 전략", points),
          makeStrategySection("⚠️ 함정", trap),
          makeStrategySection("🎯 예시", example)
        );
        trigger.addEventListener("click", function () {
          setStrategyExpanded(strategy.id, trigger, panel, trigger.getAttribute("aria-expanded") !== "true");
        });
        article.append(trigger, panel);
        strategyList.appendChild(article);
      });
      updateStrategyToggle();
    }

    function makeStrategySection(title, content) {
      var section = element("section", "reading-strategy-section");
      section.append(element("h3", "", title), content);
      return section;
    }

    function setStrategyExpanded(id, trigger, panel, expanded) {
      trigger.setAttribute("aria-expanded", String(expanded));
      panel.hidden = !expanded;
      if (expanded) openStrategies.add(id);
      else openStrategies.delete(id);
      updateStrategyToggle();
    }

    function updateStrategyToggle() {
      var allExpanded = strategies.length > 0 && openStrategies.size === strategies.length;
      strategyToggle.textContent = allExpanded ? "전체 접기" : "전체 펼치기";
      strategyToggle.setAttribute("aria-expanded", String(allExpanded));
    }

    function populatePassageSelect() {
      passageSelect.replaceChildren();
      passages.forEach(function (passage) {
        var option = element("option", "", passage.type + " · " + passage.title);
        option.value = passage.id;
        passageSelect.appendChild(option);
      });
      passageSelect.value = passageId;
    }

    function stopTimer() {
      if (timerHandle !== null) {
        window.clearInterval(timerHandle);
        timerHandle = null;
      }
    }

    function formatTime(seconds) {
      var minutes = Math.floor(seconds / 60);
      var remainder = seconds % 60;
      return String(minutes).padStart(2, "0") + ":" + String(remainder).padStart(2, "0");
    }

    function resetTimer() {
      stopTimer();
      timerRemaining = Number(currentPassage() && currentPassage().recommendedSec) || 120;
      timerStarted = false;
    }

    function startTimer(button, output) {
      if (timerStarted) return;
      timerStarted = true;
      button.textContent = "⏱ 타이머 진행 중";
      button.disabled = true;
      output.textContent = formatTime(timerRemaining) + " 남음";
      timerHandle = window.setInterval(function () {
        timerRemaining -= 1;
        if (timerRemaining <= 0) {
          timerRemaining = 0;
          stopTimer();
          output.textContent = "시간이 끝났어요.";
          button.textContent = "⏱ 시간 종료";
          return;
        }
        output.textContent = formatTime(timerRemaining) + " 남음";
      }, 1000);
    }

    function addSentenceHighlight(sentence) {
      function clearOthers() {
        exercise.querySelectorAll(".reading-sentence.is-highlighted").forEach(function (node) {
          if (node !== sentence) node.classList.remove("is-highlighted");
        });
      }
      sentence.addEventListener("mouseenter", function () {
        clearOthers();
        sentence.classList.add("is-highlighted");
      });
      sentence.addEventListener("mouseleave", function () {
        if (document.activeElement !== sentence && !sentence.dataset.selected) {
          sentence.classList.remove("is-highlighted");
        }
      });
      sentence.addEventListener("focus", function () {
        clearOthers();
        sentence.classList.add("is-highlighted");
      });
      sentence.addEventListener("blur", function () {
        if (!sentence.dataset.selected) sentence.classList.remove("is-highlighted");
      });
      sentence.addEventListener("click", function () {
        var wasSelected = sentence.dataset.selected === "true";
        exercise.querySelectorAll(".reading-sentence").forEach(function (node) {
          node.dataset.selected = "false";
          node.classList.remove("is-highlighted");
        });
        if (!wasSelected) {
          sentence.dataset.selected = "true";
          sentence.classList.add("is-highlighted");
        }
      });
      sentence.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          sentence.click();
        }
      });
    }

    function renderPassage() {
      var passage = currentPassage();
      if (!passage) {
        exercise.replaceChildren(element("div", "placeholder", "지문을 준비 중이에요."));
        return;
      }
      stopTimer();
      resetTimer();
      selectedAnswers = passage.questions.map(function () { return null; });
      graded = false;
      translationsVisible = false;
      exercise.replaceChildren();

      var timer = element("div", "reading-timer-row");
      var timerButton = element("button", "button button-quiet", "⏱ 타이머 시작");
      timerButton.type = "button";
      var timerLabel = element("span", "reading-timer-label", "권장 시간 " + Math.ceil(passage.recommendedSec / 60) + "분");
      var timerOutput = element("span", "reading-timer-output", formatTime(timerRemaining));
      timerButton.addEventListener("click", function () { startTimer(timerButton, timerOutput); });
      timer.append(timerButton, timerLabel, timerOutput);

      var passageCard = element("article", "panel reading-passage-card");
      passageCard.appendChild(element("p", "reading-passage-type", passage.type + " · " + passage.title));
      var header = element("div", "reading-passage-header en");
      passage.header.forEach(function (line) { header.appendChild(element("p", "", line)); });
      passageCard.appendChild(header);

      var sentenceList = element("div", "reading-sentences en");
      passage.sentences.forEach(function (line, index) {
        var sentence = element("article", "reading-sentence");
        sentence.tabIndex = 0;
        sentence.setAttribute("role", "group");
        sentence.setAttribute("aria-label", "지문 문장 " + (index + 1));
        sentence.dataset.selected = "false";
        sentence.append(
          element("p", "reading-sentence-en", line.en),
          element("p", "reading-sentence-ko", line.ko)
        );
        sentence.querySelector(".reading-sentence-ko").hidden = true;
        addSentenceHighlight(sentence);
        sentenceList.appendChild(sentence);
      });
      passageCard.appendChild(sentenceList);

      var vocabSection = element("section", "reading-vocab-section");
      vocabSection.appendChild(element("h3", "", "핵심 어휘"));
      var vocabList = element("ul", "reading-vocab-list");
      passage.vocab.forEach(function (entry) {
        var item = element("li", "");
        item.append(element("span", "reading-vocab-word en", entry.w), element("span", "reading-vocab-meaning", entry.m));
        vocabList.appendChild(item);
      });
      vocabSection.appendChild(vocabList);
      passageCard.appendChild(vocabSection);

      var actionRow = element("div", "reading-action-row");
      var gradeButton = element("button", "button button-primary", "채점");
      gradeButton.type = "button";
      gradeButton.disabled = true;
      var translationButton = element("button", "button button-quiet", "📖 해석 보기");
      translationButton.type = "button";
      translationButton.hidden = true;
      translationButton.setAttribute("aria-expanded", "false");
      translationButton.addEventListener("click", function () {
        translationsVisible = !translationsVisible;
        passageCard.querySelectorAll(".reading-sentence-ko").forEach(function (translation) {
          translation.hidden = !translationsVisible;
        });
        translationButton.textContent = translationsVisible ? "해석 숨기기" : "📖 해석 보기";
        translationButton.setAttribute("aria-expanded", String(translationsVisible));
      });
      actionRow.append(gradeButton, translationButton);
      passageCard.appendChild(actionRow);
      var result = element("div", "reading-results");
      result.setAttribute("aria-live", "polite");
      passageCard.appendChild(result);

      var questionSection = element("section", "reading-questions");
      questionSection.appendChild(element("h3", "", "문제"));
      passage.questions.forEach(function (question, questionIndex) {
        var card = element("article", "reading-question-card");
        card.appendChild(element("h4", "", (questionIndex + 1) + ". " + question.q));
        var choices = element("div", "reading-choices");
        question.choices.forEach(function (choice, choiceIndex) {
          var button = element("button", "reading-choice", "(" + String.fromCharCode(65 + choiceIndex) + ") " + choice);
          button.type = "button";
          button.setAttribute("aria-pressed", "false");
          button.addEventListener("click", function () {
            if (graded) return;
            selectedAnswers[questionIndex] = choiceIndex;
            Array.from(choices.children).forEach(function (option) {
              option.classList.remove("is-selected");
              option.setAttribute("aria-pressed", "false");
            });
            button.classList.add("is-selected");
            button.setAttribute("aria-pressed", "true");
            gradeButton.disabled = selectedAnswers.some(function (answer) { return answer === null; });
          });
          choices.appendChild(button);
        });
        card.appendChild(choices);
        var explanation = element("div", "reading-explanation");
        explanation.hidden = true;
        card.appendChild(explanation);
        questionSection.appendChild(card);
      });
      gradeButton.addEventListener("click", function () {
        if (graded || selectedAnswers.some(function (answer) { return answer === null; })) return;
        graded = true;
        stopTimer();
        timerButton.disabled = true;
        timerButton.textContent = "⏱ 풀이 완료";
        timerOutput.textContent = timerStarted ? "시간 기록 완료" : formatTime(timerRemaining) + " 남음";
        var correct = 0;
        var wrongQuestionIndexes = [];
        Array.from(questionSection.querySelectorAll(".reading-question-card")).forEach(function (card, index) {
          var question = passage.questions[index];
          var isCorrect = selectedAnswers[index] === question.answer;
          if (isCorrect) correct += 1;
          else wrongQuestionIndexes.push(index);
          Array.from(card.querySelectorAll(".reading-choice")).forEach(function (button, answerIndex) {
            button.disabled = true;
            if (answerIndex === question.answer) button.classList.add("is-correct");
            else if (answerIndex === selectedAnswers[index]) button.classList.add("is-incorrect");
          });
          var explanation = card.querySelector(".reading-explanation");
          explanation.hidden = false;
          explanation.append(
            element("p", isCorrect ? "reading-answer answer-right" : "reading-answer answer-wrong",
              isCorrect ? "정답이에요!" : "정답: " + question.choices[question.answer]),
            element("p", "", question.explanation)
          );
        });
        result.replaceChildren(element("p", "reading-result-score",
          "점수 " + correct + " / " + passage.questions.length + " · 정답률 " +
          Math.round(correct / passage.questions.length * 100) + "%"));
        gradeButton.disabled = true;
        gradeButton.textContent = "채점 완료";
        translationButton.hidden = false;
        window.Progress.recordReadingResult(passage.id, correct, passage.questions.length, wrongQuestionIndexes);
        renderReviewList();
      });

      exercise.append(timer, passageCard, questionSection);
    }

    function openPassage(id) {
      if (!findPassage(id)) return;
      passageId = id;
      passageSelect.value = id;
      showTab("passages");
      renderPassage();
      document.getElementById("reading-panel-passages").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function renderReviewList() {
      var weak = window.Progress.getWeakPassages();
      reviewList.replaceChildren();
      if (!weak.length) {
        reviewList.appendChild(element("div", "placeholder", "틀린 문제가 있는 지문이 아직 없어요. 지문을 풀면 다시 읽을 곳을 모아드려요."));
        return;
      }
      weak.forEach(function (entry) {
        var passage = findPassage(entry.passageId);
        if (!passage) return;
        var card = element("article", "panel reading-review-card");
        var heading = element("div", "reading-review-heading");
        heading.append(
          element("h3", "", passage.type + " · " + passage.title),
          element("span", "reading-review-score", entry.correct + " / " + entry.total + " 누적 정답")
        );
        card.appendChild(heading);
        var missed = entry.wrongQuestionIndexes.filter(function (index) {
          return index < passage.questions.length;
        });
        if (missed.length) {
          var list = element("div", "reading-review-misses");
          missed.forEach(function (index) {
            var question = passage.questions[index];
            var item = element("article", "reading-review-miss");
            item.append(
              element("h4", "", question.q),
              element("p", "reading-review-answer", "정답: " + question.choices[question.answer]),
              element("p", "", question.explanation)
            );
            list.appendChild(item);
          });
          card.appendChild(list);
        } else {
          card.appendChild(element("p", "reading-review-note", "이 지문은 이전 풀이에서 오답이 있었어요. 다시 풀어보세요."));
        }
        var retry = element("button", "button button-primary", "다시 풀기");
        retry.type = "button";
        retry.addEventListener("click", function () { openPassage(passage.id); });
        card.appendChild(retry);
        reviewList.appendChild(card);
      });
    }

    renderStrategies();
    populatePassageSelect();
    renderPassage();
    renderReviewList();

    strategyToggle.addEventListener("click", function () {
      var expand = openStrategies.size !== strategies.length;
      strategies.forEach(function (strategy) {
        var trigger = strategyList.querySelector('[aria-controls="reading-strategy-panel-' + strategy.id + '"]');
        setStrategyExpanded(
          strategy.id,
          trigger,
          document.getElementById("reading-strategy-panel-" + strategy.id),
          expand
        );
      });
    });
    passageSelect.addEventListener("change", function () { passageId = passageSelect.value; });
    document.getElementById("reading-open-passage").addEventListener("click", function () {
      openPassage(passageSelect.value);
    });
    document.querySelectorAll('[role="tab"][id^="reading-tab-"]').forEach(function (tab) {
      tab.addEventListener("click", function () {
        var name = tab.id.replace("reading-tab-", "");
        showTab(name);
        if (name === "review") renderReviewList();
      });
      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        var tabs = Array.from(document.querySelectorAll('[role="tab"][id^="reading-tab-"]'));
        var index = tabs.indexOf(tab);
        var step = event.key === "ArrowRight" ? 1 : -1;
        var next = tabs[(index + step + tabs.length) % tabs.length];
        showTab(next.id.replace("reading-tab-", ""));
        next.focus();
        if (next.id === "reading-tab-review") renderReviewList();
      });
    });
    window.addEventListener("beforeunload", stopTimer);
  });
}());
