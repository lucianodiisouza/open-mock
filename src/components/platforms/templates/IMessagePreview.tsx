import type { ChatState } from "@/lib/types/chat";
import type { PlatformTheme } from "@/lib/types";
import { StatusBar } from "@/components/chrome/StatusBar";
import { ChatInputBar } from "@/components/chrome/ChatChrome";
import { ChevronLeft } from "@/components/chrome/icons";

interface IMessagePreviewProps {
  state: ChatState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function IMessagePreview({ state, theme, platformSlug }: IMessagePreviewProps) {
  const { messages, participants, settings } = state;
  const dark = settings.darkMode;
  const other = participants.find((p) => p.id !== "user") ?? participants[1];

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        width: 390,
        height: 700,
        background: dark ? "#000" : "#fff",
        fontFamily: theme.fontFamily,
      }}
    >
      <StatusBar
        time={settings.statusBar.time}
        battery={settings.statusBar.battery}
        signal={settings.statusBar.signal}
        dark={dark}
      />

      <div
        className="flex shrink-0 items-center gap-1 border-b px-1 py-1.5"
        style={{
          borderColor: dark ? "#2c2c2e" : "#e5e5ea",
          color: dark ? "#fff" : "#000",
        }}
      >
        <button type="button" className="flex h-9 w-9 items-center justify-center text-[#007aff]">
          <ChevronLeft size={24} color="#007aff" />
        </button>
        <div className="flex flex-1 flex-col items-center">
          <div
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-xs font-semibold text-white"
            style={{ background: theme.accent }}
          >
            {other?.avatar ? (
              <img src={other.avatar} alt="" className="h-full w-full object-cover" />
            ) : (
              other?.name?.[0] ?? "?"
            )}
          </div>
          <div className="mt-0.5 text-[11px] font-medium">{other?.name}</div>
        </div>
        <div className="w-9" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 py-3">
        {messages.map((msg, i) => {
          const isSent = msg.senderId === "user";
          const isLast = i === messages.length - 1;
          return (
            <div key={msg.id}>
              <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[72%] px-3.5 py-2 text-[17px] leading-snug"
                  style={{
                    background: isSent
                      ? dark ? "#0b84ff" : "#007aff"
                      : dark ? "#3a3a3c" : "#e5e5ea",
                    color: isSent ? "#fff" : dark ? "#fff" : "#000",
                    borderRadius: isSent ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  }}
                >
                  {msg.text}
                </div>
              </div>
              {isSent && isLast && (
                <div className="mt-0.5 text-right text-[11px] text-zinc-400">
                  Delivered
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ChatInputBar platformSlug={platformSlug} dark={dark} />
    </div>
  );
}
