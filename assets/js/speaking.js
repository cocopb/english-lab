(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var patternList = window.PATTERNS.slice();
    var rolePlayList = window.ROLEPLAYS.slice();
    var shadowingList = window.SHADOWING.slice().sort(function (a, b) {
      return a.en.trim().split(/\s+/).length - b.en.trim().split(/\s+/).length;
    });
    var patternRoot = document.getElementById("speaking-pattern-exercise");
    var rolePlayRoot = document.getElementById("speaking-roleplay-exercise");
    var shadowingRoot = document.getElementById("speaking-shadowing-exercise");
    var notice = document.getElementById("speaking-notice");
    var patternIndex = 0;
    var drillIndex = 0;
    var rolePlayIndex = 0;
    var rolePlayInitialized = false;
    var turnIndex = 0;
    var rolePlayResults = [];
    var shadowingIndex = 0;
    var speakingRate = 1;
    var activeMicStop = null;

    function element(tag, className, text) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      if (text !== undefined) node.textContent = text;
      return node;
    }

    function secureRecognitionContext() {
      return window.isSecureContext || window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
    }

    function canUseRecognition() {
      return window.Listen.isSupported() && secureRecognitionContext();
    }

    if (!window.Listen.isSupported()) {
      notice.textContent = "이 브라우저는 음성 인식을 지원하지 않아 입력으로 연습합니다. 음성 기능을 쓰려면 HTTPS 또는 localhost에서 접속하세요.";
    } else if (!secureRecognitionContext()) {
      notice.textContent = "음성 인식은 HTTPS 또는 localhost에서만 사용할 수 있어요. 현재는 입력으로 연습하세요.";
    }

    function showTab(name) {
      ["patterns", "roleplay", "shadowing"].forEach(function (tabName) {
        var selected = name === tabName;
        var tab = document.getElementById("speaking-tab-" + tabName);
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        document.getElementById("speaking-panel-" + tabName).hidden = !selected;
      });
      stopCurrentInput();
      if (name === "roleplay" && !rolePlayInitialized) {
        rolePlayInitialized = true;
        renderRolePlay(true);
      }
    }

    ["patterns", "roleplay", "shadowing"].forEach(function (name, index, names) {
      var tab = document.getElementById("speaking-tab-" + name);
      tab.addEventListener("click", function () { showTab(name); });
      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        var next = (index + (event.key === "ArrowRight" ? 1 : names.length - 1)) % names.length;
        document.getElementById("speaking-tab-" + names[next]).focus();
        showTab(names[next]);
      });
    });

    function stopCurrentInput() {
      window.Listen.stop();
      if (typeof activeMicStop === "function") {
        activeMicStop();
        activeMicStop = null;
      }
    }

    function speechErrorMessage(error) {
      if (error.error === "not-allowed" || error.error === "service-not-allowed" || error.error === "NotAllowedError") {
        return "마이크 권한이 거부됐어요. 브라우저 설정에서 마이크를 허용하거나 직접 입력해 주세요.";
      }
      if (error.error === "insecure-context") {
        return "음성 인식은 HTTPS 또는 localhost에서만 사용할 수 있어요. 직접 입력해 주세요.";
      }
      if (error.error === "unsupported") {
        return "이 브라우저는 음성 인식을 지원하지 않아요. 직접 입력해 주세요.";
      }
      if (error.error === "no-speech") return "음성이 들리지 않았어요. 다시 말하거나 직접 입력해 주세요.";
      return "음성 인식을 시작할 수 없어요. 직접 입력해 주세요.";
    }

    function playSpeech(text, rate, status) {
      if (!window.Speech.isSupported()) {
        status.textContent = "이 브라우저는 음성 재생을 지원하지 않아요.";
        return;
      }
      status.textContent = "음성을 재생하고 있어요…";
      window.Speech.speak(text, { rate: rate }).then(function () {
        status.textContent = "재생이 끝났어요.";
      }).catch(function (error) {
        status.textContent = error.message;
      });
    }

    function createResponseControls(container, onSubmit) {
      var controls = element("div", "speaking-response");
      var input = element("input", "speaking-answer");
      input.type = "text";
      input.autocomplete = "off";
      input.autocapitalize = "none";
      input.spellcheck = false;
      input.placeholder = "영어로 입력하거나 마이크로 말해 보세요";
      input.setAttribute("aria-label", "영어 답변");
      var micButton = element("button", "button button-quiet speaking-mic", "🎤 말하기");
      micButton.type = "button";
      micButton.hidden = !canUseRecognition();
      var submitButton = element("button", "button button-primary", "제출");
      submitButton.type = "button";
      submitButton.disabled = true;
      var inputNotice = element("p", "speaking-input-notice", "");
      inputNotice.setAttribute("role", "status");
      var actions = element("div", "button-row speaking-input-actions");
      actions.append(micButton, submitButton);
      controls.append(input, actions, inputNotice);
      container.appendChild(controls);

      function submit() {
        if (!input.value.trim()) return;
        stopCurrentInput();
        onSubmit(input.value.trim(), controls);
      }

      input.addEventListener("input", function () {
        submitButton.disabled = !input.value.trim();
      });
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !submitButton.disabled) submit();
      });
      submitButton.addEventListener("click", submit);
      micButton.addEventListener("click", function () {
        if (micButton.getAttribute("aria-pressed") === "true") {
          stopCurrentInput();
          return;
        }
        inputNotice.textContent = "듣고 있어요. 영어로 말해 주세요.";
        micButton.setAttribute("aria-pressed", "true");
        micButton.textContent = "■ 듣기 중지";
        activeMicStop = function () {
          micButton.setAttribute("aria-pressed", "false");
          micButton.textContent = "🎤 말하기";
        };
        var started = window.Listen.start(function (transcript, metadata) {
          input.value = transcript;
          submitButton.disabled = !transcript.trim();
          if (metadata.isFinal) {
            micButton.setAttribute("aria-pressed", "false");
            micButton.textContent = "🎤 다시 말하기";
            activeMicStop = null;
            inputNotice.textContent = transcript ? "인식 결과를 확인하고 제출을 눌러 주세요." : "음성이 인식되지 않았어요. 다시 말하거나 직접 입력해 주세요.";
            input.focus();
          }
        }, function (error) {
          micButton.setAttribute("aria-pressed", "false");
          micButton.textContent = "🎤 말하기";
          activeMicStop = null;
          inputNotice.textContent = speechErrorMessage(error);
          if (error.error === "not-allowed" || error.error === "service-not-allowed" ||
              error.error === "insecure-context" || error.error === "unsupported") {
            micButton.hidden = true;
          }
          input.focus();
        });
        if (!started) {
          micButton.setAttribute("aria-pressed", "false");
          micButton.textContent = "🎤 말하기";
          activeMicStop = null;
        }
      });
      return { input: input, notice: inputNotice };
    }

    function scoreWords(result) {
      var output = element("p", "speaking-word-comparison en");
      result.words.forEach(function (word, index) {
        var token = element("span", word.ok ? "speaking-word is-correct" : "speaking-word is-incorrect", word.word);
        output.appendChild(token);
        if (index < result.words.length - 1) output.appendChild(document.createTextNode(" "));
      });
      return output;
    }

    function compareBest(answer, targets) {
      return targets.map(function (target) {
        return { target: target, result: window.compareSpeech(answer, target) };
      }).sort(function (a, b) {
        return b.result.accuracy - a.result.accuracy;
      })[0];
    }

    function renderPatternSelector() {
      var picker = element("div", "speaking-picker panel");
      var label = element("label", "field", "연습 패턴");
      var select = element("select");
      select.setAttribute("aria-label", "연습 패턴 선택");
      patternList.forEach(function (pattern, index) {
        var option = element("option", "", "패턴 " + String(index + 1).padStart(2, "0") + " · " + pattern.meaning);
        option.value = pattern.id;
        select.appendChild(option);
      });
      select.value = patternList[patternIndex].id;
      select.addEventListener("change", function () {
        patternIndex = patternList.findIndex(function (pattern) { return pattern.id === select.value; });
        drillIndex = 0;
        renderPattern();
      });
      label.appendChild(select);
      picker.append(label);
      return picker;
    }

    function renderPattern() {
      stopCurrentInput();
      patternRoot.replaceChildren();
      if (!patternList.length) {
        patternRoot.appendChild(element("div", "placeholder", "연습할 패턴이 없습니다."));
        return;
      }
      var pattern = patternList[patternIndex];
      var drill = pattern.drills[drillIndex];
      var progress = window.Progress.get().speakingStats;
      var card = element("article", "panel speaking-card");
      card.append(
        element("p", "speaking-progress", "패턴 " + (patternIndex + 1) + " / " + patternList.length +
          " · 문장 " + (drillIndex + 1) + " / " + pattern.drills.length),
        element("h3", "speaking-pattern-meaning", pattern.meaning),
        element("p", "speaking-tip", pattern.tip),
        element("p", "speaking-prompt", drill.ko)
      );
      var activity = element("div", "speaking-activity");
      var resultArea = element("div", "speaking-result-area");
      card.append(activity, resultArea);
      patternRoot.append(renderPatternSelector(), card);
      var responses = createResponseControls(activity, function (answer, controls) {
        controls.remove();
        var result = window.compareSpeech(answer, drill.en);
        var passed = result.accuracy >= 0.8;
        var feedback = element("div", "speaking-feedback " + (passed ? "is-passed" : "is-retry"));
        feedback.append(
          element("p", "speaking-score", (passed ? "통과" : "재시도") + " · 정확도 " + Math.round(result.accuracy * 100) + "%"),
          element("p", "speaking-model en", "모범답안: " + drill.en),
          scoreWords(result)
        );
        var ttsButton = element("button", "button button-quiet", "🔊 모범답안 듣기");
        ttsButton.type = "button";
        var ttsStatus = element("p", "speaking-audio-status", "");
        ttsButton.addEventListener("click", function () {
          playSpeech(drill.en, speakingRate, ttsStatus);
        });
        feedback.append(ttsButton, ttsStatus);
        if (passed) {
          if (drillIndex === pattern.drills.length - 1) window.Progress.recordSpeakingPattern(pattern.id);
          var nextButton = element("button", "button button-primary", drillIndex === pattern.drills.length - 1 ? "패턴 완료" : "다음 문장");
          nextButton.type = "button";
          nextButton.addEventListener("click", function () {
            if (drillIndex < pattern.drills.length - 1) drillIndex += 1;
            else {
              patternIndex = (patternIndex + 1) % patternList.length;
              drillIndex = 0;
            }
            renderPattern();
          });
          feedback.appendChild(nextButton);
        } else {
          var retryButton = element("button", "button button-primary", "다시 도전");
          retryButton.type = "button";
          retryButton.addEventListener("click", renderPattern);
          feedback.appendChild(retryButton);
        }
        resultArea.appendChild(feedback);
      });
      responses.input.focus();
      var completed = element("p", "speaking-saved-progress", "완료한 패턴 " + progress.patternsPassed.length + " / " + patternList.length);
      card.appendChild(completed);
    }

    function renderRolePlaySelector() {
      var picker = element("div", "speaking-picker panel");
      var label = element("label", "field", "상황 선택");
      var select = element("select");
      select.setAttribute("aria-label", "롤플레이 상황 선택");
      rolePlayList.forEach(function (rolePlay) {
        var option = element("option", "", rolePlay.title);
        option.value = rolePlay.id;
        select.appendChild(option);
      });
      select.value = rolePlayList[rolePlayIndex].id;
      select.addEventListener("change", function () {
        rolePlayIndex = rolePlayList.findIndex(function (rolePlay) { return rolePlay.id === select.value; });
        turnIndex = 0;
        rolePlayResults = [];
        renderRolePlay(true);
      });
      label.appendChild(select);
      picker.appendChild(label);
      return picker;
    }

    function renderRolePlaySummary(rolePlay) {
      stopCurrentInput();
      rolePlayRoot.replaceChildren();
      var passed = rolePlayResults.filter(function (result) { return result.passed; }).length;
      var summary = element("article", "panel speaking-summary");
      summary.append(
        element("h3", "", rolePlay.title + " · 대화 완료"),
        element("p", "speaking-score", passed + " / " + rolePlayResults.length + "턴 통과")
      );
      var transcript = element("ol", "speaking-transcript");
      rolePlay.turns.forEach(function (turn) {
        if (turn.who === "other") {
          transcript.appendChild(element("li", "", "상대방: " + turn.en));
        } else {
          transcript.appendChild(element("li", "", "나: " + turn.model));
        }
      });
      summary.append(element("h4", "", "모범 대화"), transcript);
      var replay = element("button", "button button-primary", "처음부터 다시");
      replay.type = "button";
      replay.addEventListener("click", function () {
        turnIndex = 0;
        rolePlayResults = [];
        renderRolePlay(true);
      });
      summary.appendChild(replay);
      rolePlayRoot.append(renderRolePlaySelector(), summary);
      window.Progress.recordRolePlay(rolePlay.id);
    }

    function renderRolePlay(playOtherTurn) {
      stopCurrentInput();
      rolePlayRoot.replaceChildren();
      if (!rolePlayList.length) {
        rolePlayRoot.appendChild(element("div", "placeholder", "연습할 상황이 없습니다."));
        return;
      }
      var rolePlay = rolePlayList[rolePlayIndex];
      if (turnIndex >= rolePlay.turns.length) {
        renderRolePlaySummary(rolePlay);
        return;
      }
      var turn = rolePlay.turns[turnIndex];
      var card = element("article", "panel speaking-card");
      card.append(
        element("p", "speaking-progress", rolePlay.title + " · 대화 " + (turnIndex + 1) + " / " + rolePlay.turns.length),
        element("p", "speaking-situation", rolePlay.situation)
      );
      var body = element("div", "speaking-activity");
      card.appendChild(body);
      rolePlayRoot.append(renderRolePlaySelector(), card);
      if (turn.who === "other") {
        body.append(
          element("p", "speaking-speaker", "상대방"),
          element("p", "speaking-other-line en", turn.en),
          element("p", "speaking-translation", turn.ko)
        );
        var actions = element("div", "button-row");
        var playButton = element("button", "button button-quiet", "🔊 다시 듣기");
        playButton.type = "button";
        var audioStatus = element("p", "speaking-audio-status", "");
        playButton.addEventListener("click", function () { playSpeech(turn.en, undefined, audioStatus); });
        var continueButton = element("button", "button button-primary", "계속");
        continueButton.type = "button";
        continueButton.addEventListener("click", function () {
          turnIndex += 1;
          renderRolePlay(true);
        });
        actions.append(playButton, continueButton);
        body.append(actions, audioStatus);
        if (playOtherTurn) playSpeech(turn.en, undefined, audioStatus);
        return;
      }
      body.append(
        element("p", "speaking-speaker", "내 차례"),
        element("p", "speaking-prompt", turn.instruction)
      );
      var responseArea = element("div", "speaking-result-area");
      body.appendChild(responseArea);
      var responses = createResponseControls(body, function (answer, controls) {
        controls.remove();
        var best = compareBest(answer, [turn.model].concat(turn.alts || []));
        var passed = best.result.accuracy >= 0.8;
        rolePlayResults.push({ passed: passed, answer: answer });
        var feedback = element("div", "speaking-feedback " + (passed ? "is-passed" : "is-retry"));
        feedback.append(
          element("p", "speaking-score", (passed ? "통과" : "재시도") + " · 정확도 " + Math.round(best.result.accuracy * 100) + "%"),
          element("p", "speaking-model en", "모범답안: " + turn.model),
          scoreWords(best.result),
          element("p", "speaking-comment", "💡 " + turn.comment)
        );
        var continueButton = element("button", "button button-primary", "다음 턴");
        continueButton.type = "button";
        continueButton.addEventListener("click", function () {
          turnIndex += 1;
          renderRolePlay(true);
        });
        feedback.appendChild(continueButton);
        responseArea.appendChild(feedback);
      });
      responses.input.focus();
    }

    function renderShadowing() {
      stopCurrentInput();
      shadowingRoot.replaceChildren();
      if (!shadowingList.length) {
        shadowingRoot.appendChild(element("div", "placeholder", "연습할 문장이 없습니다."));
        return;
      }
      var sentence = shadowingList[shadowingIndex];
      var stats = window.Progress.get().speakingStats;
      var card = element("article", "panel speaking-card");
      var picker = element("div", "speaking-picker-inline");
      var label = element("label", "field", "재생 속도");
      var rateSelect = element("select");
      [
        { value: "0.7", label: "0.7×" },
        { value: "0.85", label: "0.85×" },
        { value: "1", label: "1.0×" }
      ].forEach(function (rate) {
        var option = element("option", "", rate.label);
        option.value = rate.value;
        rateSelect.appendChild(option);
      });
      rateSelect.value = String(speakingRate);
      rateSelect.addEventListener("change", function () { speakingRate = Number(rateSelect.value); });
      label.appendChild(rateSelect);
      picker.appendChild(label);
      card.append(
        element("p", "speaking-progress", "문장 " + (shadowingIndex + 1) + " / " + shadowingList.length + " · 난이도 " + sentence.level),
        picker,
        element("p", "speaking-prompt", sentence.ko),
        element("p", "speaking-shadow-model en", sentence.en)
      );
      var playButton = element("button", "button button-quiet", "🔊 문장 재생");
      playButton.type = "button";
      var audioStatus = element("p", "speaking-audio-status", "");
      playButton.addEventListener("click", function () {
        playSpeech(sentence.en, speakingRate, audioStatus);
      });
      var activity = element("div", "speaking-activity");
      var resultArea = element("div", "speaking-result-area");
      card.append(playButton, audioStatus, activity, resultArea);
      var navigation = element("div", "button-row speaking-shadow-navigation");
      if (shadowingIndex > 0) {
        var previous = element("button", "button button-quiet", "이전 문장");
        previous.type = "button";
        previous.addEventListener("click", function () {
          shadowingIndex -= 1;
          renderShadowing();
        });
        navigation.appendChild(previous);
      }
      if (shadowingIndex < shadowingList.length - 1) {
        var next = element("button", "button button-quiet", "다음 문장");
        next.type = "button";
        next.addEventListener("click", function () {
          shadowingIndex += 1;
          renderShadowing();
        });
        navigation.appendChild(next);
      }
      navigation.appendChild(element("p", "speaking-saved-progress", "평균 정확도 " + Math.round(stats.shadowingAvg * 100) + "%"));
      card.appendChild(navigation);
      shadowingRoot.appendChild(card);
      var responses = createResponseControls(activity, function (answer, controls) {
        controls.remove();
        var result = window.compareSpeech(answer, sentence.en);
        window.Progress.recordShadowingAttempt(result.accuracy);
        var feedback = element("div", "speaking-feedback " + (result.accuracy >= 0.8 ? "is-passed" : "is-retry"));
        feedback.append(
          element("p", "speaking-score", "발음 정확도 " + Math.round(result.accuracy * 100) + "%"),
          scoreWords(result)
        );
        var retryButton = element("button", "button button-primary", "다시 따라 말하기");
        retryButton.type = "button";
        retryButton.addEventListener("click", renderShadowing);
        feedback.appendChild(retryButton);
        resultArea.appendChild(feedback);
        navigation.lastChild.textContent = "평균 정확도 " + Math.round(window.Progress.get().speakingStats.shadowingAvg * 100) + "%";
      });
      responses.input.focus();
    }

    renderPattern();
    renderShadowing();
    window.addEventListener("pagehide", function () {
      stopCurrentInput();
      window.Speech.stop();
    });
  });
}());
