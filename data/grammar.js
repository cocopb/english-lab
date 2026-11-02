window.GRAMMAR = [
  {
    id: "g01",
    order: 1,
    title: "품사 자리",
    oneLine: "빈칸 앞뒤를 보면 품사가 정해진다. 뜻은 몰라도 된다.",
    weight: "최다 빈출",
    table: {
      headers: ["빈칸 위치", "들어갈 품사"],
      rows: [
        ["the ___ / a ___ / 형용사 ___", "명사"],
        ["주어 ___ 목적어", "동사"],
        ["___ + 명사", "형용사"],
        ["동사 ___ / 문장 맨 앞 ___", "부사"]
      ]
    },
    examples: [
      { good: "The decision was final.", bad: "The decide was final.", note: "the 뒤 → 명사" },
      { good: "She works carefully.", bad: "She works careful.", note: "동사 뒤 → 부사" },
      { good: "This is an effective plan.", bad: "This is an effect plan.", note: "명사 앞 → 형용사" }
    ],
    trap: "very, so 같은 수식어에 속지 마라. 꾸밈 받는 대상을 봐야 한다.\nShe is very careful. (be동사 뒤 → 형용사)\nShe works very carefully. (동사 뒤 → 부사)",
    toeicPattern: "선택지가 decide / decision / decisive / decisively 처럼 한 뿌리의 네 품사로 나오면 100% 이 유형이다. 해석하지 말고 빈칸 앞뒤만 봐라. 5초면 풀린다."
  },
  {
    id: "g02",
    order: 2,
    title: "수 일치",
    oneLine: "동사의 모양은 주어 하나로 정해진다. 주어를 먼저 찾아라.",
    weight: "빈출",
    table: {
      headers: ["주어", "현재형 동사"],
      rows: [
        ["단수 (he, she, it, the report)", "works / is / has"],
        ["복수 (they, we, the reports)", "work / are / have"],
        ["셀 수 없는 명사 (information)", "단수 취급"]
      ]
    },
    examples: [
      { good: "The report is ready.", bad: "The report are ready.", note: "report는 단수" },
      { good: "The reports on the sales are ready.", bad: "The reports on the sales is ready.", note: "주어는 reports, on the sales는 전치사구" },
      { good: "Information is helpful.", bad: "Informations are helpful.", note: "information은 셀 수 없음" }
    ],
    trap: "주어와 동사 사이에 낀 전치사구에 속지 마라.\nThe manager of the departments ___ .\n→ 주어는 manager(단수)지 departments가 아니다.",
    toeicPattern: "주어와 빈칸 사이에 of, in, with로 시작하는 덩어리가 길게 끼어 있으면 이 유형이다. 그 덩어리를 손으로 가리고 진짜 주어를 찾아라."
  },
  {
    id: "g03", order: 3, title: "시제", weight: "빈출",
    oneLine: "문장에 있는 시간 표시어가 시제를 결정한다.",
    table: { headers: ["시제", "형태", "같이 오는 말"], rows: [
      ["과거", "worked", "yesterday, last week, in 2020, ago"],
      ["현재완료", "have worked", "since, for, recently, already, yet"],
      ["미래", "will work", "tomorrow, next week"],
      ["현재진행", "am working", "now, at the moment"]
    ] },
    examples: [
      { good: "I worked there last year.", bad: "I have worked there last year.", note: "last year가 있으면 현재완료를 쓸 수 없다" },
      { good: "I have worked here for three years.", bad: "I work here for three years.", note: "for + 기간, 과거부터 지금까지 이어짐" },
      { good: "He will call you tomorrow.", bad: "He called you tomorrow.", note: "tomorrow는 미래" }
    ],
    trap: "since와 for를 구분하라.\nsince + 시점 (since 2020)\nfor + 기간 (for three years)\n둘 다 현재완료와 짝을 이룬다.",
    toeicPattern: "빈칸이 동사이고 선택지가 같은 동사의 시제 변형이면, 문장에서 시간 표시어를 먼저 찾아라. yesterday·last·ago가 보이면 과거, since·for가 보이면 현재완료다."
  },
  {
    id: "g04", order: 4, title: "능동 / 수동", weight: "빈출",
    oneLine: "주어가 하는 쪽이면 능동, 당하는 쪽이면 수동(be + p.p.)이다.",
    table: { headers: ["구분", "형태", "판단 기준"], rows: [
      ["능동", "sent", "주어가 행위를 한다"],
      ["수동", "was sent", "주어가 행위를 당한다"],
      ["수동 미래", "will be sent", "—"],
      ["수동 완료", "has been sent", "—"]
    ] },
    examples: [
      { good: "The package was delivered yesterday.", bad: "The package delivered yesterday.", note: "소포는 배달되는 쪽" },
      { good: "They delivered the package.", bad: "They were delivered the package.", note: "사람은 배달하는 쪽" },
      { good: "The report will be reviewed.", bad: "The report will review.", note: "보고서는 검토되는 쪽" }
    ],
    trap: "가장 빠른 판별법은 빈칸 뒤를 보는 것이다.\n빈칸 뒤에 목적어(명사)가 있으면 능동, 없으면 수동일 확률이 높다.",
    toeicPattern: "선택지에 announce / announced / was announced / announcing이 섞여 있으면 이 유형이다. 해석보다 빈칸 뒤에 명사가 있는지부터 확인하라."
  },
  {
    id: "g05", order: 5, title: "to부정사 vs 동명사", weight: "빈출",
    oneLine: "동사 뒤에 어떤 형태가 오는지는 앞의 동사가 정한다.",
    table: { headers: ["뒤에 오는 형태", "해당 동사"], rows: [
      ["to + 동사원형", "want, plan, decide, hope, agree, need, offer, afford"],
      ["-ing", "enjoy, finish, avoid, consider, recommend, suggest, mind, keep"],
      ["둘 다 가능", "like, love, start, begin, continue"]
    ] },
    examples: [
      { good: "I want to go.", bad: "I want going.", note: "want는 to만" },
      { good: "We recommend taking the earlier train.", bad: "We recommend to take the earlier train.", note: "recommend는 -ing만" },
      { good: "She finished writing the report.", bad: "She finished to write the report.", note: "finish는 -ing만" }
    ],
    trap: "to 뒤에는 동사원형이지만, look forward to / be used to / contribute to 의 to는 전치사다. 이때는 -ing가 온다.\nI look forward to meeting you. (to meet ❌)",
    toeicPattern: "빈칸 앞 동사만 보면 된다. 해석할 필요가 없다. 위 표의 동사 목록을 외워두면 3초 안에 풀린다."
  },
  {
    id: "g06", order: 6, title: "전치사", weight: "빈출",
    oneLine: "in(넓음) → on(면·날짜) → at(점·시각) 순으로 범위가 좁아진다.",
    table: { headers: ["전치사", "시간", "장소"], rows: [
      ["in", "월·연도·계절 (in May)", "넓은 공간 (in Seoul)"],
      ["on", "날짜·요일 (on Monday)", "표면 (on the desk)"],
      ["at", "시각 (at 7 p.m.)", "지점 (at the station)"]
    ] },
    examples: [
      { good: "The meeting is on Monday.", bad: "The meeting is in Monday.", note: "요일은 on" },
      { good: "Please finish it by Friday.", bad: "Please finish it until Friday.", note: "by는 마감, until은 계속" },
      { good: "I waited for two hours.", bad: "I waited during two hours.", note: "for + 숫자 기간" }
    ],
    trap: "by와 until을 구분하라.\nby 5 = 5시 전까지 끝내라 (마감)\nuntil 5 = 5시까지 계속하라 (지속)\n뜻이 완전히 다르다.",
    toeicPattern: "빈칸 뒤 명사를 보고 고른다. 숫자 기간(two weeks)이면 for, 사건 명사(the meeting)면 during이다."
  },
  {
    id: "g07", order: 7, title: "접속사 vs 전치사", weight: "최다 빈출",
    oneLine: "뒤에 '주어+동사'가 오면 접속사, 명사 덩어리만 오면 전치사다.",
    table: { headers: ["뜻", "접속사 (뒤에 문장)", "전치사 (뒤에 명사)"], rows: [
      ["~때문에", "because, since", "because of, due to"],
      ["~에도 불구하고", "although, though", "despite, in spite of"],
      ["~하는 동안", "while", "during"]
    ] },
    examples: [
      { good: "We canceled it because it rained.", bad: "We canceled it because of it rained.", note: "뒤에 주어+동사 → 접속사" },
      { good: "We canceled it because of the rain.", bad: "We canceled it because the rain.", note: "뒤에 명사만 → 전치사" },
      { good: "Although he was late, he finished.", bad: "Despite he was late, he finished.", note: "despite 뒤에는 문장이 못 온다" }
    ],
    trap: "despite of는 존재하지 않는 표현이다. despite 또는 in spite of 둘 중 하나만 쓴다.",
    toeicPattern: "빈칸 뒤를 보고 1초 만에 가른다. 주어+동사가 보이면 접속사, 명사만 보이면 전치사. Part 5에서 품사 자리 다음으로 많이 나온다."
  },
  {
    id: "g08", order: 8, title: "관계대명사", weight: "보통",
    oneLine: "앞의 명사가 사람이면 who, 사물이면 which, 둘 다 되면 that이다.",
    table: { headers: ["앞의 명사", "주격", "목적격", "소유격"], rows: [
      ["사람", "who", "whom / who", "whose"],
      ["사물", "which", "which", "whose"],
      ["공통", "that", "that", "—"]
    ] },
    examples: [
      { good: "The man who called you is here.", bad: "The man which called you is here.", note: "사람 → who" },
      { good: "the report that I sent", bad: "the report what I sent", note: "what은 앞에 명사를 못 둔다" },
      { good: "the company whose office is downtown", bad: "the company which office is downtown", note: "소유 관계 → whose" }
    ],
    trap: "관계대명사 뒤에 주어가 없으면 주격, 주어가 있으면 목적격이다.\n목적격은 생략할 수 있다. the report (that) I sent",
    toeicPattern: "빈칸 앞 명사가 사람인지 사물인지 먼저 보고, 빈칸 뒤에 주어가 있는지로 주격과 목적격을 가른다."
  },
  {
    id: "g09", order: 9, title: "대명사", weight: "보통",
    oneLine: "자리에 따라 모양이 바뀐다. 주어 자리인지 목적어 자리인지 봐라.",
    table: { headers: ["주격", "목적격", "소유격", "소유대명사", "재귀"], rows: [
      ["I", "me", "my", "mine", "myself"],
      ["he", "him", "his", "his", "himself"],
      ["they", "them", "their", "theirs", "themselves"]
    ] },
    examples: [
      { good: "She gave it to me.", bad: "She gave it to I.", note: "전치사 뒤 → 목적격" },
      { good: "This book is mine.", bad: "This book is my.", note: "뒤에 명사가 없으면 소유대명사" },
      { good: "He did it himself.", bad: "He did it him.", note: "주어와 같은 대상 → 재귀대명사" }
    ],
    trap: "its와 it's를 구분하라.\nits = 그것의 (소유격)\nit's = it is의 줄임\n아포스트로피가 있으면 it is다. 토익이 자주 노린다.",
    toeicPattern: "빈칸이 동사나 전치사 뒤면 목적격, 명사 앞이면 소유격, 뒤에 명사가 없으면 소유대명사다."
  },
  {
    id: "g10", order: 10, title: "비교급 / 최상급", weight: "보통",
    oneLine: "둘을 비교하면 -er than, 셋 이상 중 하나면 the -est다.",
    table: { headers: ["구분", "원급 → 비교급 → 최상급"], rows: [
      ["짧은 단어", "tall → taller → the tallest"],
      ["긴 단어", "expensive → more expensive → the most expensive"],
      ["불규칙", "good → better → the best / bad → worse → the worst"]
    ] },
    examples: [
      { good: "This is cheaper than that.", bad: "This is more cheap than that.", note: "짧은 단어는 -er" },
      { good: "the most efficient method", bad: "the efficientest method", note: "긴 단어는 most" },
      { good: "as soon as possible", bad: "as soon as possibly", note: "as ~ as 사이에는 원급" }
    ],
    trap: "비교급을 강조할 때는 very를 쓰지 않는다.\nmuch better / far better / even better (⭕)\nvery better (❌)",
    toeicPattern: "문장에 than이 보이면 무조건 비교급, the와 함께 of all·in the company가 보이면 최상급이다."
  },
  {
    id: "g11", order: 11, title: "가정법", weight: "낮음",
    oneLine: "실제와 반대되는 상황을 말할 때 시제를 한 칸 뒤로 민다.",
    table: { headers: ["종류", "if절", "주절"], rows: [
      ["단순 조건 (실제 가능)", "If + 현재", "will + 동사원형"],
      ["현재 사실의 반대", "If + 과거", "would + 동사원형"],
      ["과거 사실의 반대", "If + had p.p.", "would have p.p."]
    ] },
    examples: [
      { good: "If it rains tomorrow, we will cancel.", bad: "If it will rain tomorrow, we will cancel.", note: "if절 안에는 will을 쓰지 않는다" },
      { good: "If I had time, I would help you.", bad: "If I have time, I would help you.", note: "현재 사실의 반대 → 과거형" },
      { good: "If I had known, I would have told you.", bad: "If I knew, I would have told you.", note: "과거 사실의 반대 → had p.p." }
    ],
    trap: "if절 안에는 will을 쓰지 않는다. 미래를 말하더라도 현재형을 쓴다.",
    toeicPattern: "토익에서는 단순 조건(If + 현재, will)이 가장 많이 나온다. if절에 will이 들어간 선택지는 거의 오답이다."
  },
  {
    id: "g12", order: 12, title: "어순 · 기타", weight: "보통",
    oneLine: "영어 문장에는 주어와 동사가 반드시 있어야 하고, 꾸밈말은 정해진 자리에 간다.",
    table: { headers: ["항목", "규칙"], rows: [
      ["기본 어순", "주어 + 동사 + 목적어"],
      ["빈도부사", "be동사 뒤 / 일반동사 앞 (always, often, never)"],
      ["간접의문문", "의문사 + 주어 + 동사 (의문문 어순이 아님)"]
    ] },
    examples: [
      { good: "She is always late.", bad: "She always is late.", note: "be동사 뒤" },
      { good: "Do you know where he is?", bad: "Do you know where is he?", note: "문장 안에 들어가면 평서문 어순" },
      { good: "I am ready.", bad: "I ready.", note: "형용사 앞에는 be동사가 필요하다" }
    ],
    trap: "한국어는 주어나 동사를 생략해도 말이 되지만 영어는 안 된다.\n말하기 전에 '내 문장에 동사가 있나'를 확인하는 습관을 들여라.",
    toeicPattern: "간접의문문 어순은 Part 5와 6에 꾸준히 나온다. 의문사 뒤가 '주어 + 동사' 순인 선택지를 고르면 된다."
  }
];

// Items: { id, ruleId, question, choices, answer, explanation, difficulty }.
window.GRAMMAR_QUIZ = [];
