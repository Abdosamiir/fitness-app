import { useEffect, useRef, useState } from "react"
import { TextAlignEndIcon } from "lucide-react"

import chatBackground from "@/assets/imgs/Rectangle 1.png"
import chatbotOpen from "@/assets/imgs/chatbot-open.png"
import {
  ChatMessageBubble,
  ChatTypingBubble,
} from "@/features/chatbot/components/chat-message-bubble"
import { ChatComposer } from "@/features/chatbot/components/chat-composer"
import { ChatbotRobot } from "@/features/chatbot/components/chatbot-robot"
import {
  INITIAL_MESSAGES,
  MOCK_BOT_REPLY,
  MOCK_REPLY_DELAY,
} from "@/features/chatbot/data/chatbot-mock"
import type { ChatMessage } from "@/features/chatbot/lib/types"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/shared/components/ui/message-scroller"

/**
 * "Smart Coach" chatbot: a floating robot pinned bottom-right of every app
 * page. Tapping it slides up a non-modal chat panel; the robot then rides on
 * top of the panel as its close button.
 */
export function ChatbotModule() {
  // State
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [isReplying, setIsReplying] = useState(false)

  // Ref
  const replyTimer = useRef<number | undefined>(undefined)

  // Functions
  function handleSend(text: string) {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text },
    ])
    setIsReplying(true)

    // TODO: replace with the real coach API once the backend exposes one.
    replyTimer.current = window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "bot", text: MOCK_BOT_REPLY },
      ])
      setIsReplying(false)
    }, MOCK_REPLY_DELAY)
  }

  // Effects
  useEffect(() => () => window.clearTimeout(replyTimer.current), [])

  return (
    <Drawer open={open} onOpenChange={setOpen} modal={false}>
      {/* Closed state: robot floating in the corner */}
      <DrawerTrigger
        aria-label="Open Smart Coach chat"
        className="group/robot fixed right-4 bottom-4 z-40 transition-[opacity,scale] duration-300 outline-none data-popup-open:pointer-events-none data-popup-open:scale-90 data-popup-open:opacity-0 md:right-8 md:bottom-8"
      >
        <ChatbotRobot label="Hey Ask Me" />
      </DrawerTrigger>

      <DrawerContent className="dark rounded-3xl border-2 border-primary bg-transparent font-brand shadow-2xl shadow-black/60 [--drawer-inset:--spacing(4)] data-[swipe-axis=y]:left-auto md:[--drawer-inset:--spacing(8)] dark:border-primary">
        {/* Open state: the robot sits on the panel's top edge as its close button */}
        <DrawerClose
          aria-label="Close Smart Coach chat"
          className="absolute bottom-[calc(100%-1.25rem)] left-1/2 z-10 -translate-x-1/2 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <img
            src={chatbotOpen}
            alt=""
            aria-hidden
            width={136}
            height={137}
            draggable={false}
            className="w-34 select-none"
          />
        </DrawerClose>

        <div className="relative isolate flex h-[min(40rem,calc(100dvh-10rem))] w-[min(23.5rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[inherit] text-foreground">
          {/* Blurred gym photo + darkening scrim */}
          <img
            src={chatBackground}
            alt=""
            aria-hidden
            className="absolute inset-0 -z-20 size-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-background/40"
          />

          <header className="flex items-center justify-between px-5 pt-9 pb-4">
            <DrawerTitle className="font-brand text-xl font-bold">
              Smart Coach
            </DrawerTitle>
            <TextAlignEndIcon aria-hidden className="size-6 text-primary" />
          </header>

          <MessageScrollerProvider autoScroll defaultScrollPosition="end">
            <MessageScroller className="flex-1">
              <MessageScrollerViewport aria-label="Smart Coach conversation">
                <MessageScrollerContent className="gap-4 px-4 pb-4">
                  {messages.map((message) => (
                    <MessageScrollerItem
                      key={message.id}
                      messageId={message.id}
                      scrollAnchor={message.role === "user"}
                    >
                      <ChatMessageBubble message={message} />
                    </MessageScrollerItem>
                  ))}

                  {isReplying && (
                    <MessageScrollerItem messageId="typing">
                      <ChatTypingBubble />
                    </MessageScrollerItem>
                  )}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>

          <div className="px-6 pt-2 pb-6">
            <ChatComposer disabled={isReplying} onSend={handleSend} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
