"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface BooleanFilterProps {
  value: boolean | null;
  onChange: (value: boolean | null) => void;
  trueLabel?: string;
  falseLabel?: string;
  allLabel?: string;
}

export function BooleanFilter({
  value,
  onChange,
  trueLabel = "Yes",
  falseLabel = "No", 
  allLabel = "All"
}: BooleanFilterProps) {
  const options = [
    { label: allLabel, value: null },
    { label: trueLabel, value: true },
    { label: falseLabel, value: false },
  ];

  return (
    <div className="flex gap-1">
      {options.map((option) => {
        const isActive = value === option.value;
        
        return (
          <Button
            key={String(option.value)}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(option.value)}
            className="h-8 px-3 text-xs"
          >
            {isActive && <Check className="mr-1 h-3 w-3" />}
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}