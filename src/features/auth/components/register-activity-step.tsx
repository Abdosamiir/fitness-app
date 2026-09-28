import { useState } from "react"

import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils/utils"

import { useRegisterActivityStep } from "../hooks/use-register-activity-step"
import { useRegistration } from "../hooks/use-registration"

import { ACTIVITY_LEVEL_OPTIONS } from "../lib/constants/registration-options.constant"

import type { ActivityLevel } from "../lib/types/registration"

import { RegisterStepLayout } from "./register-step-layout"

export function RegisterActivityStep() {
  const { draft, previousStep } = useRegistration()

  const [activityLevel, setActivityLevel] = useState<ActivityLevel | undefined>(
    draft.activityLevel
  )

  const mutation = useRegisterActivityStep()

  const handleSubmit = () => {
    if (!activityLevel) return

    mutation.mutate(activityLevel)
  }

  return (
    <RegisterStepLayout>
      <RegisterStepLayout.Header
        title="Your Regular Physical Activity Level?"
        description="This Helps Us Create Your Personalized Plan"
      />

      <div className="space-y-3">
        {ACTIVITY_LEVEL_OPTIONS.map((option) => {
          const isSelected = activityLevel === option.value

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              disabled={mutation.isPending}
              onClick={() => setActivityLevel(option.value)}
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

      {mutation.isError && (
        <p role="alert" className="mt-3 text-center text-sm text-red-400">
          {mutation.error.message}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={mutation.isPending}
          className="h-11 flex-1 rounded-full"
          onClick={previousStep}
        >
          Back
        </Button>

        <Button
          type="button"
          disabled={!activityLevel || mutation.isPending}
          className="h-11 flex-1 rounded-full bg-brand-500 font-bold text-white hover:bg-brand-600"
          onClick={handleSubmit}
        >
          {mutation.isPending ? "Creating..." : "Create Account"}
        </Button>
      </div>
    </RegisterStepLayout>
  )
}
