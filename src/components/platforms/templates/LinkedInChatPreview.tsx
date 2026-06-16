import type { ChatState } from "@/lib/types/chat";
import type { PlatformTheme } from "@/lib/types";
import { BubbleChatPreview } from "./BubbleChatPreview";

interface LinkedInChatPreviewProps {
  state: ChatState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function LinkedInChatPreview({ state, theme, platformSlug }: LinkedInChatPreviewProps) {
  return <BubbleChatPreview state={state} theme={theme} platformSlug={platformSlug} />;
}
