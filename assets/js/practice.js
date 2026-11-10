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
          part: "p6", blank: question.n, choices: question.choices, answer: question.answer,
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
      mockStage.replaceChildren(intro);
    }

    function startExam() {
      var items = preparedItems || buildExam();
      preparedItems = null;
      if (!items.length) {
        mockStage.replaceChildren(element("div", "placeholder", "출제할 문제가 없어요."));
        return;
      }
      stopTimer();
      var now = Date.now();
      exam = {
        items: items,
        answers: items.map(function () { return null; }),
        index: 0,
        startedAt: now,
        endsAt: now + EXAM.seconds * 1000,
        timerHandle: null,
        submitted: false
      };
      mockStage.replaceChildren();
      exam.timerBar = element("div", "practice-timer-bar");
      exam.timerBar.setAttribute("role", "timer");
      exam.timeOutput = element("strong", "practice-time", formatTime(EXAM.seconds));
      exam.progressOutput = element("span", "practice-progress", "");
      var timeLabel = element("span", "practice-time-label", "남은 시간");
      var timeGroup = element("div", "practice-time-group");
      timeGroup.append(timeLabel, exam.timeOutput);
      exam.timerBar.append(timeGroup, exam.progressOutput);

      var layout = element("div", "practice-exam-layout");
      exam.questionArea = element("section", "panel practice-question-area");
      exam.questionArea.setAttribute("aria-live", "polite");
      exam.omr = element("aside", "panel practice-omr");
      exam.omr.setAttribute("aria-label", "OMR 답안지");
      layout.append(exam.questionArea, exam.omr);
      mockStage.append(exam.timerBar, layout);

      renderExamQuestion();
      renderOmr();
      updateTimer();
      exam.timerHandle = window.setInterval(updateTimer, 1000);
    }

    function stopTimer() {
      if (exam && exam.timerHandle !== null) {
        window.clearInterval(exam.timerHandle);
        exam.timerHandle = null;
      }
    }

    function remainingSeconds() {
      return Math.max(0, Math.ceil((exam.endsAt - Date.now()) / 1000));
    }

    function updateTimer() {
      if (!exam || exam.submitted) return;
      var remaining = remainingSeconds();
      exam.timeOutput.textContent = formatTime(remaining);
      exam.timerBar.classList.toggle("is-warning", remaining <= EXAM.warnSec && remaining > EXAM.dangerSec);
      exam.timerBar.classList.toggle("is-danger", remaining <= EXAM.dangerSec);
      var answered = exam.answers.filter(function (answer) { return answer !== null; }).length;
      exam.progressOutput.textContent = "푼 문제 " + answered + " / " + exam.items.length;
      if (remaining <= 0) submitExam(true);
    }

    function goTo(index) {
      if (!exam || exam.submitted) return;
      exam.index = Math.min(exam.items.length - 1, Math.max(0, index));
      renderExamQuestion();
      renderOmr();
      if (exam.heading && exam.heading.focus) exam.heading.focus({ preventScroll: true });
    }

    function renderExamQuestion() {
      var item = exam.items[exam.index];
      var area = exam.questionArea;
      area.replaceChildren();
      area.appendChild(element("p", "practice-question-meta", PART_LABELS[item.part] + " · " + item.number + " / " + exam.items.length));
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
          updateTimer();
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
      ["p5", "p6", "p7"].forEach(function (part) {
        var entries = exam.items.filter(function (item) { return item.part === part; });
        if (!entries.length) return;
        var section = element("div", "practice-omr-section");
        section.appendChild(element("p", "practice-omr-part", PART_LABELS[part]));
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
      var elapsedSec = Math.min(EXAM.seconds, Math.round((Date.now() - exam.startedAt) / 1000));
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
      try {
        window.Progress.recordPracticeAttempt(result);
      } catch (error) {
        console.warn("모의고사 기록을 저장하지 못했습니다.", error);
      }
      renderResult(result, misses);
      renderHistory();
    }

    function scoreBand(correct, total) {
      var scaled = total === 30 ? correct : Math.round(correct / total * 30);
      return SCORE_BANDS.find(function (band) { return scaled >= band.min && scaled <= band.max; }) || SCORE_BANDS[0];
    }

    function renderResult(result, misses) {
      var card = element("section", "panel practice-result");
      card.setAttribute("aria-live", "polite");
      card.append(
        element("p", "eyebrow", "MOCK TEST RESULT"),
        element("h3", "practice-result-score", "총점 " + result.correct + " / " + result.total),
        element("p", "practice-result-rate", "정답률 " + percent(result.correct, result.total) + "%")
      );

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
        "소요 시간 " + formatTime(result.elapsedSec) + " / 제한 " + formatTime(EXAM.seconds) + " · " +
        (result.timedOut ? "시간 초과로 자동 제출됐어요." : "제한 시간 안에 제출했어요.")));

      var missSection = element("section", "grammar-result-misses");
      missSection.appendChild(element("h4", "", misses.length ? "틀린 문제 " + misses.length + "개" : "틀린 문제가 없어요. 완벽해요!"));
      misses.forEach(function (miss) {
        var item = miss.item;
        var entry = element("article", "grammar-result-miss practice-miss");
        entry.appendChild(element("p", "practice-miss-meta", item.number + "번 · " + PART_LABELS[item.part] +
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
        button("button button-quiet", "기록 보기", function () { showTab("history"); })
      );
      card.appendChild(actions);
      mockStage.replaceChildren(card);
      if (card.scrollIntoView) card.scrollIntoView({ behavior: "smooth", block: "start" });
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

    function renderHistory() {
      var attempts = window.Progress.getPracticeHistory();
      historyRoot.replaceChildren();
      if (!attempts.length) {
        historyRoot.appendChild(element("div", "placeholder", "아직 응시한 모의고사가 없어요. 미니 모의고사를 풀면 여기에 기록돼요."));
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
      if (exam && !exam.submitted) {
        event.preventDefault();
        event.returnValue = "";
      }
    });

    renderMockIntro();
    renderHistory();
  });
}());
