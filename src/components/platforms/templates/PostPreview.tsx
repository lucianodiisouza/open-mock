import type { ReactNode } from "react";
import type { PostState } from "@/lib/types/post";
import type { PlatformTheme } from "@/lib/types";
import { StatusBar } from "@/components/chrome/StatusBar";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Share,
  Bookmark,
  MoreHorizontal,
  Send,
  Music2,
} from "lucide-react";

interface PostPreviewProps {
  state: PostState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function PostPreview({ state, theme, platformSlug }: PostPreviewProps) {
  switch (platformSlug) {
    case "facebook":
      return <FacebookLayout state={state} theme={theme} />;
    case "linkedin":
      return <LinkedInLayout state={state} theme={theme} />;
    case "instagram":
      return <InstagramLayout state={state} theme={theme} />;
    case "tiktok":
      return <TikTokLayout state={state} theme={theme} />;
    case "pinterest":
      return <PinterestLayout state={state} theme={theme} />;
    case "bluesky":
      return <BlueskyLayout state={state} theme={theme} />;
    case "threads":
      return <ThreadsLayout state={state} theme={theme} />;
    default:
      return <XLayout state={state} theme={theme} platformSlug={platformSlug} />;
  }
}

function PreviewShell({
  state,
  theme,
  dark,
  bg,
  children,
}: {
  state: PostState;
  theme: PlatformTheme;
  dark: boolean;
  bg: string;
  children: ReactNode;
}) {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ width: 390, height: 700, background: bg, fontFamily: theme.fontFamily }}
    >
      <StatusBar
        time={state.statusBar.time}
        battery={state.statusBar.battery}
        signal={state.statusBar.signal}
        dark={dark}
      />
      {children}
    </div>
  );
}

function Avatar({
  author,
  theme,
  darkMode,
  size = 40,
}: {
  author: PostState["author"];
  theme: PlatformTheme;
  darkMode: boolean;
  size?: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
      style={{
        width: size,
        height: size,
        background: darkMode ? "#333" : theme.accent,
      }}
    >
      {author.avatar ? (
        <img src={author.avatar} alt="" className="h-full w-full rounded-full object-cover" />
      ) : (
        author.name[0]
      )}
    </div>
  );
}

function VerifiedBadge({ color = "#1d9bf0" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91-.99-1.01-2.52-1.27-3.91-.81-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81-1.01.99-1.27 2.52-.81 3.91C.88 9.33 0 10.57 0 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91 1.01 1.01 2.52 1.27 3.91.81.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81 1.01-.99 1.27-2.52.81-3.91 1.31-.67 2.19-1.91 2.19-3.34zm-11.69 4.2l-3.99-3.99 1.41-1.41 2.58 2.58 5.58-5.58 1.41 1.41-7 7z" />
    </svg>
  );
}

