export const classesKeys = {
  all: ["classes"] as const,
  muscleGroups: () => [...classesKeys.all, "muscle-groups"] as const,
} as const
