# 보카 정확도 감사 — Day 1\~8 (2026-11-20)

범위: 토익 Day 1\~8 240단어의 빈칸 시험 오답(A)과 예문(B). 뜻 겹침(C)·영어 오타(D)·품사와 뜻(E)은 전체 790단어(토익 Day 1\~24 + 회화 70).

| 항목 | 결과 |
|---|---|
| A. 오답이 빈칸에 들어가는 세트 | **88세트 수정** (오답 교체 81 · 예문을 고쳐 오답을 걸러낸 것 7) |
| B. 정답을 특정하지 못하는 예문 | **77개 수정** (영어·한국어 예문 함께) |
| C. 같은 Day 안 뜻 겹침 | **13쌍 수정** (뜻 14개, brochure·flyer는 둘 다 고침) · 검토 후 구분된다고 본 쌍 3개 · 판단 요청 6쌍 |
| D. 영어 오타 | **진짜 오타 0건** · 형식 문제(전각·둥근 따옴표·하이픈·두 칸 띄어쓰기·마침표 누락) 0건 |
| E. 품사와 뜻 모양 | **2건 수정** |
| 단어 수 | 790개 그대로 (id 790개 모두 고유) |
| 수정된 단어 | 134개 (A·B) + 뜻 16개 (C·E) |

새 오답으로 들어간 단어 87개의 한국어 뜻은 `data/vocab.js`의 `day1To8AuditMeanings`에 넣었다 (단어장 상세 표시용, 누락 0개).

## 0. 장부 멱등성 추가 검증 (check-backup)

| 경우 | 결과 |
|---|---|
| 기기 A→B→A→B 3바퀴, 매번 양쪽에서 공부 + 같은 파일 재전송 | 통과 — 매 단계 받은 쪽 합계 = 실제 공부 총합 (최종 21/21, 5개 누적 숫자 모두) |
| 기기 셋, 늦게 도착한 옛 파일 포함 | 통과 — 세 기기 모두 15/15 |
| 덮어쓰기 후 내보내기 | 통과 — 장부의 이 기기 몫 7(넘겨준 2 + 덮어쓴 뒤 5), 상대 몫 4, 음수·중복 없음. 원래 기기에 두 번 합쳐도 13, 덮어쓰기로 사라진 4는 되살아나지 않음 |
| 장부 키 없는 옛 파일 (deviceId 있음 / 없음) | 통과 — 내 몫 2 + 파일 3 = 5, 두 번 가져와도 그대로 |

한계: deviceId도 장부도 없는 파일은 모두 같은 가상 기기(`d-unknownfile`)로 본다. 이런 파일을 **서로 다른 기기에서 두 개** 가져오면 큰 쪽만 남는다. 이 앱의 내보내기는 항상 deviceId와 장부를 넣으므로 손으로 만든 파일에서만 생긴다.

## A. 빈칸 시험 오답 (Day 1\~8)

기준 (Day 18\~24와 같음)
- 빈칸에 넣었을 때 **뜻이 통하면 안 된다**. 문법만 맞는 것은 괜찮다.
- 실제 영어 단어, 철자·소리가 비슷한 혼동어 우선. 선택지는 원형으로 보이므로 원형으로 쓴다.
- 그 자리에 들어갈 수 있는 명사가 너무 많을 때(예: 'The ___ ran the meeting'에 사람 명사는 다 들어감)는 철자가 비슷한 **사물** 단어를 썼다.
- 오답을 바꾸기보다 예문에 맥락을 넣어 걸러내는 편이 나은 경우는 예문을 고치고 오답은 그대로 두었다 (아래 '예문으로 해결').

Day별: Day 1 11세트 · Day 2 5세트 · Day 3 12세트 · Day 4 10세트 · Day 5 13세트 · Day 6 12세트 · Day 7 13세트 · Day 8 12세트

