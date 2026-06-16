"use client";

import { useTranslations } from "next-intl";
import { EMPTY_PARTICIPANTS, useGeneratorStore } from "@/stores/generator-store";
import type { PlatformConfig } from "@/lib/platform-registry";
import {
  CheckboxField,
  FormField,
  FormRow,
  FormSection,
} from "@/components/ui/form";
import { Input, Select, Textarea } from "@/components/ui/input";
import { AvatarUploadField } from "@/components/ui/avatar-upload";
import { ImageUploadField } from "@/components/ui/image-upload";

export function SettingsPanel({ platform }: { platform: PlatformConfig }) {
  const data = useGeneratorStore((s) => s.data);

  if (!data) return null;

  if (data.category === "chat" || data.category === "ai") {
    return <ChatSettings platform={platform} />;
  }
  if (data.category === "post") {
    return <PostSettings platform={platform} />;
  }
  if (data.category === "comment") {
    return <CommentSettings />;
  }
  if (data.category === "story") {
    return <StorySettings />;
  }
  if (data.category === "email") {
    return <EmailSettings />;
  }
  return null;
}

function ChatSettings({ platform }: { platform: PlatformConfig }) {
  const t = useTranslations("generator.settings");
  const settings = useGeneratorStore((s) =>
    s.data?.category === "chat" || s.data?.category === "ai"
      ? s.data.state.settings
      : null,
  );
  const participants = useGeneratorStore((s) =>
    s.data?.category === "chat" || s.data?.category === "ai"
      ? s.data.state.participants
      : EMPTY_PARTICIPANTS,
  );
  const mode = useGeneratorStore((s) =>
    s.data?.category === "chat" || s.data?.category === "ai"
      ? s.data.state.mode
      : "dm",
  );
  const updateChatSettings = useGeneratorStore((s) => s.updateChatSettings);
  const updateParticipants = useGeneratorStore((s) => s.updateParticipants);
  const setChatMode = useGeneratorStore((s) => s.setChatMode);

  if (!settings) return null;

  const other = participants.find((p) => p.id !== "user") ?? participants[1];

  return (
    <FormSection title={t("appearanceTitle")} description={t("appearanceDescription")}>
      {platform.features.includes("group") && (
        <CheckboxField
          label={t("groupChat")}
          description={t("groupChatDescription")}
          checked={mode === "group"}
          onChange={(e) => setChatMode(e.target.checked ? "group" : "dm")}
        />
      )}

      <FormField label={t("contactName")}>
        <Input
          type="text"
          value={other?.name ?? ""}
          onChange={(e) => {
            const updated = participants.map((p) =>
              p.id === other?.id ? { ...p, name: e.target.value } : p,
            );
            updateParticipants(updated);
          }}
          placeholder={t("contactNamePlaceholder")}
        />
      </FormField>

      <AvatarUploadField
        label={t("contactAvatar")}
        description={t("contactAvatarDescription")}
        value={other?.avatar ?? ""}
        fallbackInitial={other?.name ?? "?"}
        onChange={(dataUrl) => {
          const updated = participants.map((p) =>
            p.id === other?.id ? { ...p, avatar: dataUrl } : p,
          );
          updateParticipants(updated);
        }}
        onClear={() => {
          const updated = participants.map((p) =>
            p.id === other?.id ? { ...p, avatar: "" } : p,
          );
          updateParticipants(updated);
        }}
      />

      <div className="space-y-1 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
          {t("displayOptions")}
        </p>
        <CheckboxField
          label={t("darkMode")}
          description={t("darkModeDescription")}
          checked={settings.darkMode}
          onChange={(e) => updateChatSettings({ darkMode: e.target.checked })}
        />
        <CheckboxField
          label={t("view3d")}
          description={t("view3dDescription")}
          checked={settings.view3d}
          onChange={(e) => updateChatSettings({ view3d: e.target.checked })}
        />
      </div>

      <FormRow>
        <FormField label={t("statusBarTime")}>
          <Input
            type="text"
            value={settings.statusBar.time}
            onChange={(e) =>
              updateChatSettings({
                statusBar: { ...settings.statusBar, time: e.target.value },
              })
            }
            placeholder="9:41"
          />
        </FormField>
        <FormField label={t("deviceFrame")}>
          <Select
            value={settings.deviceFrame}
            onChange={(e) =>
              updateChatSettings({
                deviceFrame: e.target.value as "none" | "iphone" | "android",
              })
            }
          >
            <option value="none">{t("deviceNone")}</option>
            <option value="iphone">{t("deviceIphone")}</option>
            <option value="android">{t("deviceAndroid")}</option>
          </Select>
        </FormField>
      </FormRow>

      {platform.features.includes("wallpaper") && (
        <ImageUploadField
          label={t("chatWallpaper")}
          description={t("chatWallpaperDescription")}
          value={settings.wallpaper}
          onChange={(dataUrl) => updateChatSettings({ wallpaper: dataUrl })}
          onClear={() => updateChatSettings({ wallpaper: "" })}
        />
      )}
    </FormSection>
  );
}

