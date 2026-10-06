import { useMemo, useState } from "react"
import { ClassesCategoryTabs } from "@/features/classes/components/classes-category-tabs"
import { ClassesGrid } from "@/features/classes/components/classes-grid"
import { ClassesHeroHeading } from "@/features/classes/components/classes-hero-heading"
import { FULL_BODY_WORKOUTS } from "@/features/classes/lib/constants/classes.constant"
import { useMuscleGroups } from "@/features/classes/lib/hooks/use-classes"
import type { WorkoutCategoryName } from "@/features/classes/lib/types/classes"
import { mapMuscleGroupToCard } from "@/features/classes/lib/utils/classes.util"

export function ClassesPageContent() {
  // State
  const [activeCategory, setActiveCategory] =
    useState<WorkoutCategoryName>("Full Body")

  // TanStack Query: fetch live muscle groups from API with env URL & key
  const { data: muscleGroups = [], isLoading } = useMuscleGroups()

  // Generate workout cards directly based on live API data
  const apiWorkouts = useMemo(() => {
    if (!muscleGroups || muscleGroups.length === 0) {
      return FULL_BODY_WORKOUTS
    }

    return muscleGroups.map((group) => mapMuscleGroupToCard(group))
  }, [muscleGroups])

  // Filter workouts based on the selected tab
  const displayedWorkouts = useMemo(() => {
    if (activeCategory === "Full Body") {
      return apiWorkouts
    }
    return apiWorkouts.filter(
      (workout) =>
        workout.category.toLowerCase() === activeCategory.toLowerCase()
    )
  }, [activeCategory, apiWorkouts])

  return (
    <section
      aria-label="Classes and Workouts"
      className="relative min-h-[calc(100vh-140px)] w-full overflow-hidden bg-[#F7F7F8] text-neutral-900 transition-colors duration-300 dark:bg-[#0D0D0D] dark:text-white py-8 sm:py-12 lg:py-5"
    >
      {/* Background ambient radial glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-162.5 rounded-full bg-primary/10 blur-[130px] dark:bg-primary/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0 size-112.5 rounded-full bg-primary/10 blur-[120px] dark:bg-primary/5"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section & Watermark */}
        <ClassesHeroHeading />

        {/* Category Tabs */}
        <ClassesCategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Workouts Carousel Grid */}
        <ClassesGrid
          workouts={displayedWorkouts}
          isLoading={isLoading}
        />
      </div>
    </section>
  )
}
