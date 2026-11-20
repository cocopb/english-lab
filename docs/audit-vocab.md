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

---

# 2차 감사 — Day 9\~17 + 드문 오답 교체(Day 1\~24) + 철자 통일 (2026-11-20)

| 항목 | 결과 |
|---|---|
| A. Day 9\~17 오답이 빈칸에 들어가는 세트 | **67세트 수정** (오답 교체 64 · 예문으로 걸러낸 것 3) |
| B. Day 9\~17 약한 예문 | **23개 수정** |
| 0-2. 드문 오답 교체 (Day 1\~24) | **281세트** · 빠진 드문 단어 329개 + 한 세트에 2개 이상이던 어려운 단어 47개 |
| C. 새 오답의 한국어 뜻 | 300개 추가 (`day9To17AuditMeanings`), 누락 0개 |
| D. 같은 Day 뜻 겹침 재검사 | **새로 걸린 쌍 0개** · 예외 목록의 address↔ticket은 address 뜻이 바뀌어 더 걸리지 않아 목록에서 지움 |
| 영국식 철자 | 9곳 미국식으로 통일, 의도된 4곳(tip의 철자 설명)은 유지 |
| 단어 수 | 790개 그대로 (id 790개 모두 고유) |

## 0. 지난 판단 반영

| 단어 | 칸 | 이전 | 새 값 | 이유 |
|---|---|---|---|---|
| v402 address | meaning | 처리하다, 다루다 | (문제를) 다루다, 거론하다 | 사용자 결정: '해결' 계열을 빼고 resolve와 구분 |
| v191 adjourn | meaning | 휴회하다, 산회하다 | (회의를) 정회하다, 휴회하다 | 사용자 결정: '끝내다' 뜻을 빼고 wrap up과 구분 |
| v191 adjourn | example | The meeting was adjourned at five, and everyone went home. | The meeting was adjourned at noon and will continue at two o'clock. | 뜻을 정회·휴회로 바꿔 예문도 '다시 이어진다'로 |
| v191 adjourn | exampleKo | 회의는 5시에 끝났고 모두 집에 갔습니다. | 회의는 정오에 휴회했고 2시에 다시 이어집니다. | 영어 예문에 맞춤 |
| v071 fee | meaning | 수수료 | 수수료, 회비 | 사용자 결정: registration fee·membership fee가 자주 나옴 (지난번 좁힌 것 되돌림) |
| v064 charge | pos | n./v. | v./n. | 사용자 결정: charge는 '청구하다 / 요금' 순서로, 품사로 fee와 가름 |
| v064 charge | meaning | 요금 / 청구하다 | 청구하다 / 요금 | 사용자 결정 |
| v689 barely | meaning | 가까스로, 거의 \~않게 | 간신히, 가까스로 | 사용자 결정: '거의 \~않다' 삭제 |
| v092 advance | word | advance | in advance | 사용자 결정: 예문이 in advance라서 표제어를 숙어로 |
| v092 in advance | pos | n. | 숙어 | 숙어 |
| v092 in advance | meaning | 사전(미리 함) / 진전 | 미리, 사전에 | 숙어 in advance의 뜻 |
| v092 in advance | example | Please book in advance. | Please book at least two weeks in advance to get a room. | B: 짧아서 now·online 등이 들어감 → 기간 맥락 |
| v092 in advance | exampleKo | 미리 예약해 주세요. | 방을 구하려면 적어도 2주 전에 미리 예약해 주세요. | 영어 예문에 맞춤 |
| v278 concierge | meaning | 컨시어지, 안내 담당 | 컨시어지 (투숙객의 예약·길 안내를 돕는 직원) | front desk와 '안내'만 겹쳐 구분되는 말이 없었음 |
| v274 front desk | meaning | 프런트, 안내 데스크 | 프런트 (체크인·체크아웃 창구), 안내 데스크 | concierge와 구분되는 말 추가 |
| v559 carrier | meaning | 운송업체, 택배 회사 | (직접 실어 나르는) 운송업체, 택배 회사 | freight forwarder와 구분되는 말 추가 |
| v570 freight forwarder | meaning | 운송 주선업체 | 운송 주선업체 (운송사를 골라 맡기고 서류를 대신 처리) | carrier와 구분되는 말 추가 |
| v240 endorse | meaning | 보증하다, 지지하다 | (공개적으로) 지지하다, 보증하다 | sponsor와 구분: 공개 지지 |
| v223 sponsor | meaning | 후원하다 / 후원자 | (돈을 내어) 후원하다 / 후원자 | endorse와 구분: 돈 |
| s035 layover | meaning | 경유, 환승 대기 | 경유, 환승 대기 (갈아타기 전 기다리는 시간) | connecting flight와 구분: 시간 |
| s045 connecting flight | meaning | 연결 항공편 | 연결 항공편 (갈아탈 다음 비행기) | layover와 구분: 비행기 |
| v092 in advance | distractors | advice, advantage, adventure | in addition, in charge, in person | 표제어가 숙어가 되어 오답도 숙어로 (모두 아는 표현, 빈칸에 넣으면 기간 맥락과 안 맞음) |

- charge는 말씀하신 '청구하다; 요금'을 데이터의 기존 표기 규칙(품사별 뜻은 ' / '로 나눔)에 맞춰 '청구하다 / 요금', 품사도 같은 순서로 'v./n.'으로 적었다.
- 뜻을 그대로 두기로 한 8개(front desk·concierge·carrier·freight forwarder·endorse·sponsor·layover·connecting flight)는 **구분되는 말이 적혀 있는지** 봤다. concierge '컨시어지, 안내 담당'은 front desk '프런트, 안내 데스크'와 '안내'만 같고 구분되는 말이 없어서, 8개 모두 괄호로 차이(창구·직원 / 직접 운송·주선 / 공개 지지·돈 / 기다리는 시간·비행기)를 넣었다.

## 0-2. 오답 단어 수준 규칙 (드문 오답 교체)

규칙: 오답 3개 중 **최소 2개는 아는 단어**(790단어장 표제어 또는 중학 교과서 수준 기초 어휘), 나머지 1개는 철자·소리가 비슷한 조금 어려운 단어여도 된다.

판단 방법: 790단어장 밖의 오답 1,569종을 하나씩 보고 세 등급으로 나눴다.
- **드묾**: 300점대 학습자가 거의 만날 일이 없는 단어 → 무조건 교체 (예: minuets, pharaoh, currant, syllogism, jurisprudence)
- **어려움**: 중학 수준은 넘지만 철자 혼동어로 쓸 만한 단어 → 한 세트에 하나까지 (예: quarantine, statue, recession, gauge)
- **아는 단어**: 그 밖의 기초·토익 기본 단어 (예: custom, candle, parcel, bread)
교체할 때도 새 단어를 빈칸에 넣어 말이 통하지 않는지 다시 읽었다. 통해서 뺀 후보는 표의 이유 칸에 '(…는 통해서 제외)'로 적었다.

빠진 드문 단어 (329개): aberrant, admonish, aggregate, allude, alumnus, ambivalence, ambulatory, apparatus, archetype, assort, asylum, attest, autograph, befall, benefactor, benevolent, biannual, billiards, bland, brainwash, breadth, bribe, broker, broth, bulletproof, cameo, candid, canteen, captivity, carousel, cashew, cashmere, chairlift, chandelier, chant, clam, clearinghouse, clinch, compel, concede, conceive, condense, condor, conscience, constitute, contingent, convey, cordially, corrosion, counterfeit, credible, creed, culinary, curable, currant, curricular, customary, cynic, daybreak, decimate, decreasingly, decree, deduce, deferral, degrade, delinquent, demolish, depict, deprive, desolate, deviate, diaphragm, diplomacy, discourse, dismay, disparage, dispel, displace, disposition, diverge, domination, dotage, downpour, dwell, elongate, eloquent, emancipate, embargo, emergence, eminent, emit, empathize, enchant, encode, encompass, endurance, energize, enrage, enrich, ensue, exert, exhalation, expend, facelift, fallacy, fallout, falsify, fertile, firearm, firmware, flourish, flourished, fluster, foil, folklore, folly, foothold, forcible, forefront, foreword, formidable, foyer, fractional, fraught, frenzy, fret, frugal, futility, godsend, gradient, graft, grate, gratify, gripe, hardship, haunt, hierarchy, hinge, hoist, householder, idle, implode, incidental, inclusively, induce, inedible, infer, inhibit, inhibition, inhibitor, instigator, intermittent, interrogate, ironic, irrigate, jeopardy, jostle, jurisprudence, juxtaposition, lectern, legislature, licensee, lineage, linguistics, linkage, locality, majesty, malpractice, manuscript, mediation, meltdown, mercenary, mimic, minuets, miraculous, misconduct, modulate, molar, molecule, monopolize, mortify, mutely, neutralize, nodule, notation, obsessive, omission, onset, ordeal, organism, outbound, outpost, outset, overshoot, oversleep, overturn, palate, palette, payload, peaceable, peculiar, pendulum, perforation, permanence, perquisite, pharaoh, physique, plumage, polarize, pollination, prerogative, presumption, primitively, privatize, procession, prognosis, prone, propeller, prophecy, prophet, prospector, protractor, punctuate, punishable, radiant, realign, recede, receptacle, receptive, recital, recline, recur, referendum, reinforcement, relevantly, reliance, reliant, remit, renounce, reprove, requisition, reside, restate, restraint, retina, retiree, retract, sabotage, salvage, sediment, semaphore, seminal, sermon, settler, sewage, shareware, sheriff, showmanship, shrinkage, shutter, sorcery, spectacle, speculation, stagnant, stake, stale, stardom, stature, statute, stereotype, sterilize, stockholder, storied, stowaway, strident, subscript, subservient, subside, subtle, supercharge, superficial, surge, surpass, sustenance, syllable, syllogism, symmetry, tactic, tentacle, tenure, tenures, termites, terrorism, testify, tickle, tonic, transcend, transcribe, transitive, transplant, tread, treatise, treaty, trench, trustee, turnstile, unleash, unroll, uptake, usability, usher, utter, vaccinate, validate, vendetta, versed, vibration, villa, vista, vocation, wager, warden, waver, weaver, wholesome, wildness, windfall, wither, workhouse

그중 1차 감사(Day 1\~8) 때 내가 넣은 드문 단어(chairlift·chandelier·minuets·propeller·prospector·protractor 등)도 이번 규칙에 따라 모두 바꿨다.

