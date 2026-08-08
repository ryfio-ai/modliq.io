'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getPostLoginRedirect } from '@/lib/auth/redirects';
import { Mail, Lock, User, ArrowRight, X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, signup, oauthLogin } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const authUser = isLogin
        ? await login(email, password)
        : await signup(name, email, password);

      const targetPath = getPostLoginRedirect(authUser);
      router.push(targetPath);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setError('');
    setLoading(true);
    try {
      const authUser = await oauthLogin(provider);
      const targetPath = getPostLoginRedirect(authUser);
      router.push(targetPath);
      onClose();
    } catch (err: any) {
      setError(`${provider} sign in failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl border border-slate-200 relative font-sans">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {isLogin ? 'Sign in to Modliq' : 'Create your Enterprise Account'}
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            {isLogin ? 'Enter your credentials or use Single Sign-On.' : 'Get instant access to AutoML & SPC quality control.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-mono">
            {error}
          </div>
        )}

        {/* OAuth Buttons (Google & GitHub) */}
        <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
          <button
            type="button"
            onClick={() => handleOAuthLogin('google')}
            disabled={loading}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition-all shadow-xs"
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
            Google
          </button>

          <button
            type="button"
            onClick={() => handleOAuthLogin('github')}
            disabled={loading}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition-all shadow-xs"
          >
            <svg className="w-4 h-4 text-slate-900 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest absolute font-bold">
            OR WORK EMAIL
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          {!isLogin && (
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
                  className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-slate-50 text-slate-900"
                />
              </div>
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
                className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-slate-50 text-slate-900"
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
                className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-slate-50 text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-sans font-bold shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In with Credentials' : 'Create Enterprise Account'}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-bold hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
