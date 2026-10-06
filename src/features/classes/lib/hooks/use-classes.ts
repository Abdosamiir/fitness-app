import { useQuery } from "@tanstack/react-query"
import {
  fetchExercisesApi,
  fetchMuscleGroupsApi,
  fetchMuscleGroupsWithImagesApi,
  fetchMusclesByGroupIdApi,
} from "@/features/classes/lib/apis/classes.api"

export function useMuscleGroups() {
  return useQuery({
    queryKey: ["classes", "muscle-groups"],
    queryFn: fetchMuscleGroupsApi,
    staleTime: 1000 * 60 * 10,
  })
}

export function useMuscleGroupsWithImages() {
  return useQuery({
    queryKey: ["classes", "muscle-groups-with-images"],
    queryFn: fetchMuscleGroupsWithImagesApi,
    staleTime: 1000 * 60 * 10,
  })
}

export function useMusclesByGroupId(groupId: string | undefined) {
  return useQuery({
    queryKey: ["classes", "muscles-by-group", groupId],
    queryFn: () => (groupId ? fetchMusclesByGroupIdApi(groupId) : []),
    enabled: !!groupId,
    staleTime: 1000 * 60 * 10,
  })
}

export function useExercises(limit: number = 50) {
  return useQuery({
    queryKey: ["classes", "exercises", limit],
    queryFn: () => fetchExercisesApi(limit),
    staleTime: 1000 * 60 * 5,
  })
}
