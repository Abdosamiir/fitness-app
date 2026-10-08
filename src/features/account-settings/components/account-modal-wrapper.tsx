import { useEffect, type ReactNode } from "react"
import { X } from "lucide-react"

interface AccountModalWrapperProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  maxWidth?: string
}

export function AccountModalWrapper({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-md",
}: AccountModalWrapperProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div
        className={`relative z-10 w-full ${maxWidth} overflow-hidden rounded-3xl border border-white/15 bg-neutral-900/95 text-white shadow-2xl backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-[#1a1a1c]/95 light:border-black/10 light:bg-white light:text-neutral-900 animate-in zoom-in-95`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 z-20 flex size-8 items-center justify-center rounded-full bg-white/10 text-neutral-300 transition-colors hover:bg-white/20 hover:text-white dark:bg-white/10 dark:hover:bg-white/20 light:bg-black/5 light:text-neutral-700 light:hover:bg-black/10"
        >
          <X className="size-4" />
        </button>

        {children}
      </div>
    </div>
  )
}
