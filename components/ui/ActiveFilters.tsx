"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ActiveFilter {
  key: string;
  label: string;
  value: any;
  displayValue: string;
}

interface ActiveFiltersProps {
  filters: ActiveFilter[];
  onRemove: (key: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  filters,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/30 p-3">
      <span className="text-sm font-medium text-muted-foreground">
        Active filters:
      </span>

      {filters.map((filter) => (
        <Badge
          key={filter.key}
          variant="secondary"
          className="flex items-center gap-1 pr-1"
        >
          <span className="text-xs">
            <strong>{filter.label}:</strong> {filter.displayValue}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(filter.key)}
            className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={onClearAll}
        className="h-6 px-2 text-xs"
      >
        Clear all
      </Button>
    </div>
  );
}

