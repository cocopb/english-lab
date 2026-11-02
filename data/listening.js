window.DICTATION = [
  { id: "d01", text: "The meeting will start at three o'clock.", ko: "회의는 3시에 시작합니다.", level: 1 },
  { id: "d02", text: "Please submit the report by Friday.", ko: "금요일까지 보고서를 제출해 주세요.", level: 1 },
  { id: "d03", text: "I'd like to confirm my reservation.", ko: "예약을 확인하고 싶습니다.", level: 1 },
  { id: "d04", text: "The shipment has not arrived yet.", ko: "배송품이 아직 도착하지 않았습니다.", level: 2 },
  { id: "d05", text: "Could you send me the invoice?", ko: "청구서를 보내주시겠어요?", level: 1 },
  { id: "d06", text: "All employees must attend the training session.", ko: "전 직원은 교육에 참석해야 합니다.", level: 2 },
  { id: "d07", text: "The office is closed on weekends.", ko: "사무실은 주말에 문을 닫습니다.", level: 1 },
  { id: "d08", text: "We need to reschedule the appointment.", ko: "약속 일정을 다시 잡아야 합니다.", level: 2 },
  { id: "d09", text: "Your package will be delivered tomorrow morning.", ko: "소포는 내일 아침에 배달될 예정입니다.", level: 2 },
  { id: "d10", text: "She works in the marketing department.", ko: "그녀는 마케팅 부서에서 일합니다.", level: 1 },
  { id: "d11", text: "There is a problem with the payment.", ko: "결제에 문제가 있습니다.", level: 2 },
  { id: "d12", text: "The manager approved the budget last week.", ko: "부장님이 지난주에 예산을 승인했습니다.", level: 2 },
  { id: "d13", text: "Can I get a receipt, please?", ko: "영수증 좀 주시겠어요?", level: 1 },
  { id: "d14", text: "The flight has been delayed by two hours.", ko: "항공편이 두 시간 지연됐습니다.", level: 3 },
  { id: "d15", text: "Let me check the schedule for you.", ko: "일정을 확인해 드리겠습니다.", level: 2 }
];

window.PART2 = [
  { id: "p201", question: "Where did you put the files?", choices: ["On your desk.", "Yes, I did.", "At three o'clock."], answer: 0, explanation: "Where(장소)로 물었으므로 장소로 답한다. 의문사 의문문에는 Yes/No로 답하지 않는다.", ko: "파일을 어디에 두셨어요? — 책상 위에요." },
  { id: "p202", question: "When does the store open?", choices: ["On Main Street.", "At nine.", "Yes, it is."], answer: 1, explanation: "When(시간)으로 물었으므로 시각으로 답한다. On Main Street는 Where에 대한 답이다.", ko: "가게는 언제 열어요? — 9시에요." },
  { id: "p203", question: "Who's in charge of the project?", choices: ["Next Monday.", "In the office.", "Ms. Kim is."], answer: 2, explanation: "Who(사람)로 물었으므로 사람으로 답한다.", ko: "프로젝트 담당자가 누구예요? — 김 씨입니다." },
  { id: "p204", question: "Would you like some coffee?", choices: ["No, thanks.", "It's over there.", "About an hour."], answer: 0, explanation: "Would you like ~?는 권유 표현이다. 수락 또는 거절로 답한다.", ko: "커피 좀 드실래요? — 괜찮습니다." },
  { id: "p205", question: "How long is the flight?", choices: ["At gate 12.", "About four hours.", "Yes, it's long."], answer: 1, explanation: "How long(소요 시간)으로 물었으므로 기간으로 답한다.", ko: "비행시간이 얼마나 되나요? — 네 시간쯤이요." },
  { id: "p206", question: "Why was the meeting canceled?", choices: ["In the conference room.", "Yes, it was.", "Because the manager is sick."], answer: 2, explanation: "Why(이유)로 물었으므로 Because로 답한다.", ko: "회의가 왜 취소됐나요? — 부장님이 아프셔서요." },
  { id: "p207", question: "Could you help me with this report?", choices: ["Sure, no problem.", "It's on the shelf.", "Last Friday."], answer: 0, explanation: "Could you ~?는 요청 표현이다. 수락 또는 거절로 답한다.", ko: "이 보고서 좀 도와주시겠어요? — 그럼요." },
  { id: "p208", question: "Did you send the invoice?", choices: ["To the airport.", "Yes, this morning.", "It's very expensive."], answer: 1, explanation: "Did 의문문이므로 Yes/No로 답할 수 있다. 시점을 덧붙이면 자연스럽다.", ko: "청구서 보내셨어요? — 네, 오늘 아침에요." },
  { id: "p209", question: "Which room is the training in?", choices: ["Room 302.", "At two o'clock.", "Mr. Lee is."], answer: 0, explanation: "Which room(장소)으로 물었으므로 방 번호로 답한다.", ko: "교육은 어느 방에서 하나요? — 302호입니다." },
  { id: "p210", question: "The printer isn't working.", choices: ["Yes, I printed it.", "On the second floor.", "I'll call the technician."], answer: 2, explanation: "평서문으로 문제 상황을 알리면 해결책을 제시하는 답이 자연스럽다. Part 2의 고난도 유형이다.", ko: "프린터가 안 돼요. — 기사님을 부를게요." }
];

