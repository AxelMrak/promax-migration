"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/ui";

const OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const activeTheme = (resolvedTheme ?? "light") as "light" | "dark";

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/90 p-1 shadow-lg backdrop-blur">
        {OPTIONS.map(({ value, label, Icon }) => {
          const isActive = activeTheme === value;

          return (
            <button
              key={value}
              type="button"
              aria-pressed={isActive}
              aria-label={`Activate ${label.toLowerCase()} theme`}
              onClick={() => setTheme(value)}
              className={cn(
                "flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              <span className="hidden md:inline">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
