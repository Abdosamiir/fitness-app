import type { ReactNode } from "react"
import { Link } from "react-router"

import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg?react"
import { Button } from "@/shared/components/ui/button"
import { cn } from "cn"

type ActionLinkProps = {
  children: ReactNode
  href: string
  variant?: "primary" | "outline"
  className?: string
}

export function ActionLink({
  children,
  href,
  variant = "primary",
  className,
}: ActionLinkProps) {
  const isPrimary = variant === "primary"
  const isInternal = href.startsWith("/") && !href.startsWith("//")

  return (
    <Button
      nativeButton={false}
      variant={isPrimary ? "default" : "outline"}
      size="sm"
      className={cn(
        "group/action-link relative",
        "h-9 rounded-4xl",
        "px-4",
        "font-brand text-base font-bold",
        className
      )}
      render={isInternal ? <Link to={href} /> : <a href={href} />}
    >
      <span>{children}</span>

      <span
        aria-hidden="true"
        className={cn(
          "absolute -top-1 -right-5",
          "flex size-7 shrink-0 items-center justify-center",
          "rounded-full",
          "border-2 border-background",
          "bg-primary text-primary-foreground",
          "transition-transform duration-200",
          "group-hover/action-link:rotate-45"
        )}
      >
        <ArrowUpRightIcon
          className={cn(
            "size-3",
            isPrimary ? "text-primary-foreground" : "text-primary-foreground"
          )}
        />
      </span>
    </Button>
  )
}
