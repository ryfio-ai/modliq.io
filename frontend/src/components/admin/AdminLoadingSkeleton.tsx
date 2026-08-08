import React from 'react';

interface AdminLoadingSkeletonProps {
  count?: number;
  type?: 'card' | 'table' | 'full';
}

export default function AdminLoadingSkeleton({ count = 5, type = 'table' }: AdminLoadingSkeletonProps) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 bg-white border border-[#D0E2F0] rounded-2xl space-y-3">
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            <div className="h-2 bg-slate-100 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#D0E2F0] rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="h-10 bg-slate-100 rounded-xl w-full"></div>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-2">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-100 rounded w-1/6"></div>
          <div className="h-4 bg-slate-100 rounded w-1/6"></div>
          <div className="h-4 bg-slate-200 rounded w-1/8"></div>
        </div>
      ))}
    </div>
  );
}
