import groupWorkoutImage from "@/features/home/assets/group-workout.png"
import muscleBuildingImage from "@/features/home/assets/muscle-building.png"
import personalTrainingImage from "@/features/home/assets/personal-training.png"

import type {
  Workout,
  WorkoutCategory,
} from "@/features/home/lib/types/workout"

export const WORKOUT_CATEGORIES: WorkoutCategory[] = [
  "Full Body",
  "Chest",
  "Arm",
  "Shoulder",
  "Back",
  "Legs",
  "Stomach",
]

export const FEATURED_WORKOUTS: Workout[] = [
  {
    id: "group-workout",
    image: groupWorkoutImage,
    title: "Group Workout",
  },
  {
    id: "personal-training",
    image: personalTrainingImage,
    imagePosition: "center top",
    title: "Personal Training",
  },
  {
    id: "muscle-building",
    image: muscleBuildingImage,
    imagePosition: "center top",
    title: "Muscle Building",
  },
]
