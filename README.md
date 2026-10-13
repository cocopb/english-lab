# English Lab

브라우저에서 바로 열어 사용할 수 있는 영어 학습 노트의 정적 사이트 뼈대입니다. HTML, CSS, JavaScript만 사용하며 빌드 도구나 서버가 필요하지 않습니다.

## 폴더 구조

```text
english-lab/
├─ index.html
├─ pages/                 # 보카, 독해, 문법, 회화, 오답노트, 퀴즈, 계획
├─ assets/
│  ├─ css/style.css       # 디자인 시스템과 반응형 스타일
│  └─ js/                 # 공통 UI/진도와 퀴즈 동작
├─ data/                  # 전역 배열로 제공하는 샘플 콘텐츠
└─ README.md
```

## 로컬 실행

`index.html`을 브라우저에서 열면 됩니다. 페이지와 데이터는 상대 경로의 스크립트로 연결되어 있으며 JSON `fetch`를 사용하지 않습니다. GitHub Pages에도 저장소 내용을 그대로 게시할 수 있습니다.

## 콘텐츠 추가

`data/` 폴더의 해당 JavaScript 파일에 항목을 추가합니다. 각 파일은 `window.GRAMMAR`, `window.MISTAKES`, `window.VOCAB`, `window.SPEAKING`, `window.QUIZ`, `window.PLAN` 전역 배열을 제공합니다. 기존 항목과 같은 객체 필드를 유지하면 페이지가 항목을 자동으로 렌더링합니다.

- `grammar.js`: `id`, `title`, `summary`, `body`, `tags`
- `mistakes.js`: `id`, `original`, `correction`, `reason`
- `vocab.js`: `id`, `word`, `meaning`, `example`
- `speaking.js`: `id`, `situation`, `expressions` (각 표현은 `english`, `korean`)
- `quiz.js`: `id`, `question`, `options` (4개), `answer` (0부터 시작하는 정답 인덱스), `explanation`
- `plan.js`: `id`, `title` (26개 주차 항목)

문법, 회화, 오답노트, 단어, 퀴즈 콘텐츠는 각 배열의 객체를 복사해 필요한 내용만 바꾸면 됩니다. 계획은 주차 항목을 추가하거나 수정할 수 있고 완료 상태는 `localStorage`에 저장됩니다.

## 브라우저 저장 데이터

학습 진도는 `englishLabProgress`, 테마 선택은 `englishLabTheme` 키에 저장됩니다. 브라우저의 로컬 저장소를 사용할 수 없는 경우에도 페이지 콘텐츠는 표시됩니다.
