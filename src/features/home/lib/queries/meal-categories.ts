import { useQuery } from "@tanstack/react-query"

import { mealCategoriesApi } from "@/features/home/lib/api/meal-categories"
import { homeKeys } from "@/features/home/lib/constants/query-keys"

export const useMealCategories = () =>
  useQuery({
    queryKey: homeKeys.mealCategories(),
    queryFn: mealCategoriesApi.getAll,
    select: (data) => data.categories,
  })
