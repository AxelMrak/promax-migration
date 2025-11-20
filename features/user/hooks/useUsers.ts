"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/features/user/services/fetchUsers";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
