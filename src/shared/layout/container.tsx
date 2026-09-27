import type { ComponentPropsWithoutRef } from "react"

import { cn } from "cn"

export function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "container flex items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}
