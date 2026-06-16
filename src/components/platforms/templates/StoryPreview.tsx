import type { StoryState } from "@/lib/types/story";
import type { PlatformTheme } from "@/lib/types";
import { StatusBar } from "@/components/chrome/StatusBar";
import { MoreVertical, Send } from "@/components/chrome/icons";
import { cn } from "@/lib/cn";
import { normalizeStorySlide } from "@/lib/utils/story-slide";

interface StoryPreviewProps {
  state: StoryState;
  theme: PlatformTheme;
  platformSlug: string;
}

const FONT_SIZE_CLASS = {
  small: "text-lg",
  medium: "text-2xl",
  large: "text-4xl",
} as const;

const TEXT_POSITION_CLASS = {
  top: "items-start pt-24",
  center: "items-center",
  bottom: "items-end pb-28",
} as const;

const TEXT_ALIGN_CLASS = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

export function StoryPreview({ state, theme, platformSlug }: StoryPreviewProps) {
  const { author, slides, progress } = state;
  const currentSlide = normalizeStorySlide(slides[progress] ?? slides[0]);
  const isInstagram = platformSlug === "instagram";

  return (
    <div
      className="relative flex flex-col"
      style={{
        width: 390,
        height: 700,
        background: "#000",
        fontFamily: theme.fontFamily,
      }}
    >
      <StatusBar
        time={state.statusBar.time}
        battery={state.statusBar.battery}
        signal={state.statusBar.signal}
        dark
      />

      <div className="absolute left-0 right-0 top-12 z-10 flex gap-1 px-2">
        {slides.map((_, i) => (
          <div key={i} className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/30">
            <div
              className="h-full bg-white transition-all"
              style={{ width: i < progress ? "100%" : i === progress ? "60%" : "0%" }}
            />
          </div>
        ))}
      </div>

      <div className="absolute left-3 right-3 top-[68px] z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="rounded-full p-[2px]"
            style={{
              background: isInstagram
                ? "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"
                : theme.accent,
            }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
              {author.name[0]}
            </div>
          </div>
          <span className="text-sm font-semibold text-white drop-shadow">{author.name}</span>
          <span className="text-xs text-white/70">2h</span>
        </div>
        <button type="button" className="opacity-90">
          <MoreVertical size={20} color="#fff" />
        </button>
      </div>

      <div className="relative flex flex-1 overflow-hidden">
        {currentSlide.backgroundImage ? (
          <img
            src={currentSlide.backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-black" />
        )}

        {currentSlide.text && (
          <div
            className={cn(
              "relative z-[1] flex w-full px-8",
              TEXT_POSITION_CLASS[currentSlide.textPosition],
            )}
          >
            <p
              className={cn(
                "w-full font-bold text-white drop-shadow-lg",
                FONT_SIZE_CLASS[currentSlide.fontSize],
                TEXT_ALIGN_CLASS[currentSlide.textAlign],
              )}
            >
              {currentSlide.text}
            </p>
          </div>
        )}
      </div>

      {isInstagram && (
        <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center gap-3 px-4">
          <div className="flex-1 rounded-full border border-white/40 bg-white/10 px-4 py-2.5 text-sm text-white/70 backdrop-blur">
            Send message
          </div>
          <button type="button" className="opacity-90">
            <Send size={22} color="#fff" />
          </button>
        </div>
      )}
    </div>
  );
}
