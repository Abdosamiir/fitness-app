import type { ReactNode } from "react"
import { cn } from "cn"

import chatbotRobot from "@/assets/imgs/chatbot-robot.png"

/**
 * The waving robot on a soft brand-orange glow, with a pill label overlapping
 * its torso. Rendered inside the drawer trigger, so it carries no interactive
 * element of its own.
 */
export function ChatbotRobot({
  label,
  className,
}: {
  label: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "relative isolate flex w-37 flex-col items-center",
        className
      )}
    >
      {/* Orange halo behind the robot and pill */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-[48%] left-1/2 -z-10 h-56 w-60 -translate-1/2 rounded-full bg-[radial-gradient(closest-side,var(--color-brand-500)_0%,color-mix(in_oklch,var(--color-brand-500)_45%,transparent)_45%,transparent_100%)] opacity-80 blur-md transition-opacity duration-300 group-hover/robot:opacity-100"
      />

      <img
        src={chatbotRobot}
        alt=""
        aria-hidden
        width={448}
        height={327}
        draggable={false}
        className="w-full drop-shadow-[0_6px_10px_rgb(0_0_0/0.3)] transition-transform duration-300 select-none group-hover/robot:-translate-y-0.5"
      />

      <span className="-mt-4 flex h-9.5 items-center rounded-full bg-primary px-5 font-brand text-base leading-none font-bold whitespace-nowrap text-primary-foreground shadow-[0_4px_14px_color-mix(in_oklch,var(--color-brand-500)_45%,transparent)] transition-colors group-hover/robot:bg-brand-600 group-focus-visible/robot:ring-3 group-focus-visible/robot:ring-ring/50">
        {label}
      </span>
    </span>
  )
}

/** The robot shrunk into a small dark disc, used as the coach's avatar. */
export function ChatbotAvatar() {
  return (
    <span className="relative size-8 shrink-0 overflow-hidden rounded-full bg-background ring-1 ring-primary/40">
      <img
        src={chatbotRobot}
        alt=""
        aria-hidden
        className="absolute -top-1.25 -left-6.75 w-20 max-w-none"
      />
    </span>
  )
}
