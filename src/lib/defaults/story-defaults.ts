import type { StoryState } from "@/lib/types/story";

export function createDefaultStoryState(): StoryState {
  return {
    author: { name: "Jane", avatar: "" },
    slides: [
      { type: "text", content: "Beautiful sunset today 🌅", duration: 5 },
      { type: "text", content: "Swipe up for more!", duration: 5 },
    ],
    progress: 0,
    darkMode: false,
    deviceFrame: "iphone",
    view3d: false,
    statusBar: { time: "09:41", battery: 100, signal: 4 },
  };
}
