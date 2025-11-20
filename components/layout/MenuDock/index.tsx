"use client";

import { usePathname } from "next/navigation";

import { useCurrentUser } from "@/features/user/hooks/useCurrentUser";
import { useDockItems } from "@/features/navigation/hooks/useDockItems";
import { isRouteActive } from "@/features/navigation/utils";
import MenuDockSkeleton from "@/components/layout/MenuDock/MenuDockSkeleton";
import MenuDockActionBtn from "@/components/layout/MenuDock/MenuDockActionBtn";
import MenuDockProfileBtn from "@/components/layout/MenuDock/MenuDockProfileBtn";
import MenuDockItemButton from "@/components/layout/MenuDock/MenuDockItemButton";
import type { RouteItemHref } from "@/features/navigation/types";

export interface MenuDockItem {
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href?: RouteItemHref;
  isProfile?: boolean;
  isAction?: boolean;
}

export function MenuDock() {
  const pathname = usePathname();
  const { data: user, isLoading } = useCurrentUser();
  const items = useDockItems(user);

  const activeIndex = items.findIndex((item) =>
    item.href ? isRouteActive(item.href, pathname) : false,
  );

  const isActionActive = activeIndex !== -1 && !!items[activeIndex]?.isAction;

  if (isLoading) {
    return <MenuDockSkeleton />;
  }

  return (
    <div className="fixed bottom-0  z-50  md:hidden">
      <nav className="relative flex h-18 w-screen max-w-md items-center rounded-xl border border-border/50 bg-background/90 px-1 shadow-2xl backdrop-blur-xl">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          if (item.isAction) {
            if (!item.href) return null;
            return (
              <MenuDockActionBtn
                key="action"
                item={{ label: item.label, href: item.href }}
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
          if (!item.href || !Icon) return null;
          return (
            <MenuDockItemButton
              key={item.label}
              item={{ label: item.label, href: item.href }}
              isActive={isActive}
              Icon={Icon}
            />
          );
        })}
      </nav>
    </div>
  );
}
