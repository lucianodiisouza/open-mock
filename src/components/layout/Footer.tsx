"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50 py-8 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-emerald-600">{tCommon("brand")}</p>
            <p className="mt-1 text-xs text-zinc-500">{tFooter("tagline")}</p>
          </div>
          <div className="flex gap-4 text-sm text-zinc-500">
            <Link href="/docs" className="hover:text-zinc-700">
              {tCommon("docs")}
            </Link>
            <Link href="/faq" className="hover:text-zinc-700">
              {tCommon("faq")}
            </Link>
            <a
              href="https://github.com/lucianodiisouza/open-mock"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-700"
            >
              {tCommon("github")}
            </a>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-zinc-400">
          {tFooter("license", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
