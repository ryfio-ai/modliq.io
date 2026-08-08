"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Factory } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/workflow", label: "Workflow" },
  { href: "/features", label: "Features" },
  { href: "/algorithms", label: "Algorithms" },
  { href: "/quality-passport", label: "Quality Passport" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/contact", label: "Contact" },
];

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2B70AB] flex items-center justify-center">
            <Factory size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-[#1B2A4A] tracking-tight">Modliq</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-700">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#2B70AB] transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-[#2B70AB] transition">Sign In</Link>
          <Link href="/contact?interest=free-pilot" className="text-sm font-bold bg-[#2B70AB] hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-xs">Apply for Free Pilot</Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-700" aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-slate-700 hover:text-[#2B70AB] py-2">
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex gap-3">
            <Link href="/login" className="text-sm font-semibold text-slate-700">Sign In</Link>
            <Link href="/contact?interest=free-pilot" className="text-sm font-bold bg-[#2B70AB] text-white px-3 py-1.5 rounded-lg">Apply for Free Pilot</Link>
          </div>
        </div>
      )}
    </header>
  );
}
