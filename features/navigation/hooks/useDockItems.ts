import { Home, Plus } from "lucide-react";
import type { MenuDockItem } from "@/components/layout/MenuDock";
import type { User } from "@/types";
import { getRoutesForRole } from "@/features/navigation/routes";

export function useDockItems(user?: User): MenuDockItem[] {
  if (!user) return [];

  const baseRoutes = getRoutesForRole(user.user_level).map((route) => ({
    label: route.label,
    icon: route.icon ?? Home,
    href: route.href,
  }));

  const profileItem: MenuDockItem = {
    label: "Menu",
    isProfile: true,
  };

  const actionItem: MenuDockItem = {
    label: "Nieuw",
    icon: Plus,
    href: "/werkbonnen/nieuw",
    isAction: true,
  };

  const navItems = [...baseRoutes, profileItem];
  const mid = Math.ceil(navItems.length / 2);

  return [...navItems.slice(0, mid), actionItem, ...navItems.slice(mid)];
}
