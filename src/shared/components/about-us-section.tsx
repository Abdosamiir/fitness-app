import { Dumbbell, ArrowUpRight, ArrowUpRightFromSquare } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Link } from "react-router"
import { ROUTES } from "@/pages/routes"

import aboutImg1 from "../../assets/imgs/about-1.png"
import aboutImg2 from "../../assets/imgs/about-2.png"
import aboutImg3 from "../../assets/imgs/about-3.png"

const features = [
  {
    title: "Personal Trainer",
    description:
      "Achieve your Fitness goals with the guidance of our certified trainers.",
  },
  {
    title: "Cardio Programs",
    description:
      "From steady-state runs to interval sprints, our treadmill programs.",
  },
  {
    title: "Quality Equipment",
    description:
      "Our gym is equipped with the latest cardio & strength machines.",
  },
  {
    title: "Healthy Nutritions",
    description:
      "Fuel your fitness journey with customized meal plans for you.",
  },
]

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-background py-10 sm:py-16 lg:py-24">
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Flex Layout */}
        <div className="flex flex-col items-center justify-between gap-20 lg:flex-row lg:gap-16">
          {/* Column 1: Image Collage */}
          <div className="flex w-full justify-center lg:w-1/2">
            {/* Collage Container */}
            <div className="relative aspect-[4/3.8] w-full max-w-2xl sm:aspect-square lg:h-185">
              {/* Top Left Image (Image 1) */}
              <div className="absolute -top-15 left-0 h-[80%] w-[50%] overflow-hidden rounded-3xl shadow-lg">
                <img
                  src={aboutImg1}
                  alt="Trainer holding kettlebell"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Top Right Image (Image 3) */}
              <div className="absolute top-5 right-5 h-[28%] w-[44%] overflow-hidden rounded-3xl shadow-lg">
                <img
                  src={aboutImg3}
                  alt="Athlete resting"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Bottom Overlapping Image (Image 2 - Exactly like your screenshot) */}
              <div className="absolute right-0 -bottom-13 z-20 h-[75%] w-[68%] overflow-hidden rounded-3xl border-2 border-background bg-background shadow-2xl sm:w-[60%]">
                <img
                  src={aboutImg2}
                  alt="Fitness athlete in blue shirt"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
          {/* Column 2: Content Details */}
          <div className="relative flex w-full flex-col justify-center gap-3 lg:w-1/2">
            {/* Background Watermark */}
            <div className="pointer-events-none absolute -top-8 left-0 bg-linear-to-b from-foreground/10 to-transparent bg-clip-text font-baloo text-5xl font-extrabold tracking-widest text-transparent uppercase select-none [webkit-text-stroke:1px_rgba(0,0,0,0.1)] sm:-top-10 sm:text-7xl lg:-top-12 lg:text-6xl dark:[webkit-text-stroke:1px_rgba(255,255,255,0.12)]">
              ABOUT US
            </div>
            {/* Header Tag */}
            <div className="mb-2 flex items-center gap-2 sm:mb-3">
              <Dumbbell className="rotate-45 text-primary sm:h-10 sm:w-15" />
              <span className="text-xs font-bold tracking-wider text-primary uppercase sm:text-sm">
                About Us
              </span>
            </div>

            {/* Title */}
            <h2 className="font-baloo text-2xl font-extrabold tracking-tight text-foreground sm:mb-6 sm:text-3xl lg:text-4xl lg:leading-tight">
              EMPOWERING YOU TO ACHIEVE{" "}
              <span className="block text-primary sm:inline">
                YOUR FITNESS{" "}
              </span>
              GOALS
            </h2>

            {/* Description */}
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
              We believe fitness is more than just a workout—it's a lifestyle.
              With top-of-the-line facilities, certified trainers, and a
              supportive community, we're here to inspire and guide you every
              step of the way.
            </p>

            {/* 2x2 Feature Grid */}
            <div className="mb-8 grid grid-cols-1 gap-y-6 border-t border-border/40 pt-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:pt-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex flex-col gap-1 sm:gap-1.5">
                  <div className="flex items-center gap-2">
                    <ArrowUpRightFromSquare className="h-7 w-10 shrink-0 text-primary" />
                    <h3 className="text-sm font-bold text-foreground sm:text-base">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="pl-6 text-xs leading-normal text-muted-foreground sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <Link to={ROUTES.about}>
                <Button
                  size="lg"
                  className="group rounded-full bg-primary px-6 py-5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 sm:px-7 sm:py-6 sm:text-base"
                >
                  <span>Get Started</span>
                  <span className="ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-7 sm:w-7">
                    <ArrowUpRight className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
