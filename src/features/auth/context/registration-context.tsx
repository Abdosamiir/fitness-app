import { createContext } from "react"

import type { RegistrationContextValue } from "@/features/auth/lib/types/registration"

export const RegistrationContext = createContext<
  RegistrationContextValue | undefined
>(undefined)
