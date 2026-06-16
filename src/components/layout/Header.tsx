"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  PLATFORMS_BY_CATEGORY,
  CATEGORY_LABELS,
} from "@/lib/platform-registry";
import type { PlatformCategory } from "@/lib/types";

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<PlatformCategory | null>(null);

  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-emerald-600">
          Open Mock
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {(Object.keys(PLATFORMS_BY_CATEGORY) as PlatformCategory[]).map((cat) => (
            <div
              key={cat}
              className="relative"
              onMouseEnter={() => setActiveCategory(cat)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <button className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                {CATEGORY_LABELS[cat]}
              </button>
              {activeCategory === cat && (
                <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border bg-white py-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                  {PLATFORMS_BY_CATEGORY[cat].map((p) => (
                    <Link
                      key={p.slug}
                      href={`/generators/${p.slug}`}
                      className="block px-4 py-1.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/docs" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400">
            Docs
          </Link>
          <Link href="/faq" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400">
            FAQ
          </Link>
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t px-4 py-4 md:hidden">
          {(Object.keys(PLATFORMS_BY_CATEGORY) as PlatformCategory[]).map((cat) => (
            <div key={cat} className="mb-4">
              <h3 className="mb-2 text-xs font-semibold uppercase text-zinc-500">
                {CATEGORY_LABELS[cat]}
              </h3>
              <div className="grid grid-cols-2 gap-1">
                {PLATFORMS_BY_CATEGORY[cat].map((p) => (
                  <Link
                    key={p.slug}
                    href={`/generators/${p.slug}`}
                    className="text-sm text-zinc-700 dark:text-zinc-300"
                    onClick={() => setOpen(false)}
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
