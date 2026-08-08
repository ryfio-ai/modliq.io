import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://modliq-io.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Modliq — Manufacturing Intelligence Platform Made in Tamil Nadu',
    template: '%s | Modliq',
  },
  description:
    'Modliq is a manufacturing intelligence product by Qeltrava AI, built in Tamil Nadu, India. It connects data ingestion, health scoring, process optimization, Quality Studio, operations, supplier risk, and buyer-ready Quality Passports.',
  keywords: [
    'manufacturing intelligence software',
    'manufacturing AI platform India',
    'manufacturing data analytics India',
    'data analyst and ML engineer platform',
    'no code data analyst for manufacturing',
    'no code ML engineer for manufacturing',
    'manufacturing analytics and machine learning',
    'data analytics and ML platform',
    'manufacturing data analyst software',
    'ML engineer alternative for manufacturing',
    'no code analytics and ML',
    'factory analytics and ML',
    'production analytics and ML optimization',
    'manufacturing EDA platform',
    'no code EDA platform',
    'exploratory data analysis manufacturing',
    'quality analytics platform',
    'SPC software India',
    'Cp Cpk software',
    'OEE software India',
    'process optimization software',
    'supplier traceability software',
    'quality passport for manufacturers',
    'AI copilot for manufacturing',
    'factory data analytics',
    'Tamil Nadu manufacturing software',
    'Indian manufacturing SaaS',
    'manufacturing quality reporting software',
    'manufacturing audit readiness software',
  ],
  authors: [{ name: 'Qeltrava AI', url: 'https://qeltravaai.vercel.app/en' }],
  creator: 'Qeltrava AI',
  publisher: 'Qeltrava AI',
  applicationName: 'Modliq',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Modliq',
    title: 'Modliq — Manufacturing Intelligence Platform',
    description:
      'Modliq is a manufacturing intelligence product by Qeltrava AI, built in Tamil Nadu, India. It connects data ingestion, health scoring, process optimization, Quality Studio, operations, supplier risk, and buyer-ready Quality Passports.',
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="font-sans min-h-full flex flex-col bg-white text-[#1B2A4A]">
        <ErrorBoundary>
          <AuthProvider>{children}</AuthProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
