const { createCompletion, loadModel } = require('gpt4all');
const path = require('path');
const fs = require('fs');

async function getAIResponse(topic) {
  try {
    // Definiere und erstelle Modell-Verzeichnis falls nicht vorhanden
    const modelPath = path.join(process.cwd(), 'models');
    if (!fs.existsSync(modelPath)) {
      fs.mkdirSync(modelPath, { recursive: true });
    }
    console.log('Model path:', modelPath);
    
    // Verwende das kleinste verfügbare Modell
    const model = await loadModel('orca-mini-3b-gguf2-q4_0.gguf', { 
      modelPath: modelPath,
      verbose: true 
    });
    console.log('Model loaded successfully');

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

    console.log('Generating response...');
    const response = await createCompletion(model, prompt, {
      temp: 0.7,
      maxTokens: 500,
      topK: 40,
      topP: 0.9,
    });

    return response;

  } catch (error) {
    console.error('Detailed AI Error:', error);
    throw new Error(`Fehler bei der KI-Generierung: ${error.message}`);
  }
}

module.exports = { getAIResponse };