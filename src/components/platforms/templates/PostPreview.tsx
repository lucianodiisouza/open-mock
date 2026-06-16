import type { ReactNode } from "react";
import type { PostState } from "@/lib/types/post";
import type { PlatformTheme } from "@/lib/types";
import { StatusBar } from "@/components/chrome/StatusBar";
import { MessageCircle, Repeat2, Heart, Share, Bookmark } from "lucide-react";

interface PostPreviewProps {
  state: PostState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function PostPreview({ state, theme, platformSlug }: PostPreviewProps) {
  const { author, content, metrics, timestamp, darkMode } = state;

  if (platformSlug === "facebook") {
    return <FacebookLayout state={state} theme={theme} />;
  }
  if (platformSlug === "linkedin") {
    return <LinkedInLayout state={state} theme={theme} />;
  }

  const isX = platformSlug === "x" || platformSlug === "twitter";
  const isThreads = platformSlug === "threads";

  return (
    <div
      className="flex flex-col"
      style={{
        width: 390,
        height: 700,
        background: darkMode ? "#000" : "#fff",
        fontFamily: theme.fontFamily,
      }}
    >
      <StatusBar
        time={state.statusBar.time}
        battery={state.statusBar.battery}
        signal={state.statusBar.signal}
        dark={darkMode}
      />

      {isX && (
        <div
          className="flex items-center justify-between border-b px-4 py-3"
          style={{ borderColor: darkMode ? "#2f3336" : "#eff3f4" }}
        >
          <div className="text-lg font-bold" style={{ color: darkMode ? "#e7e9ea" : "#0f1419" }}>
            Post
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <div className="border-b p-4" style={{ borderColor: darkMode ? "#2f3336" : "#eff3f4" }}>
          <div className="flex gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: darkMode ? "#333" : theme.accent }}
            >
              {author.avatar ? (
                <img src={author.avatar} alt="" className="h-full w-full rounded-full object-cover" />
              ) : (
                author.name[0]
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-[15px] font-bold" style={{ color: darkMode ? "#e7e9ea" : "#0f1419" }}>
                  {author.name}
                </span>
                {author.verified && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1d9bf0">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91-.99-1.01-2.52-1.27-3.91-.81-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81-1.01.99-1.27 2.52-.81 3.91C.88 9.33 0 10.57 0 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91 1.01 1.01 2.52 1.27 3.91.81.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81 1.01-.99 1.27-2.52.81-3.91 1.31-.67 2.19-1.91 2.19-3.34zm-11.69 4.2l-3.99-3.99 1.41-1.41 2.58 2.58 5.58-5.58 1.41 1.41-7 7z" />
                  </svg>
                )}
                <span className="text-[15px] text-zinc-500">@{author.handle}</span>
                <span className="text-zinc-500">·</span>
                <span className="text-[15px] text-zinc-500">{timestamp}</span>
              </div>

              <p
                className="mt-2 text-[17px] leading-[1.4] whitespace-pre-wrap"
                style={{ color: darkMode ? "#e7e9ea" : "#0f1419" }}
              >
                {content}
              </p>

              {state.media && state.media.length > 0 && (
                <div
                  className="mt-3 overflow-hidden rounded-2xl border"
                  style={{ borderColor: darkMode ? "#2f3336" : "#cfd9de" }}
                >
                  <img src={state.media[0].url} alt="" className="w-full" />
                </div>
              )}

              <div
                className="mt-3 flex justify-between max-w-[425px]"
                style={{ color: darkMode ? "#71767b" : "#536471" }}
              >
                <Metric icon={<MessageCircle size={18} />} value={metrics.comments} />
                <Metric icon={<Repeat2 size={18} />} value={metrics.reposts} />
                <Metric icon={<Heart size={18} />} value={metrics.likes} />
                <Metric icon={<Bookmark size={18} />} value="" />
                <Metric icon={<Share size={18} />} value="" />
              </div>
            </div>
          </div>
        </div>

        {isThreads && (
          <div className="px-4 py-3 text-sm text-zinc-500 border-b" style={{ borderColor: darkMode ? "#2f3336" : "#eff3f4" }}>
            View activity
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({ icon, value }: { icon: ReactNode; value: string | number }) {
  return (
    <span className="flex items-center gap-1.5 text-[13px]">
      {icon}
      {value !== "" && value}
    </span>
  );
}

function Avatar({ author, theme, darkMode }: { author: PostState["author"]; theme: PlatformTheme; darkMode: boolean }) {
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
      style={{ background: darkMode ? "#333" : theme.accent }}
    >
      {author.avatar ? (
        <img src={author.avatar} alt="" className="h-full w-full rounded-full object-cover" />
      ) : (
        author.name[0]
      )}
    </div>
  );
}

function FacebookLayout({ state, theme }: { state: PostState; theme: PlatformTheme }) {
  const { author, content, metrics, timestamp, darkMode, media } = state;
  const bg = darkMode ? "#18191a" : "#f0f2f5";

  return (
    <div className="flex flex-col" style={{ width: 390, height: 700, background: bg, fontFamily: theme.fontFamily }}>
      <StatusBar time={state.statusBar.time} battery={state.statusBar.battery} signal={state.statusBar.signal} dark={darkMode} />
      <div className="flex-1 overflow-auto p-3">
        <div className="rounded-lg shadow-sm" style={{ background: darkMode ? "#242526" : "#fff" }}>
          <div className="flex items-center gap-2 p-3">
            <Avatar author={author} theme={theme} darkMode={darkMode} />
            <div>
              <div className="text-[15px] font-semibold" style={{ color: darkMode ? "#e4e6eb" : "#050505" }}>
                {author.name}
              </div>
              <div className="text-xs" style={{ color: darkMode ? "#b0b3b8" : "#65676b" }}>
                {timestamp} · 🌐
              </div>
            </div>
          </div>
          <p className="px-3 pb-3 text-[15px] leading-snug" style={{ color: darkMode ? "#e4e6eb" : "#050505" }}>
            {content}
          </p>
          {media && media.length > 0 && (
            <img src={media[0].url} alt="" className="w-full" />
          )}
          <div className="flex items-center justify-between border-t px-3 py-2 text-xs" style={{ borderColor: darkMode ? "#3e4042" : "#ced0d4", color: darkMode ? "#b0b3b8" : "#65676b" }}>
            <span>👍 {metrics.likes}</span>
            <span>{metrics.comments} comments · {metrics.reposts} shares</span>
          </div>
          <div className="flex border-t" style={{ borderColor: darkMode ? "#3e4042" : "#ced0d4" }}>
            {["Like", "Comment", "Share"].map((action) => (
              <button key={action} type="button" className="flex-1 py-2.5 text-[13px] font-semibold" style={{ color: darkMode ? "#b0b3b8" : "#65676b" }}>
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkedInLayout({ state, theme }: { state: PostState; theme: PlatformTheme }) {
  const { author, content, metrics, timestamp, darkMode, media } = state;

  return (
    <div className="flex flex-col" style={{ width: 390, height: 700, background: darkMode ? "#1b1f23" : "#f3f2ef", fontFamily: theme.fontFamily }}>
      <StatusBar time={state.statusBar.time} battery={state.statusBar.battery} signal={state.statusBar.signal} dark={darkMode} />
      <div className="flex-1 overflow-auto p-2">
        <div className="rounded-lg border" style={{ background: darkMode ? "#1d2226" : "#fff", borderColor: darkMode ? "#38434f" : "#e0dfdc" }}>
          <div className="flex gap-2 p-3">
            <Avatar author={author} theme={theme} darkMode={darkMode} />
            <div>
              <div className="text-[14px] font-semibold" style={{ color: darkMode ? "#fff" : "rgba(0,0,0,0.9)" }}>
                {author.name}
              </div>
              <div className="text-xs" style={{ color: darkMode ? "#aaa" : "rgba(0,0,0,0.6)" }}>
                {author.handle} · {timestamp}
              </div>
            </div>
          </div>
          <p className="px-3 pb-3 text-[14px] leading-snug" style={{ color: darkMode ? "#fff" : "rgba(0,0,0,0.9)" }}>
            {content}
          </p>
          {media && media.length > 0 && (
            <img src={media[0].url} alt="" className="w-full" />
          )}
          <div className="flex items-center justify-between px-3 py-2 text-xs" style={{ color: darkMode ? "#aaa" : "rgba(0,0,0,0.6)" }}>
            <span>👍 {metrics.likes}</span>
            <span>{metrics.comments} comments · {metrics.reposts} reposts</span>
          </div>
          <div className="flex border-t" style={{ borderColor: darkMode ? "#38434f" : "#e0dfdc" }}>
            {["Like", "Comment", "Repost", "Send"].map((action) => (
              <button key={action} type="button" className="flex-1 py-2.5 text-[11px] font-semibold" style={{ color: darkMode ? "#aaa" : "rgba(0,0,0,0.6)" }}>
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
