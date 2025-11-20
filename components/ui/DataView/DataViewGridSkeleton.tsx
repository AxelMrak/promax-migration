import { Card } from "@/components/ui/Card";
import type { Column } from "@/hooks/useDataView";

interface DataViewGridSkeletonProps<T> {
  visibleColumns: Column<T>[];
  cardCount?: number;
}

export default function DataViewGridSkeleton<
  T extends { id: string | number },
>({ visibleColumns, cardCount = 6 }: DataViewGridSkeletonProps<T>) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: cardCount }).map((_, cardIndex) => (
        <Card key={cardIndex} className="p-4">
          <div className="flex items-start justify-between border-b border-border pb-3">
            <div className="flex-1">
              <div
                className="h-5 bg-muted-foreground/20 rounded animate-pulse"
                style={{
                  width: `${65 + Math.random() * 25}%`,
                  animationDelay: `${cardIndex * 80}ms`,
                }}
              />
            </div>
            <div
              className="h-8 w-8 bg-muted-foreground/20 rounded animate-pulse ml-2"
              style={{
                animationDelay: `${cardIndex * 80 + 40}ms`,
              }}
            />
          </div>

          <div className="space-y-2 pt-3">
            {visibleColumns.slice(1).map((column, colIndex) => (
              <div key={colIndex} className="grid grid-cols-3 gap-2 text-sm">
                <div
                  className="h-4 bg-muted-foreground/20 rounded animate-pulse"
                  style={{
                    width: "70%",
                    animationDelay: `${cardIndex * 80 + colIndex * 60}ms`,
                  }}
                />
                <div className="col-span-2">
                  <div
                    className="h-4 bg-muted-foreground/20 rounded animate-pulse"
                    style={{
                      width: `${50 + Math.random() * 40}%`,
                      animationDelay: `${cardIndex * 80 + colIndex * 60 + 30}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
