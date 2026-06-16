import type { ReactNode } from "react";

interface DeviceFrameProps {
  type: "none" | "iphone" | "android";
  view3d?: boolean;
  children: ReactNode;
}

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
        className="relative overflow-hidden shadow-2xl"
        style={{
          width: 390,
          borderRadius: isIphone ? 44 : 24,
          border: "8px solid #1a1a1a",
          background: "#1a1a1a",
        }}
      >
        {isIphone && (
          <div
            className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-2xl bg-black"
            style={{ width: 120, height: 28 }}
          />
        )}
        <div className="overflow-hidden" style={{ borderRadius: isIphone ? 36 : 16 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
