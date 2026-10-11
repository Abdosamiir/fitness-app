import { useState } from "react"
import { AccountModalWrapper } from "./account-modal-wrapper"
import { LANGUAGE_OPTIONS } from "../lib/constants/account-settings.constant"
import type { LanguageCode } from "../lib/types/account-settings"

interface SelectLanguageModalProps {
  isOpen: boolean
  onClose: () => void
  currentLanguage: LanguageCode
  onSave: (lang: LanguageCode) => void
}

export function SelectLanguageModal({
  isOpen,
  onClose,
  currentLanguage,
  onSave,
}: SelectLanguageModalProps) {
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(currentLanguage)

  const handleSave = () => {
    onSave(selectedLang)
    onClose()
  }

  return (
    <AccountModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-7 sm:p-9">
        {/* Heading */}
        <div className="text-center mb-7">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Select Language
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-medium">
            Choose your preferred language
          </p>
        </div>

        {/* Language Options */}
        <div className="space-y-3 mb-8">
          {LANGUAGE_OPTIONS.map((item) => {
            const isSelected = selectedLang === item.code

            return (
              <button
                key={item.code}
                type="button"
                onClick={() => setSelectedLang(item.code)}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/50 shadow-sm"
                    : "border-border/70 bg-card/40 hover:border-border hover:bg-card/70 text-foreground/90"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.flag}</span>
                  <div>
                    <span className="font-semibold text-sm sm:text-base">
                      {item.label}
                    </span>
                    <span className="text-xs text-neutral-400 ml-2">
                      ({item.nativeName})
                    </span>
                  </div>
                </div>

                {/* Radio Circle */}
                <div
                  className={`size-5 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? "border-primary bg-transparent"
                      : "border-neutral-500/60 bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <div className="size-2.5 rounded-full bg-primary animate-in zoom-in" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleSave}
          className="w-full py-3.5 sm:py-4 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-[0.99] transition-all cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </AccountModalWrapper>
  )
}
