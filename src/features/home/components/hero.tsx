import { Container } from "@/shared/layout/container"
import { ActionLink } from "../../../shared/components/action-link"
import { HERO_CONTENT } from "../lib/constants/hero.constant"

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      <Container className="relative pt-10 sm:pt-14 lg:pt-20">
        {/* Hero Content */}
        <div className="relative z-20 max-w-2xl py-10 sm:py-14 lg:py-22">
          {/* Heading */}
          <h1
            id="hero-heading"
            className="font-brand text-4xl leading-[1.05] font-extrabold tracking-tight text-foreground uppercase sm:text-5xl lg:text-5xl xl:text-6xl"
          >
            {HERO_CONTENT.title.first}{" "}
            <span className="text-primary">
              {HERO_CONTENT.title.highlightFirst}
            </span>
            <br />
            <span className="text-primary">
              {HERO_CONTENT.title.highlightSecond}
            </span>{" "}
            {HERO_CONTENT.title.last}
          </h1>

          {/* Description */}
          <div className="mt-6 max-w-lg border-l-2 border-primary pl-4 sm:mt-7">
            <p className="text-sm leading-6 text-muted-foreground sm:text-[15px]">
              {HERO_CONTENT.description}
            </p>
          </div>

          {/* Stats */}
          <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 sm:mt-10 sm:gap-8">
            {HERO_CONTENT.stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="font-brand text-lg font-bold text-foreground sm:text-xl lg:text-2xl">
                  {stat.value}
                </dt>

                <dd className="mt-1 max-w-27.5 text-[11px] leading-4 text-muted-foreground sm:text-xs sm:leading-5 lg:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-6 sm:mt-10 lg:gap-12">
            <ActionLink
              href={HERO_CONTENT.actions.primary.href}
              className="w-[45%] px-7.5 md:w-auto lg:py-6"
            >
              {HERO_CONTENT.actions.primary.label}
            </ActionLink>

            <ActionLink
              href={HERO_CONTENT.actions.secondary.href}
              variant="outline"
              className="w-[45%] px-7.5 md:w-auto lg:py-6"
            >
              {HERO_CONTENT.actions.secondary.label}
            </ActionLink>
          </div>
        </div>

        {/* Desktop Athlete */}
        <div
          aria-hidden="true"
          className="pointer-events-none z-10 hidden md:block"
        >
          <img
            src="/images/hero-athlete.png"
            alt=""
            className="block w-[min(42vw,440px)] object-contain object-bottom xl:w-[min(45vw,500px)]"
          />
        </div>
      </Container>
    </section>
  )
}
