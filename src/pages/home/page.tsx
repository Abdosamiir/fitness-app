import Header from "@/shared/layout/header"

export function HomePage() {
  return (
    <>
      <Header />

      <div className="py-16">
        <h1 className="text-xl font-semibold">Welcome</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          You&apos;re signed in. Add your features under{" "}
          <code className="font-mono">src/features/</code>.
        </p>
      </div>
    </>
  )
}
