import { useState, useEffect } from "react"
import { Minus, Plus } from "lucide-react"
import { AccountModalWrapper } from "./account-modal-wrapper"

interface AccountWeightModalProps {
  isOpen: boolean
  onClose: () => void
  currentWeight?: number
  onSave: (weight: number) => Promise<void> | void
}

export function AccountWeightModal({
  isOpen,
  onClose,
  currentWeight = 90,
  onSave,
}: AccountWeightModalProps) {
  const [weight, setWeight] = useState<number>(currentWeight || 90)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (currentWeight) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWeight(currentWeight)
    }
  }, [currentWeight, isOpen])

  const handleDecrement = () => {
    setWeight((prev) => Math.max(30, prev - 1))
  }

  const handleIncrement = () => {
    setWeight((prev) => Math.min(250, prev + 1))
  }

  const handleSave = async () => {
    setIsSubmitting(true)
    try {
      await onSave(weight)
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
            Update Your Weight
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-medium">
            Enter your current body weight in kilograms
          </p>
        </div>

        {/* Weight Counter Display */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={weight <= 30}
              aria-label="Decrease weight"
              className="flex size-12 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-all hover:bg-card hover:border-primary disabled:opacity-30 cursor-pointer"
            >
              <Minus className="size-5" />
            </button>

            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-foreground tracking-tight font-sans">
                {weight}
              </span>
              <span className="text-2xl font-bold text-primary">Kg</span>
            </div>

            <button
              type="button"
              onClick={handleIncrement}
              disabled={weight >= 250}
              aria-label="Increase weight"
              className="flex size-12 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-all hover:bg-card hover:border-primary disabled:opacity-30 cursor-pointer"
            >
              <Plus className="size-5" />
            </button>
          </div>

          {/* Slider */}
          <div className="w-full mt-8 px-2">
            <input
              type="range"
              min="40"
              max="180"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-2 bg-neutral-700/60 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-neutral-500 font-semibold mt-2">
              <span>40 Kg</span>
              <span>110 Kg</span>
              <span>180 Kg</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleSave}
          disabled={isSubmitting}
          className="w-full mt-6 py-3.5 sm:py-4 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </AccountModalWrapper>
  )
}
