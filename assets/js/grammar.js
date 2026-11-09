(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var topics = window.GRAMMAR.slice().sort(function (a, b) { return a.order - b.order; });
    var topicById = Object.create(null);
    topics.forEach(function (topic) { topicById[topic.id] = topic; });
    var list = document.getElementById("grammar-list");
    var expandToggle = document.getElementById("grammar-expand-toggle");
    var quizForm = document.getElementById("grammar-quiz-form");
    var ruleSelect = document.getElementById("grammar-quiz-rule");
    var countSelect = document.getElementById("grammar-quiz-count");
    var quizMessage = document.getElementById("grammar-quiz-message");
    var quizStage = document.getElementById("grammar-quiz-stage");
    var weakList = document.getElementById("grammar-weak-list");
    var weakPractice = document.getElementById("grammar-weak-practice");
    var openIds = new Set();
    var quizItems = [];
    var quizResults = [];
    var quizIndex = 0;
    var weakRuleIds = [];

    function element(tag, className, text) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      if (text !== undefined) node.textContent = text;
      return node;
    }

    function makeSection(title, content) {
      var section = element("section", "grammar-detail-section");
      section.append(element("h3", "", title), content);
      return section;
    }

    function makeTable(item) {
      var wrapper = element("div", "grammar-table-scroll");
      wrapper.setAttribute("tabindex", "0");
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", item.title + " 표");
      var table = element("table", "grammar-table");
      var head = element("thead");
      var headingRow = element("tr");
      item.table.headers.forEach(function (header) {
        headingRow.appendChild(element("th", "", header));
      });
      head.appendChild(headingRow);
      var body = element("tbody");
      item.table.rows.forEach(function (row) {
        var tableRow = element("tr");
        row.forEach(function (value) { tableRow.appendChild(element("td", "", value)); });
        body.appendChild(tableRow);
      });
      table.append(head, body);
      wrapper.appendChild(table);
      return wrapper;
    }

    function makeExamples(item) {
      var examples = element("div", "grammar-examples");
      item.examples.forEach(function (example) {
        var card = element("article", "grammar-example-card");
        card.append(
          element("p", "grammar-example-good en", "O  " + example.good),
          element("p", "grammar-example-bad en", "X  " + example.bad),
          element("p", "grammar-example-note", example.note)
        );
        examples.appendChild(card);
      });
      return examples;
    }

    function makeTopic(item) {
      var article = element("article", "accordion-item grammar-topic");
      article.id = "grammar-note-" + item.id;
      var trigger = element("button", "accordion-trigger grammar-topic-trigger");
      var panelId = "grammar-topic-panel-" + item.id;
      trigger.type = "button";
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-controls", panelId);
      var summary = element("span", "grammar-topic-summary");
      summary.append(
        element("span", "grammar-topic-heading", String(item.order).padStart(2, "0") + " · " + item.title),
        element("span", "grammar-topic-one-line", item.oneLine)
      );
      trigger.append(summary, element("span", "grammar-weight", item.weight));

      var panel = element("div", "accordion-panel grammar-topic-panel");
      panel.id = panelId;
      panel.hidden = true;
      panel.append(
        makeSection("① 한 줄 규칙", element("p", "", item.oneLine)),
        makeSection("② 표", makeTable(item)),
        makeSection("③ 예문 O / X", makeExamples(item)),
        makeSection("⚠️ 함정", element("p", "grammar-trap", item.trap)),
        makeSection("🎯 토익 출제 패턴", element("p", "", item.toeicPattern))
      );

      trigger.addEventListener("click", function () {
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        setExpanded(item.id, trigger, panel, !expanded);
        updateExpandToggle();
      });
      article.append(trigger, panel);
      return article;
    }

    function setExpanded(id, trigger, panel, expanded) {
      trigger.setAttribute("aria-expanded", String(expanded));
      panel.hidden = !expanded;
      if (expanded) openIds.add(id);
      else openIds.delete(id);
    }

    function updateExpandToggle() {
      var allExpanded = topics.length > 0 && openIds.size === topics.length;
      expandToggle.textContent = allExpanded ? "전체 접기" : "전체 펼치기";
      expandToggle.setAttribute("aria-expanded", String(allExpanded));
    }

    function activateTab(name) {
      ["notes", "quiz", "weak"].forEach(function (tabName) {
        var selected = name === tabName;
        var tab = document.getElementById("grammar-tab-" + tabName);
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        document.getElementById("grammar-panel-" + tabName).hidden = !selected;
      });
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

    function questionsForRule(ruleIds) {
      return window.GRAMMAR_QUIZ.filter(function (question) {
        return ruleIds.indexOf(question.ruleId) !== -1;
      });
    }

    function populateRuleSelect() {
      ruleSelect.replaceChildren();
      var all = element("option", "", "전체 유형");
      all.value = "all";
      ruleSelect.appendChild(all);
      var availableRuleIds = new Set(window.GRAMMAR_QUIZ.map(function (question) { return question.ruleId; }));
      topics.forEach(function (topic) {
        if (!availableRuleIds.has(topic.id)) return;
        var option = element("option", "", topic.title);
        option.value = topic.id;
        ruleSelect.appendChild(option);
      });
      updateCountOptions();
    }

    function updateCountOptions() {
      var selectedRule = ruleSelect.value;
      var total = selectedRule === "all"
        ? window.GRAMMAR_QUIZ.length
        : questionsForRule([selectedRule]).length;
      Array.from(countSelect.options).forEach(function (option) {
        option.disabled = option.value !== "all" && Number(option.value) > total;
        if (option.value === "all") option.textContent = "전체 (" + total + "문제)";
      });
      if (countSelect.selectedOptions[0] && countSelect.selectedOptions[0].disabled) {
        countSelect.value = "all";
      }
    }

    function beginQuiz(items) {
      if (!items.length) {
        quizMessage.textContent = "선택한 유형에 출제할 문제가 없습니다.";
        return;
      }
      quizItems = items.slice();
      quizResults = [];
      quizIndex = 0;
      quizMessage.textContent = "";
      quizStage.hidden = false;
      activateTab("quiz");
      renderQuestion();
      quizStage.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function openNote(ruleId) {
      var topic = topicById[ruleId];
      if (!topic) return;
      activateTab("notes");
      var article = document.getElementById("grammar-note-" + ruleId);
      var trigger = article.querySelector(".grammar-topic-trigger");
      var panel = document.getElementById("grammar-topic-panel-" + ruleId);
      if (trigger.getAttribute("aria-expanded") !== "true") setExpanded(ruleId, trigger, panel, true);
      updateExpandToggle();
      article.scrollIntoView({ behavior: "smooth", block: "start" });
      trigger.focus({ preventScroll: true });
    }

    function renderQuestion() {
      var question = quizItems[quizIndex];
      var topic = topicById[question.ruleId];
      var card = element("section", "panel grammar-question");
      card.append(
        element("p", "quiz-count", (quizIndex + 1) + " / " + quizItems.length),
        element("h3", "grammar-question-prompt en", question.question)
      );
      var choices = element("div", "quiz-options grammar-quiz-options");
      question.choices.forEach(function (choice, index) {
        var button = element("button", "quiz-option grammar-choice", "(" + String.fromCharCode(65 + index) + ")  " + choice);
        button.type = "button";
        button.addEventListener("click", function () {
          gradeAnswer(question, index, choices, card);
        });
        choices.appendChild(button);
      });
      card.appendChild(choices);
      var feedback = element("div", "grammar-answer-feedback");
      feedback.setAttribute("aria-live", "polite");
      card.appendChild(feedback);
      var next = element("button", "button button-primary grammar-next-button", quizIndex + 1 === quizItems.length ? "결과 보기" : "다음 문제");
      next.type = "button";
      next.hidden = true;
      next.addEventListener("click", function () {
        quizIndex += 1;
        if (quizIndex < quizItems.length) renderQuestion();
        else renderResults();
      });
      card.appendChild(next);
      quizStage.replaceChildren(card);
    }

    function gradeAnswer(question, selectedIndex, choices, card) {
      if (card.dataset.answered === "true") return;
      card.dataset.answered = "true";
      var isCorrect = selectedIndex === question.answer;
      Array.from(choices.children).forEach(function (button, index) {
        button.disabled = true;
        if (index === question.answer) button.classList.add("correct");
        else if (index === selectedIndex) button.classList.add("incorrect");
      });
      window.Progress.recordGrammarAnswer(question.ruleId, isCorrect);
      quizResults.push({ question: question, correct: isCorrect });
      var feedback = card.querySelector(".grammar-answer-feedback");
      feedback.appendChild(element("p", "grammar-explanation", question.explanation));
      var noteLink = element("a", "grammar-note-link", "📘 " + topicById[question.ruleId].title + " 노트 보기");
      noteLink.href = "#grammar-note-" + question.ruleId;
      noteLink.addEventListener("click", function (event) {
        event.preventDefault();
        openNote(question.ruleId);
      });
      feedback.appendChild(noteLink);
      card.querySelector(".grammar-next-button").hidden = false;
    }

    function renderResults() {
      var correct = quizResults.filter(function (result) { return result.correct; }).length;
      var card = element("section", "panel grammar-results");
      card.append(
        element("p", "eyebrow", "GRAMMAR RESULT"),
        element("h3", "", correct + " / " + quizItems.length + " 정답"),
        element("p", "grammar-result-rate", "정답률 " + Math.round(correct / quizItems.length * 100) + "%")
      );

      var byRule = Object.create(null);
      quizResults.forEach(function (result) {
        var ruleId = result.question.ruleId;
        if (!byRule[ruleId]) byRule[ruleId] = { solved: 0, correct: 0 };
        byRule[ruleId].solved += 1;
        if (result.correct) byRule[ruleId].correct += 1;
      });
      var ruleSection = element("section", "grammar-result-rules");
      ruleSection.appendChild(element("h4", "", "유형별 성적"));
      Object.keys(byRule).sort(function (a, b) {
        return topicById[a].order - topicById[b].order;
      }).forEach(function (ruleId) {
        var score = byRule[ruleId];
        ruleSection.appendChild(element("p", "", topicById[ruleId].title + " " + score.correct + "/" + score.solved));
      });
      card.appendChild(ruleSection);

      var misses = quizResults.filter(function (result) { return !result.correct; });
      var missSection = element("section", "grammar-result-misses");
      missSection.appendChild(element("h4", "", "틀린 문제 " + misses.length + "개"));
      misses.forEach(function (result) {
        var question = result.question;
        var entry = element("article", "grammar-result-miss");
        entry.append(
          element("p", "en", question.question),
          element("p", "", "정답: " + question.choices[question.answer]),
          element("p", "", question.explanation)
        );
        missSection.appendChild(entry);
      });
      if (!misses.length) missSection.appendChild(element("p", "", "모든 문제를 맞혔어요!"));
      card.appendChild(missSection);

      var actions = element("div", "button-row grammar-result-actions");
      var retry = element("button", "button button-primary", "다시 풀기");
      retry.type = "button";
      retry.addEventListener("click", function () { beginQuiz(quizItems); });
      var retryWrong = element("button", "button button-quiet", "틀린 것만 다시");
      retryWrong.type = "button";
      retryWrong.disabled = misses.length === 0;
      retryWrong.addEventListener("click", function () {
        beginQuiz(misses.map(function (result) { return result.question; }));
      });
      actions.append(retry, retryWrong);
      card.appendChild(actions);
      quizStage.replaceChildren(card);
      renderWeakRules();
    }

    function renderWeakRules() {
      var statsByRule = window.Progress.getGrammarStats();
      var rows = topics.map(function (topic) {
        var stats = statsByRule[topic.id] || { solved: 0, correct: 0, accuracy: null };
        return { topic: topic, stats: stats };
      }).sort(function (a, b) {
        var aReady = a.stats.solved >= 5;
        var bReady = b.stats.solved >= 5;
        if (aReady !== bReady) return aReady ? -1 : 1;
        if (aReady && a.stats.accuracy !== b.stats.accuracy) return a.stats.accuracy - b.stats.accuracy;
        return a.topic.order - b.topic.order;
      });
      weakList.replaceChildren();
      if (!rows.some(function (row) { return row.stats.solved > 0; })) {
        weakList.appendChild(element("div", "placeholder", "아직 푼 문제가 없어요. 문법 문제를 풀면 유형별 정답률을 확인할 수 있어요."));
      } else {
        rows.forEach(function (row) {
          var solved = row.stats.solved;
          var accuracy = row.stats.accuracy;
          var item = element("article", "grammar-weak-item" + (solved >= 5 && accuracy < 70 ? " is-weak" : ""));
          var heading = element("div", "grammar-weak-heading");
          heading.append(
            element("strong", "", row.topic.title),
            element("span", "grammar-weak-count", solved + "문제")
          );
          item.appendChild(heading);
          if (solved < 5) {
            item.append(element("p", "grammar-data-insufficient", "데이터 부족 · 5문제 이상 풀면 정답률을 표시합니다."));
          } else {
            var meter = element("div", "grammar-accuracy-track");
            meter.setAttribute("role", "meter");
            meter.setAttribute("aria-label", row.topic.title + " 정답률");
            meter.setAttribute("aria-valuemin", "0");
            meter.setAttribute("aria-valuemax", "100");
            meter.setAttribute("aria-valuenow", String(accuracy));
            var bar = element("span", "grammar-accuracy-bar");
            bar.style.width = accuracy + "%";
            meter.appendChild(bar);
            item.append(meter, element("span", "grammar-accuracy-value", accuracy + "%"));
          }
          weakList.appendChild(item);
        });
      }
      weakRuleIds = window.Progress.getWeakRules(3).map(function (rule) { return rule.ruleId; });
      weakPractice.disabled = weakRuleIds.length === 0;
    }

    list.replaceChildren.apply(list, topics.map(makeTopic));
    if (!topics.length) list.appendChild(element("div", "placeholder", "문법 토픽을 준비 중이에요."));
    populateRuleSelect();
    renderWeakRules();

    expandToggle.addEventListener("click", function () {
      var shouldExpand = openIds.size !== topics.length;
      topics.forEach(function (item) {
        var trigger = list.querySelector('[aria-controls="grammar-topic-panel-' + item.id + '"]');
        setExpanded(item.id, trigger, document.getElementById("grammar-topic-panel-" + item.id), shouldExpand);
      });
      updateExpandToggle();
    });

    quizForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var ruleIds = ruleSelect.value === "all"
        ? topics.map(function (topic) { return topic.id; })
        : [ruleSelect.value];
      var questions = questionsForRule(ruleIds);
      var requested = countSelect.value === "all" ? questions.length : Number(countSelect.value);
      beginQuiz(shuffle(questions).slice(0, requested));
    });
    ruleSelect.addEventListener("change", updateCountOptions);
    weakPractice.addEventListener("click", function () {
      var questions = shuffle(questionsForRule(weakRuleIds)).slice(0, 10);
      if (!questions.length) {
        quizMessage.textContent = "집중 연습할 약점 유형이 아직 없습니다. 유형별로 5문제 이상 풀어주세요.";
        activateTab("quiz");
        return;
      }
      beginQuiz(questions);
    });

    document.querySelectorAll('[role="tab"][id^="grammar-tab-"]').forEach(function (tab) {
      tab.addEventListener("click", function () {
        activateTab(tab.id.replace("grammar-tab-", ""));
        if (tab.id === "grammar-tab-weak") renderWeakRules();
      });
      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        var tabs = Array.from(document.querySelectorAll('[role="tab"][id^="grammar-tab-"]'));
        var index = tabs.indexOf(tab);
        var offset = event.key === "ArrowRight" ? 1 : -1;
        var next = tabs[(index + offset + tabs.length) % tabs.length];
        activateTab(next.id.replace("grammar-tab-", ""));
        next.focus();
        if (next.id === "grammar-tab-weak") renderWeakRules();
      });
    });

    // 다른 페이지(실전 결과 등)에서 grammar.html#grammar-note-g05 형태로 들어오면 해당 노트를 연다.
    var noteHash = /^#grammar-note-(g\d+)$/.exec(window.location.hash);
    if (noteHash) openNote(noteHash[1]);
  });
}());
