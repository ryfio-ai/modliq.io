"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, Globe, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getPostLoginRedirect } from "@/lib/auth/redirects";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("admin@modliq.io");
  const [password, setPassword] = useState("modliq123");
  const [name, setName] = useState("Factory Engineer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams?.get("next");
  const { login, signup, oauthLogin } = useAuth();

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const authUser = isLogin
        ? await login(email, password)
        : await signup(name, email, password);

      const targetPath = nextParam || getPostLoginRedirect(authUser);
      router.push(targetPath);
    } catch (err: any) {
      setError(err?.message || "Invalid email or password");
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError("");
    try {
      const authUser = await oauthLogin(provider);
      const targetPath = nextParam || getPostLoginRedirect(authUser);
      router.push(targetPath);
    } catch (err: any) {
      setError(`${provider} sign in failed`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Panel: High Impact Showcase */}
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
              <span>No Data Scientist Needed</span>
            </div>

            <blockquote className="text-2xl font-extrabold text-white leading-snug tracking-tight">
              &ldquo;Turn factory data into decisions without hiring data scientists or ML engineers.&rdquo;
            </blockquote>

            <p className="text-sm text-blue-100/90 leading-relaxed font-medium">
              Modliq makes process optimization, quality validation, SPC capability math, and buyer-ready Quality Passports comfortable for factory teams.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono pt-2">
              <div className="px-3 py-1.5 rounded-lg bg-blue-950/80 border border-blue-800 text-blue-300">
                Admin: admin@modliq.io / modliq123
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

        {/* Right Panel: Auth Form */}
        <div className="flex flex-col justify-center items-center p-8 lg:p-16 bg-[#F8FAFC]">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">
                {isLogin ? "Sign in to Modliq" : "Create Factory Team Account"}
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                {isLogin ? "Access your manufacturing console & quality studio." : "Start optimizing yields without a data science team."}
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-mono font-semibold">
                {error}
              </div>
            )}

            {/* OAuth Options */}
            <div className="w-full font-mono text-xs">
              <button
                type="button"
                onClick={() => handleOAuthLogin('google')}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold transition-all shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-[#F8FAFC] px-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest absolute font-bold">
                OR WORK EMAIL
              </span>
            </div>

            <form onSubmit={handleCredentialsSubmit} className="space-y-4 font-mono text-xs">
              {!isLogin && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-[#2B70AB]"
                  />
                </div>
              )}

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
                    placeholder="engineer@company.com"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl py-3 font-sans font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Authenticating...' : isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="pt-2 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#2B70AB] font-bold hover:underline"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
              <Link href="/signup" className="text-slate-500 hover:text-[#1B2A4A]">
                Full Signup Page →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
