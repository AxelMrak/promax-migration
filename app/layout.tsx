import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { AppProvider } from "@/app/providers/app-provider";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

export async function generateMetadata(): Promise<Metadata> {
  const title = "ProMax APP | OCR App";
  const description =
    "Professional cargo and Transport Documents management platform for ProMax APP";

  return {
    title,
    description,
    icons: {
      icon: "/meta/promax/favicon.ico",
      shortcut: "/meta/promax/favicon.svg",
      apple: "/meta/promax/apple-touch-icon.png",
    },
    manifest: "/meta/promax/site.webmanifest",
  };
}

export const viewport: Viewport = {
  themeColor: "#f07f1c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased theme-promax" suppressHydrationWarning>
        <AppProvider>
          {children}
          <ThemeSwitcher />
        </AppProvider>
      </body>
    </html>
  );
}
