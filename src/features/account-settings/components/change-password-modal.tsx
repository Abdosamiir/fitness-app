import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AccountModalWrapper } from "./account-modal-wrapper"
import { PasswordInput } from "@/shared/components/ui/password-input"
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "../lib/schemas/change-password.schema"
import { useChangePassword } from "../lib/hooks/use-change-password"
import type { ChangePasswordPayload } from "../lib/types/account-settings"

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (payload: ChangePasswordPayload) => Promise<unknown>
}

export function ChangePasswordModal({
  isOpen,
  onClose,
  onSubmit,
}: ChangePasswordModalProps) {
  // TanStack Query Mutation
  const { mutateAsync: changePasswordMutation, isPending } = useChangePassword()

  // React Hook Form + Zod Resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  })

  // Reset form when modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  const handleFormSubmit = async (values: ChangePasswordFormValues) => {
    try {
      if (onSubmit) {
        await onSubmit({
          password: values.password,
          newPassword: values.newPassword,
        })
      } else {
        await changePasswordMutation({
          password: values.password,
          newPassword: values.newPassword,
        })
      }
      reset()
      onClose()
    } catch {
      // Error handled by mutation hook via toast
    }
  }

  const isLoading = isPending || isSubmitting

  return (
    <AccountModalWrapper isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-7 sm:p-9">
        {/* Heading */}
        <div className="text-center mb-7">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Change Password
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-medium">
            Keep your account secure with a strong password
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-7">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
              Current Password
            </label>
            <PasswordInput
              placeholder="Enter current password"
              error={!!errors.password}
              disabled={isLoading}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-destructive mt-1 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
              New Password
            </label>
            <PasswordInput
              placeholder="Enter new password (min. 6 characters)"
              error={!!errors.newPassword}
              disabled={isLoading}
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-xs text-destructive mt-1 font-medium">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
              Confirm New Password
            </label>
            <PasswordInput
              placeholder="Re-enter new password"
              error={!!errors.confirmPassword}
              disabled={isLoading}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive mt-1 font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 sm:py-4 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              <span>Updating Password...</span>
            </>
          ) : (
            <span>Update Password</span>
          )}
        </button>
      </form>
    </AccountModalWrapper>
  )
}
