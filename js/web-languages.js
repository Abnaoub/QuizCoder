var schoolSubjectsElement = document.getElementById("web-languages");

fetch("./data/languages.json")
  .then((response) => response.json())
  .then((data) => {
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
      // <a></a>
      a.className = "language-item";
      // <a class="language-itm"></a>
      a.href = `/quizzes-vero-o-falso.html?language=${language.slug}&type=${type}`;
      // <a class="language-itm" href="/quizzes-vero-o-falso.html?language=${language.slug}&type=${type}"></a>
      a.style.backgroundColor = language.color;
      // <a style="background-color: color" class="language-itm" href="/quizzes-vero-o-falso.html?language=${language.slug}&type=${type}"></a>
      // Add School Subject Title
      let titleElement = document.createElement("h2");
      // <h2></h2>
      titleElement.textContent = language.name;
      // <h2>HTML</h2>
      a.appendChild(titleElement);
      // <a style="background-color: color" class="language-itm" href="/quizzes-vero-o-falso.html?language=${language.slug}&type=${type}">
      // <h2>HTML</h2>
      // </a>

      let descriptionElement = document.createElement("p");
      // <p></p>
      descriptionElement.textContent = language.description;
      // <p>description</p>
      a.appendChild(descriptionElement);
      // <a style="background-color: color" class="language-itm" href="/quizzes-vero-o-falso.html?language=${language.slug}&type=${type}">
      // <h2>HTML</h2>
      // <p>description</p>
      // </a>

      schoolSubjectsElement.appendChild(a);
      // <div id="web-languages">
        // <a style="background-color: color" class="language-itm" href="/quizzes-vero-o-falso.html?language=${language.slug}&type=${type}">
          // <h2>HTML</h2>
          // <p>description</p>
        // </a>
                // <a style="background-color: color" class="language-itm" href="/quizzes-vero-o-falso.html?language=${language.slug}&type=${type}">
          // <h2>HTML</h2>
          // <p>description</p>
        // </a>
                // <a style="background-color: color" class="language-itm" href="/quizzes-vero-o-falso.html?language=${language.slug}&type=${type}">
          // <h2>HTML</h2>
          // <p>description</p>
        // </a>
                // <a style="background-color: color" class="language-itm" href="/quizzes-vero-o-falso.html?language=${language.slug}&type=${type}">
          // <h2>HTML</h2>
          // <p>description</p>
        // </a>
                // <a style="background-color: color" class="language-itm" href="/quizzes-vero-o-falso.html?language=${language.slug}&type=${type}">
          // <h2>HTML</h2>
          // <p>description</p>
        // </a>
      // </div>
    }
  })
  .catch((err) => console.error(err));