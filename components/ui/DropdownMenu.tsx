"use client";

import * as React from "react";
import { CheckIcon, CircleIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/ui";
import { useClickOutside } from "@/hooks/useClickOutside";
import { DropdownContext, useDropdown } from "@/hooks/useDropdown";

function DropdownMenu({
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <DropdownContext.Provider value={{ open: !!open, setOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownContext.Provider>
  );
}

function DropdownMenuTrigger({
  className,
  children,
  asChild,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { open, setOpen } = useDropdown();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  };

  if (asChild) {
    if (!React.isValidElement(children)) {
      throw new Error(
        "DropdownMenuTrigger with asChild requires a single React element child.",
      );
    }
    const child = children as React.ReactElement<Record<string, unknown>>;
    return React.cloneElement(child, {
      ...child.props,
      onClick: handleClick,
      onMouseDown: (e: React.MouseEvent) => {
        e.stopPropagation();
        const original = (child.props as { onMouseDown?: unknown }).onMouseDown;
        if (typeof original === "function") {
          original(e);
        }
      },
      onTouchStart: (e: React.TouchEvent) => {
        e.stopPropagation();
        const original = (child.props as { onTouchStart?: unknown }).onTouchStart;
        if (typeof original === "function") {
          original(e);
        }
      },
      "data-state": open ? "open" : "closed",
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      data-state={open ? "open" : "closed"}
      {...props}
    >
      {children}
    </button>
  );
}

// Passthrough for compatibility, or implement React.createPortal if strictly needed.
// For this implementation, we treat it as a fragment/div to keep flow simple without Radix.
function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  align = "start",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  sideOffset?: number;
  align?: "start" | "center" | "end";
}) {
  const { open, setOpen } = useDropdown();
  const ref = React.useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  if (!open) return null;

  const alignmentClass =
    align === "end"
      ? "right-0"
      : align === "center"
        ? "left-1/2 -translate-x-1/2"
        : "left-0";

  return (
    <div
      ref={ref}
      data-state={open ? "open" : "closed"}
      className={cn(
        "bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 z-50 min-w-[8rem] overflow-hidden rounded-md border border-border p-1 shadow-md",
        "absolute top-[calc(100%+4px)] w-max",
        alignmentClass,
        "max-w-[calc(100vw-2rem)]",
        className,
      )}
      style={{ marginTop: sideOffset }}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  onClick,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  const { setOpen } = useDropdown();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
    setOpen(false);
  };

  return (
    <div
      role="menuitem"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:opacity-80 transition-all",
        inset && "pl-8",
        variant === "destructive" &&
          "text-destructive focus:bg-destructive/10 focus:text-destructive hover:bg-destructive/10 hover:text-destructive",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {props.children}
    </div>
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange, // Added to mimic Radix logic if needed
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const { setOpen } = useDropdown();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    props.onClick?.(e);
    onCheckedChange?.(!checked);
    setOpen(false); // Usually checkbox items close menu, sometimes they don't. Radix defaults to close.
  };

  return (
    <div
      role="menuitemcheckbox"
      aria-checked={checked}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <CheckIcon className="h-4 w-4" />}
      </span>
      {children}
    </div>
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  checked, // In Radix RadioItem, checked logic is usually handled by Group, but here we pass it explicitly or via parent mapping
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  checked?: boolean;
  value: string;
}) {
  const { setOpen } = useDropdown();

  return (
    <div
      role="menuitemradio"
      aria-checked={checked}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      onClick={(e) => {
        props.onClick?.(e);
        setOpen(false);
      }}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <CircleIcon className="h-2 w-2 fill-current" />}
      </span>
      {children}
    </div>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
}) {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-muted -mx-1 my-1 h-px", className)} {...props} />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

function DropdownMenuRadioGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

// --- Sub Menu Implementation (CSS based) ---

function DropdownMenuSub({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative group/sub", className)} // 'group/sub' allows nested hover logic
      {...props}
    />
  );
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
}) {
  return (
    <div
      className={cn(
        "focus:bg-accent focus:text-accent-foreground flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </div>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 shadow-lg absolute left-full top-0 z-50 hidden min-w-[8rem] overflow-hidden rounded-md border border-border p-1 group-hover/sub:block",
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
