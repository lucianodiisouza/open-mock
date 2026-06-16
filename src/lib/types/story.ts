export interface StorySlide {
  type: "image" | "text";
  content: string;
  duration?: number;
}

export interface StoryState {
  author: { name: string; avatar: string };
  slides: StorySlide[];
  progress: number;
  darkMode: boolean;
  deviceFrame: "none" | "iphone" | "android";
  view3d: boolean;
  statusBar: { time: string; battery: number; signal: number };
}
