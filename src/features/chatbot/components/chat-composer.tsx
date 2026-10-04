import { useState, type FormEvent } from "react"
import { PencilLineIcon, SendHorizontalIcon } from "lucide-react"

import { Input } from "@/shared/components/ui/input"

/** Pill input at the bottom of the chat; submits on Enter or the send icon. */
export function ChatComposer({
  disabled,
  onSend,
}: {
  disabled?: boolean
  onSend: (text: string) => void
}) {
  // State
  const [draft, setDraft] = useState("")

  // Variables
  const canSend = !disabled && draft.trim().length > 0

  // Functions
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSend) return

    onSend(draft.trim())
    setDraft("")
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <PencilLineIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-primary"
      />
      <Input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Ask Me Any Things"
        aria-label="Message Smart Coach"
        autoComplete="off"
        className="h-10 rounded-full border-foreground/70 bg-transparent pr-11 pl-10 text-sm"
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label="Send message"
        className="absolute top-1/2 right-1.5 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-primary transition-opacity hover:bg-primary/15 disabled:opacity-0"
      >
        <SendHorizontalIcon className="size-4" />
      </button>
    </form>
  )
}
