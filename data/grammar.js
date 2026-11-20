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
        ["the ___ / a ___ / 형용사 ___ (빈칸 뒤에 명사가 없을 때)", "명사"],
        ["(the·a) ___ + 명사", "형용사 (명사가 명사를 꾸미는 복합명사도 있다: sales figures, accounting department)"],
        ["주어 ___ 목적어 (문장에 다른 동사가 없을 때)", "동사"],
        ["조동사(will·can·must) ___", "동사원형 (g13)"],
        ["일반동사 (+ 목적어) ___ / 수동태 be p.p. ___ / 문장 맨 앞 ___ + 콤마", "부사"],
        ["be ___ -ing / be ___ p.p.", "부사"]
      ]
    },
    examples: [
      { good: "The decision was final.", bad: "The decide was final.", note: "the 뒤 → 명사" },
      { good: "The train runs smoothly.", bad: "The train runs smooth.", note: "일반동사 뒤 → 부사" },
      { good: "This is an effective plan.", bad: "This is an effect plan.", note: "명사 앞 → 형용사" }
    ],
    trap: "very, so 같은 수식어에 속지 마라. 꾸밈 받는 대상을 봐야 한다.\nHe was very polite. (be동사 뒤 → 형용사)\nHe answered very politely. (일반동사 뒤 → 부사)\nbe동사 바로 뒤는 보통 형용사 자리다. 명사·대명사가 올 수도 있다 (He is a manager.). be ___ -ing나 be ___ p.p.처럼 뒤에 동사가 이어지면 그 사이는 부사 자리다.\nThe bridge is slowly being rebuilt.\n빈칸 바로 뒤에 명사가 오면 앞에 the·a가 있어도 보통 형용사 자리다 (명사가 명사를 꾸미는 복합명사는 표 참고). the ___ 뒤가 동사나 전치사이면 명사 자리다. 단 the highest in the country처럼 최상급이 오는 자리는 g10이다.\na quick reply (빈칸 뒤가 명사 reply → 형용사 quick) / The reply was quick. (the 뒤가 동사 was → 명사 reply)\n'주어 ___ 목적어'라도 문장에 이미 동사가 있으면 빈칸은 동사가 아니라 꾸밈말(분사) 자리다. g15 참고.\n명사 앞 동명사는 복합명사다. accounting department(회계 부서), marketing team(마케팅 팀), training session(교육 시간)처럼 -ing가 뒤 명사의 용도를 말하면 명사 자리로 보고 뜻으로 고른다.\ng15 분사와의 차이: 분사는 꾸밈 받는 명사가 직접 그 동작을 한다(the rising cost = 비용이 오른다). 복합명사는 명사가 그 동작을 하지 않는다(부서가 회계를 하는 것이 아니라 회계 일을 하는 부서).",
    toeicPattern: "선택지가 decide / decision / decisive / decisively 처럼 한 뿌리의 네 품사로 나오면 거의 이 유형이다. 먼저 빈칸 앞뒤로 품사를 정하고, 같은 품사가 둘 이상 남을 때만 뜻으로 가른다.\n형용사 자리에 -ing와 p.p.(impressive·impressed, exciting·excited)가 함께 남으면 g15(분사·감정 동사) 기준으로 가른다. 원급·비교급·최상급이 섞여 있으면 g10이다."
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
        ["A and B (the manager and her assistant)", "복수 취급 (either A or B 같은 짝은 g14)"],
        ["There is / There are", "뒤에 오는 명사가 주어"]
      ]
    },
    examples: [
      { good: "The printer is broken.", bad: "The printer are broken.", note: "printer는 단수" },
      { good: "The keys to the storage room are on my desk.", bad: "The keys to the storage room is on my desk.", note: "주어는 keys, to the storage room은 전치사구" },
      { good: "This advice is helpful.", bad: "These advices are helpful.", note: "advice는 셀 수 없음" }
    ],
    trap: "주어와 동사 사이에 낀 전치사구에 속지 마라.\nThe color of the chairs ___ .\n→ 주어는 color(단수)지 chairs가 아니다.\neach·every·neither·a number of·the number of처럼 주어 앞에 수량 표현이 붙어 수가 정해지는 경우는 g16(수량 표현)에서 다룬다.",
    toeicPattern: "주어와 빈칸 사이에 of, in, with로 시작하는 덩어리가 길게 끼어 있으면 이 유형이다. 그 덩어리를 손으로 가리고 진짜 주어를 찾아라.\n단 a number of(많은) + 복수 명사는 of 덩어리를 가리면 안 된다. a number of는 '많은'이라는 꾸밈말이고 뒤의 복수 명사가 주어라서 복수 동사를 쓴다 (g16)."
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
      { good: "I visited Paris last year.", bad: "I have visited Paris last year.", note: "last year가 있으면 현재완료를 쓸 수 없다" },
      { good: "I have taught here for three years.", bad: "I teach here for three years.", note: "for + 기간, 과거부터 지금까지 이어짐" },
      { good: "He will call you tomorrow.", bad: "He called you tomorrow.", note: "tomorrow는 미래" }
    ],
    trap: "since + 시점(~이래로)은 현재완료와 짝을 이룬다. for + 기간은 지금까지 이어지면 현재완료, 과거에 끝났으면 과거형이다.\n(접속사 since '~때문에'는 다른 쓰임이다. g07 참고)\nif·when·before·after·until·as soon as로 시작하는 조건·시간 부사절 안에서는 tomorrow가 있어도 will 없이 현재형을 쓴다. will은 주절에 쓴다. 단 '~인지'라는 뜻의 if·when 절에는 will이 올 수 있다 (g11).\nWhen the manager arrives tomorrow, we will start. (will arrive ❌, g11 참고)\nsince + 시점과 for + 기간(지금까지 이어질 때)은 현재완료와 함께 쓴다. The shop has been open since March. / We have used this printer for six months.",
    toeicPattern: "빈칸이 동사이고 선택지가 같은 동사의 시제 변형이면, 문장에서 시간 표시어를 먼저 찾아라. yesterday·last·ago가 보이면 과거다. 조동사 뒤라면 과거를 have p.p.로 나타낸다 (should have been sent, g13). since와 for는 조금 더 봐야 한다. 지금까지 이어지면 현재완료, 과거에 끝났으면 과거형이다."
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
      { good: "The windows were cleaned this morning.", bad: "The windows cleaned this morning.", note: "창문은 닦이는 쪽" },
      { good: "They painted the lobby.", bad: "They were painted the lobby.", note: "사람은 칠하는 쪽" },
      { good: "The plants will be watered tonight.", bad: "The plants will water tonight.", note: "식물은 물을 받는 쪽" }
    ],
    trap: "가장 빠른 판별법은 빈칸 뒤를 보는 것이다.\n빈칸 뒤에 목적어(명사)가 있으면 능동, 없으면 수동일 확률이 높다.\n단 arrive·happen·occur·rise·open(가게가 열다)·take place처럼 목적어를 받지 않는 동사는 수동이 없다. 목적어가 없어도 능동이다.\nThe accident happened at noon. (was happened ❌)",
    toeicPattern: "선택지에 announce / announced / was announced / announcing이 섞여 있으면 이 유형이다. 해석보다 빈칸 뒤에 명사가 있는지부터 확인하라."
  },
  {
    id: "g05", order: 5, title: "to부정사 vs 동명사", weight: "빈출",
    oneLine: "동사 뒤에 어떤 형태가 오는지는 앞의 동사가 정한다. 전치사 뒤에 동사가 오면 -ing다 (during은 예외, g07).",
    table: { headers: ["뒤에 오는 형태", "해당 동사"], rows: [
      ["뒤에 to부정사가 오는 동사", "want, plan, decide, hope, agree, need, offer, afford, refuse, promise, expect, fail"],
      ["뒤에 -ing가 오는 동사", "enjoy, finish, avoid, consider, recommend, suggest, mind, keep, postpone, quit"],
      ["둘 다 가능 · 뜻이 같다", "like, love, prefer, start, begin, continue"],
      ["둘 다 가능 · 뜻이 다르다", "remember, forget, regret (to는 앞으로 할 일, -ing는 이미 한 일) / stop (to는 ~하려고 멈추다, -ing는 ~하던 것을 그만두다)"]
    ] },
    examples: [
      { good: "I want to rest.", bad: "I want resting.", note: "want 뒤에는 to부정사" },
      { good: "We recommend wearing comfortable shoes.", bad: "We recommend to wear comfortable shoes.", note: "recommend 뒤에는 to부정사가 바로 못 온다" },
      { good: "He finished cleaning the kitchen.", bad: "He finished to clean the kitchen.", note: "finish 뒤에는 -ing" },
      { good: "He is in charge of ordering supplies.", bad: "He is in charge of order supplies.", note: "전치사 of 뒤에 동사가 오면 -ing" },
      { good: "Please remember to lock the door tonight.", bad: "Please remember locking the door tonight.", note: "앞으로 할 일은 remember to. remember -ing는 이미 한 일이다 (I remember locking it last night.)" },
      { good: "We stopped printing the catalog, so it is now online only.", bad: "We stopped to print the catalog, so it is now online only.", note: "stop -ing는 '~하던 것을 그만두다', stop to는 '~하려고 멈추다'" },
      { good: "Painting the fence took all weekend.", bad: "Paint the fence took all weekend.", note: "주어 자리에는 동사원형을 쓸 수 없다" }
    ],
    trap: "이 표는 '빈칸 바로 뒤'에 무엇이 오는지를 가리는 기준이다. that절처럼 다른 구조를 따로 갖는 동사도 있다.\n전치사 뒤에 동사가 오면 -ing다. 단 during은 -ing를 받지 않는다. 동작을 말할 때는 while -ing로 쓴다 (during waiting ❌ / while waiting ⭕, g07).\n특히 to가 전치사인 표현에 주의한다. 이때 to 뒤에 동사원형을 쓰면 틀린다.\nlook forward to / be used to / be committed to / be opposed to / in addition to / contribute to\nEveryone contributed to planning the party. (to plan ❌)\nbe used to -ing(~에 익숙하다)와 used to + 동사원형(과거에 ~했다)은 다른 표현이다.\n단 let·make·have + 목적어 뒤에는 동사원형이 온다. The boss made us wait. (to wait ❌)\nneed처럼 -ing도 가능한 동사가 있다. The car needs washing.",
    toeicPattern: "빈칸 앞을 먼저 본다. 전치사면 -ing, 동사면 그 동사가 어느 쪽을 받는지 표에서 찾는다. 선택지는 send / sends / sending / to send처럼 한 동사의 네 형태로 나온다.\nlook forward to, be committed to처럼 to가 전치사인 경우는 뒤에 -ing가 오므로 따로 외워야 한다. Part 6 이메일 맺음말의 단골이다."
  },
  {
    id: "g06", order: 6, title: "전치사", weight: "빈출",
    oneLine: "시각과 장소는 in(넓음) → on(면·날짜) → at(점·시각) 순으로 범위가 좁아진다. 기간과 마감은 for·during·since·by·until을 뜻으로 가른다.",
    table: { headers: ["전치사", "시간", "장소"], rows: [
      ["in", "월·연도·계절 (in May) / 기간 뒤 (in two weeks = 2주 뒤에)", "넓은 공간·건물 안 (in Seoul, in the room)"],
      ["on", "날짜·요일 (on Monday)", "표면 위 (on the desk, on Main Street)"],
      ["at", "시각 (at 7 p.m.)", "지점·특정 위치 (at the station, at the corner)"],
      ["for / during", "for + 숫자 기간 (for two weeks) / during + 사건·기간 명사 (during the holidays)", "—"],
      ["since", "시점부터 지금까지 (since 2015). 현재완료와 함께 쓴다 (g03)", "—"],
      ["by / until", "by = 그때까지 끝낸다 (마감) / until = 그때까지 계속한다", "—"]
    ] },
    examples: [
      { good: "The meeting is on Monday.", bad: "The meeting is in Monday.", note: "요일은 on" },
      { good: "Please return the key by noon.", bad: "Please return the key until noon.", note: "by는 마감, until은 계속" },
      { good: "The train was delayed for forty minutes.", bad: "The train was delayed during forty minutes.", note: "for + 숫자 기간" }
    ],
    trap: "by와 until을 구분하라.\nby 5 = 5시 전까지 끝내라 (마감)\nuntil 5 = 5시까지 계속하라 (지속)\n뜻이 완전히 다르다.\n\n동사가 정해 주는 전치사는 뜻이 아니라 짝으로 외운다.\ndepend on / consist of / contribute to / refer to / result in / comply with / apply for\ndirect A to B = A를 B에게 보내다·안내하다 (Please direct all complaints to our service desk.)\nfrom A through B = A부터 B까지, B 포함 (from Monday through Friday)",
    toeicPattern: "빈칸 뒤 명사를 보고 고른다. 숫자 기간(two weeks)이면 for, 사건이나 기간을 가리키는 명사(the meeting, the holidays)면 during이다.\n단 숫자 기간 앞이라도 '그만큼 지나서'라는 뜻이면 in이다. 미래 문장에 자주 나온다. The results will be ready in two weeks. (2주 뒤에) / for two weeks (2주 동안)\n뒤가 연도·날짜 같은 시점이고 지금까지 이어지면 since다.\n빈칸 앞이 동사(depend, consist, refer, direct A 등)면 시간·장소보다 그 동사가 받는 전치사를 먼저 떠올린다."
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
      { good: "We stayed inside because it was cold.", bad: "We stayed inside because of it was cold.", note: "뒤에 주어+동사 → 접속사" },
      { good: "We stayed inside because of the cold.", bad: "We stayed inside because the cold.", note: "뒤에 명사만 → 전치사" },
      { good: "Although the sofa was cheap, nobody bought it.", bad: "Despite the sofa was cheap, nobody bought it.", note: "despite 뒤에는 문장이 못 온다" }
    ],
    trap: "despite of는 존재하지 않는 표현이다. despite 또는 in spite of 둘 중 하나만 쓴다.\n\n접속사 뒤에서 '주어 + be동사'가 생략되면 -ing나 p.p.가 바로 온다.\np.p.가 바로 오면 접속사다. although delayed (although it was delayed), despite delayed ❌\n-ing는 전치사 뒤에도 올 수 있으니 짝을 봐라. while waiting ⭕ / during waiting ❌ / despite being late ⭕",
    toeicPattern: "빈칸 뒤를 보고 1초 만에 가른다. 주어+동사가 보이면 접속사, 명사만 보이면 전치사. Part 5에서 품사 자리 다음으로 많이 나온다."
  },
  {
    id: "g08", order: 8, title: "관계대명사", weight: "보통",
    oneLine: "빈칸 뒤를 보고 주격·목적격·소유격을 먼저 가른다. 그다음 앞의 명사가 사람이면 who(목적격 whom), 사물이면 which를 쓴다. that은 둘 다 되고, 소유격 whose는 사람·사물 모두에 쓴다.",
    table: { headers: ["앞의 명사", "주격", "목적격", "소유격"], rows: [
      ["사람", "who", "whom / who", "whose"],
      ["사물", "which", "which", "whose"],
      ["공통", "that", "that", "—"]
    ] },
    examples: [
      { good: "The woman who interviewed me was kind.", bad: "The woman which interviewed me was kind.", note: "사람 → who" },
      { good: "the photos that she took", bad: "the photos what she took", note: "what은 앞에 명사를 못 둔다" },
      { good: "the author whose book won the prize", bad: "the author which book won the prize", note: "소유 관계 → whose" }
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
      { good: "She fixed the printer herself.", bad: "She fixed the printer her.", note: "주어와 같은 대상 → 재귀대명사" }
    ],
    trap: "its와 it's를 구분하라.\nits = 그것의 (소유격)\nit's = it is의 줄임\n아포스트로피가 있으면 it is다. 위 ①~④로 풀리지 않고 '~이다'로 해석되면 it's를 의심하라.\nIt's too late to call him. (It is too late to call him.)",
    toeicPattern: "순서대로 보면 된다.\n① 빈칸 뒤에 관사(a/the) 없이 명사가 오면 소유격 (my, its, their). 사이에 형용사가 끼어도 같다 (their new office)\n② 목적어가 주어와 같은 사람이거나, '직접·혼자서'라는 뜻으로 주어를 강조하면 재귀대명사 (himself, by herself)\n③ 그 밖에 주어 자리면 주격, 동사·전치사의 목적어 자리면 목적격 (be동사 뒤는 목적어가 아니다)\n④ 명사 없이 '~의 것'을 뜻하면 소유대명사 (mine, theirs)"
  },
  {
    id: "g10", order: 10, title: "비교급 / 최상급", weight: "빈출",
    oneLine: "둘을 비교하면 -er than, 셋 이상 중 하나면 the -est다. as ~ as 사이에는 원급이 온다.",
    table: { headers: ["구분", "형태 · 예"], rows: [
      ["짧은 단어", "tall → taller → the tallest"],
      ["긴 단어", "expensive → more expensive → the most expensive"],
      ["불규칙", "good → better → the best / bad → worse → the worst"],
      ["원급 비교", "as + 원급 + as: as soon as possible"],
      ["최상급 범위", "the + 최상급 + in/of 범위: the largest in the country"],
      ["비교급 강조", "much / far / even / still / a lot + 비교급: much cheaper (very cheaper ❌)"],
      ["배수", "배수 + as + 원급 + as: twice as large as"],
      ["덜 ~한", "less + 원급 + than: less expensive than (긴 단어·짧은 단어 모두 less를 쓴다)"]
    ] },
    examples: [
      { good: "This bag is lighter than that one.", bad: "This bag is more light than that one.", note: "짧은 단어는 -er" },
      { good: "the most efficient method", bad: "the efficientest method", note: "긴 단어는 most" },
      { good: "Please arrive as early as you can.", bad: "Please arrive as earlier as you can.", note: "as ~ as 사이에는 비교급이 아니라 원급이 온다" },
      { good: "This year's budget is much larger than last year's.", bad: "This year's budget is very larger than last year's.", note: "비교급 강조는 much·far·even·still·a lot" },
      { good: "This warehouse is three times as large as our first one.", bad: "This warehouse is three times as larger as our first one.", note: "배수 + as + 원급 + as" },
      { good: "Our biggest customer is a local hospital.", bad: "Our the biggest customer is a local hospital.", note: "소유격이 있으면 최상급 앞에 the를 쓰지 않는다" }
    ],
    trap: "than이 보이면 비교급, the와 in/of + 범위나 ever가 보이면 최상급이다. 이게 1순위 단서다. 단 rather than, other than의 than은 비교급과 관계가 없다.\n비교급을 강조할 때는 very를 쓰지 않는다.\nmuch better / far better / even better / still better / a lot better (⭕)\nvery better (❌)\n-er과 more를 겹쳐 쓰지 않는다. more cheaper (❌)\n최상급 앞에 소유격이 오면 the를 쓰지 않는다. our best seller (⭕) / our the best seller (❌)\nas ~ as 사이에는 비교급이 아니라 원급이 온다. as cheaper as (❌)",
    toeicPattern: "선택지가 cheap / cheaper / cheapest / cheaply처럼 한 단어의 네 형태로 나온다. than이 있으면 cheaper, the와 in/of가 있으면 cheapest, 동사를 꾸미는 자리면 cheaply다.\n비교급 강조 자리에는 very를 넣은 오답이 거의 항상 하나 들어 있다."
  },
  {
    id: "g11", order: 11, title: "가정법", weight: "낮음",
    oneLine: "if절의 시제가 핵심이다. 실제로 가능한 조건이면 현재형, 실제와 반대면 한 칸 뒤로 민다.",
    table: { headers: ["종류", "if절", "주절"], rows: [
      ["단순 조건 (실제 가능)", "If + 현재", "will + 동사원형 (또는 명령문)"],
      ["현재 사실의 반대", "If + 과거 (be동사는 주어와 상관없이 were)", "would + 동사원형"],
      ["과거 사실의 반대", "If + had p.p.", "would have p.p."]
    ] },
    examples: [
      { good: "If the bus is late, we will call a taxi.", bad: "If the bus will be late, we will call a taxi.", note: "조건의 if절 안에는 will을 쓰지 않는다" },
      { good: "If we had a bigger budget, we would hire more staff.", bad: "If we have a bigger budget, we would hire more staff.", note: "현재 사실의 반대 → 과거형" },
      { good: "If I had known, I would have told you.", bad: "If I knew, I would have told you.", note: "과거 사실의 반대 → had p.p." }
    ],
    trap: "조건을 뜻하는 if절 안에는 will을 쓰지 않는다. 미래를 말하더라도 현재형을 쓴다.\n단 '~인지'라는 뜻의 if는 조건이 아니라서 will이 올 수 있다.\nI'm not sure if Mina will join us. (미나가 올지 모르겠다)",
    toeicPattern: "토익에서는 단순 조건(If + 현재, will)이 가장 많이 나온다. if절에 will이 들어간 선택지는 거의 오답이다."
  },
  {
    id: "g12", order: 12, title: "어순 · 기타", weight: "보통",
    oneLine: "영어 문장에는 주어와 동사가 있어야 하고(명령문만 주어 you를 생략한다), 꾸밈말은 정해진 자리에 간다.",
    table: { headers: ["항목", "규칙"], rows: [
      ["기본 어순", "주어 + 동사 + 목적어"],
      ["빈도부사", "be동사 뒤 / 일반동사 앞 / 조동사 뒤 (always, often, never)"],
      ["간접의문문", "의문사 + 주어 + 동사 (의문문 어순이 아님)"],
      ["간접의문문 (의문사가 주어)", "의문사 + 동사 — Do you know who wrote this?"]
    ] },
    examples: [
      { good: "She is usually busy on Mondays.", bad: "She usually is busy on Mondays.", note: "be동사 뒤" },
      { good: "We asked how long the repair would last.", bad: "We asked how long would the repair last.", note: "문장 안에 들어가면 평서문 어순" },
      { good: "I am ready.", bad: "I ready.", note: "형용사 앞에는 be동사가 필요하다" }
    ],
    trap: "한국어는 주어나 동사를 생략해도 말이 되지만 영어는 안 된다.\n말하기 전에 '내 문장에 동사가 있나'를 확인하는 습관을 들여라.\n주어를 빼는 것은 명령문뿐이다. 명령문은 동사원형으로 시작한다 (Please call me back.).\nand로 동사 둘을 이을 때 뒤에 주어를 다시 쓰지 않는 것(She will check the room and call you.)은 빼는 것이 아니라 앞의 주어를 함께 쓰는 것이다 (g13 병렬).",
    toeicPattern: "간접의문문 어순은 Part 5와 6에 꾸준히 나온다. 의문사 뒤가 '주어 + 동사' 순인 선택지를 고르면 된다."
  },
  {
    id: "g13", order: 13, title: "조동사 + 동사원형", weight: "빈출",
    oneLine: "조동사 뒤에는 어떤 경우에도 동사원형이 온다. 주어가 3인칭 단수여도 -s를 붙이지 않는다.",
    table: { headers: ["조동사", "뜻", "예"], rows: [
      ["can", "~할 수 있다 / ~해도 된다", "You can park behind the building."],
      ["will", "~할 것이다", "The package will arrive tomorrow."],
      ["should", "~해야 한다 (권고)", "You should check the weather first."],
      ["must", "~해야 한다 (의무) / ~임이 틀림없다", "Drivers must wear seat belts."],
      ["may / might", "~해도 된다 / ~일 수도 있다", "Prices may change without notice."],
      ["would", "~하겠다 (정중), ~할 것이다", "Would you open the window?"],
      ["could", "~해 주시겠어요, ~할 수 있었다", "Could you call me back later?"]
    ] },
    examples: [
      { good: "The technician will inspect the machine tomorrow.", bad: "The technician will inspects the machine tomorrow.", note: "will 뒤 → 동사원형 (inspects ❌ / inspecting ❌)" },
      { good: "All employees must be present at the briefing.", bad: "All employees must are present at the briefing.", note: "be동사도 원형 be를 쓴다" },
      { good: "The invoice should have been paid yesterday.", bad: "The invoice should be paid yesterday.", note: "조동사 + have p.p. = 과거에 했어야 했는데 안 했다" },
      { good: "The hotel will clean the room and change the towels.", bad: "The hotel will clean the room and changes the towels.", note: "and 뒤도 will을 함께 쓰는 병렬이라 원형 change" }
    ],
    trap: "조동사 두 개를 연달아 쓸 수 없다.\nwill can ❌ → will be able to ⭕ / will must ❌ → will have to ⭕\nhave to는 조동사가 아니라 일반동사라 주어에 따라 변한다 (He has to go). 그래서 조동사 뒤에도 올 수 있고, must 대신 has to를 쓸 수도 있다.\n수동태도 원형이 먼저 온다. will be delivered ⭕ / will is delivered ❌\n여기서 말하는 조동사는 will·can·should·must 같은 말이다. 완료의 have, 진행·수동의 be 뒤에는 원형이 아니라 p.p.나 -ing가 온다. (has been sent, is undergoing)",
    toeicPattern: "Part 5: 빈칸 앞에 will·should·must·may가 보이면 선택지에서 원형을 고른다. 선택지가 inspect / inspects / inspecting / to inspect처럼 한 동사의 네 형태로 나온다.\nPart 6: will A and ____ B 형태의 병렬. 앞의 조동사를 찾아 원형으로 맞춘다."
  },
  {
    id: "g14", order: 14, title: "등위 · 상관 접속사", weight: "빈출",
    oneLine: "and·but·or·nor는 문법이 아니라 뜻으로 고른다. 짝으로 쓰는 상관 접속사는 짝을 외워야 한다.",
    table: { headers: ["접속사", "뜻", "신호 / 짝 규칙"], rows: [
      ["and", "그리고", "앞뒤가 같은 방향"],
      ["but", "그러나", "앞뒤가 뒤집힌다"],
      ["or", "또는, 그러지 않으면", "선택 또는 경고"],
      ["nor", "~도 아니다", "앞이 부정문일 때"],
      ["so", "그래서", "앞이 원인"],
      ["both A and B", "A와 B 둘 다", "짝 — 동사는 복수"],
      ["either A or B", "A나 B 둘 중 하나", "짝 — 동사는 B에 맞춘다"],
      ["neither A nor B", "A도 B도 아니다", "짝 — 동사는 B에 맞춘다"],
      ["not only A but also B", "A뿐 아니라 B도", "짝 — 동사는 B에 맞춘다"],
      ["between A and B", "A와 B 사이", "짝 — between은 전치사지만 같이 외운다"]
    ] },
    examples: [
      { good: "Leave now, or you will miss the bus.", bad: "Leave now, and you will miss the bus.", note: "명령문, or ~ = 그러지 않으면 (경고의 or)" },
      { good: "You may pay by check or in cash.", bad: "You may pay by check nor in cash.", note: "둘 중 하나를 고르는 선택 → or. nor는 앞이 부정문일 때" },
      { good: "Both the café and the gym are open on Sundays.", bad: "Both the café or the gym are open on Sundays.", note: "both는 and와 짝" },
      { good: "She speaks neither French nor German.", bad: "She speaks neither French or German.", note: "neither는 nor와 짝" },
      { good: "Not only the hotel but also the restaurants were fully booked.", bad: "Not only the hotel and also the restaurants were fully booked.", note: "not only는 but also와 짝. 동사는 B(the restaurants)에 맞춘다" }
    ],
    trap: "짝을 섞으면 안 된다. either ... nor ❌ / neither ... or ❌\n수 일치가 짝마다 다르다.\nboth A and B는 복수 동사 (Both the printer and the scanner have been cleaned.)\neither A or B / neither A nor B / not only A but also B는 B에 맞춘다 (Neither the supervisor nor the technicians know the password.)\n단 nor 없이 쓰는 neither는 g16(수량 표현) 규칙대로 단수다. Neither of the two hotels was full. / Neither hotel was full.\nbetween A and B의 and를 or로 바꿀 수 없다.",
    toeicPattern: "빈칸 앞에 either·neither·not only·both가 보이면 짝을 찾는 문제다. 빈칸이 짝 자리(or·nor·but·and)면 뜻을 읽지 않고 짝으로 고를 수 있으니 이것부터 확인한다. 빈칸이 동사 자리면 짝에 따라 수를 맞춘다 (both는 복수, 나머지는 B에 맞춘다).\n짝 신호가 없고 선택지가 and / but / or / nor 네 개면 문법 문제가 아니라 뜻 문제다. 앞뒤 절이 같은 방향인지 뒤집히는지를 먼저 본다."
  },
  {
    id: "g15", order: 15, title: "분사", weight: "빈출",
    oneLine: "명사를 꾸밀 때 그 명사가 하는 쪽이면 -ing, 당하는 쪽이면 p.p.다. 문장 앞에 콤마로 붙는 분사구문도 같은 기준이다.",
    table: { headers: ["유형","형태","예"], rows: [
      ["명사 앞 (능동)","-ing + 명사","the rising cost (비용이 오른다)"],
      ["명사 앞 (수동)","p.p. + 명사","the attached file (파일이 첨부된다)"],
      ["명사 뒤","명사 + 분사 + 딸린 말","the form signed by the manager"],
      ["분사구문 (능동)","-ing ~, 주절","Having reviewed the data, we changed the plan."],
      ["분사구문 (수동)","p.p. ~, 주절","Delayed by snow, the train reached Busan at noon."],
      ["감정 동사","사물·일엔 -ing, 사람엔 p.p.","an exciting offer / the excited customers"],
      ["전치사처럼 굳은 분사","given, including, following, regarding + 명사","Given the delay, we rescheduled the launch."]
    ] },
    examples: [
      { good: "Please check the enclosed form.", bad: "Please check the enclosing form.", note: "양식은 동봉되는 쪽 → p.p." },
      { good: "The rising cost of fuel cut into our margins.", bad: "The risen cost of fuel cut into our margins.", note: "비용은 오르는 쪽 → -ing" },
      { good: "Visitors entering the lab must wear safety glasses.", bad: "Visitors entered the lab must wear safety glasses.", note: "방문객이 들어가는 쪽이고 뒤에 목적어(the lab)가 있다 → -ing" },
      { good: "Orders placed before noon ship the same day.", bad: "Orders placing before noon ship the same day.", note: "주문은 접수되는 쪽 → p.p. (which are) placed가 줄어든 형태" },
      { good: "Having read the instructions, the children built the tent.", bad: "Having read the instructions, the tent was built.", note: "분사구문의 숨은 주어는 주절의 주어(the children)와 같아야 한다" },
      { good: "The news was surprising, and the staff were surprised.", bad: "The news was surprised, and the staff were surprising.", note: "사물·일은 -ing, 사람은 p.p." }
    ],
    trap: "명사 앞의 -ing와 p.p.는 그 명사가 하는 쪽인지 당하는 쪽인지로 가른다. 뜻이 아니라 관계로 판단한다. 빈칸 뒤에 목적어가 있으면 -ing라는 g04의 기준도 그대로 통한다.\n단 waiting room, training session, accounting department처럼 '~하는 용도'를 뜻하는 -ing는 분사가 아니라 명사 앞에 붙은 동명사다. 이때는 관계로 가르지 않는다.\n감정을 나타내는 동사(interest, excite, surprise, disappoint, satisfy, impress)는 사물·일에 -ing, 사람에 p.p.를 쓴다. an exciting offer / excited customers\n분사구문의 숨은 주어는 주절의 주어와 같다. 다르면 분사구문을 쓸 수 없다.\n단 given, including, following, regarding은 전치사처럼 굳어서 이 규칙을 따르지 않는다. Given the delay, we rescheduled. (지연을 고려해)\n명사 뒤에서 꾸밀 때는 관계대명사 + be동사가 생략된 것이다. the report (which was) submitted last week",
    toeicPattern: "관사와 명사 사이는 형용사 자리다(g01). 선택지에 -ing와 p.p.가 함께 있으면 꾸밈 받는 명사가 하는 쪽인지 당하는 쪽인지로 고른다. 선택지는 attach / attached / attaching / attachment처럼 나온다.\n문장 맨 앞이 콤마로 끊기면 분사구문이다. 주절의 주어를 보고 능동인지 수동인지 고른다."
  },
  {
    id: "g16", order: 16, title: "수량 표현", weight: "빈출",
    oneLine: "빈칸 뒤 명사가 셀 수 있는 복수인지, 셀 수 없는지, 단수인지로 고른다. 수량 표현이 주어에 붙으면 동사의 수도 그 표현이 정한다.",
    table: { headers: ["붙는 명사","표현","예"], rows: [
      ["셀 수 있는 복수","many, few, a few, several, both, a number of","many orders"],
      ["셀 수 없는 명사","much, little, a little, a great deal of, a large amount of","much time"],
      ["둘 다","some, any, most, all, a lot of, plenty of, no","most staff / most information"],
      ["단수 명사","each, every, another","each employee"],
      ["둘 중에서 (단수 명사)","either, neither","either option"]
    ] },
    examples: [
      { good: "Many guests left positive reviews.", bad: "Much guests left positive reviews.", note: "guests는 셀 수 있는 복수 → many" },
      { good: "We do not have much space in the van.", bad: "We do not have many space in the van.", note: "space(공간)는 셀 수 없음 → much" },
      { good: "Each room has a coffee maker.", bad: "Each rooms have a coffee maker.", note: "each 뒤는 단수 명사 + 단수 동사" },
      { good: "A few seats are left for the evening show.", bad: "A little seats are left for the evening show.", note: "a few는 셀 수 있는 명사에 붙고 '몇 개 있다'. Few seats are left.는 '거의 없다'" },
      { good: "A number of trucks are waiting at the gate.", bad: "A number of trucks is waiting at the gate.", note: "a number of(많은)는 복수 동사. The number of trucks is small.은 '수 그 자체'라 단수" }
    ],
    trap: "a few / a little(약간 있다)과 few / little(거의 없다)은 뜻이 반대다. a가 붙으면 긍정이다.\neach, every, another 뒤에는 단수 명사가 오고 동사도 단수다. each of the + 복수 명사도 동사는 단수다. Each of the drivers has a key. (have ❌)\na number of + 복수 명사는 복수 동사, the number of + 복수 명사는 단수 동사다. the가 붙으면 '수 그 자체'라서 단수다.\neither, neither 뒤에 바로 명사나 of가 오면 이 유형이고 단수 취급한다. Neither of the two hotels was full. 뒤에 or / nor가 이어지는 either A or B, neither A nor B는 상관 접속사(g14)라서 동사를 B에 맞춘다.\n셀 수 있는 명사의 비교는 fewer, 셀 수 없는 명사는 less다. fewer complaints / less paperwork. 단 less + 형용사(less expensive)는 비교급(g10)이다.",
    toeicPattern: "빈칸 뒤 명사가 단수인지 복수인지 셀 수 없는지를 먼저 본다. 선택지가 much / many / few / every처럼 수량 표현 넷이면 이 유형이다.\na number of / the number of, each of처럼 수량 표현이 주어에 붙으면 동사의 수까지 함께 묻는다. 선택지가 is / are처럼 동사로만 나와도 주어 앞의 수량 표현부터 본다."
  }
];

