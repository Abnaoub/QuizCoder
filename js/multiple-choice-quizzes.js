document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(location.search);
  const type = urlParams.get("type") || "scelta-multipla";
  const language = urlParams.get("language") || "html";

  const quizzesContainer = document.getElementById("quizzes");

  const filePath =
    type === "multiple-choice"
      ? "./data/multiple-choice-quizzes.json"
      : "./data/true-or-false-quizzes.json";

  fetch(filePath)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log("DATA LOADED:", data);
      const byType = data[type];
      if (!byType) {
        quizzesContainer.textContent = "Tipo di quiz non valido.";
        return;
      }

      const languageGroup = byType.find(
        (group) => group.language_slug === language
      );
      if (!languageGroup) {
        quizzesContainer.textContent = "Nessuna lingua corrispondente.";
        return;
      }

      quizzesContainer.innerHTML = "";
      for (const quiz of languageGroup.quizzes) {
        const a = document.createElement("a");
        a.className = "card";
        a.href = `questions.html?quiz_slug=${quiz.slug}&type=${quiz.type}`;

        const h3 = document.createElement("h3");
        h3.textContent = quiz.name;
        a.appendChild(h3);

        quizzesContainer.appendChild(a);
      }
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      quizzesContainer.textContent = "Errore nel caricamento dei quiz.";
    });
});
