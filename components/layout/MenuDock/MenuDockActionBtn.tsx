import { Plus } from "lucide-react";
import { cn } from "@/lib/ui";
import { navigate } from "@/features/navigation/utils";
import { useRouter } from "next/navigation";

export default function MenuDockActionBtn({
  item,
  isActive,
}: {
  item: { label: string; href: string };
  isActive: boolean;
}) {
  const router = useRouter();
  return (
    <div key="action" className="flex flex-1 items-center justify-center">
      <button
        onClick={() => navigate(router, item.href)}
        className={cn(
          "relative z-20 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform active:scale-95",
          isActive && "ring-2 ring-primary ring-offset-2",
        )}
        aria-label={item.label}
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
}
