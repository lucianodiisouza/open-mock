"use client";

import { Plus, Trash2 } from "lucide-react";
import { EMPTY_STORY_SLIDES, useGeneratorStore } from "@/stores/generator-store";
import { Button } from "@/components/ui/button";
import { FormField, FormRow, FormSection, ItemCard } from "@/components/ui/form";
import { Select, Textarea } from "@/components/ui/input";
import { ImageUploadField } from "@/components/ui/image-upload";
import type { StoryFontSize, StoryTextAlign, StoryTextPosition } from "@/lib/types/story";
import { normalizeStorySlide } from "@/lib/utils/story-slide";

export function StoryEditor() {
  const slides = useGeneratorStore((s) =>
    s.data?.category === "story" ? s.data.state.slides : EMPTY_STORY_SLIDES,
  ).map(normalizeStorySlide);
  const addSlide = useGeneratorStore((s) => s.addSlide);
  const updateSlide = useGeneratorStore((s) => s.updateSlide);
  const removeSlide = useGeneratorStore((s) => s.removeSlide);

  return (
    <FormSection
      title="Slides"
      description="Each slide appears as a story frame in the preview."
      action={
        <Button variant="ghost" size="sm" onClick={addSlide}>
          <Plus size={14} />
          Add slide
        </Button>
      }
    >
      {slides.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-200 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
          No slides yet. Add one to get started.
        </p>
      ) : (
        <div className="space-y-3">
          {slides.map((slide, i) => (
            <ItemCard key={i} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Slide {i + 1}
                </span>
                <Button
                  variant="danger"
                  size="icon"
                  onClick={() => removeSlide(i)}
                  aria-label={`Remove slide ${i + 1}`}
                >
                  <Trash2 size={14} />
                </Button>
              </div>

              <ImageUploadField
                label="Background image"
                description="Optional image behind the slide text."
                value={slide.backgroundImage}
                onChange={(dataUrl) => updateSlide(i, { backgroundImage: dataUrl })}
                onClear={() => updateSlide(i, { backgroundImage: "" })}
              />

              <FormField label="Text">
                <Textarea
                  value={slide.text}
                  onChange={(e) => updateSlide(i, { text: e.target.value })}
                  rows={2}
                  placeholder="Slide text or caption..."
                />
              </FormField>

              <FormRow>
                <FormField label="Text position">
                  <Select
                    value={slide.textPosition}
                    onChange={(e) =>
                      updateSlide(i, {
                        textPosition: e.target.value as StoryTextPosition,
                      })
                    }
                  >
                    <option value="top">Top</option>
                    <option value="center">Center</option>
                    <option value="bottom">Bottom</option>
                  </Select>
                </FormField>

                <FormField label="Text alignment">
                  <Select
                    value={slide.textAlign}
                    onChange={(e) =>
                      updateSlide(i, {
                        textAlign: e.target.value as StoryTextAlign,
                      })
                    }
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </Select>
                </FormField>
              </FormRow>

              <FormField label="Text size">
                <Select
                  value={slide.fontSize}
                  onChange={(e) =>
                    updateSlide(i, {
                      fontSize: e.target.value as StoryFontSize,
                    })
                  }
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </Select>
              </FormField>
            </ItemCard>
          ))}
        </div>
      )}
    </FormSection>
  );
}
