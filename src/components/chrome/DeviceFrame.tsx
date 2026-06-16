import type { ReactNode } from "react";

interface DeviceFrameProps {
  type: "none" | "iphone" | "android";
  view3d?: boolean;
  children: ReactNode;
}

const SCREEN_WIDTH = 390;
const BEZEL = 8;

export function DeviceFrame({ type, view3d = false, children }: DeviceFrameProps) {
  if (type === "none") {
    return (
      <div
        style={
          view3d
            ? {
                perspective: "1200px",
                transform: "rotateX(5deg) rotateY(-8deg)",
              }
            : undefined
        }
      >
        {children}
      </div>
    );
  }

  const isIphone = type === "iphone";
  const outerRadius = isIphone ? 44 : 24;
  const innerRadius = isIphone ? 36 : 16;

  return (
    <div
      className="inline-block p-3"
      style={
        view3d
          ? {
              perspective: "1200px",
              transform: "rotateX(5deg) rotateY(-8deg)",
            }
          : undefined
      }
    >
      <div
        className="relative shadow-2xl"
        style={{
          width: SCREEN_WIDTH + BEZEL * 2,
          padding: BEZEL,
          borderRadius: outerRadius,
          background: "#1a1a1a",
          boxSizing: "border-box",
        }}
      >
        {isIphone && (
          <div
            className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 rounded-b-2xl bg-black"
            style={{ top: BEZEL, width: 120, height: 28 }}
          />
        )}

        <div
          className="relative overflow-hidden"
          style={{ width: SCREEN_WIDTH, borderRadius: innerRadius }}
        >
          {children}
        </div>

        {isIphone && (
          <div
            className="pointer-events-none absolute left-1/2 z-20 h-1 w-[100px] -translate-x-1/2 rounded-full bg-white/25"
            style={{ bottom: BEZEL + 6 }}
          />
        )}
      </div>
    </div>
  );
}
