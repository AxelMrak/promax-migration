"use client";

import { useMemo } from "react";
import { useCurrentUser } from "@/features/user/hooks/useCurrentUser";
import { useUsers } from "@/features/user/hooks/useUsers";
import { getVisibleUsersForRole } from "@/features/user/lib/getVisibleUsersForRole";

export function useVisibleUsers() {
  const { data: currentUser } = useCurrentUser();
  const { data: users = [], isLoading, error } = useUsers();

  const visibleUsers = useMemo(
    () => getVisibleUsersForRole(currentUser, users),
    [currentUser, users],
  );

  return {
    users: visibleUsers,
    isLoading,
    error,
  };
}
