"use client";

import { cn } from "@/lib/ui";

type FilterFieldProps = {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
};

export function FilterField({
  label,
  icon: Icon,
  children,
  className,
}: FilterFieldProps) {
  return (
    <div className={cn("flex flex-col items-start gap-2 w-full", className)}>
      <span className="text-sm font-medium flex items-center gap-1">
        {Icon && <Icon className="h-4 w-4" />}
        {label}:
      </span>
      {children}
    </div>
  );
}
