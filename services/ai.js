const { GPT4All } = require("gpt4all");

async function getAIResponse(topic) {
  const gpt4all = new GPT4All("gpt4all-j-v1.3-groovy");
  await gpt4all.init();

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

  const response = await gpt4all.generate(prompt, {
    temp: 0.7,
    maxTokens: 500,
    topK: 40,
    topP: 0.9,
  });

  return response;
}

module.exports = { getAIResponse };