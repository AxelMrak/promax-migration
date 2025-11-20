"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/ui";
import { RouteItem } from "@/features/navigation/types";
import { Button } from "@/components/ui/Button";

interface NavigationItemProps {
  item: RouteItem;
  depth?: number;
}

export default function NavigationItem({
  item,
  depth = 0,
}: NavigationItemProps) {
  const pathname = usePathname();

  const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
  const isCurrentRoute = pathname === item.href;

  const isChildActive = useMemo(() => {
    if (!hasSubItems) return false;
    const checkChild = (sub: RouteItem): boolean => {
      if (sub.href === pathname) return true;
      return sub.subItems ? sub.subItems.some(checkChild) : false;
    };
    return item.subItems!.some(checkChild);
  }, [item.subItems, hasSubItems, pathname]);

  const [isManualExpanded, setIsManualExpanded] = useState(false);
  const isExpanded = isChildActive || isManualExpanded;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsManualExpanded((prev) => !prev);
  };

  const isActive = isCurrentRoute || isChildActive;

  const containerClasses = cn(
    "group flex items-center justify-between w-full rounded-lg transition-colors duration-200",
    depth === 0 ? "px-4 py-3" : "px-4 py-2 ml-2",
    isActive
      ? "text-primary-foreground bg-primary  shadow-sm transition-shadow hover:shadow-md"
      : "hover:bg-accent hover:text-accent-foreground text-muted-foreground",
  );

  const subMenuClasses = cn(
    "mt-1 space-y-1 overflow-hidden rounded-md transition-all duration-300 ease-in-out",
    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
  );

  return (
    <li className="w-full text-sm block">
      <div className={containerClasses}>
        <Link
          href={item.href}
          className="flex items-center gap-3 flex-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {item.icon && (
            <span>{<item.icon className="h-4 w-4 shrink-0" />}</span>
          )}

          <span className="font-medium truncate">{item.label}</span>
        </Link>

        {hasSubItems && (
          <Button
            onClick={handleToggle}
            className="p-1 ml-2 hover:bg-background/20 rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-expanded={isExpanded}
            aria-controls={`submenu-${item.label}`}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {hasSubItems && (
        <ul id={`submenu-${item.label}`} className={subMenuClasses}>
          {item.subItems!.map((subItem, index) => (
            <NavigationItem
              key={`${subItem.label}-${index}`}
              item={subItem}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
