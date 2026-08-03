"use client";

import React, { useState } from "react";
import {
  Box,
  Sliders,
  Activity,
  Zap,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Gauge,
  Sparkles,
} from "lucide-react";

export default function DigitalTwinPage() {
  // What-If Sliders state
  const [temp, setTemp] = useState(230);
  const [pressure, setPressure] = useState(450);
  const [rpm, setRpm] = useState(120);

  // Dynamic predicted output based on sliders
  const predictedYield = Math.min(
    99.8,
    Math.max(82.0, 98.4 + (temp - 230) * 0.15 - Math.abs(pressure - 450) * 0.04 - Math.abs(rpm - 120) * 0.05)
  );

  const riskLevel = temp > 236 || pressure > 470 ? "HIGH" : temp > 233 ? "MEDIUM" : "LOW";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Box className="text-cyan-400" size={24} />
            Digital Twin Real-Time Process Simulator
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Interactive thermodynamic process model and real-time "What-If" parameter setpoint simulator.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Twin Model: <strong className="text-cyan-400">Munich Extrusion Line #4</strong>
          </span>
        </div>
      </div>

      {/* Main Grid: Controls & Predicted Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* What-If Sliders (1 col) */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders size={18} className="text-cyan-400" />
              "What-If" Telemetry Sliders
            </h3>
            <button
              onClick={() => {
                setTemp(230);
                setPressure(450);
                setRpm(120);
              }}
              className="text-[11px] font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1"
            >
              <RefreshCw size={12} /> Reset Nominal
            </button>
          </div>

          {/* Temperature Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">Melt Temperature</span>
              <span className="text-cyan-400 font-bold">{temp} °C</span>
            </div>
            <input
              type="range"
              min="210"
              max="250"
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>210 °C</span>
              <span>Nominal: 230 °C</span>
              <span>250 °C</span>
            </div>
          </div>

          {/* Pressure Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">Injection Pressure</span>
              <span className="text-cyan-400 font-bold">{pressure} kPa</span>
            </div>
            <input
              type="range"
              min="400"
              max="500"
              value={pressure}
              onChange={(e) => setPressure(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>400 kPa</span>
              <span>Nominal: 450 kPa</span>
              <span>500 kPa</span>
            </div>
          </div>

          {/* RPM Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">Screw Speed</span>
              <span className="text-cyan-400 font-bold">{rpm} RPM</span>
            </div>
            <input
              type="range"
              min="90"
              max="150"
              value={rpm}
              onChange={(e) => setRpm(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>90 RPM</span>
              <span>Nominal: 120 RPM</span>
              <span>150 RPM</span>
            </div>
          </div>
        </div>

        {/* Dynamic Telemetry Gauges & Digital Twin Machine Render (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Readout Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-1">
              <span className="text-xs text-slate-400 font-mono block">Predicted Quality Yield</span>
              <span className="text-3xl font-black text-cyan-400 font-mono">{predictedYield.toFixed(1)}%</span>
              <span className="text-[10px] text-emerald-400 block font-mono">± 0.4% Model Uncertainty</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-1">
              <span className="text-xs text-slate-400 font-mono block">Process Constraint Status</span>
              <span
                className={`text-xl font-bold font-mono ${
                  riskLevel === "HIGH"
                    ? "text-red-400"
                    : riskLevel === "MEDIUM"
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}
              >
                {riskLevel === "HIGH" ? "CRITICAL BREACH" : riskLevel === "MEDIUM" ? "WARNING RANGE" : "SAFE OPTIMAL"}
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">Thermodynamic Boundary</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-1">
              <span className="text-xs text-slate-400 font-mono block">Calculated OEE Index</span>
              <span className="text-3xl font-black text-emerald-400 font-mono">94.8%</span>
              <span className="text-[10px] text-slate-400 block font-mono">Availability: 99.1%</span>
            </div>
          </div>

          {/* Machine Schematic Schematic Display */}
          <div className="p-8 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl flex flex-col items-center justify-center space-y-4 text-center min-h-[260px] bg-grid-pattern">
            <Gauge size={48} className="text-cyan-400 animate-pulse" />
            <div>
              <h3 className="text-sm font-bold text-white">Digital Twin Extruder Schematic Connected</h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Real-time telemetry pulse synchronized at 10 Hz with Munich Plant Gateway
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
