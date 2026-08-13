import type { Metadata } from 'next';
import LaunchCountdownScreen from '@/components/launch/LaunchCountdownScreen';

export const metadata: Metadata = {
  title: 'Modliq Launch Countdown — August 20 at 10:00 AM IST',
  description:
    'Modliq, a no-code machine learning and analytics platform by Qeltrava AI for factories, classrooms, and applied research, launches on August 20 at 10:00 AM IST.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/launch',
  },
  openGraph: {
    title: 'Modliq Launch Countdown — August 20 at 10:00 AM IST',
    description:
      'Launching August 20 at 10:00 AM IST. Analyze data. Build models. Prove results — without code.',
    url: 'https://modliq-io.vercel.app/launch',
    siteName: 'Modliq',
    images: ['/og/modliq-og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modliq Launch Countdown — August 20 at 10:00 AM IST',
    description:
      'Launching August 20 at 10:00 AM IST. Analyze data. Build models. Prove results — without code.',
    images: ['/og/modliq-og.png'],
  },
};

export default function LaunchPage() {
  return <LaunchCountdownScreen />;
}
