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

export interface MuscleItem {
  _id: string
  name: string
  image: string | null
}

export interface ExerciseItem {
  _id: string
  exercise: string
  short_youtube_demonstration?: string | null
  in_depth_youtube_explanation?: string | null
  difficulty_level?: string
  target_muscle_group?: string
  prime_mover_muscle?: string
  primary_equipment?: string
  short_youtube_demonstration_link?: string | null
  in_depth_youtube_explanation_link?: string | null
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
