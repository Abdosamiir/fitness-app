// src/lib/utils/auth.ts

import { useNavigate } from "react-router"
import { removeAccessToken } from "./token"
import { removeUser } from "./user"

const navigate = useNavigate()

export const logout = () => {
  removeAccessToken()
  removeUser()
}

export const handleLogout = () => {
  logout()
  navigate("/login", { replace: true })
}