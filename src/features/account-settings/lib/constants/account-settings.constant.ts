import type { AccountGoal, AccountLevel, LanguageCode } from "../types/account-settings"

export const ACCOUNT_GOAL_OPTIONS: { id: AccountGoal; label: string }[] = [
  { id: "Gain weight", label: "Gain Weight" },
  { id: "Lose weight", label: "Lose Weight" },
  { id: "Get fitter", label: "Get Fitter" },
  { id: "Gain more flexible", label: "Gain More Flexible" },
  { id: "Learn the basic", label: "Learn The Basic" },
]

export const ACCOUNT_LEVEL_OPTIONS: { id: AccountLevel; label: string; desc: string }[] = [
  {
    id: "Beginner",
    label: "Beginner",
    desc: "Starting your fitness journey or returning after a break",
  },
  {
    id: "Intermediate",
    label: "Intermediate",
    desc: "Regular workouts 2-4 times a week with good endurance",
  },
  {
    id: "Advanced",
    label: "Advanced",
    desc: "Experienced athlete training consistently with high intensity",
  },
]

export const LANGUAGE_OPTIONS: {
  code: LanguageCode
  label: string
  nativeName: string
  flag: string
}[] = [
  { code: "en", label: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "ar", label: "Arabic", nativeName: "العربية", flag: "🇪🇬" },
  { code: "fr", label: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "es", label: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "de", label: "German", nativeName: "Deutsch", flag: "🇩🇪" },
]

export const DEFAULT_ACCOUNT_SETTINGS = {
  goal: "Lose weight" as AccountGoal,
  level: "Beginner" as AccountLevel,
  weight: 90,
  language: "en" as LanguageCode,
}
