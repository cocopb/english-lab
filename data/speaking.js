window.SPEAKING = [
  { id: "s01", situation: "카페에서 주문하기", expressions: [{ english: "Could I get a cup of tea, please?", korean: "차 한 잔 주시겠어요?" }, { english: "For here or to go?", korean: "매장에서 드시나요, 가져가시나요?" }] },
  { id: "s02", situation: "길 묻기", expressions: [{ english: "Could you tell me how to get to the station?", korean: "역에 어떻게 가는지 알려주시겠어요?" }, { english: "Is it within walking distance?", korean: "걸어서 갈 수 있는 거리인가요?" }] }
];

window.PATTERNS = [
  {
    id: "sp01", pattern: "I'd like to ~", meaning: "~하고 싶어요 (정중한 요청)",
    tip: "want보다 훨씬 정중하다. to 뒤에는 동사원형. 명사를 말할 땐 to 없이 I'd like + 명사.",
    drills: [
      { ko: "예약하고 싶어요.", en: "I'd like to make a reservation." },
      { ko: "체크인하고 싶어요.", en: "I'd like to check in." },
      { ko: "커피 한 잔 주세요.", en: "I'd like a coffee." },
      { ko: "이걸 반품하고 싶어요.", en: "I'd like to return this." }
    ]
  },
  {
    id: "sp02", pattern: "Can I ~?", meaning: "제가 ~해도 될까요?",
    tip: "내가 하는 행동을 물을 때. 상대가 하는 행동은 Could you ~? 를 쓴다.",
    drills: [
      { ko: "카드로 계산해도 될까요?", en: "Can I pay by card?" },
      { ko: "화장실 좀 써도 될까요?", en: "Can I use the restroom?" },
      { ko: "메뉴 좀 볼 수 있을까요?", en: "Can I see the menu?" },
      { ko: "여기 앉아도 될까요?", en: "Can I sit here?" }
    ]
  },
  {
    id: "sp03", pattern: "Could you ~?", meaning: "~해주실 수 있나요?",
    tip: "상대가 하는 행동을 부탁할 때. Can you보다 정중하다.",
    drills: [
      { ko: "다시 말씀해 주시겠어요?", en: "Could you say that again?" },
      { ko: "천천히 말씀해 주시겠어요?", en: "Could you speak more slowly?" },
      { ko: "좀 도와주시겠어요?", en: "Could you help me?" },
      { ko: "사진 좀 찍어주시겠어요?", en: "Could you take a picture for me?" }
    ]
  },
  {
    id: "sp04", pattern: "Do you have ~?", meaning: "~ 있나요?",
    tip: "가게·호텔에서 물건이나 시설이 있는지 물을 때. have는 진행형을 쓰지 않는다.",
    drills: [
      { ko: "더 작은 사이즈 있나요?", en: "Do you have a smaller size?" },
      { ko: "와이파이 있나요?", en: "Do you have Wi-Fi?" },
      { ko: "영수증 있으세요?", en: "Do you have a receipt?" },
      { ko: "빈방 있나요?", en: "Do you have any rooms available?" }
    ]
  },
  {
    id: "sp05", pattern: "I'm looking for ~", meaning: "~를 찾고 있어요",
    tip: "찾는 과정은 look for, 찾아낸 결과는 find. 아직 못 찾았으면 look for.",
    drills: [
      { ko: "지하철역을 찾고 있어요.", en: "I'm looking for the subway station." },
      { ko: "3번 게이트를 찾고 있어요.", en: "I'm looking for gate 3." },
      { ko: "선물을 찾고 있어요.", en: "I'm looking for a gift." },
      { ko: "이 주소를 찾고 있어요.", en: "I'm looking for this address." }
    ]
  },
  {
    id: "sp06", pattern: "Do you want to ~?", meaning: "~할래요? (제안)",
    tip: "직역하면 '원해?'라 강해 보이지만 실제로는 가벼운 제안이다. Want to ~? 로 줄여도 된다.",
    drills: [
      { ko: "점심 같이 먹을래요?", en: "Do you want to grab lunch?" },
      { ko: "커피 한잔할래요?", en: "Do you want to get a coffee?" },
      { ko: "7시에 만날래요?", en: "Do you want to meet at seven?" },
      { ko: "한번 해볼래요?", en: "Do you want to try?" }
    ]
  },
  {
    id: "sp07", pattern: "How long does it take ~?", meaning: "~하는 데 얼마나 걸리나요?",
    tip: "소요 시간을 묻는 표준 문장. 통째로 외워서 바로 나와야 한다.",
    drills: [
      { ko: "거기까지 얼마나 걸리나요?", en: "How long does it take to get there?" },
      { ko: "배송이 얼마나 걸리나요?", en: "How long does it take to ship?" },
      { ko: "공항까지 얼마나 걸리나요?", en: "How long does it take to the airport?" },
      { ko: "수리하는 데 얼마나 걸리나요?", en: "How long does it take to repair?" }
    ]
  },
  {
    id: "sp08", pattern: "I'm not sure if ~", meaning: "~인지 잘 모르겠어요",
    tip: "확신이 없을 때. 모른다고 단정하는 I don't know보다 부드럽다.",
    drills: [
      { ko: "이게 맞는지 잘 모르겠어요.", en: "I'm not sure if this is right." },
      { ko: "제가 갈 수 있을지 모르겠어요.", en: "I'm not sure if I can go." },
      { ko: "그게 열려 있는지 모르겠어요.", en: "I'm not sure if it's open." },
      { ko: "이해했는지 잘 모르겠어요.", en: "I'm not sure if I understood." }
    ]
  },
  {
    id: "sp09", pattern: "Would you mind ~ing?", meaning: "~해주셔도 괜찮을까요? (아주 정중)",
    tip: "mind는 '꺼리다'라서 수락할 때 No, not at all(전혀요)이라고 답한다. Yes라고 하면 거절이 된다.",
    drills: [
      { ko: "창문 좀 닫아주셔도 될까요?", en: "Would you mind closing the window?" },
      { ko: "잠시 기다려 주셔도 될까요?", en: "Would you mind waiting a moment?" },
      { ko: "다시 한번 설명해 주셔도 될까요?", en: "Would you mind explaining that again?" },
      { ko: "자리를 바꿔주셔도 될까요?", en: "Would you mind switching seats?" }
    ]
  },
  {
    id: "sp10", pattern: "It depends on ~", meaning: "~에 따라 달라요",
    tip: "바로 답하기 어려운 질문에 쓰는 만능 표현. on 뒤에는 명사나 -ing가 온다.",
    drills: [
      { ko: "날씨에 따라 달라요.", en: "It depends on the weather." },
      { ko: "가격에 따라 달라요.", en: "It depends on the price." },
      { ko: "상황에 따라 달라요.", en: "It depends on the situation." },
      { ko: "언제 가느냐에 따라 달라요.", en: "It depends on when you go." }
    ]
  },
  {
    id: "sp11", pattern: "Could I get ~?", meaning: "~ 좀 받을 수 있을까요?",
    tip: "Can I get보다 정중하다. 가게·식당에서 물건을 요청할 때 가장 많이 쓴다.",
    drills: [
      { ko: "물 한 잔 주시겠어요?", en: "Could I get a glass of water?" },
      { ko: "영수증 좀 주시겠어요?", en: "Could I get a receipt?" },
      { ko: "봉투 하나 주시겠어요?", en: "Could I get a bag?" },
      { ko: "5분만 더 주시겠어요?", en: "Could I get five more minutes?" }
    ]
  },
  {
    id: "sp12", pattern: "Is it okay if I ~?", meaning: "제가 ~해도 괜찮을까요?",
    tip: "Can I보다 조심스러운 표현. 상대에게 영향이 가는 일을 물을 때 쓴다.",
    drills: [
      { ko: "창문 좀 열어도 괜찮을까요?", en: "Is it okay if I open the window?" },
      { ko: "조금 늦어도 괜찮을까요?", en: "Is it okay if I am a little late?" },
      { ko: "여기 앉아도 괜찮을까요?", en: "Is it okay if I sit here?" },
      { ko: "내일 다시 연락드려도 괜찮을까요?", en: "Is it okay if I call you back tomorrow?" }
    ]
  },
  {
    id: "sp13", pattern: "I was wondering if ~", meaning: "혹시 ~인지 궁금해서요",
    tip: "가장 정중한 질문 틀이다. 부탁하기 전에 쿠션처럼 쓴다. 과거형이지만 현재 뜻이다.",
    drills: [
      { ko: "혹시 도와주실 수 있는지 궁금해서요.", en: "I was wondering if you could help me." },
      { ko: "혹시 아직 자리가 있는지 궁금해서요.", en: "I was wondering if you still have seats." },
      { ko: "혹시 할인이 되는지 궁금해서요.", en: "I was wondering if there is a discount." },
      { ko: "혹시 일정을 바꿀 수 있는지 궁금해서요.", en: "I was wondering if we could change the schedule." }
    ]
  },
  {
    id: "sp14", pattern: "Let me ~", meaning: "제가 ~할게요",
    tip: "뒤에 동사원형이 온다. 내가 하겠다고 나설 때 쓰는 가장 간단한 표현이다.",
    drills: [
      { ko: "제가 확인해 볼게요.", en: "Let me check." },
      { ko: "제가 도와드릴게요.", en: "Let me help you." },
      { ko: "제가 다시 전화드릴게요.", en: "Let me call you back." },
      { ko: "제가 설명해 드릴게요.", en: "Let me explain." }
    ]
  },
  {
    id: "sp15", pattern: "How about ~?", meaning: "~는 어때요?",
    tip: "뒤에 명사나 -ing가 온다. How about to go는 틀린 표현이다.",
    drills: [
      { ko: "내일은 어때요?", en: "How about tomorrow?" },
      { ko: "같이 가는 건 어때요?", en: "How about going together?" },
      { ko: "7시는 어때요?", en: "How about seven o'clock?" },
      { ko: "다른 걸로 하는 건 어때요?", en: "How about trying something else?" }
    ]
  },
  {
    id: "sp16", pattern: "I'd rather ~", meaning: "차라리 ~하고 싶어요",
    tip: "뒤에 동사원형이 온다. 둘 중에 더 나은 쪽을 고를 때 쓴다. I would rather의 줄임이다.",
    drills: [
      { ko: "저는 차라리 집에 있고 싶어요.", en: "I'd rather stay home." },
      { ko: "저는 차라리 걸어가고 싶어요.", en: "I'd rather walk." },
      { ko: "저는 차라리 내일 하고 싶어요.", en: "I'd rather do it tomorrow." },
      { ko: "저는 차라리 안 가고 싶어요.", en: "I'd rather not go." }
    ]
  },
  {
    id: "sp17", pattern: "Do you mind if I ~?", meaning: "제가 ~해도 될까요?",
    tip: "mind는 '꺼리다'라서 수락할 때 No, go ahead(전혀요, 그러세요)라고 답한다. Yes라고 하면 거절이다.",
    drills: [
      { ko: "여기 앉아도 될까요?", en: "Do you mind if I sit here?" },
      { ko: "사진 좀 찍어도 될까요?", en: "Do you mind if I take a photo?" },
      { ko: "에어컨 좀 켜도 될까요?", en: "Do you mind if I turn on the air conditioner?" },
      { ko: "먼저 가도 될까요?", en: "Do you mind if I leave early?" }
    ]
  },
  {
    id: "sp18", pattern: "I'm afraid ~", meaning: "죄송하지만 ~입니다",
    tip: "나쁜 소식이나 거절을 부드럽게 전할 때 쓰는 쿠션이다. 무서워한다는 뜻이 아니다.",
    drills: [
      { ko: "죄송하지만 그건 어려울 것 같아요.", en: "I'm afraid that won't be possible." },
      { ko: "죄송하지만 지금은 시간이 안 돼요.", en: "I'm afraid I'm not available right now." },
      { ko: "죄송하지만 자리가 없습니다.", en: "I'm afraid we are fully booked." },
      { ko: "죄송하지만 제가 늦을 것 같아요.", en: "I'm afraid I'll be late." }
    ]
  },
  {
    id: "sp19", pattern: "That sounds ~", meaning: "~하겠네요 (상대 말에 반응)",
    tip: "뒤에 형용사가 온다. That's와 동사가 겹치지 않게 주의한다. That's sounds good은 틀린 표현이다.",
    drills: [
      { ko: "좋네요.", en: "That sounds good." },
      { ko: "재밌겠네요.", en: "That sounds fun." },
      { ko: "힘들겠네요.", en: "That sounds tough." },
      { ko: "좋은 생각이네요.", en: "That sounds like a good idea." }
    ]
  },
  {
    id: "sp20", pattern: "I'm not good at ~", meaning: "저는 ~를 잘 못해요",
    tip: "at 뒤에는 명사나 -ing가 온다. 반대는 I'm good at ~.",
    drills: [
      { ko: "저는 영어를 잘 못해요.", en: "I'm not good at English." },
      { ko: "저는 요리를 잘 못해요.", en: "I'm not good at cooking." },
      { ko: "저는 길 찾는 걸 잘 못해요.", en: "I'm not good at finding my way." },
      { ko: "저는 아침에 일찍 일어나는 걸 잘 못해요.", en: "I'm not good at getting up early." }
    ]
  },
  {
    id: "sp21", pattern: "Is there any way to ~?", meaning: "~할 방법이 있을까요?",
    tip: "어려운 부탁을 할 때 쓴다. 직접 요구하지 않아서 부담이 적다.",
    drills: [
      { ko: "더 빨리 받을 방법이 있을까요?", en: "Is there any way to get it faster?" },
      { ko: "예약을 바꿀 방법이 있을까요?", en: "Is there any way to change the reservation?" },
      { ko: "환불받을 방법이 있을까요?", en: "Is there any way to get a refund?" },
      { ko: "연락할 방법이 있을까요?", en: "Is there any way to contact him?" }
    ]
  },
  {
    id: "sp22", pattern: "What do you think about ~?", meaning: "~에 대해 어떻게 생각해요?",
    tip: "about 뒤에는 명사나 -ing가 온다. How do you think about은 틀린 표현이다.",
    drills: [
      { ko: "이 계획에 대해 어떻게 생각해요?", en: "What do you think about this plan?" },
      { ko: "새 사무실에 대해 어떻게 생각해요?", en: "What do you think about the new office?" },
      { ko: "일찍 출발하는 건 어떻게 생각해요?", en: "What do you think about leaving early?" },
      { ko: "그 제안에 대해 어떻게 생각해요?", en: "What do you think about the offer?" }
    ]
  },
  {
    id: "sp23", pattern: "Make sure you ~", meaning: "꼭 ~하세요",
    tip: "뒤에 동사원형이 온다. 당부할 때 쓰는 표현이다.",
    drills: [
      { ko: "꼭 여권 챙기세요.", en: "Make sure you bring your passport." },
      { ko: "꼭 확인하세요.", en: "Make sure you check it." },
      { ko: "꼭 제시간에 오세요.", en: "Make sure you arrive on time." },
      { ko: "꼭 저장하세요.", en: "Make sure you save the file." }
    ]
  },
  {
    id: "sp24", pattern: "I used to ~", meaning: "예전에는 ~했어요 (지금은 아님)",
    tip: "뒤에 동사원형이 온다. be used to -ing(~에 익숙하다)와 혼동하지 말 것.",
    drills: [
      { ko: "저는 예전에 서울에 살았어요.", en: "I used to live in Seoul." },
      { ko: "저는 예전에 커피를 많이 마셨어요.", en: "I used to drink a lot of coffee." },
      { ko: "저는 예전에 식당에서 일했어요.", en: "I used to work at a restaurant." },
      { ko: "저는 예전에 매일 운동했어요.", en: "I used to exercise every day." }
    ]
  },
  {
    id: "sp25", pattern: "I'm supposed to ~", meaning: "~하기로 되어 있어요",
    tip: "뒤에 동사원형이 온다. 약속이나 규정상 정해진 일을 말할 때 쓴다.",
    drills: [
      { ko: "저는 9시에 도착하기로 되어 있어요.", en: "I'm supposed to arrive at nine." },
      { ko: "저는 오늘 보고서를 내기로 되어 있어요.", en: "I'm supposed to submit the report today." },
      { ko: "여기서 기다리기로 되어 있어요.", en: "I'm supposed to wait here." },
      { ko: "저는 그를 만나기로 되어 있어요.", en: "I'm supposed to meet him." }
    ]
  }
];

