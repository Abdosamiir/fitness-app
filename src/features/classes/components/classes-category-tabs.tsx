import { CLASS_CATEGORIES } from "@/features/classes/lib/constants/classes.constant"
import type { WorkoutCategoryName } from "@/features/classes/lib/types/classes"
import { cn } from "@/shared/lib/utils/utils"

interface ClassesCategoryTabsProps {
  activeCategory: WorkoutCategoryName
  onSelectCategory: (category: WorkoutCategoryName) => void
}

export function ClassesCategoryTabs({
  activeCategory,
  onSelectCategory,
}: ClassesCategoryTabsProps) {
  return (
    <div className="mx-auto mt-6 w-full max-w-4xl px-2 sm:mt-8">
      <div
        role="tablist"
        aria-label="Workout Categories"
        className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none sm:gap-2.5 sm:pb-3 lg:justify-center lg:overflow-visible"
      >
        {CLASS_CATEGORIES.map((category) => {
          const isActive = activeCategory === category

          return (
            <button
              key={category}
              role="tab"
              type="button"
              id={`tab-${category.toLowerCase().replace(/\s+/g, "-")}`}
              aria-selected={isActive}
              onClick={() => onSelectCategory(category)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 font-brand text-xs font-black tracking-wide uppercase transition-all duration-200 sm:px-6 sm:py-2.5 sm:text-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "bg-primary text-white shadow-[0_4px_16px_rgba(255,65,0,0.38)] scale-[1.02]"
                  : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/70 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10"
              )}
            >
              {category}
            </button>
          )
        })}
      </div>
    </div>
  )
}
