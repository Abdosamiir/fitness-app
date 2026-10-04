import { useEffect, useMemo, useState } from "react"

import {
  CONVERSATIONS_STORAGE_KEY,
  MAX_SAVED_CONVERSATIONS,
  WELCOME_MESSAGE,
} from "@/features/chatbot/lib/constants/smart-coach.constant"
import type { ChatMessage, Conversation } from "@/features/chatbot/lib/types"

function createConversation(): Conversation {
  return {
    id: crypto.randomUUID(),
    messages: [WELCOME_MESSAGE],
    updatedAt: Date.now(),
  }
}

/** A thread is worth saving/listing once the user has said something. */
function hasUserMessage(conversation: Conversation) {
  return conversation.messages.some((message) => message.role === "user")
}

function loadConversations(): Conversation[] {
  try {
    const raw = localStorage.getItem(CONVERSATIONS_STORAGE_KEY)
    const saved: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(saved) ? (saved as Conversation[]) : []
  } catch {
    return []
  }
}

function saveConversations(conversations: Conversation[]) {
  try {
    const worthSaving = conversations
      .filter(hasUserMessage)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, MAX_SAVED_CONVERSATIONS)
    localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(worthSaving))
  } catch {
    // Storage full or blocked (private mode): history just won't persist.
  }
}

/**
 * Smart Coach chat threads: the active one plus earlier ones restored from
 * localStorage. Every open starts on a fresh thread.
 */
export function useConversations() {
  // State
  const [conversations, setConversations] = useState<Conversation[]>(() => [
    createConversation(),
    ...loadConversations(),
  ])
  const [activeId, setActiveId] = useState(() => conversations[0].id)

  // Variables
  const activeConversation =
    conversations.find((conversation) => conversation.id === activeId) ??
    conversations[0]

  const history = useMemo(
    () =>
      conversations
        .filter(hasUserMessage)
        .sort((a, b) => b.updatedAt - a.updatedAt),
    [conversations]
  )

  // Functions
  function appendMessage(conversationId: string, message: ChatMessage) {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: [...conversation.messages, message],
              updatedAt: Date.now(),
            }
          : conversation
      )
    )
  }

  function startNewConversation() {
    // Reuse the current thread if it is still untouched.
    if (!hasUserMessage(activeConversation)) return

    const conversation = createConversation()
    setConversations((prev) => [conversation, ...prev.filter(hasUserMessage)])
    setActiveId(conversation.id)
  }

  function selectConversation(conversationId: string) {
    // Drop the untouched thread we're leaving so it doesn't pile up.
    setConversations((prev) =>
      prev.filter(
        (conversation) =>
          conversation.id === conversationId || hasUserMessage(conversation)
      )
    )
    setActiveId(conversationId)
  }

  // Effects
  useEffect(() => saveConversations(conversations), [conversations])

  return {
    activeConversation,
    history,
    appendMessage,
    startNewConversation,
    selectConversation,
  }
}
