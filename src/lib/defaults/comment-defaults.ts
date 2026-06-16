import type { CommentState } from "@/lib/types/comment";
import { createId } from "@/lib/utils/id";

export function createDefaultCommentState(): CommentState {
  return {
    postPreview: "Check out this amazing project!",
    comments: [
      {
        id: createId(),
        author: "Alex",
        avatar: "",
        text: "This is incredible! Great work.",
        likes: 42,
        timestamp: "1h",
      },
      {
        id: createId(),
        author: "Sam",
        avatar: "",
        text: "How did you build this?",
        likes: 15,
        timestamp: "45m",
        replies: [
          {
            id: createId(),
            author: "Jane",
            avatar: "",
            text: "Thanks! Built with React and lots of coffee.",
            likes: 8,
            timestamp: "30m",
          },
        ],
      },
    ],
    darkMode: false,
    deviceFrame: "iphone",
    view3d: false,
    statusBar: { time: "09:41", battery: 100, signal: 4 },
  };
}
