import { useState } from "react"
import { useAccountSettings } from "../lib/hooks/use-account-settings"
import { AccountMetricsBar } from "./account-metrics-bar"
import { AccountSettingsGrid } from "./account-settings-grid"
import { AccountGoalModal } from "./account-goal-modal"
import { AccountLevelModal } from "./account-level-modal"
import { AccountWeightModal } from "./account-weight-modal"
import { ChangePasswordModal } from "./change-password-modal"
import { SelectLanguageModal } from "./select-language-modal"
import { SecurityModal } from "./security-modal"
import { PrivacyPolicyModal } from "./privacy-policy-modal"
import { HelpModal } from "./help-modal"
import { LogoutModal } from "./logout-modal"
import type { AccountGoal, AccountLevel, LanguageCode } from "../lib/types/account-settings"

type ModalType =
  | "goal"
  | "level"
  | "weight"
  | "password"
  | "language"
  | "security"
  | "privacy"
  | "help"
  | "logout"
  | null

export function AccountSettingsContent() {
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  const {
    profile,
    language,
    setLanguage,
    updateGoal,
    updateLevel,
    updateWeight,
    changePassword,
    logout,
    deleteAccount,
  } = useAccountSettings()

  const closeModal = () => setActiveModal(null)

  return (
    <div className="relative min-h-[calc(100vh-90px)] w-full pt-4 sm:pt-6 pb-16 overflow-hidden flex flex-col items-center">
      {/* Background blurred gym ambiance matching Figma */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        <img
          src="/auth-layout.jpeg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover filter blur-[24px] scale-110 opacity-35 dark:opacity-25 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-md transition-colors duration-500" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top 3 Status Pills */}
        <AccountMetricsBar
          goal={profile.goal || "Lose weight"}
          level={profile.activityLevel || "Beginner"}
          weight={profile.weight || 90}
          onOpenGoalModal={() => setActiveModal("goal")}
          onOpenLevelModal={() => setActiveModal("level")}
          onOpenWeightModal={() => setActiveModal("weight")}
        />

        {/* Spacing */}
        <div className="h-8 md:h-12" />

        {/* 7 Action / Settings Cards */}
        <AccountSettingsGrid
          language={language}
          onOpenPasswordModal={() => setActiveModal("password")}
          onOpenLanguageModal={() => setActiveModal("language")}
          onOpenSecurityModal={() => setActiveModal("security")}
          onOpenPrivacyModal={() => setActiveModal("privacy")}
          onOpenHelpModal={() => setActiveModal("help")}
          onOpenLogoutModal={() => setActiveModal("logout")}
        />
      </div>

      {/* Modals */}
      <AccountGoalModal
        isOpen={activeModal === "goal"}
        onClose={closeModal}
        currentGoal={profile.goal}
        onSave={(goal: AccountGoal) => updateGoal(goal)}
      />

      <AccountLevelModal
        isOpen={activeModal === "level"}
        onClose={closeModal}
        currentLevel={profile.activityLevel}
        onSave={(level: AccountLevel) => updateLevel(level)}
      />

      <AccountWeightModal
        isOpen={activeModal === "weight"}
        onClose={closeModal}
        currentWeight={profile.weight}
        onSave={(weight: number) => updateWeight(weight)}
      />

      <ChangePasswordModal
        isOpen={activeModal === "password"}
        onClose={closeModal}
        onSubmit={changePassword}
      />

      <SelectLanguageModal
        isOpen={activeModal === "language"}
        onClose={closeModal}
        currentLanguage={language}
        onSave={(lang: LanguageCode) => setLanguage(lang)}
      />

      <SecurityModal
        isOpen={activeModal === "security"}
        onClose={closeModal}
        profile={profile}
        onOpenPasswordModal={() => setActiveModal("password")}
        onDeleteAccount={deleteAccount}
      />

      <PrivacyPolicyModal
        isOpen={activeModal === "privacy"}
        onClose={closeModal}
      />

      <HelpModal isOpen={activeModal === "help"} onClose={closeModal} />

      <LogoutModal
        isOpen={activeModal === "logout"}
        onClose={closeModal}
        onConfirm={logout}
      />
    </div>
  )
}
