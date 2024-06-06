const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateResponse(prompt) {
  const completion = await openai.chat.completions.create({
    messages: prompt,
    model: "gpt-3.5-turbo",
    frequency_penalty: 1,
    temperature: 2,
    top_p: 0,
  });

  return completion.choices[0].message.content;
}

module.exports = { generateResponse };
