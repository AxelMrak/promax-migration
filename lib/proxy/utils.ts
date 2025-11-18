import {
  STATIC_PATH_NAMES,
  STATIC_PATH_PREFIXES,
  PROTECTED_ROUTE_PREFIXES,
} from "@/lib/proxy/paths";

export const isProtectedPath = (pathname: string): boolean =>
  PROTECTED_ROUTE_PREFIXES.some(
    (prefix) =>
      pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

export const isAssetPath = (pathname: string): boolean => {
  if (STATIC_PATH_NAMES.includes(pathname)) return true;
  if (STATIC_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix)))
    return true;
  return /\.[a-z0-9]+$/i.test(pathname);
};
