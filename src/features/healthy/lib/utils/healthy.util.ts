import type {
  HealthyIngredient,
  HealthyMeal,
  HealthyMealDetails,
  MealDbMeal,
  MealDbMealSummary,
} from "@/features/healthy/lib/types/healthy"

export function mapMealToCard(
  meal: MealDbMealSummary
): HealthyMeal {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: "",
    area: "",
  }
}

export function mapMealDetails(
  meal: MealDbMeal
): HealthyMealDetails {
  const ingredients: HealthyIngredient[] = []

  for (let index = 1; index <= 20; index++) {
    const ingredient =
      meal[`strIngredient${index}` as keyof MealDbMeal]

    const measure =
      meal[`strMeasure${index}` as keyof MealDbMeal]

    if (
      typeof ingredient === "string" &&
      ingredient.trim()
    ) {
      ingredients.push({
        name: ingredient.trim(),
        measure:
          typeof measure === "string"
            ? measure.trim()
            : "",
      })
    }
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    tags: meal.strTags
      ? meal.strTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [],
    youtubeUrl: meal.strYoutube || null,
    ingredients,
  }
}