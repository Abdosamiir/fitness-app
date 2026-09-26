import { Outlet } from "react-router"

import { RegisterProvider } from "@/features/auth/components/registration-provider"

/**
 * Keeps the registration draft alive while navigating
 * between the registration steps.
 */
export function RegistrationFlowLayout() {
  return (
    <RegisterProvider>
      <Outlet />
    </RegisterProvider>
  )
}
