import { API_BASE_URL } from "@/shared/lib/constants/api.constanst"
import { useMutation } from "@tanstack/react-query"

import { useRegistration } from "./use-registration"

import type {
  ActivityLevel,
  Gender,
  RegistrationGoal,
} from "../lib/types/registration"
import { setAccessToken } from "../lib/utils/token"
import { useNavigate } from "react-router"
import { setUser } from "../lib/utils/user"

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

interface RegisterUser {
  firstName: string
  lastName: string
  email: string
  gender: Gender
  age: number
  weight: number
  height: number
  activityLevel: ActivityLevel
  goal: RegistrationGoal
  photo: string
  _id: string
  createdAt: string
}

interface RegisterResponse {
  status?: boolean
  error?: string
  message: string
  user: RegisterUser
  token: string
}


export function useRegisterActivityStep() {
  const navigate = useNavigate()

  const { draft, updateDraft } = useRegistration()

  const mutation = useMutation({
    mutationFn: async (activityLevel: ActivityLevel) => {
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

      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = (await response.json()) as RegisterResponse

      console.log(data)

      if (!response.ok || data.status === false || data.error) {
        throw new Error(data.error || data.message || "Registration failed")
      }

      return data
    },

    onSuccess: (data, activityLevel) => {
      updateDraft({ activityLevel })

      setAccessToken(data.token)

      setUser(data.user)

      navigate("/", { replace: true })
    },
  })

  return mutation
}
