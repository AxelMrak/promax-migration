"use server";

import { cookies } from "next/headers";
import { loginSchemaDef } from "@/features/auth/schema";
import { loginRequest } from "@/features/auth/services/login";
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from "@/constants/auth";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

export async function loginAction(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = loginSchemaDef.safeParse(raw);

  if (!parsed.success) {
    return { error: "Invalid credentials" };
  }

  try {
    const tokens = await loginRequest(parsed.data);

    const cookieStore = cookies() as unknown as ResponseCookies;
    cookieStore.set(ACCESS_COOKIE_NAME, tokens.access, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 15,
    });

    cookieStore.set(REFRESH_COOKIE_NAME, tokens.refresh, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true };
  } catch (err) {
    return { error: (err as Error).message };
  }
}
