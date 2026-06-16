import type { PostState } from "@/lib/types/post";

export function createDefaultPostState(): PostState {
  return {
    author: {
      name: "Jane Doe",
      handle: "janedoe",
      avatar: "",
      verified: false,
    },
    content: "Just shipped something new! Excited to share it with everyone. 🚀",
    media: [],
    metrics: { likes: 128, comments: 24, reposts: 12, views: 1500 },
    timestamp: "2h",
    darkMode: false,
    deviceFrame: "iphone",
    view3d: false,
    statusBar: { time: "09:41", battery: 100, signal: 4 },
  };
}
