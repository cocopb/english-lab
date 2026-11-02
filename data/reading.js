window.READING_STRATEGY = [
  {
    id: "r01", order: 1, title: "이메일 · 편지",
    oneLine: "목적은 첫 문단, 요청은 마지막 문단에 있다.",
    points: [
      "상단 From / To / Subject를 먼저 읽는다. Subject가 글의 주제다.",
      "첫 문단에 'I am writing to ~'가 나오면 그게 목적이다. 목적 문제의 답이 여기 있다.",
      "마지막 문단의 please, could you, if you ~ 는 요청 사항이다.",
      "날짜와 숫자에 동그라미를 쳐라. 반드시 문제로 나온다."
    ],
    trap: "선택지에 지문의 단어가 그대로 나오면 오히려 오답인 경우가 많다. 토익은 같은 뜻을 다른 말로 바꿔서 정답을 만든다.",
    example: "지문: delayed by three business days → 정답 선택지: The shipment will arrive later than planned."
  },
  {
    id: "r02", order: 2, title: "공지 · 안내문",
    oneLine: "언제·어디서·누가 대상인지 세 가지만 찾으면 된다.",
    points: [
      "제목(NOTICE, ANNOUNCEMENT)과 첫 줄에 무슨 일인지 다 나온다.",
      "기간, 장소, 대상자를 표시하며 읽는다. 문제의 80%가 이 셋이다.",
      "During this period, Please use, should 같은 표현 뒤에 지시 사항이 온다.",
      "맨 아래 연락처와 내선번호도 문제로 나온다."
    ],
    trap: "기간이 두 개 나오면 혼동하도록 낸다. 공사 기간과 영업 시간처럼 성격이 다른 날짜를 구분해서 읽어라.",
    example: "closed from June 3 through June 14 → 약 2주간"
  },
  {
    id: "r03", order: 3, title: "문자 · 채팅",
    oneLine: "대화 흐름을 따라가고, 의도 파악 문제에 대비한다.",
    points: [
      "짧은 대화지만 시간 표시(9:12 a.m.)가 있고 순서가 중요하다.",
      "'~시에 X가 Will do라고 한 의도는?' 유형이 반드시 나온다.",
      "의도 파악은 그 말 자체가 아니라 바로 앞 문장을 봐야 답이 나온다.",
      "Got it, Will do, Sure thing 같은 짧은 응답은 앞의 요청을 수락한 것이다."
    ],
    trap: "의도 파악 문제에서 그 표현의 사전적 의미를 고르면 틀린다. 문맥에서 무엇에 동의했는지를 골라야 한다.",
    example: "\"Will do.\" → 사전적으로는 '그렇게 하겠다'지만, 정답은 '일찍 출발하는 데 동의했다'처럼 구체적이어야 한다."
  }
];

