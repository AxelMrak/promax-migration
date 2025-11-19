"use client";

import { useCurrentUser } from "@/features/user/hooks/useCurrentUser";
import NavigationItem from "@/features/navigation/component/NavigationItem";
import { getRoutesForRole } from "@/features/navigation/routes";
import NavigationItemSkeleton from "./NavigationItemSkeleton";

export function Navigation() {
  const { data: user, isLoading } = useCurrentUser();
  return (
    <nav className="flex-1 overflow-y-auto w-full p-4">
      <ul className="space-y-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <NavigationItemSkeleton key={`skeleton-${index}`} depth={0} />
            ))
          : user
            ? getRoutesForRole(user.user_level).map((route, index) => (
              <NavigationItem
                key={`${route.label}-${index}`}
                item={route}
                depth={0}
              />
            ))
            : null}
      </ul>
    </nav>
  );
}
