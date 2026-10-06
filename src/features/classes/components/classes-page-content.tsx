import { useMemo, useState } from "react"
import { ClassesCategoryTabs } from "@/features/classes/components/classes-category-tabs"
import { ClassesGrid } from "@/features/classes/components/classes-grid"
import { ClassesHeroHeading } from "@/features/classes/components/classes-hero-heading"
import { FULL_BODY_WORKOUTS } from "@/features/classes/lib/constants/classes.constant"
import type { WorkoutCategoryName } from "@/features/classes/lib/types/classes"

export function ClassesPageContent() {
  const [activeCategory, setActiveCategory] =
    useState<WorkoutCategoryName>("Full Body")

  // Filter workouts based on the selected tab
  const displayedWorkouts = useMemo(() => {
    if (activeCategory === "Full Body") {
      return FULL_BODY_WORKOUTS
    }
    return FULL_BODY_WORKOUTS.filter(
      (workout) =>
        workout.category.toLowerCase() === activeCategory.toLowerCase()
    )
  }, [activeCategory])

  return (
    <section
      aria-label="Classes and Workouts"
      className="relative min-h-[calc(100vh-140px)] w-full overflow-hidden bg-[#F7F7F8] text-neutral-900 transition-colors duration-300 dark:bg-[#0D0D0D] dark:text-white py-8 sm:py-12 lg:py-16"
    >
      {/* Background ambient radial glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-primary/10 blur-[130px] dark:bg-primary/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0 size-[450px] rounded-full bg-primary/10 blur-[120px] dark:bg-primary/5"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section & Watermark */}
        <ClassesHeroHeading />

        {/* Category Tabs */}
        <ClassesCategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Workouts Grid */}
        <ClassesGrid workouts={displayedWorkouts} />
      </div>
    </section>
  )
}
