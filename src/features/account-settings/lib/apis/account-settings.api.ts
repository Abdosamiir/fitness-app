import { getAccessToken } from "@/features/auth/lib/utils/token"
import type {
  ChangePasswordPayload,
  EditProfilePayload,
  ProfileApiResponse,
} from "../types/account-settings"

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://fitness.elevateegy.com"
const BASE_URL = `${API_BASE_URL.replace(/\/+$/, "")}/api/v1`

const getAuthHeaders = (): HeadersInit => {
  const token = getAccessToken()
  const headers: Record<string, string> = {
    "Accept-Language": "en",
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  return headers
}

/**
 * Fetch current user profile data
 */
export async function getProfileApi(): Promise<ProfileApiResponse> {
  const token = getAccessToken()
  if (!token) {
    return { status: false, error: "No authentication token found" }
  }

  const response = await fetch(`${BASE_URL}/auth/profile-data`, {
    method: "GET",
    headers: getAuthHeaders(),
  })

  const data = (await response.json()) as ProfileApiResponse
  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to fetch profile data")
  }

  return data
}

/**
 * Edit user profile (e.g. goal, weight, level, etc.)
 */
export async function editProfileApi(
  payload: EditProfilePayload
): Promise<ProfileApiResponse> {
  const token = getAccessToken()
  if (!token) {
    return { status: false, error: "No authentication token found" }
  }

  const response = await fetch(`${BASE_URL}/auth/editProfile`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as ProfileApiResponse
  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to update profile")
  }

  return data
}

/**
 * Change user password
 */
export async function changePasswordApi(
  payload: ChangePasswordPayload
): Promise<ProfileApiResponse> {
  const token = getAccessToken()
  if (!token) {
    throw new Error("You must be logged in to change your password")
  }

  const response = await fetch(`${BASE_URL}/auth/change-password`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as ProfileApiResponse
  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to change password")
  }

  return data
}

/**
 * Log out user from API
 */
export async function logoutApi(): Promise<{ status?: boolean; message?: string }> {
  const token = getAccessToken()
  if (!token) return { status: true }

  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "GET",
      headers: getAuthHeaders(),
    })
    return (await response.json()) as { status?: boolean; message?: string }
  } catch {
    return { status: true }
  }
}

/**
 * Delete current user account
 */
export async function deleteAccountApi(): Promise<ProfileApiResponse> {
  const token = getAccessToken()
  if (!token) {
    throw new Error("No authentication token found")
  }

  const response = await fetch(`${BASE_URL}/auth/deleteMe`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })

  const data = (await response.json()) as ProfileApiResponse
  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to delete account")
  }

  return data
}
