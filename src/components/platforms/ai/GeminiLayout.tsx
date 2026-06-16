import { Camera, Menu, Mic } from "@/components/chrome/icons";
import { ChevronDown, GeminiLogo } from "./icons";
import { AIFrame, isUserMessage, type AILayoutProps } from "./shared";

export function GeminiLayout({ messages, settings, theme }: AILayoutProps) {
  const bg = "#f0f4f9";
  const text = "#1f1f1f";
  const userBubble = "#dde3ea";
  const headerText = "#444746";

  return (
    <AIFrame settings={settings} dark={false} background={bg}>
      <div className="flex shrink-0 items-center justify-between px-3 py-2.5">
        <button type="button" className="flex h-9 w-9 items-center justify-center opacity-80">
          <Menu size={20} color={headerText} />
        </button>
        <button type="button" className="flex items-center gap-1.5">
          <GeminiLogo size={22} />
          <span className="text-[15px] font-medium" style={{ color: headerText }}>
            {theme.platformLabel}
          </span>
          <ChevronDown size={14} color={headerText} />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c2e7ff] text-[13px] font-medium text-[#001d35]">
          U
        </div>
      </div>

      <div className="flex shrink-0 justify-center pb-2">
        <span
          className="rounded-full px-3 py-1 text-[12px] font-medium"
          style={{ background: "#e8f0fe", color: "#1a73e8" }}
        >
          Gemini 2.0 Flash
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 py-2">
        {messages.map((msg) => {
          if (isUserMessage(msg.senderId)) {
            return (
              <div key={msg.id} className="flex justify-end">
                <div
                  className="max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed"
                  style={{ background: userBubble, color: text, borderRadius: "20px 20px 4px 20px" }}
                >
                  {msg.text}
                </div>
              </div>
            );
          }
          return (
            <div key={msg.id} className="flex gap-3">
              <div className="shrink-0 pt-0.5">
                <GeminiLogo size={26} />
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
          className="flex items-center gap-2 rounded-full px-4 py-3"
          style={{ background: "#ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}
        >
          <button type="button" className="opacity-70">
            <Camera size={20} color="#444746" />
          </button>
          <span className="flex-1 text-[15px]" style={{ color: "#747775" }}>
            Ask {theme.platformLabel}
          </span>
          <button type="button" className="opacity-70">
            <Mic size={20} color="#444746" />
          </button>
        </div>
      </div>
    </AIFrame>
  );
}
