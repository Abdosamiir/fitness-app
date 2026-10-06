import type {
  ClassWorkoutCard,
  MuscleGroupItem,
  WorkoutCategoryName,
} from "@/features/classes/lib/types/classes"

/**
 * Maps a live API muscle group entity into a visual ClassWorkoutCard
 */
export function mapMuscleGroupToCard(group: MuscleGroupItem): ClassWorkoutCard {
  const nameLower = group.name.toLowerCase().trim()

  let category: WorkoutCategoryName
  let image: string
  let subtitle: string

  if (nameLower.includes("chest")) {
    category = "Chest"
    image = "/images/classes/chest.jpg"
    subtitle = "Pectoral & pressing power"
  } else if (
    nameLower.includes("bicep") ||
    nameLower.includes("tricep") ||
    nameLower.includes("forearm") ||
    nameLower.includes("arm")
  ) {
    category = "Arm"
    image = "/images/classes/arm.jpg"
    subtitle = nameLower.includes("tricep")
      ? "Tricep extensions & pressing lockout"
      : nameLower.includes("forearm")
        ? "Grip endurance & wrist flexion"
        : "Biceps peaks & arm hypertrophy"
  } else if (nameLower.includes("shoulder")) {
    category = "Shoulder"
    image = "/images/classes/shoulder.jpg"
    subtitle = "Deltoid strength & rotational stability"
  } else if (nameLower.includes("back") || nameLower.includes("trapezius")) {
    category = "Back"
    image = "/images/classes/back.jpg"
    subtitle = nameLower.includes("trapezius")
      ? "Upper back & neck stability"
      : "Lats, rhomboids & spinal posture"
  } else if (
    nameLower.includes("abdomin") ||
    nameLower.includes("stomach") ||
    nameLower.includes("core")
  ) {
    category = "Stomach"
    image = "/images/classes/stomach.jpg"
    subtitle = "Core, rectus & oblique definition"
  } else {
    // Legs: quadriceps, hamstrings, glutes, calves, adductors, abductors, shins, hip flexors
    category = "Legs"
    image = "/images/classes/legs.jpg"
    subtitle = nameLower.includes("glute")
      ? "Gluteal power & hip thrusts"
      : nameLower.includes("hamstring")
        ? "Posterior chain & knee flexion"
        : nameLower.includes("calf") || nameLower.includes("calve")
          ? "Gastrocnemius & ankle mobility"
          : nameLower.includes("adductor")
            ? "Inner thigh strength & balance"
            : nameLower.includes("abductor")
              ? "Outer hip & pelvic stabilization"
              : nameLower.includes("shin")
                ? "Tibialis anterior & foot stability"
                : nameLower.includes("hip")
                  ? "Psoas strength & athletic agility"
                  : "Quads, power & squat mobility"
  }

  return {
    id: group._id,
    title: group.name.toUpperCase().trim(),
    category,
    image,
    muscleGroupName: group.name.trim(),
    subtitle,
  }
}
