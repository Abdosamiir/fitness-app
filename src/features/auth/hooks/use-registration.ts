import { useContext } from "react"

import { RegistrationContext } from "@/features/auth/context/registration-context"

export function useRegistration() {
  const context = useContext(RegistrationContext)

  if (!context) {
    throw new Error("useRegistration must be used inside RegistrationProvider")
  }

  return context
}
