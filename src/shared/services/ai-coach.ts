import { GoogleGenerativeAI } from '@google/generative-ai';


export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

// Ensure you have VITE_GEMINI_API_KEY in your .env file
console.log("Checking API Key:", import.meta.env.VITE_GEMINI_API_KEY); // Add this
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-3.1-flash-lite",
  systemInstruction: `You are "Smart Coach", an expert AI fitness coach...` 
});

export async function askSmartCoach(history: ChatMessage[], newPrompt: string): Promise<string> {
  try {
    // 1. Initialize chat session with history
    const chat = model.startChat({
      history: history
        .filter((msg) => msg.text !== "Hello How Can I Assist You Today ?")
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        })),
    });

    // 2. Send the new message
    const result = await chat.sendMessage(newPrompt);
    const response = await result.response;
    
    return response.text() ?? "No response generated.";
  } catch (error) {
    console.error("Gemini SDK Error:", error);
    return "Sorry, I'm having trouble connecting right now.";
  }
}