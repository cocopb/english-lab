(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var topics = window.GRAMMAR.slice().sort(function (a, b) { return a.order - b.order; });
    var list = document.getElementById("grammar-list");
    var expandToggle = document.getElementById("grammar-expand-toggle");
    var openIds = new Set();

    function element(tag, className, text) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      if (text !== undefined) node.textContent = text;
      return node;
    }

    function makeSection(title, content) {
      var section = element("section", "grammar-detail-section");
      section.append(element("h3", "", title), content);
      return section;
    }

    function makeTable(item) {
      var wrapper = element("div", "grammar-table-scroll");
      wrapper.setAttribute("tabindex", "0");
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", item.title + " 표");
      var table = element("table", "grammar-table");
      var head = element("thead");
      var headingRow = element("tr");
      item.table.headers.forEach(function (header) {
        headingRow.appendChild(element("th", "", header));
      });
      head.appendChild(headingRow);
      var body = element("tbody");
      item.table.rows.forEach(function (row) {
        var tableRow = element("tr");
        row.forEach(function (value) { tableRow.appendChild(element("td", "", value)); });
        body.appendChild(tableRow);
      });
      table.append(head, body);
      wrapper.appendChild(table);
      return wrapper;
    }

    function makeExamples(item) {
      var examples = element("div", "grammar-examples");
      item.examples.forEach(function (example) {
        var card = element("article", "grammar-example-card");
        card.append(
          element("p", "grammar-example-good en", "O  " + example.good),
          element("p", "grammar-example-bad en", "X  " + example.bad),
          element("p", "grammar-example-note", example.note)
        );
        examples.appendChild(card);
      });
      return examples;
    }

    function makeTopic(item) {
      var article = element("article", "accordion-item grammar-topic");
      var trigger = element("button", "accordion-trigger grammar-topic-trigger");
      var panelId = "grammar-topic-" + item.id;
      trigger.type = "button";
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-controls", panelId);
      var summary = element("span", "grammar-topic-summary");
      summary.append(
        element("span", "grammar-topic-heading", String(item.order).padStart(2, "0") + " · " + item.title),
        element("span", "grammar-topic-one-line", item.oneLine)
      );
      trigger.append(summary, element("span", "grammar-weight", item.weight));

      var panel = element("div", "accordion-panel grammar-topic-panel");
      panel.id = panelId;
      panel.hidden = true;
      panel.append(
        makeSection("① 한 줄 규칙", element("p", "", item.oneLine)),
        makeSection("② 표", makeTable(item)),
        makeSection("③ 예문 O / X", makeExamples(item)),
        makeSection("⚠️ 함정", element("p", "grammar-trap", item.trap)),
        makeSection("🎯 토익 출제 패턴", element("p", "", item.toeicPattern))
      );

      trigger.addEventListener("click", function () {
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        setExpanded(item.id, trigger, panel, !expanded);
        updateExpandToggle();
      });
      article.append(trigger, panel);
      return article;
    }

    function setExpanded(id, trigger, panel, expanded) {
      trigger.setAttribute("aria-expanded", String(expanded));
      panel.hidden = !expanded;
      if (expanded) openIds.add(id);
      else openIds.delete(id);
    }

    function updateExpandToggle() {
      var allExpanded = topics.length > 0 && openIds.size === topics.length;
      expandToggle.textContent = allExpanded ? "전체 접기" : "전체 펼치기";
      expandToggle.setAttribute("aria-expanded", String(allExpanded));
    }

    function activateTab(name) {
      ["notes", "quiz", "weak"].forEach(function (tabName) {
        var selected = name === tabName;
        var tab = document.getElementById("grammar-tab-" + tabName);
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        document.getElementById("grammar-panel-" + tabName).hidden = !selected;
      });
    }

    list.replaceChildren.apply(list, topics.map(makeTopic));
    if (!topics.length) list.appendChild(element("div", "placeholder", "문법 토픽을 준비 중이에요."));

    expandToggle.addEventListener("click", function () {
      var shouldExpand = openIds.size !== topics.length;
      topics.forEach(function (item) {
        var trigger = list.querySelector('[aria-controls="grammar-topic-' + item.id + '"]');
        setExpanded(item.id, trigger, document.getElementById("grammar-topic-" + item.id), shouldExpand);
      });
      updateExpandToggle();
    });

    document.querySelectorAll('[role="tab"][id^="grammar-tab-"]').forEach(function (tab) {
      tab.addEventListener("click", function () { activateTab(tab.id.replace("grammar-tab-", "")); });
      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        var tabs = Array.from(document.querySelectorAll('[role="tab"][id^="grammar-tab-"]'));
        var index = tabs.indexOf(tab);
        var offset = event.key === "ArrowRight" ? 1 : -1;
        var next = tabs[(index + offset + tabs.length) % tabs.length];
        activateTab(next.id.replace("grammar-tab-", ""));
        next.focus();
      });
    });
  });
}());
