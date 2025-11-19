import type { ExactCode } from "@/types/exactCode";
import type { Truck } from "@/types/truck";

export type Werkbon = {
  id: number;
  title: string;
  description: string;
  is_invoiced: boolean;
  photo_1: string | null;
  photo_2: string | null;
  photo_3: string | null;
  photo_4: string | null;
  photo_5: string | null;
  exact_code: ExactCode | null;
  truck: Truck | null;
  generated_werkbon_pdf: string | null;
  created_at: string;
  updated_at: string;
};

export type WerkbonListResponse = {
  id: number;
  title: string;
  is_invoiced: boolean;
  exact_code: ExactCode | null;
  truck: Truck | null;
};

export interface WerkbonFilters {
  is_invoiced?: boolean;
  created_by?: number[];
  created_at_after?: string;
  created_at_before?: string;
  exact_product_code?: string;
  license_plate?: string;
}

export interface WerkbonStats {
  total_count: number;
  per_user: {
    [userId: number]: number;
  };
}

export interface WerkbonCreatePayload {
  title: string;
  description: string;
}
