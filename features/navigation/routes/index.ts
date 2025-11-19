import { UserLevel } from "@/features/user/types";
import { ADMIN_ROUTES } from "@/features/navigation/routes/admin";
import { MANAGER_ROUTES } from "@/features/navigation/routes/manager";
import { MONTEUR_ROUTES } from "@/features/navigation/routes/monteur";
import { RouteItem } from "@/features/navigation/types";

export function getRoutesForRole(role: UserLevel): RouteItem[] {
  switch (role) {
    case UserLevel.ADMIN:
      return ADMIN_ROUTES;
    case UserLevel.MANAGER:
      return MANAGER_ROUTES;
    case UserLevel.MONTEUR:
      return MONTEUR_ROUTES;
    default:
      return [];
  }
}
