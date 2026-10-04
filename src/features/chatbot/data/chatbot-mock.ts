import type { ChatMessage } from "@/features/chatbot/lib/types"

/** Opening conversation, until a real chat API exists. */
export const INITIAL_MESSAGES: ChatMessage[] = [
  { id: "welcome", role: "bot", text: "Hello How Can I Assist You Today ?" },
]

/** Canned coach reply sent back for every user message. */
export const MOCK_BOT_REPLY = "Of Course! I Will Be Glad To Help!"

/** Simulated "thinking" time before the coach replies, in ms. */
export const MOCK_REPLY_DELAY = 800
