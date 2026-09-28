import { z } from "zod"

export const genderStepSchema = z.object({
  gender: z.enum(["male", "female"]),
})

export type GenderStepValues = z.infer<typeof genderStepSchema>
