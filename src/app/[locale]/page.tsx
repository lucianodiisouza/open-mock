import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PLATFORMS_BY_CATEGORY } from "@/lib/platform-registry";
import type { PlatformCategory } from "@/lib/types";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tCategories = await getTranslations({ locale, namespace: "categories" });

  return (
    <div>
      <section className="bg-gradient-to-b from-emerald-50 to-white px-4 py-16 dark:from-emerald-950/30 dark:to-zinc-950">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {t("heroTitle")}
            <br />
            <span className="text-emerald-600">{t("heroHighlight")}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {t("heroDescription")}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/generators/whatsapp"
              className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
            >
              {t("tryWhatsApp")}
            </Link>
            <Link
              href="/docs"
              className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              {tCommon("docs")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold">{t("allGenerators")}</h2>
        {(Object.keys(PLATFORMS_BY_CATEGORY) as PlatformCategory[]).map((cat) => (
          <div key={cat} className="mb-10">
            <h3 className="mb-4 text-lg font-semibold text-zinc-700 dark:text-zinc-300">
              {tCategories(cat)}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {PLATFORMS_BY_CATEGORY[cat].map((p) => (
                <Link
                  key={p.slug}
                  href={`/generators/${p.slug}`}
                  className="rounded-lg border border-zinc-200 px-4 py-3 text-sm hover:border-emerald-300 hover:bg-emerald-50 dark:border-zinc-800 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="border-t bg-zinc-50 px-4 py-16 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold">{t("howItWorks")}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold dark:bg-emerald-900">
                1
              </div>
              <h3 className="mt-3 font-semibold">{t("step1Title")}</h3>
              <p className="mt-1 text-sm text-zinc-500">{t("step1Description")}</p>
            </div>
            <div>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold dark:bg-emerald-900">
                2
              </div>
              <h3 className="mt-3 font-semibold">{t("step2Title")}</h3>
              <p className="mt-1 text-sm text-zinc-500">{t("step2Description")}</p>
            </div>
            <div>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold dark:bg-emerald-900">
                3
              </div>
              <h3 className="mt-3 font-semibold">{t("step3Title")}</h3>
              <p className="mt-1 text-sm text-zinc-500">{t("step3Description")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
