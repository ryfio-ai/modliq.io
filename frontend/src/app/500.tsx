"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Terminal, RefreshCw, Send, CheckCircle2 } from "lucide-react";

export default function Custom500Page() {
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [notes, setNotes] = useState("");

  return (
    <div className="bg-[#090D16] text-slate-100 min-h-screen font-mono text-xs flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-lg p-8 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-2xl space-y-6 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
          <AlertTriangle size={24} />
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-bold text-white font-sans">500 Internal System Error</h1>
          <p className="text-slate-400 text-xs">Incident Trace ID: <span className="text-cyan-400">INC-2026-09418X</span></p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left text-red-300 font-mono text-[11px] overflow-x-auto">
          <code>[ERROR] SystemException: Unhandled server execution trace in pipeline node #4. Event dispatched to SOC monitor.</code>
        </div>

        {!ticketSubmitted ? (
          <div className="space-y-3 text-left">
            <label className="text-slate-400 block text-[11px]">Auto-Submit Support Incident Ticket:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe what action you were performing..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              rows={3}
            />
            <button
              onClick={() => setTicketSubmitted(true)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-sans text-xs font-bold shadow-lg"
            >
              Submit Ticket to Engineering SLA Response
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-center gap-2">
            <CheckCircle2 size={16} /> Support Incident Ticket Logged (Priority 1 SLA Triggered).
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-center gap-4 text-xs font-sans">
          <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-1">
            <RefreshCw size={14} /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
