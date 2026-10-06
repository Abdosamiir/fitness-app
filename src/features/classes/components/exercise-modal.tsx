import { useState } from "react"
import { Dumbbell, ExternalLink, Play, Sparkles, X } from "lucide-react"
import { useExercises } from "@/features/classes/lib/hooks/use-classes"
import type { ClassWorkoutCard } from "@/features/classes/lib/types/classes"
import { cn } from "@/shared/lib/utils/utils"

interface ExerciseModalProps {
  workout: ClassWorkoutCard | null
  onClose: () => void
}

export function ExerciseModal({ workout, onClose }: ExerciseModalProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All")
  const { data: allExercises = [], isLoading } = useExercises(100)

  if (!workout) return null

  // Filter exercises by muscle group name
  const groupName = workout.muscleGroupName.toLowerCase()
  const categoryName = workout.category.toLowerCase()

  const exercises = allExercises.filter((ex) => {
    const target = (ex.target_muscle_group || "").toLowerCase()
    const prime = (ex.prime_mover_muscle || "").toLowerCase()
    const name = (ex.exercise || "").toLowerCase()

    const matchesMuscle =
      target.includes(groupName) ||
      target.includes(categoryName) ||
      prime.includes(groupName) ||
      prime.includes(categoryName) ||
      name.includes(categoryName)

    if (!matchesMuscle) return false

    if (selectedDifficulty === "All") return true
    return (
      (ex.difficulty_level || "").toLowerCase() ===
      selectedDifficulty.toLowerCase()
    )
  })

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Content */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white text-neutral-900 shadow-2xl transition-colors dark:border-white/10 dark:bg-[#141414] dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5 dark:border-white/10 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Dumbbell className="size-5" />
            </span>
            <div>
              <h3
                id="modal-title"
                className="font-brand text-xl font-black uppercase tracking-wide text-neutral-900 dark:text-white sm:text-2xl"
              >
                {workout.title} WORKOUTS
              </h3>
              <p className="text-xs text-neutral-500 dark:text-zinc-400">
                Explore recommended exercises & training guides
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            aria-label="Close dialog"
            className="flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/30 dark:hover:bg-white/5 dark:hover:text-white transition-all"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Difficulty Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-neutral-200 bg-neutral-50/80 px-6 py-3 dark:border-white/5 dark:bg-black/30 sm:px-8">
          <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
            Difficulty:
          </span>
          {["All", "Beginner", "Novice", "Intermediate", "Advanced"].map(
            (level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedDifficulty(level)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-xs font-bold transition-all",
                  selectedDifficulty === level
                    ? "bg-primary text-white"
                    : "bg-neutral-200/80 text-neutral-700 hover:bg-neutral-300 hover:text-neutral-950 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                {level}
              </button>
            )
          )}
        </div>

        {/* Exercises List */}
        <div className="flex-1 space-y-4 overflow-y-auto p-6 sm:p-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-neutral-500 dark:text-zinc-400">
              <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="mt-3 text-sm">Loading exercises...</p>
            </div>
          ) : exercises.length > 0 ? (
            exercises.map((item) => {
              const videoLink =
                item.short_youtube_demonstration_link ||
                item.in_depth_youtube_explanation_link

              return (
                <div
                  key={item._id}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-200/90 bg-neutral-50/60 p-4 transition-all hover:border-primary/40 hover:bg-neutral-100/80 dark:border-white/5 dark:bg-[#1B1B1B] dark:hover:border-primary/40 dark:hover:bg-[#202020] sm:flex-row sm:items-center"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-brand text-base font-bold text-neutral-900 dark:text-white sm:text-lg">
                        {item.exercise}
                      </span>
                      {item.difficulty_level && (
                        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                          {item.difficulty_level}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-zinc-400">
                      {item.target_muscle_group && (
                        <span>Target: {item.target_muscle_group}</span>
                      )}
                      {item.primary_equipment && (
                        <span>• Equipment: {item.primary_equipment}</span>
                      )}
                    </div>
                  </div>

                  {videoLink ? (
                    <a
                      href={videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white"
                    >
                      <Play className="size-3.5 fill-current" />
                      Watch Demo
                      <ExternalLink className="size-3" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 dark:text-zinc-500">
                      <Sparkles className="size-3.5 text-primary" />
                      Standard Form
                    </span>
                  )}
                </div>
              )
            })
          ) : (
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-8 text-center text-neutral-500 dark:border-white/5 dark:bg-[#1B1B1B] dark:text-zinc-400">
              <Dumbbell className="mx-auto mb-2 size-10 text-neutral-400 dark:text-zinc-600" />
              <p className="font-brand text-base font-bold text-neutral-900 dark:text-white">
                No exercises found for this filter
              </p>
              <p className="mt-1 text-xs">
                Try selecting "All" difficulties or another category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
