import type { ReactNode } from "react";
import type { EmailState } from "@/lib/types/email";
import type { PlatformTheme } from "@/lib/types";
import { StatusBar } from "@/components/chrome/StatusBar";
import { ChevronLeft, Star, Reply, MoreVertical } from "@/components/chrome/icons";

interface EmailPreviewProps {
  state: EmailState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function EmailPreview({ state, theme, platformSlug }: EmailPreviewProps) {
  const { from, to, subject, body, timestamp, darkMode, starred } = state;
  const isGmail = platformSlug === "gmail";
  const isOutlook = platformSlug === "outlook";

  if (isGmail) {
    return (
      <div
        className="flex flex-col overflow-hidden"
        style={{
          width: 390,
          height: 700,
          background: darkMode ? "#1a1a1a" : "#fff",
          fontFamily: theme.fontFamily,
        }}
      >
        <StatusBar
          time={timestamp.split(",")[1]?.trim() ?? "9:41"}
          battery={100}
          signal={4}
          dark={darkMode}
        />

        <div
          className="flex items-center gap-3 border-b px-3 py-2"
          style={{ borderColor: darkMode ? "#333" : "#e0e0e0" }}
        >
          <ChevronLeft size={22} color={darkMode ? "#fff" : "#444"} />
          <div className="flex flex-1 items-center gap-2">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white"
              style={{ background: "#1a73e8" }}
            >
              {from.name[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="truncate text-sm font-medium" style={{ color: darkMode ? "#fff" : "#202124" }}>
                  {from.name}
                </span>
                <span className="text-xs text-zinc-500">&lt;{from.email}&gt;</span>
              </div>
              <div className="text-xs text-zinc-500">to me</div>
            </div>
          </div>
          <Star size={20} color={starred ? "#f4b400" : darkMode ? "#888" : "#5f6368"} filled={starred} />
          <MoreVertical size={18} color={darkMode ? "#888" : "#5f6368"} />
        </div>

        <div className="min-h-0 flex-1 overflow-auto px-4 py-4">
          <h1 className="text-xl font-normal leading-snug" style={{ color: darkMode ? "#fff" : "#202124" }}>
            {subject}
          </h1>
          <div className="mt-2 text-xs text-zinc-500">{timestamp}</div>

          <div
            className="mt-6 whitespace-pre-wrap text-[15px] leading-relaxed"
            style={{ color: darkMode ? "#e8eaed" : "#202124" }}
          >
            {body}
          </div>
        </div>

        <div
          className="flex items-center justify-around border-t py-3"
          style={{ borderColor: darkMode ? "#333" : "#e0e0e0" }}
        >
          <ActionButton icon={<Reply size={20} color={darkMode ? "#8ab4f8" : "#1a73e8"} />} label="Reply" dark={darkMode} />
          <ActionButton icon={<ForwardIcon color={darkMode ? "#8ab4f8" : "#1a73e8"} />} label="Forward" dark={darkMode} />
        </div>
      </div>
    );
  }

  if (isOutlook) {
    return (
      <div
        className="flex flex-col overflow-hidden"
        style={{
          width: 390,
          height: 700,
          background: darkMode ? "#1f1f1f" : "#f3f2f1",
          fontFamily: theme.fontFamily,
        }}
      >
        <div className="px-4 py-3 text-sm font-semibold text-white" style={{ background: "#0078d4" }}>
          {subject}
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-white p-4" style={{ background: darkMode ? "#292929" : "#fff" }}>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0078d4] text-sm font-semibold text-white">
              {from.name[0]}
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: darkMode ? "#fff" : "#000" }}>
                {from.name}
              </div>
              <div className="text-xs text-zinc-500">
                To: {to.join(", ")} · {timestamp}
              </div>
            </div>
          </div>
          <div
            className="mt-6 whitespace-pre-wrap text-sm leading-relaxed"
            style={{ color: darkMode ? "#ccc" : "#333" }}
          >
            {body}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        width: 390,
        height: 700,
        background: darkMode ? "#1a1a1a" : "#fff",
        fontFamily: theme.fontFamily,
      }}
    >
      <div className="px-4 py-3 text-sm font-semibold text-white" style={{ background: theme.headerBg }}>
        {theme.platformLabel}
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4">
        <h1 className="text-xl font-normal" style={{ color: darkMode ? "#fff" : "#000" }}>
          {subject}
        </h1>
        <div className="mt-4 flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ background: theme.accent }}
          >
            {from.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold" style={{ color: darkMode ? "#fff" : "#000" }}>
                {from.name}
              </span>
              <span className="text-xs text-zinc-500">&lt;{from.email}&gt;</span>
            </div>
            <div className="text-xs text-zinc-500">to {to.join(", ")} · {timestamp}</div>
          </div>
        </div>
        <div className="mt-6 whitespace-pre-wrap text-sm leading-relaxed" style={{ color: darkMode ? "#ccc" : "#333" }}>
          {body}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, dark }: { icon: ReactNode; label: string; dark: boolean }) {
  return (
    <button type="button" className="flex flex-col items-center gap-1">
      {icon}
      <span className="text-xs" style={{ color: dark ? "#8ab4f8" : "#1a73e8" }}>{label}</span>
    </button>
  );
}

function ForwardIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <polyline points="15 17 20 12 15 7" />
      <path d="M4 18v-2a4 4 0 014-4h12" />
    </svg>
  );
}
