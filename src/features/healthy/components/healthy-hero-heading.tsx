import { Apple } from "lucide-react"

export function HealthyHeroHeading() {
  return (
    <div className="relative mx-auto w-full max-w-5xl pt-4 pb-2 text-center select-none">
      <div
        aria-hidden="true"
        className="pointer-events-none -mb-8 flex items-center justify-center opacity-80 sm:-mb-12"
      >
        <span className="font-brand text-[clamp(3.2rem,11.5vw,7rem)] font-black tracking-[0.06em] text-transparent uppercase [-webkit-text-stroke:1.2px_rgba(0,0,0,0.08)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.12)]">
          HEALTHY
        </span>
      </div>

      <div className="relative z-10 mb-3 flex items-center justify-center gap-2 text-primary">
        <Apple className="size-5" />

        <span className="font-brand text-xs font-black tracking-[0.2em] uppercase sm:text-sm">
          FITNESS CLUB
        </span>

        <Apple className="size-5" />
      </div>

      <h1 className="relative z-10 mx-auto max-w-4xl font-brand text-2xl leading-[1.2] font-black tracking-tight text-neutral-900 uppercase min-[480px]:text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] dark:text-white">
        EAT SMART.
        <span className="mt-1 block">
          <span className="text-neutral-900 dark:text-white">LIVE</span>{" "}
          <span className="text-primary">HEALTHY.</span>
        </span>
      </h1>

      <p className="mx-auto mt-4 max-w-2xl px-4 text-sm leading-6 text-neutral-500 sm:text-base dark:text-zinc-400">
        Discover delicious meals, explore different cuisines, and find the
        perfect food to support your fitness journey.
      </p>
    </div>
  )
}
