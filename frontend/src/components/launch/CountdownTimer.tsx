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

function getInitialTimeLeft(targetDate: string): TimeLeft {
  try {
    const targetTime = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (isNaN(targetTime) || difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: difference <= 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, expired: false };
  } catch (e) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: false };
  }
}

export default function CountdownTimer({
  targetDate = process.env.NEXT_PUBLIC_LAUNCH_DATETIME || '2026-08-20T10:00:00+05:30',
  onComplete,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getInitialTimeLeft(targetDate));

  useEffect(() => {
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

  if (timeLeft.expired) {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-md max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>We&apos;re Live!</span>
        </div>
        <h3 className="text-xl sm:text-3xl font-extrabold text-[#1B2A4A]">Modliq is now live.</h3>
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className="px-8 py-3.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white font-bold rounded-xl text-sm transition shadow-md flex items-center gap-2"
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
            className="group bg-white border-2 border-[#D0E2F0] hover:border-[#2B70AB] rounded-2xl px-3 py-3 sm:px-4 sm:py-5 text-center shadow-card transition-all duration-300 flex flex-col justify-center items-center"
          >
            <span className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1B2A4A] tracking-tight font-mono group-hover:scale-105 transition-transform duration-300">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-extrabold text-[#2B70AB] uppercase tracking-wider mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
