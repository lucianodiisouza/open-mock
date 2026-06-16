import type { Metadata } from "next";
import { getPlatform, getAllSlugs } from "@/lib/platform-registry";
import GeneratorPage from "./generator-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) return {};
  return {
    title: platform.seo.title,
    description: platform.seo.description,
  };
}

export default function Page() {
  return <GeneratorPage />;
}
