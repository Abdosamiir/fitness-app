import { Outlet } from "react-router"
import fit1 from "@/assets/imgs/fit1.png"
import hero from "@/assets/imgs/hero.png"

/**
 * Layout route for the auth URL group (`/login`, and later `/signup`,
 * `/forgot-password`). Split screen: a brand panel on the left (lg+ only) and
 * the routed form on the right.
 */
export function AuthLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <div className="relative flex-1 bg-[url('/auth-layout.jpeg')] bg-cover bg-center bg-no-repeat">
        {/* layer */}
        <div className="grid min-h-svh bg-black/80 lg:grid-cols-2">
          {/* Desktop brand artwork */}
          <div className="relative hidden items-center justify-center text-primary-foreground lg:flex">
            <img
              src={fit1}
              alt="Super Fitness"
              className="absolute top-[7%] left-1/2 h-auto w-56 -translate-x-1/2 object-contain"
            />
            <div className="flex h-full items-end justify-center">
              <img
                src={hero}
                alt="Super Fitness athlete"
                className="h-[72%] max-h-150 w-auto object-contain"
              />
            </div>
          </div>

          <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-sm">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
