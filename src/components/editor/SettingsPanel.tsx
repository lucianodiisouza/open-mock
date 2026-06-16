"use client";

import { EMPTY_PARTICIPANTS, useGeneratorStore } from "@/stores/generator-store";
import type { PlatformConfig } from "@/lib/platform-registry";
import {
  CheckboxField,
  FormField,
  FormRow,
  FormSection,
} from "@/components/ui/form";
import { Input, Select, Textarea } from "@/components/ui/input";
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
    <FormSection
      title="Appearance & settings"
      description="Customize how the chat mockup looks."
    >
      {platform.features.includes("group") && (
        <CheckboxField
          label="Group chat"
          description="Show a group conversation header instead of a DM."
          checked={mode === "group"}
          onChange={(e) => setChatMode(e.target.checked ? "group" : "dm")}
        />
      )}

      <FormField label="Contact name">
        <Input
          type="text"
          value={other?.name ?? ""}
          onChange={(e) => {
            const updated = participants.map((p) =>
              p.id === other?.id ? { ...p, name: e.target.value } : p,
            );
            updateParticipants(updated);
          }}
          placeholder="Contact or group name"
        />
      </FormField>

      <div className="space-y-1 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
          Display options
        </p>
        <CheckboxField
          label="Dark mode"
          description="Use the platform's dark theme in the preview."
          checked={settings.darkMode}
          onChange={(e) => updateChatSettings({ darkMode: e.target.checked })}
        />
        <CheckboxField
          label="3D view"
          description="Tilt the device frame for a perspective effect."
          checked={settings.view3d}
          onChange={(e) => updateChatSettings({ view3d: e.target.checked })}
        />
      </div>

      <FormRow>
        <FormField label="Status bar time">
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
        <FormField label="Device frame">
          <Select
            value={settings.deviceFrame}
            onChange={(e) =>
              updateChatSettings({
                deviceFrame: e.target.value as "none" | "iphone" | "android",
              })
            }
          >
            <option value="none">None</option>
            <option value="iphone">iPhone</option>
            <option value="android">Android</option>
          </Select>
        </FormField>
      </FormRow>

      {platform.features.includes("wallpaper") && (
        <ImageUploadField
          label="Chat wallpaper"
          description="Upload a custom background image for the chat screen."
          value={settings.wallpaper}
          onChange={(dataUrl) => updateChatSettings({ wallpaper: dataUrl })}
          onClear={() => updateChatSettings({ wallpaper: "" })}
        />
      )}
    </FormSection>
  );
}

function PostSettings({ platform }: { platform: PlatformConfig }) {
  const state = useGeneratorStore((s) =>
    s.data?.category === "post" ? s.data.state : null,
  );
  const updatePost = useGeneratorStore((s) => s.updatePost);
  if (!state) return null;

  return (
    <FormSection
      title="Post content"
      description="Edit the author and body of your social post."
    >
      <FormRow>
        <FormField label="Author name">
          <Input
            type="text"
            value={state.author.name}
            onChange={(e) =>
              updatePost({ author: { ...state.author, name: e.target.value } })
            }
            placeholder="Jane Doe"
          />
        </FormField>
        <FormField label="Handle">
          <Input
            type="text"
            value={state.author.handle}
            onChange={(e) =>
              updatePost({ author: { ...state.author, handle: e.target.value } })
            }
            placeholder="@janedoe"
          />
        </FormField>
      </FormRow>

      <FormField label="Content">
        <Textarea
          value={state.content}
          onChange={(e) => updatePost({ content: e.target.value })}
          rows={5}
          placeholder="What's on your mind?"
        />
      </FormField>

      {platform.features.includes("media") && (
        <ImageUploadField
          label="Post image"
          description="Attach an image to your social post."
          value={state.media?.[0]?.url ?? ""}
          onChange={(dataUrl) =>
            updatePost({ media: [{ type: "image", url: dataUrl }] })
          }
          onClear={() => updatePost({ media: [] })}
        />
      )}

      <div className="space-y-1 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
          Display options
        </p>
        <CheckboxField
          label="Dark mode"
          checked={state.darkMode}
          onChange={(e) => updatePost({ darkMode: e.target.checked })}
        />
        <CheckboxField
          label="3D view"
          checked={state.view3d}
          onChange={(e) => updatePost({ view3d: e.target.checked })}
        />
      </div>
    </FormSection>
  );
}

function CommentSettings() {
  const state = useGeneratorStore((s) =>
    s.data?.category === "comment" ? s.data.state : null,
  );
  const updateCommentState = useGeneratorStore((s) => s.updateCommentState);
  if (!state) return null;

  return (
    <FormSection
      title="Post context"
      description="Set the original post shown above the comments."
    >
      <FormField
        label="Post preview"
        description="Short text shown as the post being commented on."
      >
        <Input
          type="text"
          value={state.postPreview ?? ""}
          onChange={(e) => updateCommentState({ postPreview: e.target.value })}
          placeholder="Original post text..."
        />
      </FormField>

      <CheckboxField
        label="Dark mode"
        description="Use the platform's dark theme in the preview."
        checked={state.darkMode}
        onChange={(e) => updateCommentState({ darkMode: e.target.checked })}
      />
    </FormSection>
  );
}

function StorySettings() {
  const state = useGeneratorStore((s) =>
    s.data?.category === "story" ? s.data.state : null,
  );
  const updateStory = useGeneratorStore((s) => s.updateStory);
  if (!state) return null;

  return (
    <FormSection
      title="Story details"
      description="Set the author shown on your story frames."
    >
      <FormField label="Author">
        <Input
          type="text"
          value={state.author.name}
          onChange={(e) =>
            updateStory({ author: { ...state.author, name: e.target.value } })
          }
          placeholder="Your name"
        />
      </FormField>
    </FormSection>
  );
}

function EmailSettings() {
  const state = useGeneratorStore((s) =>
    s.data?.category === "email" ? s.data.state : null,
  );
  const updateEmail = useGeneratorStore((s) => s.updateEmail);
  if (!state) return null;

  return (
    <FormSection
      title="Email content"
      description="Compose the email shown in the preview."
    >
      <FormField label="From name">
        <Input
          type="text"
          value={state.from.name}
          onChange={(e) =>
            updateEmail({ from: { ...state.from, name: e.target.value } })
          }
          placeholder="Sender name"
        />
      </FormField>

      <FormField label="Subject">
        <Input
          type="text"
          value={state.subject}
          onChange={(e) => updateEmail({ subject: e.target.value })}
          placeholder="Email subject line"
        />
      </FormField>

      <FormField label="Body">
        <Textarea
          value={state.body}
          onChange={(e) => updateEmail({ body: e.target.value })}
          rows={8}
          placeholder="Write your email body..."
        />
      </FormField>
    </FormSection>
  );
}
