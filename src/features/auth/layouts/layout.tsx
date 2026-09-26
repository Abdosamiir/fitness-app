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
    <div className="relative min-h-svh bg-[url('/auth-layout.jpeg')] bg-cover bg-center bg-no-repeat">
      {/* layer */}
      <div className="absolute inset-0 grid bg-black/80 lg:grid-cols-2">
        {/* logo */}
        <img
          src={fit1}
          alt="fit logo"
          className="absolute left-1/2 h-37.5 w-62.75 -translate-x-1/2 object-contain"
        />
        {/* border */}
        <div className="absolute top-[20%] left-1/2 hidden h-[70%] w-0.5 -translate-x-1/2 bg-linear-to-b from-transparent via-white/20 to-transparent lg:block" />
        {/* Hero */}
        <div className="hidden items-center justify-center bg-gray-600/25 text-primary-foreground lg:flex">
          <div className="flex flex-col items-center justify-center">
            <img
              src={hero}
              alt="hero logo"
              className="h-150 w-150 object-contain"
            />
          </div>
        </div>

        <div className="flex items-center justify-center bg-gray-600/25 p-6">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
