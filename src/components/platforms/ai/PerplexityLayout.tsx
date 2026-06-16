import { Menu, Mic } from "@/components/chrome/icons";
import { PerplexityLogo } from "./icons";
import { AIFrame, isUserMessage, type AILayoutProps } from "./shared";

export function PerplexityLayout({ messages, settings, theme }: AILayoutProps) {
  const dark = settings.darkMode;
  const bg = dark ? "#1a1a1a" : "#ffffff";
  const text = dark ? "#ececec" : "#1a1a1a";
  const userBubble = dark ? "#2a2a2a" : "#f3f3f3";
  const muted = dark ? "#888" : "#6b6b6b";
  const accent = "#20808d";

  return (
    <AIFrame settings={settings} dark={dark} background={bg}>
      <div
        className="flex shrink-0 items-center justify-between border-b px-3 py-2.5"
        style={{ borderColor: dark ? "#333" : "#eee" }}
      >
        <button type="button" className="flex h-9 w-9 items-center justify-center opacity-80">
          <Menu size={20} color={text} />
        </button>
        <div className="flex items-center gap-2">
          <PerplexityLogo size={22} />
          <span className="text-[15px] font-semibold" style={{ color: text }}>
            {theme.platformLabel}
          </span>
        </div>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-medium"
          style={{ background: dark ? "#333" : "#f0f0f0", color: text }}
        >
          U
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
        {messages.map((msg, i) => {
          if (isUserMessage(msg.senderId)) {
            return (
              <div key={msg.id} className="flex justify-end">
                <div
                  className="max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed"
                  style={{ background: userBubble, color: text, borderRadius: "16px" }}
                >
                  {msg.text}
                </div>
              </div>
            );
          }
          return (
            <div key={msg.id} className="flex flex-col gap-2">
              <div className="flex gap-3">
                <div className="shrink-0 pt-0.5">
                  <PerplexityLogo size={24} />
                </div>
                <div className="flex-1 text-[15px] leading-relaxed" style={{ color: text }}>
                  {msg.text}
                </div>
              </div>
              {i === messages.length - 1 && (
                <div className="ml-9 flex flex-wrap gap-1.5">
                  {["wikipedia.org", "nature.com", "ibm.com"].map((source) => (
                    <span
                      key={source}
                      className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                      style={{
                        background: dark ? "#1e3336" : "#e8f4f5",
                        color: accent,
                        border: `1px solid ${dark ? "#2a4a4e" : "#c5e4e8"}`,
                      }}
                    >
                      {source}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="shrink-0 px-3 py-3">
        <div
          className="flex items-center gap-2 rounded-xl border px-4 py-3"
          style={{
            borderColor: dark ? "#444" : "#e0e0e0",
            background: dark ? "#2a2a2a" : "#fafafa",
          }}
        >
          <PerplexityLogo size={18} />
          <span className="flex-1 text-[15px]" style={{ color: muted }}>
            Ask anything...
          </span>
          <button type="button" className="opacity-70">
            <Mic size={20} color={muted} />
          </button>
        </div>
      </div>
    </AIFrame>
  );
}
