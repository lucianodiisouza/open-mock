import { Menu, Edit, Plus } from "@/components/chrome/icons";
import { ChatGPTLogo, WaveformIcon } from "./icons";
import { AIFrame, isUserMessage, type AILayoutProps } from "./shared";

export function ChatGPTLayout({ messages, settings, theme }: AILayoutProps) {
  const dark = settings.darkMode;
  const bg = dark ? "#212121" : "#ffffff";
  const text = dark ? "#ececec" : "#0d0d0d";
  const userBubble = dark ? "#2f2f2f" : "#f4f4f4";
  const inputBorder = dark ? "#4a4a4a" : "#d9d9e3";
  const inputBg = dark ? "#2f2f2f" : "#ffffff";

  return (
    <AIFrame settings={settings} dark={dark} background={bg}>
      <div className="flex shrink-0 items-center justify-between px-3 py-2.5" style={{ color: text }}>
        <button type="button" className="flex h-9 w-9 items-center justify-center opacity-80">
          <Menu size={20} color={text} />
        </button>
        <div className="flex items-center gap-2">
          <ChatGPTLogo size={22} />
          <span className="text-[16px] font-semibold">{theme.platformLabel}</span>
        </div>
        <button type="button" className="flex h-9 w-9 items-center justify-center opacity-80">
          <Edit size={18} color={text} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-4 py-4">
        {messages.map((msg) => {
          if (isUserMessage(msg.senderId)) {
            return (
              <div key={msg.id} className="flex justify-end">
                <div
                  className="max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed"
                  style={{ background: userBubble, color: text, borderRadius: "24px" }}
                >
                  {msg.text}
                </div>
              </div>
            );
          }
          return (
            <div key={msg.id} className="flex gap-3">
              <div className="shrink-0 pt-0.5">
                <ChatGPTLogo size={26} />
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
          className="flex items-center gap-2 rounded-full border px-3 py-2.5"
          style={{ borderColor: inputBorder, background: inputBg }}
        >
          <button type="button" className="opacity-70">
            <Plus size={20} color={dark ? "#aaa" : "#666"} />
          </button>
          <span className="flex-1 text-[15px]" style={{ color: dark ? "#888" : "#8e8ea0" }}>
            Ask anything
          </span>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: dark ? "#ffffff" : "#000000" }}
          >
            <WaveformIcon size={14} color={dark ? "#000" : "#fff"} />
          </button>
        </div>
      </div>
    </AIFrame>
  );
}
