import { useQuery } from "@tanstack/react-query";
import { fetchWerkbonList } from "@/features/werkbon/services/api";
import type { WerkbonFilters } from "@/features/werkbon/types";

export function useWerkbonList(filters: WerkbonFilters) {
  return useQuery({
    queryKey: ["werkbon", "list", filters],
    queryFn: () => fetchWerkbonList(filters),
    staleTime: 60_000,
  });
}
