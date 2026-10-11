export type ChatRole = "bot" | "user"

/** One bubble in the Smart Coach conversation. */
export interface ChatMessage {
  id: string
  role: ChatRole
  text: string
  /** Local-only bubble (greeting, error) that is never sent to the model. */
  local?: boolean
}
