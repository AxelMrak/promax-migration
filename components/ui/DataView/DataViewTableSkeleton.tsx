import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import type { Column } from "@/hooks/useDataView";

interface DataViewTableSkeletonProps<T> {
  visibleColumns: Column<T>[];
  rowCount?: number;
}

export default function DataViewTableSkeleton<
  T extends { id: string | number },
>({ visibleColumns, rowCount = 5 }: DataViewTableSkeletonProps<T>) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            {visibleColumns.map((column, index) => (
              <TableHead key={index} className={column.className || ""}>
                <div className="flex items-center">
                  <div className="h-4 bg-muted-foreground/20 rounded animate-pulse w-20" />
                </div>
              </TableHead>
            ))}
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {visibleColumns.map((column, colIndex) => (
                <TableCell key={colIndex} className={column.className}>
                  <div
                    className="h-4 bg-muted-foreground/20 rounded animate-pulse"
                    style={{
                      width: `${60 + Math.random() * 40}%`,
                      animationDelay: `${rowIndex * 50 + colIndex * 20}ms`,
                    }}
                  />
                </TableCell>
              ))}
              <TableCell>
                <div className="h-8 w-8 bg-muted-foreground/20 rounded animate-pulse" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
