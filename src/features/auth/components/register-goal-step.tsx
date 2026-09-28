import { useState } from "react"

import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils/utils"

import { useRegistration } from "../hooks/use-registration"

import { GOAL_OPTIONS } from "../lib/constants/registration-options.constant"

import type { RegistrationGoal } from "../lib/types/registration"

import { RegisterStepLayout } from "./register-step-layout"

export function RegisterGoalStep() {
  const { draft, updateDraft, nextStep, previousStep } = useRegistration()

  const [goal, setGoal] = useState<RegistrationGoal | undefined>(draft.goal)

  const handleNext = () => {
    if (!goal) return

    updateDraft({ goal })
    nextStep()
  }

  return (
    <RegisterStepLayout>
      <RegisterStepLayout.Header
        title="What Is Your Goal?"
        description="This Helps Us Create Your Personalized Plan"
      />

      <div className="space-y-3">
        {GOAL_OPTIONS.map((option) => {
          const isSelected = goal === option.value

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setGoal(option.value)}
              className={cn(
                "h-12 w-full rounded-full border px-5 text-left transition-colors",
                isSelected
                  ? "border-brand-500 bg-brand-500/15 text-brand-500"
                  : "border-white/60 text-white hover:border-brand-500"
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>

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
          disabled={!goal}
          className="h-11 flex-1 rounded-full bg-brand-500 font-bold text-white hover:bg-brand-600"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </RegisterStepLayout>
  )
}
