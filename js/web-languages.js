var webLanguages = document.getElementById("web-languages");

fetch("./data/languages.json")
  .then((response) => response.json())
  .then((data) => {
    for (let language of data.languages) {
      let type;
      if (location.pathname === "/domande-vero-o-falso.html") {
        type = "vero-o-falso";
      } else {
        type = "scelta-multipla";
      }
      let a = document.createElement("a");
      a.className = "language-item";
      a.href = `/quizzes-vero-o-falso.html?language=${language.slug}&type=${type}`;
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
