import type {
  GeneratorState,
  PlatformCategory,
  TemplateType,
} from "@/lib/types";
import type { ChatState } from "@/lib/types/chat";
import { createDefaultChatState, createDefaultAIChatState } from "@/lib/defaults/chat-defaults";
import { createDefaultPostState } from "@/lib/defaults/post-defaults";
import { createDefaultCommentState } from "@/lib/defaults/comment-defaults";
import { createDefaultStoryState } from "@/lib/defaults/story-defaults";
import { createDefaultEmailState } from "@/lib/defaults/email-defaults";

export interface PlatformConfig {
  slug: string;
  name: string;
  category: PlatformCategory;
  template: TemplateType;
  themeSlug: string;
  features: string[];
  seo: { title: string; description: string };
  createDefaultState: () => GeneratorState;
}

function chatPlatform(
  slug: string,
  name: string,
  template: TemplateType,
  features: string[] = ["group", "ticks", "wallpaper", "video"],
): PlatformConfig {
  return {
    slug,
    name,
    category: "chat",
    template,
    themeSlug: slug,
    features,
    seo: {
      title: `${name} Chat Mockup Generator | Open Mock`,
      description: `Create realistic fake ${name} chat screenshots. Direct and group chats with avatars, timestamps, and export to PNG.`,
    },
    createDefaultState: () => ({
      category: "chat",
      state: createDefaultChatState(),
    }),
  };
}

function aiPlatform(slug: string, name: string, stateOverrides?: Partial<ChatState>): PlatformConfig {
  return {
    slug,
    name,
    category: "ai",
    template: "ai-chat",
    themeSlug: slug,
    features: ["video"],
    seo: {
      title: `Fake ${name} Chat Mockup Generator | Open Mock`,
      description: `Create realistic fake ${name} AI chat screenshots for demos and presentations.`,
    },
    createDefaultState: () => ({
      category: "ai",
      state: createDefaultAIChatState(stateOverrides),
    }),
  };
}

function postPlatform(slug: string, name: string, template: TemplateType = "post"): PlatformConfig {
  return {
    slug,
    name,
    category: "post",
    template,
    themeSlug: slug.replace("-post", ""),
    features: ["media"],
    seo: {
      title: `Fake ${name} Post Mockup Generator | Open Mock`,
      description: `Create realistic fake ${name} post screenshots with likes, comments, and media.`,
    },
    createDefaultState: () => ({
      category: "post",
      state: createDefaultPostState(),
    }),
  };
}

function commentPlatform(slug: string, name: string): PlatformConfig {
  const base = slug.replace("-comments", "");
  return {
    slug,
    name,
    category: "comment",
    template: "comment",
    themeSlug: base,
    features: ["replies"],
    seo: {
      title: `Fake ${name} Comments Mockup Generator | Open Mock`,
      description: `Create realistic fake ${name} comment section screenshots.`,
    },
    createDefaultState: () => ({
      category: "comment",
      state: createDefaultCommentState(),
    }),
  };
}

function storyPlatform(slug: string, name: string): PlatformConfig {
  const base = slug.replace("-story", "");
  return {
    slug,
    name,
    category: "story",
    template: "story",
    themeSlug: base,
    features: ["slides"],
    seo: {
      title: `Fake ${name} Story Mockup Generator | Open Mock`,
      description: `Create realistic fake ${name} story screenshots with multiple slides.`,
    },
    createDefaultState: () => ({
      category: "story",
      state: createDefaultStoryState(),
    }),
  };
}

function emailPlatform(slug: string, name: string): PlatformConfig {
  return {
    slug,
    name,
    category: "email",
    template: "email",
    themeSlug: slug,
    features: ["folders"],
    seo: {
      title: `Fake ${name} Mockup Generator | Open Mock`,
      description: `Create realistic fake ${name} email screenshots for demos.`,
    },
    createDefaultState: () => ({
      category: "email",
      state: createDefaultEmailState(),
    }),
  };
}

