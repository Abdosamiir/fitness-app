import { useState } from "react"
import { useNavigate } from "react-router"

import { NumberSelector } from "@/features/auth/components/number-selector"
import { OnboardingStep } from "@/features/auth/components/onboarding-step"
import { useRegistration } from "@/features/auth/hooks/use-registration"
import { ROUTES } from "@/pages/routes"
import { Button } from "@/shared/components/ui/button"

const DEFAULT_AGE = 25

export function AgeStepModule() {
  // Navigation
  const navigate = useNavigate()

  // State
  const { draft, updateDraft } = useRegistration()
  const [age, setAge] = useState(draft.age ?? DEFAULT_AGE)

  // Functions
  const continueToWeight = () => {
    updateDraft({ age })
    navigate(ROUTES.onboardingWeight)
  }

  return (
    <OnboardingStep
      description="This Helps Us Create Your Personalized Plan"
      step={2}
      title="How Old Are You?"
    >
      <NumberSelector
        label="Years Old"
        max={100}
        min={13}
        onChange={setAge}
        value={age}
      />
      <Button
        className="mt-6 h-11 w-full rounded-full bg-brand-500 font-brand font-bold text-white hover:bg-brand-600"
        onClick={continueToWeight}
        type="button"
      >
        Next
      </Button>
    </OnboardingStep>
  )
}
