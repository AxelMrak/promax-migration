"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useBaseData } from "@/features/base-data/hooks/useBaseData";
import { SearchBar } from "@/components/ui/SearchBar";
import { DateRangeFilter } from "@/components/ui/DateRangeFilter";
import { MultiSelectFilter } from "@/components/ui/MultiSelectFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { Badge } from "@/components/ui/Badge";
import { Box, Truck, Users, CheckCircle, Clock, Search, X } from "lucide-react";
import { cn } from "@/lib/ui";
import { Button } from "@/components/ui/Button";

const MOCK_USERS = [
  { value: "1", label: "John Doe" },
  { value: "2", label: "Jane Smith" },
  { value: "3", label: "Mike Johnson" },
  { value: "4", label: "Sarah Wilson" },
];

const STATUSES = [
  { value: "all", label: "All Statuses", variant: "outline" as const },
  {
    value: "invoiced",
    label: "Invoiced",
    icon: CheckCircle,
    variant: "success" as const,
  },
  {
    value: "pending",
    label: "Pending",
    icon: Clock,
    variant: "warning" as const,
  },
];

const INVOICE_MAP = {
  invoiced: "true",
  pending: "false",
  all: "all",
};

const REVERSE_INVOICE_MAP: Record<string, string> = {
  true: "invoiced",
  false: "pending",
  all: "all",
};

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

const FilterWrapper = ({
  label,
  icon: Icon,
  children,
  className,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col items-start gap-2 w-full", className)}>
    <span className="text-sm font-medium flex items-center gap-1">
      {Icon && <Icon className="h-4 w-4" />}
      {label}:
    </span>
    {children}
  </div>
);

const DataSelectSkeleton = ({ widthClass }: { widthClass: string }) => {
  return (
    <div
      className={cn(
        "h-9 rounded-md border border-input bg-background",
        widthClass,
      )}
    >
      <div className="flex items-center h-full px-3 gap-2">
        <Skeleton className="h-4 flex-1 max-w-[60%]" />
        <Skeleton className="h-3 w-3" />
      </div>
    </div>
  );
};

const DataSelect = ({
  isLoading,
  value,
  onChange,
  options,
  placeholder,
  widthClass,
  emptyLabel,
}: {
  isLoading: boolean;
  value: string | undefined | null;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  widthClass: string;
  emptyLabel: string;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    } else if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;

    const query = searchQuery.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(query));
  }, [options, searchQuery]);

  if (isLoading) {
    return <DataSelectSkeleton widthClass={widthClass} />;
  }

  const safeValue = value === "all" || !value ? "" : value;
  const selectedOption = options.find((opt) => opt.value === safeValue);

  return (
    <Select
      value={safeValue}
      onValueChange={(val) => onChange(val || "all")}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SelectTrigger className={cn(widthClass, "w-full")}>
        <SelectValue placeholder={placeholder}>
          {selectedOption?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <div className="p-2 border-b border-border sticky top-0 bg-background z-10">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-8 pr-8 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary h-9 text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        <SelectItem value="">{emptyLabel}</SelectItem>

        {filteredOptions.length === 0 ? (
          <div className="px-2 py-6 text-center text-sm text-muted-foreground">
            No results found
          </div>
        ) : (
          filteredOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export function WerkbonFiltersPanel({
  columns,
  activeFilters,
  updateFilter,
  reset,
  hasActiveFilters,
}: WerkbonFiltersPanelProps) {
  const { data: baseData, isLoading: isBaseDataLoading } = useBaseData();

  const currentStatusValue =
    REVERSE_INVOICE_MAP[activeFilters.is_invoiced ?? "all"] || "all";
  const currentStatusObj = STATUSES.find((s) => s.value === currentStatusValue);

  const searchableFields = useMemo(
    () =>
      columns
        .filter((col) => col.searchable !== false)
        .map((col) => col.header.toLowerCase())
        .join(", "),
    [columns],
  );

  const licensePlateOptions = useMemo(
    () =>
      baseData?.trucks.map((truck) => ({
        value: truck.license_plate,
        label: truck.license_plate,
      })) || [],
    [baseData?.trucks],
  );

  const productCodeOptions = useMemo(
    () =>
      baseData?.exact_codes.map((code) => ({
        value: code.code,
        label: `${code.code} - ${code.description}`,
      })) || [],
    [baseData?.exact_codes],
  );

  const filtersActiveCount = useMemo(() => {
    return Object.keys(activeFilters).reduce((count, key) => {
      const value = activeFilters[key];
      if (value !== "all" && value !== "") {
        return count + 1;
      }
      return count;
    }, 0);
  }, [activeFilters]);

  return (
    <section className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-2">
          <FilterWrapper label="Search Werkbons" className="w-full">
            <SearchBar
              value={activeFilters.search || ""}
              onChange={(value) => updateFilter("search", value)}
              placeholder={`Search ${searchableFields}...`}
            />
          </FilterWrapper>
        </div>

        <FilterWrapper label="Invoice Status">
          <Select
            value={currentStatusValue}
            onValueChange={(val) =>
              updateFilter(
                "is_invoiced",
                INVOICE_MAP[val as keyof typeof INVOICE_MAP],
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
              {STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  <Badge variant={status.variant} className="gap-1">
                    {status.icon && <status.icon className="h-3 w-3" />}
                    {status.label}
                  </Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterWrapper>

        <div className="sm:col-span-2 lg:col-span-1">
          <FilterWrapper label="Date Range">
            <DateRangeFilter
              fromValue={activeFilters.created_at_after || ""}
              toValue={activeFilters.created_at_before || ""}
              onFromChange={(v) => updateFilter("created_at_after", v || "all")}
              onToChange={(v) => updateFilter("created_at_before", v || "all")}
            />
          </FilterWrapper>
        </div>

        <FilterWrapper label="Users" icon={Users}>
          <MultiSelectFilter
            options={MOCK_USERS}
            value={
              activeFilters.created_by
                ? activeFilters.created_by.split(",")
                : []
            }
            onChange={(val) =>
              updateFilter("created_by", val.length > 0 ? val.join(",") : "all")
            }
            placeholder="Select users..."
          />
        </FilterWrapper>

        <FilterWrapper
          label="License Plate"
          icon={Truck}
          className="text-slate-700 dark:text-slate-300"
        >
          <DataSelect
            isLoading={isBaseDataLoading}
            value={activeFilters.license_plate}
            onChange={(v) => updateFilter("license_plate", v)}
            options={licensePlateOptions}
            placeholder="Select license plate..."
            widthClass="w-full"
            emptyLabel="All license plates"
          />
        </FilterWrapper>

        <FilterWrapper
          label="Product Code"
          icon={Box}
          className="text-blue-600 dark:text-blue-400"
        >
          <DataSelect
            isLoading={isBaseDataLoading}
            value={activeFilters.exact_product_code}
            onChange={(v) => updateFilter("exact_product_code", v)}
            options={productCodeOptions}
            placeholder="Select product code..."
            widthClass="w-full"
            emptyLabel="All product codes"
          />
        </FilterWrapper>
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
