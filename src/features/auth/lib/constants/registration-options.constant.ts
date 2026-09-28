import type {
  ActivityLevel,
  Gender,
  RegistrationGoal,
} from "../types/registration"

export const GENDER_OPTIONS: {
  label: string
  value: Gender
}[] = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
]

export const GOAL_OPTIONS: {
  label: string
  value: RegistrationGoal
}[] = [
  {
    label: "Gain Weight",
    value: "Gain weight",
  },
  {
    label: "Lose Weight",
    value: "Lose weight",
  },
  {
    label: "Get Fitter",
    value: "Get fitter",
  },
  {
    label: "Gain More Flexible",
    value: "Gain more flexible",
  },
  {
    label: "Learn The Basic",
    value: "Learn the basic",
  },
]

export const ACTIVITY_LEVEL_OPTIONS: {
  label: string
  value: ActivityLevel
}[] = [
  {
    label: "Rookie",
    value: "level1",
  },
  {
    label: "Beginner",
    value: "level2",
  },
  {
    label: "Intermediate",
    value: "level3",
  },
  {
    label: "Advance",
    value: "level4",
  },
  {
    label: "True Beast",
    value: "level5",
  },
]
