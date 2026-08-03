'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X } from 'lucide-react';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#D0E2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Parent Attribution */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 py-1">
          <img
            src="/logo modliq.png"
            alt="Modliq Manufacturing Intelligence"
            className="h-11 sm:h-13 md:h-14 w-auto object-contain max-w-[200px] sm:max-w-[240px] transition-opacity hover:opacity-90"
          />
        </Link>

        {/* Spacious Clean Navigation Links (Never Wrap) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-semibold text-[#1B2A4A] whitespace-nowrap">
          <a href="#product" className="hover:text-[#2B70AB] transition-colors">
            Product
          </a>
          <a href="#workflow" className="hover:text-[#2B70AB] transition-colors">
            Workflow
          </a>
          <a href="#features" className="hover:text-[#2B70AB] transition-colors">
            Features
          </a>
          <a href="#algorithms" className="hover:text-[#2B70AB] transition-colors">
            Algorithms
          </a>
          <a href="#passport" className="hover:text-[#2B70AB] transition-colors">
            Quality Passport
          </a>
          <a href="#pricing" className="hover:text-[#2B70AB] transition-colors">
            Pricing
          </a>
          <Link href="/docs" className="hover:text-[#2B70AB] transition-colors">
            Docs
          </Link>
          <Link href="/contact" className="hover:text-[#2B70AB] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Clean Action CTAs (Never Wrap) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 whitespace-nowrap">
          <Link
            href="/login"
            className="text-xs xl:text-sm font-semibold text-[#1B2A4A] hover:text-[#2B70AB] px-3 py-2 transition-colors whitespace-nowrap"
          >
            Sign In
          </Link>

          <Link
            href="/contact?interest=free-pilot"
            className="px-4 py-2.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-xs xl:text-sm font-semibold flex items-center gap-2 transition-all shadow-md shadow-blue-500/10 hover:shadow-lg whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>Apply for Free Pilot</span>
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
          <a
            href="#product"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1B2A4A] py-1 hover:text-[#2B70AB]"
          >
            Product
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1B2A4A] py-1 hover:text-[#2B70AB]"
          >
            Workflow
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1B2A4A] py-1 hover:text-[#2B70AB]"
          >
            Features
          </a>
          <a
            href="#algorithms"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1B2A4A] py-1 hover:text-[#2B70AB]"
          >
            Algorithms
          </a>
          <a
            href="#passport"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1B2A4A] py-1 hover:text-[#2B70AB]"
          >
            Quality Passport
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1B2A4A] py-1 hover:text-[#2B70AB]"
          >
            Pricing
          </a>
          <Link
            href="/docs"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1B2A4A] py-1 hover:text-[#2B70AB]"
          >
            Docs
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1B2A4A] py-1 hover:text-[#2B70AB]"
          >
            Contact
          </Link>

          <div className="pt-3 border-t border-[#D0E2F0] flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 bg-[#F0F6FA] text-[#1B2A4A] border border-[#D0E2F0] rounded-xl text-xs font-semibold text-center"
            >
              Sign In
            </Link>
            <Link
              href="/contact?interest=free-pilot"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 bg-[#2B70AB] text-white rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Apply for Free Pilot
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
