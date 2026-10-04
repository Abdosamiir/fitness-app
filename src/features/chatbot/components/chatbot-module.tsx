import { useId, useState } from "react"
import { TextAlignEndIcon } from "lucide-react"

import chatBackground from "@/assets/imgs/Rectangle 1.png"
import chatbotOpen from "@/assets/imgs/chatbot-open.png"
import {
  ChatMessageBubble,
  ChatTypingBubble,
} from "@/features/chatbot/components/chat-message-bubble"
import { ChatComposer } from "@/features/chatbot/components/chat-composer"
import { ChatbotRobot } from "@/features/chatbot/components/chatbot-robot"
import { ConversationsMenu } from "@/features/chatbot/components/conversations-menu"
import { SMART_COACH_ERROR_TEXT } from "@/features/chatbot/lib/constants/smart-coach.constant"
import { useConversations } from "@/features/chatbot/lib/hooks/use-conversations"
import { useAskSmartCoach } from "@/features/chatbot/lib/mutations/smart-coach"
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
  const [menuOpen, setMenuOpen] = useState(false)

  // Mutation
  const {
    mutate: askSmartCoach,
    isPending,
    variables: pendingAsk,
  } = useAskSmartCoach()

  // Custom hooks
  const {
    activeConversation,
    history,
    appendMessage,
    startNewConversation,
    selectConversation,
  } = useConversations()

  // Variables
  const menuId = useId()
  const { messages } = activeConversation
  const isReplying =
    isPending && pendingAsk?.conversationId === activeConversation.id

  // Functions
  function handleSend(text: string) {
    const conversationId = activeConversation.id
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
    }
    appendMessage(conversationId, userMessage)

    askSmartCoach(
      { conversationId, messages: [...messages, userMessage] },
      {
        onSuccess: (reply) =>
          appendMessage(conversationId, {
            id: crypto.randomUUID(),
            role: "bot",
            text: reply,
          }),
        onError: (error) => {
          console.error("Smart Coach error:", error)
          appendMessage(conversationId, {
            id: crypto.randomUUID(),
            role: "bot",
            text: SMART_COACH_ERROR_TEXT,
            local: true,
          })
        },
      }
    )
  }

  function handleSelectConversation(conversationId: string) {
    selectConversation(conversationId)
    setMenuOpen(false)
  }

  function handleNewConversation() {
    startNewConversation()
    setMenuOpen(false)
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) setMenuOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} modal={false}>
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
            <button
              type="button"
              aria-label="Previous conversations"
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? menuId : undefined}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="-m-1.5 rounded-md p-1.5 text-primary transition-colors outline-none hover:bg-primary/15 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <TextAlignEndIcon aria-hidden className="size-6" />
            </button>
          </header>

          {menuOpen && (
            <ConversationsMenu
              id={menuId}
              conversations={history}
              activeId={activeConversation.id}
              onSelect={handleSelectConversation}
              onNewConversation={handleNewConversation}
              onClose={() => setMenuOpen(false)}
            />
          )}

          {/* Keyed so switching threads remounts and lands on the latest message */}
          <MessageScrollerProvider
            key={activeConversation.id}
            autoScroll
            defaultScrollPosition="end"
          >
            <MessageScroller className="flex-1">
              <MessageScrollerViewport
                aria-label="Smart Coach conversation"
                className="scrollbar-thumb-brand-800 hover:scrollbar-thumb-primary"
              >
                <MessageScrollerContent className="gap-4 pr-2 pb-4 pl-4">
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
              <MessageScrollerButton className="border-primary/40 bg-card/90 text-primary hover:bg-card hover:text-primary" />
            </MessageScroller>
          </MessageScrollerProvider>

          <div className="px-6 pt-2 pb-6">
            <ChatComposer disabled={isPending} onSend={handleSend} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
