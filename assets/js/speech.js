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
