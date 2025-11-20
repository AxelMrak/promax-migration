"use client";

import { useState, useEffect } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { useDataView, type Column } from "@/hooks/useDataView";
import DataViewHeader from "./DataViewHeader";
import DataViewTable from "./DataViewTable";
import DataViewGrid from "./DataViewGrid";
import DataViewTableSkeleton from "./DataViewTableSkeleton";
import DataViewGridSkeleton from "./DataViewGridSkeleton";

interface DataViewProps<T> {
  data: T[];
  columns: Column<T>[];
  searchQuery?: string;
  onRowClick?: (item: T) => void;
  onDelete?: (item: T) => void;
  onShare?: (item: T) => void;
  emptyMessage?: string;
  pageSize?: number;
  isLoading?: boolean;
}

export function DataView<T extends { id: string | number }>({
  data,
  columns,
  searchQuery = "",
  onRowClick,
  onDelete,
  onShare,
  emptyMessage = "No data found",
  pageSize = 10,
  isLoading = false,
}: DataViewProps<T>) {
  // Responsive default view mode
  const getDefaultViewMode = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 ? "grid" : "table";
    }
    return "table";
  };

  const [viewMode, setViewMode] = useState<"table" | "grid">(
    getDefaultViewMode(),
  );
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Update view mode and mobile detection on window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
    };

    if (typeof window !== "undefined") {
      handleResize(); // Initial check
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Remove viewMode dependency

  const visibleColumns = columns.filter(
    (col) => col.key !== "id" && !hiddenColumns.has(String(col.key)),
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
    columns: columns.filter((col) => !hiddenColumns.has(String(col.key))),
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
    console.log("handleRowAction called:", action, item);
    switch (action) {
      case "delete":
        if (onDelete) {
          onDelete(item);
        } else {
          console.log("Delete action:", item);
        }
        break;
      case "share":
        if (onShare) {
          onShare(item);
        } else {
          console.log("Share action:", item);
        }
        break;
      default:
        console.log("Unknown action:", action);
    }
  };

  return (
    <div className="space-y-4">
      {/* View Toggle and Column Selector */}
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
        /* Table View */
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
      ) : /* Grid View */
      isLoading ? (
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
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
      />
    </div>
  );
}
