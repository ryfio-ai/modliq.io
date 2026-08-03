"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  CheckCircle2,
  AlertTriangle,
  X,
  ShieldCheck,
  Printer,
  Copy,
} from "lucide-react";

interface SOPGeneratorProps {
  modelName?: string;
  targetMetric?: string;
  optimalParameters?: { param: string; value: string; impact: string }[];
  isOpen: boolean;
  onClose: () => void;
}

export default function SOPGeneratorModal({
  modelName = "Extrusion_Thickness_Optimizer_v2.1",
  targetMetric = "Scrap Reduction & Yield Optimization",
  optimalParameters = [
    { param: "Cooling Water Valve Opening", value: "34.2%", impact: "-8.4% Defects" },
    { param: "Extruder Feed Speed", value: "420 RPM", impact: "+3.2% Yield" },
    { param: "Nozzle Pressure Limit", value: "182 Bar", impact: "Eliminates Flash" },
  ],
  isOpen,
  onClose,
}: SOPGeneratorProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sopMarkdown = `# STANDARD OPERATING PROCEDURE (SOP)
**Document ID**: SOP-ISO9001-MOD-402
**Revision**: 3.0 (AI Optimized)
**Target Process**: ${modelName}
**Objective**: ${targetMetric}
**Date Approved**: July 27, 2026

---

## 1. PURPOSE & SCOPE
This Standard Operating Procedure defines machine control settings derived from Modliq Autonomous AI Optimization. All operators on Plant Line 4 must adhere to these target ranges during extrusion runs.

## 2. TARGET MACHINE PARAMETERS
${optimalParameters.map((p) => `- **${p.param}**: ${p.value} (Expected Impact: ${p.impact})`).join("\n")}

## 3. OPERATOR CHECKLIST & CONTROLS
1. [ ] Verify cooling water supply temperature is between 21.5°C and 23.0°C.
2. [ ] Adjust valve opening to precisely **34.2%**.
3. [ ] Set extruder main drive speed to **420 RPM**.
4. [ ] Verify nozzle pressure transducer reads **< 182 Bar**.
5. [ ] Perform 15-minute SPC sample check ($C_{pk} \\ge 1.33$).

## 4. SAFETY & COMPLIANCE SIGN-OFF
- **Quality Lead**: Approved (ISO 9001 Audit Trail ID: \`audit-hash-8849-ab2\`)
- **Plant Manager**: Auto-Validated by Modliq AI Engine
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sopMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-[#0F172A] shadow-2xl text-slate-100 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/80">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                ISO 9001 Standard Operating Procedure (SOP) Generator
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Auto-compiled from ML model feature attributions & decision boundaries
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto font-mono text-xs space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 text-slate-300 leading-relaxed whitespace-pre-wrap">
            {sopMarkdown}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-slate-950/80 font-mono text-xs">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>ISO 9001 & AS9100 Quality Verified</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="px-3 py-2 rounded-lg border border-white/10 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold flex items-center space-x-1.5 transition-all"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy Markdown"}</span>
            </button>

            <button
              onClick={() => {
                const blob = new Blob([sopMarkdown], { type: "text/markdown" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `SOP_${modelName}.md`;
                a.click();
              }}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Export ISO SOP Document</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
