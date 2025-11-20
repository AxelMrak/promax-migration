import { z } from "zod";

export const WerkbonFiltersSchema = z.object({
  is_invoiced: z.boolean().optional(),
  created_by: z.array(z.number()).optional(),
  created_at_after: z.string().optional(),
  created_at_before: z.string().optional(),
  exact_product_code: z.string().optional(),
  license_plate: z.string().optional(),
  search: z.string().optional(),
});

export type WerkbonFilters = z.infer<typeof WerkbonFiltersSchema>;

export const WerkbonFormSchemaDef = z.object({
  title: z.string().min(1, "Titel is verplicht"),
  description: z.string(),
  images: z.array(z.instanceof(File)).optional(),
  monteur: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
});

export type WerkbonFormSchema = z.infer<typeof WerkbonFormSchemaDef>;
