import { useQuery } from "@tanstack/react-query"

import {
  getCategories,
  getMealById,
  getMealsByCategory,
} from "@/features/healthy/lib/apis/healthy.api"

import { healthyKeys } from "@/features/healthy/lib/constants/query-keys.constant"

import {
  mapMealDetails,
  mapMealToCard,
} from "@/features/healthy/lib/utils/healthy.util"

export function useHealthyCategories() {
  return useQuery({
    queryKey: healthyKeys.categories(),
    queryFn: async () => {
      const response = await getCategories()

      return response.categories || []
    },

    staleTime: 1000 * 60 * 30,
  })
}

export function useHealthyMeals(category: string) {
  return useQuery({
    queryKey: healthyKeys.meals(category),
    queryFn: async () => {
      const response = await getMealsByCategory(category)

      return (response.meals || []).map(mapMealToCard)
    },

    enabled: Boolean(category),

    staleTime: 1000 * 60 * 10,
  })
}

export function useHealthyMeal(id: string | null) {
  return useQuery({
    queryKey: id ? healthyKeys.meal(id) : [...healthyKeys.all, "meal", "empty"],

    queryFn: async () => {
      if (!id) return null

      const response = await getMealById(id)

      const meal = response.meals?.[0]

      if (!meal) {
        throw new Error("Meal not found")
      }

      return mapMealDetails(meal)
    },

    enabled: Boolean(id),

    staleTime: 1000 * 60 * 30,
  })
}
