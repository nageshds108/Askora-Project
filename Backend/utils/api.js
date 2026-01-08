import "dotenv/config";

const getGeminiResponse = async (message) => {
  try {
    console.log("GEMINI KEY USED BY SERVER =>", process.env.GEMINI_API);

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("Gemini returned no text");
      return null;
    }

    return text;
  } catch (err) {
    console.error("Gemini API error:", err);
    return null;
  }
};

export default getGeminiResponse;
