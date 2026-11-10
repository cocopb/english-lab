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
      { en: "\"We simply ran out of space,\" Marsh said.", ko: "\"그냥 공간이 모자랐어요\"라고 마시는 말했습니다." },
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
        header: ["From: Hana Suzuki", "To: training@northgatebc.org", "Subject: Workshop Registration"],
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
      { q: "What is the purpose of the first notice?", choices: ["To announce a series of workshops", "To report a schedule change", "To request payment", "To introduce a new building"], answer: 0, explanation: "봄 워크숍 안내와 신청 방법을 알리는 공고다." },
      { q: "In which room will Ms. Suzuki's first session be held?", choices: ["Room 101", "Room 204", "Room 305", "Room 410"], answer: 0, explanation: "연계 문제다. 이메일에서 신청한 세 과정 중 가장 빠른 것은 3월 5일 Effective Business Writing이고, 일정표에서 그 과정은 101호다." },
      { q: "Which session is Ms. Suzuki NOT registering for?", choices: ["Effective Business Writing", "Data Analysis Basics", "Public Speaking", "Project Management"], answer: 1, explanation: "이메일에 세 과정만 적혀 있고 Data Analysis Basics는 빠져 있다." },
      { q: "Why is Ms. Suzuki likely to receive a discount?", choices: ["She is a new member", "She registered for three sessions", "She paid in advance", "She works at the center"], answer: 1, explanation: "연계 문제다. 공고에 세 과정 이상 신청 시 20퍼센트 할인이라고 했고, 이메일에서 세 과정을 신청했다." },
      { q: "What does Ms. Suzuki ask the training team to do?", choices: ["Change a session date", "Send the invoice to accounting", "Reserve a larger room", "Add a new workshop"], answer: 1, explanation: "Please send the invoice to our accounting department." }
    ]
  },
  {
    id: "rp14", type: "이메일", title: "누락된 배송품 문의", strategyId: "r01", recommendedSec: 150,
    header: ["From: Victor Nunes <v.nunes@claremont.co>", "To: orders@pinecrestfurniture.com", "Subject: Order #7742 — Missing Items"],
    sentences: [
      { en: "Dear Pinecrest Team,", ko: "파인크레스트 담당자님께," },
      { en: "We received our order this morning, but two of the six desk chairs are missing from the shipment.", ko: "오늘 아침에 주문품을 받았는데, 책상 의자 여섯 개 중 두 개가 빠져 있습니다." },
      { en: "The packing slip lists six chairs, so they may have been left at your warehouse.", ko: "포장 명세서에는 의자 여섯 개가 적혀 있으니, 창고에 남아 있을 수도 있을 것 같습니다." },
      { en: "We need all six by next Monday, when our new staff begin work.", ko: "신입 직원이 근무를 시작하는 다음 주 월요일까지 여섯 개가 모두 필요합니다." },
      { en: "If the missing chairs cannot arrive by then, please let us know so we can rent temporary seating.", ko: "그때까지 도착이 어렵다면 임시 좌석을 빌릴 수 있도록 알려주세요." },
      { en: "We would also like to confirm that the delivery fee will be adjusted.", ko: "배송비가 조정되는지도 확인하고 싶습니다." },
      { en: "Thank you for your quick attention.", ko: "신속한 처리 부탁드립니다." },
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
      { q: "Why did Mr. Nunes write the email?", choices: ["To cancel an order", "To report missing items", "To request a catalog", "To change a delivery address"], answer: 1, explanation: "two of the six desk chairs are missing from the shipment." },
      { q: "How many chairs did the company receive?", choices: ["Two", "Four", "Six", "Eight"], answer: 1, explanation: "여섯 개 중 두 개가 빠졌으므로 네 개를 받았다. 숫자 계산 문제는 반드시 나온다." },
      { q: "What does Mr. Nunes say he may do?", choices: ["Visit the warehouse", "Rent temporary seating", "Hire fewer staff", "Return the order"], answer: 1, explanation: "so we can rent temporary seating." },
      { q: "What else does Mr. Nunes ask about?", choices: ["The delivery fee", "The warranty period", "The product color", "The store hours"], answer: 0, explanation: "confirm that the delivery fee will be adjusted." }
    ]
  },
  {
    id: "rp15", type: "기사", title: "쇼핑몰 실내 정원 조성", strategyId: "r05", recommendedSec: 130,
    header: ["Riverside Mall to Add Indoor Garden"],
    sentences: [
      { en: "Riverside Mall will open a 2,000-square-meter indoor garden on its top floor in September, mall manager Tomas Reyes said last week.", ko: "리버사이드 몰이 9월에 최상층에 2,000제곱미터 규모의 실내 정원을 연다고 쇼핑몰 매니저 토마스 레예스가 지난주 밝혔습니다." },
      { en: "The space will include seating, a small café, and more than fifty plant species.", ko: "이 공간에는 좌석과 작은 카페, 50종이 넘는 식물이 들어섭니다." },
      { en: "Mr. Reyes said the project is meant to attract visitors who stay longer and shop more.", ko: "레예스 씨는 이 사업이 더 오래 머물며 더 많이 구매하는 방문객을 끌어들이기 위한 것이라고 말했습니다." },
      { en: "Construction began in March and is now about 70 percent complete.", ko: "공사는 3월에 시작해 현재 약 70퍼센트 진행됐습니다." },
      { en: "The garden will be free to enter and open during regular mall hours.", ko: "정원은 무료로 입장할 수 있으며 쇼핑몰 영업시간에 맞춰 운영됩니다." }
    ],
    vocab: [
      { w: "indoor", m: "실내의" },
      { w: "species", m: "(생물의) 종" },
      { w: "attract", m: "끌어들이다" },
      { w: "construction", m: "공사" },
      { w: "free to enter", m: "입장 무료인" }
    ],
    questions: [
      { q: "What will open in September?", choices: ["A new shopping mall", "An indoor garden", "A parking garage", "A restaurant chain"], answer: 1, explanation: "첫 문장에 실내 정원 개장이 나온다. 기사는 첫 문단이 요약이다." },
      { q: "According to Mr. Reyes, what is the goal of the project?", choices: ["To reduce energy costs", "To keep visitors in the mall longer", "To create new jobs", "To expand the parking area"], answer: 1, explanation: "attract visitors who stay longer and shop more." },
      { q: "What is indicated about the garden?", choices: ["There is no entry fee", "It opens only on weekends", "It is already finished", "It is for members only"], answer: 0, explanation: "The garden will be free to enter." }
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
          { en: "Walk-ins welcome, but appointments are recommended on weekends.", ko: "예약 없이 오셔도 되지만 주말에는 예약을 권장합니다." }
        ]
      },
      {
        label: "지문 2 — 고객 이메일",
        header: ["From: Grace Oduya", "To: info@milltowncycle.com", "Subject: Thank you"],
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
      { q: "What is indicated about Milltown Cycle Repair?", choices: ["It is newly opened", "It is closing soon", "It only serves members", "It operates every day"], answer: 0, explanation: "GRAND OPENING과 during our first month로 보아 새로 문을 연 가게다. 일요일은 쉬므로 매일 영업도 아니다." },
      { q: "How much was the regular price of Ms. Oduya's service?", choices: ["$15", "$35", "$75", "$110"], answer: 2, explanation: "연계 문제다. 이메일에서 full service를 받았고, 광고에서 그 가격은 75달러다." },
      { q: "What does Ms. Oduya mention about her visit?", choices: ["She waited for two hours", "She did not have an appointment", "She came on a weekday", "She paid the full price"], answer: 1, explanation: "even though I arrived without an appointment." },
      { q: "What does Ms. Oduya say she will do?", choices: ["Return next month", "Write a newspaper review", "Recommend the shop to others", "Buy a new bicycle"], answer: 2, explanation: "I will recommend your shop to my cycling club." }
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
      { w: "hold", m: "(용량을) 담다, 수용하다" },
      { w: "make two trips", m: "두 번 왕복하다" },
      { w: "push back", m: "(일정을) 뒤로 미루다" }
    ],
    questions: [
      { q: "Where most likely is Ms. Whitfield?", choices: ["At a repair shop", "At a delivery depot", "At a customer's office", "At a parking garage"], answer: 1, explanation: "I'm still at the depot." },
      { q: "At 10:15 A.M., what does Ms. Whitfield most likely mean when she writes, \"but I've heard that before\"?", choices: ["She has not met the mechanic", "She doubts the mechanic will arrive on time", "She wants to call a different mechanic", "She already repaired the van"], answer: 1, explanation: "의도 파악 문제다. 전에도 같은 말을 들었다는 건 그 말을 믿지 못한다는 뜻이다." },
      { q: "What problem does Ms. Whitfield mention about the smaller truck?", choices: ["It is also broken", "It cannot carry all of the boxes", "It needs to be cleaned", "Another driver is using it"], answer: 1, explanation: "It only holds half the boxes." },
      { q: "What does Mr. Haddad say he will do?", choices: ["Drive the van himself", "Reschedule some deliveries", "Cancel the first stop", "Hire a new mechanic"], answer: 1, explanation: "call the afternoon customers and push their times back." }
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
      { q: "What is the main topic of the discussion?", choices: ["A printer supply problem", "A change to a meeting time", "A new marketing campaign", "An office relocation"], answer: 0, explanation: "프린터 토너가 떨어진 문제로 시작해 주문까지 이어진다." },
      { q: "What does Ms. Kowalski confirm?", choices: ["The printer is broken", "The marketing team made a large number of copies", "The supply closet is locked", "A new printer was purchased"], answer: 1, explanation: "That's right, they did. Three hundred copies." },
      { q: "At 2:06 P.M., why does Mr. Ferreira mention the copy center?", choices: ["To recommend buying a new machine", "To point out where large print jobs should be done", "To complain about printing costs", "To ask for directions"], answer: 1, explanation: "의도 파악 문제다. 대량 출력은 복사실에서 해야 한다는 규칙을 지적하는 것이다." },
      { q: "What will Mr. Ferreira most likely do today?", choices: ["Order supplies", "Repair the printer", "Lead a staff meeting", "Visit the marketing team"], answer: 0, explanation: "I'll put in the order before I leave. 내일 회의에서 공지하는 사람은 코발스키 씨다." }
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
      { q: "What is suggested about the order?", choices: ["It was delivered late", "It qualified for free delivery", "It was partly canceled", "It included a discount on lamps"], answer: 1, explanation: "소계가 366달러이고 300달러 초과 주문은 배송비가 무료라서 배송비가 0달러다." },
      { q: "By when should the clinic pay?", choices: ["June 3", "June 17", "July 3", "July 17"], answer: 1, explanation: "Payment due: June 17. June 3은 청구 일자다." },
      { q: "What happens if the invoice is paid late?", choices: ["The order is canceled", "An extra charge is added", "Delivery is delayed", "The account is closed"], answer: 1, explanation: "A 2 percent late fee is added." }
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
      { q: "What does Harborline Tours offer?", choices: ["Boat repairs", "Guided boat tours", "Fishing lessons", "Hotel bookings"], answer: 1, explanation: "guided boat trips along the north coast." },
      { q: "What is indicated about the tours?", choices: ["They run only in summer", "They are offered in two languages", "They last three hours", "They are free for children"], answer: 1, explanation: "commentary in English and Spanish. 아동도 11달러를 내므로 무료가 아니고, 투어는 90분이다." },
      { q: "What are large groups advised to do?", choices: ["Pay in cash", "Reserve several days ahead", "Arrive at 9 A.M.", "Bring their own guide"], answer: 1, explanation: "should book at least three days in advance." }
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
      { q: "Why did Mr. Lindqvist send the message?", choices: ["To cancel a client meeting", "To report a problem with equipment", "To request a new cable order", "To reserve a conference room"], answer: 1, explanation: "프로젝터가 작동하지 않는다고 알리며 IT 지원을 요청하고 있다. 회의를 취소하지는 않았다." },
      { q: "What does Mr. Lindqvist offer to do?", choices: ["Change the meeting location", "Repair the projector himself", "Postpone the meeting until noon", "Contact the client directly"], answer: 0, explanation: "I can move the meeting to Room B. 시간을 미루는 것이 아니라 장소를 바꾸겠다는 제안이다." }
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
      { q: "What will happen on July 10?", choices: ["A new branch will open", "A pool will be closed for cleaning", "Membership fees will change", "The fitness center will close all day"], answer: 1, explanation: "수영장만 청소로 닫히고 다른 시설은 평소대로 운영된다." },
      { q: "What are members asked to bring to the Oakfield branch?", choices: ["An extra payment", "Their membership card", "A towel and swimsuit", "A printed copy of the notice"], answer: 1, explanation: "Please bring your membership card. 추가 요금은 없다고 했다." }
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
      { q: "What is NOT included in the $9.50 price?", choices: ["A soup", "A sandwich", "A drink", "A dessert"], answer: 3, explanation: "디저트는 2달러를 더 내야 한다." },
      { q: "What is stated about the coupon?", choices: ["It is valid on weekends", "It may not be used on holidays", "It must be ordered online", "It expires in one week"], answer: 1, explanation: "Not valid on holidays. 월~목 한정이라 주말도 안 된다." }
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
          { en: "Responsibilities include cataloguing documents, scanning photographs, and assisting researchers.", ko: "업무에는 문서 목록 작성, 사진 스캔, 연구자 지원이 포함됩니다." },
          { en: "Candidates must have a degree in library science and at least two years of archival experience.", ko: "지원자는 문헌정보학 학위와 최소 2년의 기록물 관리 경력이 있어야 합니다." },
          { en: "The position is twenty hours per week, with occasional Saturday shifts.", ko: "근무는 주 20시간이며, 간혹 토요일 근무가 있습니다." },
          { en: "Send a résumé and a brief cover letter to hr@thornburylibrary.org by March 20.", ko: "3월 20일까지 이력서와 간단한 자기소개서를 hr@thornburylibrary.org로 보내주세요." }
        ]
      },
      {
        label: "지문 2 — 지원 이메일",
        header: ["From: Nadia Bello", "To: hr@thornburylibrary.org", "Subject: Part-Time Archivist"],
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
      { w: "catalogue", m: "목록을 작성하다" },
      { w: "candidate", m: "지원자, 후보자" },
      { w: "shift", m: "교대 근무" },
      { w: "cover letter", m: "자기소개서" }
    ],
    questions: [
      { q: "What is one responsibility of the position?", choices: ["Repairing damaged books", "Scanning photographs", "Leading school tours", "Managing a budget"], answer: 1, explanation: "Responsibilities include cataloguing documents, scanning photographs, and assisting researchers." },
      { q: "How did Ms. Bello learn about the job?", choices: ["From a newspaper", "From the library's website", "From a former colleague", "At a job fair"], answer: 1, explanation: "the archivist position advertised on your website." },
      { q: "What is suggested about Ms. Bello's availability?", choices: ["She can work on Saturdays when needed", "She can work only on weekday mornings", "She needs a full-time schedule", "She is unavailable until April"], answer: 0, explanation: "연계 문제다. 공고에 간혹 토요일 근무가 있다고 했고, 이메일에서 주말에도 가능하다고 했다." },
      { q: "What does Ms. Bello offer to provide?", choices: ["A photograph sample", "References", "A writing sample", "A university transcript"], answer: 1, explanation: "I would be glad to provide references if needed." }
    ]
  },
  {
    id: "rp25", type: "이중 지문", title: "호텔 예약 변경", strategyId: "r06", recommendedSec: 195,
    parts: [
      {
        label: "지문 1 — 예약 확인서",
        header: ["MERIDIAN HARBOUR HOTEL — Reservation Confirmation"],
        sentences: [
          { en: "Guest: Dr. Felix Osei | Confirmation number: MH-20714", ko: "투숙객: 펠릭스 오세이 박사 | 예약 번호: MH-20714" },
          { en: "Check-in: October 8 | Check-out: October 11", ko: "입실: 10월 8일 | 퇴실: 10월 11일" },
          { en: "Room type: Deluxe king, harbour view — $180 per night", ko: "객실 종류: 디럭스 킹, 항구 전망 — 1박 180달러" },
          { en: "Breakfast is included in the room rate. Parking is $15 per day.", ko: "조식은 객실 요금에 포함됩니다. 주차는 1일 15달러입니다." },
          { en: "Changes made more than 48 hours before check-in are free of charge.", ko: "입실 48시간 이전에 하는 변경은 수수료가 없습니다." }
        ]
      },
      {
        label: "지문 2 — 변경 요청 이메일",
        header: ["From: Felix Osei", "To: reservations@meridianharbour.com", "Subject: Confirmation MH-20714"],
        sentences: [
          { en: "Hello,", ko: "안녕하세요," },
          { en: "My conference now ends a day later than planned, so I would like to stay until October 12.", ko: "학회가 예정보다 하루 늦게 끝나게 되어 10월 12일까지 머물고 싶습니다." },
          { en: "I am sending this message on October 3, so I believe no change fee applies.", ko: "이 메일을 10월 3일에 보내므로 변경 수수료는 적용되지 않을 것으로 생각합니다." },
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
      { q: "What is included in the room rate?", choices: ["Breakfast", "Parking", "An airport transfer", "Laundry service"], answer: 0, explanation: "Breakfast is included in the room rate. 주차는 1일 15달러로 따로 받는다." },
      { q: "What change does Dr. Osei request?", choices: ["A different room type", "A later check-out date", "An earlier check-in", "A lower nightly rate"], answer: 1, explanation: "I would like to stay until October 12." },
      { q: "Why will Dr. Osei most likely not be charged a change fee?", choices: ["He is a frequent guest", "He requested the change more than 48 hours in advance", "He has already paid in full", "He is attending a conference"], answer: 1, explanation: "연계 문제다. 확인서에 입실 48시간 이전 변경은 무료라고 했고, 입실은 10월 8일인데 메일은 10월 3일에 보냈다." },
      { q: "How many nights will Dr. Osei now stay at the hotel?", choices: ["Three", "Four", "Five", "Six"], answer: 1, explanation: "10월 8일 입실, 12일 퇴실이므로 4박이다. 원래 예약은 3박이었다." }
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
          { en: "The second one. I had never used online advertising before, and the speaker showed examples I could copy the same week.", ko: "두 번째 강의입니다. 온라인 광고를 한 번도 써 본 적이 없었는데, 강사가 그 주에 바로 따라 할 수 있는 예시를 보여 주었습니다." },
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
      { q: "What is indicated about the seminar?", choices: ["It lasts two days", "The number of seats is limited", "It is free to attend", "It is held every month"], answer: 1, explanation: "Seats are limited to sixty participants. 참가비 이야기는 없다." },
      { q: "Who led two of the sessions?", choices: ["Dr. Amina Farouk", "Jae-won Park", "Olga Marchetti", "The community center director"], answer: 0, explanation: "1강과 3강 모두 파루크 박사가 진행한다." },
      { q: "Which session did Ms. Marchetti find most useful?", choices: ["Finding Your Customers", "Low-Cost Online Advertising", "Measuring Results", "The lunch discussion"], answer: 1, explanation: "연계 문제다. 설문에서 두 번째 강의라고 했고, 일정표에서 2강은 저비용 온라인 광고다." },
      { q: "What does Ms. Marchetti suggest?", choices: ["Serving a hot lunch", "Allowing more time for questions", "Moving the seminar to a weekday", "Reducing the number of sessions"], answer: 1, explanation: "Please allow more time for questions." }
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
          { en: "Trip: Client visit, Oslo | Dates: April 6-8", ko: "출장: 고객 방문, 오슬로 | 기간: 4월 6일~8일" },
          { en: "Hotel (2 nights, Oslo): $390", ko: "숙박 (오슬로 2박): 390달러" },
          { en: "Meals (3 days): $128", ko: "식비 (3일): 128달러" },
          { en: "Taxi (airport, with receipt): $34", ko: "택시 (공항, 영수증 첨부): 34달러" },
          { en: "Total claimed: $552 | Submitted: April 11", ko: "청구 총액: 552달러 | 제출일: 4월 11일" }
        ]
      },
      {
        label: "지문 3 — 회계팀 이메일",
        header: ["From: Diane Keller, Accounting", "To: Teodor Vasilev", "Subject: Form 7B — Oslo trip"],
        sentences: [
          { en: "Dear Teodor,", ko: "테오도르 씨께," },
          { en: "Your claim arrived in time, so it will be included in the May payment.", ko: "청구가 기한 안에 접수되어 5월 지급에 포함됩니다." },
          { en: "Your hotel came to $195 per night, which is below the limit for trips abroad, so that part is approved in full.", ko: "숙박비는 1박 195달러로 해외 출장 한도보다 낮아 전액 승인됩니다." },
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
      { q: "What is the purpose of the first notice?", choices: ["To explain rules for claiming travel costs", "To announce a change in salaries", "To report a budget shortage", "To introduce a new accounting system"], answer: 0, explanation: "식비, 숙박비, 택시, 제출 기한 등 경비 청구 규정을 안내하는 글이다." },
      { q: "What is indicated about Mr. Vasilev's taxi fare?", choices: ["It was below the amount that needs a receipt", "It was not approved", "A receipt was required for it", "It was paid by the client"], answer: 2, explanation: "연계 문제다. 규정에 20달러 미만은 영수증이 필요 없다고 했고, 신청서의 택시 요금은 34달러다." },
      { q: "Why is the hotel cost approved in full?", choices: ["It was paid in advance", "The client agreed to share the cost", "He stayed only two nights", "The trip was outside the country"], answer: 3, explanation: "연계 문제다. 1박 195달러는 국내 한도 160달러를 넘지만 해외 한도 210달러보다는 낮다. 오슬로 출장이라 해외 한도가 적용된다." },
      { q: "What does Ms. Keller ask Mr. Vasilev to do?", choices: ["Resubmit the whole form", "Send receipts for one day's meals", "Return part of the payment", "Book a cheaper hotel next time"], answer: 1, explanation: "Please send me the receipts for April 7." },
      { q: "When will Mr. Vasilev receive the money?", choices: ["Within fourteen days", "On April 11", "With his May salary", "After the next client visit"], answer: 2, explanation: "연계 문제다. 규정에 다음 달 급여와 함께 지급된다고 했고, 4월에 제출했으므로 5월 지급이다. 이메일에서도 확인된다." }
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
          { en: "Fee: $120, or $90 for students with proof of enrolment.", ko: "수강료: 120달러, 재학 증명을 제출한 학생은 90달러." },
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
        header: ["From: Beatriz Nunes", "Re: Posted by Kwan-ho Lim"],
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
      { w: "proof of enrolment", m: "재학 증명" },
      { w: "recording", m: "녹화 강의" },
      { w: "sign up for", m: "~에 신청하다" },
      { w: "follow-up", m: "후속의" }
    ],
    questions: [
      { q: "What is the course mainly about?", choices: ["Using spreadsheets", "Managing databases", "Writing business reports", "Designing web pages"], answer: 0, explanation: "수식, 차트, 피벗 테이블 등 스프레드시트 활용을 다룬다. 데이터베이스는 가을 후속 강좌다." },
      { q: "Which session did Mr. Lim miss?", choices: ["Charts", "Data cleaning", "Macros", "Final project"], answer: 2, explanation: "연계 문제다. 게시글에서 5회차를 놓쳤다고 했고, 안내문에서 5회차는 매크로다." },
      { q: "How much did Mr. Lim most likely pay?", choices: ["$90", "$120", "$180", "$210"], answer: 0, explanation: "연계 문제다. 할인된 수강료를 냈다고 했고, 안내문에서 학생 할인가는 90달러다." },
      { q: "Which session's exercise files did Ms. Nunes add to the folder?", choices: ["Formulas", "Charts", "Data cleaning", "Macros"], answer: 2, explanation: "세 지문을 모두 봐야 하는 연계 문제다. 게시글에서 4회차 파일이 빠졌다고 했고, 답변에서 그 파일을 올렸다고 했고, 안내문에서 4회차는 데이터 정리다." },
      { q: "What does Ms. Nunes say she plans to do?", choices: ["Extend the recording period", "Offer another course", "Lower the course fee", "Add a seventh session"], answer: 1, explanation: "planning a follow-up course on databases for the autumn. 녹화 기간은 원래부터 3개월이라 연장이 아니다." }
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
        header: ["From: Soo-jin Han", "To: m.delgado@trentonworks.com", "Subject: Third-floor office"],
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
      { q: "What is included in the monthly rent?", choices: ["Electricity", "Internet service", "Water and building maintenance", "Office furniture"], answer: 2, explanation: "including water and building maintenance. 전기와 인터넷은 별도 청구다." },
      { q: "How many additional parking spaces would Ms. Han's company need?", choices: ["Two", "Four", "Six", "Eight"], answer: 1, explanation: "연계 문제다. 직원 6명이 차로 출근하고 광고에 주차 두 면이 포함되므로 4면이 더 필요하다." },
      { q: "What does Ms. Han ask about the rooms?", choices: ["Whether they can be joined together", "Whether they have windows", "How they are heated", "Who cleans them"], answer: 0, explanation: "whether the eight rooms can be combined into fewer, larger spaces." },
      { q: "What does Ms. Han request that differs from the advertised terms?", choices: ["A lower monthly rent", "An earlier move-in date", "Extra storage space", "A shorter lease period"], answer: 3, explanation: "연계 문제다. 광고는 최소 2년인데 이메일에서 1년 임대가 가능한지 물었다. 입주는 8월을 원하므로 7월보다 이른 것이 아니다." },
      { q: "What does Ms. Han offer to do?", choices: ["Sign a contract this week", "Send a deposit in advance", "Visit the building on Thursday or Friday", "Call Ms. Delgado on Monday"], answer: 2, explanation: "I am free to visit on Thursday or Friday afternoon. 이메일에 보낸 날짜가 없으므로 '주 후반'이 아니라 요일 그대로 고른다." }
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
        header: ["From: Dmitri Ivanov, Northline Electronics", "To: orders@kestrelaudio.com", "Subject: WR-9 order"],
        sentences: [
          { en: "Hello,", ko: "안녕하세요," },
          { en: "We would like to order one hundred WR-9 units for our three stores.", ko: "저희 매장 세 곳을 위해 WR-9 100대를 주문하고 싶습니다." },
          { en: "I am sending this on September 10, so I expect the early-order discount to apply.", ko: "9월 10일에 보내므로 사전 주문 할인이 적용될 것으로 생각합니다." },
          { en: "Our customers often ask about battery life, so the thirty-hour figure will help us sell them.", ko: "저희 고객들이 배터리 사용 시간을 자주 묻기 때문에 30시간이라는 수치가 판매에 도움이 될 것입니다." },
          { en: "Please confirm the delivery date.", ko: "배송 날짜를 확인해 주세요." },
          { en: "We hope to have the units on our shelves on the day shipping begins.", ko: "출하가 시작되는 날에 제품을 진열대에 올리고 싶습니다." },
          { en: "Dmitri Ivanov", ko: "드미트리 이바노프" }
        ]
      }
    ],
    vocab: [
      { w: "wholesale", m: "도매의" },
      { w: "retailer", m: "소매업체" },
      { w: "minimum order", m: "최소 주문량" },
      { w: "unit", m: "(제품) 대, 개" },
      { w: "on our shelves", m: "진열대에" }
    ],
    questions: [
      { q: "What is mentioned as a feature of the WR-9?", choices: ["It is waterproof", "It comes in three colors", "It charges in ten minutes", "It folds flat"], answer: 3, explanation: "folds flat for travel." },
      { q: "Why is Northline Electronics likely to receive a discount?", choices: ["Its order was placed before September 15", "It is a long-time customer", "It ordered more than one product", "It paid in advance"], answer: 0, explanation: "연계 문제다. 보도자료에 9월 15일 전 주문은 15퍼센트 할인이라고 했고, 이메일은 9월 10일에 보냈다." },
      { q: "What is indicated about Northline's order?", choices: ["It is below the minimum", "It will be split between two dates", "It is twice the minimum order", "It includes other Kestrel products"], answer: 2, explanation: "연계 문제다. 최소 주문량은 50대이고 100대를 주문했으므로 두 배다." },
      { q: "What does Mr. Ivanov say his customers ask about?", choices: ["The retail price", "Battery life", "Repair services", "Color options"], answer: 1, explanation: "Our customers often ask about battery life." },
      { q: "What does Mr. Ivanov hope will happen?", choices: ["The price will be lowered", "A free sample will be sent", "The units will arrive by October 1", "The order will be delivered in three parts"], answer: 2, explanation: "연계 문제다. 출하가 시작되는 날에 진열하고 싶다고 했고, 보도자료에서 그날은 10월 1일이다." }
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
      { n: 1, type: "grammar", choices: ["adopt", "adopts", "adopting", "adopted"], answer: 0, explanation: "조동사 will 뒤에는 동사원형이 온다.", ruleId: "g01" },
      { n: 2, type: "grammar", choices: ["because", "in response to", "although", "despite"], answer: 1, explanation: "빈칸 뒤가 명사(feedback)이므로 전치사가 필요하다. 의견을 반영했다는 뜻이므로 in response to.", ruleId: "g07" },
      { n: 3, type: "sentence", choices: ["The new hours will be posted at the entrance.", "The cafeteria will be closed permanently.", "Employees must bring their own lunch.", "The manager has resigned."], answer: 0, explanation: "문장 삽입 문제다. 앞뒤가 운영 시간 변경 안내이므로 게시 안내가 자연스럽다. 나머지는 문맥과 맞지 않는다.", ruleId: null },
      { n: 4, type: "grammar", choices: ["to", "at", "for", "with"], answer: 0, explanation: "direct A to B(A를 B에게 보내다) 형태다.", ruleId: "g06" }
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
      { n: 1, type: "grammar", choices: ["to ship", "shipper", "was shipped", "shipping"], answer: 2, explanation: "주문품은 발송되는 쪽이므로 수동태다. 빈칸 뒤에 목적어가 없다.", ruleId: "g04" },
      { n: 2, type: "grammar", choices: ["by", "until", "during", "since"], answer: 0, explanation: "금요일 전까지 연락하라는 마감 의미이므로 by.", ruleId: "g06" },
      { n: 3, type: "sentence", choices: ["We are closing our store next month.", "You may also want to subscribe to our newsletter.", "Your refund has been processed.", "Please return the item within 7 days."], answer: 1, explanation: "뒤 문장이 소식지 구독 혜택을 설명하므로 소식지를 언급하는 문장이 앞에 와야 한다.", ruleId: null },
      { n: 4, type: "vocab", choices: ["next", "nearest", "later", "following"], answer: 0, explanation: "'다음 주문'이라는 뜻이므로 next order가 자연스럽다.", ruleId: null }
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
      { n: 1, type: "grammar", choices: ["relocate", "relocates", "relocating", "relocated"], answer: 0, explanation: "조동사 will 뒤에는 동사원형이 온다.", ruleId: "g01" },
      { n: 2, type: "sentence", choices: ["The move will not affect business hours.", "The building will be demolished next year.", "All staff will work remotely from now on.", "The company is closing its Chicago branch."], answer: 0, explanation: "문장 삽입 문제다. 앞뒤가 이전 안내이므로 영업에 영향이 없다는 안내가 자연스럽다. 나머지는 이전 안내와 모순된다.", ruleId: null },
      { n: 3, type: "grammar", choices: ["should", "are", "having", "to be"], answer: 0, explanation: "뒤에 동사원형 be가 오므로 조동사 should가 필요하다.", ruleId: null },
      { n: 4, type: "grammar", choices: ["please", "pleased", "pleasing", "pleasure"], answer: 0, explanation: "명령문 앞의 정중 표현은 please다. 뒤에 동사원형 contact가 온다.", ruleId: "g12" }
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
      { n: 1, type: "grammar", choices: ["ship", "shipper", "were shipped", "shipping"], answer: 2, explanation: "제품은 출고되는 쪽이므로 수동태다. 빈칸 뒤에 목적어가 없다.", ruleId: "g04" },
      { n: 2, type: "sentence", choices: ["No injuries have been reported so far.", "The product has been discontinued since 2010.", "Our stores will close permanently next month.", "The kettle won a design award last year."], answer: 0, explanation: "리콜 안내 문맥에서 피해 여부를 알리는 문장이 자연스럽다.", ruleId: null },
      { n: 3, type: "grammar", choices: ["and", "or", "but", "nor"], answer: 1, explanation: "whichever you prefer(둘 중 원하시는 대로)가 뒤에 오므로 선택을 뜻하는 or가 맞다.", ruleId: null },
      { n: 4, type: "grammar", choices: ["inconvenience", "inconvenient", "inconveniently", "inconveniences"], answer: 0, explanation: "the 뒤는 명사 자리다. inconvenience는 셀 수 없는 명사로 쓴다.", ruleId: "g01" }
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
      { type: "text", en: " option, and it takes less than two minutes. " },
      { type: "blank", n: 4 },
      { type: "text", en: " We value your readership and hope to serve you for another year." }
    ],
    ko: "파텔 님께, 모던 디자인 먼슬리 구독이 12월 31일에 만료됩니다. 잡지를 끊김 없이 계속 받아보시려면 12월 15일까지 갱신해 주세요. 온라인 갱신이 가장 빠른 방법이며 2분도 걸리지 않습니다. 일찍 갱신하신 구독자께는 무료 에코백을 드립니다. 저희 잡지를 읽어주셔서 감사드리며 내년에도 함께하기를 바랍니다.",
    vocab: [
      { w: "subscription", m: "구독" },
      { w: "without interruption", m: "중단 없이" },
      { w: "renew", m: "(구독을) 갱신하다" },
      { w: "option", m: "방법, 선택지" },
      { w: "readership", m: "독자층, 독자 수" }
    ],
    questions: [
      { n: 1, type: "grammar", choices: ["expire", "expires", "expired", "expiring"], answer: 1, explanation: "주어 Your subscription이 단수이고 예정된 일을 말하므로 현재형 expires.", ruleId: "g02" },
      { n: 2, type: "grammar", choices: ["by", "until", "during", "since"], answer: 0, explanation: "12월 15일까지 갱신을 끝내라는 마감 의미이므로 by.", ruleId: "g06" },
      { n: 3, type: "grammar", choices: ["fast", "faster", "fastest", "more fast"], answer: 2, explanation: "the와 함께 쓰였으므로 최상급 fastest.", ruleId: "g10" },
      { n: 4, type: "sentence", choices: ["Subscribers who renew early receive a free tote bag.", "Our office will be closed for the holidays.", "The magazine will stop publishing next year.", "Please return the damaged issue to us."], answer: 0, explanation: "갱신을 권하는 문맥이므로 조기 갱신 혜택을 알리는 문장이 자연스럽다.", ruleId: null }
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
      { n: 1, type: "grammar", choices: ["delight", "delighted", "delighting", "delightful"], answer: 1, explanation: "사람이 기쁨을 느끼는 쪽이므로 -ed 형태인 delighted. We are delighted to ~ 는 환영 인사의 정형 표현이다.", ruleId: "g01" },
      { n: 2, type: "sentence", choices: ["Lunch will be provided in the staff lounge.", "You must submit your resignation in advance.", "The orientation has been canceled.", "Parking is not available for employees."], answer: 0, explanation: "첫날 일정을 안내하는 문맥이므로 점심 제공 안내가 자연스럽다.", ruleId: null },
      { n: 3, type: "grammar", choices: ["goal", "goals", "goaled", "goaling"], answer: 1, explanation: "three main 뒤이므로 복수 명사 goals가 와야 한다.", ruleId: "g01" },
      { n: 4, type: "grammar", choices: ["assist", "assistance", "assistant", "assisted"], answer: 1, explanation: "need의 목적어 자리이므로 명사가 필요하다. assistance(도움)는 셀 수 없는 명사, assistant는 사람이다.", ruleId: "g01" }
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
      { n: 1, type: "grammar", choices: ["among", "through", "along", "across"], answer: 1, explanation: "from A through B는 'A부터 B까지(B 포함)'. 기간을 나타내는 짝 표현이다.", ruleId: "g06" },
      { n: 2, type: "sentence", choices: ["The repairs were completed last year.", "Parking fees will increase in June.", "Signs will be posted at both entrances.", "Please return your badge to the front desk."], answer: 2, explanation: "문장 삽입 문제다. 서쪽 주차장을 쓰라는 안내 뒤에 안내 표지 설치가 자연스럽게 이어진다. 공사는 아직 시작 전이라 '작년에 끝났다'는 시제가 맞지 않고, 요금이나 출입증 이야기는 나오지 않는다.", ruleId: null },
      { n: 3, type: "vocab", choices: ["room", "amount", "number", "size"], answer: 0, explanation: "enough room = 충분한 공간. room은 '공간'이라는 뜻의 불가산명사다.", ruleId: null },
      { n: 4, type: "grammar", choices: ["sincere", "sincerely", "sincerity", "sincerest"], answer: 1, explanation: "동사 apologize를 꾸미므로 부사가 와야 한다.", ruleId: "g01" }
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
      { type: "text", en: " Owner Marisol Vega said the extra space will allow the company to bake its pastries on site for the first time. Customers " },
      { type: "blank", n: 4 },
      { type: "text", en: " previously bought bread from a partner bakery can expect a wider selection." }
    ],
    ko: "벨포트 로스터스, 네 번째 카페 개점 — 벨포트 로스터스가 다음 달 커낼 스트리트 15번지에 네 번째 매장을 엽니다. 2014년에 설립된 이 회사는 항구 근처의 매장 하나로 시작해 현재 60명이 넘는 직원을 두고 있습니다. 새 카페는 40명을 수용하며 작은 베이커리 코너도 갖춥니다. 베이커리 코너는 이 회사로서는 처음입니다. 대표 마리솔 베가는 늘어난 공간 덕분에 처음으로 페이스트리를 매장에서 직접 구울 수 있게 됐다고 말했습니다. 그동안 협력 제과점에서 빵을 사 온 고객들은 더 다양한 제품을 기대할 수 있습니다.",
    vocab: [
      { w: "location", m: "지점" },
      { w: "harbor", m: "항구" },
      { w: "seat", m: "~명을 수용하다" },
      { w: "on site", m: "현장에서" },
      { w: "a wider selection", m: "더 다양한 종류" }
    ],
    questions: [
      { n: 1, type: "grammar", choices: ["founding", "founds", "founded", "to found"], answer: 2, explanation: "회사는 '설립되는' 쪽이므로 수동 의미의 과거분사가 와야 한다.", ruleId: "g04" },
      { n: 2, type: "grammar", choices: ["include", "including", "includes", "to include"], answer: 0, explanation: "will seat ... and (will) include. 조동사 will을 공유하는 병렬이라 동사원형이 온다.", ruleId: "g01" },
      { n: 3, type: "sentence", choices: ["The original shop closed in 2014.", "The company plans to reduce its staff.", "Canal Street will be closed to traffic.", "The bakery counter will be the company's first."], answer: 3, explanation: "문장 삽입 문제다. 뒤 문장이 '처음으로 직접 굽는다'로 이어지므로 '첫 베이커리 코너'가 맞다. 2014년은 설립 연도이고, 직원이 60명 이상으로 늘고 있어 감원 이야기도 맞지 않는다.", ruleId: null },
      { n: 4, type: "grammar", choices: ["whose", "who", "which", "whom"], answer: 1, explanation: "뒤에 동사 bought가 바로 오므로 주격 관계대명사다. 선행사가 사람이라 which는 안 된다.", ruleId: "g08" }
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
      { n: 1, type: "vocab", choices: ["outcome", "outlook", "outage", "output"], answer: 2, explanation: "outage는 서비스가 중단된 시간을 말한다. 철자가 비슷한 단어들과 구분해야 한다.", ruleId: null },
      { n: 2, type: "sentence", choices: ["The maintenance has been postponed until next month.", "However, the platform will be completely unavailable during those four hours.", "Please register for an account before Saturday.", "Assignments are graded within two business days."], answer: 1, explanation: "문장 삽입 문제다. '저장한 내용은 영향 없다' 다음에 However로 뒤집으며 4시간 중단을 알린다. 1시~5시가 네 시간이라는 점도 근거다. 점검은 이번 토요일이라 연기 이야기는 맞지 않는다.", ruleId: null },
      { n: 3, type: "grammar", choices: ["resolves", "resolving", "resolved", "resolve"], answer: 3, explanation: "will improve ... and (will) resolve. will을 공유하는 병렬이라 동사원형이 온다.", ruleId: "g01" },
      { n: 4, type: "grammar", choices: ["patient", "patience", "patiently", "patientness"], answer: 1, explanation: "your 뒤에는 명사가 온다. Thank you for your patience는 공지문 마무리 관용구다.", ruleId: "g01" }
    ]
  },
  {
    id: "p610", title: "면접 일정 안내", recommendedSec: 120,
    header: ["From: Gilles Moreau", "To: Ms. Arnault", "Subject: Interview Invitation", "Dear Ms. Arnault,"],
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
      { w: "reserve", m: "일정을 잡아 두다" }
    ],
    questions: [
      { n: 1, type: "grammar", choices: ["invite", "inviting", "invited", "invitation"], answer: 0, explanation: "would like to 뒤에는 동사원형이 온다.", ruleId: "g05" },
      { n: 2, type: "vocab", choices: ["conform", "confirm", "confine", "consume"], answer: 1, explanation: "confirm은 '확정하다, 확인해 주다'. 철자가 비슷한 단어와 구분해야 한다.", ruleId: null },
      { n: 3, type: "sentence", choices: ["We have already filled the position.", "Your first day will be September 9.", "If that date is not convenient, we can suggest another.", "Please send two letters of reference by Monday."], answer: 2, explanation: "문장 삽입 문제다. 날짜 확정 요청 바로 뒤에 '안 되면 다른 날짜'를 제안하는 것이 자연스럽다. 면접을 제안하는 메일이라 '이미 채용했다'는 모순이고, 9월 9일은 면접일이며, 뒤에서 미리 준비할 것이 없다고 했다.", ruleId: null },
      { n: 4, type: "vocab", choices: ["advanced", "advancing", "advance", "advancement"], answer: 2, explanation: "in advance = 미리. 굳어진 전치사구다.", ruleId: null }
    ]
  }
];
