"use client";
import { useState, useRef } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { cn } from "@/lib/ui";
import { Moon, Sun, LogOut } from "lucide-react";

import { RoleBadge } from "@/features/user/components/RoleBadge";
import { useCurrentUser } from "@/features/user/hooks/useCurrentUser";
import type { MenuDockItem } from "@/components/layout/MenuDock";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Skeleton } from "@/components/feedback/Skeleton";
export default function MenuDockProfileBtn({
  item,
  isActive,
  user,
  userIsLoading,
}: {
  item: MenuDockItem;
  isActive: boolean;
  user?: ReturnType<typeof useCurrentUser>["data"];
  userIsLoading?: boolean;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const profileRef = useRef<HTMLDivElement>(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  //TODO: Fix all errors
  useClickOutside(profileRef, () => setIsProfileOpen(false));

  const toggleTheme = () => {
    const next = resolvedTheme === "light" ? "dark" : "light";
    document.startViewTransition
      ? document.startViewTransition(() => setTheme(next))
      : setTheme(next);
  };

  return (
    <div
      key="profile"
      ref={profileRef}
      className="relative flex flex-1 justify-center"
    >
      <button
        className="group relative z-10 flex flex-col items-center justify-center py-1"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        <div
          className={cn(
            "relative h-6 w-6 overflow-hidden rounded-full border transition-all",
            isActive
              ? "border-primary ring-1 ring-primary/20"
              : "border-transparent",
          )}
        >
          <Image
            src="/logo/promax.svg"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
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

      <div
        className={cn(
          "absolute bottom-full right-0 mb-3 w-48 rounded-xl border border-muted bg-popover p-1 text-popover-foreground shadow-lg origin-bottom-right transition-all",
          isProfileOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-2 opacity-0 scale-95 pointer-events-none",
        )}
      >
        <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground border-b border-muted mb-1">
          {userIsLoading ? (
            <Skeleton className="h-4 w-20 rounded" />
          ) : (
            <span>
              {user?.first_name} {user?.last_name}
            </span>
          )}
          {userIsLoading ? (
            <Skeleton className="h-4 w-12 rounded" />
          ) : (
            user && <RoleBadge role={user.user_level} />
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="flex w-full items-center justify-between rounded-sm px-2 py-2 text-sm hover:bg-accent transition-colors"
        >
          <div className="flex items-center gap-2">
            {resolvedTheme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            <span>Thema</span>
          </div>
          <div
            className={cn(
              "h-5 w-9 rounded-full p-0.5 transition-colors  cursor-pointer",
              resolvedTheme === "dark" ? "bg-primary" : "bg-gray-200",
            )}
          >
            <div
              className={cn(
                "h-4 w-4 rounded-full bg-white shadow-sm transition-transform ",
                resolvedTheme === "dark" ? "translate-x-4" : "translate-x-0",
              )}
            />
          </div>
        </button>

        <button
          onClick={() => {
            setIsProfileOpen(false);
            console.log("Logout triggered");
          }}
          className="mt-1 flex w-full items-center px-2 py-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive rounded-sm transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Uitloggen</span>
        </button>
      </div>
    </div>
  );
}
