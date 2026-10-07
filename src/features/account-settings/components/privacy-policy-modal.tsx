import { ShieldCheck } from "lucide-react"
import { AccountModalWrapper } from "./account-modal-wrapper"

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  return (
    <AccountModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <div className="p-7 sm:p-9 max-h-[85vh] flex flex-col">
        {/* Heading */}
        <div className="text-center mb-6 shrink-0">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="size-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Privacy Policy
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-medium">
            Your privacy and fitness data security are our top priorities
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-2 space-y-4 text-xs sm:text-sm text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed max-h-[50vh]">
          <div>
            <h3 className="font-bold text-foreground mb-1 text-sm sm:text-base">
              1. Information We Collect
            </h3>
            <p>
              Super Fitness collects personal metrics such as your age, height,
              weight, fitness goals, and workout activity to personalize your training
              routines and track your progression over time.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-1 text-sm sm:text-base">
              2. How We Use Your Data
            </h3>
            <p>
              Your data is solely used to generate custom workout plans, meal recommendations,
              and performance statistics. We do not sell or monetize your private biometric
              or fitness data to third-party advertisers.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-1 text-sm sm:text-base">
              3. Data Encryption & Security
            </h3>
            <p>
              All user communications and credentials are encrypted using industry-standard
              TLS 1.3 and hashed passwords. Authentication tokens are securely managed
              with strict HTTP-only and SameSite flags.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-1 text-sm sm:text-base">
              4. Your Control & Rights
            </h3>
            <p>
              You maintain complete ownership of your fitness profile. You can update your
              goals, change your password, or delete your account at any time directly
              from these settings.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t border-border/60 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm sm:text-base shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </AccountModalWrapper>
  )
}
