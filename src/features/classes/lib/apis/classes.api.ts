import type {
  ExerciseItem,
  MuscleGroupItem,
  MuscleItem,
} from "@/features/classes/lib/types/classes"

const BASE_URL = "https://fitness.elevateegy.com/api/v1"

export interface MusclesGroupApiResponse {
  message: string
  musclesGroup: MuscleGroupItem[]
}

export interface MusclesByGroupApiResponse {
  message: string
  muscleGroup: MuscleGroupItem
  muscles: MuscleItem[]
}

export interface ExercisesApiResponse {
  message: string
  totalExercises: number
  exercises: ExerciseItem[]
}

export interface MuscleGroupWithImage extends MuscleGroupItem {
  image?: string | null
  muscles?: MuscleItem[]
}

export async function fetchMuscleGroupsApi(): Promise<MuscleGroupItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/musclesGroup`, {
      headers: {
        "Accept-Language": "en",
        "Content-Type": "application/json",
      },
    })
    if (!res.ok) {
      throw new Error(`Failed to fetch muscle groups: ${res.statusText}`)
    }
    const data: MusclesGroupApiResponse = await res.json()
    return data.musclesGroup || []
  } catch (error) {
    console.error("fetchMuscleGroupsApi error:", error)
    return []
  }
}

export async function fetchMuscleGroupsWithImagesApi(): Promise<
  MuscleGroupWithImage[]
> {
  const groups: MuscleGroupItem[] = await fetchMuscleGroupsApi()
  if (!groups || groups.length === 0) return []

  const enriched = await Promise.all(
    groups.map(async (group: MuscleGroupItem) => {
      try {
        const muscles = await fetchMusclesByGroupIdApi(group._id)
        const firstWithImage = muscles.find((m) => m.image)
        return {
          ...group,
          muscles,
          image: firstWithImage?.image || null,
        }
      } catch {
        return {
          ...group,
          muscles: [],
          image: null,
        }
      }
    })
  )

  return enriched
}

export async function fetchMusclesByGroupIdApi(
  groupId: string
): Promise<MuscleItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/musclesGroup/${groupId}`, {
      headers: {
        "Accept-Language": "en",
        "Content-Type": "application/json",
      },
    })
    if (!res.ok) {
      throw new Error(`Failed to fetch muscles for group: ${res.statusText}`)
    }
    const data: MusclesByGroupApiResponse = await res.json()
    return data.muscles || []
  } catch (error) {
    console.error("fetchMusclesByGroupIdApi error:", error)
    return []
  }
}

export async function fetchExercisesApi(
  limit: number = 30
): Promise<ExerciseItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/exercises?limit=${limit}`, {
      headers: {
        "Accept-Language": "en",
        "Content-Type": "application/json",
      },
    })
    if (!res.ok) {
      throw new Error(`Failed to fetch exercises: ${res.statusText}`)
    }
    const data: ExercisesApiResponse = await res.json()
    return data.exercises || []
  } catch (error) {
    console.error("fetchExercisesApi error:", error)
    return []
  }
}