function PostSettings({ platform }: { platform: PlatformConfig }) {
  const t = useTranslations("generator.settings");
  const state = useGeneratorStore((s) =>
    s.data?.category === "post" ? s.data.state : null,
  );
  const updatePost = useGeneratorStore((s) => s.updatePost);
  if (!state) return null;

  return (
    <FormSection title={t("postTitle")} description={t("postDescription")}>
      <AvatarUploadField
        label={t("authorAvatar")}
        description={t("authorAvatarDescription")}
        value={state.author.avatar}
        fallbackInitial={state.author.name}
        onChange={(dataUrl) =>
          updatePost({ author: { ...state.author, avatar: dataUrl } })
        }
        onClear={() => updatePost({ author: { ...state.author, avatar: "" } })}
      />

      <FormRow>
        <FormField label={t("authorName")}>
          <Input
            type="text"
            value={state.author.name}
            onChange={(e) =>
              updatePost({ author: { ...state.author, name: e.target.value } })
            }
            placeholder={t("authorNamePlaceholder")}
          />
        </FormField>
        <FormField label={t("handle")}>
          <Input
            type="text"
            value={state.author.handle}
            onChange={(e) =>
              updatePost({ author: { ...state.author, handle: e.target.value } })
            }
            placeholder={t("handlePlaceholder")}
          />
        </FormField>
      </FormRow>

      <FormField label={t("content")}>
        <Textarea
          value={state.content}
          onChange={(e) => updatePost({ content: e.target.value })}
          rows={5}
          placeholder={t("contentPlaceholder")}
        />
      </FormField>

      {platform.features.includes("media") && (
        <ImageUploadField
          label={t("postImage")}
          description={t("postImageDescription")}
          value={state.media?.[0]?.url ?? ""}
          onChange={(dataUrl) =>
            updatePost({ media: [{ type: "image", url: dataUrl }] })
          }
          onClear={() => updatePost({ media: [] })}
        />
      )}

      <div className="space-y-1 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
          {t("displayOptions")}
        </p>
        <CheckboxField
          label={t("darkMode")}
          checked={state.darkMode}
          onChange={(e) => updatePost({ darkMode: e.target.checked })}
        />
        <CheckboxField
          label={t("view3d")}
          checked={state.view3d}
          onChange={(e) => updatePost({ view3d: e.target.checked })}
        />
      </div>
    </FormSection>
  );
}

function CommentSettings() {
  const t = useTranslations("generator.settings");
  const state = useGeneratorStore((s) =>
    s.data?.category === "comment" ? s.data.state : null,
  );
  const updateCommentState = useGeneratorStore((s) => s.updateCommentState);
  if (!state) return null;

  return (
    <FormSection title={t("postContextTitle")} description={t("postContextDescription")}>
      <FormField label={t("postPreview")} description={t("postPreviewDescription")}>
        <Input
          type="text"
          value={state.postPreview ?? ""}
          onChange={(e) => updateCommentState({ postPreview: e.target.value })}
          placeholder={t("postPreviewPlaceholder")}
        />
      </FormField>

      <CheckboxField
        label={t("darkMode")}
        description={t("darkModeDescription")}
        checked={state.darkMode}
        onChange={(e) => updateCommentState({ darkMode: e.target.checked })}
      />
    </FormSection>
  );
}

function StorySettings() {
  const t = useTranslations("generator.settings");
  const state = useGeneratorStore((s) =>
    s.data?.category === "story" ? s.data.state : null,
  );
  const updateStory = useGeneratorStore((s) => s.updateStory);
  if (!state) return null;

  return (
    <FormSection title={t("storyDetailsTitle")} description={t("storyDetailsDescription")}>
      <AvatarUploadField
        label={t("storyAuthorAvatar")}
        description={t("storyAuthorAvatarDescription")}
        value={state.author.avatar}
        fallbackInitial={state.author.name}
        onChange={(dataUrl) =>
          updateStory({ author: { ...state.author, avatar: dataUrl } })
        }
        onClear={() => updateStory({ author: { ...state.author, avatar: "" } })}
      />

      <FormField label={t("storyAuthor")}>
        <Input
          type="text"
          value={state.author.name}
          onChange={(e) =>
            updateStory({ author: { ...state.author, name: e.target.value } })
          }
          placeholder={t("storyAuthorPlaceholder")}
        />
      </FormField>
    </FormSection>
  );
}

function EmailSettings() {
  const t = useTranslations("generator.settings");
  const state = useGeneratorStore((s) =>
    s.data?.category === "email" ? s.data.state : null,
  );
  const updateEmail = useGeneratorStore((s) => s.updateEmail);
  if (!state) return null;

  return (
    <FormSection title={t("emailTitle")} description={t("emailDescription")}>
      <FormField label={t("fromName")}>
        <Input
          type="text"
          value={state.from.name}
          onChange={(e) =>
            updateEmail({ from: { ...state.from, name: e.target.value } })
          }
          placeholder={t("fromNamePlaceholder")}
        />
      </FormField>

      <FormField label={t("subject")}>
        <Input
          type="text"
          value={state.subject}
          onChange={(e) => updateEmail({ subject: e.target.value })}
          placeholder={t("subjectPlaceholder")}
        />
      </FormField>

      <FormField label={t("body")}>
        <Textarea
          value={state.body}
          onChange={(e) => updateEmail({ body: e.target.value })}
          rows={8}
          placeholder={t("bodyPlaceholder")}
        />
      </FormField>
    </FormSection>
  );
}
