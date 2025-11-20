import * as React from "react";
import { cn } from "@/lib/ui";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  note?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, note, error, required, id, icon, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId =
      id ||
      (label
        ? `${label.toLowerCase().replace(/\s+/g, "-")}-${generatedId}`
        : generatedId);

    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label} {required && <span className="text-destructive">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            id={inputId}
            ref={ref}
            required={required}
            aria-invalid={!!error}
            data-slot="textarea"
            className={cn(
              "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              icon && "pr-10",
              className,
            )}
            {...props}
          />

          {icon && (
            <div className="absolute top-3 right-3 flex items-center pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}
        </div>

        {note && !error && (
          <p className="text-xs text-muted-foreground">{note}</p>
        )}

        <div className="min-h-4">
          {error && (
            <p className="text-xs font-medium text-destructive">{error}</p>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
