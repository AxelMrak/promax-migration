import * as React from "react";
import { cn } from "@/lib/ui";

const baseStyles =
  "inline-flex items-center justify-center rounded-md border px-1.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2 transition-colors overflow-hidden";

const variants = {
  default:
    "border-border bg-background text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
  primary:
    "border border-blue-500 bg-blue-50 text-blue-600 [&>svg]:text-blue-500 [a&]:hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400",
  secondary:
    "border border-slate-500 bg-slate-50 text-slate-600 [&>svg]:text-slate-500 [a&]:hover:bg-slate-100 dark:border-slate-900 dark:bg-slate-950 dark:text-slate-400",
  destructive:
    "border-red-100 bg-red-50 text-red-600 [&>svg]:text-red-500 [a&]:hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-400",
  outline:
    "border-border bg-background text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
  success:
    "border-green-100 bg-green-50 text-green-600 [&>svg]:text-green-500 [a&]:hover:bg-green-100 dark:border-green-900 dark:bg-green-950 dark:text-green-400",
  warning:
    "border-yellow-100 bg-yellow-50 text-yellow-600 [&>svg]:text-yellow-500 [a&]:hover:bg-yellow-100 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-400",
};

const sizes = {
  xs: "px-1 py-0.5 text-xs [&>svg]:size-2",
  sm: "px-1 py-0.5 text-xs [&>svg]:size-2.5",
  default: "px-1.5 py-0.5 text-xs [&>svg]:size-3",
  lg: "px-2 py-1 text-sm [&>svg]:size-3.5",
};

type BadgeVariant = keyof typeof variants;
type BadgeSize = keyof typeof sizes;

interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

function Badge({
  className,
  variant = "default",
  size = "default",
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && (
        <span className="[&>svg]:pointer-events-none [&>svg]:shrink-0">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}

export { Badge, type BadgeProps };
