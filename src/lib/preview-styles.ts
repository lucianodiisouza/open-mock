const WHATSAPP_WALLPAPER = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c8b8a8' fill-opacity='0.18' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`;

export function getChatBackground(
  platformSlug: string,
  dark: boolean,
  wallpaper?: string,
  fallback?: string,
): string {
  if (wallpaper) return `url(${wallpaper}) center/cover`;

  if (platformSlug === "whatsapp") {
    return dark ? "#0b141a" : `#e5ddd5 ${WHATSAPP_WALLPAPER}`;
  }

  return fallback ?? "#ffffff";
}

export function getBubbleRadius(
  platformSlug: string,
  isSent: boolean,
  isMessengerStyle: boolean,
): string {
  if (isMessengerStyle || ["messenger", "instagram", "facebook"].includes(platformSlug)) {
    return isSent ? "18px 18px 4px 18px" : "18px 18px 18px 4px";
  }

  if (platformSlug === "whatsapp" || platformSlug === "telegram") {
    return isSent ? "8px 0 8px 8px" : "0 8px 8px 8px";
  }

  if (platformSlug === "signal") {
    return isSent ? "18px 18px 4px 18px" : "18px 18px 18px 4px";
  }

  return isSent ? "18px 0 18px 18px" : "0 18px 18px 18px";
}

export function getSentBubbleStyle(
  platformSlug: string,
  theme: { bubbleSent: string; accent: string },
  dark: boolean,
): { background: string; color: string } {
  if (platformSlug === "whatsapp") {
    return {
      background: dark ? "#005c4b" : theme.bubbleSent,
      color: dark ? "#e9edef" : "#111b21",
    };
  }

  if (platformSlug === "signal") {
    return { background: theme.accent, color: "#ffffff" };
  }

  if (["messenger", "instagram", "facebook", "x", "tiktok"].includes(platformSlug)) {
    return { background: theme.accent, color: "#ffffff" };
  }

  if (platformSlug === "discord") {
    return { background: "#5865f2", color: "#ffffff" };
  }

  const useAccentFill = theme.bubbleSent === theme.accent;
  return {
    background: theme.bubbleSent,
    color: useAccentFill ? "#ffffff" : "#000000",
  };
}

export function getReceivedBubbleStyle(
  platformSlug: string,
  theme: { bubbleReceived: string },
  dark: boolean,
): { background: string; color: string } {
  if (platformSlug === "whatsapp") {
    return {
      background: dark ? "#202c33" : theme.bubbleReceived,
      color: dark ? "#e9edef" : "#111b21",
    };
  }

  if (platformSlug === "discord") {
    return { background: "#40444b", color: "#dcddde" };
  }

  return {
    background: dark ? "#2a2a2a" : theme.bubbleReceived,
    color: dark ? "#e9edef" : "#000000",
  };
}

export function getHeaderStyle(
  platformSlug: string,
  theme: { headerBg: string; headerText: string },
  dark: boolean,
): { background: string; color: string } {
  if (platformSlug === "whatsapp") {
    return {
      background: dark ? "#1f2c34" : theme.headerBg,
      color: "#ffffff",
    };
  }

  if (platformSlug === "telegram") {
    return { background: dark ? "#17212b" : theme.headerBg, color: "#ffffff" };
  }

  if (platformSlug === "discord") {
    return { background: "#2f3136", color: "#ffffff" };
  }

  return {
    background: dark ? "#1a1a1a" : theme.headerBg,
    color: dark ? "#ffffff" : theme.headerText,
  };
}
