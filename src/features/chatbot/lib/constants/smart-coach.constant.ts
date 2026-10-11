import type { ChatMessage } from "@/features/chatbot/lib/types"

/** Gemini model that powers Smart Coach. */
export const SMART_COACH_MODEL = "gemini-3.1-flash-lite"

export const SMART_COACH_SYSTEM_INSTRUCTION = `You are "Smart Coach", an expert AI fitness coach inside a fitness app.
Help users with workouts, training plans, nutrition, weight gain or loss, recovery and healthy habits.
Keep answers friendly, practical and concise — short paragraphs or short bullet lists that fit a small chat window.
If a question involves injury, pain or a medical condition, give general guidance and recommend a professional.
Politely steer off-topic questions back to fitness and health.`

/** Greeting shown when the chat opens; never sent to the model. */
export const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "bot",
  text: "Hello How Can I Assist You Today ?",
}

export const SMART_COACH_ERROR_TEXT =
  "Sorry, I'm having trouble connecting right now. Please try again."

/** localStorage key holding the saved conversations. */
export const CONVERSATIONS_STORAGE_KEY = "smart-coach-conversations"

/** Oldest conversations beyond this count are dropped. */
export const MAX_SAVED_CONVERSATIONS = 20
