"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/ui";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SelectContext, useSelectContext } from "@/hooks/useSelectContext";

interface SelectProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Select({
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  open: controlledOpen,
  onOpenChange,
}: SelectProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const isControlledValue = controlledValue !== undefined;
  const value = isControlledValue ? controlledValue : uncontrolledValue;

  const isControlledOpen = controlledOpen !== undefined;
  const open = isControlledOpen ? controlledOpen : uncontrolledOpen;

  const handleValueChange = (newValue: string) => {
    if (!isControlledValue) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlledOpen) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        open: !!open,
        setOpen: handleOpenChange,
      }}
    >
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
}

function SelectGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("w-full", className)} {...props} />;
}

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

function SelectValue({
  className,
  placeholder,
  children,
  ...props
}: SelectValueProps) {
  const { value } = useSelectContext();

  return (
    <span className={cn("truncate", className)} {...props}>
      {children || value || placeholder || (
        <span className="opacity-50">&nbsp;</span>
      )}
    </span>
  );
}

interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "default";
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    const { open, setOpen } = useSelectContext();

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          size === "default" && "h-9",
          size === "sm" && "h-8",
          className,
        )}
        aria-expanded={open}
        {...props}
      >
        {children}
        <ChevronDownIcon className="h-4 w-4 opacity-50" />
      </button>
    );
  },
);
SelectTrigger.displayName = "SelectTrigger";

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  position?: "popper" | "item-aligned";
}) {
  const { open, setOpen } = useSelectContext();
  const ref = React.useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "bg-popover text-popover-foreground relative z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md animate-in fade-in-80 zoom-in-95",
        "absolute top-[calc(100%+4px)] left-0 w-full",
        className,
      )}
      {...props}
    >
      <div className="max-h-96 overflow-y-auto p-1">{children}</div>
    </div>
  );
}

function SelectLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-2 py-1.5 text-sm font-semibold", className)}
      {...props}
    />
  );
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, disabled, ...props }, ref) => {
    const { value: selectedValue, onValueChange, setOpen } = useSelectContext();
    const isSelected = selectedValue === value;

    const handleClick = (e: React.MouseEvent) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onValueChange(value);
      setOpen(false);
      props.onClick?.(e);
    };

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        data-disabled={disabled}
        className={cn(
          "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && <CheckIcon className="h-4 w-4" />}
        </span>
        <span className="truncate">{children}</span>
      </div>
    );
  },
);
SelectItem.displayName = "SelectItem";

function SelectSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-muted -mx-1 my-1 h-px", className)} {...props} />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="h-4 w-4" />
    </div>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="h-4 w-4" />
    </div>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
