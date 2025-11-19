import Image from "next/image";
import GlobalSearch from "@/features/global-search/components/GlobalSearch";
import { Navigation } from "@/features/navigation/component/Navigation";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64  border-r border-border z-30 bg-background flex flex-col gap-4 p-4 items-center">
      <Image
        src="/logo/promax.svg"
        alt="Company Logo"
        width={150}
        height={150}
      />
      <GlobalSearch />
      <Navigation />
    </aside>
  );
}
