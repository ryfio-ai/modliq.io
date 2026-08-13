'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X } from 'lucide-react';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Product', href: '/product' },
    { label: 'Industry', href: '/#industry' },
    { label: 'Education', href: '/#education' },
    { label: 'Features', href: '/features' },
    { label: 'Workflow', href: '/workflow' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
    { label: 'Contact', href: '/contact' },
  ];

  const [isPreLaunch, setIsPreLaunch] = React.useState(false);

  React.useEffect(() => {
    const launchTarget = process.env.NEXT_PUBLIC_LAUNCH_DATETIME || '2026-08-20T10:00:00+05:30';
    const gateEnabled = process.env.NEXT_PUBLIC_LAUNCH_GATE_ENABLED !== 'false';
    const bypassed = typeof window !== 'undefined' && localStorage.getItem('modliq_gate_bypass') === 'true';
    if (gateEnabled && !bypassed) {
      setIsPreLaunch(new Date().getTime() < new Date(launchTarget).getTime());
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#D0E2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Parent Attribution */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 py-1">
          <img
            src="/logo modliq.png"
            alt="Modliq Machine Learning Platform"
            className="h-11 sm:h-13 md:h-14 w-auto object-contain max-w-[200px] sm:max-w-[240px] transition-opacity hover:opacity-90"
          />
        </Link>

        {/* Spacious Clean Navigation Links (Dedicated Standalone Pages) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-semibold text-[#1B2A4A] whitespace-nowrap">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#2B70AB] transition-colors py-1 px-1.5 rounded-md hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Clean Action CTAs */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 whitespace-nowrap">
          <Link
            href="/contact?interest=demo"
            className="px-4 py-2.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-xs xl:text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/10 hover:shadow-lg whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>Book Your Free Demo</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#1B2A4A] hover:text-[#2B70AB] rounded-lg focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#D0E2F0] px-4 pt-4 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-[#1B2A4A] py-1.5 hover:text-[#2B70AB]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#D0E2F0] flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#1B2A4A] text-center py-2 bg-slate-50 rounded-xl"
            >
              Sign In
            </Link>
            <Link
              href="/contact?interest=free-pilot"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-white bg-[#2B70AB] text-center py-2.5 rounded-xl"
            >
              Apply for Free Pilot
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
