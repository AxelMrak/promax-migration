import { RouteItem } from "@/features/navigation/types";
import { BookUser, HomeIcon, LayoutList } from "lucide-react";

export const MANAGER_ROUTES: RouteItem[] = [
  {
    label: "Dashboard",
    icon: HomeIcon,
    href: "/dashboard",
  },
  {
    label: "Werkbonnen",
    icon: LayoutList,
    href: "/werkbonnen",
  },
  {
    label: "Monteurs",
    icon: BookUser,
    href: "/monteurs",
  },
];
