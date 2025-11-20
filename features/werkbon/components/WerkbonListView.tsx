"use client";

import { useWerkbonList } from "@/features/werkbon/hooks/useWerkbonList";
import { useWerkbonFilters } from "@/features/werkbon/hooks/useWerkbonFilters";
import type { Werkbon } from "@/features/werkbon/types";
import { WerkbonFiltersPanel } from "@/features/werkbon/components/WerkbonFiltersPanel";
import { DataView } from "@/components/ui/DataView";
import { columns } from "@/features/werkbon/config/columns";
import { useDeleteWerkbon } from "@/features/werkbon/hooks/useDeleteWerkbon";
import { toast } from "react-hot-toast";
import { useShare } from "@/hooks/useShare";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/api/error";

export function WerkbonListView() {
  const { filters, activeFilters, updateFilter, reset, hasActiveFilters } =
    useWerkbonFilters();
  const { share } = useShare<Werkbon>();
  const { data, isLoading } = useWerkbonList(filters);
  const deleteMutation = useDeleteWerkbon();
  const router = useRouter();

  // TODO: FIX SORT logic in useWerkbonList when clicking on column headers (Title works, but another columns do not)
  const handleRowClick = (werkbon: Werkbon) => {
    router.push(`/werkbon/${werkbon.id}`);
  };

  const handleDelete = async (werkbon: Werkbon) => {
    await toast.promise(deleteMutation.mutateAsync(werkbon.id), {
      loading: "Deleting werkbon...",
      success: "Werkbon deleted",
      error: (err) => getErrorMessage(err) || "Failed to delete werkbon",
    });
  };

  const handleShare = (werkbon: Werkbon) => {
    console.log("Deel werkbon:", werkbon.id);
    share(werkbon, {
      title: (item) => `Werkbon: #${item.id}`,
      text: (item) =>
        `Details van werkbon #${item.id}: ${item.is_invoiced ? "Gefactureerd" : "Niet gefactureerd"}, productcode ${item.exact_code?.code || "onbekend"} en voertuig met kenteken ${item.truck?.license_plate || "onbekend"}.`,
      url: (item) => `${window.location.origin}/werkbon/${item.id}`,
    });
  };

  return (
    <div className="w-full space-y-8">
      <WerkbonFiltersPanel
        columns={columns}
        activeFilters={activeFilters}
        updateFilter={updateFilter}
        reset={reset}
        hasActiveFilters={hasActiveFilters}
      />
      <DataView
        data={data || []}
        columns={columns}
        searchQuery={activeFilters.search || ""}
        onRowClick={handleRowClick}
        onDelete={handleDelete}
        onShare={handleShare}
        isLoading={isLoading}
      />
    </div>
  );
}
