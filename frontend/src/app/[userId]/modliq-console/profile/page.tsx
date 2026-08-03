"use client";

import React, { useState } from "react";
import { User, ShieldCheck, Key, Lock, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [passkeyEnabled, setPasskeyEnabled] = useState(true);

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5 font-sans">
            <User className="text-cyan-400" size={24} />
            User Security &amp; Profile Preferences
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            FIDO2 / WebAuthn passkeys, active session revocation, and security audit log.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-4">
          <h3 className="font-bold text-white font-sans text-sm">Account Identity</h3>
          <div className="space-y-2 text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px]">Full Name:</span>
              <strong className="text-white text-sm">{user?.name || "Sathish (Process Engineer)"}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Corporate Email:</span>
              <strong className="text-cyan-400">{user?.email || "admin@modliq.ai"}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Assigned Role:</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                ADMIN / PROCESS LEAD
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-4">
          <h3 className="font-bold text-white font-sans text-sm">Security &amp; Hardware Keys</h3>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <span className="font-bold text-slate-200 block">FIDO2 / WebAuthn Passkey</span>
              <span className="text-[10px] text-slate-400">YubiKey / Touch ID Registered</span>
            </div>
            <button
              onClick={() => setPasskeyEnabled(!passkeyEnabled)}
              className={`px-3 py-1 rounded text-[11px] font-bold ${
                passkeyEnabled ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-slate-800 text-slate-400"
              }`}
            >
              {passkeyEnabled ? "ACTIVE" : "ENABLE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
