import { fetchCurrentUser } from "@/lib/api/user";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser(): ReturnType<typeof useQuery> {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
  });
}
