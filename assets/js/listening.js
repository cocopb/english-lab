(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var rateSelect = document.getElementById("listening-rate");
    var localeSelect = document.getElementById("listening-locale");
    var localeField = document.getElementById("listening-locale-field");
    var voiceDiagnostics = document.getElementById("listening-voice-diagnostics");
    var accentNote = document.getElementById("listening-accent-note");
    var supportNote = document.getElementById("listening-support-note");
    var dictationIndex = 0;
    var part1Index = 0;
    var part2Index = 0;
    var currentUtteranceToken = 0;
    var currentPlaybackButton = null;
    var voiceSettings = window.Speech.getSettings();
    var localeLabels = { "en-US": "미국식", "en-GB": "영국식", "en-AU": "호주식" };

    function showTab(name) {
      ["dictation", "part1", "part2", "part3", "part4"].forEach(function (tabName) {
        var selected = name === tabName;
        var tab = document.getElementById("listening-tab-" + tabName);
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        document.getElementById("listening-panel-" + tabName).hidden = !selected;
      });
    }

    function supportedVoices() {
      return window.Speech.getVoices();
    }

    function populateVoices() {
      var voices = supportedVoices();
      var availableVoices = window.Speech.getAvailableVoices();
      var availableVoiceCount = availableVoices.length;
      // 음성 목록이 비어 있는 것은 '로드 전'일 수 있으므로 미지원으로 안내하지 않는다.
      voiceDiagnostics.textContent = !window.Speech.isSupported()
        ? ""
        : availableVoiceCount
          ? "사용 가능한 영어 음성: " + availableVoiceCount + "개"
          : voices.length
            ? window.Speech.VOICES_UNUSABLE_MESSAGE
            : window.Speech.NO_ENGLISH_VOICE_HINT;
      var availableLocales = ["en-US", "en-GB", "en-AU"].filter(function (locale) {
        return availableVoices.some(function (voice) {
          return (voice.lang || "").toLowerCase() === locale.toLowerCase();
        });
      });
      localeSelect.replaceChildren();
      availableLocales.forEach(function (locale) {
        var option = document.createElement("option");
        option.value = locale;
        option.textContent = localeLabels[locale] || locale;
        localeSelect.appendChild(option);
      });
      var selectedLocaleAvailable = availableLocales.indexOf(voiceSettings.locale) !== -1;
      if (!selectedLocaleAvailable && availableLocales.length) {
        voiceSettings = window.Speech.saveSettings({
          locale: availableLocales[0],
          voiceSelected: voiceSettings.voiceSelected
        });
      } else if (!availableVoiceCount && voiceSettings.voiceSelected) {
        voiceSettings = window.Speech.saveSettings({ voiceSelected: false });
      }
      localeField.hidden = availableVoiceCount <= 1;
      accentNote.hidden = availableVoiceCount !== 1;
      localeSelect.disabled = !window.Speech.isSupported() || availableVoiceCount <= 1;
      localeSelect.value = availableLocales.indexOf(voiceSettings.locale) !== -1
        ? voiceSettings.locale
        : availableLocales[0] || "";
    }

    function nextAvailableLocale(failedLocale) {
      var locales = ["en-US", "en-GB", "en-AU"];
      var startIndex = locales.indexOf(failedLocale);
      for (var offset = 1; offset <= locales.length; offset += 1) {
        var candidate = locales[(startIndex + offset + locales.length) % locales.length];
        if (window.Speech.isLocaleAvailable(candidate)) return candidate;
      }
      return "en-US";
    }

    function handleVoiceUnavailable(voice) {
      var failedLocale = voice.lang;
      var selectedLocale = voiceSettings.locale;
      populateVoices();
      if (selectedLocale === failedLocale && !window.Speech.isLocaleAvailable(failedLocale)) {
        voiceSettings = window.Speech.saveSettings({
          locale: nextAvailableLocale(failedLocale),
          voiceSelected: true
        });
        localeSelect.value = voiceSettings.locale;
      }
    }

    function handleVoiceFallback(voice) {
      var labels = { "en-US": "미국식", "en-GB": "영국식", "en-AU": "호주식" };
      var notice = document.getElementById("listening-fallback-note");
      notice.textContent = (labels[voice.lang] || voice.lang) +
        " 음성을 사용할 수 없어 기본 음성으로 재생했습니다.";
      notice.hidden = false;
    }

    function setSupportState() {
      var supported = window.Speech.isSupported();
      supportNote.textContent = supported
        ? "영어 음성은 브라우저와 기기에 따라 다를 수 있어요."
        : window.Speech.UNSUPPORTED_MESSAGE + " 텍스트로 학습할 수 있어요.";
      supportNote.classList.toggle("is-unsupported", !supported);
      document.querySelectorAll(".listening-playback-control").forEach(function (button) {
        button.disabled = !supported;
      });
      rateSelect.disabled = !supported;
      localeSelect.disabled = !supported || window.Speech.getAvailableVoices().length <= 1;
    }

    function messageAt(id, message) {
      document.getElementById(id).textContent = message || "";
    }

    function speakText(text, button, messageId, rate, voice) {
      if (!window.Speech.isSupported()) {
        messageAt(messageId, window.Speech.UNSUPPORTED_MESSAGE);
        return Promise.resolve();
      }
      var token = ++currentUtteranceToken;
      if (currentPlaybackButton && currentPlaybackButton !== button) currentPlaybackButton.disabled = false;
      currentPlaybackButton = button || null;
      if (button) button.disabled = true;
      messageAt(messageId, "");
      var fallbackLang = "en-US";
      return window.Speech.speak(text, {
        rate: rate === undefined ? voiceSettings.rate : rate,
        voice: voice || (voiceSettings.voiceSelected ? voiceSettings.locale : null),
        lang: voiceSettings.voiceSelected ? voiceSettings.locale : "en-US",
        fallbackLang: fallbackLang,
        onVoiceUnavailable: handleVoiceUnavailable,
        onFallback: handleVoiceFallback
      }).then(function () {
        if (token === currentUtteranceToken) messageAt(messageId, "");
      }).catch(function (error) {
        if (token === currentUtteranceToken) messageAt(messageId, error.message);
      }).then(function () {
        if (button && token === currentUtteranceToken) {
          button.disabled = false;
          currentPlaybackButton = null;
        }
      });
    }

    function stopPlayback() {
      currentUtteranceToken += 1;
      document.querySelectorAll(".listening-now-speaking").forEach(function (node) {
        node.textContent = "";
        node.hidden = true;
      });
      if (currentPlaybackButton) currentPlaybackButton.disabled = false;
      currentPlaybackButton = null;
      window.Speech.stop();
    }

    function currentDictation() {
      return window.DICTATION[dictationIndex % window.DICTATION.length];
    }

    function renderDictation() {
      var item = currentDictation();
      document.getElementById("dictation-counter").textContent =
        "문장 " + (dictationIndex % window.DICTATION.length + 1) + " / " + window.DICTATION.length;
      document.getElementById("dictation-input").value = "";
      document.getElementById("dictation-score").textContent = "";
      document.getElementById("dictation-result").replaceChildren();
      document.getElementById("dictation-translation").hidden = true;
      document.getElementById("dictation-translation").textContent = item.ko;
      document.getElementById("dictation-next").hidden = true;
      document.getElementById("dictation-check").disabled = false;
    }

    function tokenize(text) {
      return text.toLowerCase().split(/\s+/).map(function (word) {
        return word.replace(/[^a-z0-9]/g, "");
      }).filter(Boolean);
    }

    function alignWords(expected, actual) {
      var rows = expected.length + 1;
      var columns = actual.length + 1;
      var matrix = Array.from({ length: rows }, function () { return Array(columns).fill(0); });
      for (var row = 0; row < rows; row += 1) matrix[row][0] = row;
      for (var column = 0; column < columns; column += 1) matrix[0][column] = column;
      for (var i = 1; i < rows; i += 1) {
        for (var j = 1; j < columns; j += 1) {
          var substitutionCost = expected[i - 1] === actual[j - 1] ? 0 : 1;
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + substitutionCost
          );
        }
      }
      var aligned = [];
      var expectedIndex = expected.length;
      var actualIndex = actual.length;
      while (expectedIndex || actualIndex) {
        if (expectedIndex && actualIndex &&
            expected[expectedIndex - 1] === actual[actualIndex - 1] &&
            matrix[expectedIndex][actualIndex] === matrix[expectedIndex - 1][actualIndex - 1]) {
          aligned.push({ kind: "correct", expected: expected[expectedIndex - 1], actual: actual[actualIndex - 1] });
          expectedIndex -= 1;
          actualIndex -= 1;
        } else if (expectedIndex && actualIndex &&
            matrix[expectedIndex][actualIndex] === matrix[expectedIndex - 1][actualIndex - 1] + 1) {
          aligned.push({ kind: "wrong", expected: expected[expectedIndex - 1], actual: actual[actualIndex - 1] });
          expectedIndex -= 1;
          actualIndex -= 1;
        } else if (expectedIndex && matrix[expectedIndex][actualIndex] === matrix[expectedIndex - 1][actualIndex] + 1) {
          aligned.push({ kind: "missing", expected: expected[expectedIndex - 1] });
          expectedIndex -= 1;
        } else {
          aligned.push({ kind: "extra", actual: actual[actualIndex - 1] });
          actualIndex -= 1;
        }
      }
      return aligned.reverse();
    }

    function gradeDictation() {
      var item = currentDictation();
      var expected = tokenize(item.text);
      var actual = tokenize(document.getElementById("dictation-input").value);
      var aligned = alignWords(expected, actual);
      var correct = aligned.filter(function (word) { return word.kind === "correct"; }).length;
      var accuracy = expected.length ? correct / expected.length : 0;
      var result = document.getElementById("dictation-result");
      result.replaceChildren();
      aligned.forEach(function (word) {
        var group = document.createElement("span");
        group.className = "dictation-word-group";
        if (word.kind === "wrong") {
          var expectedLabel = document.createElement("small");
          expectedLabel.className = "dictation-expected";
          expectedLabel.textContent = word.expected;
          group.appendChild(expectedLabel);
        }
        var token = document.createElement("span");
        token.className = "dictation-word is-" + word.kind;
        token.textContent = word.kind === "missing" ? "＿" : word.actual;
        token.setAttribute("aria-label", word.kind === "missing" ? "빠뜨린 단어 " + word.expected : word.actual);
        group.appendChild(token);
        result.appendChild(group);
      });
      document.getElementById("dictation-score").textContent =
        "정답률 " + correct + " / " + expected.length + " 단어 (" + Math.round(accuracy * 100) + "%)";
      document.getElementById("dictation-translation").hidden = false;
      document.getElementById("dictation-check").disabled = true;
      document.getElementById("dictation-next").hidden = false;
      window.Progress.recordDictation(accuracy);
    }

    // ---------- Part 1 사진 묘사 ----------
    // 실제 시험처럼 네 문장은 음성으로만 들려주고 (A)~(D) 글자만 보인다. 채점 뒤에 문장과 해설을 보여 준다.
    // 사진 alt는 "Part 1 사진 N"으로만 쓴다. 장면을 설명하면 정답이 새어 나간다.
    function part1Items() { return window.PART1 || []; }
    function currentPart1() { return part1Items()[part1Index % part1Items().length]; }
    function part1Letter(index) { return String.fromCharCode(65 + index); }

    function renderPart1() {
      var list = part1Items();
      var counter = document.getElementById("part1-counter");
      if (!list.length) {
        counter.textContent = "사진 문제가 없어요.";
        return;
      }
      var item = currentPart1();
      var position = part1Index % list.length + 1;
      var supported = window.Speech.isSupported();
      counter.textContent = "사진 " + position + " / " + list.length;
      var photo = document.getElementById("part1-photo");
      document.getElementById("part1-photo-fallback").hidden = true;
      photo.hidden = false;
      photo.setAttribute("alt", "Part 1 사진 " + position);
      photo.setAttribute("src", "../" + item.img);
      document.getElementById("part1-feedback").replaceChildren();
      document.getElementById("part1-next").hidden = true;
      var choices = document.getElementById("part1-choices");
      choices.replaceChildren();
      item.choices.forEach(function (choice, index) {
        var row = document.createElement("div");
        row.className = "listening-choice-row";
        var answerButton = document.createElement("button");
        answerButton.type = "button";
        answerButton.className = "listening-choice-answer";
        // 음성을 못 쓰는 브라우저에서만 처음부터 문장을 보여 준다(그래야 풀 수 있다).
        answerButton.textContent = "(" + part1Letter(index) + ")" + (supported ? "" : " " + choice);
        answerButton.addEventListener("click", function () {
          gradeListeningChoice("part1", item, index, choices, function () {
            Array.from(choices.children).forEach(function (choiceRow, choiceIndex) {
              choiceRow.querySelector(".listening-choice-answer").textContent =
                "(" + part1Letter(choiceIndex) + ") " + item.choices[choiceIndex];
            });
            document.getElementById("part1-next").hidden = false;
          });
        });
        var playButton = document.createElement("button");
        playButton.type = "button";
        playButton.className = "listening-choice-play listening-playback-control";
        playButton.textContent = "▶";
        playButton.disabled = !supported;
        playButton.setAttribute("aria-label", "(" + part1Letter(index) + ") 문장 듣기");
        playButton.addEventListener("click", function () {
          document.getElementById("listening-fallback-note").hidden = true;
          speakText(choice, playButton, "part1-message");
        });
        row.append(answerButton, playButton);
        choices.appendChild(row);
      });
    }

    // "A. 문장" 네 줄을 차례로 읽는다. 첫 줄은 클릭 핸들러 안에서 바로 speak()해야 iOS에서 막히지 않는다.
    function playPart1All(button) {
      if (!window.Speech.isSupported()) {
        messageAt("part1-message", window.Speech.UNSUPPORTED_MESSAGE);
        return Promise.resolve();
      }
      if (!part1Items().length) return Promise.resolve();
      var item = currentPart1();
      var token = ++currentUtteranceToken;
      if (currentPlaybackButton && currentPlaybackButton !== button) currentPlaybackButton.disabled = false;
      currentPlaybackButton = button;
      button.disabled = true;
      messageAt("part1-message", "");
      function speakOne(text) {
        if (token !== currentUtteranceToken) return undefined;
        return window.Speech.speak(text, {
          rate: voiceSettings.rate,
          voice: voiceSettings.voiceSelected ? voiceSettings.locale : null,
          lang: voiceSettings.voiceSelected ? voiceSettings.locale : "en-US",
          fallbackLang: "en-US",
          onVoiceUnavailable: handleVoiceUnavailable,
          onFallback: handleVoiceFallback
        });
      }
      var texts = item.choices.map(function (choice, index) { return part1Letter(index) + ". " + choice; });
      var sequence = Promise.resolve(speakOne(texts[0]));
      texts.slice(1).forEach(function (text) {
        sequence = sequence.then(function () { return speakOne(text); });
      });
      return sequence.catch(function (error) {
        if (token === currentUtteranceToken) messageAt("part1-message", error.message);
      }).then(function () {
        if (token === currentUtteranceToken) {
          button.disabled = false;
          currentPlaybackButton = null;
        }
      });
    }

    function renderPart2() {
      var item = window.PART2[part2Index % window.PART2.length];
      var choices = document.getElementById("part2-choices");
      document.getElementById("part2-counter").textContent =
        "문제 " + (part2Index % window.PART2.length + 1) + " / " + window.PART2.length;
      document.getElementById("part2-script").textContent = item.question;
      document.getElementById("part2-script").hidden = window.Speech.isSupported();
      var toggle = document.getElementById("part2-script-toggle");
      toggle.textContent = window.Speech.isSupported() ? "스크립트 보기" : "스크립트 숨기기";
      toggle.setAttribute("aria-expanded", String(!window.Speech.isSupported()));
      document.getElementById("part2-feedback").replaceChildren();
      document.getElementById("part2-next").hidden = true;
      choices.replaceChildren();
      item.choices.forEach(function (choice, index) {
        var row = document.createElement("div");
        row.className = "listening-choice-row";
        var answerButton = document.createElement("button");
        answerButton.type = "button";
        answerButton.className = "listening-choice-answer";
        answerButton.textContent = "(" + String.fromCharCode(65 + index) + ") " + choice;
        answerButton.addEventListener("click", function () { gradeListeningChoice("part2", item, index, row.parentNode); });
        var playButton = document.createElement("button");
        playButton.type = "button";
        playButton.className = "listening-choice-play listening-playback-control";
        playButton.textContent = "▶";
        playButton.disabled = !window.Speech.isSupported();
        playButton.setAttribute("aria-label", "보기 " + String.fromCharCode(65 + index) + " 재생");
        playButton.addEventListener("click", function () {
          speakText(choice, playButton, "part2-message");
        });
        row.append(answerButton, playButton);
        choices.appendChild(row);
      });
    }

    // onAnswered: Part 3·4가 채점 뒤 "다음 문제"·스크립트 버튼을 보이게 하는 콜백
    function gradeListeningChoice(type, item, answer, choicesContainer, onAnswered) {
      var correctAnswer = item.answer;
      var rows = Array.from(choicesContainer.children);
      rows.forEach(function (row, index) {
        row.querySelector(".listening-choice-answer").disabled = true;
        if (index === correctAnswer) row.querySelector(".listening-choice-answer").classList.add("correct");
        else if (index === answer) row.querySelector(".listening-choice-answer").classList.add("incorrect");
      });
      var isCorrect = answer === correctAnswer;
      window.Progress.recordListeningAnswer(type, isCorrect);
      var feedback = document.getElementById(type + "-feedback");
      feedback.replaceChildren();
      feedback.append(
        makeFeedbackLine(isCorrect ? "정답이에요!" : "아쉬워요. 정답을 확인해 보세요.", isCorrect ? "answer-right" : "answer-wrong"),
        makeFeedbackLine(item.explanation || item.ko, "listening-explanation")
      );
      if (item.ko) feedback.appendChild(makeFeedbackLine(item.ko, "listening-translation"));
      if (type === "part2") document.getElementById("part2-next").hidden = false;
      if (onAnswered) onAnswered();
    }

    function makeFeedbackLine(text, className) {
      var line = document.createElement("p");
      line.className = className;
      line.textContent = text;
      return line;
    }

    function showDictationAnswer() {
      var item = currentDictation();
      var result = document.getElementById("dictation-result");
      result.replaceChildren(makeFeedbackLine(item.text, "en dictation-full-answer"));
      document.getElementById("dictation-translation").hidden = false;
    }

    // 화자별 음성 배정·대사 정리는 listening-voices.js에 있다 (실전 LC 풀세트와 공용).
    function speakerName(item, label) { return window.ListeningVoices.speakerName(item, label); }
    function speakerProfiles(lines) { return window.ListeningVoices.profiles(lines, voiceSettings); }
    function talkLines(item) { return window.ListeningVoices.talkLines(item); }

    // Part 3·Part 4 공통 화면: 듣기 → 문제 시작 → 문항마다 채점·스크립트 → 다음 항목.
    // 요소 id는 prefix-counter, prefix-play 처럼 prefix만 다르고 구조는 같다.
    // config: prefix, dataKey(window의 배열 이름), unit(대화/담화), nextSuffix, speakerLabels(스크립트·다시 듣기에 화자 이름 표시)
    function createTalkSection(config) {
      var state = { index: 0, questionIndex: 0, ready: false, answered: false };
      function $(suffix) { return document.getElementById(config.prefix + "-" + suffix); }
      function items() { return window[config.dataKey] || []; }
      function current() { return items()[state.index % items().length]; }

      // "다시 듣기"에서만 지금 읽는 대사의 화자 이름을 보여 준다(대사 내용은 보여 주지 않는다). 담화는 표시 영역이 없다.
      function showNowSpeaking(text) {
        var node = $("now-speaking");
        if (!node) return;
        node.textContent = text || "";
        node.hidden = !text;
      }

      function hideScript() {
        $("script-toggle").textContent = "스크립트 보기";
        $("script-toggle").setAttribute("aria-expanded", "false");
        $("script").hidden = true;
      }

      function render() {
        if (!items().length) return;
        var item = current();
        showNowSpeaking("");
        $("counter").textContent =
          config.unit + " " + (state.index % items().length + 1) + " / " + items().length + " · " + item.title;
        state.ready = false;
        state.questionIndex = 0;
        state.answered = false;
        $("start-questions").disabled = true;
        $("quiz").hidden = true;
        $(config.nextSuffix).hidden = true;
        $("script-toggle").hidden = true;
        hideScript();
        var transcript = $("script");
        transcript.replaceChildren();
        talkLines(item).forEach(function (line) {
          var paragraph = document.createElement("p");
          paragraph.className = "listening-transcript-line en";
          if (config.speakerLabels) {
            var speaker = document.createElement("span");
            speaker.className = "listening-speaker";
            speaker.textContent = speakerName(item, line.speaker) + ": ";
            paragraph.appendChild(speaker);
          }
          paragraph.appendChild(document.createTextNode(line.text));
          transcript.appendChild(paragraph);
        });
        if (!window.Speech.isSupported()) {
          transcript.hidden = false;
          $("quiz").hidden = false;
          $("script-toggle").hidden = false;
          $("script-toggle").textContent = "스크립트 숨기기";
          $("script-toggle").setAttribute("aria-expanded", "true");
          $("start-questions").disabled = false;
          state.ready = true;
          messageAt(config.prefix + "-message", "음성 없이 스크립트를 읽고 문제를 풀 수 있어요.");
        }
      }

      function play(button, showSpeakers) {
        if (!window.Speech.isSupported()) {
          messageAt(config.prefix + "-message", window.Speech.UNSUPPORTED_MESSAGE);
          return Promise.resolve();
        }
        var item = current();
        var lines = talkLines(item);
        var token = ++currentUtteranceToken;
        showNowSpeaking("");
        if (currentPlaybackButton && currentPlaybackButton !== button) currentPlaybackButton.disabled = false;
        currentPlaybackButton = button;
        button.disabled = true;
        $("start-questions").disabled = true;
        messageAt(config.prefix + "-message", "");
        var profiles = speakerProfiles(lines);
        function speakLine(line) {
          if (token !== currentUtteranceToken) return undefined;
          var profile = profiles[line.speaker];
          if (showSpeakers && config.speakerLabels) showNowSpeaking("지금 말하는 사람: " + speakerName(item, line.speaker));
          return window.Speech.speak(line.text, {
            rate: voiceSettings.rate,
            voice: profile.voice,
            pitch: profile.pitch,
            rateScale: profile.rateScale,
            lang: voiceSettings.voiceSelected ? voiceSettings.locale : "en-US",
            fallbackLang: "en-US",
            onVoiceUnavailable: handleVoiceUnavailable,
            onFallback: handleVoiceFallback
          });
        }
        // 첫 대사는 클릭 핸들러 안에서 바로 재생해야 iOS에서 막히지 않는다. 이후 대사는 차례로 잇는다.
        var sequence = Promise.resolve(speakLine(lines[0]));
        lines.slice(1).forEach(function (line) {
          sequence = sequence.then(function () { return speakLine(line); });
        });
        return sequence.then(function () {
          if (token !== currentUtteranceToken) return;
          state.ready = true;
          $("start-questions").disabled = false;
          messageAt(config.prefix + "-message", config.unit + "가 끝났어요. 문제를 시작하거나 다시 들을 수 있어요.");
        }).catch(function (error) {
          if (token === currentUtteranceToken) messageAt(config.prefix + "-message", error.message);
        }).then(function () {
          if (token === currentUtteranceToken) {
            button.disabled = false;
            currentPlaybackButton = null;
            showNowSpeaking("");
          }
        });
      }

      function renderQuestion() {
        var item = current();
        var question = item.questions[state.questionIndex];
        var choices = $("choices");
        state.answered = false;
        $("question-counter").textContent = "문제 " + (state.questionIndex + 1) + " / " + item.questions.length;
        $("question").textContent = question.q;
        $("feedback").replaceChildren();
        $("next").hidden = true;
        $("script-toggle").hidden = true;
        hideScript();
        choices.replaceChildren();
        question.choices.forEach(function (choice, index) {
          var row = document.createElement("div");
          row.className = "listening-choice-row";
          var button = document.createElement("button");
          button.type = "button";
          button.className = "listening-choice-answer";
          button.textContent = "(" + String.fromCharCode(65 + index) + ") " + choice;
          button.addEventListener("click", function () {
            gradeListeningChoice(config.prefix, question, index, choices, function () {
              state.answered = true;
              $("next").hidden = false;
              $("script-toggle").hidden = false;
            });
          });
          row.appendChild(button);
          choices.appendChild(row);
        });
      }

      function bind() {
        if (!items().length) return;
        $("play").addEventListener("click", function () {
          document.getElementById("listening-fallback-note").hidden = true;
          play(this);
        });
        $("replay").addEventListener("click", function () {
          document.getElementById("listening-fallback-note").hidden = true;
          play(this, true);
        });
        $("start-questions").addEventListener("click", function () {
          if (!state.ready) return;
          $("quiz").hidden = false;
          renderQuestion();
        });
        $("next").addEventListener("click", function () {
          if (!state.answered) return;
          state.questionIndex += 1;
          if (state.questionIndex < current().questions.length) {
            renderQuestion();
          } else {
            $("next").hidden = true;
            $("script-toggle").hidden = false;
            $(config.nextSuffix).hidden = false;
          }
        });
        $("script-toggle").addEventListener("click", function () {
          toggleScript(config.prefix + "-script-toggle", config.prefix + "-script");
        });
        $(config.nextSuffix).addEventListener("click", function () {
          state.index += 1;
          render();
          messageAt(config.prefix + "-message", "");
        });
      }

      return { render: render, bind: bind };
    }

    var talkSections = [
      createTalkSection({ prefix: "part3", dataKey: "PART3", unit: "대화", nextSuffix: "next-dialogue", speakerLabels: true }),
      createTalkSection({ prefix: "part4", dataKey: "PART4", unit: "담화", nextSuffix: "next-talk", speakerLabels: false })
    ];

    function bindTabs() {
      document.querySelectorAll('[role="tab"][id^="listening-tab-"]').forEach(function (tab) {
        tab.addEventListener("click", function () {
          showTab(tab.id.replace("listening-tab-", ""));
        });
        tab.addEventListener("keydown", function (event) {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          var tabs = Array.from(document.querySelectorAll('[role="tab"][id^="listening-tab-"]'));
          var index = tabs.indexOf(tab);
          var step = event.key === "ArrowRight" ? 1 : -1;
          var next = tabs[(index + step + tabs.length) % tabs.length];
          showTab(next.id.replace("listening-tab-", ""));
          next.focus();
        });
      });
    }

    function toggleScript(buttonId, scriptId) {
      var button = document.getElementById(buttonId);
      var script = document.getElementById(scriptId);
      var expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      button.textContent = expanded ? "스크립트 보기" : "스크립트 숨기기";
      script.hidden = expanded;
    }

    bindTabs();
    voiceSettings = window.Speech.getSettings();
    rateSelect.value = String(voiceSettings.rate);
    populateVoices();
    setSupportState();
    if (window.speechSynthesis && typeof window.speechSynthesis.addEventListener === "function") {
      window.speechSynthesis.addEventListener("voiceschanged", populateVoices);
    }
    window.Speech.waitForVoices().then(populateVoices);
    rateSelect.addEventListener("change", function () {
      voiceSettings = window.Speech.saveSettings({ rate: Number(rateSelect.value) });
    });
    localeSelect.addEventListener("change", function () {
      voiceSettings = window.Speech.saveSettings({ locale: localeSelect.value, voiceSelected: true });
    });
    window.addEventListener("beforeunload", stopPlayback);

    renderDictation();
    var part1Photo = document.getElementById("part1-photo");
    part1Photo.addEventListener("error", function () {
      part1Photo.hidden = true;
      document.getElementById("part1-photo-fallback").hidden = false;
    });
    part1Photo.addEventListener("load", function () {
      part1Photo.hidden = false;
      document.getElementById("part1-photo-fallback").hidden = true;
    });
    renderPart1();
    renderPart2();
    talkSections.forEach(function (section) { section.render(); });
    if (!window.Speech.isSupported()) {
      showDictationAnswer();
    }

    document.getElementById("dictation-play").addEventListener("click", function () {
      document.getElementById("listening-fallback-note").hidden = true;
      speakText(currentDictation().text, this, "dictation-message");
    });
    document.getElementById("dictation-replay").addEventListener("click", function () {
      document.getElementById("listening-fallback-note").hidden = true;
      speakText(currentDictation().text, this, "dictation-message");
    });
    document.getElementById("dictation-slow").addEventListener("click", function () {
      document.getElementById("listening-fallback-note").hidden = true;
      speakText(currentDictation().text, this, "dictation-message", 0.7);
    });
    document.getElementById("dictation-check").addEventListener("click", gradeDictation);
    document.getElementById("dictation-input").addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !event.isComposing && !document.getElementById("dictation-check").disabled) {
        event.preventDefault();
        gradeDictation();
      }
    });
    document.getElementById("dictation-show-answer").addEventListener("click", function () {
      showDictationAnswer();
    });
    document.getElementById("dictation-next").addEventListener("click", function () {
      dictationIndex += 1;
      renderDictation();
      messageAt("dictation-message", "");
    });

    document.getElementById("part1-play-all").addEventListener("click", function () {
      document.getElementById("listening-fallback-note").hidden = true;
      playPart1All(this);
    });
    document.getElementById("part1-next").addEventListener("click", function () {
      part1Index += 1;
      renderPart1();
      messageAt("part1-message", "");
    });

    document.getElementById("part2-play-question").addEventListener("click", function () {
      document.getElementById("listening-fallback-note").hidden = true;
      speakText(window.PART2[part2Index % window.PART2.length].question, this, "part2-message");
    });
    document.getElementById("part2-script-toggle").addEventListener("click", function () {
      toggleScript("part2-script-toggle", "part2-script");
    });
    document.getElementById("part2-next").addEventListener("click", function () {
      part2Index += 1;
      renderPart2();
      messageAt("part2-message", "");
    });

    talkSections.forEach(function (section) { section.bind(); });
  });
}());
