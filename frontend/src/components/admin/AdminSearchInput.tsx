import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface AdminSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export default function AdminSearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  debounceMs = 300,
}: AdminSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== value) {
        onChange(searchTerm);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [searchTerm, onChange, value, debounceMs]);

  return (
    <div className="relative flex-1 min-w-[200px] max-w-md">
      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2 bg-white border border-[#D0E2F0] rounded-xl text-xs text-[#1B2A4A] placeholder-slate-400 focus:outline-none focus:border-[#2B70AB] focus:ring-1 focus:ring-[#2B70AB] transition"
      />
      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm('');
            onChange('');
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
