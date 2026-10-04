export type ChatRole = "bot" | "user"

/** One bubble in the Smart Coach conversation. */
export interface ChatMessage {
  id: string
  role: ChatRole
  text: string
}
