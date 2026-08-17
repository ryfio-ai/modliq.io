'use client';

import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, Check } from 'lucide-react';

interface SimpleAdvancedToggleProps {
  onModeChange?: (mode: 'simple' | 'advanced') => void;
  className?: string;
}

export default function SimpleAdvancedToggle({ onModeChange, className = '' }: SimpleAdvancedToggleProps) {
  const [mode, setMode] = useState<'simple' | 'advanced'>('simple');

  useEffect(() => {
    const saved = localStorage.getItem('modliq_console_mode');
    if (saved === 'advanced' || saved === 'simple') {
      setMode(saved);
      onModeChange?.(saved);
    }
  }, []);

  const handleToggle = (newMode: 'simple' | 'advanced') => {
    setMode(newMode);
    localStorage.setItem('modliq_console_mode', newMode);
    onModeChange?.(newMode);
  };

  return (
    <div className={`inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-mono ${className}`}>
      <button
        type="button"
        onClick={() => handleToggle('simple')}
        className={`px-3 py-1.5 rounded-lg transition-all font-bold flex items-center gap-1 ${
          mode === 'simple'
            ? 'bg-white text-[#2B70AB] shadow-xs'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        {mode === 'simple' && <Check size={12} />}
        <span>Simple Mode</span>
      </button>

      <button
        type="button"
        onClick={() => handleToggle('advanced')}
        className={`px-3 py-1.5 rounded-lg transition-all font-bold flex items-center gap-1 ${
          mode === 'advanced'
            ? 'bg-white text-[#1B2A4A] shadow-xs'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        {mode === 'advanced' && <Check size={12} />}
        <span>Advanced Mode</span>
      </button>
    </div>
  );
}
