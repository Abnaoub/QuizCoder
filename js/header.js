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
          <div class="dropdown-content">
            <a href="#">sottosezione1</a>
            <a href="#">sottosezione2</a>
            <a href="#">sottosezione3</a>
          </div>
        </div>

        <a href="#">Quiz</a>
        <a href="#">Ultimi quiz</a>
        <a href="#">Sezione 4</a>
      </nav>

      <div class="accesso">
        <button class="login">Login</button>
        <a href="#" class="sign-up">Sign Up</a>
      </div>
    </header>
`;

document.body.insertAdjacentHTML('afterbegin', header)