| id | 단어 | 예문 | 이전 오답 | 새 오답 | 이유 |
|---|---|---|---|---|---|
| v005 | provide | (그대로) | prohibit, promote, propose | proceed, provoke, prove | We promote/propose free delivery 둘 다 말이 됨 |
| v009 | customer | (그대로) | client, guest, visitor | custom, costume, cluster | client·visitor는 거의 같은 뜻이라 'The client returned the shoes…'가 그대로 통함 |
| v010 | deadline | (그대로) | headline, guideline, outline | headline, deadlock, outline | meet the guideline(s)은 실제 연어 |
| v011 | submit | Please submit the report to your manager by Friday. | summit, subscribe, substitute | summit, subscribe, subside | substitute the report(바꿔 내다)가 통할 여지 |
| v012 | receive | I received your email yesterday, but I haven't had time to read it yet. | relieve, retrieve, reverse | relieve, deceive, reverse | I retrieved your email(스팸함에서 꺼냄)이 통함 |
| v015 | approve | The manager approved the budget, so we can start buying supplies. | improve, prove, approach | reprove, prove, appear | The manager improved the budget이 통함, approached도 애매 |
| v017 | order | I'd like to order two items from your online store. | offer, border, owner | ordeal, border, owner | I'd like to offer two items가 통함 |
| v024 | renew | (그대로) | review, remove, remind | reveal, remove, remind | you need to review it(계약 검토)이 애매하게 통함 |
| v026 | shipment | (그대로) | shipping, statement, settlement | shipyard, statement, settlement | The shipping of office chairs will arrive가 애매하게 통함 |
| v028 | announcement | (그대로) | agreement, achievement, advertisement | annoyance, achievement, attainment | There will be an advertisement/agreement at noon이 통함 |
| v030 | temporary | This is only a temporary solution until the new system arrives next month. | — | 그대로 (예문으로 해결) | a contemporary/voluntary solution이 통함 → 기간 맥락을 넣어 걸러냄(오답은 유지) |
| v031 | proposal | (그대로) | proposition, proportion, protocol | proportion, procession, propeller | submitted a proposition(사업 제안)·protocol이 통함 |
| v038 | deliver | (그대로) | deliberate, delegate, decline | deliberate, delegate, delight | The package will be declined(수취 거부)이 애매하게 통함 |
| v054 | brief | (그대로) | bright, broad, brave | bright, bribe, brave | a broad update가 통함 |
| v055 | client | (그대로) | customer, candidate, colleague | clinic, climate, cliff | a new colleague/customer who needs legal advice가 통함 |
| v057 | efficient | (그대로) | effective, sufficient, deficient | affluent, sufficient, deficient | more effective because it uses less time…이 통함(뜻이 가까운 혼동어) |
| v061 | agenda | The agenda lists the three topics we will discuss at the meeting. | agency, agreement, appendix | agency, agent, aggregate | The agreement/appendix for the meeting is attached가 통함 |
| v063 | candidate | (그대로) | colleague, client, consultant | candid, candle, canteen | interviewed five colleagues/consultants for the open position이 통함 |
| v064 | charge | (그대로) | chart, change, challenge | chart, charm, charity | There is no change/challenge for delivery가 애매하게 통함 |
| v067 | discount | (그대로) | deduction, dispatch, distance | discourse, dispatch, distance | a 10 percent deduction이 통함 |
| v069 | expire | Your membership expires next month, so please renew it soon. | expand, explore, express | expel, explore, express | Your membership expands가 통함 |
| v072 | handle | She handles customer complaints quickly and politely. | handout, hesitate, highlight | handout, hesitate, haunt | She highlights customer complaints가 통함 |
| v073 | implement | (그대로) | improve, imply, import | implode, imply, import | The new policy will be improved soon이 통함 |
| v075 | launch | They will launch the product in May, and it will be in stores by June. | lease, lecture, label | lunch, lecture, lounge | lease/label the product가 통함 |
| v077 | outstanding | She received an outstanding review and a big bonus for her excellent work. | outdated, outgoing, outline | outbound, outgoing, outline | an outdated review가 통함 |
| v086 | subscribe | (그대로) | substitute, subsequent, submit | substitute, subsequent, subside | submit to our newsletter(기고하다)가 통함 |
| v087 | transfer | Please hold. I will transfer your call to the sales department. | transform, translate, transmit | transform, transplant, transcend | translate/transmit your call이 통함 |
| v090 | withdraw | If you change your mind, you can withdraw your application at any time. | withhold, wander, warn | wither, wander, warn | withhold your application이 통함 |
| v091 | accurate | Please check the numbers again to make sure the data is accurate. | adequate, advanced, apparent | accustomed, advanced, apparent | the data is adequate가 통함 |
| v093 | alternative | If it rains, we need an alternative plan for the outdoor event. | — | 그대로 (예문으로 해결) | an allocation/alteration plan이 통함 → 비 오는 날 맥락으로 걸러냄(오답은 유지) |
| v095 | appointment | (그대로) | appliance, applicant, approval | appliance, apparatus, approval | I have an applicant at three(면접)가 통함 |
| v098 | authorize | (그대로) | automate, anticipate, accelerate | autograph, anticipate, author | automate/accelerate refunds가 통함 |
| v099 | beverage | Hot and cold beverages are included in the price of the lunch buffet. | baggage, barrier, benefit | leverage, barrier, average | Benefits/Baggage are included in the price가 통함 |
| v101 | confidential | This document is confidential, so please do not share it outside the team. | considerable, consistent, continuous | considerable, confident, continuous | This document is consistent가 통함 |
| v110 | install | (그대로) | inspect, instruct, insure | insist, instruct, insure | We inspected new software가 통함 |
| v116 | receipt | (그대로) | recipient, reception, recovery | recipient, recital, recovery | confirm reception of this email이 통함 |
| v118 | renovate | The lobby is being renovated, so the main entrance will be closed until the work is finished. | relocate, renew, replace | innovate, rotate, renounce | The lobby is being renewed/replaced/relocated가 통함 |
| v119 | sufficient | We have sufficient supplies to last until the end of the month. | efficient, significant, consistent | efficient, proficient, superficial | significant/consistent supplies가 통함 |
| v122 | anticipate | Because of the new product, we anticipate strong sales this quarter. | appreciate, approximate, articulate | participate, approximate, articulate | We appreciate strong sales가 통함 |
| v123 | assess | Before we repair the roof, we need to assess the damage and estimate the cost. | assist, assume, assert | assist, assort, assert | assume the damage(책임지다)가 통함 |
| v126 | consecutive | (그대로) | considerable, consistent, conservative | considerable, conservative, confidential | three consistent months가 통함 |
| v131 | evaluate | (그대로) | elevate, eliminate, evacuate | elevate, elongate, evacuate | eliminate the proposals가 통함 |
| v133 | initiative | (그대로) | initial, institution, instruction | initial, inhibition, instruction | a green institution이 통함 |
| v137 | pending | (그대로) | preliminary, permanent, persistent | pendulum, permanent, persistent | Your application is still preliminary가 통함 |
| v138 | prompt | (그대로) | proper, prosper, profound | prosper, prone, prop | your profound/proper reply가 통함 |
| v143 | tentative | The date is still tentative and may change next week. | temporary, territorial, technical | tentacle, territorial, technical | The date is temporary가 통함 |
| v144 | thorough | We conducted a thorough inspection and checked every room in the building. | through, throughout, thoughtful | through, throughout, thorn | a thoughtful inspection이 통함 |
| v145 | utilize | (그대로) | update, upgrade, uphold | utter, uphold, usher | update/upgrade the available space가 통함 |
| v146 | valid | (그대로) | valuable, variable, various | valley, variable, various | The coupon is valuable until June이 통함 |
| v147 | vendor | (그대로) | venue, venture, version | venue, vendetta, version | a new venture to supply our office paper가 애매하게 통함 |
| v149 | workforce | The company hired 200 new people to expand its workforce. | workshop, workload, workplace | workbook, worksheet, workout | expanded its workshop/workplace/workload가 통함 |
| v151 | resume | Please attach your resume to the email so we can review your work history. | resource, reserve, research | resort, reserve, rescue | attach your research/resources가 통함 |
| v154 | experience | (그대로) | expense, expertise, expectation | expense, expiry, expectation | three years of expertise가 통함 |
| v155 | interview | (그대로) | interval, interfere, introduce | interval, interfere, intervene | introduce five candidates가 통함 |
| v157 | recruit | We are recruiting new staff for the marketing team. | reduce, recover, record | reduce, recover, recite | We are recording for the marketing team이 통함 |
| v160 | benefit | The company offers excellent benefits, such as health insurance and free lunches. | beneficial, benchmark, beverage | beneficial, benchmark, benefactor | offers excellent beverages가 통함 |
| v163 | retire | He will retire next year after working here for 35 years. | require, retreat, retail | require, retina, retail | He will retreat next year가 애매하게 통함 |
| v165 | full-time | This is a full-time position, working 40 hours a week. | full-scale, fully paid, full-size | full-scale, full-blown, full-size | a fully paid position이 통함 |
| v169 | reference | Please provide two references from former employers who can speak about your work. | refund, reflection, refreshment | reflection, refrain, referendum | provide two refunds/refreshments가 통함 |
| v172 | training | The safety training for new employees starts at nine. | trading, trailing, translating | traitor, trailing, translating | The trading starts at nine(증시)이 통함 |
| v173 | performance | (그대로) | preference, persistence, appearance | perforation, persistence, permanence | review employee preferences/appearance가 통함 |
| v175 | workload | (그대로) | workforce, workshop, workplace | workbook, workshop, workplace | My workforce has increased(관리자 입장)가 통함 |
| v177 | recruitment | (그대로) | requirement, retirement, replacement | requirement, retirement, refreshment | The replacement process(후임 채용)가 통함 |
| v181 | minutes | Could you take the minutes today and email them to everyone after the meeting? | agenda, memos, notices | agenda, minuets, notices | take the memos가 통함 |
| v182 | attendee | (그대로) | attendant, attention, attempt | attendance, attention, attempt | All attendants received a handout이 통함 |
| v183 | chairperson | (그대로) | secretary, copywriter, counselor | chairlift, chandelier, champagne | The secretary/counselor ran the meeting이 통함(사람 명사는 다 들어감) |
| v184 | presentation | (그대로) | preservation, prescription, presence | preservation, prescription, president | Her presence lasted thirty minutes가 통함 |
| v186 | projector | (그대로) | project, protector, processor | prospector, protector, protractor | The processor is not working이 통함, project도 애매 |
| v188 | brainstorm | Let's brainstorm some ideas for the new product name. No idea is a bad idea. | breakthrough, broadcast, breakdown | breakthrough, brainwash, breakdown | broadcast some ideas가 통함 |
| v192 | reschedule | Two people can't come on Monday, so we need to reschedule the meeting for Wednesday. | research, resource, reserve | research, resource, resemble | reserve the meeting이 애매하게 통함 |
| v193 | conference call | We have a conference call with the London office at two, so please dial in on time. | — | 그대로 (예문으로 해결) | We have a conference room at two(예약)가 통함 → 전화 맥락으로 걸러냄(오답은 유지) |
| v194 | follow-up | (그대로) | follower, following, fallout | follower, folly, fallout | a following email이 통함 |
| v195 | milestone | (그대로) | millstone, mainstream, landmark | millstone, mainstream, mileage | reached an important landmark(같은 뜻)가 통함 |
| v203 | absence | Please explain your absence from yesterday's meeting. | — | 그대로 (예문으로 해결) | explain your abstract(논문 초록)가 통함 → 회의 맥락으로 걸러냄(오답은 유지) |
| v209 | delegate | You have too much to do, so you should delegate some of the work to your team. | dedicate, designate, deliberate | dedicate, decimate, deliberate | designate some of the work가 통함 |
| v210 | wrap up | (그대로) | warm up, wake up, write up | warm up, wake up, wash up | write up the meeting(보고서로 정리)이 통함 |
| v212 | campaign | The new advertising campaign starts in June with TV ads and online videos. | company, complain, container | compass, complain, container | The new company starts in June이 통함 |
| v213 | brand | The brand is well known in Asia for its sports shoes and logo. | branch, blend, board | bland, blend, board | The branch is well known이 통함 |
| v215 | consumer | (그대로) | container, constructor, contractor | container, constructor, condor | Contractor demand has increased가 통함 |
| v218 | trend | (그대로) | trade, track, trail | trade, tread, trench | an upward track이 통함 |
| v219 | competitor | Our main competitors lowered their prices, so we lost some customers to them. | — | 그대로 (예문으로 해결) | Our collaborator lowered their prices가 통함 → 고객을 빼앗긴 맥락으로 걸러냄(오답은 유지) |
| v220 | brochure | Please take a brochure at the entrance to read about our tours and prices. | branch, budget, bulletin | branch, budget, broker | take a bulletin이 통함 |
| v221 | flyer | (그대로) | folder, filter, feature | foyer, filter, feature | handed out folders가 통함 |
| v225 | slogan | The company changed its slogan to "Better Coffee, Better Day." | — | 그대로 (예문으로 해결) | changed its solution이 애매 |
| v227 | questionnaire | Please answer all 10 questions on the questionnaire. | — | 그대로 (예문으로 해결) | complete the quotation/qualification/quarantine이 모두 통함 → 예문으로 걸러냄(오답은 유지) |
| v230 | subscriber | (그대로) | supplier, supporter, successor | supplier, subscript, successor | The magazine has 50,000 supporters가 통함 |
| v232 | billboard | (그대로) | bulletin, blackboard, boardroom | bulletin, blackboard, billiards | rented a boardroom downtown이 애매하게 통함 |
| v235 | wholesale | (그대로) | warehouse, workforce, withdrawal | wholesome, workforce, withdrawal | warehouse prices(창고형 저가)가 통함 |