| id | 단어 | 이전 오답 | 새 오답 | 이유 |
|---|---|---|---|---|
| v011 | submit | summit(어려움), subscribe, subside(드묾) | summit, subscribe, subway | subside 드묾 |
| v015 | approve | reprove(드묾), prove, appear | prove, appear, arrive | reprove 드묾 |
| v017 | order | ordeal(드묾), border, owner | border, owner, older | ordeal 드묾 |
| v031 | proposal | proportion(어려움), procession(드묾), propeller(드묾) | proportion, protein, purpose | procession·propeller 드묾 |
| v054 | brief | bright, bribe(드묾), brave | bright, brave, bread | bribe 드묾 |
| v061 | agenda | agency, agent, aggregate(드묾) | agency, agent, angle | aggregate 드묾 |
| v063 | candidate | candid(드묾), candle, canteen(드묾) | candle, candy, camera | candid·canteen 드묾 |
| v067 | discount | discourse(드묾), dispatch, distance | dispatch, distance, disease | discourse 드묾 |
| v072 | handle | handout, hesitate(어려움), haunt(드묾) | handout, hesitate, hang | haunt 드묾 |
| v073 | implement | implode(드묾), imply(어려움), import | import, imply, impress | implode 드묾 |
| v077 | outstanding | outbound(드묾), outgoing, outline | outgoing, outline, outdoor | outbound 드묾 |
| v086 | subscribe | substitute, subsequent, subside(드묾) | substitute, subsequent, subway | subside 드묾 |
| v087 | transfer | transform(어려움), transplant(드묾), transcend(드묾) | transform, trap, travel | transplant·transcend 드묾 |
| v090 | withdraw | wither(드묾), wander, warn | wander, warn, wonder | wither 드묾 |
| v095 | appointment | appliance, apparatus(드묾), approval | appliance, approval, apartment | apparatus 드묾 |
| v098 | authorize | autograph(드묾), anticipate, author | anticipate, author, automobile | autograph 드묾 |
| v106 | eligible | elaborate(어려움), elegant(어려움), elective(어려움) | elegant, electric, elephant | elaborate·elegant·elective 어려움 3개 |
| v108 | forward | foreword(드묾), forecast, former | forecast, former, forget | foreword 드묾 |
| v116 | receipt | recipient, recital(드묾), recovery | recipient, recovery, recipe | recital 드묾 |
| v118 | renovate | innovate, rotate, renounce(드묾) | innovate, rotate, remind | renounce 드묾 |
| v119 | sufficient | efficient, proficient(어려움), superficial(드묾) | efficient, proficient, sudden | superficial 드묾 |
| v123 | assess | assist, assort(드묾), assert(어려움) | assist, assert, assign | assort 드묾 |
| v131 | evaluate | elevate(어려움), elongate(드묾), evacuate(어려움) | elevate, evacuate, escape | elongate 드묾 |
| v133 | initiative | initial, inhibition(드묾), instruction | initial, instruction, injury | inhibition 드묾 |
| v137 | pending | pendulum(드묾), permanent, persistent | permanent, persistent, penguin | pendulum 드묾 |
| v138 | prompt | prosper(어려움), prone(드묾), prop | prosper, prop, pump | prone 드묾 |
| v140 | retail | retain(어려움), retire, retreat(어려움) | retain, retire, retry | retain·retreat 어려움 2개 |
| v142 | streamline | strengthen(어려움), stimulate(어려움), structure | strengthen, structure, stream | strengthen·stimulate 어려움 2개 |
| v143 | tentative | tentacle(드묾), territorial(어려움), technical | territorial, technical, tennis | tentacle 드묾 |
| v145 | utilize | utter(드묾), uphold(어려움), usher(드묾) | uphold, upload, usual | utter·usher 드묾 |
| v147 | vendor | venue, vendetta(드묾), version | venue, version, vending | vendetta 드묾 |
| v160 | benefit | beneficial, benchmark, benefactor(드묾) | beneficial, benchmark, bench | benefactor 드묾 |
| v162 | resign | redesign, reassign, realign(드묾) | redesign, reassign, rely | realign 드묾 |
| v163 | retire | require, retina(드묾), retail | require, retail, recipe | retina 드묾 |
| v169 | reference | reflection, refrain(어려움), referendum(드묾) | reflection, refrain, refrigerator | referendum 드묾 |
| v170 | probation | production, prohibition(어려움), proportion(어려움) | production, prohibition, pronunciation | prohibition·proportion 어려움 2개 |
| v173 | performance | perforation(드묾), persistence, permanence(드묾) | persistence, perfume, pepper | perforation·permanence 드묾 |
| v181 | minutes | agenda, minuets(드묾), notices | agenda, notices, mittens | minuets 드묾 |
| v183 | chairperson | chairlift(드묾), chandelier(드묾), champagne | champagne, chart, charger | chairlift·chandelier 드묾 |
| v186 | projector | prospector(드묾), protector, protractor(드묾) | protector, protest, protein | prospector·protractor 드묾 |
| v188 | brainstorm | breakthrough, brainwash(드묾), breakdown | breakthrough, breakdown, breakfast | brainwash 드묾 |
| v194 | follow-up | follower, folly(드묾), fallout(드묾) | follower, fellow, fallen | folly·fallout 드묾 |
| v195 | milestone | millstone(어려움), mainstream(어려움), mileage | millstone, mileage, mailbox | millstone·mainstream 어려움 2개 |
| v200 | summary | salary, surgery, symmetry(드묾) | salary, surgery, summer | symmetry 드묾 |
| v204 | punctual | punctuation, particular, peculiar(드묾) | punctuation, particular, punch | peculiar 드묾 |
| v207 | draft | drift(어려움), craft, graft(드묾) | drift, craft, draw | graft 드묾 |
| v209 | delegate | dedicate, decimate(드묾), deliberate(어려움) | dedicate, deliberate, decorate | decimate 드묾 |
| v213 | brand | bland(드묾), blend, board | blend, board, bread | bland 드묾 |
| v214 | target | tariff, terminal(어려움), tactic(드묾) | tariff, terminal, tablet | tactic 드묾 |
| v215 | consumer | container, constructor, condor(드묾) | container, constructor, contest | condor 드묾 |
| v218 | trend | trade, tread(드묾), trench(드묾) | trade, treat, tray | tread·trench 드묾 |
| v220 | brochure | branch, budget, broker(드묾) | branch, budget, brush | broker 드묾 |
| v221 | flyer | foyer(드묾), filter, feature | filter, feature, flavor | foyer 드묾 |
| v229 | loyalty | royalty(어려움), liability, legacy(어려움) | royalty, liability, lottery | royalty·legacy 어려움 2개 |
| v230 | subscriber | supplier, subscript(드묾), successor(어려움) | supplier, successor, submarine | subscript 드묾 |
| v232 | billboard | bulletin, blackboard, billiards(드묾) | bulletin, blackboard, billion | billiards 드묾 |
| v235 | wholesale | wholesome(드묾), workforce, withdrawal | workforce, withdrawal, whole | wholesome 드묾 |
| v236 | profit | project, prophet(드묾), portfolio(어려움) | project, portfolio, program | prophet 드묾 |
| v238 | forecast | foreword(드묾), footnote, foothold(드묾) | footnote, football, forehead | foreword·foothold 드묾 |
| v239 | segment | sediment(드묾), sequence(어려움), settlement | sequence, settlement, second | sediment 드묾 |
| v245 | cash flow | cash register, cash back, petty cash | cash register, cash back, cash prize | petty cash(어려움) |
| v246 | deposit | depart, depict(드묾), deprive(드묾) | depart, depend, despite | depict·deprive 드묾 |
| v248 | fiscal | physical, facial, fractional(드묾) | physical, facial, famous | fractional 드묾 |
| v250 | liability | loyalty, legality, locality(드묾) | loyalty, legality, location | locality 드묾 |
| v255 | shareholder | shareware(드묾), householder(드묾), placeholder | shoulder, placeholder, sharpener | shareware·householder 드묾 |
| v261 | reimbursement | reinforcement(드묾), requirement, replacement | refreshment, requirement, retirement | reinforcement 드묾 |
| v262 | payroll | paycheck, payload(드묾), payable | payable, parcel, pillow | payload 드묾 |
| v279 | shuttle | settle, shelter, shovel | settle, shelter, shuffle | shovel → 더 흔한 철자 혼동어로 |
| v283 | arrival | approval, archival(어려움), appraisal(어려움) | rival, survival, arrow | archival·appraisal 어려움 2개 |
| v286 | visa | vista(드묾), vital(어려움), villa(드묾) | visit, vase, vision | vista·villa 드묾, vital 어려움 |
| v287 | boarding | bordering, boasting(어려움), bonding(어려움) | bordering, bowling, borrowing | boasting·bonding 어려움 2개 |
| v288 | luggage | language, leakage(어려움), linkage(드묾) | language, league, lounge | leakage 어려움·linkage 드묾 |
| v289 | overbook | overlook(어려움), overload, overturn(드묾) | overlook, overeat, overcook | overturn 드묾 |
| v290 | upgrade | update, uphold(어려움), uptake(드묾) | update, upset, upload | uphold 어려움·uptake 드묾 |
| v297 | tourism | terrorism(드묾), mechanism, optimism(어려움) | terminal, mechanism, tutorial | terrorism 드묾·optimism 어려움 |
| v299 | souvenir | salvage(드묾), scenery, signature | silence, scenery, signature | salvage 드묾 |
| v301 | manufacture | manufacturer, manuscript(드묾), management | manufacturer, manual, management | manuscript 드묾 |
| v307 | capacity | capability, captivity(드묾), capital | capability, capital, captain | captivity 드묾 |
| v311 | prototype | stereotype(드묾), archetype(드묾), protocol | protest, prompt, protein | stereotype·archetype 드묾 |
| v313 | durable | curable(드묾), portable, valuable | portable, valuable, dual | curable 드묾 |
| v314 | malfunction | malpractice(드묾), misfortune, misconduct(드묾) | misfortune, mailbox, machine | malpractice·misconduct 드묾 |
| v317 | warehouse | wholesale, workhouse(드묾), greenhouse | wholesale, warrior, wardrobe | workhouse 드묾 |
| v321 | specification | specialization(어려움), speculation(드묾), simplification(어려움) | special, species, specialization | speculation 드묾·simplification 어려움 |
| v322 | standard | standing, stardom(드묾), standby | standing, standby, stand | stardom 드묾 |
| v325 | waste | waist(어려움), wasteful, vast(어려움) | waist, wasteful, west | waist·vast 어려움 2개 |
| v326 | recycle | recall, recite(어려움), recline(드묾) | recall, recipe, receive | recite·recline 드묾 |
| v329 | downtime | downturn(어려움), downside, downpour(드묾) | downturn, downside, downtown | downpour 드묾 |
| v331 | software | hardware, firmware(드묾), freeware | hardware, firewood, freeware | firmware 드묾 |
| v333 | backup | breakup, buildup(어려움), backlog(어려움) | breakup, backpack, backlog | buildup·backlog 어려움 2개 |
| v334 | database | datasheet, daydream(어려움), daybreak(드묾) | date, daylight, daycare | daybreak 드묾·daydream 어려움 |
| v336 | server | sermon(드묾), servant, surfer | servant, survey, surfer | sermon 드묾 |
| v342 | troubleshoot | troublemaker, overshoot(드묾), oversee | troublemaker, treasure, overseas | overshoot 드묾 |
| v346 | firewall | fireplace, firearm(드묾), firsthand | fireplace, fireworks, firsthand | firearm 드묾 |
| v347 | bandwidth | broadband, bandage, breadth(드묾) | bandage, band, brand | breadth 드묾 |
| v350 | subscription | description, prescription, inscription(어려움) | description, suspicion, substance | inscription 어려움 |
| v351 | license | licensee(드묾), liberty(어려움), liability | library, liberty, liability | licensee 드묾 |
| v355 | shortcut | shortage, shortfall(어려움), shorthand(어려움) | shortage, shortfall, short story | shortfall·shorthand 어려움 2개 |
| v356 | storage | shortage, stationery, stature(드묾) | shortage, station, statue | stature 드묾 |
| v359 | notification | notation(드묾), nomination(어려움), navigation | nation, notebook, navigation | notation 드묾 |
| v360 | glitch | glimpse(어려움), gadget, gauge(어려움) | glitter, gadget, gauge | glimpse·gauge 어려움 2개 |
| v363 | terms | terminals, termites(드묾), tenures(드묾) | tennis, temples, tents | termites·tenures 드묾 |
| v369 | witness | wellness, wildness(드묾), wilderness(어려움) | wellness, window, wireless | wildness 드묾·wilderness 어려움 |
| v371 | settlement | statement, sentiment(어려움), sediment(드묾) | statement, seat, sentiment | sediment 드묾 |
| v377 | claim | clam(드묾), clash, cling | clap, clash, climb | clam·cling 드묾 |
| v380 | waiver | waver(드묾), wager(드묾), weaver(드묾) | waiter, water, weather | waver·wager·weaver 모두 드묾 |
| v382 | termination | determination, nomination(어려움), domination(드묾) | determination, nomination, destination | domination 드묾 |
| v385 | jurisdiction | justification, jurisprudence(드묾), juxtaposition(드묾) | justification, juice, journey | jurisprudence·juxtaposition 드묾 |
| v387 | notarize | normalize, neutralize(드묾), nominate(어려움) | normalize, nominate, nod | neutralize 드묾 |
| v388 | counterpart | counteroffer(어려움), countdown, counterfeit(드묾) | counteroffer, countdown, counter | counterfeit 드묾 |
| v390 | liable | likely, liberal(어려움), literal(어려움) | likely, liberal, library | liberal·literal 어려움 2개 |
| v403 | prioritize | privatize(드묾), publicize, polarize(드묾) | print, practice, publicize | privatize·polarize 드묾 |
| v407 | status | statue(어려움), statute(드묾), statistics | statue, station, stadium | statute 드묾 |
| v408 | redeem | reclaim(어려움), resume, reside(드묾) | reclaim, resume, repeat | reside 드묾 |
| v414 | goodwill | goodness, godsend(드묾), guideline | goldfish, guideline, goalkeeper | godsend 드묾 |
| v419 | queue | quote, quiet, quest(어려움) | quote, quiet, quarter | quest → 더 흔한 철자 혼동어로 |
| v420 | ticket | tackle(어려움), tickle(드묾), trigger(어려움) | toilet, tiger, tackle | tickle 드묾·tackle·trigger 어려움 |
| v422 | hazard | harbor, hardship(드묾), heritage(어려움) | harbor, hamster, heritage | hardship 드묾 |
| v424 | emergency | emergence(드묾), efficiency, expectancy | energy, efficiency, exam | emergence 드묾 |
| v425 | evacuate | eliminate(어려움), elevate(어려움), escalate | eliminate, elevator, escalate | eliminate·elevate 어려움 2개 |
| v429 | drill | drain, drift(어려움), dwell(드묾) | drain, drift, dress | dwell 드묾 |
| v430 | hygiene | highlight, heritage(어려움), hierarchy(드묾) | highlight, heritage, history | hierarchy 드묾 |
| v432 | ventilation | vegetation(어려움), validation(어려움), vibration(드묾) | vacation, vegetation, variation | vibration 드묾·validation 어려움 |
| v434 | toxic | topic, tonic(드묾), tragic(어려움) | topic, tragic, taxi | tonic 드묾 |
| v435 | flammable | favorable, affordable, formidable(드묾) | favorable, affordable, famous | formidable 드묾 |
| v437 | signage | signature, sewage(드묾), salvage(드묾) | signature, sausage, sightseeing | sewage·salvage 드묾 |
| v439 | insurance | abundance, endurance(드묾), appearance | abundance, entrance, appearance | endurance 드묾 |
| v449 | shelter | shutter(드묾), shoulder, settler(드묾) | shoulder, shampoo, sheet | shutter·settler 드묾 |
| v451 | sustainable | suspicious(어려움), suspended, sustenance(드묾) | suspicious, suspended, sunny | sustenance 드묾 |
| v452 | emission | emotion, omission(드묾), admission | emotion, election, admission | omission 드묾 |
| v455 | pollution | population, solution, pollination(드묾) | population, solution, politician | pollination 드묾 |
| v458 | solar | polar, molar(드묾), soldier | polar, sofa, soldier | molar 드묾 |
| v460 | disposal | disposition(드묾), display, dispatch | discussion, display, dispatch | disposition 드묾 |
| v461 | conserve | converse(어려움), conceive(드묾), condense(드묾) | converse, concern, consent | conceive·condense 드묾 |
| v463 | utility | usability(드묾), unity(어려움), futility(드묾) | unity, utensil, university | usability·futility 드묾 |
| v465 | biodegradable | biological, bilingual, biannual(드묾) | bicycle, bilingual, big | biannual 드묾 |
| v466 | offset | outset(드묾), onset(드묾), upset | office, offer, upset | outset·onset 드묾 |
| v467 | standardize | sterilize(드묾), stabilize(어려움), specialize | stand, stabilize, specialize | sterilize 드묾 |
| v468 | retrofit | retreat(어려움), retract(드묾), refund | retreat, retire, refund | retract 드묾 |
| v470 | wind power | wind tunnel, windfall(드묾), windshield | wind tunnel, window, windshield | windfall 드묾 |
| v471 | grid | grill, grind(어려움), gripe(드묾) | grill, grind, grade | gripe 드묾 |
| v472 | shortage | storage, shrinkage(드묾), sabotage(드묾) | storage, shortcut, shopping | shrinkage·sabotage 드묾 |
| v474 | surcharge | supercharge(드묾), discharge, surpass(드묾) | discharge, surface, surprise | supercharge·surpass 드묾 |
| v475 | reduce | produce, induce(드묾), deduce(드묾) | produce, refuse, reach | induce·deduce 드묾 |
| v476 | incentive | intensive, incidental(드묾), initiative | intensive, incident, instinct | incidental 드묾 |
| v482 | tenant | tension(어려움), tendency(어려움), tenure(드묾) | tension, tennis, tent | tenure 드묾, tension·tendency 어려움 |
| v489 | furnished | furious, flourished(드묾), furthered | furious, fried, funny | flourished 드묾 |
| v491 | vacate | validate(드묾), vaccinate(드묾), violate | volunteer, violate, vote | validate·vaccinate 드묾 |
| v495 | plumbing | planning, publishing, plumage(드묾) | planning, publishing, plum | plumage 드묾 |
| v499 | corridor | corrosion(드묾), calendar, curtain | cookie, calendar, curtain | corrosion 드묾 |
| v501 | remodel | remind, remit(드묾), remain | remind, remove, remain | remit 드묾 |
| v506 | restroom | restraint(드묾), rescue, rehearsal | recipe, rescue, rehearsal | restraint 드묾 |
| v509 | soundproof | waterproof, foolproof, bulletproof(드묾) | waterproof, foolproof, fireproof | bulletproof 드묾 |
| v511 | exhibition | exhaustion(어려움), inhibition(드묾), exhalation(드묾) | exhaustion, exit, expense | inhibition·exhalation 드묾 |
| v512 | exhibit | inhibit(드묾), exist, exhaust(어려움) | exist, exhaust, excuse | inhibit 드묾 |
| v513 | booth | both, tooth, broth(드묾) | both, tooth, bath | broth 드묾 |
| v517 | admission | emission, omission(드묾), admiration | emission, admiration, addition | omission 드묾 |
| v522 | host | hoist(드묾), hose(어려움), hostile(어려움) | hose, hurt, hide | hoist 드묾·hostile 어려움 |
| v523 | organizer | organism(드묾), organ, organic | organ, organic, orange | organism 드묾 |
| v532 | program | progress, problem, prognosis(드묾) | progress, problem, promise | prognosis 드묾 |
| v533 | lineup | lineage(드묾), linen, pickup | linen, pickup, lemon | lineage 드묾 |
| v535 | on-site registration | registration number, on-time arrival, onset(드묾) | registration number, on-time arrival, on sale | onset 드묾 |
| v536 | exhibitor | inhibitor(드묾), extinguisher, excerpt | extinguisher, excerpt, exit | inhibitor 드묾 |
| v537 | stage | stake(드묾), stale(드묾), staff | staff, stamp, state | stake·stale 드묾 |
| v538 | intermission | intermediate, intermittent(드묾), commission | intermediate, commission, internet | intermittent 드묾 |
| v540 | turnout | turnover, turnaround, turnstile(드묾) | turnover, turnaround, turtle | turnstile 드묾 |
| v541 | freight | fright, fraught(드묾), fret(드묾) | fright, fruit, free | fraught·fret 드묾 |
| v542 | cargo | embargo(드묾), cameo(드묾), carpool | carpool, card, career | embargo·cameo 드묾 |
| v546 | pallet | palate(드묾), palette(드묾), ballot | ballot, palace, pilot | palate·palette 드묾 |
| v547 | forklift | facelift(드묾), folklore(드묾), forecast | forecast, fork, forehead | facelift·folklore 드묾 |
| v549 | customs clearance | customer base, customary(드묾), clarity | customer base, clarity, costume | customary 드묾 |
| v550 | in transit | in trust, transitive(드묾), in translation | in trust, in translation, in training | transitive 드묾 |
| v551 | tariff | traffic, terrific, sheriff(드묾) | traffic, terrific, taxi | sheriff 드묾 |
| v553 | logistics | linguistics(드묾), logic, logo | logic, logo, login | linguistics 드묾 |
| v554 | fulfill | fuel, foil(드묾), befall(드묾) | fuel, fall, fail | foil·befall 드묾 (fill·follow the order는 통해서 제외) |
| v556 | out of stock | out of touch, out of breath, stockholder(드묾) | out of touch, out of breath, out of town | stockholder 드묾 (out of order는 통해서 제외) |
| v557 | restock | restate(드묾), restrict, rest | restrict, rest, rescue | restate 드묾 |
| v558 | expedite | expire, expel(어려움), expend(드묾) | expire, expel, expert | expend 드묾 (explain·export는 통해서 제외) |
| v559 | carrier | barrier, carrot, carousel(드묾) | barrier, carrot, carpet | carousel 드묾 (career는 'changed careers'가 통해서 제외) |
| v560 | recipient | receipt, recipe, recital(드묾) | receipt, recipe, record | recital 드묾 |
| v561 | perishable | punishable(드묾), publishable, peaceable(드묾) | publishable, purple, polite | punishable·peaceable 드묾 |
| v562 | fragile | fragrant(어려움), frugal(드묾), agile(어려움) | fragrant, frank, fried | frugal 드묾·agile 어려움 (frozen은 통해서 제외) |
| v565 | unload | download, upload, unleash(드묾) | download, upload, uncle | unleash 드묾 |
| v566 | consolidate | console, consult, constitute(드묾) | console, consult, consider | constitute 드묾 |
| v567 | dispatch | dispose, dispel(드묾), disparage(드묾) | dispose, display, dislike | dispel·disparage 드묾 |
| v571 | physician | physicist, physique(드묾), physics | physicist, physics, photo | physique 드묾 |
| v572 | clinic | clinical, cynic(드묾), clinch(드묾) | clinical, clean, climb | cynic·clinch 드묾 |
| v573 | ward | word, award, warden(드묾) | word, award, warm | warden 드묾 |
| v574 | outpatient | inpatient, outpost(드묾), outing | inpatient, outing, outlet | outpost 드묾 |
| v576 | admit | admire, omit, emit(드묾) | admire, omit, adopt | emit 드묾 |
| v578 | referral | deferral(드묾), refusal, reversal | refusal, reversal, rental | deferral 드묾 |
| v579 | prescription | subscription, inscription(어려움), presumption(드묾) | subscription, inscription, prediction | presumption 드묾 |
| v580 | pharmacy | pharmaceutical, fallacy(드묾), pharaoh(드묾) | pharmaceutical, farm, family | fallacy·pharaoh 드묾 |
| v581 | dosage | dotage(드묾), postage, sausage | postage, sausage, garage | dotage 드묾 |
| v583 | diagnosis | diagnose, diagonal, diaphragm(드묾) | diagnose, diagonal, diamond | diaphragm 드묾 |
| v584 | treatment | treaty(드묾), treatise(드묾), treadmill | treadmill, treasure, treat | treaty·treatise 드묾 |
| v585 | surgery | surge(드묾), sorcery(드묾), surgical | surgical, sugar, sunset | surge·sorcery 드묾 (survey는 통해서 제외) |
| v588 | receptionist | receptacle(드묾), recession(어려움), receptive(드묾) | recession, recipe, rectangle | receptacle·receptive 드묾 |
| v589 | specialist | specialty, spectacle(드묾), speculation(드묾) | specialty, spectator, speaker | spectacle·speculation 드묾 |
| v590 | vaccination | vacancy, vacuum, vocation(드묾) | vacancy, vacuum, village | vocation 드묾 (vacation은 통해서 제외) |
| v596 | consent form | consensus, conscience(드묾), content | consensus, content, concert | conscience 드묾 |
| v597 | medication | meditation, mediation(드묾), dedication | meditation, dedication, medal | mediation 드묾 |
| v599 | chronic | chronicle(어려움), ironic(드묾), chronological | chronicle, chronological, comic | ironic 드묾 |
| v600 | ambulance | ambience(어려움), ambivalence(드묾), ambulatory(드묾) | ambience, ambition, amber | ambivalence·ambulatory 드묾 |
| v604 | allocate | allege(어려움), alleviate(어려움), allude(드묾) | allege, alarm, allergy | allude 드묾·alleviate 어려움 |
| v605 | attribute | contribute, distribute, attest(드묾) | contribute, distribute, attack | attest 드묾 |
| v607 | compile | comply, compel(드묾), complain | comply, complain, compete | compel 드묾 |
| v608 | compensate | complement, compete, condense(드묾) | complement, compete, complete | condense 드묾 |
| v610 | convene | convince, convey(드묾), convert | convince, convert, convenient | convey 드묾 (continue는 통해서 제외) |
| v612 | devise | devote, deviate(드묾), divide | devote, divide, delay | deviate 드묾 |
| v613 | diminish | dismiss, demolish(드묾), admonish(드묾) | dismiss, dish, diamond | demolish·admonish 드묾 |
| v614 | emphasize | empathize(드묾), energize(드묾), emancipate(드묾) | employ, emerge, empty | empathize·energize·emancipate 드묾 (email은 통해서 제외) |
| v615 | encounter | enchant(드묾), encompass(드묾), encode(드묾) | encourage, enjoy, envelope | enchant·encompass·encode 드묾 (enter는 통해서 제외) |
| v616 | exempt | exert(드묾), excerpt, attempt | excerpt, attempt, exam | exert 드묾 |
| v617 | facilitate | fascinate(어려움), facility, falsify(드묾) | fascinate, facility, factory | falsify 드묾 |
| v618 | fluctuate | flourish(드묾), fluster(드묾), punctuate(드묾) | flute, fluent, flat | flourish·fluster·punctuate 드묾 |
| v619 | hinder | hinge(드묾), hunger, wander | hunger, wander, hire | hinge 드묾 |
| v620 | incur | occur, recur(드묾), infer(드묾) | occur, income, insure | recur·infer 드묾 (include는 통해서 제외) |
| v621 | integrate | interrogate(드묾), irrigate(드묾), integrity(어려움) | integrity, interest, interview | interrogate·irrigate 드묾 |
| v622 | jeopardize | jeopardy(드묾), jostle(드묾), jealous(어려움) | jealous, journey, joke | jeopardy·jostle 드묾 |
| v623 | justify | justice, testify(드묾), gratify(드묾) | justice, jump, juice | testify·gratify 드묾 |
| v624 | minimize | maximize, memorize, mimic(드묾) | maximize, memorize, mention | mimic 드묾 |
| v625 | modify | modest, notify, mortify(드묾) | modest, notify, moderate | mortify 드묾 (model은 통해서 제외) |
| v626 | monitor | mentor(어려움), mention, monopolize(드묾) | mentor, mention, money | monopolize 드묾 |
| v627 | oversee | overseas, oversleep(드묾), overturn(드묾) | overseas, overeat, overcome | oversleep·overturn 드묾 |
| v628 | precede | proceed, recede(드묾), concede(드묾) | proceed, process, produce | recede·concede 드묾 |
| v629 | prohibit | exhibit, prohibitive(어려움), provoke(어려움) | exhibit, provoke, pronounce | prohibitive·provoke 어려움 2개 (promote·protect는 통해서 제외) |
| v630 | pursue | persuade, purse, ensue(드묾) | persuade, purse, pour | ensue 드묾 |
| v631 | enroll | enrich(드묾), unroll(드묾), enrage(드묾) | enjoy, entry, engine | enrich·unroll·enrage 드묾 |
| v632 | tuition | intuition(어려움), nutrition(어려움), tradition | intuition, tradition, tutor | intuition·nutrition 어려움 2개 |
| v633 | curriculum | curricular(드묾), curiosity, currant(드묾) | curiosity, curtain, current | curricular·currant 드묾 |
| v634 | syllabus | syllable(드묾), syllogism(드묾), asylum(드묾) | symbol, silence, salary | syllable·syllogism·asylum 드묾 |
| v635 | lecture | lecturer, lectern(드묾), legislature(드묾) | lecturer, letter, lettuce | lectern·legislature 드묾 (lesson은 통해서 제외) |
| v636 | instructor | inspector, investor, instigator(드묾) | inspector, investor, instrument | instigator 드묾 |
| v637 | transcript | transcribe(드묾), transit, transplant(드묾) | transit, translate, transport | transcribe·transplant 드묾 |
| v638 | prerequisite | perquisite(드묾), prerogative(드묾), requisition(드묾) | pressure, prescription, president | perquisite·prerogative·requisition 드묾 (preference는 통해서 제외) |
| v639 | semester | semicolon, semaphore(드묾), cemetery | semicolon, cemetery, sesame | semaphore 드묾 (seminar는 통해서 제외) |
| v640 | scholarship | scholar, citizenship(어려움), showmanship(드묾) | scholar, citizenship, ship | showmanship 드묾 |
| v641 | tutor | tailor(어려움), traitor(어려움), tenant | tailor, tenant, tower | tailor·traitor 어려움 2개 |
| v642 | seminar | seminal(드묾), similar, summary | similar, summary, sunshine | seminal 드묾 |
| v643 | diploma | diplomat, diplomacy(드묾), dilemma(어려움) | diplomat, dilemma, dinosaur | diplomacy 드묾 |
| v644 | degree | decree(드묾), degrade(드묾), agree | agree, green, deer | decree·degrade 드묾 |
| v645 | major | mayor, majority, majesty(드묾) | mayor, majority, manager | majesty 드묾 |
| v647 | undergraduate | postgraduate, alumnus(드묾), professor | postgraduate, professor, underground | alumnus 드묾 |
| v649 | credit | creed(드묾), credible(드묾), creditor | creditor, cream, crew | creed·credible 드묾 |
| v651 | grade | grace, gradient(드묾), grate(드묾) | grace, grape, grass | gradient·grate 드묾 |
| v652 | apprenticeship | apprentice(어려움), apprehension(어려움), appreciation | apprentice, appreciation, apartment | apprentice·apprehension 어려움 2개 |
| v655 | proficiency | proficient(어려움), deficiency, prophecy(드묾) | proficient, deficiency, profit | prophecy 드묾 |
| v657 | module | nodule(드묾), modulate(드묾), molecule(드묾) | model, middle, monkey | nodule·modulate·molecule 드묾 |
| v660 | trainee | trainer, retiree(드묾), trustee(드묾) | trainer, traffic, tray | retiree·trustee 드묾 |
| v661 | feasible | visible, festive, forcible(드묾) | visible, festive, famous | forcible 드묾 (flexible은 통해서 제외) |
| v662 | comprehensive | comprehensible(어려움), compulsive(어려움), comprehend(어려움) | comprehensible, company, complain | 어려움 3개 (complex는 통해서 제외) |
| v663 | subsequent | subservient(드묾), eloquent(드묾), delinquent(드묾) | subway, sequence, sunflower | subservient·eloquent·delinquent 드묾 |
| v664 | preliminary | culinary(드묾), disciplinary(어려움), legendary | disciplinary, legendary, library | culinary 드묾 |
| v665 | substantial | substandard(어려움), substitute, subtle(드묾) | substandard, substitute, subway | subtle 드묾 |
| v667 | apparent | apparel(어려움), appearance, aberrant(드묾) | apparel, appearance, apple | aberrant 드묾 |
| v668 | beneficial | beneficiary(어려움), benevolent(드묾), artificial | beneficiary, artificial, beneath | benevolent 드묾 |
| v669 | diverse | adverse(어려움), averse(어려움), diverge(드묾) | adverse, divorce, division | adverse·averse 어려움 2개, diverge 드묾 |
| v670 | exceptional | optional, conditional, fractional(드묾) | optional, conditional, national | fractional 드묾 |
| v671 | inevitable | inedible(드묾), invisible, invaluable(어려움) | invisible, invaluable, invitation | inedible 드묾 |
| v672 | meticulous | ridiculous(어려움), miraculous(드묾), metallic(어려움) | ridiculous, musical, magical | miraculous 드묾·metallic 어려움 |
| v673 | obsolete | absolute, obsessive(드묾), desolate(드묾) | absolute, obvious, object | obsessive·desolate 드묾 |
| v674 | reliable | reliant(드묾), reliance(드묾), liable | liable, religious, relaxed | reliant·reliance 드묾 |
| v675 | redundant | resident, radiant(드묾), relevant(어려움) | resident, relevant, rented | radiant 드묾 |
| v676 | stringent | strident(드묾), contingent(드묾), stagnant(드묾) | stranger, string, student | strident·contingent·stagnant 드묾 (strong은 통해서 제외) |
| v677 | versatile | volatile(어려움), fertile(드묾), versed(드묾) | volatile, vertical, version | fertile·versed 드묾 |
| v678 | imminent | eminent(드묾), prominent(어려움), permanent | prominent, permanent, immigrant | eminent 드묾 |
| v679 | accordingly | according, cordially(드묾), accidentally | according, accidentally, actually | cordially 드묾 |
| v685 | increasingly | incredibly, decreasingly(드묾), inclusively(드묾) | incredibly, increase, income | decreasingly·inclusively 드묾 |
| v686 | relatively | reluctantly(어려움), relevantly(드묾), extremely | reluctantly, extremely, really | relevantly 드묾 |
| v688 | primarily | primitively(드묾), exclusively, primary | exclusively, primary, privately | primitively 드묾 |
| v690 | mutually | mutual(어려움), mutely(드묾), multiply | mutual, multiply, musically | mutely 드묾 |
| v691 | merchandise | merchant(어려움), mercenary(드묾), mechanism | merchant, mechanism, mercy | mercenary 드묾 |
| v692 | aisle | isle, aide(어려움), idle(드묾) | isle, aid, idol | idle 드묾·aide 어려움 |
| v694 | cashier | cashew(드묾), cashmere(드묾), banker | banker, cash, casual | cashew·cashmere 드묾 |
| v696 | display | displace(드묾), dismay(드묾), disposal | disposal, discount, dispute | displace·dismay 드묾 |
| v697 | clearance sale | security clearance, sale price, clearinghouse(드묾) | security clearance, sale price, sales tax | clearinghouse 드묾 (garage sale은 통해서 제외) |
| v698 | markdown | markup, breakdown, meltdown(드묾) | markup, breakdown, market | meltdown 드묾 |
| v709 | storefront | forefront(드묾), storyline, seafront | storyline, seafront, storm | forefront 드묾 |
| v711 | franchise | frenzy(드묾), finance, freelance | finance, freelance, friendship | frenzy 드묾 |
| v712 | chain | change, chair, chant(드묾) | change, chair, chance | chant 드묾 |
| v720 | storewide | storied(드묾), store-bought, stowaway(드묾) | store-bought, story, stormy | storied·stowaway 드묾 |

