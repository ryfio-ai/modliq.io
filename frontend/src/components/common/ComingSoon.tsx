'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowLeft, Mail, Sparkles, ShieldAlert } from 'lucide-react';

interface ComingSoonProps {
  title?: string;
  description?: string;
  expectedAvailability?: string;
  contactCTA?: boolean;
  backUrl?: string;
}

export default function ComingSoon({
  title = 'Coming Soon',
  description = 'This feature is being finalized for public release and will be available soon. In the meantime, you can continue using the available Modliq workflows today.',
  expectedAvailability,
  contactCTA = true,
  backUrl = '/dashboard',
}: ComingSoonProps) {
  return (
    <div className="w-full py-12 px-4 flex flex-col items-center justify-center min-h-[420px]">
      <div className="max-w-xl w-full bg-white border border-[#D0E2F0] rounded-2xl p-8 sm:p-10 text-center shadow-xs space-y-6">
        
        {/* Icon Header */}
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-[#2B70AB]">
          <Clock className="w-8 h-8 animate-pulse" />
        </div>

        {/* Title & Badge */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Feature Finalization Phase
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B2A4A] tracking-tight">{title}</h2>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">{description}</p>

        {/* Expected Availability */}
        {expectedAvailability && (
          <div className="p-3 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-semibold text-[#1B2A4A] inline-block">
            Target Release: <span className="text-[#2B70AB]">{expectedAvailability}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={backUrl}
            className="px-5 py-2.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          {contactCTA && (
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-[#1B2A4A] border border-[#D0E2F0] rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              <Mail className="w-4 h-4 text-[#2B70AB]" /> Contact Us
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
