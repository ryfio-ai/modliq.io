import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Modliq — AI Manufacturing Intelligence Platform Made in Tamil Nadu',
  description:
    'Modliq helps factories upload production data, check dataset readiness, optimize process settings, validate quality, track operations and supplier risk, and generate buyer-ready Quality Passports.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  keywords: [
    'manufacturing AI India',
    'quality analytics India',
    'SPC software India',
    'Cpk software',
    'OEE software India',
    'manufacturing intelligence platform',
    'Quality Passport',
    'AI for Indian manufacturers',
    'Tamil Nadu manufacturing software',
  ],
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
      </body>
    </html>
  );
}
