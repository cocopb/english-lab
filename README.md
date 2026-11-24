# English Lab

브라우저에서 바로 열어 사용할 수 있는 영어 학습 노트의 정적 사이트 뼈대입니다. HTML, CSS, JavaScript만 사용하며 빌드 도구나 서버가 필요하지 않습니다.

## 폴더 구조

```text
english-lab/
├─ index.html
├─ pages/                 # 보카, 문법, 리스닝, 독해, 회화, 실전 (+ 메뉴 제외 페이지)
├─ assets/
│  ├─ css/style.css       # 디자인 시스템과 반응형 스타일
│  ├─ img/part1/          # Part 1 사진 ph01~ph34 (JPEG, 긴 변 1200px 이하, 장당 300KB 이하)
│  └─ js/                 # 공통 UI/진도, 퀴즈, 보카 시험, 실전 모의고사, 기록 옮기기(backup.js) 동작
├─ data/                  # 전역 배열로 제공하는 샘플 콘텐츠
├─ tools/
│  ├─ check-vocab.js      # 보카 데이터와 빈칸 예문 검사 + 가짜 DOM으로 단어장 화면(마지막 Day의 단어장·뜻 시험·빈칸 시험) 검사
│  ├─ check-grammar.js    # 문법 문제 데이터 검사 + 가짜 DOM으로 문법 화면(노트·유형별 정답률) 검사
│  ├─ check-reading.js    # 독해·Part 6 데이터 검사 + 가짜 DOM으로 독해 화면 렌더링 검사
│  ├─ check-listening.js  # 받아쓰기·Part 2·Part 3·Part 4 데이터 검사 + 가짜 DOM으로 리스닝 화면 로드 검사
│  ├─ check-part1.js      # Part 1 사진 데이터·문장 중복·이미지 파일·표시 크기·정답 위치·사진 alt 검사 + 가짜 DOM으로 리스닝 탭 Part 1 화면 검사
│  ├─ check-speaking.js   # 회화 패턴·롤플레이·쉐도잉 데이터 검사 + 가짜 DOM으로 회화 화면 로드·채점 검사
│  ├─ check-practice.js   # 가짜 DOM으로 실전 페이지(모의고사·OMR·타이머·기록) 동작 검사
│  ├─ check-backup.js     # 기록 내보내기·가져오기 합치기 규칙·잘못된 파일 거절·되돌리기 검사 (가짜 기기 여러 대, 버그를 심어 검사가 잡는지도 확인)
│  ├─ build-vocab-index.js # 보카 색인(docs/vocab-index.md) 생성
│  └─ build-grammar-index.js # 문법 색인(docs/grammar-index.md) 생성
├─ docs/vocab-index.md    # Day별·상황별 표제어 색인 (자동 생성, 직접 수정 금지)
├─ docs/grammar-index.md  # 문법 노트·trap·Part 5 문항·Part 6 ruleId 색인 (자동 생성, 직접 수정 금지)
├─ docs/authoring-rules.md # 새 콘텐츠 작성 규칙 (감사에서 정한 기준 모음, 새 문항을 만들기 전에 읽기)
├─ docs/content-status.md # 카테고리별 현재 개수와 목표 (단계마다 갱신)
└─ README.md
```

## 검사 스크립트

프로젝트 루트에서 실행합니다. Node.js만 있으면 되고 외부 패키지는 필요하지 않습니다. 모두 통과하면 종료 코드 0, 하나라도 실패하면 1을 반환합니다.