## A. Day 9\~17 빈칸 시험 오답

기준은 1차와 같다 (빈칸에 넣어 말이 통하면 안 됨, 실제 단어, 철자·소리 비슷한 것 우선) + 0-2 규칙.

Day별: Day 9 9세트 · Day 10 9세트 · Day 11 9세트 · Day 12 12세트 · Day 13 8세트 · Day 14 6세트 · Day 15 7세트 · Day 16 5세트 · Day 17 2세트

| id | 단어 | 예문 | 이전 오답 | 새 오답 | 이유 |
|---|---|---|---|---|---|
| v243 | bill | The electricity bill is due on the fifteenth, so please pay it this week. | bulk, blank, bond | bulk, blank, bell | The bond is due(만기)가 통함 |
| v245 | cash flow | The company has a cash flow problem: customers pay late, so it can't pay its bills on time. | cash register, cash back, petty cash | cash register, cash back, cash prize | a cash register problem이 통함 |
| v251 | debt | (그대로) | doubt, draft, dealt | doubt, dent, dealt | paid off the draft(어음)가 통할 여지 |
| v252 | loan | (그대로) | lease, label, layer | lane, label, layer | a business lease … pay back이 애매하게 통함 |
| v254 | investment | Our $10,000 investment in new machines paid off quickly. | involvement, invention, instrument | invitation, invention, instrument | The invention paid off quickly가 통함 |
| v261 | reimbursement | (그대로) | reinforcement, requirement, replacement | refreshment, requirement, retirement | receipts for replacement(보증 교체)가 통함 |
| v262 | payroll | She handles payroll, making sure every employee is paid on the 25th. | paycheck, payload, payable | payable, parcel, pillow | She handles paychecks가 통함 |
| v263 | tax | The price includes 10 percent tax, which goes to the government. | task, text, toll | task, text, tea | The price includes toll(통행료)이 통함 |
| v265 | deficit | (그대로) | defect, deficiency, definition | defect, delivery, definition | reported a deficiency(부족)가 통함 |
| v274 | front desk | (그대로) | help desk, front door, service bell | front page, desk lamp, service bell | leave your key at the help desk/front door가 통함 |
| v277 | lobby | Let's meet in the hotel lobby at eight and walk to the restaurant together. | hobby, lodge, laundry | hobby, lobster, laptop | meet in the lodge/laundry가 통함 |
| v278 | concierge | Ask the hotel concierge to book a taxi or recommend a restaurant. | conference, consultant, contractor | conference, concert, container | Ask the consultant/contractor가 통함 |
| v280 | fare | (그대로) | fair, fee, fine | fair, fire, fine | The bus fee is two dollars가 통함 |
| v285 | passport | Please show me your passport and boarding pass at the gate. | — | 그대로 (예문으로 해결) | show me your password가 통함 → 탑승구 맥락으로 걸러냄(오답은 유지) |
| v289 | overbook | The flight was overbooked, so some passengers with tickets could not get a seat. | overlook, overload, overturn | overlook, overeat, overcook | The flight was overloaded가 통함 |
| v295 | rental car | (그대로) | rental fee, car rental desk, company car | rental fee, car rental desk, car alarm | reserved a company car가 통함 |
| v296 | traveler | Travelers flying abroad must check in two hours before departure. | trainer, trader, tracker | trailer, tractor, tracker | Traders/Trainers must check in이 통함(사람 명사는 다 들어감) |
| v298 | landmark | (그대로) | bookmark, benchmark, trademark | bookmark, benchmark, birthmark | a famous trademark가 통함 |
| v302 | assembly line | (그대로) | finish line, waiting line, phone line | finish line, punch line, waiting line | The phone line stopped for an hour가 통함 |
| v308 | efficiency | (그대로) | effectiveness, deficiency, sufficiency | effort, deficiency, sufficiency | improved effectiveness가 통함 |
| v311 | prototype | Engineers built the first prototype of the car to test the design before mass production. | stereotype, archetype, protocol | protest, prompt, protein | The protocol will be ready가 통함 |
| v317 | warehouse | The goods are stored in the warehouse until trucks deliver them to stores. | wholesale, workhouse, greenhouse | wholesale, warrior, wardrobe | stored in the greenhouse가 애매하게 통함 |
| v319 | operate | (그대로) | operator, opponent, optimize | operator, opponent, opera | The machines optimize … 가 애매하게 통함 |
| v320 | shut down | (그대로) | shut out, slow down, turn down | shut out, show off, turn down | The plant will slow down for maintenance가 통함 |
| v323 | supervise | (그대로) | supervisor, surprise, summarize | supervisor, supper, summarize | She surprised the night shift가 통함 |
| v327 | certify | (그대로) | clarify, classify, notify | clarify, certain, notify | The factory is classified for safety가 애매하게 통함 |
| v330 | subcontractor | (그대로) | subscriber, substitute, subsidiary | subscriber, subway, subsidiary | hired a substitute for the wiring가 통함 |
| v331 | software | We bought the accounting software last year, but the program needs to be updated. | hardware, firmware, freeware | hardware, firewood, freeware | accounting hardware … updated가 통할 여지 |
| v334 | database | (그대로) | datasheet, daydream, daybreak | date, daylight, daycare | kept in the datasheet이 통함 |
| v336 | server | The server crashed this morning, so nobody could open the company website. | sermon, servant, surfer | servant, survey, surfer | The surfer crashed가 통함 |
| v342 | troubleshoot | (그대로) | troublemaker, overshoot, oversee | troublemaker, treasure, overseas | oversee the issue가 통함 |
| v343 | compatible | (그대로) | comparable, comfortable, competitive | compact, comfortable, competitive | comparable with older devices가 통함 |
| v344 | interface | (그대로) | interval, interfere, internet | interval, interfere, interview | The new internet is easier to use가 애매하게 통함 |
| v347 | bandwidth | (그대로) | broadband, bandage, breadth | bandage, band, brand | use a lot of broadband가 통함 |
| v350 | subscription | (그대로) | description, prescription, inscription | description, suspicion, substance | Your prescription renews automatically가 통함 |
| v353 | settings | (그대로) | setup, settlement, sitting | seat, settlement, sitting | change this in the setup이 통함 |
| v356 | storage | (그대로) | shortage, stationery, stature | shortage, station, statue | running out of stationery가 통함 |
| v358 | sync | (그대로) | sink, sing, scan | sink, sing, sick | files will scan automatically가 애매하게 통함 |
| v359 | notification | (그대로) | notation, nomination, navigation | nation, notebook, navigation | receive a nomination by email이 통함 |
| v361 | agreement | (그대로) | arrangement, argument, amendment | ornament, argument, announcement | signed the amendment/arrangement가 통함 |
| v363 | terms | The terms of the contract, including price and length, are listed on page two. | terminals, termites, tenures | tennis, temples, tents | The terminals are listed가 통함 |
| v364 | obligation | (그대로) | objection, operation, occupation | object, operation, occupation | You have no objection to renew가 통함 |
| v366 | amend | (그대로) | attend, append, amaze | attend, amuse, amaze | append the contract가 애매하게 통함 |
| v368 | party | (그대로) | partial, partner, parcel | partial, parent, parcel | Neither partner may cancel이 통함 |
| v370 | disclosure | (그대로) | enclosure, closure, exposure | enclosure, closure, explosion | Full exposure of fees가 통함 |
| v375 | attorney | (그대로) | attendant, authority, auditor | attention, authority, audio | Our attendant/auditor reviewed the contract가 통함 |
| v383 | renewal | The renewal date of your contract is December 31, and it will continue for another year after that. | — | 그대로 (예문으로 해결) | The removal date가 통함 → 계약 맥락으로 걸러냄(오답은 유지) |
| v396 | courtesy | (그대로) | custody, currency, curiosity | custody, currency, curtain | treat every guest with curiosity가 통함 |
| v401 | concern | (그대로) | conference, consent, content | conference, consent, concert | share any content가 통함 |
| v403 | prioritize | We prioritize urgent requests, so they are handled before all others. | privatize, publicize, polarize | print, practice, publicize | We publicize urgent requests가 애매 |
| v407 | status | (그대로) | statue, statute, statistics | statue, station, stadium | check the statistics of your order가 애매 |
| v411 | rating | (그대로) | ranking, railing, raising | raincoat, railing, raising | a five-star ranking이 통함 |
| v414 | goodwill | (그대로) | goodness, godsend, guideline | goldfish, guideline, goalkeeper | a gesture of goodness가 통함 |
| v421 | safety | (그대로) | scenery, society, surgery | scenery, salary, surgery | Society is everyone's responsibility가 통함 |
| v423 | precaution | Take all the precautions, such as wearing gloves, before using the machine. | prediction, preparation, prescription | prediction, presentation, prescription | Take preparation(s)가 통함 |
| v426 | injury | No injuries were reported, and all workers left the building safely. | inquiry, industry, integrity | jury, industry, integrity | No inquiries were reported가 통함 |
| v438 | wellness | The company offers a wellness program with free yoga classes and health checks. | wilderness, willingness, weakness | window, willingness, weakness | a wilderness program이 통함 |
| v441 | premium | The monthly premium for my health insurance went up this year. | preference, prescription, presence | preference, president, presence | The monthly prescription went up이 통함 |
| v444 | ergonomic | We ordered ergonomic chairs that support your back and reduce neck pain. | economic, electronic, energetic | economic, energetic, ethnic | electronic chairs(안마 의자)가 통함 |
| v445 | fatigue | (그대로) | feature, failure, fortune | feature, furniture, fortune | Long shifts can cause failure가 통함 |
| v454 | conservation | The city funded a water conservation program to help homes use less water. | — | 그대로 (예문으로 해결) | a water construction program이 통함 → 맥락으로 걸러냄(오답은 유지) |
| v460 | disposal | Proper disposal of used batteries is required; do not throw them in the trash. | disposition, display, dispatch | discussion, display, dispatch | Proper display of batteries가 통함 |
| v465 | biodegradable | (그대로) | biological, bilingual, biannual | bicycle, bilingual, big | fully biological이 애매 |
| v476 | incentive | (그대로) | intensive, incidental, initiative | intensive, incident, instinct | offers initiatives for electric cars가 통함 |
| v477 | subsidy | (그대로) | society, subsidiary, sufficiency | society, subject, sufficiency | a government subsidiary가 통함 |
| v484 | rent | (그대로) | rest, refund, routine | rest, refund, rain | The monthly routine includes water가 애매 |
| v503 | heating | (그대로) | hearing, heading, healing | hearing, heading, headache | Healing costs가 애매 |

