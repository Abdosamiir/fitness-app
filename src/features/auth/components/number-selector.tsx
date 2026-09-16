import { ChevronUp } from "lucide-react"

type NumberSelectorProps = {
  label: string
  max: number
  min: number
  onChange: (value: number) => void
  value: number
}

const VISIBLE_OFFSET_COUNT = 3

export function NumberSelector({
  label,
  max,
  min,
  onChange,
  value,
}: NumberSelectorProps) {
  const visibleValues = Array.from(
    { length: VISIBLE_OFFSET_COUNT * 2 + 1 },
    (_, index) => value + index - VISIBLE_OFFSET_COUNT
  ).filter((option) => option >= min && option <= max)

  return (
    <div className="flex flex-col items-center">
      <span className="mb-4 text-sm font-medium text-brand-500">{label}</span>
      <div className="flex min-h-12 items-center justify-center gap-3 sm:gap-4">
        {visibleValues.map((option) => {
          const distance = Math.abs(option - value)

          return (
            <button
              aria-label={`Select ${option} ${label}`}
              aria-pressed={option === value}
              className={
                option === value
                  ? "font-brand text-4xl font-extrabold text-brand-500"
                  : distance === 1
                    ? "font-brand text-3xl font-bold text-white/85"
                    : "font-brand text-lg font-bold text-white/40"
              }
              key={option}
              onClick={() => onChange(option)}
              type="button"
            >
              {option}
            </button>
          )
        })}
      </div>
      <ChevronUp
        aria-hidden="true"
        className="mt-3 text-brand-500"
        fill="currentColor"
      />
    </div>
  )
}
