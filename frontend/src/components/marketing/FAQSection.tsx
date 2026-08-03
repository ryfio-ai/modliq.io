"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export default function FAQSection({ title, subtitle, items }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-[#1B2A4A] text-center mb-2">{title}</h2>
      <p className="text-sm text-slate-500 text-center mb-8">{subtitle}</p>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full px-5 py-4 flex items-center justify-between text-left text-sm font-semibold text-[#1B2A4A] hover:bg-slate-50 transition">
              {item.question}
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
