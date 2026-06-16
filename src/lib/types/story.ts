export type StoryTextAlign = "left" | "center" | "right";
export type StoryTextPosition = "top" | "center" | "bottom";
export type StoryFontSize = "small" | "medium" | "large";

export interface StorySlide {
  backgroundImage: string;
  text: string;
  textAlign: StoryTextAlign;
  textPosition: StoryTextPosition;
  fontSize: StoryFontSize;
  duration?: number;
}

/** Persisted legacy shape — normalized via normalizeStorySlide */
export interface LegacyStorySlide {
  type: "image" | "text";
  content: string;
  duration?: number;
}

export interface StoryState {
  author: { name: string; avatar: string };
  slides: (StorySlide | LegacyStorySlide)[];
  progress: number;
  darkMode: boolean;
  deviceFrame: "none" | "iphone" | "android";
  view3d: boolean;
  statusBar: { time: string; battery: number; signal: number };
}
