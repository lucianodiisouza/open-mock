import type { Metadata } from "next";
import Link from "next/link";
import { PLATFORMS, CATEGORY_LABELS } from "@/lib/platform-registry";

export const metadata: Metadata = {
  title: "Documentation | Open Mock",
  description: "Install, run, and self-host Open Mock locally.",
};

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Documentation</h1>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Quick Start</h2>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-100 p-4 text-sm dark:bg-zinc-900">
{`git clone https://github.com/lucianodiisouza/open-mock.git
cd open-mock
npm install
npm run dev`}
        </pre>
        <p className="mt-2 text-sm text-zinc-500">
          Open <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">http://localhost:3000</code> in your browser.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Self-Hosting</h2>
        <h3 className="mt-4 font-medium">Vercel</h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Connect your GitHub repo to Vercel. Next.js is auto-detected. No environment variables required.
        </p>
        <h3 className="mt-4 font-medium">Docker</h3>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-zinc-100 p-4 text-sm dark:bg-zinc-900">
{`npm run build
npm start`}
        </pre>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          For production Docker, set <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">output: &apos;standalone&apos;</code> in next.config.ts.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Export Guide</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
          <li>Click <strong>Export</strong> on any generator page</li>
          <li>Choose resolution: 1x, 2x, or 3x for high-DPI screens</li>
          <li>Enable transparent background for compositing</li>
          <li>Video export available for chat and AI generators</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Supported Platforms ({PLATFORMS.length})</h2>
        <div className="mt-4 space-y-4">
          {Object.entries(
            PLATFORMS.reduce(
              (acc, p) => {
                if (!acc[p.category]) acc[p.category] = [];
                acc[p.category].push(p);
                return acc;
              },
              {} as Record<string, typeof PLATFORMS>,
            ),
          ).map(([cat, platforms]) => (
            <div key={cat}>
              <h3 className="font-medium">
                {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS]}
              </h3>
              <p className="text-sm text-zinc-500">
                {platforms.map((p) => p.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Contributing</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          See <Link href="https://github.com/lucianodiisouza/open-mock/blob/main/CONTRIBUTING.md" className="text-emerald-600 hover:underline">CONTRIBUTING.md</Link> in the repository for how to add a new platform generator.
        </p>
      </section>
    </div>
  );
}