## B. Day 9\~17 예문이 정답을 특정하는가

| id | 단어 | 이전 예문 | 새 예문 | 새 한국어 예문 | 이유 |
|---|---|---|---|---|---|
| v241 | accounting | She works in the accounting department. | She works in the accounting department, preparing tax reports and checking expenses. | 그녀는 회계 부서에서 세금 보고서를 준비하고 비용을 확인합니다. | sales가 들어감 |
| v242 | balance | Please check your account balance. | Please check your account balance before you buy anything; you only have $20 left. | 20달러밖에 남지 않았으니 무엇을 사기 전에 계좌 잔액을 확인하세요. | number·details가 들어감 |
| v243 | bill | The bill is due on the fifteenth. | The electricity bill is due on the fifteenth, so please pay it this week. | 전기 요금 청구서 납부 기한이 15일이니 이번 주에 내 주세요. | report·rent가 들어감 |
| v244 | audit | The annual audit begins next week. | The annual audit begins next week, so accountants will check all our financial records. | 다음 주에 연례 회계 감사가 시작되어 회계사들이 모든 재무 기록을 점검합니다. | meeting·sale이 들어감 |
| v249 | asset | The building is our largest asset. | The building is our largest asset; it is worth about $5 million. | 그 건물은 약 500만 달러 가치의 우리 최대 자산입니다. | customer·problem이 들어감 |
| v250 | liability | The company reduced its liabilities. | The company reduced its liabilities by paying back most of its loans. | 회사는 대출 대부분을 갚아 부채를 줄였습니다. | costs·staff가 들어감 |
| v258 | annual | The annual report will be released soon. | The annual report, which covers the whole year, will be released soon. | 한 해 전체를 다루는 연간 보고서가 곧 나옵니다. | final·sales가 들어감 |
| v264 | surplus | The budget showed a surplus. | The budget showed a surplus because we earned more than we spent. | 번 돈이 쓴 돈보다 많아 예산에 흑자가 났습니다. | deficit(반대)이 들어감 |
| v269 | currency | What currency do you accept? | What currency do you accept here: dollars, euros, or yen? | 여기서는 달러, 유로, 엔 중 어떤 통화를 받나요? | cards·coupons가 들어감 |
| v271 | accommodation | Accommodation is provided by the company. | Accommodation is provided by the company, so you don't need to pay for a hotel. | 숙박은 회사가 제공하니 호텔비를 낼 필요가 없습니다. | Lunch·Training이 들어감 |
| v272 | book | I booked a room for two nights. | I booked a room for two nights on the hotel's website. | 호텔 웹사이트에서 2박 방을 예약했어요. | need·cleaned가 들어감 |
| v275 | amenity | The hotel offers many amenities. | The hotel offers many amenities, such as a pool, a gym, and free Wi-Fi. | 그 호텔은 수영장, 체육관, 무료 와이파이 같은 편의 시설이 많습니다. | rooms·services가 들어감 |
| v278 | concierge | Ask the concierge for directions. | Ask the hotel concierge to book a taxi or recommend a restaurant. | 택시 예약이나 식당 추천은 호텔 컨시어지에게 부탁하세요. | driver·staff가 들어감 |
| v283 | arrival | Please confirm your arrival time. | Please confirm your arrival time so we can pick you up at the airport. | 공항에 마중 나갈 수 있도록 도착 시간을 확인해 주세요. | departure(반대)가 들어감 |
| v289 | overbook | The flight was overbooked. | The flight was overbooked, so some passengers with tickets could not get a seat. | 항공편이 초과 예약되어 표가 있는 승객 일부가 자리를 얻지 못했습니다. | delayed가 들어감 |
| v299 | souvenir | I bought a souvenir for my family. | I bought a small souvenir of the Eiffel Tower to remember my trip. | 여행을 기억하려고 에펠탑 모양의 작은 기념품을 샀어요. | gift·car가 들어감 |
| v312 | batch | The first batch sold out quickly. | The first batch of 500 cookies sold out by noon, so we baked more. | 첫 생산분 쿠키 500개가 정오에 다 팔려서 더 구웠습니다. | book·product가 들어감 |
| v316 | plant | The company opened a new plant in Mexico. | The company opened a new plant in Mexico that makes 1,000 cars a day. | 회사는 하루 1,000대의 차를 만드는 새 공장을 멕시코에 열었습니다. | office·store가 들어감 |
| v393 | resolve | We resolved the issue within a day. | We resolved the issue within a day, so the customer could use the app again. | 하루 만에 문제를 해결해서 고객이 다시 앱을 쓸 수 있었습니다. | discussed·found가 들어감 |
| v415 | reassure | The manager reassured the customer. | The manager reassured the worried customer that the package would arrive tomorrow. | 매니저는 걱정하는 고객에게 소포가 내일 도착할 거라며 안심시켰습니다. | helped·called가 들어감 |
| v441 | premium | The monthly premium went up this year. | The monthly premium for my health insurance went up this year. | 건강보험 월 보험료가 올해 올랐습니다. | rent·fee가 들어감 |
| v449 | shelter | The basement serves as a shelter. | The basement serves as a shelter during storms. | 폭풍이 올 때는 지하층이 대피소로 쓰입니다. | storage·garage가 들어감 |
| v451 | sustainable | The company set sustainable growth targets. | The company set sustainable growth targets that do not harm the environment. | 회사는 환경을 해치지 않는 지속 가능한 성장 목표를 세웠습니다. | high·new가 들어감 |

