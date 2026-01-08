import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function run() {
  const response = await client.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct",
    messages: [
      { role: "user", content: "Explain recursion simply" }
    ],
  });

  console.log(response.choices[0].message.content);
}

run();