## B. 예문이 정답을 특정하는가 (Day 1\~8)

기준
- 단어를 빼고 읽었을 때 **뜻이 다른 흔한 단어**(특히 반대말)가 똑같이 자연스럽게 들어가고, 문장에 정답 쪽 뜻을 가리키는 단서가 없으면 약한 예문이다.
  예) `Are you ___ on Friday?` — busy가 들어감. `I will ___ the meeting.` — miss가 들어감.
- 같은 뜻의 다른 단어(동의어)가 들어가는 것은 문제로 보지 않았다. 빈칸 시험 선택지에는 그 동의어가 없고, 뜻을 배우는 데 방해가 되지 않기 때문이다.
- 고칠 때는 짧게 유지하면서 정답 뜻을 가리키는 맥락(이유·결과·대상)을 한 덩어리 붙였다. 한국어 예문도 같은 내용으로 바꿨다.

| id | 단어 | 이전 예문 | 새 예문 | 새 한국어 예문 | 이유 |
|---|---|---|---|---|---|
| v001 | available | Are you available on Friday? | Are you available on Friday afternoon for a quick meeting? | 금요일 오후에 잠깐 회의할 시간 되세요? | busy(반대 뜻)도 자연스럽게 들어감 → 회의 맥락 추가 |
| v002 | attend | I will attend the meeting. | I will attend the meeting and take notes for the team. | 회의에 참석해서 팀을 위해 메모하겠습니다. | miss·skip(반대 뜻)이 들어감 → 메모하는 맥락 추가 |
| v003 | confirm | Please confirm your reservation. | Please confirm your reservation by replying 'yes' to this message. | 이 메시지에 '예'라고 답장해 예약을 확정해 주세요. | cancel(반대 뜻)이 들어감 |
| v011 | submit | Please submit the report by Friday. | Please submit the report to your manager by Friday. | 금요일까지 보고서를 관리자에게 제출해 주세요. | finish가 들어감 |
| v012 | receive | I received your email yesterday. | I received your email yesterday, but I haven't had time to read it yet. | 어제 이메일을 받았는데 아직 읽을 시간이 없었어요. | sent(반대)가 들어감 |
| v015 | approve | The manager approved the budget. | The manager approved the budget, so we can start buying supplies. | 관리자가 예산을 승인해서 비품 구매를 시작할 수 있습니다. | rejected(반대)가 들어감 |
| v019 | reserve | I reserved a table for two. | I reserved a table for two at 7 p.m. under the name Kim. | 김이라는 이름으로 저녁 7시에 2인석을 예약했어요. | need·want가 들어감 |
| v023 | purchase | She purchased a new laptop. | She purchased a new laptop with her credit card. | 그녀는 신용카드로 새 노트북을 구매했습니다. | sold(반대)가 들어감 |
| v025 | refund | Can I get a refund? | The shirt is too small. Can I get a refund and have the money put back on my card? | 셔츠가 너무 작아요. 환불받아서 카드로 돈을 돌려받을 수 있나요? | 'Can I get a ___?'는 무엇이든 들어감 |
| v035 | estimate | Could you send me an estimate? | Could you send me an estimate of how much the repairs will cost? | 수리비가 얼마나 들지 견적을 보내 주시겠어요? | email·invoice가 들어감 |
| v039 | facility | The hotel has excellent facilities. | The hotel has excellent facilities, including a pool and a gym. | 그 호텔은 수영장과 체육관 등 시설이 훌륭합니다. | service·food가 들어감 |
| v041 | issue | We are working on the issue. | We are working on the issue and will fix the error soon. | 그 문제를 해결하는 중이며 곧 오류를 고치겠습니다. | project·report가 들어감 |
| v045 | recommend | I recommend taking the earlier train. | I recommend taking the earlier train because the later one is often crowded. | 늦은 기차는 자주 붐비니 이른 기차를 타는 걸 추천합니다. | hate·enjoy가 들어감 |
| v050 | vacancy | There is a vacancy in the accounting team. | There is a vacancy in the accounting team, and we are hiring someone to fill it. | 회계팀에 공석이 있어서 채울 사람을 채용하고 있습니다. | problem이 들어감 |
| v061 | agenda | The agenda for the meeting is attached. | The agenda lists the three topics we will discuss at the meeting. | 의제에는 회의에서 논의할 세 가지 주제가 나와 있습니다. | minutes·slides가 들어감 |
| v066 | depart | The train departs at eight. | The train departs from Seoul at eight and arrives in Busan at eleven. | 기차는 8시에 서울에서 출발해 11시에 부산에 도착합니다. | arrives(반대)가 들어감 |
| v069 | expire | Your membership expires next month. | Your membership expires next month, so please renew it soon. | 회원권이 다음 달에 만료되니 곧 갱신해 주세요. | starts(반대)가 들어감 |
| v072 | handle | She handles customer complaints. | She handles customer complaints quickly and politely. | 그녀는 고객 불만을 빠르고 정중하게 처리합니다. | ignores가 들어감 |
| v075 | launch | They will launch the product in May. | They will launch the product in May, and it will be in stores by June. | 5월에 제품을 출시하고 6월에는 매장에 나옵니다. | test가 들어감 |
| v076 | negotiate | We are negotiating the price. | We are negotiating the price with the supplier, hoping to get a better deal. | 더 좋은 조건을 얻으려고 공급업체와 가격을 협상하고 있습니다. | checking·discussing이 들어감 |
| v077 | outstanding | She received an outstanding review. | She received an outstanding review and a big bonus for her excellent work. | 그녀는 탁월한 업무로 뛰어난 평가와 큰 보너스를 받았습니다. | bad(반대)가 들어감 |
| v081 | receipt | Please keep your receipt. | Please keep your receipt in case you need to return the item. | 물건을 반품할 경우를 대비해 영수증을 보관해 주세요. | ticket·seat가 들어감 |
| v084 | revise | Please revise the draft by Monday. | Please revise the draft to fix the errors the client pointed out. | 고객이 지적한 오류를 고치도록 초안을 수정해 주세요. | send·review가 들어감 |
| v087 | transfer | I will transfer your call. | Please hold. I will transfer your call to the sales department. | 잠시만요. 영업부로 전화 연결해 드리겠습니다. | return·answer가 들어감 |
| v090 | withdraw | You can withdraw your application. | If you change your mind, you can withdraw your application at any time. | 마음이 바뀌면 언제든지 지원을 철회할 수 있습니다. | submit(반대)이 들어감 |
| v091 | accurate | Please make sure the data is accurate. | Please check the numbers again to make sure the data is accurate. | 데이터가 정확한지 숫자를 다시 확인해 주세요. | ready·saved가 들어감 |
| v097 | attendance | Attendance is mandatory. | Attendance at the safety training is mandatory for all staff. | 전 직원은 안전 교육에 반드시 참석해야 합니다. | Training·Registration이 들어감 |
| v099 | beverage | Beverages are included in the price. | Hot and cold beverages are included in the price of the lunch buffet. | 점심 뷔페 가격에 따뜻한 음료와 차가운 음료가 포함되어 있습니다. | Meals·Taxes가 들어감 |
| v100 | competitive | We offer competitive prices. | We offer competitive prices that are lower than most other stores. | 대부분의 다른 매장보다 저렴한 경쟁력 있는 가격을 제공합니다. | high(반대)가 들어감 |
| v101 | confidential | This document is confidential. | This document is confidential, so please do not share it outside the team. | 이 문서는 기밀이니 팀 밖으로 공유하지 마세요. | important가 들어감 |
| v105 | distribute | Please distribute the handouts. | Please distribute the handouts to everyone in the room. | 방에 있는 모두에게 유인물을 나눠 주세요. | read·collect가 들어감 |
| v112 | mandatory | Training is mandatory for all staff. | Training is mandatory for all staff, so no one can skip it. | 교육은 전 직원 필수라서 아무도 빠질 수 없습니다. | free·available이 들어감 |
| v113 | obtain | You can obtain a form at the desk. | You can obtain an application form at the front desk and fill it out there. | 안내 데스크에서 신청서를 받아 그 자리에서 작성할 수 있습니다. | submit(반대)이 들어감 |
| v114 | occupy | The meeting room is occupied. | The meeting room is occupied until 3 p.m., so we'll have to wait. | 회의실은 오후 3시까지 사용 중이라 기다려야 합니다. | empty(반대)가 들어감 |
| v118 | renovate | The lobby is being renovated. | The lobby is being renovated, so the main entrance will be closed until the work is finished. | 로비 개조 공사 중이라 공사가 끝날 때까지 정문은 닫힙니다. | cleaned가 들어감 |
| v120 | verify | Please verify your email address. | Please verify your email address by clicking the link we sent you. | 보내 드린 링크를 눌러 이메일 주소를 인증해 주세요. | enter·change가 들어감 |
| v122 | anticipate | We anticipate strong sales this quarter. | Because of the new product, we anticipate strong sales this quarter. | 신제품 덕분에 이번 분기 매출이 좋을 것으로 예상합니다. | need가 들어감 |
| v123 | assess | We need to assess the damage. | Before we repair the roof, we need to assess the damage and estimate the cost. | 지붕을 고치기 전에 피해를 평가하고 비용을 산정해야 합니다. | repair·check가 들어감 |
| v124 | complimentary | Breakfast is complimentary. | Breakfast is complimentary, so you don't have to pay for it. | 조식은 무료라서 따로 돈을 내지 않아도 됩니다. | included·served가 들어감 → 무료라는 단서 추가 |
| v129 | enhance | The update will enhance performance. | The update will enhance performance, making the app run faster. | 업데이트로 성능이 향상되어 앱이 더 빨리 실행됩니다. | reduce·slow(반대)가 들어감 |
| v132 | feedback | We welcome your feedback. | We welcome your feedback on how we can improve our service. | 서비스 개선 방법에 대한 의견을 환영합니다. | visit·questions가 들어감 |
| v134 | merge | The two companies merged last year. | The two companies merged last year to form one large firm. | 두 회사는 작년에 합병해 하나의 큰 회사가 되었습니다. | split(반대)이 들어감 |
| v135 | outlet | There is an outlet near the window. | You can charge your laptop at the outlet near the window. | 창가 콘센트에서 노트북을 충전할 수 있습니다. | desk·plant가 들어감 |
| v139 | reluctant | He was reluctant to accept the offer. | He was reluctant to accept the offer because the salary was lower than he expected. | 연봉이 기대보다 낮아서 그는 제안을 받아들이기를 꺼렸습니다. | happy·ready(반대)가 들어감 |
| v140 | retail | She works in retail. | She works in retail, selling clothes directly to shoppers at a mall. | 그녀는 소매업에서 일하며 쇼핑몰에서 손님에게 옷을 직접 팝니다. | sales·marketing이 들어감 |
| v143 | tentative | The date is tentative. | The date is still tentative and may change next week. | 날짜는 아직 잠정적이라 다음 주에 바뀔 수 있습니다. | final(반대)이 들어감 |
| v144 | thorough | We conducted a thorough inspection. | We conducted a thorough inspection and checked every room in the building. | 건물의 모든 방을 확인하며 철저한 점검을 했습니다. | quick(반대)이 들어감 |
| v148 | waive | The fee will be waived for members. | The fee will be waived for members, so they pay nothing. | 회원은 수수료가 면제되어 아무것도 내지 않습니다. | reduced·raised가 들어감 |
| v151 | resume | Please attach your resume to the email. | Please attach your resume to the email so we can review your work history. | 경력을 검토할 수 있도록 이력서를 이메일에 첨부해 주세요. | photo·file이 들어감 |
| v153 | qualification | She meets all the qualifications. | She meets all the qualifications for the job, including a degree and a driver's license. | 그녀는 학위와 운전면허를 포함해 이 일의 자격 요건을 모두 갖췄습니다. | 'She meets all the people'처럼 다른 뜻으로 읽힘 |
| v157 | recruit | We are recruiting for the marketing team. | We are recruiting new staff for the marketing team. | 마케팅팀 신입 직원을 모집하고 있습니다. | working이 들어감 |
| v159 | salary | The salary is negotiable. | The salary is negotiable, so tell us how much you'd like to earn. | 급여는 협의 가능하니 원하는 금액을 말씀해 주세요. | price가 들어감 |
| v160 | benefit | The company offers excellent benefits. | The company offers excellent benefits, such as health insurance and free lunches. | 회사는 건강보험과 무료 점심 같은 훌륭한 복리후생을 제공합니다. | service·food가 들어감 |
| v163 | retire | He will retire next year. | He will retire next year after working here for 35 years. | 그는 35년 동안 일한 뒤 내년에 은퇴합니다. | leave가 들어감 |
| v165 | full-time | This is a full-time position. | This is a full-time position, working 40 hours a week. | 주 40시간 근무하는 정규직 자리입니다. | part-time(반대)이 들어감 |
| v166 | part-time | She works part-time at a bookstore. | She works part-time at a bookstore, only on weekends. | 그녀는 서점에서 주말에만 시간제로 일합니다. | full-time(반대)이 들어감 |
| v168 | personnel | Contact the personnel department. | Contact the personnel department about your vacation days and salary. | 휴가 일수와 급여는 인사부에 문의하세요. | sales·IT가 들어감 |
| v169 | reference | Please provide two references. | Please provide two references from former employers who can speak about your work. | 업무에 대해 말해 줄 수 있는 이전 직장 추천인 두 명을 알려 주세요. | photos가 들어감 |
| v172 | training | The training starts at nine. | The safety training for new employees starts at nine. | 신입 직원 안전 교육은 9시에 시작합니다. | meeting이 들어감 |
| v174 | raise | He asked for a raise. | He asked his boss for a raise because he hadn't had a pay increase in three years. | 그는 3년 동안 월급이 오르지 않아 상사에게 임금 인상을 요청했습니다. | refund·day off가 들어감 |
| v178 | orientation | New employees attend an orientation. | New employees attend an orientation on their first day to learn about the company. | 신입 직원은 첫날 회사에 대해 배우는 오리엔테이션에 참석합니다. | event가 들어감 |
| v180 | headquarters | Our headquarters is in Seoul. | Our headquarters is in Seoul, and we have branch offices in Busan and Daegu. | 본사는 서울에 있고 부산과 대구에 지점이 있습니다. | office·factory가 들어감 |
| v181 | minutes | Could you take the minutes today? | Could you take the minutes today and email them to everyone after the meeting? | 오늘 회의록을 작성해서 회의 후에 모두에게 이메일로 보내 주시겠어요? | 맥락 부족 |
| v191 | adjourn | The meeting was adjourned at five. | The meeting was adjourned at five, and everyone went home. | 회의는 5시에 끝났고 모두 집에 갔습니다. | started(반대)가 들어감 |
| v192 | reschedule | We need to reschedule the meeting. | Two people can't come on Monday, so we need to reschedule the meeting for Wednesday. | 두 명이 월요일에 못 와서 회의를 수요일로 다시 잡아야 합니다. | cancel이 들어감 |
| v198 | objective | What is the objective of this project? | The main objective of this project is to cut costs by 10 percent. | 이 프로젝트의 주요 목표는 비용을 10% 줄이는 것입니다. | budget·name이 들어감 |
| v199 | outline | He outlined the main points. | Before going into detail, he outlined the main points of the plan. | 그는 자세히 들어가기 전에 계획의 요점을 개괄했습니다. | repeated가 들어감 |
| v200 | summary | Please send me a summary of the meeting. | I missed the meeting, so please send me a short summary of what was decided. | 회의에 못 갔으니 결정된 내용을 짧게 요약해서 보내 주세요. | copy·recording이 들어감 |
| v201 | remind | Please remind me about the deadline. | I always forget, so please remind me about the deadline a day before. | 제가 자꾸 잊어버리니 마감 하루 전에 다시 알려 주세요. | ask가 들어감 |
| v202 | availability | Please let me know your availability. | Please let me know your availability for a meeting next week. Which days are you free? | 다음 주 회의 가능한 시간을 알려 주세요. 어느 요일이 비시나요? | address·answer가 들어감 |
| v205 | overlap | The two meetings overlap. | The two meetings overlap, so I can't attend both. | 두 회의 시간이 겹쳐서 둘 다 참석할 수 없습니다. | start·end가 들어감 |
| v207 | draft | Please review the first draft. | Please review the first draft of the report before I write the final version. | 최종본을 쓰기 전에 보고서 초안을 검토해 주세요. | page·chapter가 들어감 |
| v209 | delegate | You should delegate some of the work. | You have too much to do, so you should delegate some of the work to your team. | 할 일이 너무 많으니 일부를 팀원에게 위임하세요. | finish가 들어감 |
| v212 | campaign | The new campaign starts in June. | The new advertising campaign starts in June with TV ads and online videos. | 새 광고 캠페인은 6월에 TV 광고와 온라인 영상으로 시작합니다. | season이 들어감 |
| v220 | brochure | Please take a brochure at the entrance. | Please take a brochure at the entrance to read about our tours and prices. | 입구에서 안내책자를 가져가 투어와 요금을 확인하세요. | seat·number가 들어감 |
| v225 | slogan | The company changed its slogan. | The company changed its slogan to "Better Coffee, Better Day." | 회사는 슬로건을 'Better Coffee, Better Day'로 바꿨습니다. | name·logo가 들어감 |
| v236 | profit | The company made a large profit. | The company made a large profit after selling more than it spent. | 회사는 지출보다 매출이 많아 큰 이익을 냈습니다. | loss·mistake(반대)가 들어감 |

