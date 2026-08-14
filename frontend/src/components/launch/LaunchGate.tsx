'use client';

import React, { useState, useEffect } from 'react';
import LaunchCountdownScreen from './LaunchCountdownScreen';

export type LaunchGateProps = {
  children: React.ReactNode;
  targetDate?: string;
  enabled?: boolean;
};

export default function LaunchGate({
  children,
  targetDate = process.env.NEXT_PUBLIC_LAUNCH_DATETIME || '2026-08-20T10:00:00+05:30',
  enabled = process.env.NEXT_PUBLIC_LAUNCH_GATE_ENABLED !== 'false',
}: LaunchGateProps) {
  const [isBeforeLaunch, setIsBeforeLaunch] = useState<boolean | null>(null);
  const [bypassed, setBypassed] = useState(false);

  useEffect(() => {
    // Check for admin preview bypass via URL parameter or localStorage
    const params = new URLSearchParams(window.location.search);
    const previewParam = params.get('preview');

    if (previewParam === 'admin-secret' || previewParam === 'true' || localStorage.getItem('modliq_gate_bypass') === 'true') {
      localStorage.setItem('modliq_gate_bypass', 'true');
      setBypassed(true);
      setIsBeforeLaunch(false);
      return;
    }

    if (!enabled) {
      setIsBeforeLaunch(false);
      return;
    }

    const targetTime = new Date(targetDate).getTime();
    const now = new Date().getTime();

    setIsBeforeLaunch(now < targetTime);
  }, [targetDate, enabled]);

  // Prevent layout shift during client hydration
  if (isBeforeLaunch === null) {
    return (
      <div className="min-h-screen bg-white text-[#1B2A4A] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#2B70AB] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isBeforeLaunch && !bypassed) {
    return (
      <LaunchCountdownScreen
        targetDate={targetDate}
        onLaunchComplete={() => setIsBeforeLaunch(false)}
      />
    );
  }

  return <>{children}</>;
}
