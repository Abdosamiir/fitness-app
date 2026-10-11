export function HealthyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-md dark:border-white/10 dark:bg-[#161616]">
      <div className="aspect-[4/3] animate-pulse bg-neutral-200 dark:bg-neutral-800" />

      <div className="space-y-3 p-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

        <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  )
}
