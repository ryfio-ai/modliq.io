import type { Metadata } from 'next';
import HomeClient from '@/components/home/HomeClient';
import StructuredData from '@/components/seo/StructuredData';
import LaunchGate from '@/components/launch/LaunchGate';

export const metadata: Metadata = {
  title: 'Modliq — No-Code Manufacturing Intelligence and ML Platform',
  description:
    'Modliq is a no-code manufacturing intelligence and machine learning platform by Qeltrava AI, built in Tamil Nadu, India. It helps factory teams upload data, run ML optimization, validate quality, track operations, and generate buyer-ready Quality Passports.',
  keywords: [
    'no code machine learning platform',
    'no code ML platform',
    'no code ML for manufacturing',
    'no code manufacturing ML',
    'no code process optimization',
    'no code manufacturing intelligence',
    'no code quality analytics',
    'no code factory analytics',
    'manufacturing AutoML alternative',
    'AutoML for manufacturing',
    'machine learning for manufacturing teams',
  ],
  alternates: {
    canonical: 'https://modliq-io.vercel.app/',
  },
  openGraph: {
    title: 'Modliq — No-Code Manufacturing Intelligence and ML Platform',
    description:
      'Modliq is a no-code manufacturing intelligence and machine learning platform by Qeltrava AI, built in Tamil Nadu, India. It helps factory teams upload data, run ML optimization, validate quality, track operations, and generate buyer-ready Quality Passports.',
    url: 'https://modliq-io.vercel.app/',
    siteName: 'Modliq',
    images: [
      {
        url: '/og/modliq-og.png',
        width: 1200,
        height: 630,
        alt: 'Modliq — No-Code Manufacturing Intelligence and ML Platform by Qeltrava AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modliq — No-Code Manufacturing Intelligence and ML Platform',
    description:
      'Modliq is a no-code manufacturing intelligence and machine learning platform by Qeltrava AI, built in Tamil Nadu, India. It helps factory teams upload data, run ML optimization, validate quality, track operations, and generate buyer-ready Quality Passports.',
    images: ['/og/modliq-og.png'],
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <LaunchGate>
        <HomeClient />
      </LaunchGate>
    </>
  );
}