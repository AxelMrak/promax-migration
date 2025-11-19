import { MenuDock } from "@/components/layout/MenuDock";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-lvh bg-background">
      <Sidebar />
      <MenuDock />
      <main className="container px-6 pt-4 pb-24 transition-all md:pl-72 md:pb-4">
        {children}
      </main>
    </div>
  );
}
