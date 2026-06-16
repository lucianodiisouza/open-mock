import type { ChatSettings } from "@/lib/types/chat";
import type { PlatformTheme } from "@/lib/types";

export function getChatBackground(
  settings: ChatSettings,
  theme: PlatformTheme,
  fallback?: string,
): string {
  if (settings.wallpaper) {
    return `url(${settings.wallpaper}) center/cover`;
  }

  const defaultBg = fallback ?? (settings.darkMode ? theme.backgroundDark : theme.background);
  return defaultBg;
}
