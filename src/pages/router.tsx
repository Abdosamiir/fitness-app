import { createBrowserRouter } from "react-router"
import { AuthLayout } from "@/features/auth/layouts/layout"
import { RegistrationFlowLayout } from "@/features/auth/layouts/registration-flow-layout"
import { AppLayout } from "@/pages/app-layout"
import { ProtectedRoute } from "@/pages/protected-route"
import { ROUTES } from "@/pages/routes"

const routeLoadingElement = (
  <div className="flex min-h-svh items-center justify-center" role="status">
    Loading...
  </div>
)

export const router = createBrowserRouter([
  {
    // Public auth pages — split-screen shell, no header/nav.
    element: <AuthLayout />,
    hydrateFallbackElement: routeLoadingElement,
    children: [
      {
        path: ROUTES.login,
        lazy: {
          Component: async () => (await import("@/pages/auth/login/page")).LoginPage,
        },
      },
      {
        path: ROUTES.forgetPassword,
        lazy: {
          Component: async () =>
            (await import("@/features/auth/components/forget-password/forget-password-mainscreen"))
              .ForgotPasswordScreen,
        },
      },
    ],
  },
  {
    // Keep the registration draft alive across the account and onboarding routes.
    element: <RegistrationFlowLayout />,
    hydrateFallbackElement: routeLoadingElement,
    children: [
      {
        // Account form uses the same split-screen shell as login.
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.register,
            lazy: {
              Component: async () =>
                (await import("@/pages/auth/register/page")).RegisterPage,
            },
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.onboardingGender,
            lazy: {
              Component: async () =>
                (await import("@/pages/auth/onboarding/gender/page")).GenderStepPage,
            },
          },
          {
            path: ROUTES.onboardingAge,
            lazy: {
              Component: async () =>
                (await import("@/pages/auth/onboarding/age/page")).AgeStepPage,
            },
          },
          {
            path: ROUTES.onboardingWeight,
            lazy: {
              Component: async () =>
                (await import("@/pages/auth/onboarding/weight/page")).WeightStepPage,
            },
          },
        ],
      },
    ],
  },
  {
    // Signed-in app — guard first, then the header + nav shell.
    element: <ProtectedRoute />,
    hydrateFallbackElement: routeLoadingElement,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            lazy: {
              Component: async () => (await import("@/pages/home/page")).HomePage,
            },
          },
          {
            path: ROUTES.about,
            lazy: {
              Component: async () => (await import("@/pages/about/page")).AboutPage,
            },
          },
          {
            path: ROUTES.classes,
            lazy: {
              Component: async () => (await import("@/pages/classes/page")).ClassesPage,
            },
          },
          {
            path: ROUTES.profile,
            lazy: {
              Component: async () =>
                (await import("@/pages/account-settings/page")).AccountSettingsPage,
            },
          },
          {
            path: ROUTES.accountSettings,
            lazy: {
              Component: async () =>
                (await import("@/pages/account-settings/page")).AccountSettingsPage,
            },
          },
        ],
      },
    ],
  },
])
