const { GPT4All } = require("gpt4all");

async function getAIResponse(topic) {
  const gpt4all = new GPT4All("gpt4all-j-v1.3-groovy");
  await gpt4all.init();

  const response = await gpt4all.generate(`
    Teach about ${topic}. Include:
    1. Basic explanation
    2. One example
    3. One practice question
  `);

  return response;
}

module.exports = { getAIResponse };
