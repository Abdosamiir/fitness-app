import { useCallback, useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { HealthyCard } from "@/features/healthy/components/healthy-card"
import { HealthyCardSkeleton } from "@/features/healthy/components/healthy-card-skeleton"
import type {
  HealthyGridProps,
  HealthyMeal,
} from "@/features/healthy/lib/types/healthy"
import { Button } from "@/shared/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/shared/components/ui/carousel"
import { cn } from "@/shared/lib/utils/utils"

export function HealthyGrid({
  meals,
  isLoading = false,
  onExplore,
}: HealthyGridProps) {
  // State
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState<number>(0)
  const [count, setCount] = useState<number>(0)
  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false)
  const [canScrollNext, setCanScrollNext] = useState<boolean>(false)

  // Chunk meals into pages of 6 cards
  // 3 cards per row x 2 rows on desktop
  const pages = useMemo(() => {
    const result: HealthyMeal[][] = []
    const mealsPerPage = 6

    for (let i = 0; i < meals.length; i += mealsPerPage) {
      result.push(meals.slice(i, i + mealsPerPage))
    }

    return result
  }, [meals])

  // Functions
  const handleScrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  const handlePrev = useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const handleNext = useCallback(() => {
    api?.scrollNext()
  }, [api])

  // Effects
  useEffect(() => {
    if (!api) return

    const updateCarouselState = () => {
      setCurrent(api.selectedScrollSnap())
      setCount(api.scrollSnapList().length)
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateCarouselState()

    api.on("select", updateCarouselState)
    api.on("reInit", updateCarouselState)

    return () => {
      api.off("select", updateCarouselState)
      api.off("reInit", updateCarouselState)
    }
  }, [api])

  // Reset carousel when category/meals change
  useEffect(() => {
    if (!api) return

    api.scrollTo(0)
  }, [api, meals])

  // Loading state
  if (isLoading) {
    return (
      <div className="mx-auto mt-8 w-full max-w-7xl px-4 sm:mt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <HealthyCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  // Empty state
  if (meals.length === 0) {
    return (
      <div className="mx-auto mt-12 w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-brand text-lg text-neutral-500 dark:text-zinc-400">
          No meals found for this category.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-7xl px-4 sm:mt-10 sm:px-6 lg:px-8">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="relative w-full"
      >
        <div className="relative">
          <CarouselContent className="-ml-4 sm:-ml-6">
            {pages.map((pageMeals, pageIndex) => (
              <CarouselItem key={pageIndex} className="basis-full pl-4 sm:pl-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
                  {pageMeals.map((meal) => (
                    <HealthyCard
                      key={meal.id}
                      meal={meal}
                      onExplore={onExplore}
                    />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Desktop / Tablet floating navigation */}
          {count > 1 && (
            <>
              <CarouselPrevious className="-left-4 hidden size-10 rounded-full border-neutral-300 bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30 md:inline-flex lg:-left-6 xl:-left-12 dark:border-white/15 dark:bg-neutral-900/90 dark:hover:bg-primary dark:hover:text-white" />

              <CarouselNext className="-right-4 hidden size-10 rounded-full border-neutral-300 bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30 md:inline-flex lg:-right-6 xl:-right-12 dark:border-white/15 dark:bg-neutral-900/90 dark:hover:bg-primary dark:hover:text-white" />
            </>
          )}
        </div>

        {/* Pagination */}
        {count > 1 && (
          <div
            aria-label="Healthy meals pagination"
            className="mt-10 flex items-center justify-center gap-3 select-none sm:mt-12"
          >
            {/* Previous */}
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={handlePrev}
              disabled={!canScrollPrev}
              aria-label="Previous meals"
              className="size-8 rounded-full border-neutral-300 bg-white/80 shadow-sm transition-all hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30 dark:border-white/15 dark:bg-neutral-900/80 dark:hover:bg-primary dark:hover:text-white"
            >
              <ChevronLeft className="size-4" />
            </Button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: count }).map((_, index) => {
                const isActive = current === index

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleScrollTo(index)}
                    aria-label={`Go to meals page ${index + 1}`}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "cursor-pointer transition-all duration-300",
                      isActive
                        ? "h-2 w-8 rounded-full bg-primary shadow-sm shadow-primary/40"
                        : "size-2 rounded-full bg-neutral-300 hover:bg-neutral-500 dark:bg-white/35 dark:hover:bg-white/70"
                    )}
                  />
                )
              })}
            </div>

            {/* Next */}
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={handleNext}
              disabled={!canScrollNext}
              aria-label="Next meals"
              className="size-8 rounded-full border-neutral-300 bg-white/80 shadow-sm transition-all hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30 dark:border-white/15 dark:bg-neutral-900/80 dark:hover:bg-primary dark:hover:text-white"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}
      </Carousel>
    </div>
  )
}

export { HealthyGrid as HealthyCarousel }
