"use client";

import { useCallback } from "react";
import { toast } from "react-hot-toast";

export interface ShareOptions<T> {
  title: (item: T) => string;
  text: (item: T) => string;
  url?: (item: T) => string;
}

export function useShare<T>() {
  const share = useCallback(async (item: T, options: ShareOptions<T>) => {
    const shareData = {
      title: options.title(item),
      text: options.text(item),
      url: options.url ? options.url(item) : window.location.href,
    };

    try {
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
      } else {
        throw new Error("Web Share API not supported");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        await copyToClipboard(shareData);
      }
    }
  }, []);

  const copyToClipboard = async (data: {
    title: string;
    text: string;
    url: string;
  }) => {
    try {
      const textToCopy = `${data.title}\n\n${data.text}\n\n${data.url}`;
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Text copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy text to clipboard");
      console.error("Share failed:", err);
    }
  };

  return { share };
}
