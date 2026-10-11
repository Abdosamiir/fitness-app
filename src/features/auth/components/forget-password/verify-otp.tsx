import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { verifyOtpSchema, type VerifyOtpInput } from "../../lib/schema/auth"
import {
  useVerifyOtp,
  useForgotPassword,
} from "../../hooks/use-forgot-password"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils/utils"
import { OtpInput } from "@/shared/components/ui/otp-input"

interface OtpStepProps {
  email: string
  onSuccess: () => void
}

export function OtpStep({ email, onSuccess }: OtpStepProps) {
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp()
  const { mutate: resendOtp, isPending: isResending } = useForgotPassword()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      resetCode: "",
    },
  })

  const onSubmit = (data: VerifyOtpInput) => {
    verifyOtp(data, {
      onSuccess: () => {
        onSuccess()
      },
    })
  }

  const handleResendCode = () => {
    if (email) {
      resendOtp({ email })
    }
  }

  return (
    <div className="flex w-full max-w-md min-w-0 flex-col items-center justify-center">
      <h2 className="mb-4 text-center text-2xl font-extrabold text-white sm:mb-6 sm:text-4xl">
        OTP CODE
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md min-w-0 space-y-5 rounded-[2.5rem] border border-border/40 px-4 py-6 text-center sm:p-8 md:p-10"
      >
        <p className="mb-6 text-base font-medium text-white/70 sm:mb-8 sm:text-lg">
          Enter The OTP You Have Received
        </p>

        <Controller
          name="resetCode"
          control={control}
          render={({ field }) => (
            <OtpInput
              {...field}
              length={6}
              disabled={isVerifying}
              error={!!errors.resetCode}
              className="mb-6 min-w-0 gap-1.5 sm:mb-8 sm:gap-3 [&_input]:max-w-12 [&_input]:min-w-0 [&_input]:flex-1"
            />
          )}
        />

        {errors.resetCode && (
          <p className="-mt-4 mb-4 text-center text-xs wrap-anywhere text-destructive">
            {errors.resetCode.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={isVerifying}
          className={cn(
            "h-11 w-full rounded-full py-3.5 font-semibold transition-all duration-200",
            isVerifying && "cursor-not-allowed opacity-50"
          )}
        >
          {isVerifying ? "Verifying..." : "Confirm"}
        </Button>

        <div className="mt-6 text-sm sm:mt-8">
          <p className="mb-1 text-white/70">
            Didn't Receive Verification Code?
          </p>
          <Button
            type="button"
            variant="link"
            onClick={handleResendCode}
            disabled={isResending}
            className="h-11 px-3 font-semibold text-primary hover:underline disabled:opacity-50"
          >
            {isResending ? "Sending..." : "Resend Code"}
          </Button>
        </div>
      </form>
    </div>
  )
}
