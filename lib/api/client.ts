import { BASE_API_URL } from "@/constants/env";
import { getCookie } from "@/lib/cookies";
import type { RequestOptions } from "@/lib/api/types";
import { ACCESS_COOKIE_NAME } from "@/constants/auth";
import { ApiError } from "@/lib/api/error";

function isFormData(value: unknown): value is FormData {
  return typeof FormData !== "undefined" && value instanceof FormData;
}

export async function api<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    headers = {},
    cache = "no-store",
    next,
  } = options;

  const isForm = isFormData(body);

  const res = await fetch(`${BASE_API_URL}${path}`, {
    method,
    body: isForm ? (body as FormData) : body ? JSON.stringify(body) : undefined,
    headers: {
      ...(isForm ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    cache,
    next,
  });

  if (!res.ok) {
    const text = await res.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new ApiError(res.statusText, res.status);
    }
    const errorMessage = parsed?.detail || parsed?.message || parsed?.error || res.statusText;
    throw new ApiError(errorMessage, res.status, parsed);
  }

  if (res.status === 204) return {} as T;
  return res.json();
}

export async function authApi<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const accessToken = await getCookie(ACCESS_COOKIE_NAME);
  return api<T>(path, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      credentials: "include",
    },
  });
}
