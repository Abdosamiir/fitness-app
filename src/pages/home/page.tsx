import { AboutSection } from "@/shared/components/about-us-section";
import Header from "@/shared/layout/header"
import HealthySection from "@/features/home/components/healthy/healthy-section"

export function HomePage() {
  return (<>
    <Header />
    <div className="py-16 w-full">
      <h1 className="text-xl font-semibold">
        Welcome
      </h1>
      <AboutSection />
      <HealthySection />
    </div>
    </>
  )
}
