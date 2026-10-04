import { Outlet } from "react-router"

import { ChatbotModule } from "@/features/chatbot/components/chatbot-module"
import Footer from "@/shared/components/footer/footer"

/**
 * Layout route for the signed-in app: the routed page, the footer, and the
 * floating Smart Coach chatbot. Only ever rendered inside `<ProtectedRoute>`,
 * so a session is always present here.
 */
export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      {/* Full width: each section owns its background and inner container */}
      <main className="w-full flex-1">
        <Outlet />
      </main>

      <Footer />

      <ChatbotModule />
    </div>
  )
}
