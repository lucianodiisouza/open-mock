"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { getPlatform } from "@/lib/platform-registry";
import { GeneratorShell } from "@/components/editor/GeneratorShell";

export default function GeneratorPage() {
  const params = useParams();
  const slug = params.slug as string;
  const platform = getPlatform(slug);

  if (!platform) {
    notFound();
  }

  return <GeneratorShell platform={platform} />;
}
