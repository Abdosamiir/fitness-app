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
          <div className="relative hidden min-w-0 overflow-hidden text-primary-foreground lg:block">
            <img
              src={fit1}
              alt="Super Fitness"
              className="absolute top-8 left-1/2 h-auto w-44 -translate-x-1/2 object-contain xl:top-12 xl:w-56"
            />
            <div className="absolute inset-x-6 top-32 bottom-0 flex items-end justify-center xl:top-40">
              <img
                src={hero}
                alt="Super Fitness athlete"
                className="h-full max-h-150 w-auto max-w-full object-contain object-bottom"
              />
            </div>
          </div>

          <div className="flex min-w-0 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="w-full max-w-[486px] min-w-0">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
