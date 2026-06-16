import type { PostState } from "@/lib/types/post";
import type { PlatformTheme } from "@/lib/types";
import { PostPreview } from "./PostPreview";

interface FacebookPostPreviewProps {
  state: PostState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function FacebookPostPreview({ state, theme, platformSlug }: FacebookPostPreviewProps) {
  return <PostPreview state={state} theme={theme} platformSlug={platformSlug} />;
}
