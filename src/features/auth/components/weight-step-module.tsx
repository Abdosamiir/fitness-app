import { useState } from "react"

import { NumberSelector } from "@/features/auth/components/number-selector"
import { OnboardingStep } from "@/features/auth/components/onboarding-step"
import { useRegistration } from "@/features/auth/hooks/use-registration"
import { Button } from "@/shared/components/ui/button"

const DEFAULT_WEIGHT = 90

export function WeightStepModule() {
  // State
  const { draft, updateDraft } = useRegistration()
  const [weight, setWeight] = useState(draft.weight ?? DEFAULT_WEIGHT)
  const [isSaved, setIsSaved] = useState(false)

  // Functions
  const saveWeight = () => {
    updateDraft({ weight })
    setIsSaved(true)
  }

  return (
    <OnboardingStep
      description="This Helps Us Create Your Personalized Plan"
      step={3}
      title="What Is Your Weight?"
    >
      <NumberSelector
        label="Kg"
        max={250}
        min={30}
        onChange={(value) => {
          setWeight(value)
          setIsSaved(false)
        }}
        value={weight}
      />
      <Button
        className="mt-6 h-11 w-full rounded-full bg-brand-500 font-brand font-bold text-white hover:bg-brand-600"
        onClick={saveWeight}
        type="button"
      >
        Done
      </Button>
      {isSaved && (
        <p className="mt-3 text-sm text-white/70">
          Saved. The remaining onboarding steps can continue from this draft.
        </p>
      )}
    </OnboardingStep>
  )
}
