// Part 3·4 시각 정보(도표) 렌더러. 리스닝 탭과 LC 풀세트가 함께 쓴다.
// 데이터: talk.graphic = { title: "제목", columns: ["열 이름", ...], rows: [["칸", ...], ...] }
// 표가 화면보다 넓으면 표 안쪽(.listening-graphic-scroll)만 가로로 스크롤된다.
(function () {
  function cell(tag, text) {
    var node = document.createElement(tag);
    node.textContent = text;
    return node;
  }

  function render(graphic) {
    var figure = document.createElement("figure");
    figure.className = "listening-graphic";
    var caption = cell("figcaption", graphic.title);
    caption.className = "listening-graphic-title";
    figure.appendChild(caption);
    var scroll = document.createElement("div");
    scroll.className = "listening-graphic-scroll";
    scroll.setAttribute("tabindex", "0");
    scroll.setAttribute("aria-label", graphic.title + " 표");
    var table = document.createElement("table");
    table.className = "listening-graphic-table en";
    var head = document.createElement("thead");
    var headRow = document.createElement("tr");
    graphic.columns.forEach(function (column) {
      var th = cell("th", column);
      th.setAttribute("scope", "col");
      headRow.appendChild(th);
    });
    head.appendChild(headRow);
    table.appendChild(head);
    var body = document.createElement("tbody");
    graphic.rows.forEach(function (row) {
      var tr = document.createElement("tr");
      row.forEach(function (value) { tr.appendChild(cell("td", value)); });
      body.appendChild(tr);
    });
    table.appendChild(body);
    scroll.appendChild(table);
    figure.appendChild(scroll);
    return figure;
  }

  // 질문 글자를 노드에 채운다. "Look at the graphic." 부분만 굵게 하고 나머지는 그대로 둔다.
  var CUE = "Look at the graphic.";
  function fillPrompt(node, text) {
    text = String(text);
    node.textContent = "";
    if (text.indexOf(CUE) !== 0) {
      node.textContent = text;
      return node;
    }
    var cue = document.createElement("strong");
    cue.className = "listening-graphic-cue";
    cue.textContent = CUE;
    var rest = document.createElement("span");
    rest.textContent = text.slice(CUE.length);
    node.appendChild(cue);
    node.appendChild(rest);
    return node;
  }

  window.ListeningGraphic = { render: render, fillPrompt: fillPrompt };
}());
