"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Key, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("admin@modliq.ai");
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState("Sathish Engineer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login, signup, oauthLogin } = useAuth();

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      router.push(`/user_demo/modliq-console/dashboard`);
    } catch (err: any) {
      setError(err?.message || "Authentication failed");
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError("");
    try {
      await oauthLogin(provider);
      router.push(`/user_${provider}/modliq-console/dashboard`);
    } catch (err: any) {
      setError(`${provider} sign in failed`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans">
      {/* Dual Panel Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Panel: High Impact Showcase & Testimonial */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-white border-r border-slate-200 relative overflow-hidden bg-grid-pattern">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 p-0.5 shadow-md shadow-blue-500/20 flex items-center justify-center">
              <span className="font-black text-white text-base">M</span>
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 block">Modliq Enterprise</span>
              <span className="text-[10px] text-blue-600 font-mono tracking-wider uppercase font-semibold">Autonomous Industrial AI</span>
            </div>
          </div>

          <div className="space-y-6 max-w-lg">
            <blockquote className="text-xl font-medium text-slate-800 leading-relaxed font-sans italic">
              &ldquo;Modliq allowed our plant engineers to cut extrusion scrap by 65% in 3 weeks while automatically generating ISO 9001 SOPs for every shift.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm border border-blue-200">
                DR
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Dr. Robert Vance</span>
                <span className="text-slate-500 text-[11px]">VP of Manufacturing &amp; Quality, Bosch Global</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-slate-600 border-t border-slate-100 pt-6">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <ShieldCheck size={14} /> SOC2 Type II Certified
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-blue-600 font-semibold">
              <Lock size={14} /> SAML 2.0 / Okta SSO
            </span>
          </div>
        </div>

        {/* Right Panel: Glassmorphic Auth Form */}
        <div className="flex flex-col justify-center items-center p-8 lg:p-16 bg-[#F8FAFC]">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {isLogin ? "Enterprise Console Access" : "Create your Enterprise Account"}
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                {isLogin ? "Sign in with Google, GitHub, SAML SSO, or your work credentials." : "Register to access AutoML & Six Sigma SPC quality tools."}
              </p>
            </div>

            {/* Google & GitHub OAuth Buttons */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => handleOAuthLogin('google')}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-all shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Google Auth
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin('github')}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-all shadow-xs"
              >
                <svg className="w-4 h-4 text-slate-900 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub Auth
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-[#F8FAFC] px-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest absolute font-bold">
                OR WORK CREDENTIALS
              </span>
            </div>

            {/* Login / Sign Up Form */}
            <form onSubmit={handleCredentialsSubmit} className="space-y-4 font-mono text-xs">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                  {error}
                </div>
              )}

              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-slate-700 block font-semibold">Full Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-slate-700 block font-semibold">Work Email:</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 block font-semibold">Password:</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Authenticating..." : isLogin ? "Sign In to Enterprise Console" : "Create Enterprise Account"}
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="pt-2 text-center text-xs font-mono">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 font-bold hover:underline"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
