"use client";
import { cn } from "@/lib/ui";
import { Skeleton } from "@/components/feedback/Skeleton";

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
    "group flex items-center justify-between w-full rounded-lg",
    depth === 0 ? "px-4 py-3" : "px-4 py-2 ml-2",
  );

  return (
    <li className="w-full text-sm block">
      <div className={containerClasses}>
        <div className="flex items-center gap-3 flex-1">
          <Skeleton className="h-4 w-4 flex-shrink-0" />
          <Skeleton className="h-4 w-32 flex-1" />
        </div>

        {hasSubItems && (
          <div className="p-1 ml-2">
            <Skeleton className="h-4 w-4" />
          </div>
        )}
      </div>

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
