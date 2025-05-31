document.getElementById("emailForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const message = document.getElementById("responseMessage");

  fetch("http://localhost:3000/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      return response.json().then((data) => {
        if (response.ok) {
          message.style.color = "green";
          message.textContent = data.message;
          document.getElementById("emailForm").reset();
          localStorage.setItem("subscribed", "true");
          location.href = "./last-quizzes.html";
        } else {
          message.style.color = "red";
          message.textContent = data.error || data.details;
        }
      });
    })
    .catch((error) => {
      message.style.color = "red";
      message.textContent = "Errore di rete o server.";
    });
});
