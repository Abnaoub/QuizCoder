document.addEventListener("DOMContentLoaded", () => {
  const questionType = document.getElementById("questions_type");

  fetch("./data/pagina-home.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      json.questionTypes.forEach((type) => {
        const a = document.createElement("a");
        a.className = "question_type_item";
        a.href = type.link;
        let titleElement = document.createElement("p");
        titleElement.textContent = type.name;
        a.appendChild(titleElement);
        let descriptionElement = document.createElement("p");
        descriptionElement.textContent = type.description;
        a.appendChild(descriptionElement);
        questionType.appendChild(a);
      });
    })
    .catch((err) => {
      console.error("Errore durante il fetch:", err);
      container.innerHTML = "<p>Impossibile caricare le opzioni.</p>";
    });
});

// const questions_type = document.getElementById("questions_type");

// fetch("./data/pagina-home.json")
//   .then((response) => response.json())
//   .then((data) => {
//     for (let questionType of data.questionTypes) {
//       const a = document.createElement("a");
//       a.className = "questions_type";
//       a.href = questionType.link;
//       let titleElement = document.createElement("h2");
//       titleElement.textContent = questionType.name;
//       a.appendChild(titleElement);
//       let descriptionElement = document.createElement("p");
//       descriptionElement.textContent = questionType.description;
//       a.appendChild(descriptionElement);
//       questions_type.appendChild(a);
//     }
//   })

//   .catch((err) => console.error(err));
