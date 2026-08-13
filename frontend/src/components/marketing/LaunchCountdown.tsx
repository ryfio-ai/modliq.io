'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';

export type LaunchCountdownProps = {
  targetDate?: string;
  compact?: boolean;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

export default function LaunchCountdown({
  targetDate = process.env.NEXT_PUBLIC_LAUNCH_DATETIME || '2026-08-20T10:00:00+05:30',
  compact = false,
}: LaunchCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetTime = new Date(targetDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, expired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return null;
  }

  if (timeLeft.expired) {
    if (compact) {
      return (
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>We&apos;re live! Explore Modliq today.</span>
        </div>
      );
    }

    return (
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center space-y-4 shadow-sm max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>We&apos;re Live!</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B2A4A]">Modliq is now officially live.</h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Start exploring no-code machine learning and analytics for your plant, department, or classroom today.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link
            href="/login"
            className="px-6 py-3 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-md flex items-center gap-2"
          >
            <span>Launch Modliq</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact?interest=demo"
            className="px-6 py-3 bg-white hover:bg-slate-50 text-[#1B2A4A] border border-[#D0E2F0] font-bold rounded-xl text-xs sm:text-sm transition"
          >
            Book Your Free Demo
          </Link>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="inline-flex items-center gap-3 text-xs font-mono font-bold text-[#1B2A4A]">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-[#2B70AB]" />
          <span>{String(timeLeft.days).padStart(2, '0')}d</span>
          <span>:</span>
          <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
          <span>:</span>
          <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
          <span>:</span>
          <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
        </div>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="bg-white border-2 border-[#D0E2F0] rounded-2xl p-4 sm:p-6 text-center shadow-card hover:border-[#2B70AB] transition flex flex-col justify-center items-center"
          >
            <span className="text-3xl sm:text-5xl font-black text-[#1B2A4A] tracking-tight font-mono">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 sm:mt-2">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
