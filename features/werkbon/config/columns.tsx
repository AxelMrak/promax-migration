import { Werkbon } from "@/features/werkbon/types";
import { CheckCircle, Clock, Truck, Package } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Column } from "@/hooks/useDataView";

export const columns: Column<Werkbon>[] = [
  {
    key: "title",
    header: "Title",
    className: "font-medium",
    searchable: true,
    sortable: true,
  },
  {
    key: "exact_code",
    header: "Product Code",
    render: (item) => (
      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
        <Package className="h-4 w-4" />
        <span className="text-sm">{item.exact_code?.code || "N/A"}</span>
      </div>
    ),
  },
  {
    key: "truck",
    header: "License Plate",
    render: (item) => (
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
        <Truck className="h-4 w-4 " />
        <span className="text-sm">{item.truck?.license_plate || "N/A"}</span>
      </div>
    ),
  },
  {
    key: "is_invoiced",
    header: "Status",
    className: "text-center",
    render: (item) => (
      <Badge
        variant={item.is_invoiced ? "success" : "warning"}
        size="xs"
        icon={
          item.is_invoiced ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <Clock className="h-3 w-3" />
          )
        }
      >
        {item.is_invoiced ? "Invoiced" : "Pending"}
      </Badge>
    ),
  },
];
