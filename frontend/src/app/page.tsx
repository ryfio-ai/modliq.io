import type { Metadata } from 'next';
import HomeClient from '@/components/home/HomeClient';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Modliq — Manufacturing Intelligence Platform Made in Tamil Nadu',
  description:
    'Modliq helps manufacturers upload production data, optimize process settings, validate quality with SPC and Cp/Cpk, track OEE and supplier risk, and generate buyer-ready Quality Passports.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/',
  },
  openGraph: {
    title: 'Modliq — Manufacturing Intelligence Platform',
    description:
      'Modliq is a manufacturing intelligence product by Qeltrava AI, built in Tamil Nadu, India. It connects data ingestion, health scoring, process optimization, Quality Studio, operations, supplier risk, and buyer-ready Quality Passports.',
    url: 'https://modliq-io.vercel.app/',
    siteName: 'Modliq',
    images: [
      {
        url: '/og/modliq-og.png',
        width: 1200,
        height: 630,
        alt: 'Modliq — Manufacturing Intelligence Platform by Qeltrava AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modliq — Manufacturing Intelligence Platform',
    description:
      'Modliq is a manufacturing intelligence product by Qeltrava AI, built in Tamil Nadu, India. It connects data ingestion, health scoring, process optimization, Quality Studio, operations, supplier risk, and buyer-ready Quality Passports.',
    images: ['/og/modliq-og.png'],
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <HomeClient />
    </>
  );
}