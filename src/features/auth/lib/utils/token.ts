import Cookies from "js-cookie"

const accessTokenKey = "access_token"

export const setAccessToken = (token: string) => {
  try {
    if (!token) return
    Cookies.set(accessTokenKey, token, {
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: 7, 
    })
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("auth-change"))
    }
  } catch (error) {
    console.error("Error setting access token:", error)
    return error
  }
}

export const getAccessToken = () => {
  try {
    const token = Cookies.get(accessTokenKey)
    if (!token) return null

    return token
  } catch (error) {
    console.error("Error getting access token:", error)
    return error
  }
}

export const removeAccessToken = () => {
  try {
    const token = Cookies.get(accessTokenKey)
    if (!token) return
    Cookies.remove(accessTokenKey)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("auth-change"))
    }
  } catch (error) {
    console.error("Error removing access token:", error)
    return error
  }
}
