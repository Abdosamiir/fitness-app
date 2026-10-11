import { cn } from "@/shared/lib/utils/utils"

import { useRegistration } from "../hooks/use-registration"

interface RegisterProgressProps {
  className?: string
}

export function RegisterProgress({ className }: RegisterProgressProps) {
  const { currentStepIndex, totalSteps } = useRegistration()

  const currentStep = currentStepIndex + 1
  const progress = currentStep / totalSteps
  const progressDeg = progress * 360

  return (
    <div
      aria-label={`Registration step ${currentStep} of ${totalSteps}`}
      className={cn("flex justify-center", className)}
    >
      <div
        className="relative h-12 w-12 rounded-full"
        style={{
          background: `conic-gradient(
            from -45deg,
            #ff3b30 0deg ${progressDeg}deg,
            transparent ${progressDeg}deg 360deg
          )`,
        }}
      >
        <div className="absolute inset-[2px] flex items-center justify-center rounded-full bg-[#242424]">
          <span className="text-sm font-medium text-white">
            {currentStep}/{totalSteps}
          </span>
        </div>
      </div>
    </div>
  )
}
