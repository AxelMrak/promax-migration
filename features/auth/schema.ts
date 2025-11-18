import { z } from "zod";

export const loginSchemaDef = z.object({
  username: z.string("Username or Email is required").min(2).max(100),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginSchema = z.infer<typeof loginSchemaDef>;