```bash
node tools/check-vocab.js      # 보카: 빈칸 생성 가능 여부, 필수 필드, 혼동 단어 수, ID 중복, 뜻 선택지 4개(유사도 가드), 트랙별 필수 정보 + 경고(실패 아님): 같은 트랙 중복 단어, 혼동 단어 뜻 누락 개수 + 화면: 마지막 Day의 드롭다운·접힘/펼침·뜻 시험·빈칸 시험 끝까지 진행
node tools/check-grammar.js    # 문법 문제: 정답 위치 쏠림(35% 이상·15% 이하면 실패), 유형 ID, 선택지 4개, 정답 인덱스, 빈칸, ID 중복, 해설, 중복 선택지, 노트 예문·노트 설명(trap·표·toeicPattern) 속 영어 문장과 같은 유형 문항의 중복(다른 유형은 경고), 노트의 단정 표현(무조건·항상·~만 등)이 검토 목록에 있는지(없으면 대조할 문항 후보와 함께 실패) + 화면: 모든 노트 아코디언(표·예문 개수), 유형 선택, 유형별 정답률(모든 유형을 끝까지 풀고 기록·표시·정렬 확인)
node tools/check-reading.js    # 독해: 전략 ID, 정답 인덱스, 문장별 en/ko, ID 중복, Part 6 빈칸·문항 일치, 지문·세트 안 정답 위치 연속, 정답 위치 쏠림(한 보기 35% 이상·15% 이하면 실패, 분포 출력) + 지문 렌더링
node tools/check-listening.js  # 리스닝: Part 2·3·4 정답 위치 쏠림(Part 3·4는 35% 이상·15% 이하, 3지선다 Part 2는 43% 초과·23% 미만이면 실패), 받아쓰기 text/ko/level, Part 2 선택지 3개·정답, Part 3 script/questions·선택지 4개·정답, ID 중복, 해설 + 화면 로드 + 음성 재생(음성 목록이 빈 모바일·데스크톱·미지원 브라우저)
node tools/check-part1.js      # Part 1: 정답 위치 쏠림(35% 이상·15% 이하면 실패), 34문항 choices 4개·answer 범위·해설·kind, 문장 중복(다른 사진의 정답끼리·한 사진의 선택지끼리: 같은 문장, 내용어 겹침, 3단어 틀, 내용어가 든 4단어 표현), 이미지 파일 34개 존재(JPEG·300KB 이하), 표시 크기(원본이 작아도 작게 보이지 않음), 정답 위치 분포·연속 금지, alt가 "Part 1 사진 N"이고 선택지 내용어 없음 + 화면: 사진 표시, (A)~(D) 음성, 채점 전 문장 글자 없음, 채점 후 네 문장·해설, 로딩 실패 대체 문구
node tools/check-speaking.js   # 회화: 패턴 pattern/meaning/tip/drills, 드릴 ko/en, 롤플레이 me 턴 instruction/model/comment, 쉐도잉 en/ko/level, ID 중복 + 화면 로드·채점(패턴·쉐도잉·롤플레이 끝까지 진행, 괄호 지문 음성 제외) + TTS 재생(음성 목록이 빈 모바일·데스크톱)
node tools/check-practice.js   # 실전: 메뉴 7개, 미니 모의고사·RC/LC 풀세트 구성, OMR 이동, 타이머 색·자동 제출, 결과 집계, 기록 저장, 파트별 연습, 출제 도달성(200회 출제에서 모든 항목이 최소 1번)·쏠림
node tools/check-backup.js     # 기록 옮기기: 옛 파일을 가져와도 진도가 줄지 않음, 시험 기록 중복 없음, 나중에 맞힌 문제가 되살아나지 않음, 왕복, 잘못된 파일 거절, 빈 기록, 백업·되돌리기 + 일부러 심은 버그 8종을 잡는지
```

데이터를 추가하거나 화면 코드를 바꾼 뒤에는 여덟 스크립트를 모두 실행해 확인합니다. `check-practice.js`는 모의고사를 매번 무작위로 출제하므로 여러 번 실행해 보는 것이 좋습니다.

### 검사가 실제로 잡는지 확인할 때 (버그 심기 절차)

검사 스크립트를 새로 만들거나 고친 뒤 "일부러 틀린 데이터를 넣으면 실패하는지" 확인할 때는 **저장소 파일을 직접 고치지 않습니다.**

1. 저장소를 임시 폴더에 복사합니다 (`data`·`tools`·`assets`·`pages`·`index.html`). 검사 스크립트는 자기 위치 기준으로 `../data`를 읽으므로, 복사본의 `tools/check-*.js`를 실행하면 복사본 데이터만 봅니다.
2. 복사본의 데이터를 고쳐 버그를 심고, 복사본에서 검사를 실행해 실패하는지 봅니다.
3. 끝나면 복사본 폴더를 지웁니다.
4. 커밋 전에 `git status --short`와 `git diff --stat`으로 **의도한 파일만** 바뀌었는지 확인합니다. 예상하지 못한 파일이 있으면 커밋하지 않고 원인부터 찾습니다.

`check-backup.js`의 버그 심기는 원본 코드를 메모리에서만 바꿔 실행하므로 파일을 건드리지 않습니다.

보카 데이터를 바꾼 뒤에는 `node tools/build-vocab-index.js`로 `docs/vocab-index.md`(Day별 주제·표제어, 상황별 표제어, 품사별 집계, 여러 곳에 있는 표제어)를 다시 만듭니다. 새 Day 주제를 고를 때 기존 표제어와 겹치지 않는지 이 파일로 확인합니다. 새 Day를 추가하면 `tools/build-vocab-index.js`의 `DAY_TOPICS`에 주제 한 줄을 넣습니다(없으면 "(주제 미정)"으로 표시하고 경고합니다).

