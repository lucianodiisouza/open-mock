import type { ChatState } from "@/lib/types/chat";
import type { PlatformTheme } from "@/lib/types";
import { BubbleChatPreview } from "./BubbleChatPreview";

interface SocialDMPreviewProps {
  state: ChatState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function SocialDMPreview({ state, theme, platformSlug }: SocialDMPreviewProps) {
  return <BubbleChatPreview state={state} theme={theme} platformSlug={platformSlug} />;
}
