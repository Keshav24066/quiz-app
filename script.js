const questions = [
  {
    question: "Which HTML tag is used to create a link?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1
  },
  {
    question: "Which CSS property changes text color?",
    options: ["background-color", "color", "font-size", "margin"],
    answer: 1
  },
  {
    question: "Which language is mainly used for web interactivity?",
    options: ["HTML", "CSS", "JavaScript", "PHP"],
    answer: 2
  },
  {
    question: "What does JS stand for?",
    options: ["Java Syntax", "JavaScript", "Just Script", "Java Style"],
    answer: 1
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "<!-- -->", "/* */", "##"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let totalSeconds = 0;
let timerInterval = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const progressText = document.getElementById("progress-text");

const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");

const totalQuestionsEl = document.getElementById("total-questions");
const correctAnswersEl = document.getElementById("correct-answers");
const wrongAnswersEl = document.getElementById("wrong-answers");
const percentageEl = document.getElementById("percentage");
const timeTakenEl = document.getElementById("time-taken");
const restartBtn = document.getElementById("restart-btn");

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    totalSeconds++;
    timerEl.textContent = formatTime(totalSeconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function renderQuestion() {
  const q = questions[currentQuestion];
  selectedOption = null;

  questionEl.textContent = q.question;
  progressText.textContent = `Question ${currentQuestion + 1}/${questions.length}`;

  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = option;
    button.addEventListener("click", () => {
      selectedOption = index;
      highlightSelectedOption(index);
      nextBtn.disabled = false;
    });
    optionsEl.appendChild(button);
  });

  nextBtn.disabled = true;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "Finish" : "Next";
}

function highlightSelectedOption(index) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((btn, i) => {
    btn.classList.remove("selected");
    if (i === index) btn.classList.add("selected");
  });
}

function checkAnswer() {
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
    if (i === selectedOption && i !== q.answer) btn.classList.add("wrong");
  });

  if (selectedOption === q.answer) {
    score++;
  }
}

function nextQuestion() {
  if (selectedOption === null) {
    alert("Please select an answer first!");
    return;
  }

  checkAnswer();

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 600);
}

function showResult() {
  stopTimer();

  const wrongAnswers = questions.length - score;
  const percentage = Math.round((score / questions.length) * 100);

  totalQuestionsEl.textContent = questions.length;
  correctAnswersEl.textContent = score;
  wrongAnswersEl.textContent = wrongAnswers;
  percentageEl.textContent = `${percentage}%`;
  timeTakenEl.textContent = formatTime(totalSeconds);

  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedOption = null;
  totalSeconds = 0;
  timerEl.textContent = "00:00";

  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");

  startTimer();
  renderQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

startTimer();
renderQuestion();
