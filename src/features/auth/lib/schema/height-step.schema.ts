import { z } from "zod"

export const heightStepSchema = z.object({
  height: z
    .number()
    .int("Height must be a whole number")
    .min(100, "Height must be at least 100 cm")
    .max(250, "Height cannot exceed 250 cm"),
})

export type HeightStepValues = z.infer<typeof heightStepSchema>
