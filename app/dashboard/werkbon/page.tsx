import { WerkbonListView } from "@/features/werkbon/components/WerkbonListView";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function WerkbonPage() {
  return (
    <section className="flex flex-col gap-8">
      <header className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-semibold">Werkbonnen</h1>
          <p className="text-sm text-muted-foreground">
            Overzicht, filters, bewerken en verwijderen.
          </p>
        </div>
        <Link
          href="/werkbon/new"
          className="bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90 transition text-sm md:text-lg whitespace-nowrap"
        >
          + Nieuwe Werkbon
        </Link>
      </header>

      <WerkbonListView />
    </section>
  );
}
