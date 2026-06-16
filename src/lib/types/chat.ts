export type MessageType = "text" | "image" | "voice" | "system";
export type MessageStatus = "sent" | "delivered" | "read";
export type ChatMode = "dm" | "group";
export type DeviceFrame = "none" | "iphone" | "android";

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  online?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  type: MessageType;
  text?: string;
  imageUrl?: string;
  timestamp: string;
  status?: MessageStatus;
  reactions?: string[];
}

export interface ChatSettings {
  darkMode: boolean;
  wallpaper: string;
  statusBar: { time: string; battery: number; signal: number };
  deviceFrame: DeviceFrame;
  view3d: boolean;
  showTicks: boolean;
}

export interface ChatState {
  mode: ChatMode;
  participants: Participant[];
  messages: ChatMessage[];
  settings: ChatSettings;
}
