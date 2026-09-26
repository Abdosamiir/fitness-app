import * as React from "react"
import { Input } from "@/shared/components/ui/input"
import { cn } from "@/shared/lib/utils/utils"

export interface OtpInputProps {
  value?: string
  onChange?: (value: string) => void
  length?: number
  disabled?: boolean
  error?: boolean
  className?: string
}

export const OtpInput = React.forwardRef<HTMLInputElement, OtpInputProps>(
  (
    {
      value = "",
      onChange,
      length = 6,
      disabled = false,
      error = false,
      className,
    },
    ref
  ) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    const otpArray = Array.from(
      { length },
      (_, i) => value[i] || ""
    )

    const handleDigitChange = (index: number, digit: string) => {
      if (!/^\d*$/.test(digit)) return

      const singleChar = digit.slice(-1)
      const newOtpArr = [...otpArray]
      newOtpArr[index] = singleChar
      const newOtpStr = newOtpArr.join("")

      onChange?.(newOtpStr)

      if (singleChar && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace" && !otpArray[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pastedData = e.clipboardData
        .getData("text")
        .trim()
        .slice(0, length)

      if (/^\d+$/.test(pastedData)) {
        onChange?.(pastedData)
        const targetIndex = Math.min(pastedData.length, length - 1)
        inputRefs.current[targetIndex]?.focus()
      }
    }

    return (
      <div className={cn("flex items-center justify-center gap-2 sm:gap-3", className)}>
        {Array.from({ length }, (_, index) => (
          <Input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
              if (index === 0 && ref) {
                if (typeof ref === "function") ref(el)
                else ref.current = el
              }
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otpArray[index]}
            disabled={disabled}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              "h-12 w-12 rounded-none border-b-2 border-x-0 border-t-0 border-primary bg-transparent p-0 text-center text-xl font-bold text-primary shadow-none transition-colors focus-visible:border-muted focus-visible:ring-0",
              error && "border-destructive text-destructive",
              disabled && "cursor-not-allowed opacity-50"
            )}
          />
        ))}
      </div>
    )
  }
)

OtpInput.displayName = "OtpInput"