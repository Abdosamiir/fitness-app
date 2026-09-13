import type { ReactNode } from "react"

import { QueryProvider } from "@/shared/providers/components/query-provider"
import { ThemeProvider } from "@/shared/providers/components/theme-provider"

/**
 * Every app-wide provider, mounted once at the root. Auth needs no provider
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  )
}
