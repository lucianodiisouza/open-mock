interface StatusBarProps {
  time: string;
  battery: number;
  signal: number;
  dark?: boolean;
}

/** iOS status bar safe-area height (notch / Dynamic Island clearance). */
const STATUS_BAR_HEIGHT = 47;

export function StatusBar({ time, battery, signal, dark = false }: StatusBarProps) {
  const textColor = dark ? "#ffffff" : "#000000";

  return (
    <div
      className="flex shrink-0 items-end justify-between px-7 pb-1.5"
      style={{
        color: textColor,
        background: "transparent",
        height: STATUS_BAR_HEIGHT,
        paddingTop: 14,
      }}
    >
      <span className="w-16 text-[13px] font-semibold tracking-tight">{time}</span>
      <div className="flex items-center gap-[5px]">
        <SignalIcon signal={signal} color={textColor} />
        <WifiIcon color={textColor} />
        <BatteryIcon level={battery} color={textColor} />
      </div>
    </div>
  );
}

function SignalIcon({ signal, color }: { signal: number; color: string }) {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill={color}>
      {[1, 2, 3, 4].map((bar) => (
        <rect
          key={bar}
          x={(bar - 1) * 4 + 1}
          y={12 - bar * 2.5}
          width="2.5"
          height={bar * 2.5}
          rx="0.5"
          opacity={bar <= signal ? 1 : 0.25}
        />
      ))}
    </svg>
  );
}

function WifiIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path
        d="M8 10.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
        fill={color}
      />
      <path
        d="M4.5 7.2a4.5 4.5 0 016 0"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M2 4.5a8 8 0 0112 0"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BatteryIcon({ level, color }: { level: number; color: string }) {
  const clamped = Math.min(100, Math.max(0, level));
  return (
    <div className="flex items-center">
      <div
        className="relative h-[11px] w-[25px] rounded-[3px] border-[1.5px]"
        style={{ borderColor: color }}
      >
        <div
          className="absolute bottom-[1.5px] left-[1.5px] top-[1.5px] rounded-[1.5px]"
          style={{
            background: clamped <= 20 ? "#ff3b30" : color,
            width: `${clamped}%`,
            maxWidth: "calc(100% - 3px)",
          }}
        />
      </div>
      <div
        className="ml-[1px] h-[5px] w-[1.5px] rounded-r-[1px]"
        style={{ background: color }}
      />
    </div>
  );
}
