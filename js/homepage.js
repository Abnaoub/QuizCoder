document.addEventListener("DOMContentLoaded", () => {
  const questionType = document.getElementById("questions_type");

  fetch("./data/homepage.json")
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
        a.href = type.slug;
        let titleElement = document.createElement("p");
        titleElement.textContent = type.name;
        a.appendChild(titleElement);
        let descriptionElement = document.createElement("p");
        descriptionElement.style.textAlign = 'center'
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