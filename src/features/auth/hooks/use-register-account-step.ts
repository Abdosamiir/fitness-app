import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useRegistration } from "./use-registration"

import {
  accountStepSchema,
  type AccountStepValues,
} from "../lib/schema/account-step.schema"

export function useRegisterAccountStep() {
  const { draft, updateDraft, nextStep } = useRegistration()

  const form = useForm<AccountStepValues>({
    resolver: zodResolver(accountStepSchema),

    defaultValues: {
      firstName: draft.firstName,
      lastName: draft.lastName,
      email: draft.email,
      password: draft.password,
    },

    mode: "onTouched",
  })

  /**
   * Keep form values synchronized with the draft.
   *
   * This matters when the user goes back to this step.
   */
  useEffect(() => {
    form.reset({
      firstName: draft.firstName,
      lastName: draft.lastName,
      email: draft.email,
      password: draft.password,
    })
  }, [draft.firstName, draft.lastName, draft.email, draft.password, form])

  const onSubmit = (values: AccountStepValues) => {
    updateDraft(values)
    nextStep()
  }

  return {
    form,
    onSubmit,
  }
}
