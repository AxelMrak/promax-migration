// features/werkbon/components/WerkbonFiltersPanel.tsx
"use client";

import { useMemo } from "react";
import { Box, Truck, Users, X } from "lucide-react";

import { useBaseData } from "@/features/base-data/hooks/useBaseData";
import { SearchBar } from "@/components/ui/SearchBar";
import { DateRangeFilter } from "@/components/ui/DateRangeFilter";
import { MultiSelectFilter } from "@/components/ui/MultiSelectFilter";
import { DataSelect } from "@/components/ui/DataSelect";
import { Button } from "@/components/ui/Button";

import {
  WERKBON_STATUSES,
  WERKBON_INVOICE_MAP,
  WERKBON_REVERSE_INVOICE_MAP,
} from "@/features/werkbon/config/filters";
import { FilterField } from "@/components/ui/FilterField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { useVisibleUsers } from "@/features/user/hooks/useVisibleUsers";

interface WerkbonFiltersPanelProps {
  columns: Array<{
    header: string;
    searchable?: boolean;
  }>;
  activeFilters: Record<string, string>;
  updateFilter: (key: string, value: string) => void;
  reset: () => void;
  hasActiveFilters: boolean;
}

export function WerkbonFiltersPanel({
  activeFilters,
  updateFilter,
  reset,
  hasActiveFilters,
}: WerkbonFiltersPanelProps) {
  const { data: baseData, isLoading: isBaseDataLoading } = useBaseData();

  const { users, isLoading } = useVisibleUsers();

  const currentStatusValue =
    WERKBON_REVERSE_INVOICE_MAP[activeFilters.is_invoiced ?? "all"] || "all";
  const currentStatusObj = WERKBON_STATUSES.find(
    (s) => s.value === currentStatusValue,
  );

  const userOptions = users.map((user) => ({
    value: String(user.id),
    label: `${user.first_name} ${user.last_name}`,
  }));

  const licensePlateOptions =
    baseData?.trucks.map((truck) => ({
      value: truck.license_plate,
      label: truck.license_plate,
    })) ?? [];

  const productCodeOptions =
    baseData?.exact_codes.map((code) => ({
      value: code.code,
      label: `${code.code} - ${code.description}`,
    })) ?? [];

  const filtersActiveCount = useMemo(() => {
    return Object.keys(activeFilters).reduce((count, key) => {
      const value = activeFilters[key];
      if (value !== "all" && value !== "") return count + 1;
      return count;
    }, 0);
  }, [activeFilters]);

  return (
    <section className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-2">
          <FilterField label="Search Werkbons">
            <SearchBar
              value={activeFilters.search || ""}
              onChange={(value) => updateFilter("search", value)}
              placeholder="Search werkbons..."
            />
          </FilterField>
        </div>

        <FilterField label="Invoice Status">
          <Select
            value={currentStatusValue}
            onValueChange={(val) =>
              updateFilter(
                "is_invoiced",
                WERKBON_INVOICE_MAP[val as keyof typeof WERKBON_INVOICE_MAP],
              )
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {currentStatusObj && (
                  <Badge variant={currentStatusObj.variant} className="gap-1">
                    {currentStatusObj.icon && (
                      <currentStatusObj.icon className="h-3 w-3" />
                    )}
                    {currentStatusObj.label}
                  </Badge>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {WERKBON_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  <Badge variant={status.variant} className="gap-1">
                    {status.icon && <status.icon className="h-3 w-3" />}
                    {status.label}
                  </Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterField>

        <div className="sm:col-span-2 lg:col-span-1">
          <FilterField label="Date Range">
            <DateRangeFilter
              fromValue={activeFilters.created_at_after || ""}
              toValue={activeFilters.created_at_before || ""}
              onFromChange={(v) => updateFilter("created_at_after", v || "all")}
              onToChange={(v) => updateFilter("created_at_before", v || "all")}
            />
          </FilterField>
        </div>

        <FilterField label="Created by" icon={Users}>
          <MultiSelectFilter
            options={userOptions}
            value={
              activeFilters.created_by
                ? activeFilters.created_by.split(",")
                : []
            }
            onChange={(val) =>
              updateFilter("created_by", val.length ? val.join(",") : "all")
            }
            placeholder="Select users..."
          />
        </FilterField>

        <FilterField label="License Plate" icon={Truck}>
          <DataSelect
            isLoading={isBaseDataLoading}
            value={activeFilters.license_plate}
            onChange={(v) => updateFilter("license_plate", v)}
            options={licensePlateOptions}
            placeholder="Select license plate..."
            emptyLabel="All license plates"
          />
        </FilterField>

        <FilterField label="Product Code" icon={Box}>
          <DataSelect
            isLoading={isBaseDataLoading}
            value={activeFilters.exact_product_code}
            onChange={(v) => updateFilter("exact_product_code", v)}
            options={productCodeOptions}
            placeholder="Select product code..."
            emptyLabel="All product codes"
          />
        </FilterField>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <span className="text-sm text-muted-foreground">
          {filtersActiveCount} filter
          {filtersActiveCount === 1 ? "" : "s"} active
        </span>
        <Button variant="outline" onClick={reset} disabled={!hasActiveFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear all filters
        </Button>
      </div>
    </section>
  );
}
