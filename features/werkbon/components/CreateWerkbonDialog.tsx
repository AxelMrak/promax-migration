"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { LayoutIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import CreateWerkbonForm from "@/features/werkbon/components/CreateWerkbonForm";
import { useCreateWerkbon } from "@/features/werkbon/hooks/useCreateWerkbon";
import { toast } from "react-hot-toast";

export default function CreateWerkbonDialog({ isOpen }: { isOpen: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { mutateAsync } = useCreateWerkbon();

  const closeModal = () => {
    params.delete("action");
    router.replace(`?${params.toString()}`);
  };

  async function handleSubmit(formData: FormData) {
    await toast.promise(mutateAsync(formData), {
      loading: "Werkbon wordt aangemaakt...",
      success: (result) => {
        console.debug("Created werkbon:", result);
        router.replace(`/${result.id}`);
        return `Werkbon #${result.id} succesvol aangemaakt`;
      },
      error: (err) => (err instanceof Error ? err.message : "Aanmaken mislukt"),
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LayoutIcon className="h-6 w-6 text-primary" />
            Nieuw Werkbon
          </DialogTitle>
          <DialogDescription>
            Maak een nieuw werkbon aan met afbeeldingen
          </DialogDescription>
        </DialogHeader>
        <CreateWerkbonForm onSubmit={handleSubmit} onCancel={closeModal} />
      </DialogContent>
    </Dialog>
  );
}