## 영국식 철자 통일 (저장소 전체)

찾은 방법: -our(colour·harbour…), -ise/-isation(realise·organisation…), -re(centre·metre…), licence·programme·catalogue·enrolment·cheque·grey 등, 겹 l(travelling·cancelled·labelled…) 패턴을 data·assets·pages·index.html 전체에서 검색하고, 나온 곳마다 맥락을 확인했다.

| 곳 | 이전 | 새 철자 |
|---|---|---|
| reading rp24 지문·해설 (2곳) | cataloguing | cataloging |
| reading rp24 어휘 풀이 | catalogue | catalog |
| reading rp25 제목 | MERIDIAN HARBOUR HOTEL | MERIDIAN HARBOR HOTEL |
| reading rp25 지문 | harbour view | harbor view |
| reading rp25 이메일 주소 | meridianharbour.com | meridianharbor.com |
| reading 수강 안내 지문·어휘 풀이 (2곳) | enrolment | enrollment |
| vocab s039 delayed의 tip (공항 전광판) | Cancelled | Canceled |

그대로 둔 것: vocab tip의 '영국식 철자는 traveller / licence / programme / fulfil' 설명 4곳(영국 철자를 알려 주는 것이 목적), 코드 변수명 `dialogue`(미국에서도 표준 철자), 사람 이름 Keller.

## D. 같은 Day 뜻 겹침 재검사 (Day 1\~24 전체)

0)에서 뜻 22곳, 0-2에서 오답 281세트를 바꾼 뒤 `check-vocab.js`의 meaningOverlap을 다시 돌렸다. **새로 걸린 쌍은 없다.** 예외 목록에 있던 address↔ticket은 address 뜻에서 '처리'가 빠져 더 겹치지 않으므로, 검사가 '목록에서 지우라'고 실패시켰고 목록에서 지웠다. 이제 예외는 operate↔shut down, operate↔downtime 두 쌍이다.

## 재발 방지: 버그 심기 절차

README '검사가 실제로 잡는지 확인할 때'에 적었다. 요약하면 저장소를 임시 폴더에 복사해 그 안에서 버그를 심고 검사를 돌린 뒤 복사본을 지우고, 커밋 전에 `git status --short`·`git diff --stat`으로 의도한 파일만 바뀌었는지 본다. 이번에도 이 절차로 했다. 복사본에서 arrange 뜻을 감사 전('(일정·만남을) 잡다')으로 되돌리면 meaningOverlap이 schedule↔arrange를 잡았고, 원본 저장소에는 의도한 파일만 바뀌어 있었다.

## 판단이 필요한 항목 (2차)

| # | 종류 | 항목 | 내 판단·질문 |
|---|---|---|---|
| 1 | 0 | charge 표기 '청구하다 / 요금' (말씀하신 '청구하다; 요금'의 세미콜론 대신 데이터의 ' / ' 규칙을 씀) | 세미콜론이 꼭 필요하면 바꾸겠다 |
| 2 | 0 | in advance의 오답을 in addition·in charge·in person(숙어)으로 바꿈 | 표제어가 숙어가 되어 오답도 숙어로 맞췄다. 예문은 '적어도 2주 전에 미리 예약'으로 늘렸다 |
| 3 | 0 | adjourn 예문을 'adjourned at noon and will continue at two o'clock'으로 바꿈 | 뜻을 정회·휴회로 좁혀서, 예전 예문('끝나고 모두 집에 갔다')은 '끝내다'로 읽혔다 |
| 4 | 0-2 | 등급을 '아는 단어'로 본 경계선 단어: exposure, deficiency, sufficiency, placeholder, legality, benchmark, per capita, furthered | 중학 수준은 넘지만 토익에서 자주 보여 아는 단어로 쳤다. 더 엄격하게 할지 |
| 5 | 0-2 | '어려움' 하나를 남긴 세트: quarantine(quarter), statue(statement·status), waist(waste), gauge(glitch), fragrant(fragile), recession(receptionist), barley(barely) 등 | 철자 혼동이 목적이라 남겼다 |
| 6 | 0-2 | 아주 쉬운 단어로 바꾼 세트: penguin(pending), elephant(eligible), dinosaur(diploma), monkey(module), tiger(ticket) | 규칙(아는 단어)은 지키지만 너무 쉽게 틀린 것이 보인다. 철자가 비슷한 아는 단어가 없을 때 썼다 |
| 7 | A | traveler 오답을 trailer·tractor·tracker(사물)로 | 사람 명사는 빈칸에 다 들어가서 철자가 비슷한 사물로 했다 |
| 8 | A | 그대로 둔 애매한 오답 (Day 9\~17): statement→settlement('Your bank settlement arrives monthly'), overhead→overseas('overseas costs such as rent'), productivity→production('Worker production rose'), conveyor→converter('converter belt'), incident→inventory('report any inventory') | 문법은 맞지만 뜻이 통하지 않는다고 봤다 |
| 9 | A | passport: 오답 password는 그대로 두고 예문을 '탑승구에서 여권과 탑승권을 보여 주세요'로 바꿈 | 오답을 바꾸는 쪽이 나은지 |
| 10 | C | 오답 뜻 가운데 영국 쓰임을 적은 것: flat '평평한 / 아파트(영국)', underground '지하의 / 지하철(영국)' | 미국식 통일 원칙에 맞춰 영국 쓰임을 뺄지 |

# 3차 정리 — 오답 기준 확정, "말이 안 돼서" 지워지는 오답 교체 (2026-11-20)

## 0-1 오답 기준

- 통과 규칙: **790단어장 표제어 ∪ 그 파생형 ∪ 기초 목록**. 셋 다 아니면 교체 대상이다.
- 기초 목록(중학교 교과서 수준, 1,639개)과 파생형 판정 규칙은 `docs/basic-words.md`에 있다.
- 남은 교체 대상은 `node tools/list-unknown-distractors.js`로 본다.
- 숫자 (TOEIC Day 1부터 24까지. 생존 트랙은 일부러 틀린 표현이라 제외)
  - 기초 목록을 만든 직후: 519세트, 오답 811개
  - 아래 0-2 교체 뒤: **505세트, 오답 775개**
- "수십 세트" 규모가 아니라서 이번에는 교체하지 않고 숫자만 확인했다.

## 0-2 "말이 안 돼서" 지워지는 오답 (126세트)

- 동물·음식·몸·가구·놀이·날씨·가족처럼 업무 문장에 나올 수 없는 영역의 오답을 찾아, 790단어장의 업무 단어로 바꿨다.
- 철자가 비슷한 업무 단어가 없으면 철자를 포기하고 같은 주제의 단어를 썼다.
- 새 단어는 빈칸에 넣어 문법은 되더라도 뜻이 통하지 않는지 확인했다. 통하는 후보는 이유 칸에 "통해서 제외"로 적었다.
- 새 단어가 모두 790단어장 표제어라 뜻은 표제어 뜻을 그대로 쓴다 (뜻 누락 0).
- v255의 placeholder도 이때 바꿨다.

