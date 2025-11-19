import { RouteItem } from "@/features/navigation/types";
import { BookUser, HomeIcon, LayoutList } from "lucide-react";

export const MANAGER_ROUTES: RouteItem[] = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "/dashboard",
  },
  {
    label: "Werkbonnen",
    icon: LayoutList,
    href: "/dashboard/werkbon",
  },
  {
    label: "Monteurs",
    icon: BookUser,
    href: "/dashboard/monteur",
  },
];
