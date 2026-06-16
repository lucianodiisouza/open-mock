"use client";

import { useEffect, useRef } from "react";
import type { PlatformConfig } from "@/lib/platform-registry";
import { CATEGORY_LABELS } from "@/lib/platform-registry";
import { useGeneratorStore } from "@/stores/generator-store";
import { DeviceFrame } from "@/components/chrome/DeviceFrame";
import { PlatformPreview } from "@/components/platforms/PlatformPreview";
import { ExportButton } from "@/components/export/ExportButton";
import { MessageEditor } from "./MessageEditor";
import { CommentEditor } from "./CommentEditor";
import { StoryEditor } from "./StoryEditor";
import { SettingsPanel } from "./SettingsPanel";

interface GeneratorShellProps {
  platform: PlatformConfig;
}

export function GeneratorShell({ platform }: GeneratorShellProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const init = useGeneratorStore((s) => s.init);
  const data = useGeneratorStore((s) => s.data);

  useEffect(() => {
    init(platform.slug);
  }, [platform.slug, init]);

  const deviceFrame =
    data?.category === "chat" || data?.category === "ai"
      ? data.state.settings.deviceFrame
      : data?.category === "post"
        ? data.state.deviceFrame
        : data?.category === "comment"
          ? data.state.deviceFrame
          : data?.category === "story"
            ? data.state.deviceFrame
            : data?.category === "email"
              ? data.state.deviceFrame
              : "iphone";

  const view3d =
    data?.category === "chat" || data?.category === "ai"
      ? data.state.settings.view3d
      : data?.category === "post"
        ? data.state.view3d
        : false;

  const messageCount =
    data?.category === "chat" || data?.category === "ai"
      ? data.state.messages.length
      : 0;

  const supportsVideo =
    platform.features.includes("video") &&
    (platform.category === "chat" || platform.category === "ai");

  const hasContentEditor =
    platform.category === "chat" ||
    platform.category === "ai" ||
    platform.category === "comment" ||
    platform.category === "story";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end sm:justify-between dark:border-zinc-800">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
            {CATEGORY_LABELS[platform.category]}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {platform.name}
          </h1>
          <p className="mt-1 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
            {platform.seo.description}
          </p>
        </div>
        <ExportButton
          previewRef={previewRef}
          platformSlug={platform.slug}
          messageCount={messageCount}
          supportsVideo={supportsVideo}
        />
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="space-y-4">
          {hasContentEditor && (
            <>
              {(platform.category === "chat" || platform.category === "ai") && (
                <MessageEditor />
              )}
              {platform.category === "comment" && <CommentEditor />}
              {platform.category === "story" && <StoryEditor />}
            </>
          )}
          <SettingsPanel platform={platform} />
        </div>

        <div className="lg:sticky lg:top-6">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Live preview
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Updates as you edit
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <DeviceFrame type={deviceFrame} view3d={view3d}>
                <div ref={previewRef}>
                  <PlatformPreview platform={platform} />
                </div>
              </DeviceFrame>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
