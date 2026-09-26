import { useState } from "react"

import { Button } from "@/shared/components/ui/button"

import { useRegistration } from "../hooks/use-registration"

import { RegisterStepLayout } from "./register-step-layout"
import { NumberSelector } from "./number-selector"

const DEFAULT_HEIGHT = 170

export function RegisterHeightStep() {
  const { draft, updateDraft, nextStep, previousStep } = useRegistration()

  const [height, setHeight] = useState(draft.height ?? DEFAULT_HEIGHT)

  const handleNext = () => {
    updateDraft({ height })
    nextStep()
  }

  return (
    <RegisterStepLayout>
      <RegisterStepLayout.Header
        title="What Is Your Height?"
        description="This Helps Us Create Your Personalized Plan"
      />

      <NumberSelector
        label="Cm"
        min={100}
        max={250}
        value={height}
        onChange={setHeight}
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
