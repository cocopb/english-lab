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
