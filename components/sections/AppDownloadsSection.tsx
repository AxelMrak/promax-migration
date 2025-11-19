"use client";

import { APPS_TO_DOWNLOAD } from "@/constants/downloads";
import { Smartphone } from "lucide-react";

export default function AppDownloadsSection() {
  return (
    <section className="flex w-full flex-col gap-2 px-4">
      <h3 className="mb-2 text-xs font-semibold text-muted-foreground">
        Extensies downloaden
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {APPS_TO_DOWNLOAD.map((app) => {
          const Icon = app.icon ?? Smartphone;
          const isHighlighter = app.label.toLowerCase().includes("highlighter");

          return (
            <button
              key={app.label}
              type="button"
              onClick={app.onClick}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border p-2 text-xs transition-colors hover:border-accent-foreground/20 hover:bg-accent cursor-pointer"
            >
              <Icon
                className={`h-6 w-6 ${
                  isHighlighter
                    ? "text-yellow-500 dark:text-yellow-400"
                    : "text-foreground"
                }`}
              />
              <p className="font-medium  line-clamp-2 ellipsis">{app.label}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
