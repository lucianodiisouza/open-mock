import type { ChatState } from "@/lib/types/chat";
import type { PlatformTheme } from "@/lib/types";
import { BubbleChatPreview } from "./BubbleChatPreview";

interface TwitterPreviewProps {
  state: ChatState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function TwitterPreview({ state, theme, platformSlug }: TwitterPreviewProps) {
  return <BubbleChatPreview state={state} theme={theme} platformSlug={platformSlug} />;
}
