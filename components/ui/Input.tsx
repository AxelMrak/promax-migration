import * as React from "react";

import { cn } from "@/lib/ui";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  note?: string;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      note,
      error,
      required,
      icon,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId =
      id || label?.toLowerCase().replace(/\s+/g, "-") || undefined;

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label} {required && <span className="text-destructive">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={type}
            aria-invalid={!!error}
            required={required}
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              icon && "pr-10",
              className,
            )}
            {...props}
          />

          {icon && (
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
        </div>

        {note && !error && (
          <p className="text-xs text-muted-foreground">{note}</p>
        )}

        {error && (
          <p className="text-xs font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export { Input };
