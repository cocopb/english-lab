# 콘텐츠 작성 규칙

새 문항·지문·단어를 만들 때 지키는 규칙이다. 1차부터 4차까지의 감사(`docs/audit-*.md`)와 `tools/` 검사 스크립트가 막는 것을 한곳에 모았다 (2026-11-24 기준).

- 지시문에서는 절 번호나 규칙 번호로 부른다. 예: "authoring-rules.md의 보카 규칙(3절)을 따라줘", "R4를 지켜줘".
- 규칙마다 **왜**(근거)와 **예**(감사에서 실제로 걸린 것)를 붙였다. 예가 없는 규칙은 아직 걸린 적이 없는 예방 규칙이다.
- **검사:** 뒤에 그 규칙을 막는 스크립트와 실패 키를 적었다. "사람 검토"라고 적힌 규칙은 기계가 못 잡으니 만든 사람이 직접 확인한다.
- 규칙이 새로 생기거나 바뀌면 이 문서부터 고친다. 감사 문서는 기록이고, 이 문서가 기준이다.

## 목차

1. 공통 규칙 (C)
2. 작업 절차와 검사 스크립트 (W)
3. 보카 (V)
4. 문법 (G)
5. 독해 — Part 7·Part 6 (R)
6. 리스닝 — 받아쓰기·Part 1·2·3·4 (L)

---

## 1. 공통 규칙 (C)

### C1. 정답 위치는 고르게, 연속은 금지

- **규칙**
  - 4지선다는 A·B·C·D가 각각 20%에서 30% 사이가 되게 만든다.
    - 검사가 실패로 보는 선은 35% 이상 또는 15% 이하다(경계값 포함).
  - 3지선다(Part 2)는 각 33% 가까이 둔다.
    - 검사는 43% 초과 또는 23% 미만을 실패로 본다.
  - 같은 지문(Part 7)이나 같은 세트(Part 6) 안에서 바로 앞 문항과 정답 위치가 같으면 안 된다.
  - Part 3·4는 대화·담화 경계를 넘어서도 이어서 본다. Part 1도 바로 앞 문항과 같으면 안 된다.
  - 문장 삽입 문항은 보기가 [1]부터 [4]까지로 고정이다. 연속이 생기면 앞 문항의 보기 순서를 바꾼다.
- **왜:** 모르는 문제를 한 위치로 찍어 점수가 오르면 실력보다 점수가 높게 나와 약점 분석이 전부 어긋난다.
- **예**
  - 균등화 전 Part 7은 B가 51%였다. Part 5 문법은 B 43%, D 12%였다.
  - Part 7 지문 안 연속은 24곳, Part 6 세트 안 연속은 6건이었다(커밋 08508a0, 9254963에서 고침).
- **검사**
  - `answerRun`: check-reading(Part 6·7), check-listening(Part 3·4)
  - `answerSkew`: check-reading, check-grammar, check-listening
  - check-part1: 각 보기 ±1개, 연속, 쏠림
- **새 문항을 쓸 때:** 정답 위치를 미리 정해 두고 보기를 배치한다. 다 쓴 뒤에는 검사가 출력하는 분포를 확인한다.

### C2. 보기 순서를 바꾸면 해설의 보기 글자도 함께 바꾼다

- **규칙**
  - 해설 속 (A), (C, D), 괄호 없는 A·C·D 표기를 모두 새 순서에 맞춘다.
  - (A를 B에게 보내다), (B 포함)처럼 문법 공식에 쓰인 글자는 건드리지 않는다.
- **왜:** 글자와 보기가 어긋나도 잡는 검사가 없다.
- **예**
  - rp19 "7월 날짜(C, D)"는 한 글자짜리 치환으로는 바뀌지 않아 손으로 "(B, C)"로 고쳤다.
  - rp13 Q3 "오답: A·C·D는"은 괄호 없는 형태다.
- **검사:** 사람 검토만.
  - 9254963의 균등화 스크립트는 "바꾸기 전과 후에 각 글자가 가리키는 보기 문장이 같은지"를 대조해서 막았다. 일회성이라 저장소에는 없다.

### C3. 해설 형식: 근거 위치 + 원문 인용 + 오답마다 안 되는 이유

- **규칙**
  - 해설은 세 부분으로 쓴다.
    - 근거 위치: N번째 문장·대사·줄, 이중·삼중 지문이면 "지문 N(종류)의 M번째 문장"
    - 원문 인용, 그리고 바꿔 표현했으면 그 쌍(moving → relocation)
    - "오답:" 뒤에 보기마다 안 되는 이유
  - 유형별 머리말을 붙인다: "연계 문제다(지문 1 + 지문 2).", "추론 문제다.", "주제·목적 문제다.", "어휘 문제다.", "문장 삽입이다.", "NOT 문제다.", "의도 파악 문제다."
- **왜**
  - 독해 1부 감사 때 해설 80개 중 근거 위치를 적은 것이 11개, 오답 이유를 적은 것이 11개뿐이었다.
  - 문법 해설 167개, Part 2 해설 45개, Part 3·4 해설도 같은 이유로 다시 썼다.
- **예**
  - 독해 rp01 Q2
    - 전: "...relocation으로 바꿔 표현했다."
    - 후: "근거: 네 번째 문장 ... 오답: 날씨(A)·결제 문제(C)·인력 부족(D)은 언급되지 않았다."
  - Part 3 p301 Q2
    - 전: "Do you have the receipt with you?라고 묻는다."
    - 후: 대사 번호, 인용, 오답 이유를 갖춘 해설
- **검사:** 해설이 비었는지만 본다(`missingExplanation`, `invalidPart6`). 형식은 사람 검토.
- 파트별 세부 형식은 G6, R12, L9, L13을 본다.

### C4. 중복 검사 범위

새 문장은 아래와 겹치지 않게 쓴다. "겹침"이란 내용어(기능어·숫자를 뺀 단어)가 많이 같거나, 문장 틀(연속 3단어 묶음)이 같은 경우다.

| 새로 쓰는 것 | 대조할 것 | 검사 |
|---|---|---|
| 문법 노트 예문·trap·표·toeicPattern 속 영어 문장 | 같은 유형 문항(실패), 다른 유형 문항(경고) | check-grammar `exampleOverlap` `noteTextOverlap` |
| 문법 노트 문장 | Part 6 빈칸 문장, Part 7 지문, Part 1 보기, Part 2, Part 3·4 대본, 받아쓰기 | check-grammar `notePassageOverlap` |
| Part 7 질문 문장(q) | 다른 지문의 q (완전히 같으면 실패) | check-reading `duplicateQuestionText` |
| Part 1 정답 문장 | 다른 사진의 정답, 같은 사진의 다른 보기 | check-part1 "정답 문장 중복" "한 사진 안 선택지 중복" |
| 받아쓰기 | 단어장 예문, 문법 노트, Part 1·2·3·4, 독해 문장, 다른 받아쓰기 | 사람 검토 |
| 보카 예문 | 그 세트의 오답 단어 (예문에 오답이 들어 있으면 안 됨, V7) | 사람 검토 |

- **왜:** 노트를 읽은 직후 그 유형을 풀면 외운 문장으로 맞힌다. 그러면 유형별 정답률이 실제보다 높게 나온다. 받아쓰기는 다른 곳에서 읽은 문장이면 듣지 않고도 쓴다.
- **예**
  - g16 trap "Each of the applicants is required..."는 q012와 같은 문장이었다.
  - g13 표 "All visitors must sign in."이 q121과 겹쳤다.
  - 받아쓰기 d02 "Please submit the report by Friday."가 d31·v011과 겹쳐서 20문장을 고쳤다.
- **허용 목록**
  - `NOTE_TEXT_OVERLAP_ALLOWED`, `NOTE_PASSAGE_OVERLAP_ALLOWED`가 있다.
  - "정답 단어가 노트가 가르치는 형태 그 자체"일 때만 이유와 함께 넣는다. 예: g09 It's ↔ q090.

### C5. 미국식 영어와 표기 통일

- **규칙**
  - 철자: canceled, labor, harbor, enrollment, cataloging, program, traveler
    - 예외: 보카 tip에서 영국 철자를 알려 주는 설명(traveller / licence)
  - 어휘: national holiday(public holiday ❌), by regular mail(by post ❌), on Main Street(in ❌)
  - 저장소 전체 통일: email(e-mail ❌, 문법 q128·q147에서 통일), résumé(q012·q171)
  - 한 지문 안에서는 a.m. / A.M., e-mail / email을 섞지 않는다.
  - 영어 칸에 둥근 따옴표(’ “ ”), 전각 문자, 비표준 하이픈, NBSP, 두 칸 띄어쓰기, 한글을 쓰지 않는다.
  - 4단어 이상 문장은 문장부호로 끝낸다.
- **왜:** 토익은 미국식 표기 기준이다. 같은 앱 안에서 표기가 섞이면 학습자가 둘 중 하나를 틀린 것으로 오해한다.
- **예**
  - harbour → harbor, enrolment → enrollment, cataloguing → cataloging
  - 보카 s039 tip Cancelled → Canceled
  - Part 2 p215 public holiday → national holiday, p241 by post → by regular mail
