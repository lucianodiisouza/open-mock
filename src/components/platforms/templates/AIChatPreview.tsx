import type { ChatState } from "@/lib/types/chat";
import type { PlatformTheme } from "@/lib/types";
import { StatusBar } from "@/components/chrome/StatusBar";
import { Menu, Edit, Plus, Mic } from "@/components/chrome/icons";

interface AIChatPreviewProps {
  state: ChatState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function AIChatPreview({ state, theme, platformSlug }: AIChatPreviewProps) {
  const { messages, settings } = state;
  const dark = settings.darkMode;
  const assistant = getAssistantMeta(platformSlug);

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        width: 390,
        height: 700,
        background: dark ? theme.backgroundDark : "#ffffff",
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
        className="flex shrink-0 items-center justify-between border-b px-3 py-2.5"
        style={{
          borderColor: dark ? "#444" : "#e5e5e5",
          color: dark ? "#fff" : "#000",
        }}
      >
        <button type="button" className="flex h-9 w-9 items-center justify-center opacity-80">
          <Menu size={20} color={dark ? "#fff" : "#000"} />
        </button>
        <div className="flex items-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-white"
            style={{ background: assistant.color }}
          >
            {assistant.icon}
          </div>
          <span className="text-[15px] font-semibold">{theme.platformLabel}</span>
        </div>
        <button type="button" className="flex h-9 w-9 items-center justify-center opacity-80">
          <Edit size={18} color={dark ? "#fff" : "#000"} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
        {messages.map((msg) => {
          const isUser = msg.senderId === "user";
          if (isUser) {
            return (
              <div key={msg.id} className="flex justify-end">
                <div
                  className="max-w-[82%] px-4 py-2.5 text-[15px] leading-relaxed"
                  style={{
                    background: dark ? "#2f2f2f" : "#f4f4f4",
                    color: dark ? "#ececec" : "#0d0d0d",
                    borderRadius: "20px",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className="flex gap-3">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-[10px] font-bold text-white"
                style={{ background: assistant.color }}
              >
                {assistant.icon}
              </div>
              <div
                className="flex-1 text-[15px] leading-relaxed"
                style={{ color: dark ? "#ececec" : "#0d0d0d" }}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="shrink-0 border-t px-3 py-3"
        style={{ borderColor: dark ? "#444" : "#e5e5e5" }}
      >
        <div
          className="flex items-center gap-2 rounded-full border px-3 py-2.5 shadow-sm"
          style={{
            borderColor: dark ? "#555" : "#d9d9e3",
            background: dark ? "#2f2f2f" : "#fff",
          }}
        >
          <button type="button" className="opacity-70">
            <Plus size={20} color={dark ? "#aaa" : "#666"} />
          </button>
          <span className="flex-1 text-[15px]" style={{ color: dark ? "#888" : "#8e8ea0" }}>
            Message {theme.platformLabel}...
          </span>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: dark ? "#fff" : "#000" }}
          >
            <Mic size={16} color={dark ? "#000" : "#fff"} />
          </button>
        </div>
      </div>
    </div>
  );
}

function getAssistantMeta(slug: string) {
  const map: Record<string, { icon: string; color: string }> = {
    chatgpt: { icon: "G", color: "#10a37f" },
    claude: { icon: "C", color: "#d97757" },
    gemini: { icon: "✦", color: "#4285f4" },
    grok: { icon: "Ø", color: "#000000" },
    perplexity: { icon: "P", color: "#20b8cd" },
  };
  return map[slug] ?? { icon: "AI", color: "#666" };
}
