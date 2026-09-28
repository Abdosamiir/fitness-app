export const homeKeys = {
  all: ["home"] as const,
  mealCategories: () => [...homeKeys.all, "meal-categories"] as const,
}
