import { LoginSchema } from "@/features/auth/schema";
import { api } from "@/lib/api/client";

import { AuthTokens } from "@/features/auth/types";

export async function loginRequest(data: LoginSchema) {
  return api<AuthTokens>("/auth/token/", {
    method: "POST",
    body: {
      username: data.username,
      password: data.password,
    },
  });
}
