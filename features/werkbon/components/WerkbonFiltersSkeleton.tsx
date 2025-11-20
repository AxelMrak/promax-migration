"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export function WerkbonFiltersSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm">
      <div className="relative flex w-full flex-1 items-center md:w-auto">
        <Skeleton className="h-9 w-full md:max-w-sm" />
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-9 w-40" />
        ))}
      </div>
    </div>
  );
}