import Footer from "@/shared/components/footer/footer"
import { Outlet } from "react-router"

/**
 * Layout route for the signed-in app: a header (brand + account), a primary
 * nav row, and the routed page below. Only ever rendered inside
 * `<ProtectedRoute>`, so a session is always present here.
 */
export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      {/* Full width: each section owns its background and inner container */}
      <main className="w-full flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
