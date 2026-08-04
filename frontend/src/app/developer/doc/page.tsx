import type { Metadata } from "next";
import DocPortal from "@/components/doc/DocPortal";

export const metadata: Metadata = {
  title: "Modliq Platform Developer & Launch Documentation Pack",
  description: "Exhaustive codebase-grounded technical documentation pack for Modliq developers, QA, DevOps, and security teams.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DeveloperDocPage() {
  return <DocPortal initialSlug="readme" />;
}
