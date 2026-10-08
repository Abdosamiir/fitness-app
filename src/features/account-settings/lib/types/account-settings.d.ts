export type AccountGoal =
  | "Gain weight"
  | "Lose weight"
  | "Get fitter"
  | "Gain more flexible"
  | "Learn the basic"

export type AccountLevel = "Beginner" | "Intermediate" | "Advanced"

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
  activityLevel?: string
  goal?: AccountGoal | string
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
  goal?: string
  weight?: number
  activityLevel?: string
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
