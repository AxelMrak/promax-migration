"use client";

import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, ExternalLink, Home, QrCode } from "lucide-react";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const FALLBACK_BASE =
  (process.env.NEXT_PUBLIC_APP_URL &&
    process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "")) ||
  "http://localhost:3000";

const FALLBACK_URL = `${FALLBACK_BASE}/pwa?ref=qr`;

export default function PwaInstallPage() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installUrl, setInstallUrl] = useState(FALLBACK_URL);
  const [status, setStatus] = useState<"idle" | "prompt-ready" | "installed">(
    "idle",
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const origin = window.location.origin;
    setInstallUrl(`${origin}/pwa?ref=qr`);
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setStatus("prompt-ready");
    };

    const installedHandler = () => {
      setStatus("installed");
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      window.location.href = installUrl;
      return;
    }
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setStatus(choice.outcome === "accepted" ? "installed" : "idle");
    setDeferredPrompt(null);
  };

  const isIOS = useMemo(
    () =>
      /iphone|ipad|ipod/i.test(
        typeof navigator !== "undefined" ? navigator.userAgent : "",
      ),
    [],
  );

  const isAndroid = useMemo(
    () =>
      /android/i.test(
        typeof navigator !== "undefined" ? navigator.userAgent : "",
      ),
    [],
  );

  return (
    <main className="min-h-screen  text-background flex flex-col items-center justify-center">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center">
        <section className="flex-1 space-y-4 text-foreground">
          <Image
            src="/logo/promax.svg"
            alt="ProMax APP Logo"
            width={120}
            height={120}
            className="mb-4"
          />
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Scan, open, and install the ProMax APP PWA on your phone
          </h1>
          <p className="text-lg text-foreground/80">
            Use the QR to open the app URL on mobile. You&apos;ll get the
            install prompt on Android (Chrome/Edge). On iOS, open in Safari and
            use &quot;Add to Home Screen&quot; from the share sheet.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleInstallClick}
              variant="primary"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {status === "installed" ? "Installed" : "Install / Open app"}
            </Button>
            <a
              href={installUrl}
              className="inline-flex items-center gap-2 text-sm text-primary transition hover:text-primary/80"
            >
              <ExternalLink className="h-4 w-4" />
              Open directly
            </a>
            <Link
              href="/"
              className="bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90 transition text-sm inline-flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Back to app
            </Link>
          </div>

          {isIOS && (
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="font-semibold text-foreground">iOS tip</p>
              <p>Open in Safari → Share → Add to Home Screen.</p>
            </div>
          )}
          {isAndroid && (
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="font-semibold text-foreground">Android tip</p>
              <p>
                Use Chrome or Edge for the best PWA experience and install
                prompts.
              </p>
              <p>
                If you don&apos;t see the install prompt, tap the menu button →
                Add to Home screen or Install app.
              </p>
            </div>
          )}
        </section>

        <section className="flex flex-1 flex-col items-center gap-4">
          <div className="rounded-2xl bg-background p-4">
            <QRCodeSVG
              value={installUrl}
              size={260}
              bgColor="#ffffff"
              fgColor="#0f172a"
              className="rounded-2xl p-1"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <QrCode className="h-4 w-4" />
            Scan on mobile to open {installUrl}
          </div>
        </section>
      </div>
    </main>
  );
}
