"use client";

import { Toaster } from "react-hot-toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { ViewTransition } from "react";

interface AppProviderProps {
  props?: React.ComponentProps<typeof NextThemesProvider>;
  children: React.ReactNode;
}

export function AppProvider({ children, ...props }: AppProviderProps) {
  const queryClient = useMemo(() => new QueryClient(), []);

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
