import type { ComponentType, SVGProps } from "react";

import { ChromeIcon } from "@/components/icons/Chrome";
import { Highlighter } from "lucide-react";
import toast from "react-hot-toast";

export const HIGHLIGHTER_DOWNLOAD_URL =
  "https://highlighter.balasci.it/download/";
export const EXTENSION_DOWNLOAD_URL =
  "https://chromeplugin.balasci.it/download/";

export interface AppDownloadItem {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  onClick: () => void;
}

export const APPS_TO_DOWNLOAD: AppDownloadItem[] = [
  {
    label: "Extensie voor Browser",
    icon: ChromeIcon,
    onClick: () => {
      toast.loading("Doorverwijzen naar downloadpagina...", { duration: 1000 });
      if (typeof window !== "undefined") {
        window.open(EXTENSION_DOWNLOAD_URL, "_blank", "noopener,noreferrer");
      }
    },
  },
  {
    label: "Highlighter App",
    icon: Highlighter,
    onClick: () => {
      toast.loading("Doorverwijzen naar downloadpagina...", { duration: 1000 });
      if (typeof window !== "undefined") {
        window.open(HIGHLIGHTER_DOWNLOAD_URL, "_blank", "noopener,noreferrer");
      }
    },
  },
];
