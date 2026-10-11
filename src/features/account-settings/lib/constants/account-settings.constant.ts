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
    id: "level1",
    label: "Rookie",
    desc: "Taking your first steps into fitness and regular exercise",
  },
  {
    id: "level2",
    label: "Beginner",
    desc: "Starting your fitness journey or returning after a break",
  },
  {
    id: "level3",
    label: "Intermediate",
    desc: "Regular workouts 2-4 times a week with good endurance",
  },
  {
    id: "level4",
    label: "Advanced",
    desc: "Experienced athlete training consistently with high intensity",
  },
  {
    id: "level5",
    label: "True Beast",
    desc: "Training at peak intensity with advanced strength and endurance",
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
  activityLevel: "level2" as AccountLevel,
  weight: 90,
  language: "en" as LanguageCode,
}
