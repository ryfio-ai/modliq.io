"use client";

import React, { useState } from "react";
import {
  Globe2,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Server,
  Zap,
  TrendingUp,
  Layers,
} from "lucide-react";

interface PlantNode {
  id: string;
  name: string;
  location: string;
  status: "OPTIMAL" | "WARNING" | "MAINTENANCE";
  activeLinesCount: number;
  oee: number;
  yieldRate: number;
  modelsDeployed: number;
}

const PLANT_NODES: PlantNode[] = [
  {
    id: "plant-01",
    name: "Munich Smart Manufacturing Hub",
    location: "Munich, Germany",
    status: "OPTIMAL",
    activeLinesCount: 8,
    oee: 94.8,
    yieldRate: 98.4,
    modelsDeployed: 6,
  },
  {
    id: "plant-02",
    name: "Detroit Automotive Extrusion Plant",
    location: "Detroit, USA",
    status: "OPTIMAL",
    activeLinesCount: 12,
    oee: 92.1,
    yieldRate: 97.8,
    modelsDeployed: 4,
  },
  {
    id: "plant-03",
    name: "Tokyo Precision Bearing Facility",
    location: "Tokyo, Japan",
    status: "WARNING",
    activeLinesCount: 6,
    oee: 88.5,
    yieldRate: 95.2,
    modelsDeployed: 3,
  },
  {
    id: "plant-04",
    name: "Singapore Bio-Polymer Refinery",
    location: "Singapore",
    status: "OPTIMAL",
    activeLinesCount: 10,
    oee: 96.2,
    yieldRate: 99.1,
    modelsDeployed: 5,
  },
];

export default function PlantMeshPage() {
  const [plants] = useState<PlantNode[]>(PLANT_NODES);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Globe2 className="text-cyan-400" size={24} />
            Global Plant Mesh Operations Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Multi-site enterprise plant grid monitoring OEE, cross-site model sync, and active quality anomalies.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Global Plants: <strong className="text-cyan-400">4 Sites</strong>
          </span>
        </div>
      </div>

      {/* Global Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-1">
          <span className="text-xs text-slate-400 block">Global Average OEE</span>
          <span className="text-2xl font-black text-cyan-400">92.9%</span>
          <span className="text-[10px] text-emerald-400 block">+1.4% Target Improvement</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-1">
          <span className="text-xs text-slate-400 block">Total Active Lines</span>
          <span className="text-2xl font-black text-white">36 Lines</span>
          <span className="text-[10px] text-slate-400 block">Across 4 Global Mesh Sites</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-1">
          <span className="text-xs text-slate-400 block">Global Production Yield</span>
          <span className="text-2xl font-black text-emerald-400">97.6%</span>
          <span className="text-[10px] text-slate-400 block">Zero Scrap Tolerance</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-1">
          <span className="text-xs text-slate-400 block">Models Deployed</span>
          <span className="text-2xl font-black text-cyan-400">18 Instances</span>
          <span className="text-[10px] text-emerald-400 block">Cross-Plant Synced</span>
        </div>
      </div>

      {/* Plant Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plants.map((plant) => (
          <div key={plant.id} className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-4 font-mono text-xs">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-white font-sans text-base">{plant.name}</h3>
                <span className="text-slate-400 text-xs mt-0.5 block">{plant.location}</span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  plant.status === "OPTIMAL"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}
              >
                {plant.status}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div>
                <span className="text-[10px] text-slate-400 block">Active Lines</span>
                <span className="font-bold text-slate-200">{plant.activeLinesCount}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">OEE</span>
                <span className="font-bold text-cyan-400">{plant.oee}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Yield</span>
                <span className="font-bold text-emerald-400">{plant.yieldRate}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Models</span>
                <span className="font-bold text-slate-200">{plant.modelsDeployed}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
