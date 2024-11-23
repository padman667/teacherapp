const { createCompletion, loadModel } = require('gpt4all');

async function getAIResponse(topic) {
  try {
    // Lade das Modell
    const model = await loadModel('gpt4all-j-v1.3-groovy', { verbose: true });

    const prompt = `
      Als Lehrer, erkläre das Thema "${topic}" auf Deutsch. 
      Formatiere deine Antwort EXAKT wie folgt:

      1. Grundlegende Erklärung:
      [Deine Erklärung hier]

      2. Beispiel:
      [Dein Beispiel hier]

      3. Übungsfrage:
      [Deine Frage hier]
    `;

    // Generiere die Antwort
    const response = await createCompletion(model, prompt, {
      temp: 0.7,
      maxTokens: 500,
      topK: 40,
      topP: 0.9,
    });

    return response;

  } catch (error) {
    console.error('AI Error:', error);
    throw new Error(`Fehler bei der KI-Generierung: ${error.message}`);
  }
}

module.exports = { getAIResponse };