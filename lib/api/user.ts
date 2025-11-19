"use server";
import { authApi } from "@/lib/api/client";

export async function fetchCurrentUser() {
  return authApi("/user/current/", {
    method: "GET",
  });
}
