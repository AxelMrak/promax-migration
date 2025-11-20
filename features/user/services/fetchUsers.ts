"use server";

import { authApi } from "@/lib/api/client";
import type { User } from "@/features/user/types";

export async function fetchUsers(): Promise<User[]> {
  return authApi("/user/", { method: "GET" });
}
