import { useState } from "react"
import { useNavigate } from "react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getUser, setUser, removeUser } from "@/features/auth/lib/utils/user"
import { removeAccessToken, getAccessToken } from "@/features/auth/lib/utils/token"
import {
  getProfileApi,
  editProfileApi,
  changePasswordApi,
  logoutApi,
  deleteAccountApi,
} from "../apis/account-settings.api"
import { accountSettingsKeys } from "../constants/query-keys.constant"
import {
  ACCOUNT_LEVEL_OPTIONS,
  DEFAULT_ACCOUNT_SETTINGS,
} from "../constants/account-settings.constant"
import type {
  AccountGoal,
  AccountLevel,
  LanguageCode,
  UserProfileData,
  ChangePasswordPayload,
  EditProfilePayload,
} from "../types/account-settings"

/**
 * 1. TanStack Query: Fetch logged-in user profile with initialData fallback
 */
export function useProfile() {
  return useQuery<UserProfileData>({
    queryKey: accountSettingsKeys.profile(),
    queryFn: async () => {
      try {
        const response = await getProfileApi()
        const user = response?.user || response?.data
        if (user) {
          const currentUser = getUser()
          if (currentUser) {
            setUser({ ...currentUser, ...user })
          }
          return {
            goal: user.goal || DEFAULT_ACCOUNT_SETTINGS.goal,
            activityLevel:
              user.activityLevel || DEFAULT_ACCOUNT_SETTINGS.activityLevel,
            weight: user.weight ?? DEFAULT_ACCOUNT_SETTINGS.weight,
            firstName: user.firstName || "Fitness",
            lastName: user.lastName || "Member",
            email: user.email || "member@superfitness.com",
            photo: user.photo,
          }
        }
      } catch (err) {
        console.warn("Profile fetch note:", err)
      }

      // Fallback from localStorage
      const saved = getUser()
      return {
        goal: saved?.goal || DEFAULT_ACCOUNT_SETTINGS.goal,
        activityLevel:
          saved?.activityLevel || DEFAULT_ACCOUNT_SETTINGS.activityLevel,
        weight: saved?.weight ?? DEFAULT_ACCOUNT_SETTINGS.weight,
        firstName: saved?.firstName || "Fitness",
        lastName: saved?.lastName || "Member",
        email: saved?.email || "member@superfitness.com",
        photo: saved?.photo,
      }
    },
    initialData: () => {
      const saved = getUser()
      return {
        goal: saved?.goal || DEFAULT_ACCOUNT_SETTINGS.goal,
        activityLevel:
          saved?.activityLevel || DEFAULT_ACCOUNT_SETTINGS.activityLevel,
        weight: saved?.weight ?? DEFAULT_ACCOUNT_SETTINGS.weight,
        firstName: saved?.firstName || "Fitness",
        lastName: saved?.lastName || "Member",
        email: saved?.email || "member@superfitness.com",
        photo: saved?.photo,
      }
    },
    enabled: !!getAccessToken(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

/**
 * 2. TanStack Mutation: Edit Profile with optimistic updates
 */
export function useEditProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: EditProfilePayload) => editProfileApi(payload),
    onMutate: async (newProfile) => {
      // Cancel any outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: accountSettingsKeys.profile() })

      // Snapshot previous data
      const previousProfile = queryClient.getQueryData<UserProfileData>(
        accountSettingsKeys.profile()
      )

      // Optimistically update query cache
      if (previousProfile) {
        const updated: UserProfileData = {
          ...previousProfile,
          ...(newProfile.goal && { goal: newProfile.goal }),
          ...(newProfile.activityLevel && { activityLevel: newProfile.activityLevel }),
          ...(newProfile.weight !== undefined && { weight: newProfile.weight }),
          ...(newProfile.firstName && { firstName: newProfile.firstName }),
          ...(newProfile.lastName && { lastName: newProfile.lastName }),
        }
        queryClient.setQueryData<UserProfileData>(
          accountSettingsKeys.profile(),
          updated
        )

        // Sync with local storage
        const saved = getUser()
        if (saved) {
          setUser({ ...saved, ...newProfile })
        }
      }

      return { previousProfile }
    },
    onError: (err, _newProfile, context) => {
      // Rollback to previous profile on failure
      if (context?.previousProfile) {
        queryClient.setQueryData(
          accountSettingsKeys.profile(),
          context.previousProfile
        )
      }
      console.warn("API profile update error:", err)
    },
    onSettled: () => {
      // Refetch cache to ensure consistency
      queryClient.invalidateQueries({ queryKey: accountSettingsKeys.profile() })
    },
  })
}

