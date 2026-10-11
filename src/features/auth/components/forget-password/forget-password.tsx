import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { useForgotPassword } from "../../hooks/use-forgot-password"
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "../../lib/schema/auth"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { cn } from "@/shared/lib/utils/utils"

interface EmailStepProps {
  onSuccess: (email: string) => void
}

export function EmailStep({ onSuccess }: EmailStepProps) {
  const { mutate, isPending } = useForgotPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: ForgotPasswordInput) => {
    mutate(data, {
      onSuccess: () => {
        onSuccess(data.email)
      },
    })
  }

  return (
    <div className="flex w-full max-w-md min-w-0 flex-col items-center justify-center">
      <h2 className="mb-4 text-center text-2xl font-extrabold text-white sm:mb-6 sm:text-4xl">
        Forget Password
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md min-w-0 space-y-5 rounded-[2.5rem] border border-border/40 px-4 py-6 text-center sm:p-8 md:p-10"
      >
        <label className="mb-4 block text-xl font-normal text-white/70 sm:text-2xl">
          Enter Your Email
        </label>
        <div className="relative">
          <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/70" />
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            disabled={isPending}
            className={cn(
              "h-11 w-full rounded-lg border border-input bg-transparent py-2 pr-4 pl-10 text-base text-white transition-colors placeholder:text-white/60 focus:ring-2 focus:ring-primary focus:outline-none",
              errors.email && "border-destructive focus:ring-destructive",
              isPending && "cursor-not-allowed opacity-50"
            )}
          />
        </div>
        {errors.email && (
          <p className="mt-2 text-sm wrap-anywhere text-destructive">
            {errors.email.message}
          </p>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className={cn(
            "mt-2 h-11 w-full rounded-full px-2 py-2 font-semibold transition-all duration-200",
            isPending
              ? "cursor-not-allowed opacity-50"
              : "bg-primary hover:bg-brand-600"
          )}
        >
          {isPending ? "Sending..." : "Send OTP"}
        </Button>
      </form>
    </div>
  )
}
