import { useEffect, useRef, type KeyboardEvent } from "react"
import { ChevronRightIcon, PlusIcon } from "lucide-react"
import { cn } from "cn"

import type { Conversation } from "@/features/chatbot/lib/types"

/** Preview line for a thread: its first user message. */
function getConversationTitle(conversation: Conversation) {
  return (
    conversation.messages.find((message) => message.role === "user")?.text ??
    "New conversation"
  )
}

/**
 * "Previous Conversations" card, dropped over the chat panel's top-left
 * corner. Closes on outside click or Escape.
 */
export function ConversationsMenu({
  id,
  conversations,
  activeId,
  onSelect,
  onNewConversation,
  onClose,
}: {
  id: string
  conversations: Conversation[]
  activeId: string
  onSelect: (conversationId: string) => void
  onNewConversation: () => void
  onClose: () => void
}) {
  // Ref
  const panelRef = useRef<HTMLDivElement>(null)

  // Functions
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape") return

    // Close only the menu, not the whole drawer.
    event.stopPropagation()
    onClose()
  }

  // Effects
  useEffect(() => {
    panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus()
  }, [])

  return (
    <>
      {/* Outside-click catcher over the rest of the panel */}
      <button
        type="button"
        aria-label="Close previous conversations"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 z-20 cursor-default bg-background/30"
      />

      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-labelledby={`${id}-title`}
        onKeyDown={handleKeyDown}
        className="absolute top-0 left-0 z-30 flex max-h-[70%] w-[72%] origin-top-left animate-in flex-col rounded-xl rounded-tl-[inherit] bg-card/95 shadow-2xl shadow-black/60 backdrop-blur-xl duration-200 fade-in-0 zoom-in-95"
      >
        <h3
          id={`${id}-title`}
          className="shrink-0 px-6 pt-8 pb-3 text-center font-brand text-xl font-bold"
        >
          Previous Conversations
        </h3>

        <ul className="min-h-0 flex-1 scrollbar-thin scrollbar-thumb-brand-800 overflow-y-auto overscroll-contain px-6 hover:scrollbar-thumb-primary">
          {conversations.length === 0 && (
            <li className="py-6 text-center text-sm text-muted-foreground">
              No previous conversations yet.
            </li>
          )}

          {conversations.map((conversation) => {
            const isActive = conversation.id === activeId

            return (
              <li key={conversation.id} className="border-b border-border">
                <button
                  type="button"
                  aria-current={isActive || undefined}
                  onClick={() => onSelect(conversation.id)}
                  className={cn(
                    "group/item flex w-full items-center gap-3 py-3 text-left text-sm outline-none focus-visible:text-primary",
                    isActive ? "text-primary" : "text-foreground/90"
                  )}
                >
                  <span className="min-w-0 flex-1 truncate">
                    {getConversationTitle(conversation)}
                  </span>
                  <ChevronRightIcon className="size-5 shrink-0 text-primary transition-transform group-hover/item:translate-x-0.5" />
                </button>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          onClick={onNewConversation}
          className="flex shrink-0 items-center justify-center gap-1.5 px-6 py-3.5 text-sm font-semibold text-primary outline-none hover:text-brand-400 focus-visible:text-brand-400"
        >
          <PlusIcon className="size-4" />
          New Conversation
        </button>
      </div>
    </>
  )
}
