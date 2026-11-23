# 듣기 감사 — 받아쓰기 45, Part 2 45 (2026-11-23)

## A. TTS가 제대로 읽는가

### 실제로 읽혀 본 방법

- 이 PC의 영어 음성은 Microsoft Zira(en-US) 하나다. 브라우저가 Windows 로컬 음성을 쓸 때 이 음성이 나온다.
- SAPI(System.Speech)로 원문과 '풀어 쓴 후보'를 각각 합성하고, 발음 기호(phoneme) 열이 같은지 비교했다. 같으면 그 후보대로 읽은 것이다.
- Chrome의 Google 음성, Edge의 온라인 음성은 이 방법으로 확인할 수 없다. 엔진마다 다를 수 있다.

### 후보 추출

받아쓰기 45문장, Part 2 질문 45개, 보기 135개에서 숫자, 시각 표현(o'clock·past·to), 약어(Mr. Ms. Dr. St. 등), 대문자 약어, 하이픈 단어, $, /를 모두 뽑았다. 받아쓰기는 숫자를 모두 단어로 써서 해당하는 곳이 o'clock 하나였다.

| 위치 | 원문 | Zira가 읽은 방식 | 결과 |
|---|---|---|---|
| Part 2 p209 (A) | Room 302. | three hundred and two | **고침** → Room three-oh-two. 방 번호는 '삼백이'가 아니라 '쓰리 오 투'로 읽는다 |
| Part 2 p223 (B) | Since 2021. | twenty twenty-one | 그대로 (연도를 바르게 읽음) |
| Part 2 p205 (A) | At gate 12. | twelve | 그대로 |
| Part 2 p203·p213 | Ms. Kim / Ms. Chen | Miz | 그대로 |
| Part 2 p209·p228 | Mr. Lee / Mr. Park | Mister | 그대로 |
| 받아쓰기 d01, Part 2 p201·p209·p211·p220 | three o'clock 등 | o'clock | 그대로 |
| Part 2 p236 (A) | three-year | three year | 그대로 |
| Part 2 p241 | e-mail / E-mail | email | 그대로 |

참고로 데이터에 없는 표현도 같이 읽혀 봤다.

| 표현 | Zira(en-US) |
|---|---|
| 555-0144 | five five five, zero one four four (바르게 읽음) |
| ten to eight | 비교 후보와 모두 달라 확인하지 못함 |
| 한국어 음성(Heami)이 영어를 읽을 때 | 555-0144를 '오오오콩일사사', $1,200을 '천이백달러', 3/15를 '십오분의 삼'으로 읽는다. 음성 설정이 한국어로 잡히면 이런 일이 생긴다 |

## B. 받아쓰기 45문장

### 채점 기준 (assets/js/listening.js `tokenize`)

| 항목 | 맞다고 보는가 | 이유 |
|---|---|---|
| 대소문자 | 무시 | 모두 소문자로 바꿔 비교한다 |
| 마침표·쉼표·물음표 | 무시 | 단어마다 a-z, 0-9 외 문자를 지운다 |
| 아포스트로피 | 무시 | I'd를 Id로 써도 맞다 |
| 축약형 | 다르게 본다 | I'd는 'id' 한 단어, I would는 'i' 'would' 두 단어라 틀린다. 들리는 대로 축약형을 써야 한다 |
| 하이픈 | 붙여 쓴 것과 같다 | e-mail = email, e mail은 틀림 |
| 숫자 | 다르게 본다 | three와 3은 다르다. 받아쓰기는 숫자를 모두 단어로 써서 문장과 같은 방식으로 써야 맞다 |

- 길이: 5단어부터 11단어까지다. 받아쓰기로 적당하다.
- 영어: 모두 미국식이다 (labor, canceled). 어색한 문장은 없다.

### 중복으로 고친 문장 (20)

받아쓰기 문장마다 단어장 예문 790개, 문법 노트 예문·trap, Part 1 보기, Part 2 질문·보기, Part 3·4 스크립트, 독해 문장, 다른 받아쓰기와 내용어를 대조했다. 내용어가 3개 이상 겹치거나 문장 틀이 같으면 바꿨다. 바꾼 문장도 다시 대조해 겹침이 없을 때까지 고쳤다.

| id | 전 | 후 | 해석 | 겹친 곳 |
|---|---|---|---|---|
| d02 | Please submit the report by Friday. | Please turn off the lights at the end of the day. | 퇴근할 때 불을 꺼 주세요. | d31과 거의 같고, 단어장 v011 'Please submit the report to your manager by Friday.'와 겹침 |
| d06 | All employees must attend the training session. | Each new hire receives a laptop and a phone. | 신입 사원은 노트북과 휴대전화를 받습니다. | 단어장 v008 'All employees must attend the training ...'과 겹침 |
| d09 | Your package will be delivered tomorrow morning. | Your order should arrive by tomorrow afternoon. | 주문하신 물건은 내일 오후까지 도착할 예정입니다. | 단어장 v038 'The package will be delivered tomorrow.'와 겹침 |
| d10 | She works in the marketing department. | She manages the marketing team. | 그녀는 마케팅팀을 관리합니다. | 단어장 v007 'She works in the sales department.'와 문장 틀이 같음 |
| d12 | The manager approved the budget last week. | The director signed the agreement last week. | 이사님이 지난주에 합의서에 서명했습니다. | 단어장 v015 'The manager approved the budget ...'과 겹침 |
| d14 | The flight has been delayed by two hours. | The train to Boston is running twenty minutes late. | 보스턴행 기차가 20분 늦게 운행되고 있습니다. | 단어장 v020 'The flight was delayed by two hours.'와 거의 같음 |
| d17 | Could you confirm the delivery date? | Could you tell me when the order will ship? | 주문품이 언제 발송되는지 알려 주시겠어요? | 독해 rp30 'Please confirm the delivery date.'와 겹침 |
| d19 | I'm calling about the invoice you sent. | I have a question about the invoice you sent. | 보내주신 청구서에 대해 질문이 있습니다. | Part 3 p302·p303·p311의 'I'm calling about ...'과 문장 틀이 같음 |
| d21 | Please fill out this form before you leave. | Please lock the door before you leave. | 나가시기 전에 문을 잠가 주세요. | 단어장 v113 '... fill it out there'와 겹침 (fill out, form) |
| d22 | We offer a discount for bulk orders. | Large orders qualify for a special discount. | 대량 주문은 특별 할인 대상입니다. | 단어장 v067 'We offer a 10 percent discount.'와 문장 틀이 같음 |
| d23 | The elevator is temporarily out of service. | The east entrance is temporarily closed for repairs. | 동쪽 출입구는 수리 때문에 임시로 폐쇄되었습니다. | 단어장 v498 '... the elevator ... out of service'와 겹침 |
| d24 | Did you receive my email yesterday? | Did you get a chance to read my message? | 제 메시지 읽어 보셨어요? | 단어장 v012 'I received your email yesterday ...'와 겹침 |
| d31 | Please submit your expense report by Friday. | The quarterly sales figures look very promising. | 분기 매출 수치가 매우 좋아 보입니다. | d02와 거의 같고 단어장 v292와도 겹침 |
| d32 | The conference room is booked until three. | The meeting room on the fifth floor is available. | 5층 회의실이 비어 있습니다. | Part 3 p302 'the conference room booking'과 겹침 |
| d33 | I'd like to speak with the sales manager. | I'd like to speak with someone in billing. | 청구 담당자와 통화하고 싶습니다. | 단어장 v158 'I'd like to apply for the position of sales manager.'와 겹침 |
| d34 | Your membership expires at the end of the month. | Your parking permit is valid until December. | 주차권은 12월까지 유효합니다. | 단어장 v069 'Your membership expires next month ...'과 문장 틀이 같음 |
| d37 | Can you send me the updated schedule? | Can you share the updated schedule with the team? | 수정된 일정을 팀과 공유해 주시겠어요? | 독해 rp25 'Could you send me an updated confirmation?'과 문장 틀이 같음 |
| d38 | The contract must be signed before Friday. | The contract needs a signature from each partner. | 계약서에는 파트너 각자의 서명이 필요합니다. | Part 3 p306 '... the contract ... before Friday'와 겹침 |
| d39 | Our office will be closed on national holidays. | The museum is closed on Mondays. | 박물관은 월요일에 문을 닫습니다. | d07 'The office is closed on weekends.'와 겹침 |
| d42 | Please keep your receipt for the warranty. | Your receipt is needed for warranty repairs. | 보증 수리를 받으려면 영수증이 필요합니다. | 단어장 v081 'Please keep your receipt ...'과 문장 틀이 같음 |

남겨 둔 겹침: d18 'Our new branch opens next Monday.'와 독해 rp14(new, next Monday), d25 'He transferred to the Seoul office last year.'와 단어장 v048(office, last year). 흔한 시간 표현만 겹쳐서 그대로 뒀다.

## C. Part 2 복수정답

45문항의 오답 90개를 질문에 대한 응답으로 성립하는지 하나씩 봤다. 평서문·부가의문문·선택의문문은 생략 응답('(그건) 책상 위에 있어요')까지 넣어 봤다.

| id | 질문 | 전 | 후 | 이유 |
|---|---|---|---|---|
| p209 | Which room is the training in? | (A) Room 302. | Room three-oh-two. | TTS: Zira가 'Room 302'를 three hundred and two로 읽었다. 방 번호는 three-oh-two로 읽는다 |
| p215 | Why is the office closed today? | (B) It's a public holiday. | It's a national holiday. | 영국식: public holiday → 미국식 national holiday |
| p218 | Have you met the new manager? | (B) In the meeting room. | I'll manage it myself. | 복수정답: (B) In the meeting room은 '(회의실에서 만났어요)'라는 생략 응답으로 성립했다 |
| p222 | The printer is out of paper. | (C) On the desk. | I read the paper this morning. | 복수정답: (C) On the desk는 '(종이는) 책상 위에 있어요'라는 해결 응답으로 성립했다 |
| p229 | Did the client approve the design? | (B) In the email. | The client list is quite long. | 복수정답: (B) In the email은 '(이메일로 승인했어요)'라는 생략 응답으로 읽힐 수 있었다 |
| p241 | Should I send the invoice by e-mail or by post? | 질문 Should I send the invoice by e-mail or by post? | Should I send the invoice by e-mail or by regular mail? | 영국식: by post → by regular mail. 복수정답: (C) Yes, I sent it already는 Yes만 빼면 '이미 보냈다'는 간접 응답이 된다 |
| p241 | Should I send the invoice by e-mail or by post? | (C) Yes, I sent it already. | I mailed the package yesterday. | 영국식: by post → by regular mail. 복수정답: (C) Yes, I sent it already는 Yes만 빼면 '이미 보냈다'는 간접 응답이 된다 |

정답 쪽이 의심되는 문항은 없다.

## D. 오답 함정 유형

실제 토익 Part 2 오답의 세 유형(유사 발음·연상 어휘·같은 단어 반복)에 두 가지를 더해 분류했다. 의문사 혼동(Where에 시각으로 답하기)과 Yes/No 불가(의문사·선택의문문에 Yes로 답하기)는 세 유형에 들지 않지만 토익 교재가 함정으로 다루는 것이라 따로 셌다. 오답 하나가 두 유형에 걸치면 더 두드러진 쪽으로 셌다.

| 유형 | 개수 |
|---|---|
| 유사 발음 | 2 |
| 연상 어휘 | 43 |
| 같은 단어 반복 | 14 |
| 의문사 혼동 | 19 |
| Yes/No 불가 | 9 |
| 어디에도 안 듦 | 3 |
| 합계 | 90 |

질문 유형별

| 질문 유형 | 문항 | 유사 발음 | 연상 | 반복 | 의문사 혼동 | Yes/No 불가 | 엉뚱 |
|---|---|---|---|---|---|---|---|
| 의문사 의문문 | 22 | 1 | 18 | 3 | 15 | 7 | 0 |
| 일반(Yes/No) 의문문 | 5 | 0 | 6 | 2 | 0 | 0 | 2 |
| 부정·부가 의문문 | 2 | 1 | 2 | 0 | 0 | 0 | 1 |
| 선택의문문 | 3 | 0 | 3 | 1 | 0 | 2 | 0 |
| 제안·요청 | 7 | 0 | 8 | 3 | 3 | 0 | 0 |
| 평서문 | 4 | 0 | 3 | 5 | 0 | 0 | 0 |
| 간접 의문문 | 2 | 0 | 3 | 0 | 1 | 0 | 0 |

어디에도 안 드는 오답 (고치지 않음)

| id | 질문 | 오답 | 바꿀 후보 |
|---|---|---|---|
| p208 | Did you send the invoice? | (A) To the airport. | (A) I sent you a text. (send 반복) |
| p236 | Have you signed the contract yet? | (C) Yes, the printer is out of paper. | (C) I signed up for the class. (sign 반복) |
| p242 | You've met our new director, haven't you? | (B) It starts at eight. | (B) The meeting room is new. (new 반복) |

## E. 질문 유형 분포 (고치지 않음)

실제 토익 비율은 공개된 공식 수치가 아니라 기출 분석에서 흔히 보이는 대략적인 경향이다.

| 유형 | 이 앱 (45) | 비율 | 실제 토익 25문항 기준 대략 |
|---|---|---|---|
| 의문사 의문문 | 22 | 49% | 10개 안팎 (40% 안팎) |
| 일반(Yes/No) 의문문 | 5 | 11% | 3개 안팎 |
| 부정·부가 의문문 | 2 | 4% | 3개 안팎 |
| 선택의문문 | 3 | 7% | 2개 안팎 |
| 제안·요청 | 7 | 16% | 3개 안팎 |
| 평서문 | 4 | 9% | 3개 또는 4개 |
| 간접 의문문 | 2 | 4% | 1개 안팎 |

- 의문사 의문문이 49%로 조금 많고, 부정·부가 의문문(4%)과 평서문(9%)이 적다. 실제 시험은 둘 다 문항의 10% 이상이고, 간접 응답이 정답인 고난도 문항이 많다.

## F. 해설

- 45개 모두 다시 썼다. 정답이 왜 자연스러운지, 오답 두 개가 각각 어떤 함정인지(유사 발음·연상 어휘·같은 단어 반복·의문사 혼동·Yes/No 불가)를 적었다.
- 원래 해설 중 오답 두 개를 모두 설명한 것은 p232 하나였다. 오답을 하나라도 언급한 것은 16개였고, 나머지는 정답 이유만 있었다.

| id | 전 | 후 |
|---|---|---|
| p201 | Where(장소)로 물었으므로 장소로 답한다. 의문사 의문문에는 Yes/No로 답하지 않는다. | Where(장소)로 물었으므로 장소인 '책상 위'가 답이다. 오답: (B) Yes, I did는 의문사 의문문에 Yes로 답했고 질문의 did를 반복했다(같은 단어 반복). (C) At three o'clock은 When에 대한 답이다(의문사 혼동). |
| p202 | When(시간)으로 물었으므로 시각으로 답한다. On Main Street는 Where에 대한 답이다. | When(시간)이므로 시각 At nine이 답이다. 오답: (A) On Main Street는 store에서 떠올린 가게 위치라 연상 어휘이고 Where의 답이다. (C) Yes, it is는 의문사 의문문에 Yes로 답했다. |
| p203 | Who(사람)로 물었으므로 사람으로 답한다. | Who(사람)이므로 Ms. Kim is가 답이다. 오답: (A) Next Monday는 When의 답, (B) In the office는 Where의 답이다(의문사 혼동). |
| p204 | Would you like ~?는 권유 표현이다. 수락 또는 거절로 답한다. | Would you like ~?는 권유다. No, thanks로 정중히 거절했다. 오답: (B) It's over there는 coffee에서 떠올린 위치라 연상 어휘다. (C) About an hour는 How long의 답이라 권유와 관계가 없다(의문사 혼동). |
| p205 | How long(소요 시간)으로 물었으므로 기간으로 답한다. | How long(소요 시간)이므로 About four hours가 답이다. 오답: (A) At gate 12는 flight에서 떠올린 탑승구라 연상 어휘다. (C) Yes, it's long은 의문사 의문문에 Yes로 답했고 long을 반복했다(같은 단어 반복). |
| p206 | Why(이유)로 물었으므로 이유로 답한다. Because로 시작하지 않아도 된다. | Why(이유)이므로 부장님이 아프다는 이유가 답이다. 오답: (A) In the conference room은 meeting에서 떠올린 장소라 연상 어휘다. (B) Yes, it was는 Why에 Yes로 답했다. |
| p207 | Could you ~?는 요청 표현이다. 수락 또는 거절로 답한다. | Could you ~?는 요청이다. Sure, no problem으로 수락했다. 오답: (B) It's on the shelf는 report가 있는 곳이라 연상 어휘다. (C) Last Friday는 When의 답이다(의문사 혼동). |
| p208 | Did 의문문이므로 Yes/No로 답할 수 있다. 시점을 덧붙이면 자연스럽다. | Did 의문문이라 Yes로 답하고 보낸 시점을 덧붙였다. 오답: (A) To the airport는 청구서와 관계없는 행선지다. (C) It's very expensive는 invoice에서 떠올린 금액이라 연상 어휘다. |
| p209 | Which room(장소)으로 물었으므로 방 번호로 답한다. | Which room이므로 방 번호가 답이다. 오답: (B) At two o'clock은 training 시각이라 When의 답이다(의문사 혼동). (C) Mr. Lee is는 Who의 답이다(의문사 혼동). |
| p210 | 평서문으로 문제 상황을 알리면 해결책을 제시하는 답이 자연스럽다. Part 2의 고난도 유형이다. | 평서문으로 고장을 알렸으므로 기사를 부르겠다는 해결책이 답이다. 오답: (A) Yes, I printed it은 printer와 printed가 겹친다(같은 단어 반복). (B) On the second floor는 프린터 위치라 연상 어휘다. |
| p211 | Where(장소)로 물었으므로 장소로 답한다. | Where(장소)이므로 2층이 답이다. 오답: (B) Yes, it works는 의문사 의문문에 Yes로 답했다. (C) At four o'clock은 When의 답이다(의문사 혼동). |
| p212 | When(시간)으로 물었으므로 날짜로 답한다. | When이므로 요일 On Thursday가 답이다. 오답: (A) In the warehouse는 shipment에서 떠올린 장소, (C) By truck은 배송 수단이라 둘 다 연상 어휘다. |
| p213 | Who(사람)로 물었으므로 사람 이름으로 답한다. | Who이므로 회계부 첸 씨가 답이다. 오답: (A) Next week는 When의 답이다(의문사 혼동). (B) It was expensive는 invoice에서 떠올린 금액이라 연상 어휘다. |
| p214 | How(방법)로 물었으므로 교통수단으로 답한다. | How(방법)이므로 셔틀을 타라는 교통수단이 답이다. 오답: (B) Yes, it's far는 의문사 의문문에 Yes로 답했다. (C) About fifty dollars는 공항 가는 요금을 떠올린 연상 어휘이고 How much의 답이다. |
| p215 | Why(이유)로 물었으므로 이유로 답한다. | Why이므로 공휴일이라는 이유가 답이다. 오답: (A) On the first floor는 office에서 떠올린 위치라 연상 어휘다. (C) Yes, it is는 Why에 Yes로 답했다. |
| p216 | 권유 표현이므로 수락 또는 거절로 답한다. | 권유에 '이미 먹었다'며 거절한 간접 응답이다. 오답: (A) At the cafeteria는 lunch에서 떠올린 장소라 연상 어휘이고 수락도 거절도 아니다. (C) It was delicious는 lunch에서 떠올린 맛이고 과거 시제라 권유에 맞지 않는다(연상 어휘). |
| p217 | 요청 표현이므로 수락으로 답한다. | 요청에 Sure로 수락하고 보내 달라고 했다. 오답: (B) It's on my desk는 report가 있는 곳이라 연상 어휘다. 보고서를 가진 쪽은 질문자다. (C) Last Monday는 When의 답이다(의문사 혼동). |
| p218 | Have 의문문이므로 경험 여부로 답한다. Not yet은 '아직'이라는 뜻이다. | Have 의문문에 Not yet(아직)으로 답했다. 오답: (B) I'll manage it myself는 manager와 manage가 겹친다(같은 단어 반복). (C) On the third floor는 manager의 사무실 위치를 떠올린 연상 어휘다. |
| p219 | What time(시각)으로 물었으므로 시각으로 답한다. | What time이므로 시각이 답이다. 오답: (A) On Main Street는 store 위치라 연상 어휘다. (B) Every day는 How often의 답이다(의문사 혼동). |
| p220 | Do you know 의문문이지만 실제로는 장소를 묻는 것이다. 장소로 답한다. | Do you know where ~?는 결국 장소를 묻는다. Yes 뒤에 장소를 말했다. 오답: (B) At two o'clock은 meeting 시각이라 When의 답이다(의문사 혼동). (C) With the client는 meeting 상대를 떠올린 연상 어휘다. |
| p221 | 선택 의문문(A or B)에는 둘 중 하나를 고르거나 이유를 답한다. Yes/No로 답하지 않는다. | 선택의문문에 버스가 더 싸다며 하나를 골랐다. 오답: (A) About twenty minutes는 이동 시간을 떠올린 연상 어휘다. (C) Yes, let's go는 선택의문문에 Yes로 답했다. |
| p222 | 문제 상황을 알리는 평서문에는 해결책으로 답한다. | 종이가 떨어졌다는 평서문에 가져오겠다는 해결책이 답이다. 오답: (B) Yes, I printed it은 printer와 printed가 겹친다(같은 단어 반복). (C) I read the paper this morning은 paper(종이)를 신문이라는 다른 뜻으로 반복했다(같은 단어 반복). |
| p223 | How long(기간)으로 물었으므로 since나 for로 답한다. | How long(기간)이므로 Since 2021이 답이다. 오답: (A) In the sales team은 '어디서 일하나'에 대한 답이라 연상 어휘다. (C) Forty hours a week는 worked에서 떠올린 근무 시간이라 연상 어휘다. |
| p224 | 부정 의문문도 일반 의문문처럼 답한다. 사실이 아니면 No로 답하고 바로잡는다. | 부정 의문문이다. 사실이 아니라 No로 답하고 목요일로 바로잡았다. 오답: (B) In the folder는 deadline 관련 서류를 떠올린 연상 어휘다. (C) Yes, I finished는 일을 끝냈다는 말이라 마감일을 확인해 주지 않는다(연상 어휘). |
| p225 | Where(장소)로 물었으므로 장소로 답한다. | Where이므로 캐비닛 안이 답이다. 오답: (A) This morning은 When의 답이다(의문사 혼동). (C) Ten boxes는 samples의 수량을 떠올린 연상 어휘다. |
| p226 | 허락을 구하는 질문이므로 수락 또는 거절로 답한다. | 허락을 구하는 질문에 Of course로 허락했다. 오답: (A) It's twenty dollars는 pay에서 떠올린 금액이라 연상 어휘다. (C) Yes, I paid already는 pay를 반복했고, 점원이 손님에게 할 말이 아니다(같은 단어 반복). |
| p227 | Why don't we ~?는 이유가 아니라 제안이다. 수락 또는 거절로 답한다. 토익 빈출 함정이다. | Why don't we ~?는 이유가 아니라 제안이다. That works for me로 동의했다. 오답: (B) On the phone은 call에서 떠올린 연상 어휘다. (C) He called twice는 call을 반복했다(같은 단어 반복). |
| p228 | Who(사람)로 물었으므로 사람으로 답한다. | Who이므로 박 씨가 답이다. 오답: (A) In the main hall은 Where의 답, (B) At ten은 When의 답이다(의문사 혼동). |
| p229 | Did 의문문이므로 Yes/No로 답할 수 있다. 시점을 덧붙이면 자연스럽다. | Did 의문문에 Yes와 시점으로 답했다. 오답: (B) The client list is quite long은 client를 반복했다(같은 단어 반복). (C) It's very modern은 design에서 떠올린 평가라 연상 어휘이고 승인 여부에 답하지 않는다. |
| p230 | How many(수)로 물었으므로 숫자로 답한다. | How many이므로 Around twenty가 답이다. 오답: (A) By train은 How의 답, (C) Next Tuesday는 When의 답이다(의문사 혼동). |
| p231 | Where 의문문에는 Yes/No로 답할 수 없다. (B)는 수량이라 장소와 무관하다. | Where이므로 책상 위 키보드 옆이 답이다. 오답: (A) Yes, I finished it this morning은 의문사 의문문에 Yes로 답했다. (B) About forty copies는 report에서 떠올린 부수라 연상 어휘다. |
| p232 | (A)는 Where에, (C)는 Why에 대한 답이다. | When이므로 9시 30분이 답이다. 오답: (A) In the main auditorium은 Where의 답이다(의문사 혼동). (C) Because the trainer is new는 Why의 답이고 training과 trainer가 겹친다(같은 단어 반복). |
| p233 | take over = 인수하다, 이어받다. 사람을 묻는 질문에 사람 이름으로 답했다. | Who에 사람 이름 Rina로 답했다. take over는 '넘겨받다'다. 오답: (A) In the filing cabinet은 account(거래처 서류)에서 떠올린 장소, (B) It costs about two thousand dollars는 account에서 떠올린 금액이라 둘 다 연상 어휘다. |
| p234 | (A)는 How에 대한 답이다. Why에 Yes/No는 안 된다. | Why에 트럭 고장이라는 이유로 답했다. 오답: (A) By express courier는 shipment에서 떠올린 배송 수단이라 연상 어휘다. (C) Yes, it arrived on Tuesday는 Why에 Yes로 답했다. |
| p235 | How long은 기간을 묻는다. (A)는 장소다. | How long에 6주로 답했다. 오답: (A) On the second floor는 공사 장소, (B) The architect designed it은 renovation에서 떠올린 사람이라 둘 다 연상 어휘다. |
| p236 | Not until ~ = ~하기 전에는 아니다. 아직 안 했다는 뜻의 자연스러운 응답이다. (A)는 계약 관련어지만 질문에 답하지 않는다. | Not until ~은 '~하기 전에는 아니다'라 아직 서명하지 않았다는 간접 응답이다. 오답: (A) It's a three-year lease는 contract에서 떠올린 계약 기간이라 연상 어휘다. (C) Yes, the printer is out of paper는 Yes로 시작하지만 뒤 내용이 질문과 관계가 없다. |
| p237 | Yes를 생략하고 바로 조건을 말하는 응답이다. Part 2에 자주 나온다. | Yes를 생략하고 '오후 2시까지만'이라는 조건으로 답했다. 오답: (B) The food is quite good은 cafeteria에서 떠올린 음식 평가, (C) Please leave your tray on the counter는 cafeteria에서 떠올린 안내라 둘 다 연상 어휘다. |
| p238 | 평서문으로 문제를 말하면 해결책을 제안하는 응답이 정답이 되는 경우가 많다. (A)는 supply라는 같은 단어를 쓴 함정이다. | 열쇠를 못 찾겠다는 평서문에 안내 데스크에 물어보라는 해결책이 답이다. 오답: (A) The supplies arrived on Monday는 supply를 반복했다(같은 단어 반복). (B) About twenty boxes of paper는 supply closet에서 떠올린 비품이라 연상 어휘다. |
| p239 | jam = (종이가) 걸리다, clear the jam = 걸린 종이를 빼다. 종이 걸림이라는 구체적인 문제에 맞춰 직접 조치해 보겠다고 제안하는 응답이 정답이다. | 종이가 걸린다는 평서문에 직접 빼 보겠다는 조치가 답이다. clear the jam = 걸린 종이를 빼다. 오답: (A) In black and white, please는 printer에서 떠올린 인쇄 설정이라 연상 어휘다. (C) Yes, I printed two copies는 printer와 printed가 겹친다(같은 단어 반복). |
| p240 | 둘 중 하나를 고르는 질문에는 Yes/No로 답할 수 없다. 가장 잘 나오는 함정이다. | 선택의문문에 목요일을 골랐다. 오답: (B) Yes, that works for me는 선택의문문에 Yes로 답했다. (C) In the small conference room은 meet에서 떠올린 장소라 연상 어휘다. |
| p241 | 선택의문문이라 Yes는 안 된다. (B)는 금액이라 방법과 무관하다. | 선택의문문에 이메일이 더 빠르다며 하나를 골랐다. 오답: (B) It was three hundred dollars는 invoice에서 떠올린 금액이라 연상 어휘다. (C) I mailed the package yesterday는 mail을 반복했고 청구서를 보낼 방법을 고르지 않았다(같은 단어 반복). |
| p242 | 부가의문문이다. (A)는 director와 directions의 발음이 비슷한 함정이다. | 부가의문문에 '직원 점심 때 잠깐만'으로 만난 적이 있다고 답했다. 오답: (A) The directions are on the website는 director와 directions의 발음이 비슷하다(유사 발음). (B) It starts at eight는 질문과 관계가 없다. |
| p243 | walk in = 예약 없이 가다. (C)는 본인 습관일 뿐 질문에 답하지 않는다. | 예약이 필요한지 묻는 간접 의문문에 '그냥 가도 된다'로 답했다. walk in = 예약 없이 가다. 오답: (B) It's on the third floor는 gym의 위치, (C) Yes, I exercise every morning은 gym에서 떠올린 운동 습관이라 둘 다 연상 어휘이고 예약 여부에 답하지 않는다. |
| p244 | give someone a hand = 도와주다. (B)는 give의 변화형을 쓴 함정이다. | give someone a hand(도와주다)라는 요청에 Sure로 수락하고 어디로 옮기는지 되물었다. 오답: (B) I gave it to the receptionist는 give를 반복했다(같은 단어 반복). (C) About ten kilograms는 boxes에서 떠올린 무게라 연상 어휘다. |
| p245 | (C)는 proposal과 proposed의 발음이 비슷한 함정이다. What에 Yes도 안 된다. | What(어떻게 생각했나)에 몇 가지 수정을 요청했다고 답했다. 오답: (A) At the downtown office는 Where의 답이다(의문사 혼동). (C) Yes, I proposed it은 proposal과 proposed의 발음이 비슷하고(유사 발음) What에 Yes로 답했다. |

# 듣기 감사 2부 — Part 3 42, Part 4 36, Part 1 34 (2026-11-23)

## 0. 지난 판단 반영

### 받아쓰기 채점 (assets/js/listening.js)

| 항목 | 전 | 후 |
|---|---|---|
| 숫자 | three와 3은 다른 단어 | 같다. 숫자를 단어로 바꿔 비교한다: 3 = three, 20 = twenty, 21 = twenty-one, 250 = two hundred fifty, 5th = fifth, 3:30 = three thirty, $50 = fifty |
| 축약형 | I'd와 I would가 다르다 (안내 없음) | 계속 다르게 채점한다. 틀리거나 빠뜨린 단어가 축약형이면 점수 옆에 "'I'd'는 축약형으로 들렸어요. 들린 그대로 적어 보세요."를 보여 준다 |

- 축약형 판정: n't·'d·'m·'re·'ve·'ll, 그리고 it's·that's·there's·here's·he's·she's·what's·who's·where's·let's. 소유격('s, yesterday's)과 o'clock은 축약형이 아니다.
- check-listening에 채점 규칙 테스트를 넣었다. d01은 '3 o'clock', d14는 '20 minutes'(소문자·구두점 없이), d32는 '5th floor'로 입력해 100%가 나오는지 본다. d03은 'I would like ...'로 입력해 안내가 나오는지 본다. 나머지 41문장은 원문 그대로 입력해 100%이고 안내가 없는지 본다.
- 버그 심기(저장소 복사본): 숫자 변환을 끄면 d01·d14·d32가 실패했다. 축약형 안내를 끄면 d03이 실패했다.

### Part 2 해설에 함정 패턴 적기, 엉뚱한 오답 교체

- '의문사 혼동'과 'Yes/No 불가'가 들어간 해설 27개를 '~로 물었는데 ~로 답한 함정이다(의문사 혼동)', '~로 물었는데 Yes로 답한 함정이다(Yes/No 불가)'처럼 패턴이 보이게 고쳤다.

| id | 오답 | 전 | 후 | 유형 |
|---|---|---|---|---|
| p208 | (A) | To the airport. | The voice was clear. | 유사 발음 (invoice / voice) |
| p236 | (C) | Yes, the printer is out of paper. | I signed up for the class. | 같은 단어 반복 (sign을 '등록하다'로) |
| p242 | (B) | It starts at eight. | The meeting room is new. | 같은 단어 반복 (new) |

- p208은 1부 문서의 후보 'I sent you a text.'를 쓰지 않았다. '(청구서 대신) 문자로 보냈어요'라는 응답으로 성립할 수 있어서다. 유사 발음 오답으로 바꿨다.
- 이제 Part 2 오답 90개 중 '어디에도 안 드는 오답'은 0개다.

## A. 대화·담화 내부 모순

14개 대화와 12개 담화를 모두 봤다. 시각·날짜·인원·금액을 순서대로 따라가며 앞뒤가 맞는지, 화자가 이미 아는 것을 묻지 않는지 확인했다.

| id | 분류 | 전 | 후 | 이유 |
|---|---|---|---|---|
| p303 | TTS | I'm calling about order 3312. | I'm calling about order three three one two. | Zira가 3312를 three thousand three hundred and twelve로 읽었다. 주문 번호는 숫자를 하나씩 읽는다 (p311의 eight two four one과 같은 방식) |
| p309 | 화자 | How far is the next closest one? | Priya, how far is the next closest one? | Q2가 Priya를 묻는데 대화에 이름이 한 번도 나오지 않았다. 여자 둘 중 누가 Priya인지 들어서 알 수 없었다 |
| p309 | 화자 | I would rather keep the team together than lose time coordinating. | I would rather keep the team together than lose time coordinating. Lena, could you book the rooms, since you handled the flights? | Q3가 Lena를 묻는데 대화에 이름이 나오지 않았다 |
| p309 | 화자 | Agreed. I will book all three rooms there this afternoon. | Sure. I will book all three rooms there this afternoon. | 앞 대사가 부탁으로 바뀌어 대답을 맞췄다 |
| p310 | 모순 | I have three candidates for the analyst position, but only Thursday afternoon is free on your calendar. | I have three candidates for the analyst position, and Thursday afternoon is the only long free block on your calendar. | '목요일 오후만 비어 있다'고 했는데 뒤에서 금요일 4시 30분에 면접을 잡는다 |
| p310 | TTS | And please send me their résumés by Wednesday morning so that I have time to read them. | And please send me their applications by Wednesday morning so that I have time to read them. | Zira가 résumés를 동사 resumes(r ih z uw m z, 리줌즈)로 읽었다 |
| p313 | 화자 | That would cut the extra cost by about half, and those are the ones people give away. | Good idea, Fiona. That would cut the extra cost by about half, and those are the ones people give away. | Q2가 Fiona를 묻는데 대화에 이름이 나오지 않았다 |
| p314 | 모순 | Does the hotel shuttle go to the north terminal, or only the south? | My flight leaves from the north terminal. Does the hotel shuttle go there, or only to the south? | 남자가 '남쪽에 먼저 서니 15분 더 잡으라'고 하는데, 여자가 북쪽 터미널을 쓴다는 말이 없었다 |
| pt405 | 모순 | To speak with a librarian, press two; please note that the reference desk is staffed only until six. | To speak with a librarian, press two; please note that the reference desk is staffed only until six, Monday through Thursday. | 금요일·토요일은 5시에 닫는데 참고 데스크가 6시까지 운영한다고 했다 |
| p310 | TTS (보기) | The candidates' résumés | The candidates' applications | 스크립트 수정에 맞춤 |

확인했고 이상이 없는 것

| id | 확인한 내용 |
|---|---|
| p302 | 2시부터 4시까지 → 한 시간 연장 → 5시, 6시까지 비어 있음 |
| p309 | 1부에서 고친 대로 컨퍼런스 호텔이 만실이라 모두 두 번째 호텔에 묵는다 |
| p311 | 1부에서 고친 대로 주문 번호를 다시 확인하지 않는다. 30인분 → 32인분, 내일 아침까지 확정 |
| p312 | 수요일 오후 → 이사회 → 목요일 9시 |
| p313 | 개당 11센트, 연 9만 달러 가까이 → 약 80만 개. 선물용만 바꾸면 절반 |
| pt401 | 오늘 15분 뒤 폐점, 내일 반품 9시부터, 회원은 한 시간 이른 8시 입장 → 개점 9시와 맞다 |
| pt406 | 4차로 중 2차로 폐쇄, 오늘 밤 8시 재개통, 다음 방송 4시 30분 |
| pt411 | 자정부터 토요일 오전까지 비 → 토요일 장 실내로 이동, 9시부터 3시, 판매자 8시 |
| pt412 | 1부에서 고친 대로 4시 30분 방송, 사진전 4시 45분, 박물관 5시, 기념품점 5시 15분 |

## B. 복수정답 · C. 정답 근거

- 78문항의 오답 234개를 스크립트에 비춰 봤다. '다음에 할 일' 문항은 대화에 나온 다른 할 일이 보기에 있는지도 봤다 (p302 Q3은 예약 연장도 하지만 보기에 없다). 고칠 오답은 없었다.
- 정답 쪽이 의심되는 문항은 없다. 경계에 있는 것: p304 Q1의 (C) A delivery is late는 '부품이 목요일에야 온다'와 연결되지만, 질문이 묻는 문제의 중심은 복사기 고장이다.
- 78문항 모두 정답 근거가 스크립트에 있다.

## D. TTS 읽기 (Zira)

Part 3·4 스크립트 전체에서 숫자·약어·하이픈·악센트 문자를 뽑아 Zira로 합성했다. 이번에는 SAPI 미국 영어 음소표(번호 10은 aa, 49는 zh)로 음소를 풀어 읽었다.

| 위치 | 원문 | Zira 음소 | 결과 |
|---|---|---|---|
| p303 | order 3312 | th r iy th aw z ax n d th r iy h ah n d r ih d ae n t w eh l v | 고침 → three three one two |
| p310 | résumés | r ih z uw m z (동사 resumes) | 고침 → applications |
| pt402·pt408 | Dr. Osei / Dr. Leung | d aa k t ax r | 그대로 (doctor) |
| pt406 | Route 9 / number 14 | nine / fourteen | 그대로 |
| 여러 곳 | thirty-two, twenty-four, new-hire, same-day, sign-up, third-floor, e-mail, o'clock | 하이픈 없이 읽음 | 그대로 |
| Part 2 p209 (1부 수정 확인) | Room three-oh-two | r uw m th r iy ow t uw | 의도대로 읽힘 |

## E. 화자

| id | 내용 | 한 일 |
|---|---|---|
| p309 | 여자 둘(Lena·Priya)의 이름이 대화에 한 번도 나오지 않는데 Q2는 Priya, Q3은 Lena를 묻는다. 들어서는 누가 누군지 알 수 없다 | Tomas가 'Priya, how far ...?'로 묻고, Priya가 'Lena, could you book the rooms ...?'로 부탁하게 했다 |
| p313 | 여자 둘(Fiona·Aminata) 중 Q2가 Fiona를 묻는데 이름이 안 나온다 | Aminata가 'Good idea, Fiona.'로 받게 했다 |
| p308 | Hana는 Ravi가 두 번 이름을 부른다. Claudia는 이름이 안 나오지만 Claudia를 묻는 문항이 없다 | 그대로 |

- 같은 성별 화자 이름이 비슷한 경우(Claudia/Hana, Lena/Priya, Fiona/Aminata)는 없다. 문항·해설의 이름과 스크립트의 speakers 표가 모두 같다.

## F. 해설

- Part 3·4 해설 78개를 모두 다시 썼다. 대화는 'N번째 대사(남자/여자 또는 이름)', 담화는 'N번째 문장'과 원문 인용을 적고, 오답마다 안 되는 이유를 적었다.
- 원래 해설은 대부분 원문 한 구절을 옮겨 적은 수준이었다 (p301 Q2 'Do you have the receipt with you?라고 묻는다.').

| id | 문항 | 전 | 후 |
|---|---|---|---|
| p301 | Q1 | 첫 문장에서 I'd like to return this jacket이라고 밝힌다. | 근거: 1번째 대사(여자) I'd like to return this jacket. 오답: 일자리 지원(B)·주문품 수령(C)은 나오지 않고, 너무 작다고 했을 뿐 항의(D)하지 않았다. |
| p301 | Q2 | Do you have the receipt with you?라고 묻는다. | 근거: 2번째 대사(남자) Do you have the receipt with you? 오답: 신용카드(A)·이메일 주소(C)·전화번호(D)는 묻지 않았다. |
| p301 | Q3 | I'd prefer an exchange라고 말한다. | 근거: 5번째 대사(여자) I'd prefer an exchange, if you have a larger size. 오답: 남자가 환불(A)과 교환 중 고르라고 했고 여자는 교환을 골랐다. 할인(B)·배송(D)은 나오지 않는다. |
| p302 | Q1 | I'm calling about the conference room booking이라고 밝힌다. | 근거: 1번째 대사(남자) I'm calling about the conference room booking for Thursday. 오답: 면접(A)·배송 문제(C)·결제(D)는 나오지 않는다. |
| p302 | Q2 | we need it for an extra hour라고 요청한다. | 근거: 3번째 대사(남자) we need it for an extra hour. 2시부터 4시까지를 5시까지로 늘린다. 오답: 방은 그대로 Room B라 다른 방(A)이 아니고, 시작 시각(B)·날짜(D)는 바꾸지 않았다. |
| p302 | Q3 | Could you also arrange for twelve chairs?에 Of course라고 답한다. | 근거: 5번째 대사(남자) Could you also arrange for twelve chairs?에 6번째 대사(여자)가 Of course. I'll have them set up before the meeting이라고 답한다. 오답: 점심(B)·프로젝터(C)·주차(D)는 요청하지 않았다. |
| p303 | Q1 | The tracking says it was delivered, but we never received it. | 근거: 3번째 대사(남자) The tracking says it was delivered, but we never received it. 오답: 새 주문(A)·주소 변경(B)이 아니고, 환불(C)을 요청하지도 않았다. 대체품은 여자가 먼저 제안한다. |
| p303 | Q2 | I'll open an investigation with the carrier today. | 근거: 4번째 대사(여자) I'll open an investigation with the carrier today. 운송 업체에 조사를 요청하는 것을 contact the carrier로 바꿔 표현했다. 오답: 새 물품 발송(A)은 못 찾았을 때의 일이고, 창고 방문(C)·주문 취소(D)는 없다. |
| p303 | Q3 | we'll send a replacement at no charge. at no charge는 무료라는 뜻이다. | 근거: 6번째 대사(여자) If it isn't found, we'll send a replacement at no charge. at no charge를 free로 바꿔 표현했다. 오답: 부분 환불(A)·할인 쿠폰(B)·사과 편지(D)는 제안하지 않았다. |
| p304 | Q1 | is the copier still broken? 복합기가 고장 난 상태다. | 근거: 1번째 대사(여자) is the copier still broken?에 2번째 대사(남자)가 Yes라고 답한다. 오답: 취소된 회의(B)는 없고, 목요일에 오는 것은 수리 부품이라 배송 지연(C)이 문제의 중심이 아니며, 3층 복사기는 쓸 수 있어 사용할 수 없는 방(D)도 아니다. |
| p304 | Q2 | You can use the one on the third floor. | 근거: 4번째 대사(남자) You can use the one on the third floor. 오답: 기사를 다시 부르자(A)·워크숍을 미루자(C)·부수를 줄이자(D)는 말하지 않았다. |
| p304 | Q3 | Could you help me carry the materials up? 에 Sure. I'm free after eleven. | 근거: 5번째 대사(여자) Could you help me carry the materials up?에 6번째 대사(남자)가 Sure. I'm free after eleven이라고 답한다. 오답: 수리(A)는 기사가 하고, 부품(D)은 이미 목요일에 오며, 워크숍(B)에 남자가 간다는 말은 없다. |
| p305 | Q1 | 항공편과 호텔 예약을 논의하고 있다. | 근거: 1번째 대사(여자) Have you booked your flight와 4번째 대사(남자) What about the hotel? 항공편과 호텔을 정한다. 오답: 고객 회의(A)는 출장 이유로만 나오고, 예산 보고서(C)·사무실 이전(D)은 없다. |
| p305 | Q2 | The first meeting is at nine on Monday, so Sunday would be safer. | 근거: 3번째 대사(여자) The first meeting is at nine on Monday, so Sunday would be safer. 오답: 항공료(A)·호텔 만실(B)·날씨(D)는 말하지 않았다. |
| p305 | Q3 | I'll forward the hotel confirmation to you. 호텔 예약 확인서를 보내겠다는 뜻이다. | 근거: 6번째 대사(남자) I'll forward the hotel confirmation to you. 오답: 회의 안건(B)·경비 보고서(C)는 나오지 않고, 항공편은 예약하겠다고만 했을 뿐 일정을 보낸다(D)는 말은 없다. |
| p306 | Q1 | 복사기 임대 계약을 갱신할지 다른 업체로 바꿀지 의논하고 있다. | 근거: 1번째 대사(여자) Do you want to renew it or look at other options?와 6번째 대사(남자) Let's go with it. 복사기 임대 업체를 바꿀지 정한다. 오답: 고치는 방법(A)이 아니라 업체를 정하는 이야기이고, 비품 보관(B)·사무실 이전(D)은 없다. |
| p306 | Q2 | It breaks down almost every week. frequently = 자주. | 근거: 2번째 대사(남자) It breaks down almost every week. almost every week를 frequently로 바꿔 표현했다. 오답: 월 요금은 새 업체가 30달러 더 비싸다는 것이지 오른 것(A)이 아니고, 계약 미서명(C)·수리 업체 폐업(D)은 없다. |
| p306 | Q3 | Could you send me the contract so I can look it over before Friday? | 근거: 6번째 대사(남자) Could you send me the contract so I can look it over before Friday? 오답: 기사 호출(A)·세 업체 비교(B)·회의 연기(C)는 부탁하지 않았다. |
| p307 | Q1 | 반 사이즈가 작아서 교환하려 한다. 환불이 아니라 교환이다. | 근거: 1번째 대사(남자) they're a half size too small과 4번째 대사(여자) That's fine for an exchange. 오답: 손상된 물건(A)이 아니고(not damaged), 세일 문의(C)·온라인 주문 수령(D)도 아니다. |
| p307 | Q2 | I've already worn them outside once, on a short trail. 손상되지 않았다면 교환이 된다는 점으로 이어진다. | 근거: 3번째 대사(남자) I've already worn them outside once, on a short trail. outside를 outdoors로 바꿔 표현했다. 오답: 이 매장에서 샀으므로 온라인(A)이 아니고, 색(B)·세일(D)은 언급이 없다. |
| p307 | Q3 | shipping to the store is free. 기간은 영업일 4일이라 2주가 아니다. | 근거: 6번째 대사(여자) shipping to the store is free. 오답: 보증금(B)·온라인 주문만 가능(D)은 없고, 걸리는 기간은 영업일 4일이라 2주(C)가 아니다. |
| p308 | Q1 | 재무 이사가 그날 비행기로 돌아온다고 했다. | 근거: 1번째 대사(Claudia) The finance director is flying back from Singapore that day. 오답: 예산 미승인(A)·회의실 문제(B)·고객 취소(C)는 나오지 않는다. 회의실은 6번째 대사에서 프로젝터가 생겼다고만 한다. |
| p308 | Q2 | I'm leading the new-hire orientation until eleven. 라비가 'Hana, are you free then?'이라고 물은 데 대한 답이다. | 근거: 2번째 대사(Ravi) Hana, are you free then?에 3번째 대사(Hana)가 Friday morning I'm leading the new-hire orientation until eleven이라고 답한다. 오답: 예산 회의(B)는 금요일 오후 2시로 옮겨지고, 싱가포르(C)는 재무 이사 이야기이며, 장비 설치(D)는 지난주에 끝났다. |
| p308 | Q3 | They installed one last week. 지난번에는 빌려야 했다는 말과 대비된다. | 근거: 5번째 대사(Ravi) Hana, does the conference room have a projector now?에 6번째 대사(Hana)가 It does. They installed one last week라고 답한다. 오답: 크기(A)·사전 예약(C)·도색(D)은 나오지 않는다. last week는 설치한 때다. |
| p309 | Q1 | 항공편은 예약됐고 컨퍼런스 기간에 묵을 호텔을 정하는 대화다. 취소되는 것은 항공편이 아니라 호텔 방(취소분 대기)이다. | 근거: 1번째 대사(Lena) Our flights to Lisbon are booked, but the hotel next to the conference center is full. 이후 어느 호텔에 묵을지 정한다. 오답: 행사 일정 변경(A)은 없고, 항공편은 이미 예약됐으며(B), 호텔 공사(C)는 나오지 않는다. 취소분을 기다리자는 것은 호텔 방 이야기다. |
| p309 | Q2 | I stayed there last year. 만실인 곳은 컨퍼런스 센터 옆 호텔이다. | 근거: 2번째 대사(Tomas)가 Priya, how far is the next closest one?이라고 묻고, 3번째 대사(Priya)가 I stayed there last year라고 답한다. 오답: 비싸다(A)는 말은 없고, 만실(B)인 곳은 컨퍼런스 센터 옆 호텔이며, 트램으로 20분 거리라 더 가깝다(D)는 것도 아니다. |
| p309 | Q3 | I will book all three rooms there this afternoon. | 근거: 6번째 대사(Priya) Lena, could you book the rooms ...?에 7번째 대사(Lena)가 I will book all three rooms there this afternoon이라고 답한다. 오답: 컨퍼런스 센터 연락(B)·항공편 변경(C)·할인 요청(D)은 말하지 않았다. |
| p310 | Q1 | Three interviews in one afternoon is too many. | 근거: 2번째 대사(남자) Three interviews in one afternoon is too many. 오답: 자격(A)·직책 승인(B)은 문제 삼지 않았고, 워크숍(D)은 취소가 아니라 금요일에 있다. |
| p310 | Q2 | On Friday you are at the client workshop until four. 그래서 금요일 면접은 4시 30분으로 잡는다. | 근거: 3번째 대사(여자) On Friday you are at the client workshop until four. 그래서 4번째 대사에서 금요일 면접을 4시 30분으로 잡는다. 오답: 사무실 휴무(A)·여자의 출장(B)·회의실 예약(C)은 나오지 않는다. |
| p310 | Q3 | please send me their résumés by Wednesday morning. | 근거: 6번째 대사(남자) please send me their applications by Wednesday morning. 오답: 수정된 일정(B)·워크숍 안건(C)·채용 제안서(D)는 부탁하지 않았다. 지원자에게 시간을 묻는 것은 여자가 하겠다고 한 일이다. |
| p311 | Q1 | 30인분 주문을 32인분으로 늘릴 수 있는지 묻는다. 취소나 배달 불만이 아니다. | 근거: 3번째 대사(여자) Two more people may join the training, so we might need thirty-two. 30인분을 32인분으로 늘리려 한다. 오답: 취소(A)·배달 불만(B)·환불(C)이 아니다. |
| p311 | Q2 | Tomorrow morning at the latest. 정오는 목요일 배달 시각이다. | 근거: 4번째 대사(남자) Tomorrow morning at the latest. 오답: 정오(B)는 목요일 배달 시각이고, 수요일(C)은 언급이 없으며, 목요일(D)은 배달하는 날이다. |
| p311 | Q3 | I'll mark those boxes with a green label. | 근거: 6번째 대사(남자) I'll mark those boxes with a green label so they're easy to find. 오답: 따로 배달(A)·먼저 준비(B)·추가 요금(C)은 말하지 않았다. |
| p312 | Q1 | Our copier jams on every job longer than ten pages. 서비스 계약은 아직 유효하다. | 근거: 1번째 대사(남자) Our copier jams on every job longer than ten pages. 오답: It's covered by our service contract라 계약 만료(A)가 아니고, 배송(B)·청구서(D)는 나오지 않는다. |
| p312 | Q2 | Fifth Street에서 8월에 Linden Road로 이사했다고 주소를 바로잡는다. | 근거: 2번째 대사(여자) Is this still the Fifth Street office?에 3번째 대사(남자)가 No, we moved in August. We're on Linden Road now라고 답한다. 오답: 전화번호(A)·모델 번호(B)·계약일(C)은 바로잡지 않았다. |
| p312 | Q3 | Thursday at nine works. 수요일 오후는 이사회 때문에 피했다. | 근거: 5번째 대사(남자) Could someone come Thursday morning instead?에 6번째 대사(여자)가 Thursday at nine works라고 답한다. 오답: 수요일 오후(B)는 처음 제안이지만 이사회 때문에 바꿨고, 금요일 9시(C)·다음 주 월요일(D)은 나오지 않는다. |
| p313 | Q1 | 새 포장의 비용과 매장 테스트 결과를 이야기한다. 비용이 늘어나는 것은 회사 쪽이지 고객 가격이 아니다. | 근거: 1번째 대사(Dae-ho) The new packaging tested well, but it costs eleven cents more per unit. 새 포장의 비용과 효과를 따진다. 오답: 배송(A)·매장 개점(C)은 없고, 비용이 오르는 쪽은 회사라 고객 가격 인상(D)이 아니다. |
| p313 | Q2 | use the new design only for the gift sizes. | 근거: 5번째 대사(Fiona) Could we use the new design only for the gift sizes?에 6번째 대사(Aminata)가 Good idea, Fiona라고 받는다. 오답: 새 디자인을 버리자(A)·가격 인상(B)·두 번째 매장 시험(C)은 제안하지 않았다. |
| p313 | Q3 | Let's model both options and bring numbers to the Friday meeting. | 근거: 7번째 대사(Dae-ho) Let's model both options and bring numbers to the Friday meeting. model과 bring numbers를 prepare cost estimates로 바꿔 표현했다. 오답: 매장 방문(A)·상자 주문(B)·고객 면담(D)은 말하지 않았다. |
| p314 | Q1 | Which shuttle should I take? 7시 40분은 탑승 시각이지 도착 시각이 아니다. | 근거: 3번째 대사(여자) Which shuttle should I take? 오답: 요금(A)·체크인 장소(B)는 묻지 않았고, 7시 40분은 탑승 시각이지 도착 시각(C)이 아니다. |
| p314 | Q2 | The six o'clock cuts it close if traffic is bad. | 근거: 4번째 대사(남자) The six o'clock cuts it close if traffic is bad. cut it close는 '시간이 빠듯하다'다. 오답: 만석(B)·주말 미운행(D)은 말하지 않았고, 셔틀은 두 터미널 모두 가므로 북쪽 터미널만(C)도 아니다. |
| p314 | Q3 | Just tell the front desk tonight. 신청서는 따로 없다. | 근거: 6번째 대사(남자) Just tell the front desk tonight. 오답: 탑승권 인쇄(A)·기사에게 요금 지불(B)·항공사 전화(C)는 나오지 않는다. 신청서는 따로 없다. |
| pt401 | Q1 | 계산대, 반품·교환, 코트와 부츠 세일로 보아 매장이다. | 근거: 2번째 문장 checkout counters, 3번째 문장 returns and exchanges, 4번째 문장 sixty percent off coats and boots. 옷과 신발을 파는 매장이다. 오답: 공항(A)·도서관(B)·은행(C)에는 계산대·반품·의류 세일이 없다. |
| pt401 | Q2 | Tomorrow we begin our winter clearance. 일찍 닫는 것은 오늘 저녁의 안내가 아니라 평소 폐점이다. | 근거: 4번째 문장 Tomorrow we begin our winter clearance. clearance(재고 정리 세일)를 sale로 바꿔 표현했다. 오답: 15분 뒤 문을 닫는 것은 오늘 이야기라 일찍 닫는다(B)가 아니고, 새 지점(C)·서비스 데스크 이전(D)은 없다. |
| pt401 | Q3 | may enter one hour early, at eight. | 근거: 5번째 문장 Members of our rewards program may enter one hour early, at eight. 오답: 무료 주차(A)·반품 기간 연장(B)·추가 할인(D)은 나오지 않는다. |
| pt402 | Q1 | 목요일 오후 예약을 다른 시간으로 옮기려 한다. 취소가 아니다. | 근거: 2번째 문장 I'm calling about your appointment on Thursday와 4번째 문장 We can move you to Thursday morning at nine thirty, or to the same time on Monday. 오답: 결제 확인(A)·전문의 추천(C)은 없고, 다른 시간으로 옮기자는 것이라 취소(D)가 아니다. |
| pt402 | Q2 | Dr. Osei will be out of the office that afternoon. 그날 오후만 자리를 비우므로 일주일 휴무가 아니다. | 근거: 3번째 문장 Dr. Osei will be out of the office that afternoon. 오답: 그날 오후만 비우므로 일주일 휴무(A)가 아니고, 파일 분실(B)·기계 고장(C)은 없다. |
| pt402 | Q3 | please call us back ... before five today. | 근거: 5번째 문장 please call us back ... before five today. 오답: 한 시간 일찍 오기(B)·이메일(C)·다른 병원(D)은 요청하지 않았다. |
| pt403 | Q1 | 첫 문장의 gym과 Eastgate Fitness로 보아 헬스장이다. 주차장과 도서관은 위치·혜택 설명에 나올 뿐이다. | 근거: 1번째 문장 Looking for a gym ...?과 2번째 문장 Eastgate Fitness opens. 오답: 주차장(A)은 옆 건물로, 도서관(B)은 건너편 위치로만 나오고, 운동용품 매장(D)은 없다. |
| pt403 | Q2 | only if you sign up during the first week. | 근거: 3번째 문장 only if you sign up during the first week. 오답: 친구 동반(A)·1년 결제(C)·무료 수업(D)은 조건이 아니다. |
| pt403 | Q3 | Every membership includes two sessions with a personal trainer. 무료 주차도 포함되지만 선택지에 없다. | 근거: 4번째 문장 Every membership includes two sessions with a personal trainer and free parking. 오답: 식사(A)·사물함(B)·도서관 할인(C)은 없다. 무료 주차도 포함되지만 보기에 없다. |
| pt404 | Q1 | paper mill, machine floor, raw materials로 보아 공장이다. | 근거: 1번째 문장 welcome to the Rowan Paper Mill, 3번째 문장 the machine floor is loud, 7번째 문장 raw materials. 종이를 만드는 공장이다. 오답: 박물관(B)·건설 현장(C)이 아니고, 종이를 만드는 곳이지 인쇄소(D)가 아니다. |
| pt404 | Q2 | put on the safety glasses and earplugs. | 근거: 3번째 문장 put on the safety glasses and earplugs. 보안경과 귀마개를 protective gear로 바꿔 표현했다. 오답: 가방 맡기기(A)·서류 서명(B)·표 구입(D)은 요청하지 않았다. |
| pt404 | Q3 | Photography is allowed everywhere except the drying room. | 근거: 5번째 문장 Photography is allowed everywhere except the drying room. 오답: 음식(A)·대화(C)·기계 만지기(D)는 금지 사항으로 나오지 않는다. |
| pt405 | Q1 | Our hours have recently changed. 주차는 안내 번호만 있고 요금 이야기는 없다. | 근거: 2번째 문장 Our hours have recently changed. 오답: 주차는 3번 안내로만 나오고 요금(A)이 바뀌었다는 말은 없으며, 전화번호(B)·주소(D)도 바뀌지 않았다. |
| pt405 | Q2 | the reference desk is staffed only until six. 8시는 월~목 폐관 시각, 5시는 금·토 폐관 시각, 10시는 여는 시각이다. | 근거: 6번째 문장 the reference desk is staffed only until six, Monday through Thursday. 오답: 5시(A)는 금·토 폐관 시각, 8시(C)는 월요일부터 목요일까지의 폐관 시각, 10시(D)는 여는 시각이다. |
| pt405 | Q3 | To renew a book, press one. 2번은 사서 연결, 3번은 길·주차 안내, 별표는 다시 듣기다. | 근거: 5번째 문장 To renew a book, press one. 오답: 2번(B)은 사서 연결, 3번(C)은 길·주차 안내, 별표(D)는 다시 듣기다. |
| pt406 | Q1 | Construction on the Weston Bridge has closed two of the four lanes. | 근거: 2번째 문장 Construction on the Weston Bridge has closed two of the four lanes. 오답: 사고(A)·날씨(B)·행사(C)는 나오지 않는다. |
| pt406 | Q2 | take the Route 9 tunnel instead. 8시는 차로가 다시 열리는 예상 시각일 뿐 기다리라고 권하지 않았다. | 근거: 4번째 문장 take the Route 9 tunnel instead. 오답: 조기 퇴근(A)은 없고, 버스는 오히려 늘렸으며(B), 8시는 차로가 다시 열리는 예상 시각일 뿐 기다리라고(D) 하지 않았다. |
| pt406 | Q3 | We will have another update at four thirty. 다리는 8시에 열리고, 추가 버스는 이번 주 내내 이미 운행 중이다. | 근거: 6번째 문장 We will have another update at four thirty. 오답: 다리는 8시에 열릴 예정이고(A), 추가 버스는 이번 주에 이미 운행 중이며(C), 공사는 이미 진행 중이다(D). |
| pt407 | Q1 | go over the results from last quarter. 온라인·매장 매출 결과를 이야기한다. | 근거: 1번째 문장 I want to go over the results from last quarter와 2번째·3번째 문장의 온라인·매장 매출. 오답: 신제품(A)·채용(B)·매장 보수(C)는 나오지 않는다. |
| pt407 | Q2 | lost money for the second quarter in a row. 두 분기 연속, 즉 두 번 연속 손실이다. | 근거: 3번째 문장 three of our smaller locations lost money for the second quarter in a row. 오답: 최근 개점(B)·이전(C)은 없고, 오른 것은 온라인 매출이라 그 매장들의 온라인 매출(D)과 관계가 없다. |
| pt407 | Q3 | I will send a written summary this afternoon. 폐점 여부는 이달 말에 경영진이 정한다. | 근거: 5번째 문장 I will send a written summary this afternoon. 오답: 매장 방문(A)은 없고, 경영진(B)은 이달 말까지 결정할 쪽이며, 폐점 날짜(D)는 아직 정하지 않았다. |
| pt408 | Q1 | joined our research center as a junior scientist, and she now leads the water quality division. 40개 도시는 센서를 쓰는 곳이다. | 근거: 2번째 문장 Dr. Amara Leung joined our research center ... as a junior scientist, and she now leads the water quality division. 오답: 시 공무원(A)은 센서를 쓰는 40개 도시에서 떠올린 함정이고, 기자(B)·대학 총장(C)은 나오지 않는다. |
| pt408 | Q2 | receives the Hadley Medal for the second time. 이번이 두 번째 수상이다. | 근거: 4번째 문장 Tonight she receives the Hadley Medal for the second time. 오답: 신진 연구자 전용(B)·상금(C)·올해 제정(D)은 나오지 않는다. |
| pt408 | Q3 | we will take questions afterward. | 근거: 5번째 문장 Dr. Leung will speak for about fifteen minutes, and we will take questions afterward. 오답: 견학(A)·만찬(C)·두 번째 시상(D)은 없다. 두 번째인 것은 그녀의 수상 횟수다. |
| pt409 | Q1 | it will build a new plant in Marsden. 기존 공장 두 곳은 이미 운영 중이라고만 했다. | 근거: 1번째 문장 it will build a new plant in Marsden. 오답: 경영진 교체(A)는 없고, 기존 공장 두 곳은 운영 중이라고 했으며(B), 시와의 제휴(D)도 없다. 시장은 결정을 반겼을 뿐이다. |
| pt409 | Q2 | its first to run entirely on solar power. 공사는 2년 안에 끝나므로 1년 안에 여는 것이 아니다. | 근거: 2번째 문장 this will be its first to run entirely on solar power. 오답: 가장 크다(B)·신제품(D)은 말하지 않았고, 공사가 3월부터 2년 안에 끝나므로 1년 안 개장(C)이 아니다. |
| pt409 | Q3 | hiring will start next winter. 3월은 공사 시작 시점이다. | 근거: 5번째 문장 Castellan says hiring will start next winter. 오답: 3월(A)은 공사 시작, 2년 안(B)은 공사 완료 시기이고, 바로(C)라는 말은 없다. |
| pt410 | Q1 | Welcome to your first day at Varden Group. 급여·복리후생·사원증을 안내받는 첫 출근자다. | 근거: 1번째 문장 Welcome to your first day at Varden Group. 오답: 고객(A)·건물 점검원(C)은 급여·복리후생 안내를 받지 않고, 이미 입사했으므로 지원자(D)도 아니다. |
| pt410 | Q2 | each of you will be given a laptop. 사진 배지는 점심 전에 나온다. | 근거: 4번째 문장 After lunch you will meet your team leaders, and each of you will be given a laptop. 오답: 사진 사원증(A)은 점심 전에 나오고, 주차권(B)·책자(C)는 나오지 않는다. |
| pt410 | Q3 | the online safety course must be completed within your first two weeks. 보안 시스템은 오늘 오전에 설명하는 내용이다. | 근거: 5번째 문장 the online safety course must be completed within your first two weeks. 오답: 성과 평가(B)·팀 과제(C)는 없고, 보안 시스템(D)은 오늘 오전에 설명하는 내용이다. |
| pt411 | Q1 | Because of that(비 예보), 공원에서 주민회관으로 옮겼다. 운영 시간은 평소와 같다. | 근거: 1번째 문장 Rain will move into the area after midnight와 2번째 문장 Because of that, Saturday's Riverside Craft Market has been moved. 오답: 공원 보수(A)·판매자 증가(C)는 없고, 운영 시간은 3번째 문장에서 평소와 같다(D). |
| pt411 | Q2 | Vendors should arrive by eight. 9시와 3시는 시장 운영 시간, 자정은 비가 시작되는 시각이다. | 근거: 4번째 문장 Vendors should arrive by eight to set up indoors. 오답: 9시(A)·3시(B)는 장이 열리는 시간, 자정(D)은 비가 오기 시작하는 때다. |
| pt411 | Q3 | the hall has only twelve parking spaces, so the lot will fill early. | 근거: 5번째 문장 the hall has only twelve parking spaces, so the lot will fill early. 오답: 무료(B)·판매자 전용(C)·길 건너편(D)이라는 말은 없다. |
| pt412 | Q1 | The third-floor photography exhibit closes first, in fifteen minutes. 박물관은 30분 뒤, 기념품점은 5시 15분까지다. | 근거: 2번째 문장 The third-floor photography exhibit closes first, in fifteen minutes. 오답: 기념품점(A)은 5시 15분까지, 박물관 출입구(B)는 5시에 닫고, 유리 전시(C)는 아직 열지 않았다. |
| pt412 | Q2 | for anyone who would like a catalog of the exhibit. | 근거: 3번째 문장 Our gift shop stays open until five fifteen for anyone who would like a catalog of the exhibit. 오답: 회원권(A)·사진(C)·도시 안내서(D)를 판다는 말은 없다. |
| pt412 | Q3 | members can see the new glass collection ... one day before it opens to the public. 무료인 것은 사전 관람 티켓이다. | 근거: 4번째 문장 members can see the new glass collection on the thirteenth, one day before it opens to the public. 오답: 티켓 할인(A)이 아니라 사전 관람 티켓이 무료이고, 무료 카탈로그(B)·가이드 투어(D)는 없다. |

## G. Part 1 34문항

- 오답 102개는 모두 전형적인 함정이다. 사진에 없는 동작(painting a wall), 사진에 있는 사물의 다른 동작(closing the curtains — 커튼은 있다), 사람이 없는데 진행형 수동태(is being hung), 이미 된 상태를 동작으로(putting on a hat — 모자는 쓰고 있다), 상태 반대(empty, folded up, rolled up)가 그 예다.
- 사진에 비춰 성립하는 오답은 없었다. 위험해 보인 ph04(사람 사진인데 정답이 사물)와 ph22('선반이 책으로 가득')는 사진을 다시 보고 확인했다.
- 해설에 사진의 어디를 보면 되는지가 빠진 4문항은 사진을 보고 위치를 보강했다.

| id | 전 | 후 |
|---|---|---|
| ph03 | 두 사람이 함께 서류를 들여다보고 있어 정답이에요. 길을 건너거나 차 문을 열거나 벤치에 앉아 있지 않아요. | 남자가 펼쳐 든 서류철을 두 사람이 함께 들여다보고 있어 정답이에요(looking at some papers). 두 사람은 보도에 서 있어 길을 건너거나(crossing) 벤치에 앉아 있지 않고, 차 문을 여는 사람도 없어요. |
| ph08 | 여자가 책상에서 일하고 있어 정답이에요. 앉아 있으니 창가에 서 있는 게 아니고, 서류를 건네거나 화분에 물을 주지도 않아요. | 여자가 책상 앞 의자에 앉아 노트북과 마우스로 일하고 있어 정답이에요(working at a desk). 앉아 있으니 창가에 서 있는 게 아니고, 서류를 건네거나 화분에 물을 주지도 않아요. 화분은 노트북 뒤에 놓여 있을 뿐이에요. |
| ph19 | 사람들이 출입구를 지나가려고 기다리고 있어 정답이에요. 버스에 타는 장면이 아니고, 줄지어 앉은 승객도, 문을 여는 남자도 없어요. | 가운데 출입구(EXIT 표지 옆) 앞에 사람들이 줄지어 서서 지나가기를 기다리고 있어 정답이에요. 버스는 보이지 않고, 모두 서 있어 줄지어 앉은 승객도 없으며, 문은 이미 열려 있어 문을 여는 남자도 없어요. |
| ph20 | 몇 사람이 휴대폰을 보고 있어 정답이에요. 가게에 들어가거나 가방을 건네는 동작이 없고, 야외 테이블에 앉아 있지도 않아요. | 가게 앞 보도에서 몇 사람이 휴대폰을 보고 있어 정답이에요. 가게로 들어가는 사람이 없고, 가방은 창턱에 놓여 있어 건네는 동작이 없으며, 한 명은 창턱에 걸터앉아 있을 뿐 야외 테이블은 없어요. |

## H. 구성 확인 (고치지 않음)

| 항목 | 실제 토익 (대략) | 이 앱 |
|---|---|---|
| 의도 파악 (What does the man mean when he says ...?) | Part 3에 2문항, Part 4에 3문항 정도 | **0** |
| 시각 정보 연계 (도표·일정표·지도) | Part 3에 3문항, Part 4에 2문항 정도 | **0** |

| 유형 | Part 3 (42) | Part 4 (36) |
|---|---|---|
| 주제·목적 | 10 (24%) | 4 (11%) |
| 세부사항 | 24 (57%) | 27 (75%) |
| 추론 | 0 (0%) | 3 (8%) |
| 다음 할 일 | 8 (19%) | 2 (6%) |
| 의도 파악 | 0 (0%) | 0 (0%) |

- 분류: 'most likely where/who'는 추론, 'What will ... do / What will happen'은 다음 할 일, 'Why is ... calling / mainly discussing / What is the problem'은 주제·목적에 넣었다.
