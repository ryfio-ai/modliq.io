import React from 'react';
import { X } from 'lucide-react';

interface AdminDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: string;
}

export default function AdminDetailDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'max-w-2xl',
}: AdminDetailDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div
        className={`w-full ${width} bg-white h-full shadow-2xl flex flex-col border-l border-[#D0E2F0] animate-in slide-in-from-right duration-200`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#D0E2F0] bg-[#F0F6FA] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] tracking-tight">{title}</h2>
            {subtitle && <p className="text-xs text-slate-500 font-medium mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white text-slate-400 hover:text-[#1B2A4A] border border-[#D0E2F0] rounded-xl hover:bg-slate-50 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[#1B2A4A]">{children}</div>
      </div>
    </div>
  );
}
