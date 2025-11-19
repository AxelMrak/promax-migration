import type { AppRouterInstance } from "next/navigation";
import type { RouteItemHref } from "@/features/navigation/types";

export function navigate(router: AppRouterInstance, href: RouteItemHref) {
  const target = typeof href === "string" ? href : href?.pathname;
  if (target) router.push(target);
}

export function isRouteActive(
  href: RouteItemHref,
  pathname: string | null,
): boolean {
  const target = typeof href === "string" ? href : href?.pathname;
  return !!target && pathname?.startsWith(target);
}
