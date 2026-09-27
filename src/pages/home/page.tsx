import { UpcomingWorkoutsSection } from "@/features/home/components/upcoming-workouts-section"

export function HomePage() {
  return (
    <div className="relative left-1/2 w-[100dvw] max-w-[100dvw] -translate-x-1/2 overflow-x-clip">
      {/* Keep the shared app shell unchanged while this section spans the viewport. */}
      <UpcomingWorkoutsSection />
    </div>
  )
}
