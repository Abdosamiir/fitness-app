import { useMutation } from "@tanstack/react-query"

import { smartCoachApi } from "@/features/chatbot/lib/api/smart-coach"
import type { ChatMessage } from "@/features/chatbot/lib/types"

export type AskSmartCoachVariables = {
  /** Thread the reply belongs to, so it lands there even after switching. */
  conversationId: string
  messages: ChatMessage[]
}

export const useAskSmartCoach = () =>
  useMutation({
    mutationFn: ({ messages }: AskSmartCoachVariables) =>
      smartCoachApi.ask(messages),
  })
