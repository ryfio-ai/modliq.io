import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import ContactClient from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Contact Modliq — Apply for Free Manufacturing Pilot',
  description:
    'Contact Modliq to apply for the free launch pilot, book a demo, or discuss manufacturing data, quality, optimization, and Quality Passport workflows.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/contact',
  },
  openGraph: {
    title: 'Contact Modliq — Apply for Free Manufacturing Pilot',
    description:
      'Contact Modliq to apply for the free launch pilot, book a demo, or discuss manufacturing data, quality, optimization, and Quality Passport workflows.',
    url: 'https://modliq-io.vercel.app/contact',
    images: ['/og/modliq-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Modliq — Apply for Free Manufacturing Pilot',
    description:
      'Contact Modliq to apply for the free launch pilot, book a demo, or discuss manufacturing data, quality, optimization, and Quality Passport workflows.',
    images: ['/og/modliq-og.png'],
  },
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white p-12 text-center text-xs">Loading contact options...</div>}>
      <ContactClient />
    </Suspense>
  );
}