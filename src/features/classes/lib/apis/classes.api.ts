import type {
  MuscleGroupItem,
  MusclesGroupApiResponse,
} from "@/features/classes/lib/types/classes"

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://fitness.elevateegy.com"
const BASE_URL = `${API_BASE_URL.replace(/\/+$/, "")}/api/v1`
const API_KEY =
  import.meta.env.VITE_API_KEY || import.meta.env.VITE_KEY || ""

const getHeaders = (): HeadersInit => {
  const headers: Record<string, string> = {
    "Accept-Language": "en",
    "Content-Type": "application/json",
  }
  if (API_KEY) {
    headers["Authorization"] = `Bearer ${API_KEY}`
    headers["x-api-key"] = API_KEY
  }
  return headers
}

export type { MusclesGroupApiResponse }

/**
 * Fetch all muscle groups from /muscles
 */
export async function fetchMuscleGroupsApi(): Promise<MuscleGroupItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/muscles`, {
      headers: getHeaders(),
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
