"use client";

import { useState } from "react";
import type { WerkbonFilters } from "@/features/werkbon/types";
import { useWerkbonList } from "@/features/werkbon/hooks/useWerkbonList";

export function WerkbonListView() {
  const [filters, setFilters] = useState<WerkbonFilters>({});
  const { data, isLoading, error } = useWerkbonList(filters);

  return (
    <div className="flex flex-col gap-4">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data &&
        data.map((werkbon) => (
          <div key={werkbon.id} className="border p-4">
            <h2 className="text-xl font-bold">{werkbon.title}</h2>
            <p>{werkbon.description}</p>
          </div>
        ))}
    </div>
  );
}
