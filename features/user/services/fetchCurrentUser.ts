"use server";
import { authApi } from "@/lib/api/client";
import { User } from "@/features/user/types";

export async function fetchCurrentUser(): Promise<User> {
  return authApi("/user/current/", {
    method: "GET",
  });
}
