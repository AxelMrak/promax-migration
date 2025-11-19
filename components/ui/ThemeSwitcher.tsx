"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/Button";

type ThemeValue = "light" | "dark";

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();

  const activeTheme = (resolvedTheme ?? "light") as ThemeValue;

  const handleChangeTheme = () => {
    const nextTheme: ThemeValue = activeTheme === "light" ? "dark" : "light";

    if (document.startViewTransition) {
      document.startViewTransition(() => setTheme(nextTheme));
    } else {
      setTheme(nextTheme);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Toggle theme"
      aria-pressed={activeTheme === "dark"}
      className="theme-switcher-button fixed bottom-2 right-2 z-50 h-8 w-8 rounded-full border border-border/40 bg-card/90 p-0 text-base shadow-lg backdrop-blur transition-transform duration-300 hover:scale-105 md:bottom-4 md:right-4 cursor-pointer"
      onClick={handleChangeTheme}
    >
      {activeTheme === "light" ? (
        <Sun className="theme-switcher-icon size-5" />
      ) : (
        <Moon className="theme-switcher-icon size-5" />
      )}
    </Button>
  );
}
