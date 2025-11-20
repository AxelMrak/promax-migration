import { MoreHorizontal, Share, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Column } from "@/hooks/useDataView";

interface DataViewGridProps<T> {
  data: T[];
  visibleColumns: Column<T>[];
  onRowClick?: (item: T) => void;
  handleRowAction: (action: "share" | "delete", item: T) => void;
}

export default function DataViewGrid<T extends { id: string | number }>({
  data: tableData,
  visibleColumns,
  onRowClick,
  handleRowAction,
}: DataViewGridProps<T>) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tableData.length === 0 ? (
        <div className="col-span-full">
          <p className="text-center text-muted-foreground">No data found.</p>
        </div>
      ) : (
        tableData.map((item) => (
          <Card
            key={String(item.id)}
            className={`p-4 ${onRowClick ? "cursor-pointer hover:bg-accent" : ""}`}
            onClick={() => onRowClick?.(item)}
          >
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div className="flex-1">
                {visibleColumns[0] && (
                  <h3 className="font-medium">
                    {visibleColumns[0].render
                      ? visibleColumns[0].render(item)
                      : String(item[visibleColumns[0].key])}
                  </h3>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-50">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowAction("share", item);
                    }}
                    className="text-blue-600 focus:text-blue-600"
                  >
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowAction("delete", item);
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-4 flex flex-row items-start gap-4">
              {visibleColumns.slice(1).map((column) => (
                <div
                  key={String(column.key)}
                  className="flex flex-col gap-1 text-xs"
                >
                  <span className="text-muted-foreground whitespace-nowrap">
                    {column.header}:
                  </span>
                  <div className="font-medium">
                    {column.render
                      ? column.render(item)
                      : String(item[column.key])}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
