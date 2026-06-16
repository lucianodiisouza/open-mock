import { Menu } from "@/components/chrome/icons";
import { ArrowUp, ClaudeLogo } from "./icons";
import { AIFrame, isUserMessage, type AILayoutProps } from "./shared";

export function ClaudeLayout({ messages, settings, theme }: AILayoutProps) {
  const bg = "#faf8f5";
  const text = "#1a1a1a";
  const userBubble = "#e8d5c4";
  const muted = "#6b6b6b";

  return (
    <AIFrame settings={settings} dark={false} background={bg}>
      <div className="flex shrink-0 items-center justify-between border-b px-3 py-2.5" style={{ borderColor: "#e8e4df" }}>
        <button type="button" className="flex h-9 w-9 items-center justify-center opacity-80">
          <Menu size={20} color={text} />
        </button>
        <div className="flex items-center gap-2">
          <ClaudeLogo size={24} />
          <span className="text-[16px] font-semibold" style={{ color: text, fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {theme.platformLabel}
          </span>
        </div>
        <div className="w-9" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-4 py-5">
        {messages.map((msg) => {
          if (isUserMessage(msg.senderId)) {
            return (
              <div key={msg.id} className="flex justify-end">
                <div
                  className="max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed"
                  style={{ background: userBubble, color: text, borderRadius: "18px" }}
                >
                  {msg.text}
                </div>
              </div>
            );
          }
          return (
            <div key={msg.id} className="flex gap-3">
              <div className="shrink-0 pt-0.5">
                <ClaudeLogo size={26} />
              </div>
              <div
                className="flex-1 text-[15px] leading-relaxed"
                style={{ color: text, fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="shrink-0 border-t px-3 py-3" style={{ borderColor: "#e8e4df" }}>
        <div
          className="flex items-center gap-2 rounded-2xl border px-4 py-3"
          style={{ borderColor: "#d4cfc8", background: "#ffffff" }}
        >
          <span className="flex-1 text-[15px]" style={{ color: muted }}>
            Reply to {theme.platformLabel}...
          </span>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: "#d97757" }}
          >
            <ArrowUp size={16} color="#ffffff" />
          </button>
        </div>
      </div>
    </AIFrame>
  );
}
