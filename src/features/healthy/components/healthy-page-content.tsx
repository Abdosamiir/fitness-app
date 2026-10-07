import { useMemo, useState } from "react"

import { HealthyCategoryTabs } from "@/features/healthy/components/healthy-category-tabs"
import { HealthyGrid } from "@/features/healthy/components/healthy-grid"
import { HealthyHeroHeading } from "@/features/healthy/components/healthy-hero-heading"
import { HealthyMealDetails } from "@/features/healthy/components/healthy-meal-details"

import {
  useHealthyCategories,
  useHealthyMeals,
} from "@/features/healthy/lib/hooks/use-healthy"

import type { HealthyMeal } from "@/features/healthy/lib/types/healthy"

export function HealthyPageContent() {
  const [activeCategory, setActiveCategory] = useState("")

  const [selectedMeal, setSelectedMeal] = useState<HealthyMeal | null>(null)

  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useHealthyCategories()

  const categoryNames = useMemo(
    () => categories.map((category) => category.strCategory).filter(Boolean),
    [categories]
  )

  const effectiveCategory = activeCategory || categoryNames[0] || ""

  const {
    data: meals = [],
    isLoading: isMealsLoading,
    isError: isMealsError,
  } = useHealthyMeals(effectiveCategory)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setSelectedMeal(null)
  }

  if (selectedMeal) {
    return (
      <section
        aria-label="Meal details"
        className="relative min-h-[calc(100vh-140px)] w-full overflow-hidden bg-[#0D0D0D] text-white"
      >
        <HealthyMealDetails
          meal={selectedMeal}
          onBack={() => setSelectedMeal(null)}
          onSelectMeal={setSelectedMeal}
        />
      </section>
    )
  }

  return (
    <section
      aria-label="Healthy meals"
      className="relative min-h-[calc(100vh-140px)] w-full overflow-hidden bg-[#F7F7F8] py-8 text-neutral-900 transition-colors duration-300 sm:py-12 lg:py-5 dark:bg-[#0D0D0D] dark:text-white"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-162.5 -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-10 size-112.5 rounded-full bg-primary/10 blur-[120px] dark:bg-primary/5"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <HealthyHeroHeading />

        {isCategoriesLoading ? (
          <div className="mx-auto mt-8 flex justify-center">
            <div className="h-10 w-80 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
          </div>
        ) : isCategoriesError ? (
          <div className="mx-auto mt-8 text-center">
            <p className="text-sm text-red-500">
              Failed to load meal categories.
            </p>
          </div>
        ) : (
          <HealthyCategoryTabs
            categories={categoryNames}
            activeCategory={effectiveCategory}
            onSelectCategory={handleCategoryChange}
          />
        )}

        {isMealsError ? (
          <div className="mx-auto mt-12 max-w-xl px-4 text-center">
            <h2 className="font-brand text-xl font-black uppercase">
              Unable to load meals
            </h2>

            <p className="mt-2 text-sm text-neutral-500 dark:text-zinc-400">
              Please try again in a moment.
            </p>
          </div>
        ) : (
          <HealthyGrid
            meals={meals}
            isLoading={
              isCategoriesLoading || isMealsLoading || !effectiveCategory
            }
            onExplore={setSelectedMeal}
          />
        )}
      </div>
    </section>
  )
}
