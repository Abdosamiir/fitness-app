import { Navigate, Outlet, useLocation } from "react-router"

import { useSession } from "@/features/auth/lib/auth-client"
import { ROUTES } from "@/pages/routes"

/**
 * Route-level auth gate: does this URL exist for the current user? Renders the
 * matched child route when signed in, otherwise sends them to `/login` and
 * remembers where they were headed.
 */
export function ProtectedRoute() {
  const { data: session, isPending } = useSession()
  const location = useLocation()

  if (isPending) {
    return (
      <p className="p-6 text-sm text-muted-foreground">
        Checking your session…
      </p>
    )
  }

  if (!session) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />
  }

  return <Outlet />
}
