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
  },
  {
    id: "r04", order: 4, title: "광고 · 구인 공고",
    oneLine: "required(필수)와 preferred(우대)를 구분해서 읽어라.",
    points: [
      "구인 공고는 직무 → 자격 요건 → 혜택 → 지원 방법 순서로 고정되어 있다.",
      "required(필수)와 preferred(우대)를 반드시 구분한다. 문제의 단골이다.",
      "마감일과 제출 서류는 거의 항상 문제로 나온다.",
      "광고는 할인율, 기간, 조건(회원 전용 등)에 표시하며 읽는다."
    ],
    trap: "preferred는 '있으면 좋다'는 뜻이지 필수가 아니다. required와 바꿔서 오답 선택지를 만든다.",
    example: "preferred but not required → 정답 선택지는 '우대 사항'이지 '자격 요건'이 아니다."
  },
  {
    id: "r05", order: 5, title: "기사 · 보도자료",
    oneLine: "첫 문단이 기사 전체의 요약이다.",
    points: [
      "영어 기사는 첫 문단에 누가·무엇을·언제·왜가 다 들어 있다.",
      "따옴표 안의 말은 인물의 발언이다. 누가 한 말인지 확인한다.",
      "숫자(연도, 인원, 규모)는 표시해 두면 바로 찾을 수 있다.",
      "마지막 문단은 앞으로의 계획인 경우가 많다."
    ],
    trap: "인물의 발언을 사실과 혼동하지 마라. '~라고 말했다'는 그 사람의 주장일 뿐이다.",
    example: "\"We ran out of space.\" → 확장 이유를 묻는 문제의 근거가 된다."
  },
  {
    id: "r06", order: 6, title: "이중 지문 (연계 문제)",
    oneLine: "두 지문을 모두 봐야 풀리는 문제가 반드시 하나 있다.",
    points: [
      "지문이 둘이면 보통 3~5문제 중 1~2문제가 연계 문제다.",
      "연계 문제는 한 지문의 정보를 다른 지문에서 찾아 연결해야 한다.",
      "먼저 두 지문의 관계를 파악한다. 이메일 + 일정표, 공고 + 신청서 같은 조합이다.",
      "한 지문만 보고 답이 바로 나오면 그 문제는 연계 문제가 아니다."
    ],
    trap: "첫 지문에서 답을 못 찾았다고 당황하지 마라. 두 번째 지문에 있는 경우가 많다.",
    example: "이메일에서 '화요일 워크숍을 추천한다' → 일정표에서 화요일 항목을 찾아야 답이 나온다."
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
  },
  {
    id: "rp04", type: "구인 공고", title: "마케팅 코디네이터 채용", strategyId: "r04", recommendedSec: 120,
    header: ["Now Hiring — Marketing Coordinator", "Harbor Media Group"],
    sentences: [
      { en: "Harbor Media Group is seeking a full-time Marketing Coordinator for our Seattle office.", ko: "하버 미디어 그룹은 시애틀 사무소에서 근무할 정규직 마케팅 코디네이터를 찾고 있습니다." },
      { en: "The successful candidate will manage social media accounts, prepare monthly reports, and assist with campaign planning.", ko: "합격자는 소셜 미디어 계정을 관리하고, 월간 보고서를 작성하며, 캠페인 기획을 지원하게 됩니다." },
      { en: "A bachelor's degree and at least two years of marketing experience are required.", ko: "학사 학위와 최소 2년의 마케팅 경력이 필수입니다." },
      { en: "Experience with data analysis tools is preferred but not required.", ko: "데이터 분석 도구 사용 경험은 우대하지만 필수는 아닙니다." },
      { en: "We offer competitive pay, health benefits, and a flexible work schedule.", ko: "경쟁력 있는 급여, 건강 보험, 유연 근무제를 제공합니다." },
      { en: "To apply, send your resume and cover letter to careers@harbormedia.com by May 20.", ko: "지원하시려면 5월 20일까지 이력서와 자기소개서를 careers@harbormedia.com으로 보내주세요." },
      { en: "Only candidates selected for an interview will be contacted.", ko: "면접 대상자에게만 개별 연락드립니다." }
    ],
    vocab: [
      { w: "seek", m: "찾다, 구하다" },
      { w: "successful candidate", m: "합격자" },
      { w: "required", m: "필수인" },
      { w: "preferred", m: "우대하는" },
      { w: "competitive pay", m: "경쟁력 있는 급여" },
      { w: "flexible", m: "유연한" }
    ],
    questions: [
      { q: "What is required for the position?", choices: ["A graduate degree", "Two years of marketing experience", "Experience with data analysis", "Fluency in two languages"], answer: 1, explanation: "at least two years of marketing experience are required. 학사 학위와 2년 경력이 필수다." },
      { q: "What is mentioned as preferred?", choices: ["A bachelor's degree", "Experience with data analysis tools", "Previous management experience", "Willingness to travel"], answer: 1, explanation: "Experience with data analysis tools is preferred but not required. preferred와 required를 구분해야 한다." },
      { q: "What should applicants send?", choices: ["A resume only", "A resume and a cover letter", "References and a portfolio", "An application form"], answer: 1, explanation: "send your resume and cover letter. 제출 서류는 반드시 문제로 나온다." }
    ]
  },
  {
    id: "rp05", type: "기사", title: "지역 베이커리 확장", strategyId: "r05", recommendedSec: 120,
    header: ["Local Bakery Expands to Second Location"],
    sentences: [
      { en: "Rosewood Bakery will open a second shop on Pine Avenue next month, owner Elena Marsh announced Tuesday.", ko: "로즈우드 베이커리가 다음 달 파인 애비뉴에 2호점을 연다고 소유주 엘레나 마시가 화요일에 발표했습니다." },
      { en: "The original store, which opened in 2019, has seen steady growth in demand for its bread and pastries.", ko: "2019년에 문을 연 1호점은 빵과 페이스트리 수요가 꾸준히 늘어왔습니다." },
      { en: "\"We simply ran out of space,\" Marsh said.", ko: "\"공간이 부족했을 뿐입니다\"라고 마시는 말했습니다." },
      { en: "\"Customers were waiting outside on weekends.\"", ko: "\"주말에는 손님들이 밖에서 기다리셨어요.\"" },
      { en: "The new location will be twice the size of the current one and will include seating for forty people.", ko: "새 매장은 현재의 두 배 규모이며 40석의 좌석을 갖출 예정입니다." },
      { en: "Marsh plans to hire about fifteen additional staff members before the opening.", ko: "마시는 개업 전에 약 15명의 직원을 추가로 채용할 계획입니다." },
      { en: "The bakery will continue to operate both locations year-round.", ko: "베이커리는 두 매장을 연중 계속 운영할 예정입니다." }
    ],
    vocab: [
      { w: "expand", m: "확장하다" },
      { w: "steady", m: "꾸준한" },
      { w: "run out of", m: "~이 떨어지다, 부족하다" },
      { w: "twice the size", m: "두 배 크기" },
      { w: "additional", m: "추가의" },
      { w: "year-round", m: "연중 내내" }
    ],
    questions: [
      { q: "What is the purpose of the article?", choices: ["To review a restaurant", "To announce a business expansion", "To advertise a job opening", "To report a closure"], answer: 1, explanation: "첫 문단에 2호점 개점 발표가 나온다. 기사는 첫 문단이 전체 요약이다." },
      { q: "Why did the bakery decide to expand?", choices: ["Rent increased", "The current space was too small", "A competitor closed", "Customers requested new products"], answer: 1, explanation: "We simply ran out of space. 소유주의 발언이 근거다." },
      { q: "What does Ms. Marsh plan to do before the opening?", choices: ["Renovate the original store", "Hire more staff", "Change the menu", "Move the headquarters"], answer: 1, explanation: "plans to hire about fifteen additional staff members before the opening." }
    ]
  },
  {
    id: "rp06", type: "이중 지문", title: "교육 일정 안내", strategyId: "r06", recommendedSec: 180,
    parts: [
      {
        label: "지문 1 — 이메일",
        header: ["From: Tom Reed", "To: Yuna Seo", "Subject: Training Schedule"],
        sentences: [
          { en: "Hi Yuna,", ko: "유나 씨께," },
          { en: "Here is the training schedule for next week.", ko: "다음 주 교육 일정을 보내드립니다." },
          { en: "Please note that the session on data security has been moved from Tuesday to Thursday.", ko: "데이터 보안 교육이 화요일에서 목요일로 변경된 점 참고해 주세요." },
          { en: "If you can only attend one session, I recommend the customer service workshop, since it covers the new ticketing system.", ko: "한 과정만 들으실 수 있다면 고객 서비스 워크숍을 추천합니다. 새 티켓 시스템을 다루기 때문입니다." },
          { en: "Let me know which sessions you plan to attend by Friday.", ko: "금요일까지 어떤 과정에 참석하실지 알려주세요." },
          { en: "Best, Tom", ko: "감사합니다, 톰 드림" }
        ]
      },
      {
        label: "지문 2 — 교육 일정표",
        header: ["Training Schedule — Week of June 8"],
        sentences: [
          { en: "Monday 10:00 — Company Overview (Room A)", ko: "월요일 10:00 — 회사 개요 (A룸)" },
          { en: "Tuesday 14:00 — Customer Service Workshop (Room B)", ko: "화요일 14:00 — 고객 서비스 워크숍 (B룸)" },
          { en: "Wednesday 10:00 — Software Basics (Room A)", ko: "수요일 10:00 — 소프트웨어 기초 (A룸)" },
          { en: "Thursday 14:00 — Data Security (Room C)", ko: "목요일 14:00 — 데이터 보안 (C룸)" }
        ]
      }
    ],
    vocab: [
      { w: "session", m: "교육 과정, 시간" },
      { w: "be moved from A to B", m: "A에서 B로 변경되다" },
      { w: "attend", m: "참석하다" },
      { w: "cover", m: "다루다, 포함하다" },
      { w: "overview", m: "개요" }
    ],
    questions: [
      { q: "What change does Tom mention?", choices: ["A session was canceled", "A session was moved to a different day", "A room was changed", "A new session was added"], answer: 1, explanation: "the session on data security has been moved from Tuesday to Thursday." },
      { q: "Which day should Yuna attend if she can only choose one session?", choices: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 1, explanation: "연계 문제다. 이메일에서 고객 서비스 워크숍을 추천했고, 일정표에서 그 과정은 화요일이다. 두 지문을 연결해야 답이 나온다." },
      { q: "Where will the data security session be held?", choices: ["Room A", "Room B", "Room C", "Room D"], answer: 2, explanation: "일정표의 Thursday 14:00 — Data Security (Room C)." }
    ]
  }
];
