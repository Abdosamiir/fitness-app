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
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-6 text-center text-4xl font-extrabold text-white">
        OTP CODE
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 rounded-[2.5rem] border border-border/40 p-10 text-center"
      >
        <p className="mb-8 text-lg font-medium text-muted">
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
              className="mb-8"
            />
          )}
        />

        {errors.resetCode && (
          <p className="-mt-4 mb-4 text-center text-xs text-destructive">
            {errors.resetCode.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={isVerifying}
          className={cn(
            "w-full rounded-full py-3.5 font-semibold transition-all duration-200",
            isVerifying && "cursor-not-allowed opacity-50"
          )}
        >
          {isVerifying ? "Verifying..." : "Confirm"}
        </Button>

        <div className="mt-8 text-sm">
          <p className="mb-1 text-muted">Didn't Receive Verification Code?</p>
          <Button
            type="button"
            variant="link"
            onClick={handleResendCode}
            disabled={isResending}
            className="h-auto p-0 font-semibold text-primary hover:underline disabled:opacity-50"
          >
            {isResending ? "Sending..." : "Resend Code"}
          </Button>
        </div>
      </form>
    </div>
  )
}
