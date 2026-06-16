"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Download, Film, X } from "lucide-react";
import { exportToPng } from "@/lib/export/png";
import { exportToVideo } from "@/lib/export/video";
import { Button } from "@/components/ui/button";
import { CheckboxField, FormField } from "@/components/ui/form";
import { Select } from "@/components/ui/input";

interface ExportButtonProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  platformSlug: string;
  messageCount?: number;
  supportsVideo?: boolean;
}

export function ExportButton({
  previewRef,
  platformSlug,
  messageCount = 0,
  supportsVideo = false,
}: ExportButtonProps) {
  const t = useTranslations("generator.export");
  const tCommon = useTranslations("common");
  const [exporting, setExporting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scale, setScale] = useState(3);
  const [transparent, setTransparent] = useState(false);

  const handlePngExport = async () => {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      await exportToPng(previewRef.current, {
        scale,
        transparent,
        filename: `open-mock-${platformSlug}-${Date.now()}.png`,
      });
    } finally {
      setExporting(false);
      setShowModal(false);
    }
  };

  const handleVideoExport = async () => {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      await exportToVideo(previewRef.current, messageCount, {
        filename: `open-mock-${platformSlug}-${Date.now()}.webm`,
      });
    } finally {
      setExporting(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        <Download size={16} />
        {t("button")}
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
            role="dialog"
            aria-labelledby="export-title"
            aria-modal="true"
          >
            <div className="flex items-start justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
              <div>
                <h3
                  id="export-title"
                  className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  {t("title")}
                </h3>
                <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                  {t("description")}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowModal(false)}
                aria-label={tCommon("close")}
              >
                <X size={16} />
              </Button>
            </div>

            <div className="space-y-4 px-6 py-5">
              <FormField label={t("resolution")} description={t("resolutionDescription")}>
                <Select
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                >
                  <option value={1}>{t("resolution1x")}</option>
                  <option value={2}>{t("resolution2x")}</option>
                  <option value={3}>{t("resolution3x")}</option>
                </Select>
              </FormField>

              <CheckboxField
                label={t("transparentBackground")}
                description={t("transparentBackgroundDescription")}
                checked={transparent}
                onChange={(e) => setTransparent(e.target.checked)}
              />
            </div>

            <div className="flex gap-2 border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
              <Button
                className="flex-1"
                onClick={handlePngExport}
                disabled={exporting}
              >
                <Download size={16} />
                {exporting ? t("exporting") : t("exportPng")}
              </Button>
              {supportsVideo && (
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={handleVideoExport}
                  disabled={exporting}
                >
                  <Film size={16} />
                  {t("video")}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
