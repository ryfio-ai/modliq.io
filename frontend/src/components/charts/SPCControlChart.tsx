"use client";

import React from "react";
import { TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react";

interface SPCDataPoint {
  sample: number;
  value: number;
  timestamp: string;
}

interface SPCControlChartProps {
  title?: string;
  data?: SPCDataPoint[];
  usl?: number;
  lsl?: number;
  target?: number;
  unit?: string;
}

const DEFAULT_DATA: SPCDataPoint[] = [
  { sample: 1, value: 42.1, timestamp: "08:00" },
  { sample: 2, value: 42.4, timestamp: "08:15" },
  { sample: 3, value: 41.9, timestamp: "08:30" },
  { sample: 4, value: 42.8, timestamp: "08:45" },
  { sample: 5, value: 43.5, timestamp: "09:00" }, // Spike near UCL
  { sample: 6, value: 42.2, timestamp: "09:15" },
  { sample: 7, value: 42.0, timestamp: "09:30" },
  { sample: 8, value: 41.6, timestamp: "09:45" },
  { sample: 9, value: 40.8, timestamp: "10:00" }, // Shift near LCL
  { sample: 10, value: 42.3, timestamp: "10:15" },
  { sample: 11, value: 42.5, timestamp: "10:30" },
  { sample: 12, value: 42.1, timestamp: "10:45" },
];

export default function SPCControlChart({
  title = "Line 4 Extrusion Thickness (SPC Control Chart)",
  data = DEFAULT_DATA,
  usl = 44.0,
  lsl = 40.0,
  target = 42.0,
  unit = "mm",
}: SPCControlChartProps) {
  // Statistical Calculations
  const values = data.map((d) => d.value);
  const n = values.length;
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
  const stdDev = Math.sqrt(variance);

  const ucl = mean + 3 * stdDev;
  const lcl = mean - 3 * stdDev;

  // Process Capability Indices (Cp, Cpk)
  const cp = (usl - lsl) / (6 * stdDev);
  const cpu = (usl - mean) / (3 * stdDev);
  const cpl = (mean - lsl) / (3 * stdDev);
  const cpk = Math.min(cpu, cpl);

  // Western Electric Rule Violation Check (> 3 sigma)
  const violations = data.filter((d) => d.value > ucl || d.value < lcl || d.value > usl || d.value < lsl);

  // SVG Chart Geometry
  const width = 640;
  const height = 240;
  const padding = 40;

  const minY = Math.min(lsl - 0.5, ...values);
  const maxY = Math.max(usl + 0.5, ...values);

  const scaleX = (index: number) => padding + (index / (n - 1)) * (width - 2 * padding);
  const scaleY = (val: number) => height - padding - ((val - minY) / (maxY - minY)) * (height - 2 * padding);

  const pointsPath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${scaleX(i)} ${scaleY(d.value)}`)
    .join(" ");

  return (
    <div className="rounded-xl border border-white/10 bg-[#0F172A] p-5 shadow-2xl text-slate-100 font-sans">
      {/* Header & Capability Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/10 gap-3">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Statistical Process Control (SPC)</span>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-white mt-0.5">{title}</h3>
        </div>

        {/* Cp / Cpk Capability Badges */}
        <div className="flex items-center space-x-3 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-slate-800 border border-white/10">
            <span className="text-slate-400">Cp: </span>
            <span className="font-bold text-cyan-300">{cp.toFixed(2)}</span>
          </div>
          <div
            className={`px-3 py-1.5 rounded-lg border font-bold flex items-center space-x-1 ${
              cpk >= 1.33
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-400 border-amber-500/30"
            }`}
          >
            {cpk >= 1.33 ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mr-1" />
            )}
            <span>Cpk: {cpk.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* SVG Control Chart Area */}
      <div className="relative my-4 overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* USL Line */}
          <line x1={padding} y1={scaleY(usl)} x2={width - padding} y2={scaleY(usl)} stroke="#EF4444" strokeDasharray="4 4" strokeWidth="1.5" />
          <text x={width - padding + 5} y={scaleY(usl) + 4} fill="#EF4444" fontSize="10" fontFamily="monospace">
            USL {usl}{unit}
          </text>

          {/* UCL Line */}
          <line x1={padding} y1={scaleY(ucl)} x2={width - padding} y2={scaleY(ucl)} stroke="#F59E0B" strokeDasharray="2 2" strokeWidth="1" />
          <text x={padding - 35} y={scaleY(ucl) + 3} fill="#F59E0B" fontSize="9" fontFamily="monospace">
            UCL
          </text>

          {/* Target Line */}
          <line x1={padding} y1={scaleY(target)} x2={width - padding} y2={scaleY(target)} stroke="#06B6D4" strokeWidth="1.5" />
          <text x={width - padding + 5} y={scaleY(target) + 4} fill="#06B6D4" fontSize="10" fontFamily="monospace">
            Target {target}{unit}
          </text>

          {/* LCL Line */}
          <line x1={padding} y1={scaleY(lcl)} x2={width - padding} y2={scaleY(lcl)} stroke="#F59E0B" strokeDasharray="2 2" strokeWidth="1" />
          <text x={padding - 35} y={scaleY(lcl) + 3} fill="#F59E0B" fontSize="9" fontFamily="monospace">
            LCL
          </text>

          {/* LSL Line */}
          <line x1={padding} y1={scaleY(lsl)} x2={width - padding} y2={scaleY(lsl)} stroke="#EF4444" strokeDasharray="4 4" strokeWidth="1.5" />
          <text x={width - padding + 5} y={scaleY(lsl) + 4} fill="#EF4444" fontSize="10" fontFamily="monospace">
            LSL {lsl}{unit}
          </text>

          {/* Trend Line */}
          <path d={pointsPath} fill="none" stroke="#38BDF8" strokeWidth="2" />

          {/* Data Points */}
          {data.map((d, i) => {
            const isViolation = d.value > ucl || d.value < lcl || d.value > usl || d.value < lsl;
            return (
              <g key={i}>
                <circle
                  cx={scaleX(i)}
                  cy={scaleY(d.value)}
                  r={isViolation ? "5" : "3.5"}
                  fill={isViolation ? "#EF4444" : "#090D16"}
                  stroke={isViolation ? "#EF4444" : "#38BDF8"}
                  strokeWidth="2"
                  className="transition-transform hover:scale-150 cursor-pointer"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer Diagnostic Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
        <div className="flex items-center space-x-4 text-slate-400">
          <span>Mean (μ): <strong className="text-white">{mean.toFixed(2)}{unit}</strong></span>
          <span>Std Dev (σ): <strong className="text-white">{stdDev.toFixed(3)}</strong></span>
          <span>Samples: <strong className="text-white">{n}</strong></span>
        </div>
        <div>
          {violations.length === 0 ? (
            <span className="text-emerald-400 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Process In Control (Stable)
            </span>
          ) : (
            <span className="text-red-400 flex items-center font-bold">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" /> {violations.length} Out-of-Control Signal(s)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
