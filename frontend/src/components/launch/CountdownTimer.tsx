'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export type CountdownTimerProps = {
  targetDate?: string;
  onComplete?: () => void;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

export default function CountdownTimer({
  targetDate = process.env.NEXT_PUBLIC_LAUNCH_DATETIME || '2026-08-20T10:00:00+05:30',
  onComplete,
}: CountdownTimerProps) {
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
        if (onComplete) {
          onComplete();
        }
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
  }, [targetDate, onComplete]);

  if (!mounted) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 animate-pulse">
          {['Days', 'Hours', 'Minutes', 'Seconds'].map((label) => (
            <div
              key={label}
              className="bg-white border border-[#D0E2F0] rounded-2xl p-3 sm:p-5 text-center h-20 sm:h-24 flex flex-col justify-center items-center shadow-[0_8px_24px_rgba(27,42,74,0.06)]"
            >
              <div className="w-12 h-6 bg-slate-100 rounded mb-1"></div>
              <div className="w-14 h-3 bg-slate-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (timeLeft.expired) {
    return (
      <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 shadow-md max-w-lg mx-auto backdrop-blur-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>We&apos;re Live!</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#1B2A4A]">Modliq is live!</h3>
        <div className="pt-1 flex justify-center">
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className="px-6 py-2.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-md flex items-center gap-2"
          >
            <span>Enter Modliq</span>
            <ArrowRight className="w-4 h-4" />
          </button>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="group relative bg-white border border-[#D0E2F0] rounded-xl sm:rounded-2xl px-3 py-2.5 sm:px-4 sm:py-4 text-center shadow-[0_8px_24px_rgba(27,42,74,0.06)] hover:shadow-md hover:border-[#2B70AB]/60 transition-all duration-300 flex flex-col justify-center items-center"
          >
            <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-[#1B2A4A] tracking-tight font-mono group-hover:scale-105 transition-transform duration-300">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[11px] lg:text-xs font-extrabold text-[#2B70AB] uppercase tracking-widest mt-0.5 sm:mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
