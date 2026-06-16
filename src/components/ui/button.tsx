import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "icon";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500/30",
  secondary:
    "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500/30",
  ghost:
    "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700",
  danger:
    "text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30",
  outline:
    "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
};

const sizes: Record<ButtonSize, string> = {
  sm: "gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium",
  md: "gap-2 rounded-lg px-4 py-2 text-sm font-medium",
  icon: "rounded-md p-1.5",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
