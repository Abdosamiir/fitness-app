export const REGISTER_STEPS = {
  account: "ACCOUNT",
  gender: "GENDER",
  height: "HEIGHT",
  weight: "WEIGHT",
  goal: "GOAL",
  age: "AGE",
  activityLevel: "ACTIVITY_LEVEL",
} as const

export const REGISTER_STEP_ORDER = [
  REGISTER_STEPS.account,
  REGISTER_STEPS.gender,
  REGISTER_STEPS.height,
  REGISTER_STEPS.weight,
  REGISTER_STEPS.goal,
  REGISTER_STEPS.age,
  REGISTER_STEPS.activityLevel,
] as const

export type RegisterStep = (typeof REGISTER_STEPS)[keyof typeof REGISTER_STEPS]