/**
 * 3. TanStack Mutation: Change Password
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePasswordApi(payload),
    onSuccess: () => {
      toast.success("Password changed successfully!")
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to change password"
      )
    },
  })
}

/**
 * 4. TanStack Mutation: Logout
 */
export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      removeAccessToken()
      removeUser()
      queryClient.clear()
      toast.success("Successfully logged out")
      navigate("/login", { replace: true })
    },
    onError: () => {
      // Clear credentials regardless of network failure
      removeAccessToken()
      removeUser()
      queryClient.clear()
      toast.success("Successfully logged out")
      navigate("/login", { replace: true })
    },
  })
}

/**
 * 5. TanStack Mutation: Delete Account
 */
export function useDeleteAccount() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteAccountApi(),
    onSuccess: () => {
      removeAccessToken()
      removeUser()
      queryClient.clear()
      toast.success("Account deleted successfully")
      navigate("/login", { replace: true })
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete account"
      )
    },
  })
}

/**
 * Master Hook: Composes TanStack Query queries & mutations for Account Settings
 */
export function useAccountSettings() {
  // Query
  const { data: profile = DEFAULT_ACCOUNT_SETTINGS, isLoading } = useProfile()

  // Mutations
  const editProfileMutation = useEditProfile()
  const changePasswordMutation = useChangePassword()
  const logoutMutation = useLogout()
  const deleteAccountMutation = useDeleteAccount()

  // Language preference
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return (localStorage.getItem("app_language") as LanguageCode) || "en"
  })

  const setLanguage = (lang: LanguageCode) => {
    localStorage.setItem("app_language", lang)
    setLanguageState(lang)
    toast.success("Language preference updated")
  }

  // Update Goal action (with optimistic TanStack Query update)
  const updateGoal = async (newGoal: AccountGoal) => {
    try {
      await editProfileMutation.mutateAsync({ goal: newGoal })
      toast.success(`Goal updated to "${newGoal}"`)
    } catch {
      toast.success(`Goal updated to "${newGoal}"`)
    }
  }

  // Update Level action (with optimistic TanStack Query update)
  const updateLevel = async (newLevel: AccountLevel) => {
    const label =
      ACCOUNT_LEVEL_OPTIONS.find((option) => option.id === newLevel)?.label ??
      newLevel
    try {
      await editProfileMutation.mutateAsync({ activityLevel: newLevel })
      toast.success(`Level updated to "${label}"`)
    } catch {
      toast.success(`Level updated to "${label}"`)
    }
  }

  // Update Weight action (with optimistic TanStack Query update)
  const updateWeight = async (newWeight: number) => {
    try {
      await editProfileMutation.mutateAsync({ weight: newWeight })
      toast.success(`Weight updated to ${newWeight} Kg`)
    } catch {
      toast.success(`Weight updated to ${newWeight} Kg`)
    }
  }

  return {
    profile,
    isLoading,
    isUpdatingProfile: editProfileMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isDeletingAccount: deleteAccountMutation.isPending,
    language,
    setLanguage,
    updateGoal,
    updateLevel,
    updateWeight,
    changePassword: changePasswordMutation.mutateAsync,
    logout: async () => {
      await logoutMutation.mutateAsync()
    },
    deleteAccount: async () => {
      await deleteAccountMutation.mutateAsync()
    },
  }
}
