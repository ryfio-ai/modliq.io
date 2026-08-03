"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Sliders,
  Copy,
  Sparkles,
  Layers,
  FileCheck,
} from "lucide-react";

export default function SopCapaGeneratorPage() {
  const [docType, setDocType] = useState<"SOP" | "CAPA">("SOP");
  const [processName, setProcessName] = useState("Extrusion Line 4 Polymer Processing");
  const [targetYield, setTargetYield] = useState("98.4%");
  const [copied, setCopied] = useState(false);

  const sopMarkdown = `# ISO 9001 STANDARD OPERATING PROCEDURE (SOP)
**Document ID:** SOP-MODLIQ-2026-084  
**Process Title:** ${processName}  
**Target Quality Yield:** ${targetYield}  
**Effective Date:** 2026-07-27  

---

## 1. PURPOSE & SCOPE
This procedure specifies mandatory operational setpoints and control parameters required to sustain optimal process yield and minimize resin thermal degradation.

## 2. OPTIMAL PROCESS PARAMETER SETPOINTS
| Parameter Name | Target Setpoint | Min Bound | Max Bound | Action Level |
|---|---|---|---|---|
| Melt Temperature | **230.0 °C** | 222.0 °C | 238.0 °C | ± 3.0°C |
| Injection Pressure | **450.0 kPa** | 430.0 kPa | 470.0 kPa | ± 10 kPa |
| Screw RPM | **120.0 RPM** | 110.0 RPM | 130.0 RPM | ± 5 RPM |
| Cooling Time | **14.5 sec** | 13.0 sec | 16.0 sec | ± 0.5 sec |

---

## 3. STEP-BY-STEP OPERATIONAL PROTOCOL
1. **Pre-Flight Verification:** Verify hopper moisture content is below **0.02%**.
2. **Thermal Stabilization:** Warm heating zones 1 through 4 to **225°C** and soak for 20 minutes.
3. **Parameter Lock:** Enter optimal setpoints into Siemens PLC touch console.
4. **SPC Check:** Pull sample every 30 minutes and log thickness on SPC X-bar chart.

---

## 4. REACTION & ESCALATION PLAN (OUT OF CONTROL)
- **If Melt Temperature exceeds 238°C:** Immediately reduce heater zone 2 output by 5% and inspect cooling jacket valve.
- **If Cpk drops below 1.33:** Hold current batch lot and notify Quality Lead.`;

  const capaMarkdown = `# 8D CORRECTIVE & PREVENTIVE ACTION (CAPA) PLAN
**CAPA ID:** CAPA-2026-042  
**Problem Statement:** Yield dropped to 91.2% due to thermal overshoot in extruder barrel.  
**Status:** Approved & Implemented  

---

## 1. ROOT CAUSE ANALYSIS (5-WHY / SHAP)
- **Primary Driver:** Heater thermocouple calibration drifted +4.2°C over 90 days.
- **Contributing Factor:** Ambient humidity spike in plant sector B.

## 2. CONTAINMENT ACTIONS
- Quarantined Lot #B-104-E.
- Adjusted target setpoint from 234°C down to **228°C** nominal.

## 3. PERMANENT CORRECTIVE ACTIONS
- Installed auto-calibrating dual PT100 temperature sensors.
- Enabled Modliq Autonomous Drift Monitor (PSI Alert Threshold = 0.20).`;

  const handleCopy = () => {
    const text = docType === "SOP" ? sopMarkdown : capaMarkdown;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FileText className="text-cyan-400" size={24} />
            Automatic ISO 9001 SOP & 8D CAPA Generator
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Auto-compiles formal compliance documentation from ML-recommended setpoints and statistical boundaries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all"
          >
            {copied ? <CheckCircle2 size={15} className="text-emerald-400" /> : <Copy size={15} />}
            {copied ? "Copied to Clipboard" : "Copy Markdown"}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-950/50 transition-all"
          >
            <Printer size={15} />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Control Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-xs font-mono">
        <div>
          <label className="text-slate-400 block mb-1">Document Type:</label>
          <div className="flex gap-2">
            {(["SOP", "CAPA"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setDocType(type)}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all border ${
                  docType === type
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                    : "bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200"
                }`}
              >
                {type === "SOP" ? "ISO 9001 SOP" : "8D CAPA Report"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-slate-400 block mb-1">Process Name:</label>
          <input
            type="text"
            value={processName}
            onChange={(e) => setProcessName(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="text-slate-400 block mb-1">Target Yield:</label>
          <input
            type="text"
            value={targetYield}
            onChange={(e) => setTargetYield(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Document Document Viewer Card */}
      <div className="p-8 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-2xl space-y-6 font-sans">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <FileCheck size={24} />
            </div>
            <div>
              <span className="text-xs text-cyan-400 font-mono tracking-wider uppercase block">
                Official Compliance Export
              </span>
              <h2 className="text-base font-bold text-white">
                {docType === "SOP" ? "Standard Operating Procedure Document" : "8D CAPA Action Record"}
              </h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
            STATUS: AUDIT VERIFIED
          </span>
        </div>

        {/* Markdown Render Container */}
        <div className="prose prose-invert max-w-none text-slate-300 text-xs leading-relaxed space-y-4 font-mono">
          <pre className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
            <code>{docType === "SOP" ? sopMarkdown : capaMarkdown}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
