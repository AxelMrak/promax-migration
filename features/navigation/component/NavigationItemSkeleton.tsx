"use client";
import { cn } from "@/lib/ui";

interface NavigationItemSkeletonProps {
  depth?: number;
  hasSubItems?: boolean;
  subItemsCount?: number;
}

export default function NavigationItemSkeleton({
  depth = 0,
  hasSubItems = false,
  subItemsCount = 0,
}: NavigationItemSkeletonProps) {
  const containerClasses = cn(
    "group flex items-center justify-between w-full rounded-lg animate-pulse",
    depth === 0 ? "px-4 py-3" : "px-4 py-2 ml-2",
    "bg-muted",
  );

  return (
    <li className="w-full text-sm block ">
      <div className={containerClasses}>
        <div className="flex items-center gap-3 flex-1">
          {/* Icon skeleton */}
          <div className="h-4 w-4 shrink-0 bg-muted-foreground/20 rounded" />

          {/* Label skeleton */}
          <div className="h-4 bg-muted-foreground/20 rounded flex-1 max-w-[120px]" />
        </div>

        {/* Chevron skeleton */}
        {hasSubItems && (
          <div className="p-1 ml-2">
            <div className="h-4 w-4 bg-muted-foreground/20 rounded" />
          </div>
        )}
      </div>

      {/* Sub-items skeleton */}
      {hasSubItems && subItemsCount > 0 && (
        <ul className="mt-1 space-y-1">
          {Array.from({ length: subItemsCount }).map((_, index) => (
            <NavigationItemSkeleton
              key={`skeleton-${index}`}
              depth={depth + 1}
              hasSubItems={false}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