## C. 같은 Day 안 한국어 뜻 겹침 (전체 24 Day + 회화 상황)

뜻 시험은 같은 Day(회화는 같은 상황)에서 오답 뜻을 가져온다. 기존 유사도 가드(같음·포함·쉼표 조각 겹침)가 잡는 쌍은 **한 문제에 함께 나오지 않으므로 문제가 없다** (예: assess·evaluate는 둘 다 '평가하다'지만 가드가 서로를 오답에서 뺀다). 문제는 가드를 통과하는데 뜻이 사실상 같은 쌍이다.

기준 (`tools/check-vocab.js`의 meaningOverlap)
1. **통째 포함**: 한쪽 뜻 조각이 통째로 다른 쪽 뜻 안에 낱말로 들어 있다 (조사를 떼고 비교). 예) publicity '홍보' ↔ campaign '홍보 활동'
2. **동의어 표**: 글자가 안 겹치는 동의어 — 고용·채용 / 인력·직원 / 팸플릿·전단지·리플릿 / 규격·표준 / 장비·기기·장치 / 장려금·보조금 / 요금·이용료
3. 검토 후 구분된다고 본 쌍은 이유와 함께 예외 목록에 둔다. 예외 목록에 있는데 더 걸리지 않으면 지우라고 실패시킨다.

