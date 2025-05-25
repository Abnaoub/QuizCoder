const lastQuizzesEl = document.getElementById("last-quizzes");

const lastQuizzes = localStorage.getItem("last-quizzes");
if (!lastQuizzes) {
  const NotFoundParagraph = document.createElement("p");
  NotFoundParagraph.textContent = "Nessun quiz trovato";
  NotFoundParagraph.style.textAlign = "center";
  lastQuizzesEl.appendChild(NotFoundParagraph);
} else {
  const parsed = JSON.parse(lastQuizzes);
  parsed.forEach((quiz) => {
    console.log({ quiz });
    const quizEl = document.createElement("a");
    quizEl.className = "card";
    quizEl.style.position = "relative";
    quizEl.href = `/questions.html?quiz_slug=${quiz.slug}`;
    quizEl.textContent = `${quiz.language} - ${quiz.name}`;
    lastQuizzesEl.appendChild(quizEl);

    const scoreEl = document.createElement("div");
    scoreEl.style.position = "absolute";
    scoreEl.style.top = "0";
    scoreEl.style.right = "0";
    scoreEl.style.padding = "8px";
    scoreEl.style.backgroundColor = "violet";
    scoreEl.style.borderBottomLeftRadius = "16px";
    scoreEl.innerHTML = `
    <span>Score: ${quiz.score} / 5 - </span>
    <span>${quiz.type === 'true-or-false' ? 'Vero o falso' : 'Scelta multipla'}  </span>
    `;
    quizEl.appendChild(scoreEl);

    // const typeEl = document.createElement("div");
    // typeEl.style.position = "absolute";
    // typeEl.style.bottom = "0";
    // typeEl.style.right = "0";
    // typeEl.style.padding = "16px";
    // typeEl.style.backgroundColor = "violet";
    // typeEl.style.borderTopLeftRadius = "16px";
    // typeEl.textContent = quiz.type;
    // quizEl.appendChild(typeEl);
  });
}
