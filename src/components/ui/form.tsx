import { cn } from "@/lib/cn";

export function FormSection({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/40",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
          {description && (
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
      <div className="space-y-4 p-4">{children}</div>
    </section>
  );
}

export function FormField({
  label,
  description,
  children,
  className,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      {description && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
      )}
      {children}
    </div>
  );
}

export function CheckboxField({
  label,
  description,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  description?: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border border-transparent px-1 py-1 transition-colors hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50",
        className,
      )}
    >
      <input
        type="checkbox"
        className="mt-0.5 size-4 shrink-0 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500/30 dark:border-zinc-600 dark:bg-zinc-900"
        {...props}
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
        {description && (
          <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

export function FormRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>{children}</div>
  );
}

export function ItemCard({
  children,
  className,
  style,
  ref,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "rounded-lg border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
