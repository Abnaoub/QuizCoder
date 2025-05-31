# QuizCoder (Front-End)

QuizCoder è un'applicazione web dinamica per creare e gestire quiz interattivi.

## 🚀 Tecnologie usate

- HTML
- CSS
- JavaScript

## 📂 Struttura del progetto

- **index.html**: Pagina principale del sito.
- **header.js / footer.js**: Inclusi in tutte le pagine HTML per evitare la duplicazione del codice.
- **global.css**: Stile generale applicato uniformemente a tutte le pagine.

### 📑 Organizzazione delle pagine

Ogni pagina HTML ha:
- Un file JS con logiche specifiche della pagina.
- Un file CSS personalizzato per la grafica dedicata della pagina.

### 📚 Cartella data

- Contiene file JSON utilizzati per rendere dinamico il contenuto delle pagine HTML tramite richieste Fetch API senza toccare le pagine HTML.

## 📥 Installazione

Clona la repository:
```bash
git clone https://github.com/Abnaoub/QuizCoder.git
```

Apri il file `index.html` con un browser per utilizzare l'applicazione.

## 🔗 Comunicazione con il Back-End

L'applicazione comunica con il server back-end tramite richieste REST API. È necessario avviare il Back-End per avere tutte le funzionalità.
Per vedere i risultati dei quiz è necessario avviare il Back-End mandare richieste POST al endpoint `/subscribe`, solo se la chiamata va a buon fine viene aggiunto nel local storage "subscribed: success" e quindi si può accedere alla pagina "last-quiz.html".

## ⚙️ Dipendenze

- Non richiede installazioni particolari; esegue chiamate REST tramite JavaScript nativo.

## 📌 Requisiti

- Browser moderno (Chrome, Firefox, Edge, Safari)
