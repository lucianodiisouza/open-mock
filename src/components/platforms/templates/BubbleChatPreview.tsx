import type { ChatState } from "@/lib/types/chat";
import type { PlatformTheme } from "@/lib/types";
import { StatusBar } from "@/components/chrome/StatusBar";
import { ChatHeader, ChatInputBar } from "@/components/chrome/ChatChrome";
import {
  getChatBackground,
  getBubbleRadius,
  getSentBubbleStyle,
  getReceivedBubbleStyle,
} from "@/lib/preview-styles";
import { Check, CheckCheck } from "lucide-react";

interface BubbleChatPreviewProps {
  state: ChatState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function BubbleChatPreview({ state, theme, platformSlug }: BubbleChatPreviewProps) {
  const { messages, participants, settings, mode } = state;
  const dark = settings.darkMode;
  const other = participants.find((p) => p.id !== "user") ?? participants[1];
  const bg = getChatBackground(platformSlug, dark, settings.wallpaper, dark ? theme.backgroundDark : theme.background);

  return (
    <div
      className="flex flex-col"
      style={{
        width: 390,
        height: 700,
        background: bg,
        fontFamily: theme.fontFamily,
      }}
    >
      <StatusBar
        time={settings.statusBar.time}
        battery={settings.statusBar.battery}
        signal={settings.statusBar.signal}
        dark={dark || platformSlug === "discord"}
      />

      <ChatHeader
        platformSlug={platformSlug}
        theme={theme}
        dark={dark}
        contactName={other?.name ?? "Contact"}
        contactInitial={other?.name?.[0] ?? "?"}
        online={other?.online}
      />

      <div className="flex flex-1 flex-col gap-1 overflow-hidden px-3 py-2">
        {messages.map((msg) => {
          const isSent = msg.senderId === "user";
          const sender = participants.find((p) => p.id === msg.senderId);
          const sentStyle = getSentBubbleStyle(platformSlug, theme, dark);
          const receivedStyle = getReceivedBubbleStyle(platformSlug, theme, dark);
          const bubbleStyle = isSent ? sentStyle : receivedStyle;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isSent ? "items-end" : "items-start"}`}
            >
              {mode === "group" && !isSent && (
                <span
                  className="mb-0.5 px-1 text-[11px] font-medium"
                  style={{ color: dark ? "#8696a0" : "#667781" }}
                >
                  {sender?.name}
                </span>
              )}
              <div
                className="relative max-w-[78%] px-2.5 py-1.5 text-[15px] leading-[1.35] shadow-sm"
                style={{
                  background: bubbleStyle.background,
                  color: bubbleStyle.color,
                  borderRadius: getBubbleRadius(platformSlug, isSent, false),
                  boxShadow: platformSlug === "whatsapp" && !dark
                    ? "0 1px 0.5px rgba(0,0,0,0.13)"
                    : undefined,
                }}
              >
                {msg.type === "image" && msg.imageUrl ? (
                  <img src={msg.imageUrl} alt="" className="max-w-full rounded-md" />
                ) : (
                  <span className="whitespace-pre-wrap break-words">{msg.text}</span>
                )}
                <div className="mt-0.5 flex items-center justify-end gap-1">
                  <span
                    className="text-[11px] leading-none"
                    style={{ color: isSent && sentStyle.color === "#ffffff" ? "rgba(255,255,255,0.7)" : undefined, opacity: isSent && sentStyle.color !== "#ffffff" ? 0.55 : undefined }}
                  >
                    {msg.timestamp}
                  </span>
                  {isSent && settings.showTicks && msg.status && (
                    <TickStatus status={msg.status} platformSlug={platformSlug} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ChatInputBar platformSlug={platformSlug} dark={dark} />
    </div>
  );
}

function TickStatus({ status, platformSlug }: { status: string; platformSlug: string }) {
  const color = platformSlug === "whatsapp" ? "#53bdeb" : "#34b7f1";
  if (status === "read") return <CheckCheck size={14} style={{ color }} />;
  if (status === "delivered") return <CheckCheck size={14} className="opacity-50" />;
  return <Check size={14} className="opacity-50" />;
}