이 기준은 감사 전 데이터에서 16쌍을 잡았고(수정한 쌍 전부 포함), 처음 넓게 본 '같은 2글자 말' 기준(83쌍)은 교육·운송·매장처럼 주제어만 같은 쌍이 대부분이라 버렸다. 동의어 표에 없는 동의어는 기계로 못 찾으므로 **24 Day + 회화 3상황의 뜻을 Day별로 모두 나란히 읽어** 찾았다 (동의어 표의 쌍들이 그렇게 찾은 것).

### 고친 쌍

| 단어 | 이전 뜻 | 새 뜻 | 겹친 상대 |
|---|---|---|---|
| v016 arrange | (일정·만남을) 잡다, 마련하다 | (만남·행사를) 주선하다, 마련하다 | Day 1 schedule '일정 / 일정을 잡다'와 '잡다'가 겹침 |
| v212 campaign | 캠페인, 홍보 활동 | 캠페인, (기간을 정한) 판촉 활동 | Day 8 publicity '홍보, 언론 노출'과 '홍보'가 겹침 |
| v486 property | 부동산, 건물 | 부동산, 소유 재산 | Day 17 premises '(회사의) 건물과 부지'와 '건물'이 겹침 |
| v157 recruit | 채용하다, 모집하다 | (새 인원을) 모집하다 | Day 6 hire '고용하다'와 사실상 같은 뜻(채용≈고용). recruit는 '찾아 모으는 것', hire는 '실제로 쓰는 것'으로 나눔 |
| v168 personnel | 인사부, 인력 | 인사부, 인사 담당 | Day 6 staff '직원 (전체)'와 '인력'이 같은 뜻 |
| v220 brochure | 안내책자, 팸플릿 | (여러 쪽짜리) 안내책자 | Day 8 flyer '전단지'와 '팸플릿'이 같은 뜻 |
| v221 flyer | 전단지 | (한 장짜리) 전단지 | brochure와 구분 (짝 수정) |
| v321 specification | 사양, 규격 | 사양, 세부 명세 | Day 11 standard '기준, 표준'과 '규격'이 같은 뜻 |
| v332 hardware | 하드웨어, 장비 | 하드웨어 (컴퓨터 기계 부품) | Day 12 device '기기, 장치'와 '장비'가 같은 뜻 |
| v476 incentive | 장려금, 유인책 | 장려책, 유인책 | Day 16 subsidy '보조금'과 '장려금'이 같은 뜻 |
| v071 fee | 수수료, 이용료 | 수수료 | Day 3 charge '요금 / 청구하다'와 '이용료'가 같은 뜻 |
| v177 recruitment | 채용 | 신규 인원 모집 | Day 6 hire '고용하다'와 '채용'이 같은 뜻 (recruit '(새 인원을) 모집하다'와 짝을 맞춤) |
| v178 orientation | 오리엔테이션, 예비 교육 | 오리엔테이션, 신입 안내 | Day 6 training '교육, 연수'와 '교육'이 겹침 |
| v318 conveyor | 컨베이어, 운반 장치 | 컨베이어, 운반 벨트 | Day 11 safety gear '안전 장비'와 장치≈장비 |

