import { useContext } from "react"

import { RegistrationContext } from "@/features/auth/lib/registration-context"

export function useRegistration() {
  const context = useContext(RegistrationContext)

  if (!context) {
    throw new Error("useRegistration must be used inside RegistrationProvider")
  }

  return context
}
