"use client";

import { usePathname } from "next/navigation";

import { useCurrentUser } from "@/features/user/hooks/useCurrentUser";
import { useDockItems } from "@/features/navigation/hooks/useDockItems";
import { isRouteActive } from "@/features/navigation/utils";
import MenuDockSkeleton from "@/components/layout/MenuDock/MenuDockSkeleton";
import MenuDockActionBtn from "./MenuDockActionBtn";
import MenuDockProfileBtn from "./MenuDockProfileBtn";
import MenuDockItemButton from "./MenuDockItemButton";

export function MenuDock() {
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
    <div className="fixed bottom-0  z-50  md:hidden">
      <nav className="relative flex h-18 w-screen max-w-md items-center rounded-xl border border-border/50 bg-background/90 px-1 shadow-2xl backdrop-blur-xl">
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
            <MenuDockItemButton
              key={item.label}
              item={item}
              isActive={isActive}
              Icon={Icon}
            />
          );
        })}
      </nav>
    </div>
  );
}
