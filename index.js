const express = require("express");
const app = express();
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { GPT4All } = require("gpt4all");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmNTs5oFS0Z25MgQ51HFJEZx6zN5EzqnI",
  authDomain: "teacherapp-c19fc.firebaseapp.com",
  projectId: "teacherapp-c19fc",
  storageBucket: "teacherapp-c19fc.firebasestorage.app",
  messagingSenderId: "768134780449",
  appId: "1:768134780449:web:0377358f2f3020c640b560",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Learning endpoint
app.post("/learn", async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Kein Thema angegeben" });
    }

    // Ausführlichere Antwort
    const response = `
      Hier ist eine Lektion über ${topic}:

      1. Grundlegende Erklärung:
      ${topic} ist ein wichtiges Thema zum Lernen. Es umfasst verschiedene Aspekte, 
      die wir Schritt für Schritt erkunden werden.

      2. Beispiel:
      Ein praktisches Beispiel zu ${topic} wäre: Wenn wir ${topic} im Alltag 
      betrachten, sehen wir oft...

      3. Übungsfrage:
      Erkläre in deinen eigenen Worten: Was sind die wichtigsten Aspekte von ${topic} 
      und warum sind sie bedeutsam?
    `;

    res.json({ content: response });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Serverfehler beim Generieren der Antwort" });
  }
});

// Server starten
const port = 3000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});