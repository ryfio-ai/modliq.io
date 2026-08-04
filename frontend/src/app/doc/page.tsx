import type { Metadata } from "next";
import DocPortal from "@/components/doc/DocPortal";

export const metadata: Metadata = {
  title: "Modliq Platform Launch Documentation Pack",
  description: "Exhaustive codebase-grounded technical documentation pack for Modliq.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DocPage() {
  return <DocPortal initialSlug="readme" />;
}
