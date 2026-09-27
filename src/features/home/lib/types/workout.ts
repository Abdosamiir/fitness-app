export type WorkoutCategory =
  | "Full Body"
  | "Chest"
  | "Arm"
  | "Shoulder"
  | "Back"
  | "Legs"
  | "Stomach"

export type Workout = {
  id: string
  image: string
  imagePosition?: string
  title: string
}
