import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface AdminErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function AdminErrorState({
  title = 'Failed to Load Data',
  message = 'An unexpected error occurred while fetching information from the server.',
  onRetry,
}: AdminErrorStateProps) {
  return (
    <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-3 flex flex-col items-center justify-center my-4">
      <div className="w-10 h-10 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-bold text-rose-900">{title}</h3>
      <p className="text-xs text-rose-700 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-rose-700 text-white rounded-xl text-xs font-bold hover:bg-rose-800 transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Retry Request
        </button>
      )}
    </div>
  );
}
