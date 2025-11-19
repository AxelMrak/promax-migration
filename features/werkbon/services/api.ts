"use server";
import { authApi } from "@/lib/api/client";
import type {
  Werkbon,
  WerkbonFilters,
  WerkbonStats,
} from "@/features/werkbon/types";

export async function fetchWerkbonList(filters: WerkbonFilters = {}) {
  const params = new URLSearchParams();

  if (filters.is_invoiced !== undefined) {
    params.set("is_invoiced", String(filters.is_invoiced));
  }
  if (filters.created_by?.length) {
    filters.created_by.forEach((id) => params.append("created_by", String(id)));
  }
  if (filters.created_at_after) {
    params.set("created_at_after", filters.created_at_after);
  }
  if (filters.created_at_before) {
    params.set("created_at_before", filters.created_at_before);
  }
  if (filters.exact_product_code) {
    params.set("exact_product_code", filters.exact_product_code);
  }
  if (filters.license_plate) {
    params.set("license_plate", filters.license_plate);
  }

  return authApi<Werkbon[]>(`/werkbon/?${params.toString()}`);
}

export async function fetchWerkbonById(id: number) {
  return authApi<Werkbon>(`/werkbon/${id}/`);
}

export async function createWerkbon(payload: unknown) {
  return authApi<Werkbon>("/werkbon/", {
    method: "POST",
    body: payload,
  });
}

export async function updateWerkbon(id: number, payload: unknown) {
  return authApi<Werkbon>(`/werkbon/${id}/`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteWerkbon(id: number) {
  return authApi<void>(`/werkbon/${id}/`, {
    method: "DELETE",
  });
}

export async function fetchWerkbonStats() {
  return authApi<WerkbonStats>("/werkbon/stats/");
}
