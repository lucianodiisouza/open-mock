import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPlatform, getAllSlugs } from "@/lib/platform-registry";
import { getLocalizedPlatformSeo } from "@/lib/platform-i18n";
import GeneratorPage from "./generator-client";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const platform = getPlatform(slug);
  if (!platform) return {};

  const t = await getTranslations({ locale, namespace: "platform.seo" });
  const seo = getLocalizedPlatformSeo(platform.category, platform.name, t);

  return {
    title: seo.title,
    description: seo.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GeneratorPage />;
}
