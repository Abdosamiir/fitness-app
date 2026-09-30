import Footer from "@/shared/components/footer/footer"
import { NavLink, Outlet } from "react-router"
import { NAV_ITEMS } from "@/pages/routes"
import { cn } from "@/shared/lib/utils/utils"

/**
 * Layout route for the signed-in app: a header (brand + account), a primary
 * nav row, and the routed page below. Only ever rendered inside
 * `<ProtectedRoute>`, so a session is always present here.
 */
export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4">
          <span className="font-semibold">Fitness</span>
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

      <main className="flex-1 px-4">
      {/* Full width: each section owns its background and inner container */}

        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
