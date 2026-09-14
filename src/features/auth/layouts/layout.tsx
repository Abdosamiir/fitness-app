import { Outlet } from "react-router"

/**
 * Layout route for the auth URL group (`/login`, and later `/signup`,
 * `/forgot-password`). Split screen: a brand panel on the left (lg+ only) and
 * the routed form on the right.
 */
export function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-[url('/auth-layout.png')] bg-cover bg-center bg-no-repeat">
      <div className="hidden flex-col justify-between p-10 text-primary-foreground lg:flex border-r-2 border-r-brand-500/20">

      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
