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
    default: 'Modliqer — No-Code Manufacturing Intelligence and ML Platform',
    template: '%s | Modliqer',
  },
  description:
    'Modliqer is a no-code manufacturing intelligence and machine learning platform by Qeltrava AI, built in Tamil Nadu, India. It helps factory teams analyze data, optimize process settings, validate quality, track operations, and generate buyer-ready Quality Passports.',
  keywords: [
    'no-code manufacturing intelligence platform',
    'no-code machine learning platform for manufacturing',
    'manufacturing intelligence software',
    'manufacturing AI platform India',
    'manufacturing data analytics India',
    'factory data analytics',
    'quality analytics platform',
    'process optimization software',
    'SPC software India',
    'Cp Cpk software',
    'OEE software India',
    'supplier traceability software',
    'Quality Passport',
    'AI copilot for manufacturing',
    'manufacturing AutoML',
    'no-code EDA platform',
    'manufacturing EDA platform',
    'no data scientist required',
    'no ML engineer required',
    'data analyst and ML engineer platform',
    'Indian manufacturing SaaS',
    'Tamil Nadu manufacturing software',
    'Qeltrava AI Modliqer',
    'Modliqer',
  ],
  authors: [{ name: 'Qeltrava AI', url: 'https://qeltravaai.vercel.app/en' }],
  creator: 'Qeltrava AI',
  publisher: 'Qeltrava AI',
  applicationName: 'Modliqer',
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
    siteName: 'Modliqer',
    title: 'Modliqer — No-Code Manufacturing Intelligence and ML Platform',
    description:
      'Modliqer is a no-code manufacturing intelligence and machine learning platform by Qeltrava AI, built in Tamil Nadu, India. It helps factory teams analyze data, optimize process settings, validate quality, track operations, and generate buyer-ready Quality Passports.',
    images: [
      {
        url: '/og/modliq-og.png',
        width: 1200,
        height: 630,
        alt: 'Modliqer — No-Code Manufacturing Intelligence and ML Platform by Qeltrava AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modliqer — No-Code Manufacturing Intelligence and ML Platform',
    description:
      'Modliqer is a no-code manufacturing intelligence and machine learning platform by Qeltrava AI, built in Tamil Nadu, India. Analyze what happened, optimize what happens next, and prove it with a Quality Passport.',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Qeltrava AI',
      url: 'https://qeltravaai.vercel.app/en',
      logo: `${siteUrl}/logo.svg`,
      sameAs: [
        'https://www.linkedin.com/company/qeltravai/',
        'https://www.instagram.com/qeltravaai',
      ],
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'India',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#software`,
      name: 'Modliqer',
      operatingSystem: 'Web-based',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        description: 'Free Pilot for Selected Manufacturing Companies',
      },
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      description:
        'No-code manufacturing intelligence and machine learning platform designed for factory teams to analyze production data, optimize process settings, validate quality, and generate buyer-ready Quality Passports.',
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Modliqer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Modliqer is a no-code manufacturing intelligence and machine learning platform that helps factory teams analyze production data, optimize process settings, validate quality, and generate buyer-ready Quality Passports.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who is Modliqer for?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Modliqer is for manufacturing companies, factory owners, plant heads, quality managers, process engineers, operations managers, supplier quality teams, and lean improvement teams.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need a data scientist to use Modliqer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Modliqer is designed so manufacturing teams can use analytics and machine learning workflows without hiring a data analyst, data scientist, or ML engineer to get started.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a Quality Passport?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Quality Passport is a buyer-ready report generated by Modliqer that summarizes dataset readiness, process capability, optimization evidence, operations performance, supplier traceability, and improvement actions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Modliqer an AutoML platform?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Modliqer includes no-code AutoML workflows, but it is not a generic AutoML tool. It is designed specifically for manufacturing workflows such as yield optimization, SPC, Cp/Cpk, OEE, supplier risk, and Quality Passport reporting.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans min-h-full flex flex-col bg-white text-[#1B2A4A]">
        <ErrorBoundary>
          <AuthProvider>{children}</AuthProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
