import type { ComponentType } from "react";
import type { ChatState } from "@/lib/types/chat";
import type { PlatformTheme } from "@/lib/types";
import { ChatGPTLayout } from "../ai/ChatGPTLayout";
import { ClaudeLayout } from "../ai/ClaudeLayout";
import { GeminiLayout } from "../ai/GeminiLayout";
import { GrokLayout } from "../ai/GrokLayout";
import { PerplexityLayout } from "../ai/PerplexityLayout";

interface AIChatPreviewProps {
  state: ChatState;
  theme: PlatformTheme;
  platformSlug: string;
}

const LAYOUTS: Record<string, ComponentType<{ messages: ChatState["messages"]; settings: ChatState["settings"]; theme: PlatformTheme }>> = {
  chatgpt: ChatGPTLayout,
  claude: ClaudeLayout,
  gemini: GeminiLayout,
  grok: GrokLayout,
  perplexity: PerplexityLayout,
};

export function AIChatPreview({ state, theme, platformSlug }: AIChatPreviewProps) {
  const Layout = LAYOUTS[platformSlug] ?? ChatGPTLayout;
  return <Layout messages={state.messages} settings={state.settings} theme={theme} />;
}
