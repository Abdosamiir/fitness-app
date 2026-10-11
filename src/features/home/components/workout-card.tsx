import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"
import { ROUTES } from "@/pages/routes"

import type { Workout } from "@/features/home/lib/types/workout"
import type { WorkoutCategory } from "@/features/home/lib/types/workout"

type WorkoutCardProps = {
  workout: Workout
  category: WorkoutCategory
}

export function WorkoutCard({ workout, category }: WorkoutCardProps) {
  return (
    <article className="group min-w-full snap-center overflow-hidden rounded-2xl bg-neutral-50 shadow-sm sm:min-w-[calc(50%-0.75rem)] lg:min-w-0 dark:bg-neutral-800">
      <div className="aspect-4/3 overflow-hidden">
        <img
          alt={workout.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={workout.image}
          style={{ objectPosition: workout.imagePosition }}
        />
      </div>

      <div className="px-5 py-5 text-neutral-900 dark:text-white">
        <h3 className="font-brand text-xl font-extrabold tracking-[0.12em] uppercase">
          {workout.title}
        </h3>
        <Link
          className="mt-4 inline-flex items-center gap-3 font-brand text-lg font-bold text-brand-500"
          to={`${ROUTES.classes}?category=${encodeURIComponent(category)}`}
          aria-label={`Explore ${workout.title}`}
        >
          Explore
          <span className="flex size-7 items-center justify-center rounded-full bg-brand-500 text-white">
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2.5} />
          </span>
        </Link>
      </div>
    </article>
  )
}
