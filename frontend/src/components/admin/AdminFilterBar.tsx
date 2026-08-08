import React from 'react';
import AdminSearchInput from './AdminSearchInput';
import { Filter, RefreshCw } from 'lucide-react';

export interface FilterOption {
  key: string;
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}

interface AdminFilterBarProps {
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  filters?: FilterOption[];
  onClearFilters?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function AdminFilterBar({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search records...',
  filters = [],
  onClearFilters,
  onRefresh,
  isRefreshing = false,
}: AdminFilterBarProps) {
  const hasActiveFilters = searchValue || filters.some((f) => f.value !== '');

  return (
    <div className="p-4 bg-white border border-[#D0E2F0] rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
      <div className="flex flex-wrap items-center gap-3 flex-1">
        {onSearchChange && (
          <AdminSearchInput
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        )}

        {filters.map((filter) => (
          <div key={filter.key} className="flex items-center gap-1.5">
            <select
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className="px-3 py-2 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-medium text-[#1B2A4A] focus:outline-none focus:border-[#2B70AB] transition cursor-pointer"
            >
              <option value="">{filter.label}: All</option>
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        {hasActiveFilters && onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition"
          >
            Clear Filters
          </button>
        )}
      </div>

      {onRefresh && (
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-2 text-slate-600 hover:text-[#2B70AB] hover:bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl transition flex items-center gap-1 text-xs font-semibold"
          title="Refresh Data"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      )}
    </div>
  );
}
