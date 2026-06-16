import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/platform-registry";
import { routing } from "@/i18n/routing";

function localePath(locale: string, path: string) {
  if (locale === routing.defaultLocale) {
    return path || "/";
  }
  return `/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://open-mock.dev";
  const staticPaths = ["", "/docs", "/faq"];
  const slugs = getAllSlugs();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}${localePath(locale, path)}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.6,
      });
    }

    for (const slug of slugs) {
      entries.push({
        url: `${base}${localePath(locale, `/generators/${slug}`)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
