"use client";

import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { readFileAsDataUrl, validateImageFile } from "@/lib/utils/image";
import { cn } from "@/lib/cn";

interface ImageUploadFieldProps {
  label: string;
  description?: string;
  value: string;
  onChange: (dataUrl: string) => void;
  onClear: () => void;
  className?: string;
}

export function ImageUploadField({
  label,
  description,
  value,
  onChange,
  onClear,
  className,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    const dataUrl = await readFileAsDataUrl(file);
    onChange(dataUrl);
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      {description && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
      )}

      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
          <img src={value} alt="" className="h-32 w-full object-cover" />
          <Button
            type="button"
            variant="danger"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => {
              setError(null);
              onClear();
              if (inputRef.current) inputRef.current.value = "";
            }}
            aria-label="Remove image"
          >
            <X size={14} />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 bg-white px-4 py-8 text-sm text-zinc-500 transition-colors hover:border-emerald-400 hover:bg-emerald-50/50 hover:text-emerald-700 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-400"
        >
          <ImagePlus size={20} />
          <span>Click to upload an image</span>
          <span className="text-xs text-zinc-400">PNG, JPG, or WebP up to 5 MB</span>
        </button>
      )}

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          Replace image
        </Button>
      )}

      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          void handleFile(e.target.files?.[0]);
        }}
      />
    </div>
  );
}
