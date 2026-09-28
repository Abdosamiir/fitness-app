import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

type ProductCardProps = {
  title: string
  image: string
  href: string
  imageAlt?: string
}

const ProductCard = ({
  title,
  image,
  href,
  imageAlt = "",
}: ProductCardProps) => {
  return (
    <article className="group relative aspect-403/399 w-full overflow-hidden rounded-lg bg-card">
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 border-t border-glass-border bg-glass px-4 pt-5 pb-4 backdrop-blur-[86px]">
        <h3 className="font-brand text-lg leading-none font-bold tracking-[0.2em] text-foreground uppercase">
          {title}
        </h3>

        <Link
          to={href}
          className="flex w-fit items-center gap-3 rounded-sm font-brand text-lg leading-none font-medium text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Read More
          <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
            <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
          </span>
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
