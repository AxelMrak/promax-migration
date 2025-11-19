import { RouteItem } from "@/features/navigation/types";
import { HomeIcon, LayoutList } from "lucide-react";

export const MONTEUR_ROUTES: RouteItem[] = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "/dashboard",
  },
  {
    label: "My Werkbonnen",
    icon: LayoutList,
    href: "/dashboard/werkbon",
  },
];