export const PLATFORMS: PlatformConfig[] = [
  // Chat (22)
  chatPlatform("whatsapp", "WhatsApp", "bubble-chat"),
  chatPlatform("imessage", "iMessage", "imessage"),
  chatPlatform("telegram", "Telegram", "bubble-chat"),
  chatPlatform("signal", "Signal", "bubble-chat"),
  chatPlatform("discord", "Discord", "slack"),
  chatPlatform("slack", "Slack", "slack"),
  chatPlatform("teams", "Microsoft Teams", "slack"),
  chatPlatform("messenger", "Messenger", "bubble-chat", ["group", "video"]),
  chatPlatform("instagram", "Instagram", "social-dm"),
  chatPlatform("snapchat", "Snapchat", "social-dm"),
  chatPlatform("tiktok", "TikTok", "social-dm"),
  chatPlatform("x", "X", "twitter"),
  chatPlatform("bluesky", "Bluesky", "twitter"),
  chatPlatform("linkedin", "LinkedIn", "linkedin"),
  chatPlatform("tinder", "Tinder", "dating"),
  chatPlatform("bumble", "Bumble", "dating"),
  chatPlatform("wechat", "WeChat", "bubble-chat"),
  chatPlatform("line", "LINE", "bubble-chat"),
  chatPlatform("reddit", "Reddit", "reddit-chat"),
  chatPlatform("msn", "MSN", "bubble-chat"),
  chatPlatform("onlyfans", "OnlyFans", "social-dm"),
  chatPlatform("tech-texts", "Tech Texts", "imessage"),

  // AI (5)
  aiPlatform("chatgpt", "ChatGPT"),
  aiPlatform("claude", "Claude"),
  aiPlatform("gemini", "Gemini"),
  aiPlatform("grok", "Grok", {
    settings: {
      darkMode: true,
      wallpaper: "",
      statusBar: { time: "09:41", battery: 100, signal: 4 },
      deviceFrame: "iphone",
      view3d: false,
      showTicks: false,
    },
  }),
  aiPlatform("perplexity", "Perplexity"),

  // Posts (8)
  postPlatform("instagram-post", "Instagram"),
  postPlatform("x-post", "X", "twitter"),
  postPlatform("facebook-post", "Facebook", "facebook"),
  postPlatform("linkedin-post", "LinkedIn", "linkedin"),
  postPlatform("bluesky-post", "Bluesky", "twitter"),
  postPlatform("threads-post", "Threads", "twitter"),
  postPlatform("tiktok-post", "TikTok", "post"),
  postPlatform("pinterest-post", "Pinterest", "post"),

  // Comments (8)
  commentPlatform("youtube-comments", "YouTube"),
  commentPlatform("instagram-comments", "Instagram"),
  commentPlatform("x-comments", "X"),
  commentPlatform("facebook-comments", "Facebook"),
  commentPlatform("linkedin-comments", "LinkedIn"),
  commentPlatform("reddit-comments", "Reddit"),
  commentPlatform("threads-comments", "Threads"),
  commentPlatform("tiktok-comments", "TikTok"),

  // Stories (2)
  storyPlatform("instagram-story", "Instagram"),
  storyPlatform("snapchat-story", "Snapchat"),

  // Email (4)
  emailPlatform("gmail", "Gmail"),
  emailPlatform("outlook", "Outlook"),
  emailPlatform("apple-mail", "Apple Mail"),
  emailPlatform("redacted-email", "Redacted Email"),
];

export const PLATFORM_MAP = Object.fromEntries(
  PLATFORMS.map((p) => [p.slug, p]),
) as Record<string, PlatformConfig>;

export const PLATFORMS_BY_CATEGORY = PLATFORMS.reduce(
  (acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  },
  {} as Record<PlatformCategory, PlatformConfig[]>,
);

export const CATEGORY_LABELS: Record<PlatformCategory, string> = {
  chat: "Chat Messages",
  ai: "AI Chats",
  post: "Social Posts",
  comment: "Comments",
  story: "Stories",
  email: "Email",
};

export function getPlatform(slug: string): PlatformConfig | undefined {
  return PLATFORM_MAP[slug];
}

export function getAllSlugs(): string[] {
  return PLATFORMS.map((p) => p.slug);
}
