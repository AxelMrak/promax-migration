"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { useDataView, type Column } from "@/hooks/useDataView";
import DataViewHeader from "@/components/ui/DataView/DataViewHeader";
import DataViewTable from "@/components/ui/DataView/DataViewTable";
import DataViewGrid from "@/components/ui/DataView/DataViewGrid";
import DataViewTableSkeleton from "@/components/ui/DataView/DataViewTableSkeleton";
import DataViewGridSkeleton from "@/components/ui/DataView/DataViewGridSkeleton";
import { useResponsiveViewMode } from "@/hooks/useResponsiveViewMode";

interface DataViewProps<T> {
  data: T[];
  columns: Column<T>[];
  searchQuery?: string;
  onRowClick?: (item: T) => void;
  onDelete?: (item: T) => void;
  onShare?: (item: T) => void;
  pageSize?: number;
  isLoading?: boolean;
}

//TODO: THIS SHOULD BE A FEATURE ON /FEATURES/DATAVIEW with logic and components associated
export function DataView<T extends { id: string | number }>({
  data,
  columns,
  searchQuery = "",
  onRowClick,
  onDelete,
  onShare,
  pageSize = 10,
  isLoading = false,
}: DataViewProps<T>) {
  const [viewMode, setViewMode] = useResponsiveViewMode();
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());

  const visibleColumns = useMemo(
    () =>
      columns.filter(
        (col) => col.key !== "id" && !hiddenColumns.has(String(col.key)),
      ),
    [columns, hiddenColumns],
  );

  const toggleColumnVisibility = (columnKey: string) => {
    setHiddenColumns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(columnKey)) {
        newSet.delete(columnKey);
      } else {
        newSet.add(columnKey);
      }
      return newSet;
    });
  };

  const {
    data: tableData,
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage,
    sortKey,
    sortOrder,
    handleSort,
  } = useDataView({
    data,
    columns: visibleColumns,
    pageSize,
    searchQuery,
  });

  const getSortIcon = (columnKey: keyof T) => {
    if (sortKey !== columnKey) {
      return <ArrowUpDown className="ml-1 h-3 w-3" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="ml-1 h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1 h-3 w-3" />
    );
  };

  const handleRowAction = (action: string, item: T) => {
    switch (action) {
      case "delete":
        onDelete?.(item);
        break;
      case "share":
        onShare?.(item);
        break;
    }
  };

  return (
    <div className="space-y-4">
      <DataViewHeader
        isLoading={isLoading}
        viewMode={viewMode}
        setViewMode={setViewMode}
        columns={columns}
        hiddenColumns={hiddenColumns}
        setHiddenColumns={setHiddenColumns}
        toggleColumnVisibility={toggleColumnVisibility}
      />

      {viewMode === "table" ? (
        isLoading ? (
          <DataViewTableSkeleton
            visibleColumns={visibleColumns}
            rowCount={pageSize}
          />
        ) : (
          <DataViewTable
            data={tableData}
            visibleColumns={visibleColumns}
            onRowClick={onRowClick}
            handleSort={handleSort}
            getSortIcon={getSortIcon}
            handleRowAction={handleRowAction}
          />
        )
      ) : isLoading ? (
        <DataViewGridSkeleton
          visibleColumns={visibleColumns}
          cardCount={pageSize}
        />
      ) : (
        <DataViewGrid
          data={tableData}
          visibleColumns={visibleColumns}
          onRowClick={onRowClick}
          handleRowAction={handleRowAction}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
      />
    </div>
  );
}
