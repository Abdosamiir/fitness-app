import { useState } from "react"

import { Button } from "@/shared/components/ui/button"

import { useRegistration } from "../hooks/use-registration"

import { RegisterStepLayout } from "./register-step-layout"
import { NumberSelector } from "./number-selector"

const DEFAULT_WEIGHT = 70

export function RegisterWeightStep() {
  const { draft, updateDraft, nextStep, previousStep } = useRegistration()

  const [weight, setWeight] = useState(draft.weight ?? DEFAULT_WEIGHT)

  const handleNext = () => {
    updateDraft({ weight })
    nextStep()
  }

  return (
    <RegisterStepLayout>
      <RegisterStepLayout.Header
        title="What Is Your Weight?"
        description="This Helps Us Create Your Personalized Plan"
      />

      <NumberSelector
        label="Cm"
        min={100}
        max={250}
        value={weight}
        onChange={setWeight}
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
