import { useSession } from "@/features/auth/lib/auth-client"

export function HomePage() {
  // Query
  const { data: session } = useSession()
  // Variables
  const name = session?.user?.name

  return (
    <div className="py-16">
      <h1 className="text-xl font-semibold">
        Welcome{name ? `, ${name}` : ""}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        You&apos;re signed in. Add your features under{" "}
        <code className="font-mono">src/features/</code>.
      </p>
    </div>
  )
}
