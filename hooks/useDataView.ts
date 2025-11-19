import { useState, useMemo, useEffect } from "react";

export interface FilterConfig {
  key: string;
  label: string;
  options: { label: string; value: string }[];
}

interface UseDataViewProps<T> {
  data: T[];
  filters?: FilterConfig[];
  searchKeys?: (keyof T)[];
  pageSize?: number;
}

export function useDataView<T>({
  data,
  filters = [],
  searchKeys = [],
  pageSize = 5,
}: UseDataViewProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {},
  );

  // Filter and Search Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // 1. Match Search Query
      const matchesSearch =
        searchKeys.length === 0 || searchQuery === ""
          ? true
          : searchKeys.some((key) => {
              const val = item[key];
              return String(val)
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            });

      // 2. Match Dynamic Filters
      const matchesFilters = filters.every((filter) => {
        const activeValue = activeFilters[filter.key];
        if (!activeValue || activeValue === "all") return true;
        return String(item[filter.key]) === activeValue;
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, searchQuery, activeFilters, searchKeys, filters]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilters]);

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    currentPage,
    setCurrentPage,
    paginatedData,
    totalPages,
    totalItems: filteredData.length,
  };
}
