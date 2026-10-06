import { useState } from "react"
import { ClassesCard } from "@/features/classes/components/classes-card"
import type { ClassWorkoutCard } from "@/features/classes/lib/types/classes"
import { cn } from "@/shared/lib/utils/utils"

interface ClassesGridProps {
  workouts: ClassWorkoutCard[]
  onExploreWorkout?: (workout: ClassWorkoutCard) => void
}

export function ClassesGrid({ workouts }: ClassesGridProps) {
  const [activePageIndex, setActivePageIndex] = useState<number>(0)
  const totalPages = 3

  return (
    <div className="mx-auto mt-8 w-full max-w-7xl px-4 sm:mt-10 sm:px-6 lg:px-8">
      {/* 3x2 Responsive Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
        {workouts.map((workout) => (
          <ClassesCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>

      {/* Pagination / Dots indicator matching Figma design */}
      <div
        aria-label="Workout pagination"
        className="mt-10 sm:mt-12 flex items-center justify-center gap-2 select-none"
      >
        {Array.from({ length: totalPages }).map((_, index) => {
          const isActive = activePageIndex === index
          return (
            <button
              key={index}
              type="button"
              onClick={() => setActivePageIndex(index)}
              aria-label={`Go to page ${index + 1}`}
              className={cn(
                "transition-all duration-300",
                isActive
                  ? "h-2 w-8 rounded-full bg-primary shadow-sm shadow-primary/40"
                  : "size-2 rounded-full bg-neutral-300 hover:bg-neutral-500 dark:bg-white/35 dark:hover:bg-white/70"
              )}
            />
          )
        })}
      </div>
    </div>
  )
}
