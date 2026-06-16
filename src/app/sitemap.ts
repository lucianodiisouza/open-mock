import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/platform-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://open-mock.dev";
  const generatorUrls = getAllSlugs().map((slug) => ({
    url: `${base}/generators/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/docs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...generatorUrls,
  ];
}
