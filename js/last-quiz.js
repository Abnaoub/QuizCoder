const lastQuizzesEl = document.getElementById('last-quizzes');

const lastQuizzes = localStorage.getItem('last-quizzes');
  if (!lastQuizzes) {
    const NotFoundParagraph = document.createElement('p');
    NotFoundParagraph.textContent = 'Nessun quiz trovato';
    lastQuizzesEl.appendChild(NotFoundParagraph);
  } else {
    const parsed = JSON.parse(lastQuizzes);
    parsed.forEach(quiz => {
      const quizEl = document.createElement('div');
      quizEl.className = 'quiz';
      quizEl.innerHTML = `
        <h2>${quiz.type}</h2>
        <p>Score: ${quiz.score}</p>
      `;
      lastQuizzesEl.appendChild(quizEl);
    });
  }

