import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWerkbon } from "@/features/werkbon/services/api";

export function useCreateWerkbon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => createWerkbon(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["werkbon", "list"] });
    },
  });
}
