import {
  KeyRound,
  Globe,
  Sparkles,
  ShieldCheck,
  Shield,
  Headphones,
  LogOut,
} from "lucide-react"
import { useTheme } from "@/shared/providers/components/theme-provider"
import type { LanguageCode } from "../lib/types/account-settings"
import { LANGUAGE_OPTIONS } from "../lib/constants/account-settings.constant"

interface AccountSettingsGridProps {
  language: LanguageCode
  onOpenPasswordModal: () => void
  onOpenLanguageModal: () => void
  onOpenSecurityModal: () => void
  onOpenPrivacyModal: () => void
  onOpenHelpModal: () => void
  onOpenLogoutModal: () => void
}

export function AccountSettingsGrid({
  language,
  onOpenPasswordModal,
  onOpenLanguageModal,
  onOpenSecurityModal,
  onOpenPrivacyModal,
  onOpenHelpModal,
  onOpenLogoutModal,
}: AccountSettingsGridProps) {
  const { theme, setTheme } = useTheme()

  const currentLanguageLabel =
    LANGUAGE_OPTIONS.find((l) => l.code === language)?.label || "English"

  const isDarkMode = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  // Common glass card style
  const cardBaseStyle =
    "relative flex flex-col items-center justify-center text-center p-6 h-36 sm:h-40 md:h-44 rounded-3xl backdrop-blur-2xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer group select-none shadow-md"
  const themeCardStyle = isDarkMode
    ? "bg-[#212124]/50 hover:bg-[#28282c]/70 border border-white/10 hover:border-primary/50 text-white"
    : "bg-white/50 hover:bg-white/80 border border-neutral-300 hover:border-primary/50 text-neutral-900"

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-3xl mx-auto">
      {/* 1. Change Password */}
      <div
        role="button"
        tabIndex={0}
        onClick={onOpenPasswordModal}
        onKeyDown={(e) => e.key === "Enter" && onOpenPasswordModal()}
        className={`${cardBaseStyle} ${themeCardStyle}`}
      >
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          <KeyRound className="size-5.5 text-primary" />
        </div>
        <span className="font-bold text-sm sm:text-base tracking-tight mt-1">
          Change Password
        </span>
      </div>

      {/* 2. Select Language */}
      <div
        role="button"
        tabIndex={0}
        onClick={onOpenLanguageModal}
        onKeyDown={(e) => e.key === "Enter" && onOpenLanguageModal()}
        className={`${cardBaseStyle} ${themeCardStyle}`}
      >
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          <Globe className="size-5.5 text-primary" />
        </div>
        <div className="flex flex-col items-center mt-1">
          <span className="font-bold text-sm sm:text-base tracking-tight">
            Select Language
          </span>
          <span className="text-xs sm:text-sm font-semibold text-neutral-400 mt-0.5">
            [ <span className="text-primary font-bold">{currentLanguageLabel}</span> ]
          </span>
        </div>
      </div>

      {/* 3. Mood ( Dark / Light ) with toggle switch */}
      <div
        role="button"
        tabIndex={0}
        onClick={toggleTheme}
        onKeyDown={(e) => e.key === "Enter" && toggleTheme()}
        className={`${cardBaseStyle} ${themeCardStyle}`}
      >
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          <Sparkles className="size-5.5 text-primary" />
        </div>
        <div className="flex flex-col items-center gap-2 mt-1">
          <span className="font-bold text-sm sm:text-base tracking-tight">
            Mood ( <span className="text-primary font-bold">{isDarkMode ? "Dark" : "Light"}</span> )
          </span>

          {/* Figma Style Toggle Switch */}
          <div
            className={`w-12 h-6.5 rounded-full p-0.5 flex items-center transition-colors duration-300 ${
              isDarkMode
                ? "bg-neutral-800 border border-neutral-700/80 justify-end"
                : "bg-neutral-800 border border-neutral-600 justify-start"
            }`}
          >
            <div
              className={`size-5 rounded-full shadow-md transition-all duration-300 ${
                isDarkMode ? "bg-primary" : "bg-white"
              }`}
            />
          </div>
        </div>
      </div>

      {/* 4. Security */}
      <div
        role="button"
        tabIndex={0}
        onClick={onOpenSecurityModal}
        onKeyDown={(e) => e.key === "Enter" && onOpenSecurityModal()}
        className={`${cardBaseStyle} ${themeCardStyle}`}
      >
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          <ShieldCheck className="size-5.5 text-primary" />
        </div>
        <span className="font-bold text-sm sm:text-base tracking-tight mt-1">
          Security
        </span>
      </div>

      {/* 5. Privacy Policy */}
      <div
        role="button"
        tabIndex={0}
        onClick={onOpenPrivacyModal}
        onKeyDown={(e) => e.key === "Enter" && onOpenPrivacyModal()}
        className={`${cardBaseStyle} ${themeCardStyle}`}
      >
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          <Shield className="size-5.5 text-primary" />
        </div>
        <span className="font-bold text-sm sm:text-base tracking-tight mt-1">
          Privacy Policy
        </span>
      </div>

      {/* 6. Help */}
      <div
        role="button"
        tabIndex={0}
        onClick={onOpenHelpModal}
        onKeyDown={(e) => e.key === "Enter" && onOpenHelpModal()}
        className={`${cardBaseStyle} ${themeCardStyle}`}
      >
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          <Headphones className="size-5.5 text-primary" />
        </div>
        <span className="font-bold text-sm sm:text-base tracking-tight mt-1">
          Help
        </span>
      </div>

      {/* 7. Logout (Centered in 3rd row) */}
      <div
        role="button"
        tabIndex={0}
        onClick={onOpenLogoutModal}
        onKeyDown={(e) => e.key === "Enter" && onOpenLogoutModal()}
        className={`sm:col-span-2 lg:col-span-1 lg:col-start-2 ${cardBaseStyle} ${themeCardStyle} border-primary/20 hover:border-primary`}
      >
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          <LogOut className="size-5.5 text-primary" />
        </div>
        <span className="font-bold text-sm sm:text-base tracking-tight text-primary mt-1">
          Logout
        </span>
      </div>
    </div>
  )
}
