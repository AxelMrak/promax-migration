import { cn } from "@/lib/ui";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Spinner } from "@/components/feedback/Spinner";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "destructive"
  | "ghost"
  | "success";

type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const BASE =
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none rounded-md cursor-pointer";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
  outline: "border border-input bg-transparent hover:bg-muted",
  destructive: "bg-error text-error-foreground hover:bg-error/90",
  ghost: "bg-transparent hover:bg-muted",
  success: "bg-success text-success-foreground hover:bg-success/90",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner className="mr-2" size={16} />}
      {children}
    </button>
  );
}

export { Button };
