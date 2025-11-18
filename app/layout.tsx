import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { AppProvider } from "@/app/providers/app-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased theme-promax`}
        suppressHydrationWarning
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
