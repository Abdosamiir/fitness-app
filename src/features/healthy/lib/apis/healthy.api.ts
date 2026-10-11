import type {
  MealDbCategoriesResponse,
  MealDbDetailsResponse,
  MealDbMealsResponse,
} from "@/features/healthy/lib/types/healthy"

const BASE_URL = "https://www.themealdb.com/api/json/v1/1"

async function fetchMealDb<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
  })

  if (!response.ok) {
    throw new Error(`TheMealDB request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function getCategories(): Promise<MealDbCategoriesResponse> {
  return fetchMealDb<MealDbCategoriesResponse>("/categories.php")
}

export async function getMealsByCategory(
  category: string
): Promise<MealDbMealsResponse> {
  const params = new URLSearchParams({
    c: category,
  })

  return fetchMealDb<MealDbMealsResponse>(`/filter.php?${params.toString()}`)
}

export async function getMealById(id: string): Promise<MealDbDetailsResponse> {
  const params = new URLSearchParams({
    i: id,
  })

  return fetchMealDb<MealDbDetailsResponse>(`/lookup.php?${params.toString()}`)
}
