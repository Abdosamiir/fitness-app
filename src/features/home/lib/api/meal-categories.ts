import type { MealCategoriesResponse } from "@/features/home/lib/types"

const MEAL_DB_BASE_URL = "https://www.themealdb.com/api/json/v1/1"

export const mealCategoriesApi = {
  getAll: async (): Promise<MealCategoriesResponse> => {
    const res = await fetch(`${MEAL_DB_BASE_URL}/categories.php`)

    if (!res.ok) {
      throw new Error("Failed to load meal categories")
    }

    return res.json()
  },
}
