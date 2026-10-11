import { AboutSection } from "@/shared/components/about-us-section";
import HealthySection from "@/features/home/components/healthy/healthy-section"
import Hero from "@/features/home/components/hero";
import Marquee from "@/features/home/components/marquee";
import { UpcomingWorkoutsSection } from "@/features/home/components/upcoming-workouts-section";
import WhyUs from "@/features/home/components/why-us";


export function HomePage() {
  return (<>
    <div className="py-16 w-full">
       <Hero />
       <Marquee />
      <AboutSection />
      <UpcomingWorkoutsSection />
      <WhyUs />
      <HealthySection />
    </div>
    </>
  )
}
