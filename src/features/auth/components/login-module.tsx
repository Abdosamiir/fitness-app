import { LoginForm } from "@/features/auth/components/login-form"

/**
 * The `/login` screen's content. Width and centering are owned by the auth
 * layout route (`pages/auth/layout.tsx`), so this only lays out its own stack.
 */
export function LoginModule() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Sign in with your email and password to continue.
        </p>
      </div>
      <LoginForm />
    </div>
  )
}
