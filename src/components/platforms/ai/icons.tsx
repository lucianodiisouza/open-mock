interface LogoProps {
  size?: number;
}

export function ChatGPTLogo({ size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.742 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.582a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0l-4.83-2.786A4.504 4.504 0 012.34 7.872zm16.597 3.855l-5.833-3.387L15.16 6.2a.076.076 0 01.071 0l4.83 2.791a4.494 4.494 0 011.676 6.042 4.483 4.483 0 01-2.8 1.718zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.23V6.897a.066.066 0 01.028-.061l4.83-2.787a4.5 4.5 0 016.68 4.66zm-12.64 4.135l-2.02-1.168a.08.08 0 01-.038-.057V6.075a4.5 4.5 0 017.375-3.787l-.142.08-4.778 2.758a.795.795 0 00-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
        fill="#10a37f"
      />
    </svg>
  );
}

export function ClaudeLogo({ size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C8.5 2 6 5 6 8.5c0 2 1 3.8 2.5 5L12 22l3.5-8.5c1.5-1.2 2.5-3 2.5-5C18 5 15.5 2 12 2zm0 3c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3z"
        fill="#d97757"
      />
      <circle cx="12" cy="8" r="1.5" fill="#faf8f5" />
    </svg>
  );
}

export function GeminiLogo({ size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285f4" />
          <stop offset="50%" stopColor="#9b72cb" />
          <stop offset="100%" stopColor="#d96570" />
        </linearGradient>
      </defs>
      <path
        d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z"
        fill="url(#gemini-grad)"
      />
      <path
        d="M18 14l.8 2.8L22 18l-3.2.2L18 21l-.8-2.8L14 18l3.2-.2L18 14z"
        fill="url(#gemini-grad)"
        opacity="0.7"
      />
    </svg>
  );
}

export function GrokLogo({ size = 24, color = "#ffffff" }: LogoProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
      <path
        d="M8 8l8 8M16 8l-8 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PerplexityLogo({ size = 24 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3L4 8v8l8 5 8-5V8l-8-5z"
        stroke="#20808d"
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M12 3v18M4 8l8 5 8-5M4 16l8-5 8 5"
        stroke="#20808d"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WaveformIcon({ size = 16, color = "#ffffff" }: LogoProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <rect x="4" y="10" width="2" height="4" rx="1" />
      <rect x="8" y="7" width="2" height="10" rx="1" />
      <rect x="12" y="5" width="2" height="14" rx="1" />
      <rect x="16" y="8" width="2" height="8" rx="1" />
      <rect x="20" y="10" width="2" height="4" rx="1" />
    </svg>
  );
}

export function ChevronDown({ size = 14, color = "currentColor" }: LogoProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ArrowUp({ size = 18, color = "currentColor" }: LogoProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}
