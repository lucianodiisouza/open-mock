import type { PlatformCategory } from "@/lib/types";

const SEO_KEY_BY_CATEGORY: Record<
  PlatformCategory,
  { title: string; description: string }
> = {
  chat: {
    title: "chatTitle",
    description: "chatDescription",
  },
  ai: {
    title: "aiTitle",
    description: "aiDescription",
  },
  post: {
    title: "postTitle",
    description: "postDescription",
  },
  comment: {
    title: "commentTitle",
    description: "commentDescription",
  },
  story: {
    title: "storyTitle",
    description: "storyDescription",
  },
  email: {
    title: "emailTitle",
    description: "emailDescription",
  },
};

type TranslateFn = (
  key: string,
  values?: Record<string, string | number>,
) => string;

export function getLocalizedPlatformSeo(
  category: PlatformCategory,
  name: string,
  t: TranslateFn,
) {
  const keys = SEO_KEY_BY_CATEGORY[category];
  return {
    title: t(keys.title, { name }),
    description: t(keys.description, { name }),
  };
}
