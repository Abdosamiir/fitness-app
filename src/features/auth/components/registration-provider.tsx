import { useCallback, useMemo, useState, type ReactNode } from "react"

import { RegistrationContext } from "@/features/auth/context/registration-context"

import {
  REGISTER_STEP_ORDER,
  REGISTER_STEPS,
  type RegisterStep,
} from "@/features/auth/lib/constants/register-step.constant"

import type { RegistrationDraft } from "@/features/auth/lib/types/registration"

interface RegisterProviderProps {
  children: ReactNode
}

const INITIAL_DRAFT: RegistrationDraft = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
}

export function RegisterProvider({ children }: RegisterProviderProps) {
  const [draft, setDraft] = useState<RegistrationDraft>(INITIAL_DRAFT)

  const [currentStep, setCurrentStep] = useState<RegisterStep>(
    REGISTER_STEPS.account
  )

  const currentStepIndex = REGISTER_STEP_ORDER.indexOf(currentStep)

  const isFirstStep = currentStepIndex === 0

  const isLastStep = currentStepIndex === REGISTER_STEP_ORDER.length - 1

  const updateDraft = useCallback((values: Partial<RegistrationDraft>) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      ...values,
    }))
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep((currentStep) => {
      const currentIndex = REGISTER_STEP_ORDER.indexOf(currentStep)

      const nextStep = REGISTER_STEP_ORDER[currentIndex + 1]

      return nextStep ?? currentStep
    })
  }, [])

  const previousStep = useCallback(() => {
    setCurrentStep((currentStep) => {
      const currentIndex = REGISTER_STEP_ORDER.indexOf(currentStep)

      const previousStep = REGISTER_STEP_ORDER[currentIndex - 1]

      return previousStep ?? currentStep
    })
  }, [])

  const goToStep = useCallback((step: RegisterStep) => {
    setCurrentStep(step)
  }, [])

  const resetRegistration = useCallback(() => {
    setDraft(INITIAL_DRAFT)
    setCurrentStep(REGISTER_STEPS.account)
  }, [])

  const value = useMemo(
    () => ({
      draft,

      currentStep,
      currentStepIndex,
      totalSteps: REGISTER_STEP_ORDER.length,

      isFirstStep,
      isLastStep,

      updateDraft,

      nextStep,
      previousStep,
      goToStep,

      resetRegistration,
    }),
    [
      draft,
      currentStep,
      currentStepIndex,
      isFirstStep,
      isLastStep,
      updateDraft,
      nextStep,
      previousStep,
      goToStep,
      resetRegistration,
    ]
  )

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  )
}
