const WHATSAPP_WALLPAPER_LIGHT = "/wallpapers/whatsapp/doodle-light.png";
const WHATSAPP_WALLPAPER_DARK = "/wallpapers/whatsapp/doodle-dark.webp";

function whatsappDefaultBackground(dark: boolean): string {
  const color = dark ? "#0b141a" : "#e5ddd5";
  const image = dark ? WHATSAPP_WALLPAPER_DARK : WHATSAPP_WALLPAPER_LIGHT;
  return `${color} url("${image}") center/cover`;
}

export function getChatBackground(
  platformSlug: string,
  dark: boolean,
  wallpaper?: string,
  fallback?: string,
): string {
  if (wallpaper) return `url(${wallpaper}) center/cover`;

  if (platformSlug === "whatsapp") {
    return whatsappDefaultBackground(dark);
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
