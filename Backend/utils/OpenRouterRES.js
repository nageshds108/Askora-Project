import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

/**
 * Get AI response from OpenRouter (free model)
 * @param {string} prompt - user message
 * @returns {string} assistant reply
 */
const APIResponse = async (prompt) => {
  try {
    const response = await client.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct",
      messages: [
        { role: "user", content: prompt }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    throw new Error("Failed to get AI response");
  }
};

export default APIResponse;