window.PASSAGES = [
  {
    id: "rp01", type: "이메일", title: "배송 지연 안내", strategyId: "r01", recommendedSec: 120,
    header: [
      "From: Daniel Cho <d.cho@brightsupply.com>",
      "To: Ms. Laura Kim",
      "Subject: Order #4821 — Shipping Update"
    ],
    sentences: [
      { en: "Dear Ms. Kim,", ko: "김 선생님께," },
      { en: "Thank you for your recent order.", ko: "최근 주문해 주셔서 감사합니다." },
      { en: "I am writing to let you know that your shipment will be delayed by three business days.", ko: "배송이 영업일 기준 3일 지연될 예정임을 알려드리고자 메일을 드립니다." },
      { en: "Our warehouse is currently moving to a larger facility, and this has slowed down our processing times.", ko: "저희 창고가 현재 더 큰 시설로 이전 중이어서 처리 시간이 지연되고 있습니다." },
      { en: "Your order is now scheduled to arrive on March 14 instead of March 11.", ko: "주문하신 물품은 3월 11일이 아닌 3월 14일에 도착할 예정입니다." },
      { en: "To apologize for the inconvenience, we have added a 10 percent discount to your next purchase.", ko: "불편을 끼쳐드린 데 사과드리며, 다음 구매 시 10퍼센트 할인을 적용해 드렸습니다." },
      { en: "If you need the items sooner, please reply to this message and we will arrange express delivery at no extra charge.", ko: "더 빨리 받으셔야 한다면 이 메일에 회신해 주세요. 추가 비용 없이 특급 배송을 준비해 드리겠습니다." },
      { en: "Best regards,", ko: "감사합니다," },
      { en: "Daniel Cho, Customer Service, Bright Supply", ko: "대니얼 조, 고객 서비스, 브라이트 서플라이" }
    ],
    vocab: [
      { w: "shipment", m: "배송품, 배송" },
      { w: "business day", m: "영업일" },
      { w: "warehouse", m: "창고" },
      { w: "facility", m: "시설" },
      { w: "inconvenience", m: "불편" },
      { w: "at no extra charge", m: "추가 비용 없이" }
    ],
    questions: [
      { q: "Why was the email written?", choices: ["To explain a shipping delay", "To confirm a new order", "To request a payment", "To announce a new product"], answer: 0, explanation: "세 번째 문장 I am writing to let you know that your shipment will be delayed가 목적이다. 이메일은 목적이 첫 문단에 나온다." },
      { q: "What caused the delay?", choices: ["Bad weather", "A warehouse relocation", "A payment problem", "A staff shortage"], answer: 1, explanation: "Our warehouse is currently moving to a larger facility. moving을 relocation으로 바꿔 표현했다." },
      { q: "What is offered to Ms. Kim?", choices: ["A full refund", "A free sample", "A discount on a future order", "A replacement item"], answer: 2, explanation: "a 10 percent discount to your next purchase. next purchase를 future order로 바꿔 표현했다." }
    ]
  },
  {
    id: "rp02", type: "공지", title: "로비 공사 안내", strategyId: "r02", recommendedSec: 100,
    header: ["NOTICE — Lobby Renovation"],
    sentences: [
      { en: "The main lobby will be closed for renovation from Monday, June 3 through Friday, June 14.", ko: "중앙 로비는 6월 3일 월요일부터 6월 14일 금요일까지 공사로 폐쇄됩니다." },
      { en: "During this period, please use the side entrance on Oak Street.", ko: "이 기간 동안에는 오크 가 쪽 측면 출입구를 이용해 주세요." },
      { en: "The elevators will operate as usual, but the reception desk will be temporarily moved to the second floor.", ko: "엘리베이터는 평소대로 운행되지만, 안내 데스크는 2층으로 임시 이전됩니다." },
      { en: "Visitors should check in there before proceeding.", ko: "방문객은 그곳에서 접수한 뒤 이동해 주시기 바랍니다." },
      { en: "We apologize for any inconvenience.", ko: "불편을 끼쳐 죄송합니다." },
      { en: "Questions may be directed to the building manager at extension 215.", ko: "문의 사항은 내선 215번 건물 관리자에게 연락해 주세요." }
    ],
    vocab: [
      { w: "renovation", m: "보수, 개조" },
      { w: "entrance", m: "출입구" },
      { w: "temporarily", m: "임시로" },
      { w: "reception desk", m: "안내 데스크" },
      { w: "extension", m: "내선번호" }
    ],
    questions: [
      { q: "How long will the lobby be closed?", choices: ["Three days", "About two weeks", "One month", "Until further notice"], answer: 1, explanation: "June 3부터 June 14까지는 약 2주다. 날짜 계산 문제는 반드시 나온다." },
      { q: "Where should visitors check in?", choices: ["At the main lobby", "On Oak Street", "On the second floor", "At the building manager's office"], answer: 2, explanation: "the reception desk will be temporarily moved to the second floor, 그리고 Visitors should check in there." }
    ]
  },
  {
    id: "rp03", type: "문자", title: "고객 미팅 변경", strategyId: "r03", recommendedSec: 90,
    header: ["Text Message Chain"],
    sentences: [
      { en: "Ji-woo Park (9:12 a.m.): Are we still meeting the client at eleven?", ko: "박지우 (오전 9:12): 고객이랑 11시에 만나는 거 그대로죠?" },
      { en: "Mark Evans (9:14 a.m.): Yes, but the location changed. They want to meet at their office instead.", ko: "마크 에반스 (오전 9:14): 네, 그런데 장소가 바뀌었어요. 그쪽 사무실에서 보자고 하네요." },
      { en: "Ji-woo Park (9:15 a.m.): Got it. Should I bring the printed samples?", ko: "박지우 (오전 9:15): 알겠습니다. 인쇄한 샘플을 가져갈까요?" },
      { en: "Mark Evans (9:17 a.m.): Please do. And could you leave a bit early? Traffic is heavy on that route.", ko: "마크 에반스 (오전 9:17): 네, 부탁해요. 그리고 조금 일찍 출발해 주시겠어요? 그 길이 많이 막혀요." },
      { en: "Ji-woo Park (9:18 a.m.): Will do. I'll head out at ten.", ko: "박지우 (오전 9:18): 그렇게 할게요. 10시에 출발하겠습니다." }
    ],
    vocab: [
      { w: "location", m: "장소, 위치" },
      { w: "instead", m: "대신에" },
      { w: "traffic is heavy", m: "교통이 혼잡하다" },
      { w: "route", m: "경로, 길" },
      { w: "head out", m: "출발하다" }
    ],
    questions: [
      { q: "What has changed about the meeting?", choices: ["The time", "The place", "The participants", "The topic"], answer: 1, explanation: "the location changed. 시간(eleven)은 그대로다." },
      { q: "At 9:18 a.m., what does Ji-woo most likely mean when she writes, \"Will do\"?", choices: ["She will cancel the meeting", "She agrees to leave earlier", "She will print more samples", "She will contact the client"], answer: 1, explanation: "바로 앞 문장이 could you leave a bit early? 이므로 일찍 출발하는 데 동의한 것이다. 의도 파악 문제는 반드시 앞 문장을 봐야 한다." }
    ]
  }
];
