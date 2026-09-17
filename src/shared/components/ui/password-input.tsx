import * as React from "react"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { cn } from "cn"

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  showLockIcon?: boolean
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, error, showLockIcon = true, disabled, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="relative w-full">
      {/* Optional Left Lock Icon */}
      {showLockIcon && (
        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted pointer-events-none" />
      )}

      {/* Input Field */}
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        className={cn(
          "w-full rounded-lg border border-input bg-background/50 py-2 text-lg text-black transition-colors focus:ring-2 focus:ring-primary focus:outline-none",
          showLockIcon ? "pl-10" : "pl-4",
          "pr-10", // Space for the eye icon button
          error && "border-destructive focus:ring-destructive",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      />

      {/* Toggle Visibility Button */}
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
        tabIndex={-1}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-foreground transition-colors hover:text-muted focus:outline-none disabled:pointer-events-none"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </button>
    </div>
  )
})

PasswordInput.displayName = "PasswordInput"