export interface PostState {
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  media?: { type: "image" | "video"; url: string }[];
  metrics: {
    likes: number;
    comments: number;
    reposts: number;
    views?: number;
  };
  timestamp: string;
  darkMode: boolean;
  deviceFrame: "none" | "iphone" | "android";
  view3d: boolean;
  statusBar: { time: string; battery: number; signal: number };
}
