"use client"

import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { ROUTES } from "@/pages/routes"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { loginSchema } from "../lib/schema/auth"
import useLoginHook from "../hooks/uselogin-hook"

type LoginFormValues = {
  email: string
  password: string
}

export function LoginModule() {
  const [showPassword, setShowPassword] = useState(false)
  const { mutate, isPending, error } = useLoginHook()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormValues) => {
    mutate(data)
  }

  return (
    <div className="flex w-full min-w-0 flex-col items-center gap-5 text-white sm:gap-6">
      {/* Heading */}
      <div className="flex flex-col items-center gap-1.5 text-center">
        <span className="font-brand text-lg">Hey There,</span>

        <h1 className="font-brand text-2xl font-bold sm:text-3xl">
          WELCOME BACK!
        </h1>
      </div>

      {/* Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full min-w-0 rounded-3xl border border-white/60 px-4 py-6 sm:rounded-[32px] sm:px-8 sm:py-7 xl:px-10"
      >
        {/* Title */}
        <span className="block text-center font-brand text-xl font-extrabold">
          Login
        </span>

        <div className="mt-4 flex flex-col gap-3">
          {/* Email */}
          <div className="relative">
            <Mail
              size={20}
              strokeWidth={1.5}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-white/70"
            />

            <Input
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="h-12 rounded-[20px] border-white/60 bg-transparent pr-3 pl-9 font-brand text-base text-white placeholder:text-white/60"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm wrap-anywhere text-red-500">
              {errors.email.message}
            </p>
          )}

          {/* Password */}
          <div className="relative">
            <Lock
              size={20}
              strokeWidth={1.5}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-white/70"
            />

            <Input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Password"
              className="h-12 rounded-[20px] border-white/60 bg-transparent pr-12 pl-9 font-brand text-base text-white placeholder:text-white/60 focus-visible:border-brand-500 focus-visible:ring-0"
              {...register("password")}
            />

            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-1 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-white/70"
            >
              {showPassword ? (
                <EyeOff size={20} strokeWidth={1.5} />
              ) : (
                <Eye size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm wrap-anywhere text-red-500">
              {errors.password.message}
            </p>
          )}

          {/* Error Message */}

          {error && (
            <p className="text-sm wrap-anywhere text-red-500">
              {error.message || "Failed to login"}
            </p>
          )}

          {/* Forgot Password */}
          <Link
            to={ROUTES.forgetPassword}
            className="flex min-h-11 items-center self-end text-right font-brand text-sm font-bold text-brand-500 underline sm:text-base"
          >
            Forgot Password?
          </Link>

          {/* Divider */}
          <div className="flex items-center gap-3 px-4 py-3 sm:px-12 sm:py-4">
            <div className="h-px flex-1 bg-white/50" />

            <span className="font-brand text-sm text-white/60">Or</span>

            <div className="h-px flex-1 bg-white/50" />
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-3 py-1">
            <button
              type="button"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white"
            >
              <img
                src="/facebook circle.svg"
                alt="Facebook"
                className="size-8"
              />
            </button>
            <button
              type="button"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white"
            >
              <img src="/Google.svg" alt="Google" className="size-8" />
            </button>
            <button
              type="button"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white"
            >
              <img src="/apple.svg" alt="Apple" className="size-8" />
            </button>
          </div>

          {/* Login */}
          <Button
            type="submit"
            disabled={isPending}
            className="h-11 w-full rounded-full bg-brand-500 font-brand text-sm font-bold text-white hover:bg-brand-600"
          >
            Login
          </Button>

          {/* Register */}
          <p className="text-center font-brand text-sm wrap-anywhere text-white sm:text-base">
            Dont Have An Account Yet?{" "}
            <Link to={ROUTES.register} className="font-bold text-brand-500">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
