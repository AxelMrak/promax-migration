"use client";

import { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/ui";

import { useCurrentUser } from "@/features/user/hooks/useCurrentUser";
import { useDockItems } from "@/features/navigation/hooks/useDockItems";
import { navigate, isRouteActive } from "@/features/navigation/utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import MenuDockSkeleton from "@/components/layout/MenuDock/MenuDockSkeleton";
import MenuDockActionBtn from "./MenuDockActionBtn";
import MenuDockProfileBtn from "./MenuDockProfileBtn";

export function MenuDock() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useCurrentUser();
  const items = useDockItems(user);

  const activeIndex = items.findIndex((item) =>
    isRouteActive(item.href, pathname),
  );

  const isActionActive = activeIndex !== -1 && items[activeIndex].isAction;
  if (isLoading) {
    return <MenuDockSkeleton />;
  }

  return (
    <div className="fixed bottom-3 left-1/2 z-50 -translate-x-1/2 md:hidden">
      <nav className="relative flex h-14 w-[95vw] max-w-md items-center rounded-2xl border border-border/50 bg-background/90 px-1 shadow-2xl backdrop-blur-xl">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          if (item.isAction) {
            return (
              <MenuDockActionBtn
                key="action"
                item={item}
                isActive={isActionActive}
              />
            );
          }

          if (item.isProfile) {
            return (
              <MenuDockProfileBtn
                key="profile"
                item={item}
                isActive={isActive}
                user={user}
              />
            );
          }

          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => navigate(router, item.href)}
              className="group flex flex-1 flex-col items-center justify-center py-1 cursor-pointer"
            >
              <Icon
                size={20}
                className={cn(
                  "transition-all",
                  isActive
                    ? "text-primary scale-110"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              <span
                className={cn(
                  "mt-0.5 text-[9px] font-medium",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
