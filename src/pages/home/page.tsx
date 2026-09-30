import { AboutSection } from "@/shared/components/about-us-section";

export function HomePage() {
  return (
    <div className="py-16 w-full">
      <h1 className="text-xl font-semibold">
        Welcome
      </h1>
      <AboutSection />
    </div>
  )
}
