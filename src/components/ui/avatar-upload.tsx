"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageCropModal } from "@/components/ui/image-crop-modal";
import { readFileAsDataUrl, validateImageFile } from "@/lib/utils/image";
import { cn } from "@/lib/cn";

interface AvatarUploadFieldProps {
  label: string;
  description?: string;
  value: string;
  onChange: (dataUrl: string) => void;
  onClear: () => void;
  fallbackInitial?: string;
  className?: string;
}

export function AvatarUploadField({
  label,
  description,
  value,
  onChange,
  onClear,
  fallbackInitial = "?",
  className,
}: AvatarUploadFieldProps) {
  const t = useTranslations("generator.upload");
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setError(t(validationError));
      return;
    }

    setError(null);
    const dataUrl = await readFileAsDataUrl(file);
    setCropSrc(dataUrl);
  };

  const handleCropComplete = (dataUrl: string) => {
    setCropSrc(null);
    onChange(dataUrl);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleCropCancel = () => {
    setCropSrc(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      {description && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="group relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-zinc-300 bg-zinc-50 text-lg font-bold text-zinc-400 transition-colors hover:border-emerald-400 hover:bg-emerald-50/50 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/20"
          aria-label={value ? t("replaceImage") : t("clickToUpload")}
        >
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            fallbackInitial[0]?.toUpperCase() ?? "?"
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <ImagePlus size={18} className="text-white" />
          </span>
        </button>

        <div className="flex flex-col gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            {value ? t("replaceImage") : t("clickToUpload")}
          </Button>
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="justify-start text-red-500"
              onClick={() => {
                setError(null);
                onClear();
                if (inputRef.current) inputRef.current.value = "";
              }}
            >
              <X size={14} />
              {t("removeImage")}
            </Button>
          )}
        </div>
      </div>

      <p className="text-xs text-zinc-400">{t("formats")}</p>
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

      {cropSrc && (
        <ImageCropModal
          imageSrc={cropSrc}
          onCancel={handleCropCancel}
          onComplete={handleCropComplete}
        />
      )}
    </div>
  );
}
