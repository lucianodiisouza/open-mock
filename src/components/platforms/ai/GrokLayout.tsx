import { Menu, Plus, Mic } from "@/components/chrome/icons";
import { GrokLogo } from "./icons";
import { AIFrame, isUserMessage, type AILayoutProps } from "./shared";

export function GrokLayout({ messages, settings, theme }: AILayoutProps) {
  const dark = settings.darkMode;
  const bg = dark ? "#000000" : "#ffffff";
  const text = dark ? "#ffffff" : "#000000";
  const userBubble = dark ? "#2a2a2a" : "#f0f0f0";
  const inputBg = dark ? "#1a1a1a" : "#f5f5f5";
  const inputBorder = dark ? "#333333" : "#e0e0e0";
  const muted = dark ? "#888888" : "#666666";
  const logoColor = dark ? "#ffffff" : "#000000";

  return (
    <AIFrame settings={settings} dark={dark} background={bg}>
      <div
        className="flex shrink-0 items-center justify-between border-b px-3 py-2.5"
        style={{ borderColor: dark ? "#222" : "#eee", color: text }}
      >
        <button type="button" className="flex h-9 w-9 items-center justify-center opacity-80">
          <Menu size={20} color={text} />
        </button>
        <div className="flex items-center gap-2">
          <GrokLogo size={22} color={logoColor} />
          <span className="text-[16px] font-bold tracking-tight">{theme.platformLabel}</span>
        </div>
        <div className="w-9" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
        {messages.map((msg) => {
          if (isUserMessage(msg.senderId)) {
            return (
              <div key={msg.id} className="flex justify-end">
                <div
                  className="max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed"
                  style={{ background: userBubble, color: text, borderRadius: "20px" }}
                >
                  {msg.text}
                </div>
              </div>
            );
          }
          return (
            <div key={msg.id} className="flex gap-3">
              <div className="shrink-0 pt-0.5">
                <GrokLogo size={26} color={logoColor} />
              </div>
              <div className="flex-1 text-[15px] leading-relaxed" style={{ color: text }}>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="shrink-0 px-3 py-3">
        <div
          className="flex items-center gap-2 rounded-full border px-4 py-2.5"
          style={{ borderColor: inputBorder, background: inputBg }}
        >
          <button type="button" className="opacity-70">
            <Plus size={20} color={muted} />
          </button>
          <span className="flex-1 text-[15px]" style={{ color: muted }}>
            Ask {theme.platformLabel} anything
          </span>
          <button type="button" className="opacity-70">
            <Mic size={20} color={muted} />
          </button>
        </div>
      </div>
    </AIFrame>
  );
}
