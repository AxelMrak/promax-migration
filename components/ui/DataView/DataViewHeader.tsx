import { Grid3X3, TableIcon, Columns, Rows } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import type { Column } from "@/hooks/useDataView";

interface DataViewHeaderProps<T> {
  isLoading: boolean;
  viewMode: "table" | "grid";
  setViewMode: (mode: "table" | "grid") => void;
  columns: Column<T>[];
  hiddenColumns: Set<string>;
  setHiddenColumns: (hidden: Set<string>) => void;
  toggleColumnVisibility: (key: string) => void;
}

export default function DataViewHeader<T extends { id: string | number }>({
  viewMode,
  setViewMode,
  columns,
  hiddenColumns,
  setHiddenColumns,
  toggleColumnVisibility,
}: DataViewHeaderProps<T>) {
  const handleToggleView = (mode: "table" | "grid") => {
    if (mode === "grid") {
      setHiddenColumns(new Set());
    } else {
      setHiddenColumns(hiddenColumns);
    }
    setViewMode(mode);
  };

  return (
    <header className="flex justify-end gap-2 flex-wrap">
      {/* Column Selector - only show in table view */}
      {viewMode === "table" && (
        <section className="flex flex-col items-start gap-2">
          <h2 className="text-sm font-medium">Columns</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Columns className="h-3 w-3 mr-2" />
                Manage Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {hiddenColumns.size > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start mb-2 text-primary"
                  onClick={() => setHiddenColumns(new Set())}
                >
                  <Rows className="h-3 w-3 mr-2" />
                  Show All
                </Button>
              )}
              <DropdownMenuSeparator />
              {columns
                .filter((col) => col.key !== "id")
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={String(column.key)}
                    checked={!hiddenColumns.has(String(column.key))}
                    onCheckedChange={() =>
                      toggleColumnVisibility(String(column.key))
                    }
                  >
                    {column.header}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      )}

      {/* View Toggle */}
      <section className="flex flex-col items-start gap-2">
        <h2 className="text-sm font-medium">Data View</h2>
        <div className="flex rounded-md border border-border overflow-hidden">
          <Button
            variant={viewMode === "table" ? "primary" : "ghost"}
            size="sm"
            onClick={() => handleToggleView("table")}
            className="rounded-none border-0 h-8 px-3 flex items-center gap-2"
          >
            <TableIcon className="h-3 w-3" />
            Table
          </Button>
          <Button
            variant={viewMode === "grid" ? "primary" : "ghost"}
            size="sm"
            onClick={() => handleToggleView("grid")}
            className="rounded-none border-0 h-8 px-3 flex items-center gap-2"
          >
            <Grid3X3 className="h-3 w-3" />
            Grid
          </Button>
        </div>
      </section>
    </header>
  );
}
