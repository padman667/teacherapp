const express = require("express");
const app = express();
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { GPT4All } = require("gpt4all");
const { getAIResponse } = require("./services/ai");


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

    // KI-generierte Antwort abrufen
    const aiResponse = await getAIResponse(topic);
    
    // Antwort an Client senden
    res.json({ content: aiResponse });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ 
      error: "Serverfehler beim Generieren der Antwort",
      details: error.message 
    });
  }
});

// Server starten
const port = 3000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});