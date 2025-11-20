"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ImageUploadField } from "@/components/ui/ImageUploadField";

import type { ImageItem } from "@/types/image";
import {
  WerkbonFormSchemaDef,
  type WerkbonFormSchema,
} from "@/features/werkbon/schema";

interface WerkbonnenFormProps {
  onSubmit?: (data: FormData) => void | Promise<void>;
  onCancel?: () => void;
}

export default function CreateWerkbonForm({
  onSubmit,
  onCancel,
}: WerkbonnenFormProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<WerkbonFormSchema>({
    resolver: zodResolver(WerkbonFormSchemaDef),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      monteur: "",
    },
  });

  const handleFormSubmit = async (values: WerkbonFormSchema) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    if (values.monteur) {
      formData.append("monteur", values.monteur);
    }

    images.forEach((img) => {
      formData.append("images", img.file);
    });

    await onSubmit?.(formData);
    reset();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <Card className="border-border py-4 max-h-[50vh] overflow-y-auto">
          <CardContent className="p-6 space-y-2">
            <Input
              label="Titel"
              placeholder="Titel van de werkbon"
              autoComplete="off"
              required
              error={errors.title?.message}
              disabled={isSubmitting}
              {...register("title")}
            />

            <Textarea
              label="Beschrijving"
              placeholder="Beschrijf de werkbon..."
              rows={4}
              required
              error={errors.description?.message}
              disabled={isSubmitting}
              {...register("description")}
            />
            <Input
              label="Monteur"
              placeholder="Naam van de monteur"
              autoComplete="off"
              error={errors.monteur?.message}
              disabled={isSubmitting}
              {...register("monteur")}
            />

            <ImageUploadField
              label="Foto's"
              description="Upload relevante foto's voor deze werkbon."
              value={images}
              onChange={setImages}
              maxFiles={10}
              disabled={isSubmitting}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Annuleren
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isSubmitting}
            isLoading={isSubmitting}
          >
            <Plus className="h-4 w-4" />
            Werkbon Aanmaken
          </Button>
        </div>
      </form>
    </div>
  );
}
