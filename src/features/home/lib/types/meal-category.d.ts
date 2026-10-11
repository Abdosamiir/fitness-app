/** A single category as returned by TheMealDB `categories.php`. */
export interface MealCategory {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}

/** Response envelope of TheMealDB `categories.php`. */
export interface MealCategoriesResponse {
  categories: MealCategory[]
}
