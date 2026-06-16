import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50 py-8 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-emerald-600">Open Mock</p>
            <p className="mt-1 text-xs text-zinc-500">
              Open-source mockup generator for educational and demo purposes.
              Not affiliated with any platform shown.
            </p>
          </div>
          <div className="flex gap-4 text-sm text-zinc-500">
            <Link href="/docs" className="hover:text-zinc-700">Docs</Link>
            <Link href="/faq" className="hover:text-zinc-700">FAQ</Link>
            <a
              href="https://github.com/lucianodiisouza/open-mock"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-700"
            >
              GitHub
            </a>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-zinc-400">
          MIT License · © {new Date().getFullYear()} Open Mock
        </p>
      </div>
    </footer>
  );
}
