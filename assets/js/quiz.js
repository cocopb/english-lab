(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var area = document.getElementById("quiz-area");
    var questions = window.QUIZ.slice();
    var current;
    var answered = false;

    function render() {
      if (!current) {
        var previousId = area.getAttribute("data-previous-id");
        var candidates = questions.filter(function (question) { return question.id !== previousId; });
        if (!candidates.length) candidates = questions;
        current = candidates[Math.floor(Math.random() * candidates.length)];
        area.setAttribute("data-previous-id", current.id);
      }
      answered = false;
      area.innerHTML = '<span class="quiz-count">RANDOM QUESTION</span><h2 class="quiz-prompt en">' + current.question + '</h2><div class="quiz-options">' +
        current.options.map(function (option, index) { return '<button class="quiz-option" type="button" data-option="' + index + '">' + option + "</button>"; }).join("") +
        '</div><p class="quiz-feedback" id="quiz-feedback" aria-live="polite"></p><div class="quiz-actions"><span class="helper-text">정답을 고르면 바로 채점돼요.</span><button class="button button-primary" id="next-question" type="button" disabled>다음 문제</button></div>';
      area.querySelectorAll(".quiz-option").forEach(function (button) {
        button.addEventListener("click", function () { grade(Number(button.getAttribute("data-option"))); });
      });
      document.getElementById("next-question").addEventListener("click", function () {
        current = null;
        render();
      });
    }

    function grade(selected) {
      if (answered) return;
      answered = true;
      var correct = selected === current.answer;
      window.Progress.set({
        quizSolved: window.Progress.get().quizSolved + 1,
        quizCorrect: window.Progress.get().quizCorrect + (correct ? 1 : 0)
      });
      window.Progress.markToday();
      area.querySelectorAll(".quiz-option").forEach(function (button) {
        var option = Number(button.getAttribute("data-option"));
        button.disabled = true;
        if (option === current.answer) button.classList.add("correct");
        else if (option === selected) button.classList.add("incorrect");
      });
      document.getElementById("quiz-feedback").textContent = (correct ? "정답이에요! " : "아쉬워요. 정답을 확인해봐요. ") + current.explanation;
      document.getElementById("next-question").disabled = false;
    }

    if (questions.length) render();
    else area.innerHTML = '<div class="placeholder">퀴즈를 추가할 공간이에요.<br>내용 추가 예정</div>';
  });
}());
