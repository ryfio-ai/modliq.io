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
      <div className="w-full max-w-3xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 animate-pulse">
          {['Days', 'Hours', 'Minutes', 'Seconds'].map((label) => (
            <div
              key={label}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center h-24 sm:h-28 flex flex-col justify-center items-center backdrop-blur-xl"
            >
              <div className="w-14 h-8 bg-white/10 rounded mb-2"></div>
              <div className="w-16 h-3 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (timeLeft.expired) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl max-w-xl mx-auto backdrop-blur-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-500/30">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>We&apos;re Live!</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Modliq is live!</h3>
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
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
    <div className="w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="group relative bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-blue-400/50 rounded-2xl p-4 sm:p-6 text-center shadow-[0_8px_32px_rgba(0,0,0,0.37)] hover:shadow-[0_0_35px_rgba(59,130,246,0.2)] transition-all duration-500 flex flex-col justify-center items-center backdrop-blur-2xl overflow-hidden"
          >
            {/* Ambient inner card top shine */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            
            <span className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight font-mono drop-shadow-[0_0_25px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform duration-500">
              {String(unit.value).padStart(2, '0')}
            </span>
            
            <span className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-[0.25em] mt-2 group-hover:text-blue-300 transition-colors">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
