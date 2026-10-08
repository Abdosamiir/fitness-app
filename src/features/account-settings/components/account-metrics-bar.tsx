import { RotateCcw } from "lucide-react"

interface AccountMetricsBarProps {
  goal: string
  level: string
  weight: number
  onOpenGoalModal: () => void
  onOpenLevelModal: () => void
  onOpenWeightModal: () => void
}

export function AccountMetricsBar({
  goal,
  level,
  weight,
  onOpenGoalModal,
  onOpenLevelModal,
  onOpenWeightModal,
}: AccountMetricsBarProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-16 max-w-3xl mx-auto text-center">
      {/* 1. Your Goal */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
          Your Goal
        </h2>
        <span className="text-[10px] sm:text-[11px] font-bold text-neutral-400 tracking-widest uppercase mt-0.5 mb-2.5">
          TAP TO CHANGE
        </span>
        <button
          type="button"
          onClick={onOpenGoalModal}
          className="inline-flex items-center justify-between gap-3 px-6 py-2.5 rounded-full bg-primary text-white font-bold text-xs sm:text-sm shadow-md shadow-primary/25 hover:bg-primary/90 active:scale-95 transition-all cursor-pointer min-w-[140px]"
        >
          <span className="capitalize">{goal || "Lose weight"}</span>
          <RotateCcw className="size-3.5 shrink-0" />
        </button>
      </div>

      {/* 2. Level */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
          Level
        </h2>
        <span className="text-[10px] sm:text-[11px] font-bold text-neutral-400 tracking-widest uppercase mt-0.5 mb-2.5">
          TAP TO CHANGE
        </span>
        <button
          type="button"
          onClick={onOpenLevelModal}
          className="inline-flex items-center justify-between gap-3 px-6 py-2.5 rounded-full bg-primary text-white font-bold text-xs sm:text-sm shadow-md shadow-primary/25 hover:bg-primary/90 active:scale-95 transition-all cursor-pointer min-w-[140px]"
        >
          <span className="capitalize">{level || "Beginner"}</span>
          <RotateCcw className="size-3.5 shrink-0" />
        </button>
      </div>

      {/* 3. Weight */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
          Weight
        </h2>
        <span className="text-[10px] sm:text-[11px] font-bold text-neutral-400 tracking-widest uppercase mt-0.5 mb-2.5">
          TAP TO CHANGE
        </span>
        <button
          type="button"
          onClick={onOpenWeightModal}
          className="inline-flex items-center justify-between gap-3 px-6 py-2.5 rounded-full bg-primary text-white font-bold text-xs sm:text-sm shadow-md shadow-primary/25 hover:bg-primary/90 active:scale-95 transition-all cursor-pointer min-w-[140px]"
        >
          <span>{weight ? `${weight} Kg` : "90 Kg"}</span>
          <RotateCcw className="size-3.5 shrink-0" />
        </button>
      </div>
    </div>
  )
}
