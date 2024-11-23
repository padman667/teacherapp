const { createCompletion, loadModel } = require('gpt4all');
const path = require('path');

async function getAIResponse(topic) {
  try {
    // Definiere einen spezifischen Modell-Speicherort
    const modelPath = path.join(process.cwd(), 'models');
    console.log('Model path:', modelPath); // Debugging
    
    // Lade das Modell mit spezifischem Pfad
    const model = await loadModel('mistral-7b-instruct-v0.1.Q4_0.gguf', { 
      modelPath: modelPath,
      verbose: true 
    });

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