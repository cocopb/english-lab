// Part 1 사진 묘사 (24문항). img는 저장소 루트 기준 경로, kind는 people(사람 중심) / objects(사물·풍경).
// 선택지 문장은 음성으로만 들려주고, 채점 뒤에만 글자로 보여 준다. 사진 alt는 화면 코드가 "Part 1 사진 N"으로 붙인다(장면 설명 금지).
window.PART1 = [
  {
    id: "ph01", img: "assets/img/part1/ph01.jpg", kind: "people",
    choices: [
      "They're putting away some documents.",
      "They're leaning over a table.",
      "They're painting a wall.",
      "They're waiting in line."
    ],
    answer: 1,
    explanation: "두 사람이 테이블에 손을 짚고 몸을 숙인(leaning over) 모습이라 정답이에요. 서류를 치우는(putting away) 동작, 벽 칠하기, 줄 서기는 사진에 없어요."
  },
  {
    id: "ph02", img: "assets/img/part1/ph02.jpg", kind: "people",
    choices: [
      "The man is handing out name tags.",
      "They're both standing near a window.",
      "The man is writing on a whiteboard.",
      "A woman is seated at a desk."
    ],
    answer: 3,
    explanation: "여자가 책상에 앉아 있어(is seated) 정답이에요. 남자는 명찰을 나눠 주거나 화이트보드에 쓰고 있지 않고, 두 사람이 모두 서 있는 것도 아니에요."
  },
  {
    id: "ph03", img: "assets/img/part1/ph03.jpg", kind: "people",
    choices: [
      "They're looking at some papers together.",
      "They're crossing the street.",
      "One of them is opening a car door.",
      "They're sitting on a bench."
    ],
    answer: 0,
    explanation: "두 사람이 함께 서류를 들여다보고 있어 정답이에요. 길을 건너거나 차 문을 열거나 벤치에 앉아 있지 않아요."
  },
  {
    id: "ph04", img: "assets/img/part1/ph04.jpg", kind: "people",
    choices: [
      "A man is closing the curtains.",
      "They're stacking chairs.",
      "Some papers have been spread out on a desk.",
      "A woman is typing on a keyboard."
    ],
    answer: 2,
    explanation: "책상 위에 서류가 펼쳐져 있는 상태(have been spread out)라 정답이에요. 커튼을 닫거나 의자를 쌓거나 키보드를 치는 사람은 없어요."
  },
  {
    id: "ph05", img: "assets/img/part1/ph05.jpg", kind: "people",
    choices: [
      "She's reaching for a book on a shelf.",
      "She's closing a window.",
      "A picture is being hung on the wall.",
      "A woman is reading on a sofa."
    ],
    answer: 3,
    explanation: "여자가 소파에서 책을 읽고 있어 정답이에요. 선반의 책에 손을 뻗거나 창문을 닫는 동작이 없고, 그림을 거는 중(is being hung)인 사람도 없어요."
  },
  {
    id: "ph06", img: "assets/img/part1/ph06.jpg", kind: "people",
    choices: [
      "She's putting on a hat.",
      "She's holding an open magazine.",
      "She's packing a suitcase.",
      "She's writing in a notebook."
    ],
    answer: 1,
    explanation: "펼친 잡지를 들고 있어 정답이에요. 모자는 이미 쓰고 있는 상태라 쓰는 동작(putting on)과 다르고, 짐을 싸거나 공책에 쓰고 있지도 않아요."
  },
  {
    id: "ph07", img: "assets/img/part1/ph07.jpg", kind: "people",
    choices: [
      "He's writing in a notebook.",
      "He's typing with both hands.",
      "A glass of water is on the desk.",
      "He's closing a laptop."
    ],
    answer: 2,
    explanation: "책상 위에 물컵이 놓여 있어 정답이에요. 남자는 한 손은 휴대폰, 한 손은 마우스에 두고 있어 양손 타이핑·공책 필기·노트북 닫기는 모두 틀려요."
  },
  {
    id: "ph08", img: "assets/img/part1/ph08.jpg", kind: "people",
    choices: [
      "A woman is working at a desk.",
      "She's standing next to a window.",
      "She's handing a document to someone.",
      "She's watering a plant."
    ],
    answer: 0,
    explanation: "여자가 책상에서 일하고 있어 정답이에요. 앉아 있으니 창가에 서 있는 게 아니고, 서류를 건네거나 화분에 물을 주지도 않아요."
  },
  {
    id: "ph09", img: "assets/img/part1/ph09.jpg", kind: "people",
    choices: [
      "He's hanging a poster on the wall.",
      "He's pouring coffee into a mug.",
      "Some books are stacked on the desk.",
      "He's taking a photograph."
    ],
    answer: 2,
    explanation: "책상 위에 책이 쌓여 있어(are stacked) 정답이에요. 남자는 노트북 자판을 치고 있어 포스터 걸기·커피 따르기·사진 찍기는 틀려요."
  },
  {
    id: "ph10", img: "assets/img/part1/ph10.jpg", kind: "people",
    choices: [
      "A worker is operating a machine.",
      "He's putting on a helmet.",
      "He's sweeping the floor.",
      "He's carrying a toolbox."
    ],
    answer: 0,
    explanation: "작업자가 기계를 다루고(operating) 있어 정답이에요. 헬멧은 이미 쓴 상태라 쓰는 동작(putting on)이 아니고, 바닥 쓸기·공구함 나르기도 없어요."
  },
  {
    id: "ph11", img: "assets/img/part1/ph11.jpg", kind: "people",
    choices: [
      "He's painting a wooden board.",
      "He's measuring a board with a tape.",
      "He's sweeping up sawdust.",
      "A man is using a hand tool."
    ],
    answer: 3,
    explanation: "남자가 손 공구로 나무를 다듬고 있어 정답이에요. 나무판을 칠하거나 줄자로 재거나 톱밥을 쓸고 있지 않아요."
  },
  {
    id: "ph12", img: "assets/img/part1/ph12.jpg", kind: "people",
    choices: [
      "He's wearing ear protection over his ears.",
      "A man is drilling into a wall.",
      "He's hammering a nail.",
      "He's climbing a ladder."
    ],
    answer: 1,
    explanation: "남자가 드릴로 벽에 구멍을 뚫고 있어 정답이에요. 귀마개는 귀가 아니라 목에 걸려 있고, 망치질이나 사다리 오르기도 없어요."
  },
  {
    id: "ph13", img: "assets/img/part1/ph13.jpg", kind: "objects",
    choices: [
      "Some chairs have been arranged around a table.",
      "A meeting is taking place.",
      "Some boxes are stacked in a corner.",
      "A man is adjusting a light fixture."
    ],
    answer: 0,
    explanation: "의자들이 테이블 둘레에 놓여 있어(have been arranged) 정답이에요. 회의 중인 사람도, 구석에 쌓인 상자도, 조명을 손보는 남자도 없어요."
  },
  {
    id: "ph14", img: "assets/img/part1/ph14.jpg", kind: "objects",
    choices: [
      "People are seated along the windows.",
      "The chairs have been stacked against the wall.",
      "A screen has been mounted on the wall.",
      "Someone is writing on a whiteboard."
    ],
    answer: 2,
    explanation: "벽에 화면이 설치되어 있어(has been mounted) 정답이에요. 창가에 앉은 사람이 없고, 의자는 쌓여 있지 않으며, 화이트보드에 쓰는 사람도 없어요."
  },
  {
    id: "ph15", img: "assets/img/part1/ph15.jpg", kind: "objects",
    choices: [
      "A presentation is being given.",
      "A laptop has been left on the table.",
      "The chairs are occupied.",
      "Someone is closing the blinds."
    ],
    answer: 1,
    explanation: "테이블 위에 노트북이 놓여 있어(has been left) 정답이에요. 사람이 없으니 발표 중, 의자에 사람이 앉음, 블라인드 닫기는 모두 틀려요."
  },
  {
    id: "ph16", img: "assets/img/part1/ph16.jpg", kind: "objects",
    choices: [
      "A woman is dusting the furniture.",
      "The shelves are empty.",
      "Books are being removed from a box.",
      "Some items have been placed on a shelf."
    ],
    answer: 3,
    explanation: "선반에 물건들이 놓여 있어(have been placed) 정답이에요. 선반이 비어 있지 않고, 사람이 없으니 먼지 닦기나 상자에서 책 꺼내기도 없어요."
  },
  {
    id: "ph17", img: "assets/img/part1/ph17.jpg", kind: "objects",
    choices: [
      "Someone is washing dishes in a sink.",
      "Cups and bowls are lined up on the shelves.",
      "A bottle is being opened.",
      "The shelves are being installed."
    ],
    answer: 1,
    explanation: "선반에 컵과 그릇이 줄지어 놓여 있어(are lined up) 정답이에요. 사람이 없으니 설거지, 병 따기(is being opened), 선반 설치 중은 모두 틀려요."
  },
  {
    id: "ph18", img: "assets/img/part1/ph18.jpg", kind: "objects",
    choices: [
      "A potted plant is sitting on a shelf.",
      "Someone is reaching for a book.",
      "The plants are being watered.",
      "A shelf is being hung on the wall."
    ],
    answer: 0,
    explanation: "화분이 선반 위에 놓여 있어 정답이에요. 사람이 없으니 책에 손 뻗기, 물 주기(are being watered), 선반 걸기 같은 진행 동작은 맞지 않아요."
  },
  {
    id: "ph19", img: "assets/img/part1/ph19.jpg", kind: "people",
    choices: [
      "They're boarding a bus.",
      "Passengers are seated in rows.",
      "A man is opening a door.",
      "People are waiting to go through a doorway."
    ],
    answer: 3,
    explanation: "사람들이 출입구를 지나가려고 기다리고 있어 정답이에요. 버스에 타는 장면이 아니고, 줄지어 앉은 승객도, 문을 여는 남자도 없어요."
  },
  {
    id: "ph20", img: "assets/img/part1/ph20.jpg", kind: "people",
    choices: [
      "They're entering a shop.",
      "A man is handing a bag to a woman.",
      "Some people are looking at their phones.",
      "They're seated at outdoor tables."
    ],
    answer: 2,
    explanation: "몇 사람이 휴대폰을 보고 있어 정답이에요. 가게에 들어가거나 가방을 건네는 동작이 없고, 야외 테이블에 앉아 있지도 않아요."
  },
  {
    id: "ph21", img: "assets/img/part1/ph21.jpg", kind: "people",
    choices: [
      "Some people are holding umbrellas.",
      "The umbrellas have been folded up.",
      "They're walking across a street.",
      "A vendor is handing out drinks."
    ],
    answer: 0,
    explanation: "몇 사람이 우산을 들고 있어 정답이에요. 우산은 펼쳐져 있어 접힌(folded up) 상태가 아니고, 길을 건너거나 음료를 나눠 주는 사람도 없어요."
  },
  {
    id: "ph22", img: "assets/img/part1/ph22.jpg", kind: "people",
    choices: [
      "She's sweeping the floor.",
      "The shelves are full of books.",
      "She's hanging a picture.",
      "A woman is moving a box."
    ],
    answer: 3,
    explanation: "여자가 상자를 옮기고 있어 정답이에요. 바닥을 쓸거나 그림을 걸고 있지 않고, 선반도 책으로 가득 차 있지 않아요."
  },
  {
    id: "ph23", img: "assets/img/part1/ph23.jpg", kind: "people",
    choices: [
      "They're unloading a truck.",
      "One man is sealing a box with tape.",
      "Two men are handling cardboard boxes.",
      "They're sitting at a table."
    ],
    answer: 2,
    explanation: "두 남자가 종이 상자를 다루고(handling) 있어 정답이에요. 트럭이 보이지 않고, 테이프로 상자를 봉하거나 테이블에 앉아 있지도 않아요."
  },
  {
    id: "ph24", img: "assets/img/part1/ph24.jpg", kind: "people",
    choices: [
      "He's pushing an empty cart.",
      "A man is loading a box into a vehicle.",
      "He's closing the trunk.",
      "He's crossing the street."
    ],
    answer: 1,
    explanation: "남자가 상자를 차에 싣고 있어 정답이에요. 손수레에는 상자가 실려 있어 비어 있지(empty) 않고, 트렁크는 열려 있으며, 길을 건너고 있지도 않아요."
  }
];
