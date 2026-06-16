"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getPlatform } from "@/lib/platform-registry";
import { getLocalizedPlatformSeo } from "@/lib/platform-i18n";
import { GeneratorShell } from "@/components/editor/GeneratorShell";

export default function GeneratorPage() {
  const params = useParams();
  const slug = params.slug as string;
  const platform = getPlatform(slug);
  const tSeo = useTranslations("platform.seo");

  if (!platform) {
    notFound();
  }

  const seo = getLocalizedPlatformSeo(platform.category, platform.name, tSeo);

  return <GeneratorShell platform={platform} seoDescription={seo.description} />;
}
