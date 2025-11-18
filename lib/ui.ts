import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function isBrowser() {
  return typeof window !== "undefined";
}

export function px(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}
