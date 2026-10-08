import { useCallback, useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { ClassesCard } from "@/features/classes/components/classes-card"
import type {
  ClassesGridProps,
  ClassWorkoutCard,
} from "@/features/classes/lib/types/classes"
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

export function ClassesGrid({
  workouts,
  isLoading = false,
  onExploreWorkout,
}: ClassesGridProps) {
  // State
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState<number>(0)
  const [count, setCount] = useState<number>(0)
  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false)
  const [canScrollNext, setCanScrollNext] = useState<boolean>(false)

  // Chunk workouts into pages of 6 cards each (3 cards per row x 2 rows)
  const pages = useMemo(() => {
    const result: ClassWorkoutCard[][] = []
    const cardsPerPage = 6

    for (let i = 0; i < workouts.length; i += cardsPerPage) {
      result.push(workouts.slice(i, i + cardsPerPage))
    }

    return result
  }, [workouts])

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

  // Reset to first slide when workouts list changes (e.g. category switched)
  useEffect(() => {
    if (!api) return
    api.scrollTo(0)
  }, [api, workouts])

  if (isLoading) {
    return (
      <div className="mx-auto mt-8 w-full max-w-7xl px-4 sm:mt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[4/3] w-full rounded-2xl sm:rounded-3xl bg-neutral-200/80 dark:bg-neutral-800/80 animate-pulse border border-neutral-300/40 dark:border-white/5"
            />
          ))}
        </div>
      </div>
    )
  }

  if (workouts.length === 0) {
    return (
      <div className="mx-auto mt-12 w-full max-w-7xl px-4 text-center text-neutral-500 sm:px-6 lg:px-8 dark:text-zinc-400">
        <p className="font-brand text-lg">No workouts found for this category.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-7xl px-4 sm:mt-10 sm:px-6 lg:px-8">
      {/* Workouts Carousel with 6 cards per slide (3 cards per row) */}
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
            {pages.map((pageWorkouts, pageIndex) => (
              <CarouselItem
                key={pageIndex}
                className="basis-full pl-4 sm:pl-6"
              >
                {/* 3 cards per row (lg:grid-cols-3) with 2 rows = 6 cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
                  {pageWorkouts.map((workout) => (
                    <ClassesCard
                      key={workout.id}
                      workout={workout}
                      onExplore={onExploreWorkout}
                    />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Desktop/Tablet side floating navigation buttons */}
          {count > 1 && (
            <>
              <CarouselPrevious className="hidden md:inline-flex -left-4 lg:-left-6 xl:-left-12 size-10 rounded-full border-neutral-300 bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30 dark:border-white/15 dark:bg-neutral-900/90 dark:hover:bg-primary dark:hover:text-white" />
              <CarouselNext className="hidden md:inline-flex -right-4 lg:-right-6 xl:-right-12 size-10 rounded-full border-neutral-300 bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30 dark:border-white/15 dark:bg-neutral-900/90 dark:hover:bg-primary dark:hover:text-white" />
            </>
          )}
        </div>

        {/* Carousel Navigation & Dots Indicator */}
        {count > 1 && (
          <div
            aria-label="Workout pagination"
            className="mt-10 sm:mt-12 flex items-center justify-center gap-3 select-none"
          >
            {/* Prev arrow button */}
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={handlePrev}
              disabled={!canScrollPrev}
              aria-label="Previous slide"
              className="size-8 rounded-full border-neutral-300 bg-white/80 shadow-sm transition-all hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30 dark:border-white/15 dark:bg-neutral-900/80 dark:hover:bg-primary dark:hover:text-white"
            >
              <ChevronLeft className="size-4" />
            </Button>

            {/* Dots navigation matching Figma design */}
            <div className="flex items-center gap-2">
              {Array.from({ length: count }).map((_, index) => {
                const isActive = current === index
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleScrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={cn(
                      "transition-all duration-300 cursor-pointer",
                      isActive
                        ? "h-2 w-8 rounded-full bg-primary shadow-sm shadow-primary/40"
                        : "size-2 rounded-full bg-neutral-300 hover:bg-neutral-500 dark:bg-white/35 dark:hover:bg-white/70"
                    )}
                  />
                )
              })}
            </div>

            {/* Next arrow button */}
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={handleNext}
              disabled={!canScrollNext}
              aria-label="Next slide"
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

// Export alias as well for descriptive naming
export { ClassesGrid as ClassesCarousel }
