import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/pages/auth/login/page";


import { AuthLayout } from "@/features/auth/layouts/layout";
import { AppLayout } from "@/shared/layout/app-layout";
import { HomePage } from "@/pages/home/page";
import { ProtectedRoute } from "@/pages/protected-route";
import { ROUTES } from "@/pages/routes";

import { ForgotPasswordScreen } from "@/features/auth/components/forget-password/forget-password-mainscreen";


export const router = createBrowserRouter([
  {
    // Public auth pages — split-screen shell, no header/nav.
    element: <AuthLayout />,
    children: [
      { path: ROUTES.login, element: <LoginPage /> },
    { path: ROUTES.forgetPassword, element: <ForgotPasswordScreen /> },
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
]);