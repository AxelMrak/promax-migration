"use client";

import { useWerkbonList } from "@/features/werkbon/hooks/useWerkbonList";
import { useWerkbonFilters } from "@/features/werkbon/hooks/useWerkbonFilters";
import type { Werkbon } from "@/features/werkbon/types";
import { WerkbonFiltersPanel } from "@/features/werkbon/components/WerkbonFiltersPanel";
import { DataView } from "@/components/ui/DataView";
import { columns } from "@/features/werkbon/config/columns";

export function WerkbonListView() {
  const { filters, activeFilters, updateFilter, reset, hasActiveFilters } =
    useWerkbonFilters();

  const { data, isLoading } = useWerkbonList(filters);

  const handleRowClick = (werkbon: Werkbon) => {
    console.log("Navigate to werkbon:", werkbon.id);
  };

  const handleDelete = (werkbon: Werkbon) => {
    console.log("Delete werkbon:", werkbon.id);
  };

  const handleShare = (werkbon: Werkbon) => {
    console.log("Share werkbon:", werkbon.id);
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
