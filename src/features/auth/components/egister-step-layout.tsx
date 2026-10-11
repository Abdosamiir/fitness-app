import type { ReactNode } from "react"

import { cn } from "@/shared/lib/utils/utils"

import { RegisterProgress } from "./register-progress"

interface RegisterStepLayoutProps {
  children: ReactNode
  className?: string
}

interface RegisterStepHeaderProps {
  title: string
  description?: string
  className?: string
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

export function RegisterStepLayout({
  children,
  className,
}: RegisterStepLayoutProps) {
  return (
    <section className={cn("w-full max-w-md text-white", className)}>
      <RegisterProgress className="mb-8" />

      {children}
    </section>
  )
}

RegisterStepLayout.Header = RegisterStepHeader