### 검토 후 그대로 둔 쌍 (예외 목록)

- operate 「가동하다, 운영하다」 ↔ shut down 「가동을 중단하다」 — '가동'이 겹치지만 반대 뜻
- operate ↔ downtime 「가동 중단 시간」 — 같은 이유
- address 「처리하다, 다루다」 ↔ ticket 「접수 건, 처리 요청」 — 동사와 명사, 뜻 다름

## D. 영어 오타 (저장소 전체)

방법: vocab(표제어·예문·오답)·grammar(예문·문항·선택지)·reading(지문·문항·선택지)·listening(받아쓰기·질문·선택지·대본)·part1·speaking의 영어 칸 7,626개에서 단어 빈도표를 만들었다. 서로 다른 단어 4,619개 중 **한 번만 나오는 단어 2,047개**를 모두 훑고, 의심스러운 것은 나온 자리를 찾아 확인했다. 일부러 틀린 표현(`VOCAB_WRONG_FORMS`)과 혼동 단어 뜻 사전은 세지 않았다.

결과: **진짜 오타 0건.** 의심해서 확인한 것은 모두 의도된 것이었다.
- 일부러 틀린 형태: `These advices are helpful.`(문법 나쁜 예문), `the efficientest method`(문법 오답), Part 6 오답 `goaled`·`goaling`·`patientness`, 회화 오답 `baggage claimer`·`spilt the bill`·`go straightly`
- 철자 혼동 오답: currant(← curriculum), pharaoh, sorcery, polarize, primitively, relevantly 등
- 고유명사·주소·이메일 조각: bartonco, harborlinetours, Brantley, Okafor, Varden, Lind 등
- 영국식 철자: reading rp25 'MERIDIAN HARBOUR HOTEL'·'harbour view', rp24 'cataloguing' (나머지는 미국식 harbor) → 판단 요청

