import { Navigate, useLocation } from "react-router"

import { useSession } from "@/features/auth/lib/auth-client"
import { LoginModule } from "@/features/auth/components/login-module"
import { ROUTES } from "@/pages/routes"

type LocationState = { from?: { pathname?: string } }

export function LoginPage() {
  const { data: session, isPending } = useSession()
  const location = useLocation()

  if (isPending) {
    return null
  }

  if (session) {
    const state = location.state as LocationState | null
    return <Navigate to={state?.from?.pathname ?? ROUTES.home} replace />
  }

  return <LoginModule />
}
