import { cn } from "@/lib/ui";
import { navigate } from "@/features/navigation/utils";
import { useRouter } from "next/navigation";

interface MenuDockItemButtonProps {
  item: { label: string; href: string };
  isActive: boolean;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

export default function MenuDockItemButton({
  item,
  isActive,
  Icon,
}: MenuDockItemButtonProps) {
  const router = useRouter();

  return (
    <button
      key={item.label}
      onClick={() => navigate(router, item.href)}
      className="group flex flex-1 flex-col items-center justify-center py-1 cursor-pointer"
    >
      <Icon
        size={20}
        className={cn(
          "transition-all",
          isActive
            ? "text-primary scale-110"
            : "text-muted-foreground group-hover:text-foreground",
        )}
      />
      <span
        className={cn(
          "mt-0.5 text-[9px] font-medium",
          isActive
            ? "text-primary"
            : "text-muted-foreground group-hover:text-foreground",
        )}
      >
        {item.label}
      </span>
    </button>
  );
}
