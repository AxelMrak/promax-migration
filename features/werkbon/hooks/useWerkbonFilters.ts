"use client";

import { useState, useCallback, useMemo } from "react";
import {
  WerkbonFiltersSchema,
  type WerkbonFilters,
} from "@/features/werkbon/schema";

type ActiveFilters = Record<string, string>;

const EMPTY_API_FILTERS: WerkbonFilters = {};
const EMPTY_ACTIVE: ActiveFilters = {};
const ALL = "all";

export function useWerkbonFilters() {
  const [filters, setFilters] = useState<WerkbonFilters>(EMPTY_API_FILTERS);
  const [activeFilters, setActiveFilters] =
    useState<ActiveFilters>(EMPTY_ACTIVE);

  const convertToApi = useCallback((active: ActiveFilters): WerkbonFilters => {
    const api: WerkbonFilters = {};

    // Invoice status
    if (active.is_invoiced && active.is_invoiced !== ALL) {
      api.is_invoiced = active.is_invoiced === "true";
    }

    // Dates
    if (active.created_at_after && active.created_at_after !== ALL) {
      api.created_at_after = active.created_at_after;
    }
    if (active.created_at_before && active.created_at_before !== ALL) {
      api.created_at_before = active.created_at_before;
    }

    // License plate
    if (active.license_plate && active.license_plate !== ALL) {
      api.license_plate = active.license_plate;
    }

    // Product code
    if (active.exact_product_code && active.exact_product_code !== ALL) {
      api.exact_product_code = active.exact_product_code;
    }

    // User IDs (comma-separated string → number[])
    if (active.created_by && active.created_by !== ALL) {
      const userIds = active.created_by
        .split(",")
        .map((id) => parseInt(id.trim(), 10))
        .filter((id) => !Number.isNaN(id));

      if (userIds.length > 0) {
        api.created_by = userIds;
      }
    }

    // Search
    if (active.search && active.search !== ALL && active.search.trim()) {
      api.search = active.search.trim();
    }

    return api;
  }, []);

  const updateFilter = useCallback(
    (key: string, value: string) => {
      setActiveFilters((prev) => {
        const nextActive = { ...prev, [key]: value };
        const apiFilters = convertToApi(nextActive);

        const result = WerkbonFiltersSchema.safeParse(apiFilters);
        if (result.success) {
          setFilters(result.data);
        }

        return nextActive;
      });
    },
    [convertToApi],
  );

  const reset = useCallback(() => {
    setActiveFilters(EMPTY_ACTIVE);
    setFilters(EMPTY_API_FILTERS);
  }, []);

  const hasActiveFilters = useMemo(
    () =>
      Object.values(activeFilters).some(
        (value) => value && value !== ALL && value.trim() !== "",
      ),
    [activeFilters],
  );

  return {
    filters,
    activeFilters,
    updateFilter,
    reset,
    hasActiveFilters,
    toDto: () => filters,
  };
}
