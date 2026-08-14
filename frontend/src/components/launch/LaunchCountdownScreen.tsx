'use client';

import React from 'react';
import Link from 'next/link';
import CountdownTimer from './CountdownTimer';
import { ExternalLink } from 'lucide-react';

export type LaunchCountdownScreenProps = {
  targetDate?: string;
  onLaunchComplete?: () => void;
};

export default function LaunchCountdownScreen({
  targetDate = process.env.NEXT_PUBLIC_LAUNCH_DATETIME || '2026-08-20T10:00:00+05:30',
  onLaunchComplete,
}: LaunchCountdownScreenProps) {
  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-b from-[#F4F8FA] via-white to-[#F0F6FA] text-[#1B2A4A] font-sans antialiased flex flex-col justify-between select-none relative">
      
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-100/40 via-blue-50/20 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Top Header */}
      <header className="h-14 sm:h-16 shrink-0 border-b border-[#D0E2F0]/80 bg-white/90 backdrop-blur-md px-4 sm:px-8">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img
              src="/logo modliq.png"
              alt="Modliq Machine Learning Platform"
              className="h-7 sm:h-9 lg:h-10 w-auto object-contain"
            />
            <span className="text-[10px] sm:text-[11px] font-extrabold text-[#2B70AB] bg-blue-50 px-2 py-0.5 sm:px-2.5 rounded-full border border-blue-200">
              Qeltrava AI
            </span>
          </div>

          <div className="text-[11px] sm:text-xs font-semibold text-slate-500 hidden sm:block tracking-wide">
            Built for Industry &amp; Research
          </div>
        </div>
      </header>

      {/* Main Single-Page Content Container */}
      <main className="flex-1 flex flex-col items-center justify-evenly px-4 sm:px-6 text-center max-w-4xl mx-auto w-full py-2 z-10">
        
        {/* 1. Launch Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 bg-white border border-[#D0E2F0] rounded-full text-[11px] sm:text-xs font-extrabold text-[#1B2A4A] shadow-xs shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2B70AB] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2B70AB]"></span>
          </span>
          <span>Launching August 20 · 10:00 AM IST</span>
        </div>

        {/* 2. Main Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#1B2A4A] tracking-tight leading-[1.1] max-w-3xl">
          Manufacturing intelligence is about to get simpler.
        </h1>

        {/* 3. Inspirational Founder Story Line */}
        <div className="space-y-0.5 shrink-0 px-2">
          <p className="text-xs sm:text-sm font-bold text-[#2B70AB] tracking-wide">
            Built from a middle-class dream. Made for the world.
          </p>
          <p className="text-[10px] sm:text-xs text-slate-500 italic">
            This is the huge dream of middle-class boys — built with discipline, data, and belief.
          </p>
        </div>

        {/* 4. Quote Card */}
        <div className="max-w-lg w-full bg-white/90 border border-[#D0E2F0] rounded-xl sm:rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-sm text-center shrink-0 relative overflow-hidden backdrop-blur-xs">
          <div className="absolute top-0 left-0 w-1 sm:w-1.5 h-full bg-[#2B70AB]" />
          <blockquote className="text-[11px] sm:text-xs md:text-sm font-semibold text-[#1B2A4A] italic leading-snug">
            &ldquo;Without data, you&apos;re just another person with an opinion.&rdquo;
          </blockquote>
          <cite className="block text-[9px] sm:text-[10px] md:text-[11px] font-extrabold text-[#2B70AB] not-italic mt-1 uppercase tracking-wider">
            — W. Edwards Deming
          </cite>
        </div>

        {/* 5. Product Description & Core Tagline */}
        <div className="space-y-1 max-w-2xl px-2">
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
            Modliq is a no-code machine learning and analytics platform for factories, classrooms, and applied research.
          </p>
          <p className="text-[11px] sm:text-xs md:text-sm text-[#2B70AB] font-bold">
            Analyze data. Build models. Prove results — without code.
          </p>
        </div>

        {/* 6. Countdown Timer Cards */}
        <div className="w-full py-1">
          <CountdownTimer targetDate={targetDate} onComplete={onLaunchComplete} />
        </div>

      </main>

      {/* Footer Attribution */}
      <footer className="min-h-[3.5rem] py-3 px-4 shrink-0 border-t border-[#D0E2F0]/80 bg-white/90 backdrop-blur-md text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
          <span className="font-semibold text-slate-600 text-[10px] sm:text-xs">
            A product by Qeltrava AI · Made in Tamil Nadu, India
          </span>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-slate-500 font-medium text-[10px] sm:text-[11px]">
            <a
              href="https://qeltravaai.vercel.app/en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2B70AB] transition flex items-center gap-1"
            >
              <span>Qeltrava AI</span>
              <ExternalLink size={10} />
            </a>
            <span>•</span>
            <a
              href="https://www.linkedin.com/company/qeltravai/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2B70AB] transition flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ExternalLink size={10} />
            </a>
            <span>•</span>
            <a
              href="https://www.instagram.com/qeltravaai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2B70AB] transition flex items-center gap-1"
            >
              <span>Instagram</span>
              <ExternalLink size={10} />
            </a>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 text-slate-500 text-[10px] sm:text-[11px]">
            <Link href="/contact" className="hover:text-[#2B70AB]">Contact</Link>
            <Link href="/privacy" className="hover:text-[#2B70AB]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#2B70AB]">Terms</Link>
            <Link href="/disclaimer" className="hover:text-[#2B70AB]">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
