const { GPT4All } = require("gpt4all");

async function getAIResponse(topic) {
  // Initialisiere das Modell nur einmal und wiederverwendbar
  const gpt4all = new GPT4All("gpt4all-j-v1.3-groovy");
  await gpt4all.init();

  const prompt = `
    Als Lehrer, erkläre das Thema "${topic}" auf Deutsch. Bitte include:
    1. Eine grundlegende Erklärung (2-3 Sätze)
    2. Ein konkretes Beispiel
    3. Eine Übungsaufgabe mit Lösung
    
    Formatiere die Antwort klar und übersichtlich.
  `;

  const response = await gpt4all.generate(prompt, {
    temp: 0.7,          // Kreativität (0.0 - 1.0)
    maxTokens: 500,     // Maximale Länge der Antwort
    topK: 40,          // Top K Sampling
    topP: 0.9,         // Top P Sampling
  });

  return response;
}

module.exports = { getAIResponse };