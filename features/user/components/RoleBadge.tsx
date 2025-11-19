"use client";

import { ROLE_CONFIGS } from "@/features/user/constants/roles";
import { Badge } from "@/components/ui/Badge";
import type { UserLevel } from "@/features/user/types";

interface RoleBadgeProps {
  role: UserLevel;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const config = ROLE_CONFIGS[role];

  if (!config) return null;

  return (
    <Badge
      variant="outline"
      className={`${config.bgColor} ${config.color} ${className ?? ""}`}
    >
      {<config.icon className="mr-1 inline-block h-4 w-4 align-text-bottom" />}
      {config.displayName}
    </Badge>
  );
}
