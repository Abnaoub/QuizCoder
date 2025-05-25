const header = `
    <header class="header" id="header">
      <a href="/" class="logo">QuizCoder</a>
      <label class="burger" for="burger">
        <input type="checkbox" id="burger" />
        <span></span>
        <span></span>
        <span></span>
      </label>

      <nav class="nav" id="nav-menu">
        <div class="dropdown">
          <a href="/">Home</a>
        </div>
        <a href="/true-or-false.html">Vero o false</a>
        <a href="/multiple-choice.html">Scelta multipla</a>
        <a href="/last-quiz.html">Ultimi quiz</a>
      </nav>
    </header>
`;

document.body.insertAdjacentHTML("afterbegin", header);
