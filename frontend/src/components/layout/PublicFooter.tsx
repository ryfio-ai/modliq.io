'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, ExternalLink } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-[#F0F6FA] border-t border-[#D0E2F0] text-[#1B2A4A] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            {/* Footer Brand Logo */}
            <div className="space-y-2">
              <img
                src="/logo modliq.png"
                alt="Modliq Manufacturing Intelligence"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain max-w-[280px] sm:max-w-[360px]"
              />
              <p className="text-[11px] text-slate-500 font-medium">
                A product by{' '}
                <a
                  href="https://qeltravaai.vercel.app/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2B70AB] font-semibold hover:underline"
                >
                  Qeltrava AI
                </a>
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Modliq is a no-code machine learning and analytics platform for manufacturing, education, and applied research by Qeltrava AI. Built to analyze datasets, run EDA, compare models, and prove results — without code.
            </p>

            <div className="p-3 bg-white border border-[#D0E2F0] rounded-xl text-xs space-y-1 inline-block">
              <span className="font-bold text-[#1B2A4A] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2B70AB]" /> Built in Tamil Nadu, India
              </span>
              <p className="text-[11px] text-slate-500">
                Serving manufacturing plants, universities, engineering colleges, &amp; research scholars globally.
              </p>
            </div>

            {/* Product Hunt Official Featured Badge */}
            <div className="pt-2">
              <a
                href="https://www.producthunt.com/products/modliqer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-modliqer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:scale-105 transition-transform"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1224658&theme=neutral&t=1786948606056"
                  alt="Modliqer - No-code ML & manufacturing analytics to analyze & optimize | Product Hunt"
                  width="250"
                  height="54"
                  className="w-[200px] h-auto object-contain"
                />
              </a>
            </div>
          </div>

          {/* Platform Modules Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B2A4A]">Use Cases &amp; Modules</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/#industry" className="hover:text-[#2B70AB] transition font-semibold text-[#1B2A4A]">Industry Solutions</Link></li>
              <li><Link href="/#education" className="hover:text-[#2B70AB] transition font-semibold text-[#1B2A4A]">Education &amp; Research</Link></li>
              <li><Link href="/product" className="hover:text-[#2B70AB] transition">Product Overview</Link></li>
              <li><Link href="/workflow" className="hover:text-[#2B70AB] transition">No-Code Workflow</Link></li>
              <li><Link href="/features" className="hover:text-[#2B70AB] transition">Feature Directory</Link></li>
              <li><Link href="/pricing" className="hover:text-[#2B70AB] transition">Pricing Tiers</Link></li>
              <li><Link href="/docs" className="hover:text-[#2B70AB] transition">Documentation</Link></li>
              <li><Link href="/contact" className="hover:text-[#2B70AB] transition">Contact Support</Link></li>
            </ul>
          </div>

          {/* Qeltrava AI & Company Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B2A4A]">Qeltrava AI</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a
                  href="https://qeltravaai.vercel.app/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2B70AB] transition flex items-center gap-1"
                >
                  <span>Qeltrava AI Website</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/qeltravai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2B70AB] transition flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/qeltravaai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2B70AB] transition flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li><Link href="/about" className="hover:text-[#2B70AB] transition">About Modliq</Link></li>
              <li><Link href="/contact" className="hover:text-[#2B70AB] transition">Contact Us</Link></li>
              <li><Link href="/docs" className="hover:text-[#2B70AB] transition">Documentation</Link></li>
            </ul>
          </div>

          {/* Contact & Support Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B2A4A]">Contact &amp; Office</h4>
            <div className="text-xs text-slate-600 space-y-2">
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#2B70AB]" /> support@modliq.io
              </p>
              <p>Tamil Nadu, India</p>
              <div className="pt-2">
                <Link
                  href="/contact?interest=demo"
                  className="px-4 py-2 bg-[#2B70AB] text-white rounded-xl text-xs font-bold inline-block hover:bg-[#1B2A4A] transition shadow-xs"
                >
                  Book Your Free Demo →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Rights */}
        <div className="pt-8 border-t border-[#D0E2F0] space-y-4">
          <div className="p-3 bg-white border border-[#D0E2F0] rounded-xl text-[11px] text-slate-500 leading-relaxed">
            <span className="font-bold text-[#1B2A4A]">Platform &amp; Decision Disclaimer:</span> Modliq supports learning and decision-making, reduces technical friction, automates repetitive workflows, and keeps humans in control. It does not replace teachers, researchers, engineers, or data scientists. Manufacturing recommendations must be validated through controlled engineering review before production use. Education and research workflows assist with learning and exploratory analysis, but do not replace foundational learning of statistics and domain knowledge.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span>© 2026 Qeltrava AI. Modliq is a product by Qeltrava AI. Built in Tamil Nadu, India. All rights reserved.</span>
            <div className="flex items-center gap-4 text-slate-600">
              <Link href="/privacy" className="hover:text-[#2B70AB]">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#2B70AB]">Terms of Service</Link>
              <Link href="/security" className="hover:text-[#2B70AB]">Security Architecture</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
