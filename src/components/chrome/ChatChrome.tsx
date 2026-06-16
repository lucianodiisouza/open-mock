import type { PlatformTheme } from "@/lib/types";
import { getHeaderStyle } from "@/lib/preview-styles";
import { ChevronLeft, Phone, Video, MoreVertical, Info, Plus } from "./icons";

interface ChatHeaderProps {
  platformSlug: string;
  theme: PlatformTheme;
  dark: boolean;
  contactName: string;
  contactInitial: string;
  online?: boolean;
}

export function ChatHeader({
  platformSlug,
  theme,
  dark,
  contactName,
  contactInitial,
  online,
}: ChatHeaderProps) {
  const header = getHeaderStyle(platformSlug, theme, dark);
  const isInstagram = platformSlug === "instagram";
  const isMessenger = platformSlug === "messenger";
  const isWhatsApp = platformSlug === "whatsapp";
  const showCallIcons = isWhatsApp || isMessenger || platformSlug === "telegram";
  const lightHeader = !dark && ["messenger", "instagram", "signal", "snapchat"].includes(platformSlug);

  return (
    <div
      className="flex shrink-0 items-center gap-2 px-2 py-2"
      style={{ background: header.background, color: header.color }}
    >
      <button type="button" className="flex h-9 w-9 items-center justify-center opacity-90">
        <ChevronLeft size={22} color={header.color} />
      </button>

      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <div
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
          style={{
            background: isInstagram
              ? "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"
              : theme.accent,
            color: "#fff",
          }}
        >
          <div
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full"
            style={{
              background: isInstagram ? theme.accent : "transparent",
            }}
          >
            {contactInitial}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-semibold leading-tight">
            {contactName}
          </div>
          {online && (
            <div className="truncate text-[12px] opacity-75">
              {isWhatsApp ? "online" : "Active now"}
            </div>
          )}
        </div>
      </div>

      {showCallIcons && (
        <div className="flex items-center gap-1">
          <button type="button" className="flex h-9 w-9 items-center justify-center opacity-90">
            <Video size={20} color={header.color} />
          </button>
          <button type="button" className="flex h-9 w-9 items-center justify-center opacity-90">
            <Phone size={18} color={header.color} />
          </button>
        </div>
      )}

      {(isInstagram || lightHeader) && (
        <button type="button" className="flex h-9 w-9 items-center justify-center opacity-80">
          <Info size={20} color={header.color} />
        </button>
      )}

      {!showCallIcons && !isInstagram && !lightHeader && (
        <button type="button" className="flex h-9 w-9 items-center justify-center opacity-80">
          <MoreVertical size={18} color={header.color} />
        </button>
      )}
    </div>
  );
}

interface ChatInputBarProps {
  platformSlug: string;
  dark: boolean;
  placeholder?: string;
}

export function ChatInputBar({ platformSlug, dark, placeholder = "Message" }: ChatInputBarProps) {
  const isWhatsApp = platformSlug === "whatsapp";
  const isIMessage = platformSlug === "imessage" || platformSlug === "tech-texts";
  const isMessenger = platformSlug === "messenger";

  const barBg = dark ? "#1a1a1a" : isWhatsApp ? (dark ? "#1f2c34" : "#f0f2f5") : "#f6f6f6";
  const inputBg = dark ? "#2a3942" : "#ffffff";
  const inputBorder = dark ? "transparent" : "#e0e0e0";
  const iconColor = dark ? "#8696a0" : "#54656f";

  if (isIMessage) {
    return (
      <div
        className="flex shrink-0 items-end gap-2 border-t px-3 py-2"
        style={{ borderColor: dark ? "#333" : "#e5e5e5", background: dark ? "#000" : "#fff" }}
      >
        <button type="button" className="pb-2 opacity-70">
          <Plus size={22} color={dark ? "#0b84ff" : "#007aff"} />
        </button>
        <div
          className="flex flex-1 items-center rounded-full border px-4 py-2 text-[15px]"
          style={{
            borderColor: dark ? "#444" : "#ddd",
            color: dark ? "#666" : "#aaa",
            background: dark ? "#1c1c1e" : "#fff",
          }}
        >
          iMessage
        </div>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-2 px-2 py-2" style={{ background: barBg }}>
      {!isMessenger && (
        <button type="button" className="flex h-9 w-9 items-center justify-center">
          <Plus size={22} color={iconColor} />
        </button>
      )}

      <div
        className="flex flex-1 items-center gap-2 rounded-full px-3 py-2"
        style={{
          background: inputBg,
          border: isMessenger ? "none" : `1px solid ${inputBorder}`,
        }}
      >
        {!isMessenger && (
          <button type="button">
            <SmileIcon color={iconColor} />
          </button>
        )}
        <span className="flex-1 text-[15px]" style={{ color: iconColor }}>
          {placeholder}
        </span>
        {isMessenger && (
          <button type="button">
            <SmileIcon color={iconColor} />
          </button>
        )}
      </div>

      {isWhatsApp ? (
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: dark ? "#00a884" : "#00a884" }}
        >
          <MicIcon color="#fff" />
        </button>
      ) : (
        <button type="button" className="flex h-9 w-9 items-center justify-center">
          <CameraIcon color={iconColor} />
        </button>
      )}
    </div>
  );
}

function SmileIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

function MicIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
      <path d="M19 10v2a7 7 0 01-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
    </svg>
  );
}

function CameraIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
