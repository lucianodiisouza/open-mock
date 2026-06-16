import type { LegacyStorySlide, StorySlide } from "@/lib/types/story";

export function createDefaultStorySlide(
  overrides?: Partial<StorySlide>,
): StorySlide {
  return {
    backgroundImage: "",
    text: "",
    textAlign: "center",
    textPosition: "center",
    fontSize: "medium",
    duration: 5,
    ...overrides,
  };
}

export function normalizeStorySlide(
  slide: StorySlide | LegacyStorySlide,
): StorySlide {
  if ("backgroundImage" in slide && "textAlign" in slide) {
    return slide;
  }

  const legacy = slide as LegacyStorySlide;
  if (legacy.type === "image") {
    return createDefaultStorySlide({
      backgroundImage: legacy.content ?? "",
      text: "",
      duration: legacy.duration,
    });
  }

  return createDefaultStorySlide({
    text: legacy.content ?? "",
    fontSize: "large",
    duration: legacy.duration,
  });
}
