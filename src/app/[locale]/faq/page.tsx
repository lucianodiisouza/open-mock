import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PLATFORMS } from "@/lib/platform-registry";

const FAQ_KEYS = [
  "what",
  "free",
  "privacy",
  "platforms",
  "export",
  "uses",
  "download",
  "contribute",
  "affiliation",
  "selfHost",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faq" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-zinc-500">
        {t("introPrefix")}{" "}
        <Link href="/docs" className="text-emerald-600 hover:underline">
          {tCommon("docs")}
        </Link>
        {t("introSuffix")}
      </p>

      <div className="mt-8 space-y-6">
        {FAQ_KEYS.map((key) => (
          <div
            key={key}
            className="border-b border-zinc-200 pb-6 dark:border-zinc-800"
          >
            <h2 className="font-semibold">{t(`items.${key}.q`)}</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {key === "platforms"
                ? t(`items.${key}.a`, { count: PLATFORMS.length })
                : t(`items.${key}.a`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
