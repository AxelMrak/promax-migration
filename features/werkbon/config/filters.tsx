import { CheckCircle, Clock } from "lucide-react";

export const WERKBON_STATUSES = [
  { value: "all", label: "All Statuses", variant: "outline" as const },
  {
    value: "invoiced",
    label: "Invoiced",
    icon: CheckCircle,
    variant: "success" as const,
  },
  {
    value: "pending",
    label: "Pending",
    icon: Clock,
    variant: "warning" as const,
  },
] as const;

export const WERKBON_INVOICE_MAP = {
  invoiced: "true",
  pending: "false",
  all: "all",
} as const;

export const WERKBON_REVERSE_INVOICE_MAP: Record<string, string> = {
  true: "invoiced",
  false: "pending",
  all: "all",
};