window.PART3 = [
  {
    id: "p301",
    title: "반품 문의",
    script: [
      { speaker: "W", text: "Hi, I'd like to return this jacket. I bought it last week." },
      { speaker: "M", text: "Sure. Do you have the receipt with you?" },
      { speaker: "W", text: "Yes, here it is. The size was too small." },
      { speaker: "M", text: "No problem. Would you like a refund or an exchange?" },
      { speaker: "W", text: "I'd prefer an exchange, if you have a larger size." },
      { speaker: "M", text: "Let me check our inventory. One moment, please." }
    ],
    questions: [
      { q: "Why is the woman at the store?", choices: ["To return an item", "To apply for a job", "To pick up an order", "To make a complaint"], answer: 0, explanation: "첫 문장에서 I'd like to return this jacket이라고 밝힌다." },
      { q: "What does the man ask for?", choices: ["A credit card", "A receipt", "An email address", "A phone number"], answer: 1, explanation: "Do you have the receipt with you?라고 묻는다." },
      { q: "What does the woman want?", choices: ["A refund", "A discount", "An exchange", "A delivery"], answer: 2, explanation: "I'd prefer an exchange라고 말한다." }
    ]
  },
  {
    id: "p302",
    title: "회의실 예약 변경",
    script: [
      { speaker: "M", text: "Good morning. I'm calling about the conference room booking for Thursday." },
      { speaker: "W", text: "Let me see. Yes, Room B is reserved from two to four." },
      { speaker: "M", text: "Actually, we need it for an extra hour. Is that possible?" },
      { speaker: "W", text: "Let me check. Yes, it's free until six. I'll extend it to five." },
      { speaker: "M", text: "Great, thank you. Could you also arrange for twelve chairs?" },
      { speaker: "W", text: "Of course. I'll have them set up before the meeting." }
    ],
    questions: [
      { q: "What is the man calling about?", choices: ["A job interview", "A room reservation", "A delivery problem", "A payment issue"], answer: 1, explanation: "I'm calling about the conference room booking이라고 밝힌다." },
      { q: "What change does the man request?", choices: ["A different room", "An earlier start", "More time", "A new date"], answer: 2, explanation: "we need it for an extra hour라고 요청한다." },
      { q: "What will the woman arrange?", choices: ["Chairs", "Lunch", "A projector", "Parking"], answer: 0, explanation: "Could you also arrange for twelve chairs?에 Of course라고 답한다." }
    ]
  }
];
