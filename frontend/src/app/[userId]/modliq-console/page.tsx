import { redirect } from 'next/navigation';

// /[userId]/modliq-console has no content of its own.
// Redirect immediately to the dashboard.
export default async function ModliqConsolePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  redirect(`/${userId}/modliq-console/dashboard`);
}
