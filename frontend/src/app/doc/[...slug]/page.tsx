import type { Metadata } from "next";
import DocPortal from "@/components/doc/DocPortal";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug ? resolvedParams.slug.join("/") : "readme";
  return {
    title: `Modliq Doc — ${slugPath}`,
    description: "Modliq technical documentation page.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function DynamicDocPage({ params }: Props) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug ? resolvedParams.slug.join("/") : "readme";
  return <DocPortal initialSlug={slugPath} />;
}
