document.getElementById('emailForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const message = document.getElementById('responseMessage');

  try {
    const response = await fetch('http://localhost:3000/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      message.style.color = 'green';
      message.textContent = data.message;
      document.getElementById('emailForm').reset();
    } else {
      message.style.color = 'red';
      message.textContent = data.error || data.details;
    }
  } catch (error) {
    message.style.color = 'red';
    message.textContent = 'Errore di rete o server.';
  }
});
