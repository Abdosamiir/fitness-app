import { Outlet } from "react-router"

/**
 * Layout route for the auth URL group (`/login`, and later `/signup`,
 * `/forgot-password`). Split screen: a brand panel on the left (lg+ only) and
 * the routed form on the right.
 */
export function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <span className="text-lg font-semibold">Fitness</span>
        <div className="space-y-2">
          <p className="text-xl font-medium text-balance">
            Plan your training, track every session, and watch the progress add
            up.
          </p>
          <p className="text-sm text-primary-foreground/70">
            Sign in to pick up where you left off.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
