import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const verifyOtpSchema = z.object({
  resetCode: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/^[A-Z][a-zA-Z0-9]*$/, "Password must start with an uppercase letter"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;