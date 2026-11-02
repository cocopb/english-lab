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
  }
];

// Items: { id, ruleId, question, choices, answer, explanation, difficulty }.
window.GRAMMAR_QUIZ = [];
