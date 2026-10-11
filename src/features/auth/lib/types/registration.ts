import type {
  ACTIVITY_LEVEL_OPTIONS,
  GENDER_OPTIONS,
  GOAL_OPTIONS,
} from "../constants/registration.constant"

export interface RegistrationDraft {
  firstName: string
  lastName: string
  email: string
  password: string

  gender?: Gender
  height?: number
  weight?: number
  goal?: RegistrationGoal
  age?: number
  activityLevel?: ActivityLevel
}

export type Gender = (typeof GENDER_OPTIONS)[number]

export type RegistrationGoal = (typeof GOAL_OPTIONS)[number]

export type ActivityLevel = (typeof ACTIVITY_LEVEL_OPTIONS)[number]

import type { RegisterStep } from "@/features/auth/lib/constants/register-step.constant"

export interface RegistrationDraft {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface RegistrationContextValue {
  draft: RegistrationDraft

  currentStep: RegisterStep
  currentStepIndex: number
  totalSteps: number

  isFirstStep: boolean
  isLastStep: boolean

  updateDraft: (values: Partial<RegistrationDraft>) => void

  nextStep: () => void
  previousStep: () => void
  goToStep: (step: RegisterStep) => void

  resetRegistration: () => void
}
