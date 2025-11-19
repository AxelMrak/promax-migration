import React from "react";
import { cn } from "@/lib/ui";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md animate-pulse [animation-duration:2s]",
        "bg-gray-300 dark:bg-gray-700",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
