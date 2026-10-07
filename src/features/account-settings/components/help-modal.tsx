import { Headphones, Mail, HelpCircle, MessageSquare } from "lucide-react"
import { AccountModalWrapper } from "./account-modal-wrapper"

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <AccountModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <div className="p-7 sm:p-9 max-h-[85vh] flex flex-col">
        {/* Heading */}
        <div className="text-center mb-6 shrink-0">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Headphones className="size-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Help & Support
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-medium">
            Find answers or get in touch with our fitness support team
          </p>
        </div>

        {/* Content */}
        <div className="overflow-y-auto pr-2 space-y-4 text-xs sm:text-sm leading-relaxed max-h-[50vh]">
          {/* FAQ 1 */}
          <div className="p-4 rounded-2xl border border-border/70 bg-card/40">
            <div className="flex items-center gap-2 font-bold text-foreground text-sm mb-1">
              <HelpCircle className="size-4 text-primary shrink-0" />
              How do I update my workout routine?
            </div>
            <p className="text-neutral-400 pl-6 text-xs">
              You can tap "Your Goal" or "Level" on your Account Settings page anytime.
              Your recommendations and class lists will automatically adapt.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 rounded-2xl border border-border/70 bg-card/40">
            <div className="flex items-center gap-2 font-bold text-foreground text-sm mb-1">
              <HelpCircle className="size-4 text-primary shrink-0" />
              How often should I record my weight?
            </div>
            <p className="text-neutral-400 pl-6 text-xs">
              We recommend logging your weight once a week under the "Weight" card to
              track consistent, accurate progression.
            </p>
          </div>

          {/* Contact Support */}
          <div className="p-4 rounded-2xl border border-primary/30 bg-primary/5 space-y-3">
            <div className="font-bold text-foreground text-sm flex items-center gap-2">
              <MessageSquare className="size-4 text-primary" />
              Need 1-on-1 assistance?
            </div>
            <p className="text-xs text-neutral-400">
              Our support team is available 24/7 to resolve any account or plan issues.
            </p>
            <a
              href="mailto:support@superfitness.com"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
            >
              <Mail className="size-3.5" />
              support@superfitness.com
            </a>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t border-border/60 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm sm:text-base shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </AccountModalWrapper>
  )
}
