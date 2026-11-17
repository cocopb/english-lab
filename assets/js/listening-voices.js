// 리스닝 음성 배정 (리스닝 페이지와 실전 LC 풀세트가 같은 규칙을 쓴다).
// speech.js(window.Speech)가 먼저 로드되어 있어야 한다.
(function () {
  "use strict";

  // 화자 라벨: W / M (기존) 또는 W1·W2·M1·M2 (3인 대화). 첫 글자가 성별이다.
  var VOICE_HINTS = {
    W: /female|woman|samantha|victoria|karen|susan|tessa|serena|zira|ava|allison|siri.*female/i,
    // 단어 경계를 둔다. 경계가 없으면 "Female"·"Samantha"(sa-man-tha) 같은 여성 음성이 남성으로 잡힌다.
    M: /\bmale\b|\bman\b|daniel|david|alex|george|fred|james|tom|guy|siri.*\bmale/i
  };
  // 한 음성을 두 화자 이상이 나눠 쓸 때, 두 번째 화자부터 pitch·속도 배율로 구분한다. 처음 쓰는 화자는 보정 없음.
  // 여성 화자는 높게·조금 느리게, 남성 화자는 낮게·조금 빠르게. 한 음성 안에서 같은 보정은 두 번 쓰지 않는다.
  var SHARED_VOICE_VARIANTS = {
    W: [{ pitch: 1.3, rateScale: 0.92 }, { pitch: 1.5, rateScale: 0.88 }, { pitch: 0.8, rateScale: 1.08 }],
    M: [{ pitch: 0.75, rateScale: 1.08 }, { pitch: 0.6, rateScale: 1.12 }, { pitch: 1.3, rateScale: 0.92 }]
  };

  function voiceGender(voice) {
    var name = voice && voice.name || "";
    if (VOICE_HINTS.W.test(name)) return "W";
    if (VOICE_HINTS.M.test(name)) return "M";
    return null;
  }

  function voiceKey(voice) {
    if (voice && typeof voice === "object") return "voice:" + (voice.voiceURI || voice.name + "|" + voice.lang);
    return "default:" + (voice || "");
  }

  function speakerGender(label) {
    return /^W/i.test(label) ? "W" : "M";
  }

  function speakerName(dialogue, label) {
    return (dialogue.speakers && dialogue.speakers[label]) || label;
  }

  // 대화마다 화자별 목소리를 한 번 정한다. 같은 화자는 대화 내내 같은 목소리다.
  // - 발음을 골랐으면 그 억양의 음성 안에서, 안 골랐으면 영어 음성 전체(en-US 먼저)에서 고른다.
  // - W·W1·W2는 여성 음성, M·M1·M2는 남성 음성. 같은 성별 화자가 여럿이면 서로 다른 음성을 쓴다.
  // - 음성이 모자라 한 음성을 나눠 쓰면 두 번째 화자부터 pitch·속도로 구분한다(남녀 사이도 마찬가지).
  function speakerProfiles(lines, settings) {
    settings = settings || window.Speech.getSettings();
    var labels = [];
    lines.forEach(function (line) { if (labels.indexOf(line.speaker) === -1) labels.push(line.speaker); });
    var selected = settings.voiceSelected;
    var voices = window.Speech.getVoices().filter(function (voice) {
      return !window.Speech.isVoiceUnavailable(voice) &&
        (!selected || (voice.lang || "").toLowerCase() === settings.locale.toLowerCase());
    });
    // speech.js는 원격 음성을 고르면 같은 억양의 로컬 음성으로 바꿔 재생한다(성별 무관).
    // 그러면 배정이 어긋나므로 로컬 음성이 있으면 로컬 음성 안에서만 나눈다.
    var localVoices = voices.filter(function (voice) { return voice.localService === true; });
    if (localVoices.length) voices = localVoices;
    var pools = {
      W: voices.filter(function (voice) { return voiceGender(voice) === "W"; }),
      M: voices.filter(function (voice) { return voiceGender(voice) === "M"; })
    };
    var unknown = voices.filter(function (voice) { return voiceGender(voice) === null; });
    var rank = { W: 0, M: 0 };
    var usage = {};
    var profiles = {};
    function assign(label, voice) {
      var key = voiceKey(voice);
      var used = usage[key] = usage[key] || [];
      var variant = null;
      if (used.length) {
        // 이 음성에 아직 쓰지 않은 보정 가운데 화자 성별에 맞는 것을 먼저 고른다.
        variant = SHARED_VOICE_VARIANTS[speakerGender(label)].filter(function (candidate) {
          return used.indexOf(candidate.pitch + "/" + candidate.rateScale) === -1;
        })[0] || null;
      }
      used.push(variant ? variant.pitch + "/" + variant.rateScale : "plain");
      profiles[label] = { voice: voice, pitch: variant ? variant.pitch : null, rateScale: variant ? variant.rateScale : null };
    }
    // 1차: 성별에 맞는 음성이 있는 화자부터 배정한다.
    labels.forEach(function (label) {
      var pool = pools[speakerGender(label)];
      if (!pool.length) return;
      assign(label, pool[rank[speakerGender(label)]++ % pool.length]);
    });
    // 2차: 성별을 알 수 있는 음성이 없는 화자. 발음을 골랐으면 그 억양의 다른 음성을,
    // 아니면 상대 성별 음성(없으면 브라우저 기본 음성)을 빌려 쓰고 pitch·속도로 구분한다.
    labels.forEach(function (label) {
      if (profiles[label]) return;
      var gender = speakerGender(label);
      var other = pools[gender === "W" ? "M" : "W"];
      var borrowed = selected
        ? (unknown[rank[gender]++ % Math.max(unknown.length, 1)] || other[0] || voices[0] || settings.locale)
        : (other[0] || null);
      assign(label, borrowed);
    });
    return profiles;
  }

  // Part 3 대화는 { speaker, text } 줄 배열이고, Part 4 담화는 화자가 한 명이라 라벨 없는 문장 배열이다.
  // 담화 문장은 그 담화의 voice(W/M, 없으면 W)를 화자 라벨로 삼아 같은 음성 배정 규칙을 그대로 쓴다.
  function talkLines(item) {
    return item.script.map(function (line) {
      return typeof line === "string" ? { speaker: item.voice || "W", text: line } : line;
    });
  }

  window.ListeningVoices = {
    talkLines: talkLines,
    speakerName: speakerName,
    profiles: speakerProfiles
  };
}());
