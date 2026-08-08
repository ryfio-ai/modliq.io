"use client";

import React from "react";
import {
  Upload,
  MessageSquareText,
  Eye,
  Sliders,
  BarChart3,
  FileCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function NoCodeMeansSection() {
  const cards = [
    {
      num: "01",
      icon: Upload,
      title: "1. Upload data, no code",
      desc: "Import CSV, Excel, PDF/Word tables, Postgres/Supabase, or MongoDB data without writing Python scripts or database queries.",
      highlight: "Supports standard factory files",
    },
    {
      num: "02",
      icon: MessageSquareText,
      title: "2. Define goals in plain English",
      desc: "Type goals like 'Maximize yield while keeping temperature below 90°C.' Modliq automatically extracts target, features, and limits.",
      highlight: "Natural language parser",
    },
    {
      num: "03",
      icon: Eye,
      title: "3. Review ML setup visually",
      desc: "Confirm target variables, controllable inputs, constraints, and safety checks visually before model training begins.",
      highlight: "Visual safety confirmation",
    },
    {
      num: "04",
      icon: Sliders,
      title: "4. Run ML optimization",
      desc: "Modliq trains predictive surrogate models and recommends process settings strictly bounded by your confirmed plant limits.",
      highlight: "Safe parameter trial windows",
    },
    {
      num: "05",
      icon: BarChart3,
      title: "5. Validate with quality tools",
      desc: "Use SPC control charts, Cp/Cpk capability math, and Quality Studio to verify whether recommendations are safe for trial.",
      highlight: "Statistical quality control",
    },
    {
      num: "06",
      icon: FileCheck,
      title: "6. Generate buyer-ready reports",
      desc: "Create SOPs, control plans, and buyer-ready Quality Passports for customers, plant heads, and quality auditors.",
      highlight: "One-click evidence output",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-[#F0F6FA] border-b border-[#D0E2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D0E2F0] rounded-full text-xs font-bold text-[#2B70AB]">
            <Sparkles size={14} />
            <span>No Code. No Data Science. No Spreadsheet Struggle.</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A] tracking-tight">
            Machine learning without the data science workflow.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Modliq turns complex manufacturing data into guided ML workflows—from automated dataset health checks to constrained optimization, statistical quality validation, and trial SOPs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c) => {
            const IconComp = c.icon;
            return (
              <div
                key={c.num}
                className="bg-white rounded-2xl p-6 border border-[#D0E2F0] hover:border-[#2B70AB] hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#F0F6FA] text-[#2B70AB] flex items-center justify-center group-hover:bg-[#2B70AB] group-hover:text-white transition-colors">
                      <IconComp size={20} />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#2B70AB]">
                      {c.num}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#1B2A4A] group-hover:text-[#2B70AB] transition-colors mb-2">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>{c.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
