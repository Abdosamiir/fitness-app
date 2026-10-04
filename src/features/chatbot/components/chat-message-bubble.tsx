import { UserIcon } from "lucide-react"
import { cn } from "cn"

import { ChatbotAvatar } from "@/features/chatbot/components/chatbot-robot"
import type { ChatMessage } from "@/features/chatbot/lib/types"

/** A single chat bubble: coach on the left, user on the right. */
export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  // Variables
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex items-start gap-2.5",
        isUser ? "flex-row-reverse pl-6" : "pr-6"
      )}
    >
      {isUser ? (
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground ring-1 ring-primary/40">
          <UserIcon className="size-4" />
        </span>
      ) : (
        <ChatbotAvatar />
      )}

      <p
        className={cn(
          "mt-1 rounded-2xl px-3.5 py-2 text-[15px] leading-6 break-words text-foreground",
          isUser ? "rounded-tr-sm bg-brand-800/90" : "rounded-tl-sm bg-card/90"
        )}
      >
        {message.text}
      </p>
    </div>
  )
}

/** Three bouncing dots while the coach is "typing". */
export function ChatTypingBubble() {
  return (
    <div
      className="flex items-start gap-2.5"
      aria-label="Smart Coach is typing"
    >
      <ChatbotAvatar />
      <span className="mt-1 flex h-10 items-center gap-1 rounded-2xl rounded-tl-sm bg-card/90 px-4">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </span>
    </div>
  )
}
