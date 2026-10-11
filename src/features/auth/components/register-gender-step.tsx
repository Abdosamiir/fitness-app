import { Mars, Venus } from "lucide-react"
import { useState } from "react"

import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils/utils"

import { useRegistration } from "../hooks/use-registration"
import { GENDER_OPTIONS } from "../lib/constants/registration-options.constant"

import type { Gender } from "../lib/types/registration"

import { RegisterStepLayout } from "./register-step-layout"

const GENDER_ICONS = {
  male: Mars,
  female: Venus,
} as const

export function RegisterGenderStep() {
  const { draft, updateDraft, nextStep, previousStep } = useRegistration()

  const [gender, setGender] = useState<Gender | undefined>(draft.gender)

  const handleNext = () => {
    if (!gender) return

    updateDraft({ gender })
    nextStep()
  }

  return (
    <RegisterStepLayout>
      <RegisterStepLayout.Header
        title="TELL US ABOUT YOURSELF!"
        description="We Need To Know Your Gender"
      />

      <div className="flex justify-center gap-5">
        {GENDER_OPTIONS.map((option) => {
          const Icon = GENDER_ICONS[option.value]

          const isSelected = gender === option.value

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setGender(option.value)}
              className={cn(
                "flex size-24 flex-col items-center justify-center rounded-full border transition-colors",
                isSelected
                  ? "border-brand-500 bg-brand-500/15 text-brand-500"
                  : "border-white/80 text-white hover:border-brand-500"
              )}
            >
              <Icon aria-hidden="true" size={38} strokeWidth={1.5} />

              <span className="mt-1 text-sm font-semibold">{option.label}</span>
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
          disabled={!gender}
          onClick={handleNext}
          className="h-11 flex-1 rounded-full bg-brand-500 font-bold text-white hover:bg-brand-600"
        >
          Next
        </Button>
      </div>
    </RegisterStepLayout>
  )
}
