import type { PostState } from "@/lib/types/post";
import type { PlatformTheme } from "@/lib/types";
import { PostPreview } from "./PostPreview";

interface LinkedInPostPreviewProps {
  state: PostState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function LinkedInPostPreview({ state, theme, platformSlug }: LinkedInPostPreviewProps) {
  return <PostPreview state={state} theme={theme} platformSlug={platformSlug} />;
}
