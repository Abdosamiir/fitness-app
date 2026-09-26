import { z } from "zod"

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters"),
  lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export type RegisterFormValues = z.infer<typeof registerSchema>
