import { useState, type ReactNode } from "react";

import { Button } from "@/shared/components/ui/button";

const navItems = [
  {
    label: "Home",
    href: "#home",
    active: true,
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Classes",
    href: "#classes",
  },
  {
    label: "Healthy",
    href: "#healthy",
  },
];

function ArrowUpRight() {
  return (
<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0206 0.707124C10.2967 2.43105 7.155 2.43175 5.43036 0.707116L4.72326 9.63389e-06L3.30904 1.41422L4.01615 2.12133C5.27056 3.37574 6.99731 4.00223 8.72478 4.00295L-0.000209446 12.7279L1.414 14.1422L10.139 5.41716C10.1397 7.14462 10.7662 8.87138 12.0206 10.1258L12.7277 10.8329L14.1419 9.41868L13.4348 8.71157C11.7102 6.98694 11.7109 3.84526 13.4348 2.12134L14.1419 1.41423L12.7277 1.70517e-05L12.0206 0.707124Z" fill="#F3F3F4"/>
</svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-5"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-5"
      aria-hidden="true"
    >
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type HeaderActionProps = {
  children: ReactNode;
  variant?: "primary" | "outline";
  href: string;
};

function HeaderAction({
  children,
  variant = "primary",
  href,
}: HeaderActionProps) {
  const isPrimary = variant === "primary";

  return (
      <a href={href}>
    <Button
      variant={isPrimary ? "default": "outline"}
      className="relative rounded-lg"

    >
        <span>{children}</span>

        <span
          className={[
            "flex size-7 shrink-0 items-center justify-center",
            "rounded-full",
            "transition-transform duration-200",
            "group-hover/button:rotate-45",
            "absolute -right-5 -top-1",
            "border-2 border-background bg-primary text-primary-foreground",
          ].join(" ")}
        >
          <ArrowUpRight />
        </span>
    </Button>
      </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="relative z-50 w-full py-6 md:py-7">
      <div
        className="
          mx-auto flex min-h-[52px] items-center justify-between
          gap-8
          w-[calc(100%-32px)]
          max-w-[1200px]
          md:w-[calc(100%-64px)]
        "
      >
        {/* Logo / Home */}
        <a
          href="#home"
          onClick={closeMenu}
          aria-label="Super Fitness home"
          className="
            shrink-0
            rounded-sm
            outline-none
            transition-opacity
            hover:opacity-80
            focus-visible:ring-2
            focus-visible:ring-ring
            focus-visible:ring-offset-2
          "
        >
          <img
            src="/images/logo.png"
            alt="Super Fitness"
            className="
              block w-[58px] object-contain
              md:w-16
            "
          />
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="
            hidden items-center justify-center
            gap-9 lg:flex
          "
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={[
                "group relative",
                "text-sm font-bold",
                "transition-colors duration-200",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-ring",
                "focus-visible:ring-offset-2",
                item.active
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
              ].join(" ")}
            >
              {item.label}

              <span
                aria-hidden="true"
                className={[
                  "absolute -bottom-2 left-0 h-0.5",
                  "rounded-full bg-primary",
                  "transition-all duration-200",
                  item.active
                    ? "w-full"
                    : "w-0 group-hover:w-full",
                ].join(" ")}
              />
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-6 lg:flex">
          <HeaderAction href="#login">
            LOGIN
          </HeaderAction>

          <HeaderAction href="#signup" variant="outline">
            SIGN UP
          </HeaderAction>
        </div>

        {/* Mobile Menu Trigger */}
        <Button
          type="button"
          variant="default"
          size="icon"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="
            rounded-full
            bg-primary
            text-primary-foreground
            hover:bg-primary/80
            lg:hidden
          "
        >
          <MenuIcon open={menuOpen} />
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={[
          "absolute left-4 right-4 top-[calc(100%-4px)]",
          "overflow-hidden rounded-2xl",
          "border border-border",
          "bg-background/95 backdrop-blur-xl",
          "shadow-lg",
          "transition-all duration-200",
          "lg:hidden",

          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0",
        ].join(" ")}
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col p-5"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className={[
                "border-b border-border",
                "py-3.5",
                "text-[15px] font-bold",
                "transition-colors duration-200",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-ring",
                item.active
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
              ].join(" ")}
            >
              {item.label}
            </a>
          ))}

          {/* Mobile Actions */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <HeaderAction href="#login">
              LOGIN
            </HeaderAction>

            <HeaderAction href="#signup" variant="outline">
              SIGN UP
            </HeaderAction>
          </div>
        </nav>
      </div>
    </header>
  );
}
