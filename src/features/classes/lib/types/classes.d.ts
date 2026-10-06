export type WorkoutCategoryName =
  | "Full Body"
  | "Chest"
  | "Arm"
  | "Shoulder"
  | "Back"
  | "Legs"
  | "Stomach"

export interface MuscleGroupItem {
  _id: string
  name: string
}

export interface MusclesGroupApiResponse {
  message: string
  musclesGroup: MuscleGroupItem[]
}

export interface ClassWorkoutCard {
  id: string
  title: string
  category: WorkoutCategoryName
  image: string
  apiImage?: string | null
  muscleGroupName: string
  subtitle?: string
}

export interface ClassesGridProps {
  workouts: ClassWorkoutCard[]
  isLoading?: boolean
  onExploreWorkout?: (workout: ClassWorkoutCard) => void
}

export interface ClassesCardProps {
  workout: ClassWorkoutCard
  onExplore?: (workout: ClassWorkoutCard) => void
}

export interface ClassesCategoryTabsProps {
  activeCategory: WorkoutCategoryName
  onSelectCategory: (category: WorkoutCategoryName) => void
}
