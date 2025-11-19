"use server";
import { api } from "@/lib/api/client";
import type { ResetPasswordSchema } from "@/features/auth/schema";
import type { ResetPasswordResponse } from "@/features/auth/types";

export async function resetPassword(data: ResetPasswordSchema) {
  console.debug("resetPassword", data);
  return api<ResetPasswordResponse>("/user/reset-password/", {
    method: "POST",
    body: {
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
      token: data.token,
    },
  });
}
