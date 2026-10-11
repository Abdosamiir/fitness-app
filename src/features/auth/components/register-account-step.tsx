import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react"
import { Link } from "react-router"

import { useRegisterAccountStep } from "../hooks/use-register-account-step"

import { RegisterStepLayout } from "./register-step-layout"

import { ROUTES } from "@/pages/routes"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"

export function RegisterAccountStep() {
  // State
  const [showPassword, setShowPassword] = useState(false)

  // Custom Hook
  const { form, onSubmit } = useRegisterAccountStep()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <RegisterStepLayout>
      <RegisterStepLayout.Header
        title="Create An Account"
        description="Enter your details to get started"
      />

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div>
          <div className="relative">
            <UserRound
              aria-hidden="true"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-white/60"
              size={18}
            />

            <Input
              {...register("firstName")}
              autoComplete="given-name"
              className="h-12 rounded-full border-white/60 bg-transparent pl-10 text-white placeholder:text-white/60 focus-visible:border-brand-500 focus-visible:ring-0"
              placeholder="First Name"
            />
          </div>

          {errors.firstName && (
            <p className="mt-1 px-3 text-xs text-red-400">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <div className="relative">
            <UserRound
              aria-hidden="true"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-white/60"
              size={18}
            />

            <Input
              {...register("lastName")}
              autoComplete="family-name"
              className="h-12 rounded-full border-white/60 bg-transparent pl-10 text-white placeholder:text-white/60 focus-visible:border-brand-500 focus-visible:ring-0"
              placeholder="Last Name"
            />
          </div>

          {errors.lastName && (
            <p className="mt-1 px-3 text-xs text-red-400">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <div className="relative">
            <Mail
              aria-hidden="true"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-white/60"
              size={18}
            />

            <Input
              {...register("email")}
              autoComplete="email"
              className="h-12 rounded-full border-white/60 bg-transparent pl-10 text-white placeholder:text-white/60 focus-visible:border-brand-500 focus-visible:ring-0"
              placeholder="Email"
              type="email"
            />
          </div>

          {errors.email && (
            <p className="mt-1 px-3 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <Lock
              aria-hidden="true"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-white/60"
              size={18}
            />

            <Input
              {...register("password")}
              autoComplete="new-password"
              className="h-12 rounded-full border-white/60 bg-transparent pr-10 pl-10 text-white placeholder:text-white/60 focus-visible:border-brand-500 focus-visible:ring-0"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
            />

            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-white/60"
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 px-3 text-xs text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            to={ROUTES.forgetPassword}
            className="font-brand text-sm font-bold text-brand-500 underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 py-2" aria-hidden="true">
          <span className="h-px flex-1 bg-white/30" />

          <span className="text-sm text-white/60">Or</span>

          <span className="h-px flex-1 bg-white/30" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-3">
          {[
            {
              name: "Facebook",
              icon: "facebook circle.svg",
            },
            {
              name: "Google",
              icon: "Google.svg",
            },
            {
              name: "Apple",
              icon: "apple.svg",
            },
          ].map((provider) => (
            <button
              key={provider.name}
              type="button"
              aria-label={`Continue with ${provider.name}`}
              className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <img src={`/${provider.icon}`} alt="" className="size-6" />
            </button>
          ))}
        </div>

        {/* Submit */}
        <Button
          className="h-11 w-full rounded-full bg-brand-500 font-brand font-bold text-white hover:bg-brand-600"
          type="submit"
        >
          Register
        </Button>

        {/* Login */}
        <p className="text-center font-brand text-sm text-white">
          Already Have An Account?{" "}
          <Link
            to={ROUTES.login}
            className="font-bold text-brand-500 underline"
          >
            Login
          </Link>
        </p>
      </form>
    </RegisterStepLayout>
  )
}
