import type { StoryState } from "@/lib/types/story";
import { createDefaultStorySlide } from "@/lib/utils/story-slide";

export function createDefaultStoryState(): StoryState {
  return {
    author: { name: "Jane", avatar: "" },
    slides: [
      createDefaultStorySlide({
        text: "Beautiful sunset today 🌅",
        fontSize: "large",
      }),
      createDefaultStorySlide({
        text: "Swipe up for more!",
        textPosition: "bottom",
      }),
    ],
    progress: 0,
    darkMode: false,
    deviceFrame: "iphone",
    view3d: false,
    statusBar: { time: "09:41", battery: 100, signal: 4 },
  };
}
