import { fetchCurrentUser } from "@/features/user/services/fetchCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/features/user/types";

export function useCurrentUser() {
  return useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
  });
}
