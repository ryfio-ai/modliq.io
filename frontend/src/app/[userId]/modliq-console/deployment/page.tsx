"use client";

import React, { useState } from "react";
import { Cpu, Box, Download, CheckCircle2, Terminal, Code } from "lucide-react";

export default function DeploymentPage() {
  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5 font-sans">
            <Cpu className="text-cyan-400" size={24} />
            1-Click Multi-Target Deployment Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Deploy models to Cloud REST APIs, C++ ONNX Edge Binaries, Docker Containers, or Triton Inference Server.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl border border-cyan-500/40 bg-[#0F172A] shadow-xl space-y-3">
          <span className="text-cyan-400 font-bold text-sm block font-sans">1-Click C++ ONNX Edge Header</span>
          <p className="text-slate-400 text-[11px]">Sub-millisecond inference compiled for Siemens S7-1500 &amp; Beckhoff PLCs.</p>
          <a
            href="/api/v1/models/mod-001/export-onnx"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-sans"
          >
            <Download size={14} /> Download .ONNX Binary
          </a>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-3">
          <span className="text-white font-bold text-sm block font-sans">Docker Container Package</span>
          <p className="text-slate-400 text-[11px]">Standalone REST API microservice with built-in FastAPI runtime.</p>
          <button className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-sans font-bold">
            Export Dockerfile
          </button>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-3">
          <span className="text-white font-bold text-sm block font-sans">Triton Inference Server</span>
          <p className="text-slate-400 text-[11px]">High-throughput model repository config for NVIDIA Jetson clusters.</p>
          <button className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-sans font-bold">
            Generate config.pbtxt
          </button>
        </div>
      </div>
    </div>
  );
}
