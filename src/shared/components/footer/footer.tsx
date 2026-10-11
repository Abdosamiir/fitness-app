import logo from "@/assets/imgs/fit1.png"
import { MailIcon, PhoneIcon } from "@/shared/components/footer/footer-icons"

// Variables
const CONTACTS = [
  {
    label: "+91 123 456 789",
    href: "tel:+91123456789",
    icon: PhoneIcon,
    iconClassName: "size-3.5",
  },
  {
    label: "info@gmail.com",
    href: "mailto:info@gmail.com",
    icon: MailIcon,
    iconClassName: "size-4",
  },
]

const TIMINGS = [
  "Mon - Fri : 08:00 AM - 10:00 PM",
  "Sat - Sun : 08:00 AM - 09:00 PM",
]

const ADDRESS_LINES = ["2715 Ash Dr. San Jose, South", "Dakota 83475"]

// The logo art has white "SUPER FITNESS" lettering. On the light surface a
// darkened copy is laid over it, clipped to the lettering only (below the emblem).
const LETTERING_CLIP =
  "polygon(0 66%, 16% 66%, 35% 62%, 50% 61%, 65% 62%, 84% 66%, 100% 66%, 100% 100%, 0 100%)"

const headingClassName =
  "pt-0.5 text-base leading-6 font-bold tracking-normal uppercase"

/**
 * Site footer: brand + tagline, contact links, gym timing and location.
 * Stacks on mobile, two columns from `md`, four columns from `xl`.
 */
const Footer = () => {
  return (
    <footer className="w-full bg-background font-brand text-foreground">
      <div className="mx-auto grid w-full max-w-360 grid-cols-1 gap-y-4 px-4 pt-4 pb-4 md:grid-cols-2 md:gap-x-10 md:gap-y-10 md:px-10 md:pt-10 md:pb-16 xl:grid-cols-[375fr_318fr_374fr_auto] xl:gap-x-0 xl:px-20 xl:pb-20">
        {/* Brand */}
        <div>
          <div className="relative h-14 w-23 overflow-hidden">
            <img
              src={logo}
              alt="Super Fitness"
              className="absolute -top-4.5 left-0 size-23 max-w-none"
            />
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              style={{ clipPath: LETTERING_CLIP }}
              className="absolute -top-4.5 left-0 size-23 max-w-none opacity-85 brightness-0 dark:hidden"
            />
          </div>
          <p className="mt-1.5 text-base leading-8">
            Push harder, go further. Your
            <br />
            fitness journey starts today!
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className={headingClassName}>Contact us</h3>
          <ul className="mt-6.75 flex flex-col gap-2">
            {CONTACTS.map(({ label, href, icon: Icon, iconClassName }) => (
              <li key={href}>
                <a
                  href={href}
                  className="group inline-flex items-center gap-4 text-base leading-6 transition-colors hover:text-primary"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-foreground transition-colors group-hover:border-primary dark:border-foreground/20">
                    <Icon className={iconClassName} />
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Gym timing */}
        <div>
          <h3 className={headingClassName}>Our gym timing</h3>
          <ul className="mt-5.5 text-base leading-8.5">
            {TIMINGS.map((timing) => (
              <li key={timing}>{timing}</li>
            ))}
          </ul>
        </div>

        {/* Location */}
        <div>
          <h3 className={headingClassName}>Our location</h3>
          <address className="mt-6.5 text-base leading-6.5 not-italic">
            {ADDRESS_LINES.map((line) => (
              <span key={line} className="block xl:whitespace-nowrap">
                {line}
              </span>
            ))}
          </address>
        </div>
      </div>
    </footer>
  )
}

export default Footer
