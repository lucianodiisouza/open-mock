"use client";

import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { getCroppedImageDataUrl } from "@/lib/utils/crop-image";

interface ImageCropModalProps {
  imageSrc: string;
  onCancel: () => void;
  onComplete: (dataUrl: string) => void;
}

export function ImageCropModal({ imageSrc, onCancel, onComplete }: ImageCropModalProps) {
  const t = useTranslations("generator.crop");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleApply = async () => {
    if (!croppedAreaPixels) return;
    setIsSaving(true);
    try {
      const dataUrl = await getCroppedImageDataUrl(imageSrc, croppedAreaPixels);
      onComplete(dataUrl);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="flex w-full max-w-md flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {t("title")}
          </h2>
        </div>

        <div className="relative h-72 bg-zinc-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="space-y-2 px-4 py-3">
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {t("zoom")}
          </label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>

        <div className="flex justify-end gap-2 border-t border-zinc-200 px-4 py-3 dark:border-zinc-700">
          <Button variant="ghost" size="sm" onClick={onCancel} disabled={isSaving}>
            {t("cancel")}
          </Button>
          <Button size="sm" onClick={() => void handleApply()} disabled={isSaving}>
            {t("apply")}
          </Button>
        </div>
      </div>
    </div>
  );
}
