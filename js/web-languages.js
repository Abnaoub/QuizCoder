var schoolSubjectsElement = document.getElementById("web-languages");

fetch("./data/languages.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    for (let language of data.languages) {
      // Check Page Type
      let type;
      if (location.pathname === "/domande-vero-o-falso.html") {
        type = "vero-o-falso";
      } else {
        type = "scelta-multipla";
      }
      //Create Anchor Tag as a school subject container
      let a = document.createElement("a");
      a.className = "language-item";
      a.href = `/quizzes-vero-o-falso.html?language=${language.slug}&type=${type}`;
      a.style.backgroundColor = language.color;
      // Add School Subject Title
      let titleElement = document.createElement("h2");
      titleElement.textContent = language.name;
      a.appendChild(titleElement);
      // Add School Subject Image
      // let image = document.createElement('img');
      // image.src = `images/${schoolSubject.image}`;
      // image.alt = schoolSubject.title;
      // image.width = 300;
      // image.height = 300;
      // a.appendChild(image);
      // Add School Subject Description
      let descriptionElement = document.createElement("p");
      descriptionElement.textContent = language.description;
      a.appendChild(descriptionElement);
      schoolSubjectsElement.appendChild(a);
    }
  })
  .catch((err) => console.error(err));

// INTERAZIONI HTML-CSS
const header = document.getElementById("header");
const hamburger = document.getElementById("burger");
const nav = document.getElementById("nav-menu");

// Header scroll effect
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Hamburger menu toggle
if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active"); // animazione burger
    nav.classList.toggle("nav-active"); // mostra/nasconde il menu
  });
}
