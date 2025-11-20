import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWerkbon } from "@/features/werkbon/services/api";

export function useDeleteWerkbon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteWerkbon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["werkbon", "list"] });
    },
  });
}
