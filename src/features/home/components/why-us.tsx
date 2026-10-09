import { Dumbbell } from "lucide-react"
import whyUsTitle from "@/assets/imgs/why-us-title.png"
import whyUs1 from "@/assets/imgs/us-1.jpg"
import whyUs2 from "@/assets/imgs/us-2.jpg"
import whyUs3 from "@/assets/imgs/us-3.jpg"
import whyUs4 from "@/assets/imgs/us-4.jpg"

export default function WhyUs() {
  return (
    <section className="py-10">
      {/* container */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-14">
          {/* left side */}
          <div className="flex-1">
            {/* content */}
            <div>
              {/* Section title */}
              <div>
                <img
                  src={whyUsTitle}
                  alt=""
                  aria-hidden
                  width={258}
                  height={43}
                  className="-z-20 h-10.75 w-auto select-none hidden lg:block"
                />
                <p className="-mt-6 ml-2 flex items-center gap-2.5 text-sm font-medium text-primary">
                  <Dumbbell className="size-8 rotate-45" strokeWidth={1} />
                  Why Us
                </p>
              </div>
              <h3 className="mt-3 font-baloo text-xl md:text-[30px] lg:text-[40px] font-bold uppercase">
                Elevate fitness with the <br className="hidden md:block"/>
                <span className="text-brand-500">BEST WAY</span> possible
              </h3>
              <p className="mt-6 text-lg">
                We offer a fitness journey that's tailored to your goals,
                supported by professional trainers and a welcoming community.
                Whether it's weight loss, strength building, or overall
                wellness, our proven methods.
              </p>
            </div>
            {/* list */}
            <ul className="mt-16 space-y-8">
              <li className="flex items-center gap-6">
                {/* circle */}
                <div className="flex size-15 shrink-0 border border-[#F3F3F4]/40 items-center justify-center rounded-full bg-brand-500 text-[11px] font-bold text-[#F3F3F4]">
                  01
                </div>
                {/* content */}
                <div>
                  <h4 className="mb-2 text-[16.7px] font-bold capitalize">
                    personalized fitness plans
                  </h4>
                  <p>
                    We tailor every workout to fit your unique goals and fitness
                    level ensuring that you make the most progress.
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-6">
                {/* circle */}
                <div className="flex size-15 shrink-0 border border-[#F3F3F4]/40 items-center justify-center rounded-full bg-brand-500 text-[11px] font-bold text-[#F3F3F4]">
                  02
                </div>
                {/* content */}
                <div>
                  <h4 className="mb-2 text-[16.7px] font-bold capitalize">
                    results-driven focus
                  </h4>
                  <p>
                    Everything we do is designed to help you achieve measurable
                    results, whether you're aiming for weight loss.
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-6">
                {/* circle */}
                <div className="flex size-15 shrink-0 border border-[#F3F3F4]/40 items-center justify-center rounded-full bg-brand-500 text-[11px] font-bold text-[#F3F3F4]">
                  03
                </div>
                {/* content */}
                <div>
                  <h4 className="mb-2 text-[16.7px] font-bold capitalize">
                    state-of-the-art equipment
                  </h4>
                  <p>
                    We provide the latest in gym equipment, from cardio machines
                    to free weights, designed to support every type.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          {/* right side */}
          <div className="flex flex-1 justify-center gap-2.5">
            <div className="flex-1 space-y-2">
              <img
                src={whyUs1}
                alt=""
                className="h-100 w-full rounded-[18px] object-cover"
              />
              <img
                src={whyUs2}
                alt=""
                className="h-86 w-full rounded-[18px] object-cover"
              />
            </div>
            <div className="flex-1 space-y-2 pt-18">
              <img
                src={whyUs3}
                alt=""
                className="h-71.25 w-full rounded-[18px] object-cover"
              />
              <img
                src={whyUs4}
                alt=""
                className="h-86.5 w-full rounded-[18px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
