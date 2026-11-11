# English Lab

브라우저에서 바로 열어 사용할 수 있는 영어 학습 노트의 정적 사이트 뼈대입니다. HTML, CSS, JavaScript만 사용하며 빌드 도구나 서버가 필요하지 않습니다.

## 폴더 구조

```text
english-lab/
├─ index.html
├─ pages/                 # 보카, 문법, 리스닝, 독해, 회화, 실전 (+ 메뉴 제외 페이지)
├─ assets/
│  ├─ css/style.css       # 디자인 시스템과 반응형 스타일
│  └─ js/                 # 공통 UI/진도, 퀴즈, 보카 시험, 실전 모의고사 동작
├─ data/                  # 전역 배열로 제공하는 샘플 콘텐츠
├─ tools/
│  ├─ check-vocab.js      # 보카 데이터와 빈칸 예문 검사 + 가짜 DOM으로 단어장 화면(마지막 Day의 단어장·뜻 시험·빈칸 시험) 검사
│  ├─ check-grammar.js    # 문법 문제 데이터 검사 + 가짜 DOM으로 문법 화면(노트·유형별 정답률) 검사
│  ├─ check-reading.js    # 독해·Part 6 데이터 검사 + 가짜 DOM으로 독해 화면 렌더링 검사
│  ├─ check-listening.js  # 받아쓰기·Part 2·Part 3 데이터 검사 + 가짜 DOM으로 리스닝 화면 로드 검사
│  ├─ check-speaking.js   # 회화 패턴·롤플레이·쉐도잉 데이터 검사 + 가짜 DOM으로 회화 화면 로드·채점 검사
│  ├─ check-practice.js   # 가짜 DOM으로 실전 페이지(모의고사·OMR·타이머·기록) 동작 검사
│  └─ build-vocab-index.js # 보카 색인(docs/vocab-index.md) 생성
├─ docs/vocab-index.md    # Day별·상황별 표제어 색인 (자동 생성, 직접 수정 금지)
└─ README.md
```

## 검사 스크립트

프로젝트 루트에서 실행합니다. Node.js만 있으면 되고 외부 패키지는 필요하지 않습니다. 모두 통과하면 종료 코드 0, 하나라도 실패하면 1을 반환합니다.

```bash
node tools/check-vocab.js      # 보카: 빈칸 생성 가능 여부, 필수 필드, 혼동 단어 수, ID 중복, 뜻 선택지 4개(유사도 가드), 트랙별 필수 정보 + 경고(실패 아님): 같은 트랙 중복 단어, 혼동 단어 뜻 누락 개수 + 화면: 마지막 Day의 드롭다운·접힘/펼침·뜻 시험·빈칸 시험 끝까지 진행
node tools/check-grammar.js    # 문법 문제: 유형 ID, 선택지 4개, 정답 인덱스, 빈칸, ID 중복, 해설, 중복 선택지 + 화면: 모든 노트 아코디언(표·예문 개수), 유형 선택, 유형별 정답률
node tools/check-reading.js    # 독해: 전략 ID, 정답 인덱스, 문장별 en/ko, ID 중복, Part 6 빈칸·문항 일치 + 지문 렌더링
node tools/check-listening.js  # 리스닝: 받아쓰기 text/ko/level, Part 2 선택지 3개·정답, Part 3 script/questions·선택지 4개·정답, ID 중복, 해설 + 화면 로드 + 음성 재생(음성 목록이 빈 모바일·데스크톱·미지원 브라우저)
node tools/check-speaking.js   # 회화: 패턴 pattern/meaning/tip/drills, 드릴 ko/en, 롤플레이 me 턴 instruction/model/comment, 쉐도잉 en/ko/level, ID 중복 + 화면 로드·채점(패턴·쉐도잉·롤플레이 끝까지 진행, 괄호 지문 음성 제외) + TTS 재생(음성 목록이 빈 모바일·데스크톱)
node tools/check-practice.js   # 실전: 메뉴 7개, 30문항 구성, OMR 이동, 타이머 색·자동 제출, 결과 집계, 기록 저장, 파트별 연습
```

데이터를 추가하거나 화면 코드를 바꾼 뒤에는 여섯 스크립트를 모두 실행해 확인합니다. `check-practice.js`는 모의고사를 매번 무작위로 출제하므로 여러 번 실행해 보는 것이 좋습니다.

보카 데이터를 바꾼 뒤에는 `node tools/build-vocab-index.js`로 `docs/vocab-index.md`(Day별 주제·표제어, 상황별 표제어, 품사별 집계, 여러 곳에 있는 표제어)를 다시 만듭니다. 새 Day 주제를 고를 때 기존 표제어와 겹치지 않는지 이 파일로 확인합니다. 새 Day를 추가하면 `tools/build-vocab-index.js`의 `DAY_TOPICS`에 주제 한 줄을 넣습니다(없으면 "(주제 미정)"으로 표시하고 경고합니다).

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
- **파트별 연습**: 파트 하나만 시간 제한 없이 풀고 문항마다 즉시 채점합니다.
- **기록**: `englishLabProgress.practiceStats.attempts`에 `{ date, correct, total, elapsedSec, timedOut, partScores:{p5,p6,p7}, partTotals:{p5,p6,p7} }`로 저장합니다 (최근 100회). `ruleId`가 있는 문항의 응답은 `grammarStats`에도 반영됩니다.
- 결과 화면의 RC 예상 점수대는 맞은 개수 구간으로 정한 **참고용 추정치**입니다.

`data/reading.js`의 `window.PART6` 항목은 `id`, `title`, `header`, `blocks`(`{type:"text", en}` 또는 `{type:"blank", n}`), `ko`, `questions`(`n`, `choices` 4개, `answer`, `explanation`, `ruleId` 또는 `null`)로 구성합니다. `PASSAGES` 항목은 단일 지문(`header` + `sentences`) 대신 `parts`(`label`, `header`, `sentences`) 배열로 이중 지문을 만들 수 있습니다.

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

회화 진도는 `englishLabProgress`의 `speakingStats`에 패턴 통과, 완료한 롤플레이, 쉐도잉 평균 정확도로 저장됩니다. 브라우저 음성 인식은 지원 여부와 마이크 권한에 따라 사용할 수 있으며, 지원하지 않거나 권한이 거부되면 입력으로 대체할 수 있습니다.

## 브라우저 저장 데이터

학습 진도는 `englishLabProgress`, 테마 선택은 `englishLabTheme` 키에 저장됩니다. 브라우저의 로컬 저장소를 사용할 수 없는 경우에도 페이지 콘텐츠는 표시됩니다.