형식 검사 (모두 0건): 영어 칸의 한글 / 전각 문자 / 둥근 따옴표·아포스트로피(’ “ ”) / 비표준 하이픈(‐ ‑ ‒ −) / 줄바꿈 없는 공백 / 두 칸 띄어쓰기 / 같은 글자 세 번 연속 / 단어 예문·받아쓰기·대본·Part 1·회화 문장 끝 문장부호 누락 / 한국어 뜻에 영어·두 칸 띄어쓰기.
처음 돌렸을 때 걸린 122건은 모두 오탐이었다. Part 6 지문은 빈칸 앞뒤로 잘려 있어 앞뒤 공백이 정상이고, 독해 지문의 영수증·일정표·서명 줄은 문장이 아니며, `www`는 오타가 아니다. 이 셋을 규칙에서 뺐다.

## E. 품사와 한국어 뜻의 모양 (전체)

기준: 뜻을 쉼표·' / '로 나눈 조각마다, 품사가 여러 개면 그중 하나에 맞으면 통과. 회화 '표현'은 제외.
- 명사·형용사: '\~다'(동사형)나 '\~하게·\~히·\~적으로·\~에·미리·곧'(부사형)으로 끝나면 안 된다
- 동사: '\~다'로 끝나야 한다 / 부사: '\~다'나 '\~한·\~된·\~적인·\~있는'(형용사형)으로 끝나면 안 된다
- '주문(하다)'처럼 괄호로 동사를 붙인 조각은 명사·동사 겸용

