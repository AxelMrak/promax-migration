import { authApi } from "@/lib/api/client";

export async function fetchCurrentUser() {
  const res = await authApi("/user/current/", {
    method: "GET",
  });

  if (!res) {
    throw new Error("Failed to fetch current user");
  }

  return res;
}
