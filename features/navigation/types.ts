import type { LucideIcon } from "lucide-react";

export type RouteItemHref = string | { pathname?: string };

export interface RouteItem {
  label: string;
  icon?: LucideIcon;
  href: RouteItemHref;
  subItems?: RouteItem[];
}
