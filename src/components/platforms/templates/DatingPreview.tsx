import type { ChatState } from "@/lib/types/chat";
import type { PlatformTheme } from "@/lib/types";
import { BubbleChatPreview } from "./BubbleChatPreview";

interface DatingPreviewProps {
  state: ChatState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function DatingPreview({ state, theme, platformSlug }: DatingPreviewProps) {
  return <BubbleChatPreview state={state} theme={theme} platformSlug={platformSlug} />;
}