function XLayout({
  state,
  theme,
  platformSlug,
}: {
  state: PostState;
  theme: PlatformTheme;
  platformSlug: string;
}) {
  const { author, content, metrics, timestamp, darkMode: dark } = state;
  const isX = platformSlug === "x" || platformSlug === "twitter";
  const text = dark ? "#e7e9ea" : "#0f1419";
  const muted = dark ? "#71767b" : "#536471";
  const border = dark ? "#2f3336" : "#eff3f4";

  return (
    <PreviewShell state={state} theme={theme} dark={dark} bg={dark ? "#000" : "#fff"}>
      {isX && (
        <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: border }}>
          <div className="text-lg font-bold" style={{ color: text }}>
            Post
          </div>
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-auto">
        <div className="border-b p-4" style={{ borderColor: border }}>
          <div className="flex gap-3">
            <Avatar author={author} theme={theme} darkMode={dark} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-[15px] font-bold" style={{ color: text }}>
                  {author.name}
                </span>
                {author.verified && <VerifiedBadge />}
                <span className="text-[15px]" style={{ color: muted }}>
                  @{author.handle}
                </span>
                <span style={{ color: muted }}>·</span>
                <span className="text-[15px]" style={{ color: muted }}>
                  {timestamp}
                </span>
              </div>

              <p className="mt-2 whitespace-pre-wrap text-[17px] leading-[1.4]" style={{ color: text }}>
                {content}
              </p>

              {state.media && state.media.length > 0 && (
                <div
                  className="mt-3 overflow-hidden rounded-2xl border"
                  style={{ borderColor: dark ? "#2f3336" : "#cfd9de" }}
                >
                  <img src={state.media[0].url} alt="" className="w-full" />
                </div>
              )}

              <div className="mt-3 flex max-w-[425px] justify-between" style={{ color: muted }}>
                <Metric icon={<MessageCircle size={18} />} value={metrics.comments} />
                <Metric icon={<Repeat2 size={18} />} value={metrics.reposts} />
                <Metric icon={<Heart size={18} />} value={metrics.likes} />
                <Metric icon={<Bookmark size={18} />} value="" />
                <Metric icon={<Share size={18} />} value="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function InstagramLayout({ state, theme }: { state: PostState; theme: PlatformTheme }) {
  const { author, content, metrics, timestamp, darkMode: dark, media } = state;
  const bg = dark ? "#000" : "#fff";
  const text = dark ? "#f5f5f5" : "#262626";
  const muted = dark ? "#a8a8a8" : "#8e8e8e";
  const border = dark ? "#262626" : "#dbdbdb";
  const igGradient = "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)";

  return (
    <PreviewShell state={state} theme={theme} dark={dark} bg={bg}>
      <div className="flex items-center justify-between border-b px-3 py-2.5" style={{ borderColor: border }}>
        <div className="flex items-center gap-2">
          <div className="rounded-full p-[2px]" style={{ background: igGradient }}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
              {author.avatar ? (
                <img src={author.avatar} alt="" className="h-full w-full rounded-full object-cover" />
              ) : (
                author.name[0]
              )}
            </div>
          </div>
          <span className="text-sm font-semibold" style={{ color: text }}>
            {author.handle}
          </span>
        </div>
        <MoreHorizontal size={20} style={{ color: text }} />
      </div>

      {media && media.length > 0 ? (
        <img src={media[0].url} alt="" className="aspect-square w-full object-cover" />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center bg-zinc-100 text-zinc-400">
          No media
        </div>
      )}

      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Heart size={24} style={{ color: text }} />
            <MessageCircle size={24} style={{ color: text }} />
            <Send size={22} style={{ color: text }} />
          </div>
          <Bookmark size={24} style={{ color: text }} />
        </div>

        <div className="mt-2 text-sm font-semibold" style={{ color: text }}>
          {metrics.likes.toLocaleString()} likes
        </div>

        <p className="mt-1 text-sm leading-snug" style={{ color: text }}>
          <span className="font-semibold">{author.handle}</span> {content}
        </p>

        {metrics.comments > 0 && (
          <button type="button" className="mt-1 text-sm" style={{ color: muted }}>
            View all {metrics.comments} comments
          </button>
        )}

        <div className="mt-1 text-[10px] uppercase tracking-wide" style={{ color: muted }}>
          {timestamp} ago
        </div>
      </div>
    </PreviewShell>
  );
}

function TikTokLayout({ state, theme }: { state: PostState; theme: PlatformTheme }) {
  const { author, content, metrics, media } = state;

  return (
    <PreviewShell state={state} theme={theme} dark bg="#000">
      <div className="relative min-h-0 flex-1">
        {media && media.length > 0 ? (
          <img src={media[0].url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-700 to-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="absolute bottom-20 right-3 flex flex-col items-center gap-5">
          <ActionStack icon={<Heart size={28} fill="#fff" color="#fff" />} label={formatCount(metrics.likes)} />
          <ActionStack icon={<MessageCircle size={28} color="#fff" />} label={formatCount(metrics.comments)} />
          <ActionStack icon={<Bookmark size={28} color="#fff" />} label={formatCount(metrics.reposts)} />
          <ActionStack icon={<Share size={26} color="#fff" />} label="Share" />
        </div>

        <div className="absolute bottom-20 left-3 right-16">
          <div className="flex items-center gap-2">
            <Avatar author={author} theme={theme} darkMode size={36} />
            <span className="text-[15px] font-bold text-white">{author.handle}</span>
            {author.verified && <VerifiedBadge color="#20d5ec" />}
          </div>
          <p className="mt-2 text-[14px] leading-snug text-white">{content}</p>
          <div className="mt-2 flex items-center gap-2 text-sm text-white/90">
            <Music2 size={14} />
            <span className="truncate">original sound — {author.name}</span>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function PinterestLayout({ state, theme }: { state: PostState; theme: PlatformTheme }) {
  const { author, content, metrics, darkMode: dark, media } = state;
  const bg = dark ? "#111" : "#fff";
  const text = dark ? "#fff" : "#111";
  const muted = dark ? "#aaa" : "#767676";

  return (
    <PreviewShell state={state} theme={theme} dark={dark} bg={bg}>
      <div className="min-h-0 flex-1 overflow-auto p-3">
        <div className="overflow-hidden rounded-2xl" style={{ background: dark ? "#1a1a1a" : "#fff" }}>
          <div className="relative">
            {media && media.length > 0 ? (
              <img src={media[0].url} alt="" className="w-full rounded-2xl" />
            ) : (
              <div className="flex aspect-[3/4] w-full items-center justify-center rounded-2xl bg-zinc-200 text-zinc-400">
                Pin image
              </div>
            )}
            <button
              type="button"
              className="absolute right-3 top-3 rounded-full px-4 py-2 text-[15px] font-semibold text-white"
              style={{ background: theme.accent }}
            >
              Save
            </button>
          </div>

          <div className="p-3">
            <div className="flex items-center gap-2">
              <Avatar author={author} theme={theme} darkMode={dark} size={32} />
              <span className="text-sm font-semibold" style={{ color: text }}>
                {author.name}
              </span>
            </div>

            <h2 className="mt-2 text-xl font-bold leading-tight" style={{ color: text }}>
              {content.split("\n")[0]}
            </h2>
            {content.includes("\n") && (
              <p className="mt-1 text-sm leading-snug" style={{ color: muted }}>
                {content.split("\n").slice(1).join("\n")}
              </p>
            )}

            <div className="mt-3 flex items-center gap-4 text-sm" style={{ color: muted }}>
              <span>{formatCount(metrics.likes)} saves</span>
              <span>{metrics.comments} comments</span>
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function BlueskyLayout({ state, theme }: { state: PostState; theme: PlatformTheme }) {
  const { author, content, metrics, timestamp, darkMode: dark, media } = state;
  const bg = dark ? "#161e27" : "#fff";
  const text = dark ? "#f1f3f5" : "#0b0f14";
  const muted = dark ? "#8b98a5" : "#687684";
  const border = dark ? "#2e4052" : "#e7ecf0";
  const blue = "#0085ff";

  return (
    <PreviewShell state={state} theme={theme} dark={dark} bg={bg}>
      <div className="min-h-0 flex-1 overflow-auto">
        <div className="border-b p-4" style={{ borderColor: border }}>
          <div className="flex gap-3">
            <Avatar author={author} theme={theme} darkMode={dark} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-[15px] font-bold" style={{ color: text }}>
                  {author.name}
                </span>
                {author.verified && <VerifiedBadge color={blue} />}
                <span className="text-[15px]" style={{ color: muted }}>
                  @{author.handle}.bsky.social
                </span>
                <span style={{ color: muted }}>·</span>
                <span className="text-[15px]" style={{ color: muted }}>
                  {timestamp}
                </span>
              </div>

              <p className="mt-2 whitespace-pre-wrap text-[15px] leading-[1.4]" style={{ color: text }}>
                {content}
              </p>

              {media && media.length > 0 && (
                <div className="mt-3 overflow-hidden rounded-xl border" style={{ borderColor: border }}>
                  <img src={media[0].url} alt="" className="w-full" />
                </div>
              )}

              <div className="mt-3 flex max-w-[360px] justify-between" style={{ color: muted }}>
                <Metric icon={<MessageCircle size={18} />} value={metrics.comments} />
                <Metric icon={<Repeat2 size={18} />} value={metrics.reposts} />
                <Metric icon={<Heart size={18} />} value={metrics.likes} />
                <Metric icon={<Share size={18} />} value="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function ThreadsLayout({ state, theme }: { state: PostState; theme: PlatformTheme }) {
  const { author, content, metrics, timestamp, darkMode: dark, media } = state;
  const bg = dark ? "#101010" : "#fff";
  const text = dark ? "#f5f5f5" : "#000";
  const muted = dark ? "#999" : "#737373";
  const border = dark ? "#262626" : "#efefef";

  return (
    <PreviewShell state={state} theme={theme} dark={dark} bg={bg}>
      <div className="min-h-0 flex-1 overflow-auto">
        <div className="border-b p-4" style={{ borderColor: border }}>
          <div className="flex gap-3">
            <Avatar author={author} theme={theme} darkMode={dark} size={36} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-[15px] font-semibold" style={{ color: text }}>
                  {author.name}
                </span>
                <span className="text-[15px]" style={{ color: muted }}>
                  @{author.handle}
                </span>
                <span style={{ color: muted }}>· {timestamp}</span>
              </div>

              <p className="mt-2 whitespace-pre-wrap text-[15px] leading-[1.4]" style={{ color: text }}>
                {content}
              </p>

              {media && media.length > 0 && (
                <div className="mt-3 overflow-hidden rounded-lg border" style={{ borderColor: border }}>
                  <img src={media[0].url} alt="" className="w-full" />
                </div>
              )}

              <div className="mt-3 flex gap-5" style={{ color: muted }}>
                <Heart size={20} />
                <MessageCircle size={20} />
                <Repeat2 size={20} />
                <Send size={20} />
                <span className="text-[13px]">{metrics.likes}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b px-4 py-3 text-sm" style={{ borderColor: border, color: muted }}>
          View activity
        </div>
      </div>
    </PreviewShell>
  );
}

function FacebookLayout({ state, theme }: { state: PostState; theme: PlatformTheme }) {
  const { author, content, metrics, timestamp, darkMode: dark, media } = state;
  const bg = dark ? "#18191a" : "#f0f2f5";

  return (
    <PreviewShell state={state} theme={theme} dark={dark} bg={bg}>
      <div className="min-h-0 flex-1 overflow-auto p-3">
        <div className="rounded-lg shadow-sm" style={{ background: dark ? "#242526" : "#fff" }}>
          <div className="flex items-center gap-2 p-3">
            <Avatar author={author} theme={theme} darkMode={dark} />
            <div>
              <div className="text-[15px] font-semibold" style={{ color: dark ? "#e4e6eb" : "#050505" }}>
                {author.name}
              </div>
              <div className="text-xs" style={{ color: dark ? "#b0b3b8" : "#65676b" }}>
                {timestamp} · 🌐
              </div>
            </div>
          </div>
          <p className="px-3 pb-3 text-[15px] leading-snug" style={{ color: dark ? "#e4e6eb" : "#050505" }}>
            {content}
          </p>
          {media && media.length > 0 && <img src={media[0].url} alt="" className="w-full" />}
          <div
            className="flex items-center justify-between border-t px-3 py-2 text-xs"
            style={{ borderColor: dark ? "#3e4042" : "#ced0d4", color: dark ? "#b0b3b8" : "#65676b" }}
          >
            <span>👍 {metrics.likes}</span>
            <span>
              {metrics.comments} comments · {metrics.reposts} shares
            </span>
          </div>
          <div className="flex border-t" style={{ borderColor: dark ? "#3e4042" : "#ced0d4" }}>
            {["Like", "Comment", "Share"].map((action) => (
              <button
                key={action}
                type="button"
                className="flex-1 py-2.5 text-[13px] font-semibold"
                style={{ color: dark ? "#b0b3b8" : "#65676b" }}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function LinkedInLayout({ state, theme }: { state: PostState; theme: PlatformTheme }) {
  const { author, content, metrics, timestamp, darkMode: dark, media } = state;

  return (
    <PreviewShell state={state} theme={theme} dark={dark} bg={dark ? "#1b1f23" : "#f3f2ef"}>
      <div className="min-h-0 flex-1 overflow-auto p-2">
        <div
          className="rounded-lg border"
          style={{ background: dark ? "#1d2226" : "#fff", borderColor: dark ? "#38434f" : "#e0dfdc" }}
        >
          <div className="flex gap-2 p-3">
            <Avatar author={author} theme={theme} darkMode={dark} />
            <div>
              <div className="text-[14px] font-semibold" style={{ color: dark ? "#fff" : "rgba(0,0,0,0.9)" }}>
                {author.name}
              </div>
              <div className="text-xs" style={{ color: dark ? "#aaa" : "rgba(0,0,0,0.6)" }}>
                {author.handle} · {timestamp}
              </div>
            </div>
          </div>
          <p className="px-3 pb-3 text-[14px] leading-snug" style={{ color: dark ? "#fff" : "rgba(0,0,0,0.9)" }}>
            {content}
          </p>
          {media && media.length > 0 && <img src={media[0].url} alt="" className="w-full" />}
          <div
            className="flex items-center justify-between px-3 py-2 text-xs"
            style={{ color: dark ? "#aaa" : "rgba(0,0,0,0.6)" }}
          >
            <span>👍 {metrics.likes}</span>
            <span>
              {metrics.comments} comments · {metrics.reposts} reposts
            </span>
          </div>
          <div className="flex border-t" style={{ borderColor: dark ? "#38434f" : "#e0dfdc" }}>
            {["Like", "Comment", "Repost", "Send"].map((action) => (
              <button
                key={action}
                type="button"
                className="flex-1 py-2.5 text-[11px] font-semibold"
                style={{ color: dark ? "#aaa" : "rgba(0,0,0,0.6)" }}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </PreviewShell>
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

function ActionStack({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      {icon}
      <span className="text-xs font-semibold text-white">{label}</span>
    </div>
  );
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
