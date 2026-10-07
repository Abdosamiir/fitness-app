import { useState, useEffect } from "react"
import { AccountModalWrapper } from "./account-modal-wrapper"
import { ACCOUNT_GOAL_OPTIONS } from "../lib/constants/account-settings.constant"
import type { AccountGoal } from "../lib/types/account-settings"

interface AccountGoalModalProps {
  isOpen: boolean
  onClose: () => void
  currentGoal?: string
  onSave: (goal: AccountGoal) => Promise<void> | void
}

export function AccountGoalModal({
  isOpen,
  onClose,
  currentGoal = "Lose weight",
  onSave,
}: AccountGoalModalProps) {
  const [selectedGoal, setSelectedGoal] = useState<AccountGoal>(
    (currentGoal as AccountGoal) || "Lose weight"
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (currentGoal) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedGoal(currentGoal as AccountGoal)
    }
  }, [currentGoal, isOpen])

  const handleNext = async () => {
    setIsSubmitting(true)
    try {
      await onSave(selectedGoal)
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
            What Is Your Goal ?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-medium">
            This Helps Us Create Your Personalized Plan
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-3.5 mb-8">
          {ACCOUNT_GOAL_OPTIONS.map((item) => {
            const isSelected =
              selectedGoal.toLowerCase() === item.id.toLowerCase()

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedGoal(item.id)}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/50 shadow-sm"
                    : "border-border/70 bg-card/40 hover:border-border hover:bg-card/70 text-foreground/90"
                }`}
              >
                <span className="font-semibold text-sm sm:text-base">
                  {item.label}
                </span>

                {/* Radio Circle */}
                <div
                  className={`size-5 rounded-full flex items-center justify-center border transition-all ${
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
          onClick={handleNext}
          disabled={isSubmitting}
          className="w-full py-3.5 sm:py-4 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Saving..." : "Next"}
        </button>
      </div>
    </AccountModalWrapper>
  )
}
