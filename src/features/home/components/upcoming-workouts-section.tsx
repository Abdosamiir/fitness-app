import { useState } from "react"
import { Dumbbell } from "lucide-react"
import { FULL_BODY_WORKOUTS } from "@/features/classes/lib/constants/classes.constant"

import { WorkoutCard } from "@/features/home/components/workout-card"
import {
  FEATURED_WORKOUTS,
  WORKOUT_CATEGORIES,
} from "@/features/home/lib/constants/workouts"
import type { WorkoutCategory } from "@/features/home/lib/types/workout"
import { cn } from "@/shared/lib/utils/utils"

export function UpcomingWorkoutsSection() {
  const [activeCategory, setActiveCategory] =
    useState<WorkoutCategory>("Full Body")

  // Keep the featured design for Full Body; reuse the team's category catalog.
  const displayedWorkouts = activeCategory === "Full Body"
    ? FEATURED_WORKOUTS
    : FULL_BODY_WORKOUTS.filter((workout) => workout.category === activeCategory)

  return (
    <section
      aria-labelledby="upcoming-workouts-title"
      className="relative overflow-hidden bg-[url('/auth-layout.jpeg')] bg-cover bg-center py-8 sm:py-12 lg:py-16"
    >
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-360 px-3 sm:px-5 lg:px-0">
        <div className="mb-[-0.6rem] text-center" aria-hidden="true">
          <span className="font-brand text-[clamp(2.75rem,14vw,4.5rem)] font-extrabold tracking-[0.04em] text-white/15 uppercase sm:tracking-[0.08em]">
            Workouts
          </span>
        </div>

        <div className="relative bg-neutral-200/95 px-4 pt-5 pb-10 text-neutral-900 shadow-2xl sm:px-8 sm:pt-7 sm:pb-12 lg:px-20 lg:pb-16 dark:bg-neutral-900/95 dark:text-white">
          <div className="mb-7 flex items-center justify-center gap-2 text-brand-500">
            <Dumbbell aria-hidden="true" size={25} strokeWidth={2.2} />
            <span className="font-brand text-base font-bold">Fitness Class</span>
          </div>

          <h2
            className="mx-auto max-w-3xl text-center font-brand text-2xl leading-tight font-extrabold uppercase min-[420px]:text-3xl sm:text-4xl lg:text-5xl"
            id="upcoming-workouts-title"
          >
            Transform your body with our dynamic{" "}
            <span className="text-brand-500">upcoming workouts</span>
          </h2>

          <div
            aria-label="Workout categories"
            className="mx-auto mt-7 flex max-w-4xl gap-2 overflow-x-auto px-1 pb-2 lg:justify-center lg:overflow-visible"
            role="tablist"
          >
            {WORKOUT_CATEGORIES.map((category) => {
              const isActive = activeCategory === category

              return (
                <button
                  aria-selected={isActive}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 font-brand text-sm font-bold transition-colors sm:px-5 sm:text-base",
                    isActive
                      ? "bg-brand-500 text-white"
                      : "text-neutral-800 hover:bg-white/60 dark:text-white/80 dark:hover:bg-white/10"
                  )}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  role="tab"
                  type="button"
                >
                  {category}
                </button>
              )
            })}
          </div>

          <div className="mt-7 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {displayedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} category={activeCategory} />
            ))}
          </div>

          <div className="mt-7 flex items-center justify-center gap-2" aria-hidden="true">
            <span className="size-2 rounded-full bg-neutral-800 dark:bg-white" />
            <span className="h-2 w-8 rounded-full bg-brand-500" />
            <span className="size-2 rounded-full bg-neutral-800 dark:bg-white" />
            <span className="size-2 rounded-full bg-neutral-800 dark:bg-white" />
          </div>
        </div>
      </div>
    </section>
  )
}
