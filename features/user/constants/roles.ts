import { Users, Wrench, Shield, LucideIcon } from "lucide-react";
import { UserLevel } from "@/features/user/types";
export interface RoleConfig {
  name: string;
  displayName: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const ROLE_CONFIGS: Record<UserLevel, RoleConfig> = {
  [UserLevel.ADMIN]: {
    name: "admin",
    displayName: "Admin",
    icon: Shield,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900",
  },
  [UserLevel.MANAGER]: {
    name: "manager",
    displayName: "Manager",
    icon: Users,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900",
  },
  [UserLevel.MONTEUR]: {
    name: "monteur",
    displayName: "Monteur",
    icon: Wrench,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
};
