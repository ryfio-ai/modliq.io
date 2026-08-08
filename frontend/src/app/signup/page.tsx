"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getPostLoginRedirect } from "@/lib/auth/redirects";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { signup } = useAuth();

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const authUser = await signup(name, email, password);
      const targetPath = getPostLoginRedirect(authUser);
      router.push(targetPath);
    } catch (err: any) {
      setError(err?.message || "Signup failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Panel: High Impact Branding */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-[#1B2A4A] text-white relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2B70AB] p-0.5 shadow-md flex items-center justify-center font-black text-white text-lg">
              M
            </div>
            <div>
              <span className="text-xl font-bold block">Modliq</span>
              <span className="text-xs text-blue-200 font-mono">No-Code Manufacturing Intelligence</span>
            </div>
          </div>

          <div className="space-y-6 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/60 border border-blue-400/30 rounded-full text-xs font-bold text-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Instant Factory Setup</span>
            </div>

            <h1 className="text-3xl font-extrabold text-white leading-snug tracking-tight">
              Start using factory data without hiring data scientists or ML engineers.
            </h1>

            <div className="space-y-3 text-xs text-blue-100/90 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Upload CSV / Excel or connect database</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Automated dataset health scoring & goal parsing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Quality Studio (SPC, Cp/Cpk) & buyer-ready Quality Passports</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-blue-200/80 border-t border-blue-900/60 pt-6">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck size={16} /> Made in Tamil Nadu, India
            </span>
            <span>•</span>
            <span>Qeltrava AI</span>
          </div>
        </div>

        {/* Right Panel: Signup Form */}
        <div className="flex flex-col justify-center items-center p-8 lg:p-16 bg-[#F8FAFC]">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">
                Create your Account
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Get started with guided manufacturing intelligence & no-code ML.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-mono font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSignupSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-[#2B70AB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Work Email
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@factory.com"
                    className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-[#2B70AB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-[#2B70AB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-[#2B70AB]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl py-3 font-sans font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="pt-2 text-center text-xs font-mono">
              <Link href="/login" className="text-[#2B70AB] font-bold hover:underline">
                Already have an account? Sign in →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
