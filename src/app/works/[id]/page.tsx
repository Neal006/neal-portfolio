import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { works } from "@/data/portfolio";
import { workDetails } from "@/data/workDetails";
import WorkDetail from "./WorkDetail";

const BASE = "https://neal-daftary.vercel.app";

export function generateStaticParams() {
  return works.map((w) => ({ id: w.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const work = works.find((w) => w.id === id);
  if (!work) return {};

  const details = workDetails[id];
  const description = details?.tagline ?? work.description.slice(0, 155);
  const ogImage = `${BASE}/og?title=${encodeURIComponent(work.title)}&subtitle=${encodeURIComponent(work.category + " · " + work.year)}`;

  return {
    title: `${work.title} — Neal Daftary`,
    description,
    openGraph: {
      title: `${work.title} — Neal Daftary`,
      description,
      url: `${BASE}/works/${id}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${work.title} — project by Neal Daftary` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${work.title} — Neal Daftary`,
      description,
      images: [ogImage],
    },
    alternates: { canonical: `${BASE}/works/${id}` },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const work = works.find((w) => w.id === id);
  if (!work) notFound();

  const details = workDetails[id] ?? null;

  return <WorkDetail work={work} details={details} />;
}
