import { lazy, Suspense } from "react"
import { Outlet, useLocation } from "react-router"
import Footer from "@/shared/components/footer/footer"
import Header from "./header"
import Marquee from "@/features/home/components/marquee"
import { ROUTES } from "@/pages/routes"

const ChatbotModule = lazy(() =>
  import("@/features/chatbot/components/chatbot-module").then((module) => ({
    default: module.ChatbotModule,
  }))
)

/**
 * Layout route for the signed-in app: the routed page, the footer, and the
 * floating Smart Coach chatbot. Only ever rendered inside `<ProtectedRoute>`,
 * so a session is always present here.
 */
export function AppLayout() {
  const location = useLocation()
  const isProfilePage =
    location.pathname === ROUTES.profile ||
    location.pathname === ROUTES.accountSettings

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className={`flex-1 ${isProfilePage ? "px-0" : "px-4"}`}>
        {/* Full width: each section owns its background and inner container */}
        <Outlet />
      </main>
      {!isProfilePage && <Marquee />}
      {!isProfilePage && <Footer />}
      <Suspense fallback={null}>
        <ChatbotModule />
      </Suspense>
    </div>
  )
}
