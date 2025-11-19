import { useQuery } from "@tanstack/react-query";
import { fetchBaseData } from "@/features/base-data/services/fetchBaseData";

export function useBaseData() {
  return useQuery({
    queryKey: ["base-data"],
    queryFn: fetchBaseData,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });
}
