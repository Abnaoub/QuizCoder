const main = document.querySelector("main");

console.log({ location });
const queryString = location.search;

const urlParams = new URLSearchParams(queryString);
console.log({ urlParams });


const language = urlParams.get("language");
const type = urlParams.get("type");

function notFoundLanguage() {
  let languageNotFound = document.createElement("p");
  languageNotFound.style.width = "100%";
  languageNotFound.style.flex = 1;
  languageNotFound.style.display = "flex";
  languageNotFound.style.justifyContent = "center";
  languageNotFound.style.alignItems = "center";
  languageNotFound.style.fontSize = "24px";

  languageNotFound.textContent =
    "Hai scritto male il nome della materia, prova ad inserire bene il nome!";
  main.appendChild(languageNotFound);
}

console.log({ language, type });
if (!language) {
  notFoundLanguage();
} else {

  const lang = document.createElement("h1");
  lang.textContent = `${language.toUpperCase()} - ${
    type === "true-or-false" ? "Vero o Falso" : "Scelta multipla"
  }`;

  document.querySelector("main").insertAdjacentElement("afterbegin", lang);

  fetch("./data/quizzes-multiple-choice.json")
    .then((response) => {
      console.log({ response });
      if (!response.ok) {
        throw new Error("File not found!");
      }
      return response.json();
    })
    .then((data) => {
      console.log({ data });
      const lastQuizzes = localStorage.getItem("last-quizzes");
      let lastQuizzesParsed = [];
      if (lastQuizzes) {
        lastQuizzesParsed = JSON.parse(lastQuizzes);
      }
      const filtredQuizzes = data.quizzes.filter(
        (quiz) => quiz.type === type && quiz.language_slug === language
      );
      console.log({ filtredQuizzes });
      for (let quiz of filtredQuizzes) {
        const quizzesContainer = document.getElementById("quizzes");
        const isDone = lastQuizzesParsed.find(
          (lastQuiz) => lastQuiz.slug === quiz.slug
        );
        const quizItem = document.createElement(isDone ? "button" : "a");
        quizItem.style.position = "relative";
        quizItem.disabled = isDone;
        quizItem.classList.add("card");
        if (isDone) {
          quizItem.classList.add("isDisabled");
        }
        quizItem.href = isDone ? "" : `./questions.html?quiz_slug=${quiz.slug}`;
        quizItem.textContent = quiz.name;

        const tagEl = document.createElement("div");
        tagEl.style.position = "absolute";
        tagEl.style.top = "0";
        tagEl.style.right = "0";
        tagEl.style.padding = "8px";
        tagEl.style.backgroundColor = "violet";
        tagEl.style.borderBottomLeftRadius = "16px";
        tagEl.innerHTML = `
        Quiz Completato
    `;
        if (isDone) {
          quizItem.appendChild(tagEl);
        }
        quizzesContainer.appendChild(quizItem);
      }
    })
    .catch((err) => console.error(err));
}
