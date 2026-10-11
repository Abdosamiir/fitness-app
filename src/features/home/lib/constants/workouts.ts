import groupWorkoutImage from "@/assets/imgs/group-workout.png"
import muscleBuildingImage from "@/assets/imgs/muscle-building.png"
import personalTrainingImage from "@/assets/imgs/personal-training.png"

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
