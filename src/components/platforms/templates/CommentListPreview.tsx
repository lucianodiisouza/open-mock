import type { CommentState } from "@/lib/types/comment";
import type { PlatformTheme } from "@/lib/types";
import { StatusBar } from "@/components/chrome/StatusBar";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { ChevronLeft } from "@/components/chrome/icons";

interface CommentListPreviewProps {
  state: CommentState;
  theme: PlatformTheme;
  platformSlug: string;
}

export function CommentListPreview({ state, theme, platformSlug }: CommentListPreviewProps) {
  const { comments, postPreview, darkMode } = state;
  const isYouTube = platformSlug === "youtube";

  return (
    <div
      className="flex flex-col"
      style={{
        width: 390,
        height: 700,
        background: darkMode ? "#0f0f0f" : "#fff",
        fontFamily: theme.fontFamily,
      }}
    >
      <StatusBar
        time={state.statusBar.time}
        battery={state.statusBar.battery}
        signal={state.statusBar.signal}
        dark={darkMode}
      />

      <div
        className="flex items-center gap-2 border-b px-2 py-2"
        style={{
          borderColor: darkMode ? "#272727" : "#e5e5e5",
          color: darkMode ? "#fff" : "#0f0f0f",
        }}
      >
        {isYouTube && (
          <button type="button" className="flex h-9 w-9 items-center justify-center">
            <ChevronLeft size={22} color={darkMode ? "#fff" : "#0f0f0f"} />
          </button>
        )}
        <span className="text-base font-medium">
          {isYouTube ? `${comments.length} Comments` : "Comments"}
        </span>
      </div>

      {postPreview && (
        <div
          className="border-b px-4 py-3 text-sm leading-snug"
          style={{
            borderColor: darkMode ? "#272727" : "#e5e5e5",
            color: darkMode ? "#aaa" : "#606060",
          }}
        >
          {postPreview}
        </div>
      )}

      {isYouTube && (
        <div
          className="flex items-center gap-3 border-b px-4 py-3"
          style={{ borderColor: darkMode ? "#272727" : "#e5e5e5" }}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-600 text-[10px] font-bold text-white">
            U
          </div>
          <div
            className="flex-1 rounded-full px-4 py-2 text-sm"
            style={{
              background: darkMode ? "#272727" : "#f2f2f2",
              color: darkMode ? "#717171" : "#606060",
            }}
          >
            Add a comment...
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden px-4 py-3">
        {comments.map((comment) => (
          <div key={comment.id} className="mb-5 flex gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: isYouTube ? "#ff0000" : theme.accent }}
            >
              {comment.author[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-medium" style={{ color: darkMode ? "#f1f1f1" : "#0f0f0f" }}>
                  @{comment.author.replace(/\s/g, "").toLowerCase()}
                </span>
                <span className="text-xs" style={{ color: darkMode ? "#aaa" : "#606060" }}>
                  {comment.timestamp}
                </span>
              </div>
              <p className="mt-1 text-[14px] leading-snug" style={{ color: darkMode ? "#f1f1f1" : "#0f0f0f" }}>
                {comment.text}
              </p>
              <div className="mt-2 flex items-center gap-4">
                <button type="button" className="flex items-center gap-1.5 text-xs" style={{ color: darkMode ? "#aaa" : "#606060" }}>
                  <ThumbsUp size={14} />
                  {comment.likes}
                </button>
                {isYouTube && (
                  <button type="button" style={{ color: darkMode ? "#aaa" : "#606060" }}>
                    <ThumbsDown size={14} />
                  </button>
                )}
                <button type="button" className="text-xs font-medium" style={{ color: darkMode ? "#aaa" : "#606060" }}>
                  Reply
                </button>
              </div>
              {comment.replies?.map((reply) => (
                <div key={reply.id} className="mt-4 flex gap-2">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: theme.primary }}
                  >
                    {reply.author[0]}
                  </div>
                  <div>
                    <span className="text-xs font-medium" style={{ color: darkMode ? "#f1f1f1" : "#0f0f0f" }}>
                      @{reply.author.replace(/\s/g, "").toLowerCase()}
                    </span>
                    <p className="text-[13px] leading-snug" style={{ color: darkMode ? "#f1f1f1" : "#0f0f0f" }}>
                      {reply.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
