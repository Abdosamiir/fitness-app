import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"

import { useRegistration } from "@/features/auth/hooks/use-registration"
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/lib/schema/register"
import { ROUTES } from "@/pages/routes"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"

type RegisterField = {
  autoComplete: string
  icon: typeof UserRound
  name: keyof RegisterFormValues
  placeholder: string
  type: "email" | "text"
}

const REGISTER_FIELDS: RegisterField[] = [
  {
    autoComplete: "given-name",
    icon: UserRound,
    name: "firstName",
    placeholder: "First Name",
    type: "text",
  },
  {
    autoComplete: "family-name",
    icon: UserRound,
    name: "lastName",
    placeholder: "Last Name",
    type: "text",
  },
  {
    autoComplete: "email",
    icon: Mail,
    name: "email",
    placeholder: "Email",
    type: "email",
  },
]

export function RegisterModule() {
  // Navigation
  const navigate = useNavigate()

  // State
  const [showPassword, setShowPassword] = useState(false)

  // Context
  const { draft, setAccountDetails } = useRegistration()

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: draft.firstName ?? "",
      lastName: draft.lastName ?? "",
      email: draft.email ?? "",
      password: draft.password ?? "",
    },
    resolver: zodResolver(registerSchema),
  })

  // Functions
  const onSubmit = (values: RegisterFormValues) => {
    setAccountDetails({ ...values, rePassword: values.password })
    navigate(ROUTES.onboardingGender)
  }

  return (
    <section className="flex w-full flex-col items-center gap-5 text-white">
      <header className="text-center">
        <p className="font-brand text-lg">Hey There</p>
        <h1 className="font-brand text-3xl font-bold sm:text-4xl">
          Create An Account
        </h1>
      </header>

      <form
        className="w-full rounded-[32px] border border-white/60 px-5 py-6 sm:px-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center font-brand text-xl font-extrabold">
          Register
        </h2>

        <div className="mt-5 space-y-3">
          {REGISTER_FIELDS.map((field) => {
            const Icon = field.icon

            return (
              <div key={field.name}>
                <div className="relative">
                  <Icon
                    aria-hidden="true"
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-white/70"
                    size={18}
                    strokeWidth={1.5}
                  />
                  <Input
                    {...register(field.name)}
                    autoComplete={field.autoComplete}
                    className="h-12 rounded-full border-white/60 bg-transparent pl-10 text-white placeholder:text-white/60 focus-visible:border-brand-500 focus-visible:ring-0"
                    placeholder={field.placeholder}
                    type={field.type}
                  />
                </div>
                {errors[field.name] && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            )
          })}

          <div>
            <div className="relative">
              <Lock
                aria-hidden="true"
                className="absolute top-1/2 left-3 -translate-y-1/2 text-white/70"
                size={18}
                strokeWidth={1.5}
              />
              <Input
                {...register("password")}
                autoComplete="new-password"
                className="h-12 rounded-full border-white/60 bg-transparent pr-10 pl-10 text-white placeholder:text-white/60 focus-visible:border-brand-500 focus-visible:ring-0"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white/70"
                onClick={() => setShowPassword((isVisible) => !isVisible)}
                type="button"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <Link
            className="block text-right font-brand font-bold text-brand-500 underline"
            to={ROUTES.forgetPassword}
          >
            Forget Password?
          </Link>

          <div className="flex items-center gap-4 px-8 py-2" aria-hidden="true">
            <span className="h-px flex-1 bg-white/50" />
            <span className="text-sm text-white/70">Or</span>
            <span className="h-px flex-1 bg-white/50" />
          </div>

          <div className="flex justify-center gap-3">
            {["facebook circle.svg", "Google.svg", "apple.svg"].map((icon) => (
              <button
                aria-label={`Continue with ${icon.split(".")[0]}`}
                className="flex size-9 items-center justify-center rounded-full bg-white/10"
                key={icon}
                type="button"
              >
                <img alt="" className="size-6" src={`/${icon}`} />
              </button>
            ))}
          </div>

          <Button
            className="mt-2 h-10 w-full rounded-full bg-brand-500 font-brand font-bold text-white hover:bg-brand-600"
            type="submit"
          >
            Register
          </Button>

          <p className="text-center font-brand text-sm">
            Already Have An Account?{" "}
            <Link
              className="font-bold text-brand-500 underline"
              to={ROUTES.login}
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}
