import { NavLink, Outlet } from "react-router"
import { NAV_ITEMS } from "@/pages/routes"
import { cn } from "@/shared/lib/utils/utils"
import Header from "./header"
import Hero from "../../features/home/components/hero"
import Marquee from "../../features/home/components/marquee"

/**
 * Layout route for the signed-in app: a header (brand + account), a primary
 * nav row, and the routed page below. Only ever rendered inside
 * `<ProtectedRoute>`, so a session is always present here.
 */
export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />

      <Hero />

      <Marquee />

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
