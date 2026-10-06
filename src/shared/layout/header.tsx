import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router"
import { Menu, Moon, Sun, UserRound, X } from "lucide-react"
import { clsx } from "clsx"

import { NAVIGATION_ITEMS } from "@/shared/lib/constants/navigation.constant"
import { ActionLink } from "@/shared/components/action-link"
import { Button } from "@/shared/components/ui/button"
import { Container } from "./container"

import { getAccessToken } from "@/features/auth/lib/utils/token"
import { useTheme } from "@/shared/providers/components/theme-provider"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsAuthenticated(!!getAccessToken())
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const checkIsActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(href)
  }

  return (
    <header className="relative z-50 w-full py-6 md:py-7">
      <Container>
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="Super Fitness home"
          className="shrink-0 rounded-sm transition-opacity outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <img
            src="/images/logo.png"
            alt="Super Fitness"
            className="block w-14.5 object-contain md:w-16"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center justify-center gap-9 lg:flex"
        >
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = checkIsActive(item.href)

            return (
              <Link
                key={item.label}
                to={item.href}
                className={clsx(
                  "group relative",
                  "font-brand font-bold",
                  "transition-colors duration-200",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-ring",
                  "focus-visible:ring-offset-2",
                  isActive
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                )}
              >
                {item.label}

                <span
                  aria-hidden="true"
                  className={clsx(
                    "absolute -bottom-2 left-0",
                    "h-0.5 rounded-full bg-primary",
                    "transition-all duration-200",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            )
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all hover:bg-neutral-200 dark:hover:bg-neutral-800"
          >
            {theme === "dark" ? (
              <Sun className="size-5 text-amber-400" />
            ) : (
              <Moon className="size-5 text-neutral-700" />
            )}
          </button>

          {isAuthenticated ? (
            <a
              href="/profile"
              aria-label="Profile"
              className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <UserRound className="size-5" />
            </a>
          ) : (
            <>
              <ActionLink href="#login">LOGIN</ActionLink>

              <ActionLink href="#signup" variant="outline">
                SIGN UP
              </ActionLink>
            </>
          )}
        </div>

        {/* Mobile Actions: Theme Toggle + Menu Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="size-4 text-amber-400" />
            ) : (
              <Moon className="size-4 text-neutral-700" />
            )}
          </button>

          <Button
            type="button"
            variant="default"
            size="icon"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/80"
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </Container>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={clsx(
          "absolute top-[calc(100%-4px)] right-4 left-4",
          "overflow-hidden rounded-2xl",
          "border border-border",
          "bg-background",
          "shadow-lg",
          "transition-all duration-200",
          "lg:hidden",
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        )}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col p-5">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = checkIsActive(item.href)

            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={closeMenu}
                className={clsx(
                  "border-b border-border",
                  "py-3.5",
                  "font-brand text-[15px] font-bold",
                  "transition-colors duration-200",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-ring",
                  isActive
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            )
          })}

          {/* Mobile Actions */}
          <div className="mt-5">
            {isAuthenticated ? (
              <a
                href="/profile"
                onClick={closeMenu}
                aria-label="Profile"
                className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <UserRound className="size-5" />
              </a>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <ActionLink href="#login">LOGIN</ActionLink>

                <ActionLink href="#signup" variant="outline">
                  SIGN UP
                </ActionLink>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
