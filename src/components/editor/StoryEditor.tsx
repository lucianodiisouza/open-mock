"use client";

import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { EMPTY_STORY_SLIDES, useGeneratorStore } from "@/stores/generator-store";
import { Button } from "@/components/ui/button";
import { FormField, FormRow, FormSection, ItemCard } from "@/components/ui/form";
import { Select, Textarea } from "@/components/ui/input";
import { ImageUploadField } from "@/components/ui/image-upload";
import type { StoryFontSize, StoryTextAlign, StoryTextPosition } from "@/lib/types/story";
import { normalizeStorySlide } from "@/lib/utils/story-slide";

export function StoryEditor() {
  const t = useTranslations("generator.slides");
  const slides = useGeneratorStore((s) =>
    s.data?.category === "story" ? s.data.state.slides : EMPTY_STORY_SLIDES,
  ).map(normalizeStorySlide);
  const addSlide = useGeneratorStore((s) => s.addSlide);
  const updateSlide = useGeneratorStore((s) => s.updateSlide);
  const removeSlide = useGeneratorStore((s) => s.removeSlide);

  return (
    <FormSection
      title={t("title")}
      description={t("description")}
      action={
        <Button variant="ghost" size="sm" onClick={addSlide}>
          <Plus size={14} />
          {t("addSlide")}
        </Button>
      }
    >
      {slides.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-200 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
          {t("empty")}
        </p>
      ) : (
        <div className="space-y-3">
          {slides.map((slide, i) => (
            <ItemCard key={i} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  {t("slideNumber", { number: i + 1 })}
                </span>
                <Button
                  variant="danger"
                  size="icon"
                  onClick={() => removeSlide(i)}
                  aria-label={t("removeSlide", { number: i + 1 })}
                >
                  <Trash2 size={14} />
                </Button>
              </div>

              <ImageUploadField
                label={t("backgroundImage")}
                description={t("backgroundImageDescription")}
                value={slide.backgroundImage}
                onChange={(dataUrl) => updateSlide(i, { backgroundImage: dataUrl })}
                onClear={() => updateSlide(i, { backgroundImage: "" })}
              />

              <FormField label={t("text")}>
                <Textarea
                  value={slide.text}
                  onChange={(e) => updateSlide(i, { text: e.target.value })}
                  rows={2}
                  placeholder={t("textPlaceholder")}
                />
              </FormField>

              <FormRow>
                <FormField label={t("textPosition")}>
                  <Select
                    value={slide.textPosition}
                    onChange={(e) =>
                      updateSlide(i, {
                        textPosition: e.target.value as StoryTextPosition,
                      })
                    }
                  >
                    <option value="top">{t("positionTop")}</option>
                    <option value="center">{t("positionCenter")}</option>
                    <option value="bottom">{t("positionBottom")}</option>
                  </Select>
                </FormField>

                <FormField label={t("textAlignment")}>
                  <Select
                    value={slide.textAlign}
                    onChange={(e) =>
                      updateSlide(i, {
                        textAlign: e.target.value as StoryTextAlign,
                      })
                    }
                  >
                    <option value="left">{t("alignLeft")}</option>
                    <option value="center">{t("alignCenter")}</option>
                    <option value="right">{t("alignRight")}</option>
                  </Select>
                </FormField>
              </FormRow>

              <FormField label={t("textSize")}>
                <Select
                  value={slide.fontSize}
                  onChange={(e) =>
                    updateSlide(i, {
                      fontSize: e.target.value as StoryFontSize,
                    })
                  }
                >
                  <option value="small">{t("sizeSmall")}</option>
                  <option value="medium">{t("sizeMedium")}</option>
                  <option value="large">{t("sizeLarge")}</option>
                </Select>
              </FormField>
            </ItemCard>
          ))}
        </div>
      )}
    </FormSection>
  );
}
