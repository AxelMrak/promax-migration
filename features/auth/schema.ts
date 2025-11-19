import { z } from "zod";

export const loginSchemaDef = z.object({
  username: z.string().nonempty("Username or email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .nonempty("Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchemaDef>;

export const forgotPasswordSchemaDef = z.object({
  email: z.email("Invalid email address").nonempty("Email is required"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchemaDef>;

export const resetPasswordSchemaDef = z
  .object({
    email: z.email("Enter a valid email address").nonempty("Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm your new password"),
    token: z.string().nonempty("Reset token is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchemaDef>;
