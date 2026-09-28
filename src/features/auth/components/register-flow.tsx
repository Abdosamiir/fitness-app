import { RegisterProvider } from "@/features/auth/components/registration-provider"
import { REGISTER_STEPS } from "@/features/auth/lib/constants/register-step.constant"
import { useRegistration } from "@/features/auth/hooks/use-registration"

import { RegisterAccountStep } from "./register-account-step"
import { RegisterGenderStep } from "./register-gender-step"
import { RegisterHeightStep } from "./register-height-step"
import { RegisterGoalStep } from "./register-goal-step"
import { RegisterAgeStep } from "./register-age-step"
import { RegisterActivityStep } from "./register-activity-step"
import { RegisterWeightStep } from "./register-weight-step"

function RegisterFlowContent() {
  const { currentStep } = useRegistration()

  switch (currentStep) {
    case REGISTER_STEPS.account:
      return <RegisterAccountStep />

    case REGISTER_STEPS.gender:
      return <RegisterGenderStep />

    case REGISTER_STEPS.age:
      return <RegisterAgeStep />

    case REGISTER_STEPS.weight:
      return <RegisterWeightStep />

    case REGISTER_STEPS.height:
      return <RegisterHeightStep />

    case REGISTER_STEPS.goal:
      return <RegisterGoalStep />

    case REGISTER_STEPS.activityLevel:
      return <RegisterActivityStep />

    default:
      return null
  }
}

export function RegisterFlow() {
  return (
    <RegisterProvider>
      <RegisterFlowContent />
    </RegisterProvider>
  )
}
