import { WerkbonListView } from "@/features/werkbon/components/WerkbonListView";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function WerkbonPage() {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Werkbonnen</h1>
          <p className="text-sm text-muted-foreground">
            Overzicht, filters, bewerken en verwijderen.
          </p>
        </div>
        <Link href="/werkbon/new">
          <Button>Nieuwe werkbon</Button>
        </Link>
      </header>

      <WerkbonListView />
    </section>
  );
}
