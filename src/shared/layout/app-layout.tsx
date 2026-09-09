import { NavLink, Outlet, useNavigate } from "react-router"

import { signOut, useSession } from "@/features/auth/lib/auth-client"
import { NAV_ITEMS, ROUTES } from "@/pages/routes"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils/utils"

/**
 * Layout route for the signed-in app: a header (brand + account), a primary
 * nav row, and the routed page below. Only ever rendered inside
 * `<ProtectedRoute>`, so a session is always present here.
 */
export function AppLayout() {
  // Navigation
  const navigate = useNavigate()
  // Query
  const { data: session } = useSession()
  // Functions
  const handleSignOut = () =>
    signOut({ fetchOptions: { onSuccess: () => navigate(ROUTES.login) } })

  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4">
          <span className="font-semibold">Fitness</span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {session?.user.name}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <nav className="border-b border-border">
        <div className="mx-auto flex w-full max-w-4xl gap-1 px-4 py-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4">
        <Outlet />
      </main>
    </div>
  )
}
