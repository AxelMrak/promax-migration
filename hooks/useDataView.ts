"use client";

import { useState, useMemo, useEffect } from "react";

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  searchable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

export interface UseDataViewProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  searchQuery?: string;
  filters?: Record<string, any>;
}

export function useDataView<T>({
  data,
  columns,
  pageSize = 10,
  searchQuery = "",
  filters = {},
}: UseDataViewProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchQuery.trim()) {
      const searchableColumns = columns
        .filter((col) => col.searchable !== false)
        .map((col) => col.key);

      result = result.filter((item) =>
        searchableColumns.some((key) => {
          const value = item[key];
          return String(value)
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }),
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "all" &&
        value !== ""
      ) {
        result = result.filter((item) => {
          const itemValue = item[key as keyof T];

          if (Array.isArray(value)) {
            return value.includes(itemValue);
          }

          if (typeof value === "boolean") {
            return itemValue === value;
          }

          if (typeof value === "string" && value.includes(",")) {
            const values = value.split(",").map((v) => v.trim());
            return values.includes(String(itemValue));
          }

          return String(itemValue)
            .toLowerCase()
            .includes(String(value).toLowerCase());
        });
      }
    });

    return result;
  }, [data, searchQuery, filters, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return {
    data: paginatedData,
    totalItems: sortedData.length,
    totalPages,
    currentPage,
    setCurrentPage,
    sortKey,
    sortOrder,
    handleSort,
  };
}

