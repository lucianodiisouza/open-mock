import type { Metadata } from "next";
import Link from "next/link";
import { PLATFORMS } from "@/lib/platform-registry";

export const metadata: Metadata = {
  title: "FAQ | Open Mock",
  description: "Frequently asked questions about the Open Mock mockup generator.",
};

const FAQ_ITEMS = [
  {
    q: "What is Open Mock?",
    a: "Open Mock is a free, open-source mockup generator for creating realistic fake chat screenshots, social posts, AI conversations, stories, and emails across 49 platforms.",
  },
  {
    q: "Is it free to use?",
    a: "Yes. All features are free with no signup, no watermarks, and no limits. The source code is available under the MIT license.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Everything runs client-side in your browser. No messages or content are sent to any server. State is optionally saved to localStorage on your device.",
  },
  {
    q: "What platforms are supported?",
    a: `All ${PLATFORMS.length} generators including WhatsApp, iMessage, Discord, Slack, ChatGPT, Claude, Instagram, X, Gmail, and more. See the homepage for the full list.`,
  },
  {
    q: "How do I export mockups?",
    a: "Click the Export button on any generator page. Choose PNG (1x–3x resolution) or video (chat/AI generators). Transparent background is supported.",
  },
  {
    q: "What are legitimate uses?",
    a: "UI/UX design, app demos, presentations, film/TV production, educational content, and testing layouts. Do not use for deception, fraud, or harassment.",
  },
  {
    q: "Do I need to download software?",
    a: "No. Open Mock runs in your browser. You can also self-host by cloning the GitHub repository.",
  },
  {
    q: "How do I contribute?",
    a: "Fork the repository, add a new platform following CONTRIBUTING.md, and submit a pull request.",
  },
  {
    q: "Is Open Mock affiliated with WhatsApp, Apple, etc.?",
    a: "No. Open Mock is an independent open-source project. Platform names and UIs are used for mockup purposes only.",
  },
  {
    q: "Can I self-host?",
    a: "Yes. Deploy to Vercel, run with npm, or use Docker. See the Docs page for instructions.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
      <p className="mt-2 text-zinc-500">
        Quick answers about Open Mock. For setup and self-hosting, see{" "}
        <Link href="/docs" className="text-emerald-600 hover:underline">Docs</Link>.
      </p>

      <div className="mt-8 space-y-6">
        {FAQ_ITEMS.map((item) => (
          <div key={item.q} className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
            <h2 className="font-semibold">{item.q}</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
