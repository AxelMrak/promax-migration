"use server";

import { authApi } from "@/lib/api/client";
import type { BaseData } from "@/features/base-data/types";

export async function fetchBaseData(): Promise<BaseData> {
  return authApi("/utils/base-data/", {
    method: "GET",
  });
}
