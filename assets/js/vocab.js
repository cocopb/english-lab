(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var vocabulary = window.VOCAB;
    var container = document.getElementById("vocab-list");
    var trackSelect = document.getElementById("vocab-track");
    var daySelect = document.getElementById("vocab-day-filter");
    var searchInput = document.getElementById("vocab-search");
    var hideToggle = document.getElementById("vocab-hide-toggle");
    var expandToggle = document.getElementById("vocab-expand-toggle");
    var resultCount = document.getElementById("vocab-result-count");
    var dayFilterLabel = document.getElementById("vocab-day-filter-label");
    var dayNavigation = document.getElementById("vocab-day-navigation");
    var dayNavigationBottom = document.getElementById("vocab-day-navigation-bottom");
    var examForm = document.getElementById("vocab-exam-form");
    var examTrack = document.getElementById("vocab-exam-track");
    var examDay = document.getElementById("vocab-exam-day");
    var examDayLabel = document.getElementById("vocab-exam-day-label");
    var examType = document.getElementById("vocab-exam-type");
    var examRange = document.getElementById("vocab-exam-range");
    var examMessage = document.getElementById("vocab-exam-message");
    var examStage = document.getElementById("vocab-exam-stage");
    var wrongList = document.getElementById("vocab-wrong-list");
    var dueList = document.getElementById("vocab-due-list");
    var reviewStart = document.getElementById("vocab-review-start");
    var openIds = new Set();
    var revealedIds = new Set();
    var hiddenMeanings = false;
    var examItems = [];
    var examTypeForRun = "meaning";
    var questionIndex = 0;
    var correctCount = 0;
    var wrongItems = [];
    var answerResults = [];
    var blankCache = Object.create(null);
    var blankWarnings = new Set();

    function trackLabel(track) {
      var labels = { toeic: "토익", speaking: "회화", survival: "회화", conversation: "회화", toefl: "토플" };
      return labels[track] || track;
    }

    function blankExample(item) {
      if (Object.prototype.hasOwnProperty.call(blankCache, item.id)) return blankCache[item.id];
      var target = item.word.replace(/~/g, " ").trim().replace(/[?!.,;:]+$/, "");
      var isPhrase = /\s/.test(target);
      var variants = [target];
      if (!isPhrase) {
        var lower = target.toLowerCase();
        var last = target.slice(-1);
        var consonantY = /[^aeiou]y$/i.test(target);
        var consonantVowelConsonant = /[^aeiou][aeiou][^aeiou]$/i.test(target);

        variants.push(target + "s", target + "es");
        if (consonantY) variants.push(target.slice(0, -1) + "ies");

        variants.push(target + "d", target + "ed");
        if (consonantY) variants.push(target.slice(0, -1) + "ied");
        if (consonantVowelConsonant && !/[wxy]$/i.test(target)) variants.push(target + last + "ed");

        if (last.toLowerCase() === "e") variants.push(target.slice(0, -1) + "ing");
        else {
          variants.push(target + "ing");
          if (consonantVowelConsonant && !/[wxy]$/i.test(target)) variants.push(target + last + "ing");
        }

        if (consonantY) variants.push(target.slice(0, -1) + "ier", target.slice(0, -1) + "iest");
        else if (last.toLowerCase() === "e") variants.push(target + "r", target + "st");
        else variants.push(target + "er", target + "est");
        if (consonantVowelConsonant && !/[wxy]$/i.test(target)) {
          variants.push(target + last + "er", target + last + "est");
        }
        variants = variants.filter(function (variant, index) {
          return variant && variants.indexOf(variant) === index && variant.toLowerCase() !== lower;
        });
        variants.unshift(target);
      }

      for (var index = 0; index < variants.length; index += 1) {
        var expression = variants[index].trim().split(/\s+/).map(function (part) {
          return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }).join("\\s+");
        var match = new RegExp("\\b" + expression + "\\b", "i");
        if (match.test(item.example)) {
          blankCache[item.id] = item.example.replace(match, "____");
          return blankCache[item.id];
        }
      }
      if (!blankWarnings.has(item.id)) {
        console.warn("빈칸 시험에서 건너뛸 단어: " + item.id);
        blankWarnings.add(item.id);
      }
      blankCache[item.id] = null;
      return null;
    }

    function trackMatches(itemTrack, selectedTrack) {
      if (selectedTrack === "all") return true;
      if (selectedTrack === "speaking") return ["speaking", "survival", "conversation", "회화"].includes(itemTrack);
      return itemTrack === selectedTrack || itemTrack === trackLabel(selectedTrack);
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
      openIds.clear();
      var selectedTrack = trackSelect.value;
      var selectedDay = daySelect.value;
      var query = searchInput.value.trim().toLocaleLowerCase();
      if (selectedTrack === "all") {
        renderTrackSummary();
        updateExpandToggle();
        renderDayNavigation();
        return;
      }
      var filtered = vocabulary.filter(function (item) {
        return trackMatches(item.track, selectedTrack) &&
          (query || String(item.situation || item.day) === selectedDay) &&
          (!query || (item.word + " " + item.meaning).toLocaleLowerCase().includes(query));
      });
      var groups = [];
      filtered.forEach(function (item) {
        var groupingValue = item.situation || item.day;
        var key = item.track + "-" + groupingValue;
        var group = groups.find(function (entry) { return entry.key === key; });
        if (!group) {
          group = { key: key, track: item.track, groupingValue: groupingValue, situation: Boolean(item.situation), items: [] };
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
        updateExpandToggle();
        renderDayNavigation();
        return;
      }

      groups.forEach(function (group) {
        var table = document.createElement("table");
        table.className = "vocab-table";
        var caption = document.createElement("caption");
        caption.textContent = trackLabel(group.track) + (group.situation ? " · " + group.groupingValue : " · DAY " + group.groupingValue);
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
          if (query) {
            var membership = item.situation || "Day " + item.day;
            wordContent.appendChild(makeElement("span", "vocab-membership", membership));
          }
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
      updateExpandToggle();
      renderDayNavigation();
    }

    function renderTrackSummary() {
      var counts = { toeic: 0, speaking: 0, toefl: 0 };
      vocabulary.forEach(function (item) {
        var track = item.track === "survival" || item.track === "conversation" || item.track === "회화"
          ? "speaking"
          : item.track;
        if (Object.prototype.hasOwnProperty.call(counts, track)) counts[track] += 1;
      });
      container.replaceChildren();
      container.appendChild(makeElement("div", "placeholder vocab-track-prompt", "트랙을 선택하세요"));
      var summary = makeElement("div", "vocab-track-summary");
      [
        ["toeic", "토익"],
        ["speaking", "회화"],
        ["toefl", "토플"]
      ].forEach(function (entry) {
        var card = makeElement("article", "vocab-track-count");
        card.append(
          makeElement("span", "", entry[1]),
          makeElement("strong", "", counts[entry[0]] + "개")
        );
        summary.appendChild(card);
      });
      container.appendChild(summary);
      resultCount.textContent = "트랙별 단어 수";
    }

    function renderDayNavigation() {
      [dayNavigation, dayNavigationBottom].forEach(function (navigation) {
        navigation.replaceChildren();
        var days = Array.from(daySelect.options).map(function (option) { return option.value; });
        var currentIndex = days.indexOf(daySelect.value);
        var unit = dayFilterLabel.textContent === "상황" ? "상황" : "Day";
        var previous = makeElement("button", "button button-quiet", "← 이전 " + unit);
        previous.type = "button";
        previous.disabled = daySelect.disabled || currentIndex <= 0 || Boolean(searchInput.value.trim());
        previous.addEventListener("click", function () {
          if (currentIndex > 0) selectDay(days[currentIndex - 1]);
        });
        var next = makeElement("button", "button button-quiet", "다음 " + unit + " →");
        next.type = "button";
        next.disabled = daySelect.disabled || currentIndex < 0 || currentIndex >= days.length - 1 || Boolean(searchInput.value.trim());
        next.addEventListener("click", function () {
          if (currentIndex < days.length - 1) selectDay(days[currentIndex + 1]);
        });
        navigation.append(previous, next);
        navigation.hidden = selectedTrackIsAll() || daySelect.disabled;
      });
    }

    function selectedTrackIsAll() {
      return trackSelect.value === "all";
    }

    function selectDay(day) {
      daySelect.value = day;
      saveVocabSelection();
      renderList();
    }

    function saveVocabSelection() {
      try {
        localStorage.setItem("englishLabVocabSelection", JSON.stringify({
          track: trackSelect.value,
          day: daySelect.value
        }));
      } catch (error) {
        console.warn("단어장 선택값을 저장하지 못했습니다.", error);
      }
    }

    function updateExpandToggle() {
      var rows = Array.from(container.querySelectorAll(".vocab-entry-row"));
      var expanded = rows.length > 0 && rows.every(function (row) {
        return openIds.has(row.dataset.vocabId);
      });
      expandToggle.textContent = expanded ? "전체 접기" : "전체 펼치기";
      expandToggle.setAttribute("aria-expanded", String(expanded));
    }

    function populateDayFilter(select, track, includeAll, activeOnly) {
      var previous = select.value;
      var progress = activeOnly ? window.Progress.get() : null;
      var values = Array.from(new Set(vocabulary.filter(function (item) {
        var status = progress && progress.vocabProgress[item.id];
        return (!activeOnly || !status || status.stage < 4) && trackMatches(item.track, track);
      }).map(function (item) { return item.situation || item.day; })));
      var days = values.every(function (value) { return typeof value === "number"; })
        ? values.sort(function (a, b) { return a - b; })
        : values.sort(function (a, b) { return String(a).localeCompare(String(b), "ko"); });
      var isSituation = track === "speaking" || track === "survival";
      var labelText = isSituation ? "상황" : track === "all" ? "Day / 상황" : "Day";
      if (select === daySelect) dayFilterLabel.textContent = labelText;
      if (select === examDay) examDayLabel.textContent = labelText;
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
        option.textContent = typeof day === "number" ? "Day " + day : String(day);
        select.appendChild(option);
      });
      if (!includeAll && days.length === 0) {
        var unavailable = document.createElement("option");
        unavailable.value = "";
        unavailable.textContent = "등록된 Day 없음";
        select.appendChild(unavailable);
      }
      select.disabled = !days.length && !includeAll || select === daySelect && track === "all";
      if (days.some(function (day) { return String(day) === previous; })) select.value = previous;
      else if (days.length) select.value = String(days[0]);
      return days;
    }

    function trackItems(track, day) {
      var progress = window.Progress.get();
      return vocabulary.filter(function (item) {
        var status = progress.vocabProgress[item.id];
        return (!status || status.stage < 4) &&
          trackMatches(item.track, track) && (day === undefined || String(item.situation || item.day) === String(day));
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
      var dueStatuses = window.Progress.getDueWords();
      var weakStatuses = window.Progress.getWeakWords().sort(function (a, b) {
        return b.wrongCount - a.wrongCount || a.wordId.localeCompare(b.wordId);
      });
      var graduatedStatuses = window.Progress.getGraduated();
      var statusById = window.Progress.get().vocabProgress;
      var itemsById = Object.create(null);
      vocabulary.forEach(function (item) { itemsById[item.id] = item; });
      var dueItems = dueStatuses.map(function (status) { return itemsById[status.wordId]; }).filter(Boolean);
      document.getElementById("vocab-due-count").textContent = dueItems.length + "개";
      document.getElementById("vocab-weak-count").textContent = weakStatuses.length + "개";
      document.getElementById("vocab-graduated-count").textContent = graduatedStatuses.length + "개";
      dueList.replaceChildren();
      wrongList.replaceChildren();
      reviewStart.disabled = !dueItems.length;
      if (!dueItems.length) {
        dueList.appendChild(makeElement("div", "placeholder", "오늘 복습할 단어가 없어요. 새 Day를 시험 보거나 내일 다시 오세요."));
      } else {
        dueItems.forEach(function (item) {
          var status = statusById[item.id];
          var card = makeElement("article", "note-card vocab-due-card");
          var heading = makeElement("div", "vocab-due-heading");
          heading.append(
            makeElement("h4", "en", item.word),
            makeElement("span", "vocab-pos", item.pos),
            makeElement("span", "vocab-review-badge", "오답 " + status.wrongCount + "회 · Stage " + status.stage + "/4")
          );
          card.append(
            heading,
            makeElement("p", "vocab-due-meaning", item.meaning),
            makeElement("p", "vocab-due-tip", "💡 " + item.tip),
            makeElement("p", "vocab-due-example en", item.example),
            makeElement("p", "vocab-due-translation", item.exampleKo),
            makeElement("p", "vocab-due-distractors", "혼동 단어 · " + item.distractors.join(", "))
          );
          dueList.appendChild(card);
        });
      }
      if (!weakStatuses.length) {
        wrongList.appendChild(makeElement("div", "placeholder", "아직 약점 단어가 없어요. 보카 시험을 풀면 누적 오답 단어를 확인할 수 있어요."));
        return;
      }
      var table = document.createElement("table");
      table.className = "vocab-weak-table";
      var head = document.createElement("thead");
      var header = document.createElement("tr");
      ["단어", "뜻", "틀린 횟수", "현재 stage"].forEach(function (label) {
        var cell = document.createElement("th");
        cell.scope = "col";
        cell.textContent = label;
        header.appendChild(cell);
      });
      head.appendChild(header);
      var body = document.createElement("tbody");
      weakStatuses.forEach(function (status) {
        var item = itemsById[status.wordId];
        if (!item) return;
        var row = document.createElement("tr");
        [item.word, item.meaning, status.wrongCount + "회", status.stage + " / 4"].forEach(function (value, index) {
          var cell = document.createElement("td");
          cell.dataset.label = ["단어", "뜻", "틀린 횟수", "현재 stage"][index];
          cell.textContent = value;
          if (index === 0) cell.className = "en";
          row.appendChild(cell);
        });
        body.appendChild(row);
      });
      table.append(head, body);
      wrongList.appendChild(table);
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
        return {
          text: word === item.word ? item.meaning : trackMeaning[word.toLocaleLowerCase()],
          word: word,
          correct: word === item.word
        };
      });
      var missing = choices.filter(function (choice) { return !choice.text; }).map(function (choice) { return choice.word; });
      if (missing.length) throw new Error("뜻 데이터가 없는 혼동 단어: " + missing.join(", "));
      return shuffle(choices);
    }

    function beginExam(items, type) {
      var progress = window.Progress.get();
      items = items.filter(function (item) {
        var status = progress.vocabProgress[item.id];
        return (!status || status.stage < 4) && (type !== "blank" || blankExample(item) !== null);
      });
      if (!items.length) {
        examMessage.textContent = type === "blank"
          ? "선택한 범위에 빈칸 문제로 출제할 수 있는 단어가 없습니다."
          : "선택한 범위에 출제할 단어가 없습니다.";
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
      answerResults = [];
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
        makeElement("h3", "vocab-question-prompt en", examTypeForRun === "meaning" ? item.word : blankExample(item))
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
      if (card.dataset.answered === "true") return;
      card.dataset.answered = "true";
      var buttons = options.querySelectorAll(".vocab-quiz-option");
      buttons.forEach(function (button, index) {
        button.disabled = true;
        if (choices[index].correct) button.classList.add("correct");
        else if (choices[index] === selected) button.classList.add("incorrect");
      });
      window.Progress.recordVocabAnswer(item.id, selected.correct);
      answerResults.push({ item: item, correct: selected.correct });
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
      correctCount = answerResults.filter(function (answer) { return answer.correct; }).length;
      wrongItems = answerResults.filter(function (answer) { return !answer.correct; }).map(function (answer) { return answer.item; });
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
      } else if (correctCount === examItems.length && examItems.length > 0) {
        misses.appendChild(makeElement("p", "", "모든 문제를 맞혔어요!"));
      } else {
        misses.appendChild(makeElement("p", "", "틀린 단어 정보가 없습니다."));
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
      updateExamRanges();
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
      updateExpandToggle();
    });

    expandToggle.addEventListener("click", function () {
      var rows = Array.from(container.querySelectorAll(".vocab-entry-row"));
      var expanded = rows.length > 0 && rows.every(function (row) {
        return openIds.has(row.dataset.vocabId);
      });
      if (expanded) openIds.clear();
      else rows.forEach(function (row) { openIds.add(row.dataset.vocabId); });
      rows.forEach(function (row) {
        var isOpen = openIds.has(row.dataset.vocabId);
        row.setAttribute("aria-expanded", String(isOpen));
        row.querySelector(".vocab-expand-button").setAttribute("aria-expanded", String(isOpen));
        row.nextElementSibling.hidden = !isOpen;
      });
      updateExpandToggle();
    });

    trackSelect.addEventListener("change", function () {
      populateDayFilter(daySelect, trackSelect.value, false);
      if (daySelect.options.length) daySelect.value = daySelect.options[0].value;
      saveVocabSelection();
      renderList();
    });
    var savedSelection = null;
    try {
      var storedSelection = localStorage.getItem("englishLabVocabSelection");
      if (storedSelection) savedSelection = JSON.parse(storedSelection);
    } catch (error) {
      console.warn("저장된 단어장 선택값을 읽지 못했습니다.", error);
    }
    if (savedSelection && Array.from(trackSelect.options).some(function (option) { return option.value === savedSelection.track; })) {
      trackSelect.value = savedSelection.track;
    } else {
      trackSelect.value = "toeic";
    }
    populateDayFilter(daySelect, trackSelect.value, false);
    if (savedSelection && savedSelection.track === trackSelect.value &&
        Array.from(daySelect.options).some(function (option) { return option.value === savedSelection.day; })) {
      daySelect.value = savedSelection.day;
    }
    saveVocabSelection();
    daySelect.addEventListener("change", function () {
      saveVocabSelection();
      renderList();
    });
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
      var days = populateDayFilter(examDay, examTrack.value, false, true);
      if (days.length) examDay.value = String(days[0]);
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
    reviewStart.addEventListener("click", function () {
      var due = window.Progress.getDueWords();
      var dueIds = new Set(due.map(function (status) { return status.wordId; }));
      beginExam(vocabulary.filter(function (item) { return dueIds.has(item.id); }), examType.value);
    });
    examTrack.value = "toeic";
    populateDayFilter(examDay, examTrack.value, false, true);
    examMessage.textContent = examDay.disabled ? "선택한 트랙에 등록된 단어가 없습니다." : "";
    examRange.addEventListener("change", updateExamRanges);
    updateExamRanges();
    renderList();
    renderWrongList();
    if (window.location.hash === "#wrong") activateTab("wrong");

    function updateExamRanges() {
      var count = trackItems(examTrack.value, examDay.value).length;
      examForm.querySelector('button[type="submit"]').disabled = count === 0;
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
