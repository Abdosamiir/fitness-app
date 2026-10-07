import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"

import mealDetailsFallback from "@/features/healthy/assets/meal-details-fallback.png"
import {
  useHealthyMeal,
  useHealthyMeals,
} from "@/features/healthy/lib/hooks/use-healthy"
import type { HealthyMeal } from "@/features/healthy/lib/types/healthy"
import { cn } from "@/shared/lib/utils/utils"

type MealPeriod = "Breakfast" | "Lunch" | "Dinner"

type HealthyMealDetailsProps = {
  meal: HealthyMeal
  onBack: () => void
  onSelectMeal: (meal: HealthyMeal) => void
}

const MEAL_PERIODS: { apiCategory: string; label: MealPeriod }[] = [
  { apiCategory: "Breakfast", label: "Breakfast" },
  { apiCategory: "Chicken", label: "Lunch" },
  { apiCategory: "Pasta", label: "Dinner" },
]

// TheMealDB does not expose nutrition values, so these design values remain
// isolated until the team connects a nutrition data source.
const NUTRITION_SUMMARY = [
  { label: "Energy", value: "100 K" },
  { label: "Protein", value: "58 G" },
  { label: "Carbs", value: "58 G" },
  { label: "Fat", value: "20 G" },
]

function createSummary(instructions: string) {
  const sentences = instructions.match(/[^.!?]+[.!?]+/g) ?? [instructions]

  return sentences.slice(0, 2).join(" ").trim()
}

export function HealthyMealDetails({
  meal,
  onBack,
  onSelectMeal,
}: HealthyMealDetailsProps) {
  // State
  const [activePeriod, setActivePeriod] = useState<MealPeriod>("Dinner")

  // Query
  const activeCategory =
    MEAL_PERIODS.find((period) => period.label === activePeriod)?.apiCategory ??
    "Pasta"
  const relatedMealsQuery = useHealthyMeals(activeCategory)
  const mealQuery = useHealthyMeal(meal.id)

  // Variables
  const relatedMeals = useMemo(
    () => (relatedMealsQuery.data ?? []).slice(0, 5),
    [relatedMealsQuery.data]
  )

  // Effects
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onBack()
      }
    }

    window.addEventListener("keydown", handleEscape)

    return () => window.removeEventListener("keydown", handleEscape)
  }, [onBack])

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <button
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-brand text-sm font-bold transition-colors hover:border-primary hover:text-primary"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to meals
      </button>

      <div className="grid overflow-hidden rounded-3xl border border-primary/60 bg-neutral-950 text-white shadow-2xl lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="border-b border-white/10 bg-neutral-900/95 p-4 sm:p-5 lg:border-r lg:border-b-0">
          <div
            aria-label="Meal periods"
            className="flex items-center justify-center gap-2"
            role="tablist"
          >
            {MEAL_PERIODS.map((period) => {
              const isActive = activePeriod === period.label

              return (
                <button
                  aria-selected={isActive}
                  className={cn(
                    "rounded-full px-4 py-2 font-brand text-sm font-bold transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  )}
                  key={period.label}
                  onClick={() => setActivePeriod(period.label)}
                  role="tab"
                  type="button"
                >
                  {period.label}
                </button>
              )
            })}
          </div>

          {relatedMealsQuery.isLoading ? (
            <div className="flex min-h-60 items-center justify-center">
              <Loader2 className="size-7 animate-spin text-primary" />
            </div>
          ) : relatedMealsQuery.isError ? (
            <p className="py-12 text-center text-sm text-red-400">
              Unable to load related meals.
            </p>
          ) : (
            <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible">
              {relatedMeals.map((relatedMeal) => {
                const isSelected = relatedMeal.id === meal.id

                return (
                  <button
                    aria-pressed={isSelected}
                    className={cn(
                      "flex min-w-64 snap-start items-center gap-3 rounded-2xl border border-transparent p-3 text-left transition-colors lg:min-w-0 lg:w-full",
                      isSelected
                        ? "border-primary/60 bg-primary/10"
                        : "border-b-white/10 hover:bg-white/5"
                    )}
                    key={relatedMeal.id}
                    onClick={() => onSelectMeal(relatedMeal)}
                    type="button"
                  >
                    <img
                      alt=""
                      className="size-16 shrink-0 rounded-2xl object-cover"
                      loading="lazy"
                      src={relatedMeal.image}
                    />
                    <span className="min-w-0">
                      <span className="line-clamp-1 block font-brand text-base font-bold">
                        {relatedMeal.name}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-xs leading-5 text-white/60">
                        Select this meal to see its recipe and ingredients.
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </aside>

        <div className="min-w-0 bg-neutral-950">
          {mealQuery.isLoading && (
            <div className="flex min-h-150 items-center justify-center">
              <Loader2 className="size-9 animate-spin text-primary" />
            </div>
          )}

          {mealQuery.isError && (
            <div className="flex min-h-120 items-center justify-center p-8 text-center">
              <div>
                <h1 className="font-brand text-2xl font-black uppercase">
                  Unable to load this meal
                </h1>
                <p className="mt-2 text-sm text-white/60">
                  Please return to the meals list and try again.
                </p>
              </div>
            </div>
          )}

          {mealQuery.data && (
            <>
              <div className="relative min-h-90 overflow-hidden sm:min-h-110">
                <img
                  alt={mealQuery.data.name}
                  className="absolute inset-0 size-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = mealDetailsFallback
                  }}
                  src={mealQuery.data.image || mealDetailsFallback}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/45 to-black/10" />

                <div className="absolute inset-x-0 bottom-0 px-5 pb-6 sm:px-8 sm:pb-8">
                  <h1 className="font-brand text-3xl font-black capitalize sm:text-5xl">
                    {mealQuery.data.name}
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-white/75 sm:text-base">
                    {createSummary(mealQuery.data.instructions)}
                  </p>

                  <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
                    {NUTRITION_SUMMARY.map((item) => (
                      <div
                        className="rounded-2xl border border-white/25 bg-black/25 px-4 py-3 backdrop-blur-sm"
                        key={item.label}
                      >
                        <dt className="text-xs font-semibold text-primary">
                          {item.label}
                        </dt>
                        <dd className="mt-1 font-brand text-sm font-bold text-white">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <section className="px-5 py-7 sm:px-8 sm:py-9">
                <h2 className="font-brand text-2xl font-black">Ingredients</h2>
                <div className="mt-5 grid gap-x-12 sm:grid-cols-2">
                  {mealQuery.data.ingredients.map((ingredient, index) => (
                    <div
                      className="flex items-start justify-between gap-4 border-b border-white/10 py-3 text-sm"
                      key={`${ingredient.name}-${index}`}
                    >
                      <span className="font-medium text-white/85">
                        {ingredient.name}
                      </span>
                      <span className="text-right text-primary">
                        {ingredient.measure || "To taste"}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
