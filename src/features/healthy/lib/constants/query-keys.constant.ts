export const healthyKeys = {
  all: ["healthy"] as const,

  categories: () => [...healthyKeys.all, "categories"] as const,

  meals: (category: string) => [...healthyKeys.all, "meals", category] as const,

  meal: (id: string) => [...healthyKeys.all, "meal", id] as const,
} as const
