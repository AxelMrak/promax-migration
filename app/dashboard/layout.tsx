import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-lvh bg-background relative">
      <Sidebar />
      <main className="container py-4 px-6 md:pl-72 transition-all">
        {children}
      </main>
    </div>
  );
}
