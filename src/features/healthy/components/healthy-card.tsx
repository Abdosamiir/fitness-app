import { ArrowUpRight } from "lucide-react"

import type { HealthyCardProps } from "@/features/healthy/lib/types/healthy"

export function HealthyCard({ meal, onExplore }: HealthyCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-xl dark:border-white/10 dark:bg-[#161616] dark:shadow-2xl dark:hover:border-primary/50">
      <button
        type="button"
        onClick={() => onExplore?.(meal)}
        className="block w-full text-left"
        aria-label={`Explore ${meal.name}`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          <img
            src={meal.image}
            alt={meal.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-5 pt-16 sm:p-6 sm:pt-20">
            <h2 className="font-brand text-lg font-black tracking-[0.06em] text-white uppercase drop-shadow-sm sm:text-xl">
              {meal.name}
            </h2>

            <div className="mt-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 font-brand text-sm font-bold tracking-wide text-zinc-200 transition-colors group-hover:text-primary">
                Explore
                <span className="flex size-7 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/30 transition-transform duration-300 group-hover:scale-110">
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 stroke-[2.8]"
                  />
                </span>
              </span>

              {meal.area && (
                <span className="hidden text-xs text-zinc-300/80 sm:block">
                  {meal.area}
                </span>
              )}
            </div>
          </div>
        </div>
      </button>
    </article>
  )
}
