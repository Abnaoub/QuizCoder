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
          <a href="/">HOME</a>
        </div>
        <a href="/true-or-false.html">VERO O FALSO</a>
        <a href="/multiple-choice.html">SCELTA MULTIPLA</a>
        <a href="/last-quizzes.html">ULTIMI QUIZZES</a>
        <a>CONTATTACI</a>
      </nav>
    </header>
`

document.body.insertAdjacentHTML("afterbegin", header);
