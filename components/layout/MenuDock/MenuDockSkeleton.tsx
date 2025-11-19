import { cn } from "@/lib/ui";
import { Skeleton } from "@/components/feedback/Skeleton";

export default function MenuDockSkeleton() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 flex h-14 w-[90%] max-w-md -translate-x-1/2 items-center justify-between rounded-2xl border border-muted/50 bg-background/95 px-4 shadow-xl backdrop-blur-xl md:hidden">
      {[...Array(5)].map((_, i) => (
        <Skeleton
          key={i}
          className={cn(i === 2 ? "h-10 w-10 rounded-full" : "h-4 w-4 rounded")}
        />
      ))}
    </nav>
  );
}
