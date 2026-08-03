"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  Layers,
  Brain,
  FileSpreadsheet,
  Activity,
  ShieldCheck,
  Zap,
  TrendingUp,
  X,
  FileText,
  Terminal,
  Key,
  Sliders,
  Workflow,
  Radio,
  Box,
  Cpu,
  RefreshCw,
  Globe2,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: "Core Studio" | "Model & Quality" | "Security & Edge" | "IoT & Digital Twin" | "Air-Gap & Mesh";
  icon: React.ElementType;
  path: string;
  shortcut?: string;
}

const COMMANDS: CommandItem[] = [
  // Core Studio
  { id: "dash", title: "Executive Dashboard", category: "Core Studio", icon: LayoutDashboard, path: "/dashboard", shortcut: "⌘D" },
  { id: "proj", title: "Projects & Pipelines", category: "Core Studio", icon: Layers, path: "/projects", shortcut: "⌘P" },
  { id: "data", title: "Data Ingestion & Profiling", category: "Core Studio", icon: FileSpreadsheet, path: "/data-upload", shortcut: "⌘U" },
  { id: "goal", title: "Optimization Goal Builder", category: "Core Studio", icon: Brain, path: "/goal", shortcut: "⌘G" },
  { id: "train", title: "AutoML Engine Optimization", category: "Core Studio", icon: Activity, path: "/optimization-progress", shortcut: "⌘T" },
  { id: "results", title: "Business ROI Results", category: "Core Studio", icon: TrendingUp, path: "/results", shortcut: "⌘R" },

  // Phase 2-3: Model & Quality
  { id: "reg", title: "Enterprise Model Registry", category: "Model & Quality", icon: ShieldCheck, path: "/registry", shortcut: "⌘M" },
  { id: "spc", title: "SPC & Cp/Cpk Capability Control", category: "Model & Quality", icon: Sliders, path: "/spc", shortcut: "⌘S" },
  { id: "sop", title: "ISO 9001 SOP & CAPA Generator", category: "Model & Quality", icon: FileText, path: "/sop-generator", shortcut: "⌘Q" },
  
  // Phase 4: Security & Edge
  { id: "sso", title: "SAML/OIDC SSO & Granular RBAC", category: "Security & Edge", icon: Key, path: "/access-control", shortcut: "⌘A" },
  { id: "audit", title: "Cryptographic Audit Logs", category: "Security & Edge", icon: Terminal, path: "/audit-logs", shortcut: "⌘L" },
  
  // Phase 5: IoT & Digital Twin
  { id: "pipe", title: "Visual Pipeline Graph Builder", category: "IoT & Digital Twin", icon: Workflow, path: "/pipelines", shortcut: "⌘B" },
  { id: "iot", title: "OPC-UA / MQTT Telemetry Streams", category: "IoT & Digital Twin", icon: Radio, path: "/iot", shortcut: "⌘I" },
  { id: "twin", title: "Digital Twin 3D/2D Simulator", category: "IoT & Digital Twin", icon: Box, path: "/digital-twin", shortcut: "⌘W" },

  // Phase 6: Air-Gap & Mesh
  { id: "airgap", title: "Air-Gapped Enterprise Suite", category: "Air-Gap & Mesh", icon: Cpu, path: "/airgap", shortcut: "⌘E" },
  { id: "retrain", title: "Autonomous Retraining Agents", category: "Air-Gap & Mesh", icon: RefreshCw, path: "/retraining", shortcut: "⌘N" },
  { id: "mesh", title: "Global Plant Mesh Operations", category: "Air-Gap & Mesh", icon: Globe2, path: "/plant-mesh", shortcut: "⌘O" },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // Infer active userId prefix if present e.g. /123/modliq-console
  const userIdMatch = pathname?.match(/^\/([^\/]+)\/modliq-console/);
  const consolePrefix = userIdMatch ? `/${userIdMatch[1]}/modliq-console` : "";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const filteredCommands = COMMANDS.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (targetPath: string) => {
    setIsOpen(false);
    setQuery("");
    const finalUrl = consolePrefix ? `${consolePrefix}${targetPath}` : targetPath;
    router.push(finalUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
        {/* Search Header */}
        <div className="flex items-center px-4 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 mr-3 text-blue-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Phase 1-6 tools, models, nodes, or pipelines (Esc to close)..."
            className="w-full py-4 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-sm font-sans"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-sm font-mono">
              <Terminal className="w-8 h-8 mx-auto mb-2 opacity-50 text-blue-600" />
              No matching enterprise module found for "{query}".
            </div>
          ) : (
            filteredCommands.map((cmd) => {
              const IconComponent = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => handleSelect(cmd.path)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors group border border-transparent hover:border-blue-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded-md bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-slate-900">{cmd.title}</span>
                      <span className="ml-2 text-xs text-slate-500 font-mono font-semibold">
                        [{cmd.category}]
                      </span>
                    </div>
                  </div>
                  {cmd.shortcut && (
                    <kbd className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-100 text-slate-600 border border-slate-200 font-bold">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 text-xs text-slate-500 border-t border-slate-200 bg-slate-50 font-mono">
          <div className="flex items-center space-x-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 shadow-xs">↑</kbd>{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 shadow-xs">↓</kbd> Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 shadow-xs">↵</kbd> Launch
            </span>
          </div>
          <div className="flex items-center text-blue-600 space-x-1 font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>Phase 1–6 Engine Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
