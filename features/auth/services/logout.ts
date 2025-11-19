import { authApi } from "@/lib/api/client";

export async function logoutRequest() {
  return authApi<void>("/auth/logout/", {
    method: "POST",
  });
}
