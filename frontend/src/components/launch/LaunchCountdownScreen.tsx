'use client';

import React from 'react';
import Link from 'next/link';
import CountdownTimer from './CountdownTimer';
import { ExternalLink, Sparkles } from 'lucide-react';

export type LaunchCountdownScreenProps = {
  targetDate?: string;
  onLaunchComplete?: () => void;
};

export default function LaunchCountdownScreen({
  targetDate = process.env.NEXT_PUBLIC_LAUNCH_DATETIME || '2026-08-20T10:00:00+05:30',
  onLaunchComplete,
}: LaunchCountdownScreenProps) {
  return (
    <div className="min-h-screen lg:h-screen w-full overflow-y-auto lg:overflow-hidden bg-[#060B18] text-white font-sans antialiased flex flex-col justify-between select-none relative">
      
      {/* 1. Atmospheric Ambient Lighting & Grid Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.2),rgba(255,255,255,0))] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_120%,rgba(30,58,138,0.25),rgba(255,255,255,0))] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-10" />

      {/* 2. Top Header */}
      <header className="h-14 sm:h-16 lg:h-20 shrink-0 border-b border-white/10 bg-[#060B18]/70 backdrop-blur-xl px-4 sm:px-8">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo modliq.png"
              alt="Modliq Machine Learning Platform"
              className="h-8 sm:h-10 w-auto object-contain brightness-200 invert-0"
            />
            <span className="text-[10px] sm:text-[11px] font-black text-blue-300 bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-500/30 tracking-wider">
              Qeltrava AI
            </span>
          </div>

          <div className="text-[10px] sm:text-xs font-mono font-semibold text-slate-400 hidden sm:block tracking-widest uppercase">
            Built for Industry &amp; Research
          </div>
        </div>
      </header>

      {/* 3. Main Masterpiece Content Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center max-w-4xl mx-auto w-full space-y-3 sm:space-y-4 lg:space-y-5 py-6 lg:py-2 z-10">
        
        {/* Launch Badge with Live Glowing Dot */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-blue-950/60 border border-blue-500/30 rounded-full text-xs font-extrabold text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-xl shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
          </span>
          <span className="tracking-wide">Launching August 20 · 10:00 AM IST</span>
        </div>

        {/* Monumental Display Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] max-w-3xl bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          Manufacturing intelligence is about to get simpler.
        </h1>

        {/* Inspirational Founder Story Line */}
        <div className="space-y-1 shrink-0 px-2">
          <p className="text-xs sm:text-sm font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
            Built from a middle-class dream. Made for the world.
          </p>
          <p className="text-[11px] sm:text-xs text-slate-400 italic font-medium">
            This is the huge dream of middle-class boys — built with discipline, data, and belief.
          </p>
        </div>

        {/* Editorial W. Edwards Deming Quote Box */}
        <div className="max-w-xl w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3 sm:px-6 sm:py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-center shrink-0 relative overflow-hidden backdrop-blur-xl transition-all duration-300">
          <div className="absolute top-0 left-0 w-1 sm:w-1.5 h-full bg-gradient-to-b from-blue-500 to-cyan-400" />
          <blockquote className="text-xs sm:text-sm md:text-base font-medium text-slate-200 italic leading-relaxed">
            &ldquo;Without data, you&apos;re just another person with an opinion.&rdquo;
          </blockquote>
          <cite className="block text-[10px] sm:text-[11px] font-black text-blue-400 not-italic mt-1.5 uppercase tracking-widest">
            — W. Edwards Deming
          </cite>
        </div>

        {/* Core Product Description */}
        <div className="space-y-1 max-w-2xl px-2">
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 font-normal leading-relaxed">
            Modliq is a no-code machine learning and analytics platform for factories, classrooms, and applied research.
          </p>
          <p className="text-[11px] sm:text-xs md:text-sm text-blue-400 font-bold tracking-wide">
            Analyze data. Build models. Prove results — without code.
          </p>
        </div>

        {/* Digital Timepiece Countdown Cards */}
        <div className="w-full py-1">
          <CountdownTimer targetDate={targetDate} onComplete={onLaunchComplete} />
        </div>

      </main>

      {/* Pristine Masterwork Footer */}
      <footer className="min-h-[3.5rem] py-3.5 px-4 shrink-0 border-t border-white/10 bg-[#060B18]/80 backdrop-blur-xl text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <span className="font-semibold text-slate-400 text-[10px] sm:text-xs tracking-wide">
            A product by Qeltrava AI · Made in Tamil Nadu, India
          </span>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-slate-400 font-medium text-[10px] sm:text-[11px]">
            <a
              href="https://qeltravaai.vercel.app/en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Qeltrava AI</span>
              <ExternalLink size={10} />
            </a>
            <span>•</span>
            <a
              href="https://www.linkedin.com/company/qeltravai/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ExternalLink size={10} />
            </a>
            <span>•</span>
            <a
              href="https://www.instagram.com/qeltravaai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Instagram</span>
              <ExternalLink size={10} />
            </a>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[10px] sm:text-[11px]">
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
