import { Dumbbell } from "lucide-react"

export function ClassesHeroHeading() {
  return (
    <div className="relative mx-auto w-full max-w-5xl text-center select-none pt-4 pb-2">
      {/* Background outlined watermark "WORKOUTS" */}
      <div
        aria-hidden="true"
        className="pointer-events-none -mb-8 sm:-mb-12 flex items-center justify-center opacity-80"
      >
        <span className="font-brand text-[clamp(3.2rem,11.5vw,7rem)] font-black uppercase tracking-[0.06em] text-transparent [-webkit-text-stroke:1.2px_rgba(0,0,0,0.08)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.12)]">
          WORKOUTS
        </span>
      </div>

      {/* Fitness Club emblem with dumbbells */}
      <div className="relative z-10 mb-3 flex items-center justify-center gap-2 text-primary">
        <Dumbbell className="size-4.5 -rotate-12 transition-transform sm:size-5" />
        <span className="font-brand text-xs font-black tracking-[0.2em] uppercase sm:text-sm">
          FITNESS CLUB
        </span>
        <Dumbbell className="size-4.5 rotate-12 transition-transform sm:size-5" />
      </div>

      {/* Main Title - Dark & Light adaptive */}
      <h1 className="relative z-10 mx-auto max-w-4xl font-brand text-2xl leading-[1.2] font-black uppercase tracking-tight text-neutral-900 dark:text-white min-[480px]:text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem]">
        TRANSFORM YOUR BODY WITH OUR
        <span className="mt-1 block">
          <span className="text-neutral-900 dark:text-white">DYNAMIC </span>
          <span className="text-primary">UPCOMING WORKOUTS</span>
        </span>
      </h1>
    </div>
  )
}
