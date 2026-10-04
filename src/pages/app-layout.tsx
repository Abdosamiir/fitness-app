import { Outlet } from "react-router"
import Header from "./header"
import Marquee from "@/features/home/components/marquee"
import { SmartCoachWidget } from "../components/smart-coach-widget"


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
      <Header />
      <main className=" flex-1 px-4">
        {/* Full width: each section owns its background and inner container */}
      <SmartCoachWidget/>
        <Outlet />
      </main>
      <Marquee />
      <Footer />

      <ChatbotModule />
    </div>
  )
}
