import { useMutation } from "@tanstack/react-query"

import { smartCoachApi } from "@/features/chatbot/lib/api/smart-coach"

export const useAskSmartCoach = () =>
  useMutation({
    mutationFn: smartCoachApi.ask,
  })
