import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "mock-key-for-mvp" // Replaced at runtime
});

export async function getAIResponse(userMessage, contextData) {
  // If no real API key is provided, Fallback to a deterministic mock
  if (!process.env.OPENAI_API_KEY) {
      return "I'm the Eptain AI Copilot (Mock). I can see you have " + contextData.length + " base plans available in the system! Please provide an OpenAI API key in the environment to unlock full RAG conversational capabilities.";
  }

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 300,
    messages: [
      {
        role: "system",
        content: `
You are an expert health insurance advisor for Eptain Protect.
Only answer related to healthcare and vehicle insurance products provided in the context data.
Do not give financial or medical advice beyond general guidance.
Be clear, concise, and trustworthy.
        `
      },
      {
        role: "user",
        content: `User Query: ${userMessage}\nAvailable Plans Context: ${JSON.stringify(contextData)}`
      }
    ]
  });

  return response.choices[0].message.content;
}
