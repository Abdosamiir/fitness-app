import { Mars, Venus } from "lucide-react"

import { cn } from "@/shared/lib/utils/utils"

import { RegisterProgress } from "./register-progress"

interface RegisterStepLayoutProps {
  children: React.ReactNode
  className?: string
}

interface RegisterStepHeaderProps {
  title: string
  description?: string
  className?: string
}

interface GenderOptionProps {
  label: string
  value: "male" | "female"
  selected?: boolean
  onClick?: () => void
}

function RegisterStepHeader({
  title,
  description,
  className,
}: RegisterStepHeaderProps) {
  return (
    <header className={cn("mb-8 text-center text-white", className)}>
      <h1 className="font-brand text-2xl font-bold sm:text-3xl">{title}</h1>

      {description && (
        <p className="mt-2 text-sm text-white/60">{description}</p>
      )}
    </header>
  )
}

function GenderOption({ label, value, selected, onClick }: GenderOptionProps) {
  const Icon = value === "male" ? Mars : Venus

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-20 w-20 flex-col items-center justify-center",
        "rounded-full border border-white/70",
        "text-white transition-all duration-200",
        "hover:border-white hover:bg-white/5",
        selected && "border-white bg-white/10 ring-1 ring-white/30"
      )}
    >
      <Icon className="mb-1 h-9 w-9 stroke-[1.5]" aria-hidden="true" />

      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}

export function RegisterStepLayout({
  children,
  className,
}: RegisterStepLayoutProps) {
  return (
    <section className={cn("w-full max-w-md px-4 text-white", className)}>
      <RegisterProgress className="mb-8" />

      {children}
    </section>
  )
}

RegisterStepLayout.Header = RegisterStepHeader
RegisterStepLayout.GenderOption = GenderOption
