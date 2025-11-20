import type { RouteItemHref } from "@/features/navigation/types";

type RouterInstance = { push: (href: string) => void };

export function navigate(router: RouterInstance, href: RouteItemHref) {
  const target = typeof href === "string" ? href : href?.pathname;
  if (target) router.push(target);
}

export function isRouteActive(
  href: RouteItemHref,
  pathname: string | null,
): boolean {
  const target = typeof href === "string" ? href : href?.pathname;
  return !!target && !!pathname && pathname.startsWith(target);
}
