"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/Button";

type ThemeValue = "light" | "dark";

//TODO: Improve and refactor that
declare global {
  interface Document {
    startViewTransition?: (
      callback: () => void | Promise<void>,
    ) => ViewTransition;
  }

  interface ViewTransition {
    ready: Promise<void>;
    finished: Promise<void>;
    updateCallbackDone: Promise<void>;
  }
}

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeTheme = (resolvedTheme ?? "light") as ThemeValue;

  const handleChangeTheme = () => {
    const nextTheme: ThemeValue = activeTheme === "light" ? "dark" : "light";
    const applyTheme = () => setTheme(nextTheme);

    if (typeof document !== "undefined" && document.startViewTransition) {
      document.startViewTransition(() => {
        applyTheme();
      });
      return;
    }

    applyTheme();
  };

  if (!isMounted) {
    return (
      <div className="fixed bottom-2 right-2 md:bottom-4 md:right-4">
        <div className="h-12 w-12 rounded-full border border-border/60 bg-card/70 shadow-inner backdrop-blur" />
      </div>
    );
  }

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
