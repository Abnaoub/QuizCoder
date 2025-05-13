const main = document.querySelector("main");
var schoolSubjectsElement = document.querySelector("#quizzes-vero-o-falso");

// Get the full query string (like ?subject=html&quiz=2)
console.log({ location });
const queryString = location.search;

// Initialize URLSearchParams with the query string
const urlParams = new URLSearchParams(queryString);
console.log({ urlParams });
// Get specific parameters
const language = urlParams.get("language");
const type = urlParams.get("type");

console.log({ language, type });
if (!language) {
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
} else {
  // Add Language Name to HTML.
  const lang = document.createElement("h1");
  lang.textContent = `${language.toUpperCase()} - ${
    type === "vero-o-falso" ? "Vero o Falso" : "Scelta multipla"
  }`;

  document.querySelector("main").insertAdjacentElement("afterbegin", lang);

  // Add Quizzes to HTML
  fetch("../data/quizzes.json")
    .then((response) => {
      console.log({ response });
      if (!response.ok) {
        throw new Error("File not found!");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      const filtredQuizzes = data.quizzes.filter(
        (quiz) => quiz.type === type && quiz.language_slug === language
      );
      console.log({ filtredQuizzes });
      for(let quiz of filtredQuizzes){
        const quizzesContainer = document.getElementById('quizzes-vero-o-falso');
        const quizItem = document.createElement('a');
        quizItem.className = 'card'
        quizItem.href = `/domande.html?quiz_slug=${quiz.slug}`
        quizItem.textContent = quiz.name
        quizzesContainer.appendChild(quizItem)

      }
    })
    .catch((err) => console.error(err));
}
