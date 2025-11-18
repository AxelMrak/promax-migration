"use client";

import { Toaster } from "react-hot-toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface AppProviderProps {
  props?: React.ComponentProps<typeof NextThemesProvider>;
  children: React.ReactNode;
}

export function AppProvider({ children, ...props }: AppProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
      <Toaster position="top-left" />
    </NextThemesProvider>
  );
}
