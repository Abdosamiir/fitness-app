import { API_BASE_URL } from "@/shared/lib/constants/api.constanst"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { setAccessToken } from "../lib/utils/token"
import type { LoginType } from "../lib/types/login-type"
import type { LoginFormValues } from "../lib/schema/auth"
import { useNavigate } from "react-router"

export default function useLoginHook() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await axios.post<LoginType>(
        `${API_BASE_URL}/auth/signin`,
        data
      )

      if (response.status !== 200) {
        throw new Error("Login failed")
      }

      return response.data
    },

    onSuccess: (data) => {
      setAccessToken(data.token)
      navigate("/", { replace: true })
    },

    onError: (error) => {
      throw new Error(error.message)
    },
  })
}
