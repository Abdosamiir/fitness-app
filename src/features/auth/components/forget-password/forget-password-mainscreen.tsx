import { useState } from "react"
import { useNavigate } from "react-router"
import { EmailStep } from "./forget-password"
import { OtpStep } from "./verify-otp"
import { ResetPasswordStep } from "./reset-password"

export function ForgotPasswordScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState("")

  return (
    <div className="flex w-full min-w-0 items-center justify-center py-4 sm:py-6 lg:py-10">
      {step === 1 && (
        <EmailStep
          onSuccess={(submittedEmail) => {
            setEmail(submittedEmail)
            setStep(2)
          }}
        />
      )}

      {step === 2 && <OtpStep email={email} onSuccess={() => setStep(3)} />}

      {step === 3 && (
        <ResetPasswordStep email={email} onSuccess={() => navigate("/login")} />
      )}
    </div>
  )
}
