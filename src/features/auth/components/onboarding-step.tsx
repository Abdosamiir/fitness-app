import type { ReactNode } from "react"

type OnboardingStepProps = {
  children: ReactNode
  description: string
  step: number
  title: string
}

export function OnboardingStep({
  children,
  description,
  step,
  title,
}: OnboardingStepProps) {
  const progress = (step / 6) * 100

  return (
    <section className="flex w-full flex-col items-center text-center text-white">
      <div className="relative mb-8 flex size-14 items-center justify-center">
        <svg
          aria-hidden="true"
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 48 48"
        >
          <circle
            className="text-white/15"
            cx="24"
            cy="24"
            fill="none"
            r="20"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            className="text-brand-500"
            cx="24"
            cy="24"
            fill="none"
            pathLength="100"
            r="20"
            stroke="currentColor"
            strokeDasharray={`${progress} 100`}
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
        <span className="font-brand text-lg font-semibold">{step}/6</span>
      </div>

      <h1 className="font-brand text-3xl font-extrabold sm:text-4xl">
        {title}
      </h1>
      <p className="mt-1 font-brand text-base text-white/85 sm:text-lg">
        {description}
      </p>

      <div className="mt-9 w-full">{children}</div>
    </section>
  )
}
