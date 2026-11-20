// 학습 기록 내보내기·가져오기 (기록 옮기기 화면 pages/sync.html).
// 두 기기(컴퓨터·휴대폰)의 localStorage 기록을 JSON 하나로 주고받고, 합칠 때 최신 진도가 줄지 않게 한다.
// common.js(window.Progress)가 먼저 로드되어 있어야 한다. 외부 요청(fetch)은 쓰지 않는다.
(function () {
  "use strict";

  var APP = "english-lab";
  var SCHEMA = 1;
  var KEYS = {
    progress: "englishLabProgress",
    rc: "englishLabFullSetHistory",
    lc: "englishLabLcFullSetHistory",
    ledger: "englishLabSyncLedger"
  };
  // 파일에 담는 키. 진행 중인 풀세트 저장값·음성/테마/단어장 선택 같은 기기 설정은 담지 않는다(README 참고).
  var DATA_KEYS = [KEYS.progress, KEYS.rc, KEYS.lc, KEYS.ledger];
  var BACKUP_KEY = "englishLabImportBackup";
  var DEVICE_NAME_KEY = "englishLabDeviceName";
  var NOTICE_KEY = "englishLabSyncNotice"; // sessionStorage: 새로고침 뒤 안내 한 번
  var MINI_LIMIT = 100;
  var FULL_LIMIT = 20;
  var UNKNOWN_DEVICE = "d-unknownfile";

  function sync() { return window.Progress.sync; }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }

  function readRaw(key) {
    try { return localStorage.getItem(key); } catch (error) { return null; }
  }
  function parseOr(raw, fallback) {
    if (raw === null || raw === undefined) return fallback;
    try { return JSON.parse(raw); } catch (error) { return fallback; }
  }

  // ---------- 기록 묶음 (내부 형식) ----------
  // { progress, rc: [], lc: [], ledger } — progress는 정리(normalize)되고 장부는 그 기기 id로 맞춰진 상태

  function validHistoryEntry(entry) {
    return entry && typeof entry.date === "string" && !Number.isNaN(Date.parse(entry.date)) &&
      Number.isInteger(entry.correct) && Number.isInteger(entry.score) && entry.sections && typeof entry.sections === "object";
  }

  function bundle(progressValue, rcValue, lcValue, ledgerValue, deviceId) {
    var progress = window.Progress.normalize(progressValue && typeof progressValue === "object" ? progressValue : {});
    return {
      progress: progress,
      rc: (Array.isArray(rcValue) ? rcValue : []).filter(validHistoryEntry),
      lc: (Array.isArray(lcValue) ? lcValue : []).filter(validHistoryEntry),
      ledger: sync().reconcileLedger(ledgerValue, progress, deviceId)
    };
  }

  function localBundle() {
    return bundle(parseOr(readRaw(KEYS.progress), {}), parseOr(readRaw(KEYS.rc), []), parseOr(readRaw(KEYS.lc), []),
      parseOr(readRaw(KEYS.ledger), null), sync().deviceId());
  }

  function bundleToData(b) {
    var data = {};
    data[KEYS.progress] = b.progress;
    data[KEYS.rc] = b.rc;
    data[KEYS.lc] = b.lc;
    data[KEYS.ledger] = b.ledger;
    return data;
  }

  // ---------- 내보내기 ----------

  function pad(n) { return String(n).padStart(2, "0"); }
  // 2026-11-20T10:30:00+09:00 (기기 시간대)
  function isoWithOffset(date) {
    var offset = -date.getTimezoneOffset();
    var sign = offset >= 0 ? "+" : "-";
    var abs = Math.abs(offset);
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + "T" +
      pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds()) +
      sign + pad(Math.floor(abs / 60)) + ":" + pad(abs % 60);
  }

  function buildExport(deviceName, now) {
    now = now || new Date();
    return {
      app: APP,
      schema: SCHEMA,
      exportedAt: isoWithOffset(now),
      device: String(deviceName || "").trim().slice(0, 40),
      deviceId: sync().deviceId(),
      data: bundleToData(localBundle())
    };
  }

  function exportFileName(now) {
    now = now || new Date();
    return "english-lab-progress-" + now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate()) + ".json";
  }

  // ---------- 읽기·검사 (기존 기록은 절대 건드리지 않는다) ----------

  // JSON.parse 오류 → 사람이 읽을 수 있는 말
  function jsonErrorMessage(text, error) {
    var message = String(error && error.message || "");
    if (/end of (json )?(input|data)|unexpected end|unterminated/i.test(message)) {
      return "기록 내용이 중간에 잘렸습니다. 텍스트를 끝까지 복사했는지 확인하고, 다시 내보내서 붙여 넣어 주세요.";
    }
    var line = null, column = null;
    var lineColumn = /line (\d+) column (\d+)/i.exec(message);
    if (lineColumn) {
      line = Number(lineColumn[1]);
      column = Number(lineColumn[2]);
    } else {
      var position = /position (\d+)/i.exec(message);
      if (position) {
        var before = text.slice(0, Number(position[1])).split("\n");
        line = before.length;
        column = before[before.length - 1].length + 1;
      }
    }
    var where = line ? line + "번째 줄 " + column + "번째 글자 근처에서 " : "";
    return "기록 파일 형식(JSON)이 깨졌습니다. " + where + "쉼표·따옴표·괄호가 빠졌거나 다른 글자가 섞인 것 같아요. " +
      "손으로 고치지 말고 원래 기기에서 다시 내보내 주세요.";
  }

  // 결과: { ok: true, envelope } 또는 { ok: false, error }
  function parseBackup(text) {
    if (typeof text !== "string" || !text.replace(/^\uFEFF/, "").trim()) {
      return { ok: false, error: "비어 있는 파일(또는 텍스트)입니다. 내보낸 기록 전체를 넣어 주세요." };
    }
    text = text.replace(/^\uFEFF/, "").trim();
    var parsed;
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      return { ok: false, error: jsonErrorMessage(text, error) };
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed) || parsed.app !== APP) {
      return { ok: false, error: "English Lab 기록 파일이 아닙니다." };
    }
    if (parsed.schema !== SCHEMA) {
      return { ok: false, error: "알 수 없는 기록 형식 번호입니다 (schema " + JSON.stringify(parsed.schema) + "). 이 앱은 schema " + SCHEMA +
        "만 읽을 수 있어요. 두 기기 모두 사이트를 새로고침해 최신 버전인지 확인해 주세요." };
    }
    var data = parsed.data;
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return { ok: false, error: "기록 내용(data)이 없습니다. 원래 기기에서 다시 내보내 주세요." };
    }
    if (!DATA_KEYS.some(function (key) { return key in data; })) {
      return { ok: false, error: "기록 내용(data)에 English Lab 기록이 하나도 없습니다." };
    }
    var broken = [];
    if (KEYS.progress in data && (!data[KEYS.progress] || typeof data[KEYS.progress] !== "object" || Array.isArray(data[KEYS.progress]))) broken.push("학습 진도");
    if (KEYS.rc in data && !Array.isArray(data[KEYS.rc])) broken.push("RC 풀세트 기록");
    if (KEYS.lc in data && !Array.isArray(data[KEYS.lc])) broken.push("LC 풀세트 기록");
    if (KEYS.ledger in data && (!data[KEYS.ledger] || typeof data[KEYS.ledger] !== "object")) broken.push("기기별 장부");
    if (broken.length) return { ok: false, error: "기록 일부가 손상되었습니다 (" + broken.join(", ") + "). 원래 기기에서 다시 내보내 주세요." };
    var exportedAt = typeof parsed.exportedAt === "string" && !Number.isNaN(Date.parse(parsed.exportedAt)) ? parsed.exportedAt : null;
    var id = typeof parsed.deviceId === "string" && /^d-[a-z0-9]{6,}$/.test(parsed.deviceId) ? parsed.deviceId : UNKNOWN_DEVICE;
    return {
      ok: true,
      envelope: {
        exportedAt: exportedAt,
        device: typeof parsed.device === "string" ? parsed.device.trim().slice(0, 40) : "",
        deviceId: id,
        sameDevice: id === sync().deviceId(),
        bundle: bundle(data[KEYS.progress], data[KEYS.rc], data[KEYS.lc], data[KEYS.ledger], id)
      }
    };
  }

  // ---------- 합치기 ----------
  // 규칙 (README "기록 옮기기"와 같은 내용)
  //  누적 숫자(푼 문항·정답 수, 단어별 틀린 횟수 등): 기기별 장부에서 기기마다 큰 값 → 전체 합. 옛 파일의 작은 값은 무시된다.
  //  단어 복습 상태: 마지막으로 답한 기록(lastAt → lastDate)이 늦은 쪽. 시각을 모르면 단계(stage)가 높은 쪽.
  //  독해 오답: 문항별로 마지막 결과가 늦은 쪽(at). 시각 모르는 옛 오답은 시각 있는 결과에 진다.
  //  모의고사·풀세트 기록: 양쪽을 합쳐 같은 기록은 하나만, 시간순. 같은 기록 = 시각(ms까지)+문항 수+맞은 수+소요 시간이 모두 같음.
  //  학습한 날·통과한 회화 패턴·롤플레이·계획 완료: 합집합. 단어 Day 진도·문법/독해 마지막 학습일: 큰 값.

  function historyKey(entry) {
    return [entry.date, entry.total, entry.correct, entry.elapsedSec].join("|");
  }

  function mergeHistory(left, right, limit) {
    var seen = {}, list = [];
    left.concat(right).forEach(function (entry) {
      var key = historyKey(entry);
      if (seen[key]) return;
      seen[key] = true;
      list.push(clone(entry));
    });
    return list.sort(function (a, b) { return Date.parse(a.date) - Date.parse(b.date); }).slice(-limit);
  }

  function mergeLedgers(left, right) {
    var result = { version: 1, devices: {} };
    [left, right].forEach(function (ledger) {
      Object.keys(ledger.devices).forEach(function (id) {
        var entry = ledger.devices[id];
        var target = result.devices[id] = result.devices[id] || { counters: {}, dictation: [] };
        Object.keys(entry.counters).forEach(function (path) {
          target.counters[path] = Math.max(target.counters[path] || 0, entry.counters[path]);
        });
        if (entry.dictation.length > target.dictation.length) target.dictation = entry.dictation.slice(); // 덧붙이기만 하므로 긴 쪽이 최신
      });
    });
    return result;
  }

  function laterDate(a, b) { return !a ? b : !b ? a : a > b ? a : b; }

  function newerWord(a, b) {
    var aAt = a.lastAt ? Date.parse(a.lastAt) : null, bAt = b.lastAt ? Date.parse(b.lastAt) : null;
    if (aAt !== null && bAt !== null && aAt !== bAt) return aAt > bAt ? a : b;
    if ((a.lastDate || "") !== (b.lastDate || "")) return (a.lastDate || "") > (b.lastDate || "") ? a : b;
    if (aAt !== null && bAt === null) return a;
    if (bAt !== null && aAt === null) return b;
    if (a.stage !== b.stage) return a.stage > b.stage ? a : b;
    return (a.nextDue || "") >= (b.nextDue || "") ? a : b;
  }

  function newerResult(a, b) {
    if (!a) return b;
    if (!b) return a;
    if (a.at && b.at) return Date.parse(a.at) >= Date.parse(b.at) ? a : b;
    if (a.at) return a;
    if (b.at) return b;
    return a.wrong ? a : b; // 둘 다 시각을 모르면 옛 방식대로 오답을 남긴다
  }

  function union(a, b) { return Array.from(new Set(a.concat(b))); }

  function mergeBundles(local, remote) {
    var l = local.progress, r = remote.progress;
    var merged = clone(l);
    merged.studiedDates = union(l.studiedDates, r.studiedDates).sort();
    merged.vocabDay = Math.max(l.vocabDay, r.vocabDay);
    merged.planDone = Object.assign({}, l.planDone);
    Object.keys(r.planDone).forEach(function (id) { merged.planDone[id] = !!(merged.planDone[id] || r.planDone[id]); });
    Object.keys(r.grammarStats).forEach(function (id) {
      merged.grammarStats[id] = merged.grammarStats[id] || { solved: 0, correct: 0, lastDate: null };
      merged.grammarStats[id].lastDate = laterDate(merged.grammarStats[id].lastDate, r.grammarStats[id].lastDate);
    });
    Object.keys(r.readingStats).forEach(function (id) {
      var mine = merged.readingStats[id], theirs = r.readingStats[id];
      if (!mine) { merged.readingStats[id] = clone(theirs); return; }
      mine.lastDate = laterDate(mine.lastDate, theirs.lastDate);
      union(Object.keys(mine.questionResults), Object.keys(theirs.questionResults)).forEach(function (index) {
        mine.questionResults[index] = clone(newerResult(mine.questionResults[index], theirs.questionResults[index]));
      });
    });
    merged.speakingStats.patternsPassed = union(l.speakingStats.patternsPassed, r.speakingStats.patternsPassed);
    merged.speakingStats.rolePlaysDone = union(l.speakingStats.rolePlaysDone, r.speakingStats.rolePlaysDone);
    Object.keys(r.vocabProgress).forEach(function (id) {
      var mine = merged.vocabProgress[id];
      merged.vocabProgress[id] = clone(mine ? newerWord(mine, r.vocabProgress[id]) : r.vocabProgress[id]);
    });
    merged.practiceStats = { attempts: mergeHistory(l.practiceStats.attempts, r.practiceStats.attempts, MINI_LIMIT) };
    // 누적 숫자는 장부에서 다시 계산한다
    var ledger = mergeLedgers(local.ledger, remote.ledger);
    var sums = sync().ledgerTotals(ledger);
    var progress = sync().applyCounterTotals(window.Progress.normalize(merged), sums.totals, sums.dictation);
    return {
      progress: progress,
      rc: mergeHistory(local.rc, remote.rc, FULL_LIMIT),
      lc: mergeHistory(local.lc, remote.lc, FULL_LIMIT),
      ledger: sync().reconcileLedger(ledger, progress, sync().deviceId())
    };
  }

  // ---------- 요약 ----------

  function summarize(b) {
    var p = b.progress;
    var sumSolved = function (map) { return Object.keys(map).reduce(function (sum, id) { return sum + (map[id].solved || 0); }, 0); };
    var listening = ["part1", "part2", "part3", "part4"].reduce(function (sum, part) { return sum + p.listeningStats[part].solved; }, 0);
    var reading = Object.keys(p.readingStats).reduce(function (sum, id) { return sum + p.readingStats[id].total; }, 0);
    var words = Object.keys(p.vocabProgress);
    return {
      studyDays: p.studiedDates.length,
      lastStudy: p.studiedDates.length ? p.studiedDates[p.studiedDates.length - 1] : "",
      words: words.length,
      graduated: words.filter(function (id) { return p.vocabProgress[id].stage === 4; }).length,
      vocabAnswers: p.quizSolved,
      questions: sumSolved(p.grammarStats) + listening + p.listeningStats.dictation.attempted + reading,
      mini: p.practiceStats.attempts.length,
      rc: b.rc.length,
      lc: b.lc.length
    };
  }

  var SUMMARY_ROWS = [
    ["studyDays", "학습한 날", "일"],
    ["words", "기록이 있는 단어", "개"],
    ["graduated", "졸업한 단어", "개"],
    ["vocabAnswers", "단어 시험 답한 횟수", "회"],
    ["questions", "문법·리스닝·독해 푼 문항", "문항"],
    ["mini", "미니 모의고사", "회"],
    ["rc", "RC 풀세트", "회"],
    ["lc", "LC 풀세트", "회"]
  ];

  // 현재 기록 / 가져올 기록 / 합친 뒤를 비교한다.
  function compare(envelope) {
    var local = localBundle();
    var current = summarize(local), incoming = summarize(envelope.bundle), merged = summarize(mergeBundles(local, envelope.bundle));
    var more = { local: 0, remote: 0 };
    SUMMARY_ROWS.forEach(function (row) {
      if (current[row[0]] > incoming[row[0]]) more.local += 1;
      else if (incoming[row[0]] > current[row[0]]) more.remote += 1;
    });
    var verdict = !more.local && !more.remote ? "두 기록의 양이 같아요."
      : more.local && !more.remote ? "이 기기의 기록이 더 많아요. 가져올 파일이 오래된 것일 수 있어요. 합치기를 고르면 지금 기록은 줄지 않아요."
        : !more.local && more.remote ? "가져올 기록이 더 많아요."
          : "항목마다 많은 쪽이 달라요. 두 기기에서 따로 공부한 기록이에요. 합치기를 권해요.";
    return { current: current, incoming: incoming, merged: merged, verdict: verdict };
  }

  // ---------- 쓰기 (가져오기·되돌리기) ----------

  function snapshot() {
    var values = {};
    DATA_KEYS.forEach(function (key) { values[key] = readRaw(key); });
    return values;
  }

  function writeBundle(b) {
    var data = bundleToData(b);
    DATA_KEYS.forEach(function (key) { localStorage.setItem(key, JSON.stringify(data[key])); });
  }

  // mode: "merge" | "overwrite". 쓰기 전에 현재 기록을 englishLabImportBackup에 하나 보관한다(이전 백업은 덮어씀).
  function applyImport(envelope, mode) {
    if (mode !== "merge" && mode !== "overwrite") throw new Error("가져오기 방식은 merge 또는 overwrite여야 합니다.");
    var before = snapshot();
    var result = mode === "merge" ? mergeBundles(localBundle(), envelope.bundle) : envelope.bundle;
    var backup = { createdAt: new Date().toISOString(), mode: mode, from: envelope.device || "", values: before };
    try {
      localStorage.setItem(BACKUP_KEY, JSON.stringify(backup));
    } catch (error) {
      throw new Error("가져오기 전에 현재 기록을 백업하지 못해 멈췄습니다. 기록은 바뀌지 않았어요. (" + error.message + ")");
    }
    try {
      writeBundle(result);
    } catch (error) {
      restoreValues(before); // 쓰다가 실패하면 원래대로
      throw new Error("기록을 저장하지 못해 원래대로 되돌렸습니다. (" + error.message + ")");
    }
    return summarize(result);
  }

  function restoreValues(values) {
    DATA_KEYS.forEach(function (key) {
      if (values[key] === null || values[key] === undefined) localStorage.removeItem(key);
      else localStorage.setItem(key, values[key]);
    });
  }

  function readBackup() {
    var backup = parseOr(readRaw(BACKUP_KEY), null);
    if (!backup || typeof backup !== "object" || !backup.values || typeof backup.values !== "object") return null;
    return backup;
  }

  function undoImport() {
    var backup = readBackup();
    if (!backup) return false;
    restoreValues(backup.values);
    localStorage.removeItem(BACKUP_KEY);
    return true;
  }

  window.Backup = {
    APP: APP, SCHEMA: SCHEMA, DATA_KEYS: DATA_KEYS, BACKUP_KEY: BACKUP_KEY,
    buildExport: buildExport, exportFileName: exportFileName, parseBackup: parseBackup,
    localBundle: localBundle, mergeBundles: mergeBundles, summarize: summarize, compare: compare,
    applyImport: applyImport, undoImport: undoImport, readBackup: readBackup, historyKey: historyKey
  };

  // ======================= 화면 (pages/sync.html) =======================

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function button(className, text, onClick) {
    var node = element("button", className, text);
    node.type = "button";
    node.addEventListener("click", onClick);
    return node;
  }
  function formatDateTime(iso) {
    if (!iso) return "알 수 없음";
    var date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "알 수 없음";
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + " " + pad(date.getHours()) + ":" + pad(date.getMinutes());
  }

  function initPage() {
    var root = document.getElementById("sync-root");
    if (!root) return;
    var $ = function (id) { return document.getElementById(id); };
    var pending = null; // 확인을 기다리는 가져오기

    // 새로고침 뒤 안내
    try {
      var notice = window.sessionStorage && sessionStorage.getItem(NOTICE_KEY);
      if (notice) {
        $("sync-notice").textContent = notice;
        $("sync-notice").hidden = false;
        sessionStorage.removeItem(NOTICE_KEY);
      }
    } catch (error) { /* 무시 */ }

    function reloadWith(message) {
      try { if (window.sessionStorage) sessionStorage.setItem(NOTICE_KEY, message); } catch (error) { /* 무시 */ }
      window.location.reload();
    }

    // --- 이 기기 이름 ---
    var nameInput = $("sync-device-name");
    nameInput.value = readRaw(DEVICE_NAME_KEY) || "";
    nameInput.addEventListener("change", function () {
      try { localStorage.setItem(DEVICE_NAME_KEY, nameInput.value.trim().slice(0, 40)); } catch (error) { /* 무시 */ }
    });

    function renderCurrent() {
      var s = summarize(localBundle());
      $("sync-current").textContent = "이 기기의 기록: 학습한 날 " + s.studyDays + "일 · 단어 " + s.words + "개 · 푼 문항 " + s.questions +
        "개 · 모의고사 " + (s.mini + s.rc + s.lc) + "회" + (s.lastStudy ? " · 마지막 학습 " + s.lastStudy : "");
    }

    // --- 내보내기 ---
    function exportText() { return JSON.stringify(buildExport(nameInput.value), null, 2); }
    $("sync-export-file").addEventListener("click", function () {
      var text = exportText();
      var link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([text], { type: "application/json" }));
      link.download = exportFileName();
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
      $("sync-export-message").textContent = link.download + " 파일을 저장했어요. 다른 기기의 이 화면에서 가져오기 하세요.";
    });
    $("sync-export-text").addEventListener("click", function () {
      $("sync-export-area").value = exportText();
      $("sync-export-box").hidden = false;
      $("sync-export-message").textContent = "아래 텍스트를 전부 복사해 메모나 카톡 '나와의 채팅'에 붙여 넣으세요.";
    });
    $("sync-copy").addEventListener("click", function () {
      var area = $("sync-export-area");
      function fallback() {
        area.focus();
        area.select();
        if (area.setSelectionRange) area.setSelectionRange(0, area.value.length);
        var copied = false;
        try { copied = document.execCommand && document.execCommand("copy"); } catch (error) { copied = false; }
        $("sync-export-message").textContent = copied
          ? "복사했어요. 메모나 카톡 '나와의 채팅'에 붙여 넣으세요."
          : "자동 복사가 막혀 있어요. 텍스트를 전부 선택해 두었으니 길게 눌러 '복사'를 고르세요.";
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(area.value).then(function () {
          $("sync-export-message").textContent = "복사했어요. 메모나 카톡 '나와의 채팅'에 붙여 넣으세요.";
        }, fallback);
      } else {
        fallback();
      }
    });

    // --- 가져오기 ---
    function showError(message) {
      pending = null;
      $("sync-preview").hidden = true;
      $("sync-import-error").textContent = message + " 지금 기록은 바뀌지 않았어요.";
      $("sync-import-error").hidden = false;
    }

    function preview(text) {
      $("sync-import-error").hidden = true;
      var parsed = parseBackup(text);
      if (!parsed.ok) { showError(parsed.error); return; }
      pending = parsed.envelope;
      var result = compare(pending);
      var box = $("sync-preview");
      box.replaceChildren();
      box.append(
        element("h3", "", "가져올 기록 확인"),
        element("p", "sync-preview-meta", "내보낸 때: " + formatDateTime(pending.exportedAt) + " · 기기: " + (pending.device || "이름 없음") +
          (pending.sameDevice ? " (이 기기에서 내보낸 기록)" : ""))
      );
      var table = element("table", "sync-compare");
      var head = element("tr");
      ["항목", "이 기기", "가져올 기록", "합친 뒤"].forEach(function (label) { head.appendChild(element("th", "", label)); });
      var thead = element("thead"); thead.appendChild(head);
      var tbody = element("tbody");
      SUMMARY_ROWS.forEach(function (row) {
        var tr = element("tr");
        tr.dataset.key = row[0];
        tr.append(element("th", "", row[1]));
        [result.current, result.incoming, result.merged].forEach(function (s, i) {
          var cell = element("td", "", s[row[0]] + row[2]);
          if (i < 2 && s[row[0]] > [result.incoming, result.current][i][row[0]]) cell.className = "is-more";
          tr.appendChild(cell);
        });
        tbody.appendChild(tr);
      });
      table.append(thead, tbody);
      box.append(table, element("p", "sync-verdict", result.verdict));

      var modes = element("fieldset", "sync-modes");
      modes.appendChild(element("legend", "", "가져오는 방법"));
      function radio(value, label, note, checked) {
        var wrap = element("label", "sync-mode");
        var input = element("input");
        input.type = "radio"; input.name = "sync-mode"; input.value = value; input.checked = checked;
        input.id = "sync-mode-" + value;
        input.addEventListener("change", updateMode);
        var text = element("span", "");
        text.append(element("strong", "", label), element("span", "sync-mode-note", note));
        wrap.append(input, text);
        return wrap;
      }
      modes.append(
        radio("merge", "합치기 (권장)", "두 기록을 합칩니다. 어느 쪽의 최신 진도도 줄지 않아요.", true),
        radio("overwrite", "덮어쓰기", "이 기기의 기록을 지우고 가져올 기록으로 바꿉니다.", false)
      );
      var warning = element("div", "sync-overwrite-warning");
      warning.hidden = true;
      var agree = element("input"); agree.type = "checkbox"; agree.id = "sync-overwrite-agree";
      var agreeLabel = element("label", "sync-agree");
      agreeLabel.append(agree, element("span", "", "이 기기에만 있던 기록이 사라지는 것을 이해했습니다."));
      warning.append(element("p", "", "⚠ 덮어쓰면 이 기기에서 공부한 기록 중 파일에 없는 것은 사라집니다. (되돌리기로 한 번은 복구할 수 있어요)"), agreeLabel);
      agree.addEventListener("change", updateMode);
      var run = button("button button-primary sync-run", "합치기 실행", function () {
        if (!pending || run.disabled) return;
        var mode = document.getElementById("sync-mode-overwrite").checked ? "overwrite" : "merge";
        try {
          applyImport(pending, mode);
        } catch (error) {
          showError(error.message);
          return;
        }
        reloadWith((mode === "merge" ? "기록을 합쳤어요." : "기록을 덮어썼어요.") + " 잘못 가져왔다면 아래 '되돌리기'로 가져오기 전 상태로 돌릴 수 있어요. 다른 탭이 열려 있으면 새로고침해 주세요.");
      });
      run.id = "sync-run";
      var cancel = button("button button-quiet", "취소", function () {
        pending = null;
        box.hidden = true;
        box.replaceChildren();
      });
      function updateMode() {
        var overwrite = document.getElementById("sync-mode-overwrite").checked;
        warning.hidden = !overwrite;
        run.textContent = overwrite ? "덮어쓰기 실행" : "합치기 실행";
        run.classList.toggle("is-danger", overwrite);
        run.disabled = overwrite && !agree.checked;
      }
      var actions = element("div", "sync-actions");
      actions.append(run, cancel);
      box.append(modes, warning, actions);
      box.hidden = false;
      if (box.scrollIntoView) box.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    $("sync-import-file").addEventListener("change", function () {
      var file = this.files && this.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () { preview(String(reader.result || "")); };
      reader.onerror = function () { showError("파일을 읽지 못했습니다."); };
      reader.readAsText(file);
      this.value = "";
    });
    $("sync-import-check").addEventListener("click", function () { preview($("sync-import-area").value); });

    // --- 되돌리기 ---
    function renderUndo() {
      var backup = readBackup();
      var box = $("sync-undo");
      box.replaceChildren();
      box.appendChild(element("h2", "", "되돌리기"));
      if (!backup) {
        box.appendChild(element("p", "sync-help", "가져오기를 하면 직전 기록이 여기에 하나 보관돼요. 지금은 보관된 기록이 없어요."));
        return;
      }
      box.appendChild(element("p", "sync-help", formatDateTime(backup.createdAt) + "에 " + (backup.mode === "overwrite" ? "덮어쓰기" : "합치기") +
        "하기 직전의 기록이 보관되어 있어요." + (backup.from ? " (가져온 기기: " + backup.from + ")" : "")));
      var confirmRow = element("div", "sync-actions");
      confirmRow.hidden = true;
      var start = button("button button-quiet", "가져오기 전으로 되돌리기…", function () {
        start.hidden = true;
        confirmRow.hidden = false;
      });
      start.id = "sync-undo-start";
      var yes = button("button button-primary is-danger", "되돌리기 확정", function () {
        undoImport();
        reloadWith("가져오기 전 기록으로 되돌렸어요.");
      });
      yes.id = "sync-undo-confirm";
      confirmRow.append(element("p", "sync-help", "가져온 뒤에 공부한 기록도 함께 사라집니다. 되돌릴까요?"), yes,
        button("button button-quiet", "취소", function () { confirmRow.hidden = true; start.hidden = false; }));
      box.append(start, confirmRow);
    }

    renderCurrent();
    renderUndo();
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initPage);
    else initPage();
  }
}());
