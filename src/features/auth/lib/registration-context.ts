import { createContext } from "react"

import type {
  RegistrationAccountDetails,
  RegistrationDraft,
} from "@/features/auth/lib/types/registration-type"

export type RegistrationContextValue = {
  draft: Partial<RegistrationDraft>
  setAccountDetails: (details: RegistrationAccountDetails) => void
  updateDraft: (details: Partial<RegistrationDraft>) => void
}

export const RegistrationContext =
  createContext<RegistrationContextValue | null>(null)
