"use client";

import React from "react";
import {
  useRouter,
  usePathname,
  type AppRouterInstance,
} from "next/navigation";
import { cn } from "@/lib/ui";
import { getRoutesForRole } from "@/features/navigation/routes";
import type { RouteItemHref } from "@/features/navigation/types";
import { useCurrentUser } from "@/features/user/hooks/useCurrentUser";
import { Home, type LucideIcon } from "lucide-react";

export interface MenuDockItem {
  label: string;
  icon: LucideIcon;
  href: RouteItemHref;
}

export interface MenuDockProps {
  className?: string;
  showLabels?: boolean;
}

export const MenuDock: React.FC<MenuDockProps> = ({
  className,
  showLabels = true,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useCurrentUser();
  const items: MenuDockItem[] = user
    ? getRoutesForRole(user.user_level).map((route) => ({
        label: route.label,
        icon: route.icon ?? Home,
        href: route.href,
      }))
    : [];

  if (isLoading) {
    return (
      <nav
        className={cn(
          "fixed bottom-3 left-1/2 z-50 flex h-14 w-[90%] max-w-sm -translate-x-1/2 items-center justify-between rounded-2xl border bg-background/95 px-1.5 shadow-xl backdrop-blur-xl md:hidden",
          className,
        )}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-1 flex-col items-center justify-center gap-1"
          >
            <div className="h-4 w-4 rounded bg-muted animate-pulse" />
            {showLabels && (
              <div className="h-2 w-10 rounded bg-muted animate-pulse" />
            )}
          </div>
        ))}
      </nav>
    );
  }

  if (items.length === 0) return null;

  const itemWidthPercent = 100 / items.length;
  const activeIndex = items.findIndex((item) =>
    isActiveHref(item.href, pathname),
  );
  const hasActiveItem = activeIndex >= 0;
  const indicatorStyle: React.CSSProperties = {
    width: `calc(${itemWidthPercent}% - 0.5rem)`,
    left: `calc(${(hasActiveItem ? activeIndex : 0) * itemWidthPercent}% + 0.25rem)`,
    opacity: hasActiveItem ? 1 : 0,
  };

  return (
    <nav
      className={cn(
        "fixed bottom-3 left-1/2 z-50 flex h-14 w-[90%] max-w-sm -translate-x-1/2 items-center rounded-2xl border bg-background/90 px-1.5 shadow-2xl backdrop-blur-xl md:hidden",
        className,
      )}
    >
      <div
        className="absolute inset-y-1.5 z-0 rounded-xl bg-accent/50 transition-[left,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={indicatorStyle}
      >
        <div className="absolute bottom-1 left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-primary" />
      </div>

      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const IconComponent = item.icon;

        return (
          <button
            key={`${item.label}-${index}`}
            className="group relative z-10 flex flex-1 flex-col items-center justify-center py-0.5 outline-none"
            onClick={() => handleNavigate(router, item.href)}
            type="button"
          >
            <IconComponent
              className={cn(
                "h-4 w-4 transition-all duration-300",
                isActive
                  ? "text-primary scale-110"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
            />

            {showLabels && (
              <span
                className={cn(
                  "mt-1 text-[10px] font-medium transition-all duration-300",
                  isActive
                    ? "text-primary opacity-100"
                    : "text-muted-foreground opacity-80 group-hover:opacity-100",
                )}
              >
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

const resolveHref = (href: RouteItemHref): string | null => {
  return typeof href === "string" ? href : href.pathname ?? null;
};

const isActiveHref = (href: RouteItemHref, pathname: string | null): boolean => {
  const target = resolveHref(href);
  if (!target || !pathname) return false;
  if (target === "/") return pathname === "/";
  return pathname === target || pathname.startsWith(`${target}/`);
};

const handleNavigate = (router: AppRouterInstance, href: RouteItemHref) => {
  const target = resolveHref(href);
  if (!target) return;
  router.push(target);
};
