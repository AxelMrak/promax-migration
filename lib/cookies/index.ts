import "server-only";

import { cookies } from "next/headers";
import type { setCookieOptions } from "@/lib/cookies/types";
import { IS_PROD } from "@/constants/env";

export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value;
}

export async function setCookie(
  name: string,
  value: string,
  options: setCookieOptions = {},
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: options.httpOnly ?? true,
    secure: options.secure ?? IS_PROD,
    sameSite: options.sameSite ?? "lax",
    maxAge: options.maxAge,
    path: options.path ?? "/",
  });
}

export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}
