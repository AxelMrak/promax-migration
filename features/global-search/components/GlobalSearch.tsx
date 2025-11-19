"use client";
import { Kbd, KbdGroup } from "@/components/ui/Kbd";
import { Search } from "lucide-react";

export default function GlobalSearch() {
  const setIsOpen = (open: boolean) => {
    // Placeholder function to open the global search modal
    console.log("Global search modal open:", open);
  };
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="group flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label="Zoeken openen"
      aria-keyshortcuts="Control+K"
    >
      <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
      <span className="flex-1 text-left">Zoeken...</span>
      <KbdGroup className="opacity-50 group-hover:opacity-80 transition-opacity">
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>K</Kbd>
      </KbdGroup>
    </button>
  );
}
