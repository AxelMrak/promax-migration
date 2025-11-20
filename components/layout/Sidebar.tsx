import Image from "next/image";
import GlobalSearch from "@/features/global-search/components/GlobalSearch";
import { Navigation } from "@/features/navigation/component/Navigation";
import AppDownloadsSection from "@/components/sections/AppDownloadsSection";
import { Separator } from "@/components/ui/Separator";
import UserCardSidebar from "@/features/user/components/UserCardSidebar";

export function Sidebar() {
  return (
    <aside className="hidden fixed left-0 top-0 bottom-0 w-64  border-r border-border z-30 bg-background md:flex flex-col gap-4 items-center py-4">
      <Image
        src="/logo/promax.svg"
        alt="Company Logo"
        width={150}
        height={150}
      />
      <Separator className="w-full" />
      <GlobalSearch />
      <Separator className="w-full" />
      <Navigation />
      <Separator className="w-full" />
      <section className="w-full flex flex-col items-center gap-2">
        <AppDownloadsSection />
        <Separator className="w-full" />
        <UserCardSidebar />
      </section>
    </aside>
  );
}
