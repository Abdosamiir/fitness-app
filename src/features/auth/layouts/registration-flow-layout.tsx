import { Outlet } from "react-router"

import { RegistrationProvider } from "@/features/auth/components/registration-provider"

/** Keeps the multi-step registration draft alive while its child routes change. */
export function RegistrationFlowLayout() {
  return (
    <RegistrationProvider>
      <Outlet />
    </RegistrationProvider>
  )
}
