"use client";

import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface DateRangeFilterProps {
  fromValue?: string;
  toValue?: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

export function DateRangeFilter({
  fromValue = "",
  toValue = "",
  onFromChange,
  onToChange,
}: DateRangeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        value={fromValue}
        onChange={(e) => onFromChange(e.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="From"
      />
      <span className="text-sm">to</span>
      <input
        type="date"
        value={toValue}
        onChange={(e) => onToChange(e.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="To"
      />
    </div>
  );
}

