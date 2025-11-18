import { BASE_API_URL } from "@/constants/env";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

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
      throw new Error(res.statusText);
    }
    throw new Error(parsed?.detail || res.statusText);
  }

  if (res.status === 204) return {} as T; // No Content
  return res.json();
}
