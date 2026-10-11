// src/lib/utils/user.ts

import type {
  ActivityLevel,
  Gender,
  RegistrationGoal,
} from "../types/registration"

export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  gender: Gender
  age: number
  weight: number
  height: number
  activityLevel: ActivityLevel
  goal: RegistrationGoal
  photo: string
  createdAt: string
}

const userKey = "current_user"

export const setUser = (user: User): void => {
  try {
    localStorage.setItem(userKey, JSON.stringify(user))
  } catch (error) {
    console.error("Error setting user:", error)
  }
}

export const getUser = (): User | null => {
  try {
    const user = localStorage.getItem(userKey)

    if (!user) {
      return null
    }

    return JSON.parse(user) as User
  } catch (error) {
    console.error("Error getting user:", error)

    localStorage.removeItem(userKey)

    return null
  }
}

export const removeUser = (): void => {
  try {
    localStorage.removeItem(userKey)
  } catch (error) {
    console.error("Error removing user:", error)
  }
}
