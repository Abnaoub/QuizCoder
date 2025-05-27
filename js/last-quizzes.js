const lastQuizzesEl = document.getElementById("last-quizzes");

const lastQuizzes = localStorage.getItem("last-quizzes");
const isUserSubscribed = localStorage.getItem("subscribed");
if (!isUserSubscribed) {
  location.href = '/subscribe.html'
} else if (!lastQuizzes) {
  const NotFoundParagraph = document.createElement("p");
  NotFoundParagraph.textContent = "Nessun quiz trovato";
  NotFoundParagraph.style.textAlign = "center";
  NotFoundParagraph.style.fontSize = "32px";
  lastQuizzesEl.appendChild(NotFoundParagraph);
} else {
  const parsed = JSON.parse(lastQuizzes);
  parsed.forEach((quiz) => {
    console.log({ quiz });
    const quizEl = document.createElement("a");
    quizEl.className = "card";
    quizEl.style.position = "relative";
    quizEl.style.overflow = "hidden";
    quizEl.href = `/questions.html?quiz_slug=${quiz.slug}`;

    // HTML - Quiz 1
    const quizLanguage = document.createElement("p");
    quizLanguage.textContent = `${quiz.language.toUpperCase()} - ${quiz.name}`;
    quizEl.appendChild(quizLanguage);

    // Scelta Multipla o Vero o falso
    const quizType = document.createElement("p");
    quizType.style.fontSize = "18px";
    quizType.textContent =
      quiz.type === "true-or-false" ? "Vero o falso" : "Scelta multipla";
    quizEl.appendChild(quizType);

    lastQuizzesEl.appendChild(quizEl);

    const scoreEl = document.createElement("div");
    scoreEl.style.position = "absolute";
    scoreEl.style.top = "0";
    scoreEl.style.right = "0";
    scoreEl.style.padding = "8px";
    scoreEl.style.fontSize = "18px";
    scoreEl.style.backgroundColor = "violet";
    scoreEl.style.borderBottomLeftRadius = "16px";
    scoreEl.innerHTML = `
    <span>Score: ${quiz.score} / 5 </span>
    `;
    quizEl.appendChild(scoreEl);
  });
}
