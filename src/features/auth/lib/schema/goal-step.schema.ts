import { z } from "zod"

export const goalStepSchema = z.object({
  goal: z.enum([
    "Gain weight",
    "Lose weight",
    "Get fitter",
    "Gain more flexible",
    "Learn the basic",
  ]),
})

export type GoalStepValues = z.infer<typeof goalStepSchema>
