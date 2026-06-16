"use client";

import { Plus, Trash2 } from "lucide-react";
import { EMPTY_COMMENTS, useGeneratorStore } from "@/stores/generator-store";
import { Button } from "@/components/ui/button";
import { FormField, FormSection, ItemCard } from "@/components/ui/form";
import { Input, Textarea } from "@/components/ui/input";

export function CommentEditor() {
  const comments = useGeneratorStore((s) =>
    s.data?.category === "comment" ? s.data.state.comments : EMPTY_COMMENTS,
  );
  const addComment = useGeneratorStore((s) => s.addComment);
  const updateComment = useGeneratorStore((s) => s.updateComment);
  const removeComment = useGeneratorStore((s) => s.removeComment);

  return (
    <FormSection
      title="Comments"
      description="Add and edit comment threads for your post."
      action={
        <Button variant="ghost" size="sm" onClick={addComment}>
          <Plus size={14} />
          Add comment
        </Button>
      }
    >
      {comments.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-200 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
          No comments yet. Add one to get started.
        </p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <ItemCard key={c.id} className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <FormField label="Author">
                    <Input
                      type="text"
                      value={c.author}
                      onChange={(e) =>
                        updateComment(c.id, { author: e.target.value })
                      }
                      placeholder="Username"
                    />
                  </FormField>
                </div>
                <Button
                  variant="danger"
                  size="icon"
                  onClick={() => removeComment(c.id)}
                  aria-label="Remove comment"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
              <FormField label="Comment">
                <Textarea
                  value={c.text}
                  onChange={(e) => updateComment(c.id, { text: e.target.value })}
                  rows={2}
                  placeholder="Write a comment..."
                />
              </FormField>
            </ItemCard>
          ))}
        </div>
      )}
    </FormSection>
  );
}
