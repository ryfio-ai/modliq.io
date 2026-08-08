import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AdminEmptyState from './AdminEmptyState';

export interface ColumnDef<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface AdminDataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  pagination?: PaginationMeta;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  keyExtractor: (item: T) => string;
}

export default function AdminDataTable<T>({
  columns,
  data,
  pagination,
  onPageChange,
  isLoading = false,
  emptyTitle = 'No data available',
  emptyDescription = 'There are no records to show at this moment.',
  keyExtractor,
}: AdminDataTableProps<T>) {
  if (!isLoading && (!data || data.length === 0)) {
    return <AdminEmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="bg-white border border-[#D0E2F0] rounded-2xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F0F6FA] border-b border-[#D0E2F0] text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3.5 ${
                    col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D0E2F0] text-[#1B2A4A] font-medium">
            {data.map((item) => (
              <tr key={keyExtractor(item)} className="hover:bg-blue-50/40 transition">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3.5 ${
                      col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {col.render ? col.render(item) : (item as any)[col.key] ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && onPageChange && pagination.totalPages > 1 && (
        <div className="p-4 bg-[#F0F6FA] border-t border-[#D0E2F0] flex items-center justify-between text-xs text-slate-600 font-semibold">
          <span>
            Showing <span className="text-[#1B2A4A] font-bold">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
            <span className="text-[#1B2A4A] font-bold">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{' '}
            of <span className="text-[#1B2A4A] font-bold">{pagination.total}</span> records
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-1.5 bg-white border border-[#D0E2F0] rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
            >
              <ChevronLeft className="w-4 h-4 text-[#1B2A4A]" />
            </button>

            <span>
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="p-1.5 bg-white border border-[#D0E2F0] rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
            >
              <ChevronRight className="w-4 h-4 text-[#1B2A4A]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
