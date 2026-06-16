import type { ChatState } from "@/lib/types/chat";
import type { PlatformTheme } from "@/lib/types";
import { StatusBar } from "@/components/chrome/StatusBar";
import { ChevronLeft, MoreVertical } from "@/components/chrome/icons";

interface SlackPreviewProps {
  state: ChatState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function SlackPreview({ state, theme }: SlackPreviewProps) {
  const { messages, participants, settings } = state;
  const dark = settings.darkMode;

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        width: 390,
        height: 700,
        background: dark ? "#1a1d21" : "#ffffff",
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
        className="flex items-center gap-2 border-b px-2 py-2"
        style={{
          background: dark ? "#1a1d21" : "#fff",
          borderColor: dark ? "#333" : "#e8e8e8",
          color: dark ? "#fff" : "#1d1c1d",
        }}
      >
        <button type="button" className="flex h-9 w-9 items-center justify-center">
          <ChevronLeft size={22} color={dark ? "#fff" : "#1d1c1d"} />
        </button>
        <div className="flex-1">
          <div className="text-[17px] font-bold"># general</div>
          <div className="text-xs text-zinc-500">12 members</div>
        </div>
        <button type="button" className="flex h-9 w-9 items-center justify-center">
          <MoreVertical size={18} color={dark ? "#aaa" : "#666"} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
        {messages.map((msg) => {
          const sender = participants.find((p) => p.id === msg.senderId);
          return (
            <div key={msg.id} className="flex gap-2.5">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded text-sm font-bold text-white"
                style={{ background: theme.accent }}
              >
                {sender?.avatar ? (
                  <img src={sender.avatar} alt="" className="h-full w-full object-cover" />
                ) : (
                  sender?.name?.[0] ?? "?"
                )}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[15px] font-bold" style={{ color: dark ? "#fff" : "#1d1c1d" }}>
                    {sender?.name}
                  </span>
                  <span className="text-xs text-zinc-500">{msg.timestamp}</span>
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: dark ? "#d1d2d3" : "#1d1c1d" }}>
                  {msg.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="shrink-0 border-t p-3"
        style={{ borderColor: dark ? "#333" : "#e0e0e0", background: dark ? "#1a1d21" : "#fff" }}
      >
        <div
          className="rounded-lg border px-3 py-2.5 text-[15px]"
          style={{
            borderColor: dark ? "#444" : "#ccc",
            color: dark ? "#888" : "#aaa",
            background: dark ? "#222" : "#fff",
          }}
        >
          Message #general
        </div>
      </div>
    </div>
  );
}
