"use client";

import { Plus, Trash2 } from "lucide-react";
import { EMPTY_STORY_SLIDES, useGeneratorStore } from "@/stores/generator-store";
import { Button } from "@/components/ui/button";
import { FormField, FormSection, ItemCard } from "@/components/ui/form";
import { Select, Textarea } from "@/components/ui/input";
import { ImageUploadField } from "@/components/ui/image-upload";

export function StoryEditor() {
  const slides = useGeneratorStore((s) =>
    s.data?.category === "story" ? s.data.state.slides : EMPTY_STORY_SLIDES,
  );
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

              <FormField label="Slide type">
                <Select
                  value={slide.type}
                  onChange={(e) =>
                    updateSlide(i, {
                      type: e.target.value as "text" | "image",
                      content: "",
                    })
                  }
                >
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                </Select>
              </FormField>

              {slide.type === "image" ? (
                <ImageUploadField
                  label="Story image"
                  description="Upload the image shown on this story frame."
                  value={slide.content}
                  onChange={(dataUrl) => updateSlide(i, { content: dataUrl })}
                  onClear={() => updateSlide(i, { content: "" })}
                />
              ) : (
                <FormField label="Content">
                  <Textarea
                    value={slide.content}
                    onChange={(e) => updateSlide(i, { content: e.target.value })}
                    rows={2}
                    placeholder="Slide text or caption..."
                  />
                </FormField>
              )}
            </ItemCard>
          ))}
        </div>
      )}
    </FormSection>
  );
}
