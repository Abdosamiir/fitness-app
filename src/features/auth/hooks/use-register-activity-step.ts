import { useMutation } from "@tanstack/react-query"

import { useRegistration } from "./use-registration"

import type {
  ActivityLevel,
  Gender,
  RegistrationGoal,
} from "../lib/types/registration"

interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  rePassword: string
  gender: Gender
  height: number
  weight: number
  goal: RegistrationGoal
  age: number
  activityLevel: ActivityLevel
}

interface RegisterResponse {
  status: boolean
  error?: string
  message?: string
}

export function useRegisterActivityStep() {
  const { draft, updateDraft } = useRegistration()

  const mutation = useMutation({
    mutationFn: async (activityLevel: ActivityLevel) => {
      const API_URL = import.meta.env.VITE_API_URL

      const payload: RegisterPayload = {
        firstName: draft.firstName,
        lastName: draft.lastName,
        email: draft.email,
        password: draft.password,
        rePassword: draft.password,
        gender: draft.gender!,
        height: draft.height!,
        weight: draft.weight!,
        goal: draft.goal!,
        age: draft.age!,
        activityLevel,
      }

      console.log(payload)

      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = (await response.json()) as RegisterResponse

      console.log(data)

      if (!response.ok || !data.status) {
        throw new Error(data.error || data.message || "Registration failed")
      }

      return data
    },

    onSuccess: (_, activityLevel) => {
      updateDraft({ activityLevel })
    },
  })

  return mutation
}
