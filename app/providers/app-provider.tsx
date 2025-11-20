"use client";

import { Toaster } from "react-hot-toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { ViewTransition } from "react";

interface AppProviderProps {
  props?: React.ComponentProps<typeof NextThemesProvider>;
  children: React.ReactNode;
}

export function AppProvider({ children, ...props }: AppProviderProps) {
  const queryClient = useMemo(() => new QueryClient(), []);

  useEffect(() => {
    const canUseSW = typeof window !== "undefined" && "serviceWorker" in navigator;
    if (!canUseSW || process.env.NODE_ENV !== "production") return;

    navigator.serviceWorker
      .register("/sw.js")
      .catch((error) => console.error("Service worker registration failed", error));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ViewTransition />
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        {...props}
      >
        {children}
        <Toaster position="top-left" />
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
