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
      "Date: March 8",
      "Subject: Order #4821 — Shipping Update"
    ],
    sentences: [
      { en: "Dear Ms. Kim,", ko: "김 선생님께," },
      { en: "Thank you for your recent order.", ko: "최근 주문해 주셔서 감사합니다." },
      { en: "I am writing to let you know that your shipment will be delayed by three business days.", ko: "배송이 영업일 기준 3일 지연될 예정임을 알려드리고자 메일을 드립니다." },
      { en: "Our warehouse is currently moving to a larger facility, and this has slowed down our processing times.", ko: "저희 창고가 현재 더 큰 시설로 이전 중이어서 처리 시간이 지연되고 있습니다." },
      { en: "Your order is now scheduled to arrive on March 14 instead of March 11.", ko: "주문하신 물품은 3월 11일이 아닌 3월 14일에 도착할 예정입니다." },
      { en: "To apologize for the inconvenience, we have applied a 10 percent discount to your next purchase.", ko: "불편을 끼쳐드린 데 사과드리며, 다음 구매 시 10퍼센트 할인을 적용해 드렸습니다." },
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
      { q: "Why was the email written?", choices: ["To explain a shipping delay", "To confirm a new order", "To request a payment", "To announce a new product"], answer: 0, explanation: "근거: 세 번째 문장 I am writing to let you know that your shipment will be delayed. I am writing to 뒤가 목적이다. 오답: 새 주문 확인(B)·결제 요청(C)·신제품 안내(D)는 본문에 없다. Thank you for your recent order는 인사말일 뿐 주문 확인이 아니다." },
      { q: "What caused the delay?", choices: ["Bad weather", "A warehouse relocation", "A payment problem", "A staff shortage"], answer: 1, explanation: "근거: 네 번째 문장 Our warehouse is currently moving to a larger facility. moving을 relocation으로 바꿔 표현했다. 오답: 날씨(A)·결제 문제(C)·인력 부족(D)은 언급되지 않았다." },
      { q: "What is offered to Ms. Kim?", choices: ["A full refund", "A free sample", "A discount on a future order", "A replacement item"], answer: 2, explanation: "근거: 여섯 번째 문장 a 10 percent discount to your next purchase. next purchase를 future order로 바꿔 표현했다. 오답: 전액 환불(A)·무료 샘플(B)·교체품(D)은 제안하지 않았다. 무료 특급 배송도 제안하지만 보기에 없다." }
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
      { q: "How long will the lobby be closed?", choices: ["About two weeks", "Three days", "One month", "Until further notice"], answer: 0, explanation: "근거: 첫 문장 from Monday, June 3 through Friday, June 14. 6월 3일부터 14일까지 12일, 즉 약 2주다. 오답: 3일(B)·한 달(C)은 날짜와 맞지 않고, 끝나는 날이 정해져 있으므로 Until further notice(D)도 아니다." },
      { q: "What will visitors most likely do when they arrive during the renovation?", choices: ["Check in at the main lobby", "Wait outside for the building manager", "Enter from Oak Street and go to the second floor", "Use the stairs because the elevators are closed"], answer: 2, explanation: "추론 문제다. 근거 1: 2번째 문장 During this period, please use the side entrance on Oak Street. 근거 2: 3번째·4번째 문장 the reception desk will be temporarily moved to the second floor / Visitors should check in there. 두 곳을 합치면 오크 가 출입구로 들어와 2층에서 접수한다. 오답: 로비(A)는 폐쇄되고, 건물 관리자(B)는 문의 연락처일 뿐이며, 엘리베이터는 평소대로 운행한다(D)." }
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
      { q: "What has changed about the meeting?", choices: ["The time", "The place", "The participants", "The topic"], answer: 1, explanation: "근거: 9:14 Mark Evans의 the location changed. They want to meet at their office instead. 오답: 시간(A)은 eleven 그대로이고, 참석자(C)·주제(D)가 바뀌었다는 말은 없다." },
      { q: "At 9:18 a.m., what does Ji-woo most likely mean when she writes, \"Will do\"?", choices: ["She will cancel the meeting", "She will contact the client", "She will print more samples", "She agrees to leave earlier"], answer: 3, explanation: "의도 파악 문제다. 근거: 바로 앞 9:17 could you leave a bit early?에 대한 대답이고, 이어서 I'll head out at ten이라고 한다. 오답: 회의 취소(A)·고객 연락(B)은 나오지 않고, 샘플(C)은 더 인쇄하라는 말이 아니라 가져오라는 말이었다." }
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
      { q: "What is required for the position?", choices: ["Two years of marketing experience", "A graduate degree", "Experience with data analysis", "Fluency in two languages"], answer: 0, explanation: "근거: 세 번째 문장 A bachelor's degree and at least two years of marketing experience are required. 오답: 요구 학위는 학사이지 대학원 학위(B)가 아니고, 데이터 분석 경험(C)은 우대 사항이며, 2개 국어(D)는 언급이 없다." },
      { q: "What is mentioned as preferred?", choices: ["A bachelor's degree", "Willingness to travel", "Previous management experience", "Experience with data analysis tools"], answer: 3, explanation: "근거: 네 번째 문장 Experience with data analysis tools is preferred but not required. 오답: 학사 학위(A)는 필수 요건이고, 관리 경험(C)·출장 가능(B)은 나오지 않는다. preferred와 required를 구분해야 한다." },
      { q: "What should applicants send?", choices: ["A resume only", "References and a portfolio", "A resume and a cover letter", "An application form"], answer: 2, explanation: "근거: 여섯 번째 문장 send your resume and cover letter. 오답: 이력서만(A)은 자기소개서가 빠졌고, 추천서·포트폴리오(B)와 지원서 양식(D)은 요구하지 않았다." }
    ]
  },
  {
    id: "rp05", type: "기사", title: "지역 베이커리 확장", strategyId: "r05", recommendedSec: 120,
    header: ["Local Bakery Expands to Second Location"],
    sentences: [
      { en: "Rosewood Bakery will open a second shop on Pine Avenue next month, owner Elena Marsh announced Tuesday.", ko: "로즈우드 베이커리가 다음 달 파인 애비뉴에 2호점을 연다고 소유주 엘레나 마시가 화요일에 발표했습니다." },
      { en: "The original store, which opened in 2019, has seen steady growth in demand for its bread and pastries.", ko: "2019년에 문을 연 1호점은 빵과 페이스트리 수요가 꾸준히 늘어왔습니다.", mark: 1 },
      { en: "\"We simply ran out of space,\" Marsh said.", ko: "\"그냥 공간이 모자랐어요\"라고 마시는 말했습니다." },
      { en: "\"Customers were waiting outside on weekends.\"", ko: "\"주말에는 손님들이 밖에서 기다리셨어요.\"", mark: 2 },
      { en: "The new location will be twice the size of the current one and will include seating for forty people.", ko: "새 매장은 현재의 두 배 규모이며 40석의 좌석을 갖출 예정입니다.", mark: 3 },
      { en: "Marsh plans to hire about fifteen additional staff members before the opening.", ko: "마시는 개업 전에 약 15명의 직원을 추가로 채용할 계획입니다.", mark: 4 },
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
      { q: "What is the purpose of the article?", choices: ["To review a restaurant", "To announce a business expansion", "To advertise a job opening", "To report a closure"], answer: 1, explanation: "근거: 첫 문장 Rosewood Bakery will open a second shop ... owner Elena Marsh announced. 기사는 첫 문장이 요약이다. 오답: 식당 평가(A)가 아니고, 직원 채용(C)은 여섯 번째 문장의 세부 내용일 뿐 기사 목적이 아니며, 폐업(D)이 아니라 확장이다." },
      { q: "Why did the bakery decide to expand?", choices: ["Rent increased", "A competitor closed", "The current space was too small", "Customers requested new products"], answer: 2, explanation: "근거: 세 번째·네 번째 문장 We simply ran out of space / Customers were waiting outside on weekends. 오답: 임대료(A)·경쟁 업체(B)·신제품 요청(D)은 언급되지 않았다." },
      { q: "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong? \"These new employees will train at the original store first.\"", choices: ["[1]", "[2]", "[3]", "[4]"], answer: 3, insert: "These new employees will train at the original store first.", explanation: "문장 삽입 문제다. 연결 단서는 지시어 These new employees다. 바로 앞에 새 직원 이야기가 있어야 한다. [4] 앞 문장이 Marsh plans to hire about fifteen additional staff members before the opening이라 these new employees가 이 15명을 받는다. 오답: [1] 앞은 원래 매장의 수요 증가, [2] 앞은 손님이 밖에서 기다렸다는 인용, [3] 앞은 새 매장의 크기와 좌석 이야기라 These new employees가 가리킬 사람이 없다." }
    ]
  },
  {
    id: "rp06", type: "이중 지문", title: "교육 일정 안내", strategyId: "r06", recommendedSec: 180,
    parts: [
      {
        label: "지문 1 — 이메일",
        header: ["From: Tom Reed", "To: Yuna Seo", "Date: June 3", "Subject: Training Schedule"],
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
      { w: "ticketing system", m: "발권 시스템" },
      { w: "overview", m: "개요" }
    ],
    questions: [
      { q: "What change does Tom mention?", choices: ["A session was canceled", "A room was changed", "A session was moved to a different day", "A new session was added"], answer: 2, explanation: "근거: 이메일 세 번째 문장 the session on data security has been moved from Tuesday to Thursday. 오답: 취소(A)·추가(D)된 과정은 없고, 강의실(B)이 바뀌었다는 말도 없다." },
      { q: "Which day should Yuna attend if she can only choose one session?", choices: ["Monday", "Thursday", "Wednesday", "Tuesday"], answer: 3, explanation: "연계 문제다. 근거 1: 이메일 네 번째 문장에서 한 과정만 들을 수 있으면 고객 서비스 워크숍을 추천한다. 근거 2: 일정표에서 Customer Service Workshop은 Tuesday 14:00이다. 오답: 월요일(A)은 회사 개요, 수요일(C)은 소프트웨어 기초, 목요일(B)은 데이터 보안이다." },
      { q: "In the email, the word \"covers\" is closest in meaning to", choices: ["protects", "pays for", "includes", "hides"], answer: 2, word: "covers", part: 1, explanation: "어휘 문제다. 근거: 지문 1(이메일) 4번째 문장 I recommend the customer service workshop, since it covers the new ticketing system. 워크숍이 새 발권 시스템을 '다룬다', 즉 내용에 포함한다는 뜻이다. 오답: protects(보호하다)·pays for(비용을 대다)·hides(가리다)는 cover의 다른 뜻이라 이 문장에서는 맞지 않는다. 참고: 실제 시험에서는 '문단 2, 3행의 단어'처럼 위치를 알려준다. 이 앱은 문단·행 번호 없이 단어로만 표시하니, 형식이 달라도 당황하지 말자." }
    ]
  },
  {
    id: "rp07", type: "이메일", title: "회의 시간 변경", strategyId: "r01", recommendedSec: 140,
    header: ["From: Clara Jennings <c.jennings@vertexconsult.com>", "To: Project Team", "Date: May 11", "Subject: Thursday Meeting — Change of Plan"],
    sentences: [
      { en: "Dear team,", ko: "팀 여러분께," },
      { en: "I need to move Thursday's project review from 10 a.m. to 2 p.m.", ko: "목요일 프로젝트 검토 회의를 오전 10시에서 오후 2시로 옮겨야 합니다." },
      { en: "Our client has requested a morning call that I cannot reschedule.", ko: "고객사에서 오전 통화를 요청했는데 일정을 조정할 수 없습니다." },
      { en: "The meeting will still take place in Room 4B and should last about ninety minutes.", ko: "회의는 그대로 4B룸에서 열리며 약 90분간 진행될 예정입니다." },
      { en: "Please bring updated figures for your section.", ko: "각자 담당 부분의 최신 수치를 가져와 주세요." },
      { en: "Hana, could you also prepare a short summary of last month's survey results?", ko: "하나 씨, 지난달 설문 결과 요약본도 준비해 주시겠어요?" },
      { en: "If the new time does not work for you, let me know by Wednesday noon and I will arrange a separate briefing.", ko: "새 시간이 어려우시면 수요일 정오까지 알려주세요. 별도 보고 자리를 마련하겠습니다." },
      { en: "Thank you for your flexibility.", ko: "유연하게 협조해 주셔서 감사합니다." }
    ],
    vocab: [
      { w: "project review", m: "프로젝트 검토 회의" },
      { w: "reschedule", m: "일정을 다시 잡다" },
      { w: "take place", m: "열리다, 개최되다" },
      { w: "figures", m: "수치" },
      { w: "separate briefing", m: "별도 보고" }
    ],
    questions: [
      { q: "What is the main purpose of the email?", choices: ["To cancel a meeting", "To announce a schedule change", "To introduce a new client", "To request a report"], answer: 1, explanation: "근거: 두 번째 문장 I need to move Thursday's project review from 10 a.m. to 2 p.m. 오답: 회의는 취소(A)가 아니라 시간 변경이고, 새 고객 소개(C)는 없으며, 수치·요약을 준비하라는 부탁(D)은 덧붙인 내용일 뿐 주된 목적이 아니다." },
      { q: "Why was the meeting moved?", choices: ["The room was unavailable", "The agenda changed", "Several members are absent", "A client requested a morning call"], answer: 3, explanation: "근거: 세 번째 문장 Our client has requested a morning call that I cannot reschedule. 오답: 장소는 그대로 Room 4B라 회의실 문제(A)가 아니고, 불참자(C)·안건 변경(B)은 언급되지 않았다." },
      { q: "What is Hana asked to do?", choices: ["Book a meeting room", "Contact the client", "Prepare a summary of survey results", "Update the budget"], answer: 2, explanation: "근거: 여섯 번째 문장 Hana, could you also prepare a short summary of last month's survey results? 오답: 회의실 예약(A)·고객 연락(B)·예산 갱신(D)은 하나 씨에게 부탁한 일이 아니다." },
      { q: "What should team members do if the new time does not work?", choices: ["Send their figures by email", "Call the client directly", "Attend a different meeting", "Notify the sender by Wednesday"], answer: 3, explanation: "근거: 일곱 번째 문장 let me know by Wednesday noon. 메일을 보낸 사람에게 알리라는 뜻이다. 오답: 수치는 회의에 가져오는 것이지 메일로 보내라는 말(A)이 아니고, 별도 보고는 보낸 사람이 마련하는 것이지 다른 회의에 참석하라는 말(C)이 아니며, 고객에게 직접 전화하라는 말(B)은 없다." }
    ]
  },
  {
    id: "rp08", type: "공지", title: "주차장 포장 공사", strategyId: "r02", recommendedSec: 140,
    header: ["NOTICE — Parking Lot Resurfacing"],
    sentences: [
      { en: "The north parking lot will be resurfaced from Monday, August 4 to Friday, August 8.", ko: "북쪽 주차장은 8월 4일 월요일부터 8월 8일 금요일까지 재포장 공사를 합니다." },
      { en: "During this period, employees should park in the south lot or the garage on Elm Street.", ko: "이 기간 동안 직원은 남쪽 주차장이나 엘름 가 주차 건물을 이용해 주세요." },
      { en: "Garage parking will be free for employees who show their ID badge at the gate.", ko: "주차 건물은 입구에서 사원증을 제시하는 직원에게 무료입니다." },
      { en: "The north lot will reopen on Monday, August 11.", ko: "북쪽 주차장은 8월 11일 월요일에 다시 엽니다." },
      { en: "Please note that vehicles left in the north lot after 6 p.m. on August 1 will be towed at the owner's expense.", ko: "8월 1일 오후 6시 이후 북쪽 주차장에 남아 있는 차량은 차주 부담으로 견인됩니다." },
      { en: "Direct questions to the facilities office at extension 318.", ko: "문의 사항은 내선 318번 시설 관리실로 연락해 주세요." }
    ],
    vocab: [
      { w: "resurface", m: "(도로를) 재포장하다" },
      { w: "ID badge", m: "사원증" },
      { w: "reopen", m: "다시 열다" },
      { w: "tow", m: "견인하다" },
      { w: "at the owner's expense", m: "차주 부담으로" }
    ],
    questions: [
      { q: "What is the purpose of the notice?", choices: ["To announce that parking at the Elm Street garage will now be free", "To inform employees that a parking area will be temporarily unavailable", "To warn employees about new towing fees", "To ask employees to renew their ID badges"], answer: 1, explanation: "주제·목적 문제다. 근거: 제목 Parking Lot Resurfacing과 첫 문장 The north parking lot will be resurfaced from Monday, August 4 to Friday, August 8. 이어지는 문장은 모두 이 공사 기간의 대체 주차·재개장 날짜·주의 사항이다. 공사로 북쪽 주차장을 잠시 쓸 수 없다는 것을 알리는 공지다. 오답: (A) 차고 무료 주차는 공사 기간에 사원증을 보여 줄 때만 해당하는 일부 내용이고, now(앞으로 계속) 무료라는 말이 아니다. (C) 견인은 다섯 번째 문장에 한 번 나오는 주의 사항이고, 새 요금이라는 말은 없다. (D) 사원증은 차고 입구에서 보여 주라는 것이지 갱신하라는 말이 아니다." },
      { q: "How long will the north lot be closed?", choices: ["Three days", "One month", "Two weeks", "About one week"], answer: 3, explanation: "근거: 첫 문장 resurfaced from Monday, August 4 to Friday, August 8와 네 번째 문장 The north lot will reopen on Monday, August 11. 약 일주일이다. 오답: 공사만 5일이라 3일(A)보다 길고, 2주(C)·한 달(B)은 날짜와 맞지 않는다." },
      { q: "What is offered to employees during the closure?", choices: ["Free garage parking", "A shuttle service", "Extra break time", "A parking refund"], answer: 0, explanation: "근거: 세 번째 문장 Garage parking will be free for employees who show their ID badge. 오답: 셔틀(B)·휴식 시간(C)·주차비 환불(D)은 언급되지 않았다." },
      { q: "What will happen to vehicles left after August 1?", choices: ["They will be fined", "They will be towed", "They will be moved to the south lot", "They will be locked"], answer: 1, explanation: "근거: 다섯 번째 문장 vehicles left in the north lot after 6 p.m. on August 1 will be towed at the owner's expense. 오답: 차주가 비용을 내지만 벌금(A)이라는 말은 없고, 남쪽 주차장으로 옮긴다(C)거나 잠근다(D)는 말도 없다." }
    ]
  },
  {
    id: "rp09", type: "광고", title: "헬스장 여름 회원 모집", strategyId: "r04", recommendedSec: 110,
    header: ["SUMMER MEMBERSHIP SALE — Riverside Fitness"],
    sentences: [
      { en: "Join before July 31 and pay no registration fee.", ko: "7월 31일 전에 가입하시면 등록비가 없습니다." },
      { en: "Monthly plans start at $29 and include access to all cardio and weight equipment.", ko: "월 요금제는 29달러부터 시작하며 모든 유산소 및 웨이트 기구를 이용할 수 있습니다." },
      { en: "Group classes such as yoga and spinning are available for an extra $10 per month.", ko: "요가와 스피닝 같은 단체 수업은 월 10달러를 추가하면 이용할 수 있습니다." },
      { en: "Members who refer a friend receive one free month.", ko: "친구를 추천한 회원에게는 1개월 무료 이용권을 드립니다." },
      { en: "Visit our website or stop by the front desk to sign up.", ko: "가입은 웹사이트를 방문하시거나 프런트에 들러 주세요." },
      { en: "Offer valid at the Riverside location only.", ko: "이 혜택은 리버사이드 지점에서만 유효합니다." }
    ],
    vocab: [
      { w: "registration fee", m: "등록비" },
      { w: "access to", m: "~의 이용 권한" },
      { w: "refer", m: "추천하다, 소개하다" },
      { w: "sign up", m: "가입하다" },
      { w: "valid", m: "유효한" }
    ],
    questions: [
      { q: "What is the purpose of the advertisement?", choices: ["To announce new yoga and spinning classes", "To introduce a referral program for current members", "To promote a limited-time membership offer", "To announce the opening of a new location"], answer: 2, explanation: "주제·목적 문제다. 근거: 제목 SUMMER MEMBERSHIP SALE과 첫 문장 Join before July 31 and pay no registration fee. 7월 31일까지 가입하면 등록비가 없다는 기간 한정 회원 모집 광고다. 오답: (A) 요가·스피닝은 추가 요금이 드는 수업으로 한 번 나올 뿐 새 수업이라는 말이 없다. (B) 친구 추천 혜택은 네 번째 문장에 한 번 나오는 부가 혜택이다. (D) Riverside 지점은 할인이 적용되는 곳일 뿐 새로 연다는 말이 없다." },
      { q: "What is required to avoid the registration fee?", choices: ["Joining before July 31", "Signing a one-year contract", "Referring a friend", "Paying in cash"], answer: 0, explanation: "근거: 첫 문장 Join before July 31 and pay no registration fee. 오답: 1년 계약(B)·현금 결제(D)는 조건으로 나오지 않고, 친구 추천(C)은 등록비 면제가 아니라 한 달 무료의 조건이다." },
      { q: "What costs an additional amount?", choices: ["Weight equipment", "Locker rental", "Group classes", "Parking"], answer: 2, explanation: "근거: 세 번째 문장 Group classes ... are available for an extra $10 per month. 오답: 웨이트 기구(A)는 월 요금에 포함되고, 사물함(B)·주차(D)는 언급되지 않았다." }
    ]
  },
  {
    id: "rp10", type: "문자", title: "재고 부족 대응", strategyId: "r03", recommendedSec: 100,
    header: ["Text Message Chain"],
    sentences: [
      { en: "Owen Blake (2:05 p.m.): The supplier just called. Our order won't arrive until Friday.", ko: "오웬 블레이크 (오후 2:05): 공급업체에서 방금 전화 왔어요. 주문품이 금요일에야 도착한대요." },
      { en: "Mina Cho (2:07 p.m.): That's two days late. Do we have enough stock for the weekend?", ko: "미나 조 (오후 2:07): 이틀이나 늦네요. 주말 동안 재고가 충분한가요?" },
      { en: "Owen Blake (2:08 p.m.): Barely. We might run out by Saturday afternoon.", ko: "오웬 블레이크 (오후 2:08): 간신히요. 토요일 오후면 다 떨어질 수도 있어요." },
      { en: "Mina Cho (2:10 p.m.): Let's borrow from the downtown branch. I'll call their manager now.", ko: "미나 조 (오후 2:10): 시내 지점에서 빌려 옵시다. 제가 지금 거기 매니저에게 전화할게요." },
      { en: "Owen Blake (2:11 p.m.): Perfect. Keep me posted.", ko: "오웬 블레이크 (오후 2:11): 좋아요. 계속 알려주세요." }
    ],
    vocab: [
      { w: "supplier", m: "공급업체" },
      { w: "stock", m: "재고" },
      { w: "barely", m: "간신히, 가까스로" },
      { w: "run out", m: "다 떨어지다" },
      { w: "keep someone posted", m: "계속 소식을 알려주다" }
    ],
    questions: [
      { q: "What are the writers mainly discussing?", choices: ["Which supplier to use in the future", "Plans for a weekend sale", "How to deal with a late delivery", "Opening a new downtown branch"], answer: 2, explanation: "주제·목적 문제다. 근거: 2:05 Our order won't arrive until Friday로 시작해 재고가 주말까지 버틸지(2:07·2:08), 다른 지점에서 빌려 오자는 해결책(2:10)으로 이어진다. 늦어진 주문에 어떻게 대처할지가 대화 전체의 주제다. 오답: (A) 공급업체는 전화를 했다는 말뿐이고 바꾸자는 말이 없다. (B) 주말은 재고가 떨어질 수 있는 때로 나올 뿐 할인 행사 이야기가 아니다. (D) 시내 지점은 이미 있는 곳이고, 재고를 빌려 올 곳일 뿐이다." },
      { q: "What does Ms. Cho plan to do?", choices: ["Cancel the order", "Hire temporary staff", "Visit the supplier", "Contact another branch"], answer: 3, explanation: "근거: 2:10 Mina Cho의 Let's borrow from the downtown branch. I'll call their manager now. 오답: 주문 취소(A)·공급업체 방문(C)·임시 직원 채용(B)은 말하지 않았다." },
      { q: "At 2:11 p.m., what does Mr. Blake mean when he writes, \"Keep me posted\"?", choices: ["He wants to be updated", "He will send a package", "He will post a notice", "He wants to change the plan"], answer: 0, explanation: "의도 파악 문제다. 근거: 바로 앞 2:10에 조 씨가 다른 지점 관리자에게 전화하겠다고 했다. Keep me posted는 그 결과를 알려 달라는 말이다. 오답: post를 '부치다'(B)나 '게시하다'(C)로 읽은 함정이고, 블레이크 씨는 Perfect라고 계획에 동의했으므로 계획 변경(D)도 아니다." }
    ]
  },
  {
    id: "rp11", type: "기사", title: "신규 버스 노선 신설", strategyId: "r05", recommendedSec: 130,
    header: ["City to Add New Bus Route Next Spring"],
    sentences: [
      { en: "The city council approved funding on Monday for a new bus route connecting the east district to the central train station.", ko: "시의회가 월요일에 동부 지역과 중앙역을 잇는 신규 버스 노선 예산을 승인했습니다." },
      { en: "Residents of the east district have long complained that the area is poorly served by public transportation.", ko: "동부 지역 주민들은 오랫동안 이 지역의 대중교통이 부족하다고 불만을 제기해 왔습니다." },
      { en: "The route, numbered 42, will run every fifteen minutes during weekday rush hours and every half hour at other times.", ko: "42번으로 지정된 이 노선은 평일 혼잡 시간대에는 15분 간격으로, 그 외 시간에는 30분 간격으로 운행됩니다." },
      { en: "Construction of three new bus stops will begin in January and is expected to finish by March.", ko: "신규 정류장 세 곳의 공사는 1월에 시작해 3월까지 끝날 예정입니다." },
      { en: "Council member Rita Dole said the project will cut average commute times by about twenty minutes.", ko: "시의원 리타 돌은 이 사업으로 평균 통근 시간이 약 20분 줄어들 것이라고 말했습니다." }
    ],
    vocab: [
      { w: "city council", m: "시의회" },
      { w: "funding", m: "예산, 자금" },
      { w: "residents", m: "주민" },
      { w: "rush hour", m: "혼잡 시간대" },
      { w: "commute", m: "통근" }
    ],
    questions: [
      { q: "What is the article mainly about?", choices: ["Complaints from residents of the east district", "The renovation of the central train station", "A plan to improve public transportation", "The construction schedule for three bus stops"], answer: 2, explanation: "주제·목적 문제다. 근거: 제목 City to Add New Bus Route와 첫 문장 The city council approved funding ... for a new bus route connecting the east district to the central train station. 기사 전체가 새 버스 노선 신설 계획(운행 간격·정류장 공사·기대 효과)이다. 오답: (A) 주민 불만은 두 번째 문장에 노선을 만드는 배경으로 한 번 나온다. (B) 중앙역은 노선이 이어지는 곳일 뿐 보수 공사 이야기는 없다. (D) 정류장 공사 일정은 네 번째 문장 하나에만 해당하는 일부 내용이다." },
      { q: "In the article, the word \"run\" is closest in meaning to", choices: ["race", "manage", "extend", "operate"], answer: 3, word: "run", explanation: "어휘 문제다. 근거: 3번째 문장 The route, numbered 42, will run every fifteen minutes during weekday rush hours. 버스 노선이 15분마다 '운행한다'는 뜻이다. 오답: race(달리다)·manage(운영하다, 경영하다)·extend(뻗어 있다)는 run의 다른 뜻이다. 노선을 '경영한다'거나 '뻗어 있다'로는 '15분마다'와 이어지지 않는다. 참고: 실제 시험에서는 '문단 2, 3행의 단어'처럼 위치를 알려준다. 이 앱은 문단·행 번호 없이 단어로만 표시하니, 형식이 달라도 당황하지 말자." },
      { q: "What does Ms. Dole say about the project?", choices: ["It will create new jobs", "It will shorten commute times", "It will reduce traffic accidents", "It will cost less than expected"], answer: 1, explanation: "근거: 다섯 번째 문장 Council member Rita Dole said the project will cut average commute times by about twenty minutes. cut을 shorten으로 바꿔 표현했다. 오답: 일자리(A)·사고 감소(C)·비용(D)은 돌 의원이 말하지 않았다." }
    ]
  },
  {
    id: "rp12", type: "이중 지문", title: "채용 공고와 지원 메일", strategyId: "r06", recommendedSec: 200,
    parts: [
      {
        label: "지문 1 — 채용 공고",
        header: ["POSITION AVAILABLE — Office Administrator", "Linden Legal Group"],
        sentences: [
          { en: "Responsibilities include scheduling, filing, and client correspondence.", ko: "업무에는 일정 관리, 문서 정리, 고객 서신 처리가 포함됩니다." },
          { en: "Requirements: two years of office experience and strong written English.", ko: "자격 요건: 사무 경력 2년과 뛰어난 영문 작성 능력." },
          { en: "Applicants with experience in a legal office are preferred.", ko: "법률 사무소 근무 경험이 있는 지원자를 우대합니다." },
          { en: "Send your resume to hiring@lindenlegal.com.", ko: "이력서는 hiring@lindenlegal.com으로 보내주세요." },
          { en: "Applications close on March 15.", ko: "지원은 3월 15일에 마감됩니다." },
          { en: "Interviews will be held during the last week of March.", ko: "면접은 3월 마지막 주에 진행됩니다." }
        ]
      },
      {
        label: "지문 2 — 지원 이메일",
        header: ["From: Noor Haddad", "To: hiring@lindenlegal.com", "Date: March 9", "Subject: Office Administrator Position"],
        sentences: [
          { en: "Dear Hiring Manager,", ko: "채용 담당자님께," },
          { en: "I am writing to apply for the Office Administrator position.", ko: "사무 관리자 직책에 지원하고자 메일을 드립니다." },
          { en: "I have worked as an office assistant for three years, including one year at a small law firm.", ko: "저는 3년간 사무 보조로 일했으며, 그중 1년은 소규모 법률 사무소에서 근무했습니다." },
          { en: "I am available for an interview at any time after March 20.", ko: "3월 20일 이후에는 언제든 면접이 가능합니다." },
          { en: "My resume is attached. Thank you for your consideration.", ko: "이력서를 첨부합니다. 검토해 주셔서 감사합니다." },
          { en: "Noor Haddad", ko: "누르 하다드 드림" }
        ]
      }
    ],
    vocab: [
      { w: "responsibilities", m: "업무, 책무" },
      { w: "correspondence", m: "서신 왕래" },
      { w: "requirements", m: "자격 요건" },
      { w: "preferred", m: "우대되는" },
      { w: "available", m: "(사람이) 시간이 되는" }
    ],
    questions: [
      { q: "What is NOT listed as a responsibility of the position?", choices: ["Scheduling", "Filing", "Client correspondence", "Managing budgets"], answer: 3, explanation: "NOT 문제다. 근거: 공고 첫 문장 Responsibilities include scheduling, filing, and client correspondence. 오답: 일정 관리(A)·문서 정리(B)·고객 서신(C)은 모두 공고에 나온다. 예산 관리(D)만 언급되지 않았다." },
      { q: "What preferred qualification does Ms. Haddad have?", choices: ["A law degree", "Experience in a legal office", "Fluency in two languages", "Management experience"], answer: 1, explanation: "연계 문제다. 근거 1: 공고 세 번째 문장 Applicants with experience in a legal office are preferred. 근거 2: 이메일 세 번째 문장 including one year at a small law firm. 오답: 법학 학위(A)·2개 국어(C)·관리 경험(D)은 두 지문 어디에도 없다." },
      { q: "When will interviews take place?", choices: ["Before March 15", "On March 20", "In early April", "During the last week of March"], answer: 3, explanation: "근거: 공고 여섯 번째 문장 Interviews will be held during the last week of March. 오답: 3월 15일(A)은 지원 마감일이고, 3월 20일(B)은 하다드 씨가 면접이 가능해지는 날이다. 4월 초(C)는 언급이 없다." },
      { q: "What did Ms. Haddad include with her email?", choices: ["A writing sample", "References", "Her resume", "A portfolio"], answer: 2, explanation: "근거: 이메일 다섯 번째 문장 My resume is attached. 오답: 글쓰기 샘플(A)·추천서(B)·포트폴리오(D)는 첨부했다는 말이 없다." }
    ]
  },
  {
    id: "rp13", type: "삼중 지문", title: "워크숍 신청", strategyId: "r06", recommendedSec: 260,
    parts: [
      {
        label: "지문 1 — 공고",
        header: ["PROFESSIONAL DEVELOPMENT WORKSHOPS — Spring Series", "Northgate Business Center"],
        sentences: [
          { en: "Our spring workshops are open to all member companies.", ko: "저희 봄 워크숍은 모든 회원사에 열려 있습니다." },
          { en: "Each session lasts two hours and costs $40 per participant.", ko: "각 과정은 두 시간 진행되며 참가자 1인당 40달러입니다." },
          { en: "Members who register for three or more sessions receive a 20 percent discount.", ko: "세 과정 이상 신청한 회원은 20퍼센트 할인을 받습니다." },
          { en: "Registration closes two weeks before each session.", ko: "신청은 각 과정 2주 전에 마감됩니다." },
          { en: "To register, email training@northgatebc.org with your name and chosen sessions.", ko: "신청하시려면 성함과 선택한 과정을 적어 training@northgatebc.org로 메일 주세요." }
        ]
      },
      {
        label: "지문 2 — 일정표",
        header: ["Spring Workshop Schedule"],
        sentences: [
          { en: "March 5 — Effective Business Writing (Room 101)", ko: "3월 5일 — 효과적인 비즈니스 글쓰기 (101호)" },
          { en: "March 19 — Data Analysis Basics (Room 204)", ko: "3월 19일 — 데이터 분석 기초 (204호)" },
          { en: "April 2 — Public Speaking (Room 101)", ko: "4월 2일 — 대중 연설 (101호)" },
          { en: "April 16 — Project Management (Room 204)", ko: "4월 16일 — 프로젝트 관리 (204호)" }
        ]
      },
      {
        label: "지문 3 — 신청 이메일",
        header: ["From: Hana Suzuki", "To: training@northgatebc.org", "Date: February 12", "Subject: Workshop Registration"],
        sentences: [
          { en: "Dear Training Team,", ko: "교육팀께," },
          { en: "I would like to register for three sessions: Effective Business Writing, Public Speaking, and Project Management.", ko: "세 과정을 신청하고 싶습니다. 효과적인 비즈니스 글쓰기, 대중 연설, 프로젝트 관리입니다." },
          { en: "Could you confirm whether the discount applies to my total?", ko: "할인이 제 총액에 적용되는지 확인해 주시겠어요?" },
          { en: "I will be traveling on March 19, so I would not be able to attend that session anyway.", ko: "3월 19일에는 출장 중이라 어차피 그날 과정에는 참석할 수 없습니다." },
          { en: "Please send the invoice to our accounting department.", ko: "청구서는 저희 회계부로 보내주세요." },
          { en: "Thank you, Hana Suzuki", ko: "감사합니다. 하나 스즈키 드림" }
        ]
      }
    ],
    vocab: [
      { w: "session", m: "과정, 회차" },
      { w: "participant", m: "참가자" },
      { w: "register for", m: "~에 신청하다" },
      { w: "registration closes", m: "신청이 마감되다" },
      { w: "invoice", m: "청구서" }
    ],
    questions: [
      { q: "What is the purpose of the first notice?", choices: ["To announce a series of workshops", "To report a schedule change", "To request payment", "To introduce a new building"], answer: 0, explanation: "근거: 지문 1(공고)의 제목 PROFESSIONAL DEVELOPMENT WORKSHOPS — Spring Series와 1번째 문장 Our spring workshops are open to all member companies. 지문 1만으로 푼다. 오답: 일정 변경(B)은 어느 지문에도 없고, 결제 요청(C)은 지문 3에서 청구서를 보내 달라는 말로만 나오며, 새 건물 소개(D)는 없다." },
      { q: "In which room will Ms. Suzuki's first session be held?", choices: ["Room 410", "Room 204", "Room 305", "Room 101"], answer: 3, explanation: "연계 문제다(지문 2 + 지문 3). 근거 1: 지문 3의 2번째 문장에서 Effective Business Writing, Public Speaking, Project Management를 신청했다. 근거 2: 지문 2에서 그중 가장 빠른 것은 1번째 줄 March 5 — Effective Business Writing (Room 101)이다. 오답: 204호(B)는 Data Analysis Basics와 Project Management가 쓰고, 305호(C)·410호(A)는 일정표에 없다." },
      { q: "Which session is Ms. Suzuki NOT registering for?", choices: ["Effective Business Writing", "Data Analysis Basics", "Public Speaking", "Project Management"], answer: 1, explanation: "NOT 문제다. 근거: 지문 3의 2번째 문장에 신청한 세 과정이 나오고, Data Analysis Basics만 없다. 지문 3의 4번째 문장(3월 19일 출장)과 지문 2의 2번째 줄(3월 19일 과정)이 이유를 보여 준다. 오답: A·C·D는 모두 지문 3의 2번째 문장에서 신청했다." },
      { q: "Why is Ms. Suzuki likely to receive a discount?", choices: ["She is a new member", "She works at the center", "She paid in advance", "She registered for three sessions"], answer: 3, explanation: "연계 문제다(지문 1 + 지문 3). 근거 1: 지문 1의 3번째 문장 Members who register for three or more sessions receive a 20 percent discount. 근거 2: 지문 3의 2번째 문장에서 세 과정을 신청했다. 지문 3은 할인이 되는지 묻기만 하고 이유는 말하지 않는다. 오답: 신규 회원(A)·선결제(C)·센터 직원(B)은 어느 지문에도 없다." },
      { q: "How much will Ms. Suzuki most likely pay for her workshops?", choices: ["$32", "$120", "$96", "$128"], answer: 2, explanation: "추론 문제다. 근거 1: 지문 1의 2번째·3번째 문장 Each session ... costs $40 per participant / Members who register for three or more sessions receive a 20 percent discount. 근거 2: 지문 3의 2번째 문장에서 세 과정을 신청했다. 40달러 × 3 = 120달러에서 20퍼센트를 빼면 96달러다. 오답: 32달러(A)는 한 과정의 할인가, 120달러(B)는 할인 전 금액, 128달러(D)는 네 과정의 할인가다." }
    ]
  },
  {
    id: "rp14", type: "이메일", title: "누락된 배송품 문의", strategyId: "r01", recommendedSec: 150,
    header: ["From: Victor Nunes <v.nunes@claremont.co>", "To: orders@pinecrestfurniture.com", "Date: April 6", "Subject: Order #7742 — Missing Items"],
    sentences: [
      { en: "Dear Pinecrest Team,", ko: "파인크레스트 담당자님께," },
      { en: "We received our order this morning, but two of the six desk chairs are missing from the shipment.", ko: "오늘 아침에 주문품을 받았는데, 책상 의자 여섯 개 중 두 개가 빠져 있습니다." },
      { en: "The packing slip lists six chairs, so they may have been left at your warehouse.", ko: "포장 명세서에는 의자 여섯 개가 적혀 있으니, 창고에 남아 있을 수도 있을 것 같습니다." },
      { en: "We need all six by next Monday, when our new staff begin work.", ko: "신입 직원이 근무를 시작하는 다음 주 월요일까지 여섯 개가 모두 필요합니다." },
      { en: "If the missing chairs cannot arrive by then, please let us know so we can rent temporary seating.", ko: "그때까지 도착이 어렵다면 임시 좌석을 빌릴 수 있도록 알려주세요." },
      { en: "We would also like to confirm that the delivery fee will be adjusted.", ko: "배송비가 조정되는지도 확인하고 싶습니다." },
      { en: "Thank you for your prompt attention to this matter.", ko: "이 건을 신속히 처리해 주셔서 감사합니다." },
      { en: "Victor Nunes, Office Manager", ko: "빅터 누네스, 사무 관리자" }
    ],
    vocab: [
      { w: "shipment", m: "배송품" },
      { w: "packing slip", m: "포장 명세서" },
      { w: "warehouse", m: "창고" },
      { w: "temporary", m: "임시의" },
      { w: "adjust", m: "조정하다" }
    ],
    questions: [
      { q: "Why did Mr. Nunes write the email?", choices: ["To report missing items", "To cancel an order", "To request a catalog", "To change a delivery address"], answer: 0, explanation: "근거: 두 번째 문장 two of the six desk chairs are missing from the shipment. 오답: 주문 취소(B)·카탈로그 요청(C)·주소 변경(D)은 없다. 이메일 목적은 첫 문단에 나온다." },
      { q: "How many chairs did the company receive?", choices: ["Two", "Eight", "Six", "Four"], answer: 3, explanation: "근거: 두 번째 문장 two of the six desk chairs are missing. 6개 중 2개가 빠졌으므로 4개를 받았다. 오답: 2개(A)는 빠진 수, 6개(C)는 주문한 수다. 8개(B)는 근거가 없다." },
      { q: "What does Mr. Nunes say he may do?", choices: ["Rent temporary seating", "Visit the warehouse", "Hire fewer staff", "Return the order"], answer: 0, explanation: "근거: 다섯 번째 문장 please let us know so we can rent temporary seating. 오답: 창고 방문(B)·직원 축소(C)·주문 반품(D)은 언급되지 않았다. warehouse는 의자가 남아 있을 수 있는 곳으로만 나온다." },
      { q: "In the email, the word \"matter\" is closest in meaning to", choices: ["substance", "importance", "mail", "issue"], answer: 3, word: "matter", explanation: "어휘 문제다. 근거: 7번째 문장 Thank you for your prompt attention to this matter. 의자 두 개가 빠진 '이 건(문제)'을 가리킨다. 오답: substance(물질)·importance(중요함, it doesn't matter의 뜻)·mail(우편물, printed matter의 뜻)은 matter의 다른 뜻이다. 참고: 실제 시험에서는 '문단 2, 3행의 단어'처럼 위치를 알려준다. 이 앱은 문단·행 번호 없이 단어로만 표시하니, 형식이 달라도 당황하지 말자." }
    ]
  },
  {
    id: "rp15", type: "기사", title: "쇼핑몰 실내 정원 조성", strategyId: "r05", recommendedSec: 130,
    header: ["Riverside Mall to Add Indoor Garden"],
    sentences: [
      { en: "Riverside Mall will open a 2,000-square-meter indoor garden on its top floor in September, mall manager Tomas Reyes said last week.", ko: "리버사이드 몰이 9월에 최상층에 2,000제곱미터 규모의 실내 정원을 연다고 쇼핑몰 매니저 토마스 레예스가 지난주 밝혔습니다.", mark: 1 },
      { en: "The space will include seating, a small café, and more than fifty plant species.", ko: "이 공간에는 좌석과 작은 카페, 50종이 넘는 식물이 들어섭니다.", mark: 2 },
      { en: "Mr. Reyes said the project is meant to attract visitors who stay longer and shop more.", ko: "레예스 씨는 이 사업이 더 오래 머물며 더 많이 구매하는 방문객을 끌어들이기 위한 것이라고 말했습니다." },
      { en: "Construction began in March and is now about 70 percent complete.", ko: "공사는 3월에 시작해 현재 약 70퍼센트 진행됐습니다.", mark: 3 },
      { en: "The garden will be free to enter and open during regular mall hours.", ko: "정원은 무료로 입장할 수 있으며 쇼핑몰 영업시간에 맞춰 운영됩니다.", mark: 4 }
    ],
    vocab: [
      { w: "indoor", m: "실내의" },
      { w: "species", m: "(생물의) 종" },
      { w: "attract", m: "끌어들이다" },
      { w: "construction", m: "공사" },
      { w: "free to enter", m: "입장 무료인" }
    ],
    questions: [
      { q: "What is the main topic of the article?", choices: ["A mall's plan to add a garden space", "The opening of a new café", "The progress of construction at the mall", "A new manager at Riverside Mall"], answer: 0, explanation: "주제·목적 문제다. 근거: 제목 Riverside Mall to Add Indoor Garden과 첫 문장 Riverside Mall will open a 2,000-square-meter indoor garden ... in September. 이후 문장도 정원의 시설·목적·공정·입장 조건이다. 오답: (B) 카페는 정원 안에 들어설 시설 중 하나로 두 번째 문장에만 나온다. (C) 공정률 70퍼센트는 네 번째 문장 하나에 해당하는 일부 내용이다. (D) Tomas Reyes는 이미 쇼핑몰 관리자로 소개될 뿐 새로 왔다는 말이 없다." },
      { q: "What is indicated about the garden?", choices: ["It is already finished", "It opens only on weekends", "There is no entry fee", "It is for members only"], answer: 2, explanation: "근거: 다섯 번째 문장 The garden will be free to enter. free to enter를 no entry fee로 바꿔 표현했다. 오답: 정규 영업시간에 연다고 했으므로 주말만(B)이 아니고, 공정률이 70퍼센트라 이미 완공(A)도 아니다. 회원 전용(D)이라는 말도 없다." },
      { q: "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong? \"However, food and drinks from the café will not be free.\"", choices: ["[1]", "[2]", "[3]", "[4]"], answer: 3, insert: "However, food and drinks from the café will not be free.", explanation: "문장 삽입 문제다. 연결 단서는 접속부사 However와 정관사 the café다. However는 앞 문장과 반대되는 내용을 이어야 하고, the café는 앞에서 이미 나온 카페여야 한다. [4] 앞 문장 The garden will be free to enter와 '무료'가 대비되고, 카페는 2번째 문장에 나왔다. 오답: [1]은 카페가 아직 나오지 않았고, [2]는 카페는 나왔지만 앞 문장에 '무료'가 없어 However가 대비할 것이 없으며, [3] 앞은 공사 진행률이라 음식값과 이어지지 않는다." }
    ]
  },
  {
    id: "rp16", type: "이중 지문", title: "자전거 수리점 광고와 후기", strategyId: "r06", recommendedSec: 190,
    parts: [
      {
        label: "지문 1 — 광고",
        header: ["GRAND OPENING — Milltown Cycle Repair"],
        sentences: [
          { en: "Open Monday to Saturday, 8 a.m. to 6 p.m.", ko: "월요일부터 토요일까지, 오전 8시부터 오후 6시까지 영업합니다." },
          { en: "Basic tune-up: $35 | Full service: $75 | Flat tire repair: $15", ko: "기본 점검 35달러 | 종합 정비 75달러 | 펑크 수리 15달러" },
          { en: "Bring this ad for 10 percent off any service during our first month.", ko: "개업 첫 달 동안 이 광고를 가져오시면 모든 서비스 10퍼센트 할인됩니다." },
          { en: "Walk-ins welcome, but appointments are recommended on Saturdays.", ko: "예약 없이 방문하셔도 되지만, 토요일에는 예약을 권장합니다." }
        ]
      },
      {
        label: "지문 2 — 고객 이메일",
        header: ["From: Grace Oduya", "To: info@milltowncycle.com", "Date: May 4", "Subject: Thank you"],
        sentences: [
          { en: "Hello,", ko: "안녕하세요," },
          { en: "I brought my bicycle in on Saturday for a full service and was very pleased with the result.", ko: "토요일에 자전거를 종합 정비 맡겼는데 결과가 아주 만족스러웠습니다." },
          { en: "Your mechanic finished the work in under an hour, even though I arrived without an appointment.", ko: "예약 없이 갔는데도 정비사분이 한 시간이 안 되어 작업을 마쳐 주셨습니다." },
          { en: "I used the coupon from your newspaper ad, which made the price very reasonable.", ko: "신문 광고의 쿠폰을 사용해서 가격도 아주 합리적이었습니다." },
          { en: "I will recommend your shop to my cycling club.", ko: "제 자전거 동호회에 이 가게를 추천하겠습니다." },
          { en: "Best regards, Grace Oduya", ko: "감사합니다. 그레이스 오두야 드림" }
        ]
      }
    ],
    vocab: [
      { w: "tune-up", m: "점검, 정비" },
      { w: "walk-in", m: "예약 없이 오는 손님" },
      { w: "appointment", m: "예약" },
      { w: "mechanic", m: "정비사" },
      { w: "reasonable", m: "합리적인" }
    ],
    questions: [
      { q: "What is indicated about Milltown Cycle Repair?", choices: ["It is newly opened", "It is closing soon", "It only serves members", "It operates every day"], answer: 0, explanation: "근거: 광고 제목 GRAND OPENING과 세 번째 줄 during our first month. 새로 문을 연 가게다. 오답: 곧 문을 닫는다(B)·회원 전용(C)은 근거가 없고, Monday to Saturday라 일요일은 쉬므로 매일 영업(D)도 아니다." },
      { q: "How much was the regular price of Ms. Oduya's service?", choices: ["$15", "$35", "$75", "$110"], answer: 2, explanation: "연계 문제다. 근거 1: 이메일 두 번째 문장 for a full service. 근거 2: 광고 두 번째 줄 Full service: $75. 할인 전 정가를 물었다. 오답: 15달러(A)는 펑크 수리, 35달러(B)는 기본 점검이고, 110달러(D)는 기본 점검과 정비를 더한 값이다." },
      { q: "What is suggested about Ms. Oduya's visit?", choices: ["She waited longer than she expected", "She came on a day when appointments are recommended", "She paid the full price", "She received a free tune-up"], answer: 1, explanation: "추론 문제다. 근거 1: 지문 1(광고) 4번째 줄 Walk-ins welcome, but appointments are recommended on Saturdays. 근거 2: 지문 2(이메일) 2번째·3번째 문장 I brought my bicycle in on Saturday / I arrived without an appointment. 예약을 권하는 토요일에 예약 없이 왔다. 오답: 한 시간도 안 걸렸으므로 오래 기다린 것(A)이 아니고, 쿠폰을 써서 정가(C)가 아니며, 무료 점검(D)은 없다." },
      { q: "What does Ms. Oduya say she will do?", choices: ["Return next month", "Write a newspaper review", "Recommend the shop to others", "Buy a new bicycle"], answer: 2, explanation: "근거: 이메일 다섯 번째 문장 I will recommend your shop to my cycling club. 오답: 다음 달 재방문(A)·신문 후기(B)·자전거 구매(D)는 말하지 않았다. 신문은 광고를 본 곳으로만 나온다." }
    ]
  },
  {
    id: "rp17", type: "문자 메시지", title: "배송 차량 고장", strategyId: "r03", recommendedSec: 150,
    header: ["Text Message Conversation"],
    sentences: [
      { en: "Dana Whitfield (10:12 A.M.): The delivery van won't start. I'm still at the depot.", ko: "다나 휘트필드 (오전 10시 12분): 배송 차량이 시동이 안 걸려요. 저 아직 물류 창고에 있어요." },
      { en: "Omar Haddad (10:14 A.M.): How long until the mechanic arrives?", ko: "오마르 하다드 (오전 10시 14분): 정비사가 오기까지 얼마나 걸려요?" },
      { en: "Dana Whitfield (10:15 A.M.): He said twenty minutes, but I've heard that before.", ko: "다나 휘트필드 (오전 10시 15분): 20분이라고 했는데, 전에도 그 말 들었어요." },
      { en: "Omar Haddad (10:17 A.M.): Our first stop expects the order by eleven. Can you take the smaller truck?", ko: "오마르 하다드 (오전 10시 17분): 첫 배송지가 11시까지 주문품을 받기로 돼 있어요. 작은 트럭으로 갈 수 있어요?" },
      { en: "Dana Whitfield (10:18 A.M.): It only holds half the boxes. I'd have to make two trips.", ko: "다나 휘트필드 (오전 10시 18분): 거기엔 상자가 절반밖에 안 들어가요. 두 번 왕복해야 해요." },
      { en: "Omar Haddad (10:20 A.M.): Do that for now. I'll call the afternoon customers and push their times back.", ko: "오마르 하다드 (오전 10시 20분): 우선 그렇게 해주세요. 오후 고객들에게는 제가 전화해서 시간을 뒤로 미룰게요." },
      { en: "Dana Whitfield (10:21 A.M.): Loading it now.", ko: "다나 휘트필드 (오전 10시 21분): 지금 싣고 있어요." }
    ],
    vocab: [
      { w: "depot", m: "물류 창고, 차고지" },
      { w: "mechanic", m: "정비사" },
      { w: "first stop", m: "첫 배송지" },
      { w: "make two trips", m: "두 번 왕복하다" },
      { w: "push back", m: "(일정을) 뒤로 미루다" }
    ],
    questions: [
      { q: "Where most likely is Ms. Whitfield?", choices: ["At a repair shop", "At a delivery depot", "At a customer's office", "At a parking garage"], answer: 1, explanation: "근거: 10:12 Dana Whitfield의 I'm still at the depot. 오답: 정비사를 기다리는 중이라 정비소(A)가 아니고, 아직 출발하지 못했으므로 고객 사무실(C)도 아니다. 주차장(D)은 언급이 없다." },
      { q: "At 10:15 A.M., what does Ms. Whitfield most likely mean when she writes, \"but I've heard that before\"?", choices: ["She has not met the mechanic", "She already repaired the van", "She wants to call a different mechanic", "She doubts the mechanic will arrive on time"], answer: 3, explanation: "의도 파악 문제다. 근거: 바로 앞 문장 He said twenty minutes. 전에도 같은 말을 들었다는 것은 이번에도 20분 안에 오지 않을 거라고 의심한다는 뜻이다. 오답: 정비사를 만난 적 없다(A)거나, 다른 정비사를 부르겠다(C)거나, 이미 고쳤다(B)는 말은 없다." },
      { q: "In the text message chain, the word \"holds\" is closest in meaning to", choices: ["contains", "grips", "delays", "hosts"], answer: 0, word: "holds", explanation: "어휘 문제다. 근거: 10:18 Dana Whitfield의 It only holds half the boxes. I'd have to make two trips. 작은 트럭에 상자가 절반만 '들어간다'는 뜻이다. 오답: grips(손에 쥐다)·delays(붙잡아 두다, hold up)·hosts(행사를 열다, hold a meeting)는 hold의 다른 뜻이다. 참고: 실제 시험에서는 '문단 2, 3행의 단어'처럼 위치를 알려준다. 이 앱은 문단·행 번호 없이 단어로만 표시하니, 형식이 달라도 당황하지 말자." },
      { q: "What does Mr. Haddad say he will do?", choices: ["Drive the van himself", "Reschedule some deliveries", "Cancel the first stop", "Hire a new mechanic"], answer: 1, explanation: "근거: 10:20 Omar Haddad의 I'll call the afternoon customers and push their times back. push back을 reschedule로 바꿔 표현했다. 오답: 직접 운전(A)·첫 배송지 취소(C)·정비사 고용(D)은 말하지 않았다. 첫 배송지는 작은 트럭으로 가기로 했다." }
    ]
  },
  {
    id: "rp18", type: "온라인 채팅", title: "프린터 토너 문제", strategyId: "r03", recommendedSec: 160,
    header: ["Online Chat Discussion"],
    sentences: [
      { en: "Priya Raman (2:02 P.M.): The printer on the third floor is out of toner again.", ko: "프리야 라만 (오후 2시 2분): 3층 프린터 토너가 또 다 됐어요." },
      { en: "Luis Ferreira (2:03 P.M.): Again? We replaced the cartridge last week.", ko: "루이스 페레이라 (오후 2시 3분): 또요? 지난주에 카트리지를 갈았는데요." },
      { en: "Priya Raman (2:04 P.M.): I think the marketing team printed the full catalog on it.", ko: "프리야 라만 (오후 2시 4분): 마케팅팀이 거기서 카탈로그 전체를 출력한 것 같아요." },
      { en: "Anna Kowalski (2:05 P.M.): That's right, they did. Three hundred copies.", ko: "안나 코발스키 (오후 2시 5분): 맞아요, 그랬어요. 300부였어요." },
      { en: "Luis Ferreira (2:06 P.M.): Large print jobs are supposed to go to the copy center downstairs.", ko: "루이스 페레이라 (오후 2시 6분): 대량 출력은 아래층 복사실에서 하기로 되어 있어요." },
      { en: "Anna Kowalski (2:07 P.M.): I'll remind everyone at tomorrow's staff meeting.", ko: "안나 코발스키 (오후 2시 7분): 내일 직원 회의에서 모두에게 다시 알릴게요." },
      { en: "Priya Raman (2:08 P.M.): Thanks. Can someone order toner today? We have none in the supply closet.", ko: "프리야 라만 (오후 2시 8분): 고마워요. 오늘 누가 토너 주문해 줄 수 있어요? 비품실에 하나도 없어요." },
      { en: "Luis Ferreira (2:09 P.M.): I'll put in the order before I leave.", ko: "루이스 페레이라 (오후 2시 9분): 퇴근 전에 제가 주문 넣을게요." }
    ],
    vocab: [
      { w: "be out of", m: "~이 다 떨어지다" },
      { w: "cartridge", m: "카트리지" },
      { w: "be supposed to", m: "~하기로 되어 있다" },
      { w: "supply closet", m: "비품실" },
      { w: "put in an order", m: "주문을 넣다" }
    ],
    questions: [
      { q: "What is the main topic of the discussion?", choices: ["A printer supply problem", "A change to a meeting time", "A new marketing campaign", "An office relocation"], answer: 0, explanation: "근거: 2:02 The printer on the third floor is out of toner again으로 시작해 2:09 토너 주문으로 끝난다. 오답: 내일 회의(B)는 공지할 자리로만 나오고, 마케팅 캠페인(C)·사무실 이전(D)은 주제가 아니다." },
      { q: "What does Ms. Kowalski confirm?", choices: ["The printer is broken", "The marketing team made a large number of copies", "The supply closet is locked", "A new printer was purchased"], answer: 1, explanation: "근거: 2:05 Anna Kowalski의 That's right, they did. Three hundred copies. 앞 문장의 '마케팅 팀이 카탈로그를 출력했다'를 확인한 것이다. 오답: 프린터 고장(A)이 아니라 토너가 떨어졌고, 비품실이 잠겼다(C)는 말은 없으며(토너가 없다고만 했다), 새 프린터 구입(D)도 없다." },
      { q: "At 2:06 P.M., why does Mr. Ferreira mention the copy center?", choices: ["To recommend buying a new machine", "To ask for directions", "To complain about printing costs", "To point out where large print jobs should be done"], answer: 3, explanation: "의도 파악 문제다. 근거: 2:06 Large print jobs are supposed to go to the copy center downstairs. be supposed to는 정해진 규칙을 말한다. 바로 앞에서 마케팅 팀이 300부를 이 프린터로 뽑았다고 했으므로 규칙 위반을 지적한 것이다. 오답: 새 기계 구입(A)·비용 불만(C)·길 묻기(B)는 근거가 없다." },
      { q: "What will Mr. Ferreira most likely do today?", choices: ["Order supplies", "Repair the printer", "Lead a staff meeting", "Visit the marketing team"], answer: 0, explanation: "근거: 2:09 I'll put in the order before I leave. 2:08에 토너 주문을 부탁받았다. 오답: 수리(B)는 필요 없고, 내일 회의에서 공지하는 사람은 코발스키 씨이며(C), 마케팅 팀 방문(D)은 언급이 없다." }
    ]
  },
  {
    id: "rp19", type: "양식/청구서", title: "사무용품 청구서", strategyId: "r02", recommendedSec: 110,
    header: ["BRIGHTWAY OFFICE SUPPLIES — INVOICE #4418"],
    sentences: [
      { en: "Billed to: Carlton Dental Clinic, 88 Harrow Road", ko: "청구 대상: 칼턴 치과, 해로 로 88번지" },
      { en: "Invoice date: June 3 | Payment due: June 17", ko: "청구 일자: 6월 3일 | 납기일: 6월 17일" },
      { en: "Printer paper (10 boxes) — $120.00", ko: "프린터 용지 (10박스) — 120.00달러" },
      { en: "Desk lamps (4 units) — $96.00", ko: "책상 램프 (4개) — 96.00달러" },
      { en: "Ink cartridges (6 units) — $150.00", ko: "잉크 카트리지 (6개) — 150.00달러" },
      { en: "Subtotal: $366.00 | Delivery: $0.00 (free on orders over $300)", ko: "소계: 366.00달러 | 배송비: 0.00달러 (300달러 초과 주문 시 무료)" },
      { en: "Total due: $366.00", ko: "총 청구액: 366.00달러" },
      { en: "A 2 percent late fee is added to invoices paid after the due date.", ko: "납기일 이후에 결제된 청구서에는 2퍼센트의 연체료가 붙습니다." },
      { en: "Questions? Call 555-0142 or reply to this invoice by e-mail.", ko: "문의 사항은 555-0142로 전화하시거나 이 청구서에 이메일로 답장해 주세요." }
    ],
    vocab: [
      { w: "invoice", m: "청구서, 송장" },
      { w: "billed to", m: "청구 대상" },
      { w: "payment due", m: "납기일" },
      { w: "subtotal", m: "소계" },
      { w: "late fee", m: "연체료" }
    ],
    questions: [
      { q: "What is suggested about the order?", choices: ["It was delivered late", "It was partly canceled", "It qualified for free delivery", "It included a discount on lamps"], answer: 2, explanation: "근거: 여섯 번째 줄 Subtotal: $366.00 | Delivery: $0.00 (free on orders over $300). 소계가 300달러를 넘어 배송비가 없다. 오답: 배송 지연(A)·일부 취소(B)·램프 할인(D)은 청구서에 없다." },
      { q: "By when should the clinic pay?", choices: ["June 3", "July 17", "July 3", "June 17"], answer: 3, explanation: "근거: 두 번째 줄 Payment due: June 17. 오답: 6월 3일(A)은 청구 일자이고, 7월 날짜(B, C)는 청구서에 없다." },
      { q: "If the clinic pays the invoice on June 20, how much will it most likely pay?", choices: ["$359.68", "$366.00", "$373.32", "$380.64"], answer: 2, explanation: "추론 문제다. 근거 1: 2번째 줄 Payment due: June 17. 6월 20일은 납기 뒤다. 근거 2: 7번째·8번째 줄 Total due: $366.00 / A 2 percent late fee is added to invoices paid after the due date. 366달러의 2퍼센트인 7.32달러가 더해져 373.32달러다. 오답: 359.68달러(A)는 2퍼센트를 뺀 값, 366달러(B)는 기한 안에 낼 때의 금액, 380.64달러(D)는 4퍼센트를 더한 값이다." }
    ]
  },
  {
    id: "rp20", type: "웹페이지", title: "보트 투어 회사 소개", strategyId: "r04", recommendedSec: 120,
    header: ["www.harborlinetours.com — About Us"],
    sentences: [
      { en: "Harborline Tours has operated guided boat trips along the north coast since 2009.", ko: "하버라인 투어는 2009년부터 북부 해안을 따라 가이드 보트 여행을 운영해 왔습니다." },
      { en: "Our ninety-minute tours depart from Pier 4 every hour between 9 A.M. and 5 P.M.", ko: "90분짜리 투어는 오전 9시부터 오후 5시까지 매시간 4번 부두에서 출발합니다." },
      { en: "All tours are led by a licensed guide and include commentary in English and Spanish.", ko: "모든 투어는 자격을 갖춘 가이드가 진행하며 영어와 스페인어 해설이 포함됩니다." },
      { en: "Tickets are $22 for adults and $11 for children under twelve.", ko: "요금은 성인 22달러, 12세 미만 아동 11달러입니다." },
      { en: "Groups of ten or more should book at least three days in advance.", ko: "10인 이상 단체는 최소 3일 전에 예약해야 합니다." },
      { en: "Tours may be canceled in poor weather; in that case, customers receive a full refund.", ko: "날씨가 좋지 않으면 투어가 취소될 수 있으며, 그 경우 고객은 전액 환불을 받습니다." }
    ],
    vocab: [
      { w: "operate", m: "운영하다" },
      { w: "depart from", m: "~에서 출발하다" },
      { w: "licensed", m: "자격을 갖춘, 면허가 있는" },
      { w: "in advance", m: "미리, 사전에" },
      { w: "full refund", m: "전액 환불" }
    ],
    questions: [
      { q: "What is the purpose of the web page?", choices: ["To announce a new tour route", "To explain a refund policy for canceled tours", "To recruit licensed tour guides", "To describe a company's tour service"], answer: 3, explanation: "주제·목적 문제다. 근거: 제목 About Us와 첫 문장 Harborline Tours has operated guided boat trips along the north coast since 2009. 이후 출발 시각·가이드·요금·단체 예약·취소를 차례로 안내하는 회사 소개 페이지다. 오답: (A) 2009년부터 운영해 온 투어라 새 노선이 아니다. (B) 환불은 마지막 문장에 한 번 나오는 일부 내용이다. (C) licensed guide는 투어를 이끄는 사람을 설명할 뿐 가이드를 뽑는다는 말이 없다." },
      { q: "What is indicated about the tours?", choices: ["They run only in summer", "They are offered in two languages", "They last three hours", "They are free for children"], answer: 1, explanation: "근거: 세 번째 문장 commentary in English and Spanish. 오답: 운영 계절(A)은 언급이 없고, 투어는 90분이라 3시간(C)이 아니며, 아동도 11달러를 내므로 무료(D)가 아니다." },
      { q: "What are large groups advised to do?", choices: ["Reserve several days ahead", "Pay in cash", "Arrive at 9 A.M.", "Bring their own guide"], answer: 0, explanation: "근거: 다섯 번째 문장 Groups of ten or more should book at least three days in advance. book in advance를 reserve ahead로 바꿔 표현했다. 오답: 현금 결제(B)·오전 9시 도착(C)·가이드 동반(D)은 요구하지 않았다. 9시는 첫 출발 시각이다." }
    ]
  },
  {
    id: "rp21", type: "문자 메시지", title: "회의실 프로젝터 고장", strategyId: "r03", recommendedSec: 80,
    header: ["Text Message", "From: Hugo Lindqvist (8:40 A.M.)"],
    sentences: [
      { en: "Good morning. The conference room projector is showing a blue screen.", ko: "좋은 아침입니다. 회의실 프로젝터에 파란 화면만 떠요." },
      { en: "I've already tried both cables, but nothing changed.", ko: "케이블 두 개를 다 바꿔 봤는데 달라지지 않았어요." },
      { en: "Could someone from IT come up before the ten o'clock client meeting?", ko: "10시 고객 회의 전에 IT 담당자가 올라와 주실 수 있을까요?" },
      { en: "I can move the meeting to Room B if that would be easier.", ko: "그게 더 편하면 회의를 B 회의실로 옮길 수도 있어요." }
    ],
    vocab: [
      { w: "conference room", m: "회의실" },
      { w: "cable", m: "케이블, 연결선" },
      { w: "come up", m: "(위층으로) 올라오다" },
      { w: "client", m: "고객" },
      { w: "move a meeting", m: "회의 장소나 시간을 옮기다" }
    ],
    questions: [
      { q: "Why did Mr. Lindqvist send the message?", choices: ["To cancel a client meeting", "To reserve a conference room", "To request a new cable order", "To report a problem with equipment"], answer: 3, explanation: "근거: 첫 문장 The conference room projector is showing a blue screen과 세 번째 문장 Could someone from IT come up. 장비 문제를 알리고 도움을 청하는 메시지다. 오답: 회의를 취소하지 않았고(A), 케이블은 바꿔 봤을 뿐 새로 주문하지 않았으며(C), Room B는 예약이 아니라 옮길 수 있다는 제안이다(B)." },
      { q: "What does Mr. Lindqvist offer to do?", choices: ["Change the meeting location", "Repair the projector himself", "Postpone the meeting until noon", "Contact the client directly"], answer: 0, explanation: "근거: 네 번째 문장 I can move the meeting to Room B if that would be easier. 오답: 케이블을 바꿔 봐도 안 됐다고 했으므로 직접 수리(B)가 아니고, 시간을 미루는 것(C)이 아니라 장소를 바꾸는 제안이며, 고객 연락(D)은 언급이 없다." }
    ]
  },
  {
    id: "rp22", type: "공지", title: "수영장 청소 안내", strategyId: "r02", recommendedSec: 75,
    header: ["NOTICE — Riverside Fitness Center"],
    sentences: [
      { en: "The swimming pool will be drained for cleaning on Thursday, July 10, and will reopen Friday morning.", ko: "수영장은 7월 10일 목요일에 청소를 위해 물을 빼며, 금요일 아침에 다시 엽니다." },
      { en: "Members may use the pool at our Oakfield branch that day at no extra charge.", ko: "회원은 그날 오크필드 지점 수영장을 추가 요금 없이 이용할 수 있습니다." },
      { en: "Please bring your membership card to the front desk there.", ko: "그곳 안내 데스크에 회원 카드를 가져와 주세요." },
      { en: "All other facilities will remain open as usual.", ko: "그 외 시설은 평소대로 운영됩니다." }
    ],
    vocab: [
      { w: "drain", m: "물을 빼다" },
      { w: "reopen", m: "다시 열다" },
      { w: "branch", m: "지점" },
      { w: "at no extra charge", m: "추가 요금 없이" },
      { w: "facility", m: "시설" }
    ],
    questions: [
      { q: "What is the main purpose of the notice?", choices: ["To introduce a new branch in Oakfield", "To inform members that a facility will be unavailable for a day", "To remind members to renew their membership cards", "To announce that the fitness center will close for a day"], answer: 1, explanation: "주제·목적 문제다. 근거: 첫 문장 The swimming pool will be drained for cleaning on Thursday, July 10, and will reopen Friday morning. 수영장 하루 이용 중단과 그날의 대안을 알리는 공지다. 오답: (A) 오크필드 지점은 그날 대신 쓸 수 있는 기존 지점이지 새 지점이 아니다. (C) 회원 카드는 오크필드 지점에 가져가라는 것이지 갱신하라는 말이 아니다. (D) All other facilities will remain open as usual이라고 했으므로 센터 전체가 닫는 것이 아니다. 지문이 '하지 않는다'고 한 내용을 고르게 하는 함정이다." },
      { q: "What are members asked to bring to the Oakfield branch?", choices: ["An extra payment", "A printed copy of the notice", "A towel and swimsuit", "Their membership card"], answer: 3, explanation: "근거: 세 번째 문장 Please bring your membership card to the front desk there. there는 오크필드 지점이다. 오답: at no extra charge라 추가 요금(A)은 없고, 수건·수영복(C)·공지 사본(B)은 언급되지 않았다." }
    ]
  },
  {
    id: "rp23", type: "광고", title: "카페 점심 할인", strategyId: "r04", recommendedSec: 70,
    header: ["LUNCH SPECIAL — Café Verdant"],
    sentences: [
      { en: "Monday through Thursday, 11:30 A.M. to 2:00 P.M.", ko: "월요일부터 목요일까지, 오전 11시 30분부터 오후 2시까지." },
      { en: "Soup, sandwich, and a drink for $9.50.", ko: "수프, 샌드위치, 음료를 9.50달러에." },
      { en: "Add a dessert for $2 more.", ko: "2달러를 더하면 디저트를 추가할 수 있습니다." },
      { en: "Present this coupon to your server. One coupon per table.", ko: "이 쿠폰을 담당 직원에게 보여주세요. 한 테이블당 쿠폰 한 장입니다." },
      { en: "Not valid on holidays.", ko: "공휴일에는 사용할 수 없습니다." }
    ],
    vocab: [
      { w: "present", m: "제시하다, 보여주다" },
      { w: "server", m: "(식당의) 담당 직원" },
      { w: "per", m: "~당" },
      { w: "valid", m: "유효한" },
      { w: "holiday", m: "공휴일" }
    ],
    questions: [
      { q: "What is NOT included in the $9.50 price?", choices: ["A soup", "A sandwich", "A drink", "A dessert"], answer: 3, explanation: "NOT 문제다. 근거: 두 번째 줄 Soup, sandwich, and a drink for $9.50와 세 번째 줄 Add a dessert for $2 more. 오답: 수프(A)·샌드위치(B)·음료(C)는 9.50달러에 포함된다. 디저트만 2달러를 더 낸다." },
      { q: "What is stated about the coupon?", choices: ["It is valid on weekends", "It may not be used on holidays", "It must be ordered online", "It expires in one week"], answer: 1, explanation: "근거: 다섯 번째 줄 Not valid on holidays. 오답: 월요일부터 목요일까지라 주말(A)에는 쓸 수 없고, 온라인 주문(C)·일주일 후 만료(D)는 언급이 없다. 쿠폰은 직원에게 보여 주면 된다." }
    ]
  },
  {
    id: "rp24", type: "이중 지문", title: "기록물 관리자 구인과 지원", strategyId: "r06", recommendedSec: 200,
    parts: [
      {
        label: "지문 1 — 구인 공고",
        header: ["Thornbury Public Library — Part-Time Archivist"],
        sentences: [
          { en: "Thornbury Public Library seeks a part-time archivist to organize our local history collection.", ko: "손버리 공립 도서관은 지역 역사 자료를 정리할 시간제 기록물 관리자를 구합니다." },
          { en: "Responsibilities include cataloging documents, scanning photographs, and assisting researchers.", ko: "업무에는 문서 목록 작성, 사진 스캔, 연구자 지원이 포함됩니다." },
          { en: "Candidates must have a degree in library science and at least two years of archival experience.", ko: "지원자는 문헌정보학 학위와 최소 2년의 기록물 관리 경력이 있어야 합니다." },
          { en: "The position is twenty hours per week, with occasional Saturday shifts.", ko: "근무는 주 20시간이며, 간혹 토요일 근무가 있습니다." },
          { en: "Send a résumé and a brief cover letter to hr@thornburylibrary.org by March 20.", ko: "3월 20일까지 이력서와 간단한 자기소개서를 hr@thornburylibrary.org로 보내주세요." }
        ]
      },
      {
        label: "지문 2 — 지원 이메일",
        header: ["From: Nadia Bello", "To: hr@thornburylibrary.org", "Date: March 12", "Subject: Part-Time Archivist"],
        sentences: [
          { en: "Dear Hiring Committee,", ko: "채용 담당자님께," },
          { en: "I am writing to apply for the archivist position advertised on your website.", ko: "귀 기관 웹사이트에 공고된 기록물 관리자 직책에 지원하고자 메일 드립니다." },
          { en: "I hold a master's degree in library science and have spent four years organizing photograph collections at the Dunmore Historical Society.", ko: "저는 문헌정보학 석사 학위가 있고, 던모어 역사협회에서 4년간 사진 자료를 정리했습니다." },
          { en: "I am available on weekends as well as weekdays.", ko: "저는 평일뿐 아니라 주말에도 근무할 수 있습니다." },
          { en: "My résumé is attached, and I would be glad to provide references if needed.", ko: "이력서를 첨부했으며, 필요하시면 추천인도 제공해 드릴 수 있습니다." },
          { en: "Sincerely, Nadia Bello", ko: "나디아 벨로 드림" }
        ]
      }
    ],
    vocab: [
      { w: "archivist", m: "기록물 관리자" },
      { w: "catalog", m: "목록을 작성하다" },
      { w: "candidate", m: "후보자, 지원자" },
      { w: "shift", m: "교대 근무" },
      { w: "cover letter", m: "자기소개서" }
    ],
    questions: [
      { q: "What is one responsibility of the position?", choices: ["Repairing damaged books", "Managing a budget", "Leading school tours", "Scanning photographs"], answer: 3, explanation: "근거: 공고 두 번째 문장 Responsibilities include cataloging documents, scanning photographs, and assisting researchers. 오답: 책 수리(A)·학교 견학 안내(C)·예산 관리(B)는 업무로 나오지 않는다." },
      { q: "How did Ms. Bello learn about the job?", choices: ["From a newspaper", "From a former colleague", "From the library's website", "At a job fair"], answer: 2, explanation: "근거: 이메일 두 번째 문장 the archivist position advertised on your website. 오답: 신문(A)·전 동료(B)·채용 박람회(D)는 언급되지 않았다." },
      { q: "What is suggested about Ms. Bello's availability?", choices: ["She can work on Saturdays when needed", "She can work only on weekday mornings", "She needs a full-time schedule", "She is unavailable until April"], answer: 0, explanation: "연계 문제다. 근거 1: 공고 네 번째 문장 with occasional Saturday shifts. 근거 2: 이메일 네 번째 문장 I am available on weekends as well as weekdays. 오답: 평일 오전만(B)·전일제 필요(C)·4월까지 불가(D)는 이메일 내용과 맞지 않는다." },
      { q: "What does Ms. Bello offer to provide?", choices: ["A photograph sample", "References", "A writing sample", "A university transcript"], answer: 1, explanation: "근거: 이메일 다섯 번째 문장 I would be glad to provide references if needed. 오답: 사진 샘플(A)·글쓰기 샘플(C)·성적 증명서(D)는 제공하겠다고 하지 않았다. 사진은 경력 설명에만 나온다." }
    ]
  },
  {
    id: "rp25", type: "이중 지문", title: "호텔 예약 변경", strategyId: "r06", recommendedSec: 195,
    parts: [
      {
        label: "지문 1 — 예약 확인서",
        header: ["MERIDIAN HARBOR HOTEL — Reservation Confirmation"],
        sentences: [
          { en: "Guest: Dr. Felix Osei | Confirmation number: MH-20714", ko: "투숙객: 펠릭스 오세이 박사 | 예약 번호: MH-20714" },
          { en: "Check-in: October 8 | Check-out: October 11", ko: "입실: 10월 8일 | 퇴실: 10월 11일" },
          { en: "Room type: Deluxe king, harbor view — $180 per night", ko: "객실 종류: 디럭스 킹, 항구 전망 — 1박 180달러" },
          { en: "Breakfast is included in the room rate. Parking is $15 per day.", ko: "조식은 객실 요금에 포함됩니다. 주차는 1일 15달러입니다." },
          { en: "Changes made more than 48 hours before check-in are free of charge.", ko: "입실 48시간 이전에 하는 변경은 수수료가 없습니다." }
        ]
      },
      {
        label: "지문 2 — 변경 요청 이메일",
        header: ["From: Felix Osei", "To: reservations@meridianharbor.com", "Date: October 3", "Subject: Confirmation MH-20714"],
        sentences: [
          { en: "Hello,", ko: "안녕하세요," },
          { en: "My conference now ends a day later than planned, so I would like to stay until October 12.", ko: "학회가 예정보다 하루 늦게 끝나게 되어 10월 12일까지 머물고 싶습니다." },
          { en: "I believe no change fee applies to this request.", ko: "이번 요청에는 변경 수수료가 붙지 않는 것으로 알고 있습니다." },
          { en: "I will also need parking for the whole stay.", ko: "투숙 기간 전체에 주차도 필요합니다." },
          { en: "Could you send me an updated confirmation?", ko: "갱신된 확인서를 보내주시겠어요?" },
          { en: "Thank you, Felix Osei", ko: "감사합니다. 펠릭스 오세이" }
        ]
      }
    ],
    vocab: [
      { w: "confirmation number", m: "예약 번호" },
      { w: "per night", m: "1박당" },
      { w: "free of charge", m: "무료로" },
      { w: "apply", m: "(요금·규정이) 적용되다" },
      { w: "updated", m: "갱신된" }
    ],
    questions: [
      { q: "What is included in the room rate?", choices: ["Breakfast", "Parking", "An airport transfer", "Laundry service"], answer: 0, explanation: "근거: 확인서 네 번째 줄 Breakfast is included in the room rate. 오답: 주차(B)는 1일 15달러를 따로 받고, 공항 이동(C)·세탁(D)은 언급되지 않았다." },
      { q: "What change does Dr. Osei request?", choices: ["A different room type", "An earlier check-in", "A later check-out date", "A lower nightly rate"], answer: 2, explanation: "근거: 이메일 두 번째 문장 I would like to stay until October 12. 원래 퇴실일은 10월 11일이었다. 오답: 객실 종류(A)·입실 날짜(B)·요금(D)을 바꿔 달라는 말은 없다." },
      { q: "Why will Dr. Osei most likely not be charged a change fee?", choices: ["He requested the change more than 48 hours in advance", "He is a frequent guest", "He has already paid in full", "He is attending a conference"], answer: 0, explanation: "연계 문제다. 근거 1: 확인서 다섯 번째 줄 Changes made more than 48 hours before check-in are free of charge. 근거 2: 이메일 머리글의 날짜는 October 3이고, 확인서의 입실일은 October 8이다. 오답: 단골 손님(B)·전액 선결제(C)는 근거가 없고, 학회 참석(D)은 변경 이유이지 수수료가 없는 이유가 아니다." },
      { q: "How much will Dr. Osei most likely pay for his room, not including parking?", choices: ["$540", "$780", "$720", "$900"], answer: 2, explanation: "추론 문제다. 근거 1: 지문 1(확인서) 2번째·3번째 줄 Check-in: October 8 / $180 per night. 근거 2: 지문 2(이메일) 2번째 문장 I would like to stay until October 12. 8일부터 12일까지 4박이라 180달러 × 4 = 720달러다. 오답: 540달러(A)는 원래 예약 3박, 780달러(B)는 4일 주차비 60달러를 더한 값, 900달러(D)는 5박이다." }
    ]
  },
  {
    id: "rp26", type: "이중 지문", title: "마케팅 세미나와 참가 후기", strategyId: "r06", recommendedSec: 200,
    parts: [
      {
        label: "지문 1 — 세미나 안내",
        header: ["Small Business Marketing Seminar", "Saturday, February 21 | Cedarville Community Center, Hall C"],
        sentences: [
          { en: "9:00 A.M. Registration and coffee", ko: "오전 9시 접수 및 커피" },
          { en: "9:30 A.M. Session 1 — Finding Your Customers (Dr. Amina Farouk)", ko: "오전 9시 30분 1강 — 고객 찾기 (아미나 파루크 박사)" },
          { en: "11:00 A.M. Session 2 — Low-Cost Online Advertising (Jae-won Park)", ko: "오전 11시 2강 — 저비용 온라인 광고 (박재원)" },
          { en: "12:30 P.M. Lunch (provided)", ko: "오후 12시 30분 점심 (제공)" },
          { en: "1:30 P.M. Session 3 — Measuring Results (Dr. Amina Farouk)", ko: "오후 1시 30분 3강 — 성과 측정 (아미나 파루크 박사)" },
          { en: "Seats are limited to sixty participants. Register at cedarvillecc.org.", ko: "좌석은 60명으로 제한됩니다. cedarvillecc.org에서 신청하세요." }
        ]
      },
      {
        label: "지문 2 — 참가자 설문",
        header: ["Participant Feedback Form", "Name: Olga Marchetti | Business: Marchetti Flowers"],
        sentences: [
          { en: "Which session was most useful to you?", ko: "어느 강의가 가장 유익했습니까?" },
          { en: "The second one. I had never used online advertising before, and the speaker showed examples I was able to use in my own shop the same week.", ko: "두 번째 강의요. 온라인 광고를 써 본 적이 없었는데, 강사가 보여 준 사례를 그 주에 바로 제 가게에 적용할 수 있었어요." },
          { en: "Do you have any suggestions?", ko: "제안하실 점이 있습니까?" },
          { en: "Please allow more time for questions. Also, the hall was very cold in the morning.", ko: "질문 시간을 더 주세요. 그리고 오전에 강당이 너무 추웠습니다." },
          { en: "Would you attend another seminar?", ko: "다른 세미나에도 참석하시겠습니까?" },
          { en: "Yes, definitely.", ko: "네, 꼭 하겠습니다." }
        ]
      }
    ],
    vocab: [
      { w: "registration", m: "접수, 등록" },
      { w: "participant", m: "참가자" },
      { w: "be limited to", m: "~로 제한되다" },
      { w: "provided", m: "제공되는" },
      { w: "suggestion", m: "제안" }
    ],
    questions: [
      { q: "What is indicated about the seminar?", choices: ["It lasts two days", "The number of seats is limited", "It is free to attend", "It is held every month"], answer: 1, explanation: "근거: 안내문 여섯 번째 줄 Seats are limited to sixty participants. 오답: 2월 21일 하루 행사라 이틀(A)이 아니고, 참가비 언급이 없어 무료(C)인지 알 수 없으며, 매달 열린다(D)는 말도 없다." },
      { q: "Who led two of the sessions?", choices: ["Dr. Amina Farouk", "Jae-won Park", "Olga Marchetti", "The community center director"], answer: 0, explanation: "근거: 안내문 두 번째 줄 Session 1 (Dr. Amina Farouk)와 다섯 번째 줄 Session 3 (Dr. Amina Farouk). 오답: 박재원(B)은 2강 하나만 맡았고, 마르케티 씨(C)는 참가자이며, 센터장(D)은 나오지 않는다." },
      { q: "Which session did Ms. Marchetti find most useful?", choices: ["Finding Your Customers", "Low-Cost Online Advertising", "Measuring Results", "The lunch discussion"], answer: 1, explanation: "연계 문제다. 근거 1: 설문 두 번째 줄 The second one. 근거 2: 안내문 세 번째 줄 Session 2 — Low-Cost Online Advertising. 오답: 1강(A)·3강(C)은 고르지 않았고, 점심 토론(D)은 일정에 없다. 점심은 식사 시간이다." },
      { q: "Who most likely showed the examples that Ms. Marchetti used in her shop?", choices: ["Dr. Amina Farouk", "Olga Marchetti", "Jae-won Park", "The community center director"], answer: 2, explanation: "추론 문제다. 근거 1: 지문 2(설문) 2번째 줄 The second one ... the speaker showed examples I was able to use in my own shop. 근거 2: 지문 1(안내) 3번째 줄 11:00 A.M. Session 2 — Low-Cost Online Advertising (Jae-won Park). 두 번째 강의의 강사는 박재원이다. 오답: 파루크 박사(A)는 1강과 3강, 마르케티 씨(B)는 설문을 쓴 참가자이고, 센터장(D)은 나오지 않는다." }
    ]
  },
  {
    id: "rp27", type: "삼중 지문", title: "출장 경비 정산", strategyId: "r06", recommendedSec: 270,
    parts: [
      {
        label: "지문 1 — 사내 규정",
        header: ["TRAVEL EXPENSE POLICY — Brantley Engineering"],
        sentences: [
          { en: "Employees may claim meals up to $45 per day while traveling.", ko: "직원은 출장 중 식비를 1일 45달러까지 청구할 수 있습니다." },
          { en: "Hotel costs are reimbursed up to $160 per night within the country and $210 abroad.", ko: "숙박비는 국내 출장은 1박 160달러, 해외 출장은 210달러까지 환급됩니다." },
          { en: "Taxi fares require a receipt; rides under $20 do not.", ko: "택시 요금은 영수증이 필요하며, 20달러 미만은 필요하지 않습니다." },
          { en: "Submit all claims within fourteen days of returning.", ko: "모든 청구는 복귀 후 14일 안에 제출하십시오." },
          { en: "Approved claims are paid with the following month's salary.", ko: "승인된 청구는 다음 달 급여와 함께 지급됩니다." }
        ]
      },
      {
        label: "지문 2 — 경비 신청서",
        header: ["EXPENSE CLAIM — Form 7B"],
        sentences: [
          { en: "Name: Teodor Vasilev | Department: Structural Design", ko: "이름: 테오도르 바실레프 | 부서: 구조 설계" },
          { en: "Trip: Client visit, Oslo (international) | Dates: April 6-8", ko: "출장: 고객 방문, 오슬로(해외) | 기간: 4월 6일~8일" },
          { en: "Hotel (2 nights, Oslo): $390", ko: "숙박 (오슬로 2박): 390달러" },
          { en: "Meals (3 days): $128", ko: "식비 (3일): 128달러" },
          { en: "Taxi (airport, with receipt): $34", ko: "택시 (공항, 영수증 첨부): 34달러" },
          { en: "Total claimed: $552 | Submitted: April 11", ko: "청구 총액: 552달러 | 제출일: 4월 11일" }
        ]
      },
      {
        label: "지문 3 — 회계팀 이메일",
        header: ["From: Diane Keller, Accounting", "To: Teodor Vasilev", "Date: April 15", "Subject: Form 7B — Oslo trip"],
        sentences: [
          { en: "Dear Teodor,", ko: "테오도르 씨께," },
          { en: "Your claim arrived in time, so it will be paid in the usual way.", ko: "청구가 기한 안에 접수되어 평소대로 지급됩니다." },
          { en: "Your hotel came to $195 per night, which is within our limit, so that part is approved in full.", ko: "숙박비는 1박 195달러로 한도 안이어서 전액 승인됩니다." },
          { en: "However, your meal total exceeds the daily allowance for one of the three days.", ko: "다만 식비가 사흘 중 하루는 1일 한도를 초과합니다." },
          { en: "Please send me the receipts for April 7 so I can check it.", ko: "확인할 수 있도록 4월 7일 영수증을 보내주세요." },
          { en: "Everything else is approved. Diane", ko: "그 외는 모두 승인되었습니다. 다이앤" }
        ]
      }
    ],
    vocab: [
      { w: "claim", m: "청구하다, 청구" },
      { w: "reimburse", m: "환급하다" },
      { w: "allowance", m: "허용 한도" },
      { w: "exceed", m: "초과하다" },
      { w: "in full", m: "전액으로" }
    ],
    questions: [
      { q: "What is the purpose of the expense policy?", choices: ["To explain rules for claiming travel costs", "To announce a change in salaries", "To report a budget shortage", "To introduce a new accounting system"], answer: 0, explanation: "근거: 지문 1(규정)의 제목 TRAVEL EXPENSE POLICY와 1번째부터 5번째 문장. 식비·숙박비·택시비·제출 기한·지급 시기를 정한다. 오답: 급여 변경(B)이 아니라 급여와 함께 지급한다는 말이고, 예산 부족(C)·새 회계 시스템(D)은 없다." },
      { q: "What is indicated about Mr. Vasilev's taxi fare?", choices: ["It was below the amount that needs a receipt", "It was not approved", "A receipt was required for it", "It was paid by the client"], answer: 2, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 1의 3번째 문장 Taxi fares require a receipt; rides under $20 do not. 근거 2: 지문 2의 5번째 줄 Taxi (airport, with receipt): $34. 34달러는 20달러 이상이라 영수증이 필요하다. 오답: 20달러 미만(A)이 아니고, 지문 3의 6번째 문장 Everything else is approved라 승인되지 않음(B)도 아니며, 고객사 부담(D)은 근거가 없다." },
      { q: "Why is the hotel cost approved in full?", choices: ["It was paid in advance", "The client agreed to share the cost", "He stayed only two nights", "The trip was outside the country"], answer: 3, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 2의 2번째·3번째 줄에서 오슬로 해외 출장, 2박 390달러, 즉 1박 195달러다. 근거 2: 지문 1의 2번째 문장에서 국내 한도는 160달러, 해외 한도는 210달러다. 195달러는 국내 한도를 넘지만 해외 한도 안이다. 지문 3의 3번째 문장은 한도 안이라고만 하고 어느 한도인지 말하지 않는다. 오답: 선결제(A)·고객사 분담(B)은 근거가 없고, 2박(C)은 사실이지만 한도는 1박 기준이라 이유가 아니다." },
      { q: "What is suggested about Mr. Vasilev's meals on April 7?", choices: ["They cost more than $45", "They were paid for by the client", "They were not included in his claim", "They were eaten at the hotel"], answer: 0, explanation: "추론 문제다. 근거 1: 지문 1(규정) 1번째 문장 Employees may claim meals up to $45 per day. 근거 2: 지문 3(이메일) 4번째·5번째 문장 your meal total exceeds the daily allowance for one of the three days / Please send me the receipts for April 7. 한도를 넘은 날이 4월 7일이라 그날 식비가 45달러를 넘었다. 오답: 고객사 부담(B)·호텔 식사(D)는 근거가 없고, 식비는 지문 2의 4번째 줄에 청구되어 있다(C)." },
      { q: "When will Mr. Vasilev receive the money?", choices: ["Within fourteen days", "On April 11", "With his May salary", "After the next client visit"], answer: 2, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 1의 5번째 문장 Approved claims are paid with the following month's salary. 근거 2: 지문 2의 6번째 줄 Submitted: April 11. 4월에 제출했으므로 다음 달인 5월 급여와 함께 받는다. 지문 3의 2번째 문장은 기한 안에 도착했다고만 한다. 오답: 14일(A)은 제출 기한이고, 4월 11일(B)은 제출일이며, 다음 고객 방문(D)은 근거가 없다." }
    ]
  },
  {
    id: "rp28", type: "삼중 지문", title: "온라인 강좌 수강", strategyId: "r06", recommendedSec: 265,
    parts: [
      {
        label: "지문 1 — 강좌 안내",
        header: ["PRACTICAL SPREADSHEETS — Online Course"],
        sentences: [
          { en: "Six weekly sessions, Wednesdays 7:00-8:30 P.M.", ko: "6주간 매주 수요일 오후 7시부터 8시 30분까지." },
          { en: "Session 1 Formulas | Session 2 Charts | Session 3 Pivot tables", ko: "1회차 수식 | 2회차 차트 | 3회차 피벗 테이블" },
          { en: "Session 4 Data cleaning | Session 5 Macros | Session 6 Final project", ko: "4회차 데이터 정리 | 5회차 매크로 | 6회차 최종 과제" },
          { en: "Fee: $120, or $90 for students with proof of enrollment.", ko: "수강료: 120달러, 재학 증명을 제출한 학생은 90달러." },
          { en: "Recordings stay available for three months after the course ends.", ko: "녹화 강의는 과정이 끝난 뒤 3개월간 볼 수 있습니다." },
          { en: "Instructor: Beatriz Nunes", ko: "강사: 베아트리스 누네스" }
        ]
      },
      {
        label: "지문 2 — 수강생 게시글",
        header: ["Posted by: Kwan-ho Lim | March 2"],
        sentences: [
          { en: "I signed up mainly for Session 5, but I had to miss it because of a work trip.", ko: "주로 5회차 때문에 신청했는데 출장 때문에 그 수업을 놓쳐야 했습니다." },
          { en: "The recording saved me. I watched it twice the next weekend.", ko: "녹화 강의가 도움이 됐습니다. 다음 주말에 두 번 봤어요." },
          { en: "One thing: the exercise files for Session 4 were not in the download folder.", ko: "한 가지, 4회차 연습 파일이 다운로드 폴더에 없었습니다." },
          { en: "Otherwise this is the most useful course I have taken this year.", ko: "그 점만 빼면 올해 들은 강좌 중 가장 유익했습니다." },
          { en: "I paid the reduced fee since I am finishing a degree part-time.", ko: "저는 시간제로 학위를 마치는 중이라 할인된 수강료를 냈습니다." }
        ]
      },
      {
        label: "지문 3 — 강사 답변",
        header: ["From: Beatriz Nunes", "Date: March 3", "Re: Kwan-ho Lim's post"],
        sentences: [
          { en: "Thank you for the kind words.", ko: "좋게 말씀해 주셔서 감사합니다." },
          { en: "You are right about the missing files; I have now added them to the folder for everyone.", ko: "파일이 빠졌다는 지적이 맞습니다. 모든 수강생이 볼 수 있도록 폴더에 올려 두었습니다." },
          { en: "I am glad the recording helped.", ko: "녹화 강의가 도움이 되어 다행입니다." },
          { en: "Anyone who misses a live session can watch it for the three months after the course finishes.", ko: "실시간 수업을 놓친 분은 과정이 끝난 뒤 3개월간 보실 수 있습니다." },
          { en: "I am also planning a follow-up course on databases for the autumn.", ko: "가을에는 데이터베이스를 다루는 후속 강좌도 준비하고 있습니다." },
          { en: "Beatriz", ko: "베아트리스" }
        ]
      }
    ],
    vocab: [
      { w: "session", m: "회차, 수업" },
      { w: "proof of enrollment", m: "재학 증명" },
      { w: "recording", m: "녹화 강의" },
      { w: "sign up for", m: "~에 신청하다" },
      { w: "follow-up", m: "(형용사) 후속의" }
    ],
    questions: [
      { q: "What is the course mainly about?", choices: ["Using spreadsheets", "Managing databases", "Writing business reports", "Designing web pages"], answer: 0, explanation: "근거: 지문 1(강좌 안내)의 제목 PRACTICAL SPREADSHEETS와 2번째·3번째 줄의 회차 주제(Formulas, Charts, Pivot tables 등). 오답: 데이터베이스(B)는 지문 3의 5번째 문장에서 가을 후속 강좌로만 나오고, 보고서 작성(C)·웹 디자인(D)은 없다." },
      { q: "Which session did Mr. Lim miss?", choices: ["Charts", "Data cleaning", "Macros", "Final project"], answer: 2, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 2의 1번째 문장 I signed up mainly for Session 5, but I had to miss it. 근거 2: 지문 1의 3번째 줄 Session 5 Macros. 오답: 2회차 차트(A), 4회차 데이터 정리(B), 6회차 최종 과제(D)는 놓쳤다는 말이 없다. 4회차는 파일이 빠진 회차다." },
      { q: "How much did Mr. Lim most likely pay?", choices: ["$90", "$120", "$180", "$210"], answer: 0, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 2의 5번째 문장 I paid the reduced fee since I am finishing a degree part-time. 근거 2: 지문 1의 4번째 줄 $90 for students with proof of enrollment. 오답: 120달러(B)는 정가이고, 180달러(C)·210달러(D)는 근거가 없다." },
      { q: "Which session's exercise files did Ms. Nunes add to the folder?", choices: ["Formulas", "Charts", "Data cleaning", "Macros"], answer: 2, explanation: "연계 문제다(지문 1 + 지문 2 + 지문 3). 근거 1: 지문 2의 3번째 문장 the exercise files for Session 4 were not in the download folder. 근거 2: 지문 3의 2번째 문장 I have now added them to the folder. 근거 3: 지문 1의 3번째 줄 Session 4 Data cleaning. 오답: 수식(A)·차트(B)는 문제가 된 회차가 아니고, 매크로(D)는 임 씨가 놓친 회차다." },
      { q: "What does Ms. Nunes say she plans to do?", choices: ["Extend the recording period", "Offer another course", "Lower the course fee", "Add a seventh session"], answer: 1, explanation: "근거: 지문 3의 5번째 문장 I am also planning a follow-up course on databases for the autumn. 오답: 녹화 기간(A)은 지문 1의 5번째 줄과 지문 3의 4번째 문장에서 원래 3개월이라 연장이 아니고, 수강료 인하(C)·7회차 추가(D)는 없다." }
    ]
  },
  {
    id: "rp29", type: "이중 지문", title: "사무실 임대 문의", strategyId: "r06", recommendedSec: 230,
    parts: [
      {
        label: "지문 1 — 임대 광고",
        header: ["OFFICE SPACE FOR LEASE — Trenton Works Building"],
        sentences: [
          { en: "Third floor, 240 square meters, divided into eight rooms.", ko: "3층, 240제곱미터, 여덟 개의 방으로 나뉘어 있습니다." },
          { en: "Monthly rent: $4,200, including water and building maintenance.", ko: "월 임대료 4,200달러로 수도 요금과 건물 관리비가 포함됩니다." },
          { en: "Electricity and internet are billed separately.", ko: "전기와 인터넷은 별도로 청구됩니다." },
          { en: "Minimum lease: two years.", ko: "최소 임대 기간은 2년입니다." },
          { en: "Two parking spaces are included; extra spaces are $70 each per month.", ko: "주차 두 면이 포함되며, 추가 주차는 1면당 월 70달러입니다." },
          { en: "Available from July 1. Viewings by appointment: call Marcia Delgado at 555-0188.", ko: "7월 1일부터 입주 가능합니다. 방문은 예약제이며 마르시아 델가도에게 555-0188로 전화하세요." }
        ]
      },
      {
        label: "지문 2 — 문의 이메일",
        header: ["From: Soo-jin Han", "To: m.delgado@trentonworks.com", "Date: May 18", "Subject: Third-floor office"],
        sentences: [
          { en: "Dear Ms. Delgado,", ko: "델가도 씨께," },
          { en: "Our design studio is looking for space from August, and the third floor sounds suitable.", ko: "저희 디자인 스튜디오는 8월부터 쓸 공간을 찾고 있는데 3층이 적합해 보입니다." },
          { en: "We have fourteen employees, six of whom drive to work.", ko: "직원은 14명이고 그중 6명이 차로 출근합니다." },
          { en: "Could you tell me whether the eight rooms can be combined into fewer, larger spaces?", ko: "여덟 개의 방을 더 적고 넓은 공간으로 합칠 수 있는지 알려주시겠어요?" },
          { en: "We would also like to know if a one-year lease is possible, as we may expand again soon.", ko: "또 곧 다시 확장할 수도 있어서 1년 임대가 가능한지도 알고 싶습니다." },
          { en: "I am free to visit on Thursday or Friday afternoon.", ko: "저는 목요일이나 금요일 오후에 방문할 수 있습니다." },
          { en: "Soo-jin Han", ko: "한수진" }
        ]
      }
    ],
    vocab: [
      { w: "lease", m: "임대 계약" },
      { w: "rent", m: "임대료" },
      { w: "be billed separately", m: "별도로 청구되다" },
      { w: "viewing", m: "(매물) 방문, 둘러보기" },
      { w: "combine", m: "합치다" }
    ],
    questions: [
      { q: "Why did Ms. Han write the email?", choices: ["To announce that her studio is expanding", "To request a reduction in the monthly rent", "To confirm a viewing appointment", "To ask about an advertised office space"], answer: 3, explanation: "주제·목적 문제다. 근거: 지문 2(이메일)의 2번째 문장 the third floor sounds suitable 뒤로 방을 합칠 수 있는지, 1년 임대가 되는지를 묻는다. 광고에 나온 3층 사무실에 대해 문의하는 메일이다. 오답: (A) we may expand again soon은 1년 임대를 원하는 이유로 한 번 나올 뿐 확장을 알리는 메일이 아니다. (B) 임대료는 지문 1에만 나오고 한 씨는 깎아 달라고 하지 않았다. (C) 방문 가능한 요일을 알렸을 뿐 이미 잡힌 약속을 확인하는 것이 아니다. 지문 1은 전화로 예약하라고 했다." },
      { q: "How many additional parking spaces would Ms. Han's company need?", choices: ["Two", "Four", "Six", "Eight"], answer: 1, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 2의 3번째 문장 six of whom drive to work. 근거 2: 지문 1의 5번째 줄 Two parking spaces are included. 6면에서 2면을 빼면 4면이 더 필요하다. 오답: 2면(A)은 포함된 수, 6면(C)은 운전하는 직원 수, 8면(D)은 방의 수다." },
      { q: "What is suggested about the office for Ms. Han's company?", choices: ["It could be ready by the time her studio wants to move", "It is too small for fourteen employees", "It includes free electricity", "It comes with enough parking for all drivers"], answer: 0, explanation: "추론 문제다. 근거 1: 지문 1(광고) 6번째 줄 Available from July 1. 근거 2: 지문 2(이메일) 2번째 문장 Our design studio is looking for space from August. 7월부터 쓸 수 있으므로 8월 입주에 맞출 수 있다. 오답: 크기(B)를 문제 삼는 말은 없고, 전기는 별도 청구이며(C), 주차는 두 면만 포함돼 운전하는 직원 6명에게 모자란다(D)." },
      { q: "What does Ms. Han request that differs from the advertised terms?", choices: ["A lower monthly rent", "An earlier move-in date", "Extra storage space", "A shorter lease period"], answer: 3, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 1의 4번째 줄 Minimum lease: two years. 근거 2: 지문 2의 5번째 문장 if a one-year lease is possible. 오답: 임대료(A)는 묻지 않았고, 입주는 지문 2의 2번째 문장에서 8월부터라 7월 1일보다 이른 날(B)이 아니며, 창고(C)는 언급이 없다." },
      { q: "What does Ms. Han offer to do?", choices: ["Sign a contract this week", "Send a deposit in advance", "Visit the building on Thursday or Friday", "Call Ms. Delgado on Monday"], answer: 2, explanation: "근거: 지문 2의 6번째 문장 I am free to visit on Thursday or Friday afternoon. 오답: 이번 주 계약(A)·보증금 선납(B)은 말하지 않았고, 델가도 씨에게 월요일에 전화하겠다(D)는 말도 없다. 지문 1은 전화로 방문 예약을 하라고 했지만 한 씨는 메일로 방문 가능 시간을 알렸다." }
    ]
  },
  {
    id: "rp30", type: "이중 지문", title: "신제품 출시와 도매 주문", strategyId: "r06", recommendedSec: 235,
    parts: [
      {
        label: "지문 1 — 보도자료",
        header: ["FOR IMMEDIATE RELEASE — Kestrel Audio"],
        sentences: [
          { en: "Kestrel Audio will begin shipping its new WR-9 wireless headphones on October 1.", ko: "케스트렐 오디오는 10월 1일부터 신제품 WR-9 무선 헤드폰의 출하를 시작합니다." },
          { en: "The WR-9 offers thirty hours of battery life and folds flat for travel.", ko: "WR-9은 30시간의 배터리 사용 시간을 제공하며 휴대를 위해 납작하게 접힙니다." },
          { en: "Retail price: $149.", ko: "소비자 가격은 149달러입니다." },
          { en: "Retailers ordering before September 15 receive a 15 percent wholesale discount.", ko: "9월 15일 전에 주문하는 소매업체는 도매가에서 15퍼센트 할인을 받습니다." },
          { en: "Minimum order: fifty units.", ko: "최소 주문량은 50대입니다." },
          { en: "Orders placed in advance will ship on October 1 in the order received.", ko: "사전 주문은 접수된 순서대로 10월 1일에 출하됩니다." }
        ]
      },
      {
        label: "지문 2 — 주문 이메일",
        header: ["From: Dmitri Ivanov, Northline Electronics", "To: orders@kestrelaudio.com", "Date: September 10", "Subject: WR-9 order"],
        sentences: [
          { en: "Hello,", ko: "안녕하세요," },
          { en: "We would like to order one hundred WR-9 units for our three stores.", ko: "저희 매장 세 곳을 위해 WR-9 100대를 주문하고 싶습니다." },
          { en: "We expect the early-order discount to apply to this order.", ko: "이번 주문에는 사전 주문 할인이 적용될 것으로 생각합니다." },
          { en: "Our customers often ask about battery life, so the thirty-hour figure will help us sell them.", ko: "저희 고객들이 배터리 사용 시간을 자주 묻기 때문에 30시간이라는 수치가 판매에 도움이 될 것입니다." },
          { en: "Please confirm the delivery date.", ko: "배송 날짜를 확인해 주세요." },
          { en: "We hope to have the units on our shelves on the day shipping begins.", ko: "출하가 시작되는 날에 제품을 진열대에 올리고 싶습니다." },
          { en: "Dmitri Ivanov", ko: "드미트리 이바노프" }
        ]
      }
    ],
    vocab: [
      { w: "wholesale", m: "(형용사) 도매의" },
      { w: "retailer", m: "소매업체" },
      { w: "minimum order", m: "최소 주문량" },
      { w: "unit", m: "(제품) 대, 개" },
      { w: "on our shelves", m: "진열대에" }
    ],
    questions: [
      { q: "What is mentioned as a feature of the WR-9?", choices: ["It is waterproof", "It comes in three colors", "It charges in ten minutes", "It folds flat"], answer: 3, explanation: "근거: 지문 1(보도자료)의 2번째 문장 The WR-9 offers thirty hours of battery life and folds flat for travel. 오답: 방수(A)·색상(B)·급속 충전(C)은 언급되지 않았다." },
      { q: "Why is Northline Electronics likely to receive a discount?", choices: ["Its order was placed before September 15", "It is a long-time customer", "It ordered more than one product", "It paid in advance"], answer: 0, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 1의 4번째 문장 Retailers ordering before September 15 receive a 15 percent wholesale discount. 근거 2: 지문 2 머리글의 Date: September 10. 지문 2 본문은 할인을 기대한다고만 하고 마감일은 말하지 않는다. 오답: 오랜 거래처(B)·여러 제품 주문(C)·선결제(D)는 근거가 없다." },
      { q: "What is suggested about Northline Electronics?", choices: ["It manufactures its own headphones", "It has sold Kestrel products for many years", "It plans to open a new store in October", "It has more than one retail location"], answer: 3, explanation: "추론 문제다. 근거: 지문 2의 2번째 문장 We would like to order one hundred WR-9 units for our three stores. 매장이 셋이라는 말에서 여러 매장을 운영하는 소매업체라고 추론한다. 오답: 오래 거래했다(B)는 근거가 없고, 10월 1일은 출하일이지 새 매장 개점일(C)이 아니며, 다른 회사 헤드폰을 주문하므로 자체 제조(A)도 아니다." },
      { q: "In the email, the word \"figure\" is closest in meaning to", choices: ["shape", "number", "person", "drawing"], answer: 1, word: "figure", part: 2, explanation: "어휘 문제다. 근거: 지문 2(이메일) 4번째 문장 Our customers often ask about battery life, so the thirty-hour figure will help us sell them. 배터리 '30시간'이라는 수치를 가리킨다. 오답: shape(형태)·person(인물, a public figure)·drawing(도형, 그림)은 figure의 다른 뜻이다. 참고: 실제 시험에서는 '문단 2, 3행의 단어'처럼 위치를 알려준다. 이 앱은 문단·행 번호 없이 단어로만 표시하니, 형식이 달라도 당황하지 말자." },
      { q: "What does Mr. Ivanov hope will happen?", choices: ["The price will be lowered", "A free sample will be sent", "The units will arrive by October 1", "The order will be delivered in three parts"], answer: 2, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 2의 6번째 문장 We hope to have the units on our shelves on the day shipping begins. 근거 2: 지문 1의 1번째 문장 will begin shipping ... on October 1. 오답: 가격 인하(A)·무료 샘플(B)은 바라지 않았고, 세 매장용이지만 세 번 나눠 배송(D)해 달라는 말은 없다." }
    ]
  },
  {
    id: "rp31", type: "삼중 지문", title: "사무실 이전", strategyId: "r06", recommendedSec: 270,
    parts: [
      {
        label: "지문 1 — 사내 공지",
        header: ["OFFICE RELOCATION — Fairbrook Analytics"],
        sentences: [
          { en: "We will move from 12 Grant Street to the eighth floor of the Keller Building on Friday, August 14.", ko: "8월 14일 금요일에 그랜트가 12번지에서 켈러 빌딩 8층으로 이전합니다." },
          { en: "Pack your desk by Thursday at 5:00 P.M. and label each box with your name and new room number.", ko: "목요일 오후 5시까지 책상을 정리하고 상자마다 이름과 새 호실 번호를 적어 주세요." },
          { en: "New room numbers are shown on the attached floor plan.", ko: "새 호실 번호는 첨부한 층별 배치도에 나와 있습니다." },
          { en: "Monitors and chairs will be moved by the movers; personal items are your responsibility.", ko: "모니터와 의자는 이삿짐 업체가 옮기며, 개인 물품은 본인이 챙기셔야 합니다." },
          { en: "The office will be closed on August 14, so please work from home that day.", ko: "8월 14일에는 사무실이 닫히니 그날은 재택근무해 주세요." },
          { en: "Questions: Elena Barros, Facilities.", ko: "문의: 시설팀 엘레나 바로스." }
        ]
      },
      {
        label: "지문 2 — 이사 견적서",
        header: ["MOVING ESTIMATE — Caldwell Movers"],
        sentences: [
          { en: "Client: Fairbrook Analytics | Date of move: August 14", ko: "고객: 페어브룩 애널리틱스 | 이사 날짜: 8월 14일" },
          { en: "Packing boxes (120): $240", ko: "포장 상자 (120개): 240달러" },
          { en: "Labor, four movers, eight hours: $1,600", ko: "인건비, 작업자 4명, 8시간: 1,600달러" },
          { en: "Truck and fuel: $350", ko: "트럭과 연료: 350달러" },
          { en: "Furniture disassembly and setup: $400", ko: "가구 분해 및 설치: 400달러" },
          { en: "Subtotal: $2,590", ko: "소계: 2,590달러" },
          { en: "Weekend surcharge, added only if the move takes place on a Saturday or Sunday: $300", ko: "주말 추가 요금, 토요일이나 일요일에 이사할 경우에만 부과: 300달러" },
          { en: "This estimate is valid for thirty days.", ko: "이 견적서는 30일간 유효합니다." }
        ]
      },
      {
        label: "지문 3 — 직원 이메일",
        header: ["From: Marcus Oyelaran", "To: Elena Barros", "Date: August 10", "Subject: Boxes and Friday"],
        sentences: [
          { en: "Hi Elena,", ko: "엘레나 씨," },
          { en: "I will be at a client site all day Thursday, so I cannot pack before the deadline.", ko: "목요일에는 하루 종일 고객사에 있어서 마감 전에 짐을 쌀 수 없습니다." },
          { en: "Could I come in on Wednesday evening and pack then instead?", ko: "대신 수요일 저녁에 나와서 짐을 싸도 될까요?" },
          { en: "Also, I counted only about ninety boxes in the supply room.", ko: "그리고 비품실에 상자가 90개 정도밖에 없었습니다." },
          { en: "One more thing: my new room number is not on the floor plan you sent.", ko: "한 가지 더, 보내주신 평면도에 제 새 호실 번호가 없습니다." },
          { en: "Thanks, Marcus", ko: "감사합니다. 마커스" }
        ]
      }
    ],
    vocab: [
      { w: "relocation", m: "이전" },
      { w: "label", m: "(이름 등을) 적어 붙이다" },
      { w: "estimate", m: "견적서" },
      { w: "surcharge", m: "추가 요금" },
      { w: "disassembly", m: "분해" }
    ],
    questions: [
      { q: "Why was the office relocation notice written?", choices: ["To announce a change in office hours", "To explain how an office move will work", "To request a budget increase", "To introduce a new facilities manager"], answer: 1, explanation: "근거: 지문 1(사내 공지)의 1번째부터 5번째 문장. 이사 날짜, 짐 싸는 방법, 업체가 옮기는 물건, 당일 재택근무를 안내한다. 오답: 영업시간 변경(A)이 아니라 이사 당일 하루 휴무이고, 예산 요청(C)·새 시설 담당자 소개(D)는 없다. 엘레나 바로스는 문의처로만 나온다." },
      { q: "What will Mr. Oyelaran most likely do on August 14?", choices: ["Visit a client site", "Pack his desk", "Help the movers", "Work from home"], answer: 3, explanation: "추론 문제다. 근거 1: 지문 1(공지) 1번째 문장 We will move ... on Friday, August 14. 근거 2: 지문 1의 5번째 문장 The office will be closed on August 14, so please work from home that day. 이사 날 사무실이 닫으므로 오옐라란 씨도 집에서 일한다. 오답: 고객사 방문(A)은 목요일, 짐 싸기(B)는 수요일 저녁에 하겠다고 한 일이고, 이삿짐 업체를 돕는다(C)는 말은 없다. 짐 옮기기는 업체 몫이다." },
      { q: "Why will Fairbrook Analytics most likely NOT pay the surcharge?", choices: ["The move is scheduled for a weekday", "The estimate has expired", "The company booked early", "Fewer movers were needed"], answer: 0, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 2의 7번째 줄 Weekend surcharge, added only if the move takes place on a Saturday or Sunday. 근거 2: 지문 1의 1번째 문장 on Friday, August 14. 지문 2에는 날짜만 있고 요일이 없다. 오답: 견적은 30일간 유효하므로 만료(B) 근거가 없고, 조기 예약(C)·인원 감소(D)는 언급이 없다." },
      { q: "What does Mr. Oyelaran suggest about the boxes?", choices: ["They are the wrong size", "There are fewer than the estimate lists", "They have already been labeled", "They were delivered to the new office"], answer: 1, explanation: "연계 문제다(지문 2 + 지문 3). 근거 1: 지문 2의 2번째 줄 Packing boxes (120). 근거 2: 지문 3의 4번째 문장 I counted only about ninety boxes in the supply room. 오답: 크기(A)·이름표(C)·새 사무실 배송(D)은 말하지 않았다." },
      { q: "What does Mr. Oyelaran ask permission to do?", choices: ["Pack his desk a day early", "Work from home on Thursday", "Skip the move entirely", "Choose his own room number"], answer: 0, explanation: "근거: 지문 3의 2번째·3번째 문장 I will be at a client site all day Thursday ... Could I come in on Wednesday evening and pack then instead? 마감은 지문 1의 2번째 문장대로 목요일이라 하루 이르다. 오답: 목요일에는 고객사에 있으므로 재택근무(B)가 아니고, 이사를 빠지겠다(C)거나 방 번호를 고르겠다(D)는 말은 없다. 방 번호는 배치도에 없다고 알린 것뿐이다." }
    ]
  },
  {
    id: "rp32", type: "삼중 지문", title: "주전자 리콜", strategyId: "r06", recommendedSec: 265,
    parts: [
      {
        label: "지문 1 — 리콜 공고",
        header: ["SAFETY RECALL — Nordvik Kettles, Model K-220"],
        sentences: [
          { en: "Nordvik is recalling all K-220 electric kettles sold between March 1 and July 31.", ko: "노르드빅은 3월 1일부터 7월 31일 사이에 판매된 모든 K-220 전기 주전자를 회수합니다." },
          { en: "The handle can loosen after repeated use, which may cause hot water to spill.", ko: "반복 사용 후 손잡이가 헐거워져 뜨거운 물이 쏟아질 수 있습니다." },
          { en: "Stop using the kettle immediately.", ko: "즉시 사용을 중단하십시오." },
          { en: "Owners may choose a full refund or a free replacement with the newer K-240.", ko: "소유자는 전액 환불이나 신형 K-240으로의 무상 교환 중 선택할 수 있습니다." },
          { en: "The model number is printed on the base of the kettle.", ko: "모델 번호는 주전자 바닥에 적혀 있습니다." },
          { en: "To start a claim, call 1-800-555-0119 or visit nordvik.com/recall.", ko: "신청하시려면 1-800-555-0119로 전화하거나 nordvik.com/recall을 방문하세요." }
        ]
      },
      {
        label: "지문 2 — 고객 이메일",
        header: ["From: Hana Petrov", "To: support@nordvik.com", "Date: September 8", "Subject: Recall — K-220"],
        sentences: [
          { en: "Hello,", ko: "안녕하세요," },
          { en: "I bought my kettle in May, and the handle has already become loose.", ko: "5월에 주전자를 샀는데 손잡이가 벌써 헐거워졌습니다." },
          { en: "I would prefer the replacement rather than a refund, since I am happy with everything else about it.", ko: "다른 점은 모두 만족해서 환불보다 교환을 원합니다." },
          { en: "I no longer have the receipt. Is the model number enough?", ko: "영수증이 더는 없습니다. 모델 번호만으로 충분한가요?" },
          { en: "Also, should I send the old kettle back, and who pays for the shipping?", ko: "그리고 기존 주전자를 돌려보내야 하나요? 배송비는 누가 부담하나요?" },
          { en: "Hana Petrov", ko: "하나 페트로프" }
        ]
      },
      {
        label: "지문 3 — 고객센터 회신",
        header: ["From: Nordvik Support", "To: Hana Petrov", "Date: September 9", "Subject: RE: Recall — K-220"],
        sentences: [
          { en: "Dear Ms. Petrov,", ko: "페트로프 님께," },
          { en: "No receipt is needed; the model number is enough.", ko: "영수증은 필요 없으며, 모델 번호면 충분합니다." },
          { en: "We will send a K-240 within ten business days.", ko: "영업일 기준 10일 안에 K-240을 보내 드리겠습니다." },
          { en: "A prepaid return label is included in the box, so there is no cost to you.", ko: "상자 안에 선불 반송 라벨이 들어 있어 고객님 부담은 없습니다." },
          { en: "Please note that the K-240 uses a different lid, so the old lid cannot be reused.", ko: "K-240은 뚜껑이 달라서 기존 뚜껑은 재사용할 수 없습니다." },
          { en: "Nordvik Support", ko: "노르드빅 고객센터" }
        ]
      }
    ],
    vocab: [
      { w: "recall", m: "(결함 제품의) 회수, 리콜" },
      { w: "loosen", m: "헐거워지다" },
      { w: "replacement", m: "교환품" },
      { w: "prepaid", m: "선불의" },
      { w: "reuse", m: "재사용하다" }
    ],
    questions: [
      { q: "What is the problem with the K-220?", choices: ["It heats water too slowly", "Its handle can come loose", "Its cord is too short", "It does not turn off automatically"], answer: 1, explanation: "근거: 지문 1(리콜 공고)의 2번째 문장 The handle can loosen after repeated use. 오답: 가열 속도(A)·전선 길이(C)·자동 꺼짐(D)은 언급되지 않았다." },
      { q: "What are owners asked to do first?", choices: ["Stop using the kettle", "Mail in the receipt", "Visit a repair center", "Remove the base"], answer: 0, explanation: "근거: 지문 1의 3번째 문장 Stop using the kettle immediately. 오답: 영수증 우송(B)은 지문 3의 2번째 문장에서 필요 없다고 했고, 수리 센터 방문(C)·받침 분리(D)는 없다. 받침(base)은 모델 번호가 있는 곳이다." },
      { q: "Why is Ms. Petrov eligible for the recall?", choices: ["She registered the product", "She bought the kettle within the stated period", "She is a returning customer", "She reported the problem by phone"], answer: 1, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 1의 1번째 문장 sold between March 1 and July 31. 근거 2: 지문 2의 2번째 문장 I bought my kettle in May. 오답: 제품 등록(A)·재구매 고객(C)·전화 신고(D)는 근거가 없다. 페트로프 씨는 메일로 문의했다." },
      { q: "Where can Ms. Petrov find the information Nordvik needs to process her claim?", choices: ["On the base of the kettle", "On her original receipt", "On the product box", "On the handle"], answer: 0, explanation: "연계 문제다(지문 1 + 지문 3). 근거 1: 지문 3의 2번째 문장 No receipt is needed; the model number is enough. 근거 2: 지문 1의 5번째 문장 The model number is printed on the base of the kettle. 지문 3은 모델 번호면 된다고만 하고 위치는 말하지 않는다. 오답: 영수증(B)은 필요 없다고 했고, 상자(C)·손잡이(D)에 모델 번호가 있다는 말은 없다. 손잡이는 결함 부위다." },
      { q: "What is indicated about the K-240?", choices: ["It costs more than the K-220", "Its lid is not the same as the K-220's", "It is sold only online", "It comes in one color"], answer: 1, explanation: "근거: 지문 3의 5번째 문장 the K-240 uses a different lid, so the old lid cannot be reused. 오답: 가격(A)·온라인 전용(C)·색상(D)은 언급되지 않았다." }
    ]
  },
  {
    id: "rp33", type: "이중 지문", title: "잡지 구독 문의", strategyId: "r06", recommendedSec: 235,
    parts: [
      {
        label: "지문 1 — 구독 안내",
        header: ["CIVIC REVIEW — Subscription Options"],
        sentences: [
          { en: "Print only: $48 a year (12 issues, delivered monthly)", ko: "인쇄본만: 연 48달러 (매월 배송, 12호)" },
          { en: "Digital only: $30 a year (includes the full archive since 2008)", ko: "디지털만: 연 30달러 (2008년 이후 전체 기사 보관함 포함)" },
          { en: "Print and digital: $60 a year", ko: "인쇄본과 디지털: 연 60달러" },
          { en: "Students receive 40 percent off any plan with a valid school e-mail address.", ko: "학생은 유효한 학교 이메일 주소로 모든 요금제에서 40퍼센트 할인을 받습니다." },
          { en: "Subscriptions renew automatically unless you cancel fourteen days before the renewal date.", ko: "갱신일 14일 전에 취소하지 않으면 구독이 자동으로 갱신됩니다." },
          { en: "Gift subscriptions are available but cannot be combined with the student discount.", ko: "선물 구독도 가능하지만 학생 할인과 함께 적용할 수는 없습니다." }
        ]
      },
      {
        label: "지문 2 — 문의 이메일",
        header: ["From: Omar Castellanos", "To: subs@civicreview.org", "Date: February 3", "Subject: Student rate and gift"],
        sentences: [
          { en: "Hello,", ko: "안녕하세요," },
          { en: "I am a graduate student and would like the print and digital plan at the student rate.", ko: "저는 대학원생이고 인쇄본과 디지털 요금제를 학생가로 구독하고 싶습니다." },
          { en: "Could you confirm what I would pay for the first year?", ko: "첫해에 얼마를 내게 되는지 확인해 주시겠어요?" },
          { en: "I also want to buy a one-year digital subscription for my sister, who is not a student.", ko: "학생이 아닌 제 여동생을 위해 1년 디지털 구독도 사고 싶습니다." },
          { en: "Finally, I will be moving in April. How much notice do you need for a change of address?", ko: "마지막으로 4월에 이사합니다. 주소 변경은 얼마나 미리 알려야 하나요?" },
          { en: "Omar Castellanos", ko: "오마르 카스텔라노스" }
        ]
      }
    ],
    vocab: [
      { w: "subscription", m: "구독" },
      { w: "archive", m: "(과거 기사) 보관함" },
      { w: "renew automatically", m: "자동으로 갱신되다" },
      { w: "combine with", m: "~와 함께 적용하다" },
      { w: "notice", m: "사전 통지" }
    ],
    questions: [
      { q: "Why did Mr. Castellanos write the email?", choices: ["To report that he has moved to a new address", "To ask about starting new subscriptions", "To cancel an automatic renewal", "To complain about the price of the print edition"], answer: 1, explanation: "주제·목적 문제다. 근거: 지문 2(이메일)의 2번째 문장부터 4번째 문장까지. 학생 요금으로 인쇄+디지털 플랜을 원한다며 첫해 금액을 묻고, 동생에게 줄 디지털 구독도 사고 싶다고 한다. 새 구독 두 건에 대한 문의다. 오답: (A) 주소 변경은 마지막 질문으로 한 번 나오고, 4월에 이사할 예정이라 아직 이사하지 않았다. (C) 자동 갱신은 지문 1의 안내에만 나온다. (D) 인쇄판 가격은 지문 1에 있지만 불만을 말하지 않았다." },
      { q: "How much will Mr. Castellanos most likely pay for his own subscription?", choices: ["$18", "$30", "$36", "$60"], answer: 2, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 2의 2번째 문장 I am a graduate student and would like the print and digital plan at the student rate. 근거 2: 지문 1의 3번째·4번째 줄 Print and digital: $60 / Students receive 40 percent off. 60달러에서 40퍼센트를 빼면 36달러다. 오답: 18달러(A)는 디지털 플랜에 할인을 적용한 값, 30달러(B)는 디지털 정가, 60달러(D)는 할인 전 가격이다." },
      { q: "What is indicated about the subscription for Mr. Castellanos's sister?", choices: ["It will be discounted", "It will cost the full price", "It is not available", "It must include print"], answer: 1, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 2의 4번째 문장 a one-year digital subscription for my sister, who is not a student. 근거 2: 지문 1의 6번째 줄 Gift subscriptions ... cannot be combined with the student discount. 선물 구독이라 학생 할인이 안 되고, 동생도 학생이 아니다. 오답: 할인(A)이 안 되고, 선물 구독은 가능하다고 했으므로 불가(C)가 아니며, 디지털 플랜을 원하므로 인쇄 포함(D)도 아니다." },
      { q: "What else does Mr. Castellanos ask about?", choices: ["Changing his address", "Canceling a past order", "Writing for the magazine", "Receiving a sample issue"], answer: 0, explanation: "근거: 지문 2의 5번째 문장 How much notice do you need for a change of address? 오답: 지난 주문 취소(B)·기고(C)·견본호(D)는 묻지 않았다." },
      { q: "What must a subscriber do to avoid automatic renewal?", choices: ["Call the office each year", "Cancel at least two weeks in advance", "Pay by check", "Choose the digital plan"], answer: 1, explanation: "근거: 지문 1의 5번째 줄 Subscriptions renew automatically unless you cancel fourteen days before the renewal date. 14일을 two weeks로 바꿔 표현했다. 오답: 매년 전화(A)·수표 결제(C)·디지털 플랜(D)은 자동 갱신과 관계가 없다." }
    ]
  },
  {
    id: "rp34", type: "이중 지문", title: "식당 후기와 답글", strategyId: "r06", recommendedSec: 230,
    parts: [
      {
        label: "지문 1 — 이용 후기",
        header: ["Review: Marisol's Kitchen, 44 Dunne Street", "Posted by: Theo Lindqvist | May 12 | Rating: 4 of 5"],
        sentences: [
          { en: "The lamb stew was the best I have had in this city, and the bread is baked on site.", ko: "양고기 스튜는 이 도시에서 먹어 본 중 최고였고 빵은 매장에서 직접 굽는다." },
          { en: "Service was friendly but slow; we waited almost forty minutes for our main course on a Tuesday evening.", ko: "서비스는 친절했지만 느렸다. 화요일 저녁인데도 주요리를 40분 가까이 기다렸다." },
          { en: "The dining room is small, with only twelve tables, so reservations are essential on weekends.", ko: "식사 공간은 테이블이 12개뿐이라 작아서 주말에는 예약이 필수다." },
          { en: "Prices are fair: most main dishes are between $16 and $22.", ko: "가격은 합리적이다. 대부분의 주요리가 16달러에서 22달러 사이다." },
          { en: "I would go again, but I would not bring a large group.", ko: "다시 가겠지만 많은 인원과 함께 가지는 않겠다." }
        ]
      },
      {
        label: "지문 2 — 사장 답글",
        header: ["Response from the owner, Marisol Vega | May 14"],
        sentences: [
          { en: "Thank you for the kind words about the stew.", ko: "스튜를 좋게 봐주셔서 감사합니다." },
          { en: "You are right about the wait that evening. Our second cook was ill, and we were short-staffed.", ko: "그날 저녁 대기 시간에 대한 지적이 맞습니다. 두 번째 요리사가 아파서 인력이 부족했습니다." },
          { en: "We have since hired two part-time cooks, and we now take reservations on weekdays as well.", ko: "그 뒤로 시간제 요리사 두 명을 채용했고, 이제 평일에도 예약을 받습니다." },
          { en: "We are also opening a second dining room next door in September, which will add fourteen tables.", ko: "9월에는 옆 공간에 두 번째 식사 공간을 열어 테이블 14개를 더합니다." },
          { en: "We hope you will give us another try.", ko: "다시 한번 찾아 주시기를 바랍니다." }
        ]
      }
    ],
    vocab: [
      { w: "baked on site", m: "매장에서 직접 구운" },
      { w: "main course", m: "주요리" },
      { w: "essential", m: "필수적인" },
      { w: "short-staffed", m: "인력이 부족한" },
      { w: "part-time", m: "시간제의" }
    ],
    questions: [
      { q: "Why did Ms. Vega write the response?", choices: ["To recruit additional part-time cooks", "To explain a new weekend reservation policy", "To announce the opening of a second location", "To reply to a review and describe changes"], answer: 3, explanation: "주제·목적 문제다. 근거: 지문 2(답글)의 1번째·2번째 문장에서 후기의 칭찬과 지적에 답하고, 3번째·4번째 문장에서 그 뒤에 바뀐 점(요리사 채용·평일 예약·새 홀)을 알린다. 후기에 대한 답과 개선 사항 안내다. 오답: (A) 요리사는 이미 뽑았다(have since hired)고 했으므로 모집하는 글이 아니다. (C) 9월에 여는 것은 옆 건물의 두 번째 홀이지 두 번째 지점이 아니고, 4번째 문장 하나에 해당한다. (B) 새로 바뀐 것은 평일(weekdays) 예약이고, 주말 예약은 후기에서 이미 필수라고 했다." },
      { q: "What is suggested about Mr. Lindqvist's visit?", choices: ["He visited the restaurant on a weekend", "He came with a large group", "He could not have reserved a table for that evening", "He was served by the owner"], answer: 2, explanation: "추론 문제다. 근거 1: 지문 1(후기) 2번째 문장 on a Tuesday evening. 근거 2: 지문 2(답글) 3번째 문장 we now take reservations on weekdays as well. 지금은 평일에도 예약을 받는다는 말에서, 그가 왔던 화요일에는 예약을 받지 않았다는 것을 알 수 있다. 오답: 주말(A)이 아니라 화요일이고, 단체로 가지 않겠다(B)는 다음 방문 이야기이며, 사장이 서빙했다(D)는 근거가 없다." },
      { q: "On which day was Marisol's Kitchen short-staffed?", choices: ["Monday", "Tuesday", "Saturday", "Sunday"], answer: 1, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 2의 2번째 문장 You are right about the wait that evening. Our second cook was ill, and we were short-staffed. 근거 2: 지문 1의 2번째 문장 on a Tuesday evening. 오답: 월요일(A)은 근거가 없고, 토요일(C)·일요일(D)은 예약이 필요하다고 한 주말이다." },
      { q: "How many tables will the restaurant have after September?", choices: ["Twelve", "Fourteen", "Twenty-six", "Twenty-eight"], answer: 2, explanation: "연계 문제다(지문 1 + 지문 2). 근거 1: 지문 1의 3번째 문장 only twelve tables. 근거 2: 지문 2의 4번째 문장 a second dining room ... which will add fourteen tables. 12 + 14 = 26. 오답: 12개(A)는 지금, 14개(B)는 새로 늘어나는 수이고, 28개(D)는 근거가 없다." },
      { q: "What has the restaurant already done?", choices: ["Lowered its prices", "Hired additional cooks", "Opened the second dining room", "Stopped taking reservations"], answer: 1, explanation: "근거: 지문 2의 3번째 문장 We have since hired two part-time cooks. 오답: 가격 인하(A)는 없고, 두 번째 공간(C)은 4번째 문장에서 9월에 열 예정이며, 예약은 평일에도 받기 시작했으므로 중단(D)이 아니다." }
    ]
  }
];

window.PART6 = [
  {
    id: "p601", title: "구내식당 운영 시간 변경", recommendedSec: 120,
    header: ["Attention all employees:"],
    blocks: [
      { type: "text", en: "Beginning next month, the company cafeteria will " },
      { type: "blank", n: 1 },
      { type: "text", en: " new operating hours. It will open at 7:30 a.m. and close at 7:00 p.m. This change was made " },
      { type: "blank", n: 2 },
      { type: "text", en: " feedback from staff members who work early shifts. " },
      { type: "blank", n: 3 },
      { type: "text", en: " We appreciate your understanding during the transition. Please direct any questions " },
      { type: "blank", n: 4 },
      { type: "text", en: " the facilities manager." }
    ],
    ko: "전 직원 안내: 다음 달부터 구내식당 운영 시간이 바뀝니다. 오전 7시 30분에 열고 오후 7시에 닫습니다. 이번 변경은 이른 교대 근무 직원들의 의견을 반영한 것입니다. 새 운영 시간은 입구에 게시될 예정입니다. 전환 기간 동안 양해해 주셔서 감사합니다. 문의 사항은 시설 관리자에게 전달해 주세요.",
    vocab: [
      { w: "operating hours", m: "운영 시간" },
      { w: "feedback", m: "의견, 피드백" },
      { w: "early shift", m: "아침 일찍 시작하는 근무" },
      { w: "transition", m: "전환, 이행" },
      { w: "facilities manager", m: "시설 관리자" }
    ],
    questions: [
      { n: 1, type: "grammar", choices: ["adopting", "adopts", "adopt", "adopted"], answer: 2, explanation: "조동사 will 뒤는 동사원형 자리다(g13). 오답: adopts는 3인칭 현재형, adopting은 -ing, adopted는 과거형·과거분사라 will 뒤에 올 수 없다.", ruleId: "g13" },
      { n: 2, type: "grammar", choices: ["because", "in response to", "although", "despite"], answer: 1, explanation: "빈칸 뒤가 명사구(feedback from staff members)라 전치사가 필요하다(g07). because·although는 접속사라 뒤에 주어+동사가 와야 한다. 남은 전치사 둘 중 despite는 '의견에도 불구하고'라 일찍 여는 변경과 맞지 않는다. 일찍 근무하는 직원의 의견을 반영했으므로 in response to.", ruleId: "g07" },
      { n: 3, type: "sentence", choices: ["The new hours will be posted at the entrance.", "The cafeteria will be closed permanently.", "Employees must bring their own lunch.", "The manager has resigned."], answer: 0, explanation: "문장 삽입이다. 앞 문장은 변경 이유, 뒤 문장은 '전환 기간 동안 양해 부탁'이다. 새 시간을 입구에 게시한다는 안내가 자연스럽다. 오답: 영구 폐쇄(B)는 새 운영 시간 안내와 모순이고, 도시락 지참(C)은 식당이 계속 운영되므로 맞지 않으며, 관리자 사임(D)은 마지막 문장에서 시설 관리자에게 문의하라는 말과 맞지 않는다.", ruleId: null },
      { n: 4, type: "grammar", choices: ["with", "on", "by", "to"], answer: 3, explanation: "direct A to B(A를 B에게 보내다)는 to를 쓴다(g06). 오답: on·by·with는 direct와 짝을 이루지 않는다.", ruleId: "g06" }
    ]
  },
  {
    id: "p602", title: "주문 발송 안내", recommendedSec: 120,
    header: ["Dear Mr. Alvarez,"],
    blocks: [
      { type: "text", en: "Thank you for your recent purchase. Your order " },
      { type: "blank", n: 1 },
      { type: "text", en: " on November 3 and should arrive within five business days. If you need to change the delivery address, please contact us " },
      { type: "blank", n: 2 },
      { type: "text", en: " Friday. " },
      { type: "blank", n: 3 },
      { type: "text", en: " Customers who sign up for our newsletter receive a 10 percent discount on their " },
      { type: "blank", n: 4 },
      { type: "text", en: " order." }
    ],
    ko: "알바레즈 님께, 최근 구매해 주셔서 감사합니다. 주문하신 물품은 11월 3일에 발송되었으며 영업일 기준 5일 이내에 도착할 예정입니다. 배송지를 변경하셔야 한다면 금요일까지 연락 주세요. 저희 소식지도 구독해 보세요. 소식지를 신청하신 고객은 다음 주문 시 10퍼센트 할인을 받으십니다.",
    vocab: [
      { w: "purchase", m: "구매" },
      { w: "business day", m: "영업일" },
      { w: "delivery address", m: "배송 주소" },
      { w: "sign up for", m: "~에 가입하다, 신청하다" },
      { w: "discount", m: "할인" }
    ],
    questions: [
      { n: 1, type: "grammar", choices: ["to ship", "shipper", "was shipped", "shipping"], answer: 2, explanation: "빈칸은 문장의 동사 자리이고, 주문은 '발송되는' 쪽이라 수동태다(g04). 빈칸 뒤에 목적어가 없다는 것도 근거다. 오답: to ship(to부정사)·shipper(명사)·shipping(-ing)은 혼자서 동사가 될 수 없다.", ruleId: "g04" },
      { n: 2, type: "grammar", choices: ["by", "until", "during", "since"], answer: 0, explanation: "금요일까지 연락을 '끝내라'는 마감이라 by다(g06). 오답: until은 계속되는 동작에 쓰고, during은 기간 명사 앞, since는 '그때부터 지금까지'라 맞지 않는다.", ruleId: "g06" },
      { n: 3, type: "sentence", choices: ["We are closing our store next month.", "Please return the item within 7 days.", "Your refund has been processed.", "You may also want to subscribe to our newsletter."], answer: 3, explanation: "문장 삽입이다. 뒤 문장이 '소식지를 신청한 고객은 할인을 받는다'라서 소식지를 처음 꺼내는 문장이 먼저 와야 한다. 오답: 매장 폐점(A)은 할인 안내와 맞지 않고, 환불 처리(C)·반품 기한(B)은 발송 안내 메일과 맞지 않으며 소식지로 이어지지 않는다.", ruleId: null },
      { n: 4, type: "vocab", choices: ["next", "nearest", "later", "previous"], answer: 0, explanation: "'다음 주문'이라는 뜻이라 next order다. 오답: nearest는 거리, later는 '나중의'라 소유격 뒤 주문 앞에 쓰지 않고, previous는 '이전 주문'이라 신청한 뒤에 받는 할인과 맞지 않는다.", ruleId: null }
    ]
  },
  {
    id: "p603", title: "사무실 이전 안내", recommendedSec: 120,
    header: ["To all staff:"],
    blocks: [
      { type: "text", en: "Our Chicago office will " },
      { type: "blank", n: 1 },
      { type: "text", en: " to a new building on October 2. The new address is 410 Lakeside Drive, just two blocks from the current location. " },
      { type: "blank", n: 2 },
      { type: "text", en: " Movers will pack all equipment on October 1, so please clear your desk by the end of that day. Personal items " },
      { type: "blank", n: 3 },
      { type: "text", en: " be labeled with your name. If you have questions about the move, " },
      { type: "blank", n: 4 },
      { type: "text", en: " contact the operations team." }
    ],
    ko: "전 직원에게 알립니다. 시카고 사무소가 10월 2일에 새 건물로 이전합니다. 새 주소는 레이크사이드 드라이브 410번지로, 현재 위치에서 두 블록 거리입니다. 이전으로 영업시간이 달라지지는 않습니다. 이삿짐 업체가 10월 1일에 모든 장비를 포장하므로, 그날까지 책상을 비워 주세요. 개인 물품에는 이름을 표시해야 합니다. 이전에 관한 문의는 운영팀으로 연락해 주세요.",
    vocab: [
      { w: "mover", m: "이삿짐 업체 직원" },
      { w: "pack", m: "(짐을) 싸다, 포장하다" },
      { w: "clear your desk", m: "책상을 비우다" },
      { w: "label", m: "라벨을 붙이다, 표시하다" },
      { w: "operations team", m: "운영팀" }
    ],
    questions: [
      { n: 1, type: "grammar", choices: ["relocate", "relocates", "relocating", "relocated"], answer: 0, explanation: "조동사 will 뒤는 동사원형 자리다(g13). 오답: relocates·relocating·relocated는 will 뒤에 올 수 없다.", ruleId: "g13" },
      { n: 2, type: "sentence", choices: ["The company is closing its Chicago branch.", "The building will be demolished next year.", "All staff will work remotely from now on.", "The move will not affect business hours."], answer: 3, explanation: "문장 삽입이다. 앞 문장이 새 주소, 뒤 문장이 이삿짐 일정이라 이전에 관한 실무 안내가 이어져야 한다. 영업시간에는 영향이 없다는 안내가 자연스럽다. 오답: 건물 철거(B)·전원 재택(C)·지사 폐쇄(A)는 새 건물로 옮긴다는 공지와 모순된다.", ruleId: null },
      { n: 3, type: "grammar", choices: ["having", "are", "should", "to be"], answer: 2, explanation: "빈칸 뒤에 동사원형 be가 있어 조동사가 필요하다(g13). 오답: are는 뒤에 be가 올 수 없고, having·to be는 문장의 동사가 되지 못한다.", ruleId: "g13" },
      { n: 4, type: "grammar", choices: ["pleasure", "pleased", "pleasing", "please"], answer: 3, explanation: "명령문이라 동사원형 contact 앞에 정중 표현 please가 온다(g12). 오답: pleased·pleasing은 형용사·분사, pleasure는 명사라 명령문 앞에 올 수 없다.", ruleId: "g12" }
    ]
  },
  {
    id: "p604", title: "제품 리콜 안내", recommendedSec: 120,
    header: ["Dear Customer,"],
    blocks: [
      { type: "text", en: "We are writing to inform you of a voluntary recall of our model X20 kettle. A small number of units " },
      { type: "blank", n: 1 },
      { type: "text", en: " with a faulty power switch. " },
      { type: "blank", n: 2 },
      { type: "text", en: " If you own one, stop using it immediately and return it to any store location. You will receive a full refund " },
      { type: "blank", n: 3 },
      { type: "text", en: " a replacement, whichever you prefer. We apologize for the " },
      { type: "blank", n: 4 },
      { type: "text", en: " and thank you for your understanding." }
    ],
    ko: "고객님께, 저희 X20 모델 주전자의 자발적 리콜을 알려드립니다. 일부 제품이 전원 스위치 결함이 있는 상태로 출고되었습니다. 현재까지 부상 사례는 보고되지 않았습니다. 해당 제품을 보유하고 계시면 즉시 사용을 중단하시고 가까운 매장으로 반납해 주세요. 원하시는 대로 전액 환불 또는 교환을 받으실 수 있습니다. 불편을 드려 죄송하며 양해해 주셔서 감사합니다.",
    vocab: [
      { w: "voluntary recall", m: "자발적 리콜(회수)" },
      { w: "unit", m: "(제품) 한 대, 한 개" },
      { w: "faulty", m: "결함이 있는" },
      { w: "full refund", m: "전액 환불" },
      { w: "replacement", m: "교환품, 대체품" }
    ],
    questions: [
      { n: 1, type: "grammar", choices: ["ship", "shipper", "were shipped", "shipping"], answer: 2, explanation: "빈칸은 동사 자리이고, 제품은 '출고되는' 쪽이라 수동태다(g04). 주어 units가 복수라 were. 오답: ship은 능동형이라 목적어가 필요하고, shipper(명사)·shipping(-ing)은 동사가 못 된다.", ruleId: "g04" },
      { n: 2, type: "sentence", choices: ["No injuries have been reported so far.", "All X20 kettles have been checked and are safe to use.", "Our stores will close permanently next month.", "The kettle won a design award last year."], answer: 0, explanation: "문장 삽입이다. 앞 문장은 결함 내용, 뒤 문장은 '사용을 멈추고 반납하라'다. 피해 여부를 알리는 문장이 자연스럽다. 오답: '모두 점검해서 안전하다'(B)는 바로 뒤의 사용 중단 요청과 모순이고, 매장 영구 폐쇄(C)는 매장으로 반납하라는 말과 모순이며, 디자인상 수상(D)은 리콜 안내와 관계가 없다.", ruleId: null },
      { n: 3, type: "grammar", choices: ["and", "or", "but", "nor"], answer: 1, explanation: "whichever you prefer(둘 중 원하는 쪽)가 뒤에 오므로 둘 중 하나를 고르는 or다(g14). 오답: and는 둘 다, but은 대조, nor는 부정문에 쓴다.", ruleId: "g14" },
      { n: 4, type: "grammar", choices: ["inconveniently", "inconvenient", "inconvenience", "inconvenienced"], answer: 2, explanation: "the 뒤는 명사 자리다(g01). apologize for the inconvenience는 사과문 정형 표현이다. 오답: inconvenient는 형용사, inconveniently는 부사, inconvenienced는 동사의 과거형·과거분사다.", ruleId: "g01" }
    ]
  },
  {
    id: "p605", title: "구독 갱신 안내", recommendedSec: 120,
    header: ["Dear Ms. Patel,"],
    blocks: [
      { type: "text", en: "Your subscription to Modern Design Monthly " },
      { type: "blank", n: 1 },
      { type: "text", en: " on December 31. To continue receiving the magazine without interruption, please renew " },
      { type: "blank", n: 2 },
      { type: "text", en: " December 15. Renewing online is the " },
      { type: "blank", n: 3 },
      { type: "text", en: " of our three renewal options, and it takes less than two minutes. " },
      { type: "blank", n: 4 },
      { type: "text", en: " We value your readership and hope to serve you for another year." }
    ],
    ko: "파텔 님께, 모던 디자인 먼슬리 구독이 12월 31일에 만료됩니다. 잡지를 끊김 없이 계속 받아보시려면 12월 15일까지 갱신해 주세요. 온라인 갱신은 세 가지 갱신 방법 중 가장 빠르며 2분도 걸리지 않습니다. 일찍 갱신하신 구독자께는 무료 에코백을 드립니다. 저희 잡지를 읽어주셔서 감사드리며 내년에도 함께하기를 바랍니다.",
    vocab: [
      { w: "subscription", m: "구독" },
      { w: "without interruption", m: "중단 없이" },
      { w: "renew", m: "(구독을) 갱신하다" },
      { w: "option", m: "방법, 선택지" },
      { w: "readership", m: "독자층, 독자 수" }
    ],
    questions: [
      { n: 1, type: "grammar", choices: ["expire", "expiring", "expired", "expires"], answer: 3, explanation: "주어 Your subscription이 단수이고, 정해진 미래 일정이라 현재형 expires다(g02). 오답: expire는 복수 주어용이고, expired는 이미 끝났다는 뜻이라 '끊김 없이 받으려면 갱신하라'와 맞지 않으며, expiring은 혼자 동사가 될 수 없다.", ruleId: "g02" },
      { n: 2, type: "grammar", choices: ["by", "until", "during", "since"], answer: 0, explanation: "12월 15일까지 갱신을 '끝내라'는 마감이라 by다(g06). 오답: until은 계속, during은 기간 명사 앞, since는 '그때부터'라 맞지 않는다.", ruleId: "g06" },
      { n: 3, type: "grammar", choices: ["fast", "faster", "fastest", "more fast"], answer: 2, explanation: "the와 of our three renewal options(세 가지 중)가 함께 있어 최상급이다(g10). 오답: fast는 원급, faster는 둘을 비교할 때 쓰므로 셋 중에서 고르는 문장과 맞지 않고, more fast는 틀린 형태다.", ruleId: "g10" },
      { n: 4, type: "sentence", choices: ["Please return the damaged issue to us.", "Your subscription was canceled last month.", "The magazine will stop publishing next year.", "Subscribers who renew early receive a free tote bag."], answer: 3, explanation: "문장 삽입이다. 앞 문장은 온라인 갱신이 빠르다는 내용, 뒤 문장은 '앞으로 1년 더 함께하길 바란다'다. 갱신을 권하는 혜택 안내가 자연스럽다. 오답: 구독이 지난달 취소됐다(B)는 12월 31일에 만료된다는 첫 문장과 모순이고, 잡지 발행 중단(C)은 1년 더 함께하자는 말과 모순이며, 파손된 호 반송(A)은 갱신 안내와 관계가 없다.", ruleId: null }
    ]
  },
  {
    id: "p606", title: "신입 직원 환영 안내", recommendedSec: 120,
    header: ["Welcome to Barton & Co."],
    blocks: [
      { type: "text", en: "We are " },
      { type: "blank", n: 1 },
      { type: "text", en: " to have you join our marketing team. Your first day will begin with an orientation in Room 2A at nine o'clock. " },
      { type: "blank", n: 2 },
      { type: "text", en: " Your manager, Ms. Ortiz, will meet you afterward to review your three main " },
      { type: "blank", n: 3 },
      { type: "text", en: " for the first month. Please bring a photo ID so that we can issue your building pass. If you need " },
      { type: "blank", n: 4 },
      { type: "text", en: " before Monday, email hr@bartonco.com." }
    ],
    ko: "바튼 앤 코에 오신 것을 환영합니다. 마케팅팀에 합류하게 되어 기쁩니다. 첫날은 9시에 2A룸에서 오리엔테이션으로 시작합니다. 점심은 직원 휴게실에서 제공됩니다. 그 후 매니저인 오르티스 씨가 첫 달의 주요 목표 세 가지를 함께 검토할 예정입니다. 출입증 발급을 위해 사진이 있는 신분증을 지참해 주세요. 월요일 전에 도움이 필요하시면 hr@bartonco.com으로 메일 주세요.",
    vocab: [
      { w: "orientation", m: "오리엔테이션, 신입 교육" },
      { w: "afterward", m: "그 후에" },
      { w: "photo ID", m: "사진이 있는 신분증" },
      { w: "issue", m: "발급하다" },
      { w: "building pass", m: "건물 출입증" }
    ],
    questions: [
      { n: 1, type: "grammar", choices: ["delight", "delighted", "delighting", "delightful"], answer: 1, explanation: "사람(We)이 기쁨을 느끼는 쪽이라 p.p.인 delighted다(g15). 오답: delight는 동사·명사, delighting은 기쁨을 주는 쪽, delightful은 '즐거운(사물·일)'이라 사람 주어의 감정에 맞지 않는다.", ruleId: "g15" },
      { n: 2, type: "sentence", choices: ["Lunch will be provided in the staff lounge.", "You must submit your resignation in advance.", "The orientation has been canceled.", "Parking is not available for employees."], answer: 0, explanation: "문장 삽입이다. 앞 문장은 9시 오리엔테이션, 뒤 문장은 'afterward(그 후에) 매니저가 만난다'다. 첫날 일정 하나가 더 들어가야 afterward가 자연스럽다. 오답: 사직서 제출(B)은 환영 안내와 모순, 오리엔테이션 취소(C)는 앞 문장과 모순, 주차 불가(D)는 일정이 아니라 afterward와 이어지지 않는다.", ruleId: null },
      { n: 3, type: "grammar", choices: ["goal", "goals", "goaled", "goaling"], answer: 1, explanation: "three main 뒤라 복수 명사가 와야 한다(g01). 오답: goal은 단수, goaled·goaling은 동사형이다.", ruleId: "g01" },
      { n: 4, type: "grammar", choices: ["assist", "assisted", "assistant", "assistance"], answer: 3, explanation: "need의 목적어 자리라 명사가 온다(g01). 오답: assist는 동사, assisted는 과거형, assistant는 사람이라 관사 없이 쓸 수 없고 '도움이 필요하면'이라는 뜻과도 맞지 않는다.", ruleId: "g01" }
    ]
  },
  {
    id: "p607", title: "주차장 보수 공사", recommendedSec: 120,
    header: ["To: All Employees", "Subject: Parking Lot Repairs"],
    blocks: [
      { type: "text", en: "The east parking lot will be closed from Monday, May 4, " },
      { type: "blank", n: 1 },
      { type: "text", en: " Friday, May 8. During this period, crews will resurface the pavement and repaint the lane markings. Employees who normally park there should use the west lot instead. " },
      { type: "blank", n: 2 },
      { type: "text", en: " The west lot has about forty extra spaces, so there should be enough " },
      { type: "blank", n: 3 },
      { type: "text", en: " for everyone. We " },
      { type: "blank", n: 4 },
      { type: "text", en: " apologize for the inconvenience. If you have questions, please contact the facilities office at extension 212." }
    ],
    ko: "수신: 전 직원 / 제목: 주차장 보수 공사 — 동쪽 주차장이 5월 4일 월요일부터 5월 8일 금요일까지 폐쇄됩니다. 이 기간 동안 작업자들이 노면을 재포장하고 차선 표시를 다시 칠합니다. 평소 그곳에 주차하는 직원은 대신 서쪽 주차장을 이용해 주세요. 양쪽 입구에 안내 표지판이 설치될 예정입니다. 서쪽 주차장에는 여유 공간이 40면 정도 있어 모두 주차할 공간이 충분할 것입니다. 불편을 드려 진심으로 사과드립니다. 문의 사항은 내선 212번 시설 관리실로 연락해 주세요.",
    vocab: [
      { w: "resurface", m: "재포장하다" },
      { w: "pavement", m: "포장 노면" },
      { w: "lane marking", m: "차선 표시" },
      { w: "inconvenience", m: "불편" },
      { w: "extension", m: "내선 번호" }
    ],
    questions: [
      { n: 1, type: "grammar", choices: ["among", "through", "along", "across"], answer: 1, explanation: "from A through B는 'A부터 B까지(B 포함)'다(g06). 오답: among은 셋 이상 사이, along은 '~을 따라', across는 '~을 가로질러'라 기간을 나타내지 않는다.", ruleId: "g06" },
      { n: 2, type: "sentence", choices: ["The repairs were completed last year.", "Parking fees will increase in June.", "Signs will be posted at both entrances.", "Please return your badge to the front desk."], answer: 2, explanation: "문장 삽입이다. 앞 문장이 '서쪽 주차장을 쓰라', 뒤 문장이 '서쪽에 40면 여유가 있다'다. 안내 표지 설치가 둘 사이에 자연스럽다. 오답: 공사는 아직 시작 전이라 작년에 끝났다(A)는 시제와 맞지 않고, 주차 요금(B)·출입증 반납(D)은 공지 내용과 관계가 없다.", ruleId: null },
      { n: 3, type: "vocab", choices: ["room", "amount", "number", "size"], answer: 0, explanation: "enough room은 '충분한 공간'이다. room은 공간이라는 뜻의 불가산명사다. 오답: amount는 '양', number는 '수', size는 '크기'라 '모두가 주차할 공간'과 맞지 않고 enough 뒤에 관사 없이 쓰지도 않는다.", ruleId: null },
      { n: 4, type: "grammar", choices: ["sincere", "sincerely", "sincerity", "sincerest"], answer: 1, explanation: "동사 apologize를 꾸미므로 부사다(g01). We sincerely apologize는 사과문 정형 표현이다. 오답: sincere는 형용사, sincerity는 명사, sincerest는 최상급 형용사다.", ruleId: "g01" }
    ]
  },
  {
    id: "p608", title: "카페 4호점 개점", recommendedSec: 120,
    header: ["Bellport Roasters to Open Fourth Café"],
    blocks: [
      { type: "text", en: "Bellport Roasters will open its fourth location next month at 15 Canal Street. The company, " },
      { type: "blank", n: 1 },
      { type: "text", en: " in 2014, began as a single shop near the harbor and now employs more than sixty people. The new café will seat forty guests and " },
      { type: "blank", n: 2 },
      { type: "text", en: " a small bakery counter. " },
      { type: "blank", n: 3 },
      { type: "text", en: " Owner Leah Brandt said the extra space will allow the company to bake its pastries on site for the first time. Customers " },
      { type: "blank", n: 4 },
      { type: "text", en: " previously bought bread from a partner bakery can expect a wider selection." }
    ],
    ko: "벨포트 로스터스, 네 번째 카페 개점 — 벨포트 로스터스가 다음 달 커낼 스트리트 15번지에 네 번째 매장을 엽니다. 2014년에 설립된 이 회사는 항구 근처의 매장 하나로 시작해 현재 60명이 넘는 직원을 두고 있습니다. 새 카페는 40명을 수용하며 작은 베이커리 코너도 갖춥니다. 베이커리 코너는 이 회사로서는 처음입니다. 대표 리아 브랜트는 늘어난 공간 덕분에 처음으로 페이스트리를 매장에서 직접 구울 수 있게 됐다고 말했습니다. 그동안 협력 제과점에서 빵을 사 온 고객들은 더 다양한 제품을 기대할 수 있습니다.",
    vocab: [
      { w: "location", m: "지점" },
      { w: "harbor", m: "항구" },
      { w: "seat", m: "~명을 수용하다" },
      { w: "on site", m: "현장에서" },
      { w: "a wider selection", m: "더 다양한 종류" }
    ],
    questions: [
      { n: 1, type: "grammar", choices: ["founding", "founds", "founded", "to found"], answer: 2, explanation: "회사는 '설립되는' 쪽이라 수동 의미의 p.p.가 명사 뒤에서 꾸민다(g15). 오답: founding은 능동, founds는 동사라 콤마 사이 삽입구에 들어갈 수 없고, to found는 '설립하기 위해'라 뜻이 맞지 않는다.", ruleId: "g15" },
      { n: 2, type: "grammar", choices: ["include", "including", "includes", "to include"], answer: 0, explanation: "will seat ... and (will) include. and가 will 뒤의 동사원형 둘을 잇는다(g13). 오답: including·to include는 동사 자리에 못 오고, includes는 will과 함께 쓸 수 없다.", ruleId: "g13" },
      { n: 3, type: "sentence", choices: ["The original shop closed in 2014.", "The company plans to reduce its staff.", "Canal Street will be closed to traffic.", "The bakery counter will be the company's first."], answer: 3, explanation: "문장 삽입이다. 앞 문장이 '작은 베이커리 코너를 둔다', 뒤 문장이 '처음으로 매장에서 직접 굽는다'라서 '첫 베이커리 코너'가 둘을 잇는다. 오답: 원래 매장이 2014년에 문을 닫았다(A)는 2014년에 매장 하나로 시작했다는 앞 내용과 모순이고, 감원(B)은 직원이 60명 넘게 늘었다는 말과 맞지 않으며, 도로 통제(C)는 개점 기사의 흐름과 관계가 없다.", ruleId: null },
      { n: 4, type: "grammar", choices: ["whose", "who", "which", "whom"], answer: 1, explanation: "빈칸 뒤에 동사 bought가 바로 오므로 주격 관계대명사이고, 선행사 Customers가 사람이라 who다(g08). 오답: whose는 뒤에 명사가 와야 하고, which는 사물, whom은 목적격이라 뒤에 주어가 있어야 한다.", ruleId: "g08" }
    ]
  },
  {
    id: "p609", title: "학습 플랫폼 점검 안내", recommendedSec: 120,
    header: ["Notice to All Users"],
    blocks: [
      { type: "text", en: "Our online learning platform will undergo scheduled maintenance this Saturday from 1:00 A.M. to 5:00 A.M. During the " },
      { type: "blank", n: 1 },
      { type: "text", en: ", you will not be able to log in or submit assignments. Work saved before 1:00 A.M. will not be affected. " },
      { type: "blank", n: 2 },
      { type: "text", en: " We recommend downloading any files you may need over the weekend. The maintenance will improve loading speed and " },
      { type: "blank", n: 3 },
      { type: "text", en: " the problems some users have reported with video playback. Thank you for your " },
      { type: "blank", n: 4 },
      { type: "text", en: "." }
    ],
    ko: "전체 사용자 공지 — 온라인 학습 플랫폼이 이번 토요일 오전 1시부터 5시까지 정기 점검을 진행합니다. 점검 중에는 로그인하거나 과제를 제출할 수 없습니다. 오전 1시 이전에 저장한 작업은 영향을 받지 않습니다. 다만 그 네 시간 동안에는 플랫폼을 전혀 이용할 수 없습니다. 주말 동안 필요할 수 있는 파일은 미리 내려받아 두시기를 권합니다. 이번 점검으로 로딩 속도가 빨라지고, 일부 사용자가 알려 주신 동영상 재생 문제가 해결됩니다. 양해해 주셔서 감사합니다.",
    vocab: [
      { w: "undergo", m: "겪다, 받다" },
      { w: "scheduled maintenance", m: "정기 점검" },
      { w: "be affected", m: "영향을 받다" },
      { w: "playback", m: "재생" },
      { w: "assignment", m: "과제" }
    ],
    questions: [
      { n: 1, type: "vocab", choices: ["outcome", "outlook", "outage", "output"], answer: 2, explanation: "the 뒤 명사 자리이고, 로그인과 과제 제출이 안 되는 '중단 시간'이라 outage다. 오답: outcome은 결과, outlook은 전망, output은 생산량이라 '그동안 로그인할 수 없다'와 맞지 않는다.", ruleId: null },
      { n: 2, type: "sentence", choices: ["The maintenance has been postponed until next month.", "However, the platform will be completely unavailable during those four hours.", "Please register for an account before Saturday.", "Assignments are graded within two business days."], answer: 1, explanation: "문장 삽입이다. 앞 문장은 '1시 전에 저장한 작업은 영향 없다', 뒤 문장은 '주말에 필요한 파일을 내려받아 두라'다. However로 '그래도 네 시간은 전혀 못 쓴다'고 뒤집어야 파일을 미리 받으라는 권고가 이어진다. 1시부터 5시까지 네 시간이라는 것도 맞다. 오답: 다음 달로 연기(A)는 이번 토요일 점검이라는 첫 문장과 모순이고, 계정 등록(C)·채점 기간(D)은 점검 안내와 관계가 없다.", ruleId: null },
      { n: 3, type: "grammar", choices: ["resolves", "resolving", "resolved", "resolve"], answer: 3, explanation: "will improve ... and (will) resolve. and가 will 뒤의 동사원형 둘을 잇는다(g13). 오답: resolves·resolved·resolving은 will 뒤에 올 수 없다.", ruleId: "g13" },
      { n: 4, type: "grammar", choices: ["patient", "patience", "patiently", "patientness"], answer: 1, explanation: "your 뒤는 명사 자리다(g01). Thank you for your patience는 공지 마무리 정형 표현이다. 오답: patient는 형용사(명사로 쓰면 '환자'), patiently는 부사, patientness는 없는 말이다.", ruleId: "g01" }
    ]
  },
  {
    id: "p610", title: "면접 일정 안내", recommendedSec: 120,
    header: ["From: Gilles Moreau", "To: Ms. Arnault", "Date: September 1", "Subject: Interview Invitation", "Dear Ms. Arnault,"],
    blocks: [
      { type: "text", en: "Thank you for applying for the position of logistics coordinator. We were impressed by your experience and would like to " },
      { type: "blank", n: 1 },
      { type: "text", en: " you for an interview at our Lyon office. We have reserved Tuesday, September 9, at 10:00 A.M. Please reply by Friday to " },
      { type: "blank", n: 2 },
      { type: "text", en: " this time. " },
      { type: "blank", n: 3 },
      { type: "text", en: " The interview will last about an hour and will include a short written exercise. You do not need to prepare anything in " },
      { type: "blank", n: 4 },
      { type: "text", en: ". Sincerely, Gilles Moreau, Human Resources" }
    ],
    ko: "보낸 사람: 질 모로 / 받는 사람: 아르노 님 / 제목: 면접 안내 — 아르노 님께, 물류 담당자 직에 지원해 주셔서 감사합니다. 경력이 인상적이어서 리옹 사무소로 면접에 모시고자 합니다. 9월 9일 화요일 오전 10시로 일정을 잡아 두었습니다. 이 시간을 확정하시려면 금요일까지 회신해 주세요. 그 날짜가 어려우시면 다른 날짜를 제안해 드릴 수 있습니다. 면접은 약 한 시간 동안 진행되며 짧은 필기 과제가 포함됩니다. 미리 준비하실 것은 없습니다. 인사부 질 모로 드림",
    vocab: [
      { w: "logistics coordinator", m: "물류 담당자" },
      { w: "be impressed by", m: "~에 좋은 인상을 받다" },
      { w: "written exercise", m: "필기 과제" },
      { w: "position", m: "직책" },
      { w: "reserve", m: "(시간을) 잡아 두다, 예약하다" }
    ],
    questions: [
      { n: 1, type: "grammar", choices: ["invite", "inviting", "invited", "invitation"], answer: 0, explanation: "would like to 뒤는 동사원형이다(g05). 오답: inviting·invited는 to 뒤에 올 수 없고, invitation은 명사라 you를 목적어로 가질 수 없다.", ruleId: "g05" },
      { n: 2, type: "vocab", choices: ["conform", "confirm", "confine", "consume"], answer: 1, explanation: "이 시간을 '확정하려면' 금요일까지 회신하라는 뜻이라 confirm이다. 오답: conform은 '(규칙에) 따르다'로 to가 필요하고, confine은 '가두다', consume은 '소비하다'라 시간과 맞지 않는다.", ruleId: null },
      { n: 3, type: "sentence", choices: ["We have already filled the position.", "Your first day will be September 9.", "If that date is not convenient, we can suggest another.", "Please send your application by September 30."], answer: 2, explanation: "문장 삽입이다. 앞 문장이 '이 시간을 확정하려면 회신하라'라서 '그날이 안 되면 다른 날을 제안하겠다'가 자연스럽게 이어진다. 오답: 이미 채용했다(A)는 면접 초대와 모순, 9월 9일은 첫 출근일(B)이 아니라 면접일, 9월 30일까지 지원서를 보내라(D)는 이미 지원한 사람에게 보내는 메일과 모순이다.", ruleId: null },
      { n: 4, type: "vocab", choices: ["advanced", "advancing", "advancement", "advance"], answer: 3, explanation: "in advance(미리)는 굳어진 전치사구다. 오답: advanced(고급의)·advancing·advancement(발전)는 in 뒤에서 '미리'라는 뜻이 되지 않는다.", ruleId: null }
    ]
  }
];
