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
