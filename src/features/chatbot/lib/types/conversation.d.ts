import type { ChatMessage } from "./chat-message"

/** One Smart Coach chat thread, persisted in this browser. */
export interface Conversation {
  id: string
  messages: ChatMessage[]
  /** Epoch ms of the last message; newest conversations list first. */
  updatedAt: number
}
