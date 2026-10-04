import { GoogleGenAI, type Content } from "@google/genai"

import {
  SMART_COACH_MODEL,
  SMART_COACH_SYSTEM_INSTRUCTION,
} from "@/features/chatbot/lib/constants/smart-coach.constant"
import type { ChatMessage } from "@/features/chatbot/lib/types"

let client: GoogleGenAI | undefined

function getClient() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set")
  }

  client ??= new GoogleGenAI({ apiKey })
  return client
}

/** Maps the visible conversation to Gemini turns, skipping local-only bubbles. */
function toContents(messages: ChatMessage[]): Content[] {
  return messages
    .filter((message) => !message.local)
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.text }],
    }))
}

export const smartCoachApi = {
  /** Sends the whole conversation (ending with the user's new message). */
  ask: async (messages: ChatMessage[]): Promise<string> => {
    const response = await getClient().models.generateContent({
      model: SMART_COACH_MODEL,
      contents: toContents(messages),
      config: { systemInstruction: SMART_COACH_SYSTEM_INSTRUCTION },
    })

    if (!response.text) {
      throw new Error("Smart Coach returned an empty response")
    }

    return response.text
  },
}
