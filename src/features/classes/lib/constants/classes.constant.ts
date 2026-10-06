import type {
  ClassWorkoutCard,
  WorkoutCategoryName,
} from "@/features/classes/lib/types/classes"

export const CLASS_CATEGORIES: WorkoutCategoryName[] = [
  "Full Body",
  "Chest",
  "Arm",
  "Shoulder",
  "Back",
  "Legs",
  "Stomach",
]

export const FULL_BODY_WORKOUTS: ClassWorkoutCard[] = [
  {
    id: "chest",
    title: "CHEST",
    category: "Chest",
    image: "/images/classes/chest.jpg",
    muscleGroupName: "Chest",
    subtitle: "Pectoral & pressing power",
  },
  {
    id: "arm",
    title: "ARM",
    category: "Arm",
    image: "/images/classes/arm.jpg",
    muscleGroupName: "Biceps",
    subtitle: "Biceps, triceps & forearms",
  },
  {
    id: "shoulder",
    title: "SHOULDER",
    category: "Shoulder",
    image: "/images/classes/shoulder.jpg",
    muscleGroupName: "Shoulders",
    subtitle: "Deltoid strength & stability",
  },
  {
    id: "back",
    title: "BACK",
    category: "Back",
    image: "/images/classes/back.jpg",
    muscleGroupName: "Back",
    subtitle: "Lats, rhomboids & spine",
  },
  {
    id: "legs",
    title: "LEGS",
    category: "Legs",
    image: "/images/classes/legs.jpg",
    muscleGroupName: "Quadriceps",
    subtitle: "Quads, hamstrings & calves",
  },
  {
    id: "stomach",
    title: "STOMACH",
    category: "Stomach",
    image: "/images/classes/stomach.jpg",
    muscleGroupName: "Abdominals",
    subtitle: "Core, rectus & obliques",
  },
]
