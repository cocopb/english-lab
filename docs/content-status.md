# 콘텐츠 현황

단계마다 이 표를 갱신한다. 새 콘텐츠는 `docs/authoring-rules.md`를 따른다.

마지막 갱신: 2026-11-24 (목표: 2주 안에 확장)

| 카테고리 | 단위 | 지금 | 목표 | 진행 | 비고 |
|---|---|---:|---:|---:|---|
| 보카 | 단어 | 790 | 1,500 | 53% | 토익 24 Day × 30 + 회화 상황 70 |
| 문법 Part 5 | 문항 | 184 | 320 | 58% | 노트 16개 |
| 독해 Part 7 | 지문 | 34 | 70 | 49% | 125문항 (단일 19 · 이중 10 · 삼중 5) |
| 독해 Part 6 | 세트 | 10 | — | | 빈칸 40개 (세트마다 4개) |
| Part 1 | 사진 | 34 | — | | 사람 23 · 사물 11 |
| Part 2 | 문항 | 45 | 100 | 45% | |
| Part 3 | 대화 | 14 | 30 | 47% | 42문항 (대화마다 3개) |
| Part 4 | 담화 | 12 | 26 | 46% | 36문항 (담화마다 3개) |
| 받아쓰기 | 문장 | 45 | — | | |
| 회화 | 패턴·롤플레이·쉐도잉 | 25 · 6 · 20 | — | | 드릴 100개 |

목표가 "—"인 카테고리는 아직 목표를 정하지 않았다.

## 늘릴 때 함께 확인할 것

- **정답 위치 분포:** 카테고리마다 각 보기 20%에서 30% 사이 (authoring-rules C1)
- **Part 7 문항 유형 분포:** 주제·목적 약 15%, 추론을 늘리고 세부사항을 줄인다 (R11)
- **Part 2 질문 유형:** 25문항 기준 의문사 약 18, 부정·부가 약 5, 평서문 약 6 (L8)
- **검사 숫자 고치기 (W5)**
  - 사진을 늘리면 `check-part1.js`의 `EXPECTED_COUNT`
  - 대화·담화를 늘리면 `check-practice.js`의 "20회 동안 대화·담화가 전부 나옴" 기준

## 개수 세는 법

```sh
node -e "var fs=require('fs'),vm=require('vm');var c={window:{}};vm.createContext(c);['vocab','grammar','reading','listening','part1','speaking'].forEach(f=>vm.runInContext(fs.readFileSync('data/'+f+'.js','utf8'),c));var W=c.window;console.log('보카',W.VOCAB.length,'| 문법',W.GRAMMAR_QUIZ.length,'| 지문',W.PASSAGES.length,'문항',W.PASSAGES.reduce((s,p)=>s+p.questions.length,0),'| Part 6',W.PART6.length,'| Part 1',W.PART1.length,'| Part 2',W.PART2.length,'| Part 3',W.PART3.length,'| Part 4',W.PART4.length,'| 받아쓰기',W.DICTATION.length)"
```