window.ROLEPLAYS = [
  {
    id: "rp_cafe", title: "카페에서 주문하기", situation: "미국의 한 카페. 당신은 손님입니다.",
    turns: [
      { who: "other", en: "Hi! Welcome. What can I get for you today?", ko: "안녕하세요! 뭐 드릴까요?" },
      { who: "me", instruction: "아이스 아메리카노를 주문하세요.", model: "I'd like an iced americano.", alts: ["Can I get an iced americano?", "I'll have an iced americano."], comment: "ice가 아니라 iced다. 얼음이 넣어진 커피라서 -ed가 붙는다." },
      { who: "other", en: "Sure. What size would you like?", ko: "네. 사이즈는요?" },
      { who: "me", instruction: "큰 사이즈로 해달라고 하세요.", model: "Large, please.", alts: ["A large one, please.", "I'll take a large."], comment: "짧게 답하는 게 자연스럽다. please는 거의 문법처럼 붙인다." },
      { who: "other", en: "Got it. For here or to go?", ko: "알겠습니다. 드시고 가세요, 포장이세요?" },
      { who: "me", instruction: "포장해 간다고 하세요.", model: "To go, please.", alts: ["To go.", "Takeaway, please."], comment: "미국은 to go, 영국은 takeaway. 한국식 '테이크아웃'은 잘 안 쓴다." },
      { who: "other", en: "That'll be five dollars. How would you like to pay?", ko: "5달러입니다. 어떻게 결제하시겠어요?" },
      { who: "me", instruction: "카드로 결제한다고 하세요.", model: "Card, please.", alts: ["By card, please.", "Can I pay by card?"], comment: "credit card는 두 단어다. 실전에선 그냥 Card, please가 가장 흔하다." },
      { who: "other", en: "Perfect. It'll be ready in a moment. Have a great day!", ko: "네, 곧 준비됩니다. 좋은 하루 보내세요!" }
    ]
  },
  {
    id: "rp_hotel", title: "호텔 체크인", situation: "호텔 프런트. 당신은 투숙객입니다.",
    turns: [
      { who: "other", en: "Good evening! Welcome to the Grand Hotel. Checking in?", ko: "안녕하세요! 그랜드 호텔입니다. 체크인하시나요?" },
      { who: "me", instruction: "예약했다고 말하세요.", model: "Yes, I have a reservation.", alts: ["I have a reservation.", "Yes, I booked a room."], comment: "예약을 실제로 갖고 있으므로 have가 맞다. 표를 사려는 상황과 구분하라." },
      { who: "other", en: "Great. Can I have your name, please?", ko: "네. 성함을 알려주시겠어요?" },
      { who: "me", instruction: "이름을 말하고 철자도 불러주세요.", model: "It's under Jeong. J-E-O-N-G.", alts: ["My name is Jeong. J-E-O-N-G.", "Jeong. That's J-E-O-N-G."], comment: "under + 성 = ~이름으로 예약된. 한국 이름은 처음부터 철자를 같이 말하면 훨씬 빠르다." },
      { who: "other", en: "Thank you. I see a reservation for three nights. Here's your key card, room 512.", ko: "감사합니다. 3박 예약 확인됐습니다. 키카드 여기 있습니다, 512호입니다." },
      { who: "me", instruction: "조식이 포함인지 물어보세요.", model: "Is breakfast included?", alts: ["Does that include breakfast?", "Is the breakfast included?"], comment: "처음 꺼내는 주제는 이름을 밝혀야 한다. Is it included? 라고만 하면 무엇을 말하는지 알 수 없다." },
      { who: "other", en: "Yes, it's served from seven to ten in the lobby restaurant.", ko: "네, 로비 레스토랑에서 7시부터 10시까지 제공됩니다." },
      { who: "me", instruction: "와이파이 비밀번호를 물어보세요.", model: "What's the Wi-Fi password?", alts: ["Could I get the Wi-Fi password?", "What is the Wi-Fi password?"], comment: "호텔에서 가장 많이 쓰는 질문 중 하나다." },
      { who: "other", en: "It's grand2026, all lowercase. Enjoy your stay!", ko: "grand2026이고 전부 소문자입니다. 즐거운 숙박 되세요!" }
    ]
  }
];

