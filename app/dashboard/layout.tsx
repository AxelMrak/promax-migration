import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-lvh bg-background">
      <Sidebar />
      <section className="lg:pl-64">{children}</section>
    </main>
  );
}
