"use client";

import { useState, useCallback } from "react";
import { z } from "zod";
import type { WerkbonFilters } from "../types";

const WerkbonFiltersSchema = z.object({
  is_invoiced: z.boolean().optional(),
  created_by: z.array(z.number()).optional(),
  created_at_after: z.string().optional(),
  created_at_before: z.string().optional(),
  exact_product_code: z.string().optional(),
  license_plate: z.string().optional(),
  search: z.string().optional(),
});

export function useWerkbonFilters() {
  const [filters, setFilters] = useState<WerkbonFilters>({});
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {},
  );

  const convertToApi = useCallback(
    (activeFilters: Record<string, string>): WerkbonFilters => {
      const apiFilters: WerkbonFilters = {};

      // Invoice status
      if (activeFilters.is_invoiced && activeFilters.is_invoiced !== "all") {
        apiFilters.is_invoiced = activeFilters.is_invoiced === "true";
      }

      // Date filters
      if (
        activeFilters.created_at_after &&
        activeFilters.created_at_after !== "all"
      ) {
        apiFilters.created_at_after = activeFilters.created_at_after;
      }

      if (
        activeFilters.created_at_before &&
        activeFilters.created_at_before !== "all"
      ) {
        apiFilters.created_at_before = activeFilters.created_at_before;
      }

      // License plate
      if (
        activeFilters.license_plate &&
        activeFilters.license_plate !== "all"
      ) {
        apiFilters.license_plate = activeFilters.license_plate;
      }

      // Product code
      if (
        activeFilters.exact_product_code &&
        activeFilters.exact_product_code !== "all"
      ) {
        apiFilters.exact_product_code = activeFilters.exact_product_code;
      }

      // User IDs
      if (activeFilters.created_by && activeFilters.created_by !== "all") {
        const userIds = activeFilters.created_by
          .split(",")
          .map((id) => parseInt(id.trim()))
          .filter((id) => !isNaN(id));
        if (userIds.length > 0) {
          apiFilters.created_by = userIds;
        }
      }

      // Search
      if (
        activeFilters.search &&
        activeFilters.search !== "all" &&
        activeFilters.search.trim()
      ) {
        apiFilters.search = activeFilters.search.trim();
      }

      return apiFilters;
    },
    [],
  );

  const updateFilter = useCallback(
    (key: string, value: string) => {
      setActiveFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        const apiFilters = convertToApi(newFilters);

        // Validate with Zod
        const result = WerkbonFiltersSchema.safeParse(apiFilters);
        if (result.success) {
          setFilters(result.data);
        }

        return newFilters;
      });
    },
    [convertToApi],
  );

  const reset = useCallback(() => {
    setActiveFilters({});
    setFilters({});
  }, []);

  const hasActiveFilters = Object.values(activeFilters).some(
    (value) => value && value !== "all" && value.trim() !== "",
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

