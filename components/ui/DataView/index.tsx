"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Search as SearchIcon,
} from "lucide-react";
import { cn } from "@/lib/ui";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Card } from "@/components/ui/Card";
import { useDataView, FilterConfig } from "@/hooks/useDataView";

interface Column<T> {
  key: keyof T;
  header: string;
  className?: string;
  hidden?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataViewProps<T> {
  data: T[];
  columns: Column<T>[];
  filters?: FilterConfig[];
  searchKeys?: (keyof T)[];
  pageSize?: number;
  onRowClick?: (item: T) => void;
}

export function DataView<T extends { id: string | number }>({
  data,
  columns,
  filters = [],
  searchKeys = [],
  onRowClick,
  pageSize = 5,
}: DataViewProps<T>) {
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    currentPage,
    setCurrentPage,
    paginatedData,
    totalPages,
    totalItems,
  } = useDataView({ data, filters, searchKeys, pageSize });

  const visibleColumns = columns.filter((c) => !c.hidden);

  return (
    <div className="w-full space-y-4">
      {/* --- CONTROLS BAR --- */}
      <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative min-w-[200px] flex-1">
          <SearchIcon className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 md:max-w-sm"
          />
        </div>

        {/* Dynamic Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.length > 0 && (
            <div className="text-muted-foreground mr-2 flex items-center gap-2 text-sm">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters:</span>
            </div>
          )}
          {filters.map((filter) => (
            <Select
              key={filter.key}
              value={activeFilters[filter.key] || "all"}
              onValueChange={(val) => handleFilterChange(filter.key, val)}
            >
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder={`Filter by ${filter.label}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filter.label}s</SelectItem>
                {filter.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      </div>

      {/* --- DESKTOP VIEW (Table) --- */}
      <div className="hidden overflow-hidden rounded-lg border bg-card shadow-sm md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {visibleColumns.map((col) => (
                <TableHead key={String(col.key)} className={col.className}>
                  {col.header}
                </TableHead>
              ))}
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.length + 1}
                  className="h-32 text-center"
                >
                  <div className="text-muted-foreground flex flex-col items-center justify-center">
                    <SearchIcon className="mb-2 h-8 w-8 opacity-20" />
                    <p>No results found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item) => (
                <TableRow
                  key={item.id}
                  className={cn(
                    onRowClick && "cursor-pointer hover:bg-muted/50",
                  )}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {visibleColumns.map((col) => (
                    <TableCell
                      key={`${item.id}-${String(col.key)}`}
                      className={col.className}
                    >
                      {col.render
                        ? col.render(item)
                        : (item[col.key] as React.ReactNode)}
                    </TableCell>
                  ))}
                  <TableCell>
                    <ChevronRight className="text-muted-foreground h-4 w-4" />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- MOBILE VIEW (Cards) --- */}
      <div className="space-y-4 md:hidden">
        {paginatedData.length === 0 ? (
          <div className="text-muted-foreground py-10 text-center">
            No results found.
          </div>
        ) : (
          paginatedData.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col gap-3 p-4 transition-transform active:scale-[0.99]"
              onClick={() => onRowClick && onRowClick(item)}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between border-b pb-3">
                <div className="text-lg font-semibold">
                  {visibleColumns[0].render
                    ? visibleColumns[0].render(item)
                    : (item[visibleColumns[0].key] as React.ReactNode)}
                </div>
                {visibleColumns.length > 1 && (
                  <div>
                    {/* Optional: Attempt to render Status or second column in top right */}
                    {visibleColumns
                      .find((c) => c.key === "status" || c.header === "Status")
                      ?.render?.(item)}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="space-y-2 text-sm">
                {visibleColumns.slice(1).map((col) => {
                  if (col.key === "status") return null;
                  return (
                    <div
                      key={String(col.key)}
                      className="grid grid-cols-3 gap-2"
                    >
                      <span className="text-muted-foreground col-span-1 font-medium">
                        {col.header}:
                      </span>
                      <span className="col-span-2 break-words text-foreground">
                        {col.render
                          ? col.render(item)
                          : (item[col.key] as React.ReactNode)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                <span className="text-primary flex items-center gap-1 text-xs font-medium">
                  View Details <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* --- PAGINATION --- */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-muted-foreground text-xs">
            Page {currentPage} of {totalPages} ({totalItems} items)
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pNum = i + 1;
                if (totalPages > 5 && currentPage > 3)
                  pNum = currentPage - 2 + i;
                if (pNum > totalPages) return null;

                return (
                  <button
                    key={pNum}
                    onClick={() => setCurrentPage(pNum)}
                    className={cn(
                      "h-8 w-8 rounded-md text-xs font-medium transition-colors",
                      currentPage === pNum
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {pNum}
                  </button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
