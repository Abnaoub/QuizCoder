const main = document.querySelector("main");
var questionsElement = document.querySelector("#domande");

const queryString = location.search;

// Initialize URLSearchParams with the query string
const urlParams = new URLSearchParams(queryString);
console.log({ urlParams });
// Get specific parameters
const quizSlug = urlParams.get("quiz_slug");
let quizData;

const frontendLanguages = ["html", "css", "javascript", "vue"];
const backendLanguages = ["nodejs", "python", "php", "sql"];

const currentLanguage = quizSlug.split("_")[0];
const isFrontendQuiz = frontendLanguages.includes(currentLanguage);
const questionsPath = isFrontendQuiz ? "../data/true-or-false-questions.json" : "../data/multiple-choice-questions.json";
const quizPath = isFrontendQuiz ? "../data/quizzes-true-or-false.json" : "../data/quizzes-multiple-choice.json";
let allQuestions;

fetch(questionsPath)
  .then((response) => response.json())
  .then((data) => {
    allQuestions = data.questions.filter(
      (quesion) => quesion.quiz_slug === quizSlug
    );
    initQuiz(data)
  })
  .catch((err) => {
    document.getElementById("question-title").textContent =
      "Errore nel caricamento domande";
    console.error(err);
  });

function initQuiz() {

  console.log({ allQuestions, allQuestions });
  let currentIndex = 0;
  const selectedAnswers = {} // { questionId: answerId }

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

    question.answers.forEach((answer) => {
      const wrapper = document.createElement("div");
      wrapper.className = "answer-item";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = question.id;
      input.id = answer.id;
      input.value = answer.id;
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
      label.textContent = answer.title;
      label.classList.add("input-label");

      wrapper.append(input, label);
      answersEl.append(wrapper);
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.textContent = currentIndex === allQuestions.length - 1 ? "Concludi" : "Avanti";

    updateProgressIndicator();
  }

  function fetchQuizData() {
    fetch(quizPath)
      .then((response) => response.json())
      .then((data) => {
        quizData = data;
      })
      .catch((err) => {
        document.getElementById("question-title").textContent =
          "Errore nel caricamento domande";
        console.error(err);
      });
  }

  function finishQuiz() {
    console.log('FINISH QUIZ')
    saveQuiz();
  }

  function saveQuiz() {
    const lastQuizzes = localStorage.getItem('last-quizzes');
    let score = 0;
    const selectedQuiz = quizData.quizzes.find(quiz => quiz.slug === quizSlug);
    console.log({allQuestions})

    for(let [questionId, answerId] of Object.entries(selectedAnswers)) {
      console.log({questionId, answerId})
      const question = allQuestions.find(q => q.id === questionId);
      console.log({question})
      if (question) {
        const answer = question.answers.find(a => a.id === answerId);
        if (answer && answer.isCorrect) {
          score += 1
        }
      }
    }

    if(!lastQuizzes){
      localStorage.setItem('last-quizzes', JSON.stringify([{id: quizSlug, type: selectedQuiz.type, answers: selectedAnswers, score}]))
    }
    else {
      const parsed = JSON.parse(lastQuizzes);
      parsed.push({id: quizSlug, type: selectedQuiz.type, answers: selectedAnswers, score});
      localStorage.setItem('last-quizzes', JSON.stringify(parsed));
    }
    location.href = '/last-quiz.html'
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      render();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < allQuestions.length - 1) {
      currentIndex++;
      render();
    } else {
      finishQuiz();
    }
  });
  render();
  fetchQuizData();
}
