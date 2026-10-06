import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

import type { ClassesCardProps } from "@/features/classes/lib/types/classes"

export function ClassesCard({ workout }: ClassesCardProps) {
  // State
  const [hasError, setHasError] = useState<boolean>(false)

  // Variables
  const displayImage = hasError ? "/images/classes/chest.jpg" : workout.image

  // Functions
  const handleImageError = () => {
    setHasError(true)
  }

  return (
    <article
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/80 bg-white shadow-md transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:-translate-y-1.5 dark:border-white/10 dark:bg-[#161616] dark:shadow-2xl dark:hover:border-primary/50 dark:hover:shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
    >
      {/* Background Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <img
          src={displayImage}
          alt={`${workout.title} workout class`}
          onError={handleImageError}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
        />

        {/* Top subtle vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent"
        />

        {/* Bottom Glassmorphic Overlay */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/75 to-transparent p-5 pt-12 backdrop-blur-[2px] sm:p-6 sm:pt-14">
          <h2 className="font-brand text-xl font-black tracking-[0.08em] text-white uppercase sm:text-2xl drop-shadow-sm">
            {workout.title}
          </h2>

          <div className="mt-3 flex items-center justify-between">
            <div
              className="inline-flex items-center gap-2.5 font-brand text-sm font-bold tracking-wide text-zinc-200 transition-colors group-hover:text-primary sm:text-base select-none"
            >
              Explore
              <span className="flex size-7 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/30 transition-transform duration-300 group-hover:scale-110 sm:size-8">
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 stroke-[2.8]"
                />
              </span>
            </div>

            {workout.subtitle && (
              <span className="hidden font-sans text-xs text-zinc-300/80 md:inline-block">
                {workout.subtitle}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
