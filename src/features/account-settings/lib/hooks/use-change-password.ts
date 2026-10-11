import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { changePasswordApi } from "../apis/account-settings.api"
import type { ChangePasswordPayload } from "../types/account-settings"

export function useChangePassword(onSuccessCallback?: () => void) {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePasswordApi(payload),
    onSuccess: (data) => {
      toast.success(data?.message || "Password changed successfully!")
      onSuccessCallback?.()
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to change password"
      toast.error(message)
    },
  })
}
