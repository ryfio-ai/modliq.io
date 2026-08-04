import type { Metadata } from 'next';
import ConsoleClientLayout from './ConsoleClientLayout';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConsoleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) {
  return <ConsoleClientLayout params={params}>{children}</ConsoleClientLayout>;
}
