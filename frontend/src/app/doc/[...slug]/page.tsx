import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function DocSlugRedirectPage({ params }: Props) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug ? resolvedParams.slug.join("/") : "";
  redirect(`/developer/doc/${slugPath}`);
}
