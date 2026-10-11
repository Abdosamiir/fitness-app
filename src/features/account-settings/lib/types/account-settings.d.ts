import type { User } from "@/features/auth/lib/utils/user"

export type AccountGoal = User["goal"]

export type AccountLevel = User["activityLevel"]

export type LanguageCode = "en" | "ar" | "fr" | "es" | "de"

export interface UserProfileData {
  _id?: string
  firstName?: string
  lastName?: string
  email?: string
  gender?: "male" | "female"
  age?: number
  weight?: number
  height?: number
  activityLevel?: AccountLevel
  goal?: AccountGoal
  photo?: string
  createdAt?: string
}

export interface ProfileApiResponse {
  status?: boolean
  message?: string
  user?: UserProfileData
  data?: UserProfileData
  error?: string
}

export interface ChangePasswordPayload {
  password: string
  newPassword: string
}

export interface EditProfilePayload {
  firstName?: string
  lastName?: string
  goal?: AccountGoal
  weight?: number
  activityLevel?: AccountLevel
  height?: number
  age?: number
  gender?: "male" | "female"
}

export interface AccountSettingsModalState {
  goal: boolean
  level: boolean
  weight: boolean
  password: boolean
  language: boolean
  security: boolean
  privacy: boolean
  help: boolean
  logout: boolean
}
