import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PLATFORMS } from "@/lib/platform-registry";
import type { PlatformCategory } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "docs" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "docs" });
  const tCategories = await getTranslations({ locale, namespace: "categories" });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">{t("title")}</h1>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{t("quickStart")}</h2>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-100 p-4 text-sm dark:bg-zinc-900">
{`git clone https://github.com/lucianodiisouza/open-mock.git
cd open-mock
npm install
npm run dev`}
        </pre>
        <p className="mt-2 text-sm text-zinc-500">
          {t("openBrowserPrefix")}{" "}
          <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">
            http://localhost:3000
          </code>{" "}
          {t("openBrowserSuffix")}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{t("selfHosting")}</h2>
        <h3 className="mt-4 font-medium">{t("vercel")}</h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {t("vercelDescription")}
        </p>
        <h3 className="mt-4 font-medium">{t("docker")}</h3>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-zinc-100 p-4 text-sm dark:bg-zinc-900">
{`npm run build
npm start`}
        </pre>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {t("dockerDescriptionPrefix")}{" "}
          <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">
            output: &apos;standalone&apos;
          </code>{" "}
          {t("dockerDescriptionSuffix")}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{t("exportGuide")}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
          <li>{t("exportStep1")}</li>
          <li>{t("exportStep2")}</li>
          <li>{t("exportStep3")}</li>
          <li>{t("exportStep4")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">
          {t("supportedPlatforms", { count: PLATFORMS.length })}
        </h2>
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
                {tCategories(cat as PlatformCategory)}
              </h3>
              <p className="text-sm text-zinc-500">
                {platforms.map((p) => p.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{t("contributing")}</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {t("contributingDescriptionPrefix")}{" "}
          <a
            href="https://github.com/lucianodiisouza/open-mock/blob/main/CONTRIBUTING.md"
            className="text-emerald-600 hover:underline"
          >
            CONTRIBUTING.md
          </a>{" "}
          {t("contributingDescriptionSuffix")}
        </p>
      </section>
    </div>
  );
}
