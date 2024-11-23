async function getAIResponse(topic) {
  try {
    // Simulierte Antwort für Testzwecke
    const responses = {
      default: {
        grundlegend: "Dies ist ein faszinierendes Thema in unserem Alltag.",
        beispiel: "Ein praktisches Beispiel aus dem Alltag wäre...",
        frage: "Wie würdest du dieses Konzept in deinen eigenen Worten erklären?"
      },
      mathematik: {
        grundlegend: "Mathematik ist die Wissenschaft der Muster und Strukturen.",
        beispiel: "Wenn du 5 Äpfel hast und 3 verschenkst, bleiben 2 übrig.",
        frage: "Wie würdest du die Grundrechenarten jemandem erklären?"
      },
      programmierung: {
        grundlegend: "Programmierung ist die Kunst, Computer Anweisungen zu geben.",
        beispiel: "Ein einfaches Programm könnte 'Hallo Welt' ausgeben.",
        frage: "Welche Programmiersprache würdest du für Anfänger empfehlen und warum?"
      }
    };

    // Wähle passende Antwort oder Standard
    const response = responses[topic.toLowerCase()] || responses.default;

    // Formatiere die Antwort
    return `
      1. Grundlegende Erklärung:
      ${response.grundlegend}

      2. Beispiel:
      ${response.beispiel}

      3. Übungsfrage:
      ${response.frage}
    `;

  } catch (error) {
    console.error('AI Error:', error);
    throw new Error(`Fehler bei der KI-Generierung: ${error.message}`);
  }
}

module.exports = { getAIResponse };