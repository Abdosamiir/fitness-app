import { useMemo, useState, type ReactNode } from "react"

import {
  RegistrationContext,
  type RegistrationContextValue,
} from "@/features/auth/lib/registration-context"
import type { RegistrationDraft } from "@/features/auth/lib/types/registration-type"

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<Partial<RegistrationDraft>>({})

  const value = useMemo<RegistrationContextValue>(
    () => ({
      draft,
      setAccountDetails: (details) => setDraft(details),
      updateDraft: (details) =>
        setDraft((currentDraft) => ({ ...currentDraft, ...details })),
    }),
    [draft]
  )

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  )
}
