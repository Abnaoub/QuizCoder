const header = `
  <header class="header" id="header">
    <a href="/" class="logo">QuizCoder</a>
    
    <button class="burger" id="burger-btn" aria-label="Menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav class="nav" id="nav-menu">
      <a href="/">HOME</a>
      <a href="/true-or-false.html">VERO O FALSO</a>
      <a href="/multiple-choice.html">SCELTA MULTIPLA</a>
      <a href="/last-quizzes.html">ULTIMI QUIZZES</a>
      <a id="subscribe-anchor" href="/subscribe.html">ISCRIVITI!</a>
    </nav>
  </header>
`;

document.body.insertAdjacentHTML("afterbegin", header);

const burgerBtn = document.getElementById("burger-btn");
const navMenu = document.getElementById("nav-menu");

burgerBtn.addEventListener("click", () => {
  navMenu.classList.toggle("nav-active");
  burgerBtn.classList.toggle("open");
});

function toggleSubscribeAnchor() {
  let subscribed = localStorage.getItem('subscribed')
  const subscribeAnchor = document.getElementById('subscribe-anchor')
  if(subscribed){
    console.log('SUBSCRIBED!!!!')
    subscribeAnchor.remove()
  }
}

toggleSubscribeAnchor()