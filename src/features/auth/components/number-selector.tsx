import { Minus, Plus } from "lucide-react"

import { Button } from "@/shared/components/ui/button"

interface NumberSelectorProps {
  value: number
  min: number
  max: number
  label: string
  onChange: (value: number) => void
}

export function NumberSelector({
  value,
  min,
  max,
  label,
  onChange,
}: NumberSelectorProps) {
  const decrement = () => {
    if (value <= min) return

    onChange(value - 1)
  }

  const increment = () => {
    if (value >= max) return

    onChange(value + 1)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-8">
        <Button
          type="button"
          size="icon"
          variant="outline"
          disabled={value <= min}
          onClick={decrement}
          aria-label={`Decrease ${label}`}
          className="size-10 rounded-full"
        >
          <Minus size={18} />
        </Button>

        <div className="min-w-32 text-center">
          <div className="font-brand text-5xl font-bold text-white">
            {value}
          </div>

          <div className="mt-1 text-sm text-white/60">{label}</div>
        </div>

        <Button
          type="button"
          size="icon"
          variant="outline"
          disabled={value >= max}
          onClick={increment}
          aria-label={`Increase ${label}`}
          className="size-10 rounded-full"
        >
          <Plus size={18} />
        </Button>
      </div>

      <p className="mt-4 text-xs text-white/40">
        {min} - {max}
      </p>
    </div>
  )
}
