/**
 * The single source of truth for route paths. Nothing else in the app should
 * hardcode a URL string or derive one from a folder name — import from here.
 */
export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgetPassword: "/forget-password",
  resetPassword: "/reset-password",
  about: "/about",
  classes: "/classes",
  healthy: "/healthy",
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

/** Links rendered in the app shell nav, in order. */
export const NAV_ITEMS: { to: RoutePath; label: string }[] = [
  { to: ROUTES.home, label: "Home" },
]
