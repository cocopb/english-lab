window.GRAMMAR = [
  {
    id: "g01",
    order: 1,
    title: "품사 자리",
    oneLine: "빈칸 앞뒤를 보면 품사가 정해진다. 품사로 좁힌 뒤, 남으면 그때 뜻을 본다.",
    weight: "최다 빈출",
    table: {
      headers: ["빈칸 위치", "들어갈 품사"],
      rows: [
        ["the ___ / a ___ / 형용사 ___", "명사"],
        ["주어 ___ 목적어", "동사"],
        ["___ + 명사", "형용사"],
        ["일반동사 ___ / 문장 맨 앞 ___", "부사"],
        ["be ___ -ing / be ___ p.p.", "부사"]
      ]
    },
    examples: [
      { good: "The decision was final.", bad: "The decide was final.", note: "the 뒤 → 명사" },
      { good: "She works carefully.", bad: "She works careful.", note: "일반동사 뒤 → 부사" },
      { good: "This is an effective plan.", bad: "This is an effect plan.", note: "명사 앞 → 형용사" }
    ],
    trap: "very, so 같은 수식어에 속지 마라. 꾸밈 받는 대상을 봐야 한다.\nShe is very careful. (be동사 뒤 → 형용사)\nShe works very carefully. (일반동사 뒤 → 부사)\nbe동사 바로 뒤는 형용사 자리지만, be ___ -ing나 be ___ p.p.처럼 뒤에 동사가 이어지면 그 사이는 부사 자리다.\nThe office is currently undergoing renovation.",
    toeicPattern: "선택지가 decide / decision / decisive / decisively 처럼 한 뿌리의 네 품사로 나오면 거의 이 유형이다. 먼저 빈칸 앞뒤로 품사를 정하고, 같은 품사가 둘 이상 남을 때만 뜻으로 가른다."
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
        ["셀 수 없는 명사 (information)", "단수 취급"],
        ["each / every / neither + 명사", "단수 취급"],
        ["the number of ~", "단수 (a number of ~ 는 복수)"],
        ["There is / There are", "뒤에 오는 명사가 주어"]
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
      ["현재", "works", "always, usually, every day"],
      ["과거", "worked", "yesterday, last week, in 2020, ago"],
      ["현재완료", "have worked", "since, recently, already, yet, for(지금까지 이어질 때)"],
      ["미래", "will work", "tomorrow, next week"],
      ["현재진행", "am working", "now, at the moment"],
      ["과거진행", "was working", "when + 과거 문장 (단순과거와도 쓰임)"]
    ] },
    examples: [
      { good: "I worked there last year.", bad: "I have worked there last year.", note: "last year가 있으면 현재완료를 쓸 수 없다" },
      { good: "I have worked here for three years.", bad: "I work here for three years.", note: "for + 기간, 과거부터 지금까지 이어짐" },
      { good: "He will call you tomorrow.", bad: "He called you tomorrow.", note: "tomorrow는 미래" }
    ],
    trap: "since + 시점(~이래로)은 현재완료와 짝을 이룬다. for + 기간은 지금까지 이어지면 현재완료, 과거에 끝났으면 과거형이다.\n(접속사 since '~때문에'는 다른 쓰임이다. g07 참고)",
    toeicPattern: "빈칸이 동사이고 선택지가 같은 동사의 시제 변형이면, 문장에서 시간 표시어를 먼저 찾아라. yesterday·last·ago가 보이면 과거다. since와 for는 조금 더 봐야 한다. 지금까지 이어지면 현재완료, 과거에 끝났으면 과거형이다."
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
      ["뒤에 to부정사가 오는 동사", "want, plan, decide, hope, agree, need, offer, afford"],
      ["뒤에 -ing가 오는 동사", "enjoy, finish, avoid, consider, recommend, suggest, mind, keep"],
      ["둘 다 가능", "like, love, start, begin, continue"]
    ] },
    examples: [
      { good: "I want to go.", bad: "I want going.", note: "want 뒤에는 to부정사" },
      { good: "We recommend taking the earlier train.", bad: "We recommend to take the earlier train.", note: "recommend 뒤에는 to부정사가 바로 못 온다" },
      { good: "She finished writing the report.", bad: "She finished to write the report.", note: "finish 뒤에는 -ing" }
    ],
    trap: "이 표는 '빈칸 바로 뒤'에 무엇이 오는지를 가리는 기준이다. that절처럼 다른 구조를 따로 갖는 동사도 있다.\n그리고 to 뒤에는 보통 동사원형이지만, look forward to / be used to / contribute to의 to는 전치사라서 -ing가 온다.\nI look forward to meeting you. (to meet ❌)\nneed처럼 -ing도 가능한 동사가 있다. The car needs washing.",
    toeicPattern: "빈칸 앞 동사를 먼저 본다. 표에 있는 동사면 대부분 바로 풀린다. 단 look forward to, be used to처럼 to가 전치사인 경우는 뒤에 -ing가 오므로 따로 외워야 한다."
  },
  {
    id: "g06", order: 6, title: "전치사", weight: "빈출",
    oneLine: "in(넓음) → on(면·날짜) → at(점·시각) 순으로 범위가 좁아진다.",
    table: { headers: ["전치사", "시간", "장소"], rows: [
      ["in", "월·연도·계절 (in May)", "넓은 공간·건물 안 (in Seoul, in the room)"],
      ["on", "날짜·요일 (on Monday)", "표면 위 (on the desk, on Main Street)"],
      ["at", "시각 (at 7 p.m.)", "지점·특정 위치 (at the station, at the corner)"]
    ] },
    examples: [
      { good: "The meeting is on Monday.", bad: "The meeting is in Monday.", note: "요일은 on" },
      { good: "Please finish it by Friday.", bad: "Please finish it until Friday.", note: "by는 마감, until은 계속" },
      { good: "I waited for two hours.", bad: "I waited during two hours.", note: "for + 숫자 기간" }
    ],
    trap: "by와 until을 구분하라.\nby 5 = 5시 전까지 끝내라 (마감)\nuntil 5 = 5시까지 계속하라 (지속)\n뜻이 완전히 다르다.",
    toeicPattern: "빈칸 뒤 명사를 보고 고른다. 숫자 기간(two weeks)이면 for, 사건이나 기간을 가리키는 명사(the meeting, the holidays)면 during이다."
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
    trap: "despite of는 존재하지 않는 표현이다. despite 또는 in spite of 둘 중 하나만 쓴다.\n\n접속사 뒤에서 '주어 + be동사'가 생략되면 -ing나 p.p.가 바로 온다.\np.p.가 바로 오면 접속사다. although delayed (although it was delayed), despite delayed ❌\n-ing는 전치사 뒤에도 올 수 있으니 짝을 봐라. while waiting ⭕ / during waiting ❌ / despite being late ⭕",
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
    trap: "순서대로 가른다.\n① 빈칸 뒤에 명사가 바로 오고 소유 관계면 whose\n② 그렇지 않고 뒤에 주어가 없으면 주격 (who / which / that)\n③ 뒤에 주어가 있으면 목적격이고, 이때는 생략할 수 있다\n   the report (that) I sent",
    toeicPattern: "빈칸 뒤부터 본다. 동사가 바로 오면 주격, '주어 + 동사'인데 목적어가 빠져 있으면 목적격, '명사 + 동사'로 문장이 완전하고 그 명사가 앞 명사의 것이면 whose다. 그다음 앞 명사가 사람인지 사물인지로 who와 which를 가른다."
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
    trap: "its와 it's를 구분하라.\nits = 그것의 (소유격)\nit's = it is의 줄임\n아포스트로피가 있으면 it is다. 위 ①~④로 풀리지 않고 '~이다'로 해석되면 it's를 의심하라.\nIt's a good idea. (It is a good idea.)",
    toeicPattern: "순서대로 보면 된다.\n① 빈칸 바로 뒤에 관사(a/the) 없이 명사가 오면 소유격 (my, its, their)\n② 목적어가 주어와 같은 사람이면 재귀대명사 (himself)\n③ 그 밖에 주어 자리면 주격, 동사·전치사의 목적어 자리면 목적격 (be동사 뒤는 목적어가 아니다)\n④ 명사 없이 '~의 것'을 뜻하면 소유대명사 (mine, theirs)"
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
      { good: "as soon as possible", bad: "as soon as possibly", note: "as soon as possible은 통째로 외우는 표현이다. possibly(부사)는 들어가지 않는다." }
    ],
    trap: "비교급을 강조할 때는 very를 쓰지 않는다.\nmuch better / far better / even better (⭕)\nvery better (❌)",
    toeicPattern: "문장에 than이 보이면 대개 비교급, the와 함께 of all·in the company가 보이면 최상급이다. 단 rather than, other than의 than은 비교급과 관계가 없다."
  },
  {
    id: "g11", order: 11, title: "가정법", weight: "낮음",
    oneLine: "if절의 시제가 핵심이다. 실제로 가능한 조건이면 현재형, 실제와 반대면 한 칸 뒤로 민다.",
    table: { headers: ["종류", "if절", "주절"], rows: [
      ["단순 조건 (실제 가능)", "If + 현재", "will + 동사원형 (또는 명령문)"],
      ["현재 사실의 반대", "If + 과거", "would + 동사원형"],
      ["과거 사실의 반대", "If + had p.p.", "would have p.p."]
    ] },
    examples: [
      { good: "If it rains tomorrow, we will cancel.", bad: "If it will rain tomorrow, we will cancel.", note: "조건의 if절 안에는 will을 쓰지 않는다" },
      { good: "If I had time, I would help you.", bad: "If I have time, I would help you.", note: "현재 사실의 반대 → 과거형" },
      { good: "If I had known, I would have told you.", bad: "If I knew, I would have told you.", note: "과거 사실의 반대 → had p.p." }
    ],
    trap: "조건을 뜻하는 if절 안에는 will을 쓰지 않는다. 미래를 말하더라도 현재형을 쓴다.\n단 '~인지'라는 뜻의 if는 조건이 아니라서 will이 올 수 있다.\nLet me know if he will come. (그가 올지 알려주세요)",
    toeicPattern: "토익에서는 단순 조건(If + 현재, will)이 가장 많이 나온다. if절에 will이 들어간 선택지는 거의 오답이다."
  },
  {
    id: "g12", order: 12, title: "어순 · 기타", weight: "보통",
    oneLine: "영어 문장에는 주어와 동사가 반드시 있어야 하고, 꾸밈말은 정해진 자리에 간다.",
    table: { headers: ["항목", "규칙"], rows: [
      ["기본 어순", "주어 + 동사 + 목적어"],
      ["빈도부사", "be동사 뒤 / 일반동사 앞 / 조동사 뒤 (always, often, never)"],
      ["간접의문문", "의문사 + 주어 + 동사 (의문문 어순이 아님)"],
      ["간접의문문 (의문사가 주어)", "의문사 + 동사 — Do you know who called?"]
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
window.GRAMMAR_QUIZ = [
  { id: "q001", ruleId: "g01", question: "The ____ was approved by the board.", choices: ["propose", "proposal", "proposed", "proposing"], answer: 1, explanation: "the 뒤는 명사 자리다. propose(동사) / proposal(명사) / proposed(과거분사) / proposing(현재분사) 중 명사는 proposal.", difficulty: "easy" },
  { id: "q002", ruleId: "g01", question: "All employees must work ____ during the inspection.", choices: ["careful", "carefully", "careless", "care"], answer: 1, explanation: "동사 work를 꾸미는 자리이므로 부사 carefully. careful은 형용사라 명사를 꾸민다.", difficulty: "easy" },
  { id: "q003", ruleId: "g01", question: "The manager gave a ____ explanation of the new policy.", choices: ["clear", "clearly", "clarity", "clearness"], answer: 0, explanation: "명사 explanation 앞이므로 형용사 clear. clearly는 부사, clarity는 명사다.", difficulty: "easy" },
  { id: "q004", ruleId: "g01", question: "The company reported a ____ in sales last quarter.", choices: ["decline", "declining", "declined", "decliner"], answer: 0, explanation: "a 뒤는 명사 자리다. decline은 명사와 동사 모두 가능하며 여기서는 명사로 쓰였다.", difficulty: "medium" },
  { id: "q005", ruleId: "g01", question: "Ms. Park will ____ the training session tomorrow.", choices: ["lead", "leader", "leading", "leadership"], answer: 0, explanation: "조동사 will 뒤는 동사원형 자리다. leader와 leadership은 명사다.", difficulty: "easy" },
  { id: "q006", ruleId: "g01", question: "Please submit the form to the ____ department.", choices: ["account", "accounting", "accountant", "accounted"], answer: 1, explanation: "department를 꾸며 '회계 부서'를 뜻하는 accounting이 맞다. accountant는 사람(회계사)이다.", difficulty: "medium" },
  { id: "q007", ruleId: "g01", question: "The instructions were written very ____.", choices: ["simple", "simply", "simplify", "simplicity"], answer: 1, explanation: "written(동사)을 꾸미는 자리이므로 부사 simply. very에 속지 말고 꾸밈 받는 대상을 봐라.", difficulty: "medium" },
  { id: "q008", ruleId: "g01", question: "Our team achieved ____ results this year.", choices: ["impress", "impressed", "impressive", "impressively"], answer: 2, explanation: "명사 results 앞이므로 형용사 impressive. impressed는 '감명받은'으로 사람에게 쓴다.", difficulty: "medium" },
  { id: "q009", ruleId: "g01", question: "The ____ of the project depends on teamwork.", choices: ["succeed", "success", "successful", "successfully"], answer: 1, explanation: "The ____ of 구조에서 the 뒤는 명사 자리다. success가 명사다.", difficulty: "easy" },
  { id: "q010", ruleId: "g01", question: "He responded ____ to the customer's complaint.", choices: ["prompt", "promptly", "promptness", "prompted"], answer: 1, explanation: "동사 responded를 꾸미므로 부사 promptly. 일반동사 뒤에 오는 수식어는 부사다. 단 be동사나 seem 뒤에는 형용사가 온다.", difficulty: "easy" },
  { id: "q011", ruleId: "g02", question: "The reports on the sales figures ____ ready for review.", choices: ["is", "are", "was", "has"], answer: 1, explanation: "주어는 reports(복수)다. on the sales figures는 꾸밈말이므로 가리고 봐야 한다.", difficulty: "medium" },
  { id: "q012", ruleId: "g02", question: "Each of the applicants ____ required to submit a resume.", choices: ["is", "are", "were", "have"], answer: 0, explanation: "each는 항상 단수 취급한다. of the applicants에 속지 마라.", difficulty: "medium" },
  { id: "q013", ruleId: "g02", question: "The information in these files ____ confidential.", choices: ["is", "are", "were", "have"], answer: 0, explanation: "information은 셀 수 없는 명사로 항상 단수 취급한다.", difficulty: "easy" },
  { id: "q014", ruleId: "g02", question: "The manager of the two departments ____ attending the meeting.", choices: ["is", "are", "were", "have been"], answer: 0, explanation: "주어는 manager(단수)다. of the two departments는 꾸밈말이다.", difficulty: "medium" },
  { id: "q015", ruleId: "g02", question: "All employees ____ to complete the survey by Friday.", choices: ["needs", "need", "needing", "is needed"], answer: 1, explanation: "주어 employees가 복수이므로 동사에 -s를 붙이지 않는다.", difficulty: "easy" },
  { id: "q016", ruleId: "g02", question: "Neither of the proposals ____ approved.", choices: ["was", "were", "have", "are"], answer: 0, explanation: "neither는 단수 취급한다. of the proposals는 꾸밈말이다.", difficulty: "hard" },
  { id: "q017", ruleId: "g02", question: "The number of applicants ____ increased this year.", choices: ["has", "have", "are", "were"], answer: 0, explanation: "the number of는 '~의 수'로 단수다. a number of(많은)는 복수 취급이라 구분해야 한다.", difficulty: "hard" },
  { id: "q018", ruleId: "g02", question: "There ____ several issues with the shipment.", choices: ["is", "are", "was", "has"], answer: 1, explanation: "There 구문은 뒤에 오는 명사가 주어다. several issues는 복수다.", difficulty: "medium" },
  { id: "q019", ruleId: "g02", question: "Our new equipment ____ just arrived.", choices: ["has", "have", "are", "were"], answer: 0, explanation: "equipment는 셀 수 없는 명사로 단수 취급한다. just와 현재완료가 짝을 이룬다.", difficulty: "medium" },
  { id: "q020", ruleId: "g02", question: "Every document ____ to be signed.", choices: ["needs", "need", "needing", "are needed"], answer: 0, explanation: "every + 단수명사는 단수 취급한다.", difficulty: "easy" },
  { id: "q021", ruleId: "g03", question: "The shipment ____ last Monday.", choices: ["arrives", "arrived", "has arrived", "will arrive"], answer: 1, explanation: "last Monday는 끝난 과거 시점이다. 현재완료와는 함께 쓸 수 없다.", difficulty: "easy" },
  { id: "q022", ruleId: "g03", question: "She ____ for this company since 2019.", choices: ["works", "worked", "has worked", "will work"], answer: 2, explanation: "since + 시점은 현재완료와 짝을 이룬다. 2019년부터 지금까지 이어진다는 뜻이다.", difficulty: "medium" },
  { id: "q023", ruleId: "g03", question: "We ____ the new system next month.", choices: ["launching", "launched", "have launched", "will launch"], answer: 3, explanation: "next month는 미래 시점이므로 will + 동사원형.", difficulty: "easy" },
  { id: "q024", ruleId: "g03", question: "I ____ the report when the manager called.", choices: ["was writing", "am writing", "have written", "write"], answer: 0, explanation: "과거의 한 시점에 진행 중이던 일은 과거진행형(was/were -ing)으로 쓴다.", difficulty: "medium" },
  { id: "q025", ruleId: "g03", question: "The team ____ the project two weeks ago.", choices: ["completes", "completed", "has completed", "will complete"], answer: 1, explanation: "ago가 있으면 무조건 과거형이다. 현재완료와 절대 함께 쓰지 않는다.", difficulty: "easy" },
  { id: "q026", ruleId: "g03", question: "Mr. Lee ____ in Seoul for ten years before moving to Busan.", choices: ["lives", "lived", "has lived", "will live"], answer: 1, explanation: "before moving으로 이미 끝난 일임이 드러난다. for가 있어도 과거에 끝났으면 과거형이다.", difficulty: "hard" },
  { id: "q027", ruleId: "g01", question: "The office is ____ undergoing renovation.", choices: ["current", "currently", "currency", "current time"], answer: 1, explanation: "현재진행형과 어울리는 부사 currently가 와야 한다. 동사를 꾸미므로 부사형이다.", difficulty: "medium" },
  { id: "q028", ruleId: "g03", question: "We have not received your payment ____.", choices: ["already", "yet", "ago", "soon"], answer: 1, explanation: "yet은 부정문에서 '아직'이라는 뜻으로 현재완료와 짝을 이룬다.", difficulty: "medium" },
  { id: "q029", ruleId: "g03", question: "The store ____ at nine every morning.", choices: ["open", "opens", "opened", "is opening"], answer: 1, explanation: "every morning은 반복되는 일이므로 현재형을 쓴다. 주어가 3인칭 단수라 -s가 붙는다.", difficulty: "easy" },
  { id: "q030", ruleId: "g03", question: "He ____ the documents yesterday afternoon.", choices: ["sends", "sent", "has sent", "will send"], answer: 1, explanation: "yesterday는 끝난 과거 시점이므로 과거형 sent.", difficulty: "easy" },
  { id: "q031", ruleId: "g04", question: "The package ____ to the wrong address.", choices: ["delivered", "was delivered", "delivering", "deliver"], answer: 1, explanation: "소포는 배달되는 쪽이므로 수동태(be + p.p.)다. 빈칸 뒤에 목적어가 없는 것도 단서다.", difficulty: "easy" },
  { id: "q032", ruleId: "g04", question: "The committee ____ the proposal last week.", choices: ["approved", "was approved", "approving", "approval"], answer: 0, explanation: "빈칸 뒤에 목적어 the proposal이 있으므로 능동태다. 위원회가 승인하는 쪽이다.", difficulty: "easy" },
  { id: "q033", ruleId: "g04", question: "All applications ____ by Friday.", choices: ["must submit", "must be submitted", "submitting", "submits"], answer: 1, explanation: "지원서는 제출되는 쪽이므로 수동. 조동사가 있으면 must be + p.p. 형태가 된다.", difficulty: "medium" },
  { id: "q034", ruleId: "g04", question: "The new policy ____ next month.", choices: ["will announce", "will be announced", "announcing", "announce"], answer: 1, explanation: "정책은 발표되는 쪽이다. 미래 수동은 will be + p.p.", difficulty: "medium" },
  { id: "q035", ruleId: "g04", question: "Our team ____ the results at the conference.", choices: ["presented", "was presented", "presenting", "presentation"], answer: 0, explanation: "빈칸 뒤에 목적어 the results가 있으므로 능동태다.", difficulty: "easy" },
  { id: "q036", ruleId: "g04", question: "The building ____ in 1995.", choices: ["constructed", "was constructed", "constructing", "constructs"], answer: 1, explanation: "건물은 지어지는 쪽이므로 수동태다. 빈칸 뒤에 목적어가 없다.", difficulty: "easy" },
  { id: "q037", ruleId: "g04", question: "Employees ____ to attend the safety training.", choices: ["require", "are required", "requiring", "requirement"], answer: 1, explanation: "직원은 요구받는 쪽이다. be required to + 동사원형 형태로 자주 출제된다.", difficulty: "medium" },
  { id: "q038", ruleId: "g04", question: "The technician ____ the equipment yesterday.", choices: ["repaired", "was repaired", "repairing", "repair"], answer: 0, explanation: "빈칸 뒤에 목적어 the equipment가 있으므로 능동태다.", difficulty: "easy" },
  { id: "q039", ruleId: "g04", question: "The invoice ____ to your email address.", choices: ["has sent", "has been sent", "sending", "send"], answer: 1, explanation: "청구서는 보내지는 쪽이다. 현재완료 수동은 has been + p.p.", difficulty: "hard" },
  { id: "q040", ruleId: "g04", question: "The manager ____ the schedule to accommodate the change.", choices: ["revised", "was revised", "revising", "revision"], answer: 0, explanation: "빈칸 뒤에 목적어 the schedule이 있으므로 능동태다.", difficulty: "medium" },
  { id: "q041", ruleId: "g05", question: "We decided ____ the meeting until next week.", choices: ["postpone", "to postpone", "postponing", "postponed"], answer: 1, explanation: "decide 뒤에는 to부정사가 온다. decide to + 동사원형.", difficulty: "easy" },
  { id: "q042", ruleId: "g05", question: "The manager recommended ____ the deadline.", choices: ["extend", "to extend", "extending", "extended"], answer: 2, explanation: "recommend 뒤에는 to부정사가 바로 올 수 없다. recommend -ing 또는 recommend that + 주어 + 동사원형 형태로 쓴다.", difficulty: "medium" },
  { id: "q043", ruleId: "g05", question: "She finished ____ the report yesterday.", choices: ["write", "to write", "writing", "written"], answer: 2, explanation: "finish 뒤에는 -ing가 온다.", difficulty: "easy" },
  { id: "q044", ruleId: "g05", question: "They agreed ____ the contract next month.", choices: ["renew", "to renew", "renewing", "renewed"], answer: 1, explanation: "agree 뒤에는 to부정사가 온다.", difficulty: "easy" },
  { id: "q045", ruleId: "g05", question: "Please avoid ____ during the presentation.", choices: ["talk", "to talk", "talking", "talked"], answer: 2, explanation: "avoid 뒤에는 -ing가 온다.", difficulty: "medium" },
  { id: "q046", ruleId: "g05", question: "We look forward to ____ from you soon.", choices: ["hear", "to hear", "hearing", "heard"], answer: 2, explanation: "look forward to의 to는 전치사라서 뒤에 -ing가 온다. 토익이 노리는 대표 함정이다.", difficulty: "hard" },
  { id: "q047", ruleId: "g05", question: "He offered ____ us with the project.", choices: ["help", "to help", "helping", "helped"], answer: 1, explanation: "offer 뒤에는 to부정사가 온다.", difficulty: "medium" },
  { id: "q048", ruleId: "g05", question: "The company plans ____ a new branch.", choices: ["open", "to open", "opening", "opened"], answer: 1, explanation: "plan 뒤에는 to부정사가 온다.", difficulty: "easy" },
  { id: "q049", ruleId: "g05", question: "Would you mind ____ the door?", choices: ["close", "to close", "closing", "closed"], answer: 2, explanation: "mind 뒤에는 -ing가 온다. Would you mind -ing? 는 정중한 요청이다.", difficulty: "medium" },
  { id: "q050", ruleId: "g05", question: "I am used to ____ early.", choices: ["get up", "to get up", "getting up", "got up"], answer: 2, explanation: "be used to의 to도 전치사다. 뒤에 -ing가 온다. used to + 동사원형(과거의 습관)과 구분해야 한다.", difficulty: "hard" },
  { id: "q051", ruleId: "g06", question: "The report is due ____ Friday.", choices: ["in", "on", "at", "to"], answer: 1, explanation: "요일 앞에는 on을 쓴다.", difficulty: "easy" },
  { id: "q052", ruleId: "g06", question: "Please submit it ____ 5 p.m.", choices: ["by", "until", "during", "for"], answer: 0, explanation: "by는 마감 시점(그 전에 끝내라), until은 지속(그때까지 계속). 제출 마감이므로 by.", difficulty: "medium" },
  { id: "q053", ruleId: "g06", question: "The conference will be held ____ May.", choices: ["in", "on", "at", "by"], answer: 0, explanation: "월 앞에는 in을 쓴다.", difficulty: "easy" },
  { id: "q054", ruleId: "g06", question: "We waited ____ two hours.", choices: ["for", "during", "since", "by"], answer: 0, explanation: "for + 숫자 기간. during은 사건 명사(during the meeting)와 쓴다.", difficulty: "medium" },
  { id: "q055", ruleId: "g06", question: "The meeting takes place ____ the conference room.", choices: ["in", "on", "at", "to"], answer: 0, explanation: "실내 공간 안이므로 in을 쓴다.", difficulty: "easy" },
  { id: "q056", ruleId: "g06", question: "She has worked here ____ 2020.", choices: ["for", "since", "during", "from"], answer: 1, explanation: "since + 시점(연도), for + 기간. 현재완료와 짝을 이룬다.", difficulty: "medium" },
  { id: "q057", ruleId: "g06", question: "The train leaves ____ nine o'clock.", choices: ["in", "on", "at", "by"], answer: 2, explanation: "시각 앞에는 at을 쓴다.", difficulty: "easy" },
  { id: "q058", ruleId: "g06", question: "The office is closed ____ the holidays.", choices: ["while", "during", "since", "by"], answer: 1, explanation: "during + 사건·기간을 나타내는 명사. the holidays는 숫자 기간이 아니다.", difficulty: "medium" },
  { id: "q059", ruleId: "g06", question: "Our store is located ____ Main Street.", choices: ["in", "on", "at", "to"], answer: 1, explanation: "거리 이름 앞에는 on을 쓴다. 번지까지 붙으면 at 25 Main Street.", difficulty: "medium" },
  { id: "q060", ruleId: "g06", question: "He will return ____ three days.", choices: ["in", "for", "during", "by"], answer: 0, explanation: "in + 기간은 '~후에'라는 뜻이다. for three days(3일 동안)와 뜻이 다르다.", difficulty: "hard" },
  { id: "q061", ruleId: "g07", question: "The event was canceled ____ the bad weather.", choices: ["because", "because of", "although", "while"], answer: 1, explanation: "빈칸 뒤가 명사 덩어리(the bad weather)이므로 전치사 because of.", difficulty: "easy" },
  { id: "q062", ruleId: "g07", question: "____ the price increased, sales remained strong.", choices: ["Despite", "Although", "Because of", "During"], answer: 1, explanation: "빈칸 뒤에 주어+동사(the price increased)가 있으므로 접속사 Although.", difficulty: "medium" },
  { id: "q063", ruleId: "g07", question: "We finished early ____ everyone worked hard.", choices: ["because", "because of", "despite", "during"], answer: 0, explanation: "빈칸 뒤에 주어+동사가 있으므로 접속사 because.", difficulty: "easy" },
  { id: "q064", ruleId: "g07", question: "____ his experience, he was not selected.", choices: ["Although", "Despite", "Because", "While"], answer: 1, explanation: "빈칸 뒤가 명사(his experience)이므로 전치사 Despite.", difficulty: "medium" },
  { id: "q065", ruleId: "g07", question: "Please remain seated ____ the flight.", choices: ["while", "during", "although", "because"], answer: 1, explanation: "빈칸 뒤가 명사(the flight)이므로 전치사 during. while은 뒤에 문장이 온다.", difficulty: "medium" },
  { id: "q066", ruleId: "g07", question: "He checked his email ____ he was waiting.", choices: ["during", "while", "despite", "because of"], answer: 1, explanation: "빈칸 뒤에 주어+동사가 있으므로 접속사 while.", difficulty: "medium" },
  { id: "q067", ruleId: "g07", question: "The road was closed ____ construction.", choices: ["because", "due to", "although", "while"], answer: 1, explanation: "빈칸 뒤가 명사(construction)이므로 전치사 due to.", difficulty: "easy" },
  { id: "q068", ruleId: "g07", question: "____ the report was late, it was well written.", choices: ["Despite", "In spite of", "Even though", "Due to"], answer: 2, explanation: "빈칸 뒤에 주어+동사가 있으므로 접속사 Even though. Despite와 In spite of는 전치사다.", difficulty: "hard" },
  { id: "q069", ruleId: "g07", question: "Sales improved ____ the new campaign.", choices: ["thanks to", "although", "while", "because"], answer: 0, explanation: "빈칸 뒤가 명사이므로 전치사 thanks to(~덕분에).", difficulty: "medium" },
  { id: "q070", ruleId: "g07", question: "____ the heavy rain, the event continued.", choices: ["Although", "In spite of", "Because", "While"], answer: 1, explanation: "빈칸 뒤가 명사(the heavy rain)이므로 전치사 In spite of.", difficulty: "medium" },
  { id: "q071", ruleId: "g08", question: "The employee ____ submitted the report is on leave.", choices: ["who", "which", "whose", "what"], answer: 0, explanation: "앞 명사가 사람(employee)이고 뒤에 주어가 없으므로 주격 who.", difficulty: "easy" },
  { id: "q072", ruleId: "g08", question: "This is the file ____ I mentioned yesterday.", choices: ["who", "that", "what", "whose"], answer: 1, explanation: "앞 명사가 사물이고 뒤에 주어(I)가 있으므로 목적격 that. what은 앞에 명사를 둘 수 없다.", difficulty: "medium" },
  { id: "q073", ruleId: "g08", question: "The company ____ office is downtown is hiring.", choices: ["which", "that", "whose", "who"], answer: 2, explanation: "뒤에 명사(office)가 바로 오고 소유 관계이므로 whose.", difficulty: "hard" },
  { id: "q074", ruleId: "g08", question: "The candidates ____ we interviewed were impressive.", choices: ["which", "whom", "whose", "what"], answer: 1, explanation: "앞 명사가 사람이고 뒤에 주어(we)가 있으므로 목적격 whom.", difficulty: "hard" },
  { id: "q075", ruleId: "g08", question: "The equipment ____ was delivered is defective.", choices: ["who", "which", "whose", "what"], answer: 1, explanation: "앞 명사가 사물이고 뒤에 주어가 없으므로 주격 which.", difficulty: "easy" },
  { id: "q076", ruleId: "g08", question: "I don't know the person ____ called.", choices: ["who", "which", "whose", "whom"], answer: 0, explanation: "앞 명사가 사람이고 뒤에 주어가 없으므로 주격 who.", difficulty: "easy" },
  { id: "q077", ruleId: "g08", question: "The report ____ you requested is attached.", choices: ["what", "that", "who", "whose"], answer: 1, explanation: "앞 명사가 사물이고 뒤에 주어(you)가 있으므로 목적격 that.", difficulty: "medium" },
  { id: "q078", ruleId: "g08", question: "She is the manager ____ approved the budget.", choices: ["which", "who", "whose", "what"], answer: 1, explanation: "앞 명사가 사람이고 뒤에 주어가 없으므로 주격 who.", difficulty: "easy" },
  { id: "q079", ruleId: "g08", question: "The building ____ we visited is being renovated.", choices: ["who", "which", "whose", "what"], answer: 1, explanation: "앞 명사가 사물이고 뒤에 주어(we)가 있으므로 목적격 which.", difficulty: "medium" },
  { id: "q080", ruleId: "g08", question: "The project ____ deadline was extended is now on track.", choices: ["who", "which", "whose", "what"], answer: 2, explanation: "뒤에 명사(deadline)가 바로 오고 소유 관계이므로 whose. 사물에도 whose를 쓴다.", difficulty: "hard" },
  { id: "q081", ruleId: "g09", question: "Please send the documents to ____.", choices: ["I", "me", "my", "mine"], answer: 1, explanation: "전치사 to 뒤에는 목적격이 온다.", difficulty: "easy" },
  { id: "q082", ruleId: "g09", question: "____ office is on the third floor.", choices: ["We", "Us", "Our", "Ours"], answer: 2, explanation: "명사 office 앞이므로 소유격 Our.", difficulty: "easy" },
  { id: "q083", ruleId: "g09", question: "The decision was ____.", choices: ["they", "them", "their", "theirs"], answer: 3, explanation: "뒤에 명사가 없으므로 소유대명사 theirs(그들의 것).", difficulty: "medium" },
  { id: "q084", ruleId: "g09", question: "He completed the project by ____.", choices: ["he", "him", "his", "himself"], answer: 3, explanation: "by oneself(혼자 힘으로)는 재귀대명사를 쓴다. 주어와 같은 대상이다.", difficulty: "medium" },
  { id: "q085", ruleId: "g09", question: "The company announced ____ new policy.", choices: ["it", "its", "it's", "theirs"], answer: 1, explanation: "명사 앞이므로 소유격 its. it's는 it is의 줄임이라 들어갈 수 없다.", difficulty: "hard" },
  { id: "q086", ruleId: "g09", question: "Ms. Lee and ____ attended the meeting.", choices: ["I", "me", "my", "mine"], answer: 0, explanation: "주어 자리이므로 주격 I. and로 연결돼도 자리는 그대로다.", difficulty: "medium" },
  { id: "q087", ruleId: "g09", question: "The manager gave ____ a raise.", choices: ["she", "her", "hers", "herself"], answer: 1, explanation: "동사 gave의 목적어 자리이므로 목적격 her.", difficulty: "easy" },
  { id: "q088", ruleId: "g09", question: "This desk is ____, not yours.", choices: ["my", "mine", "me", "myself"], answer: 1, explanation: "뒤에 명사가 없으므로 소유대명사 mine.", difficulty: "medium" },
  { id: "q089", ruleId: "g09", question: "The team finished ____ report early.", choices: ["it", "it's", "their", "theirs"], answer: 2, explanation: "명사 report 앞이므로 소유격. team을 구성원 전체로 보면 their를 쓴다.", difficulty: "medium" },
  { id: "q090", ruleId: "g09", question: "____ a good idea to confirm first.", choices: ["Its", "It's", "Their", "Theirs"], answer: 1, explanation: "It is의 줄임인 It's가 필요하다. 아포스트로피가 있으면 it is다.", difficulty: "hard" },
  { id: "q091", ruleId: "g10", question: "This model is ____ than the previous one.", choices: ["cheap", "cheaper", "cheapest", "more cheap"], answer: 1, explanation: "than이 있으면 비교급이다. 짧은 단어는 -er을 붙인다.", difficulty: "easy" },
  { id: "q092", ruleId: "g10", question: "She is the ____ experienced member of the team.", choices: ["more", "most", "much", "very"], answer: 1, explanation: "the와 of the team이 있으므로 최상급. 긴 단어는 most를 쓴다.", difficulty: "medium" },
  { id: "q093", ruleId: "g10", question: "The new system is much ____ than the old one.", choices: ["fast", "faster", "fastest", "more fast"], answer: 1, explanation: "than이 있으므로 비교급 faster. much는 비교급을 강조한다.", difficulty: "medium" },
  { id: "q094", ruleId: "g10", question: "Please reply as soon as ____.", choices: ["possible", "possibly", "possibility", "more possible"], answer: 0, explanation: "as soon as possible은 통째로 외우는 표현이다.", difficulty: "easy" },
  { id: "q095", ruleId: "g10", question: "This is the ____ report I have ever read.", choices: ["good", "better", "best", "well"], answer: 2, explanation: "I have ever와 the가 함께 오면 최상급이다. good의 최상급은 best.", difficulty: "medium" },
  { id: "q096", ruleId: "g10", question: "Sales were ____ this quarter than last quarter.", choices: ["high", "higher", "highest", "more high"], answer: 1, explanation: "than이 있으므로 비교급 higher.", difficulty: "easy" },
  { id: "q097", ruleId: "g10", question: "The second option is ____ expensive than the first.", choices: ["less", "least", "little", "few"], answer: 0, explanation: "than이 있으므로 비교급. '덜 ~한'은 less를 쓴다.", difficulty: "medium" },
  { id: "q098", ruleId: "g10", question: "Of all the candidates, she is the ____ qualified.", choices: ["more", "most", "much", "very"], answer: 1, explanation: "Of all과 the가 있으므로 최상급 most.", difficulty: "medium" },
  { id: "q099", ruleId: "g10", question: "The results were ____ than we expected.", choices: ["bad", "worse", "worst", "more bad"], answer: 1, explanation: "bad의 비교급은 불규칙 변화로 worse다.", difficulty: "medium" },
  { id: "q100", ruleId: "g10", question: "He works ____ harder than his colleagues.", choices: ["very", "much", "so", "too"], answer: 1, explanation: "비교급 강조는 much, far, even을 쓴다. very는 비교급을 강조하지 못한다.", difficulty: "hard" },
  { id: "q101", ruleId: "g11", question: "If it ____ tomorrow, we will cancel the picnic.", choices: ["rain", "rains", "rained", "will rain"], answer: 1, explanation: "if절 안에는 will을 쓰지 않는다. 미래를 말해도 현재형을 쓴다.", difficulty: "medium" },
  { id: "q102", ruleId: "g11", question: "If I ____ more time, I would help you.", choices: ["have", "had", "will have", "have had"], answer: 1, explanation: "주절이 would + 동사원형이므로 현재 사실의 반대. if절은 과거형을 쓴다.", difficulty: "medium" },
  { id: "q103", ruleId: "g11", question: "If she had known, she ____ earlier.", choices: ["comes", "came", "would come", "would have come"], answer: 3, explanation: "if절이 had p.p.이므로 과거 사실의 반대. 주절은 would have p.p.", difficulty: "hard" },
  { id: "q104", ruleId: "g11", question: "If you ____ the form, we will process it today.", choices: ["submit", "submitted", "will submit", "had submitted"], answer: 0, explanation: "주절이 will이므로 단순 조건이다. if절은 현재형.", difficulty: "easy" },
  { id: "q105", ruleId: "g11", question: "If I were you, I ____ the offer.", choices: ["accept", "accepted", "would accept", "will accept"], answer: 2, explanation: "If I were you는 현재 사실의 반대다. 주절은 would + 동사원형.", difficulty: "medium" },
  { id: "q106", ruleId: "g11", question: "We would have finished on time if the shipment ____ late.", choices: ["is not", "was not", "had not been", "would not be"], answer: 2, explanation: "주절이 would have p.p.이므로 과거 사실의 반대. if절은 had p.p.", difficulty: "hard" },
  { id: "q107", ruleId: "g11", question: "If the weather ____ better, we would go hiking.", choices: ["is", "is not", "were", "will be"], answer: 2, explanation: "가정법 과거에서는 주어와 상관없이 were를 쓰는 것이 원칙이다.", difficulty: "hard" },
  { id: "q108", ruleId: "g11", question: "If you need help, ____ me know.", choices: ["let", "to let", "letting", "will let"], answer: 0, explanation: "주절이 명령문이다. 명령문은 동사원형으로 시작한다.", difficulty: "easy" },
  { id: "q109", ruleId: "g11", question: "If he had studied harder, he ____ the exam.", choices: ["passes", "passed", "would pass", "would have passed"], answer: 3, explanation: "if절이 had p.p.이므로 주절은 would have p.p.", difficulty: "medium" },
  { id: "q110", ruleId: "g11", question: "If the price ____, we will buy more.", choices: ["drop", "drops", "dropped", "will drop"], answer: 1, explanation: "단순 조건이므로 if절은 현재형. 주어가 3인칭 단수라 -s가 붙는다.", difficulty: "medium" },
  { id: "q111", ruleId: "g12", question: "She ____ late for meetings.", choices: ["is never", "never is", "is not never", "never be"], answer: 0, explanation: "빈도부사 never는 be동사 뒤에 온다.", difficulty: "easy" },
  { id: "q112", ruleId: "g12", question: "Do you know where ____?", choices: ["is the office", "the office is", "does the office", "the office does"], answer: 1, explanation: "문장 안에 들어간 의문문은 의문사 + 주어 + 동사 순서다.", difficulty: "medium" },
  { id: "q113", ruleId: "g12", question: "Could you tell me when ____?", choices: ["does the train leave", "the train leaves", "the train does leave", "leaves the train"], answer: 1, explanation: "간접의문문이므로 평서문 어순을 쓴다.", difficulty: "medium" },
  { id: "q114", ruleId: "g12", question: "He ____ checks his email in the morning.", choices: ["always", "is always", "always is", "does always"], answer: 0, explanation: "빈도부사 always는 일반동사 앞에 온다.", difficulty: "easy" },
  { id: "q115", ruleId: "g12", question: "I wonder why ____ the meeting.", choices: ["did she cancel", "she canceled", "she did cancel", "canceled she"], answer: 1, explanation: "간접의문문이므로 주어 + 동사 순서다.", difficulty: "medium" },
  { id: "q116", ruleId: "g12", question: "The manager ____ busy this week.", choices: ["is very", "very is", "being very", "very being"], answer: 0, explanation: "형용사 앞에는 be동사가 필요하고, very는 형용사 바로 앞에 온다.", difficulty: "easy" },
  { id: "q117", ruleId: "g12", question: "____ you please confirm the date?", choices: ["Could", "Must", "Should", "Shall"], answer: 0, explanation: "정중한 요청은 Could you ~? 로 시작한다.", difficulty: "easy" },
  { id: "q118", ruleId: "g12", question: "She ____ to the conference every year.", choices: ["goes often", "often goes", "going often", "often going"], answer: 1, explanation: "빈도부사 often은 일반동사 앞에 온다.", difficulty: "medium" },
  { id: "q119", ruleId: "g12", question: "Please let me know ____ the report is ready.", choices: ["does when", "when", "when does", "that when"], answer: 1, explanation: "뒤에 주어+동사가 이어지므로 접속사 when 하나면 된다.", difficulty: "medium" },
  { id: "q120", ruleId: "g02", question: "____ there any questions about the agenda?", choices: ["Is", "Are", "Do", "Does"], answer: 1, explanation: "There 구문은 뒤의 명사가 주어다. questions가 복수이므로 Are.", difficulty: "medium" }
];
