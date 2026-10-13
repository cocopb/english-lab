(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var vocabulary = window.VOCAB;
    var container = document.getElementById("vocab-list");
    var trackSelect = document.getElementById("vocab-track");
    var daySelect = document.getElementById("vocab-day-filter");
    var searchInput = document.getElementById("vocab-search");
    var hideToggle = document.getElementById("vocab-hide-toggle");
    var resultCount = document.getElementById("vocab-result-count");
    var examForm = document.getElementById("vocab-exam-form");
    var examTrack = document.getElementById("vocab-exam-track");
    var examDay = document.getElementById("vocab-exam-day");
    var examType = document.getElementById("vocab-exam-type");
    var examRange = document.getElementById("vocab-exam-range");
    var examMessage = document.getElementById("vocab-exam-message");
    var examStage = document.getElementById("vocab-exam-stage");
    var wrongList = document.getElementById("vocab-wrong-list");
    var wrongStart = document.getElementById("vocab-wrong-start");
    var openIds = new Set();
    var revealedIds = new Set();
    var hiddenMeanings = false;
    var examItems = [];
    var examTypeForRun = "meaning";
    var questionIndex = 0;
    var correctCount = 0;
    var wrongItems = [];

    function trackLabel(track) {
      var labels = { toeic: "토익", speaking: "회화", conversation: "회화", toefl: "토플" };
      return labels[track] || track;
    }

    function trackMatches(itemTrack, selectedTrack) {
      if (selectedTrack === "all") return true;
      if (selectedTrack === "speaking") return ["speaking", "conversation", "회화"].includes(itemTrack);
      return itemTrack === selectedTrack || itemTrack === trackLabel(selectedTrack);
    }

    function dateKey(date) {
      return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
    }

    function makeElement(tag, className, text) {
      var element = document.createElement(tag);
      if (className) element.className = className;
      if (text !== undefined) element.textContent = text;
      return element;
    }

    function addCell(row, label, content) {
      var cell = document.createElement("td");
      cell.dataset.label = label;
      cell.appendChild(content);
      row.appendChild(cell);
      return cell;
    }

    function createDetailRow(item) {
      var row = document.createElement("tr");
      row.className = "vocab-detail-row";
      row.id = "vocab-detail-" + item.id;
      row.hidden = !openIds.has(item.id);
      var cell = document.createElement("td");
      cell.colSpan = 3;
      var panel = makeElement("div", "vocab-detail-panel");
      var example = makeElement("div", "vocab-detail-section");
      example.append(
        makeElement("span", "vocab-detail-label", "예문"),
        makeElement("span", "vocab-example en", item.example),
        makeElement("span", "vocab-example-ko", item.exampleKo)
      );
      var tip = makeElement("p", "vocab-detail-section", "💡 학습 팁 · " + item.tip);
      var recall = makeElement("div", "vocab-recall-row");
      recall.append(
        makeElement("span", "vocab-detail-section", "혼동 단어 · " + item.distractors.join(", ")),
        makeElement("span", "vocab-inline-tags", item.tags.join(" · "))
      );
      panel.append(example, tip, recall);
      cell.appendChild(panel);
      row.appendChild(cell);
      return row;
    }

    function renderList() {
      var selectedTrack = trackSelect.value;
      var selectedDay = daySelect.value;
      var query = searchInput.value.trim().toLocaleLowerCase();
      var filtered = vocabulary.filter(function (item) {
        return trackMatches(item.track, selectedTrack) &&
          (selectedDay === "all" || String(item.day) === selectedDay) &&
          (!query || (item.word + " " + item.meaning).toLocaleLowerCase().includes(query));
      });
      var groups = [];
      filtered.forEach(function (item) {
        var key = item.track + "-" + item.day;
        var group = groups.find(function (entry) { return entry.key === key; });
        if (!group) {
          group = { key: key, track: item.track, day: item.day, items: [] };
          groups.push(group);
        }
        group.items.push(item);
      });
      container.replaceChildren();
      document.body.classList.toggle("vocab-meanings-hidden", hiddenMeanings);
      hideToggle.setAttribute("aria-pressed", String(hiddenMeanings));
      hideToggle.textContent = hiddenMeanings ? "뜻 보이기" : "뜻 가리기";
      resultCount.textContent = filtered.length + "개 단어";

      if (!filtered.length) {
        container.appendChild(makeElement("div", "placeholder", "조건에 맞는 단어가 없어요."));
        return;
      }

      groups.forEach(function (group) {
        var table = document.createElement("table");
        table.className = "vocab-table";
        var caption = document.createElement("caption");
        caption.textContent = trackLabel(group.track) + " · DAY " + group.day;
        table.appendChild(caption);

        var head = document.createElement("thead");
        var headerRow = document.createElement("tr");
        ["단어", "품사", "뜻"].forEach(function (label) {
          var cell = document.createElement("th");
          cell.scope = "col";
          cell.textContent = label;
          headerRow.appendChild(cell);
        });
        head.appendChild(headerRow);
        table.appendChild(head);

        var body = document.createElement("tbody");
        group.items.forEach(function (item) {
          var row = document.createElement("tr");
          row.className = "vocab-entry-row";
          row.dataset.vocabId = item.id;
          row.setAttribute("aria-expanded", String(openIds.has(item.id)));

          var wordContent = document.createElement("button");
          wordContent.className = "vocab-expand-button";
          wordContent.type = "button";
          wordContent.setAttribute("aria-label", item.word + " 상세 " + (openIds.has(item.id) ? "접기" : "펼치기"));
          wordContent.setAttribute("aria-expanded", String(openIds.has(item.id)));
          wordContent.setAttribute("aria-controls", "vocab-detail-" + item.id);
          wordContent.append(
            makeElement("span", "vocab-word en", item.word),
            makeElement("span", "vocab-pos-inline", item.pos)
          );
          addCell(row, "단어", wordContent);
          addCell(row, "품사", makeElement("span", "vocab-pos", item.pos));

          var meaningCell = document.createElement("td");
          meaningCell.dataset.label = "뜻";
          if (hiddenMeanings && !revealedIds.has(item.id)) {
            var reveal = makeElement("button", "vocab-meaning-hidden", "뜻 확인");
            reveal.type = "button";
            reveal.setAttribute("aria-label", item.word + " 뜻 확인");
            meaningCell.appendChild(reveal);
          } else {
            meaningCell.textContent = item.meaning;
          }
          row.appendChild(meaningCell);
          body.append(row, createDetailRow(item));
        });
        table.appendChild(body);
        container.appendChild(table);
      });
    }

    function populateDayFilter(select, track, includeAll) {
      var previous = select.value;
      var days = Array.from(new Set(vocabulary.filter(function (item) {
        return trackMatches(item.track, track);
      }).map(function (item) { return item.day; }))).sort(function (a, b) { return a - b; });
      select.replaceChildren();
      if (includeAll) {
        var all = document.createElement("option");
        all.value = "all";
        all.textContent = "전체";
        select.appendChild(all);
      }
      days.forEach(function (day) {
        var option = document.createElement("option");
        option.value = String(day);
        option.textContent = "Day " + day;
        select.appendChild(option);
      });
      if (!includeAll && days.length === 0) {
        var unavailable = document.createElement("option");
        unavailable.value = "";
        unavailable.textContent = "등록된 Day 없음";
        select.appendChild(unavailable);
      }
      select.disabled = !days.length && !includeAll;
      if (days.includes(Number(previous))) select.value = previous;
      return days;
    }

    function trackItems(track, day) {
      return vocabulary.filter(function (item) {
        return trackMatches(item.track, track) && (day === undefined || String(item.day) === String(day));
      });
    }

    function activateTab(tabName) {
      ["list", "exam", "wrong"].forEach(function (name) {
        var selected = name === tabName;
        var tab = document.getElementById("vocab-tab-" + name);
        var panel = document.getElementById("vocab-panel-" + name);
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panel.hidden = !selected;
      });
    }

    function renderWrongList() {
      var progress = window.Progress.get();
      var mistakes = vocabulary.filter(function (item) {
        var status = progress.vocabProgress[item.id];
        return status && status.lastResult === "wrong";
      });
      wrongList.replaceChildren();
      wrongStart.disabled = !mistakes.length;
      if (!mistakes.length) {
        wrongList.appendChild(makeElement("div", "placeholder", "아직 틀린 단어가 없어요. 보카 시험을 풀면 여기에 표시됩니다."));
        return;
      }
      mistakes.forEach(function (item) {
        var card = makeElement("article", "note-card vocab-wrong-card");
        card.append(
          makeElement("h3", "en", item.word),
          makeElement("p", "", item.meaning),
          makeElement("p", "", "💡 " + item.tip),
          makeElement("span", "vocab-wrong-meta", "오답 " + progress.vocabProgress[item.id].wrongCount + "회 · 단계 " + progress.vocabProgress[item.id].stage + "/4")
        );
        wrongList.appendChild(card);
      });
    }

    var trackMeaning = Object.create(null);
    vocabulary.forEach(function (item) {
      trackMeaning[item.word.toLocaleLowerCase()] = item.meaning;
    });
    Object.keys(window.VOCAB_DISTRACTOR_MEANINGS || {}).forEach(function (word) {
      if (!trackMeaning[word.toLocaleLowerCase()]) trackMeaning[word.toLocaleLowerCase()] = window.VOCAB_DISTRACTOR_MEANINGS[word];
    });

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

    function questionChoices(item, type) {
      if (type === "blank") {
        return shuffle([item.word].concat(item.distractors).map(function (word) {
          return { text: word, correct: word === item.word };
        }));
      }
      var words = [item.word].concat(item.distractors);
      var choices = words.map(function (word) {
        return { text: trackMeaning[word.toLocaleLowerCase()], word: word, correct: word === item.word };
      });
      var missing = choices.filter(function (choice) { return !choice.text; }).map(function (choice) { return choice.word; });
      if (missing.length) throw new Error("뜻 데이터가 없는 혼동 단어: " + missing.join(", "));
      return shuffle(choices);
    }

    function beginExam(items, type) {
      if (!items.length) {
        examMessage.textContent = "선택한 범위에 출제할 단어가 없습니다.";
        return;
      }
      try {
        items.forEach(function (item) { questionChoices(item, type); });
      } catch (error) {
        console.error(error);
        examMessage.textContent = error.message;
        return;
      }
      examItems = items.slice();
      examTypeForRun = type;
      questionIndex = 0;
      correctCount = 0;
      wrongItems = [];
      examMessage.textContent = "";
      examStage.hidden = false;
      activateTab("exam");
      renderQuestion();
      examStage.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function renderQuestion() {
      var item = examItems[questionIndex];
      var choices = questionChoices(item, examTypeForRun);
      examStage.replaceChildren();
      var card = makeElement("section", "panel vocab-question");
      card.append(
        makeElement("p", "quiz-count", (questionIndex + 1) + " / " + examItems.length),
        makeElement("h3", "vocab-question-prompt en", examTypeForRun === "meaning" ? item.word : item.example.replace(new RegExp("\\b" + item.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "gi"), "____"))
      );
      var options = makeElement("div", "quiz-options vocab-quiz-options");
      choices.forEach(function (choice) {
        var button = makeElement("button", "quiz-option vocab-quiz-option", choice.text);
        button.type = "button";
        button.addEventListener("click", function () { gradeAnswer(item, choice, choices, options, card); });
        options.appendChild(button);
      });
      card.appendChild(options);
      var feedback = makeElement("div", "quiz-feedback vocab-quiz-feedback");
      feedback.setAttribute("aria-live", "polite");
      card.appendChild(feedback);
      var next = makeElement("button", "button button-primary vocab-next-button", questionIndex + 1 === examItems.length ? "결과 보기" : "다음 문제");
      next.type = "button";
      next.hidden = true;
      next.addEventListener("click", function () {
        questionIndex += 1;
        if (questionIndex < examItems.length) renderQuestion();
        else renderResults();
      });
      card.appendChild(next);
      examStage.appendChild(card);
    }

    function gradeAnswer(item, selected, choices, options, card) {
      var buttons = options.querySelectorAll(".vocab-quiz-option");
      buttons.forEach(function (button, index) {
        button.disabled = true;
        if (choices[index].correct) button.classList.add("correct");
        else if (choices[index] === selected) button.classList.add("incorrect");
      });
      window.Progress.recordVocabAnswer(item.id, selected.correct);
      if (selected.correct) {
        correctCount += 1;
        card.querySelector(".vocab-quiz-feedback").textContent = "정답이에요!";
      } else {
        wrongItems.push(item);
        var feedback = card.querySelector(".vocab-quiz-feedback");
        feedback.append(
          makeElement("p", "", "💡 학습 팁 · " + item.tip),
          makeElement("p", "en", item.example),
          makeElement("p", "", item.exampleKo)
        );
      }
      var next = card.querySelector(".vocab-next-button");
      next.hidden = false;
    }

    function renderResults() {
      examStage.replaceChildren();
      var card = makeElement("section", "panel vocab-results");
      var percentage = Math.round(correctCount / examItems.length * 100);
      card.append(
        makeElement("p", "eyebrow", "EXAM RESULT"),
        makeElement("h3", "", correctCount + " / " + examItems.length + " 정답"),
        makeElement("p", "vocab-result-rate", "정답률 " + percentage + "%")
      );
      var misses = makeElement("div", "vocab-result-misses");
      misses.appendChild(makeElement("h4", "", "틀린 단어 " + wrongItems.length + "개"));
      if (wrongItems.length) {
        wrongItems.forEach(function (item) {
          var entry = makeElement("article", "vocab-result-miss");
          entry.append(
            makeElement("strong", "en", item.word),
            makeElement("span", "", item.meaning),
            makeElement("p", "", "💡 " + item.tip)
          );
          misses.appendChild(entry);
        });
      } else {
        misses.appendChild(makeElement("p", "", "모든 문제를 맞혔어요!"));
      }
      card.appendChild(misses);
      var actions = makeElement("div", "button-row vocab-result-actions");
      var retry = makeElement("button", "button button-primary", "다시 풀기");
      retry.type = "button";
      retry.addEventListener("click", function () { beginExam(examItems, examTypeForRun); });
      var retryWrong = makeElement("button", "button button-quiet", "틀린 것만 다시");
      retryWrong.type = "button";
      retryWrong.disabled = !wrongItems.length;
      retryWrong.addEventListener("click", function () { beginExam(wrongItems, examTypeForRun); });
      actions.append(retry, retryWrong);
      card.appendChild(actions);
      examStage.appendChild(card);
      renderWrongList();
    }

    document.getElementById("vocab-day").value = window.Progress.get().vocabDay;
    document.getElementById("vocab-form").addEventListener("submit", function (event) {
      event.preventDefault();
      var day = Number(document.getElementById("vocab-day").value);
      if (!Number.isInteger(day) || day < 0) {
        document.getElementById("vocab-message").textContent = "0 이상의 정수를 입력해주세요.";
        return;
      }
      window.Progress.set({ vocabDay: day });
      document.getElementById("vocab-message").textContent = "Day " + day + "까지의 진도를 저장했어요.";
    });

    document.querySelectorAll(".vocab-tab").forEach(function (tab) {
      tab.addEventListener("click", function () { activateTab(tab.id.replace("vocab-tab-", "")); });
      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        var tabs = Array.from(document.querySelectorAll(".vocab-tab"));
        var current = tabs.indexOf(tab);
        var offset = event.key === "ArrowRight" ? 1 : -1;
        var next = tabs[(current + offset + tabs.length) % tabs.length];
        activateTab(next.id.replace("vocab-tab-", ""));
        next.focus();
      });
    });

    try {
      hiddenMeanings = localStorage.getItem("englishLabVocabHideMeaning") === "true";
    } catch (error) {
      console.warn("뜻 가리기 설정을 읽지 못했습니다.", error);
    }

    container.addEventListener("click", function (event) {
      var target = event.target;
      if (!(target instanceof Element)) return;
      var revealButton = target.closest(".vocab-meaning-hidden");
      if (revealButton) {
        var revealRow = revealButton.closest(".vocab-entry-row");
        revealedIds.add(revealRow.dataset.vocabId);
        var revealItem = vocabulary.find(function (item) { return item.id === revealRow.dataset.vocabId; });
        if (revealItem) revealButton.parentElement.textContent = revealItem.meaning;
        return;
      }
      var row = target.closest(".vocab-entry-row");
      if (!row) return;
      var id = row.dataset.vocabId;
      if (openIds.has(id)) openIds.delete(id);
      else openIds.add(id);
      row.setAttribute("aria-expanded", String(openIds.has(id)));
      var expandButton = row.querySelector(".vocab-expand-button");
      expandButton.setAttribute("aria-expanded", String(openIds.has(id)));
      expandButton.setAttribute("aria-label", row.querySelector(".vocab-word").textContent + " 상세 " + (openIds.has(id) ? "접기" : "펼치기"));
      row.nextElementSibling.hidden = !openIds.has(id);
    });

    trackSelect.addEventListener("change", function () {
      populateDayFilter(daySelect, trackSelect.value, true);
      renderList();
    });
    populateDayFilter(daySelect, "all", true);
    daySelect.addEventListener("change", renderList);
    searchInput.addEventListener("input", renderList);
    hideToggle.addEventListener("click", function () {
      hiddenMeanings = !hiddenMeanings;
      revealedIds.clear();
      try {
        localStorage.setItem("englishLabVocabHideMeaning", String(hiddenMeanings));
      } catch (error) {
        console.warn("뜻 가리기 설정을 저장하지 못했습니다.", error);
      }
      renderList();
    });
    examTrack.addEventListener("change", function () {
      var days = populateDayFilter(examDay, examTrack.value, false);
      examMessage.textContent = days.length ? "" : "선택한 트랙에 등록된 단어가 없습니다.";
      updateExamRanges();
    });
    examDay.addEventListener("change", updateExamRanges);
    examForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var source = trackItems(examTrack.value, examDay.value);
      var range = examRange.value.split("-").map(Number);
      var selected = examRange.value === "all" ? source : source.slice(range[0] - 1, range[1]);
      beginExam(selected, examType.value);
    });
    wrongStart.addEventListener("click", function () {
      var progress = window.Progress.get();
      var misses = vocabulary.filter(function (item) {
        return progress.vocabProgress[item.id] && progress.vocabProgress[item.id].lastResult === "wrong";
      });
      beginExam(misses, examType.value);
    });
    examTrack.value = "toeic";
    populateDayFilter(examDay, examTrack.value, false);
    examMessage.textContent = examDay.disabled ? "선택한 트랙에 등록된 단어가 없습니다." : "";
    examRange.addEventListener("change", updateExamRanges);
    renderList();
    renderWrongList();

    function updateExamRanges() {
      var count = trackItems(examTrack.value, examDay.value).length;
      Array.from(examRange.options).forEach(function (option) {
        if (option.value === "all") {
          option.disabled = count === 0;
          option.textContent = "전체 " + count + "문제";
          return;
        }
        var range = option.value.split("-").map(Number);
        option.disabled = range[0] > count;
      });
      if (examRange.selectedOptions[0] && examRange.selectedOptions[0].disabled) examRange.value = "all";
    }
  });
}());
