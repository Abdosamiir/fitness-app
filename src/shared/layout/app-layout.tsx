import Footer from "@/shared/components/footer/footer"
import { Outlet } from "react-router"
import Header from "./header"
import Marquee from "@/features/home/components/marquee"


/**
 * Layout route for the signed-in app: a header (brand + account), a primary
 * nav row, and the routed page below. Only ever rendered inside
 * `<ProtectedRoute>`, so a session is always present here.
 */
export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1 px-4">
        {/* Full width: each section owns its background and inner container */}

        <Outlet />
      </main>
      <Marquee />
      <Footer />
    </div>
  )
}
