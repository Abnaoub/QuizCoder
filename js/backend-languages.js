var webLanguages = document.getElementById("web-languages");


fetch("./data/back-end-languages.json")
  .then((response) => response.json())
  .then((data) => {
    console.log({data})
    for (let language of data.languages) {
      let a = document.createElement("a");
      a.className = "language-item";
      a.href = `./multiple-choice-quizzes.html?language=${language.slug}&type=multiple-choice`;
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
