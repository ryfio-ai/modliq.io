import React from 'react';
import { Database, Inbox } from 'lucide-react';

interface AdminEmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export default function AdminEmptyState({
  title = 'No Records Found',
  description = 'There are no items matching your criteria or filters.',
  actionLabel,
  onAction,
  icon,
}: AdminEmptyStateProps) {
  return (
    <div className="p-12 bg-white border border-[#D0E2F0] rounded-2xl text-center space-y-3 flex flex-col items-center justify-center my-4">
      <div className="w-12 h-12 bg-[#F0F6FA] text-[#2B70AB] rounded-2xl flex items-center justify-center">
        {icon || <Inbox className="w-6 h-6" />}
      </div>
      <h3 className="text-base font-bold text-[#1B2A4A] tracking-tight">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 bg-[#2B70AB] text-white rounded-xl text-xs font-bold hover:bg-[#1B2A4A] transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
