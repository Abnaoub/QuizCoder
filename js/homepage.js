const questionType = document.getElementById("questions_type");

fetch("./data/homepage.json")
  .then((response) => {
    console.log({ response });
    if (!response.ok) {
      throw new Error("File not found!");
    }
    return response.json();
  })
  .then((questionTypes) => {
    questionTypes.questionTypes.forEach((type) => {
      const a = document.createElement("a");
      a.className = "question_type_item";
      a.href = type.slug;
      let titleElement = document.createElement("p");
      titleElement.textContent = type.name;
      a.appendChild(titleElement);
      let descriptionElement = document.createElement("p");
      descriptionElement.style.textAlign = "center";
      descriptionElement.textContent = type.description;
      a.appendChild(descriptionElement);
      questionType.appendChild(a);
    });
  })

  .catch((err) => console.error(err));
