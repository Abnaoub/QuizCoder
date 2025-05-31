const main = document.querySelector("main");
const questionsElement = document.querySelector("#domande");
const correctAnswerEl = document.querySelector(".correct-answer");

const queryString = location.search;


const urlParams = new URLSearchParams(queryString);
console.log({ urlParams });

const quizSlug = urlParams.get("quiz_slug");
let quizData;

const frontendLanguages = ["html", "css", "javascript", "vue"];
const backendLanguages = ["nodejs", "python", "php", "sql"];

const currentLanguage = quizSlug.split("_")[0];
const isFrontendQuiz = frontendLanguages.includes(currentLanguage);
const questionsPath = isFrontendQuiz
  ? "../data/true-or-false-questions.json"
  : "../data/multiple-choice-questions.json";
const quizPath = isFrontendQuiz
  ? "../data/quizzes-true-or-false.json"
  : "../data/quizzes-multiple-choice.json";
let allQuestions;
let isQuizCompleted;

fetch(questionsPath)
  .then((response) => response.json())
  .then((data) => {
    allQuestions = data.questions.filter(
      (quesion) => quesion.quiz_slug === quizSlug
    );
    fetchQuizData();
  })
  .catch((err) => {
    document.getElementById("question-title").textContent =
      "Errore nel caricamento domande";
    console.error(err);
  });


function fetchQuizData() {
  fetch(quizPath)
    .then((response) => response.json())
    .then((data) => {
      quizData = data.quizzes.find((quiz) => quiz.slug === quizSlug);
      initQuiz(data);
    })
    .catch((err) => {
      document.getElementById("question-title").textContent =
        "Errore nel caricamento domande";
      console.error(err);
    });
}
function initQuiz() {
  let selectedAnswers = {}; 
  const lastQuizzes = localStorage.getItem("last-quizzes");
  if (lastQuizzes) {
    const parsed = JSON.parse(lastQuizzes);
    const completedQuiz = parsed.find((quiz) => quiz.slug === quizSlug);
    if (completedQuiz) {
      isQuizCompleted = true;
      selectedAnswers = completedQuiz.answers;
    }
  }
  let currentIndex = 0;

  const titleEl = document.getElementById("question-title");
  const answersEl = document.getElementById("answers-list");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  function updateProgressIndicator() {
    const progressEl = document.getElementById("progress-indicator");
    const progress = ((currentIndex + 1) / allQuestions.length) * 100;
    const progressBar = progressEl.querySelector(".progress-bar");
    if (!progressBar) {
      const bar = document.createElement("div");
      bar.className = "progress-bar";
      bar.style.width = `${progress}%`;
      bar.style.height = "100%";
      bar.style.backgroundColor = "#8e61f5";
      bar.style.borderRadius = "5px";
      progressEl.appendChild(bar);
    } else {
      progressBar.style.width = `${progress}%`;
    }

    const counter = document.createElement("div");
    counter.className = "progress-counter";
    counter.textContent = `${currentIndex + 1}/${allQuestions.length}`;
    counter.style.position = "absolute";
    counter.style.top = "5px";
    counter.style.width = "100%";
    counter.style.textAlign = "center";
    counter.style.fontSize = "14px";
    counter.style.color = "white";

    const oldCounter = progressEl.querySelector(".progress-counter");
    if (oldCounter) {
      oldCounter.remove();
    }

    progressEl.appendChild(counter);
  }

  function render() {
    const question = allQuestions[currentIndex];
    titleEl.textContent = question.title;
    answersEl.innerHTML = "";
    correctAnswerEl.innerHTML = "";
    question.answers.forEach((answer) => {
      const wrapper = document.createElement("div");
      wrapper.className = "answer-item";
      if (isQuizCompleted) {
        wrapper.classList.add("disabled");
      }
      const input = document.createElement("input");
      input.type = "radio";
      input.name = question.id;
      input.id = answer.id;
      input.value = answer.id;
      input.disabled = isQuizCompleted;
      if (selectedAnswers[question.id] === answer.id) input.checked = true;
      input.addEventListener("click", () => {
        selectedAnswers[question.id] = answer.id;
        console.log(selectedAnswers);

        if (currentIndex < allQuestions.length - 1) {
          nextBtn.disabled = false;
        }
      });

      const label = document.createElement("label");
      label.htmlFor = answer.id;
      label.textContent =
        quizData.type === "true-or-false"
          ? answer.title
            ? "Vero"
            : "Falso"

          : answer.title;
      label.classList.add("input-label");

      wrapper.append(input, label);
      answersEl.append(wrapper);
    });

    if (isQuizCompleted) {
      const correctAnswerValue = question.answers.find(
        (answer) => answer.isCorrect === true
      ).title;

      correctAnswerEl.style.color = "white";
      correctAnswerEl.textContent = `La risposta corretta è: ${
        correctAnswerValue ? "Vero" : "Falso"
      }`;
    }

    prevBtn.disabled = currentIndex === 0;
    nextBtn.textContent =
      currentIndex === allQuestions.length - 1
        ? isQuizCompleted
          ? "Ultimi Quiz"
          : "Concludi"
        : "Avanti";

    updateProgressIndicator();
  }

  function finishQuiz() {
    if (isQuizCompleted) {
      location.href = "./last-quizzes.html";
    } else {
      saveQuiz();
    }
  }

  function saveQuiz() {
    const lastQuizzes = localStorage.getItem("last-quizzes");
    let score = 0;
    for (let [questionId, answerId] of Object.entries(selectedAnswers)) {
      console.log({ questionId, answerId });
      const question = allQuestions.find((q) => q.id === questionId);
      console.log({ question });
      if (question) {
        const answer = question.answers.find((a) => a.id === answerId);
        if (answer && answer.isCorrect) {
          score += 1;
        }
      }
    }

    if (!lastQuizzes) {
      localStorage.setItem(
        "last-quizzes",
        JSON.stringify([
          {
            slug: quizSlug,
            name: quizData.name,
            language: quizData.language_slug,
            type: quizData.type,
            answers: selectedAnswers,
            score,
          },
        ])
      );
    } else {
      const parsed = JSON.parse(lastQuizzes);
      parsed.push({
        slug: quizSlug,
        name: quizData.name,
        language: quizData.language_slug,
        type: quizData.type,
        answers: selectedAnswers,
        score,
      });
      localStorage.setItem("last-quizzes", JSON.stringify(parsed));
    }
    location.href = "./last-quizzes.html";
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      render();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < allQuestions.length - 1) {
      4 < 4;
      currentIndex++;
      render();
    } else {
      finishQuiz();
    }
  });
  render();
}

