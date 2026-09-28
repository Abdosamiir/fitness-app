import { Dumbbell } from "lucide-react"

import healthyTitle from "@/assets/imgs/healthy-title.png"
import mealsBg from "@/assets/imgs/meals.jpg"
import breakfastImg from "@/assets/imgs/meal-breakfast.png"
import lunchImg from "@/assets/imgs/meal-lunch.png"
import dinnerImg from "@/assets/imgs/meal-dinner.png"
import ProductCard from "@/features/product/components/product-card"
import { ROUTES } from "@/pages/routes"

// Variables
const MEALS = [
  { title: "Breakfast", image: breakfastImg },
  { title: "Lunch", image: lunchImg },
  { title: "Dinner", image: dinnerImg },
]

/**
 * Home "Healthy" section: full-bleed food photo with a frosted band behind the
 * heading, then the meal cards. Content uses the same container as the footer.
 */
const HealthySection = () => {
  return (
    <section className="relative isolate w-full overflow-hidden">
      {/* Background photo + frosted band behind the heading */}
      <img
        src={mealsBg}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-10.25 -z-10 h-105 bg-glass backdrop-blur-[86px]"
      />

      <div className="mx-auto flex w-full max-w-360 flex-col items-center px-4 pt-3 pb-16 md:px-10 xl:px-20">
        {/* Section eyebrow */}
        <img
          src={healthyTitle}
          alt=""
          aria-hidden
          width={258}
          height={43}
          className="-z-20 h-10.75 w-auto select-none"
        />
        <p className="-mt-1 flex items-center gap-2.5 text-sm font-medium text-primary">
          <Dumbbell className="size-7 rotate-45" strokeWidth={1} />
          Healthy Nutritions
        </p>

        <h2 className="mt-7 max-w-160 text-center font-brand text-2xl font-bold text-foreground uppercase md:text-[40px] md:leading-12">
          Fuel your fitness journey with customized{" "}
          <span className="text-primary">meal plans</span> for you
        </h2>

        <ul className="mt-8 grid w-full grid-cols-1 gap-8.5 sm:grid-cols-2 lg:grid-cols-3">
          {MEALS.map((meal) => (
            <li key={meal.title}>
              <ProductCard
                title={meal.title}
                image={meal.image}
                href={ROUTES.healthy}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HealthySection
