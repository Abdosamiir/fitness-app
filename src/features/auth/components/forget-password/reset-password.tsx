import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useResetPassword } from "../../hooks/use-forgot-password"
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "../../lib/schema/auth"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils/utils"
import { Input } from "@/shared/components/ui/input"

import { PasswordInput } from "@/shared/components/ui/password-input"
import { Mail } from "lucide-react"

interface ResetPasswordStepProps {
  email: string
  onSuccess: () => void
}

export function ResetPasswordStep({
  email,
  onSuccess,
}: ResetPasswordStepProps) {
  const { mutate, isPending } = useResetPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email },
  })

  const onSubmit = (data: ResetPasswordInput) => {
    mutate(data, {
      onSuccess: () => {
        onSuccess()
      },
    })
  }

  return (
    <div className="flex w-full max-w-md min-w-0 flex-col items-center justify-center">
      <h2 className="mb-4 text-center text-2xl font-extrabold text-white sm:mb-6 sm:text-3xl">
        Create New Password
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md min-w-0 space-y-5 rounded-[2.5rem] border border-border/40 px-4 py-6 sm:p-8 md:p-10"
      >
        <div>
          <p className="mb-4 text-center text-sm text-white/70 sm:mb-6">
            Make Sure To Create A Strong Password!
          </p>
          <label className="mb-1 block text-sm font-medium text-white/70">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/70" />
            <Input
              {...register("email")}
              type="email"
              // readOnly
              className={cn(
                "h-11 w-full cursor-not-allowed rounded-lg border border-input bg-white/5 py-2 pr-4 pl-10 text-base text-white opacity-80 transition-colors placeholder:text-white/60 focus:ring-2 focus:ring-primary focus:outline-none",
                errors.email && "border-destructive focus:ring-destructive"
              )}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-center text-xs wrap-anywhere text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="[&_button]:text-white/70 [&_svg]:text-white/70">
          <label className="mb-1 block text-sm font-medium text-white/70">
            New Password
          </label>

          <PasswordInput
            {...register("newPassword")}
            placeholder="New Password"
            disabled={isPending}
            error={!!errors.newPassword}
            className="h-11 bg-white/5 text-base text-white placeholder:text-white/60 sm:text-lg"
          />

          {errors.newPassword && (
            <p className="mt-2 text-center text-xs wrap-anywhere text-destructive">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className={cn(
            "h-11 w-full rounded-full bg-primary py-3.5 font-semibold text-primary-foreground transition-all duration-200 hover:bg-brand-600",
            isPending && "cursor-not-allowed opacity-50"
          )}
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  )
}
