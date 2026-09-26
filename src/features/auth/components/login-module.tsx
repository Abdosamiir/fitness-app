"use client"

import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
    <div className="flex w-full flex-col items-center gap-6">
      {/* Heading */}
      <div className="flex flex-col items-center gap-1.5 text-center">
        <span className="font-brand text-lg">Hey There,</span>

        <h1 className="font-brand text-3xl font-bold">WELCOME BACK!</h1>
      </div>

      {/* Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[486px] rounded-[32px] border border-white/60 px-10 py-7"
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
              autoComplete="true"
              className="h-12 rounded-[20px] border-white/60 bg-transparent pr-3 pl-9 font-brand text-sm text-white"
              {...register("email")}
            />
           
          </div>
           {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
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
              placeholder="Password"
              className="h-12 rounded-[20px] border-white/60 bg-transparent pr-8 pl-9 font-brand text-sm text-white placeholder:text-white/60 focus-visible:border-brand-500 focus-visible:ring-0"
              {...register("password")}
            />

           
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-white/70"
            >
              {showPassword ? (
                <EyeOff size={20} strokeWidth={1.5} />
              ) : (
                <Eye size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
           {errors.password && (
              <p className="text-sm text-red-500 ">{errors.password.message}</p>
            )}

          {/* Error Message */}

          {error && (
            <p className="text-sm text-red-500">
              {error.message || "Failed to login"}
            </p>
          )}

          {/* Forgot Password */}
          <a
            href="#"
            className="text-right font-brand text-base font-bold text-brand-500 underline"
          >
            Forgot Password?
          </a>

          {/* Divider */}
          <div className="flex items-center gap-3 px-12 py-4">
            <div className="h-px flex-1 bg-white/50" />

            <span className="font-brand text-sm text-white/60">Or</span>

            <div className="h-px flex-1 bg-white/50" />
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-3 py-1">
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white"
            >
              <img src="facebook circle.svg" alt="Facebook" />{" "}
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white"
            >
              <img src="/Google.svg" alt="Google" />
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white"
            >
              <img src="/apple.svg" alt="Apple" />
            </button>
          </div>

          {/* Login */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-brand-500 font-brand text-xs font-bold text-white hover:bg-brand-600"
          >
            Login
          </Button>

          {/* Register */}
          <p className="text-center font-brand text-base text-white">
            Dont Have An Account Yet?{" "}
            <a href="#" className="font-bold text-brand-500">
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
