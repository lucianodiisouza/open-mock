import type { ReactNode } from "react";
import type { CommentItem, CommentState } from "@/lib/types/comment";
import type { PlatformTheme } from "@/lib/types";
import { StatusBar } from "@/components/chrome/StatusBar";
import {
  ThumbsUp,
  ThumbsDown,
  Heart,
  MessageCircle,
  ChevronUp,
  ChevronDown,
  Repeat2,
  Send,
  Smile,
} from "lucide-react";
import { ChevronLeft } from "@/components/chrome/icons";

interface CommentListPreviewProps {
  state: CommentState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function CommentListPreview({ state, theme, platformSlug }: CommentListPreviewProps) {
  switch (platformSlug) {
    case "youtube":
      return <YouTubeComments state={state} theme={theme} />;
    case "instagram":
      return <InstagramComments state={state} theme={theme} />;
    case "x":
      return <XComments state={state} theme={theme} />;
    case "facebook":
      return <FacebookComments state={state} theme={theme} />;
    case "linkedin":
      return <LinkedInComments state={state} theme={theme} />;
    case "reddit":
      return <RedditComments state={state} theme={theme} />;
    case "threads":
      return <ThreadsComments state={state} theme={theme} />;
    case "tiktok":
      return <TikTokComments state={state} theme={theme} />;
    default:
      return <YouTubeComments state={state} theme={theme} />;
  }
}

function CommentAvatar({
  author,
  avatar,
  size = 36,
  accent,
  gradient,
}: {
  author: string;
  avatar?: string;
  size?: number;
  accent: string;
  gradient?: string;
}) {
  const inner = avatar ? (
    <img src={avatar} alt="" className="h-full w-full rounded-full object-cover" />
  ) : (
    <span className="font-bold text-white" style={{ fontSize: size * 0.35 }}>
      {author[0]}
    </span>
  );

  if (gradient) {
    return (
      <div
        className="shrink-0 rounded-full p-[2px]"
        style={{ background: gradient, width: size, height: size }}
      >
        <div
          className="flex h-full w-full items-center justify-center rounded-full bg-black"
        >
          {inner}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, background: accent }}
    >
      {inner}
    </div>
  );
}