문법 노트·문항이나 Part 6 빈칸을 바꾼 뒤에는 `node tools/build-grammar-index.js`로 `docs/grammar-index.md`(노트별 oneLine·문항 수, 노트별 trap 전체, Part 6 빈칸의 ruleId 분포, Part 5 문항 목록)를 다시 만듭니다. 새 노트나 trap을 쓸 때 기존 주제와 겹치지 않는지, 기존 문항의 정답·해설과 충돌하지 않는지 이 파일로 확인합니다.

## 메뉴

상단 메뉴는 `홈 / 보카 / 문법 / 리스닝 / 독해 / 회화 / 실전` 7개입니다 (`assets/js/common.js`의 `navigation`).

| 페이지 | 상태 |
|---|---|
| `pages/mistakes.html` (오답노트) | **현재 메뉴에서 제외됨** — 보카·문법의 오답/약점 탭과 중복 |
| `pages/quiz.html` (퀴즈) | **현재 메뉴에서 제외됨** — 보카·문법의 시험/문제 탭과 중복 |
| `pages/plan.html` (계획) | **현재 메뉴에서 제외됨** |

세 페이지는 삭제하지 않았으며 주소로 직접 열면 그대로 동작합니다.

## 실전 (pages/practice.html)

- **미니 모의고사**: Part 5 15문항(`GRAMMAR_QUIZ`) + Part 6 8문항(`PART6`) + Part 7 7문항(`PASSAGES`) = 30문항, 제한 시간 25분. 모두 무작위 출제하며, 제출 전에는 정답을 보여주지 않고 시간이 끝나면 자동 제출합니다. Part 6·7은 세트/지문을 무작위로 골라 문항 수가 찰 때까지 담고, 마지막 세트/지문은 앞에서부터 필요한 문항만 사용합니다.
- **LC 풀세트**: 실제 토익 LC와 같은 100문항 / 45분. Part 1 사진 6장(1~6번, `PART1` 34장 중 사람 사진 4~5장 + 사물 사진 1~2장) → Part 2 25문항(7~31번, `PART2` 73개 중) → Part 3 대화 13개(32~70번, `PART3` 중, 39문항) → Part 4 담화 10개(71~100번, `PART4` 중, 30문항). 음성은 문항(대화·담화)마다 한 번만 재생되고 지나간 문항으로 돌아갈 수 없으며, Part 1·2 선택지 문장과 스크립트는 채점 후 오답 복습에서만 보입니다(Part 1 오답은 사진 + 네 문장 + 해설). 저장 `englishLabLcFullSetSave`(형식 version 2, 이전 94문항 저장값은 지움), 기록 `englishLabLcFullSetHistory`(RC 풀세트와 별도 키). 예상 점수는 맞은 개수를 보정 없이 LC 환산표에 넣은 참고값입니다(이전 94문항 기록은 100문항 기준으로 환산했던 값). Part 2 유형별 정답률은 `PART2` 항목의 `type`(`PART2_TYPE_LABELS`의 키)으로 셉니다.
- **파트별 연습**: 파트 하나만 시간 제한 없이 풀고 문항마다 즉시 채점합니다.
- **기록**: `englishLabProgress.practiceStats.attempts`에 `{ date, correct, total, elapsedSec, timedOut, partScores:{p5,p6,p7}, partTotals:{p5,p6,p7} }`로 저장합니다 (최근 100회). `ruleId`가 있는 문항의 응답은 `grammarStats`에도 반영됩니다.
- 결과 화면의 RC 예상 점수대는 맞은 개수 구간으로 정한 **참고용 추정치**입니다.

`data/reading.js`의 `window.PART6` 항목은 `id`, `title`, `header`, `blocks`(`{type:"text", en}` 또는 `{type:"blank", n}`), `ko`, `questions`(`n`, `choices` 4개, `answer`, `explanation`, `ruleId` 또는 `null`)로 구성합니다. `PASSAGES` 항목은 단일 지문(`header` + `sentences`) 대신 `parts`(`label`, `header`, `sentences`) 배열로 이중 지문을 만들 수 있습니다.

## 기록 옮기기 (pages/sync.html)

컴퓨터와 휴대폰처럼 두 기기에서 공부할 때 기록을 JSON 하나로 주고받습니다. 홈의 학습 현황 아래 링크와 모든 페이지 맨 아래(푸터)의 "기록 옮기기"로 들어갑니다. 상단 메뉴에는 넣지 않았습니다.

