var webLanguages = document.getElementById("web-languages");

fetch("./data/front-end-languages.json")
  .then((response) => response.json())
  .then((data) => {
    for (let language of data.languages) {
      let a = document.createElement("a");
      a.className = "language-item";
      a.href = `/true-or-false-quizzes.html?language=${language.slug}&type=true-or-false`;
      a.style.backgroundColor = language.color;
      let titleElement = document.createElement("h2");
      titleElement.textContent = language.name;
      a.appendChild(titleElement);
      let descriptionElement = document.createElement("p");
      descriptionElement.textContent = language.description;
      a.appendChild(descriptionElement);
      webLanguages.appendChild(a);
    }
  })
  .catch((err) => console.error(err));
