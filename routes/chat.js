const express = require("express");
const OpenAI = require("openai");
const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/query", async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Falta el parámetro 'question'" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // o "gpt-3.5-turbo" si no tienes GPT-4
      messages: [
        { role: "system", content: "Eres un asistente académico para estudiantes de posgrado." },
        { role: "user", content: question },
      ],
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error("Error al contactar OpenAI:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

module.exports = router;

