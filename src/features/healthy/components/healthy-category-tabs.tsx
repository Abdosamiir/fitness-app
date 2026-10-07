import type { HealthyCategoryTabsProps } from "@/features/healthy/lib/types/healthy"
import { Container } from "@/shared/layout/container"
import { cn } from "@/shared/lib/utils/utils"

export function HealthyCategoryTabs({
  categories,
  activeCategory,
  onSelectCategory,
}: HealthyCategoryTabsProps) {
  return (
    <Container className="mt-6 min-w-0 sm:mt-8">
      <div
        role="tablist"
        aria-label="Healthy meal categories"
        className="w-full min-w-0 scrollbar-none overflow-x-auto"
      >
        <div className="flex w-max min-w-full items-center justify-start gap-1.5 pb-2 sm:gap-2.5 sm:pb-3 lg:justify-center">
          {categories.map((category) => {
            const active = category === activeCategory

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectCategory(category)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 font-brand text-xs font-black tracking-wide uppercase transition-all duration-200 sm:px-6 sm:py-2.5 sm:text-sm",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
                  active
                    ? "scale-[1.02] bg-primary text-white shadow-[0_4px_16px_rgba(255,65,0,0.38)]"
                    : "text-neutral-600 hover:bg-neutral-200/70 hover:text-neutral-950 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