- **검사**
  - 형식: check-vocab `textFormat` (저장소 전체 영어 칸)
  - 오타 후보: `node tools/list-rare-words.js`
  - 철자는 사람 검토. -our, -ise, -re, 겹 l 패턴을 검색해서 본다.

### C6. 같은 이름·사실을 콘텐츠끼리 맞춘다

- **규칙**
  - 서로 다른 회사·지문의 인물에게 같은 이름을 쓰지 않는다.
  - 같은 인물이면 이름 철자, Mr./Ms., 직책을 질문·해설·지문·speakers 표에서 똑같이 쓴다.
- **왜:** 학습자는 같은 이름이면 같은 사람으로 읽는다.
- **예:** p608 카페 대표와 rp34 식당 주인이 둘 다 Marisol Vega였다. p608 쪽을 Leah Brandt로 바꿨다.
- **검사:** 사람 검토.

---

## 2. 작업 절차와 검사 스크립트 (W)

### W1. 버그 심기는 복사본에서

- 검사 스크립트를 새로 만들거나 고친 뒤 "틀린 데이터를 넣으면 실패하는지" 볼 때는 저장소 파일을 고치지 않는다. 절차는 README "검사가 실제로 잡는지 확인할 때"에 있다.
  1. scratchpad에 `data tools assets pages index.html`을 복사한다. 스크립트는 `__dirname/../data`를 읽으므로 복사본만 본다.
  2. 복사본 데이터에 버그를 심고 복사본의 `tools/check-*.js`를 돌려 실패하는지 본다.
  3. 끝나면 복사본을 지운다.
  4. 커밋 직전에 `git status --short`와 `git diff --stat`으로 의도한 파일만 바뀌었는지 확인한다.
- 심은 변경이 정말 버그인지 먼저 따진다. 기존 가드가 이미 막는 변경은 통과하는 것이 맞다.
- **왜:** 2026-11-20에 원본에 버그를 심고 백업으로 되돌리다가 data/listening.js가 다른 파일로 덮어써졌다. bash의 `/tmp`와 node의 `/tmp`가 다른 폴더였다.

### W2. 파일을 고칠 때 조심할 것

- **임시 파일:** scratchpad 절대 경로만 쓴다. `/tmp`는 bash와 node에서 다른 폴더다.
- **줄바꿈:** 작업 파일이 CRLF일 수 있다(core.autocrlf=true).
  - `"\n];"` 기준으로 끼워 넣으면 `}\r,`처럼 홀로 남은 \r이 생긴다.
  - 그러면 git이 파일을 텍스트로 보지 않아 diff가 파일 전체로 잡힌다.
  - 끼워 넣기 전에 `\r\n`을 `\n`으로 통일하고, 커밋 전에 `git diff --ignore-cr-at-eol --stat`으로 실제 변경 크기를 본다.
  - 실제 사례: reading.js에 이런 `\r`이 하나 남아 있어서 저장소에 CRLF로 들어가 있었다(08508a0에서 정리).
- **이스케이프:** Write 도구나 `node -e`로 `\uFEFF` 같은 이스케이프를 쓰면 실제 문자로 바뀐다. 쓴 뒤 `od -c`로 확인한다.
- **질문 문장으로 찾는 코드:** check-practice는 Part 7 문항을 질문 문장(q)으로 찾는다. q를 바꾸면 다른 지문과 같아지지 않는지 본다(R10).

### W3. 데이터를 바꾼 뒤 돌리는 것

1. check 스크립트 8개 전부. 하나라도 실패하면 종료 코드 1이다.
2. `check-practice.js`는 20회. 매번 무작위로 출제하므로 특정 문항이 뽑힐 때만 깨지는 문제를 잡으려면 여러 번 돌려야 한다.
3. 색인 다시 만들기
   - 보카를 바꿨으면 `node tools/build-vocab-index.js`
   - 문법 노트·문항이나 Part 6 ruleId를 바꿨으면 `node tools/build-grammar-index.js`
4. `docs/content-status.md`의 개수 갱신

### W4. 검사 스크립트가 막는 것

| 스크립트 | 막는 것 (실패 시 exit 1) |
|---|---|
| `check-vocab.js` | 빈칸을 만들 수 없는 예문, 오답 3개 형식, 같은 Day 뜻 겹침(`meaningOverlap`), 뜻 보기 4개 불가, 품사와 뜻 모양 불일치(`posMeaningShape`), 저장소 전체 영어 칸 형식(`textFormat`). 가짜 DOM으로 마지막 Day 시험 화면 |
| `check-grammar.js` | 문항 형식, 보조 태그, 노트 문장과 문항·지문의 겹침, 검토 안 된 단정 표현(`absoluteClaimUnreviewed`), 정답 위치 쏠림. 노트·퀴즈 화면 |
| `check-reading.js` | Part 7·6 형식, 해석 누락, Part 6 type·ruleId, 어휘 목록이 답을 알려 줌, 어휘 문항 단어 횟수, 문장 삽입 표시, 질문 문장 중복, 정답 위치 연속·쏠림. 독해 화면 |
| `check-listening.js` | 받아쓰기·Part 2·3·4 형식, 화자 라벨, 도표 모양과 연계(`graphic*`), 의도 파악 인용(`intentQuote`), TTS가 빼기로 읽는 숫자(`ttsUnsafeNumber`), 정답 위치 연속·쏠림, 음성 배정과 재생 |
| `check-part1.js` | Part 1 형식, 허용 필드 6개(장면 설명 금지), 사진 사이 문장 중복, 이미지 형식·300KB, 표시 크기, alt 노출, 정답 위치 ±1·연속·쏠림 |
| `check-practice.js` | 미니 모의고사·RC/LC 풀세트·파트별 연습의 구성, 타이머, 채점, 저장, 복원, 환산 점수. 무작위라 20회 돌린다 |
| `check-speaking.js` | 회화 패턴·드릴·롤플레이·쉐도잉 필드, 화면 진행, TTS 재생 |
| `check-backup.js` | 기록 내보내기·가져오기에서 진도가 줄거나 중복되거나 오답이 되살아나는 것. 코드에 버그를 메모리에서만 심어 8종을 확인한다 |
| `build-vocab-index.js` | (생성) `docs/vocab-index.md`. 새 Day 주제를 고를 때 기존 표제어 확인용 |
| `build-grammar-index.js` | (생성) `docs/grammar-index.md`. 새 노트·trap이 기존 문항과 부딪치는지 확인용 |
| `list-unknown-distractors.js [Day]` | (출력) 보카 오답 중 "아는 단어"가 아닌 것. 위반 세트와 허용 세트(V3) |
| `list-missing-meanings.js` | (출력) 뜻이 등록되지 않은 오답 단어 (V9) |
| `list-rare-words.js [글자]` | (출력) 저장소에서 한 번만 나오는 영어 단어, 즉 오타 후보 |

### W5. 검사에는 콘텐츠 개수를 박지 않는다

- **규칙:** 검사 스크립트는 콘텐츠 개수(사진 34장, 대화 14개 등)를 숫자로 적지 않고 데이터에서 읽는다. 콘텐츠를 늘리는 단계마다 검사를 고치지 않기 위해서다.
  - 시험 구성 규격(LC 풀세트 6/25/39/30, 대화 13개·담화 10개, Part 6 4문항 세트, 담화당 3문항)은 콘텐츠 개수가 아니라 규격이라 숫자로 둔다.
- **출제 검사 (2026-11-24 바꿈)**
  - **도달성:** `check-practice.js`가 출제 함수(`PracticeLcFullSet.plan`, `PracticeFullSet.plan`, `PracticeMini.build`)를 화면 없이 200회 돌린다. 그 모드가 쓸 수 있는 항목이 모두 최소 1번 나와야 한다. 한 번도 안 나오면 출제 코드가 그 항목에 닿지 못한다는 뜻이다.
  - **쏠림:** 뽑힐 확률이 같은 풀은 나온 횟수가 이항분포 평균 ± (4.5 표준편차 + 1) 안이어야 한다. 화면을 끝까지 넘기는 20회 검사도 과도하게 자주 나오는 항목만 같은 식으로 본다.
  - Part 5(한 유형 6문항 제한)와 미니 모의고사의 Part 6·7(조합 출제)은 문항마다 확률이 달라 도달성만 본다.
  - **예:** 예전 검사는 "20회 안에 대화 14개·담화 12개가 전부 나온다"였다. 대화를 늘리면 20회 × 13개 추출로는 다 나오지 않아 확률적으로 실패했을 것이다.
- **RC 풀세트에 구조상 안 나오는 지문:** RC 풀세트는 지문을 (지문 수, 문항 수) 모양으로 뽑는다. 단일 2·3·4문항, 이중 5문항, 삼중 5문항이다. 그 밖의 모양(예: 이중 지문 4문항)은 미니 모의고사·파트별 연습에만 나온다. check-practice가 그 목록을 ℹ로 알려 준다. 새 이중·삼중 지문은 5문항으로 만든다.
- `check-part1.js`는 문항 수를 고정하지 않고 데이터와 이미지 폴더가 서로 맞는지만 본다.

---

## 3. 보카 (V)

### V0. 분업과 항목 구조

