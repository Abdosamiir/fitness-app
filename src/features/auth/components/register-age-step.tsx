import { useState } from "react"

import { Button } from "@/shared/components/ui/button"

import { useRegistration } from "../hooks/use-registration"

import { RegisterStepLayout } from "./register-step-layout"
import { NumberSelector } from "./number-selector"

const DEFAULT_AGE = 25

export function RegisterAgeStep() {
  const { draft, updateDraft, nextStep, previousStep } = useRegistration()

  const [age, setAge] = useState(draft.age ?? DEFAULT_AGE)

  const handleNext = () => {
    updateDraft({ age })
    nextStep()
  }

  return (
    <RegisterStepLayout>
      <RegisterStepLayout.Header
        title="How Old Are You?"
        description="This Helps Us Create Your Personalized Plan"
      />

      <NumberSelector
        label="Years Old"
        min={13}
        max={100}
        value={age}
        onChange={setAge}
      />

      <div className="mt-6 flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-11 flex-1 rounded-full"
          onClick={previousStep}
        >
          Back
        </Button>

        <Button
          type="button"
          className="h-11 flex-1 rounded-full bg-brand-500 font-bold text-white hover:bg-brand-600"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </RegisterStepLayout>
  )
}
