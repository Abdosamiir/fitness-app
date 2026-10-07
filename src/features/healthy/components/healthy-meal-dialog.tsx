import { ExternalLink, Loader2, X } from "lucide-react"

import { useHealthyMeal } from "@/features/healthy/lib/hooks/use-healthy"
import type { HealthyMeal } from "@/features/healthy/lib/types/healthy"

interface HealthyMealDialogProps {
  meal: HealthyMeal | null
  open: boolean
  onClose: () => void
}

export function HealthyMealDialog({
  meal,
  open,
  onClose,
}: HealthyMealDialogProps) {
  const { data, isLoading, isError } = useHealthyMeal(
    open ? (meal?.id ?? null) : null
  )

  if (!open || !meal) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${meal.name} details`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-[#151515]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close meal details"
          className="absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-primary"
        >
          <X className="size-5" />
        </button>

        {isLoading && (
          <div className="flex min-h-[400px] items-center justify-center">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="flex min-h-[300px] items-center justify-center p-8 text-center">
            <div>
              <h2 className="font-brand text-xl font-black uppercase">
                Something went wrong
              </h2>

              <p className="mt-2 text-sm text-neutral-500 dark:text-zinc-400">
                We couldn't load this meal right now.
              </p>
            </div>
          </div>
        )}

        {data && (
          <>
            <div className="relative aspect-[16/8] w-full overflow-hidden">
              <img
                src={data.image}
                alt={data.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <p className="mb-2 text-sm font-semibold tracking-wider text-primary uppercase">
                  {data.category}
                  {data.area && ` • ${data.area}`}
                </p>

                <h2 className="font-brand text-2xl font-black text-white uppercase sm:text-4xl">
                  {data.name}
                </h2>
              </div>
            </div>

            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[280px_1fr]">
              <div>
                <h3 className="font-brand text-lg font-black uppercase">
                  Ingredients
                </h3>

                <div className="mt-4 space-y-2">
                  {data.ingredients.map((ingredient, index) => (
                    <div
                      key={`${ingredient.name}-${index}`}
                      className="flex items-start justify-between gap-3 border-b border-neutral-200 py-2 text-sm dark:border-white/10"
                    >
                      <span className="font-medium">{ingredient.name}</span>

                      {ingredient.measure && (
                        <span className="text-right text-neutral-500 dark:text-zinc-400">
                          {ingredient.measure}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-brand text-lg font-black uppercase">
                  Instructions
                </h3>

                <p className="mt-4 text-sm leading-7 whitespace-pre-line text-neutral-600 dark:text-zinc-300">
                  {data.instructions}
                </p>

                {data.youtubeUrl && (
                  <a
                    href={data.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-brand text-sm font-black text-white uppercase transition-colors hover:bg-primary/90"
                  >
                    Watch Recipe
                    <ExternalLink className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
