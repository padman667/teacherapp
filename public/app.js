// Helper functions
function showMessage(message) {
  const errorElement = document.getElementById("errorMessage");
  if (errorElement) {
    errorElement.innerText = message;
  } else {
    console.error("Error element not found");
  }
}

function showFeedback(message, type = "success") {
  const feedbackElement = document.getElementById("feedbackMessage");
  if (feedbackElement) {
    feedbackElement.innerText = message;
    feedbackElement.className = "feedback " + type;
  }
}

// Auth functions
async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    showMessage("Registrierung erfolgreich!");
  } catch (error) {
    showMessage("Fehler bei der Registrierung: " + error.message);
  }
}

async function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    showMessage("Anmeldung erfolgreich!");
  } catch (error) {
    showMessage("Fehler bei der Anmeldung: " + error.message);
  }
}

function signOut() {
  firebase.auth().signOut();
  showMessage("Abmeldung erfolgreich");
}

// Learning function
async function getHelp() {
  const topic = document.getElementById("topic").value;
  if (!topic) {
    showMessage("Bitte gib ein Thema ein");
    return;
  }

  try {
    const response = await fetch("/learn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      throw new Error("Netzwerkfehler");
    }

    const data = await response.json();
    const responseElement = document.getElementById("response");
    if (data.content) {
      responseElement.innerText = data.content;

      // Zeige die Übungssektion
      const practiceSection = document.getElementById("practiceSection");
      if (practiceSection) {
        practiceSection.classList.remove("hidden");
      }

      // Extrahiere und zeige die Übungsfrage
      const questionMatch = data.content.match(/3\. Übungsfrage:\s*([^\n]+)/);
      if (questionMatch) {
        const practiceQuestion = document.getElementById("practiceQuestion");
        if (practiceQuestion) {
          practiceQuestion.innerText = questionMatch[1];
        }
      }
    } else {
      responseElement.innerText = "Keine Antwort erhalten";
    }
  } catch (error) {
    showMessage("Fehler: " + error.message);
  }
}

// Answer submission
async function submitAnswer() {
  const answer = document.getElementById("practiceAnswer").value;
  if (!answer) {
    showFeedback("Bitte gib eine Antwort ein", "error");
    return;
  }

  try {
    showFeedback(
      "Danke für deine Antwort! " +
        "Vergleiche sie mit der Erklärung oben und überprüfe, " +
        "ob du die wichtigsten Punkte erwähnt hast.",
      "success",
    );
  } catch (error) {
    showFeedback(
      "Fehler beim Überprüfen der Antwort: " + error.message,
      "error",
    );
  }
}

// Auth state observer
firebase.auth().onAuthStateChanged((user) => {
  const authSection = document.getElementById("authSection");
  const learningSection = document.getElementById("learningSection");

  if (user) {
    // User is signed in
    authSection.classList.add("hidden");
    learningSection.classList.remove("hidden");
  } else {
    // User is signed out
    authSection.classList.remove("hidden");
    learningSection.classList.add("hidden");
  }
});
