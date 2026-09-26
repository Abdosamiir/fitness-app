export type RegistrationDraft = {
  firstName: string
  lastName: string
  email: string
  password: string
  rePassword: string
  gender?: "male" | "female"
  age?: number
  weight?: number
}

export type RegistrationAccountDetails = Pick<
  RegistrationDraft,
  "firstName" | "lastName" | "email" | "password" | "rePassword"
>