- **내보내기**: 파일로 저장(`english-lab-progress-YYYY-MM-DD.json`) 또는 텍스트로 보기 + 복사(복사가 막히면 전체 선택 상태로 둠). 파일 형식은 `{ app: "english-lab", schema: 1, exportedAt(시간대 포함), device(기기 이름), deviceId, data: { 키: 값 } }`.
- **가져오기**: 파일 고르기(FileReader) 또는 텍스트 붙여 넣기. 먼저 요약(내보낸 때·기기, 항목별 이 기기 / 가져올 기록 / 합친 뒤)을 보여 주고 합치기(기본) 또는 덮어쓰기(경고 + 동의 체크)를 고른 뒤 실행합니다. 실행 직전 현재 기록을 `englishLabImportBackup`에 하나 보관하고 "되돌리기"로 복구할 수 있습니다. 실행 뒤 페이지를 새로고침합니다.
- **거절**(기록은 그대로): app 불일치, 모르는 schema 번호, 깨진 JSON(줄·글자 위치 안내, 중간에 잘린 경우 따로 안내), 빈 파일, data 없음·손상.

### localStorage 키

| 키 | 담는 것 | 파일에 담음 |
|---|---|---|
| `englishLabProgress` | 학습 진도 전체 (단어 복습 상태, 문법·리스닝·독해·회화 통계, 미니 모의고사 기록, 학습한 날 등) | ○ |
| `englishLabFullSetHistory` / `englishLabLcFullSetHistory` | RC·LC 풀세트 응시 기록 (최근 20회) | ○ |
| `englishLabSyncLedger` | 기기별 누적 장부 `{ version, devices: { 기기id: { counters: {경로: 값}, dictation: [] } } }` | ○ |
| `englishLabFullSetSave` / `englishLabLcFullSetSave` | 진행 중인 RC·LC 풀세트 | ✕ (그 기기의 시험 중 상태) |
| `englishLabSpeechSettings` | 음성 속도·발음 (기기마다 음성이 다름) | ✕ |
| `englishLabTheme` | 다크/라이트 모드 | ✕ |
| `englishLabVocabSelection` / `englishLabVocabHideMeaning` | 단어장 트랙·Day 선택, 뜻 가리기 | ✕ |
| `englishLabDeviceId` / `englishLabDeviceName` | 이 기기 id(자동)·이름 | ✕ |
| `englishLabImportBackup` | 가져오기 직전 백업 1개 | ✕ |

### 합치기 규칙

- **누적 숫자**(단어 시험 답 수·정답 수, 문법·리스닝·독해 푼 문항·정답, 받아쓰기·쉐도잉 횟수, 단어별 틀린 횟수): 목록이 남지 않는 숫자라 다시 셀 수 없으므로, 기기마다 "그 기기에서 늘어난 몫"을 장부에 둡니다. 합칠 때는 기기별로 큰 값을 고르고(같은 기기의 옛 파일은 값이 작아 무시) 전체를 다시 더합니다. 이 기기의 몫 = 현재 합계 − 다른 기기 몫. 쉐도잉 평균은 합계에서 다시 계산합니다.
- **단어 복습 상태**: 마지막으로 답한 시각(`lastAt`)이 늦은 쪽 → 같은 시각이 없으면 `lastDate` → 그래도 같으면 단계가 높은 쪽.
- **독해 오답**: 문항별 마지막 결과(`questionResults[번호] = { wrong, at }`)가 늦은 쪽. 나중에 맞힌 문항은 오답 목록에서 빠지며, 시각이 없는 옛 오답은 시각 있는 결과에 집니다. (같은 기기에서도 다시 맞히면 빠집니다.)
- **미니 모의고사·RC·LC 기록**: 합집합에서 같은 기록을 하나로 줄이고 시간순(미니 100회, 풀세트 20회까지). 같은 기록 = 시각(ms) + 문항 수 + 맞은 수 + 소요 시간이 모두 같음.
- **학습한 날·통과한 회화 패턴·롤플레이·계획 완료**: 합집합. **단어 Day 진도·문법/독해 마지막 학습일**: 큰 값.
- **덮어쓰기**: 파일에 담는 네 키를 파일 내용으로 바꿉니다. 기기 설정과 진행 중인 시험은 건드리지 않습니다.

## 로컬 실행

`index.html`을 브라우저에서 열면 됩니다. 페이지와 데이터는 상대 경로의 스크립트로 연결되어 있으며 JSON `fetch`를 사용하지 않습니다. 회화의 음성 인식은 HTTPS 또는 localhost에서만 사용할 수 있고, 그 외 환경에서는 직접 입력으로 연습합니다. GitHub Pages에도 저장소 내용을 그대로 게시할 수 있습니다.

