import { useQuery } from "@tanstack/react-query";
import { fetchWerkbonById } from "@/features/werkbon/services/api";

export function useWerkbon(id: number) {
  return useQuery({
    queryKey: ["werkbon", id],
    queryFn: () => fetchWerkbonById(id),
    staleTime: 60_000,
  });
}
