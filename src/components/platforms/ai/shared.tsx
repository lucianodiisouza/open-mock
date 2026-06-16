import type { ReactNode } from "react";
import type { ChatMessage } from "@/lib/types/chat";
import type { PlatformTheme } from "@/lib/types";
import { StatusBar } from "@/components/chrome/StatusBar";

export interface AILayoutProps {
  messages: ChatMessage[];
  settings: {
    darkMode: boolean;
    statusBar: { time: string; battery: number; signal: number };
  };
  theme: PlatformTheme;
}

export function AIFrame({
  children,
  settings,
  dark,
  background,
}: {
  children: ReactNode;
  settings: AILayoutProps["settings"];
  dark: boolean;
  background: string;
}) {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ width: 390, height: 700, background, fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      <StatusBar
        time={settings.statusBar.time}
        battery={settings.statusBar.battery}
        signal={settings.statusBar.signal}
        dark={dark}
      />
      {children}
    </div>
  );
}

export function isUserMessage(senderId: string) {
  return senderId === "user";
}
