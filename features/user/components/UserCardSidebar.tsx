"use client";
import { useCurrentUser } from "@/features/user/hooks/useCurrentUser";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { RoleBadge } from "@/features/user/components/RoleBadge";
import UserCardSidebarSkeleton from "@/features/user/components/UserCardSidebarSkeleton";

export default function UserCardSidebar() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading || !user) {
    return <UserCardSidebarSkeleton />;
  }

  return (
    <section className="p-4  space-y-2">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 justify-between w-full">
            <p className="font-medium text-sm truncate">
              {user.first_name} {user.last_name}
            </p>
            <RoleBadge role={user.user_level} />
          </div>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/settings"
          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/90 transition-colors text-xs font-medium cursor-pointer border border-border"
        >
          <Settings className="h-3.5 w-3.5" />
          Settings
        </Link>
        <button
          onClick="/api/auth/logout"
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium w-full bg-background text-destructive border border-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          Uitloggen
        </button>
      </div>
    </section>
  );
}