| id | 단어 | 전 | 후 | 이유 |
|---|---|---|---|---|
| v031 | proposal | proportion, protein, purpose | proportion, profit, purpose | protein→profit |
| v054 | brief | bright, brave, bread | bright, brave, binding | bread→binding |
| v063 | candidate | candle, candy, camera | capacity, campaign, coupon | candle·candy·camera→capacity·campaign·coupon (사람 명사는 다 통해서 사물 업무어) |
| v075 | launch | lunch, lecture, lounge | waive, lecture, lounge | lunch→waive (lease·label은 통해서 제외) |
| v106 | eligible | elegant, electric, elephant | elegant, electric, liable | elephant→liable |
| v137 | pending | permanent, persistent, penguin | permanent, persistent, punctual | penguin→punctual |
| v142 | streamline | strengthen, structure, stream | strengthen, structure, submit | stream→submit (standardize·revise는 통해서 제외) |
| v143 | tentative | territorial, technical, tennis | territorial, technical, thorough | tennis→thorough (temporary는 통해서 제외) |
| v169 | reference | reflection, refrain, refrigerator | reflection, refrain, refund | refrigerator→refund (referral은 통해서 제외) |
| v173 | performance | persistence, perfume, pepper | persistence, pharmacy, prototype | perfume·pepper→pharmacy·prototype (permit·penalty는 통해서 제외) |
| v181 | minutes | agenda, notices, mittens | agenda, notices, milestone | mittens→milestone |
| v183 | chairperson | champagne, chart, charger | chain, chart, charger | champagne→chain |
| v186 | projector | protector, protest, protein | protector, protest, probation | protein→probation |
| v188 | brainstorm | breakthrough, breakdown, breakfast | breakthrough, breakdown, restock | breakfast→restock (brief·sponsor는 통해서 제외) |
| v200 | summary | salary, surgery, summer | salary, surgery, surplus | summer→surplus (survey는 통해서 제외) |
| v204 | punctual | punctuation, particular, punch | punctuation, particular, pending | punch→pending |
| v213 | brand | blend, board, bread | blend, board, breach | bread→breach |
| v218 | trend | trade, treat, tray | trade, treat, tax | tray→tax (target은 통해서 제외) |
| v220 | brochure | branch, budget, brush | branch, budget, breach | brush→breach |
| v221 | flyer | filter, feature, flavor | filter, feature, fare | flavor→fare |
| v229 | loyalty | royalty, liability, lottery | royalty, liability, leak | lottery→leak (lodging·loan은 통해서 제외) |
| v230 | subscriber | supplier, successor, submarine | supplier, successor, supervisor | submarine→supervisor (subscription은 통해서 제외) |
| v238 | forecast | footnote, football, forehead | footnote, forklift, freight | football·forehead→forklift·freight |
| v248 | fiscal | physical, facial, famous | physical, feasible, famous | facial→feasible (annual은 통해서 제외) |
| v255 | shareholder | shoulder, placeholder, sharpener | shelter, shelf, shortage | shoulder·placeholder·sharpener→shelter·shelf·shortage (사람 명사는 다 통해서 사물 업무어) |
| v262 | payroll | payable, parcel, pillow | payable, parcel, passport | pillow→passport (personnel은 통해서 제외) |
| v263 | tax | task, text, tea | task, text, tip | tea→tip (tariff·fee는 통해서 제외. tip은 '정부로 간다'에서 뜻으로 지워진다) |
| v277 | lobby | hobby, lobster, laptop | hobby, loan, laptop | lobster→loan (lodging은 통해서 제외) |
| v278 | concierge | conference, concert, container | conference, contract, container | concert→contract |
| v286 | visa | visit, vase, vision | visit, venue, vision | vase→venue |
| v287 | boarding | bordering, bowling, borrowing | bordering, brand, borrowing | bowling→brand (training은 통해서 제외) |
| v289 | overbook | overlook, overeat, overcook | overlook, overlap, oversee | overeat·overcook→overlap·oversee |
| v296 | traveler | trailer, tractor, tracker | trend, turnover, treatment | trailer·tractor·tracker→trend·turnover·treatment (사람 명사는 다 통해서 사물 업무어) |
| v298 | landmark | bookmark, benchmark, birthmark | bookmark, benchmark, landlord | birthmark→landlord |
| v302 | assembly line | finish line, punch line, waiting line | deadline, timeline, waiting line | finish line·punch line→deadline·timeline |
| v311 | prototype | protest, prompt, protein | protest, prompt, promotion | protein→promotion (protocol은 통해서 제외) |
| v317 | warehouse | wholesale, warrior, wardrobe | wholesale, warranty, workforce | warrior·wardrobe→warranty·workforce |
| v319 | operate | operator, opponent, opera | operator, opponent, overlap | opera→overlap |
| v321 | specification | special, species, specialization | special, resignation, specialization | species→resignation (certification·specialist는 통해서 제외) |
| v323 | supervise | supervisor, supper, summarize | supervisor, subscribe, summarize | supper→subscribe |
| v325 | waste | waist, wasteful, west | waiver, wasteful, ward | waist·west→waiver·ward (warranty·asset은 통해서 제외) |
| v331 | software | hardware, firewood, freeware | hardware, staff, freeware | firewood→staff (suite는 통해서 제외) |
| v334 | database | date, daylight, daycare | date, deadline, demand | daylight·daycare→deadline·demand (device는 통해서 제외) |
| v342 | troubleshoot | troublemaker, treasure, overseas | troublemaker, restock, overseas | treasure→restock (transfer·submit은 통해서 제외) |
| v346 | firewall | fireplace, fireworks, firsthand | forecast, feedback, firsthand | fireplace·fireworks→forecast·feedback |
| v347 | bandwidth | bandage, band, brand | bandage, banquet, brand | band→banquet |
| v355 | shortcut | shortage, shortfall, short story | shortage, shortfall, shuttle | short story→shuttle (shift는 Shift 키라 제외) |
| v356 | storage | shortage, station, statue | shortage, station, status | statue→status (staff는 통해서 제외) |
| v358 | sync | sink, sing, sick | hire, vote, sick | sink·sing→hire·vote (renew·submit·launch는 통해서 제외) |
| v360 | glitch | glitter, gadget, gauge | grid, gadget, gauge | glitter→grid (policy는 통해서 제외) |
| v361 | agreement | ornament, argument, announcement | treatment, argument, announcement | ornament→treatment (attachment·agenda는 통해서 제외) |
| v363 | terms | tennis, temples, tents | terminal, tenant, tuition | tennis·temples·tents→terminal·tenant·tuition |
| v368 | party | partial, parent, parcel | partial, plant, parcel | parent→plant |
| v369 | witness | wellness, window, wireless | wellness, wiring, wireless | window→wiring (waiver는 통해서 제외) |
| v380 | waiver | waiter, water, weather | waiter, ward, waste | water·weather→ward·waste (warranty는 통해서 제외) |
| v385 | jurisdiction | justification, juice, journey | justification, notification, orientation | juice·journey→notification·orientation |
| v401 | concern | conference, consent, concert | conference, consent, consumer | concert→consumer (contract는 통해서 제외) |
| v407 | status | statue, station, stadium | staff, station, surplus | statue·stadium→staff·surplus (statement·stage는 통해서 제외) |
| v411 | rating | raincoat, railing, raising | refund, retail, raising | raincoat·railing→refund·retail |
| v414 | goodwill | goldfish, guideline, goalkeeper | grade, guideline, grid | goldfish·goalkeeper→grade·grid (guarantee는 통해서 제외) |
| v420 | ticket | toilet, tiger, tackle | target, tenant, tariff | toilet·tiger·tackle→target·tenant·tariff (terminal은 통해서 제외) |
| v422 | hazard | harbor, hamster, heritage | harbor, handout, heritage | hamster→handout |
| v429 | drill | drain, drift, dress | drain, drift, draft | dress→draft |
| v432 | ventilation | vacation, vegetation, variation | vacation, vaccination, variation | vegetation→vaccination (insulation은 통해서 제외) |
| v437 | signage | signature, sausage, sightseeing | signature, shortage, salary | sausage·sightseeing→shortage·salary (storage·slide는 통해서 제외) |
| v438 | wellness | window, willingness, weakness | wholesale, willingness, weakness | window→wholesale |
| v445 | fatigue | feature, furniture, fortune | feature, freight, fortune | furniture→freight |
| v449 | shelter | shoulder, shampoo, sheet | shelf, shift, sheet | shoulder·shampoo→shelf·shift |
| v451 | sustainable | suspicious, suspended, sunny | suspicious, suspended, toxic | sunny→toxic (substantial·sufficient·solar는 통해서 제외) |
| v458 | solar | polar, sofa, soldier | polar, seasonal, valid | sofa·soldier→seasonal·valid (toxic은 통해서 제외) |
| v465 | biodegradable | bicycle, bilingual, big | binding, bilingual, big | bicycle→binding (refundable은 통해서 제외) |
| v470 | wind power | wind tunnel, window, windshield | wind tunnel, waiver, windshield | window→waiver (wiring·wholesale은 통해서 제외) |
| v482 | tenant | tension, tennis, tent | tension, terms, terminal | tennis·tent→terms·terminal |
| v484 | rent | rest, refund, rain | rest, refund, resume | rain→resume (receipt는 통해서 제외) |
| v489 | furnished | furious, fried, funny | furious, fiscal, fragile | fried·funny→fiscal·fragile |
| v495 | plumbing | planning, publishing, plum | planning, publishing, premium | plum→premium (plant·policy는 통해서 제외) |
| v499 | corridor | cookie, calendar, curtain | courtesy, calendar, coverage | cookie·curtain→courtesy·coverage |
| v503 | heating | hearing, heading, headache | hearing, heading, rating | headache→rating (lodging은 통해서 제외) |
| v513 | booth | both, tooth, bath | both, batch, budget | tooth·bath→batch·budget (billboard는 통해서 제외) |
| v523 | organizer | organ, organic, orange | order, organic, overtime | organ·orange→order·overtime |
| v533 | lineup | linen, pickup, lemon | license, pickup, lease | linen·lemon→license·lease |
| v540 | turnout | turnover, turnaround, turtle | turnover, turnaround, tuition | turtle→tuition |
| v541 | freight | fright, fruit, free | fright, fare, free | fruit→fare |
| v545 | packing slip | pay slip, parking slot, slipper | pay slip, parking slot, payroll | slipper→payroll |
| v546 | pallet | ballot, palace, pilot | ballot, policy, profit | palace·pilot→policy·profit (shelf는 통해서 제외) |
| v547 | forklift | forecast, fork, forehead | forecast, fare, feedback | fork·forehead→fare·feedback (facility·firewall·workshop은 통해서 제외) |
| v556 | out of stock | out of touch, out of breath, out of town | out of touch, on call, out of town | out of breath→on call |
| v559 | carrier | barrier, carrot, carpet | barrier, campaign, coupon | carrot·carpet→campaign·coupon (courier·catering·cargo는 통해서 제외) |
| v561 | perishable | publishable, purple, polite | publishable, punctual, polite | purple→punctual |
| v562 | fragile | fragrant, frank, fried | fragrant, frank, fiscal | fried→fiscal (flammable은 통해서 제외) |
| v565 | unload | download, upload, uncle | download, upload, enroll | uncle→enroll (upgrade·utilize는 통해서 제외) |
| v580 | pharmacy | pharmaceutical, farm, family | pharmaceutical, policy, warranty | farm·family→policy·warranty (party는 통해서 제외) |
| v581 | dosage | postage, sausage, garage | postage, deadline, demand | sausage·garage→deadline·demand (device는 통해서 제외) |
| v584 | treatment | treadmill, treasure, treat | trend, target, treat | treadmill·treasure→trend·target (training은 통해서 제외) |
| v585 | surgery | surgical, sugar, sunset | surgical, surplus, suite | sugar·sunset→surplus·suite (survey·summary는 통해서 제외) |
| v588 | receptionist | recession, recipe, rectangle | recession, receipt, regulation | recipe·rectangle→receipt·regulation (recipient는 통해서 제외) |
| v596 | consent form | consensus, content, concert | consensus, content, conveyor | concert→conveyor (contract는 통해서 제외) |
| v597 | medication | meditation, dedication, medal | meditation, dedication, regulation | medal→regulation (position은 통해서 제외) |
| v599 | chronic | chronicle, chronological, comic | chronicle, chronological, toxic | comic→toxic |
| v600 | ambulance | ambience, ambition, amber | ambience, ambition, amenity | amber→amenity |
| v613 | diminish | dismiss, dish, diamond | dismiss, dispatch, devise | dish·diamond→dispatch·devise |
| v618 | fluctuate | flute, fluent, flat | fulfill, fluent, flat | flute→fulfill (escalate는 통해서 제외) |
| v622 | jeopardize | jealous, journey, joke | jealous, journey, notarize | joke→notarize (expire는 통해서 제외) |
| v623 | justify | justice, jump, juice | justice, install, recycle | jump·juice→install·recycle (verify·clarify·certify·assign은 통해서 제외) |
| v627 | oversee | overseas, overeat, overcome | overseas, overbook, overcome | overeat→overbook |
| v630 | pursue | persuade, purse, pour | persuade, purchase, provide | purse·pour→purchase·provide (permit은 통해서 제외) |
| v635 | lecture | lecturer, letter, lettuce | lecturer, letter, lease | lettuce→lease |
| v639 | semester | semicolon, cemetery, sesame | semicolon, shelter, server | cemetery·sesame→shelter·server (seminar·shuttle·surcharge는 통해서 제외) |
| v642 | seminar | similar, summary, sunshine | similar, summary, salary | sunshine→salary (server는 통해서 제외) |
| v643 | diploma | diplomat, dilemma, dinosaur | diplomat, dilemma, disposal | dinosaur→disposal (discount·deposit은 통해서 제외) |
| v644 | degree | agree, green, deer | agree, green, deficit | deer→deficit |
| v649 | credit | creditor, cream, crew | creditor, claim, crew | cream→claim |
| v651 | grade | grace, grape, grass | grace, grid, giveaway | grape·grass→grid·giveaway (draft는 통해서 제외) |
| v657 | module | model, middle, monkey | model, middle, margin | monkey→margin (milestone·meter·minutes는 통해서 제외) |
| v660 | trainee | trainer, traffic, tray | trainer, traffic, training | tray→training |
| v661 | feasible | visible, festive, famous | visible, flammable, famous | festive→flammable (fragile·eligible은 통해서 제외) |
| v663 | subsequent | subway, sequence, sunflower | sufficient, sequence, sustainable | subway·sunflower→sufficient·sustainable (stringent는 통해서 제외) |
| v667 | apparent | apparel, appearance, apple | apparel, appearance, adjacent | apple→adjacent (urgent는 통해서 제외) |
| v669 | diverse | adverse, divorce, division | adverse, durable, division | divorce→durable |
| v672 | meticulous | ridiculous, musical, magical | ridiculous, courteous, reluctant | musical·magical→courteous·reluctant (mandatory·accurate는 통해서 제외) |
| v689 | barely | barley, rarely, comfortably | relatively, rarely, comfortably | barley→relatively (eventually는 통해서 제외) |
| v690 | mutually | mutual, multiply, musically | mutual, multiply, primarily | musically→primarily (relatively·barely는 통해서 제외) |
| v692 | aisle | isle, aid, idol | isle, aid, asset | idol→asset |
| v709 | storefront | storyline, seafront, storm | storyline, seafront, statement | storm→statement (storage·stage는 통해서 제외) |
| v712 | chain | change, chair, chance | change, clause, chance | chair→clause (client는 통해서 제외) |
| v720 | storewide | store-bought, story, stormy | store-bought, stringent, solar | story·stormy→stringent·solar (seasonal은 통해서 제외) |

## 0-3 production ↔ productivity

- v324 productivity의 예문 "Worker productivity rose after the training."에는 production을 넣어도 말이 된다 (교육 뒤 생산량이 늘었다). 뜻으로 지워지지 않는다.
- 예문을 바꿨다: "We still make 500 chairs a week, but now with fewer working hours, so our productivity has gone up."
  - 생산량(500개)은 그대로이고 시간만 줄었으므로 production을 넣으면 앞뒤가 어긋난다.
- v161 promotion·v170 probation의 오답 production은 "a production to senior manager" 등으로 뜻이 통하지 않아 그대로 두었다.

## 0-4 새 오답 뜻이 뜻 시험 보기에 쓰이는가

- 쓰이지 않는다. 뜻 시험 보기는 `assets/js/vocab.js`의 questionChoices가 같은 Day(같은 상황), 그다음 같은 트랙의 **표제어 뜻**에서만 뽑는다.
- `VOCAB_DISTRACTOR_MEANINGS`는 단어장 상세의 "혼동 단어" 줄에만 쓰인다. 그래서 subsidy 문제에 오답 뜻이 보기로 뜰 수 없고, 검사 범위를 넓힐 필요가 없다.

# 3차 감사 — 오답 규칙 위반 교체(Day 1\~12), 사람 빈칸 규칙 5, 노트 예문 중복 검사 확대 (2026-11-20)

## 기준

오답 3개는 다음을 지킨다.

1. 빈칸에 넣으면 **뜻이 안 맞아서** 지워져야 한다. "말이 안 되는 단어라서" 지워지면 안 된다.
2. 최소 2개는 아는 단어(790단어장 ∪ 파생형 ∪ `docs/basic-words.md`)다.
3. 나머지 1개는 정답과 철자·소리가 비슷하면 모르는 단어여도 된다.
4. 철자가 비슷한 아는 단어가 없으면 철자를 포기하고 같은 주제의 업무 단어를 쓴다.
5. 사람이 들어가는 빈칸은 오답도 사람 명사로 두고, 예문을 그 사람만 해당되게 고친다.

## 위반·허용 나누기

`tools/list-unknown-distractors.js`가 이제 세트를 둘로 나눈다.

- **위반:** 모르는 오답이 2개 이상이거나, 1개인데 정답과 철자가 비슷하지 않은 세트. 출력에 ✗로 표시한다.
- **허용:** 모르는 오답이 1개이고 철자가 비슷한 세트. 기준 3번에 맞는다.
- **철자가 비슷하다:** 앞 두 글자가 같고 길이 차이가 3자 이내, 또는 뒤 세 글자가 같음, 또는 편집 거리가 긴 쪽 길이의 40% 이하.

| 시점 | 모르는 오답이 있는 세트 | 위반 | 허용 |
|---|---|---|---|
| 시작 | 481 | 234 | 247 |
| 이번 작업 뒤 | 382 | **115** (모두 Day 13 이후) | 267 |

## 교체한 세트: 149개

- Day 1부터 12까지의 위반 세트 113개
- 사람 빈칸 규칙 5 세트 36개 (Day 13 이후 21개 포함)
- 그중 예문도 고친 세트 34개
- 새 오답 단어 46개의 뜻을 `day1To12Audit3Meanings` 블록에 넣었다 (뜻 누락 0).
- 새 오답은 하나씩 빈칸에 넣어 통하는지 다시 봤다. 통하는 후보는 쓰지 않고 이유 칸에 "통해서 제외"로 적었다.

### Day 1부터 12까지의 위반 교체 (113)

