"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/ui";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

type Option = { value: string; label: string };

interface DataSelectProps {
  isLoading: boolean;
  value?: string | null;
  onChange: (val: string) => void;
  options: Option[];
  placeholder: string;
  emptyLabel: string;
  className?: string;
}

function DataSelectSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-9 rounded-md border border-input bg-background min-w-60 animate-pulse",
        className,
      )}
    >
      <div className="flex items-center h-full px-3 gap-2 min-w-20 animate-pulse justify-between">
        <Skeleton className="h-4 flex-1 max-w-[60%]" />
        <Skeleton className="h-3 w-3" />
      </div>
    </div>
  );
}

export function DataSelect({
  isLoading,
  value,
  onChange,
  options,
  placeholder,
  emptyLabel,
  className,
}: DataSelectProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
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
    return <DataSelectSkeleton className={className} />;
  }

  const safeValue = !value || value === "all" ? "" : value;
  const selectedOption = options.find((opt) => opt.value === safeValue);

  return (
    <Select
      value={safeValue}
      onValueChange={(val) => onChange(val || "all")}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SelectTrigger className={cn("w-full", className)}>
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
}
