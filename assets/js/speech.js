(function () {
  "use strict";

  var SETTINGS_KEY = "englishLabSpeechSettings";
  var defaultSettings = { rate: 0.85, locale: "en-US" };
  var currentUtterance = null;
  var currentResolve = null;
  var voicesReady = null;
  var speechGeneration = 0;
  var voicesLoaded = false;

  function isSupported() {
    return typeof window.speechSynthesis !== "undefined" &&
      typeof window.SpeechSynthesisUtterance === "function";
  }

  function readSettings() {
    try {
      var stored = localStorage.getItem(SETTINGS_KEY);
      if (!stored) return Object.assign({}, defaultSettings);
      var parsed = JSON.parse(stored);
      return {
        rate: [0.7, 0.85, 1].indexOf(Number(parsed.rate)) !== -1 ? Number(parsed.rate) : defaultSettings.rate,
        locale: ["en-US", "en-GB", "en-AU"].indexOf(parsed.locale) !== -1 ? parsed.locale : defaultSettings.locale
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
    if (!isSupported()) return [];
    return window.speechSynthesis.getVoices()
      .filter(function (voice) { return localeRank(voice) >= 0; })
      .sort(function (a, b) {
        return localeRank(a) - localeRank(b) || a.name.localeCompare(b.name);
      });
  }

  function waitForVoices() {
    if (!isSupported()) return Promise.resolve([]);
    if (getVoices().length) {
      voicesLoaded = true;
      return Promise.resolve(getVoices());
    }
    if (voicesLoaded) return Promise.resolve([]);
    if (voicesReady) return voicesReady;
    voicesReady = new Promise(function (resolve) {
      var done = false;
      var timeout;
      function finish() {
        if (done) return;
        done = true;
        voicesLoaded = true;
        window.speechSynthesis.removeEventListener("voiceschanged", finish);
        window.clearTimeout(timeout);
        resolve(getVoices());
      }
      window.speechSynthesis.addEventListener("voiceschanged", finish);
      timeout = window.setTimeout(finish, 1500);
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
    if (preferred && typeof preferred === "object") return preferred;
    var requestedLocale = typeof preferred === "string" ? preferred : readSettings().locale;
    var exact = voices.filter(function (voice) {
      return (voice.lang || "").toLowerCase() === requestedLocale.toLowerCase();
    });
    if (exact.length) return exact[0];
    return voices[0] || null;
  }

  function speak(text, options) {
    if (!isSupported()) return Promise.reject(new Error("이 브라우저는 음성 재생을 지원하지 않습니다."));
    if (typeof text !== "string" || !text.trim()) return Promise.reject(new TypeError("읽을 문장이 필요합니다."));

    var settings = readSettings();
    var opts = options || {};
    stop();
    var generation = speechGeneration;
    return waitForVoices().then(function (voices) {
      if (generation !== speechGeneration) return undefined;
      var utterance = new window.SpeechSynthesisUtterance(text);
      var voice = chooseVoice(voices, opts.voice);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = settings.locale;
      }
      utterance.rate = [0.7, 0.85, 1].indexOf(Number(opts.rate)) !== -1 ? Number(opts.rate) : settings.rate;

      return new Promise(function (resolve, reject) {
        currentUtterance = utterance;
        currentResolve = resolve;
        utterance.onend = function () {
          if (currentUtterance === utterance) {
            currentUtterance = null;
            currentResolve = null;
          }
          try {
            if (typeof opts.onEnd === "function") opts.onEnd();
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        utterance.onerror = function (event) {
          if (currentUtterance === utterance) {
            currentUtterance = null;
            currentResolve = null;
          }
          if (event.error === "canceled" || event.error === "interrupted") resolve();
          else reject(new Error("음성 재생에 실패했습니다: " + event.error));
        };
        window.speechSynthesis.speak(utterance);
      });
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

  window.Speech = {
    isSupported: isSupported,
    getVoices: getVoices,
    getSettings: readSettings,
    saveSettings: saveSettings,
    waitForVoices: waitForVoices,
    speak: speak,
    stop: stop
  };
}());
