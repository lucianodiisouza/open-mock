import type { ChatState } from "@/lib/types/chat";
import type { PlatformTheme } from "@/lib/types";
import { SlackPreview } from "./SlackPreview";

interface RedditChatPreviewProps {
  state: ChatState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function RedditChatPreview({ state, theme, platformSlug }: RedditChatPreviewProps) {
  return <SlackPreview state={state} theme={theme} platformSlug={platformSlug} />;
}
