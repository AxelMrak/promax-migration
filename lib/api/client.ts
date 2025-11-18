import { BASE_API_URL } from "@/constants/env";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

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
    throw new ApiError(parsed?.detail || res.statusText, res.status, parsed);
  }

  if (res.status === 204) return {} as T;
  return res.json();
}
