export interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  timestamp: string;
  replies?: CommentItem[];
}

export interface CommentState {
  postPreview?: string;
  comments: CommentItem[];
  darkMode: boolean;
  deviceFrame: "none" | "iphone" | "android";
  view3d: boolean;
  statusBar: { time: string; battery: number; signal: number };
}
