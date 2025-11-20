"use client";

import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/ui";
import type { ImageItem } from "@/types/image";

interface ImageUploadFieldProps {
  label?: string;
  description?: string;
  value: ImageItem[];
  onChange: (images: ImageItem[]) => void;
  error?: string;
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  disabled?: boolean;
  className?: string;
}

export function ImageUploadField({
  label,
  description,
  value,
  onChange,
  error,
  multiple = true,
  maxFiles,
  accept = "image/*",
  disabled,
  className,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const current = [...value];
    const remainingSlots =
      typeof maxFiles === "number" ? maxFiles - current.length : Infinity;

    Array.from(files)
      .slice(0, remainingSlots)
      .forEach((file) => {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const preview = event.target?.result as string;
          const id = crypto.randomUUID();

          const next = [...current, { id, file, preview } satisfies ImageItem];

          current.splice(0, current.length, ...next);
          onChange(next);
        };
        reader.readAsDataURL(file);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.currentTarget.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = (id: string) => {
    const next = value.filter((img) => img.id !== id);
    onChange(next);
  };

  const handleClickArea = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <div className="flex items-center justify-between gap-2">
          <label className="text-sm font-medium">{label}</label>
          {maxFiles && (
            <span className="text-xs text-muted-foreground">
              {value.length}/{maxFiles}
            </span>
          )}
        </div>
      )}

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {/* Drop / click area */}
      <div
        onClick={handleClickArea}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          "border-border hover:border-primary/50 bg-background",
          disabled && "cursor-not-allowed opacity-60 hover:border-border/40",
        )}
      >
        <div className="flex flex-col items-center gap-4">
          <Upload className="h-6 w-6 text-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium">
              Klik om afbeeldingen te uploaden
            </p>
            <p className="text-xs text-muted-foreground">
              of sleep afbeeldingen hier
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-error mt-1" aria-live="polite">
          {error}
        </p>
      )}

      {/* Preview grid */}
      {value.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            {value.length} afbeelding{value.length !== 1 ? "en" : ""} geüpload
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {value.map((image) => (
              <div
                key={image.id}
                className="relative group rounded-lg overflow-hidden border border-border/40 bg-muted"
              >
                <img
                  src={image.preview}
                  alt={image.file.name}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => handleRemove(image.id)}
                    className="p-2 rounded-full bg-error text-error-foreground hover:bg-error/90 transition-colors"
                    title="Verwijderen"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent text-white text-[11px] p-2 truncate">
                  {image.file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
