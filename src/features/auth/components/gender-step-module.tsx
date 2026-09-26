import { Mars, Venus } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"

import { OnboardingStep } from "@/features/auth/components/onboarding-step"
import { useRegistration } from "@/features/auth/hooks/use-registration"
import type { RegistrationDraft } from "@/features/auth/lib/types/registration-type"
import { ROUTES } from "@/pages/routes"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils/utils"

type Gender = NonNullable<RegistrationDraft["gender"]>

const GENDER_OPTIONS: { icon: typeof Mars; label: string; value: Gender }[] = [
  { icon: Mars, label: "Male", value: "male" },
  { icon: Venus, label: "Female", value: "female" },
]

export function GenderStepModule() {
  // Navigation
  const navigate = useNavigate()

  // State
  const { draft, updateDraft } = useRegistration()
  const [gender, setGender] = useState<Gender | undefined>(draft.gender)

  // Functions
  const continueToAge = () => {
    if (!gender) return

    updateDraft({ gender })
    navigate(ROUTES.onboardingAge)
  }

  return (
    <OnboardingStep
      description="We Need To Know Your Gender"
      step={1}
      title="TELL US ABOUT YOURSELF!"
    >
      <div className="flex justify-center gap-5">
        {GENDER_OPTIONS.map((option) => {
          const Icon = option.icon
          const isSelected = gender === option.value

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "flex size-24 flex-col items-center justify-center rounded-full border transition-colors",
                isSelected
                  ? "border-brand-500 bg-brand-500/15 text-brand-500"
                  : "border-white/80 text-white hover:border-brand-500"
              )}
              key={option.value}
              onClick={() => setGender(option.value)}
              type="button"
            >
              <Icon aria-hidden="true" size={38} strokeWidth={1.5} />
              <span className="mt-1 text-sm font-semibold">{option.label}</span>
            </button>
          )
        })}
      </div>

      <Button
        className="mt-6 h-11 w-full rounded-full bg-brand-500 font-brand font-bold text-white hover:bg-brand-600 disabled:bg-white/80 disabled:text-white disabled:opacity-100"
        disabled={!gender}
        onClick={continueToAge}
        type="button"
      >
        Next
      </Button>
    </OnboardingStep>
  )
}
