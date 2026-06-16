export * from "./chat";
export * from "./post";
export * from "./comment";
export * from "./story";
export * from "./email";

export type PlatformCategory =
  | "chat"
  | "ai"
  | "post"
  | "comment"
  | "story"
  | "email";

export type TemplateType =
  | "bubble-chat"
  | "imessage"
  | "slack"
  | "dating"
  | "social-dm"
  | "twitter"
  | "ai-chat"
  | "facebook"
  | "linkedin"
  | "email"
  | "story"
  | "comment"
  | "post"
  | "reddit-chat";

import type { ChatState } from "./chat";
import type { PostState } from "./post";
import type { CommentState } from "./comment";
import type { StoryState } from "./story";
import type { EmailState } from "./email";

export type GeneratorState =
  | { category: "chat" | "ai"; state: ChatState }
  | { category: "post"; state: PostState }
  | { category: "comment"; state: CommentState }
  | { category: "story"; state: StoryState }
  | { category: "email"; state: EmailState };

export interface PlatformTheme {
  primary: string;
  secondary: string;
  bubbleSent: string;
  bubbleReceived: string;
  headerBg: string;
  headerText: string;
  background: string;
  backgroundDark: string;
  accent: string;
  fontFamily: string;
  borderRadius: string;
  platformLabel: string;
}
