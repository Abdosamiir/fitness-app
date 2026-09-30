import StarIcon from "@/assets/icons/star.svg?react"

import { MARQUEE_ITEMS } from "../lib/constants/marquee.constant"

const MARQUEE_ITEMS_COUNT = 2

export default function Marquee() {
  const items = Array.from(
    { length: MARQUEE_ITEMS_COUNT },
    () => MARQUEE_ITEMS
  ).flat()

  return (
    <section
      aria-label="Our fitness services"
      className="relative overflow-hidden bg-primary py-4 sm:py-5"
    >
      {/* Edge fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-primary to-transparent sm:w-24"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-primary to-transparent sm:w-24"
      />

      {/* Marquee */}
      <div className="flex w-max motion-safe:animate-[marquee_50s_linear_infinite] motion-reduce:animate-none">
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="flex shrink-0 items-center">
            <span className="px-5 font-brand text-sm font-extrabold tracking-wide text-primary-foreground uppercase sm:px-7 sm:text-base lg:px-10 lg:text-lg">
              {item}
            </span>

            <StarIcon
              aria-hidden="true"
              className="size-4 shrink-0 fill-current text-primary-foreground sm:size-5"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
