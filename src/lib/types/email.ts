export interface EmailState {
  from: { name: string; email: string };
  to: string[];
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  folder: "inbox" | "sent";
  darkMode: boolean;
  deviceFrame: "none" | "iphone" | "android";
  view3d: boolean;
}
