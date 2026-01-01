// все экраны
const screens = [
  "first_div",
  "quiz1",
  "quiz2",
  "quiz3",
  "quiz4",
  "quiz5",
  "quiz6",
  "quiz7"
];

// показать только один экран
const showScreen = (id) => {
  screens.forEach(screenId => {
    const el = document.getElementById(screenId);
    el.style.display = "none";
    el.classList.remove("fade-in", "fade-out");
  });

  const active = document.getElementById(id);
  active.style.display = "block";
  active.classList.add("fade-in");
};

// стартовый экран
showScreen("first_div");

// кнопка "Да"
document
  .getElementById("button_for_ready")
  .addEventListener("click", () => {
    showScreen("quiz1");
  });

// уведомление
const showToast = () => {
  const toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1200);
};

// конфигурация квизов
const quizzes = [
  { quizId: "quiz1", inputName: "color", correct: "orange", next: "quiz2", buttonId: "button_for_choice" },
  { quizId: "quiz2", inputName: "singer", correct: "pharaoh", next: "quiz3", buttonId: "button_for_choice2" },
  { quizId: "quiz3", inputName: "time_of_year", correct: "winter", next: "quiz4", buttonId: "button_for_choice3" },
  { quizId: "quiz4", inputName: "icecream", correct: "blueberry_syrup", next: "quiz5", buttonId: "button_for_choice4" },
  { quizId: "quiz5", inputName: "peculiarity", correct: "heterochromia", next: "quiz6", buttonId: "button_for_choice5" },
  { quizId: "quiz6", inputName: "movie", correct: "interstellar", next: "quiz7", buttonId: "button_for_choice6" },
  { quizId: "quiz7", inputName: "trip", correct: "amsterdam", next: null, buttonId: "button_for_choice7" }
];

// обработка ответа
const handleQuiz = ({ quizId, inputName, correct, next }) => {
  const selected = document.querySelector(`input[name="${inputName}"]:checked`);

  if (!selected) {
    alert("Выбери вариант 🙂");
    return;
  }

  if (selected.value === correct) {
    showToast();

    const current = document.getElementById(quizId);
    current.classList.add("fade-out");

    // подгоняем под длительность fade-out (1 сек)
    setTimeout(() => {
      if (next) showScreen(next);
      else alert("Ты прошла всё 💖");
    }, 1000);
  } else {
    alert("Неправильно 😏");
  }
};


// навешиваем кнопки
quizzes.forEach(q => {
  document
    .getElementById(q.buttonId)
    .addEventListener("click", () => handleQuiz(q));
});


const showFinalScreen = () => {
  showToast(); // уведомление о прохождении теста
  const final = document.getElementById("finalScreen");
  final.style.display = "flex";

  const lis = final.querySelectorAll("li");
  lis.forEach(li => {
    li.textContent = li.dataset.text;

    // при клике раскрываем элемент
    li.addEventListener("click", () => {
      li.classList.toggle("show");
    });
  });
};

// в handleQuiz для последнего вопроса
const lastQuiz = quizzes[quizzes.length - 1];
document.getElementById(lastQuiz.buttonId).addEventListener("click", () => {
  const selected = document.querySelector(`input[name="${lastQuiz.inputName}"]:checked`);
  if (!selected) { 
    alert("Выбери вариант 🙂"); 
    return; 
  }
  if (selected.value === lastQuiz.correct) {
    showToast(); // уведомление о правильном ответе

    // задержка для плавного исчезновения уведомления, потом переход
    setTimeout(() => {
      window.location.href = "bricks.html";
    }, 1200); // 1.2 секунды — столько же, сколько длится toast
  } else {
    alert("Неправильно 😏");
  }
});
