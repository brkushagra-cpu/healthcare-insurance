import { GoogleGenerativeAI } from "@google/generative-ai";

let model;

function getModel() {
  if (!model) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }
  return model;
}

export async function getAIResponse(userMessage, contextData) {
  if (!process.env.GEMINI_API_KEY) {
    return "I'm the Eptain AI Copilot. Please provide a Gemini API key in the .env to unlock full conversational AI.";
  }

  try {
    const prompt = `You are an expert insurance advisor for Eptain, a premium enterprise insurtech platform trusted by leading healthcare carriers. 

Your role: Help users understand insurance plans, compare options, and make informed decisions. Be professional, clear, and concise. Use the available plans data as context when relevant.

Available Plans: ${JSON.stringify(contextData || [])}

User Question: ${userMessage}

Respond in a helpful, professional tone. Keep responses under 150 words.`;

    const result = await getModel().generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Gemini API Error:", err.message);
    return "I'm experiencing a brief connectivity issue. Please try again in a moment, or explore our plans directly.";
  }
}
