import type { NavigateFunction } from "react-router"
import { removeAccessToken } from "./token"
import { removeUser } from "./user"

export const logout = () => {
  removeAccessToken()
  removeUser()
}

export const handleLogout = (navigate: NavigateFunction) => {
  logout()
  navigate("/login", { replace: true })
}
