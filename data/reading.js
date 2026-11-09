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
  },
  {
    id: "rp07", type: "이메일", title: "회의 시간 변경", strategyId: "r01", recommendedSec: 140,
    header: ["From: Clara Jennings <c.jennings@vertexconsult.com>", "To: Project Team", "Subject: Thursday Meeting — Change of Plan"],
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
      { q: "What is the main purpose of the email?", choices: ["To cancel a meeting", "To announce a schedule change", "To introduce a new client", "To request a report"], answer: 1, explanation: "I need to move Thursday's project review. 목적은 첫 문단에 나온다." },
      { q: "Why was the meeting moved?", choices: ["The room was unavailable", "A client requested a morning call", "Several members are absent", "The agenda changed"], answer: 1, explanation: "Our client has requested a morning call that I cannot reschedule." },
      { q: "What is Hana asked to do?", choices: ["Book a meeting room", "Contact the client", "Prepare a summary of survey results", "Update the budget"], answer: 2, explanation: "could you also prepare a short summary of last month's survey results?" },
      { q: "What should team members do if the new time does not work?", choices: ["Send their figures by email", "Notify the sender by Wednesday", "Attend a different meeting", "Call the client directly"], answer: 1, explanation: "let me know by Wednesday noon. 요청 사항은 마지막 문단에 있다." }
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
      { q: "How long will the north lot be closed?", choices: ["Three days", "About one week", "Two weeks", "One month"], answer: 1, explanation: "8월 4일부터 8일까지 공사하고 11일에 다시 연다. 약 일주일이다." },
      { q: "What is offered to employees during the closure?", choices: ["Free garage parking", "A shuttle service", "Extra break time", "A parking refund"], answer: 0, explanation: "Garage parking will be free for employees." },
      { q: "What must employees show at the garage gate?", choices: ["A parking permit", "An ID badge", "A receipt", "A visitor pass"], answer: 1, explanation: "employees who show their ID badge at the gate." },
      { q: "What will happen to vehicles left after August 1?", choices: ["They will be fined", "They will be towed", "They will be moved to the south lot", "They will be locked"], answer: 1, explanation: "will be towed at the owner's expense." }
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
      { q: "What is required to avoid the registration fee?", choices: ["Signing a one-year contract", "Joining before July 31", "Referring a friend", "Paying in cash"], answer: 1, explanation: "Join before July 31 and pay no registration fee." },
      { q: "What costs an additional amount?", choices: ["Weight equipment", "Locker rental", "Group classes", "Parking"], answer: 2, explanation: "Group classes ... for an extra $10 per month." },
      { q: "What do members receive for referring a friend?", choices: ["A discount on classes", "One free month", "A free T-shirt", "A personal trainer session"], answer: 1, explanation: "Members who refer a friend receive one free month." }
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
      { q: "What problem are the writers discussing?", choices: ["A delayed order", "A broken machine", "A staff shortage", "A pricing error"], answer: 0, explanation: "Our order won't arrive until Friday." },
      { q: "What does Ms. Cho plan to do?", choices: ["Cancel the order", "Contact another branch", "Visit the supplier", "Hire temporary staff"], answer: 1, explanation: "Let's borrow from the downtown branch. I'll call their manager now." },
      { q: "At 2:11 p.m., what does Mr. Blake mean when he writes, \"Keep me posted\"?", choices: ["He wants to be updated", "He will send a package", "He will post a notice", "He wants to change the plan"], answer: 0, explanation: "keep someone posted는 '계속 알려주다'라는 뜻이다. 의도 파악 문제는 앞 문장을 봐야 한다." }
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
      { q: "What did the city council approve?", choices: ["A new train station", "Funding for a bus route", "A road repair project", "A parking regulation"], answer: 1, explanation: "The city council approved funding ... for a new bus route." },
      { q: "When will construction begin?", choices: ["In January", "In March", "Next spring", "Next summer"], answer: 0, explanation: "Construction ... will begin in January." },
      { q: "What does Ms. Dole say about the project?", choices: ["It will create new jobs", "It will shorten commute times", "It will reduce traffic accidents", "It will cost less than expected"], answer: 1, explanation: "the project will cut average commute times by about twenty minutes." }
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
        header: ["From: Noor Haddad", "To: hiring@lindenlegal.com", "Subject: Office Administrator Position"],
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
      { w: "available", m: "시간이 되는" }
    ],
    questions: [
      { q: "What is NOT listed as a responsibility of the position?", choices: ["Scheduling", "Filing", "Client correspondence", "Managing budgets"], answer: 3, explanation: "공고에 scheduling, filing, client correspondence만 나온다. 예산 관리는 언급되지 않았다." },
      { q: "What preferred qualification does Ms. Haddad have?", choices: ["A law degree", "Experience in a legal office", "Fluency in two languages", "Management experience"], answer: 1, explanation: "연계 문제다. 공고의 우대 사항은 법률 사무소 경험이고, 이메일에서 one year at a small law firm이라고 밝힌다." },
      { q: "When will interviews take place?", choices: ["Before March 15", "During the last week of March", "In early April", "On March 20"], answer: 1, explanation: "Interviews will be held during the last week of March." },
      { q: "What did Ms. Haddad include with her email?", choices: ["A cover letter", "References", "Her resume", "A portfolio"], answer: 2, explanation: "My resume is attached." }
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
    questions: [
      { n: 1, choices: ["adopt", "adopts", "adopting", "adopted"], answer: 0, explanation: "조동사 will 뒤에는 동사원형이 온다.", ruleId: "g01" },
      { n: 2, choices: ["because", "in response to", "although", "despite"], answer: 1, explanation: "빈칸 뒤가 명사(feedback)이므로 전치사가 필요하다. 의견을 반영했다는 뜻이므로 in response to.", ruleId: "g07" },
      { n: 3, choices: ["The new hours will be posted at the entrance.", "The cafeteria will be closed permanently.", "Employees must bring their own lunch.", "The manager has resigned."], answer: 0, explanation: "문장 삽입 문제다. 앞뒤가 운영 시간 변경 안내이므로 게시 안내가 자연스럽다. 나머지는 문맥과 맞지 않는다.", ruleId: null },
      { n: 4, choices: ["to", "at", "for", "with"], answer: 0, explanation: "direct A to B(A를 B에게 보내다) 형태다.", ruleId: "g06" }
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
    questions: [
      { n: 1, choices: ["ships", "shipped", "was shipped", "shipping"], answer: 2, explanation: "주문품은 발송되는 쪽이므로 수동태다. 빈칸 뒤에 목적어가 없다.", ruleId: "g04" },
      { n: 2, choices: ["by", "until", "during", "since"], answer: 0, explanation: "금요일 전까지 연락하라는 마감 의미이므로 by.", ruleId: "g06" },
      { n: 3, choices: ["We are closing our store next month.", "You may also want to subscribe to our newsletter.", "Your refund has been processed.", "Please return the item within 7 days."], answer: 1, explanation: "뒤 문장이 소식지 구독 혜택을 설명하므로 소식지를 언급하는 문장이 앞에 와야 한다.", ruleId: null },
      { n: 4, choices: ["next", "nearest", "later", "following"], answer: 0, explanation: "'다음 주문'이라는 뜻이므로 next order가 자연스럽다.", ruleId: null }
    ]
  }
];