- 필드: `{ id, track, day | situation, word, pos, meaning, example, exampleKo, tip, distractors[3], tags }`
  - 품사가 여럿이면 pos를 "v./n."처럼 쓰고, meaning도 같은 순서로 " / "로 나눈다. 예: charge 「청구하다 / 요금」
- **분업 (2026-11-11 사용자 결정)**
  - 사용자: 주제, 단어 30개, 품사, 한국어 뜻, 영어 예문, 한국어 예문
  - Claude: 오답 3개, tip, tags
  - **왜:** Day 17에서 사용자가 쓴 오답 30개 중 16개가 빈칸에 들어맞았다.
- 보고서에 오답 30세트를 전부 적어 사용자가 검수하게 한다.
- 새 Day는 `tools/build-vocab-index.js`의 `DAY_TOPICS`에 주제 한 줄을 넣는다.
- **검사:** `missingFields`, `distractorCount`, `answerAsDistractor`, `trackMetadata`, `blank`
  - `blank`: 예문에 표제어나 활용형이 있어야 빈칸이 생긴다.

### V1. 오답은 뜻으로 지워져야 한다 (오답 규칙 1)

- **규칙**
  - 오답을 빈칸에 넣으면 **문장 뜻이 안 맞아서** 지워져야 한다. 문법상 들어가는 것은 괜찮다.
  - 3개 중 최소 2개는 "뜻"으로 지워져야 한다. 정답과 품사·종류·주제가 같은데 문장 뜻과 맞지 않는 경우다.
  - 나머지 1개는 "범주"로 지워져도 된다. 품사가 다르거나, 사람 빈칸에 사물이 오거나, 주제가 전혀 다른 경우다.
  - 동물·음식처럼 업무 문장에 나올 수 없어서 "말이 안 돼서" 지워지는 오답은 쓰지 않는다.
  - 후보를 하나씩 빈칸에 넣어 읽고, 뜻이 통하는 후보는 버린다.
- **왜:** 사용자가 300점대라, 터무니없는 보기가 있으면 소거법으로 맞혀서 시험이 작동하지 않는다.
- **예**
  - v137 pending: `permanent, persistent, penguin` → penguin을 punctual로 바꿨다. 2차 때 아주 쉬운 단어로 넣었던 penguin(pending), elephant(eligible), dinosaur(diploma), monkey(module), tiger(ticket)는 너무 쉽게 틀렸다.
  - v006 schedule: `section, segment, shelter` → `shelter, ship, share`. section·segment는 범주로만 지워졌다.
  - 통해서 버린 예: v005 provide의 `promote, propose`. "We promote/propose free delivery"가 둘 다 말이 된다.
- **검사:** 사람 검토.

### V2. 최소 2개는 아는 단어 (오답 규칙 2)

- **규칙:** 아는 단어는 790단어장 표제어, 그 파생형, `docs/basic-words.md`를 합친 것이다.
  - **파생형:** 접미사를 최대 3번, 접두사 un/re/in/im/dis/non/pre/mis/over/under를 뗀다. 표제어에서 접미사 하나를 뗀 4글자 이상 어근(employee → employ → employer)도 인정한다.
  - **합성어는 파생형이 아니다.** placeholder ≠ place + holder
  - 두 단어 이상인 오답은 기능어를 뺀 모든 단어가 아는 단어여야 한다.
