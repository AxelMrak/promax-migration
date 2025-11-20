import { MoreHorizontal, Share, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import type { Column } from "@/hooks/useDataView";

interface DataViewTableProps<T> {
  data: T[];
  visibleColumns: Column<T>[];
  onRowClick?: (item: T) => void;
  handleSort: (key: keyof T) => void;
  getSortIcon: (key: keyof T) => React.ReactNode;
  handleRowAction: (action: "share" | "delete", item: T) => void;
}

export default function DataViewTable<T extends { id: string | number }>({
  data: tableData,
  visibleColumns,
  onRowClick,
  handleSort,
  getSortIcon,
  handleRowAction,
}: DataViewTableProps<T>) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            {visibleColumns.map((column) => (
              <TableHead
                key={String(column.key)}
                className={`${column.className || ""} ${
                  column.sortable !== false ? "cursor-pointer select-none" : ""
                }`}
                onClick={() =>
                  column.sortable !== false && handleSort(column.key)
                }
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable !== false && getSortIcon(column.key)}
                </div>
              </TableHead>
            ))}
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={visibleColumns.length + 1}
                className="h-24 text-center"
              >
                No data found
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((item) => (
              <TableRow
                key={String(item.id)}
                className={onRowClick ? "cursor-pointer" : ""}
                onClick={() => onRowClick?.(item)}
              >
                {visibleColumns.map((column) => (
                  <TableCell
                    key={String(column.key)}
                    className={column.className}
                  >
                    {column.render
                      ? column.render(item)
                      : String(item[column.key])}
                  </TableCell>
                ))}
                <TableCell>
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
                    <DropdownMenuContent align="end" className="z-50 ">
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
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
