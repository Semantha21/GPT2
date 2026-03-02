// openai.js
import fetch from "node-fetch";
import "dotenv/config";

// Function to send a message to ChatAnywhere GPT API
const getOpenAIAPIResponse = async (message) => {
  try {
    const response = await fetch(
      "https://api.chatanywhere.tech/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // ChatAnywhere API returns message content here
    return data.choices?.[0]?.message?.content || "No response from API";

  } catch (err) {
    console.error("ChatAnywhere API error:", err);
    return "Error fetching response from ChatAnywhere API";
  }
};

export default getOpenAIAPIResponse;
