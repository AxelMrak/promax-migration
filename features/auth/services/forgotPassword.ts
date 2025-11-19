"use server";
import { api } from "@/lib/api/client";
import { ForgotPasswordResponse } from "@/features/auth/types";
import { ForgotPasswordSchema } from "@/features/auth/schema";

export async function sendForgotPasswordEmail(data: ForgotPasswordSchema) {
  console.debug("sendForgotPasswordEmail", data);
  return api<ForgotPasswordResponse>("/user/forgot-password/", {
    method: "POST",
    body: data,
  });
}
