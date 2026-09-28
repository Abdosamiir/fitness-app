import { z } from "zod"

export const activityLevelStepSchema = z.object({
  activityLevel: z.enum(["level1", "level2", "level3", "level4", "level5"]),
})

export type ActivityLevelStepValues = z.infer<typeof activityLevelStepSchema>
