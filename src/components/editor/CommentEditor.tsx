"use client";

import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { EMPTY_COMMENTS, useGeneratorStore } from "@/stores/generator-store";
import { Button } from "@/components/ui/button";
import { FormField, FormSection, ItemCard } from "@/components/ui/form";
import { Input, Textarea } from "@/components/ui/input";

export function CommentEditor() {
  const t = useTranslations("generator.comments");
  const comments = useGeneratorStore((s) =>
    s.data?.category === "comment" ? s.data.state.comments : EMPTY_COMMENTS,
  );
  const addComment = useGeneratorStore((s) => s.addComment);
  const updateComment = useGeneratorStore((s) => s.updateComment);
  const removeComment = useGeneratorStore((s) => s.removeComment);

  return (
    <FormSection
      title={t("title")}
      description={t("description")}
      action={
        <Button variant="ghost" size="sm" onClick={addComment}>
          <Plus size={14} />
          {t("addComment")}
        </Button>
      }
    >
      {comments.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-200 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
          {t("empty")}
        </p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <ItemCard key={c.id} className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <FormField label={t("author")}>
                    <Input
                      type="text"
                      value={c.author}
                      onChange={(e) =>
                        updateComment(c.id, { author: e.target.value })
                      }
                      placeholder={t("authorPlaceholder")}
                    />
                  </FormField>
                </div>
                <Button
                  variant="danger"
                  size="icon"
                  onClick={() => removeComment(c.id)}
                  aria-label={t("removeComment")}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
              <FormField label={t("comment")}>
                <Textarea
                  value={c.text}
                  onChange={(e) => updateComment(c.id, { text: e.target.value })}
                  rows={2}
                  placeholder={t("commentPlaceholder")}
                />
              </FormField>
            </ItemCard>
          ))}
        </div>
      )}
    </FormSection>
  );
}
