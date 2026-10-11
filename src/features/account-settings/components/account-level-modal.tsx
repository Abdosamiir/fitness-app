import { useState, useEffect } from "react"
import { AccountModalWrapper } from "./account-modal-wrapper"
import { ACCOUNT_LEVEL_OPTIONS } from "../lib/constants/account-settings.constant"
import type { AccountLevel } from "../lib/types/account-settings"

interface AccountLevelModalProps {
  isOpen: boolean
  onClose: () => void
  currentLevel?: string
  onSave: (level: AccountLevel) => Promise<void> | void
}

export function AccountLevelModal({
  isOpen,
  onClose,
  currentLevel = "Beginner",
  onSave,
}: AccountLevelModalProps) {
  const [selectedLevel, setSelectedLevel] = useState<AccountLevel>(
    (currentLevel as AccountLevel) || "Beginner"
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (currentLevel) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedLevel(currentLevel as AccountLevel)
    }
  }, [currentLevel, isOpen])

  const handleSave = async () => {
    setIsSubmitting(true)
    try {
      await onSave(selectedLevel)
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AccountModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-7 sm:p-9">
        {/* Heading */}
        <div className="text-center mb-7">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Select Your Level
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-medium">
            Choose the intensity that matches your experience
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-3.5 mb-8">
          {ACCOUNT_LEVEL_OPTIONS.map((item) => {
            const isSelected =
              selectedLevel.toLowerCase() === item.id.toLowerCase()

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedLevel(item.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/50 shadow-sm"
                    : "border-border/70 bg-card/40 hover:border-border hover:bg-card/70 text-foreground/90"
                }`}
              >
                <div>
                  <div className="font-bold text-base text-foreground">
                    {item.label}
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                    {item.desc}
                  </div>
                </div>

                {/* Radio Circle */}
                <div
                  className={`shrink-0 ml-3 size-5 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? "border-primary bg-transparent"
                      : "border-neutral-500/60 bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <div className="size-2.5 rounded-full bg-primary animate-in zoom-in" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleSave}
          disabled={isSubmitting}
          className="w-full py-3.5 sm:py-4 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </AccountModalWrapper>
  )
}
