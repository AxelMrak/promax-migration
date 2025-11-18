"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Toggle theme"
      className="rounded-full fixed bottom-2 right-2 md:bottom-4 md:right-4  bg-background transition-all  border border-border/50 p-2 hover:opacity-80 z-50"
      onClick={handleChangeTheme}
    >
      <Sun className="size-5 dark:hidden" />
      <Moon className="hidden size-5 dark:block" />
    </Button>
  );
}
