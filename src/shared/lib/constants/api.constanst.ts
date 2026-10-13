export const HEADERS = {
  jsonBody: {
    "Content-Type": "application/json",
  },
  authorization: (token: string) => ({
    Authorization: `Bearer ${token}`,
  }),
}

const API_ORIGIN = (
  import.meta.env.VITE_API_URL || "https://fitness.elevateegy.com"
)
  .replace(/\/+$/, "")
  .replace(/\/api\/v1$/, "")

export const API_BASE_URL = `${API_ORIGIN}/api/v1`
