
 export interface LoginType {
  message: string
  user: UserType
  token: string
}

export interface UserType {
  _id: string
  firstName: string
  lastName: string
  email: string
  gender: string
  age: number
  weight: number
  height: number
  activityLevel: string
  goal: string
  photo: string
  createdAt: string
}