(function () {
  "use strict";

  var SETTINGS_KEY = "englishLabSpeechSettings";
  var defaultSettings = { rate: 0.85, locale: "en-US", voiceSelected: false };
  var currentUtterance = null;
  var currentResolve = null;
  var voicesReady = null;
  var speechGeneration = 0;
  var unavailableVoiceIds = new Set();

  function voiceId(voice) {
    return voice.voiceURI || [voice.name, voice.lang].join("|");
  }

  function isVoiceUnavailable(voice) {
    return unavailableVoiceIds.has(voiceId(voice));
  }

  function isLocaleAvailable(locale) {
    var normalizedLocale = String(locale || "").toLowerCase();
    return getVoices().some(function (voice) {
      return (voice.lang || "").toLowerCase() === normalizedLocale && !isVoiceUnavailable(voice);
    });
  }

  // 지원 여부는 API 존재만으로 판단한다. 음성 목록이 비어 있는 것은 '아직 로드 전'일 수 있으므로
  // 미지원으로 보지 않는다 (모바일은 사용자 제스처 이후에야 목록이 채워지는 경우가 많다).
  function isSupported() {
    return "speechSynthesis" in window && !!window.speechSynthesis;
  }

  // 지원하지만 현재 알려진 영어 음성이 하나도 없는 상태 (로드 전이거나 실제로 없음)
  function hasEnglishVoices() {
    return getVoices().length > 0;
  }

  var NO_ENGLISH_VOICE_HINT = "기기에 영어 음성이 없으면 소리가 나지 않을 수 있습니다.";
  var UNSUPPORTED_MESSAGE = "이 브라우저는 음성 재생을 지원하지 않습니다.";

  function readSettings() {
    try {
      var stored = localStorage.getItem(SETTINGS_KEY);
      if (!stored) return Object.assign({}, defaultSettings);
      var parsed = JSON.parse(stored);
      if (!parsed || typeof parsed !== "object") return Object.assign({}, defaultSettings);
      return {
        rate: [0.7, 0.85, 1].indexOf(Number(parsed.rate)) !== -1 ? Number(parsed.rate) : defaultSettings.rate,
        locale: ["en-US", "en-GB", "en-AU"].indexOf(parsed.locale) !== -1 ? parsed.locale : defaultSettings.locale,
        voiceSelected: typeof parsed.voiceSelected === "boolean"
          ? parsed.voiceSelected
          : typeof parsed.locale === "string" && parsed.locale !== defaultSettings.locale
      };
    } catch (error) {
      console.warn("음성 설정을 읽지 못했습니다.", error);
      return Object.assign({}, defaultSettings);
    }
  }

  function saveSettings(values) {
    var settings = Object.assign(readSettings(), values || {});
    settings.rate = [0.7, 0.85, 1].indexOf(Number(settings.rate)) !== -1 ? Number(settings.rate) : defaultSettings.rate;
    if (["en-US", "en-GB", "en-AU"].indexOf(settings.locale) === -1) {
      settings.locale = defaultSettings.locale;
    }
    settings.voiceSelected = settings.voiceSelected === true;
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn("음성 설정을 저장하지 못했습니다.", error);
    }
    return settings;
  }

  function localeRank(voice) {
    var locale = (voice.lang || "").toLowerCase();
    if (locale === "en-us") return 0;
    if (locale === "en-gb") return 1;
    if (locale === "en-au") return 2;
    return locale.indexOf("en-") === 0 || locale === "en" ? 3 : -1;
  }

  function getVoices() {
    if (!isSupported() || typeof window.speechSynthesis.getVoices !== "function") return [];
    var voices;
    try {
      voices = window.speechSynthesis.getVoices() || [];
    } catch (error) {
      return [];
    }
    return Array.prototype.slice.call(voices)
      .filter(function (voice) { return localeRank(voice) >= 0; })
      .sort(function (a, b) {
        return localeRank(a) - localeRank(b) ||
          Number(b.localService === true) - Number(a.localService === true) ||
          a.name.localeCompare(b.name);
      });
  }

  function getAvailableVoices() {
    return getVoices().filter(function (voice) {
      return !isVoiceUnavailable(voice);
    });
  }

  function waitForVoices() {
    if (!isSupported()) return Promise.resolve([]);
    var available = getVoices();
    if (available.length) return Promise.resolve(available);
    if (voicesReady) return voicesReady;
    voicesReady = new Promise(function (resolve) {
      var done = false;
      var timeout;
      function finish() {
        if (done) return;
        done = true;
        if (typeof window.speechSynthesis.removeEventListener === "function") {
          window.speechSynthesis.removeEventListener("voiceschanged", finish);
        } else {
          window.speechSynthesis.onvoiceschanged = null;
        }
        window.clearTimeout(timeout);
        resolve(getVoices());
      }
      if (typeof window.speechSynthesis.addEventListener === "function") {
        window.speechSynthesis.addEventListener("voiceschanged", finish);
      } else {
        window.speechSynthesis.onvoiceschanged = finish;
      }
      timeout = window.setTimeout(finish, 2000);
    }).then(function (voices) {
      voicesReady = null;
      return voices;
    });
    return voicesReady;
  }

  function stop() {
    speechGeneration += 1;
    if (!isSupported()) return;
    window.speechSynthesis.cancel();
    if (currentResolve) currentResolve();
    currentResolve = null;
    currentUtterance = null;
  }

  function chooseVoice(voices, preferred) {
    if (preferred && typeof preferred === "object") {
      var selected = voices.filter(function (voice) {
        return (voice === preferred || (preferred.voiceURI && voice.voiceURI === preferred.voiceURI)) &&
          !isVoiceUnavailable(voice);
      });
      if (!selected.length) {
        selected = voices.filter(function (voice) {
          return voice.name === preferred.name && voice.lang === preferred.lang && !isVoiceUnavailable(voice);
        });
      }
      if (selected.length) {
        selected.sort(function (a, b) {
          return Number(b.localService === true) - Number(a.localService === true);
        });
        if (selected[0].localService === true) return selected[0];
        var localForSelectedLocale = voices.filter(function (voice) {
          return voice.localService === true &&
            (voice.lang || "").toLowerCase() === (selected[0].lang || "").toLowerCase();
        });
        return localForSelectedLocale[0] || selected[0];
      }
      return null;
    }
    if (typeof preferred !== "string" || !preferred) return null;
    var requestedLocale = preferred.toLowerCase();
    var exact = voices.filter(function (voice) {
      return (voice.lang || "").toLowerCase() === requestedLocale && !isVoiceUnavailable(voice);
    });
    if (!exact.length) return null;
    exact.sort(function (a, b) {
      return Number(b.localService === true) - Number(a.localService === true);
    });
    return exact[0];
  }

  // 재생은 호출 즉시(같은 클릭 핸들러 안에서 동기적으로) speechSynthesis.speak()까지 실행한다.
  // iOS Safari는 await 등으로 사용자 제스처를 벗어난 뒤의 speak()를 막는다.
  // 음성 목록은 이미 로드된 것만 사용하고, 비어 있으면 voice 없이 lang="en-US"로 재생한다.
  function speak(text, options) {
    if (!isSupported()) return Promise.reject(new Error(UNSUPPORTED_MESSAGE));
    if (typeof text !== "string" || !text.trim()) return Promise.reject(new TypeError("읽을 문장이 필요합니다."));

    var settings = readSettings();
    var opts = options || {};
    stop();
    var generation = speechGeneration;
    var voices = getVoices();
    if (!voices.length) waitForVoices(); // 백그라운드에서 목록 로딩만 계속한다 (재생은 기다리지 않음)
    return new Promise(function (resolve, reject) {
      var settled = false;
      var attempts = 0;
      var keepAliveTimer = null;
      var started = false;
      var selectedVoice = voices.length ? chooseVoice(voices, opts.voice) : null;
      var defaultLang = voices.length ? (opts.lang || settings.locale || "en-US") : "en-US";
      var requestedRate = Number(opts.rate);
      if ([0.7, 0.85, 1].indexOf(requestedRate) === -1) {
        requestedRate = [0.7, 0.85, 1].indexOf(Number(settings.rate)) !== -1
          ? Number(settings.rate)
          : defaultSettings.rate;
      }

      function clearPlaybackState() {
        if (keepAliveTimer !== null) {
          window.clearInterval(keepAliveTimer);
          keepAliveTimer = null;
        }
        currentUtterance = null;
      }

      function finish(error) {
        if (settled) return;
        settled = true;
        clearPlaybackState();
        if (currentResolve === cancelPlayback) currentResolve = null;
        if (error) reject(error);
        else resolve();
      }

      function cancelPlayback() {
        if (settled) return;
        settled = true;
        clearPlaybackState();
        if (currentResolve === cancelPlayback) currentResolve = null;
        resolve();
      }

      currentResolve = cancelPlayback;

      function markVoiceUnavailable(voice) {
        if (!voice) return;
        unavailableVoiceIds.add(voiceId(voice));
        if (typeof opts.onVoiceUnavailable === "function") {
          opts.onVoiceUnavailable(voice, isLocaleAvailable(voice.lang));
        }
        if (typeof opts.onFallback === "function") {
          opts.onFallback(voice, opts.fallbackLang || "en-US");
        }
      }

      function playAttempt(voice, rate, language) {
        if (generation !== speechGeneration || settled) {
          finish();
          return;
        }
        attempts += 1;
        var attemptNumber = attempts;
        var utterance;
        try {
          utterance = new window.SpeechSynthesisUtterance(text);
          utterance.lang = voice && voice.lang ? voice.lang : (language || defaultLang);
          if (voice) utterance.voice = voice;
          utterance.rate = rate;
        } catch (error) {
          console.warn("Speech playback utterance setup failed", {
            attempt: attemptNumber,
            message: error.message,
            voice: voice ? voice.name : "browser default",
            lang: voice && voice.lang ? voice.lang : (language || defaultLang),
            rate: rate
          });
          if (attemptNumber === 1) {
            markVoiceUnavailable(voice);
            playAttempt(null, requestedRate, opts.fallbackLang || "en-US");
          } else if (attemptNumber === 2) {
            playAttempt(null, 1, opts.fallbackLang || "en-US");
          }
          else finish(new Error("음성 재생을 준비하지 못했습니다: " + error.message));
          return;
        }
        currentUtterance = utterance;
        window.clearInterval(keepAliveTimer);
        keepAliveTimer = null;
        console.info("Speech playback attempt", {
          attempt: attemptNumber,
          voice: voice ? voice.name : "browser default",
          localService: voice ? voice.localService : null,
          lang: utterance.lang,
          rate: utterance.rate
        });
        utterance.onstart = function () {
          if (currentUtterance !== utterance || generation !== speechGeneration || settled || started) return;
          started = true;
          if (typeof opts.onStart === "function") {
            try { opts.onStart(); } catch (error) { console.warn("Speech onStart handler failed", error); }
          }
        };
        utterance.onend = function () {
          if (currentUtterance !== utterance || generation !== speechGeneration || settled) return;
          clearPlaybackState();
          try {
            if (typeof opts.onEnd === "function") opts.onEnd();
            finish();
          } catch (error) {
            finish(error);
          }
        };
        utterance.onerror = function (event) {
          if (currentUtterance !== utterance || generation !== speechGeneration || settled) return;
          if (event.error === "canceled" || event.error === "interrupted") {
            finish();
            return;
          }
          clearPlaybackState();
          console.warn("Speech playback attempt failed", {
            attempt: attemptNumber,
            error: event.error,
            voice: voice ? voice.name : "browser default",
            lang: utterance.lang,
            rate: utterance.rate
          });
          if (attemptNumber === 1) {
            markVoiceUnavailable(voice);
            playAttempt(null, requestedRate, opts.fallbackLang || "en-US");
          } else if (attemptNumber === 2) {
            playAttempt(null, 1, opts.fallbackLang || "en-US");
          } else {
            finish(new Error("음성 재생에 실패했습니다: " + event.error));
          }
        };
        try {
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
          keepAliveTimer = window.setInterval(function () {
            if (currentUtterance !== utterance || settled) return;
            try {
              window.speechSynthesis.pause();
              window.speechSynthesis.resume();
            } catch (error) {
              console.warn("Speech playback keep-alive failed", error);
            }
          }, 14000);
        } catch (error) {
          clearPlaybackState();
          console.warn("Speech playback could not be queued", {
            attempt: attemptNumber,
            message: error.message,
            voice: voice ? voice.name : "browser default",
            lang: utterance.lang,
            rate: utterance.rate
          });
          if (attemptNumber === 1) {
            markVoiceUnavailable(voice);
            playAttempt(null, requestedRate, opts.fallbackLang || "en-US");
          } else if (attemptNumber === 2) {
            playAttempt(null, 1, opts.fallbackLang || "en-US");
          }
          else finish(new Error("음성 재생을 시작하지 못했습니다: " + error.message));
        }
      }

      playAttempt(selectedVoice, requestedRate);
    });
  }

  var activeRecognition = null;
  var recognitionSupported = typeof window.SpeechRecognition === "function" ||
    typeof window.webkitSpeechRecognition === "function";

  function recognitionIsSupported() {
    return recognitionSupported;
  }

  function startRecognition(onResult, onError) {
    if (!recognitionIsSupported()) {
      if (typeof onError === "function") onError({ error: "unsupported" });
      return false;
    }
    if (!window.isSecureContext && window.location.hostname !== "localhost" &&
        window.location.hostname !== "127.0.0.1" && window.location.hostname !== "[::1]" &&
        window.location.hostname !== "::1") {
      if (typeof onError === "function") onError({ error: "insecure-context" });
      return false;
    }
    stopRecognition();
    var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition;
    try {
      recognition = new Recognition();
    } catch (error) {
      if (typeof onError === "function") {
        onError({ error: "start-failed", message: error.message });
      }
      return false;
    }
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = function (event) {
      var transcript = "";
      for (var index = event.resultIndex; index < event.results.length; index += 1) {
        transcript += event.results[index][0].transcript;
      }
      if (typeof onResult === "function") {
        onResult(transcript.trim(), { isFinal: event.results[event.results.length - 1].isFinal });
      }
    };
    recognition.onerror = function (event) {
      if (typeof onError === "function") onError(event);
    };
    recognition.onend = function () {
      if (activeRecognition === recognition) activeRecognition = null;
    };
    activeRecognition = recognition;
    try {
      recognition.start();
      return true;
    } catch (error) {
      activeRecognition = null;
      if (typeof onError === "function") {
        onError({ error: error.name === "NotAllowedError" ? "not-allowed" : "start-failed", message: error.message });
      }
      return false;
    }
  }

  function stopRecognition() {
    if (!activeRecognition) return;
    var recognition = activeRecognition;
    activeRecognition = null;
    try {
      recognition.stop();
    } catch (error) {
      if (error.name !== "InvalidStateError") throw error;
    }
  }

  var contractionMap = {
    "i'm": ["i", "am"],
    "i'd": ["i", "would"],
    "i'll": ["i", "will"],
    "i've": ["i", "have"],
    "you're": ["you", "are"],
    "you'd": ["you", "would"],
    "you'll": ["you", "will"],
    "you've": ["you", "have"],
    "we're": ["we", "are"],
    "we'd": ["we", "would"],
    "we'll": ["we", "will"],
    "we've": ["we", "have"],
    "they're": ["they", "are"],
    "they'd": ["they", "would"],
    "they'll": ["they", "will"],
    "they've": ["they", "have"],
    "he's": ["he", "is"],
    "he'd": ["he", "would"],
    "he'll": ["he", "will"],
    "she's": ["she", "is"],
    "she'd": ["she", "would"],
    "she'll": ["she", "will"],
    "it's": ["it", "is"],
    "it'd": ["it", "would"],
    "it'll": ["it", "will"],
    "that's": ["that", "is"],
    "that'd": ["that", "would"],
    "there's": ["there", "is"],
    "there'd": ["there", "would"],
    "what's": ["what", "is"],
    "what'd": ["what", "would"],
    "who's": ["who", "is"],
    "who'd": ["who", "would"],
    "where's": ["where", "is"],
    "when's": ["when", "is"],
    "how's": ["how", "is"],
    "let's": ["let", "us"],
    "can't": ["cannot"],
    "cannot": ["cannot"],
    "won't": ["will", "not"],
    "don't": ["do", "not"],
    "doesn't": ["does", "not"],
    "didn't": ["did", "not"],
    "isn't": ["is", "not"],
    "aren't": ["are", "not"],
    "wasn't": ["was", "not"],
    "weren't": ["were", "not"],
    "hasn't": ["has", "not"],
    "haven't": ["have", "not"],
    "hadn't": ["had", "not"],
    "wouldn't": ["would", "not"],
    "couldn't": ["could", "not"],
    "shouldn't": ["should", "not"],
    "mustn't": ["must", "not"],
    "mightn't": ["might", "not"]
  };

  function normalizeSpeechWords(text) {
    return String(text || "").toLowerCase().match(/[a-z0-9]+(?:'[a-z0-9]+)*/g) || [];
  }

  function expandSpeechWords(words) {
    return words.reduce(function (variants, word) {
      var alternatives = word === "i'd"
        ? [["i", "would"], ["i", "had"]]
        : [contractionMap[word] || [word]];
      return variants.reduce(function (expanded, variant) {
        alternatives.forEach(function (addition) {
          expanded.push(variant.concat(addition));
        });
        return expanded;
      }, []);
    }, [[]]);
  }

  function alignSpeechWords(target, said) {
    var rows = target.length + 1;
    var columns = said.length + 1;
    var matrix = Array.from({ length: rows }, function () { return Array(columns).fill(0); });
    for (var row = 0; row < rows; row += 1) matrix[row][0] = row;
    for (var column = 0; column < columns; column += 1) matrix[0][column] = column;
    for (var i = 1; i < rows; i += 1) {
      for (var j = 1; j < columns; j += 1) {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + (target[i - 1] === said[j - 1] ? 0 : 1)
        );
      }
    }
    var aligned = [];
    var targetIndex = target.length;
    var saidIndex = said.length;
    while (targetIndex || saidIndex) {
      if (targetIndex && saidIndex && target[targetIndex - 1] === said[saidIndex - 1] &&
          matrix[targetIndex][saidIndex] === matrix[targetIndex - 1][saidIndex - 1]) {
        aligned.push({ word: target[targetIndex - 1], said: said[saidIndex - 1], ok: true });
        targetIndex -= 1;
        saidIndex -= 1;
      } else if (targetIndex && saidIndex &&
          matrix[targetIndex][saidIndex] === matrix[targetIndex - 1][saidIndex - 1] + 1) {
        aligned.push({ word: target[targetIndex - 1], said: said[saidIndex - 1], ok: false });
        targetIndex -= 1;
        saidIndex -= 1;
      } else if (targetIndex && matrix[targetIndex][saidIndex] === matrix[targetIndex - 1][saidIndex] + 1) {
        aligned.push({ word: target[targetIndex - 1], said: "", ok: false });
        targetIndex -= 1;
      } else {
        aligned.push({ word: said[saidIndex - 1], said: said[saidIndex - 1], ok: false, extra: true });
        saidIndex -= 1;
      }
    }
    return aligned.reverse();
  }

  function compareSpeech(said, target) {
    var saidVariants = expandSpeechWords(normalizeSpeechWords(said));
    var targetVariants = expandSpeechWords(normalizeSpeechWords(target));
    var best = null;
    targetVariants.forEach(function (targetVariant) {
      saidVariants.forEach(function (saidVariant) {
        var words = alignSpeechWords(targetVariant, saidVariant);
        var correct = words.filter(function (word) { return word.ok; }).length;
        var denominator = Math.max(targetVariant.length, saidVariant.length);
        var accuracy = denominator ? correct / denominator : 1;
        if (!best || accuracy > best.accuracy || (accuracy === best.accuracy && words.length < best.words.length)) {
          best = { accuracy: accuracy, words: words };
        }
      });
    });
    return best || { accuracy: 1, words: [] };
  }

  window.Listen = {
    isSupported: recognitionIsSupported,
    start: startRecognition,
    stop: stopRecognition
  };
  window.compareSpeech = compareSpeech;

  // iOS 등에서 첫 재생이 무음이 되는 경우를 막기 위해, 페이지의 첫 사용자 입력 때
  // 소리 없는 빈 utterance를 한 번만 speak()해서 음성 엔진을 깨운다.
  var engineUnlocked = false;
  var unlockEvents = ["touchend", "click", "keydown"];
  function unlockSpeechEngine() {
    if (engineUnlocked) return;
    engineUnlocked = true;
    unlockEvents.forEach(function (type) { document.removeEventListener(type, unlockSpeechEngine, true); });
    if (!isSupported() || typeof window.SpeechSynthesisUtterance !== "function") return;
    if (currentUtterance || window.speechSynthesis.speaking) return; // 이미 재생 중이면 건드리지 않는다
    try {
      var silent = new window.SpeechSynthesisUtterance("");
      silent.volume = 0;
      window.speechSynthesis.speak(silent);
    } catch (error) {
      console.warn("Speech engine warm-up failed", error);
    }
  }
  if (isSupported() && typeof document !== "undefined" && typeof document.addEventListener === "function") {
    unlockEvents.forEach(function (type) { document.addEventListener(type, unlockSpeechEngine, true); });
  }

  window.Speech = {
    isSupported: isSupported,
    hasEnglishVoices: hasEnglishVoices,
    NO_ENGLISH_VOICE_HINT: NO_ENGLISH_VOICE_HINT,
    UNSUPPORTED_MESSAGE: UNSUPPORTED_MESSAGE,
    getVoices: getVoices,
    getAvailableVoices: getAvailableVoices,
    isVoiceUnavailable: isVoiceUnavailable,
    isLocaleAvailable: isLocaleAvailable,
    getSettings: readSettings,
    saveSettings: saveSettings,
    waitForVoices: waitForVoices,
    speak: speak,
    stop: stop
  };
}());