## 콘텐츠 추가

`data/` 폴더의 해당 JavaScript 파일에 항목을 추가합니다. 각 파일은 `window.GRAMMAR`, `window.MISTAKES`, `window.VOCAB`, `window.SPEAKING`, `window.PATTERNS`, `window.ROLEPLAYS`, `window.SHADOWING`, `window.QUIZ`, `window.PLAN` 전역 배열을 제공합니다. 기존 항목과 같은 객체 필드를 유지하면 페이지가 항목을 자동으로 렌더링합니다.

- `grammar.js`: `id`, `title`, `summary`, `body`, `tags`
- `mistakes.js`: `id`, `original`, `correction`, `reason`
- `vocab.js`: `id`, `track`, `day`, `word`, `pos`, `meaning`, `example`, `exampleKo`, `tip`, `distractors`, `tags`
- `speaking.js`: 기존 `SPEAKING`의 `id`, `situation`, `expressions` (각 표현은 `english`, `korean`), 말하기 연습용 `PATTERNS`의 `drills` (`ko`, `en`), `ROLEPLAYS`의 `turns`, `SHADOWING`의 `en`, `ko`, `level`
- `quiz.js`: `id`, `question`, `options` (4개), `answer` (0부터 시작하는 정답 인덱스), `explanation`
- `plan.js`: `id`, `title` (26개 주차 항목)

문법, 회화, 오답노트, 단어, 퀴즈 콘텐츠는 각 배열의 객체를 복사해 필요한 내용만 바꾸면 됩니다. 계획은 주차 항목을 추가하거나 수정할 수 있고 완료 상태는 `localStorage`에 저장됩니다.
보카 뜻 시험의 선택지는 같은 Day(생존 영어는 같은 상황)의 다른 단어 뜻에서 뽑으며, 정답과 같거나 포함 관계이거나 쉼표·슬래시로 나눈 조각이 겹치는 뜻은 제외합니다. 빈칸 시험은 각 단어의 `distractors`를 선택지로 씁니다. 혼동 단어의 한국어 뜻은 `data/vocab.js`의 `window.VOCAB_DISTRACTOR_MEANINGS`에 추가하면 단어장 상세의 "혼동 단어" 줄에 함께 표시됩니다(없으면 단어만 표시, 누락 목록은 `node tools/list-missing-meanings.js`). 시험 결과와 단어별 복습 단계는 `englishLabProgress`에 함께 저장되며, 정답 시 1·4·7·14일 간격으로 다음 복습일을 기록합니다. 오답 공부 탭에는 오늘 복습할 단어, 누적 오답 약점, 졸업 단어 현황이 표시됩니다.

보카 데이터의 빈칸 생성 가능 여부, 필수 필드, 혼동 단어 수, ID 중복, 뜻 선택지 생성 가능 여부 및 트랙별 필수 정보를 확인하려면 프로젝트 루트에서 `node tools/check-vocab.js`를 실행합니다. 외부 패키지는 필요하지 않습니다.

같은 Day 안에서 뜻이 사실상 같은 쌍(정답이 둘이 되는 경우), 품사와 맞지 않는 뜻 모양(명사인데 "\~하다" 등), 저장소 전체 영어 문장의 형식 문제(한글 섞임·둥근 따옴표·두 칸 띄어쓰기·마침표 누락 등)도 `check-vocab.js`가 검사합니다. 기준과 2026-11-20 감사 결과(Day 1\~8 오답·예문 재검토)는 `docs/audit-vocab.md`에 있습니다. 오타 후보(저장소 영어 문장에서 한 번만 나오는 단어)는 `node tools/list-rare-words.js [글자]`로 봅니다. 빈칸 시험 오답이 "아는 단어"(790단어장 ∪ 파생형 ∪ `docs/basic-words.md`의 기초 목록)인지는 `node tools/list-unknown-distractors.js [Day]`로 봅니다. 문법 노트 문구와 180문항의 대조 결과는 `docs/audit-grammar.md`에 있습니다.

회화 진도는 `englishLabProgress`의 `speakingStats`에 패턴 통과, 완료한 롤플레이, 쉐도잉 평균 정확도로 저장됩니다. 브라우저 음성 인식은 지원 여부와 마이크 권한에 따라 사용할 수 있으며, 지원하지 않거나 권한이 거부되면 입력으로 대체할 수 있습니다.

## 브라우저 저장 데이터

학습 진도는 `englishLabProgress`, 테마 선택은 `englishLabTheme` 키에 저장됩니다. 브라우저의 로컬 저장소를 사용할 수 없는 경우에도 페이지 콘텐츠는 표시됩니다.