window.SHADOWING = [
  { id: "sh01", en: "Can I get the check, please?", ko: "계산서 좀 주시겠어요?", level: 1 },
  { id: "sh02", en: "I'm looking for the subway station.", ko: "지하철역을 찾고 있어요.", level: 1 },
  { id: "sh03", en: "Could you speak more slowly, please?", ko: "조금 천천히 말씀해 주시겠어요?", level: 2 },
  { id: "sh04", en: "I'd like to make a reservation for two.", ko: "두 명 예약하고 싶습니다.", level: 2 },
  { id: "sh05", en: "Sorry, I didn't catch that. Could you say it again?", ko: "죄송해요, 못 알아들었어요. 다시 말씀해 주시겠어요?", level: 3 },
  { id: "sh06", en: "I'm afraid weekends are difficult for me, but I could do weekday evenings.", ko: "죄송하지만 주말은 어렵고, 평일 저녁은 가능합니다.", level: 3 },
  { id: "sh07", en: "Would you mind if I opened the window?", ko: "창문 좀 열어도 될까요?", level: 2 },
  { id: "sh08", en: "It depends on how much time we have.", ko: "시간이 얼마나 있느냐에 따라 달라요.", level: 2 },
  { id: "sh09", en: "Could I get a receipt, please?", ko: "영수증 좀 주시겠어요?", level: 1 },
  { id: "sh10", en: "I'm supposed to meet her at three.", ko: "3시에 그녀를 만나기로 되어 있어요.", level: 2 },
  { id: "sh11", en: "Is there any way to change my reservation?", ko: "예약을 바꿀 방법이 있을까요?", level: 3 },
  { id: "sh12", en: "I was wondering if you could help me with this.", ko: "혹시 이것 좀 도와주실 수 있는지 궁금해서요.", level: 3 },
  { id: "sh13", en: "Let me check and get back to you.", ko: "확인해 보고 다시 연락드릴게요.", level: 2 },
  { id: "sh14", en: "I'm afraid I won't be able to make it.", ko: "죄송하지만 참석하지 못할 것 같아요.", level: 3 },
  { id: "sh15", en: "How about meeting a little earlier?", ko: "조금 일찍 만나는 건 어때요?", level: 2 },
  { id: "sh16", en: "Make sure you bring your ID badge.", ko: "사원증 꼭 챙기세요.", level: 2 },
  { id: "sh17", en: "I used to work in the marketing department.", ko: "저는 예전에 마케팅 부서에서 일했어요.", level: 2 },
  { id: "sh18", en: "Do you mind if I open the window?", ko: "창문 좀 열어도 될까요?", level: 2 },
  { id: "sh19", en: "That sounds like a great idea to me.", ko: "제가 보기엔 아주 좋은 생각이네요.", level: 2 },
  { id: "sh20", en: "I'd rather discuss this in person than over the phone.", ko: "전화보다는 직접 만나서 얘기하고 싶어요.", level: 3 }
];
