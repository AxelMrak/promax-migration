import {
  STATIC_PATH_NAMES,
  STATIC_PATH_PREFIXES,
  PUBLIC_PATHS,
} from "@/lib/proxy/paths";

export const isPublicPath = (pathname: string): boolean =>
  PUBLIC_PATHS.some(
    (publicPath) =>
      pathname === publicPath || pathname.startsWith(`${publicPath}/`),
  );

export const isAssetPath = (pathname: string): boolean => {
  if (STATIC_PATH_NAMES.includes(pathname)) return true;
  if (STATIC_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix)))
    return true;
  return /\.[a-z0-9]+$/i.test(pathname);
};