| 단어 | 이전 뜻 | 새 뜻 | 이유 |
|---|---|---|---|
| v092 advance | 미리, 사전에 / 진전 | 사전(미리 함) / 진전 | E: 품사는 명사인데 뜻 '미리, 사전에'가 부사 모양. in advance의 advance는 명사이므로 명사 모양으로 |
| v689 barely | 가까스로, 거의 \~않다 | 가까스로, 거의 \~않게 | E: 품사는 부사인데 '거의 \~않다'가 동사 모양. tip에 '거의 \~않다(hardly)' 설명은 그대로 둠 |

처음에 '\~의·\~인'으로 끝나면 형용사로 본 규칙은 회의·의뢰인·증인 같은 명사를 잘못 잡아(37건) 버렸다.

## 판단이 필요한 항목

| # | 종류 | 항목 | 내 판단·질문 |
|---|---|---|---|
| 1 | C | adjourn 「휴회하다, 산회하다」 ↔ wrap up 「마무리하다」 (Day 7) | 둘 다 '회의를 끝내다'로 읽힐 수 있음. adjourn을 '(회의를) 휴회하다, 잠시 멈추다'로 좁힐지 |
| 2 | C | front desk 「프런트, 안내 데스크」 ↔ concierge 「컨시어지, 안내 담당」 (Day 10) | 장소와 사람으로 구분된다고 봤지만 '안내'가 겹침 |
| 3 | C | carrier 「운송업체, 택배 회사」 ↔ freight forwarder 「운송 주선업체」 (Day 19) | 실제로 다른 업종이지만 학습자에게는 비슷해 보임 |
| 4 | C | endorse 「보증하다, 지지하다」 ↔ sponsor 「후원하다 / 후원자」 (Day 8) | 광고 맥락에서 지지≈후원으로 읽힐 수 있음 |
| 5 | C | address 「처리하다, 다루다」 ↔ resolve 「해결하다」 (Day 14) | address an issue ≈ 문제를 해결하다 |
| 6 | C | layover 「경유, 환승 대기」 ↔ connecting flight 「연결 항공편」 (회화·공항) | 개념은 다르지만 같은 상황 묶음 |
| 7 | C | recruit 뜻에서 '채용하다'를 뺀 것 (→ '(새 인원을) 모집하다') | 사전 첫 뜻이 '채용하다'인 경우가 많음. hire와 겹치지 않게 하려고 '모집'으로 좁혔는데 괜찮은지 |
| 8 | C | fee 뜻에서 '이용료'를 뺀 것 (→ '수수료') | admission fee(입장료) 같은 쓰임은 tip에서 다룰지 |
| 9 | D | 영국식 철자 harbour(rp25)·cataloguing(rp24) | 미국식으로 통일할지 (토익은 미국식이 기본이지만 영국 회사 지문이면 자연스러움) |
| 10 | A | chairperson 오답을 chairlift·chandelier·champagne(사물)로 바꾼 것 | 사람 명사는 빈칸에 다 들어가서 철자 비슷한 사물로 했다. 너무 쉬워졌는지 |
| 11 | A | candidate 오답 candid·candle·canteen / minutes 오답 minuets | 철자는 비슷하지만 minuets(미뉴에트)는 드문 단어 |
| 12 | A | complimentary 오답 complementary는 그대로 둠 | 'Breakfast is complementary'는 문법상 들어가고 뜻이 틀린 대표 함정이라 유지. 예문에 '돈을 내지 않아도 된다'를 넣어 정답이 하나가 되게 함 |
| 13 | A | temporary(v030)·alternative(v093)·conference call(v193)·absence(v203)·competitor(v219)·questionnaire(v227) | 오답은 그대로 두고 예문으로 걸러냄. 오답을 바꾸는 쪽이 나은지 |
| 14 | A | 그대로 둔 애매한 오답: schedule→sequence('is sequenced for Monday'), enclose→endorse('the endorsed brochure'), permit→permanent('not permanent here'), competitive→comparative('comparative prices'), install→insure('insured new software') | 문법은 맞지만 뜻이 어색해 통하지 않는다고 봄 |
| 15 | B | 예문이 길어진 것 (v025 'The shirt is too small. Can I get a refund and have the money put back on my card?') | 맥락을 넣느라 Day 1치고 길어짐. 짧게 줄일지 |
| 16 | E | barely 뜻 '가까스로, 거의 \~않게' | 부사 모양으로 바꿨지만 한국어가 조금 어색함. '가까스로, 간신히'로 줄이고 '거의 \~않다'는 tip에만 둘지 |
| 17 | E | advance 뜻 '사전(미리 함) / 진전' | in advance의 뜻을 명사 모양으로 쓰려다 보니 어색함. 표제어를 'in advance'(표현)로 바꾸는 방법도 있음 |

## 검사 스크립트에 넣은 것 (`tools/check-vocab.js`)

- `meaningOverlap` (C): 위 기준 1·2 + 예외 목록 `REVIEWED_MEANING_PAIRS`. 감사 전 데이터로 돌리면 13건 실패한다.
- `posMeaningShape` (E): 위 기준. 감사 전 데이터로 돌리면 3건 실패한다 (barely는 두 규칙에 걸림).
- `textFormat` (D): 위 형식 검사. 받아쓰기 문장에 두 칸 띄어쓰기·둥근 아포스트로피·마침표 누락을 일부러 넣으면 잡는다.
- `rareEnglishWords` (D, 참고): 한 번만 나오는 단어 개수. 목록은 새 도구 `node tools/list-rare-words.js [글자]`.
- A·B는 기계로 판정할 수 없어 넣지 않았다. 새 Day를 추가할 때 사람이(또는 Claude가) 빈칸에 넣어 읽어 본다.