// Items: { id, ruleId, alsoRuleIds?, question, choices, answer, explanation, difficulty }.
// alsoRuleIds(보조 태그): 그 문항이 함께 묻는 다른 유형. 오답 복습의 "함께 묻습니다" 링크에만 쓰고 약점 통계는 ruleId만 쓴다.
window.GRAMMAR_QUIZ = [
  { id: "q001", ruleId: "g01", question: "The ____ was approved by the board.", choices: ["propose", "proposal", "proposed", "proposing"], answer: 1, explanation: "the 뒤는 명사 자리다. propose(동사) / proposal(명사) / proposed(과거분사) / proposing(현재분사) 중 명사는 proposal.", difficulty: "easy" },
  { id: "q002", ruleId: "g01", question: "All employees must work ____ during the inspection.", choices: ["careful", "carefully", "careless", "care"], answer: 1, explanation: "동사 work를 꾸미는 자리라 부사 carefully. careful·careless는 형용사라 명사를 꾸미고(careless는 뜻도 반대다), care는 명사·동사라 이 자리에 올 수 없다.", difficulty: "easy" },
  { id: "q003", ruleId: "g01", question: "The manager gave a ____ explanation of the new policy.", choices: ["clear", "clearly", "clarity", "clearness"], answer: 0, explanation: "명사 explanation 앞이라 형용사 clear. clearly는 부사라 명사를 꾸미지 못하고, clarity·clearness는 명사라 a와 explanation 사이에 들어갈 수 없다.", difficulty: "easy" },
  { id: "q004", ruleId: "g01", question: "The company reported a ____ in sales last quarter.", choices: ["decline", "declining", "declined", "decliner"], answer: 0, explanation: "a 뒤, 전치사 in 앞이라 명사 자리다. decline은 명사(감소)로도 쓰인다. declining·declined는 분사라 뒤에 꾸밈 받을 명사가 있어야 하고, decliner는 쓰지 않는 말이다.", difficulty: "medium" },
  { id: "q005", ruleId: "g01", alsoRuleIds: ["g13"], question: "Ms. Park will ____ the training session tomorrow.", choices: ["lead", "leader", "leading", "leadership"], answer: 0, explanation: "조동사 will 뒤라 동사원형 lead. leading은 will 바로 뒤에 올 수 없고(will be leading이어야 한다), leader·leadership은 명사라 동사 자리에 맞지 않는다.", difficulty: "easy" },
  { id: "q006", ruleId: "g01", alsoRuleIds: ["g15"], question: "Please submit the form to the ____ department.", choices: ["accountably", "accounting", "accountant", "accounted"], answer: 1, explanation: "department를 꾸며 '회계 부서'를 만드는 복합명사 accounting이다(명사 앞 동명사, g01 trap). accountant는 사람(회계사)이라 '회계사 부서'가 되고, accountably는 부사라 명사 department를 꾸미지 못하고, accounted는 '설명된'이라 뜻이 맞지 않는다.", difficulty: "medium" },
  { id: "q007", ruleId: "g01", question: "The instructions were written very ____.", choices: ["simple", "simply", "simplify", "simplicity"], answer: 1, explanation: "수동태 were written 뒤에서 동사를 꾸미는 자리라 부사 simply. very에 속지 말고 꾸밈 받는 대상(written)을 봐라. simple은 형용사, simplify는 동사, simplicity는 명사다.", difficulty: "medium" },
  { id: "q008", ruleId: "g01", alsoRuleIds: ["g15"], question: "Our team achieved ____ results this year.", choices: ["impress", "impressed", "impressive", "impressively"], answer: 2, explanation: "명사 results 앞이므로 형용사 impressive. impressed는 '감명받은'으로 사람에게 쓴다. impress는 동사, impressively는 부사라 명사 앞에 못 온다. 결과(일)에는 감정을 주는 쪽인 impressive를 쓴다(g15).", difficulty: "medium" },
  { id: "q009", ruleId: "g01", question: "The ____ of the project depends on teamwork.", choices: ["succeed", "success", "successful", "successfully"], answer: 1, explanation: "The ____ of 구조에서 빈칸 뒤가 전치사 of라 명사 자리다. success가 명사. succeed는 동사, successful은 형용사, successfully는 부사다.", difficulty: "easy" },
  { id: "q010", ruleId: "g01", question: "He responded ____ to the customer's complaint.", choices: ["prompt", "promptly", "promptness", "prompted"], answer: 1, explanation: "목적어를 받지 않는 동사 responded를 꾸미는 자리라 부사 promptly. prompt는 형용사라 동사를 꾸미지 못하고(be동사나 seem 뒤라면 형용사가 온다), promptness는 명사, prompted는 동사라 이미 동사 responded가 있는 문장에 또 올 수 없다.", difficulty: "easy" },
  { id: "q011", ruleId: "g02", question: "The reports on the sales figures ____ ready for review.", choices: ["is", "are", "was", "has"], answer: 1, explanation: "주어는 reports(복수)다. on the sales figures는 꾸밈말이므로 가리고 봐야 한다. is·was·has는 모두 단수 주어에 쓰는 형태다.", difficulty: "medium" },
  { id: "q012", ruleId: "g16", question: "Each of the applicants ____ required to submit a résumé.", choices: ["is", "are", "were", "have"], answer: 0, explanation: "Each of the + 복수 명사는 each가 주어라 단수 동사 is. of the applicants에 속지 마라. are·were는 복수형이고, have는 수가 맞지 않을 뿐 아니라 have required(요구했다)가 되어 뜻도 틀린다.", difficulty: "medium" },
  { id: "q013", ruleId: "g02", question: "The information in these files ____ confidential.", choices: ["is", "are", "were", "have"], answer: 0, explanation: "information은 셀 수 없는 명사라 단수 취급한다. in these files의 복수 files에 속지 마라. are·were는 복수형이고, have는 뒤에 형용사 confidential이 바로 올 수 없다.", difficulty: "easy" },
  { id: "q014", ruleId: "g02", question: "The manager of the two departments ____ attending the meeting.", choices: ["is", "are", "were", "have been"], answer: 0, explanation: "주어는 manager(단수)다. of the two departments는 꾸밈말이다. are·were·have been은 복수 주어에 쓰는 형태다.", difficulty: "medium" },
  { id: "q015", ruleId: "g02", question: "All employees ____ to complete the survey by Friday.", choices: ["needs", "need", "needing", "is needed"], answer: 1, explanation: "주어 employees가 복수라 need. needs는 단수형, needing은 동사가 아니라 문장에 동사가 없어지고, is needed는 단수형인 데다 수동이라 뜻도 맞지 않는다.", difficulty: "easy" },
  { id: "q016", ruleId: "g16", question: "Neither of the proposals ____ approved.", choices: ["was", "were", "have", "are"], answer: 0, explanation: "Neither of the + 복수 명사는 neither가 주어라 단수 동사 was. of the proposals에 속지 마라. were·are는 복수형이고, have는 수도 틀리고 have approved(승인했다)가 되어 뜻이 바뀐다. 구어에서는 were도 들리지만 토익은 단수를 정답으로 낸다.", difficulty: "hard" },
  { id: "q017", ruleId: "g16", question: "The number of applicants ____ increased this year.", choices: ["has", "have", "are", "were"], answer: 0, explanation: "the number of는 '~의 수'로 단수다. a number of(많은)는 복수 취급이라 구분해야 한다. have·are·were는 복수형이다.", difficulty: "hard" },
  { id: "q018", ruleId: "g02", question: "There ____ several issues with the shipment.", choices: ["is", "are", "was", "has"], answer: 1, explanation: "There 구문은 뒤에 오는 명사가 주어다. several issues는 복수다. is·was·has는 단수형이다.", difficulty: "medium" },
  { id: "q019", ruleId: "g02", alsoRuleIds: ["g03"], question: "Our new equipment ____ just arrived.", choices: ["has", "have", "are", "were"], answer: 0, explanation: "equipment는 셀 수 없는 명사라 단수 취급하고, just arrived는 현재완료(have p.p.)라 has. have는 복수형이고, are·were는 arrived와 함께 쓰면 문법이 깨진다.", difficulty: "medium" },
  { id: "q020", ruleId: "g16", question: "Every document ____ to be signed.", choices: ["needs", "need", "needing", "are needed"], answer: 0, explanation: "every + 단수 명사는 단수 취급이라 needs. need는 복수형, needing은 동사가 아니고, are needed는 복수형이다.", difficulty: "easy" },
  { id: "q021", ruleId: "g03", question: "The shipment ____ last Monday.", choices: ["arrives", "arrived", "has arrived", "will arrive"], answer: 1, explanation: "last Monday는 끝난 과거 시점이라 과거형 arrived. has arrived는 현재완료라 last Monday와 쓸 수 없고, arrives(현재)·will arrive(미래)는 시점과 맞지 않는다.", difficulty: "easy" },
  { id: "q022", ruleId: "g03", question: "She ____ for this company since 2019.", choices: ["works", "worked", "has worked", "will work"], answer: 2, explanation: "since 2019(시점)는 현재완료와 짝이라 has worked. 2019년부터 지금까지 일한다는 뜻이다. worked는 지금까지 이어지는 일을 나타내지 못하고, works·will work는 since와 함께 쓰지 않는다.", difficulty: "medium" },
  { id: "q023", ruleId: "g03", question: "We ____ the new system next month.", choices: ["launching", "launched", "have launched", "will launch"], answer: 3, explanation: "next month는 미래 시점이라 will launch. launched·have launched는 과거·완료라 next month와 맞지 않고, launching은 be동사 없이 동사 자리에 올 수 없다.", difficulty: "easy" },
  { id: "q024", ruleId: "g03", question: "I ____ the report when the manager called.", choices: ["was writing", "am writing", "have written", "write"], answer: 0, explanation: "when the manager called(과거의 한 시점)에 하고 있던 일이라 과거진행 was writing. am writing은 현재, have written은 현재완료라 과거 시점과 맞지 않고, write는 현재형이다.", difficulty: "medium" },
  { id: "q025", ruleId: "g03", question: "The team ____ the project two weeks ago.", choices: ["completes", "completed", "has completed", "will complete"], answer: 1, explanation: "ago(~ 전에)는 이미 끝난 과거 시점이라 현재완료와 함께 쓰지 않는다. 여기서는 과거형 completed. completes(현재)·will complete(미래)도 two weeks ago와 맞지 않는다.", difficulty: "easy" },
  { id: "q026", ruleId: "g03", question: "Mr. Lee ____ in Seoul for ten years before moving to Busan.", choices: ["lives", "lived", "has lived", "will live"], answer: 1, explanation: "before moving으로 이미 끝난 일임이 드러난다. for가 있어도 과거에 끝났으면 과거형이다. has lived는 지금도 산다는 뜻이라 before moving과 어긋나고, lives·will live는 시제가 맞지 않는다.", difficulty: "hard" },
  { id: "q027", ruleId: "g01", question: "The office is ____ undergoing renovation.", choices: ["current", "currently", "currency", "more current"], answer: 1, explanation: "be ___ -ing 사이는 부사 자리라 currently. current는 형용사, currency는 명사(통화), more current는 형용사 비교급이라 동사를 꾸미지 못한다.", difficulty: "medium" },
  { id: "q028", ruleId: "g03", question: "We have not received your payment ____.", choices: ["already", "yet", "ago", "soon"], answer: 1, explanation: "부정문 have not received 끝에서 '아직'은 yet. already는 긍정문에 쓰고, ago는 과거형과 쓰며 현재완료와 쓰지 않는다. soon(곧)은 받지 못한 일과 뜻이 맞지 않는다.", difficulty: "medium" },
  { id: "q029", ruleId: "g03", alsoRuleIds: ["g02"], question: "The store ____ at nine every morning.", choices: ["open", "opens", "opened", "is opening"], answer: 1, explanation: "every morning은 반복되는 일이라 현재형이고, 주어 The store가 3인칭 단수라 opens. open은 복수형, opened는 과거, is opening은 지금 진행 중인 일이라 every morning과 맞지 않는다.", difficulty: "easy" },
  { id: "q030", ruleId: "g03", question: "He ____ the documents yesterday afternoon.", choices: ["sends", "sent", "has sent", "will send"], answer: 1, explanation: "yesterday afternoon은 끝난 과거 시점이라 sent. has sent는 현재완료라 yesterday와 쓸 수 없고, sends·will send는 시점과 맞지 않는다.", difficulty: "easy" },
  { id: "q031", ruleId: "g04", question: "The package ____ to the wrong address.", choices: ["delivered", "was delivered", "delivering", "deliver"], answer: 1, explanation: "소포는 배달되는 쪽이고 빈칸 뒤에 목적어가 없으니 수동태 was delivered. delivered만 쓰면 소포가 무엇을 배달한 것이 되고, delivering은 be동사 없이 동사 자리에 올 수 없으며, deliver는 수와 시제가 맞지 않는다.", difficulty: "easy" },
  { id: "q032", ruleId: "g04", question: "The committee ____ the proposal last week.", choices: ["approved", "was approved", "approving", "approval"], answer: 0, explanation: "빈칸 뒤에 목적어 the proposal이 있고 위원회가 승인하는 쪽이라 능동 approved. was approved는 수동이라 뒤에 목적어를 둘 수 없고, approving은 동사가 아니며, approval은 명사다.", difficulty: "easy" },
  { id: "q033", ruleId: "g04", alsoRuleIds: ["g13"], question: "All applications ____ by Friday.", choices: ["must submit", "must be submitted", "submitting", "submits"], answer: 1, explanation: "지원서는 제출되는 쪽이라 수동이고, 조동사 must 뒤라 must be submitted. must submit은 지원서가 무엇을 제출하는 것이 되고, submitting은 동사가 아니며, submits는 수가 맞지 않는 능동이다.", difficulty: "medium" },
  { id: "q034", ruleId: "g04", question: "The new policy ____ next month.", choices: ["will announce", "will be announced", "announcing", "announce"], answer: 1, explanation: "정책은 발표되는 쪽이라 미래 수동 will be announced. will announce는 정책이 무엇을 발표하는 것이 되고(뒤에 목적어도 없다), announcing·announce는 동사 형태가 맞지 않는다.", difficulty: "medium" },
  { id: "q035", ruleId: "g04", question: "Our team ____ the results at the conference.", choices: ["presented", "was presented", "presenting", "presentation"], answer: 0, explanation: "빈칸 뒤에 목적어 the results가 있고 팀이 발표하는 쪽이라 능동 presented. was presented는 수동이라 목적어를 둘 수 없고, presenting은 동사가 아니며, presentation은 명사다.", difficulty: "easy" },
  { id: "q036", ruleId: "g04", question: "The building ____ in 1995.", choices: ["constructed", "was constructed", "constructing", "constructs"], answer: 1, explanation: "건물은 지어지는 쪽이고 빈칸 뒤에 목적어가 없으니 수동 was constructed. constructed만 쓰면 건물이 무엇을 지은 것이 되고, constructing은 동사가 아니며, constructs는 현재형 능동이라 in 1995와도 맞지 않는다.", difficulty: "easy" },
  { id: "q037", ruleId: "g04", question: "Employees ____ to attend the safety training.", choices: ["require", "are required", "requiring", "requirement"], answer: 1, explanation: "직원은 요구받는 쪽이다. be required to + 동사원형 형태로 자주 출제된다. require는 직원이 요구하는 쪽이 되고, requiring은 동사가 아니며, requirement는 명사다.", difficulty: "medium" },
  { id: "q038", ruleId: "g04", question: "The technician ____ the equipment yesterday.", choices: ["repaired", "was repaired", "repairing", "repair"], answer: 0, explanation: "빈칸 뒤에 목적어 the equipment가 있고 기술자가 수리하는 쪽이라 능동 repaired. was repaired는 수동이라 목적어를 둘 수 없고, repairing은 동사가 아니며, repair는 yesterday와 시제가 맞지 않는다.", difficulty: "easy" },
  { id: "q039", ruleId: "g04", question: "The invoice ____ to your email address.", choices: ["has sent", "has been sent", "sending", "send"], answer: 1, explanation: "청구서는 보내지는 쪽이라 현재완료 수동 has been sent. has sent는 청구서가 무엇을 보낸 것이 되고(목적어도 없다), sending·send는 동사 형태가 맞지 않는다.", difficulty: "hard" },
  { id: "q040", ruleId: "g04", question: "The manager ____ the schedule to accommodate the change.", choices: ["revised", "was revised", "revising", "revision"], answer: 0, explanation: "빈칸 뒤에 목적어 the schedule이 있고 관리자가 고치는 쪽이라 능동 revised. was revised는 수동이라 목적어를 둘 수 없고, revising은 동사가 아니며, revision은 명사다.", difficulty: "medium" },
  { id: "q041", ruleId: "g05", question: "We decided ____ the meeting until next week.", choices: ["postpone", "to postpone", "postponing", "postponed"], answer: 1, explanation: "decide 뒤에는 to부정사가 온다(decide to + 동사원형). postponing은 decide가 받지 않고, postpone·postponed는 decided 바로 뒤에서 동사가 겹친다.", difficulty: "easy" },
  { id: "q042", ruleId: "g05", question: "The manager recommended ____ the deadline.", choices: ["extend", "to extend", "extending", "extended"], answer: 2, explanation: "recommend 뒤에는 to부정사가 바로 올 수 없다. recommend -ing 또는 recommend that + 주어 + 동사원형 형태로 쓴다. extend·extended는 recommended 바로 뒤에서 동사가 겹친다.", difficulty: "medium" },
  { id: "q043", ruleId: "g05", question: "She finished ____ the report yesterday.", choices: ["write", "to write", "writing", "written"], answer: 2, explanation: "finish 뒤에는 -ing가 온다. to write는 finish가 받지 않고, write·written은 finished 바로 뒤에 올 수 없다.", difficulty: "easy" },
  { id: "q044", ruleId: "g05", question: "They agreed ____ the contract next month.", choices: ["renew", "to renew", "renewing", "renewed"], answer: 1, explanation: "agree 뒤에는 to부정사가 온다(agree to + 동사원형). renewing은 agree가 받지 않고, renew·renewed는 동사가 겹친다.", difficulty: "easy" },
  { id: "q045", ruleId: "g05", question: "Please avoid ____ during the presentation.", choices: ["talk", "to talk", "talking", "talked"], answer: 2, explanation: "avoid 뒤에는 -ing가 온다. to talk는 avoid가 받지 않고, talk·talked는 동사가 겹친다.", difficulty: "medium" },
  { id: "q046", ruleId: "g05", question: "We look forward to ____ from you soon.", choices: ["hear", "to hear", "hearing", "heard"], answer: 2, explanation: "look forward to의 to는 전치사라서 뒤에 -ing가 온다. 토익이 노리는 대표 함정이다. to hear는 이 to를 to부정사로 착각한 오답이고, hear·heard는 전치사 뒤에 올 수 없다.", difficulty: "hard" },
  { id: "q047", ruleId: "g05", question: "He offered ____ us with the project.", choices: ["help", "to help", "helping", "helped"], answer: 1, explanation: "offer 뒤에는 to부정사가 온다. helping은 offer가 받지 않고, help·helped는 동사가 겹친다.", difficulty: "medium" },
  { id: "q048", ruleId: "g05", question: "The company plans ____ a new branch.", choices: ["open", "to open", "opening", "opened"], answer: 1, explanation: "plan 뒤에는 to부정사가 온다. opening은 plan이 바로 받지 않고(plan on -ing는 따로 외운다), open·opened는 동사가 겹친다.", difficulty: "easy" },
  { id: "q049", ruleId: "g05", question: "Would you mind ____ the door?", choices: ["close", "to close", "closing", "closed"], answer: 2, explanation: "mind 뒤에는 -ing가 온다. Would you mind -ing? 는 정중한 요청이다. to close는 mind가 받지 않고, close·closed는 동사가 겹친다.", difficulty: "medium" },
  { id: "q050", ruleId: "g05", question: "I am used to ____ early.", choices: ["get up", "to get up", "getting up", "got up"], answer: 2, explanation: "be used to의 to도 전치사다. 뒤에 -ing가 온다. used to + 동사원형(과거의 습관)과 구분해야 한다. to get up은 이 to를 to부정사로 착각한 오답이고, get up·got up은 전치사 뒤에 올 수 없다.", difficulty: "hard" },
  { id: "q051", ruleId: "g06", question: "The report is due ____ Friday.", choices: ["in", "on", "at", "to"], answer: 1, explanation: "요일(Friday) 앞에는 on. in은 월·연도, at은 시각에 쓰고, due to는 '~ 때문에'라 뜻이 달라진다.", difficulty: "easy" },
  { id: "q052", ruleId: "g06", question: "Please submit your timesheet ____ 5 p.m. on Friday.", choices: ["by", "until", "during", "for"], answer: 0, explanation: "5 p.m.까지 제출을 끝내라는 마감이라 by. until은 그때까지 계속하는 일에 쓰고(제출은 한 번에 끝나는 일이다), during은 기간 명사와, for는 숫자 기간과 쓴다.", difficulty: "medium" },
  { id: "q053", ruleId: "g06", question: "The conference will be held ____ May.", choices: ["in", "on", "at", "to"], answer: 0, explanation: "월(May) 앞에는 in. on은 날짜·요일, at은 시각에 쓰고, to는 때를 나타내지 않는다.", difficulty: "easy" },
  { id: "q054", ruleId: "g06", question: "We waited ____ two hours.", choices: ["for", "during", "since", "by"], answer: 0, explanation: "two hours는 숫자 기간이라 for. during은 사건·기간 명사(during the meeting)와 쓰고, since는 시점과, by는 마감과 쓴다.", difficulty: "medium" },
  { id: "q055", ruleId: "g06", question: "The meeting takes place ____ the conference room.", choices: ["in", "on", "of", "to"], answer: 0, explanation: "방 안이라 in. on은 표면 위, to는 방향을 나타내고, of는 장소를 나타내지 않는다.", difficulty: "easy" },
  { id: "q056", ruleId: "g06", alsoRuleIds: ["g03"], question: "She has worked here ____ 2020.", choices: ["for", "since", "during", "from"], answer: 1, explanation: "since + 시점(연도), for + 기간. 현재완료와 짝을 이룬다. during은 기간 명사와 쓰고, from은 since처럼 현재완료와 함께 시작 시점을 나타내지 않는다.", difficulty: "medium" },
  { id: "q057", ruleId: "g06", question: "The train leaves ____ nine o'clock.", choices: ["in", "on", "at", "to"], answer: 2, explanation: "시각 앞에는 at. in은 월·연도, on은 날짜·요일에 쓰고, to는 때를 나타내지 않는다.", difficulty: "easy" },
  { id: "q058", ruleId: "g06", alsoRuleIds: ["g07"], question: "The office is closed ____ the holidays.", choices: ["while", "during", "since", "by"], answer: 1, explanation: "during + 사건·기간을 나타내는 명사. the holidays는 숫자 기간이 아니다. while은 접속사라 뒤에 주어+동사가 와야 하고(g07), since는 시점과 현재완료에, by는 마감에 쓴다.", difficulty: "medium" },
  { id: "q059", ruleId: "g06", question: "Our store is located ____ Main Street.", choices: ["in", "on", "at", "to"], answer: 1, explanation: "거리 이름 앞에는 on을 쓴다. 번지까지 붙으면 at 25 Main Street. in Main Street는 영국식이고, to는 방향이다.", difficulty: "medium" },
  { id: "q060", ruleId: "g06", question: "Your order will arrive ____ three days.", choices: ["in", "for", "during", "by"], answer: 0, explanation: "in + 기간은 '그만큼 지나서'라는 뜻이다. 주문품은 3일 뒤에 도착한다. for three days는 '3일 동안' 계속하는 일에 쓰고, during은 기간 명사와, by는 마감 시점과 쓴다.", difficulty: "hard" },
  { id: "q061", ruleId: "g07", question: "The event was canceled ____ the bad weather.", choices: ["because", "because of", "although", "while"], answer: 1, explanation: "빈칸 뒤가 명사 덩어리(the bad weather)라 전치사 because of. because·although·while은 접속사라 뒤에 주어+동사가 와야 한다.", difficulty: "easy" },
  { id: "q062", ruleId: "g07", question: "____ the price increased, sales remained strong.", choices: ["Despite", "Although", "Because of", "During"], answer: 1, explanation: "빈칸 뒤에 주어+동사(the price increased)가 있어 접속사가 필요하고, '올랐는데도 강했다'는 양보라 Although. Despite·Because of·During은 전치사라 뒤에 문장이 올 수 없다.", difficulty: "medium" },
  { id: "q063", ruleId: "g07", question: "We finished early ____ everyone worked hard.", choices: ["because", "because of", "despite", "during"], answer: 0, explanation: "빈칸 뒤에 주어+동사가 있고 '열심히 해서 일찍 끝났다'는 이유라 접속사 because. because of·despite·during은 전치사라 뒤에 문장이 올 수 없다.", difficulty: "easy" },
  { id: "q064", ruleId: "g07", question: "____ his experience, he was not selected.", choices: ["Although", "Despite", "Because", "While"], answer: 1, explanation: "빈칸 뒤가 명사(his experience)이고 '경력이 있는데도 뽑히지 않았다'는 양보라 전치사 Despite. Although·Because·While은 접속사라 뒤에 주어+동사가 와야 한다.", difficulty: "medium" },
  { id: "q065", ruleId: "g07", question: "Please remain seated ____ the flight.", choices: ["while", "during", "although", "because"], answer: 1, explanation: "빈칸 뒤가 명사(the flight)라 전치사 during. while·although·because는 접속사라 뒤에 주어+동사가 와야 한다.", difficulty: "medium" },
  { id: "q066", ruleId: "g07", question: "He checked his email ____ he was waiting.", choices: ["during", "while", "despite", "because of"], answer: 1, explanation: "빈칸 뒤에 주어+동사(he was waiting)가 있고 '기다리는 동안'이라 접속사 while. during·despite·because of는 전치사라 뒤에 문장이 올 수 없다.", difficulty: "medium" },
  { id: "q067", ruleId: "g07", question: "The road was closed ____ construction.", choices: ["because", "due to", "although", "while"], answer: 1, explanation: "빈칸 뒤가 명사(construction)이고 '공사 때문에'라 전치사 due to. because·although·while은 접속사라 뒤에 주어+동사가 와야 한다.", difficulty: "easy" },
  { id: "q068", ruleId: "g07", question: "____ the report was late, it was well written.", choices: ["Despite", "In spite of", "Even though", "Due to"], answer: 2, explanation: "빈칸 뒤에 주어+동사가 있고 '늦었지만 잘 썼다'는 양보라 접속사 Even though. Despite·In spite of·Due to는 전치사라 뒤에 문장이 올 수 없다.", difficulty: "hard" },
  { id: "q069", ruleId: "g07", question: "Sales improved ____ the new campaign.", choices: ["thanks to", "although", "while", "because"], answer: 0, explanation: "빈칸 뒤가 명사(the new campaign)라 전치사 thanks to(~ 덕분에). although·while·because는 접속사라 뒤에 주어+동사가 와야 한다.", difficulty: "medium" },
  { id: "q070", ruleId: "g07", question: "____ the heavy rain, the event continued.", choices: ["Although", "In spite of", "Because", "While"], answer: 1, explanation: "빈칸 뒤가 명사(the heavy rain)이고 '비가 왔는데도 계속됐다'는 양보라 전치사 In spite of. Although·Because·While은 접속사라 뒤에 주어+동사가 와야 한다.", difficulty: "medium" },
  { id: "q071", ruleId: "g08", question: "The employee ____ submitted the report is on leave.", choices: ["who", "which", "whose", "what"], answer: 0, explanation: "앞 명사가 사람(employee)이고 빈칸 뒤에 주어 없이 동사 submitted가 오니 주격 who. which는 사물에 쓰고, whose는 뒤에 명사가 와야 하며, what은 앞에 명사를 둘 수 없다.", difficulty: "easy" },
  { id: "q072", ruleId: "g08", question: "This is the file ____ I mentioned yesterday.", choices: ["who", "that", "what", "whose"], answer: 1, explanation: "앞 명사가 사물(the file)이고 뒤에 주어 I가 있는데 mentioned의 목적어가 빠졌으니 목적격 that. who는 사람에, whose는 뒤에 명사가 올 때 쓰고, what은 앞에 명사를 둘 수 없다.", difficulty: "medium" },
  { id: "q073", ruleId: "g08", question: "The company ____ office is downtown is hiring.", choices: ["which", "that", "whose", "who"], answer: 2, explanation: "빈칸 뒤에 명사 office가 바로 오고 '그 회사의 사무실'이라는 소유 관계라 whose. which·that·who를 넣으면 office is downtown이 이미 완전한 문장이라 들어갈 자리가 없다.", difficulty: "hard" },
  { id: "q074", ruleId: "g08", question: "The candidates ____ we interviewed were impressive.", choices: ["which", "whom", "whose", "what"], answer: 1, explanation: "앞 명사가 사람(candidates)이고 뒤에 주어 we가 있는데 interviewed의 목적어가 빠졌으니 목적격 whom. which는 사물에, whose는 뒤에 명사가 올 때 쓰고, what은 앞에 명사를 둘 수 없다.", difficulty: "hard" },
  { id: "q075", ruleId: "g08", question: "The equipment ____ was delivered is defective.", choices: ["who", "which", "whose", "what"], answer: 1, explanation: "앞 명사가 사물(equipment)이고 뒤에 주어 없이 동사 was delivered가 오니 주격 which. who는 사람에, whose는 뒤에 명사가 올 때 쓰고, what은 앞에 명사를 둘 수 없다.", difficulty: "easy" },
  { id: "q076", ruleId: "g08", question: "I don't know the person ____ called.", choices: ["who", "which", "whose", "whom"], answer: 0, explanation: "앞 명사가 사람(the person)이고 뒤에 주어 없이 동사 called가 오니 주격 who. whom은 목적격이라 뒤에 주어가 있어야 하고, which는 사물에, whose는 뒤에 명사가 올 때 쓴다.", difficulty: "easy" },
  { id: "q077", ruleId: "g08", question: "The report ____ you requested is attached.", choices: ["what", "that", "who", "whose"], answer: 1, explanation: "앞 명사가 사물(The report)이고 뒤에 주어 you가 있는데 requested의 목적어가 빠졌으니 목적격 that. what은 앞에 명사를 둘 수 없고, who는 사람에, whose는 뒤에 명사가 올 때 쓴다.", difficulty: "medium" },
  { id: "q078", ruleId: "g08", question: "She is the manager ____ approved the budget.", choices: ["which", "who", "whose", "what"], answer: 1, explanation: "앞 명사가 사람(the manager)이고 뒤에 주어 없이 동사 approved가 오니 주격 who. which는 사물에, whose는 뒤에 명사가 올 때 쓰고, what은 앞에 명사를 둘 수 없다.", difficulty: "easy" },
  { id: "q079", ruleId: "g08", question: "The building ____ we visited is being renovated.", choices: ["who", "which", "whose", "what"], answer: 1, explanation: "앞 명사가 사물(The building)이고 뒤에 주어 we가 있는데 visited의 목적어가 빠졌으니 목적격 which. who는 사람에, whose는 뒤에 명사가 올 때 쓰고, what은 앞에 명사를 둘 수 없다.", difficulty: "medium" },
  { id: "q080", ruleId: "g08", question: "The project ____ deadline was extended is now on track.", choices: ["who", "which", "whose", "what"], answer: 2, explanation: "뒤에 명사(deadline)가 바로 오고 소유 관계이므로 whose. 사물에도 whose를 쓴다. who·which·what을 넣으면 deadline was extended가 이미 완전한 문장이라 들어갈 자리가 없다.", difficulty: "hard" },
  { id: "q081", ruleId: "g09", question: "Please send the documents to ____.", choices: ["I", "me", "my", "mine"], answer: 1, explanation: "전치사 to 뒤라 목적격 me. I는 주격, my는 뒤에 명사가 있어야 하는 소유격이고, mine은 '내 것'이라 서류를 '내 것에게' 보내는 말이 된다.", difficulty: "easy" },
  { id: "q082", ruleId: "g09", question: "____ office is on the third floor.", choices: ["We", "Us", "Our", "Ours"], answer: 2, explanation: "빈칸 뒤에 관사 없이 명사 office가 오니 소유격 Our. We는 주격, Us는 목적격이라 명사 앞에 못 오고, Ours는 '우리 것'이라 뒤에 명사를 두지 않는다.", difficulty: "easy" },
  { id: "q083", ruleId: "g09", question: "We gave the team two options, and the final decision was ____.", choices: ["they", "them", "their", "theirs"], answer: 3, explanation: "결정은 '그들의 것'이라 뒤에 명사 없이 쓰는 소유대명사 theirs. be동사 뒤는 목적어 자리가 아니라 them은 맞지 않고, their는 뒤에 명사가 있어야 하며, they는 주격이다.", difficulty: "medium" },
  { id: "q084", ruleId: "g09", question: "He completed the project by ____.", choices: ["he", "him", "his", "himself"], answer: 3, explanation: "by oneself(혼자 힘으로)는 재귀대명사를 쓴다. 주어와 같은 대상이다. him을 쓰면 주어 He와 다른 사람이 되고, he·his는 전치사 by 뒤에 이 뜻으로 올 수 없다.", difficulty: "medium" },
  { id: "q085", ruleId: "g09", question: "The company announced ____ new policy.", choices: ["it", "its", "it's", "theirs"], answer: 1, explanation: "명사 앞이므로 소유격 its. it's는 it is의 줄임이라 들어갈 수 없다. it은 목적격이라 명사 앞에 못 오고, theirs는 뒤에 명사를 두지 않는다. 사이에 형용사 new가 끼어도 소유격 자리다.", difficulty: "hard" },
  { id: "q086", ruleId: "g09", question: "Ms. Lee and ____ attended the meeting.", choices: ["I", "me", "my", "mine"], answer: 0, explanation: "주어 자리이므로 주격 I. and로 연결돼도 자리는 그대로다. me·my·mine은 주어 자리에 올 수 없다. 구어에서 me도 들리지만 토익은 I를 정답으로 낸다.", difficulty: "medium" },
  { id: "q087", ruleId: "g09", question: "The manager gave ____ a raise.", choices: ["she", "her", "hers", "she's"], answer: 1, explanation: "동사 gave의 목적어(받는 사람) 자리라 목적격 her. she는 주격, hers는 '그녀의 것', she's는 she is의 줄임이라 이 자리에 올 수 없다.", difficulty: "easy" },
  { id: "q088", ruleId: "g09", question: "This desk is ____, not yours.", choices: ["my", "mine", "me", "myself"], answer: 1, explanation: "뒤에 명사가 없으므로 소유대명사 mine. my는 뒤에 명사가 필요하고, me는 목적격, myself는 주어와 같은 목적어일 때 쓴다.", difficulty: "medium" },
  { id: "q089", ruleId: "g09", question: "The team finished ____ report early.", choices: ["it", "it's", "their", "theirs"], answer: 2, explanation: "명사 report 앞이므로 소유격. team을 구성원 전체로 보면 their를 쓴다. it's는 it is라 명사 앞에 못 오고, it·theirs도 명사 앞에 오지 않는다.", difficulty: "medium" },
  { id: "q090", ruleId: "g09", question: "____ a good idea to confirm first.", choices: ["Its", "It's", "Their", "Theirs"], answer: 1, explanation: "It is의 줄임인 It's가 필요하다. 아포스트로피가 있으면 it is다. Its는 소유격이라 뒤에 동사가 없어지고, Their·Theirs는 a good idea와 맞지 않는다.", difficulty: "hard" },
  { id: "q091", ruleId: "g10", question: "This model is ____ than the previous one.", choices: ["cheap", "cheaper", "cheapest", "more cheap"], answer: 1, explanation: "than이 있으면 비교급이다. 짧은 단어는 -er을 붙인다. cheapest는 최상급이라 than과 못 쓰고, more cheap은 짧은 단어에 more를 쓴 오답이다.", difficulty: "easy" },
  { id: "q092", ruleId: "g10", question: "She is the ____ experienced member of our twenty-person team.", choices: ["more", "most", "much", "very"], answer: 1, explanation: "the와 범위(20명 팀 중)가 있으니 최상급이고, experienced는 긴 단어라 most. more는 둘을 비교할 때 쓰고, much·very는 최상급을 만들지 못한다.", difficulty: "medium" },
  { id: "q093", ruleId: "g10", question: "The new system is much ____ than the old one.", choices: ["fast", "faster", "fastest", "more fast"], answer: 1, explanation: "than이 있으므로 비교급 faster. much는 비교급을 강조한다. fastest는 최상급이라 than과 못 쓰고, more fast는 짧은 단어에 more를 쓴 오답이다.", difficulty: "medium" },
  { id: "q094", ruleId: "g10", alsoRuleIds: ["g01"], question: "Please reply as soon as ____.", choices: ["possible", "possibly", "possibility", "more possible"], answer: 0, explanation: "as soon as possible(가능한 한 빨리)은 as + 원급 + as 구조의 굳은 표현이라 형용사 possible. possibly는 부사, possibility는 명사이고, as ~ as 사이에 more possible 같은 비교급은 올 수 없다.", difficulty: "easy" },
  { id: "q095", ruleId: "g10", question: "This is the ____ report I have ever read.", choices: ["good", "better", "best", "well"], answer: 2, explanation: "I have ever와 the가 함께 오면 최상급이다. good의 최상급은 best. better는 비교급이라 than이 필요하고, good은 원급, well은 부사다.", difficulty: "medium" },
  { id: "q096", ruleId: "g10", question: "Sales were ____ this quarter than last quarter.", choices: ["high", "higher", "highest", "more high"], answer: 1, explanation: "than이 있으므로 비교급 higher. highest는 최상급이라 than과 못 쓰고, more high는 짧은 단어에 more를 쓴 오답이다.", difficulty: "easy" },
  { id: "q097", ruleId: "g10", question: "The second option is ____ expensive than the first.", choices: ["less", "least", "little", "few"], answer: 0, explanation: "than이 있으니 비교급이고, '덜 비싸다'는 less + 원급(less expensive). least는 최상급이라 than과 못 쓰고, little·few는 형용사 앞에서 비교를 만들지 못한다.", difficulty: "medium" },
  { id: "q098", ruleId: "g10", question: "Of all the candidates, she is the ____ qualified.", choices: ["more", "most", "much", "very"], answer: 1, explanation: "Of all과 the가 있으므로 최상급 most. more는 둘을 비교할 때 쓰고, much·very는 최상급을 만들지 못한다.", difficulty: "medium" },
  { id: "q099", ruleId: "g10", question: "The results were ____ than we expected.", choices: ["bad", "worse", "worst", "more bad"], answer: 1, explanation: "bad의 비교급은 불규칙 변화로 worse다. worst는 최상급이라 than과 못 쓰고, more bad는 쓰지 않는 형태다.", difficulty: "medium" },
  { id: "q100", ruleId: "g10", question: "He works ____ harder than his colleagues.", choices: ["very", "much", "so", "too"], answer: 1, explanation: "비교급 강조는 much, far, even을 쓴다. very는 비교급을 강조하지 못한다. so·too도 비교급을 꾸미지 못한다.", difficulty: "hard" },
  { id: "q101", ruleId: "g11", question: "If it ____ tomorrow, we will cancel the picnic.", choices: ["rain", "rains", "rained", "will rain"], answer: 1, explanation: "if절 안에는 will을 쓰지 않는다. 미래를 말해도 현재형을 쓴다. rain은 주어 it과 수가 맞지 않고, rained는 가정법(실제와 반대)이라 will과 어울리지 않는다.", difficulty: "medium" },
  { id: "q102", ruleId: "g11", question: "If I ____ more time, I would help you.", choices: ["have", "had", "will have", "have had"], answer: 1, explanation: "주절이 would + 동사원형이므로 현재 사실의 반대. if절은 과거형을 쓴다. have는 단순 조건이라 would와 어울리지 않고, will have·have had는 이 if절에 쓰는 형태가 아니다.", difficulty: "medium" },
  { id: "q103", ruleId: "g11", question: "If she had known, she ____ earlier.", choices: ["comes", "came", "would come", "would have come"], answer: 3, explanation: "if절이 had p.p.이므로 과거 사실의 반대. 주절은 would have p.p. would come은 현재 사실의 반대에 쓰는 주절이고, comes·came은 가정 문장의 주절이 될 수 없다.", difficulty: "hard" },
  { id: "q104", ruleId: "g11", question: "If you ____ the form, we will process it today.", choices: ["submit", "submitted", "will submit", "had submitted"], answer: 0, explanation: "주절이 will이므로 단순 조건이다. if절은 현재형. submitted·had submitted는 가정법이라 will과 어울리지 않고, will submit은 if절에 will을 쓴 오답이다.", difficulty: "easy" },
  { id: "q105", ruleId: "g11", question: "If I were you, I ____ the offer.", choices: ["accept", "accepted", "would accept", "will accept"], answer: 2, explanation: "If I were you는 현재 사실의 반대다. 주절은 would + 동사원형. will accept는 단순 조건의 주절이고, accept·accepted는 would 없이 가정의 결과를 나타내지 못한다.", difficulty: "medium" },
  { id: "q106", ruleId: "g11", question: "We would have finished on time if the shipment ____ late.", choices: ["is not", "was not", "had not been", "would not be"], answer: 2, explanation: "주절이 would have p.p.이므로 과거 사실의 반대. if절은 had p.p. was not은 현재 사실의 반대(가정법 과거), is not은 단순 조건에 쓰고, would not be는 if절에 쓰지 않는다.", difficulty: "hard" },
  { id: "q107", ruleId: "g11", question: "If the weather ____ better, we would go hiking.", choices: ["is", "is not", "were", "will be"], answer: 2, explanation: "가정법 과거에서는 주어와 상관없이 were를 쓰는 것이 원칙이다. is·will be는 단순 조건이라 would와 어울리지 않고, is not은 뜻도 반대가 된다.", difficulty: "hard" },
  { id: "q108", ruleId: "g11", question: "If you need help, ____ me know.", choices: ["let", "to let", "letting", "will let"], answer: 0, explanation: "주절이 명령문이다. 명령문은 동사원형으로 시작한다. to let·letting은 동사원형이 아니고, will let은 주어가 없어 문장이 되지 않는다.", difficulty: "easy" },
  { id: "q109", ruleId: "g11", question: "If he had studied harder, he ____ the exam last spring.", choices: ["passes", "passed", "would pass", "would have passed"], answer: 3, explanation: "if절이 had p.p.이고 last spring은 지난 일이라 과거 사실의 반대 would have passed. would pass는 현재 사실의 반대에 쓰고, passes·passed는 가정의 결과를 나타내지 못한다.", difficulty: "medium" },
  { id: "q110", ruleId: "g11", alsoRuleIds: ["g02"], question: "If the price ____, we will buy more.", choices: ["drop", "drops", "dropped", "will drop"], answer: 1, explanation: "단순 조건이므로 if절은 현재형. 주어가 3인칭 단수라 -s가 붙는다. will drop은 if절에 will을 쓴 오답이고, dropped는 가정법 과거라 will과 어울리지 않는다.", difficulty: "medium" },
  { id: "q111", ruleId: "g12", question: "She ____ late for meetings.", choices: ["is never", "never is", "is not never", "never be"], answer: 0, explanation: "빈도부사 never는 be동사 뒤에 온다. never is는 be동사 앞에 둔 오답, is not never는 부정이 겹치고, never be는 동사 형태가 틀렸다.", difficulty: "easy" },
  { id: "q112", ruleId: "g12", question: "Do you know where ____?", choices: ["is the office", "the office is", "does the office", "the office does"], answer: 1, explanation: "문장 안에 들어간 의문문은 의문사 + 주어 + 동사 순서다. is the office·does the office는 의문문 어순이고, the office does는 동사 is 대신 does를 썼다.", difficulty: "medium" },
  { id: "q113", ruleId: "g12", question: "Could you tell me when ____?", choices: ["does the train leave", "the train leaves", "the train leaving", "leaves the train"], answer: 1, explanation: "간접의문문은 평서문 어순(주어 + 동사)이라 the train leaves. does the train leave는 의문문 어순, leaves the train은 동사가 주어 앞에 왔고, the train leaving은 동사가 아니다.", difficulty: "medium" },
  { id: "q114", ruleId: "g12", question: "He ____ checks his email in the morning.", choices: ["always", "is always", "always is", "does always"], answer: 0, explanation: "빈도부사 always는 일반동사 앞에 온다. is always는 일반동사 checks와 be동사가 겹치고, always is·does always는 어순과 형태가 틀렸다.", difficulty: "easy" },
  { id: "q115", ruleId: "g12", question: "I wonder why ____ the meeting.", choices: ["did she cancel", "she canceled", "she cancel", "canceled she"], answer: 1, explanation: "간접의문문이라 주어 + 동사 순서인 she canceled. did she cancel은 의문문 어순, canceled she는 동사가 주어 앞에 왔고, she cancel은 시제와 수가 맞지 않는다.", difficulty: "medium" },
  { id: "q116", ruleId: "g12", question: "The manager ____ busy this week.", choices: ["is very", "very is", "being very", "very being"], answer: 0, explanation: "형용사 앞에는 be동사가 필요하고, very는 형용사 바로 앞에 온다. very is는 어순이 틀렸고, being very·very being은 동사가 없어 문장이 되지 않는다.", difficulty: "easy" },
  { id: "q117", ruleId: "g13", question: "____ you please confirm the date?", choices: ["Could", "Must", "Should", "Shall"], answer: 0, explanation: "정중한 요청은 Could you ~? 로 시작한다. must·should는 의무·권고라 부탁하는 말이 아니고, Shall you ~?라고는 쓰지 않는다.", difficulty: "easy" },
  { id: "q118", ruleId: "g12", question: "She ____ to the gym after work.", choices: ["often go", "often goes", "going often", "often going"], answer: 1, explanation: "빈도부사 often은 일반동사 앞에 오고, 주어 She가 3인칭 단수라 goes. often go는 수가 맞지 않고, going often·often going은 동사가 아니다.", difficulty: "medium" },
  { id: "q119", ruleId: "g12", question: "Please let me know ____ the report is ready.", choices: ["does when", "when", "when does", "that when"], answer: 1, explanation: "뒤에 주어+동사가 이어지므로 접속사 when 하나면 된다. does when·when does는 의문문 어순을 섞은 오답이고, that when은 접속사가 겹친다.", difficulty: "medium" },
  { id: "q120", ruleId: "g02", question: "____ there any questions about the agenda?", choices: ["Is", "Are", "Do", "Does"], answer: 1, explanation: "There 구문은 뒤의 명사가 주어다. questions가 복수이므로 Are. Is는 단수형이고, Do·Does는 there 구문과 쓰지 않는다.", difficulty: "medium" },
  { id: "q121", ruleId: "g13", question: "All visitors must ____ in at the front desk.", choices: ["signs", "signing", "sign", "signed"], answer: 2, explanation: "조동사 must 뒤에는 동사원형이 온다. sign in = 이름을 적고 들어가다. signs·signing·signed는 조동사 뒤에 올 수 없다.", difficulty: "easy" },
  { id: "q122", ruleId: "g13", question: "The new policy will ____ effect on July 1.", choices: ["take", "takes", "taking", "taken"], answer: 0, explanation: "조동사 will 뒤에는 동사원형이 온다. take effect = 시행되다. 주어가 단수여도 takes는 안 된다. taking·taken도 조동사 바로 뒤에 올 수 없다.", difficulty: "easy" },
  { id: "q123", ruleId: "g13", question: "You should ____ your reservation before arriving.", choices: ["confirms", "confirming", "confirmed", "confirm"], answer: 3, explanation: "조동사 should 뒤에는 동사원형 confirm이 온다. confirms·confirming·confirmed는 조동사 뒤에 올 수 없다.", difficulty: "easy" },
  { id: "q124", ruleId: "g13", question: "Employees may ____ the west lot free of charge.", choices: ["uses", "use", "using", "to use"], answer: 1, explanation: "조동사 may(~해도 된다) 뒤에는 동사원형이 온다. 조동사 뒤에는 to를 붙이지 않으므로 to use도 안 된다.", difficulty: "medium" },
  { id: "q125", ruleId: "g13", alsoRuleIds: ["g04"], question: "The report should ____ submitted last week, but it is still missing.", choices: ["be", "being", "have been", "been"], answer: 2, explanation: "last week에 했어야 했는데 하지 않은 일이므로 should have p.p.다. 보고서는 제출되는 쪽이라 should have been submitted. should be submitted는 last week와 맞지 않는다. being·been은 조동사 바로 뒤에 올 수 없다.", difficulty: "hard" },
  { id: "q126", ruleId: "g13", question: "Our team will review the proposal and ____ comments by Monday.", choices: ["send", "sends", "sending", "sent"], answer: 0, explanation: "will review ... and (will) send. and 뒤의 동사도 will을 함께 쓰는 병렬이라 동사원형이 온다. sends·sending·sent는 will과 함께 쓰는 형태가 아니다.", difficulty: "medium" },
  { id: "q127", ruleId: "g13", question: "Visitors cannot ____ photographs inside the gallery.", choices: ["takes", "taking", "took", "take"], answer: 3, explanation: "cannot(can + not) 뒤에도 동사원형이 온다. takes·taking·took은 조동사 뒤에 올 수 없다.", difficulty: "easy" },
  { id: "q128", ruleId: "g13", alsoRuleIds: ["g04"], question: "The revised schedule will ____ to all staff by email.", choices: ["sent", "be sent", "is sent", "being sent"], answer: 1, explanation: "일정표는 보내지는 쪽이라 수동태다. 조동사 뒤에서는 be동사도 원형이므로 will be sent. will is sent처럼 조동사 뒤에 is를 쓸 수 없다. sent·being sent도 조동사 바로 뒤에 올 수 없다.", difficulty: "medium" },
  { id: "q129", ruleId: "g13", question: "Applicants must ____ able to work weekends.", choices: ["be", "are", "being", "been"], answer: 0, explanation: "조동사 뒤에는 be동사도 원형 be를 쓴다. must are는 틀린 형태다. being·been도 조동사 바로 뒤에 올 수 없다.", difficulty: "easy" },
  { id: "q130", ruleId: "g13", question: "We will not ____ to finish the audit by Friday.", choices: ["can", "able", "be able", "possible"], answer: 2, explanation: "will can처럼 조동사 두 개를 연달아 쓸 수 없으므로 be able to를 쓴다. able·possible은 형용사라 be 없이 will 뒤에 올 수 없다.", difficulty: "hard" },
  { id: "q131", ruleId: "g14", question: "Renew the parking permit by Friday, ____ your vehicle will be towed.", choices: ["and", "or", "but", "nor"], answer: 1, explanation: "'명령문, or ~'는 '~해라, 그러지 않으면 ~'이라는 경고다. 뒤가 불이익이므로 or. and는 '갱신하면 견인된다'가 되어 뜻이 뒤집히고, but·nor도 경고의 뜻을 만들지 못한다.", difficulty: "medium" },
  { id: "q132", ruleId: "g14", question: "You may register online ____ by phone.", choices: ["nor", "but", "so", "or"], answer: 3, explanation: "온라인과 전화 중 하나를 고르는 선택이므로 or. nor는 앞이 부정문일 때 쓴다. but·so는 online과 by phone 사이의 선택을 나타내지 못한다.", difficulty: "easy" },
  { id: "q133", ruleId: "g14", question: "____ the sales team and the design team attended the workshop.", choices: ["Both", "Either", "Neither", "Not only"], answer: 0, explanation: "뒤에 A and B가 있으므로 짝은 Both. either는 or, neither는 nor, not only는 but also와 짝이다.", difficulty: "easy" },
  { id: "q134", ruleId: "g14", question: "The hotel offers neither breakfast ____ parking.", choices: ["or", "and", "nor", "but"], answer: 2, explanation: "neither의 짝은 nor다. neither ... or는 틀린 조합이다. and·but은 neither와 짝이 되지 않는다.", difficulty: "easy" },
  { id: "q135", ruleId: "g14", question: "Not only the menu ____ also the service has improved.", choices: ["and", "but", "or", "nor"], answer: 1, explanation: "not only A but also B. also 앞에는 but이 온다. and·or·nor는 not only와 짝이 되지 않는다.", difficulty: "medium" },
  { id: "q136", ruleId: "g14", alsoRuleIds: ["g02"], question: "Neither the director nor the board members ____ available this afternoon.", choices: ["is", "was", "has been", "are"], answer: 3, explanation: "neither A nor B는 동사를 B에 맞춘다. B인 the board members가 복수이므로 are. 나머지는 모두 단수형이다.", difficulty: "hard" },
  { id: "q137", ruleId: "g14", question: "Please print the form, sign it, ____ return it to reception.", choices: ["and", "but", "or", "nor"], answer: 0, explanation: "인쇄 → 서명 → 제출로 이어지는 같은 방향의 동작이므로 and. 셋 이상을 나열하면 마지막 항목 앞에 and를 쓴다. but·or·nor는 이어지는 동작을 반대·선택·부정으로 바꾼다.", difficulty: "medium" },
  { id: "q138", ruleId: "g14", question: "Both the Seoul office ____ the Busan office will close early.", choices: ["or", "nor", "and", "but"], answer: 2, explanation: "both의 짝은 and다. or·nor·but은 both와 짝이 되지 않는다.", difficulty: "easy" },
  { id: "q139", ruleId: "g14", alsoRuleIds: ["g02"], question: "Both the elevator and the main entrance ____ been inspected.", choices: ["has", "have", "was", "is"], answer: 1, explanation: "both A and B는 항상 복수 취급한다. 그래서 have been inspected. has·was·is는 단수형이고, was·is는 been과도 어울리지 않는다.", difficulty: "medium" },
  { id: "q140", ruleId: "g14", question: "Either the morning session ____ the afternoon session is fine with me.", choices: ["nor", "and", "but", "or"], answer: 3, explanation: "either의 짝은 or다. 동사 is는 B(the afternoon session, 단수)에 맞춘 것이다. nor·and·but은 either와 짝이 되지 않는다.", difficulty: "medium" },
  { id: "q141", ruleId: "g05", question: "The committee suggested ____ the meeting to Friday.", choices: ["move", "to move", "moving", "moves"], answer: 2, explanation: "suggest 뒤에는 -ing가 온다. suggest to + 동사원형으로는 쓰지 않는다. move·moves는 suggested 바로 뒤에서 동사가 겹친다.", difficulty: "medium" },
  { id: "q142", ruleId: "g05", question: "We decided ____ a second supplier this year.", choices: ["adding", "to add", "add", "adds"], answer: 1, explanation: "decide 뒤에는 to부정사가 온다. adding은 decide가 받지 않고, add·adds는 동사가 겹친다.", difficulty: "easy" },
  { id: "q143", ruleId: "g05", question: "She is responsible for ____ new employees.", choices: ["train", "to train", "trains", "training"], answer: 3, explanation: "전치사 for 뒤에 동사가 오면 -ing다. to train은 전치사 뒤에 to부정사를 쓴 오답이고, train·trains는 전치사 뒤에 올 수 없다.", difficulty: "easy" },
  { id: "q144", ruleId: "g05", question: "The union is strongly opposed to ____ the shift schedule.", choices: ["changing", "change", "to change", "changes"], answer: 0, explanation: "be opposed to의 to는 전치사라서 뒤에 -ing가 온다. to change를 고르면 틀린다. change·changes는 전치사 뒤에 올 수 없다.", difficulty: "hard" },
  { id: "q145", ruleId: "g05", question: "The manager avoided ____ the question directly.", choices: ["to answer", "answers", "answering", "answer"], answer: 2, explanation: "avoid 뒤에는 -ing가 온다. to answer는 avoid가 받지 않고, answers·answer는 동사가 겹친다.", difficulty: "easy" },
  { id: "q146", ruleId: "g05", question: "Our team is committed to ____ response times.", choices: ["improve", "improves", "to improve", "improving"], answer: 3, explanation: "be committed to의 to는 전치사라서 뒤에 -ing가 온다. to improve는 이 to를 to부정사로 착각한 오답이고, improve·improves는 전치사 뒤에 올 수 없다.", difficulty: "hard" },
  { id: "q147", ruleId: "g05", question: "Please remember ____ the attachment before you send the email.", choices: ["including", "to include", "include", "included"], answer: 1, explanation: "before you send는 앞으로 할 일이므로 remember to. remember -ing는 이미 한 일을 기억할 때 쓴다. include·included는 remember 바로 뒤에 올 수 없다.", difficulty: "medium" },
  { id: "q148", ruleId: "g05", question: "In addition to ____ the report, she presented the figures.", choices: ["writing", "write", "to write", "writes"], answer: 0, explanation: "in addition to의 to는 전치사라서 뒤에 -ing가 온다. to write는 이 to를 to부정사로 착각한 오답이고, write·writes는 전치사 뒤에 올 수 없다.", difficulty: "hard" },
  { id: "q149", ruleId: "g05", question: "The supplier failed ____ the parts on time.", choices: ["delivering", "deliver", "delivers", "to deliver"], answer: 3, explanation: "fail 뒤에는 to부정사가 온다. fail to = ~하지 못하다. delivering은 fail이 받지 않고, deliver·delivers는 동사가 겹친다.", difficulty: "medium" },
  { id: "q150", ruleId: "g05", question: "After ____ the contract, both sides held a short press conference.", choices: ["sign", "to sign", "signing", "signs"], answer: 2, explanation: "전치사 after 뒤에 동사가 오면 -ing다. to sign·sign·signs는 전치사 뒤에 올 수 없다.", difficulty: "easy" },
  { id: "q151", ruleId: "g10", question: "The new printer is ____ than the one we replaced.", choices: ["quiet", "quieter", "quietly", "quietest"], answer: 1, explanation: "than이 있으므로 비교급 quieter. quietest는 최상급, quietly는 부사, quiet은 원급이라 than과 맞지 않는다.", difficulty: "easy" },
  { id: "q152", ruleId: "g10", question: "Please send the files ____ soon as possible.", choices: ["as", "so", "more", "than"], answer: 0, explanation: "as soon as possible은 as + 원급 + as 구조다. 긍정문에서는 so ~ as를 쓰지 않는다. more·than은 as ~ as 구조를 만들지 못한다.", difficulty: "easy" },
  { id: "q153", ruleId: "g10", question: "The Busan office is ____ branch in the country.", choices: ["larger", "large", "the largest", "largely"], answer: 2, explanation: "in the country라는 범위가 있고 그중 하나를 고르므로 the + 최상급. larger는 비교급이라 than이 필요하고 관사도 없으며, large는 관사가 없고, largely는 부사다.", difficulty: "medium" },
  { id: "q154", ruleId: "g10", question: "Shipping by rail is ____ cheaper than shipping by air.", choices: ["very", "more", "so", "much"], answer: 3, explanation: "비교급 강조는 much·far·even·still·a lot이다. very는 비교급을 강조하지 못하고, more cheaper는 비교급을 겹쳐 쓴 것이다.", difficulty: "hard" },
  { id: "q155", ruleId: "g10", question: "Sales this quarter were twice ____ high as last quarter.", choices: ["as", "than", "so", "more"], answer: 0, explanation: "배수 + as + 원급 + as 구조다. than·more는 as와 짝이 맞지 않고, so ~ as는 긍정문에 쓰지 않는다.", difficulty: "medium" },
  { id: "q156", ruleId: "g10", question: "Of the three proposals, the second one was the ____ detailed.", choices: ["more", "most", "much", "very"], answer: 1, explanation: "Of the three(셋 중)와 the가 있으므로 최상급. 긴 단어는 most를 쓴다. the more는 둘 중 하나를 고를 때 쓴다. much·very는 최상급을 만들지 못한다.", difficulty: "medium" },
  { id: "q157", ruleId: "g10", question: "This model is ____ to install than the previous version.", choices: ["easy", "easily", "easiest", "easier"], answer: 3, explanation: "than이 있으므로 비교급. easy의 비교급은 easier. easiest는 최상급, easily는 부사라 be동사 뒤에 올 수 없고, easy는 원급이라 than과 맞지 않는다.", difficulty: "easy" },
  { id: "q158", ruleId: "g10", question: "Of all our branches, our ____ performer this year was the Daegu office.", choices: ["good", "better", "best", "well"], answer: 2, explanation: "Of all(전체 중)이 있으니 최상급 best. 소유격 our가 있어 the는 쓰지 않는다. better는 둘을 비교할 때, good은 원급이라 Of all과 맞지 않고, well은 부사라 명사 performer를 꾸미지 못한다.", difficulty: "medium" },
  { id: "q159", ruleId: "g10", question: "The report was ____ more detailed than we expected.", choices: ["far", "very", "too", "as"], answer: 0, explanation: "비교급 more detailed를 강조하는 자리다. far는 되지만 very는 비교급을 강조하지 못한다. too·as도 비교급을 강조하지 못한다.", difficulty: "hard" },
  { id: "q160", ruleId: "g10", question: "Attendance at this year's fair was the ____ in a decade.", choices: ["higher", "highest", "high", "highly"], answer: 1, explanation: "the와 in a decade(기간 범위)가 있으므로 최상급 highest. higher는 비교급이라 than이 필요하고, high는 원급, highly는 부사다.", difficulty: "medium" },
  { id: "q161", ruleId: "g15", question: "Please review the ____ document before the meeting.", choices: ["attach", "attached", "attachment", "attaching"], answer: 1, explanation: "문서는 첨부되는 쪽이므로 p.p. attached. attachment는 명사라 명사 document 앞의 꾸밈말 자리에 맞지 않는다. attach는 동사이고, attaching은 '첨부하는'이라 문서가 무엇을 첨부하는 것이 된다.", difficulty: "easy" },
  { id: "q162", ruleId: "g15", question: "The ____ demand for electric vehicles surprised analysts.", choices: ["grow", "grown", "grew", "growing"], answer: 3, explanation: "수요가 늘어나는 쪽이므로 -ing. grow는 '늘다'라는 자동사라 p.p.(grown)로 명사를 꾸미지 않는다. grow·grew는 동사라 명사 앞 꾸밈 자리에 오지 않는다.", difficulty: "medium" },
  { id: "q163", ruleId: "g15", question: "All applications ____ after Friday will not be considered.", choices: ["received", "receive", "receiving", "receives"], answer: 0, explanation: "지원서는 접수되는 쪽이므로 p.p. 명사 뒤에서 꾸미는 (which are) received가 줄어든 형태다. 문장의 동사는 will not be considered다. receiving은 지원서가 무엇을 받는 것이 되고, receive·receives는 동사가 겹친다.", difficulty: "medium" },
  { id: "q164", ruleId: "g15", question: "The employees ____ the workshop should meet in Room 2.", choices: ["attend", "attended", "attending", "attends"], answer: 2, explanation: "직원이 참석하는 쪽이고 뒤에 목적어 the workshop이 있으므로 -ing. 문장의 동사는 should meet이라 attended를 동사로 쓸 수 없다. attend·attends도 동사가 겹친다.", difficulty: "medium" },
  { id: "q165", ruleId: "g15", question: "____ by heavy rain, the outdoor event was moved indoors.", choices: ["Affecting", "Affected", "To affect", "Affect"], answer: 1, explanation: "주절의 주어 the outdoor event가 비의 영향을 받는 쪽이고 뒤에 by가 있으므로 p.p.로 시작하는 분사구문이다. Affecting은 행사가 무엇에 영향을 주는 것이 되고, To affect·Affect는 by heavy rain과 어울리지 않는다.", difficulty: "hard" },
  { id: "q166", ruleId: "g15", question: "The presentation was ____, so several people left early.", choices: ["bore", "bored", "bores", "boring"], answer: 3, explanation: "발표(일)가 지루함을 주는 쪽이므로 -ing. bored는 지루함을 느끼는 사람에게 쓴다. bore·bores는 동사라 was 뒤에 올 수 없다.", difficulty: "easy" },
  { id: "q167", ruleId: "g15", question: "Customers were ____ with the quick repair.", choices: ["satisfied", "satisfy", "satisfying", "satisfaction"], answer: 0, explanation: "고객(사람)이 만족을 느끼는 쪽이므로 p.p. be satisfied with ~. satisfying은 고객이 만족을 주는 쪽이 되고, satisfy는 동사, satisfaction은 명사라 were ~ with 구조에 맞지 않는다.", difficulty: "easy" },
  { id: "q168", ruleId: "g15", question: "The report ____ last week contains the final figures.", choices: ["submit", "submitting", "submitted", "submits"], answer: 2, explanation: "보고서는 제출되는 쪽이고 뒤에 목적어가 없으므로 p.p. 문장의 동사는 contains다. submitting은 보고서가 제출하는 쪽이 되고, submit·submits는 동사가 겹친다.", difficulty: "medium" },
  { id: "q169", ruleId: "g15", question: "____ the budget cuts, the department postponed hiring.", choices: ["Given", "Giving", "Give", "To give"], answer: 0, explanation: "Given + 명사는 '~을 고려하면'이라는 뜻으로 전치사처럼 굳은 표현이다. 그래서 주절의 주어와 맞추는 분사구문 규칙을 따르지 않는다. Giving·Give·To give는 '~을 고려하면'이라는 뜻을 만들지 못한다.", difficulty: "hard" },
  { id: "q170", ruleId: "g15", question: "We expect ____ results from the new campaign.", choices: ["encourage", "encouraged", "encouragement", "encouraging"], answer: 3, explanation: "결과(일)가 고무적인 쪽이므로 -ing. 감정 동사는 사물·일에 -ing를 쓴다. encouraged는 감정을 느끼는 사람에게 쓰고, encourage는 동사, encouragement는 명사라 results 앞에 오지 않는다.", difficulty: "medium" },
  { id: "q171", ruleId: "g16", question: "____ applicants submitted their résumés before the deadline.", choices: ["Much", "Every", "Many", "A little"], answer: 2, explanation: "applicants는 셀 수 있는 복수 명사이므로 many. much·a little은 셀 수 없는 명사에, every는 단수 명사에 붙는다.", difficulty: "easy" },
  { id: "q172", ruleId: "g16", question: "There is not ____ time left before the deadline.", choices: ["many", "much", "few", "several"], answer: 1, explanation: "time은 셀 수 없는 명사이므로 much. many·few·several은 셀 수 있는 복수 명사에 붙는다.", difficulty: "easy" },
  { id: "q173", ruleId: "g16", question: "____ employee must complete the safety training.", choices: ["All", "Many", "Few", "Each"], answer: 3, explanation: "빈칸 뒤 employee가 단수 명사이므로 each. all·many·few는 셀 수 있는 명사라면 복수형에 붙는다 (all employees).", difficulty: "easy" },
  { id: "q174", ruleId: "g16", question: "Only ____ of the rooms are still available, so book early.", choices: ["a few", "a little", "much", "every"], answer: 0, explanation: "rooms는 셀 수 있는 복수이므로 a few. only a few = 몇 개밖에 안 되는. every는 of와 함께 쓰지 않는다. a little·much는 셀 수 없는 명사에 쓴다.", difficulty: "medium" },
  { id: "q175", ruleId: "g16", question: "A number of packages ____ damaged during shipping.", choices: ["was", "is", "were", "has"], answer: 2, explanation: "a number of(많은) + 복수 명사는 복수 동사를 쓴다. was·is·has는 단수형이다.", difficulty: "medium" },
  { id: "q176", ruleId: "g16", question: "____ number of employees have asked about the new parking policy.", choices: ["The", "A", "Much", "Every"], answer: 1, explanation: "동사 have가 복수이므로 a number of(많은). the number of는 '수 그 자체'라서 단수 동사(has)를 쓴다.", difficulty: "hard" },
  { id: "q177", ruleId: "g16", question: "We received ____ information about the delay.", choices: ["few", "many", "several", "little"], answer: 3, explanation: "information은 셀 수 없는 명사이므로 little. '거의 받지 못했다'는 뜻이 된다. few·many·several은 셀 수 있는 복수 명사에 붙는다.", difficulty: "medium" },
  { id: "q178", ruleId: "g16", question: "____ of the two proposals meets our budget.", choices: ["Neither", "Both", "Many", "Few"], answer: 0, explanation: "of the two(둘 중)와 단수 동사 meets가 있으므로 neither. both는 복수 동사(meet)를 쓴다. 뒤에 nor가 없으므로 상관 접속사가 아니다.", difficulty: "medium" },
  { id: "q179", ruleId: "g16", question: "____ of the new machines has its own manual.", choices: ["Many", "Each", "Both", "Few"], answer: 1, explanation: "동사 has와 its가 단수이므로 each. each of the + 복수 명사는 단수 동사를 쓴다.", difficulty: "medium" },
  { id: "q180", ruleId: "g16", alsoRuleIds: ["g10"], question: "There were ____ complaints last month than this month.", choices: ["few", "less", "fewer", "little"], answer: 2, explanation: "than이 있어 비교급이고, complaints는 셀 수 있는 명사이므로 fewer. less는 셀 수 없는 명사에 쓴다. few·little은 원급이라 than과 쓰지 않는다. 구어에서 less complaints도 들리지만 토익은 fewer를 정답으로 낸다.", difficulty: "medium" }
];