| id | Day | 단어 | 전 | 후 | 이유 |
|---|---|---|---|---|---|
| v002 | 1 | attend | afford, admit, adopt | afford, admit, attack | adopt→attack |
| v003 | 1 | confirm | conform, consume, convince | conform, contact, consult | consume·convince→contact·consult (cancel은 통해서 제외) |
| v004 | 1 | require | acquire, inquire, retire | acquire, receive, retire | inquire→receive |
| v006 | 1 | schedule | section, segment, sequence | section, segment, shelter | sequence→shelter (settle은 'settled for Monday'로 통해서 제외) |
| v010 | 1 | deadline | headline, deadlock, outline | deposit, delay, outline | headline·deadlock→deposit·delay (demand는 'meet the demand'로 통해서 제외) |
| v012 | 1 | receive | relieve, deceive, reverse | relieve, reserve, revise | deceive·reverse→reserve·revise (remove는 통해서 제외) |
| v016 | 1 | arrange | arise, assign, assume | arrive, assign, arise | assume→arrive (agree는 'agree a meeting'으로 통해서 제외) |
| v028 | 1 | announcement | annoyance, achievement, attainment | annoyance, attachment, amount | achievement·attainment→attachment·amount (appointment·argument·agreement·advertisement는 통해서 제외) |
| v029 | 1 | attach | attack, attain, attempt | attack, attend, attain | attempt→attend |
| v030 | 1 | temporary | temporal, contemporary, voluntary | voluntary, mandatory, durable | temporal·contemporary→mandatory·durable (preliminary는 통해서 제외) |
| v034 | 2 | budget | bulletin, burden, bundle | bulletin, button, bridge | burden·bundle→button·bridge (deadline은 'went over deadline'으로 통해서 제외) |
| v035 | 2 | estimate | estate, eliminate, evaluate | estate, evaluate, exhibit | eliminate→exhibit (invoice는 통해서 제외) |
| v038 | 2 | deliver | deliberate, delegate, delight | delegate, devise, delight | deliberate→devise (decide·delay·design·deposit은 통해서 제외) |
| v039 | 2 | facility | faculty, familiarity, feasibility | faculty, fatigue, liability | familiarity·feasibility→fatigue·liability |
| v041 | 2 | issue | isolate, income, initial | income, injury, isolate | initial→injury (invoice·island는 통해서 제외) |
| v042 | 2 | notify | nominate, negotiate, neglect | notarize, negotiate, nominate | neglect→notarize |
| v043 | 2 | policy | politics, portion, position | police, position, poster | politics·portion→police·poster |
| v057 | 2 | efficient | affluent, sufficient, deficient | sufficient, expensive, deficient | affluent→expensive ('less time and fewer materials'와 어긋나 뜻으로 지워진다. effective는 통해서 제외) |
| v059 | 2 | shortly | slightly, strictly, sharply | sharply, softly, slightly | strictly→softly |
| v062 | 3 | assign | assist, assume, assure | assist, assess, assume | assure→assess (sign은 통해서 제외) |
| v073 | 3 | implement | import, imply, impress | imagine, invest, import | imply·impress→imagine·invest (install은 통해서 제외) |
| v076 | 3 | negotiate | navigate, nominate, notify | notify, decorate, navigate | nominate→decorate (estimate는 통해서 제외) |
| v078 | 3 | participate | perform, persuade, proceed | perform, practice, proceed | persuade→practice |
| v079 | 3 | permit | permanent, persist, prevent | pending, print, promote | permanent·persist·prevent→pending·print·promote (not prevented·not permanent·not perfect는 통해서 제외) |
| v084 | 3 | revise | reveal, revive, reverse | reveal, reserve, retire | revive·reverse→reserve·retire (review는 통해서 제외) |
| v091 | 4 | accurate | accustomed, advanced, apparent | apparent, absent, active | accustomed·advanced→absent·active (accepted는 통해서 제외) |
| v099 | 4 | beverage | leverage, barrier, average | average, coverage, beach | leverage·barrier→coverage·beach |
| v102 | 4 | consult | conduct, consist, contain | contain, contact, concern | conduct·consist→contact·concern |
| v107 | 4 | exceed | exclude, execute, exhibit | excuse, execute, exhibit | exclude→excuse |
| v111 | 4 | itinerary | inventory, interior, interval | inventory, injury, library | interior·interval→injury·library (inquiry는 통해서 제외) |
| v112 | 4 | mandatory | manual, marginal, maximum | manual, temporary, complimentary | marginal·maximum→temporary·complimentary ('so no one can skip it'과 어긋나 뜻으로 지워진다) |
| v113 | 4 | obtain | observe, obstacle, occupy | occupy, object, outline | observe·obstacle→object·outline (offer는 통해서 제외) |
| v114 | 4 | occupy | obtain, observe, operate | obtain, operate, order | observe→order |
| v118 | 4 | renovate | innovate, rotate, remind | repeat, report, remind | innovate·rotate→repeat·report (relocate·remove·replace·reserve는 통해서 제외) |
| v120 | 4 | verify | vary, violate, visualize | void, vote, version | vary·violate·visualize→void·vote·version (visit·certify는 통해서 제외) |
| v121 | 5 | acknowledge | accomplish, accumulate, accompany | accompany, access, accommodate | accomplish·accumulate→access·accommodate (accept는 통해서 제외) |
| v128 | 5 | duplicate | duration, dynamic, durable | durable, deficit, delegate | duration·dynamic→deficit·delegate (device·diploma는 통해서 제외) |
| v130 | 5 | entitle | entire, entry, entertain | entire, enter, enforce | entry·entertain→enter·enforce |
| v132 | 5 | feedback | forecast, framework, foundation | forecast, fee, facility | framework·foundation→fee·facility (feeling은 통해서 제외) |
| v135 | 5 | outlet | outcome, outlook, output | output, outline, order | outcome·outlook→outline·order (office는 통해서 제외) |
| v137 | 5 | pending | permanent, persistent, punctual | punctual, perishable, polite | permanent·persistent→perishable·polite (perfect는 통해서 제외) |
| v138 | 5 | prompt | prosper, prop, pump | proud, profit, promise | prosper·prop·pump→proud·profit·promise (prior·private는 통해서 제외) |
| v143 | 5 | tentative | territorial, technical, thorough | thorough, defective, entire | territorial·technical→defective·entire |
| v144 | 5 | thorough | through, throughout, thorn | through, thirsty, thought | throughout·thorn→thirsty·thought |
| v145 | 5 | utilize | uphold, upload, usual | unload, upload, usual | uphold→unload (upgrade는 통해서 제외) |
| v146 | 5 | valid | valley, variable, various | valley, versatile, vacation | variable·various→versatile·vacation (void·visible·valuable은 통해서 제외) |
| v155 | 6 | interview | interval, interfere, intervene | invest, invoice, incur | interval·interfere·intervene→invest·invoice·incur (invite·inform은 통해서 제외) |
| v158 | 6 | position | portion, possession, petition | pollution, provision, physician | portion·possession·petition→pollution·provision·physician (promotion·post·policy는 통해서 제외) |
| v165 | 6 | full-time | full-scale, full-blown, full-size | full-size, part-time, furnished | full-scale·full-blown→part-time·furnished ('40 hours a week'와 어긋나 뜻으로 지워진다) |
| v168 | 6 | personnel | personal, persuasion, perspective | personal, passenger, perishable | persuasion·perspective→passenger·perishable (performance·pharmacy는 통해서 제외) |
| v169 | 6 | reference | reflection, refrain, refund | refund, receipt, revenue | reflection·refrain→receipt·revenue |
| v172 | 6 | training | traitor, trailing, translating | tradition, traffic, treatment | traitor·trailing·translating→tradition·traffic·treatment |
| v174 | 6 | raise | rinse, race, range | race, ride, rating | rinse·range→ride·rating (rise는 영국식 pay rise로 통해서 제외) |
| v176 | 6 | turnover | takeover, leftover, handover | tutor, traveler, tower | takeover·leftover·handover→tutor·traveler·tower (transfer·tuition·target은 통해서 제외) |
| v180 | 6 | headquarters | headline, headphone, heading | hardware, headphone, heading | headline→hardware |
| v185 | 7 | handout | handshake, handwriting, handling | handling, hazard, habit | handshake·handwriting→hazard·habit (handle·hat은 통해서 제외) |
| v188 | 7 | brainstorm | breakthrough, breakdown, restock | restock, transport, brand | breakthrough·breakdown→transport·brand (bring은 통해서 제외) |
| v189 | 7 | consensus | conference, consequence, construction | conference, concern, contest | consequence·construction→concern·contest |
| v192 | 7 | reschedule | research, resource, resemble | research, recycle, reduce | resource·resemble→recycle·reduce (reserve·resume은 통해서 제외) |
| v194 | 7 | follow-up | follower, fellow, fallen | follower, fellow, full-time | fallen→full-time (foolish는 통해서 제외) |
| v195 | 7 | milestone | millstone, mileage, mailbox | mailbox, mistake, message | millstone·mileage→mistake·message (meeting은 통해서 제외) |
| v196 | 7 | timeline | timeout, headline, deadline | deadline, ticket, title | timeout·headline→ticket·title (outline은 통해서 제외) |
| v197 | 7 | priority | property, probability, prosperity | property, profit, prototype | probability·prosperity→profit·prototype (policy·promise는 통해서 제외) |
| v199 | 7 | outline | outlet, outlook, outcome | outlet, obtain, postpone | outlook·outcome→obtain·postpone (utilize는 통해서 제외) |
| v202 | 7 | availability | ability, accountability, visibility | ability, liability, facility | accountability·visibility→liability·facility |
| v203 | 7 | absence | abstract, abundance, acceptance | acceptance, audience, asset | abstract·abundance→audience·asset (attendance·agenda·arrival은 통해서 제외) |
| v204 | 7 | punctual | punctuation, particular, pending | punctuation, popular, pending | particular→popular (polite는 통해서 제외) |
| v208 | 7 | clarify | classify, certify, qualify | certify, carry, charge | classify·qualify→carry·charge (clear·claim·click은 통해서 제외) |
| v221 | 8 | flyer | filter, feature, fare | fare, floor, fee | filter·feature→floor·fee (flower·flag는 통해서 제외) |
| v224 | 8 | publicity | publication, population, possibility | publication, policy, pollution | population·possibility→policy·pollution (priority는 통해서 제외) |
| v225 | 8 | slogan | solution, salary, session | solution, salary, loan | session→loan (slide·login·sign은 통해서 제외) |
| v226 | 8 | logo | load, lodge, loop | load, loan, lobby | lodge·loop→loan·lobby (lock·login은 통해서 제외) |
| v227 | 8 | questionnaire | quotation, qualification, quarantine | qualification, quarter, queue | quotation·quarantine→quarter·queue |
| v228 | 8 | awareness | agreement, assurance, allowance | agreement, allowance, address | assurance→address (access는 통해서 제외) |
| v232 | 8 | billboard | bulletin, blackboard, billion | binding, blackboard, billion | bulletin→binding (board·balloon은 통해서 제외) |
| v233 | 8 | commercial | committee, commission, commitment | complaint, competitor, courier | committee·commission·commitment→complaint·competitor·courier (comedy·concert는 통해서 제외) |
| v234 | 8 | giveaway | getaway, giveback, takeaway | grade, renewal, delay | getaway·giveback·takeaway→grade·renewal·delay (gift는 통해서 제외) |
| v236 | 8 | profit | project, portfolio, program | project, program, promise | portfolio→promise (product는 통해서 제외) |
| v237 | 8 | revenue | revision, reverse, reunion | revision, rescue, resume | reverse·reunion→rescue·resume (refund·renewal·reserve는 통해서 제외) |
| v241 | 9 | accounting | accountant, accordance, accumulation | accountant, access, accent | accordance·accumulation→access·accent (accident는 통해서 제외) |
| v242 | 9 | balance | ballot, barrier, bargain | bargain, batch, barcode | ballot·barrier→batch·barcode |
| v244 | 9 | audit | adopt, admit, adapt | asset, admit, adapt | adopt→asset |
| v251 | 9 | debt | doubt, dent, dealt | doubt, desk, delay | dent·dealt→desk·delay (deal·deposit은 통해서 제외) |
| v253 | 9 | interest rate | exchange rate, growth rate, success rate | exchange rate, early-bird rate, hourly rate | growth rate·success rate→early-bird rate·hourly rate |
| v258 | 9 | annual | manual, casual, usual | manual, usual, punctual | casual→punctual (final은 통해서 제외) |
| v260 | 9 | transaction | transition, translation, transmission | translation, training, tradition | transition·transmission→training·tradition (transfer는 통해서 제외) |
| v270 | 9 | exchange rate | interest rate, growth rate, flat rate | interest rate, hourly rate, early-bird rate | growth rate·flat rate→hourly rate·early-bird rate |
| v271 | 10 | accommodation | accumulation, acceleration, accreditation | accumulation, action, ambition | acceleration·accreditation→action·ambition |
| v273 | 10 | check-out | checkup, checklist, checkpoint | checkup, chat, chart | checklist·checkpoint→chat·chart |
| v275 | 10 | amenity | ability, academy, anonymity | ability, agenda, amount | academy·anonymity→agenda·amount (activity는 통해서 제외) |
| v284 | 10 | terminal | technical, territorial, temporal | tenant, testimonial, team | technical·territorial·temporal→tenant·testimonial·team |
| v288 | 10 | luggage | language, league, lounge | language, lease, leave | league·lounge→lease·leave (license·lunch는 통해서 제외) |
| v293 | 10 | per diem | per capita, per hour, per unit | per capita, debt, drill | per hour·per unit→debt·drill (policy·deposit·diary는 통해서 제외) |
| v294 | 10 | lodging | loading, logging, lodge fee | loading, loyalty, login | logging·lodge fee→loyalty·login. 예문에 호텔 영수증을 넣어 loading을 뜻으로 거른다 |
| v298 | 10 | landmark | bookmark, benchmark, landlord | landlord, lawsuit, lawyer | bookmark·benchmark→lawsuit·lawyer |
| v300 | 10 | duty-free | duty-bound, toll-free, free-of-charge | durable, diverse, free-of-charge | duty-bound·toll-free→durable·diverse |
| v301 | 11 | manufacture | manufacturer, manual, management | manufacturer, malfunction, management | manual→malfunction (manage·measure·machine은 통해서 제외) |
| v303 | 11 | defective | detective, decisive, descriptive | detective, departure, delegate | decisive·descriptive→departure·delegate. 예문에 고장 사유를 넣었다 (dedicated는 통해서 제외) |
| v304 | 11 | inspection | injection, infection, inspiration | injection, instruction, insulation | infection·inspiration→instruction·insulation. 예문에 '기계를 전부 점검'을 넣었다 (interview·incentive·inventory·installment는 통해서 제외) |
| v306 | 11 | output | outlet, outlook, outcome | outlet, outline, object | outlook·outcome→outline·object. 예문에 하루 생산 수를 넣었다 |
| v308 | 11 | efficiency | effort, deficiency, sufficiency | effort, emergency, expense | deficiency·sufficiency→emergency·expense (proficiency는 통해서 제외) |
| v309 | 11 | raw material | raw data, raw score, rare material | raw data, margin, markup | raw score·rare material→margin·markup |
| v313 | 11 | durable | portable, valuable, dual | valuable, capable, liable | portable·dual→capable·liable |
| v315 | 11 | safety gear | safety net, safety rule, spare gear | safety rule, safety drill, safety goal | safety net·spare gear→safety drill·safety goal |
| v328 | 11 | automate | automatic, autonomy, automobile | automatic, attach, accommodate | autonomy·automobile→attach·accommodate. 예문에 로봇을 넣었다 (authorize·audit·estimate는 통해서 제외) |
| v329 | 11 | downtime | downturn, downside, downtown | downtown, dosage, deadline | downturn·downside→dosage·deadline (overtime·doubt는 통해서 제외) |
| v333 | 12 | backup | breakup, backpack, backlog | backpack, banquet, barcode | breakup·backlog→banquet·barcode (batch는 통해서 제외) |
| v340 | 12 | attachment | attainment, achievement, adjustment | attendee, attorney, attention | attainment·achievement·adjustment→attendee·attorney·attention. 예문에 'to your email'을 넣었다 (apartment·statement·agreement는 통해서 제외) |
| v341 | 12 | crash | clash, cash, crush | cash, cross, crowd | clash·crush→cross·crowd |
| v344 | 12 | interface | interval, interfere, interview | interview, insurance, incentive | interval·interfere→insurance·incentive. 예문에 버튼·메뉴를 넣었다 (invoice·inventory는 통해서 제외) |
| v350 | 12 | subscription | description, suspicion, substance | description, supervisor, surplus | suspicion·substance→supervisor·surplus (prescription은 통해서 제외) |
| v354 | 12 | technical support | technical issue, technical skill, technical term | technical issue, physical therapy, first aid | technical skill·technical term→physical therapy·first aid. 예문에 컴퓨터를 넣었다 (quality control·front desk는 통해서 제외) |
| v360 | 12 | glitch | grid, gadget, gauge | grid, gift, gate | gadget·gauge→gift·gate |

### 사람 빈칸 규칙 5 (36)

