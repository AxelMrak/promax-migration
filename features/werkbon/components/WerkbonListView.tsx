"use client";

import { CheckCircle, Clock, Truck, Package } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

import { useWerkbonList } from "@/features/werkbon/hooks/useWerkbonList";
import { useWerkbonFilters } from "@/features/werkbon/hooks/useWerkbonFilters";
import type { Werkbon } from "@/features/werkbon/types";
import type { Column } from "@/hooks/useDataView";
import { WerkbonFiltersPanel } from "@/features/werkbon/components/WerkbonFiltersPanel";
import { DataView } from "@/components/ui/DataView";

export function WerkbonListView() {
  const { filters, activeFilters, updateFilter, reset, hasActiveFilters } =
    useWerkbonFilters();

  const { data, isLoading } = useWerkbonList(filters);

  const columns: Column<Werkbon>[] = [
    {
      key: "title",
      header: "Title",
      className: "font-medium",
      searchable: true,
      sortable: true,
    },
    {
      key: "exact_code",
      header: "Product Code",
      render: (item) => (
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <Package className="h-4 w-4" />
          <span className="text-sm">{item.exact_code?.code || "N/A"}</span>
        </div>
      ),
    },
    {
      key: "truck",
      header: "License Plate",
      render: (item) => (
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <Truck className="h-4 w-4 " />
          <span className="text-sm">{item.truck?.license_plate || "N/A"}</span>
        </div>
      ),
    },
    {
      key: "is_invoiced",
      header: "Status",
      className: "text-center",
      render: (item) => (
        <Badge
          variant={item.is_invoiced ? "success" : "warning"}
          size="xs"
          icon={
            item.is_invoiced ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <Clock className="h-3 w-3" />
            )
          }
        >
          {item.is_invoiced ? "Invoiced" : "Pending"}
        </Badge>
      ),
    },
  ];

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
