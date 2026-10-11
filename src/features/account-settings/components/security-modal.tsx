import { useState } from "react"
import { Shield, KeyRound, Trash2, CheckCircle2 } from "lucide-react"
import { AccountModalWrapper } from "./account-modal-wrapper"
import type { UserProfileData } from "../lib/types/account-settings"

interface SecurityModalProps {
  isOpen: boolean
  onClose: () => void
  profile: UserProfileData
  onOpenPasswordModal: () => void
  onDeleteAccount: () => Promise<void>
}

export function SecurityModal({
  isOpen,
  onClose,
  profile,
  onOpenPasswordModal,
  onDeleteAccount,
}: SecurityModalProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDeleteAccount()
      onClose()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AccountModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-7 sm:p-9">
        {/* Heading */}
        <div className="text-center mb-7">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Shield className="size-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Security & Privacy
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-medium">
            Manage your account credentials and security safeguards
          </p>
        </div>

        {/* Security Items */}
        <div className="space-y-3.5 mb-7">
          {/* Email Info */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-border/70 bg-card/40">
            <div>
              <div className="text-xs text-neutral-400 font-medium">
                Registered Email
              </div>
              <div className="text-sm font-bold text-foreground mt-0.5">
                {profile.email || "user@superfitness.com"}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="size-3.5" />
              Verified
            </div>
          </div>

          {/* Change Password Link */}
          <button
            type="button"
            onClick={() => {
              onClose()
              onOpenPasswordModal()
            }}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-border/70 bg-card/40 hover:border-primary hover:bg-card/70 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <KeyRound className="size-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">
                  Update Password
                </div>
                <div className="text-xs text-neutral-400">
                  Change your account login password
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-primary">Edit</span>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="pt-4 border-t border-border/60">
          {!showConfirmDelete ? (
            <button
              type="button"
              onClick={() => setShowConfirmDelete(true)}
              className="w-full py-3 px-4 rounded-xl border border-destructive/40 text-destructive hover:bg-destructive/10 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trash2 className="size-4" />
              Delete Account
            </button>
          ) : (
            <div className="p-4 rounded-2xl border border-destructive/40 bg-destructive/10 space-y-3">
              <p className="text-xs text-destructive font-medium text-center">
                Are you sure? This will permanently delete your workout history and profile.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmDelete(false)}
                  className="flex-1 py-2 rounded-lg border border-border bg-card/60 text-xs font-semibold hover:bg-card cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 py-2 rounded-lg bg-destructive text-white text-xs font-bold hover:bg-destructive/90 disabled:opacity-50 cursor-pointer"
                >
                  {isDeleting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AccountModalWrapper>
  )
}