| id | Day | 단어 | 전 | 후 | 이유 |
|---|---|---|---|---|---|
| v219 | 8 | competitor | contributor, coordinator, collaborator | supplier, consumer, colleague | 규칙 5: contributor·coordinator·collaborator→supplier·consumer·colleague. 'so we lost some customers to them'이 경쟁사만 맞게 한다 |
| v008 | 1 | employee | employer, employment, applicant | employer, applicant, customer | 규칙 5: employment→customer. 'in their first week at work'가 직원만 맞게 한다 |
| v009 | 1 | customer | custom, costume, cluster | supplier, competitor, cashier | 규칙 5: custom·costume·cluster→supplier·competitor·cashier. 예문을 '우리 물건을 사던 쪽'만 맞게 바꿨다 |
| v047 | 2 | supervisor | supplier, supervision, supporter | supplier, subscriber, customer | 규칙 5: supervision·supporter→subscriber·customer. 예문에 '승인하고 일정을 고친다'를 넣었다 (colleague는 통해서 제외) |
| v055 | 2 | client | clinic, climate, cliff | clerk, colleague, competitor | 규칙 5: clinic·climate·cliff→clerk·colleague·competitor. 예문을 '변호사에게 돈을 내는 사람'만 맞게 바꿨다 |
| v063 | 3 | candidate | capacity, campaign, coupon | employee, supplier, customer | 규칙 5: capacity·campaign·coupon→employee·supplier·customer. 예문에 '그중 한 명을 채용'을 넣었다 (applicant는 통해서 제외) |
| v094 | 4 | applicant | appliance, application, appointment | attendee, attorney, employee | 규칙 5: appliance·application·appointment→attendee·attorney·employee. 예문에 '채용 대상이 되려면'을 넣었다 |
| v147 | 5 | vendor | venue, version, vending | visitor, volunteer, tenant | 규칙 5: venue·version·vending→visitor·volunteer·tenant. 'to supply our office paper'가 공급업체만 맞게 한다 (supplier는 통해서 제외) |
| v167 | 6 | staff | stuff, stack, stage | stranger, supplier, shareholder | 규칙 5: stuff·stack·stage→stranger·supplier·shareholder. 예문에 '새 근무표'를 넣었다 |
| v182 | 7 | attendee | attendance, attention, attempt | attendant, attorney, applicant | 규칙 5: attendance·attention·attempt→attendant·attorney·applicant. 예문에 'of the workshop'을 넣었다 |
| v183 | 7 | chairperson | chain, chart, charger | cashier, chef, customer | 규칙 5: chain·chart·charger→cashier·chef·customer. 예문을 회의 진행자만 맞게 바꿨다 |
| v255 | 9 | shareholder | shelter, shelf, shortage | employee, customer, supplier | 규칙 5: shelter·shelf·shortage→employee·customer·supplier. 사용자가 준 예문 그대로 |
| v278 | 10 | concierge | conference, contract, container | cashier, chef, competitor | 규칙 5: conference·contract·container→cashier·chef·competitor. '택시 예약·식당 추천'이 컨시어지만 맞게 한다 (receptionist는 통해서 제외) |
| v296 | 10 | traveler | trend, turnover, treatment | landlord, supplier, trainer | 규칙 5: trend·turnover·treatment→landlord·supplier·trainer. 'flying abroad'는 사람이면 누구나 통해서 예문을 여행자 전용으로 바꿨다 |
| v330 | 11 | subcontractor | subscriber, subway, subsidiary | subscriber, shareholder, supervisor | 규칙 5: subway·subsidiary→shareholder·supervisor. 예문에 '배선을 직접 한다'를 넣었다 (supplier는 통해서 제외) |
| v369 | 13 | witness | wellness, wiring, wireless | waiter, winner, walk-in | 규칙 5: wellness·wiring·wireless→waiter·winner·walk-in. 예문에 증인이 하는 일을 넣었다 |
| v375 | 13 | attorney | attention, authority, audio | attendee, author, applicant | 규칙 5: attention·authority·audio→attendee·author·applicant. 예문에 '법적 문제'를 넣었다 (auditor는 통해서 제외) |
| v388 | 13 | counterpart | counteroffer, countdown, counter | colleague, courier, customer | 규칙 5: counteroffer·countdown·counter→colleague·courier·customer. 예문에 '상대 회사에서 같은 일을 하는'을 넣었다 (cousin은 통해서 제외) |
| v405 | 14 | representative | reputation, restoration, registration | recipient, reporter, rival | 규칙 5: reputation·restoration·registration→recipient·reporter·rival. 예문에 '고객 서비스'를 넣었다 (receptionist는 통해서 제외) |
| v418 | 14 | walk-in | walkway, walkout, workout | waiter, worker, witness | 규칙 5: walkway·walkout·workout→waiter·worker·witness. 예문에 '예약 없이 와도 된다'를 넣었다 |
| v482 | 17 | tenant | tension, terms, terminal | landlord, tourist, visitor | 규칙 5: tension·terms·terminal→landlord·tourist·visitor. 예문에 '월세를 낸다'를 넣었다 (직업 명사는 세입자일 수 있어 제외) |
| v483 | 17 | landlord | landmark, landscape, landing | tenant, visitor, trainee | 규칙 5: landmark·landscape·landing→tenant·visitor·trainee. 예문에 '건물을 소유한'을 넣었다 (lawyer는 건물주일 수 있어 제외) |
| v523 | 18 | organizer | order, organic, overtime | attendee, audience, visitor | 규칙 5: order·organic·overtime→attendee·audience·visitor. 예문에 '신청자가 많아서'를 넣었다 (speaker·operator는 통해서 제외) |
| v536 | 18 | exhibitor | extinguisher, excerpt, exit | attendee, explorer, spectator | 규칙 5: extinguisher·excerpt·exit→attendee·explorer·spectator. 예문에 '부스 설치'와 관람객 입장을 넣었다 (employee·expert는 통해서 제외) |
| v543 | 19 | courier | courteous, career, courage | customer, cashier, coach | 규칙 5: courteous·career·courage→customer·cashier·coach. 예문에 '택배 회사에서 온'을 넣었다 |
| v560 | 19 | recipient | receipt, recipe, record | receptionist, driver, rival | 규칙 5: receipt·recipe·record→receptionist·driver·rival. 예문에 '라벨에 이름이 적힌'을 넣었다 |
| v571 | 20 | physician | physicist, physics, photo | physicist, patient, pilot | 규칙 5: physics·photo→patient·pilot. '목을 진찰하고 검사를 권했다'가 의사만 맞게 한다 |
| v574 | 20 | outpatient | inpatient, outing, outlet | inpatient, physician, receptionist | 규칙 5: outing·outlet→physician·receptionist. 예문의 An ___이 모음으로 시작하는 보기만 남기는 단서라 'A hospital ___'로 바꿨다 |
| v575 | 20 | inpatient | impatient, input, patent | outpatient, inspector, instructor | 규칙 5: impatient·input·patent→outpatient·inspector·instructor. 예문에 '밤을 보낸다'를 넣었다 |
| v588 | 20 | receptionist | recession, receipt, regulation | recipient, reporter, patient | 규칙 5: recession·receipt·regulation→recipient·reporter·patient. 예문에 '접수처'와 진료를 넣었다 |
| v589 | 20 | specialist | specialty, spectator, speaker | spectator, speaker, supplier | 규칙 5: specialty→supplier. 'A heart ___ visits this clinic'은 전문의만 맞는다 (patient는 통해서 제외) |
| v636 | 22 | instructor | inspector, investor, instrument | inspector, investor, inventor | 규칙 5: instrument→inventor. '운동을 시범 보이고 자세를 고쳐 줬다'가 강사만 맞게 한다 |
| v641 | 22 | tutor | tailor, tenant, tower | tailor, tenant, trader | 규칙 5: tower→trader. '수학 숙제를 도와준다'가 과외 교사만 맞게 한다 |
| v648 | 22 | faculty | facility, faucet, difficulty | family, fan, farmer | 규칙 5: facility·faucet·difficulty→family·fan·farmer. 예문에 '교수 전원으로 이루어진'을 넣었다 |
| v694 | 24 | cashier | banker, cash, casual | banker, captain, cleaner | 규칙 5: cash·casual→captain·cleaner. '물건을 스캔하고 쿠폰을 묻는다'가 계산원만 맞게 한다 (customer는 셀프 계산대로 통해서 제외) |
| v708 | 24 | floor staff | floor plan, floor lamp, staff room | shareholder, landlord, pilot | 규칙 5: floor plan·floor lamp·staff room→shareholder·landlord·pilot. '질문에 답하고 진열대를 정리'가 매장 직원만 맞게 한다 (cashier는 통해서 제외) |

규칙 5에서 뺀 세트

| 세트 | 이유 |
|---|---|
| v169 reference | '추천서'라는 사물 뜻도 있어 사물 오답(refund·receipt·revenue)을 둔다 |
| v230 subscriber, v656 facilitator | 이미 사람 오답이고 예문으로 걸러진다 |
| v168 personnel, v180 headquarters, v354 technical support | 사람이 아니라 부서·조직이다 |

### 예문을 고친 세트 (34)

| id | 단어 | 전 | 후 |
|---|---|---|---|
| v294 | lodging | Lodging expenses are reimbursed. | Lodging expenses are reimbursed, so keep your hotel receipts. |
| v303 | defective | The defective units were returned. | The defective units were returned because they stopped working after one day. |
| v304 | inspection | The annual inspection is scheduled for May. | The annual safety inspection is scheduled for May, when every machine will be checked. |
| v306 | output | Output increased by fifteen percent. | Output increased by fifteen percent, so the factory now makes 1,150 chairs a day. |
| v328 | automate | We automated the packing process. | We automated the packing process, so robots now do the work that ten people used to do. |
| v340 | attachment | I couldn't open the attachment. | I couldn't open the attachment to your email. |
| v344 | interface | The new interface is easier to use. | The new interface is easier to use, with bigger buttons and a clearer menu. |
| v354 | technical support | Contact technical support for help. | Contact technical support if your computer will not start. |
| v009 | customer | The customer returned the shoes to the store and asked for a refund. | We lost our biggest customer when a hotel chain started buying its towels from another company. |
| v047 | supervisor | If you need a day off, please ask your supervisor. | If you need a day off, ask your supervisor, who will approve it and update the schedule. |
| v055 | client | Our lawyer has a meeting with a new client who needs legal advice. | The lawyer charges each client $200 an hour for legal advice. |
| v063 | candidate | We interviewed five candidates for the open position. | We interviewed five candidates for the open position and will hire one of them next week. |
| v094 | applicant | All applicants must submit a resume. | All applicants must submit a résumé by May 1 to be considered for the job. |
| v167 | staff | All staff must attend the meeting. | All staff must attend the meeting, because the manager will explain the new work schedule. |
| v182 | attendee | All attendees received a handout. | All attendees of the workshop received a handout when they came in. |
| v183 | chairperson | The chairperson ran the meeting and asked members to vote on the proposal. | As chairperson, Ms. Ortiz ran the meeting and asked the board members to vote. |
| v255 | shareholder | The shareholders approved the merger. | Shareholders receive dividends twice a year. |
| v296 | traveler | Travelers flying abroad must check in two hours before departure. | This guidebook has tips for travelers, such as how to change money and use the subway in each city. |
| v330 | subcontractor | We hired a subcontractor for the wiring. | We hired a subcontractor to do the wiring because our own staff could not finish it in time. |
| v369 | witness | The signature requires a witness. | A witness must watch you sign the contract and then sign it too. |
| v375 | attorney | Our attorney reviewed the contract before we signed it. | Our attorney reviewed the contract and told us which clauses could cause legal problems. |
| v388 | counterpart | I'll discuss it with my counterpart. | I'll discuss the price with my counterpart at the other company, who has the same job as me there. |
| v405 | representative | A representative will call you shortly. | A customer service representative will call you shortly to answer your question about the bill. |
| v418 | walk-in | We accept walk-ins after two o'clock. | We accept walk-ins after two o'clock, so you can come without a reservation. |
| v482 | tenant | The new tenant will move in on June 1. | The new tenant will move in on June 1 and pay rent to the building owner every month. |
| v483 | landlord | The landlord agreed to repaint the walls. | The landlord, who owns the building, agreed to repaint the walls before the new renter moves in. |
| v523 | organizer | The organizers added a second session. | The organizers of the conference added a second session because so many people signed up. |
| v536 | exhibitor | Exhibitors may set up from 7 A.M. | Exhibitors may set up their booths from 7 A.M., and visitors are allowed in at nine. |
| v543 | courier | A courier will pick up the documents at four. | A courier from the delivery company will pick up the documents at four and take them to the airport. |
| v560 | recipient | The recipient must sign for the package. | The recipient, whose name is on the delivery label, must sign for the package when it arrives. |
| v574 | outpatient | An outpatient does not stay overnight in the hospital. | A hospital outpatient comes in for treatment and goes home the same day. |
| v575 | inpatient | Inpatients wear a wristband with their name and date of birth. | Inpatients stay in the hospital overnight and wear a wristband with their name and date of birth. |
| v588 | receptionist | The receptionist will call your name when it is your turn. | The receptionist at the front desk will call your name when it is your turn to see the doctor. |
| v648 | faculty | The faculty voted to add a new elective. | The faculty, made up of all the professors in the department, voted to add a new elective. |

## 0. 지난 판단 반영 (문법)

| 항목 | 한 일 |
|---|---|
| 구어 변형 | q016 were·q086 me·q180 less·q059 in은 그대로 둔다 (토익 함정 자체) |
| q006 | 오답 account → accountably. account department는 실제로 쓰이는 말이라 결함이었다. accountable도 'the accountable department'(책임 부서)로 통해서 쓰지 않았다 |
| g06 예문 | "Please direct your questions to Ms. Kim." → "Please direct all complaints to our service desk." |
| 노트 예문 중복 검사 | 범위를 넓혔다 (`notePassageOverlap`). 아래 참고 |

### 넓힌 중복 검사

- 노트 영어 문장(예문 good과 설명 속 문장)을 다음과 대조한다: Part 6 지문(빈칸에 정답을 채운 문장), Part 7 지문, Part 1 보기, Part 2 질문·보기, Part 3·4 스크립트, 받아쓰기 문장.
- 대상 문장은 748개다.
- **Part 6 문법 빈칸:** 문법 문항과 같은 기준(정답이 드러나는지까지)으로 본다. 어휘 빈칸은 정답이 흔한 명사 하나라(enough room) 정답이 그대로 나오는지는 보지 않는다.
- **나머지:** 지문 문장이 길어 두 단어 겹침은 흔하다. 그래서 내용어 3개 이상이 겹치거나 문장 틀이 겹칠 때만 실패로 본다.
- 버그 심기: 저장소 복사본에서 옛 g06 예문을 되살리니 "Part 6 p601 빈칸 4"로 실패했다.

새로 걸린 겹침과 고친 노트 문장

| 노트 | 전 | 겹친 곳 | 후 |
|---|---|---|---|
| g06 trap | Please direct your questions to Ms. Kim. | Part 6 p601 빈칸 4 "Please direct any questions ___ the facilities manager." | Please direct all complaints to our service desk. |
| g06 예문 | The flight was delayed for three hours. | 받아쓰기 d14 "The flight has been delayed by two hours." | The train was delayed for forty minutes. |
| g14 예문 | You may pay by credit card or in cash. | Part 2 p226 "Can I pay by credit card?" | You may pay by check or in cash. |
| g05 예문 | I want to go. | Part 4 pt407 "I want to go over the results" | I want to rest. |
| g04 예문 | The garden will be watered tonight. | Part 7 rp15 "The garden will be free to enter" | The plants will be watered tonight. |
