import { useQuery } from "@tanstack/react-query"
import { fetchMuscleGroupsApi } from "@/features/classes/lib/apis/classes.api"
import { classesKeys } from "@/features/classes/lib/constants/query-keys.constant"

export function useMuscleGroups() {
  return useQuery({
    queryKey: classesKeys.muscleGroups(),
    queryFn: fetchMuscleGroupsApi,
    staleTime: 1000 * 60 * 10,
  })
}
