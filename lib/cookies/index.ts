import "server-only";
import { cookies } from "next/headers";

const IS_PROD = process.env.NODE_ENV === "production";

export function getCookie(name: string): string | undefined {
  return cookies().get(name)?.value;
}

export function setCookie(
  name: string,
  value: string,
  options?: Partial<{
    expires: Date;
    maxAge: number;
    domain: string;
    path: string;
    secure: boolean;
    httpOnly: boolean;
    sameSite: "strict" | "lax" | "none";
  }>,
): void {
  cookies().set({
    name,
    value,
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    ...options,
  });
}

export function deleteCookie(name: string): void {
  cookies().delete(name);
}
