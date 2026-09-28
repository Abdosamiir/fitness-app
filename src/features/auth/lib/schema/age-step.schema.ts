import { z } from "zod"

export const ageStepSchema = z.object({
  age: z
    .number()
    .int("Age must be a whole number")
    .min(13, "You must be at least 13 years old")
    .max(100, "Age cannot exceed 100"),
})

export type AgeStepValues = z.infer<typeof ageStepSchema>
