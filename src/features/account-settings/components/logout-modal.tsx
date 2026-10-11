import { useState } from "react"
import { LogOut } from "lucide-react"
import { AccountModalWrapper } from "./account-modal-wrapper"

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void> | void
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await onConfirm()
      onClose()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <AccountModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-7 sm:p-9 text-center">
        {/* Icon */}
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <LogOut className="size-7" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Log Out
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-medium">
          Are you sure you want to log out of Super Fitness?
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoggingOut}
            className="flex-1 py-3.5 rounded-xl border border-border bg-card/60 text-foreground font-semibold text-sm hover:bg-card transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex-1 py-3.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isLoggingOut ? "Logging out..." : "Log Out"}
          </button>
        </div>
      </div>
    </AccountModalWrapper>
  )
}
