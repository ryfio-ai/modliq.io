'use client';

import React from 'react';
import Link from 'next/link';
import CountdownTimer from './CountdownTimer';
import { ExternalLink, Sparkles, Clock } from 'lucide-react';

export type LaunchCountdownScreenProps = {
  targetDate?: string;
  onLaunchComplete?: () => void;
};

export default function LaunchCountdownScreen({
  targetDate = process.env.NEXT_PUBLIC_LAUNCH_DATETIME || '2026-08-20T10:00:00+05:30',
  onLaunchComplete,
}: LaunchCountdownScreenProps) {
  return (
    <div className="min-h-screen lg:h-screen w-full overflow-y-auto lg:overflow-hidden bg-gradient-to-b from-[#F4F8FA] via-white to-[#F0F6FA] text-[#1B2A4A] font-sans antialiased flex flex-col justify-between select-none relative">
      
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-100/40 via-blue-50/20 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Top Header */}
      <header className="h-16 shrink-0 border-b border-[#D0E2F0]/80 bg-white/90 backdrop-blur-md px-4 sm:px-8">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img
              src="/logo modliq.png"
              alt="Modliq Machine Learning Platform"
              className="h-8 sm:h-10 w-auto object-contain"
            />
            <span className="text-[10px] sm:text-[11px] font-extrabold text-[#2B70AB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Qeltrava AI
            </span>
          </div>

          <div className="text-[11px] sm:text-xs font-semibold text-slate-500 hidden sm:block tracking-wide">
            Built for Industry &amp; Research
          </div>
        </div>
      </header>

      {/* Main 2-Column Split Content Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-4 z-10">
        
        {/* Left Side: Content & Story (7 Columns) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
          
          {/* 1. Launch Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-[#D0E2F0] rounded-full text-xs font-extrabold text-[#1B2A4A] shadow-xs shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2B70AB] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2B70AB]"></span>
            </span>
            <span>Launching August 20 · 10:00 AM IST</span>
          </div>

          {/* 2. Main Display Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B2A4A] tracking-tight leading-[1.08]">
            Manufacturing intelligence is about to get simpler.
          </h1>

          {/* 3. Founder Story Line */}
          <div className="space-y-1">
            <p className="text-sm sm:text-base font-bold text-[#2B70AB] tracking-wide">
              Built from a middle-class dream. Made for the world.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 italic">
              This is the huge dream of middle-class boys — built with discipline, data, and belief.
            </p>
          </div>

          {/* 4. Editorial Deming Quote Box */}
          <div className="bg-white/90 border border-[#D0E2F0] rounded-2xl p-4 sm:p-5 shadow-sm text-left relative overflow-hidden backdrop-blur-xs">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#2B70AB]" />
            <blockquote className="text-xs sm:text-sm md:text-base font-semibold text-[#1B2A4A] italic leading-snug pl-2">
              &ldquo;Without data, you&apos;re just another person with an opinion.&rdquo;
            </blockquote>
            <cite className="block text-[10px] sm:text-[11px] font-extrabold text-[#2B70AB] not-italic mt-2 pl-2 uppercase tracking-wider">
              — W. Edwards Deming
            </cite>
          </div>

          {/* 5. Product Description & Core Tagline */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Modliq is a no-code machine learning and analytics platform for factories, classrooms, and applied research.
            </p>
            <p className="text-xs sm:text-sm text-[#2B70AB] font-bold">
              Analyze data. Build models. Prove results — without code.
            </p>
          </div>

        </div>

        {/* Right Side: Digital Timepiece Countdown Box (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center w-full">
          <div className="w-full bg-white/95 border-2 border-[#D0E2F0] rounded-3xl p-6 sm:p-8 shadow-card hover:border-[#2B70AB]/50 transition-all duration-300 space-y-6 text-center backdrop-blur-md">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#2B70AB] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                <Clock className="w-3.5 h-3.5 text-[#2B70AB]" />
                <span>Launch Countdown</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 pt-1">
                Official Platform Launch Date
              </p>
            </div>

            {/* 2x2 Countdown Timer Grid */}
            <CountdownTimer targetDate={targetDate} onComplete={onLaunchComplete} />

            <div className="pt-2 border-t border-[#D0E2F0] text-xs text-slate-500 font-medium">
              Thursday, Aug 20, 2026 @ 10:00 AM IST
            </div>

          </div>
        </div>

      </main>

      {/* Footer Attribution */}
      <footer className="min-h-[3.5rem] py-3.5 px-4 shrink-0 border-t border-[#D0E2F0]/80 bg-white/90 backdrop-blur-md text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-semibold text-slate-600 text-[11px] sm:text-xs">
            A product by Qeltrava AI · Made in Tamil Nadu, India
          </span>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-slate-500 font-medium text-[11px]">
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

          <div className="flex items-center gap-3 text-slate-500 text-[11px]">
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