- **`docs/basic-words.md`의 역할**
  - 중학 교과서 수준의 기초 단어 목록이다(1,686개).
  - 망설여지는 단어는 넣지 않는다. 고칠 때는 ```text 블록만 바꾼다.
  - substance·resident·opponent·slight·furious·burden 등 16개는 일부러 뺐다.
- **왜:** 모르는 단어가 보기에 있으면 "모르는 건 답이 아니겠지"라는 소거가 된다.
- **예**
  - v011 submit: subside(드묾) → subway
  - 드물어서 무조건 교체한 단어: minuets, pharaoh, currant
- **검사:** `node tools/list-unknown-distractors.js [Day]`. 출력만 하고 실패로 끝나지 않는다. 현재 위반은 0세트다. 새 Day를 넣으면 반드시 돌린다.

### V3. 나머지 1개는 철자·소리가 비슷하면 몰라도 된다 (오답 규칙 3)

- **규칙:** 모르는 오답은 1개까지이고, 정답과 철자나 소리가 비슷해야 한다.
  - "비슷하다"의 판정: 앞 두 글자가 같고 길이 차이가 3자 이내, 또는 뒤 세 글자가 같음, 또는 편집 거리가 긴 쪽 길이의 40% 이하
- **왜:** 철자 혼동 자체가 토익 함정이라 남긴다.
- **예:** quarantine(quarter), waist(waste), barley(barely), v545 packing slip의 pay slip
- **검사:** list-unknown-distractors의 "허용"(323세트)과 "✗ 위반"

### V4. 철자가 비슷한 아는 단어가 없으면 같은 주제의 업무 단어 (오답 규칙 4)

- **왜:** 철자를 억지로 맞추면 모르는 단어나 터무니없는 단어가 들어온다.
- **예**
  - v099 beverage: `average, coverage, beach` → `average, dessert, snack`
  - v034 budget: `bulletin, button, bridge` → `profit, deadline, button`
- **검사:** 사람 검토.

### V5. 사람 빈칸이면 오답도 같은 업종·같은 상황의 사람 명사, 예문은 그 사람만 맞게 (오답 규칙 5)

- **규칙**
  - 사람이 들어가는 빈칸은 오답도 사람 명사로 둔다.
  - 오답은 같은 업종·같은 상황의 사람이어야 한다.
  - 사람 명사는 대개 빈칸에 다 들어가므로, 예문을 그 사람만 해당되게 고친다.
- **왜**
  - 철자가 비슷한 사물로 피하면(chairperson → chairlift, chandelier) 너무 쉬워진다.
  - 맥락 밖의 사람(매장 세트의 pilot)은 "매장 얘기가 아니니까"로 범주만 보고 지워진다.
- **예**
  - v255 shareholder: 예문 "Shareholders receive dividends twice a year.", 오답 `employee, customer, supplier`
  - v183 chairperson: `cashier, chef, customer` → `attendee, shareholder, guest` (host는 통해서 뺐다)
  - v047 supervisor: `supplier, subscriber, customer`(회사 밖 사람) → `employee, trainee, intern`
- **예외**
  - v169 reference는 '추천서'라는 사물 뜻이 있어서 사물 오답을 쓴다.
  - v168 personnel, v180 headquarters는 사람이 아니라 부서·조직이다.
- **검사:** 사람 검토.

### V6. 예문이 정답을 특정해야 한다

- **규칙**
  - 표제어를 빼고 읽었을 때 뜻이 다른 흔한 단어(특히 반대말)가 똑같이 들어가면 약한 예문이다.
  - 정답 뜻을 가리키는 맥락(이유·결과·대상)을 한 덩어리 붙인다. 예문은 짧게 유지하고, exampleKo도 같이 고친다.
  - 동의어가 들어가는 것은 괜찮다. 보기에 그 동의어가 없기 때문이다.
  - 오답이 통하면 오답 대신 예문을 고쳐도 된다.
- **왜:** 보기에 반대말이 없더라도, 예문만 보고 뜻을 떠올릴 수 없으면 단어를 익히지 못한다.
- **예**
  - v001 `Are you available on Friday?`에는 busy가 들어간다. → `...afternoon for a quick meeting?`
  - v002 `I will attend the meeting.`에는 miss가 들어간다. → `...and take notes for the team.`
  - v324 productivity: 오답 production이 통해서 "We still make 500 chairs a week, but now with fewer working hours, so our productivity has gone up."으로 바꿨다.
- **검사:** 사람 검토.

### V7. 예문 속 오답 단어 금지, 관사 단서 금지

- **예문 속 오답 단어**
  - **규칙:** 예문에 오답 단어(복수형 포함)가 들어 있으면 안 된다.
  - **왜:** 문장에 이미 있는 단어는 답이 아니라고 바로 지워진다.
  - **예**
    - v664 preliminary: 예문의 'the final count' 때문에 오답 final을 complete로 바꿨다.
    - v482 tenant: 예문 'building owner'가 오답 owner와 겹쳐서 예문을 바꿨다.
- **관사 단서**
  - **규칙:** 빈칸 바로 앞의 a/an이 소리로 보기를 걸러 내면 안 된다. 정답과 같은 소리로 시작하는 오답만 쓰거나, 예문의 관사를 없앤다.
  - **왜:** "an ___"이면 자음으로 시작하는 보기가 문법만으로 지워진다.
  - **예**
    - v088 'an urgent' → 'This matter is ___' (usual, utility가 걸러지던 것)
    - v644 'a degree' → 'a university ___' (agree가 걸러지던 것)
    - v574 'An ___' → 'A hospital ___'
- **검사:** 사람 검토. 4차 감사 때 일회성 스크립트로 훑었고, 저장소에는 검사가 없다.

### V8. 같은 Day 안 한국어 뜻 겹침과 `meaningsTooSimilar`

- **동작 원리**
  - 뜻 시험 보기는 같은 Day(회화는 같은 상황)의 표제어 뜻에서 뽑는다.
  - `meaningsTooSimilar` 가드는 뜻이 같거나 포함 관계이거나 `,`·`/` 조각이 겹치는 쌍을 한 문제에 함께 내지 않는다. 비교 전에 하다·되다·시키다를 뗀다.
  - 가드가 막는 쌍은 문제가 되지 않는다. **가드는 통과하는데 뜻이 사실상 같은 쌍**이 정답 둘을 만든다.
- **규칙:** 새 Day를 쓰면 30개 뜻을 나란히 읽고 사실상 같은 쌍을 찾는다. 찾으면 한쪽을 좁히거나 괄호로 구분한다.
- **검사:** check-vocab `meaningOverlap`
  - 한쪽 뜻이 다른 뜻에 통째로 들어 있거나, 동의어 표 `MEANING_SYNONYMS`(고용·채용, 인력·직원, 팸플릿·전단지·리플릿, 규격·표준, 장비·기기·장치, 장려금·보조금, 요금·이용료)에 걸리면 실패다.
  - 반대 뜻처럼 검토 후 둘 쌍은 `REVIEWED_MEANING_PAIRS`에 이유와 함께 넣는다(현재 operate|shut down, downtime|operate).
  - 목록에 있는데 더 이상 걸리지 않으면 실패하니 지운다.
- **왜:** 뜻 시험에서 보기 두 개가 둘 다 정답이 된다.
- **예**
  - v220 brochure 「(여러 쪽짜리) 안내책자」 / v221 flyer 「(한 장짜리) 전단지」
  - v157 recruit 「(새 인원을) 모집하다」(hire와 겹쳤다)
  - publicity 「홍보」 ↔ campaign 「홍보 활동」
  - 동의어 쌍(assess·evaluate, candidate·applicant)은 가드가 같은 문제에 내지 않도록 일부러 겹치게 둔다.
- **같은 뜻의 다른 표제어를 오답으로 쓰지 않는다.** v063 candidate에서 applicant를 오답 후보에서 뺐다.

### V9. 품사와 뜻 모양, 새 오답의 뜻 등록

- **품사와 뜻 모양**
  - 명사·형용사 뜻이 '-다'나 '-하게·-히·-적으로'로 끝나면 안 된다.
  - 동사 뜻은 '-다'로 끝나야 한다.
  - 부사 뜻이 '-다'나 '-한·-된·-적인'으로 끝나면 안 된다.
  - **왜:** 뜻 시험에서 품사가 정답의 단서가 된다.
  - **예**
    - v092 advance 「미리, 사전에」는 명사에 부사형 뜻이었다. 표제어를 in advance로 바꿨다.
    - v689 barely 「거의 -않다」 → 「간신히, 가까스로」, 설명은 tip으로 옮겼다.
  - **검사:** `posMeaningShape`
- **한국어 뜻에 영어를 넣지 않는다** (`textFormat`).
- **새 오답의 뜻 등록**
  - **규칙:** 처음 쓰는 오답 단어가 표제어가 아니면 `VOCAB_DISTRACTOR_MEANINGS`의 새 블록에 뜻을 넣는다.
  - 블록은 기존 키가 없을 때만 추가하므로, 나중 블록으로 기존 뜻을 덮어쓸 수 없다.
  - **왜:** 단어장 상세의 "혼동 단어" 줄에 뜻이 보여야 한다. 뜻 시험 보기에는 쓰이지 않는다.
  - **검사:** `node tools/list-missing-meanings.js` (지금 0개 유지), check-vocab 경고 `missingDistractorMeanings`
- **일부러 틀린 표현** `VOCAB_WRONG_FORMS`에는 뜻을 붙이지 않는다(`wrongFormHasMeaning`).
  - **왜:** 틀린 영어가 자연스러운 뜻과 함께 보이면 맞는 표현으로 오해한다.

### V10. 그 밖의 보카 규칙

- 오답은 실제 영어 단어이고, 원형(표제어 형태)으로 쓴다. 선택지가 원형으로 보이기 때문이다.
- 숙어 표제어는 오답도 숙어로 맞춘다. in advance → in addition, in charge, in person
- 뜻에서 뺀 쓰임이나 구분 설명은 tip으로 보낸다. 예: barely의 '거의 -않다', candidate·applicant 구분
- 같은 트랙 안 표제어 중복은 경고(`duplicateWords`)다. 다른 뜻을 가르치려고 의도한 경우에만 둔다.

---

## 4. 문법 (G)

### G1. 노트 문구에 단정 표현을 쓸 때의 절차

- **규칙**
  - 노트(oneLine·표·예문 설명·trap·toeicPattern)에 무조건·항상·절대·반드시·언제나·어떤 경우에도·모든 경우·예외 없이·뿐이다·만·에만을 쓰면 다음 순서를 밟는다.
    1. check-grammar가 `absoluteClaimUnreviewed`로 실패하면서 대조할 문항 후보를 보여 준다. 후보는 같은 유형 전부, 그 문장의 영어 단어가 든 다른 유형, "전치사 뒤·조동사 뒤·be동사 뒤" 같은 자리 문항이다.
    2. 후보 전부와 전체 문항에서 반례를 찾는다. 다른 노트의 trap·예문에서도 찾는다.
    3. 반례가 있으면 단정을 빼거나 예외를 적는다.
    4. 반례가 없으면 `REVIEWED_ABSOLUTE_CLAIMS`에 "노트id|문장 그대로"를 키로, 검토 이유를 값으로 넣는다.
  - 문장을 고치면 옛 키가 `absoluteClaimStale`로 실패한다. 목록도 같이 고친다.
  - 가장 쉬운 길은 단정을 쓰지 않는 것이다. "보통", "거의", "대개"로 쓴다.
- **왜:** 1차 문법 감사에서 노트와 문항 사이의 모순이 27건 나왔다. 대부분 단정에 반례가 있는 경우였다.
- **예**
  - g05 "전치사 뒤에는 무조건 -ing다": 반례 q081 to me, q084 by himself, g07 "during waiting ❌"
  - g12 "주어와 동사가 반드시 있어야 하고": 명령문 q119 등이 반례였다. "(명령문만 주어 you를 생략한다)"로 고쳤다.
  - g01 "the ___ 뒤가 동사나 전치사일 때만 명사 자리": 반례 q006·q160
  - g02(9254963) "every는 of 없이 단수 명사 앞에만": every one of라는 반례가 있다. "every of the \~로는 쓰지 않는다"로 고쳤다.
- 해설 속 단정은 참고로만 출력한다(`explanationAbsoluteClaims`).

### G2. 노트 ↔ 문항 ↔ 다른 노트 모순 점검

새 노트 문구나 새 문항을 넣을 때마다 아래 네 가지를 본다. 1차 감사에서 찾은 모순의 네 종류다.

1. 단정에 반례가 있다 (G1)
2. 단정은 아니지만 반례가 있다. 예: g02 "of 덩어리를 가리고 주어를 찾아라" ↔ q175 A number of packages were
3. 노트끼리 또는 노트와 해설이 어긋난다
   - g05 "전치사 뒤 -ing" ↔ g07 "during waiting ❌"
   - g03 "tomorrow → will" ↔ g11 조건절 현재형
   - g16 "less + 형용사는 g10" ↔ g10 표에 less가 없었음
4. 그 태그가 붙은 문항을 노트로 풀 수 없다
   - g06 노트에 since가 없었다(q056)
   - Part 6 direct A to B를 g06으로 풀 수 없었다

- **방법**
  - `node tools/build-grammar-index.js`로 `docs/grammar-index.md`를 만든다. 이 파일에 노트별 trap 전체가 한 줄씩 있다.
  - 새 문구를 관련 노트의 trap과 나란히 읽는다.
  - 경계가 걸친 주제는 양쪽 노트에 같은 말로 쓴다. 수 일치는 g02, g14(짝), g16(수량 표현)에 걸쳐 있다.
- **예 (2026-11-24 g02 보강 때 찾은 것)**
  - g02 표의 "each · every · either · neither (+ of the 복수 명사)"는 every of도 되는 것처럼 읽혔다.
  - 같은 표의 "neither → 단수" 행이 "neither A nor B → B에 맞춘다" 행과 부딪쳤다. g16처럼 "뒤에 or·nor가 이어지지 않을 때"를 붙였다.
- **새 문항은 그 유형 노트의 설명만으로 풀려야 한다.** 노트에 없는 규칙을 묻는 문항을 넣으면 노트를 먼저 보강한다.
- **검사:** 1은 기계(G1), 2부터 4까지는 사람 검토.

### G3. 주 태그(`ruleId`)와 보조 태그(`alsoRuleIds`)

- **규칙**
  - 주 태그는 "이 문항을 틀렸다면 어느 노트를 다시 읽어야 하나"로 정한다. 빈칸을 가르는 결정적인 규칙이다.
  - 두 번째 규칙이 오답 하나를 지우는 데 필요하면 보조 태그로 붙인다.
- **왜**
  - 약점 통계와 유형별 정답률은 주 태그로만 쌓인다.
  - 보조 태그는 오답 복습의 "🔗 이 문제는 ○○(gXX)도 함께 묻습니다" 링크로만 보인다.
- **예**
  - q005 will lead: 주 g01, 보조 g13 (leading을 지우는 데 조동사 규칙이 필요)
  - q117 Could you please confirm: g12 → g13 (조동사를 뜻으로 고르는 문제라 g13 표로 풀린다)
  - q181 The number of visitors ... has: 주 g02, 보조 g16
  - q184 Not only ... but also the regional manager is: 주 g02, 보조 g14
- **검사:** `invalidRuleId`, `invalidAlsoRuleIds` (없는 유형, 주 태그와 같음, 중복, 빈 배열)

### G4. 오답이 성립하는 경우를 막는다 (복수정답)

- **규칙:** 오답 3개를 하나씩 빈칸에 넣어 읽는다. 다음 경우는 문법상 성립하므로 오답이 아니다.
  - **강조의 do:** q113 "the train does leave", q115 "she did cancel" → the train leaving, she cancel로 바꿨다
  - **전치사의 다른 뜻**
    - q053·q057 by: '\~까지는'(마감)으로 성립 → to로 바꿨다
    - q060 for: "return for three days"가 '돌아와서 3일 머문다'로 성립
    - q055 at: 원어민이 흔히 쓴다
  - **재귀대명사의 다른 쓰임:** q087 herself ("gave herself a raise")
  - **범위가 둘이면 비교급도 맞음:** q092 the more experienced. 범위를 our twenty-person team으로 밝혔다.
  - **혼합 가정:** q109 would pass. 문장 끝에 last spring을 붙였다.
  - **어색하지만 비문은 아님:** q118 goes often → often go(수가 틀린 오답)로 바꿨다
- **고치는 쪽:** 정답은 그대로 두고, 오답이나 문장에 단서를 더해서 고친다.
- **구어에서 쓰이는 오답:** 표준 문법만 정답으로 두고, 해설에 "토익은 ○○를 정답으로 낸다"를 적는다.
  - 예: q016 Neither ... was (구어 were), q086 Ms. Lee and I (구어 me), q180 fewer (구어 less)
- **검사:** 사람 검토. 형식만 `duplicateChoices`가 본다.

### G5. 문항 문장

- 빈칸은 `____`(밑줄 2개 이상)이다. 검사: `missingBlank`
- 대명사가 가리키는 대상이 문장 안에 있어야 한다.
  - q052 "Please submit it ____ 5 p.m."는 it이 가리키는 것이 없었다.
- 단서가 충분해야 한다.
  - q083 "The decision was ____."는 단서가 너무 적었다.
- 하이픈 복합어를 빈칸으로 가르지 않는다.
  - q158 best-selling을 빈칸으로 가르면 하이픈이 빠진다.
- 보기 형태를 통일한다. 낱말 형태를 묻는 보기에 명사구를 섞지 않는다(q027 current time).
- 한 문장에 같은 기능의 단서를 둘 넣지 않는다. q118은 often과 every year가 둘 다 빈도라 어색했다.

### G6. 문법 해설 형식

- "규칙 설명 → 정답 → 오답마다 왜 안 되는지" 순서로 쓴다.
  - q051 전: "요일 앞에는 on을 쓴다."
  - q051 후: "요일(Friday) 앞에는 on. in은 월·연도, at은 시각에 쓰고, due to는 '\~ 때문에'라 뜻이 달라진다."
- 해설이 노트와 어긋나면 안 된다. q010 "일반동사 뒤 수식어는 부사"는 g01 표(일반동사 + 목적어 앞은 형용사)와 어긋났다.
- Part 6 문법 빈칸은 "규칙 설명(gNN) + 오답: 각 보기가 안 되는 이유"로 쓴다.

---

## 5. 독해 — Part 7·Part 6 (R)

### R0. 구조

- 단일 지문: `{ id, type, title, strategyId, recommendedSec, header, sentences:[{en, ko, mark?}], vocab:[{w, m}], questions }`
- 이중·삼중 지문: sentences 대신 `parts:[{label, header, sentences}]`
- 문항
  - 기본: `{ q, choices[4], answer, explanation }`
  - 어휘 문항: `+ word, part`
  - 문장 삽입 문항: `+ insert`
- Part 6: `blocks:[{type:"text", en} | {type:"blank", n}]`, 문항 `{ n, type, choices, answer, explanation, ruleId }`
- **검사:** `invalidStrategyId`, `invalidAnswer`, `missingTranslation`, `duplicateIds`, 렌더링 검사

### R1. 연계 문제는 한 지문으로 풀리면 실패

- **규칙**
  - 이중·삼중 지문의 연계 문항은 두 지문의 정보를 합쳐야만 풀려야 한다.
  - 한쪽 지문이 이유나 답을 직접 말하면 그 말을 빼고, 빠진 정보는 다른 지문이 말하게 한다.
  - 연계 문항 수: 지금 데이터는 이중 지문 2개, 삼중 지문 2개 또는 3개다. 명시 규칙은 아니고 관찰값이다.
- **왜:** 연계로 표시한 문항이 실제로는 한 지문으로 풀렸다.
- **예**
  - rp27 Q3: 지문 3이 "below the limit for trips abroad"라고 이유를 그대로 말했다. "which is within our limit"로 바꾸고, 해외 여부는 신청서 "Oslo (international)"로 옮겼다.
  - rp32 옛 Q4: 지문 3만 읽어도 풀렸다. 질문을 바꾸고 지문 3에서 "on the base"를 뺐다.
  - rp30은 연계 3개를 2개로 줄이고, 나머지 하나를 추론으로 바꿨다.
- **날짜 연계:** 날짜는 본문이 아니라 이메일 머리글 Date 줄에 둔다.
  - rp25 "I am sending this message on October 3, so I believe no change fee applies." → "I believe no change fee applies to this request." + Date: October 3
- **해설:** "연계 문제다(지문 1 + 지문 2). 근거 1: … 근거 2: …"
- **검사:** 사람 검토. 확인 방법은 지문 하나씩만 가리고 풀어 보는 것이다.

### R2. 지문 안·지문 사이 사실 모순

- **규칙**
  - 날짜와 요일을 실제 달력(연도 표기 없음, 한 지문 안에서 일관)과 맞춘다.
  - 영업일·예약일·메일 날짜·마감일의 순서를 맞춘다. 답장은 원메일 뒤, 신청은 마감 전이다.
  - 계산 값(박 수, 합계, 남은 수, 할인액)이 지문끼리 맞아야 한다.
  - 한 지문이 "보내 주신 \~"이라고 하면 그것이 다른 지문에 실제로 있어야 한다.
- **왜:** 근거끼리 어긋나면 정답이 흔들리고 학습자가 지문을 의심하게 된다.
- **예**
  - rp16 "appointments are recommended on weekends"는 영업일이 Monday to Saturday라 맞지 않았다. "on Saturdays"로 고쳤다.
  - rp31 지문 3의 "the floor plan you sent"는 공지에 배치도가 없었다. 공지에 "New room numbers are shown on the attached floor plan."을 넣었다.
  - 이름이 겹친 사례는 C6을 본다.
- **계산 확인 예:** rp08 August 1(금)·4(월)·8(금)·11(월), rp27 390 ÷ 2 = 195, rp31 240 + 1,600 + 350 + 400 = 2,590
- **검사:** 사람 검토.

### R3. 어휘(동의어) 문항

- **규칙**
  1. 질문은 `In the email, the word "X" is closest in meaning to`이다.
     - 문단·행 번호 대신 문서 종류(email, article, text message chain)로 위치를 가리킨다.
     - `word`가 질문 속 X와 같아야 하고, 이중·삼중이면 `part`를 붙인다.
  2. X는 그 문서(part가 있으면 그 지문)에 단어 단위로 **정확히 한 번** 나와야 한다.
  3. 그 지문의 핵심 어휘 목록에 X가 있으면 안 된다.
  4. **정답이 그 단어의 가장 흔한 뜻(사전 1번 뜻)이면 안 된다.** 이 문맥에서만 정해지는 뜻을 정답으로 하고, 오답 3개는 그 단어의 다른 뜻으로 만든다. 사전 1번 뜻을 오답에 넣으면 "아는 뜻으로 고르면 틀린다"는 함정이 된다(사용자 기준).
  5. 오답을 문장에 넣으면 뜻이 통하지 않아야 한다.
  6. 해설 끝에 "참고: 실제 시험에서는 '문단 2, 3행의 단어'처럼 위치를 알려준다…"를 붙인다.
- **왜**
  - 2: 단어가 두 번 나오면 질문이 가리키는 자리가 하나로 정해지지 않는다.
  - 3: 독해 탭이 핵심 어휘를 본문과 함께 보여 줘서 답이 미리 보인다.
  - 4: 1번 뜻이 정답이면 문맥을 읽지 않고도 풀린다.
- **예 (지금 5문항)**

  | 지문 | 단어 | 정답 | 오답(다른 뜻) |
  |---|---|---|---|
  | rp06 | covers | includes | protects, pays for, hides |
  | rp11 | run | operate | race, manage, extend |
  | rp14 | matter | issue | substance, importance, mail |
  | rp17 | holds | contains | grips, delays, hosts |
  | rp30 | figure | number | shape, person, drawing |

  - 핵심 어휘에서 뺀 예: rp06 cover(다루다), rp17 hold(담다). 각각 ticketing system, first stop으로 바꿨다.
  - run의 manage가 오답인 이유: 노선을 '경영한다'로는 '15분마다'와 이어지지 않는다.
- **검사:** `vocabWord` (질문 단어와 word 불일치, 문서에 N번 나옴, 핵심 어휘에 있어 답이 보임). 4와 5는 사람 검토.

### R4. 문장 삽입

- **규칙**
  - 지문 문장 4개에 `mark: 1`부터 `4`까지 하나씩 붙인다.
  - 질문은 `In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong? "..."`이다.
  - `insert`는 질문 속 큰따옴표 문장과 똑같아야 하고, 본문에는 없어야 한다.
  - mark가 있는 지문에는 삽입 문항이 정확히 1개 있어야 한다.
  - **삽입 문장에는 연결 단서**(지시어 these/the, 접속부사 However 같은 대비·순서 표지)를 넣는다. 나머지 세 자리에는 그 단서가 가리킬 대상이 없어야 한다.
  - 삽입 문항은 그 지문의 마지막 문항에 둔다.
- **왜:** 단서가 없으면 네 자리 모두 그럴듯해서 복수정답이 된다.
- **예**
  - rp15 "However, food and drinks from the café will not be free."는 [4](free to enter 뒤)가 정답이다. [1]에서는 카페가 아직 안 나왔고, [2]에서는 However가 대비할 '무료'가 없다.
  - rp05 "These new employees will train at the original store first."는 채용 문장 뒤만 '새 직원'을 가리킬 수 있다.
- **검사:** `insertPositions`, 렌더링 검사의 삽입 표시. 단서는 사람 검토.

### R5. 추론

- **규칙**
  - 근거 두 곳을 합쳐야 나오게 쓴다. 한 문장만으로 풀리면 세부사항 문항이다.
  - 해설에 두 곳(지문 번호와 문장)을 적는다.
  - 금액 계산은 답이 하나로 떨어져야 한다.
  - 질문 표현: most likely, suggested, implied, infer
- **왜:** 실제 토익 추론은 약 20%이고, 흩어진 정보를 연결하는 능력을 본다.
- **예**
  - rp19: 납기 6월 17일 + 2% 연체료 → $373.32
  - rp25: 1박 180달러 + 10월 12일 퇴실 → $720
  - rp34: 화요일 방문 + "이제 평일에도 예약을 받는다" → 그날은 예약할 수 없었다
  - rp02: 측면 출입구(2번째 문장) + 2층 안내 데스크(3·4번째 문장) → 오크 가로 들어와 2층으로 간다
- **검사:** 사람 검토.

### R6. 주제·목적 문항의 오답 설계

- **규칙**
  - 지문마다 첫 문항 자리에 하나를 둔다. 실제 토익은 약 15%이고, 지금은 20문항(16%)이다.
  - 정답 근거는 제목, 첫 문장, "이후 문장도 모두 \~"이다.
  - 오답 3개는 **지문에 나오지만 주된 목적이 아닌 것**으로 만든다.
    - 지문에 한 번만 언급된 부차적 내용
    - 지문의 일부(한 문장)에만 해당하는 내용
    - 지문이 "하지 않는다/이미 했다"고 한 것
    - 이미 있는 것을 '새것'으로 바꾼 것
  - 지문과 상관없는 오답은 쓰지 않는다.
- **왜:** 지문과 무관한 오답은 너무 쉽다. "주된 목적은 일정 변경인데 덧붙인 보고서 요청도 끌린다"(rp07) 정도의 긴장이 있어야 한다.
- **예**
  - rp22 (D) "To announce that the fitness center will close for a day": 지문은 All other facilities will remain open이라고 했다
  - rp11 (D) 정류장 공사 일정: 네 번째 문장 하나에만 해당한다
  - rp09 (B) 친구 추천 혜택: 네 번째 문장에 한 번 나온다
  - rp34 (A) 요리사 모집: 이미 뽑았다(have since hired)
  - rp20 (A) 새 투어 노선: 2009년부터 운영했다
- **질문 문장은 지문마다 다르게 쓴다**(R10). 예: rp08 "What is the purpose of the notice?", rp22 "What is the main purpose of the notice?"
- **검사:** 유형 분포만 출력한다(check-reading "Part 7 문항 유형 분포"). 오답 설계는 사람 검토.

### R7. 핵심 어휘가 답을 미리 알려 주지 않게

- **규칙**
  - Part 7 vocab에 어휘 문항의 단어를 넣지 않는다(R3).
  - Part 6 vocab은 단어형 보기(정답·오답 모두)와 어간이 겹치면 안 된다. 문장 보기와 겹치는 것은 참고로만 알린다.
  - vocab의 w는 본문이나 header에 실제로 있어야 한다. 활용형도 되고, "be \~"는 be동사 활용형도 인정한다.
  - 뜻은 지문에서의 쓰임으로 적는다. 품사나 쓰임이 단어장과 다르면 괄호로 밝힌다.
- **왜:** 어휘 목록은 풀기 전부터 보인다.
- **예:** rp12 available 「(사람이) 시간이 되는」, rp28 follow-up 「(형용사) 후속의」, rp30 wholesale 「(형용사) 도매의」
- **검사:** `part6VocabRevealsChoice`, `invalidPart6Vocab`, `vocabWord`. Part 7 w가 본문에 있는지는 사람 검토.

### R8. 형식

- **이메일:** From, To, Date, Subject를 갖춘다. Date에 연도를 쓰지 않고, 본문의 다른 날짜와 순서가 맞아야 한다.
  - 예: rp01 Date: March 8 (도착 예정 3월 11일보다 앞), rp32 회신 Date는 고객 메일 다음 날
- **게시글·후기:** 날짜를 넣는다. 예: rp34 "Posted by: Theo Lindqvist | May 12 | Rating: 4 of 5"
- **업무 영어의 굳은 표현을 쓴다**
  - rp14 quick attention → prompt attention to this matter
  - rp26 "examples I could copy"는 '베꼈다'로 읽혀서 "examples I was able to use in my own shop"으로 바꿨다
- **검사:** 사람 검토.

### R9. Part 6

- **type**
  - grammar, vocab, sentence 중 하나다.
  - 보기가 모두 문장(. ! ?로 끝남)이면 sentence이고, 그 반대도 맞아야 한다.
  - ruleId가 있으면 grammar이고, ruleId는 GRAMMAR에 있는 id여야 한다. 없으면 null이다.
  - 빈칸 n과 문항 n은 1:1이다.
  - **검사:** `invalidPart6`
- **문법 빈칸은 연결된 노트로 풀려야 한다(G2).** 예: g06에 direct A to B, from A through B를 넣어 Part 6 빈칸이 풀리게 했다.
- **복수정답 금지:** 오답은 문법으로도 문맥으로도 들어갈 수 없어야 한다.
  - p601 ["to","at","for","with"] → ["to","on","by","with"]
  - p605 'the faster option'도 맞아서 본문에 "of our three renewal options"를 넣었다
- **문장 삽입 오답:** '관계없지만 넣어도 어색하지 않은' 문장은 쓰지 않는다. 앞뒤 문장이나 첫 문장과 모순되는 문장으로 만든다.
  - p604 "The product has been discontinued since 2010." → "All X20 kettles have been checked and are safe to use."
  - p610 "Please send two letters of reference by Monday." → "Please send your application by September 30."
- **풀세트 조건:** RC 풀세트는 4문항짜리 세트에서 뽑는다. 새 세트도 빈칸 4개로 만든다.

### R10. 질문 문장 중복 금지

- **규칙:** 다른 지문과 질문 문장(q)이 글자까지 같으면 안 된다. "What is the purpose of \~?" 같은 전형 질문은 지문에 맞춰 구체적으로 쓴다(of the expense policy, of the web page).
- **왜:** check-practice가 q로 원문항을 찾는다. 같은 q가 둘이면 그 지문이 뽑힐 때만 채점이 깨진다(간헐적 실패).
- **예**
  - rp13·rp27 "What is the purpose of the first notice?" → rp27을 "...of the expense policy?"로 바꿨다
  - 2026-11-24에 주제 문항 10개를 넣을 때도 rp08·rp22, rp11·rp15가 걸려 바꿨다
- **검사:** `duplicateQuestionText`

### R11. 유형 분포

- check-reading이 질문 표현으로 분류한다. 위에서부터 먼저 걸린 것으로 센다.
  1. closest in meaning to → 어휘
  2. positions marked [1] → 문장 삽입
  3. NOT → NOT
  4. mean when / mean by → 의도 파악
  5. most likely / suggested / implied / infer → 추론
  6. purpose / Why ... write·sent / mainly about·discuss / main topic → 주제·목적
  7. 나머지 → 세부사항
- **질문을 쓸 때 주의:** 원하는 유형으로 분류되는 표현을 쓴다. "suggested"가 든 목적 질문은 추론으로 센다.
- **지금 분포 (125문항)**

  | 유형 | 지금 | 방향 |
  |---|---|---|
  | 주제·목적 | 16% | 15% 안팎 유지 |
  | 세부사항 | 58% | 줄인다 (실제 약 45%) |
  | 추론 | 14% | 늘린다 (실제 약 20%) |
  | NOT | 3% | |
  | 의도 파악 | 2% | 문자·채팅 지문에 |
  | 어휘 | 4% | |
  | 문장 삽입 | 2% | |

  새 지문은 세부사항 대신 추론·어휘·삽입 쪽으로 쓴다.

### R12. 독해 해설

- C3 형식을 따른다. 이중·삼중이면 "지문 N(종류)의 M번째 문장"으로 쓴다.
- 연계 문항에는 필요하면 "지문 2 본문은 \~만 말하고 \~는 말하지 않는다"를 덧붙여, 한 지문으로 풀리지 않는 이유를 밝힌다(rp30 Q2).

---

## 6. 리스닝 — 받아쓰기·Part 1·2·3·4 (L)

### L0. 구조

- **받아쓰기:** `{ id, text, ko, level(정수) }`
- **Part 2:** `{ id, type, question, choices[3], answer, explanation, ko }`
  - type은 `PART2_TYPE_LABELS`의 값(wh·yesno·negtag·choice·request·statement·indirect) 중 하나다.
- **Part 3:** `{ id, title, script:[{speaker, text}], questions, speakers?, graphic? }`
  - 화자 라벨은 `W`/`M`, 3인 대화면 `W1`·`W2`·`M1`이다(첫 글자가 성별).
- **Part 4:** `{ id, type, title, voice:"W"|"M", script:["문장"...], questions[3] }`
- **도표 문항:** `graphic:true, link`
- **의도 파악 문항:** `quote`
- **검사:** `dictationFields`, `part2*`, `part3Structure`, `part4Structure`(문항 3개), `duplicateIds`

### L1. 대화·담화 내부 모순 점검 항목

새 대본은 다음을 차례로 확인한다.

1. **시각·날짜·인원·금액을 순서대로 따라가며 계산이 맞는지**
   - 예: p302 2시부터 4시 → 한 시간 연장 → 5시, 6시까지 비어 있음
   - 예: p314 남쪽 5:55 → 북쪽 6:10, 15분 차이 = "allow an extra fifteen minutes"
2. **"only / 유일하다"라고 해 놓고 다른 선택지를 쓰지 않는지**
   - p310 "only Thursday afternoon is free on your calendar"인데 금요일 4시 30분에 면접을 잡았다. → "Thursday afternoon is the only long free block"
3. **뒤 대사의 전제를 앞에서 말했는지**
   - p314 남자가 "남쪽에 먼저 서니 15분 더 잡으라"고 하는데, 여자가 북쪽 터미널을 쓴다는 말이 없었다. → "My flight leaves from the north terminal."을 넣었다.
4. **운영 시간·기간이 다른 정보와 충돌하지 않는지**
   - pt405 금·토는 5시에 닫는데 "staffed only until six"였다. → ", Monday through Thursday"를 붙였다.
5. **화자가 이미 아는 것을 다시 묻지 않는지** (p311 주문 번호를 다시 확인하던 것)
6. **문장을 새로 넣었을 때 질문이 가리키는 대상이 둘이 되지 않는지**
   - pt403에 15% 할인 문장을 넣자 "special offer"가 둘을 가리켰다. → 질문을 "opening offer"로 좁혔다.
7. **대사를 바꾼 뒤 해설의 문장·대사 번호가 밀리지 않았는지** (pt404 Q1, pt406 Q3)
8. **'다음에 할 일' 문항의 보기에 대화에 나온 다른 할 일이 없는지** (p302 Q3)

- **검사:** 사람 검토.

### L2. TTS 읽기 규칙

- **기준 음성:** Microsoft Zira(en-US). SAPI 음소열로 확인했다. Chrome의 Google 음성과 Edge 온라인 음성은 확인하지 못했다.

| 대상 | 규칙 | 실제로 걸린 예 |
|---|---|---|
| 방·호실 번호 | 숫자 대신 읽는 방식대로 쓴다 | p209 `Room 302.` → three hundred and two로 읽힘 → `Room three-oh-two.` |
| 주문·참조 번호 | 한 자리씩 단어로 | p303 `order 3312` → three thousand three hundred and twelve로 읽힘 → `order three three one two` (p311 eight two four one과 같은 방식) |
| 전화번호 | 숫자-하이픈-숫자 금지, 풀어 쓴다 | 데이터에는 없었다. 음성이 한국어(Heami)로 잡히면 555-0144를 '오오오콩일사사'로 읽는다 → `five five five, zero one four four` |
| 동음이의 철자 | 동사로 읽히는 명사를 피한다 | p310 `résumés`가 동사 resumes로 읽힘 → `applications` (보기도 함께) |
| 시각 | 대본에는 "six ten", "early evening"처럼 단어로. A.M./P.M.은 도표에만 둔다 | 도표 칸은 화면에만 보이고 읽지 않는다 |
| 금액·비율·서수 | 대본에는 단어로 ("eleven cents", "fifteen percent", "on the thirteenth") | Heami는 $1,200을 '천이백달러', 3/15를 '십오분의 삼'으로 읽었다(데이터에 없던 표현으로 시험한 결과) |
| 영국 표현 | 미국식으로 (C5) | p215 public holiday → national holiday, p241 by post → by regular mail |

- **그대로 둬도 된다고 확인한 것:** Since 2021, At gate 12, Ms.(Miz), Mr., Dr., o'clock, 하이픈 복합어(three-year, thirty-two, sign-up, third-floor), Route 9, number 14
- **확인하지 못한 것:** "ten to eight"(시각 표현). 쓰지 않는다.
- **검사:** `ttsUnsafeNumber` (Part 3·4 대본의 숫자-하이픈-숫자). 나머지는 사람 검토. 새 숫자 표현은 SAPI로 읽혀 본다.

### L3. 화자 이름과 음성

- **이름이 대사에 나와야 하는 경우**
  - **규칙:** 문항이나 해설이 특정 화자를 이름으로 물으면, 그 이름이 대사에 나와야 한다. 같은 성별 화자가 둘이면 반드시 그렇다.
  - **왜:** 같은 성별 둘 중 누가 그 사람인지 들어서는 알 수 없다.
  - **예**
    - p309 여자 둘(Lena·Priya)인데 Q2는 Priya, Q3은 Lena를 물었다. "Priya, how far is the next closest one?", "Lena, could you book the rooms...?"를 넣었다.
    - p313 Q2가 Fiona를 묻는다. "Good idea, Fiona."를 넣었다.
    - 묻지 않는 화자(p308 Claudia)는 이름이 안 나와도 된다.
  - 같은 성별 화자에게 비슷한 이름을 주지 않는다.
  - 문항·해설의 이름과 `speakers` 표가 같아야 한다.
- **음성 배정**
  - 같은 화자는 대화 내내 같은 목소리이고, 화자끼리는 서로 달라야 한다.
  - 한 음성을 나눠 쓰면 pitch와 속도로 구분하되, 남성 pitch를 올리거나 여성 pitch를 내리지 않는다.
  - 남녀 음성이 다 있으면 W/M 대화에는 보정을 붙이지 않는다.
- **Part 4**
  - 화자 한 명, `voice` W 또는 M, 한 목소리다.
  - 상대 성별 음성을 빌려도 **pitch를 보정하지 않는다**(2026-11-17 사용자 결정). 구분할 상대가 없고, 보정하면 음질만 나빠진다.
- **검사:** `part3Structure`(라벨·speakers), 음성 배정 시나리오("화자끼리 목소리가 같음", "화자가 한 명인데 pitch 보정이 붙음"). 이름이 대사에 나오는지는 사람 검토.

### L4. 시각 정보 연계 (graphic)

- **규칙**
  1. 질문은 `"Look at the graphic. "`으로 시작한다(화면에서 이 말만 굵게 표시).
  2. 정답 보기는 도표 한 칸과 글자가 똑같다.
  3. **정답이 대본에 직접 나오면 안 된다.** 칸 그대로, A.M./P.M.을 뗀 꼴, 소리 나는 꼴(6:10 → six ten) 모두 안 된다.
  4. 대본은 도표의 **다른 축**(link)을 말하고, 그 link가 대본에 그대로 있어야 한다. 풀이 경로는 "대본 → link → 도표 한 행 → 정답 칸"이다.
  5. 정답 행에 정답이 아닌 칸이 하나 이상 있어야 한다.
  6. 도표: title, 열 2개 이상(이름 중복 없음), 행 3개 이상, 칸 수 일치, 빈 칸 없음
  7. 다른 행이 link 조건 하나로 지워지게 설계한다.
- **왜:** 대본만 듣고 풀리면 연계 문항이 아니다.
- **예**
  - p305: 원래 대사 "book a Sunday evening flight"를 "leaves in the early evening, so I don't land after midnight"로 고쳤다. 정답은 NW 518이다. NW 604는 저녁에 떠나지만 12:45 A.M. 도착이라 지워진다.
  - p308: "does the conference room have a projector" → "does that room have a projector?" 방 번호는 도표로만 알게 했다.
  - p314: "north terminal" + "The five thirty" → 6:10 A.M. 5:55는 남쪽 도착이라 지워진다.
- **검사:** `graphicAnswerInScript`, `graphicLink`, `graphicShape`, 화면 검사(굵게, 재생 전부터 도표 보임)

### L5. 의도 파악

- **규칙**
  - 인용 대사를 **글자 그대로 읽은 뜻은 정답이 아니어야** 하고, 그 글자 그대로의 뜻을 함정 보기로 넣는다.
  - 인용 대사는 뜻이 하나로만 읽혀야 한다.
  - 대본이 그 대사가 하는 일을 직접 말하지 않고 돌려 말하게 한다.
  - `quote`는 대본에 글자 그대로 있고, 질문에 큰따옴표로 들어간다. 예: `What does the man mean when he says, "..."?`
- **왜:** 글자 그대로의 뜻이 답이면 앞 맥락을 듣지 않아도 풀린다.
- **예**

  | id | 인용 | 정답 | 글자 그대로 읽은 함정 |
  |---|---|---|---|
  | p306 | "Tell me about it" | She has had the same experience | She wants to hear more details |
  | pt404 | "you'll need them" | The machine floor will be very noisy | The listeners must buy their own gear |
  | pt406 | "think again" | Listeners should change their travel plans | Listeners should call the station back |
  | pt407 | "I'll take that" | He is satisfied with the result | He will accept a new assignment |
  | p309 | "Don't remind me" | She also had an unpleasant stay there | She asks Priya not to repeat the information |

  - p309는 처음에 "That adds up"이었다. '말이 된다'로도 읽혀 뜻이 둘이라 바꿨다.
  - pt404는 "since the machine floor is loud"를 빼서 직접 말하지 않게 했다.
- **검사:** `intentQuote` (대본에 없음, 질문에 큰따옴표 없음). 뜻이 하나인지는 사람 검토.

### L6. Part 2 함정 유형 6가지

오답 하나하나가 아래 유형 중 하나에 들어야 한다. 어디에도 안 드는 엉뚱한 오답은 두지 않는다(처음 감사 때 3개, 지금 0개).

| # | 유형 | 실제 예 |
|---|---|---|
| 1 | 유사 발음 | p208 invoice → "The voice was clear.", p242 director → directions |
| 2 | 연상 어휘 | p202 store → "On Main Street.", p231 coffee → "I take it with milk." |
| 3 | 같은 단어 반복 (다른 뜻 포함) | p236 sign → "I signed up for the class.", p225 leaves → "I'll leave it on your desk." |
| 4 | 의문사 혼동 | p201 Where에 "At three o'clock." |
| 5 | Yes/No 불가 | p221 선택의문문에 "Yes, let's go." |
| 6 | 부정의문문 Yes/No 뒤집힘 (5의 변형) | p219 "Haven't you finished...?"에 "Yes, I'm still waiting..." |

- **6번은 p219 한 문항에만 쓴다.** 여럿이면 문제를 풀지 않고 요령(모순 보기 찾기)만 배운다.
  - 해설에는 "한 일이면 Yes, 안 한 일이면 No다. 부정의문문의 not은 무시하고 답한다"를 쓴다.
  - 나머지 부정·부가 문항은 정답에서 이 원리를 쓰고, 오답은 1번부터 5번까지로 만든다(p223, p224, p225, p242).
- **간접 응답은 함정이 아니라 정답 쪽 유형이다.**
  - 예: p216 "I already ate, thanks."(권유에 간접 거절)
  - 평서문에는 공감·제안·정보로 답하는 것이 정답이다(p210, p231).
- **검사:** 사람 검토.

### L7. Part 2 복수정답

- **규칙:** 오답마다 생략 응답('(그건) 책상 위에 있어요')과 Yes를 뺀 꼴까지 넣어 보고, 응답으로 성립하면 바꾼다.
- **왜:** 실제 대화에서는 짧은 간접 응답이 자연스러워서, 오답이 의도치 않게 정답이 된다.
- **예**
  - p218 Have you met the new manager? — "In the meeting room."이 '(회의실에서 만났다)'로 성립
  - p222 The printer is out of paper. — "On the desk."가 '(종이는) 책상 위에'로 성립
  - p241 "Yes, I sent it already."는 Yes를 빼면 간접 응답이 된다
  - p208의 교체 후보 "I sent you a text."는 정답으로 성립할 수 있어 쓰지 않았다
- **검사:** 사람 검토.

### L8. Part 2 질문 유형 분포

- 25문항 기준 실제 토익 비율에 맞춘다: 의문사 약 18, 부정·부가 약 5, 평서문 약 6.
  - 지금(45문항): wh 17, request 7, yesno 5, statement 6, negtag 5, choice 3, indirect 2
- **질문 설계**
  - 부정의문문: `Didn't you send the report?` 보냈으면 Yes
  - 부가의문문: `You've met her before, haven't you?` 앞 문장이 맞는지에 답한다
  - 평서문: 질문이 아니라 상황 설명. 공감·제안·정보로 답한다