function PreviewShell({
  state,
  theme,
  dark,
  bg,
  children,
}: {
  state: CommentState;
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

function YouTubeComments({ state, theme }: { state: CommentState; theme: PlatformTheme }) {
  const { comments, postPreview, darkMode: dark } = state;
  const border = dark ? "#272727" : "#e5e5e5";
  const text = dark ? "#f1f1f1" : "#0f0f0f";
  const muted = dark ? "#aaa" : "#606060";

  return (
    <PreviewShell state={state} theme={theme} dark={dark} bg={dark ? "#0f0f0f" : "#fff"}>
      <div className="flex items-center gap-2 border-b px-2 py-2" style={{ borderColor: border, color: text }}>
        <button type="button" className="flex h-9 w-9 items-center justify-center">
          <ChevronLeft size={22} color={text} />
        </button>
        <span className="text-base font-medium">{comments.length} Comments</span>
      </div>

      {postPreview && (
        <div className="border-b px-4 py-3 text-sm leading-snug" style={{ borderColor: border, color: muted }}>
          {postPreview}
        </div>
      )}

      <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: border }}>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-600 text-[10px] font-bold text-white">
          U
        </div>
        <div
          className="flex-1 rounded-full px-4 py-2 text-sm"
          style={{ background: dark ? "#272727" : "#f2f2f2", color: muted }}
        >
          Add a comment...
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-4 py-3">
        {comments.map((comment) => (
          <div key={comment.id} className="mb-5 flex gap-3">
            <CommentAvatar author={comment.author} avatar={comment.avatar} accent="#ff0000" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-medium" style={{ color: text }}>
                  @{comment.author.replace(/\s/g, "").toLowerCase()}
                </span>
                <span className="text-xs" style={{ color: muted }}>
                  {comment.timestamp}
                </span>
              </div>
              <p className="mt-1 text-[14px] leading-snug" style={{ color: text }}>
                {comment.text}
              </p>
              <div className="mt-2 flex items-center gap-4">
                <button type="button" className="flex items-center gap-1.5 text-xs" style={{ color: muted }}>
                  <ThumbsUp size={14} />
                  {comment.likes}
                </button>
                <button type="button" style={{ color: muted }}>
                  <ThumbsDown size={14} />
                </button>
                <button type="button" className="text-xs font-medium" style={{ color: muted }}>
                  Reply
                </button>
              </div>
              {comment.replies?.map((reply) => (
                <ReplyBlock key={reply.id} reply={reply} dark={dark} accent={theme.primary} showAt />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

function InstagramComments({ state, theme }: { state: CommentState; theme: PlatformTheme }) {
  const { comments, darkMode: dark } = state;
  const bg = dark ? "#000" : "#fff";
  const text = dark ? "#f5f5f5" : "#262626";
  const muted = dark ? "#a8a8a8" : "#8e8e8e";
  const border = dark ? "#262626" : "#dbdbdb";
  const igGradient = "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)";

  return (
    <PreviewShell state={state} theme={theme} dark={dark} bg={bg}>
      <div className="flex flex-col items-center border-b py-2" style={{ borderColor: border }}>
        <div className="mb-2 h-1 w-10 rounded-full" style={{ background: muted }} />
        <span className="text-base font-semibold" style={{ color: text }}>
          Comments
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-4 py-2">
        {comments.map((comment) => (
          <div key={comment.id} className="mb-4 flex gap-3">
            <CommentAvatar author={comment.author} avatar={comment.avatar} size={32} accent={theme.accent} gradient={igGradient} />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] leading-snug" style={{ color: text }}>
                <span className="font-semibold">{comment.author}</span>{" "}
                <span>{comment.text}</span>
              </p>
              <div className="mt-1.5 flex items-center gap-4 text-xs" style={{ color: muted }}>
                <span>{comment.timestamp}</span>
                <button type="button" className="font-semibold">
                  {comment.likes} likes
                </button>
                <button type="button" className="font-semibold">
                  Reply
                </button>
              </div>
              {comment.replies && comment.replies.length > 0 && (
                <button type="button" className="mt-2 text-xs font-semibold" style={{ color: muted }}>
                  — View replies ({comment.replies.length})
                </button>
              )}
            </div>
            <button type="button" className="pt-1" style={{ color: text }}>
              <Heart size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 border-t px-4 py-3" style={{ borderColor: border }}>
        <Smile size={22} style={{ color: muted }} />
        <div className="flex-1 text-sm" style={{ color: muted }}>
          Add a comment...
        </div>
        <button type="button" className="text-sm font-semibold" style={{ color: theme.primary }}>
          Post
        </button>
      </div>
    </PreviewShell>
  );
}

function XComments({ state, theme }: { state: CommentState; theme: PlatformTheme }) {
  const { comments, postPreview, darkMode: dark } = state;
  const bg = dark ? "#000" : "#fff";
  const text = dark ? "#e7e9ea" : "#0f1419";
  const muted = dark ? "#71767b" : "#536471";
  const border = dark ? "#2f3336" : "#eff3f4";

  return (
    <PreviewShell state={state} theme={theme} dark={dark} bg={bg}>
      <div className="border-b px-4 py-3" style={{ borderColor: border }}>
        <span className="text-lg font-bold" style={{ color: text }}>
          Post
        </span>
      </div>

      {postPreview && (
        <div className="border-b px-4 py-3 text-[15px] leading-snug" style={{ borderColor: border, color: text }}>
          {postPreview}
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-hidden">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b px-4 py-3" style={{ borderColor: border }}>
            <div className="flex gap-3">
              <CommentAvatar author={comment.author} avatar={comment.avatar} size={40} accent={dark ? "#333" : theme.accent} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[15px] font-bold" style={{ color: text }}>
                    {comment.author}
                  </span>
                  <span className="text-[15px]" style={{ color: muted }}>
                    @{comment.author.replace(/\s/g, "").toLowerCase()}
                  </span>
                  <span style={{ color: muted }}>·</span>
                  <span className="text-[15px]" style={{ color: muted }}>
                    {comment.timestamp}
                  </span>
                </div>
                <p className="mt-1 text-[15px] leading-snug" style={{ color: text }}>
                  {comment.text}
                </p>
                <div className="mt-2 flex gap-6" style={{ color: muted }}>
                  <MessageCircle size={16} />
                  <Repeat2 size={16} />
                  <Heart size={16} />
                  <span className="text-[13px]">{comment.likes}</span>
                </div>
              </div>
            </div>
            {comment.replies?.map((reply) => (
              <div key={reply.id} className="mt-3 ml-[52px] flex gap-2">
                <CommentAvatar author={reply.author} avatar={reply.avatar} size={32} accent={dark ? "#333" : theme.primary} />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[15px] font-bold" style={{ color: text }}>
                      {reply.author}
                    </span>
                    <span className="text-[15px]" style={{ color: muted }}>
                      · {reply.timestamp}
                    </span>
                  </div>
                  <p className="text-[15px] leading-snug" style={{ color: text }}>
                    {reply.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

function FacebookComments({ state, theme }: { state: CommentState; theme: PlatformTheme }) {
  const { comments, postPreview, darkMode: dark } = state;
  const bg = dark ? "#18191a" : "#f0f2f5";
  const card = dark ? "#242526" : "#fff";
  const text = dark ? "#e4e6eb" : "#050505";
  const muted = dark ? "#b0b3b8" : "#65676b";
  const border = dark ? "#3e4042" : "#ced0d4";

  return (
    <PreviewShell state={state} theme={theme} dark={dark} bg={bg}>
      <div className="min-h-0 flex-1 overflow-auto p-3">
        <div className="rounded-lg" style={{ background: card }}>
          {postPreview && (
            <div className="border-b px-3 py-3 text-[15px]" style={{ borderColor: border, color: text }}>
              {postPreview}
            </div>
          )}
          <div className="px-3 py-2 text-[15px] font-semibold" style={{ color: muted }}>
            {comments.length} comments
          </div>
          {comments.map((comment) => (
            <div key={comment.id} className="px-3 pb-3">
              <div className="flex gap-2">
                <CommentAvatar author={comment.author} avatar={comment.avatar} size={32} accent={theme.accent} />
                <div
                  className="rounded-2xl px-3 py-2"
                  style={{ background: dark ? "#3a3b3c" : "#f0f2f5" }}
                >
                  <div className="text-[13px] font-semibold" style={{ color: text }}>
                    {comment.author}
                  </div>
                  <p className="text-[15px] leading-snug" style={{ color: text }}>
                    {comment.text}
                  </p>
                </div>
              </div>
              <div className="ml-10 mt-1 flex items-center gap-3 text-xs font-semibold" style={{ color: muted }}>
                <span>{comment.timestamp}</span>
                <button type="button">Like</button>
                <button type="button">Reply</button>
                {comment.likes > 0 && <span>👍 {comment.likes}</span>}
              </div>
              {comment.replies?.map((reply) => (
                <div key={reply.id} className="ml-8 mt-2 flex gap-2">
                  <CommentAvatar author={reply.author} avatar={reply.avatar} size={28} accent={theme.primary} />
                  <div
                    className="rounded-2xl px-3 py-2"
                    style={{ background: dark ? "#3a3b3c" : "#f0f2f5" }}
                  >
                    <div className="text-[13px] font-semibold" style={{ color: text }}>
                      {reply.author}
                    </div>
                    <p className="text-[14px] leading-snug" style={{ color: text }}>
                      {reply.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="flex items-center gap-2 border-t px-3 py-2" style={{ borderColor: border }}>
            <CommentAvatar author="You" size={32} accent={muted} />
            <div
              className="flex-1 rounded-full px-4 py-2 text-[15px]"
              style={{ background: dark ? "#3a3b3c" : "#f0f2f5", color: muted }}
            >
              Write a comment...
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function LinkedInComments({ state, theme }: { state: CommentState; theme: PlatformTheme }) {
  const { comments, postPreview, darkMode: dark } = state;
  const bg = dark ? "#1b1f23" : "#f3f2ef";
  const card = dark ? "#1d2226" : "#fff";
  const text = dark ? "#fff" : "rgba(0,0,0,0.9)";
  const muted = dark ? "#aaa" : "rgba(0,0,0,0.6)";
  const border = dark ? "#38434f" : "#e0dfdc";

  return (
    <PreviewShell state={state} theme={theme} dark={dark} bg={bg}>
      <div className="min-h-0 flex-1 overflow-auto p-2">
        <div className="rounded-lg border" style={{ background: card, borderColor: border }}>
          {postPreview && (
            <div className="border-b px-3 py-3 text-[14px]" style={{ borderColor: border, color: text }}>
              {postPreview}
            </div>
          )}
          <div className="px-3 py-2 text-sm font-semibold" style={{ color: muted }}>
            Comments
          </div>
          {comments.map((comment) => (
            <div key={comment.id} className="border-t px-3 py-3" style={{ borderColor: border }}>
              <div className="flex gap-2">
                <CommentAvatar author={comment.author} avatar={comment.avatar} size={48} accent={theme.accent} />
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold" style={{ color: text }}>
                    {comment.author}
                  </div>
                  <div className="text-xs" style={{ color: muted }}>
                    Member · {comment.timestamp}
                  </div>
                  <p className="mt-1 text-[14px] leading-snug" style={{ color: text }}>
                    {comment.text}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs font-semibold" style={{ color: muted }}>
                    <button type="button">Like</button>
                    <span>·</span>
                    <button type="button">Reply</button>
                    {comment.likes > 0 && <span className="font-normal">· {comment.likes}</span>}
                  </div>
                </div>
              </div>
              {comment.replies?.map((reply) => (
                <div key={reply.id} className="ml-14 mt-3 flex gap-2">
                  <CommentAvatar author={reply.author} avatar={reply.avatar} size={32} accent={theme.primary} />
                  <div>
                    <div className="text-[14px] font-semibold" style={{ color: text }}>
                      {reply.author}
                    </div>
                    <p className="text-[14px] leading-snug" style={{ color: text }}>
                      {reply.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </PreviewShell>
  );
}

function RedditComments({ state, theme }: { state: CommentState; theme: PlatformTheme }) {
  const { comments, postPreview, darkMode: dark } = state;
  const bg = dark ? "#0e1113" : "#ffffff";
  const text = dark ? "#d7dadc" : "#1a1a1b";
  const muted = dark ? "#818384" : "#787c7e";
  const border = dark ? "#343536" : "#edeff1";
  const accent = theme.accent;

  return (
    <PreviewShell state={state} theme={theme} dark={dark} bg={bg}>
      {postPreview && (
        <div className="border-b px-4 py-3 text-sm font-medium" style={{ borderColor: border, color: text }}>
          {postPreview}
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-hidden px-2 py-2">
        {comments.map((comment) => (
          <div key={comment.id} className="mb-1 flex gap-1">
            <div className="flex flex-col items-center pt-1" style={{ color: accent }}>
              <ChevronUp size={20} strokeWidth={2.5} />
              <span className="text-xs font-bold" style={{ color: text }}>
                {comment.likes}
              </span>
              <ChevronDown size={20} strokeWidth={2.5} style={{ color: muted }} />
            </div>
            <div className="min-w-0 flex-1 pb-3">
              <div className="flex items-center gap-1 text-xs">
                <CommentAvatar author={comment.author} avatar={comment.avatar} size={20} accent={accent} />
                <span className="font-medium" style={{ color: text }}>
                  u/{comment.author.replace(/\s/g, "").toLowerCase()}
                </span>
                <span style={{ color: muted }}>· {comment.timestamp}</span>
              </div>
              <p className="mt-1 text-[14px] leading-snug" style={{ color: text }}>
                {comment.text}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs font-bold" style={{ color: muted }}>
                <button type="button">Reply</button>
                <button type="button">Share</button>
              </div>
              {comment.replies?.map((reply) => (
                <div key={reply.id} className="mt-2 flex gap-1 border-l-2 pl-2" style={{ borderColor: border }}>
                  <div className="flex flex-col items-center pt-1" style={{ color: accent }}>
                    <ChevronUp size={16} />
                    <span className="text-[10px] font-bold" style={{ color: text }}>
                      {reply.likes}
                    </span>
                    <ChevronDown size={16} style={{ color: muted }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="font-medium" style={{ color: text }}>
                        u/{reply.author.replace(/\s/g, "").toLowerCase()}
                      </span>
                      <span style={{ color: muted }}>· {reply.timestamp}</span>
                    </div>
                    <p className="text-[13px] leading-snug" style={{ color: text }}>
                      {reply.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

function ThreadsComments({ state, theme }: { state: CommentState; theme: PlatformTheme }) {
  const { comments, darkMode: dark } = state;
  const bg = dark ? "#101010" : "#fff";
  const text = dark ? "#f5f5f5" : "#000";
  const muted = dark ? "#999" : "#737373";
  const border = dark ? "#262626" : "#efefef";

  return (
    <PreviewShell state={state} theme={theme} dark={dark} bg={bg}>
      <div className="border-b px-4 py-3" style={{ borderColor: border }}>
        <span className="text-base font-bold" style={{ color: text }}>
          Thread
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b px-4 py-3" style={{ borderColor: border }}>
            <div className="flex gap-3">
              <CommentAvatar author={comment.author} avatar={comment.avatar} size={36} accent={dark ? "#333" : "#000"} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-[15px] font-semibold" style={{ color: text }}>
                    {comment.author}
                  </span>
                  <span className="text-[15px]" style={{ color: muted }}>
                    @{comment.author.replace(/\s/g, "").toLowerCase()}
                  </span>
                  <span style={{ color: muted }}>· {comment.timestamp}</span>
                </div>
                <p className="mt-1 text-[15px] leading-snug" style={{ color: text }}>
                  {comment.text}
                </p>
                <div className="mt-2 flex items-center gap-4" style={{ color: muted }}>
                  <Heart size={18} />
                  <MessageCircle size={18} />
                  <Repeat2 size={18} />
                  <Send size={18} />
                  <span className="text-[13px]">{comment.likes}</span>
                </div>
              </div>
            </div>
            {comment.replies?.map((reply) => (
              <div key={reply.id} className="mt-3 ml-12 flex gap-2">
                <CommentAvatar author={reply.author} avatar={reply.avatar} size={28} accent={dark ? "#333" : "#000"} />
                <div>
                  <span className="text-[14px] font-semibold" style={{ color: text }}>
                    {reply.author}
                  </span>
                  <p className="text-[14px] leading-snug" style={{ color: text }}>
                    {reply.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t px-4 py-3 text-sm" style={{ borderColor: border, color: muted }}>
        View activity
      </div>
    </PreviewShell>
  );
}

function TikTokComments({ state, theme }: { state: CommentState; theme: PlatformTheme }) {
  const { comments } = state;
  const muted = "rgba(255,255,255,0.75)";
  const text = "#fff";

  return (
    <PreviewShell state={state} theme={theme} dark bg="#000">
      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/40 to-black/80" />

        <div className="absolute inset-x-0 bottom-0 flex max-h-[75%] flex-col rounded-t-2xl bg-[#252525]">
          <div className="flex flex-col items-center py-2">
            <div className="mb-2 h-1 w-10 rounded-full bg-white/30" />
            <span className="text-sm font-semibold text-white">
              {comments.length} comments
            </span>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden px-4 pb-4">
            {comments.map((comment) => (
              <div key={comment.id} className="mb-4 flex gap-3">
                <CommentAvatar author={comment.author} avatar={comment.avatar} size={36} accent={theme.accent} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[13px] font-semibold" style={{ color: muted }}>
                      {comment.author}
                    </span>
                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[14px] leading-snug" style={{ color: text }}>
                    {comment.text}
                  </p>
                  <button type="button" className="mt-1 text-xs" style={{ color: muted }}>
                    Reply
                  </button>
                  {comment.replies && comment.replies.length > 0 && (
                    <button type="button" className="mt-1 block text-xs" style={{ color: muted }}>
                      View {comment.replies.length} replies
                    </button>
                  )}
                </div>
                <div className="flex flex-col items-center gap-0.5 pt-1">
                  <Heart size={16} style={{ color: theme.primary }} fill={theme.primary} />
                  <span className="text-[11px]" style={{ color: muted }}>
                    {comment.likes}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
            <div className="flex-1 rounded-full bg-white/10 px-4 py-2 text-sm text-white/50">
              Add comment...
            </div>
            <Smile size={22} className="text-white/60" />
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function ReplyBlock({
  reply,
  dark,
  accent,
  showAt,
}: {
  reply: CommentItem;
  dark: boolean;
  accent: string;
  showAt?: boolean;
}) {
  const text = dark ? "#f1f1f1" : "#0f0f0f";
  const authorLabel = showAt
    ? `@${reply.author.replace(/\s/g, "").toLowerCase()}`
    : reply.author;

  return (
    <div className="mt-4 flex gap-2">
      <CommentAvatar author={reply.author} avatar={reply.avatar} size={24} accent={accent} />
      <div>
        <span className="text-xs font-medium" style={{ color: text }}>
          {authorLabel}
        </span>
        <p className="text-[13px] leading-snug" style={{ color: text }}>
          {reply.text}
        </p>
      </div>
    </div>
  );
}
