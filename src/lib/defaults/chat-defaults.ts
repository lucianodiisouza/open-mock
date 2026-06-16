import type { ChatState } from "@/lib/types/chat";
import { createId } from "@/lib/utils/id";

const defaultSettings = {
  darkMode: false,
  wallpaper: "",
  statusBar: { time: "09:41", battery: 100, signal: 4 },
  deviceFrame: "iphone" as const,
  view3d: false,
  showTicks: true,
};

export function createDefaultChatState(overrides?: Partial<ChatState>): ChatState {
  const p1 = { id: "user", name: "You", avatar: "", online: true };
  const p2 = { id: "friend", name: "Friend", avatar: "", online: true };

  return {
    mode: "dm",
    participants: [p1, p2],
    messages: [
      {
        id: createId(),
        senderId: "friend",
        type: "text",
        text: "Hey, what are you doing?",
        timestamp: "09:40",
        status: "read",
      },
      {
        id: createId(),
        senderId: "user",
        type: "text",
        text: "Just figuring out Open Mock!",
        timestamp: "09:41",
        status: "read",
      },
    ],
    settings: { ...defaultSettings },
    ...overrides,
  };
}

export function createDefaultAIChatState(overrides?: Partial<ChatState>): ChatState {
  return createDefaultChatState({
    participants: [
      { id: "user", name: "You", avatar: "", online: true },
      { id: "ai", name: "Assistant", avatar: "", online: true },
    ],
    messages: [
      {
        id: createId(),
        senderId: "user",
        type: "text",
        text: "Explain quantum computing in simple terms.",
        timestamp: "10:00",
      },
      {
        id: createId(),
        senderId: "ai",
        type: "text",
        text: "Quantum computing uses quantum bits (qubits) that can exist in multiple states at once, enabling parallel computation for certain problems.",
        timestamp: "10:01",
      },
    ],
    settings: { ...defaultSettings, showTicks: false },
    ...overrides,
  });
}