- 같은 틀의 질문을 반복하지 않는다. 예전에 "Where did you put \~"가 세 번 있었다.
- 평서문 주제가 한쪽으로 쏠리지 않게 한다. 프린터 고장이 세 번 있었다.

### L9. Part 2 해설

- 정답이 왜 자연스러운지 쓰고, 오답 둘을 각각 유형 이름과 함께 설명한다.
- 패턴이 보이게 쓴다. 예: "(C) At three o'clock은 Where로 물었는데 시각으로 답한 함정이다(의문사 혼동)."
- **왜:** 처음 해설 중 오답 둘을 모두 설명한 것이 p232 하나뿐이었다.
- `ko`에는 질문과 정답의 해석을 쓴다.

### L10. 받아쓰기

- 5단어부터 11단어까지, 미국식 영어로 쓴다. level은 정수 1, 2, 3이다.
- **채점이 같게 보는 것**
  - 대소문자, 구두점, 아포스트로피를 무시한다.
  - 하이픈 = 붙여 쓰기 (e-mail = email)
  - 숫자 = 단어 (3 = three, 5th = fifth, 3:30 = three thirty, $50 = fifty)
- **축약형은 다르게 채점한다** (I'd ≠ I would). 새 문장에 축약형을 쓰면 들리는 대로 받아써야 한다는 점을 알고 쓴다.
- **원문을 그대로 입력하면 100%가 나와야 한다.** check-listening 화면 검사가 확인한다.
- **중복:** C4 표의 대조 대상 전부와 겹치지 않게 쓴다. 흔한 시간 표현(next Monday)만 겹치는 것은 허용한다.
  - 예: d14 "The flight has been delayed by two hours."가 v020과 겹쳤다
  - 예: d19 "I'm calling about the invoice you sent."가 Part 3 p302·p303·p311과 문장 틀이 같았다

### L11. Part 1 오답 함정 유형

| 유형 | 예 |
|---|---|
| 사진에 없는 동작 | They're painting a wall. |
| 사진에 있는 사물의 다른 동작 | closing the curtains (커튼은 있다) |
| 사람이 없는데 진행형 수동태 | is being hung |
| 이미 된 상태를 동작으로 | putting on a hat (모자는 쓰고 있다) |
| 상태 반대 | empty, folded up, rolled up |

- 사진에 비춰 성립하는 오답이 없는지 사진을 다시 보고 확인한다.
  - 위험했던 예: ph22 "The shelves are full of books." 오답, ph04는 사람 사진인데 정답이 사물 묘사였다.
- **해설:** 사진의 어디를 보면 되는지 위치를 적는다. 예(ph19): "가운데 출입구(EXIT 표지 옆) 앞에…"
- **장면 설명 금지:** 데이터 필드는 `id, img, kind, choices, answer, explanation` 여섯 개뿐이다. alt는 화면이 "Part 1 사진 N"으로 붙인다. 장면 설명이 있으면 정답이 노출된다.
- **문장 중복:** 다른 사진의 정답끼리, 같은 사진의 보기끼리 겹치지 않는다. LC 풀세트에서 6장이 한 세트로 나오면 "같은 문장을 또 들었다"고 느낀다.
- **kind:** people / objects. LC 풀세트는 사람 5장 이상, 사물 2장 이상이 필요하다.
- **사진 변환:** 원본 폴더 `C:\Users\USER\Desktop\토익 사진`에서 PowerShell System.Drawing으로 변환한다. 긴 변 1200px(확대 안 함), 품질 80, JPEG, 300KB 이하.
- **검사:** check-part1 (허용 필드, alt, 정답 문장 중복, 한 사진 안 선택지 중복, 용량, JPEG, 표시 크기, 정답 위치). 사진과 맞는지는 사람 검토.

### L12. Part 3·4 정답 위치

- C1을 따른다. 대화·담화 경계를 넘어서도 바로 앞 문항과 같은 위치는 안 된다.
- 새 문항 12개를 넣을 때 이 검사가 4건을 잡았다.

### L13. Part 3·4 해설

- "근거: N번째 대사(여자 또는 이름) + 원문 인용 + 바꿔 표현한 것. 오답: 보기마다 이유." 담화는 "N번째 문장"으로 쓴다.
- 시각 정보 문항은 도표에서 이어지는 칸까지 적는다.
- 예(p303 Q3): "근거: 6번째 대사(여자) If it isn't found, we'll send a replacement at no charge. at no charge를 free로 바꿔 표현했다. 오답: 부분 환불(A)·할인 쿠폰(B)·사과 편지(D)는 제안하지 않았다."
