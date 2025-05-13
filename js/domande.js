const main = document.querySelector("main");
var questionsElement = document.querySelector("#domande");

const queryString = location.search;

// Initialize URLSearchParams with the query string
const urlParams = new URLSearchParams(queryString);
console.log({ urlParams });
// Get specific parameters
const quizSlug = urlParams.get("quiz_slug");

// if (!quizSlug) {
//   let idNotFound = document.createElement("p");
//   idNotFound.style.width = "100%";
//   idNotFound.style.flex = 1;
//   idNotFound.style.display = "flex";
//   idNotFound.style.justifyContent = "center";
//   idNotFound.style.alignItems = "center";
//   idNotFound.style.fontSize = "24px";

//   idNotFound.textContent =
//     "Hai scritto male l'ID del quiz, prova ad inserire bene l'id!";
//   main.appendChild(idNotFound);
// } else {
//   // Add Language Name to HTML.
//   //   const lang = document.createElement("h1");
//   //   lang.textContent = `${language.toUpperCase()} - ${
//   //     type === "vero-o-falso" ? "Vero o Falso" : "Scelta multipla"
//   //   }`;

//   //   document.querySelector("main").insertAdjacentElement("afterbegin", lang);

//   // Add Questions to HTML
//   fetch("../data/domande_vero_o_falso.json")
//     .then((response) => {
//       console.log({ response });
//       if (!response.ok) {
//         throw new Error("File not found!");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);

//       const filteredQuestions = data.questions.filter(
//         (question) => question.quiz_slug === quizSlug
//       );
//       console.log({ filteredQuestions });
//       for (let quiz of filteredQuestions) {
//         const quizzesContainer = document.getElementById(
//           "quizzes-vero-o-falso"
//         );
//         const quizItem = document.createElement("a");
//         quizItem.className = "card";
//         quizItem.href = `/domande.html?quidId=${quiz.id}`;
//         quizItem.textContent = quiz.name;
//         quizzesContainer.appendChild(quizItem);
//       }
//     })
//     .catch((err) => console.error(err));
// }

// 2. Carica il file JSON (assicurati di servirlo da questo path)
fetch("../data/domande_vero_o_falso.json")
  .then((response) => response.json())
  .then((data) => initQuiz(data))
  .catch((err) => {
    document.getElementById("question-title").textContent =
      "Errore nel caricamento domande";
    console.error(err);
  });

function initQuiz(data) {
  const allQuestions = data.questions;
  const filtered = allQuestions.filter(
    (quesion) => quesion.quiz_slug === quizSlug
  );
  let currentIndex = 0;
  const selectedAnswers = {}; // { questionId: answerId }

  const titleEl = document.getElementById("question-title");
  const answersEl = document.getElementById("answers-list");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  function render() {
    const question = filtered[currentIndex];
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
      });

      const label = document.createElement("label");
      label.htmlFor = answer.id;
      label.textContent = answer.title;
      label.classList.add("input-label");

      wrapper.append(input, label);
      answersEl.append(wrapper);
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === filtered.length - 1;
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      render();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < filtered.length - 1) {
      currentIndex++;
      render();
    }
  });
  render();
}
