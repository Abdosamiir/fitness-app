import { createBrowserRouter } from "react-router"

import { LoginPage } from "@/pages/auth/login/page"
import { RegisterPage } from "@/pages/auth/register/page"
import { GenderStepPage } from "@/pages/auth/onboarding/gender/page"
import { AgeStepPage } from "@/pages/auth/onboarding/age/page"
import { WeightStepPage } from "@/pages/auth/onboarding/weight/page"
import { AuthLayout } from "@/features/auth/layouts/layout"
import { RegistrationFlowLayout } from "@/features/auth/layouts/registration-flow-layout"
import { AppLayout } from "@/shared/layout/app-layout"
import { HomePage } from "@/pages/home/page"
import { ProtectedRoute } from "@/pages/protected-route"
import { ROUTES } from "@/pages/routes"

export const router = createBrowserRouter([
  {
    // Public auth pages — split-screen shell, no header/nav.
    element: <AuthLayout />,
    children: [{ path: ROUTES.login, element: <LoginPage /> }],
  },
  {
    // Keep the registration draft alive across the account and onboarding routes.
    element: <RegistrationFlowLayout />,
    children: [
      {
        // Account form uses the same split-screen shell as login.
        element: <AuthLayout />,
        children: [{ path: ROUTES.register, element: <RegisterPage /> }],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.onboardingGender, element: <GenderStepPage /> },
          { path: ROUTES.onboardingAge, element: <AgeStepPage /> },
          { path: ROUTES.onboardingWeight, element: <WeightStepPage /> },
        ],
      },
    ],
  },
  {
    // Signed-in app — guard first, then the header + nav shell.
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [{ index: true, element: <HomePage /> }],
      },
    ],
  },
])
